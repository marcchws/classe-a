"use client"

import { useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useTutorialContext } from "@/features/tutorial"
import { pageConfig } from "@/lib/page-config"

function DashboardContent() {
  const searchParams = useSearchParams()
  const { startTutorial } = useTutorialContext()

  const breadcrumbs = [
    { title: "Dashboard" },
  ]

  useEffect(() => {
    const tutorialId = searchParams.get('tutorial')
    if (tutorialId) {
      // Pequeno delay para garantir que a página carregou completamente
      setTimeout(() => {
        startTutorial(tutorialId)
      }, 500)
    }
  }, [searchParams, startTutorial])

  return (
    <AppLayout breadcrumbs={breadcrumbs} currentScreen="dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4" data-tutorial="dashboard-metrics">
        {pageConfig.dashboard.metrics.map((metric, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card data-tutorial="next-contracts">
          <CardHeader>
            <CardTitle>Próximos Contratos</CardTitle>
            <CardDescription>
              Contratos agendados para os próximos dias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pageConfig.dashboard.upcomingContracts.map((contract, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{contract.title}</div>
                  <div className="text-muted-foreground">{contract.schedule}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card data-tutorial="maintenance-schedule">
          <CardHeader>
            <CardTitle>Manutenções Programadas</CardTitle>
            <CardDescription>
              Veículos com manutenção agendada
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pageConfig.dashboard.maintenanceSchedule.map((maintenance, index) => (
                <div key={index} className="text-sm">
                  <div className="font-medium">{maintenance.vehicle}</div>
                  <div className="text-muted-foreground">{maintenance.description}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <DashboardContent />
    </Suspense>
  )
}