"use client"

import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InsightForm } from "@/components/insights/insight-form"
import { Eye, Edit2, Trash2, Calendar, Users, Building2 } from "lucide-react"
import { pageConfig } from "@/lib/page-config"

export default function InsightsPage() {
  const breadcrumbs = [
    { title: "Insights" },
  ]
  const insights = pageConfig.insights.sampleInsights

  const getStatusBadge = (status: string) => {
    const variants = {
      "Ativo": "default",
      "Agendado": "secondary",
      "Expirado": "destructive"
    } as const

    return <Badge variant={variants[status as keyof typeof variants] || "default"}>{status}</Badge>
  }

  const getPublicoAlvoIcon = (publicoAlvo: string) => {
    return publicoAlvo === "Empresa toda" ? <Building2 className="h-4 w-4" /> : <Users className="h-4 w-4" />
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs} currentScreen="insights">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Gerenciamento de Insights</h1>
            <p className="text-muted-foreground">
              Gerencie avisos e insights operacionais para colaboradores
            </p>
          </div>
          <InsightForm
            onSubmit={(data) => {
              console.log("Novo insight:", data)
              // Aqui seria implementada a lógica de criação
            }}
          />
        </div>

      <Tabs defaultValue="ativos" className="space-y-4">
        <TabsList>
          <TabsTrigger value="ativos">Insights Ativos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="ativos" className="space-y-4">
          <div className="grid gap-4">
            {insights.filter(insight => insight.status === "Ativo").map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{insight.titulo}</CardTitle>
                      {getStatusBadge(insight.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      {getPublicoAlvoIcon(insight.publicoAlvo)}
                      <span>{insight.publicoAlvo}{insight.setor && ` - ${insight.setor}`}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{insight.dataInicio} até {insight.dataTermino}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{insight.visualizacoes} visualizações</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{insight.descricao}</p>
                  <div className="text-xs text-muted-foreground">
                    Criado por {insight.criadoPor} em {insight.dataCriacao}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="historico" className="space-y-4">
          <div className="grid gap-4">
            {insights.map((insight) => (
              <Card key={insight.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CardTitle className="text-lg">{insight.titulo}</CardTitle>
                      {getStatusBadge(insight.status)}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {insight.status === "Expirado" && (
                        <Button variant="outline" size="sm">
                          Reativar
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      {getPublicoAlvoIcon(insight.publicoAlvo)}
                      <span>{insight.publicoAlvo}{insight.setor && ` - ${insight.setor}`}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{insight.dataInicio} até {insight.dataTermino}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{insight.visualizacoes} visualizações</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{insight.descricao}</p>
                  <div className="text-xs text-muted-foreground">
                    Criado por {insight.criadoPor} em {insight.dataCriacao}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Insights</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pageConfig.insights.analytics.totalInsights}</div>
                <p className="text-xs text-muted-foreground">
                  {pageConfig.insights.analytics.statusBreakdown.active.count} ativos, {pageConfig.insights.analytics.statusBreakdown.expired.count} expirado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Visualizações Totais</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pageConfig.insights.analytics.totalViews}</div>
                <p className="text-xs text-muted-foreground">
                  +20% desde o mês passado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pageConfig.insights.analytics.engagementRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Colaboradores que visualizaram
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Insights por Setor</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pageConfig.insights.analytics.insightsPerSector}</div>
                <p className="text-xs text-muted-foreground">
                  Média por setor este mês
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Insights por Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">Ativo</Badge>
                    <span className="text-sm text-muted-foreground">{pageConfig.insights.analytics.statusBreakdown.active.count} insights</span>
                  </div>
                  <span className="text-sm font-medium">{pageConfig.insights.analytics.statusBreakdown.active.percentage}%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">Expirado</Badge>
                    <span className="text-sm text-muted-foreground">{pageConfig.insights.analytics.statusBreakdown.expired.count} insight</span>
                  </div>
                  <span className="text-sm font-medium">{pageConfig.insights.analytics.statusBreakdown.expired.percentage}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alcance por Público</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Empresa toda</span>
                  </div>
                  <span className="text-sm font-medium">{pageConfig.insights.analytics.reachBreakdown.companyWide} visualizações</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4" />
                    <span className="text-sm text-muted-foreground">Setores específicos</span>
                  </div>
                  <span className="text-sm font-medium">{pageConfig.insights.analytics.reachBreakdown.sectorSpecific} visualizações</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      </div>
    </AppLayout>
  )
}