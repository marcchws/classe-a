"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { HelpCircle, Play, RotateCcw, BookOpen } from 'lucide-react'
import { useTutorialContext } from './tutorial-provider'
import { getTutorialsByUserType, getFirstAccessTutorial } from '../data/tutorials'

interface TutorialHelpButtonProps {
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  currentScreen?: string
}

export function TutorialHelpButton({
  className,
  variant = 'ghost',
  size = 'sm',
  currentScreen,
}: TutorialHelpButtonProps) {
  const { startTutorial } = useTutorialContext()
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  // Simular tipo de usuário - em produção viria do contexto de auth
  const userType = 'admin' as const // ou 'common'

  const availableTutorials = getTutorialsByUserType(userType)
  const firstAccessTutorial = getFirstAccessTutorial(userType)
  const screenTutorial = currentScreen
    ? availableTutorials.find(t => t.screen === currentScreen)
    : null

  const handleStartTutorial = (tutorialId: string) => {
    const tutorial = availableTutorials.find(t => t.id === tutorialId)

    // Se for o tutorial do dashboard e não estamos na tela do dashboard
    if (tutorial?.screen === 'dashboard' && currentScreen !== 'dashboard') {
      // Navegar para o dashboard com parâmetro para iniciar o tutorial
      router.push(`/dashboard?tutorial=${tutorialId}`)
    } else {
      startTutorial(tutorialId)
    }

    setIsOpen(false)
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={className}
          aria-label="Ajuda e Tutoriais"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Tutoriais e Ajuda</DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Tutorial da tela atual */}
        {screenTutorial && (
          <>
            <DropdownMenuItem onClick={() => handleStartTutorial(screenTutorial.id)}>
              <Play className="mr-2 h-4 w-4" />
              Tutorial desta tela
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}

        {/* Tutorial de primeiro acesso */}
        {firstAccessTutorial && (
          <DropdownMenuItem onClick={() => handleStartTutorial(firstAccessTutorial.id)}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Tutorial inicial
          </DropdownMenuItem>
        )}

        {/* Outros tutoriais disponíveis */}
        {availableTutorials.length > 0 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Todos os Tutoriais</DropdownMenuLabel>
            {availableTutorials.map((tutorial) => (
              <DropdownMenuItem
                key={tutorial.id}
                onClick={() => handleStartTutorial(tutorial.id)}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                {tutorial.name}
              </DropdownMenuItem>
            ))}
          </>
        )}

        {/* Mostrar status dos tutoriais em desenvolvimento */}
        {availableTutorials.length <= 1 && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Em Desenvolvimento</DropdownMenuLabel>
            <DropdownMenuItem disabled>
              <BookOpen className="mr-2 h-4 w-4 opacity-50" />
              Tutorial de Cadastros
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <BookOpen className="mr-2 h-4 w-4 opacity-50" />
              Tutorial Operacional
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <BookOpen className="mr-2 h-4 w-4 opacity-50" />
              Tutorial Financeiro
            </DropdownMenuItem>
            <DropdownMenuItem disabled>
              <BookOpen className="mr-2 h-4 w-4 opacity-50" />
              Tutorial de Relatórios
            </DropdownMenuItem>
          </>
        )}

        {availableTutorials.length === 0 && (
          <DropdownMenuItem disabled>
            Nenhum tutorial disponível
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}