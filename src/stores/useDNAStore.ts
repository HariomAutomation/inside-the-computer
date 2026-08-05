import { create } from 'zustand';
import type { LearningDNAProfile } from '../types/dna';

interface DNAStore extends LearningDNAProfile {
  updateProfile: (updates: Partial<LearningDNAProfile>) => void;
}

export const useDNAStore = create<DNAStore>((set) => ({
  visualLearnerPercent: 88,
  codingPercent: 75,
  theoryPercent: 60,
  hardwarePercent: 92,
  mathPercent: 55,
  primaryLearningStyle: 'VISUAL',

  updateProfile: (updates) => set((state) => ({ ...state, ...updates })),
}));
