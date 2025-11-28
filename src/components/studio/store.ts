import { create } from 'zustand'

export type WindowType = 'project' | 'about' | 'contact' | 'finder'

export interface WindowState {
  id: string
  type: WindowType
  title: string
  isMinimized: boolean
  isMaximized: boolean
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  projectId?: string
}

interface StudioState {
  windows: WindowState[]
  activeWindowId: string | null
  highestZIndex: number

  openWindow: (type: WindowType, title: string, projectId?: string) => void
  closeWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  maximizeWindow: (id: string) => void
  focusWindow: (id: string) => void
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
}

export const useStudioStore = create<StudioState>((set, get) => ({
  windows: [],
  activeWindowId: null,
  highestZIndex: 1,

  openWindow: (type, title, projectId) => {
    const existingWindow = get().windows.find(
      w => w.type === type && w.projectId === projectId
    )

    if (existingWindow) {
      get().focusWindow(existingWindow.id)
      if (existingWindow.isMinimized) {
        set(state => ({
          windows: state.windows.map(w =>
            w.id === existingWindow.id ? { ...w, isMinimized: false } : w
          )
        }))
      }
      return
    }

    const id = `${type}-${Date.now()}`
    const offset = get().windows.length * 30
    const newZIndex = get().highestZIndex + 1

    const newWindow: WindowState = {
      id,
      type,
      title,
      isMinimized: false,
      isMaximized: false,
      position: { x: 100 + offset, y: 80 + offset },
      size: { width: 700, height: 500 },
      zIndex: newZIndex,
      projectId,
    }

    set(state => ({
      windows: [...state.windows, newWindow],
      activeWindowId: id,
      highestZIndex: newZIndex,
    }))
  },

  closeWindow: (id) => {
    set(state => ({
      windows: state.windows.filter(w => w.id !== id),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }))
  },

  minimizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
      activeWindowId: state.activeWindowId === id ? null : state.activeWindowId,
    }))
  },

  maximizeWindow: (id) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }))
  },

  focusWindow: (id) => {
    const newZIndex = get().highestZIndex + 1
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, zIndex: newZIndex } : w
      ),
      activeWindowId: id,
      highestZIndex: newZIndex,
    }))
  },

  updateWindowPosition: (id, position) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, position } : w
      ),
    }))
  },

  updateWindowSize: (id, size) => {
    set(state => ({
      windows: state.windows.map(w =>
        w.id === id ? { ...w, size } : w
      ),
    }))
  },
}))
