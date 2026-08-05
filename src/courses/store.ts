import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { LearnerProfile, MasteryLevel } from './types';

interface CourseStore extends LearnerProfile {
  currentCourseId: string | null;
  currentSectionId: string | null;
  isPlaying: boolean;
  animationSpeed: number;

  setCurrentCourse: (courseId: string | null) => void;
  setCurrentSection: (sectionId: string | null) => void;
  togglePlay: () => void;
  setAnimationSpeed: (speed: number) => void;
  completeSection: (courseId: string, sectionId: string, quizScore: number, quizTotal: number) => void;
  addXP: (amount: number) => void;
  unlockAchievement: (id: string, title: string, description: string, icon: string) => void;
  recordActivity: () => void;
  getMasteryLevel: (quizScore: number, quizTotal: number) => MasteryLevel;
}

export const useCourseStore = create<CourseStore>()(
  persist(
    (set, get) => ({
      totalXP: 0,
      level: 1,
      streakDays: 0,
      coursesCompleted: 0,
      totalQuizzesTaken: 0,
      totalQuizzesPassed: 0,
      weakTopics: [],
      strongTopics: [],
      courseProgress: {},
      activityHeatmap: {},
      achievements: [],
      currentCourseId: null,
      currentSectionId: null,
      isPlaying: false,
      animationSpeed: 1,

      setCurrentCourse: (courseId) => set({ currentCourseId: courseId }),
      setCurrentSection: (sectionId) => set({ currentSectionId: sectionId }),
      togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),

      completeSection: (courseId, sectionId, quizScore, quizTotal) =>
        set((state) => {
          const mastery = get().getMasteryLevel(quizScore, quizTotal);
          const passed = quizScore >= Math.ceil(quizTotal * 0.6);
          const xpGain = passed ? 50 + quizScore * 5 : 10;

          const courseProg = state.courseProgress[courseId] || {
            courseId,
            sections: {},
            overallScore: 0,
          };

          const updatedSections = {
            ...courseProg.sections,
            [sectionId]: {
              completed: true,
              quizScore,
              quizTotal,
              masteryLevel: mastery,
              lastVisited: Date.now(),
            },
          };

          const totalScore = Object.values(updatedSections).reduce((a, s) => a + s.quizScore, 0);
          const totalPossible = Object.values(updatedSections).reduce((a, s) => a + s.quizTotal, 0);

          // Record activity & calculate streak
          const today = new Date().toISOString().split('T')[0];
          const newHeatmap = {
            ...state.activityHeatmap,
            [today]: (state.activityHeatmap[today] || 0) + 1,
          };
          let streak = 0;
          const d = new Date();
          while (true) {
            const key = d.toISOString().split('T')[0];
            if (newHeatmap[key]) {
              streak++;
              d.setDate(d.getDate() - 1);
            } else {
              break;
            }
          }

          return {
            courseProgress: {
              ...state.courseProgress,
              [courseId]: {
                ...courseProg,
                sections: updatedSections,
                overallScore: totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0,
              },
            },
            totalXP: state.totalXP + xpGain,
            level: Math.floor((state.totalXP + xpGain) / 500) + 1,
            totalQuizzesTaken: state.totalQuizzesTaken + 1,
            totalQuizzesPassed: state.totalQuizzesPassed + (passed ? 1 : 0),
            activityHeatmap: newHeatmap,
            streakDays: streak,
          };
        }),

      addXP: (amount) =>
        set((state) => ({
          totalXP: state.totalXP + amount,
          level: Math.floor((state.totalXP + amount) / 500) + 1,
        })),

      unlockAchievement: (id, title, description, icon) =>
        set((state) => {
          if (state.achievements.find((a) => a.id === id)) return state;
          return {
            achievements: [
              ...state.achievements,
              { id, title, description, icon, unlockedAt: Date.now() },
            ],
          };
        }),

      recordActivity: () => {
        const today = new Date().toISOString().split('T')[0];
        set((state) => {
          const newHeatmap = {
            ...state.activityHeatmap,
            [today]: (state.activityHeatmap[today] || 0) + 1,
          };
          // Calculate streak from consecutive days
          let streak = 0;
          const d = new Date();
          while (true) {
            const key = d.toISOString().split('T')[0];
            if (newHeatmap[key]) {
              streak++;
              d.setDate(d.getDate() - 1);
            } else {
              break;
            }
          }
          return {
            activityHeatmap: newHeatmap,
            streakDays: streak,
          };
        });
      },

      getMasteryLevel: (quizScore, quizTotal) => {
        const pct = quizTotal > 0 ? (quizScore / quizTotal) * 100 : 0;
        if (pct >= 95) return 'TEACH';
        if (pct >= 80) return 'BUILD';
        if (pct >= 60) return 'EXPLAIN';
        if (pct >= 40) return 'UNDERSTAND';
        return 'RECOGNIZE';
      },
    }),
    {
      name: 'inside-the-computer-progress',
    }
  )
);
