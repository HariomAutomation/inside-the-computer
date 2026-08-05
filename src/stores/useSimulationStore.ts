import { create } from 'zustand';
import type { SimulationStepState } from '../types/simulation';

interface SimulationStore {
  currentStepState: SimulationStepState;
  isPlaying: boolean;
  playbackSpeed: number;
  currentFrame: number;
  totalFrames: number;
  zoomLevel: number;
  activeSimulatorId: string;

  setStepState: (step: SimulationStepState) => void;
  togglePlay: () => void;
  setSpeed: (speed: number) => void;
  stepForward: () => void;
  stepBack: () => void;
  resetSimulation: () => void;
  setZoom: (zoom: number) => void;
  setActiveSimulator: (id: string) => void;
}

export const useSimulationStore = create<SimulationStore>((set) => ({
  currentStepState: 'INTRODUCTION',
  isPlaying: false,
  playbackSpeed: 1,
  currentFrame: 0,
  totalFrames: 100,
  zoomLevel: 1,
  activeSimulatorId: 'cmos-inverter',

  setStepState: (step) => set({ currentStepState: step }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setSpeed: (speed) => set({ playbackSpeed: speed }),
  stepForward: () =>
    set((state) => ({
      currentFrame: Math.min(state.totalFrames, state.currentFrame + 1),
    })),
  stepBack: () =>
    set((state) => ({
      currentFrame: Math.max(0, state.currentFrame - 1),
    })),
  resetSimulation: () => set({ currentFrame: 0, isPlaying: false }),
  setZoom: (zoom) => set({ zoomLevel: zoom }),
  setActiveSimulator: (id) => set({ activeSimulatorId: id, currentFrame: 0 }),
}));
