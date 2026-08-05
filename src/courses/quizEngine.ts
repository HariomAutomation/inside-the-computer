import type { QuizQuestion } from './types';

export function checkAnswer(question: QuizQuestion, answer: number | string): boolean {
  if (question.type === 'MCQ') {
    return answer === question.correct;
  }
  if (question.type === 'FILL_BLANK') {
    return String(answer).toLowerCase().trim() === String(question.correct).toLowerCase().trim();
  }
  return answer === question.correct;
}

export function calculateScore(questions: QuizQuestion[], answers: (number | string)[]): {
  score: number;
  total: number;
  percentage: number;
  details: { question: QuizQuestion; correct: boolean }[];
} {
  let score = 0;
  const details = questions.map((q, i) => {
    const isCorrect = checkAnswer(q, answers[i]);
    if (isCorrect) score++;
    return { question: q, correct: isCorrect };
  });

  return {
    score,
    total: questions.length,
    percentage: questions.length > 0 ? Math.round((score / questions.length) * 100) : 0,
    details,
  };
}
