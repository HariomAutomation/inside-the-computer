export type MasteryLevel = 'RECOGNIZE' | 'UNDERSTAND' | 'EXPLAIN' | 'BUILD' | 'TEACH';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  title: string;
  subtitle: string;
  durationMinutes: number;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  prerequisites: string[];
  objectives: string[];
  theoryHinglish: string;
  theoryEnglish: string;
  siliconFact: string;
  realWorldUse: string;
  simplificationNote?: string;
  questions: QuizQuestion[];
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  lessons: Lesson[];
  capstoneProject: {
    id: string;
    title: string;
    description: string;
    objective: string;
  };
}
