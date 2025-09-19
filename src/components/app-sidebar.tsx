import * as React from "react"
import {
  LayoutDashboard,
  Users,
  Car,
  FileText,
  Calculator,
  BarChart3,
  Settings,
  UserCheck,
  Shield,
  Truck,
  ClipboardList,
  Calendar,
  CreditCard,
  PiggyBank,
  FileBarChart,
  Lightbulb
} from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

// Navigation data for Classe A Locadora
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Insights",
      url: "/insights",
      icon: Lightbulb,
      items: [],
    },
    {
      title: "Cadastros",
      icon: Users,
      items: [
        {
          title: "Clientes",
          url: "/cadastros/clientes",
          icon: Users,
        },
        {
          title: "Motoristas",
          url: "/cadastros/motoristas",
          icon: UserCheck,
        },
        {
          title: "Fornecedores",
          url: "/cadastros/fornecedores",
          icon: Truck,
        },
        {
          title: "Frota",
          icon: Car,
          items: [
            {
              title: "Categorias",
              url: "/cadastros/frota/categorias",
              icon: Car,
            },
            {
              title: "Marcas e Modelos",
              url: "/cadastros/frota/marcas-modelos",
              icon: Car,
            },
            {
              title: "Veículos",
              url: "/cadastros/frota/veiculos",
              icon: Car,
            },
          ],
        },
      ],
    },
    {
      title: "Operacional",
      icon: FileText,
      items: [
        {
          title: "Contratos",
          url: "/operacional/contratos",
          icon: FileText,
        },
        {
          title: "Checklist",
          url: "/operacional/checklist",
          icon: ClipboardList,
        },
        {
          title: "Agenda",
          url: "/operacional/agenda",
          icon: Calendar,
        },
      ],
    },
    {
      title: "Financeiro",
      icon: Calculator,
      items: [
        {
          title: "Contas a Pagar",
          url: "/financeiro/contas-pagar",
          icon: CreditCard,
        },
        {
          title: "Contas a Receber",
          url: "/financeiro/contas-receber",
          icon: CreditCard,
        },
        {
          title: "Caixa Investimento",
          url: "/financeiro/caixa-investimento",
          icon: PiggyBank,
        },
      ],
    },
    {
      title: "Relatórios",
      icon: BarChart3,
      items: [
        {
          title: "Visão Geral",
          url: "/relatorios/visao-geral",
          icon: FileBarChart,
        },
        {
          title: "Ocupação",
          url: "/relatorios/ocupacao",
          icon: BarChart3,
        },
        {
          title: "Atividades dos Funcionários",
          url: "/relatorios/atividades-funcionarios",
          icon: FileBarChart,
        },
      ],
    },
    {
      title: "Configurações",
      icon: Settings,
      items: [
        {
          title: "Níveis de Acesso",
          url: "/configuracoes/niveis-acesso",
          icon: Shield,
        },
        {
          title: "Usuários",
          url: "/configuracoes/usuarios",
          icon: Users,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} data-tutorial="sidebar">
      <SidebarHeader>
        <div className="flex h-16 items-center justify-between px-4">
          <h2 className="text-lg font-semibold">Classe A</h2>
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => {
          const Icon = item.icon

          if (item.items.length === 0) {
            // Item sem subitens (Dashboard)
            return (
              <SidebarGroup key={item.title}>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild>
                        <a href={item.url} className="flex items-center gap-2">
                          <Icon className="h-4 w-4" />
                          {item.title}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
          }

          // Itens com subitens
          return (
            <SidebarGroup key={item.title}>
              <SidebarGroupLabel className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {item.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {item.items.map((subItem) => {
                    const SubIcon = subItem.icon

                    // Se o subitem tem subitens (como Frota)
                    if (subItem.items && subItem.items.length > 0) {
                      return (
                        <div key={subItem.title} className="space-y-1">
                          <div className="px-2 py-1 text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <SubIcon className="h-4 w-4" />
                            {subItem.title}
                          </div>
                          {subItem.items.map((nestedItem: { title: string; url: string; icon: React.ElementType }) => {
                            const NestedIcon = nestedItem.icon
                            return (
                              <SidebarMenuItem key={nestedItem.title} className="ml-4">
                                <SidebarMenuButton asChild>
                                  <a
                                    href={nestedItem.url}
                                    className="flex items-center gap-2"
                                  >
                                    <NestedIcon className="h-4 w-4" />
                                    {nestedItem.title}
                                  </a>
                                </SidebarMenuButton>
                              </SidebarMenuItem>
                            )
                          })}
                        </div>
                      )
                    }

                    // Subitem simples (sem subitens)
                    return (
                      <SidebarMenuItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <a
                            href={subItem.url}
                            className="flex items-center gap-2"
                            data-tutorial={subItem.title === "Usuários" ? "usuarios-menu" : subItem.title === "Níveis de Acesso" ? "niveis-acesso-menu" : undefined}
                          >
                            <SubIcon className="h-4 w-4" />
                            {subItem.title}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          )
        })}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}
