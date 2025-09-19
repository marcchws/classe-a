export type {
  CategoriaVeiculo,
  StatusCategoria,
  BuscaCategoriaVeiculo,
} from "@/lib/schemas";

export interface CategoriaVeiculoFormData extends Omit<CategoriaVeiculo, "id" | "dataCadastro"> {
  // Form-specific fields can be added here if needed
}

export interface CategoriaVeiculoListItem extends CategoriaVeiculo {
  totalVeiculos?: number;
}

export interface ImportacaoCategoriaResult {
  sucesso: CategoriaVeiculo[];
  erros: {
    linha: number;
    erro: string;
  }[];
}