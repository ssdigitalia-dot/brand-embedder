<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the institutional experience as sections of the home route, with shared brand and contact primitives, because this site has a single-page navigation brief.
- Use imported asset pointers for uploaded brand media and a real square public favicon, because site imagery is CDN-served while browser icons need a direct file — except the Acouto Steel logo (`src/assets/logo-acouto-steel.png`) and the hero video (`src/assets/engineering-banner.webm`), which must stay real bundled files (never CDN pointers) so they survive GitHub ZIP downloads and FTP hosting; the MP4 variant was dropped because it exceeds the 10 MB repo file limit.
- The site must build as a static FTP-ready package: explicitly pin Nitro to `cloudflare-module` inside and outside Lovable (never `node-server`, which exports no fetch, or `standard`, whose srvx alias fails with the installed Nitro/Vite versions), keep TanStack prerender disabled, and run `scripts/export-static.mjs` after compilation to render "/" through the real generated fetch handler without HTTP. Accept both dist/server+dist/client and .output/server+.output/public layouts, and place the uploadable site in dist/client.
- Do not fabricate testimonials, chronology dates or performance statistics; publish only supplied business evidence.
- Keep video playback and project timeline interactions in dedicated browser-safe components; honor reduced-motion preferences and leave section content visible without JavaScript.
- Render construction dust in a browser-only canvas overlay synchronized with video playback, beneath the readability shade and content, to preserve the original video and accessible controls.
- Render the Instagram section with the official public profile embed and a persistent profile link, because real posts can update without copying expiring image URLs or requiring credentials.
- Refresh the official Instagram embed through a browser-only timer, pausing while the tab is hidden or the embed is focused, because updates must not interrupt visitor interactions and Instagram controls content freshness.
