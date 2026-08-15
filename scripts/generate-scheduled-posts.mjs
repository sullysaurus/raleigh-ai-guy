import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const queue = JSON.parse(await readFile(path.join(root, "seo/keyword-seeds.json"), "utf8"));
const items = Array.isArray(queue) ? queue : queue.items;
const postDirectory = path.join(root, "src/content/posts");
const imageDirectory = path.join(root, "src/images/posts/scheduled");
await mkdir(postDirectory, { recursive: true });
await mkdir(imageDirectory, { recursive: true });

const clusterTags = {
  "Local AI consulting": ["small-business", "ai-strategy"],
  "Small-business workflows": ["small-business", "automation"],
  "Real estate": ["real-estate", "automation"],
  Contractors: ["contractors", "automation"],
  "AI tools and education": ["small-business", "ai-tools"],
};

const clusterCode = {
  "Local AI consulting": "FIELD 01 / STRATEGY",
  "Small-business workflows": "FIELD 02 / WORKFLOWS",
  "Real estate": "FIELD 03 / REAL ESTATE",
  Contractors: "FIELD 04 / CONTRACTORS",
  "AI tools and education": "FIELD 05 / TOOLKIT",
};

const escapeXml = (value) => String(value).replace(/[<>&"']/g, (char) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;",
}[char]));
const scheduledTimestamp = (date) => {
  const month = Number(date.slice(5, 7));
  const winter = month >= 11 || month <= 2;
  return `${date}T${winter ? "08:15:00-05:00" : "09:15:00-04:00"}`;
};

for (const item of items) {
  const tags = clusterTags[item.cluster] || ["ai"];
  const mdx = `---
title: ${JSON.stringify(item.title)}
pubDate: ${JSON.stringify(scheduledTimestamp(item.publishDate))}
description: ${JSON.stringify(`Practical guidance on ${item.keyword}: useful workflows, human safeguards, and a two-week test for ${item.audience.toLowerCase()}.`)}
image:
  url: ${JSON.stringify(`/src/images/posts/scheduled/${item.slug}.svg`)}
  alt: ${JSON.stringify(`Editorial field diagram for ${item.title}`)}
tags:
${tags.map((tag) => `  - ${tag}`).join("\n")}
targetKeyword: ${JSON.stringify(item.keyword)}
cluster: ${JSON.stringify(item.cluster)}
intent: ${JSON.stringify(item.intent)}
contentStatus: scheduled
cta: ${JSON.stringify(item.cta)}
---

import ScheduledGuide from "@/components/blog/ScheduledGuide.astro";

<ScheduledGuide slug=${JSON.stringify(item.slug)} />
`;

  const lines = item.title.length > 52
    ? [item.title.slice(0, item.title.lastIndexOf(" ", 48)), item.title.slice(item.title.lastIndexOf(" ", 48) + 1)]
    : [item.title];
  const titleSvg = lines.map((line, index) => `<text x="78" y="${250 + index * 76}" class="title">${escapeXml(line)}</text>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f1ede4"/>
  <rect x="42" y="42" width="1116" height="546" rx="8" fill="none" stroke="#17352c" stroke-width="2"/>
  <path d="M822 130h250v250H822z" fill="#17352c"/>
  <circle cx="947" cy="255" r="76" fill="none" stroke="#ef6a43" stroke-width="16"/>
  <path d="M885 255h124M947 193v124" stroke="#f1ede4" stroke-width="6"/>
  <text x="78" y="105" class="label">RALEIGH AI GUY · ${escapeXml(clusterCode[item.cluster])}</text>
  ${titleSvg}
  <text x="78" y="520" class="keyword">${escapeXml(item.keyword.toUpperCase())}</text>
  <text x="1080" y="548" text-anchor="end" class="number">${String(item.id).padStart(2, "0")}</text>
  <style>.label,.keyword,.number{font:600 19px ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:3px;fill:#a9432d}.keyword{font-size:15px;fill:#52625c}.number{font-size:22px;fill:#17352c}.title{font:500 58px Georgia,serif;fill:#111b17}</style>
</svg>`;

  await writeFile(path.join(postDirectory, `${item.slug}.mdx`), mdx);
  await writeFile(path.join(imageDirectory, `${item.slug}.svg`), svg);
}

const state = Object.fromEntries(items.map((item) => [
  item.keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  {
    id: item.id,
    keyword: item.keyword,
    slug: item.slug,
    status: "scheduled",
    articlePath: `src/content/posts/${item.slug}.mdx`,
    scheduledAt: scheduledTimestamp(item.publishDate),
    draftedAt: "2026-08-15",
    publishedAt: null,
    verifiedLiveAt: null,
  },
]));
await writeFile(path.join(root, "seo/content-state.json"), `${JSON.stringify(state, null, 2)}\n`);

console.log(`Generated ${items.length} scheduled MDX posts and cover illustrations.`);
