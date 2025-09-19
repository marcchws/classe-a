"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { X, ChevronLeft, ChevronRight, SkipForward, RotateCcw, HelpCircle } from 'lucide-react'
import { Tutorial, TutorialStep } from '../types'

interface TutorialOverlayProps {
  tutorial: Tutorial
  currentStep: number
  isActive: boolean
  canSkip: boolean
  onNext: () => void
  onPrevious: () => void
  onSkip: () => void
  onComplete: () => void
  onClose: () => void
  onRestart: () => void
}

export function TutorialOverlay({
  tutorial,
  currentStep,
  isActive,
  canSkip,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
  onClose,
  onRestart,
}: TutorialOverlayProps) {
  const [highlightedElement, setHighlightedElement] = useState<HTMLElement | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 })

  const step = tutorial.steps[currentStep]
  const isLastStep = currentStep === tutorial.steps.length - 1
  const isFirstStep = currentStep === 0

  // Função para destacar elemento
  useEffect(() => {
    if (!isActive || !step?.elementSelector) {
      setHighlightedElement(null)
      return
    }

    const element = document.querySelector(step.elementSelector) as HTMLElement
    if (element) {
      setHighlightedElement(element)

      // Calcular posição do tooltip
      const rect = element.getBoundingClientRect()
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft

      let top = rect.top + scrollTop
      let left = rect.left + scrollLeft

      // Ajustar posição baseado na preferência do step
      switch (step.position) {
        case 'top':
          top = rect.top + scrollTop - 20
          left = rect.left + scrollLeft + rect.width / 2
          break
        case 'bottom':
          top = rect.top + scrollTop + rect.height + 20
          left = rect.left + scrollLeft + rect.width / 2
          break
        case 'left':
          top = rect.top + scrollTop + rect.height / 2
          left = rect.left + scrollLeft - 20
          break
        case 'right':
          top = rect.top + scrollTop + rect.height / 2
          left = rect.left + scrollLeft + rect.width + 20
          break
        case 'center':
        default:
          top = window.innerHeight / 2 + scrollTop
          left = window.innerWidth / 2 + scrollLeft
          break
      }

      setTooltipPosition({ top, left })

      // Scroll para o elemento se necessário
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [isActive, step, currentStep])

  // Adicionar classes de destaque
  useEffect(() => {
    if (highlightedElement) {
      highlightedElement.style.position = 'relative'
      highlightedElement.style.zIndex = '9999'
      highlightedElement.style.boxShadow = '0 0 0 4px hsl(var(--primary)), 0 0 0 8px hsl(var(--primary) / 0.3)'
      highlightedElement.style.borderRadius = '8px'
      highlightedElement.style.transition = 'all 0.3s ease'

      return () => {
        highlightedElement.style.position = ''
        highlightedElement.style.zIndex = ''
        highlightedElement.style.boxShadow = ''
        highlightedElement.style.borderRadius = ''
        highlightedElement.style.transition = ''
      }
    }
  }, [highlightedElement])

  // Lidar com ações do step
  const handleStepAction = () => {
    if (step?.action === 'click' && highlightedElement) {
      highlightedElement.click()
    }
  }

  if (!isActive || !step) return null

  return (
    <>
      {/* Overlay escuro */}
      <div
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
        data-state="open"
        onClick={canSkip ? onClose : undefined}
      />

      {/* Tooltip do tutorial */}
      <div
        className="fixed z-[9999] w-96 max-w-[95vw] sm:max-w-md transition-all duration-300"
        style={{
          top: tooltipPosition.top,
          left: tooltipPosition.left,
          transform: step.position === 'center' ? 'translate(-50%, -50%)' :
                    step.position === 'top' || step.position === 'bottom' ? 'translateX(-50%)' :
                    step.position === 'left' || step.position === 'right' ? 'translateY(-50%)' : 'none'
        }}
      >
        <Card className="shadow-xl border-2 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                <Badge variant="secondary" className="text-xs">
                  {currentStep + 1} de {tutorial.steps.length}
                </Badge>
              </div>
              {canSkip && (
                <Button variant="ghost" size="sm" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardTitle className="text-lg">{step.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <CardDescription className="text-sm leading-relaxed">
              {step.description}
            </CardDescription>

            {step.action && step.action !== 'none' && (
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm text-primary">
                  💡 {step.action === 'click' ? 'Clique no elemento destacado para continuar' :
                      step.action === 'hover' ? 'Passe o mouse sobre o elemento destacado' :
                      step.action === 'focus' ? 'Clique no campo destacado' : ''}
                </p>
              </div>
            )}

            {/* Botões de navegação */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex gap-2">
                {!isFirstStep && (
                  <Button variant="outline" size="sm" onClick={onPrevious}>
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Anterior
                  </Button>
                )}

                <Button variant="outline" size="sm" onClick={onRestart}>
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reiniciar
                </Button>
              </div>

              <div className="flex gap-2">
                {canSkip && (
                  <Button variant="ghost" size="sm" onClick={onSkip}>
                    <SkipForward className="h-4 w-4 mr-1" />
                    Pular
                  </Button>
                )}

                {isLastStep ? (
                  <Button size="sm" onClick={onComplete}>
                    Concluir
                  </Button>
                ) : (
                  <Button size="sm" onClick={step.action && step.action !== 'none' ? handleStepAction : onNext}>
                    {step.action && step.action !== 'none' ? 'Executar' : 'Próximo'}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </div>
            </div>

            {/* Indicador de progresso */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progresso</span>
                <span>{Math.round(((currentStep + 1) / tutorial.steps.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / tutorial.steps.length) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}