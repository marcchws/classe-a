import { Module } from "../types"

export const systemModules: Module[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    description: "Painel principal com visão geral do sistema",
    permissions: [
      {
        id: "dashboard-view",
        name: "Visualizar Dashboard",
        description: "Visualizar métricas e informações gerais",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "dashboard-export",
        name: "Exportar Relatórios",
        description: "Exportar dados do dashboard",
        actions: { view: false, create: false, edit: false, delete: false, export: true }
      }
    ]
  },
  {
    id: "clientes",
    name: "Gestão de Clientes",
    description: "Gerenciamento de clientes (PF, PJ, Parceiros)",
    permissions: [
      {
        id: "clientes-view",
        name: "Visualizar Clientes",
        description: "Visualizar lista e detalhes dos clientes",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "clientes-create",
        name: "Criar Clientes",
        description: "Cadastrar novos clientes",
        actions: { view: false, create: true, edit: false, delete: false }
      },
      {
        id: "clientes-edit",
        name: "Editar Clientes",
        description: "Editar informações dos clientes",
        actions: { view: false, create: false, edit: true, delete: false }
      },
      {
        id: "clientes-delete",
        name: "Excluir Clientes",
        description: "Excluir clientes do sistema",
        actions: { view: false, create: false, edit: false, delete: true }
      }
    ]
  },
  {
    id: "motoristas",
    name: "Gestão de Motoristas",
    description: "Gerenciamento de motoristas e escalações",
    permissions: [
      {
        id: "motoristas-view",
        name: "Visualizar Motoristas",
        description: "Visualizar lista e detalhes dos motoristas",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "motoristas-create",
        name: "Criar Motoristas",
        description: "Cadastrar novos motoristas",
        actions: { view: false, create: true, edit: false, delete: false }
      },
      {
        id: "motoristas-edit",
        name: "Editar Motoristas",
        description: "Editar informações dos motoristas",
        actions: { view: false, create: false, edit: true, delete: false }
      },
      {
        id: "motoristas-delete",
        name: "Excluir Motoristas",
        description: "Excluir motoristas do sistema",
        actions: { view: false, create: false, edit: false, delete: true }
      }
    ]
  },
  {
    id: "frota",
    name: "Gestão de Frotas",
    description: "Gerenciamento de veículos e categorias",
    permissions: [
      {
        id: "frota-view",
        name: "Visualizar Frota",
        description: "Visualizar veículos e disponibilidade",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "frota-create",
        name: "Criar Veículos",
        description: "Cadastrar novos veículos",
        actions: { view: false, create: true, edit: false, delete: false }
      },
      {
        id: "frota-edit",
        name: "Editar Veículos",
        description: "Editar informações dos veículos",
        actions: { view: false, create: false, edit: true, delete: false }
      },
      {
        id: "frota-delete",
        name: "Excluir Veículos",
        description: "Excluir veículos do sistema",
        actions: { view: false, create: false, edit: false, delete: true }
      }
    ]
  },
  {
    id: "contratos",
    name: "Gestão de Contratos",
    description: "Gerenciamento de contratos de locação",
    permissions: [
      {
        id: "contratos-view",
        name: "Visualizar Contratos",
        description: "Visualizar contratos e status",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "contratos-create",
        name: "Criar Contratos",
        description: "Criar novos contratos",
        actions: { view: false, create: true, edit: false, delete: false }
      },
      {
        id: "contratos-edit",
        name: "Editar Contratos",
        description: "Editar contratos existentes",
        actions: { view: false, create: false, edit: true, delete: false }
      },
      {
        id: "contratos-delete",
        name: "Cancelar Contratos",
        description: "Cancelar contratos",
        actions: { view: false, create: false, edit: false, delete: true }
      }
    ]
  },
  {
    id: "financeiro",
    name: "Gestão Financeira",
    description: "Contas a pagar, receber e investimentos",
    permissions: [
      {
        id: "financeiro-view",
        name: "Visualizar Financeiro",
        description: "Visualizar contas e fluxo de caixa",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "financeiro-create",
        name: "Criar Lançamentos",
        description: "Criar novos lançamentos financeiros",
        actions: { view: false, create: true, edit: false, delete: false }
      },
      {
        id: "financeiro-edit",
        name: "Editar Lançamentos",
        description: "Editar lançamentos financeiros",
        actions: { view: false, create: false, edit: true, delete: false }
      },
      {
        id: "financeiro-delete",
        name: "Excluir Lançamentos",
        description: "Excluir lançamentos financeiros",
        actions: { view: false, create: false, edit: false, delete: true }
      }
    ]
  },
  {
    id: "relatorios",
    name: "Relatórios",
    description: "Relatórios gerenciais e de análise",
    permissions: [
      {
        id: "relatorios-view",
        name: "Visualizar Relatórios",
        description: "Visualizar relatórios do sistema",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "relatorios-export",
        name: "Exportar Relatórios",
        description: "Exportar relatórios em diversos formatos",
        actions: { view: false, create: false, edit: false, delete: false, export: true }
      }
    ]
  },
  {
    id: "configuracoes",
    name: "Configurações",
    description: "Configurações do sistema e níveis de acesso",
    permissions: [
      {
        id: "configuracoes-view",
        name: "Visualizar Configurações",
        description: "Visualizar configurações do sistema",
        actions: { view: true, create: false, edit: false, delete: false }
      },
      {
        id: "configuracoes-edit",
        name: "Editar Configurações",
        description: "Editar configurações do sistema",
        actions: { view: false, create: false, edit: true, delete: false }
      },
      {
        id: "usuarios-manage",
        name: "Gerenciar Usuários",
        description: "Criar, editar e gerenciar usuários",
        actions: { view: true, create: true, edit: true, delete: true }
      },
      {
        id: "niveis-acesso-manage",
        name: "Gerenciar Níveis de Acesso",
        description: "Criar, editar e gerenciar níveis de acesso",
        actions: { view: true, create: true, edit: true, delete: true }
      }
    ]
  }
]