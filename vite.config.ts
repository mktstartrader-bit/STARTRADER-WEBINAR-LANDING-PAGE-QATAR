import { defineConfig, loadEnv, type Plugin } from "vite";
import preact from "@preact/preset-vite";

// Inlines the (small, ~5 KB gzipped) stylesheet into index.html so the first
// paint doesn't wait on a separate render-blocking CSS request.
function inlineCss(): Plugin {
  return {
    name: "inline-css",
    apply: "build",
    enforce: "post",
    transformIndexHtml: {
      order: "post",
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        for (const [name, chunk] of Object.entries(ctx.bundle)) {
          if (chunk.type !== "asset" || !name.endsWith(".css")) continue;
          const tag = new RegExp(
            `<link rel="stylesheet"[^>]*href="/${name}"[^>]*>`
          );
          if (!tag.test(html)) continue;
          html = html.replace(tag, () => `<style>${chunk.source}</style>`);
          delete ctx.bundle[name];
        }
        return html;
      },
    },
  };
}

// Serves api/register.ts on the dev server (Vercel runs it in production).
// Reads SHEET_* / CRM_* from .env.local if present; without a Sheet URL it
// uses an in-memory stand-in so the whole flow, duplicates included, can be
// tested locally.
function devApi(): Plugin {
  return {
    name: "dev-api",
    apply: "serve",
    configureServer(server) {
      Object.assign(process.env, loadEnv("development", process.cwd(), ""));
      process.env.REGISTER_DEV_MOCK = "1";
      server.middlewares.use("/api/register", async (req, res) => {
        try {
          const mod = await server.ssrLoadModule("/api/register.ts");
          const chunks: Buffer[] = [];
          for await (const c of req) chunks.push(c as Buffer);
          const request = new Request(`http://localhost${req.url ?? ""}`, {
            method: req.method,
            headers: req.headers as Record<string, string>,
            body: req.method === "POST" ? Buffer.concat(chunks) : undefined,
          });
          const handler = mod[req.method ?? "GET"];
          const response: Response = handler
            ? await handler(request)
            : new Response("Method Not Allowed", { status: 405 });
          res.statusCode = response.status;
          response.headers.forEach((v, k) => res.setHeader(k, v));
          res.end(Buffer.from(await response.arrayBuffer()));
        } catch (err) {
          console.error(err);
          res.statusCode = 500;
          res.end();
        }
      });
    },
  };
}

// https://vite.dev/config/
// Preact (via preact/compat) stands in for React: same component code, but a
// ~4 KB runtime instead of ~45 KB, so far less JS to download and hydrate.
export default defineConfig({
  plugins: [preact({ prerender: { enabled: false } }), inlineCss(), devApi()],
  // Bundle everything into the build-time SSR renderer so bare "react"
  // imports resolve through the Preact aliases instead of node_modules.
  ssr: { noExternal: true },
});
