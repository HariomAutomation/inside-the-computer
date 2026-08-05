import { motion } from 'framer-motion';

export default function S3_Capstone() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Course Capstone</h2>
        <p className="text-white/60 text-sm">Test your knowledge and celebrate your progress!</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl border border-primary-500/30 p-8 text-center"
      >
        <p className="text-4xl mb-4">🎉</p>
        <h3 className="font-bold text-xl text-primary-400 mb-3">Course Complete!</h3>
        <p className="text-sm text-white/70 leading-relaxed max-w-lg mx-auto">
          Amazing work! You've mastered another piece of the computer science puzzle.
          Keep going — the next course is waiting!
        </p>
      </motion.div>
    </div>
  );
}
