export type {
  CategoriaVeiculo,
  StatusCategoria,
  BuscaCategoriaVeiculo,
} from "@/lib/schemas";

export type CategoriaVeiculoFormData = Omit<CategoriaVeiculo, "id" | "dataCadastro">;

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