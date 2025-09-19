import { z } from "zod"

const phoneRegex = /^\+?[1-9]\d{1,14}$/

export const userFormSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),

  document: z.object({
    type: z.enum(["CPF", "PASSAPORTE", "CNH"]),
    number: z
      .string()
      .min(1, "Número do documento é obrigatório")
      .max(20, "Número do documento muito longo"),
  }),

  department: z
    .string()
    .min(1, "Setor é obrigatório"),

  position: z
    .string()
    .min(1, "Cargo é obrigatório"),

  hireDate: z.date().optional(),

  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .regex(phoneRegex, "Formato de telefone inválido"),

  birthDate: z.date().optional(),

  salary: z
    .number()
    .min(0, "Salário deve ser maior que zero")
    .max(1000000, "Salário muito alto"),

  commission: z.object({
    type: z.enum(["percentage", "fixed"]),
    value: z.number().min(0, "Valor da comissão deve ser positivo"),
    frequency: z.enum(["monthly", "quarterly", "biannual", "annual"]),
  }).optional(),

  address: z.object({
    zipCode: z
      .string()
      .min(1, "CEP é obrigatório")
      .regex(/^\d{5}-?\d{3}$/, "CEP deve ter formato válido"),
    street: z
      .string()
      .min(1, "Rua é obrigatória"),
    number: z
      .string()
      .min(1, "Número é obrigatório"),
    complement: z.string().optional(),
    neighborhood: z
      .string()
      .min(1, "Bairro é obrigatório"),
    city: z
      .string()
      .min(1, "Cidade é obrigatória"),
    state: z
      .string()
      .min(1, "Estado é obrigatório"),
    country: z
      .string()
      .min(1, "País é obrigatório")
      .default("Brasil"),
  }),

  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .email("E-mail deve ter formato válido"),

  password: z
    .string()
    .min(8, "Senha deve ter no mínimo 8 caracteres")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Senha deve conter ao menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial"
    ),

  status: z.enum(["active", "inactive"]).default("active"),

  accessLevel: z.string().optional(),
})

export type UserFormSchema = z.infer<typeof userFormSchema>