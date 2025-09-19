export interface TutorialStep {
  id: string
  tutorialId: string
  step: number
  title: string
  description: string
  elementSelector?: string
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center'
  allowSkip?: boolean
  action?: 'click' | 'hover' | 'focus' | 'none'
}

export interface Tutorial {
  id: string
  name: string
  userType: 'admin' | 'common' | 'all'
  screen?: string
  description: string
  steps: TutorialStep[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserTutorialProgress {
  id: string
  userId: string
  tutorialId: string
  currentStep: number
  completed: boolean
  skipped: boolean
  completedAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface TutorialState {
  isActive: boolean
  currentTutorial?: Tutorial
  currentStep: number
  showOverlay: boolean
  canSkip: boolean
}

export interface TutorialConfig {
  autoStart: boolean
  showOnFirstAccess: boolean
  allowSkip: boolean
  overlayColor: string
  highlightColor: string
  animationDuration: number
}

export type TutorialTrigger = 'first-login' | 'first-screen-access' | 'manual' | 'help-button'

export interface TutorialContext {
  state: TutorialState
  config: TutorialConfig
  startTutorial: (tutorialId: string) => void
  nextStep: () => void
  previousStep: () => void
  skipTutorial: () => void
  completeTutorial: () => void
  restartTutorial: () => void
  closeTutorial: () => void
}