import { motion } from 'framer-motion';

export default function S5_Capstone_Binary() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Capstone: Binary Mastery</h2>
        <p className="text-white/60 text-sm">Test your binary knowledge.</p>
      </div>

      <div className="space-y-3">
        {[
          { q: 'What is 1010 in decimal?', a: '8+0+2+0 = 10', icon: '🔢' },
          { q: 'What is Two\'s Complement?', a: 'Flip bits + 1 to represent negative numbers', icon: '➖' },
          { q: 'What does << 1 do?', a: 'Multiplies the number by 2 (left shift)', icon: '⬆️' },
          { q: 'How many values can 8 bits represent?', a: '256 values (0-255 unsigned)', icon: '📊' },
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
        transition={{ delay: 0.6 }}
        className="glass rounded-2xl border border-primary-500/30 p-6 text-center"
      >
        <p className="text-3xl mb-3">🎉</p>
        <h3 className="font-bold text-lg text-primary-400 mb-2">Course Complete!</h3>
        <p className="text-sm text-white/60">Next: <span className="text-purple-400 font-bold">CPU Architecture — Deep Dive!</span></p>
      </motion.div>
    </div>
  );
}
