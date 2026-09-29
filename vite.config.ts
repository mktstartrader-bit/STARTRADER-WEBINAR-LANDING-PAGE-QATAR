import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

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
export default defineConfig({
  plugins: [react(), inlineCss()],
});
