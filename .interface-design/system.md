# Field Office interface system

Saved July 21, 2026. Applies to internal `/ops/*` pages.

## Direction

An event producer's run sheet rather than a public marketing site: warm paper, graphite ink, lime signals, and orange deadlines. The interface should feel calm, operational, and easy to scan while someone is actively running the work.

## Foundations

- Typography: Instrument Sans for UI and body copy; Anybody for marks and display headings.
- Color: paper `#f2f0e9`, sheet `#fbfaf6`, ink `#171914`, muted `#6e7068`, lime signal `#d9fa67`, orange deadline `#ef6b3b`.
- Depth: borders and subtle surface changes. Avoid decorative shadows; reserve a restrained shadow for floating mobile navigation and the printable report sheet.
- Spacing: 4px base rhythm. Use 12-16px inside compact controls, 24-32px between related sections, and 48-64px for page-level separation.
- Corners: mostly square. This is a working surface, not a consumer app.

## Type and layout

- Utility labels: 10-11px, uppercase, 0.12-0.14em tracking.
- Navigation and compact body: 11-14px.
- Page body: 14-16px with generous line height.
- Section headings: 26-56px depending on context.
- Page headings: fluid 38-76px, tight line height and tracking.
- Desktop shell: fixed 232px rail; workspace content capped at 76rem.
- Mobile shell: sticky 56px bar with a compact navigation popover.
- Ops pages use the minimal site layout and are `noindex`. They are not access-controlled.

## Reusable patterns

- `OpsShell.astro`: navigation, page heading, noindex warning, persisted checkboxes, and copy controls.
- `OpsDocument.astro`: readable treatment for canonical Markdown plans; source documents remain the single source of truth.
- Active navigation uses a sheet surface and orange status dot.
- Lime means ready/positive/actionable. Orange means deadline, risk, or critical path.
- Checklists persist by path and item index in local storage.
- Copy buttons belong on reusable scripts and templates, not ordinary prose.

## Interaction rules

- All interactive targets need visible keyboard focus.
- Respect reduced-motion preferences.
- Prefer immediate local feedback: copied state, checked state, and obvious current-page state.
- Do not add public-site navigation or decorative marketing modules inside the ops shell.
