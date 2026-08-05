import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw } from 'lucide-react';
import { useState, useCallback } from 'react';

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  sectionTitle: string;
}

export default function Quiz({ questions, sectionTitle }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = questions[currentQ];

  const handleSelect = useCallback((idx: number) => {
    if (revealed) return;
    setSelected(idx);
    setRevealed(true);
    if (idx === q.correct) {
      setScore((s) => s + 1);
    }
  }, [revealed, q.correct]);

  const handleNext = useCallback(() => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((c) => c + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      setCompleted(true);
    }
  }, [currentQ, questions.length]);

  const handleRestart = useCallback(() => {
    setCurrentQ(0);
    setSelected(null);
    setRevealed(false);
    setScore(0);
    setCompleted(false);
  }, []);

  if (completed) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <motion.div
        className="glass rounded-2xl p-6 sm:p-8 max-w-lg mx-auto text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <motion.div
          className="text-5xl mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
        >
          {percent >= 80 ? '🎉' : percent >= 50 ? '👍' : '📚'}
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Quiz Complete!</h3>
        <p className="text-white/60 mb-4">
          You scored <span className="text-primary-400 font-bold">{score}/{questions.length}</span>
        </p>
        <div className="w-full bg-surface-400/30 rounded-full h-3 mb-6 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{
              background: percent >= 80
                ? 'oklch(0.72 0.20 145)'
                : percent >= 50
                ? 'oklch(0.78 0.18 75)'
                : 'oklch(0.65 0.22 25)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          />
        </div>
        <motion.button
          onClick={handleRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-medium text-sm"
          style={{ background: 'linear-gradient(135deg, oklch(0.55 0.22 275), oklch(0.55 0.24 295))' }}
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
      className="glass rounded-2xl p-6 sm:p-8 max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <HelpCircle size={18} className="text-primary-400" />
        <span className="text-xs text-white/50 font-medium uppercase tracking-wider">
          Quick Check — {sectionTitle}
        </span>
      </div>
      <p className="text-sm font-mono text-white/40 mb-1">
        Question {currentQ + 1} of {questions.length}
      </p>
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

      <div className="space-y-3 mb-5">
        {q.options.map((opt, i) => {
          let borderColor = 'border-white/10';
          let bgColor = 'bg-surface-300/30';
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
              className={`w-full text-left px-4 py-3 rounded-xl border ${borderColor} ${bgColor} text-sm text-white/80 hover:text-white transition-all duration-200 flex items-center gap-3`}
              whileHover={!revealed ? { scale: 1.02, x: 4 } : {}}
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
            <motion.button
              onClick={handleNext}
              className="w-full py-2.5 rounded-xl text-white font-medium text-sm"
              style={{ background: 'linear-gradient(135deg, oklch(0.55 0.22 275), oklch(0.55 0.24 295))' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentQ < questions.length - 1 ? 'Next Question →' : 'See Results'}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
