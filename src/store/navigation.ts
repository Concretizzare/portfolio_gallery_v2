import { create } from 'zustand'

export type Section =
  | 'landing'
  | 'index'
  | 'project-ecommerce'
  | 'project-hybrid'
  | 'project-boutique'
  | 'project-shipping'
  | 'project-ai-render'
  | 'about'
  | 'contact'

export type CameraState = {
  position: [number, number, number]
  target: [number, number, number]
  fov: number
}

const CAMERA_STATES: Record<Section, CameraState> = {
  landing: {
    position: [0, 0, 8],
    target: [0, 0, 0],
    fov: 45,
  },
  index: {
    position: [0, 0, 12],
    target: [0, 0, 0],
    fov: 50,
  },
  'project-ecommerce': {
    position: [0, 0, 4],
    target: [0, 0, 0],
    fov: 40,
  },
  'project-hybrid': {
    position: [0, 0, 4],
    target: [0, 0, 0],
    fov: 40,
  },
  'project-boutique': {
    position: [0, 0, 4],
    target: [0, 0, 0],
    fov: 40,
  },
  'project-shipping': {
    position: [0, 0, 4],
    target: [0, 0, 0],
    fov: 40,
  },
  'project-ai-render': {
    position: [0, 0, 4],
    target: [0, 0, 0],
    fov: 40,
  },
  about: {
    position: [5, 2, 8],
    target: [0, 0, 0],
    fov: 45,
  },
  contact: {
    position: [-5, 2, 8],
    target: [0, 0, 0],
    fov: 45,
  },
}

const SECTION_ORDER: Section[] = [
  'landing',
  'index',
  'project-ecommerce',
  'project-hybrid',
  'project-boutique',
  'project-shipping',
  'project-ai-render',
  'about',
  'contact',
]

const PROJECT_SECTIONS: Section[] = [
  'project-ecommerce',
  'project-hybrid',
  'project-boutique',
  'project-shipping',
  'project-ai-render',
]

interface NavigationState {
  currentSection: Section
  previousSection: Section | null
  isTransitioning: boolean
  transitionProgress: number
  scrollAccumulator: number

  cameraState: CameraState
  targetCameraState: CameraState

  setSection: (section: Section) => void
  nextSection: () => void
  previousSectionNav: () => void
  setTransitioning: (isTransitioning: boolean) => void
  setTransitionProgress: (progress: number) => void
  accumulateScroll: (delta: number) => void
  resetScrollAccumulator: () => void

  getCurrentProjectIndex: () => number
  isInProjectView: () => boolean
}

export const useNavigationStore = create<NavigationState>((set, get) => ({
  currentSection: 'landing',
  previousSection: null,
  isTransitioning: false,
  transitionProgress: 0,
  scrollAccumulator: 0,

  cameraState: CAMERA_STATES.landing,
  targetCameraState: CAMERA_STATES.landing,

  setSection: (section) => {
    const current = get().currentSection
    if (current === section || get().isTransitioning) return

    set({
      previousSection: current,
      currentSection: section,
      isTransitioning: true,
      transitionProgress: 0,
      targetCameraState: CAMERA_STATES[section],
    })
  },

  nextSection: () => {
    const { currentSection, isTransitioning } = get()
    if (isTransitioning) return

    const currentIndex = SECTION_ORDER.indexOf(currentSection)
    if (currentIndex < SECTION_ORDER.length - 1) {
      get().setSection(SECTION_ORDER[currentIndex + 1])
    }
  },

  previousSectionNav: () => {
    const { currentSection, isTransitioning } = get()
    if (isTransitioning) return

    const currentIndex = SECTION_ORDER.indexOf(currentSection)
    if (currentIndex > 0) {
      get().setSection(SECTION_ORDER[currentIndex - 1])
    }
  },

  setTransitioning: (isTransitioning) => set({ isTransitioning }),

  setTransitionProgress: (progress) => set({ transitionProgress: progress }),

  accumulateScroll: (delta) => {
    const current = get().scrollAccumulator
    set({ scrollAccumulator: current + delta })
  },

  resetScrollAccumulator: () => set({ scrollAccumulator: 0 }),

  getCurrentProjectIndex: () => {
    const { currentSection } = get()
    return PROJECT_SECTIONS.indexOf(currentSection)
  },

  isInProjectView: () => {
    const { currentSection } = get()
    return PROJECT_SECTIONS.includes(currentSection)
  },
}))

export { CAMERA_STATES, SECTION_ORDER, PROJECT_SECTIONS }
