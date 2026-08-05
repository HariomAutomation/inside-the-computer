import { create } from 'zustand';
import type { UserProgressState } from '../types/progress';

interface ProgressStore extends UserProgressState {
  addXP: (amount: number) => void;
  markLessonComplete: (moduleId: string, lessonId: string) => void;
  unlockAchievement: (achievementId: string) => void;
  recordActivityToday: () => void;
}

export const useProgressStore = create<ProgressStore>((set) => ({
  xp: 1250,
  level: 4,
  currentStreakDays: 7,
  monthlyStreakDays: 18,
  completedModules: ['m1', 'm2'],
  moduleProgress: {
    m1: {
      moduleId: 'm1',
      completedLessons: ['l1', 'l2', 'l3'],
      masteryLevel: 'BUILD',
      quizScore: 100,
      lastVisitedTimestamp: Date.now(),
    },
    m2: {
      moduleId: 'm2',
      completedLessons: ['l1', 'l2'],
      masteryLevel: 'UNDERSTAND',
      quizScore: 90,
      lastVisitedTimestamp: Date.now(),
    },
  },
  achievements: [
    { id: 'first_gate', title: 'Silicon Pioneer', description: 'Built your first PMOS/NMOS CMOS Transistor', icon: '⚡', unlockedAt: Date.now() - 86400000 },
    { id: 'adder_master', title: 'Binary Wizard', description: 'Assembled a 4-bit Ripple Carry Adder', icon: '🧮', unlockedAt: Date.now() },
  ],
  activityHeatmap: {
    '2026-08-01': 4,
    '2026-08-02': 6,
    '2026-08-03': 3,
    '2026-08-04': 8,
    '2026-08-05': 5,
  },

  addXP: (amount) =>
    set((state) => ({
      xp: state.xp + amount,
      level: Math.floor((state.xp + amount) / 300) + 1,
    })),

  markLessonComplete: (moduleId, lessonId) =>
    set((state) => {
      const current = state.moduleProgress[moduleId] || {
        moduleId,
        completedLessons: [],
        masteryLevel: 'RECOGNIZE',
        quizScore: 0,
        lastVisitedTimestamp: Date.now(),
      };
      if (!current.completedLessons.includes(lessonId)) {
        return {
          xp: state.xp + 50,
          moduleProgress: {
            ...state.moduleProgress,
            [moduleId]: {
              ...current,
              completedLessons: [...current.completedLessons, lessonId],
              lastVisitedTimestamp: Date.now(),
            },
          },
        };
      }
      return state;
    }),

  unlockAchievement: (achievementId) =>
    set((state) => ({
      achievements: state.achievements.map((ach) =>
        ach.id === achievementId ? { ...ach, unlockedAt: Date.now() } : ach
      ),
    })),

  recordActivityToday: () => {
    const today = new Date().toISOString().split('T')[0];
    set((state) => ({
      activityHeatmap: {
        ...state.activityHeatmap,
        [today]: (state.activityHeatmap[today] || 0) + 1,
      },
    }));
  },
}));
