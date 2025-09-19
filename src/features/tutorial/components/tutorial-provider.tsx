"use client"

import React, { createContext, useContext } from 'react'
import { useTutorial } from '../hooks/use-tutorial'
import { TutorialOverlay } from './tutorial-overlay'
import { TutorialContext } from '../types'

const TutorialContextProvider = createContext<TutorialContext | null>(null)

interface TutorialProviderProps {
  children: React.ReactNode
}

export function TutorialProvider({ children }: TutorialProviderProps) {
  const tutorial = useTutorial()

  const contextValue: TutorialContext = {
    state: tutorial.state,
    config: tutorial.config,
    startTutorial: tutorial.startTutorial,
    nextStep: tutorial.nextStep,
    previousStep: tutorial.previousStep,
    skipTutorial: tutorial.skipTutorial,
    completeTutorial: tutorial.completeTutorial,
    restartTutorial: tutorial.restartTutorial,
    closeTutorial: tutorial.closeTutorial,
  }

  return (
    <TutorialContextProvider.Provider value={contextValue}>
      {children}

      {/* Renderizar overlay se tutorial estiver ativo */}
      {tutorial.state.isActive && tutorial.state.currentTutorial && (
        <TutorialOverlay
          tutorial={tutorial.state.currentTutorial}
          currentStep={tutorial.state.currentStep}
          isActive={tutorial.state.isActive}
          canSkip={tutorial.state.canSkip}
          onNext={tutorial.nextStep}
          onPrevious={tutorial.previousStep}
          onSkip={tutorial.skipTutorial}
          onComplete={tutorial.completeTutorial}
          onClose={tutorial.closeTutorial}
          onRestart={tutorial.restartTutorial}
        />
      )}
    </TutorialContextProvider.Provider>
  )
}

// Hook para usar o contexto do tutorial
export function useTutorialContext() {
  const context = useContext(TutorialContextProvider)
  if (!context) {
    throw new Error('useTutorialContext must be used within a TutorialProvider')
  }
  return context
}