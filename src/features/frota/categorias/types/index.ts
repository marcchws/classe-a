import { z } from "zod";

// Definir o schema localmente para evitar problemas de importação
const categoriaVeiculoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome da categoria eh obrigatorio"),
  descricao: z.string().min(1, "Descricao da categoria eh obrigatoria"),
  status: z.enum(["ATIVO", "INATIVO"]).default("ATIVO"),
  dataCadastro: z.string().optional(),
});

export type CategoriaVeiculo = z.infer<typeof categoriaVeiculoSchema>;
export type CategoriaVeiculoFormData = Omit<CategoriaVeiculo, "id" | "dataCadastro">;

// Schema para busca/filtro de categorias
const buscaCategoriaVeiculoSchema = z.object({
  termo: z.string().optional(),
  status: z.enum(["ATIVO", "INATIVO"]).optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

export type BuscaCategoriaVeiculo = z.infer<typeof buscaCategoriaVeiculoSchema>;

export interface CategoriaVeiculoListItem extends CategoriaVeiculo {
  id: string; // Garantir que id seja obrigatório na lista
  nome: string; // Garantir que nome seja obrigatório na lista
  descricao: string; // Garantir que descricao seja obrigatório na lista
  status: "ATIVO" | "INATIVO"; // Garantir que status seja obrigatório na lista
  dataCadastro?: string; // Manter dataCadastro opcional
  totalVeiculos?: number;
}

export interface ImportacaoCategoriaResult {
  sucesso: CategoriaVeiculo[];
  erros: {
    linha: number;
    erro: string;
  }[];
}