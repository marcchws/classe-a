import { z } from "zod"

export const userFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  status: z.enum(["active", "inactive"]).optional(),
  document: z.object({
    number: z.string().min(1, "Número do documento é obrigatório"),
    type: z.enum(["CPF", "PASSAPORTE", "CNH"]),
  }),
  department: z.string().min(1, "Departamento é obrigatório"),
  position: z.string().min(1, "Cargo é obrigatório"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  salary: z.number().min(0, "Salário deve ser positivo"),
  address: z.object({
    number: z.string(),
    zipCode: z.string(),
    street: z.string(),
    complement: z.string().optional(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string().optional(),
  }),
  email: z.string().email("Email inválido").optional(),
  password: z.string().optional(),
  hireDate: z.string().optional(),
  birthDate: z.string().optional(),
  accessLevel: z.string().optional(),
})

export type UserFormSchema = z.infer<typeof userFormSchema>