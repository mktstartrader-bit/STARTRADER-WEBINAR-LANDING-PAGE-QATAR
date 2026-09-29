// Injects the server-rendered app into dist/index.html, then removes the
// temporary SSR bundle. Run after `vite build` + `vite build --ssr`.
import { readFile, writeFile, rm } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const { render } = await import(
  pathToFileURL(`${root}dist-ssr/entry-server.js`).href
);

const file = `${root}dist/index.html`;
const html = await readFile(file, "utf8");
const marker = '<div id="root"></div>';
if (!html.includes(marker)) throw new Error("root marker not found");

await writeFile(file, html.replace(marker, `<div id="root">${render()}</div>`));
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log("prerendered dist/index.html");
