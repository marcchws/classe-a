export type {
  MarcaVeiculo,
  ModeloVeiculo,
  ItemManutencao,
  StatusMarcaModelo,
  TipoManutencao,
  BuscaMarcaModelo,
} from "@/lib/schemas";

export interface MarcaVeiculoFormData extends Omit<MarcaVeiculo, "id" | "dataCadastro"> {}

export interface ModeloVeiculoFormData extends Omit<ModeloVeiculo, "id" | "dataCadastro"> {}

export interface MarcaVeiculoListItem extends MarcaVeiculo {
  totalModelos?: number;
}

export interface ModeloVeiculoListItem extends ModeloVeiculo {
  marcaNome?: string;
  totalVeiculos?: number;
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