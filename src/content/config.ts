import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string().optional().default(""),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
