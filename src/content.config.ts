import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const store = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/store" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      price: z.number(),
      preview: z.string(),
      checkout: z.string(),
      license: z.string(),
      highlights: z.array(z.string()),
      description: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      pubDate: z.coerce.date(),
      title: z.string(),
      subtitle: z.string(),
      live: z.string(),
      image: z.object({
        url: image(),
        alt: z.string(),
      }),
    }),
});

const authors = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/authors" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      images: z.array(
        z.object({
          url: image(),
          alt: z.string(),
          name: z.string(),
          description: z.string(),
        })
      ),
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
  store,
  projects,
  authors,
  posts,
};
