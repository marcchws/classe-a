"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Shield, Users, Calendar, FileText, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Sistema de Gestão Classe A
          </h1>
          <p className="text-xl text-slate-600 mb-2">
            Locação de Veículos Blindados e Executivos
          </p>
          <p className="text-sm text-slate-500">
            21+ anos de experiência • Autorização do Exército Brasileiro
          </p>
        </div>

        {/* Status do Projeto */}
        <Card className="mb-8 border-emerald-200 bg-emerald-50">
          <CardHeader>
            <CardTitle className="text-emerald-800">🚀 Status da Implementação</CardTitle>
            <CardDescription className="text-emerald-600">
              Fase 1: Fundação e Estrutura Base
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>Estrutura de pastas configurada</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>Componentes UI base instalados</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                  <span>Sistema de autenticação completo</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Layout principal (pendente)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Módulos de cadastro (pendente)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <span>Sistema operacional (pendente)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Módulos do Sistema */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Cadastros Essenciais */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Cadastros Essenciais
              </CardTitle>
              <CardDescription>
                Clientes, Motoristas, Fornecedores e Frota
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Clientes (PF, PJ, Parceiros)</li>
                <li>• Cadastro de Motoristas</li>
                <li>• Gestão de Fornecedores</li>
                <li>• Categorias e Veículos</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" disabled>
                Em Desenvolvimento
              </Button>
            </CardContent>
          </Card>

          {/* Operacional */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Car className="h-5 w-5 text-emerald-600" />
                Módulo Operacional
              </CardTitle>
              <CardDescription>
                Contratos, Checklists e Agendamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Cadastro de Contratos</li>
                <li>• Checklists de Veículos</li>
                <li>• Agenda e Escalação</li>
                <li>• Gestão de Manutenção</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" disabled>
                Aguardando Fase 3
              </Button>
            </CardContent>
          </Card>

          {/* Financeiro */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-purple-600" />
                Módulo Financeiro
              </CardTitle>
              <CardDescription>
                Contas a Pagar/Receber e Investimentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Contas a Pagar</li>
                <li>• Contas a Receber</li>
                <li>• Caixa de Investimento</li>
                <li>• Automação de Pagamentos</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" disabled>
                Aguardando Fase 4
              </Button>
            </CardContent>
          </Card>

          {/* Relatórios */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                Dashboards
              </CardTitle>
              <CardDescription>
                Relatórios e Business Intelligence
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Dashboard de Frotas</li>
                <li>• Relatório de Ocupação</li>
                <li>• Visão Geral</li>
                <li>• Histórico de Atividades</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" disabled>
                Aguardando Fase 5
              </Button>
            </CardContent>
          </Card>

          {/* App Motorista */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-destructive" />
                App Motorista
              </CardTitle>
              <CardDescription>
                Interface Mobile para Motoristas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Agenda do Motorista</li>
                <li>• Iniciar/Finalizar Atendimento</li>
                <li>• Valores a Receber</li>
                <li>• Contas em Aberto</li>
              </ul>
              <Button variant="outline" className="w-full mt-4" disabled>
                Aguardando Fase 6
              </Button>
            </CardContent>
          </Card>

          {/* Configurações */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-slate-600" />
                Sistema
              </CardTitle>
              <CardDescription>
                Autenticação e Configurações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Sistema de Login</li>
                <li>• Níveis de Acesso</li>
                <li>• Gestão de Usuários</li>
                <li>• Tutorial/Onboarding</li>
              </ul>
              <Button className="w-full mt-4" onClick={() => window.location.href = '/login'}>
                Testar Sistema
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Acesso ao Dashboard */}
        <Card className="mt-8 border-primary/20 bg-primary/5">
          <CardHeader>
            <CardTitle className="text-primary">🎯 Acessar Dashboard</CardTitle>
            <CardDescription className="text-primary">
              Dashboard principal com tutorial implementado
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <Button className="w-full mb-2" onClick={() => window.location.href = '/dashboard'}>
                Acessar Dashboard
              </Button>
              <p className="text-xs text-primary/90">Tutorial interativo incluído</p>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            Sistema de Gestão Classe A Locadora - Desenvolvido com Next.js 15, React 19 e Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
