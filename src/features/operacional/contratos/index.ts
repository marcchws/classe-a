// Components
export { ContratoForm } from "./components/contrato-form";
export { ContratosTable } from "./components/contratos-table";
export { ContratosFilters } from "./components/contratos-filters";
export { ConfiguracoesTaxasDialog } from "./components/configuracoes-taxas-dialog";
export { ContratoDetails } from "./components/contrato-details";

// Types
export type {
  TipoContrato,
  StatusContrato,
  TipoServico,
  TipoEnvioAssinatura,
  ConfiguracoesTaxas,
  Condutor,
  ServicoExtra,
  CalculoCombustivel,
  TermoResponsabilidade,
  CondicoesVeiculo,
  ChecklistDigital,
  ContratoLocacao,
  ContratoServico,
  ContratoEvento,
  ContratoTerceirizacao,
  Contrato,
  BuscaContrato,
  ContratoTableItem,
  ContratoFilters,
  CalculoDiariasParams,
  CalculoFinanceiroContrato,
} from "./types";

// Hooks
export {
  useCalculosDiarias,
  useCalculoCombustivel,
  useCalculoFinanceiro,
  useValidacaoContrato,
  useFormatacaoMoeda,
} from "./hooks/use-calculos-contrato";

export {
  useContratos,
  useContratoById,
  useContratoActions,
  useContratoEstatisticas,
} from "./hooks/use-contratos";

// Utils
export {
  usePDFGenerator,
  generateContractHTML,
  downloadContractPDF,
} from "./utils/pdf-generator";

// Schemas for validation
export {
  contratoSchema,
  contratoLocacaoSchema,
  contratoServicoSchema,
  contratoEventoSchema,
  contratoTerceirizacaoSchema,
  configuracoesTaxasSchema,
  buscaContratoSchema,
  tipoContratoEnum,
  statusContratoEnum,
  tipoServicoEnum,
  tipoEnvioAssinaturaEnum,
} from "./types";