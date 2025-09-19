"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function TestHub() {
  const testModules = [
    {
      title: "Dashboard Principal",
      description: "Dashboard moderna com métricas em tempo real",
      href: "/dashboard",
      status: "ready",
      icon: BarChart3,
      color: "bg-blue-500",
      features: ["Dark mode", "Métricas da frota", "Gráfico de receitas", "Atividades recentes"]
    },
    {
      title: "Cadastro de Clientes",
      description: "CRUD completo para PF, PJ e Parceiros",
      href: "/cadastros/clientes",
      status: "ready",
      icon: Users,
      color: "bg-green-500",
      features: ["Formulários validados", "Busca e filtros", "Exportação CSV", "Importação"]
    },
    {
      title: "Cadastro de Motoristas",
      description: "Gestão completa dos motoristas",
      href: "/cadastros/motoristas",
      status: "ready",
      icon: UserCheck,
      color: "bg-purple-500",
      features: ["Upload de documentos", "Histórico de serviços", "Bloqueios", "Classificação automática"]
    },
    {
      title: "Cadastro de Fornecedores",
      description: "Fornecedores de veículos e serviços",
      href: "/cadastros/fornecedores",
      status: "ready",
      icon: Truck,
      color: "bg-orange-500",
      features: ["Veículos utilizados", "Ordens de serviço", "Histórico de pagamentos"]
    },
    {
      title: "Frota - Categorias",
      description: "Categorias dos veículos",
      href: "/cadastros/frota/categorias",
      status: "ready",
      icon: Car,
      color: "bg-cyan-500",
      features: ["CRUD de categorias", "Status ativo/inativo"]
    },
    {
      title: "Frota - Marcas e Modelos",
      description: "Gestão de marcas, modelos e manutenções",
      href: "/cadastros/frota/marcas-modelos",
      status: "ready",
      icon: Car,
      color: "bg-indigo-500",
      features: ["Marcas e modelos", "Itens de manutenção", "Recorrência por KM/tempo"]
    },
    {
      title: "Frota - Veículos",
      description: "Cadastro completo dos veículos",
      href: "/cadastros/frota/veiculos",
      status: "new",
      icon: Shield,
      color: "bg-emerald-500",
      features: ["CRUD completo", "Blindagem", "Financiamento", "Importação CSV", "Manutenção preventiva"]
    },
    {
      title: "Sistema de Login",
      description: "Autenticação e recuperação de senha",
      href: "/login",
      status: "ready",
      icon: Settings,
      color: "bg-gray-500",
      features: ["Login/logout", "Recuperação de senha", "Validações"]
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ready":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"><CheckCircle className="w-3 h-3 mr-1" />Pronto para teste</Badge>;
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"><TestTube className="w-3 h-3 mr-1" />Recém implementado</Badge>;
      case "wip":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"><Clock className="w-3 h-3 mr-1" />Em desenvolvimento</Badge>;
      default:
        return <Badge variant="secondary">Pendente</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            🧪 Hub de Testes - Classe A Locadora
          </h1>
          <p className="text-xl text-muted-foreground mb-4">
            Sistema de Gestão para Locação de Veículos Blindados
          </p>
          <div className="flex justify-center gap-4 mb-6">
            <Badge variant="outline" className="text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              Dark Mode Implementado
            </Badge>
            <Badge variant="outline" className="text-sm">
              <TestTube className="w-4 h-4 mr-2 text-blue-500" />
              Fase 2 Completa
            </Badge>
            <Badge variant="outline" className="text-sm">
              <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
              Em Testes
            </Badge>
          </div>
        </div>

        {/* Instruções de Teste */}
        <Card className="mb-8 border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="text-blue-800 dark:text-blue-200">📋 Instruções para Teste</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-700 dark:text-blue-300">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Como testar:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Clique nos módulos abaixo para navegar</li>
                  <li>• Teste os formulários de cadastro</li>
                  <li>• Experimente buscar e filtrar dados</li>
                  <li>• Teste a importação/exportação CSV</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Dados de teste:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Todos os módulos têm dados mock</li>
                  <li>• Formulários com validação ativa</li>
                  <li>• Dark/Light mode funcionais</li>
                  <li>• Interface responsiva</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulos para Teste */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testModules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${module.color} text-white`}>
                      <module.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{module.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {module.description}
                      </CardDescription>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  {getStatusBadge(module.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Funcionalidades:</h4>
                    <ul className="space-y-1">
                      {module.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 bg-primary rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild className="w-full group">
                    <Link href={module.href}>
                      Testar Módulo
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Acesso Rápido */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-200">🚀 Acesso Rápido - Dashboard</CardTitle>
              <CardDescription className="text-green-600 dark:text-green-400">
                Dashboard principal com todas as métricas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-green-600 hover:bg-green-700">
                <Link href="/dashboard">
                  Ir para Dashboard
                  <BarChart3 className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-200 bg-purple-50 dark:bg-purple-950 dark:border-purple-800">
            <CardHeader>
              <CardTitle className="text-purple-800 dark:text-purple-200">⚡ Novo - Veículos</CardTitle>
              <CardDescription className="text-purple-600 dark:text-purple-400">
                Módulo recém implementado para testes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                <Link href="/cadastros/frota/veiculos">
                  Testar Veículos
                  <Shield className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Hub de Testes • Classe A Locadora • Next.js 15 + React 19 + Tailwind CSS v4
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Sistema em desenvolvimento - Feedback bem-vindo! 🚗✨
          </p>
        </div>
      </div>
    </div>
  );
}