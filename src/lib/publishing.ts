import type { CollectionEntry } from "astro:content";

const configuredNow = import.meta.env.CONTENT_BUILD_AT || process.env.CONTENT_BUILD_AT;

export const publicationNow = () => {
  const value = configuredNow ? new Date(configuredNow) : new Date();
  return Number.isNaN(value.valueOf()) ? new Date() : value;
};

export const isPublishedPost = (post: CollectionEntry<"posts">, now = publicationNow()) =>
  post.data.pubDate.valueOf() <= now.valueOf();

export const publishedPosts = (posts: CollectionEntry<"posts">[], now = publicationNow()) =>
  posts.filter((post) => isPublishedPost(post, now));
