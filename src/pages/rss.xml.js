import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { publishedPosts } from "@/lib/publishing";

export async function GET(context) {
  const posts = publishedPosts(await getCollection("posts")).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  return rss({
    title: "Danny Sullivan",
    description:
      "Notes on AI automation, product work, and systems that help companies grow revenue.",
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/posts/${post.id}/`,
    })),
  });
}
