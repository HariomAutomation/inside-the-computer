import { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight } from 'lucide-react';
import { MASTER_MODULES } from '../../constants/modulesData';
import { useProgressStore } from '../../stores/useProgressStore';

export default function QuizArena() {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('m1');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const { addXP, recordActivityToday } = useProgressStore();

  const currentModule = MASTER_MODULES.find((m) => m.id === selectedModuleId) || MASTER_MODULES[0];

  // Extract all questions for selected module
  const allQuestions = currentModule.lessons.flatMap((l) => l.questions);

  const currentQuestion = allQuestions[currentQuestionIndex] || {
    id: 'sample',
    question: `Module ${currentModule.moduleNumber} Comprehensive Quiz Question: CMOS transistors work in complementary pairs to ensure which physical property?`,
    options: [
      'Zero static standby power loss',
      'Maximum heat generation',
      'Continuous battery drain',
      'Unlimited voltage boost',
    ],
    correct: 0,
    explanation: 'Complementary pairing ensures one transistor is ALWAYS OFF in standby position, resulting in near-zero static power loss.',
  };

  const handleSelectOption = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correct) {
      setScore((s) => s + 1);
      addXP(25);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    } else {
      setIsCompleted(true);
      recordActivityToday();
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsCompleted(false);
  };

  return (
    <div className="w-full max-w-4xl px-4 py-8 flex flex-col items-center gap-8">
      {/* Header */}
      <div className="text-center max-w-2xl">
        <span className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-2 block glass px-4 py-1.5 rounded-full border border-purple-500/30">
          IIT-Grade Knowledge Evaluation Arena
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text">
          Assessment & Quiz Center
        </h1>
        <p className="text-xs text-white/70 mt-2">
          Pehle Module ko visuals aur simulators se padhein, fir yahan apni knowledge test karein!
        </p>
      </div>

      {/* Module Selector Ribbon */}
      <div className="w-full glass-strong py-3 px-4 rounded-2xl border border-white/10 flex justify-start overflow-x-auto gap-2 scrollbar-thin">
        {MASTER_MODULES.map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setSelectedModuleId(m.id);
              handleResetQuiz();
            }}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all whitespace-nowrap ${
              selectedModuleId === m.id
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                : 'glass text-white/60 hover:text-white'
            }`}
          >
            Mod {m.moduleNumber}: {m.title.split('.')[1] || m.title}
          </button>
        ))}
      </div>

      {/* Completion Screen */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl glass-strong rounded-3xl p-8 flex flex-col items-center gap-4 border border-green-500/30 shadow-2xl text-center"
        >
          <motion.div
            className="text-5xl mb-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            {score === allQuestions.length ? '🏆' : score >= allQuestions.length * 0.7 ? '🎉' : '📚'}
          </motion.div>
          <h2 className="text-2xl font-extrabold gradient-text">Quiz Complete!</h2>
          <p className="text-white/70 text-sm">
            You scored <span className="text-green-400 font-bold text-lg">{score}</span> out of <span className="font-bold">{allQuestions.length}</span> questions
          </p>
          <div className="w-full max-w-xs bg-surface-500 rounded-full h-3 overflow-hidden mt-2">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: score === allQuestions.length
                  ? 'oklch(0.72 0.20 145)'
                  : score >= allQuestions.length * 0.7
                  ? 'oklch(0.78 0.18 75)'
                  : 'oklch(0.65 0.22 25)',
              }}
              initial={{ width: 0 }}
              animate={{ width: `${(score / allQuestions.length) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
            />
          </div>
          <p className="text-xs text-white/50 font-mono">
            {score === allQuestions.length
              ? 'Perfect score! You have mastered this module!'
              : score >= allQuestions.length * 0.7
              ? 'Great job! Review the missed questions and try again.'
              : 'Keep studying the simulations and try again to improve your score.'}
          </p>
          <button
            onClick={handleResetQuiz}
            className="mt-2 px-6 py-2.5 rounded-xl bg-purple-600 text-white font-mono text-xs font-bold hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/30 flex items-center gap-2"
          >
            <RotateCcw size={14} /> Retry Quiz
          </button>
        </motion.div>
      )}

      {/* Main Quiz Box */}
      {!isCompleted && (
      <div className="w-full max-w-2xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col gap-6 border border-purple-500/20 shadow-2xl">
        {/* Quiz Banner Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-purple-300 font-mono text-xs font-bold">
            <HelpCircle size={18} /> {currentModule.title}
          </div>
          <span className="text-xs font-mono text-white/50">
            Question {currentQuestionIndex + 1} of {Math.max(1, allQuestions.length)}
          </span>
        </div>

        {/* Question Text */}
        <h3 className="text-lg font-bold text-white leading-relaxed">
          {currentQuestion.question}
        </h3>

        {/* Option Cards */}
        <div className="space-y-3">
          {currentQuestion.options.map((opt, idx) => {
            let optionStyle = 'glass border-white/10 hover:border-white/30 text-white/80';

            if (selectedOption === idx) {
              optionStyle = 'bg-purple-600/30 border-purple-400 text-white font-bold ring-2 ring-purple-400';
            }

            if (isSubmitted) {
              if (idx === currentQuestion.correct) {
                optionStyle = 'bg-green-500/30 border-green-400 text-green-300 font-bold';
              } else if (selectedOption === idx) {
                optionStyle = 'bg-red-500/30 border-red-400 text-red-300 font-bold';
              }
            }

            return (
              <motion.div
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className={`p-4 rounded-2xl cursor-pointer text-xs font-sans transition-all flex items-center justify-between border ${optionStyle}`}
                whileHover={{ scale: isSubmitted ? 1 : 1.01 }}
              >
                <span>{opt}</span>
                {isSubmitted && idx === currentQuestion.correct && (
                  <CheckCircle2 size={18} className="text-green-400" />
                )}
                {isSubmitted && selectedOption === idx && idx !== currentQuestion.correct && (
                  <XCircle size={18} className="text-red-400" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Submitted Answer Explanation */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-2xl text-xs font-sans border ${
              selectedOption === currentQuestion.correct
                ? 'glass border-green-500/30 text-green-300'
                : 'glass border-red-500/30 text-red-300'
            }`}
          >
            <span className="font-bold font-mono block mb-1">
              {selectedOption === currentQuestion.correct ? '🎉 Correct Answer!' : '❌ Incorrect Explanation:'}
            </span>
            <p className="text-white/80 leading-relaxed">{currentQuestion.explanation}</p>
          </motion.div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <button
            onClick={handleResetQuiz}
            className="px-3.5 py-2 rounded-xl glass text-xs font-mono text-white/60 hover:text-white flex items-center gap-1.5"
          >
            <RotateCcw size={14} /> Reset Quiz
          </button>

          {!isSubmitted ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedOption === null}
              className={`px-6 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                selectedOption !== null
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30 hover:bg-purple-500'
                  : 'glass text-white/30 cursor-not-allowed'
              }`}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2.5 rounded-xl bg-green-500 text-white font-mono text-xs font-bold hover:bg-green-600 transition-all shadow-lg shadow-green-500/30 flex items-center gap-2"
            >
              Next Question <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>
      )}
    </div>
  );
}
