export type {
  TipoFornecedor,
  StatusFornecedor,
  CampoAtuacao,
  VeiculoUtilizado,
  ServicoPrestado,
  ProfissionalEquipe,
  DocumentoAnexo,
  OrdemServico,
  HistoricoPagamento,
  FornecedorVeiculo,
  FornecedorServico,
  Fornecedor,
  BuscaFornecedor,
} from "@/lib/schemas";

export interface FornecedorTableItem {
  id: string;
  tipo: "VEICULO" | "SERVICO";
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  contatoResponsavel: {
    nome: string;
    telefone: string;
    email: string;
  };
  status: "ATIVO" | "INATIVO";
  dataCadastro: string;
}

export interface FornecedorFilters {
  termo?: string;
  tipo?: "VEICULO" | "SERVICO";
  status?: "ATIVO" | "INATIVO";
  campoAtuacao?: string;
}

export type FornecedorFormData = {
  tipo: "VEICULO" | "SERVICO";
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  contatoResponsavel: {
    nome: string;
    telefone: string;
    email: string;
  };
  contatoFinanceiro: {
    nome: string;
    telefone: string;
    email: string;
  };
  enderecoCompleto: {
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    estado: string;
    cep: string;
  };
  status: "ATIVO" | "INATIVO";
  // Campos específicos para VEICULO
  veiculosUtilizados?: unknown[];
  valorRepasseNegociado?: number;
  // Campos específicos para SERVICO
  campoAtuacao?: string[];
  servicosPrestados?: unknown[];
  equipe?: unknown[];
};