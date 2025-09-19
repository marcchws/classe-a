import { z } from "zod";

// Schema de validacao para login
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail eh obrigatorio")
    .email("E-mail deve conter o simbolo @ e ser valido"),
  password: z
    .string()
    .min(8, "Senha deve ter no minimo 8 caracteres")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Senha deve conter letras, numeros e caracteres especiais"
    ),
});

// Schema de validacao para recuperacao de senha
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail eh obrigatorio")
    .email("E-mail deve conter o simbolo @ e ser valido"),
});

// Schema de validacao para nova senha
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Senha deve ter no minimo 8 caracteres")
    .regex(
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Senha deve conter letras, numeros e caracteres especiais"
    ),
  confirmPassword: z.string().min(1, "Confirmacao de senha eh obrigatoria"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas nao conferem",
  path: ["confirmPassword"],
});

// Schema de validacao para insights
export const insightSchema = z.object({
  titulo: z
    .string()
    .min(1, "Titulo eh obrigatorio")
    .max(100, "Titulo deve ter no maximo 100 caracteres"),
  descricao: z
    .string()
    .min(1, "Descricao eh obrigatoria")
    .max(1000, "Descricao deve ter no maximo 1000 caracteres"),
  publicoAlvo: z.enum(["Empresa toda", "Setor"], {
    required_error: "Publico-alvo eh obrigatorio",
  }),
  setor: z.string().optional(),
  imagem: z.string().url("URL da imagem deve ser valida").optional().or(z.literal("")),
  video: z.string().url("URL do video deve ser valida").optional().or(z.literal("")),
  linkExterno: z.string().url("Link externo deve ser valido").optional().or(z.literal("")),
  dataInicio: z.string().min(1, "Data de inicio eh obrigatoria"),
  dataTermino: z.string().optional().or(z.literal("")),
}).refine((data) => {
  if (data.publicoAlvo === "Setor" && !data.setor) {
    return false;
  }
  return true;
}, {
  message: "Setor eh obrigatorio quando publico-alvo for 'Setor'",
  path: ["setor"],
}).refine((data) => {
  if (data.dataTermino && data.dataInicio) {
    return new Date(data.dataTermino) > new Date(data.dataInicio);
  }
  return true;
}, {
  message: "Data de termino deve ser posterior a data de inicio",
  path: ["dataTermino"],
});

// Esquemas para clientes
export const tipoClienteEnum = z.enum(["PESSOA_FISICA", "PESSOA_JURIDICA", "PARCEIRO"], {
  required_error: "Tipo de cliente eh obrigatorio",
});

export const tipoParceiroEnum = z.enum([
  "AGENCIA_TURISMO",
  "HOTEL",
  "RESTAURANTE_LUXO",
  "EMPRESA_EVENTOS",
  "LOCADORA_PARCEIRA"
], {
  required_error: "Tipo de parceiro eh obrigatorio",
});

export const statusClienteEnum = z.enum(["ATIVO", "INATIVO", "INADIMPLENTE"], {
  required_error: "Status do cliente eh obrigatorio",
});

export const sexoEnum = z.enum(["MASCULINO", "FEMININO", "OUTRO"], {
  required_error: "Sexo eh obrigatorio",
});

export const nacionalidadeEnum = z.enum(["NACIONAL", "INTERNACIONAL"], {
  required_error: "Nacionalidade eh obrigatoria",
});

export const tipoHistoricoEnum = z.enum(["INDICACAO", "RELACIONAMENTO"], {
  required_error: "Tipo de historico eh obrigatorio",
});

// Schema base para endereco
export const enderecoSchema = z.object({
  logradouro: z.string().min(1, "Logradouro eh obrigatorio"),
  numero: z.string().min(1, "Numero eh obrigatorio"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro eh obrigatorio"),
  cidade: z.string().min(1, "Cidade eh obrigatoria"),
  estado: z.string().min(1, "Estado eh obrigatorio"),
  cep: z.string().regex(/^\d{5}-?\d{3}$/, "CEP deve estar no formato 00000-000"),
});

// Schema base para contato
export const contatoSchema = z.object({
  nome: z.string().min(1, "Nome eh obrigatorio"),
  telefone: z.string().min(1, "Telefone eh obrigatorio"),
  email: z.string().email("E-mail deve ser valido"),
});

// Schema para historico de negociacao (PF)
export const historicoNegociacaoSchema = z.object({
  margem: z.number().min(0, "Margem deve ser positiva"),
  data: z.string().min(1, "Data eh obrigatoria"),
  observacoes: z.string().optional(),
});

// Schema para tarifario especial (PJ)
export const tarifarioEspecialSchema = z.object({
  percentualBase: z.number().min(0, "Percentual base deve ser positivo"),
  percentuaisPontuais: z.array(z.object({
    percentual: z.number().min(0, "Percentual deve ser positivo"),
    descricao: z.string().min(1, "Descricao eh obrigatoria"),
    data: z.string().min(1, "Data eh obrigatoria"),
  })).optional(),
});

// Schema para historico de relacionamento (Parceiro)
export const historicoRelacionamentoSchema = z.object({
  tipo: tipoHistoricoEnum,
  data: z.string().min(1, "Data eh obrigatoria"),
  descricao: z.string().min(1, "Descricao eh obrigatoria"),
  indicado: z.string().optional(),
});

// Schema para Pessoa Fisica
export const pessoaFisicaSchema = z.object({
  tipo: z.literal("PESSOA_FISICA"),
  nacionalidade: nacionalidadeEnum,
  nomeCompleto: z.string().min(1, "Nome completo eh obrigatorio"),
  cpf: z.string().optional(),
  passaporte: z.string().optional(),
  pid: z.string().optional(),
  dataNascimento: z.string().min(1, "Data de nascimento eh obrigatoria"),
  profissao: z.string().min(1, "Profissao eh obrigatoria"),
  sexo: sexoEnum,
  telefone: z.string().min(1, "Telefone eh obrigatorio"),
  email: z.string().email("E-mail deve ser valido"),
  senha: z.string().min(8, "Senha deve ter no minimo 8 caracteres").optional(),
  endereco: enderecoSchema,
  status: statusClienteEnum.default("ATIVO"),
  historicoNegociacao: z.array(historicoNegociacaoSchema).optional(),
});

// Schema para Pessoa Juridica
export const pessoaJuridicaSchema = z.object({
  tipo: z.literal("PESSOA_JURIDICA"),
  razaoSocial: z.string().min(1, "Razao social eh obrigatoria"),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ deve estar no formato 00.000.000/0000-00"),
  segmentoAtuacao: z.string().min(1, "Segmento de atuacao eh obrigatorio"),
  contatoResponsavel: contatoSchema,
  contatoFinanceiro: contatoSchema,
  enderecoCompleto: enderecoSchema,
  tarifarioEspecial: tarifarioEspecialSchema.optional(),
  status: statusClienteEnum.default("ATIVO"),
});

// Schema para Parceiro
export const parceiroSchema = z.object({
  tipo: z.literal("PARCEIRO"),
  tipoParceiro: tipoParceiroEnum,
  razaoSocial: z.string().min(1, "Razao social eh obrigatoria"),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ deve estar no formato 00.000.000/0000-00"),
  contatoResponsavel: contatoSchema,
  contatoFinanceiro: contatoSchema,
  enderecoCompleto: enderecoSchema,
  historicoRelacionamento: z.array(historicoRelacionamentoSchema).optional(),
  status: statusClienteEnum.default("ATIVO"),
});

// Schema unificado para clientes
export const clienteSchema = z.discriminatedUnion("tipo", [
  pessoaFisicaSchema,
  pessoaJuridicaSchema,
  parceiroSchema,
]);

// Schema para busca/filtro de clientes
export const buscaClienteSchema = z.object({
  termo: z.string().optional(),
  tipo: tipoClienteEnum.optional(),
  status: statusClienteEnum.optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type InsightInput = z.infer<typeof insightSchema>;

export type TipoCliente = z.infer<typeof tipoClienteEnum>;
export type TipoParceiro = z.infer<typeof tipoParceiroEnum>;
export type StatusCliente = z.infer<typeof statusClienteEnum>;
export type Sexo = z.infer<typeof sexoEnum>;
export type Nacionalidade = z.infer<typeof nacionalidadeEnum>;
export type TipoHistorico = z.infer<typeof tipoHistoricoEnum>;

export type Endereco = z.infer<typeof enderecoSchema>;
export type Contato = z.infer<typeof contatoSchema>;
export type HistoricoNegociacao = z.infer<typeof historicoNegociacaoSchema>;
export type TarifarioEspecial = z.infer<typeof tarifarioEspecialSchema>;
export type HistoricoRelacionamento = z.infer<typeof historicoRelacionamentoSchema>;

export type PessoaFisica = z.infer<typeof pessoaFisicaSchema>;
export type PessoaJuridica = z.infer<typeof pessoaJuridicaSchema>;
export type Parceiro = z.infer<typeof parceiroSchema>;
export type Cliente = z.infer<typeof clienteSchema>;
export type BuscaCliente = z.infer<typeof buscaClienteSchema>;

// Schemas para Motorista
export const categoriaCnhEnum = z.enum(["B", "D"], {
  required_error: "Categoria da CNH eh obrigatoria",
});

export const idiomaEnum = z.enum(["PORTUGUES", "INGLES", "ESPANHOL", "FRANCES", "ITALIANO", "ALEMAO"], {
  required_error: "Pelo menos um idioma eh obrigatorio",
});

export const grupoPrioridadeEnum = z.enum(["PREFERENCIAL", "APOIO"], {
  required_error: "Grupo de prioridade eh obrigatorio",
});

export const statusMotoristaEnum = z.enum(["ATIVO", "INATIVO"], {
  required_error: "Status do motorista eh obrigatorio",
});

export const tipoDocumentoEnum = z.enum(["CNH", "ANTECEDENTES", "CERTIFICADO_DIRECAO_EXECUTIVA", "CERTIFICADO_TRANSPORTE_PASSAGEIROS"], {
  required_error: "Tipo de documento eh obrigatorio",
});

export const tipoNotaEnum = z.enum(["ELOGIO", "RECLAMACAO", "OBSERVACAO"], {
  required_error: "Tipo de nota eh obrigatorio",
});

// Schema para documento
export const documentoMotoristaSchema = z.object({
  tipo: tipoDocumentoEnum,
  url: z.string().url("URL do documento deve ser valida"),
  nome: z.string().min(1, "Nome do arquivo eh obrigatorio"),
  dataUpload: z.string().min(1, "Data de upload eh obrigatoria"),
});

// Schema para historico de servico
export const historicoServicoSchema = z.object({
  contratoId: z.string().min(1, "ID do contrato eh obrigatorio"),
  clienteNome: z.string().min(1, "Nome do cliente eh obrigatorio"),
  dataServico: z.string().min(1, "Data do servico eh obrigatoria"),
  valorRecebido: z.number().min(0, "Valor recebido deve ser positivo"),
  avaliacaoCliente: z.number().min(1).max(5).optional(),
  observacoes: z.string().optional(),
});

// Schema para nota interna
export const notaInternaSchema = z.object({
  tipo: tipoNotaEnum,
  data: z.string().min(1, "Data eh obrigatoria"),
  descricao: z.string().min(1, "Descricao eh obrigatoria"),
  autorNome: z.string().min(1, "Nome do autor eh obrigatorio"),
  clienteRelacionado: z.string().optional(),
});

// Schema para bloqueio por cliente
export const bloqueioClienteSchema = z.object({
  clienteId: z.string().min(1, "ID do cliente eh obrigatorio"),
  clienteNome: z.string().min(1, "Nome do cliente eh obrigatorio"),
  motivo: z.string().min(1, "Motivo do bloqueio eh obrigatorio"),
  dataBloqueio: z.string().min(1, "Data do bloqueio eh obrigatoria"),
  bloqueadoPorNome: z.string().min(1, "Nome de quem bloqueou eh obrigatorio"),
});

// Schema principal para motorista
export const motoristaSchema = z.object({
  id: z.string().optional(), // Gerado automaticamente
  nomeCompleto: z.string().min(1, "Nome completo eh obrigatorio"),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF deve estar no formato 000.000.000-00"),
  telefone: z.string().min(1, "Telefone eh obrigatorio"),
  endereco: enderecoSchema,
  cnh: z.object({
    numero: z.string().min(1, "Numero da CNH eh obrigatorio"),
    categoria: categoriaCnhEnum,
    dataValidade: z.string().min(1, "Data de validade da CNH eh obrigatoria"),
  }),
  documentos: z.array(documentoMotoristaSchema).min(3, "Eh obrigatorio anexar CNH, antecedentes criminais e certificados"),
  idiomasFluentes: z.array(idiomaEnum).min(1, "Pelo menos um idioma deve ser selecionado"),
  categoriaServico: z.array(z.enum(["ATE_8_PASSAGEIROS", "VANS", "MONOLINGUE", "BILINGUE"])).optional(), // Classificacao automatica
  grupoPrioridade: grupoPrioridadeEnum,
  regiaoAtendimento: z.object({
    cidade: z.string().min(1, "Cidade eh obrigatoria"),
    bairros: z.array(z.string()).min(1, "Pelo menos um bairro deve ser selecionado"),
  }),
  notasInternas: z.array(notaInternaSchema).optional(),
  bloqueiosPorCliente: z.array(bloqueioClienteSchema).optional(),
  historicoServicos: z.array(historicoServicoSchema).optional(),
  status: statusMotoristaEnum.default("ATIVO"),
  dataCadastro: z.string().optional(), // Gerada automaticamente
}).refine((data) => {
  // Validar se CNH esta nos documentos
  const temCnh = data.documentos.some(doc => doc.tipo === "CNH");
  const temAntecedentes = data.documentos.some(doc => doc.tipo === "ANTECEDENTES");
  const temCertificados = data.documentos.some(doc =>
    doc.tipo === "CERTIFICADO_DIRECAO_EXECUTIVA" || doc.tipo === "CERTIFICADO_TRANSPORTE_PASSAGEIROS"
  );

  return temCnh && temAntecedentes && temCertificados;
}, {
  message: "Eh obrigatorio anexar CNH, antecedentes criminais e pelo menos um certificado",
  path: ["documentos"],
}).refine((data) => {
  // Validar data de validade da CNH
  const hoje = new Date();
  const dataValidade = new Date(data.cnh.dataValidade);
  return dataValidade > hoje;
}, {
  message: "CNH deve estar dentro da validade",
  path: ["cnh", "dataValidade"],
});

// Schema para busca/filtro de motoristas
export const buscaMotoristaSchema = z.object({
  termo: z.string().optional(), // Busca por nome ou CPF
  categoria: categoriaCnhEnum.optional(),
  grupoPrioridade: grupoPrioridadeEnum.optional(),
  regiaoAtendimento: z.string().optional(),
  status: statusMotoristaEnum.optional(),
  idioma: idiomaEnum.optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

export type CategoriaCnh = z.infer<typeof categoriaCnhEnum>;
export type Idioma = z.infer<typeof idiomaEnum>;
export type GrupoPrioridade = z.infer<typeof grupoPrioridadeEnum>;
export type StatusMotorista = z.infer<typeof statusMotoristaEnum>;
export type TipoDocumento = z.infer<typeof tipoDocumentoEnum>;
export type TipoNota = z.infer<typeof tipoNotaEnum>;

export type DocumentoMotorista = z.infer<typeof documentoMotoristaSchema>;
export type HistoricoServico = z.infer<typeof historicoServicoSchema>;
export type NotaInterna = z.infer<typeof notaInternaSchema>;
export type BloqueioCliente = z.infer<typeof bloqueioClienteSchema>;
export type Motorista = z.infer<typeof motoristaSchema>;
export type BuscaMotorista = z.infer<typeof buscaMotoristaSchema>;