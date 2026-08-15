import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const readJson = async (file) => JSON.parse(await readFile(path.join(root, file), "utf8"));
const [config, queue, state, research] = await Promise.all([
  readJson("seo/content-engine.json"),
  readJson("seo/keyword-seeds.json"),
  readJson("seo/content-state.json"),
  readJson("seo/keywords-everywhere-research.json"),
]);
const failures = [];
const queueItems = Array.isArray(queue) ? queue : queue.items;
const stateItems = Array.isArray(state.items) ? state.items : Object.values(state);
const unique = (values, label) => {
  const duplicates = values.filter((value, index) => values.indexOf(value) !== index);
  if (duplicates.length) failures.push(`Duplicate ${label}: ${[...new Set(duplicates)].join(", ")}`);
};

if (config.version !== 1) failures.push("Unsupported content-engine config version");
if (queueItems.length !== 50) failures.push(`Expected 50 queue items, found ${queueItems.length}`);
if (stateItems.length !== 50) failures.push(`Expected 50 state items, found ${stateItems.length}`);
if (research.items.length !== 50) failures.push(`Expected 50 research rows, found ${research.items.length}`);
unique(queueItems.map((item) => item.keyword), "keywords");
unique(queueItems.map((item) => item.slug), "slugs");
unique(queueItems.map((item) => item.ownerUrl), "owner URLs");
unique(queueItems.map((item) => item.publishDate), "publication dates");

const contentFiles = new Set(await readdir(path.join(root, config.content.directory)));
for (const item of queueItems) {
  if (!contentFiles.has(`${item.slug}.mdx`)) failures.push(`Missing article: ${item.slug}.mdx`);
}
for (const item of stateItems) {
  if (!queueItems.some((queued) => queued.slug === item.slug)) failures.push(`State without queue item: ${item.slug}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`SEO content engine valid: ${queueItems.length} queued, ${stateItems.length} scheduled, ${research.items.length} researched.`);
