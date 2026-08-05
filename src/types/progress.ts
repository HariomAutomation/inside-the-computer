import type { MasteryLevel } from './curriculum';

export interface ModuleProgress {
  moduleId: string;
  completedLessons: string[];
  masteryLevel: MasteryLevel;
  quizScore: number;
  lastVisitedTimestamp: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface UserProgressState {
  xp: number;
  level: number;
  currentStreakDays: number;
  monthlyStreakDays: number;
  completedModules: string[];
  moduleProgress: Record<string, ModuleProgress>;
  achievements: Achievement[];
  activityHeatmap: Record<string, number>; // date string -> count
}
