# Simplexity — agent notes

**Simplexity** (`@lexington/simplexity`) is a multipage Astro theme for a **marketing / content-site** use case: a landing page with hero and latest posts, a **blog** with tag filtering, a **store** for product-style listings with detail pages, a **projects** portfolio, **design-system docs** under `/system/*`, standalone **forms** (login, signup, forgot), and an **authors** page. Publisher: [Lexington Themes](https://lexingtonthemes.com/).

## Tech stack

| Area | Details |
|------|---------|
| Framework | **Astro** `^6.0.0` |
| Styling | **Tailwind CSS** `^4.1.18` via **`@tailwindcss/vite`** |
| Content | **`@astrojs/mdx`** `^5.0.0`; Markdown/markdown+MDX in content collections |
| Other integrations | **`@astrojs/sitemap`** `^3.7.1`, **`@astrojs/rss`** `^4.0.17` |
| Lexington package | **`@lexingtonthemes/seo`** `^0.1.0` (`AstroSeo` in `Seo.astro`) |
| Tailwind plugins (in `global.css`) | `@tailwindcss/typography`, `@tailwindcss/forms`, `tailwind-scrollbar-hide` |
| Utilities | `reading-time` (blog posts) |
| Aliases | `@/*` → `src/*` (`tsconfig.json`) |

Site URL for canonicals and integrations: `astro.config.mjs` → `site: "https://yourdomain.com"` (change for production).

## Folder map

| Path | Role |
|------|------|
| `src/pages/` | File-based routes (index, blog, store, projects, authors, forms, system, `rss.xml.js`, `404.astro`) |
| `src/layouts/` | `BaseLayout.astro` (shell: `BaseHead`, `Navigation`, `Footer`), plus `BlogLayout`, `StoreLayout`, `ProjectsLayout`, `AuthorsLayout` |
| `src/components/` | `global/` (nav, footer), `fundations/` (head, elements, containers, scripts — keep this spelling), `landing/`, `blog/`, `store/`, `projects/`, `assets/` |
| `src/content/` | **`store/`**, **`projects/`**, **`posts/`**, **`authors/`** (collections); **`infopages/`** (legal-style `.md` only — not registered in `content.config.ts`) |
| `src/styles/` | `global.css` — Tailwind entry, `@theme` tokens (fonts, colors) |
| `public/` | **Not present** in this repository |
| `src/images/` | Referenced in content frontmatter (e.g. `/src/images/...` paths); image files may be added alongside those paths |

## Content collections (`src/content.config.ts`)

All collections use the **`glob`** loader. Image fields use the schema helper **`image()`** — use valid asset paths (local under `src/` or configured remote patterns) so build-time image handling keeps working.

### `store`

- **Folder:** `src/content/store/`
- **Files:** `**/*.md`
- **Frontmatter (required):** `title` (string), `price` (number), `preview` (string), `checkout` (string), `license` (string), `highlights` (array of strings), `description` (string), `image.url` (`image()`), `image.alt` (string)
- **Template:** copy from `src/content/store/1.md`

### `projects`

- **Folder:** `src/content/projects/`
- **Files:** `**/*.md`
- **Frontmatter (required):** `pubDate` (date), `title` (string), `subtitle` (string), `live` (string), `image.url` (`image()`), `image.alt` (string)
- **Template:** copy from `src/content/projects/1.md`

### `authors`

- **Folder:** `src/content/authors/`
- **Files:** `**/*.md`
- **Frontmatter (required):** `title` (string), `images` (array of `{ url: image(), alt, name, description }`)
- **Template:** copy from `src/content/authors/authors.md`

### `posts`

- **Folder:** `src/content/posts/`
- **Files:** `**/*.{md,mdx}`
- **Frontmatter (required):** `title`, `pubDate` (date), `description`, `image.url` (`image()`), `image.alt`, `tags` (array of strings)
- **Template:** copy from `src/content/posts/1.md`

### Legal / info markdown (not a collection)

- **Folder:** `src/content/infopages/` (`terms.md`, `privacy.md`, `cookies.md`, `dpa.md`)
- **Not** wired through `getCollection` or `content.config.ts`. `src/pages/system/overview.astro` links to `/infopages/...`, but **there are no `src/pages` routes** for those URLs in this repo unless you add them.

**Changelog** as a route or collection: **not present** in this repository.

## Routing conventions

| URL pattern | Source |
|-------------|--------|
| `/` | `src/pages/index.astro` |
| `/blog/`, `/blog/tags/`, `/blog/tags/[tag]` | Blog index and tag filtering (`posts` collection) |
| `/blog/posts/[...slug]` | Each `posts` entry; **`slug`** = content **`entry.id`** (stem of filename, e.g. `1` from `1.md`) |
| `/store/`, `/store/[...slug]` | `store` collection; dynamic segment = `entry.id` |
| `/projects/`, `/projects/[...slug]` | `projects` collection; dynamic segment = `entry.id` |
| `/authors/[...slug]` | `authors` collection; dynamic segment = `entry.id` (e.g. `authors` for `authors.md`) |
| `/system/overview`, `/system/colors`, … | Static design-system pages |
| `/forms/login`, `/forms/signup`, `/forms/forgot` | Form layouts |
| `/about` | About page |
| `/404` | 404 page |
| `/rss.xml` | `src/pages/rss.xml.js` |

Dynamic routes for store/projects/authors set `trailingSlash: false` in `getStaticPaths`.

## Customization guide

- **Site URL:** `astro.config.mjs` → `site`
- **Global SEO / head:** `src/components/fundations/head/BaseHead.astro` (composes `Seo`, `Meta`, `Fonts`, `Favicons`, scripts). Replace placeholder copy in `Seo.astro` and `Meta.astro` with real titles, canonicals, and social handles.
- **Brand colors & typography:** `src/styles/global.css` — `@theme` block (`--font-sans`, `--color-base-*`, etc.) and `:root` font-feature defaults
- **Chrome (nav / footer):** `src/components/global/Navigation.astro`, `src/components/global/Footer.astro`
- **Page shell:** `src/layouts/BaseLayout.astro` imports global CSS and wraps content with `Navigation` + `main` + `Footer`

## Commands

From `README.md` (project root):

| Command | Action |
|---------|--------|
| `npm install` | Install dependencies |
| `npm run dev` | Dev server |
| `npm run build` | Production build → `./dist/` |
| `npm run preview` | Preview production build |
| `npm run astro ...` | Astro CLI |

Requires Node.js **18 or 20** (per README).

## Guardrails

- Do **not** rename the **`fundations`** folder; paths and imports depend on that spelling.
- When changing **`src/content.config.ts`** schemas, update **every** page/component that reads `entry.data` for that collection — avoid drive-by schema expansion.
- Prefer **minimal diffs** consistent with existing patterns (layouts, `Wrapper`/`Text`, collection `getStaticPaths`).
- **`src/pages/rss.xml.js`** uses `import.meta.glob('./blog/*.{md,mdx}')` relative to `src/pages/`; there are no `.md` files under `src/pages/blog/` in this repo (blog bodies live in **`src/content/posts/`**). Adjust the feed if you need RSS from the `posts` collection.

## Lexington docs & support (from README)

- Theme specs: https://lexingtonthemes.com/templates/simplexity  
- Documentation: https://lexingtonthemes.com/documentation  
- Changelog (theme): https://lexingtonthemes.com/changelog/simplexity  
- Support: https://lexingtonthemes.com/legal/support/  
- Bundle: https://lexingtonthemes.com  
