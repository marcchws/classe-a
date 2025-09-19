import { Department, Position } from "../types"

export const departments: Department[] = [
  {
    id: "operacional",
    name: "Operacional",
    description: "Setor responsável pelas operações diárias"
  },
  {
    id: "financeiro",
    name: "Financeiro",
    description: "Setor responsável pela gestão financeira"
  },
  {
    id: "administrativo",
    name: "Administrativo",
    description: "Setor de administração e recursos humanos"
  },
  {
    id: "manutencao",
    name: "Manutenção",
    description: "Setor de manutenção de frota"
  },
  {
    id: "vendas",
    name: "Vendas",
    description: "Setor de vendas e relacionamento com clientes"
  },
  {
    id: "ti",
    name: "Tecnologia da Informação",
    description: "Setor de tecnologia e sistemas"
  }
]

export const positions: Position[] = [
  // Operacional
  {
    id: "gerente-operacional",
    name: "Gerente Operacional",
    description: "Responsável por supervisionar as operações diárias",
    departmentId: "operacional"
  },
  {
    id: "coordenador-frota",
    name: "Coordenador de Frota",
    description: "Coordena a gestão e manutenção da frota",
    departmentId: "operacional"
  },
  {
    id: "despachante",
    name: "Despachante",
    description: "Responsável pelo despacho de veículos e motoristas",
    departmentId: "operacional"
  },
  {
    id: "motorista",
    name: "Motorista",
    description: "Conduz veículos executivos e blindados",
    departmentId: "operacional"
  },

  // Financeiro
  {
    id: "gerente-financeiro",
    name: "Gerente Financeiro",
    description: "Responsável pela gestão financeira da empresa",
    departmentId: "financeiro"
  },
  {
    id: "analista-financeiro",
    name: "Analista Financeiro",
    description: "Analisa fluxo de caixa e contas a pagar/receber",
    departmentId: "financeiro"
  },
  {
    id: "assistente-financeiro",
    name: "Assistente Financeiro",
    description: "Auxilia nas operações financeiras diárias",
    departmentId: "financeiro"
  },

  // Administrativo
  {
    id: "gerente-administrativo",
    name: "Gerente Administrativo",
    description: "Responsável pela administração geral",
    departmentId: "administrativo"
  },
  {
    id: "analista-rh",
    name: "Analista de RH",
    description: "Gestão de recursos humanos e folha de pagamento",
    departmentId: "administrativo"
  },
  {
    id: "assistente-administrativo",
    name: "Assistente Administrativo",
    description: "Suporte administrativo geral",
    departmentId: "administrativo"
  },
  {
    id: "recepcionista",
    name: "Recepcionista",
    description: "Atendimento ao cliente e telefone",
    departmentId: "administrativo"
  },

  // Manutenção
  {
    id: "supervisor-manutencao",
    name: "Supervisor de Manutenção",
    description: "Supervisiona a manutenção da frota",
    departmentId: "manutencao"
  },
  {
    id: "mecanico",
    name: "Mecânico",
    description: "Realiza manutenções preventivas e corretivas",
    departmentId: "manutencao"
  },
  {
    id: "auxiliar-manutencao",
    name: "Auxiliar de Manutenção",
    description: "Auxilia nas atividades de manutenção",
    departmentId: "manutencao"
  },

  // Vendas
  {
    id: "gerente-vendas",
    name: "Gerente de Vendas",
    description: "Responsável pela equipe de vendas",
    departmentId: "vendas"
  },
  {
    id: "consultor-vendas",
    name: "Consultor de Vendas",
    description: "Atendimento e vendas para clientes",
    departmentId: "vendas"
  },
  {
    id: "assistente-comercial",
    name: "Assistente Comercial",
    description: "Suporte às atividades comerciais",
    departmentId: "vendas"
  },

  // TI
  {
    id: "coordenador-ti",
    name: "Coordenador de TI",
    description: "Coordena a infraestrutura de TI",
    departmentId: "ti"
  },
  {
    id: "analista-sistemas",
    name: "Analista de Sistemas",
    description: "Desenvolvimento e manutenção de sistemas",
    departmentId: "ti"
  },
  {
    id: "suporte-tecnico",
    name: "Suporte Técnico",
    description: "Suporte técnico aos usuários",
    departmentId: "ti"
  }
]