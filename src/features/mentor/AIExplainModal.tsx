import { motion } from 'framer-motion';
import { Sparkles, X, Lightbulb, BookOpen } from 'lucide-react';
import { useMentorStore } from '../../stores/useMentorStore';

export default function AIExplainModal() {
  const { isExplainModalOpen, closeExplainModal, inspectTarget } = useMentorStore();

  if (!isExplainModalOpen || !inspectTarget) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg glass-strong rounded-3xl p-6 border border-primary-500/30 flex flex-col gap-4 shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2 text-primary-300 font-mono font-bold text-sm">
            <Sparkles size={18} className="text-yellow-400" /> AI Explain Anything
          </div>
          <button
            onClick={closeExplainModal}
            className="p-1.5 rounded-lg glass text-white/60 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        <div className="space-y-3">
          <h3 className="text-xl font-extrabold text-white gradient-text">
            What is {inspectTarget}?
          </h3>

          <div className="glass p-4 rounded-2xl border border-yellow-500/20 text-xs font-sans text-white/80 space-y-2">
            <div className="flex items-center gap-2 text-yellow-300 font-mono font-bold">
              <Lightbulb size={16} /> IIT-Grade Explanation:
            </div>
            <p className="leading-relaxed text-white/70">
              <strong>{inspectTarget}</strong> hardware layout aur CMOS semiconductor logic level par work karta hai. Ye high-speed voltage switching enable karta hai.
            </p>
          </div>

          <div className="glass p-4 rounded-2xl border border-green-500/20 text-xs font-sans text-white/80 space-y-2">
            <div className="flex items-center gap-2 text-green-300 font-mono font-bold">
              <BookOpen size={16} /> Related Lesson:
            </div>
            <p className="text-white/70">
              Check out Module 1: Lesson 2 for the full interactive CMOS schematic breakdown.
            </p>
          </div>
        </div>

        <button
          onClick={closeExplainModal}
          className="w-full py-2.5 rounded-xl bg-primary-500 text-white font-mono text-xs font-bold hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/30 mt-2"
        >
          Got it, return to simulation
        </button>
      </motion.div>
    </div>
  );
}
