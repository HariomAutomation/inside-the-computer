import { motion } from 'framer-motion';

export default function S8_Capstone() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Capstone: Your Computer Journey</h2>
        <p className="text-white/60 text-sm">Let's review everything you've learned in this course.</p>
      </div>

      <div className="space-y-3">
        {[
          { q: 'What does CPU stand for?', a: 'Central Processing Unit — the brain of the computer', icon: '🧠' },
          { q: 'What are the 3 stages of CPU cycle?', a: 'Fetch → Decode → Execute → Store', icon: '🔄' },
          { q: 'What is a logic gate?', a: 'A fundamental building block that makes decisions on binary inputs', icon: '⚡' },
          { q: 'What is binary?', a: 'Number system using only 0 and 1, base-2', icon: '🔢' },
          { q: 'What does a compiler do?', a: 'Translates high-level code into machine code all at once', icon: '📝' },
          { q: 'What is an interpreter?', a: 'Executes code line by line, translating on-the-fly', icon: '📖' },
        ].map((item, i) => (
          <motion.div
            key={item.q}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="glass rounded-xl border border-white/10 p-4"
          >
            <div className="flex items-start gap-3">
              <span className="text-xl">{item.icon}</span>
              <div>
                <p className="text-sm font-bold text-primary-300">{item.q}</p>
                <p className="text-xs text-white/50 mt-1">{item.a}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl border border-primary-500/30 p-6 text-center"
      >
        <p className="text-3xl mb-3">🎉</p>
        <h3 className="font-bold text-lg text-primary-400 mb-2">Course Complete!</h3>
        <p className="text-sm text-white/60">
          You now understand the fundamentals of how a computer works.
          Next up: <span className="text-purple-400 font-bold">How CPUs Work — Deep Dive!</span>
        </p>
      </motion.div>
    </div>
  );
}
