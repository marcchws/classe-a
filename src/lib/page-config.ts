// Configuração centralizada para dados das páginas
export const pageConfig = {
  dashboard: {
    metrics: [
      {
        title: "Contratos Ativos",
        value: "124",
        description: "+20% em relação ao mês anterior"
      },
      {
        title: "Veículos Disponíveis", 
        value: "23",
        description: "De 45 veículos totais"
      },
      {
        title: "Motoristas Ativos",
        value: "67", 
        description: "+3 novos motoristas este mês"
      },
      {
        title: "Receita Mensal",
        value: "R$ 235.400",
        description: "+12% em relação ao mês anterior"
      }
    ],
    upcomingContracts: [
      {
        title: "Empresa ABC - Evento Corporativo",
        schedule: "Amanhã, 14:00 - 22:00"
      },
      {
        title: "João Silva - Transfer Aeroporto", 
        schedule: "25/01, 08:00 - 10:00"
      }
    ],
    maintenanceSchedule: [
      {
        vehicle: "Audi A6 - ABC-1234",
        description: "Revisão 10.000km - 26/01"
      },
      {
        vehicle: "BMW X5 - DEF-5678",
        description: "Troca de pneus - 28/01"
      }
    ]
  },
  insights: {
    sampleInsights: [
      {
        id: 1,
        titulo: "Nova política de segurança",
        descricao: "Implementação de novas diretrizes de segurança para operações com veículos blindados.",
        publicoAlvo: "Empresa toda",
        setor: null,
        status: "Ativo",
        dataInicio: "2024-01-15",
        dataTermino: "2024-02-15",
        criadoPor: "João Silva",
        dataCriacao: "2024-01-10",
        visualizacoes: 45
      },
      {
        id: 2,
        titulo: "Treinamento obrigatório - Motoristas",
        descricao: "Curso de aperfeiçoamento para condutores de veículos executivos e blindados.",
        publicoAlvo: "Setor",
        setor: "Operacional",
        status: "Ativo",
        dataInicio: "2024-01-20",
        dataTermino: "2024-03-20",
        criadoPor: "Maria Santos",
        dataCriacao: "2024-01-15",
        visualizacoes: 12
      },
      {
        id: 3,
        titulo: "Manutenção programada da frota",
        descricao: "Cronograma de manutenção preventiva para o mês de janeiro.",
        publicoAlvo: "Setor",
        setor: "Manutenção",
        status: "Expirado",
        dataInicio: "2023-12-01",
        dataTermino: "2024-01-01",
        criadoPor: "Carlos Oliveira",
        dataCriacao: "2023-11-25",
        visualizacoes: 28
      }
    ],
    analytics: {
      totalInsights: 3,
      totalViews: 85,
      engagementRate: 78,
      insightsPerSector: 2,
      statusBreakdown: {
        active: { count: 2, percentage: 67 },
        expired: { count: 1, percentage: 33 }
      },
      reachBreakdown: {
        companyWide: 45,
        sectorSpecific: 40
      }
    }
  },
  configuracoes: {
    accessLevels: [
      {
        id: "1",
        name: "Administrador",
        description: "Acesso completo ao sistema",
        status: "active",
        permissions: [],
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        name: "Operador",
        description: "Acesso às operações diárias",
        status: "active",
        permissions: [],
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "3",
        name: "Financeiro",
        description: "Acesso apenas ao módulo financeiro",
        status: "inactive",
        permissions: [],
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-25"),
      },
    ],
    users: [
      {
        id: "1",
        name: "João Silva Santos",
        document: { type: "CPF", number: "123.456.789-01" },
        department: "operacional",
        position: "gerente-operacional",
        phone: "+55 21 99999-1234",
        email: "joao.silva@classea.com.br",
        salary: 8000,
        status: "active",
        accessLevel: "1",
        address: {
          zipCode: "22071-030",
          street: "Rua Visconde de Pirajá",
          number: "100",
          neighborhood: "Ipanema",
          city: "Rio de Janeiro",
          state: "RJ",
          country: "Brasil"
        },
        createdAt: new Date("2024-01-15"),
        updatedAt: new Date("2024-01-15"),
      },
      {
        id: "2",
        name: "Maria Oliveira Costa",
        document: { type: "CPF", number: "987.654.321-09" },
        department: "financeiro",
        position: "analista-financeiro",
        phone: "+55 21 98888-5678",
        email: "maria.oliveira@classea.com.br",
        salary: 5500,
        status: "active",
        accessLevel: "2",
        address: {
          zipCode: "22071-030",
          street: "Rua Visconde de Pirajá",
          number: "200",
          neighborhood: "Ipanema",
          city: "Rio de Janeiro",
          state: "RJ",
          country: "Brasil"
        },
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-20"),
      },
      {
        id: "3",
        name: "Carlos Alberto Souza",
        document: { type: "CNH", number: "123456789" },
        department: "operacional",
        position: "motorista",
        phone: "+55 21 97777-9012",
        email: "carlos.souza@classea.com.br",
        salary: 3200,
        status: "inactive",
        address: {
          zipCode: "22071-030",
          street: "Rua Visconde de Pirajá",
          number: "300",
          neighborhood: "Ipanema",
          city: "Rio de Janeiro",
          state: "RJ",
          country: "Brasil"
        },
        createdAt: new Date("2024-01-05"),
        updatedAt: new Date("2024-01-25"),
      },
    ]
  }
}

// Tipos para as configurações
export type DashboardMetrics = typeof pageConfig.dashboard.metrics[0]
export type UpcomingContract = typeof pageConfig.dashboard.upcomingContracts[0]
export type MaintenanceSchedule = typeof pageConfig.dashboard.maintenanceSchedule[0]
export type InsightData = typeof pageConfig.insights.sampleInsights[0]
export type AccessLevelData = typeof pageConfig.configuracoes.accessLevels[0]
export type UserData = typeof pageConfig.configuracoes.users[0]
