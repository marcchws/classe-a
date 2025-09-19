import { z } from "zod"

const permissionSchema = z.object({
  export: z.boolean().optional(),
  view: z.boolean().optional(),
  create: z.boolean().optional(),
  edit: z.boolean().optional(),
  delete: z.boolean().optional(),
})

export const accessLevelFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  permissions: z.record(z.string(), permissionSchema).optional(),
})

export type AccessLevelFormSchema = z.infer<typeof accessLevelFormSchema>