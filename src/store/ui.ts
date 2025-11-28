import { create } from 'zustand'

interface UIState {
  isCommandPaletteOpen: boolean
  isSettingsOpen: boolean
  isAudioEnabled: boolean
  audioVolume: number
  isReducedMotion: boolean
  hasInteracted: boolean
  isLoading: boolean
  loadingProgress: number

  toggleCommandPalette: () => void
  openCommandPalette: () => void
  closeCommandPalette: () => void

  toggleSettings: () => void
  openSettings: () => void
  closeSettings: () => void

  toggleAudio: () => void
  setAudioVolume: (volume: number) => void

  setReducedMotion: (reduced: boolean) => void
  setHasInteracted: (interacted: boolean) => void
  setLoading: (loading: boolean) => void
  setLoadingProgress: (progress: number) => void
}

export const useUIStore = create<UIState>((set) => ({
  isCommandPaletteOpen: false,
  isSettingsOpen: false,
  isAudioEnabled: false,
  audioVolume: 0.5,
  isReducedMotion: false,
  hasInteracted: false,
  isLoading: true,
  loadingProgress: 0,

  toggleCommandPalette: () => set((state) => ({
    isCommandPaletteOpen: !state.isCommandPaletteOpen,
    isSettingsOpen: false,
  })),
  openCommandPalette: () => set({ isCommandPaletteOpen: true, isSettingsOpen: false }),
  closeCommandPalette: () => set({ isCommandPaletteOpen: false }),

  toggleSettings: () => set((state) => ({
    isSettingsOpen: !state.isSettingsOpen,
    isCommandPaletteOpen: false,
  })),
  openSettings: () => set({ isSettingsOpen: true, isCommandPaletteOpen: false }),
  closeSettings: () => set({ isSettingsOpen: false }),

  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
  setAudioVolume: (volume) => set({ audioVolume: Math.max(0, Math.min(1, volume)) }),

  setReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
  setHasInteracted: (interacted) => set({ hasInteracted: interacted }),
  setLoading: (loading) => set({ isLoading: loading }),
  setLoadingProgress: (progress) => set({ loadingProgress: Math.max(0, Math.min(100, progress)) }),
}))
