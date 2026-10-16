// Gera dist/client/index.html chamando o servidor compilado diretamente na memória,
// sem abrir porta HTTP local (evita ECONNREFUSED 127.0.0.1 em antivírus/firewall/CI).
import { writeFile, access } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const serverEntry = path.join(root, "dist/server/index.mjs");
const outFile = path.join(root, "dist/client/index.html");

await access(serverEntry).catch(() => {
  console.error("Servidor compilado não encontrado em dist/server/index.mjs. Rode `vite build` antes.");
  process.exit(1);
});

const mod = await import(pathToFileURL(serverEntry).href);
const handler = mod.default ?? mod;
if (typeof handler?.fetch !== "function") {
  console.error("O servidor compilado não expõe fetch().");
  process.exit(1);
}

const ctx = { waitUntil() {}, passThroughOnException() {} };
const response = await handler.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {},
  ctx,
);
const html = await response.text();

if (response.status !== 200 || !html.includes("<html")) {
  console.error(`Falha ao gerar a página estática (status ${response.status}).`);
  console.error(html.slice(0, 2000));
  process.exit(1);
}

await writeFile(outFile, html, "utf8");
console.log(`✔ Página estática gerada: dist/client/index.html (${(html.length / 1024).toFixed(1)} KB)`);
