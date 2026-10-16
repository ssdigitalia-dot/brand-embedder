import { describe, expect, it } from "vitest";
import { getFetchHandler } from "../../scripts/static-handler.mjs";
import { readFileSync } from "node:fs";
import path from "node:path";

describe("FTP export adapter", () => {
  it("uses Nitro standard rather than the listening node-server adapter", () => {
    const config = readFileSync(path.join(process.cwd(), "vite.config.ts"), "utf8");
    expect(config).toMatch(/nitro:\s*\{\s*preset:\s*"standard"\s*\}/);
    expect(config).toMatch(/prerender:\s*\{\s*enabled:\s*false\s*\}/);
  });

  it("forwards a real request to the generated default handler", async () => {
    const handler = getFetchHandler({ default: {
      fetch(request: Request) { return new Response(new URL(request.url).pathname); },
    } }, ".output/server/index.mjs");
    const response = await handler.fetch(new Request("https://example.test/contato"));
    expect(response.status).toBe(200);
    expect(await response.text()).toBe("/contato");
  });

  it("also supports a named fetch export", async () => {
    const handler = getFetchHandler({ default: {}, fetch: () => new Response("named") }, "dist/server/index.mjs");
    expect(await (await handler.fetch(new Request("https://example.test/"))).text()).toBe("named");
  });

  it("rejects node-server's empty export without fabricating a handler", () => {
    expect(() => getFetchHandler({ default: {} }, ".output/server/index.mjs")).toThrow('preset Nitro "standard"');
  });
});