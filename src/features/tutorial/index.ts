// Componentes
export { TutorialProvider, useTutorialContext } from './components/tutorial-provider'
export { TutorialOverlay } from './components/tutorial-overlay'
export { TutorialHelpButton } from './components/tutorial-help-button'

// Hooks
export { useTutorial } from './hooks/use-tutorial'

// Tipos
export type { Tutorial, TutorialStep, TutorialState, TutorialConfig, UserTutorialProgress, TutorialContext, TutorialTrigger } from './types'

// Dados
export { tutorials, getTutorialsByUserType, getTutorialByScreen, getFirstAccessTutorial } from './data/tutorials'