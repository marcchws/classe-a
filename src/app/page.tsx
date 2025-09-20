"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Shield,
  Users,
  FileText,
  BarChart3,
  Settings,
  UserCheck,
  Truck,
  TestTube,
  ArrowRight,
  CheckCircle,
  Clock,
  Search,
  ClipboardList,
  FileCheck,
  TrendingUp,
  Building,
  Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Funcionalidades organizadas por categoria
  const modules = {
    dashboard: {
      title: "Dashboard & Analytics",
      items: [
        {
          title: "Dashboard Principal",
          description: "Métricas em tempo real e visão geral",
          href: "/dashboard",
          icon: BarChart3,
          status: "ready",
          color: "text-blue-600"
        },
        {
          title: "Insights",
          description: "Análises e relatórios avançados",
          href: "/insights",
          icon: TrendingUp,
          status: "ready",
          color: "text-purple-600"
        }
      ]
    },
    operacional: {
      title: "Operacional",
      items: [
        {
          title: "Contratos",
          description: "Gestão de contratos de locação",
          href: "/operacional/contratos",
          icon: FileText,
          status: "ready",
          color: "text-green-600"
        },
        {
          title: "Templates de Checklist",
          description: "Criar e gerenciar templates",
          href: "/operacional/checklist",
          icon: ClipboardList,
          status: "new",
          color: "text-orange-600"
        },
        {
          title: "Execuções de Checklist",
          description: "Checklists de saída e entrada",
          href: "/operacional/checklist/execucoes",
          icon: FileCheck,
          status: "new",
          color: "text-red-600"
        }
      ]
    },
    cadastros: {
      title: "Cadastros",
      items: [
        {
          title: "Clientes",
          description: "PF, PJ e Parceiros",
          href: "/cadastros/clientes",
          icon: Users,
          status: "ready",
          color: "text-cyan-600"
        },
        {
          title: "Motoristas",
          description: "Gestão de motoristas",
          href: "/cadastros/motoristas",
          icon: UserCheck,
          status: "ready",
          color: "text-indigo-600"
        },
        {
          title: "Fornecedores",
          description: "Fornecedores de veículos e serviços",
          href: "/cadastros/fornecedores",
          icon: Truck,
          status: "ready",
          color: "text-yellow-600"
        }
      ]
    },
    frota: {
      title: "Frota",
      items: [
        {
          title: "Categorias",
          description: "Categorias de veículos",
          href: "/cadastros/frota/categorias",
          icon: Building,
          status: "ready",
          color: "text-teal-600"
        },
        {
          title: "Marcas e Modelos",
          description: "Gestão de marcas e modelos",
          href: "/cadastros/frota/marcas-modelos",
          icon: Car,
          status: "ready",
          color: "text-pink-600"
        },
        {
          title: "Veículos",
          description: "Cadastro completo de veículos",
          href: "/cadastros/frota/veiculos",
          icon: Shield,
          status: "ready",
          color: "text-emerald-600"
        }
      ]
    },
    configuracoes: {
      title: "Configurações",
      items: [
        {
          title: "Usuários",
          description: "Gestão de usuários do sistema",
          href: "/configuracoes/usuarios",
          icon: Users,
          status: "ready",
          color: "text-gray-600"
        },
        {
          title: "Níveis de Acesso",
          description: "Controle de permissões",
          href: "/configuracoes/niveis-acesso",
          icon: Settings,
          status: "ready",
          color: "text-slate-600"
        }
      ]
    }
  };

  // Ações rápidas mais utilizadas
  const quickActions = [
    {
      title: "Novo Checklist",
      description: "Iniciar checklist de veículo",
      href: "/operacional/checklist/execucoes/novo",
      icon: Plus,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "Novo Contrato",
      description: "Criar contrato de locação",
      href: "/operacional/contratos/novo",
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Novo Cliente",
      description: "Cadastrar novo cliente",
      href: "/cadastros/clientes/novo",
      icon: Users,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Novo Veículo",
      description: "Cadastrar veículo na frota",
      href: "/cadastros/frota/veiculos/novo",
      icon: Car,
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><CheckCircle className="w-3 h-3 mr-1" />Pronto</Badge>;
      case "new":
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"><TestTube className="w-3 h-3 mr-1" />Novo</Badge>;
      case "wip":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"><Clock className="w-3 h-3 mr-1" />Em desenvolvimento</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  // Filtrar módulos baseado na busca
  const filteredModules = Object.entries(modules).reduce((acc, [key, category]) => {
    const filteredItems = category.items.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    if (filteredItems.length > 0) {
      acc[key as keyof typeof modules] = { ...category, items: filteredItems };
    }
    
    return acc;
  }, {} as Partial<typeof modules>);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            🚗 Classe A Locadora
          </h1>
          <p className="text-lg text-muted-foreground mb-4">
            Sistema de Gestão para Locação de Veículos Blindados
          </p>
          <div className="flex justify-center gap-3 mb-6">
            <Badge variant="outline" className="text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Gestão de Checklist
            </Badge>
            <Badge variant="outline" className="text-sm">
              <TestTube className="w-4 h-4 mr-2 text-blue-500" />
              Sistema Completo
            </Badge>
          </div>
        </div>

        {/* Busca */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar funcionalidades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Ações Rápidas */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">⚡ Ações Rápidas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                asChild
                className={`${action.color} text-white h-auto p-4 flex flex-col items-center space-y-2`}
              >
                <Link href={action.href}>
                  <action.icon className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium text-sm">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </Link>
              </Button>
            ))}
          </div>
        </div>

        {/* Módulos Organizados */}
        <Tabs defaultValue="operacional" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="operacional">Operacional</TabsTrigger>
            <TabsTrigger value="cadastros">Cadastros</TabsTrigger>
            <TabsTrigger value="frota">Frota</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="configuracoes">Config</TabsTrigger>
          </TabsList>

          {Object.entries(filteredModules).map(([key, category]) => (
            <TabsContent key={key} value={key} className="mt-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold mb-2">{category.title}</h2>
                <p className="text-muted-foreground text-sm">
                  {category.items.length} funcionalidade{category.items.length !== 1 ? 's' : ''} disponível{category.items.length !== 1 ? 'is' : ''}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.items.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-all duration-200 cursor-pointer group">
                    <Link href={item.href}>
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-muted`}>
                              <item.icon className={`h-5 w-5 ${item.color}`} />
                            </div>
                            <div className="flex-1">
                              <CardTitle className="text-base group-hover:text-primary transition-colors">
                                {item.title}
                              </CardTitle>
                              <CardDescription className="text-sm">
                                {item.description}
                              </CardDescription>
                            </div>
                          </div>
                        </div>
                        <div className="mt-2">
                          {getStatusBadge(item.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center text-sm text-muted-foreground group-hover:text-primary transition-colors">
                          <span>Acessar</span>
                          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t">
          <p className="text-sm text-muted-foreground">
            Classe A Locadora • Sistema de Gestão Completo
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Next.js 15 + React 19 + Tailwind CSS v4 • Desenvolvido com ❤️
          </p>
        </div>
      </div>
    </div>
  );
}