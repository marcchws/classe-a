"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MetricsCards } from "@/components/dashboard/metrics-cards";
import { RevenueChart } from "@/components/dashboard/revenue-chart";
import { RecentActivities } from "@/components/dashboard/recent-activities";
import { FleetOverview } from "@/components/dashboard/fleet-overview";
import { useTutorialContext } from "@/features/tutorial";

function DashboardContent() {
  const searchParams = useSearchParams();
  const { startTutorial } = useTutorialContext();

  useEffect(() => {
    const tutorialId = searchParams.get('tutorial');
    if (tutorialId) {
      setTimeout(() => {
        startTutorial(tutorialId);
      }, 500);
    }
  }, [searchParams, startTutorial]);

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Bem-vindo de volta! Aqui está um resumo das suas operações.
          </span>
        </div>
      </div>

      {/* Métricas Principais */}
      <div data-tutorial="dashboard-metrics">
        <MetricsCards />
      </div>

      {/* Segunda linha: Gráfico de receita e visão geral da frota */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>
        <div className="lg:col-span-1">
          <FleetOverview />
        </div>
      </div>

      {/* Terceira linha: Atividades recentes */}
      <div className="grid gap-4 lg:grid-cols-1">
        <div data-tutorial="recent-activities">
          <RecentActivities />
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Carregando dashboard...</p>
        </div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}