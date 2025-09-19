"use client"

import { useState, useEffect, useCallback } from 'react'
import { Tutorial, TutorialState, TutorialConfig, UserTutorialProgress } from '../types'
import { tutorials, getTutorialByScreen, getFirstAccessTutorial } from '../data/tutorials'

const defaultConfig: TutorialConfig = {
  autoStart: true,
  showOnFirstAccess: true,
  allowSkip: true,
  overlayColor: 'hsl(var(--background) / 0.8)',
  highlightColor: 'hsl(var(--primary))',
  animationDuration: 300,
}

const defaultState: TutorialState = {
  isActive: false,
  currentStep: 0,
  showOverlay: false,
  canSkip: true,
}

export function useTutorial() {
  const [state, setState] = useState<TutorialState>(defaultState)
  const [config] = useState<TutorialConfig>(defaultConfig)
  const [userProgress, setUserProgress] = useState<UserTutorialProgress[]>([])

  // Simular dados do usuário logado - em produção viria do contexto de auth
  const currentUser = {
    id: '1',
    type: 'admin' as const, // ou 'common'
    isFirstAccess: false // seria verificado no backend
  }

  // Verificar se usuário já viu um tutorial específico
  const hasSeenTutorial = useCallback((tutorialId: string): boolean => {
    return userProgress.some(progress =>
      progress.tutorialId === tutorialId && progress.completed
    )
  }, [userProgress])

  // Verificar se é o primeiro acesso a uma tela
  const isFirstScreenAccess = useCallback((screen: string): boolean => {
    const tutorial = getTutorialByScreen(screen, currentUser.type)
    if (!tutorial) return false
    return !hasSeenTutorial(tutorial.id)
  }, [currentUser.type, hasSeenTutorial])

  // Iniciar tutorial
  const startTutorial = useCallback((tutorialId: string) => {
    const tutorial = tutorials.find(t => t.id === tutorialId)
    if (!tutorial || tutorial.steps.length === 0) return

    setState({
      isActive: true,
      currentTutorial: tutorial,
      currentStep: 0,
      showOverlay: true,
      canSkip: tutorial.steps[0]?.allowSkip ?? config.allowSkip,
    })
  }, [config.allowSkip])

  // Próximo passo
  const nextStep = useCallback(() => {
    setState(prev => {
      if (!prev.currentTutorial || prev.currentStep >= prev.currentTutorial.steps.length - 1) {
        return prev
      }

      const nextStepIndex = prev.currentStep + 1
      const nextStepData = prev.currentTutorial.steps[nextStepIndex]

      return {
        ...prev,
        currentStep: nextStepIndex,
        canSkip: nextStepData?.allowSkip ?? config.allowSkip,
      }
    })
  }, [config.allowSkip])

  // Passo anterior
  const previousStep = useCallback(() => {
    setState(prev => {
      if (prev.currentStep <= 0) return prev

      const prevStepIndex = prev.currentStep - 1
      const prevStepData = prev.currentTutorial?.steps[prevStepIndex]

      return {
        ...prev,
        currentStep: prevStepIndex,
        canSkip: prevStepData?.allowSkip ?? config.allowSkip,
      }
    })
  }, [config.allowSkip])

  // Pular tutorial
  const skipTutorial = useCallback(() => {
    if (!state.currentTutorial) return

    // Marcar como pulado no progresso
    const progress: UserTutorialProgress = {
      id: Date.now().toString(),
      userId: currentUser.id,
      tutorialId: state.currentTutorial.id,
      currentStep: state.currentStep,
      completed: false,
      skipped: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setUserProgress(prev => [...prev, progress])
    setState(defaultState)
  }, [state.currentTutorial, state.currentStep, currentUser.id])

  // Completar tutorial
  const completeTutorial = useCallback(() => {
    if (!state.currentTutorial) return

    // Marcar como completo no progresso
    const progress: UserTutorialProgress = {
      id: Date.now().toString(),
      userId: currentUser.id,
      tutorialId: state.currentTutorial.id,
      currentStep: state.currentTutorial.steps.length - 1,
      completed: true,
      skipped: false,
      completedAt: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    setUserProgress(prev => [...prev, progress])
    setState(defaultState)
  }, [state.currentTutorial, currentUser.id])

  // Reiniciar tutorial
  const restartTutorial = useCallback(() => {
    if (!state.currentTutorial) return

    setState(prev => ({
      ...prev,
      currentStep: 0,
      canSkip: prev.currentTutorial?.steps[0]?.allowSkip ?? config.allowSkip,
    }))
  }, [state.currentTutorial, config.allowSkip])

  // Fechar tutorial
  const closeTutorial = useCallback(() => {
    setState(defaultState)
  }, [])

  // Iniciar tutorial de primeira tela (se aplicável)
  const startScreenTutorial = useCallback((screen: string) => {
    if (!config.autoStart) return

    const tutorial = getTutorialByScreen(screen, currentUser.type)
    if (tutorial && isFirstScreenAccess(screen)) {
      startTutorial(tutorial.id)
    }
  }, [config.autoStart, currentUser.type, isFirstScreenAccess, startTutorial])

  // Iniciar tutorial de primeiro acesso
  const startFirstAccessTutorial = useCallback(() => {
    if (!currentUser.isFirstAccess || !config.showOnFirstAccess) return

    const tutorial = getFirstAccessTutorial(currentUser.type)
    if (tutorial && !hasSeenTutorial(tutorial.id)) {
      startTutorial(tutorial.id)
    }
  }, [currentUser.isFirstAccess, currentUser.type, config.showOnFirstAccess, hasSeenTutorial, startTutorial])

  // Effect para primeiro acesso
  useEffect(() => {
    startFirstAccessTutorial()
  }, [startFirstAccessTutorial])

  return {
    state,
    config,
    userProgress,
    hasSeenTutorial,
    isFirstScreenAccess,
    startTutorial,
    nextStep,
    previousStep,
    skipTutorial,
    completeTutorial,
    restartTutorial,
    closeTutorial,
    startScreenTutorial,
    startFirstAccessTutorial,
  }
}