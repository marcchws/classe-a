import type {
  Veiculo,
  TipoCombustivel,
  ModalidadeCompra,
  StatusVeiculo,
  Financiamento,
  Blindagem,
  ManutencaoVeiculo,
  BuscaVeiculo,
} from "@/lib/schemas";

export type {
  Veiculo,
  TipoCombustivel,
  ModalidadeCompra,
  StatusVeiculo,
  Financiamento,
  Blindagem,
  ManutencaoVeiculo,
  BuscaVeiculo,
};

export type VeiculoFormData = Omit<Veiculo, "id" | "dataCadastro">;

export interface VeiculoListItem extends Veiculo {
  categoriaNome?: string;
  marcaNome?: string;
  modeloNome?: string;
  proximaManutencao?: string;
  diasParaManutencao?: number;
}

export interface ImportacaoVeiculoResult {
  sucesso: Veiculo[];
  erros: {
    linha: number;
    erro: string;
  }[];
}