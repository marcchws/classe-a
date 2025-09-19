import { z } from "zod"

export const accessLevelFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),
  status: z.enum(["active", "inactive"]).default("active"),
  permissions: z.record(
    z.string(),
    z.object({
      view: z.boolean().default(false),
      create: z.boolean().default(false),
      edit: z.boolean().default(false),
      delete: z.boolean().default(false),
      export: z.boolean().optional().default(false),
    })
  ),
})

export type AccessLevelFormSchema = z.infer<typeof accessLevelFormSchema>