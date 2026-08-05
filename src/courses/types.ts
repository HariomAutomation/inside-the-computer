import type { ReactNode } from 'react';

export type MasteryLevel = 'RECOGNIZE' | 'UNDERSTAND' | 'EXPLAIN' | 'BUILD' | 'TEACH';

export type QuizType = 'MCQ' | 'FILL_BLANK' | 'ARRANGE' | 'DRAG_DROP' | 'CODE_COMPLETE' | 'DEBUG';

export interface QuizQuestion {
  id: string;
  type: QuizType;
  question: string;
  options?: string[];
  correct: number | string;
  explanation: string;
}

export interface CourseSection {
  id: string;
  title: string;
  subtitle: string;
  duration: string;
  component: ReactNode;
  quiz: QuizQuestion[];
}

export interface Course {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  color: string;
  sections: CourseSection[];
  totalDuration: string;
}

export interface SectionProgress {
  completed: boolean;
  quizScore: number;
  quizTotal: number;
  masteryLevel: MasteryLevel;
  lastVisited: number;
}

export interface CourseProgress {
  courseId: string;
  sections: Record<string, SectionProgress>;
  overallScore: number;
  completedAt?: number;
}

export interface LearnerProfile {
  totalXP: number;
  level: number;
  streakDays: number;
  coursesCompleted: number;
  totalQuizzesTaken: number;
  totalQuizzesPassed: number;
  weakTopics: string[];
  strongTopics: string[];
  courseProgress: Record<string, CourseProgress>;
  activityHeatmap: Record<string, number>;
  achievements: Achievement[];
  completedSections?: string[];
  xp?: number;
  streak?: number;
  masteryLevel?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: number;
}

export interface CircuitGate {
  id: string;
  type: 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';
  x: number;
  y: number;
  inputs: string[];
  output?: boolean;
}

export interface CircuitWire {
  id: string;
  from: { gateId: string; port: number };
  to: { gateId: string; port: number };
}
