import { tools } from "@/lib/tools/source";
import { FETCHY_BASE_URL } from "@/constants";
import { source } from "@/lib/source";

export default function sitemap() {
  const blogs = source.getPages();
  const toolList = tools.getTools();

  return [
    {
      url: FETCHY_BASE_URL,
      lastModified: new Date(),
    },
    ...toolList.map((tool) => ({
      url: `${FETCHY_BASE_URL}${tool.url}`,
      lastModified: tool.updatedAt,
    })),
    ...blogs.map((blog) => ({
      url: `${FETCHY_BASE_URL}${blog.url}`,
      lastModified: blog.data.updatedAt,
    })),
  ];
}
