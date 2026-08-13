import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      pubDate: z.coerce.date(),
      title: z.string(),
      subtitle: z.string(),
      live: z.string(),
      status: z.enum(["ongoing", "completed"]).default("completed"),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      caseStudyCover: z.object({
        url: z.string(),
        alt: z.string(),
      }).optional(),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.coerce.date(),
      description: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
      tags: z.array(z.string()),
    }),
});

export const collections = {
  projects,
  posts,
};
