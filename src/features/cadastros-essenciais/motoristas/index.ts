// Componentes
export { DocumentUpload } from "./components/DocumentUpload";

// Serviços
export { MotoristaService } from "./services/motorista.service";

// Tipos e schemas (re-exportados do lib/schemas)
export type {
  Motorista,
  BuscaMotorista,
  DocumentoMotorista,
  NotaInterna,
  BloqueioCliente,
  HistoricoServico,
  StatusMotorista,
  CategoriaCnh,
  GrupoPrioridade,
  Idioma,
  TipoDocumento,
  TipoNota,
} from "@/lib/schemas";

export {
  motoristaSchema,
  buscaMotoristaSchema,
  statusMotoristaEnum,
  categoriaCnhEnum,
  grupoPrioridadeEnum,
  idiomaEnum,
  tipoDocumentoEnum,
  tipoNotaEnum,
} from "@/lib/schemas";