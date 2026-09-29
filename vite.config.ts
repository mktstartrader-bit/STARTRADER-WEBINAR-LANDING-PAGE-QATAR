import { defineConfig, type Plugin } from "vite";
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

// https://vite.dev/config/
// Preact (via preact/compat) stands in for React: same component code, but a
// ~4 KB runtime instead of ~45 KB, so far less JS to download and hydrate.
export default defineConfig({
  plugins: [preact({ prerender: { enabled: false } }), inlineCss()],
  // Bundle everything into the build-time SSR renderer so bare "react"
  // imports resolve through the Preact aliases instead of node_modules.
  ssr: { noExternal: true },
});
