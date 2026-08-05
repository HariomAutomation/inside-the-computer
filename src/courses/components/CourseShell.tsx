import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, CheckCircle2, Circle, Trophy, Sparkles, ChevronRight } from 'lucide-react';
import type { CourseSection, LearnerProfile } from '../types';
import QuizModal from './QuizModal';

interface CourseShellProps {
  courseId: string;
  title: string;
  sections: CourseSection[];
  profile: LearnerProfile;
  onSectionComplete: (sectionId: string) => void;
  onQuizComplete: (sectionId: string, score: number) => void;
  onBack: () => void;
  onNextCourse?: () => void;
  nextCourseTitle?: string;
}

export default function CourseShell({ courseId, title, sections, profile, onSectionComplete, onQuizComplete, onBack, onNextCourse, nextCourseTitle }: CourseShellProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const current = sections[currentIdx];
  const progress = profile.totalQuizzesPassed || 0;
  const progressPct = Math.round((progress / Math.max(1, sections.length)) * 100);

  const completedCount = profile.totalQuizzesPassed || 0;

  return (
    <div className="min-h-screen bg-surface-950 text-white">
      {/* Top bar */}
      <div className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button onClick={onBack} className="text-white/60 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-sm font-bold">{title}</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-1.5 bg-surface-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <span className="text-[10px] text-white/50 font-mono">{completedCount}/{sections.length}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-mono font-bold">{profile.totalXP || 0} XP</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 flex gap-6">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24 space-y-1 course-sidebar pr-2 max-h-[calc(100vh-8rem)] overflow-y-auto">
            {sections.map((section, i) => {
              const isDone = i < currentIdx;
              const isActive = i === currentIdx;
              return (
                <button
                  key={section.id}
                  onClick={() => { setCurrentIdx(i); setShowQuiz(false); }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-primary-500/20 border border-primary-500/30 text-primary-300'
                      : isDone
                        ? 'glass border border-green-500/20 text-green-400'
                        : 'glass border border-white/5 text-white/60 hover:text-white'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 shrink-0" />
                  )}
                  <span className="truncate">{section.title}</span>
                </button>
              );
            })}

            <div className="pt-4 mt-4 border-t border-white/10">
              <div className="px-3 py-2">
                <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Mastery</p>
                <p className="text-sm font-bold text-primary-400 mt-1">Level {profile.level || 1}</p>
              </div>
              <div className="px-3 py-2">
                <p className="text-[10px] text-white/40 font-mono uppercase tracking-wider">Streak</p>
                <p className="text-sm font-bold text-amber-400 mt-1">{profile.streakDays || 0} days</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 pb-24">
          <AnimatePresence mode="wait">
            {!showQuiz ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {current.component}
              </motion.div>
            ) : (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                {current.quiz && (
                  <QuizModal
                    questions={current.quiz}
                    courseId={courseId}
                    sectionId={current.id}
                    onComplete={(score, _total) => {
                      onQuizComplete(current.id, score);
                      setShowQuiz(false);
                      if (currentIdx < sections.length - 1) {
                        setCurrentIdx(currentIdx + 1);
                      }
                    }}
                  />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Sticky bottom navigation bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => { if (currentIdx > 0) setCurrentIdx(currentIdx - 1); setShowQuiz(false); }}
            disabled={currentIdx === 0}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white/5 border border-white/10"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Prev
          </button>

          <div className="flex-1 text-center">
            <p className="text-[10px] text-white/40 font-mono">
              Section {currentIdx + 1} of {sections.length}
            </p>
            <p className="text-xs font-bold text-white/80 truncate">{current.title}</p>
          </div>

          <div className="flex gap-2">
            {current.quiz && (
              <button
                onClick={() => setShowQuiz(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Quiz
              </button>
            )}

            {onNextCourse ? (
              <button
                onClick={() => {
                  onSectionComplete(current.id);
                  onNextCourse();
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:opacity-90 transition-all"
              >
                Next: {nextCourseTitle}
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onSectionComplete(current.id);
                  if (currentIdx < sections.length - 1) setCurrentIdx(currentIdx + 1);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-primary-500 to-purple-500 text-white hover:opacity-90 transition-all"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
