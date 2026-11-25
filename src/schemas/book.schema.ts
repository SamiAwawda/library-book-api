import { z } from "zod";

const bookFields = z.object({
  title: z.string().trim().min(1, "title is required"),
  author: z.string().trim().min(1, "author is required"),
  genre: z.string().trim().min(1, "genre is required"),
  available: z.boolean(),
});

// POST: available اختياري وقيمته الافتراضية true
export const createBookSchema = bookFields.extend({
  available: z.boolean().default(true),
});

// PATCH: كل الحقول اختيارية (بدون default حتى ما نعدّل شي بالغلط) بس لازم حقل واحد على الأقل
export const updateBookSchema = bookFields
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive("id must be a positive integer"),
});

export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
