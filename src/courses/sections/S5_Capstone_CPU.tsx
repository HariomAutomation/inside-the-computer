import { motion } from 'framer-motion';

export default function S5_Capstone_CPU() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Capstone: CPU Mastery</h2>
        <p className="text-white/60 text-sm">Review everything about CPU architecture.</p>
      </div>

      <div className="space-y-3">
        {[
          { q: 'What is the difference between CISC and RISC?', a: 'CISC: complex instructions. RISC: simple, fixed-length instructions.', icon: '🔧' },
          { q: 'What is pipelining?', a: 'Overlapping instruction stages to increase throughput', icon: '🏗️' },
          { q: 'What is a cache miss?', a: 'Data not found in cache, must fetch from slower memory', icon: '❌' },
          { q: 'What is branch prediction?', a: 'Guessing which way a branch goes to keep pipeline full', icon: '🔮' },
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
        className="glass rounded-2xl border border-primary-500/30 p-6 text-center"
      >
        <p className="text-3xl mb-3">🎉</p>
        <h3 className="font-bold text-lg text-primary-400 mb-2">Course Complete!</h3>
        <p className="text-sm text-white/60">Next: <span className="text-purple-400 font-bold">Assembly Language!</span></p>
      </motion.div>
    </div>
  );
}
