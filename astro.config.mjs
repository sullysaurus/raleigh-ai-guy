import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
export default defineConfig({
  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "github-dark",
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true,
  },
  site: "https://raleighaiguy.com",
  image: {
    dangerouslyProcessSVG: true,
  },
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/404/") &&
        !page.includes("/blog/tags/") &&
        !page.includes("/clients/") &&
        !page.includes("thank-you/"),
    }),
    mdx(),
  ],
});
