// Gera o index.html estático chamando o servidor compilado diretamente na memória,
// sem abrir porta HTTP local (evita ECONNREFUSED 127.0.0.1 em antivírus/firewall/CI).
// Funciona com as duas saídas possíveis da compilação:
//   - dist/server + dist/client   (ambiente Lovable)
//   - .output/server + .output/public (compilação local / GitHub)
// No final, o site pronto para FTP fica sempre em dist/client.
import { writeFile, access, cp, mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();
const exists = (p) => access(p).then(() => true, () => false);

const layouts = [
  { server: "dist/server/index.mjs", client: "dist/client" },
  { server: ".output/server/index.mjs", client: ".output/public" },
];

let layout;
for (const candidate of layouts) {
  if (await exists(path.join(root, candidate.server))) {
    layout = candidate;
    break;
  }
}

if (!layout) {
  console.error(
    "Servidor compilado não encontrado (procurado em dist/server e .output/server). Rode `vite build` antes.",
  );
  process.exit(1);
}

const finalClientDir = path.join(root, "dist/client");
const sourceClientDir = path.join(root, layout.client);

if (path.resolve(sourceClientDir) !== path.resolve(finalClientDir)) {
  await mkdir(finalClientDir, { recursive: true });
  await cp(sourceClientDir, finalClientDir, { recursive: true, force: true });
}

const mod = await import(pathToFileURL(path.join(root, layout.server)).href);
const handler = mod.default ?? mod;
if (typeof handler?.fetch !== "function") {
  console.error("O servidor compilado não expõe fetch().");
  process.exit(1);
}

const ctx = { waitUntil() {}, passThroughOnException() {}, props: {} };
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

await writeFile(path.join(finalClientDir, "index.html"), html, "utf8");
console.log(
  `✔ Página estática gerada: dist/client/index.html (${(html.length / 1024).toFixed(1)} KB) — suba o conteúdo de dist/client via FTP`,
);
process.exit(0);
