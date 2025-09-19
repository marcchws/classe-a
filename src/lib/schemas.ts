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

// Schemas para Fornecedores
export const tipoFornecedorEnum = z.enum(["VEICULO", "SERVICO"], {
  required_error: "Tipo de fornecedor eh obrigatorio",
});

export const statusFornecedorEnum = z.enum(["ATIVO", "INATIVO"], {
  required_error: "Status do fornecedor eh obrigatorio",
});

export const campoAtuacaoEnum = z.enum([
  "MECANICA",
  "FUNILARIA",
  "PINTURA",
  "HIGIENIZACAO_LIMPEZA",
  "SEGURADORA",
  "ELETRICA",
  "AR_CONDICIONADO",
  "PNEUS_RODAS",
  "VIDRACARIA",
  "OUTROS"
], {
  required_error: "Campo de atuacao eh obrigatorio",
});

// Schema para veiculo utilizado anteriormente
export const veiculoUtilizadoSchema = z.object({
  marca: z.string().min(1, "Marca eh obrigatoria"),
  modelo: z.string().min(1, "Modelo eh obrigatorio"),
  categoria: z.string().min(1, "Categoria eh obrigatoria"),
  placa: z.string().regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, "Placa deve estar no formato ABC-1234 ou ABC1D23"),
  cor: z.string().min(1, "Cor eh obrigatoria"),
  pax: z.number().min(1, "Numero de passageiros deve ser positivo"),
  blindagem: z.boolean().default(false),
  acessorios: z.array(z.string()).optional(),
  valorNegociado: z.number().min(0, "Valor negociado deve ser positivo"),
  periodo: z.string().min(1, "Periodo eh obrigatorio"),
});

// Schema para servico prestado
export const servicoPrestadoSchema = z.object({
  descricao: z.string().min(1, "Descricao do servico eh obrigatoria"),
  valorMedio: z.number().min(0, "Valor medio deve ser positivo").optional(),
  observacoes: z.string().optional(),
});

// Schema para profissional da equipe
export const profissionalEquipeSchema = z.object({
  nome: z.string().min(1, "Nome eh obrigatorio"),
  especialidade: z.string().min(1, "Especialidade eh obrigatoria"),
  telefone: z.string().min(1, "Telefone eh obrigatorio"),
  email: z.string().email("E-mail deve ser valido").optional(),
});

// Schema para documento anexo
export const documentoAnexoSchema = z.object({
  tipo: z.enum(["NOTA_FISCAL", "CONTRATO", "CERTIFICADO", "OUTROS"], {
    required_error: "Tipo do documento eh obrigatorio",
  }),
  nome: z.string().min(1, "Nome do arquivo eh obrigatorio"),
  url: z.string().url("URL do documento deve ser valida"),
  dataUpload: z.string().min(1, "Data de upload eh obrigatoria"),
});

// Schema para ordem de servico
export const ordemServicoSchema = z.object({
  id: z.string().optional(), // Gerado automaticamente
  numero: z.string().min(1, "Numero da OS eh obrigatorio"),
  data: z.string().min(1, "Data eh obrigatoria"),
  descricao: z.string().min(1, "Descricao eh obrigatoria"),
  valor: z.number().min(0, "Valor deve ser positivo"),
  status: z.enum(["PENDENTE", "EM_ANDAMENTO", "CONCLUIDA", "CANCELADA"]).default("PENDENTE"),
  observacoes: z.string().optional(),
});

// Schema para historico de pagamentos
export const historicoPagamentoSchema = z.object({
  ordemServicoId: z.string().min(1, "ID da OS eh obrigatorio"),
  valor: z.number().min(0, "Valor deve ser positivo"),
  dataPagamento: z.string().min(1, "Data de pagamento eh obrigatoria"),
  formaPagamento: z.string().min(1, "Forma de pagamento eh obrigatoria"),
  comprovante: z.string().url("URL do comprovante deve ser valida").optional(),
});

// Schema para fornecedor de veiculo
export const fornecedorVeiculoSchema = z.object({
  tipo: z.literal("VEICULO"),
  razaoSocial: z.string().min(1, "Razao social eh obrigatoria"),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ deve estar no formato 00.000.000/0000-00"),
  contatoResponsavel: contatoSchema,
  contatoFinanceiro: contatoSchema,
  enderecoCompleto: enderecoSchema,
  veiculosUtilizados: z.array(veiculoUtilizadoSchema).optional(),
  valorRepasseNegociado: z.number().min(0, "Valor de repasse deve ser positivo").optional(),
  historicoPagamentos: z.array(historicoPagamentoSchema).optional(),
  documentosAnexos: z.array(documentoAnexoSchema).optional(),
  ordensServico: z.array(ordemServicoSchema).optional(),
  status: statusFornecedorEnum.default("ATIVO"),
  dataCadastro: z.string().optional(), // Gerada automaticamente
});

// Schema para fornecedor de servico
export const fornecedorServicoSchema = z.object({
  tipo: z.literal("SERVICO"),
  razaoSocial: z.string().min(1, "Razao social eh obrigatoria"),
  nomeFantasia: z.string().optional(),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, "CNPJ deve estar no formato 00.000.000/0000-00"),
  contatoResponsavel: contatoSchema,
  contatoFinanceiro: contatoSchema,
  enderecoCompleto: enderecoSchema,
  campoAtuacao: z.array(campoAtuacaoEnum).min(1, "Pelo menos um campo de atuacao deve ser selecionado"),
  servicosPrestados: z.array(servicoPrestadoSchema).optional(),
  equipe: z.array(profissionalEquipeSchema).optional(),
  documentosAnexos: z.array(documentoAnexoSchema).optional(),
  ordensServico: z.array(ordemServicoSchema).optional(),
  status: statusFornecedorEnum.default("ATIVO"),
  dataCadastro: z.string().optional(), // Gerada automaticamente
});

// Schema unificado para fornecedores
export const fornecedorSchema = z.discriminatedUnion("tipo", [
  fornecedorVeiculoSchema,
  fornecedorServicoSchema,
]);

// Schema para busca/filtro de fornecedores
export const buscaFornecedorSchema = z.object({
  termo: z.string().optional(), // Busca por nome ou CNPJ
  tipo: tipoFornecedorEnum.optional(),
  status: statusFornecedorEnum.optional(),
  campoAtuacao: campoAtuacaoEnum.optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

export type TipoFornecedor = z.infer<typeof tipoFornecedorEnum>;
export type StatusFornecedor = z.infer<typeof statusFornecedorEnum>;
export type CampoAtuacao = z.infer<typeof campoAtuacaoEnum>;

export type VeiculoUtilizado = z.infer<typeof veiculoUtilizadoSchema>;
export type ServicoPrestado = z.infer<typeof servicoPrestadoSchema>;
export type ProfissionalEquipe = z.infer<typeof profissionalEquipeSchema>;
export type DocumentoAnexo = z.infer<typeof documentoAnexoSchema>;
export type OrdemServico = z.infer<typeof ordemServicoSchema>;
export type HistoricoPagamento = z.infer<typeof historicoPagamentoSchema>;

export type FornecedorVeiculo = z.infer<typeof fornecedorVeiculoSchema>;
export type FornecedorServico = z.infer<typeof fornecedorServicoSchema>;
export type Fornecedor = z.infer<typeof fornecedorSchema>;
export type BuscaFornecedor = z.infer<typeof buscaFornecedorSchema>;

// Schemas para Frota (Veículos)

// Enums para Categorias de Veículos
export const statusCategoriaEnum = z.enum(["ATIVO", "INATIVO"], {
  required_error: "Status da categoria eh obrigatorio",
});

// Schema para Categoria de Veículo
export const categoriaVeiculoSchema = z.object({
  id: z.string().optional(), // Gerado automaticamente
  nome: z.string().min(1, "Nome da categoria eh obrigatorio"),
  descricao: z.string().min(1, "Descricao da categoria eh obrigatoria"),
  status: statusCategoriaEnum.default("ATIVO"),
  dataCadastro: z.string().optional(), // Gerada automaticamente
});

// Schema para busca/filtro de categorias
export const buscaCategoriaVeiculoSchema = z.object({
  termo: z.string().optional(), // Busca por nome
  status: statusCategoriaEnum.optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

// Enums para Marca/Modelo
export const statusMarcaModeloEnum = z.enum(["ATIVO", "INATIVO"], {
  required_error: "Status da marca/modelo eh obrigatorio",
});

export const tipoManutencaoEnum = z.enum(["QUILOMETRAGEM", "TEMPO"], {
  required_error: "Tipo de manutencao eh obrigatorio",
});

// Schema para item de manutenção
export const itemManutencaoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(1, "Nome do item eh obrigatorio"),
  tipo: tipoManutencaoEnum,
  valor: z.number().min(1, "Valor deve ser positivo"), // KM ou meses
  descricao: z.string().optional(),
});

// Schema para Marca de Veículo
export const marcaVeiculoSchema = z.object({
  id: z.string().optional(), // Gerado automaticamente
  nome: z.string().min(1, "Nome da marca eh obrigatorio"),
  observacao: z.string().optional(),
  status: statusMarcaModeloEnum.default("ATIVO"),
  dataCadastro: z.string().optional(), // Gerada automaticamente
});

// Schema para Modelo de Veículo
export const modeloVeiculoSchema = z.object({
  id: z.string().optional(), // Gerado automaticamente
  marcaId: z.string().min(1, "Marca eh obrigatoria"),
  nome: z.string().min(1, "Nome do modelo eh obrigatorio"),
  observacao: z.string().optional(),
  itensManutencao: z.array(itemManutencaoSchema).optional(),
  status: statusMarcaModeloEnum.default("ATIVO"),
  dataCadastro: z.string().optional(), // Gerada automaticamente
});

// Schema para busca/filtro de marcas e modelos
export const buscaMarcaModeloSchema = z.object({
  termo: z.string().optional(), // Busca por nome da marca ou modelo
  marcaId: z.string().optional(),
  status: statusMarcaModeloEnum.optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

// Enums para Veículos
export const tipoCombustivelEnum = z.enum(["GASOLINA", "ETANOL", "DIESEL", "HIBRIDO", "ELETRICO"], {
  required_error: "Tipo de combustivel eh obrigatorio",
});

export const modalidadeCompraEnum = z.enum(["A_VISTA", "FINANCIAMENTO", "LEASING", "CONSORCIO"], {
  required_error: "Modalidade de compra eh obrigatoria",
});

export const statusVeiculoEnum = z.enum(["DISPONIVEL", "ALUGADO", "MANUTENCAO", "INDISPONIVEL"], {
  required_error: "Status do veiculo eh obrigatorio",
});

// Schema para dados de financiamento
export const financiamentoSchema = z.object({
  numeroParcelas: z.number().min(1, "Numero de parcelas deve ser positivo"),
  taxaJuros: z.number().min(0, "Taxa de juros deve ser positiva"),
  valorTotalComJuros: z.number().min(0, "Valor total com juros deve ser positivo"),
  parcelasPagas: z.number().min(0, "Parcelas pagas deve ser positivo").default(0),
  parcelasPendentes: z.number().min(0, "Parcelas pendentes deve ser positivo"),
}).refine((data) => {
  return data.parcelasPagas <= data.numeroParcelas;
}, {
  message: "Parcelas pagas nao pode ser maior que o total de parcelas",
  path: ["parcelasPagas"],
}).refine((data) => {
  return data.parcelasPagas + data.parcelasPendentes === data.numeroParcelas;
}, {
  message: "Soma de parcelas pagas e pendentes deve ser igual ao total",
  path: ["parcelasPendentes"],
});

// Schema para dados de blindagem
export const blindagemSchema = z.object({
  temBlindagem: z.boolean().default(false),
  valor: z.number().min(0, "Valor da blindagem deve ser positivo").optional(),
  parcelado: z.boolean().default(false),
  numeroParcelas: z.number().min(1, "Numero de parcelas deve ser positivo").optional(),
}).refine((data) => {
  if (data.temBlindagem && !data.valor) {
    return false;
  }
  return true;
}, {
  message: "Valor da blindagem eh obrigatorio quando veiculo eh blindado",
  path: ["valor"],
}).refine((data) => {
  if (data.parcelado && !data.numeroParcelas) {
    return false;
  }
  return true;
}, {
  message: "Numero de parcelas eh obrigatorio quando blindagem eh parcelada",
  path: ["numeroParcelas"],
});

// Schema para item de manutenção do veículo
export const manutencaoVeiculoSchema = z.object({
  id: z.string().optional(),
  itemManutencaoId: z.string().min(1, "Item de manutencao eh obrigatorio"),
  proximaManutencaoKm: z.number().min(0, "Proxima manutencao por KM deve ser positiva").optional(),
  proximaManutencaoData: z.string().optional(),
  descricao: z.string().optional(),
});

// Schema principal para Veículo
export const veiculoSchema = z.object({
  id: z.string().optional(), // Gerado automaticamente
  categoriaId: z.string().min(1, "Categoria do veiculo eh obrigatoria"),
  marcaId: z.string().min(1, "Marca do veiculo eh obrigatoria"),
  modeloId: z.string().min(1, "Modelo do veiculo eh obrigatorio"),
  versao: z.string().min(1, "Versao do veiculo eh obrigatoria"),
  tipoCombustivel: tipoCombustivelEnum,
  cor: z.string().min(1, "Cor do veiculo eh obrigatoria"),
  capacidadePassageiros: z.number().min(1, "Capacidade de passageiros deve ser positiva"),
  placa: z.string().regex(/^[A-Z]{3}-?\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/, "Placa deve estar no formato ABC-1234 ou ABC1D23").optional(),
  blindagem: blindagemSchema,
  transformacoesEspeciais: z.string().optional(),
  outrosAcessorios: z.array(z.string()).optional(),
  entrada: z.number().min(0, "Valor de entrada deve ser positivo"),
  valorTotalCompra: z.number().min(0, "Valor total de compra deve ser positivo"),
  modalidadeCompra: modalidadeCompraEnum,
  financiamento: financiamentoSchema.optional(),
  kmAtual: z.number().min(0, "KM atual deve ser positivo"),
  capacidadeTanque: z.number().min(0, "Capacidade do tanque deve ser positiva"),
  detalhesManutencao: z.array(manutencaoVeiculoSchema).optional(),
  status: statusVeiculoEnum.default("DISPONIVEL"),
  dataCadastro: z.string().optional(), // Gerada automaticamente
}).refine((data) => {
  if (data.modalidadeCompra === "FINANCIAMENTO" && !data.financiamento) {
    return false;
  }
  return true;
}, {
  message: "Dados de financiamento sao obrigatorios quando modalidade eh financiamento",
  path: ["financiamento"],
}).refine((data) => {
  if (data.entrada > data.valorTotalCompra) {
    return false;
  }
  return true;
}, {
  message: "Valor de entrada nao pode ser maior que o valor total",
  path: ["entrada"],
});

// Schema para busca/filtro de veículos
export const buscaVeiculoSchema = z.object({
  termo: z.string().optional(), // Busca por placa, modelo, marca
  categoriaId: z.string().optional(),
  marcaId: z.string().optional(),
  modeloId: z.string().optional(),
  tipoCombustivel: tipoCombustivelEnum.optional(),
  status: statusVeiculoEnum.optional(),
  temBlindagem: z.boolean().optional(),
  pagina: z.number().min(1).default(1),
  limite: z.number().min(1).max(100).default(10),
});

// Types exportados
export type StatusCategoria = z.infer<typeof statusCategoriaEnum>;
export type CategoriaVeiculo = z.infer<typeof categoriaVeiculoSchema>;
export type BuscaCategoriaVeiculo = z.infer<typeof buscaCategoriaVeiculoSchema>;

export type StatusMarcaModelo = z.infer<typeof statusMarcaModeloEnum>;
export type TipoManutencao = z.infer<typeof tipoManutencaoEnum>;
export type ItemManutencao = z.infer<typeof itemManutencaoSchema>;
export type MarcaVeiculo = z.infer<typeof marcaVeiculoSchema>;
export type ModeloVeiculo = z.infer<typeof modeloVeiculoSchema>;
export type BuscaMarcaModelo = z.infer<typeof buscaMarcaModeloSchema>;

export type TipoCombustivel = z.infer<typeof tipoCombustivelEnum>;
export type ModalidadeCompra = z.infer<typeof modalidadeCompraEnum>;
export type StatusVeiculo = z.infer<typeof statusVeiculoEnum>;
export type Financiamento = z.infer<typeof financiamentoSchema>;
export type Blindagem = z.infer<typeof blindagemSchema>;
export type ManutencaoVeiculo = z.infer<typeof manutencaoVeiculoSchema>;
export type Veiculo = z.infer<typeof veiculoSchema>;
export type BuscaVeiculo = z.infer<typeof buscaVeiculoSchema>;