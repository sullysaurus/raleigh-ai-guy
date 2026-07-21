import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
export default defineConfig({
  // Pagination redirects removed
  redirects: {
    "/blog/posts/build-24-7-ai-front-desk-nextjs-vapi-supabase-vercel/": "/blog/",
    "/blog/posts/build-claude-skill-through-conversation/":
      "/blog/posts/create-first-claude-skill-organize-inbox/",
    "/blog/posts/hermes-agent-orgo-telegram-composio-ai-employee/":
      "/blog/posts/what-is-claude-and-cowork/",
    "/blog/posts/what-are-mcp-servers/":
      "/blog/posts/daily-calendar-briefing-claude/",
    "/blog/posts/what-is-elevenlabs/": "/blog/",
    "/blog/posts/what-is-granola-ai-meeting-notes/":
      "/blog/posts/what-is-claude-and-cowork/",
    "/blog/posts/what-is-hermes-agent/":
      "/blog/posts/what-is-claude-and-cowork/",
    "/blog/posts/what-is-heygen/": "/blog/",
    "/blog/posts/what-is-obsidian/":
      "/blog/posts/what-are-claude-skills/",
    "/blog/posts/what-is-openclaw/":
      "/blog/posts/what-is-claude-and-cowork/",
    "/blog/posts/what-is-sanebox-should-you-use-it/":
      "/blog/posts/create-first-claude-skill-organize-inbox/",
    "/blog/posts/wispr-flow-review-setup-save-time-talking/":
      "/blog/",
    "/blog/posts/claude-workflows-small-business/": "/blog/",
    "/blog/posts/claude-projects-skills-connectors-cowork/":
      "/blog/posts/what-are-claude-skills/",
    "/blog/posts/connect-tools-to-claude/":
      "/blog/posts/daily-calendar-briefing-claude/",
  },
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
  site: "https://dannysullivan.ai",
  integrations: [
    sitemap({
      filter: (page) =>
        !page.endsWith("/404/") &&
        !page.includes("/blog/tags/") &&
        !page.includes("/clients/") &&
        !page.includes("/ops/") &&
        !page.includes("/thank-you/"),
    }),
    mdx(),
  ],
});
