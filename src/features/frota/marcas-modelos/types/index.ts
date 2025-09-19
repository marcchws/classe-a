import { z } from "zod";

// Definir os schemas localmente para evitar problemas de importação
const marcaVeiculoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome da marca eh obrigatorio"),
  observacao: z.string().optional(),
  status: z.enum(["ATIVO", "INATIVO"]).default("ATIVO"),
  dataCadastro: z.string().optional(),
});

const modeloVeiculoSchema = z.object({
  id: z.string().optional(),
  marcaId: z.string().min(1, "Marca eh obrigatoria"),
  nome: z.string().min(1, "Nome do modelo eh obrigatorio"),
  observacao: z.string().optional(),
  status: z.enum(["ATIVO", "INATIVO"]).default("ATIVO"),
  dataCadastro: z.string().optional(),
});

export type MarcaVeiculo = z.infer<typeof marcaVeiculoSchema>;
export type ModeloVeiculo = z.infer<typeof modeloVeiculoSchema>;
export type MarcaVeiculoFormData = Omit<MarcaVeiculo, "id" | "dataCadastro">;
export type ModeloVeiculoFormData = Omit<ModeloVeiculo, "id" | "dataCadastro">;

// Schema para busca/filtro de marcas e modelos
const buscaMarcaModeloSchema = z.object({
  termo: z.string().optional(),
  status: z.enum(["ATIVO", "INATIVO"]).optional(),
  marcaId: z.string().optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

export type BuscaMarcaModelo = z.infer<typeof buscaMarcaModeloSchema>;

// Schema para item de manutenção
const itemManutencaoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome do item eh obrigatorio"),
  tipo: z.enum(["QUILOMETRAGEM", "TEMPO"]),
  valor: z.number().min(1, "Valor deve ser positivo"),
  descricao: z.string().optional(),
});

export type ItemManutencao = z.infer<typeof itemManutencaoSchema>;

export interface MarcaVeiculoListItem extends MarcaVeiculo {
  id: string; // Garantir que id seja obrigatório na lista
  nome: string; // Garantir que nome seja obrigatório na lista
  observacao?: string;
  status: "ATIVO" | "INATIVO"; // Garantir que status seja obrigatório na lista
  dataCadastro?: string;
  totalModelos?: number;
}

export interface ModeloVeiculoListItem extends ModeloVeiculo {
  id: string; // Garantir que id seja obrigatório na lista
  marcaId: string; // Garantir que marcaId seja obrigatório na lista
  nome: string; // Garantir que nome seja obrigatório na lista
  observacao?: string;
  status: "ATIVO" | "INATIVO"; // Garantir que status seja obrigatório na lista
  dataCadastro?: string;
  marcaNome?: string;
  totalVeiculos?: number;
  itensManutencao?: ItemManutencao[]; // Adicionar propriedade de itens de manutenção
}

export interface ImportacaoMarcaModeloResult {
  sucesso: {
    marcas: MarcaVeiculo[];
    modelos: ModeloVeiculo[];
  };
  erros: {
    linha: number;
    erro: string;
  }[];
}