// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // FTP export needs an importable request handler, not node-server's listening process.
  // Lovable keeps its own fetch-compatible preset; external builds use Nitro's standard adapter.
  nitro: { preset: "standard" },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Static export for FTP: the HTTP prerender crawler is disabled (it fails with ECONNREFUSED on
    // some machines); scripts/export-static.mjs renders "/" in memory after the build instead.
    prerender: { enabled: false },
  },
});
