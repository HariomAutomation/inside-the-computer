import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import type { QuizQuestion } from '../types';
import { checkAnswer } from '../quizEngine';
import { useCourseStore } from '../store';

interface QuizModalProps {
  questions: QuizQuestion[];
  courseId: string;
  sectionId: string;
  onComplete: (score: number, total: number) => void;
}

export default function QuizModal({ questions, courseId, sectionId, onComplete }: QuizModalProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | string)[]>([]);
  const [selected, setSelected] = useState<number | string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const completeSection = useCourseStore((s) => s.completeSection);

  const q = questions[currentQ];

  const handleSelect = useCallback((idx: number) => {
    if (revealed) return;
    setSelected(idx);
  }, [revealed]);

  const handleSubmit = useCallback(() => {
    if (selected === null) return;
    setRevealed(true);
    const isCorrect = checkAnswer(q, selected);
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    if (isCorrect) setScore((s) => s + 1);
  }, [selected, q, answers]);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setCompleted(true);
      const finalScore = score + (checkAnswer(q, selected!) ? 1 : 0);
      completeSection(courseId, sectionId, finalScore, questions.length);
      onComplete(finalScore, questions.length);
    }
  }, [currentQ, questions.length, score, q, selected, courseId, sectionId, completeSection, onComplete]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setAnswers([]);
    setSelected(null);
    setRevealed(false);
    setCompleted(false);
    setScore(0);
  }, []);

  if (completed) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-strong rounded-3xl p-8 text-center border border-white/10"
      >
        <motion.div
          className="text-5xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          {pct >= 80 ? '🎉' : pct >= 50 ? '👍' : '📚'}
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Section Complete!</h3>
        <p className="text-white/60 mb-4">
          You scored <span className="text-primary-400 font-bold">{score}/{questions.length}</span>
        </p>
        <div className="w-full bg-surface-800 rounded-full h-3 mb-6 overflow-hidden max-w-xs mx-auto">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: pct >= 80 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <motion.button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-500 text-white font-medium text-sm hover:bg-primary-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw size={16} /> Retry
        </motion.button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-strong rounded-3xl p-6 sm:p-8 border border-white/10"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-white/50 font-mono uppercase tracking-wider">Quick Check</span>
        <span className="text-xs text-white/40 font-mono">
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.h3
          key={currentQ}
          className="text-base sm:text-lg font-semibold text-white mb-5 leading-relaxed"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {q.question}
        </motion.h3>
      </AnimatePresence>

      {q.type === 'MCQ' && q.options && (
        <div className="space-y-3 mb-5">
          {q.options.map((opt, i) => {
            let borderColor = 'border-white/10';
            let bgColor = 'bg-surface-800/50';
            if (revealed) {
              if (i === q.correct) {
                borderColor = 'border-green-500/60';
                bgColor = 'bg-green-500/10';
              } else if (i === selected) {
                borderColor = 'border-red-500/60';
                bgColor = 'bg-red-500/10';
              }
            } else if (i === selected) {
              borderColor = 'border-primary-400/60';
              bgColor = 'bg-primary-500/10';
            }

            return (
              <motion.button
                key={i}
                onClick={() => handleSelect(i)}
                className={`quiz-option w-full text-left px-4 py-3 rounded-xl border ${borderColor} ${bgColor} text-sm text-white/80 hover:text-white transition-all flex items-center gap-3 ${revealed ? 'disabled' : ''} ${i === selected ? 'selected' : ''}`}
                whileHover={!revealed ? { x: 4 } : {}}
                whileTap={!revealed ? { scale: 0.98 } : {}}
              >
                <span className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center text-xs font-mono flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                {opt}
                {revealed && i === q.correct && (
                  <CheckCircle2 size={16} className="ml-auto text-green-400 flex-shrink-0" />
                )}
                {revealed && i === selected && i !== q.correct && (
                  <XCircle size={16} className="ml-auto text-red-400 flex-shrink-0" />
                )}
              </motion.button>
            );
          })}
        </div>
      )}

      {q.type === 'FILL_BLANK' && (
        <div className="mb-5">
          <input
            type="text"
            value={selected !== null ? String(selected) : ''}
            onChange={(e) => setSelected(e.target.value)}
            disabled={revealed}
            placeholder="Type your answer..."
            className="w-full bg-surface-800 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-primary-400 font-mono disabled:opacity-50"
          />
        </div>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="glass rounded-xl p-4 mb-4">
              <p className="text-sm text-white/70 leading-relaxed">{q.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-end">
        {!revealed ? (
          <motion.button
            onClick={handleSubmit}
            disabled={selected === null}
            className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              selected !== null
                ? 'bg-primary-500 text-white hover:bg-primary-600'
                : 'glass text-white/30 cursor-not-allowed'
            }`}
            whileHover={selected !== null ? { scale: 1.05 } : {}}
            whileTap={selected !== null ? { scale: 0.95 } : {}}
          >
            Submit
          </motion.button>
        ) : (
          <motion.button
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-green-500 text-white font-mono text-xs font-bold hover:bg-green-600 transition-all flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {currentQ < questions.length - 1 ? 'Next' : 'See Results'} <ArrowRight size={14} />
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
