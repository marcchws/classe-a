"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { InsightPopup } from "@/components/insights/insight-popup"
import { useEffect, useState } from "react"

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [showInsights, setShowInsights] = useState(false)
  const [insights, setInsights] = useState<Array<{
    id: number;
    titulo: string;
    descricao: string;
    publicoAlvo: "Empresa toda" | "Setor";
    setor?: string;
    dataInicio: string;
    dataTermino: string;
    criadoPor: string;
    imagem?: string;
    linkExterno?: string;
  }>>([])

  useEffect(() => {
    // Simular carregamento de insights ativos para o usuário logado
    const mockInsights = [
      {
        id: 1,
        titulo: "Nova política de segurança",
        descricao: "Implementação de novas diretrizes de segurança para operações com veículos blindados. É obrigatório que todos os funcionários leiam e confirmem o recebimento desta comunicação.",
        publicoAlvo: "Empresa toda" as const,
        dataInicio: "2024-01-15",
        dataTermino: "2024-02-15",
        criadoPor: "João Silva",
        imagem: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop",
        linkExterno: "https://exemplo.com/politica-seguranca"
      },
      {
        id: 2,
        titulo: "Treinamento obrigatório - Motoristas",
        descricao: "Curso de aperfeiçoamento para condutores de veículos executivos e blindados. Inscrições abertas até sexta-feira.",
        publicoAlvo: "Setor" as const,
        setor: "Operacional",
        dataInicio: "2024-01-20",
        dataTermino: "2024-03-20",
        criadoPor: "Maria Santos"
      }
    ]

    // Verificar se existem insights não visualizados
    const unviewedInsights = mockInsights.filter(insight => {
      const lastViewed = localStorage.getItem(`insight_viewed_${insight.id}`)
      return !lastViewed
    })

    if (unviewedInsights.length > 0) {
      setInsights(unviewedInsights)
      setShowInsights(true)
    }
  }, [])

  const handleMarkAsViewed = (insightId: number) => {
    localStorage.setItem(`insight_viewed_${insightId}`, new Date().toISOString())
  }

  const handleCloseInsights = () => {
    setShowInsights(false)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
          {children}
        </main>
      </SidebarInset>

      <InsightPopup
        insights={insights}
        isOpen={showInsights}
        onClose={handleCloseInsights}
        onMarkAsViewed={handleMarkAsViewed}
      />
    </SidebarProvider>
  )
}