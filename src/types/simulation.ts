export type SimulationStepState = 
  | 'INTRODUCTION'
  | 'ANIMATION'
  | 'EXPLANATION'
  | 'INTERACTIVE_CONTROLS'
  | 'SANDBOX'
  | 'QUIZ'
  | 'MINI_PROJECT'
  | 'REVISION'
  | 'CHALLENGE'
  | 'SUMMARY';

export interface SimulationPlaybackConfig {
  isPlaying: boolean;
  playbackSpeed: number; // 0.5x, 1x, 1.5x, 2x
  currentStep: number;
  totalSteps: number;
  zoomLevel: number;
}

export interface SandboxParameter {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit: string;
}
