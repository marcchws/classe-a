"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Building2, Users, Calendar } from "lucide-react"

interface Insight {
  id: number
  titulo: string
  descricao: string
  publicoAlvo: "Empresa toda" | "Setor"
  setor?: string
  imagem?: string
  video?: string
  linkExterno?: string
  dataInicio: string
  dataTermino: string
  criadoPor: string
}

interface InsightPopupProps {
  insights: Insight[]
  isOpen: boolean
  onClose: () => void
  onMarkAsViewed: (insightId: number) => void
}

export function InsightPopup({ insights, isOpen, onClose, onMarkAsViewed }: InsightPopupProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!insights.length) return null

  const currentInsight = insights[currentIndex]
  const insightsGerais = insights.filter(i => i.publicoAlvo === "Empresa toda")
  const insightsSetoriais = insights.filter(i => i.publicoAlvo === "Setor")

  const handleNext = () => {
    if (currentIndex < insights.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      handleClose()
    }
  }

  const handleClose = () => {
    // Marcar todos como visualizados
    insights.forEach(insight => {
      onMarkAsViewed(insight.id)
    })
    onClose()
    setCurrentIndex(0)
  }

  const getPublicoAlvoIcon = (publicoAlvo: string) => {
    return publicoAlvo === "Empresa toda" ? <Building2 className="h-4 w-4" /> : <Users className="h-4 w-4" />
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0">
          <div className="flex items-center space-x-2">
            <DialogTitle className="text-xl">{currentInsight.titulo}</DialogTitle>
            <Badge variant={currentInsight.publicoAlvo === "Empresa toda" ? "default" : "secondary"}>
              {currentInsight.publicoAlvo}
            </Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              {getPublicoAlvoIcon(currentInsight.publicoAlvo)}
              <span>
                {currentInsight.publicoAlvo}
                {currentInsight.setor && ` - ${currentInsight.setor}`}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Válido até {currentInsight.dataTermino}</span>
            </div>
          </div>

          <Separator />

          <ScrollArea className="max-h-[400px]">
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">{currentInsight.descricao}</p>

              {currentInsight.imagem && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={currentInsight.imagem}
                    alt="Imagem do insight"
                    className="w-full h-auto"
                  />
                </div>
              )}

              {currentInsight.video && (
                <div className="rounded-lg overflow-hidden">
                  <video controls className="w-full">
                    <source src={currentInsight.video} type="video/mp4" />
                    Seu navegador não suporta vídeos.
                  </video>
                </div>
              )}

              {currentInsight.linkExterno && (
                <div className="p-3 bg-muted rounded-lg">
                  <a
                    href={currentInsight.linkExterno}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    🔗 Acessar material complementar
                  </a>
                </div>
              )}
            </div>
          </ScrollArea>

          <Separator />

          <div className="text-xs text-muted-foreground">
            Criado por {currentInsight.criadoPor}
          </div>

          {insights.length > 1 && (
            <div className="space-y-3">
              <div className="text-sm font-medium">
                Insight {currentIndex + 1} de {insights.length}
              </div>

              {insightsGerais.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">
                    Avisos Gerais ({insightsGerais.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {insightsGerais.map((insight, index) => (
                      <Badge
                        key={insight.id}
                        variant={insight.id === currentInsight.id ? "default" : "outline"}
                        className="text-xs cursor-pointer"
                        onClick={() => setCurrentIndex(insights.findIndex(i => i.id === insight.id))}
                      >
                        {index + 1}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {insightsSetoriais.length > 0 && (
                <div>
                  <div className="text-xs font-medium text-muted-foreground mb-1">
                    Avisos Setoriais ({insightsSetoriais.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {insightsSetoriais.map((insight, index) => (
                      <Badge
                        key={insight.id}
                        variant={insight.id === currentInsight.id ? "secondary" : "outline"}
                        className="text-xs cursor-pointer"
                        onClick={() => setCurrentIndex(insights.findIndex(i => i.id === insight.id))}
                      >
                        {insight.setor} {index + 1}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <Button variant="outline" onClick={handleClose}>
              Fechar
            </Button>
            {currentIndex < insights.length - 1 ? (
              <Button onClick={handleNext}>
                Próximo Insight
              </Button>
            ) : (
              <Button onClick={handleClose}>
                Finalizar
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}