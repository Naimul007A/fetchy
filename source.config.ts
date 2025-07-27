import { defineDocs, frontmatterSchema } from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/blogs",
  docs: {
    schema: frontmatterSchema.extend({
      posted_by: z
        .array(
          z
            .object({
              name: z.string().optional(),
              username: z.string().optional(),
              link: z.string().optional(),
              avatar: z.string().optional(),
            })
            .optional()
        )
        .optional(),
      updatedAt: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  },
});
