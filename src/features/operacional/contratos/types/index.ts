import { z } from "zod";

// Enums para Contratos
export const tipoContratoEnum = z.enum(["LOCACAO", "SERVICO", "EVENTO", "TERCEIRIZACAO"], {
  required_error: "Tipo de contrato eh obrigatorio",
});

export const statusContratoEnum = z.enum(["RASCUNHO", "PENDENTE_ASSINATURA", "ATIVO", "ENCERRADO"], {
  required_error: "Status do contrato eh obrigatorio",
});

export const tipoServicoEnum = z.enum(["TRANSFER", "DISPOSICAO_HORAS", "PACOTE_5H"], {
  required_error: "Tipo de servico eh obrigatorio",
});

export const tipoEnvioAssinaturaEnum = z.enum(["EMAIL", "WHATSAPP", "AMBOS"], {
  required_error: "Tipo de envio para assinatura eh obrigatorio",
});

// Schema para configurações de taxas padronizadas
export const configuracoesTaxasSchema = z.object({
  id: z.string().optional(),
  tabelaLavagem: z.array(z.object({
    categoria: z.string().min(1, "Categoria eh obrigatoria"),
    valor: z.number().min(0, "Valor deve ser positivo"),
  })),
  gasolina: z.object({
    valorPorLitro: z.number().min(0, "Valor por litro deve ser positivo"),
    taxaPercentual: z.number().min(0).max(100, "Taxa percentual deve estar entre 0 e 100"),
  }),
  cadeirinhasInfantis: z.array(z.object({
    tipo: z.string().min(1, "Tipo de cadeirinha eh obrigatorio"),
    valorDiario: z.number().min(0, "Valor diario deve ser positivo"),
  })),
  kmPadraoPorDia: z.number().min(0, "KM padrao por dia deve ser positivo"),
  valorKmAdicional: z.number().min(0, "Valor por KM adicional deve ser positivo"),
  horasCorteisiaDevolucao: z.number().min(0, "Horas de cortesia deve ser positivo"),
});

// Schema para condutor
export const condutorSchema = z.object({
  id: z.string().optional(),
  nomeCompleto: z.string().min(1, "Nome completo eh obrigatorio"),
  cpf: z.string().optional(),
  passaporte: z.string().optional(),
  cnh: z.string().optional(),
  comprovantesResidencia: z.array(z.string()).optional(),
  ehLocatario: z.boolean(),
  ehInternacional: z.boolean(),
});

// Schema para serviços extras
export const servicoExtraSchema = z.object({
  id: z.string().optional(),
  tipo: z.enum([
    "LEVA_E_TRAZ",
    "COMBUSTIVEL",
    "SEM_PARAR",
    "LAVAGEM",
    "KM_ADICIONAL",
    "CADEIRINHA_INFANTIL",
    "HORAS_EXTRAS"
  ]),
  descricao: z.string().min(1, "Descricao eh obrigatoria"),
  valor: z.number().min(0, "Valor deve ser positivo"),
  quantidade: z.number().min(1, "Quantidade deve ser positiva"),
  observacoes: z.string().optional(),
});

// Schema para cálculo de combustível
export const calculoCombustivelSchema = z.object({
  marcacaoRetirada: z.number().min(1).max(8, "Marcacao deve estar entre 1/8 e 8/8"),
  marcacaoDevolucao: z.number().min(1).max(8, "Marcacao deve estar entre 1/8 e 8/8"),
  capacidadeTanque: z.number().min(0, "Capacidade do tanque deve ser positiva"),
  valorGasolinaPorLitro: z.number().min(0, "Valor da gasolina deve ser positivo"),
  taxaPercentual: z.number().min(0).max(100, "Taxa percentual deve estar entre 0 e 100"),
  valorCalculado: z.number().min(0, "Valor calculado deve ser positivo").optional(),
});

// Schema para termos de responsabilidade
export const termoResponsabilidadeSchema = z.object({
  id: z.string().optional(),
  tipo: z.enum(["LOCATARIO", "CONDUTOR"]),
  nomeResponsavel: z.string().min(1, "Nome do responsavel eh obrigatorio"),
  dataAssinatura: z.string().optional(),
  assinaturaDigital: z.boolean(),
  urlDocumento: z.string().optional(),
  status: z.enum(["PENDENTE", "ASSINADO"]),
});

// Schema para condições do veículo
export const condicoesVeiculoSchema = z.object({
  kmRetirada: z.number().min(0, "KM de retirada deve ser positivo"),
  kmDevolucao: z.number().min(0, "KM de devolucao deve ser positivo").optional(),
  combustivelRetirada: z.number().min(1).max(8, "Combustivel de retirada deve estar entre 1/8 e 8/8"),
  combustivelDevolucao: z.number().min(1).max(8, "Combustivel de devolucao deve estar entre 1/8 e 8/8").optional(),
  observacoesRetirada: z.string().optional(),
  observacoesDevolucao: z.string().optional(),
  fotosRetirada: z.array(z.string()).optional(),
  fotosDevolucao: z.array(z.string()).optional(),
});

// Schema para checklist digital
export const checklistDigitalSchema = z.object({
  id: z.string().optional(),
  motoristaId: z.string().min(1, "Motorista eh obrigatorio"),
  tipoChecklist: z.enum(["RETIRADA", "DEVOLUCAO"]),
  dataHora: z.string().min(1, "Data e hora sao obrigatorias"),
  itensChecklist: z.array(z.object({
    item: z.string().min(1, "Item eh obrigatorio"),
    status: z.enum(["OK", "PROBLEMA", "NAO_APLICAVEL"]),
    observacoes: z.string().optional(),
    foto: z.string().optional(),
  })),
  assinaturaMotorista: z.string().optional(),
  enviado: z.boolean(),
  emailEnviado: z.string().optional(),
});

// Schema base para contrato
const contratoBaseSchemaRaw = z.object({
  id: z.string().optional(),
  clienteId: z.string().min(1, "Cliente eh obrigatorio"),
  locatario: z.object({
    nome: z.string().min(1, "Nome do locatario eh obrigatorio"),
    documento: z.string().min(1, "Documento do locatario eh obrigatorio"),
    telefone: z.string().min(1, "Telefone do locatario eh obrigatorio"),
    email: z.string().email("Email do locatario deve ser valido"),
  }),
  veiculoId: z.string().optional(),
  veiculoTerceirizado: z.object({
    fornecedorId: z.string().min(1, "Fornecedor eh obrigatorio"),
    placa: z.string().min(1, "Placa eh obrigatoria"),
    modelo: z.string().min(1, "Modelo eh obrigatorio"),
  }).optional(),
  condutores: z.array(condutorSchema).optional(),
  dataHoraInicio: z.string().min(1, "Data e hora de inicio sao obrigatorias"),
  dataHoraFim: z.string().min(1, "Data e hora de fim sao obrigatorias"),
  servicosExtras: z.array(servicoExtraSchema).optional(),
  termos: z.array(termoResponsabilidadeSchema).optional(),
  valorContrato: z.number().min(0, "Valor do contrato deve ser positivo"),
  condicoesVeiculo: condicoesVeiculoSchema.optional(),
  checklistDigital: z.array(checklistDigitalSchema).optional(),
  status: statusContratoEnum,
  enviarAssinaturaAutomatica: z.boolean(),
  tipoEnvioAssinatura: tipoEnvioAssinaturaEnum.optional(),
  observacoes: z.string().optional(),
  dataCriacao: z.string().optional(),
  dataAtualizacao: z.string().optional(),
});

// Schema base com validações
export const contratoBaseSchema = contratoBaseSchemaRaw.refine((data) => {
  const inicio = new Date(data.dataHoraInicio);
  const fim = new Date(data.dataHoraFim);
  return fim > inicio;
}, {
  message: "Data de fim deve ser posterior a data de inicio",
  path: ["dataHoraFim"],
});

// Schema específico para contrato de locação
export const contratoLocacaoSchema = contratoBaseSchemaRaw.extend({
  tipo: z.literal("LOCACAO"),
  temMotorista: z.boolean(),
  motoristaId: z.string().optional(),
  diariasCalculadas: z.number().min(1, "Numero de diarias deve ser positivo"),
  calculoCombustivel: calculoCombustivelSchema.optional(),
}).refine((data) => {
  if (data.temMotorista && !data.motoristaId) {
    return false;
  }
  return true;
}, {
  message: "Motorista eh obrigatorio quando locacao tem motorista",
  path: ["motoristaId"],
});

// Schema específico para contrato de serviço
export const contratoServicoSchema = contratoBaseSchemaRaw.extend({
  tipo: z.literal("SERVICO"),
  tipoServico: tipoServicoEnum,
  motoristaId: z.string().min(1, "Motorista eh obrigatorio para contratos de servico"),
  passageiro: z.string().min(1, "Nome do passageiro eh obrigatorio"),
  numeroVoo: z.string().optional(),
  localAtendimento: z.string().min(1, "Local de atendimento eh obrigatorio"),
  dadosViagem: z.object({
    origem: z.string().optional(),
    destino: z.string().optional(),
    observacoes: z.string().optional(),
  }).optional(),
});

// Schema específico para contrato de evento
export const contratoEventoSchema = contratoBaseSchemaRaw.extend({
  tipo: z.literal("EVENTO"),
  motoristaId: z.string().min(1, "Motorista eh obrigatorio para contratos de evento"),
  localEvento: z.string().min(1, "Local do evento eh obrigatorio"),
  responsavelEvento: z.string().min(1, "Responsavel pelo evento eh obrigatorio"),
  numeroConvidados: z.number().min(1, "Numero de convidados deve ser positivo"),
});

// Schema específico para contrato de terceirização
export const contratoTerceirizacaoSchema = contratoBaseSchemaRaw.extend({
  tipo: z.literal("TERCEIRIZACAO"),
  veiculoTerceirizado: z.object({
    fornecedorId: z.string().min(1, "Fornecedor eh obrigatorio"),
    placa: z.string().min(1, "Placa eh obrigatoria"),
    modelo: z.string().min(1, "Modelo eh obrigatorio"),
    valorRepasse: z.number().min(0, "Valor de repasse deve ser positivo"),
  }),
});

// Schema unificado para contratos
export const contratoSchema = z.union([
  contratoLocacaoSchema,
  contratoServicoSchema,
  contratoEventoSchema,
  contratoTerceirizacaoSchema,
]);

// Schema para busca/filtro de contratos
export const buscaContratoSchema = z.object({
  termo: z.string().optional(),
  tipo: tipoContratoEnum.optional(),
  status: statusContratoEnum.optional(),
  clienteId: z.string().optional(),
  motoristaId: z.string().optional(),
  veiculoId: z.string().optional(),
  dataInicio: z.string().optional(),
  dataFim: z.string().optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

// Types exportados
export type TipoContrato = z.infer<typeof tipoContratoEnum>;
export type StatusContrato = z.infer<typeof statusContratoEnum>;
export type TipoServico = z.infer<typeof tipoServicoEnum>;
export type TipoEnvioAssinatura = z.infer<typeof tipoEnvioAssinaturaEnum>;

export type ConfiguracoesTaxas = z.infer<typeof configuracoesTaxasSchema>;
export type Condutor = z.infer<typeof condutorSchema>;
export type ServicoExtra = z.infer<typeof servicoExtraSchema>;
export type CalculoCombustivel = z.infer<typeof calculoCombustivelSchema>;
export type TermoResponsabilidade = z.infer<typeof termoResponsabilidadeSchema>;
export type CondicoesVeiculo = z.infer<typeof condicoesVeiculoSchema>;
export type ChecklistDigital = z.infer<typeof checklistDigitalSchema>;

export type ContratoLocacao = z.infer<typeof contratoLocacaoSchema>;
export type ContratoServico = z.infer<typeof contratoServicoSchema>;
export type ContratoEvento = z.infer<typeof contratoEventoSchema>;
export type ContratoTerceirizacao = z.infer<typeof contratoTerceirizacaoSchema>;
export type Contrato = z.infer<typeof contratoSchema>;
export type BuscaContrato = z.infer<typeof buscaContratoSchema>;

// Interfaces para tabelas e componentes
export interface ContratoTableItem {
  id: string;
  tipo: TipoContrato;
  clienteNome: string;
  locatarioNome: string;
  veiculoInfo: string;
  motoristaInfo?: string;
  dataInicio: string;
  dataFim: string;
  valor: number;
  status: StatusContrato;
  dataCriacao: string;
}

export interface ContratoFilters {
  termo?: string;
  tipo?: TipoContrato;
  status?: StatusContrato;
  dataInicio?: string;
  dataFim?: string;
}

export interface CalculoDiariasParams {
  dataInicio: string;
  dataFim: string;
  horasCorteisia?: number;
}

export interface CalculoFinanceiroContrato {
  valorBase: number;
  servicosExtras: number;
  combustivel?: number;
  taxas: number;
  descontos: number;
  total: number;
  repasse?: number; // Para terceirização
}