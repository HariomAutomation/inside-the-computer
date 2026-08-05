export interface MentorMessage {
  id: string;
  sender: 'ADA' | 'USER';
  timestamp: number;
  text: string;
  type?: 'QUESTION' | 'REVISION_ALERT' | 'PRAISE' | 'EXPLAIN';
  suggestedAction?: {
    label: string;
    targetModuleId: string;
  };
}

export interface AdaMemoryState {
  completedLessonsCount: number;
  weakTopics: string[];
  strongTopics: string[];
  failedQuizCount: number;
  preferredLanguage: 'HINGLISH' | 'ENGLISH';
  lastReviewedDate: string;
  revisionSchedule: Record<string, number>; // topic -> SM2 interval in days
}
