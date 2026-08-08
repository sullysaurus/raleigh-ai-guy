# Raleigh AI Guy design system

The public site uses one restrained brand system. New pages should reuse the tokens and component classes in `src/styles/global.css` rather than introduce page-specific colors.

## Color roles

| Role | Light | Dark | Use |
| --- | --- | --- | --- |
| Ink / navy | `#050617` | `#050617` | Headings, dark sections, logo details |
| Mint | `#1dce8d` | `#1dce8d` | Primary actions, links, and small highlights |
| Page | `#f7f8f5` | `#050617` | Main page background |
| Surface | `#ffffff` | `#0b0d1e` | Cards and raised panels |
| Soft surface | `#eef1f0` | `#0b0d1e` | Section bands and secondary panels |
| Muted text | `#686b75` | `#9b9da8` | Supporting copy and labels |

## Rules

- Mint is an accent, not a large section background.
- All dark sections use brand navy. Do not introduce pure black or unrelated charcoal backgrounds.
- Use `--brand-surface` for cards and `--brand-surface-soft` for section bands. Do not create additional pastel surface colors.
- Use `--brand-line` and `--brand-line-strong` for borders.
- Use `brand-button`, `brand-panel`, `brand-card`, `brand-chip`, and `brand-dark-section` before creating one-off component styles.
- Public pages use Instrument Sans for body text and Anybody for display headings.
- Client-specific and internal operations pages may maintain their own intentionally isolated visual systems.
