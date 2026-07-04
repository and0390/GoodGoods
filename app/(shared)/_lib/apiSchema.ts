import { z } from "zod";

export const apiSchema = z.object({
  success: z.boolean(),
  code: z.string(),
  message: z.string(),
  body: z.unknown(),
});

export type ApiSchema = z.infer<typeof apiSchema>;
