import path from "path";
import { docs } from "../source.config";
import writeFile from "write-file-atomic";

const blogs = [
  "How to Download Instagram Reels Without Watermark in 2025",
  "Save Instagram Videos Easily — Mobile & PC Guide",
  "Download Instagram Posts & Carousel Images in Full HD",
  "Download TikTok Videos Without Watermark (Free & No App)",
  "How to Extract Audio from TikTok Videos (MP3 Guide)",
  "TikTok Slideshow Downloading: Turn Slides into Full MP4",
  "How to Download Facebook Reels on Any Device",
  "Download Facebook Stories Before They Disappear – 2025 Method",
  "Save Facebook Videos in HD Without Logging In",
  "Top 10 Social Media Video Download Tools in 2025",
];

const slugify = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove non-word chars
    .replace(/\s+/g, "-") // replace spaces with dashes
    .replace(/--+/g, "-") // remove duplicate dashes
    .trim();

blogs.forEach((title, index) => {
  const slug = slugify(title);
  const filename = `${slug}.mdx`;
  const base = path.resolve(process.cwd(), docs.docs.dir);
  const filepath = path.join(base, filename);

  const content = `---
title: "${title}"
description: "Learn ${title.toLowerCase()} using our simple step-by-step guide."
slug: "${slug}"
publishedAt: "${new Date().toISOString()}"
tags: []
---

# ${title}



`;

  writeFile(filepath, content.trim() + "\n");
  console.log(`✅ Created: ${filename}`);
});

console.log("🚀 All blog MDX files generated!");
