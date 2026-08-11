# Raleigh AI Guy design system

## Product context

Raleigh AI Guy is Danny Sullivan’s teaching, consulting, and building practice for small-business teams. The site should make one idea memorable: Danny helps teams become capable with AI themselves, then builds alongside them when the work calls for it.

## Direction: the practical AI field guide

The visual language combines an editorial field guide with a working notebook. It should feel experienced, useful, local, and human rather than like an AI agency or SaaS template.

- Use confident typography, asymmetrical editorial compositions, real screenshots, and visible proof.
- Let sections change pace and surface color while keeping a consistent grid and typographic hierarchy.
- Avoid generic cards, rounded component grids, decorative gradients, and technology clichés.
- Warmth comes from paper tones, photography, serif display type, and the orange signal color.

## Typography

- **Display:** Newsreader, 400–600. Use for major headlines, project titles, and expressive statements.
- **Body and UI:** Instrument Sans, 400–700. Use for paragraphs, navigation, controls, and supporting headings.
- **Utility:** IBM Plex Mono, 400–500. Use sparingly for labels, numbering, dates, and field-note metadata.
- Keep body copy between 14–20px with generous line height. Reading content stays narrow even when the surrounding composition is wide.

## Color

- **Canvas:** `#F3F0E8`
- **Paper:** `#FFFDF7`
- **Ink:** `#16201B`
- **Muted ink:** `#667069`
- **Signal orange:** `#E65F36`
- **Forest:** `#163D32`
- **Soft moss:** `#DFE5DA`
- Orange is for actions, emphasis, progress, and a few memorable phrases. Forest creates high-contrast editorial sections. Do not distribute every color evenly.

## Layout

- Marketing compositions use a 72rem maximum width with 24–40px gutters.
- Long-form reading stays at the existing 48rem/46rem measure.
- Use a 12-column desktop grid for hero, case studies, and split editorial sections.
- Prefer square corners and thin rules. Small controls may use 4px radius; large content imagery stays square.
- Vary section pacing: open hero, compact proof strip, colored philosophy section, alternating work spreads, dark active-build feature.

## Imagery

- Use Danny’s portrait as a major part of the opening composition, not a small avatar.
- Use real client screenshots at natural aspect ratios.
- Company logos support specific experience claims; they are not decoration or an anonymous logo wall.
- Keep screenshots crisp, minimally framed, and free of fake device mockups.

## Motion

- Use restrained entrance motion only for the hero and short transform transitions on meaningful links and images.
- Respect `prefers-reduced-motion`.
- No scroll-jacking, looping decoration, or motion that slows reading.

## Content hierarchy

The homepage story is: promise → proof → philosophy → ways to work → selected outcomes → current build → useful writing → contact. Every new homepage section must support that sequence.

## Shared implementation patterns

- `PageIntro.astro` owns marketing-page headings, width, spacing, and optional primary action.
- `EditorialList.astro` owns numbered educational, offer, and process sections.
- `ContactBand.astro` owns the orange closing invitation used across public pages.
- `StatusPage.astro` owns confirmation, thank-you, error, and other single-message routes.
- `BlogLayout.astro` and `ProjectsLayout.astro` own long-form article and case-study presentation.
- Public pages should compose these patterns instead of recreating their typography and spacing with local utility stacks.
- Client-specific payment pages and internal operations tools are intentionally separate surfaces and should not inherit marketing-page compositions.
