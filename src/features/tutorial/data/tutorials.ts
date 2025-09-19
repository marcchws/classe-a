import { Tutorial } from "../types"

export const tutorials: Tutorial[] = [
  // Tutorial para Administradores - Primeiro Acesso
  {
    id: "admin-first-access",
    name: "Tutorial Inicial - Administrador",
    userType: "admin",
    description: "Tutorial completo para administradores no primeiro acesso",
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    steps: [
      {
        id: "admin-1",
        tutorialId: "admin-first-access",
        step: 1,
        title: "Bem-vindo ao Modo Administrador!",
        description: "Como administrador, você tem acesso completo ao sistema. Vamos conhecer as principais funcionalidades que você pode gerenciar.",
        position: "center",
        allowSkip: true,
        action: "none"
      },
      {
        id: "admin-2",
        tutorialId: "admin-first-access",
        step: 2,
        title: "Menu de Navegação",
        description: "Este é o menu principal. Como admin, você pode acessar todos os módulos: Cadastros, Operacional, Financeiro, Relatórios e Configurações.",
        elementSelector: "[data-tutorial='sidebar']",
        position: "right",
        action: "none"
      },
      {
        id: "admin-3",
        tutorialId: "admin-first-access",
        step: 3,
        title: "Gerenciamento de Usuários",
        description: "Aqui você pode criar, editar e gerenciar todos os usuários do sistema. Clique para explorar.",
        elementSelector: "[data-tutorial='usuarios-menu']",
        position: "right",
        action: "click"
      },
      {
        id: "admin-4",
        tutorialId: "admin-first-access",
        step: 4,
        title: "Níveis de Acesso",
        description: "Configure diferentes níveis de permissão para controlar o que cada usuário pode acessar no sistema.",
        elementSelector: "[data-tutorial='niveis-acesso-menu']",
        position: "right",
        action: "click"
      },
      {
        id: "admin-5",
        tutorialId: "admin-first-access",
        step: 5,
        title: "Relatórios e Exportação",
        description: "Acesse relatórios detalhados e exporte dados para análise. Muito útil para tomada de decisões.",
        elementSelector: "[data-tutorial='relatorios-menu']",
        position: "right",
        action: "none"
      },
      {
        id: "admin-6",
        tutorialId: "admin-first-access",
        step: 6,
        title: "Continuar Explorando",
        description: "Agora você conhece o básico! Explore cada módulo no seu próprio ritmo. Você pode acessar este tutorial novamente clicando no ícone de ajuda.",
        position: "center",
        action: "none"
      }
    ]
  },

  // Tutorial para Usuários Comuns - Primeiro Acesso
  {
    id: "user-first-access",
    name: "Tutorial Inicial - Usuário",
    userType: "common",
    description: "Tutorial introdutório para usuários comuns",
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    steps: [
      {
        id: "user-1",
        tutorialId: "user-first-access",
        step: 1,
        title: "Bem-vindo ao Sistema Classe A!",
        description: "Este é seu painel de controle. Vamos conhecer as funcionalidades disponíveis para o seu perfil.",
        position: "center",
        allowSkip: true,
        action: "none"
      },
      {
        id: "user-2",
        tutorialId: "user-first-access",
        step: 2,
        title: "Seu Menu de Navegação",
        description: "Este menu mostra apenas as funcionalidades que você tem permissão para acessar, baseado no seu nível de acesso.",
        elementSelector: "[data-tutorial='sidebar']",
        position: "right",
        action: "none"
      },
      {
        id: "user-3",
        tutorialId: "user-first-access",
        step: 3,
        title: "Dashboard Principal",
        description: "Aqui você encontra um resumo das informações mais importantes do seu dia a dia de trabalho.",
        elementSelector: "[data-tutorial='dashboard-cards']",
        position: "bottom",
        action: "none"
      },
      {
        id: "user-4",
        tutorialId: "user-first-access",
        step: 4,
        title: "Começar a Trabalhar",
        description: "Agora você pode começar a usar o sistema! Se precisar de ajuda, clique no ícone de ajuda no canto superior direito.",
        position: "center",
        action: "none"
      }
    ]
  },

  // Tutorial específico para tela de Dashboard
  {
    id: "dashboard-tutorial",
    name: "Tutorial do Dashboard",
    userType: "all",
    screen: "dashboard",
    description: "Conhecendo o painel principal",
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    steps: [
      {
        id: "dash-1",
        tutorialId: "dashboard-tutorial",
        step: 1,
        title: "Métricas Principais",
        description: "Estes cards mostram as métricas mais importantes: contratos ativos, veículos disponíveis, motoristas ativos e receita mensal.",
        elementSelector: "[data-tutorial='dashboard-metrics']",
        position: "bottom",
        action: "none"
      },
      {
        id: "dash-2",
        tutorialId: "dashboard-tutorial",
        step: 2,
        title: "Próximos Contratos",
        description: "Aqui você vê os contratos agendados para os próximos dias, facilitando o planejamento.",
        elementSelector: "[data-tutorial='next-contracts']",
        position: "top",
        action: "none"
      },
      {
        id: "dash-3",
        tutorialId: "dashboard-tutorial",
        step: 3,
        title: "Manutenções Programadas",
        description: "Acompanhe as manutenções agendadas para manter a frota sempre em perfeito estado.",
        elementSelector: "[data-tutorial='maintenance-schedule']",
        position: "top",
        action: "none"
      }
    ]
  },

  // Tutorial para tela de Usuários
  {
    id: "usuarios-tutorial",
    name: "Tutorial de Usuários",
    userType: "admin",
    screen: "usuarios",
    description: "Gerenciando usuários do sistema",
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    steps: [
      {
        id: "usr-1",
        tutorialId: "usuarios-tutorial",
        step: 1,
        title: "Lista de Usuários",
        description: "Aqui você vê todos os usuários cadastrados no sistema, com informações como status, departamento e nível de acesso.",
        elementSelector: "[data-tutorial='users-table']",
        position: "top",
        action: "none"
      },
      {
        id: "usr-2",
        tutorialId: "usuarios-tutorial",
        step: 2,
        title: "Filtros e Busca",
        description: "Use estes filtros para encontrar usuários específicos por status, departamento ou qualquer informação.",
        elementSelector: "[data-tutorial='users-filters']",
        position: "bottom",
        action: "none"
      },
      {
        id: "usr-3",
        tutorialId: "usuarios-tutorial",
        step: 3,
        title: "Criar Novo Usuário",
        description: "Clique aqui para adicionar um novo usuário ao sistema. O processo é guiado por etapas.",
        elementSelector: "[data-tutorial='create-user-btn']",
        position: "left",
        action: "none"
      },
      {
        id: "usr-4",
        tutorialId: "usuarios-tutorial",
        step: 4,
        title: "Ações do Usuário",
        description: "Use estes botões para editar informações ou desativar usuários conforme necessário.",
        elementSelector: "[data-tutorial='user-actions']",
        position: "left",
        action: "none"
      }
    ]
  },

  // Tutorial para tela de Níveis de Acesso
  {
    id: "niveis-acesso-tutorial",
    name: "Tutorial de Níveis de Acesso",
    userType: "admin",
    screen: "niveis-acesso",
    description: "Configurando permissões de acesso",
    isActive: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    steps: [
      {
        id: "niv-1",
        tutorialId: "niveis-acesso-tutorial",
        step: 1,
        title: "Controle de Permissões",
        description: "Os níveis de acesso controlam exatamente o que cada usuário pode ver e fazer no sistema.",
        elementSelector: "[data-tutorial='access-levels-table']",
        position: "top",
        action: "none"
      },
      {
        id: "niv-2",
        tutorialId: "niveis-acesso-tutorial",
        step: 2,
        title: "Criar Novo Nível",
        description: "Clique aqui para criar um novo nível de acesso. Você pode definir permissões granulares para cada módulo.",
        elementSelector: "[data-tutorial='create-access-level-btn']",
        position: "left",
        action: "none"
      },
      {
        id: "niv-3",
        tutorialId: "niveis-acesso-tutorial",
        step: 3,
        title: "Gerenciar Status",
        description: "Clique no badge de status para ativar ou desativar um nível de acesso rapidamente.",
        elementSelector: "[data-tutorial='access-level-status']",
        position: "left",
        action: "none"
      }
    ]
  }
]

// Função para obter tutoriais baseado no tipo de usuário
export function getTutorialsByUserType(userType: 'admin' | 'common'): Tutorial[] {
  return tutorials.filter(tutorial =>
    (tutorial.userType === userType || tutorial.userType === 'all') && tutorial.isActive
  )
}

// Função para obter tutorial específico de uma tela
export function getTutorialByScreen(screen: string, userType: 'admin' | 'common'): Tutorial | undefined {
  return tutorials.find(tutorial =>
    tutorial.screen === screen &&
    (tutorial.userType === userType || tutorial.userType === 'all') &&
    tutorial.isActive
  )
}

// Função para obter tutorial de primeiro acesso
export function getFirstAccessTutorial(userType: 'admin' | 'common'): Tutorial | undefined {
  if (userType === 'admin') {
    return tutorials.find(t => t.id === 'admin-first-access' && t.isActive)
  }
  return tutorials.find(t => t.id === 'user-first-access' && t.isActive)
}