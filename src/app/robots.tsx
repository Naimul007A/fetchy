import { FETCHY_BASE_URL } from "@/constants";

export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${FETCHY_BASE_URL}/sitemap.xml`,
  };
}
