import { motion } from 'framer-motion';

export default function S7_Capstone() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Capstone: Build a CPU from Scratch</h2>
        <p className="text-white/60 text-sm">Combine everything you've learned to design a complete simple CPU.</p>
      </div>

      <div className="space-y-3">
        {[
          { q: 'What is a logic gate?', a: 'A fundamental building block that makes decisions on binary inputs', icon: '⚡' },
          { q: 'What is the difference between combinational and sequential logic?', a: 'Combinational: output = f(inputs). Sequential: output = f(inputs, state)', icon: '🧠' },
          { q: 'What is a flip-flop?', a: 'A circuit that stores one bit using feedback loops, triggered by clock', icon: '💾' },
          { q: 'What does an ALU do?', a: 'Performs arithmetic (+,-,*,/) and logic (AND,OR,NOT) operations', icon: '➕' },
          { q: 'What is an FSM?', a: 'A circuit that transitions between states based on inputs', icon: '🔄' },
          { q: 'What is a register?', a: 'A group of flip-flops that stores multiple bits inside the CPU', icon: '📦' },
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
          You now understand how digital circuits build up to a CPU.
          Next up: <span className="text-purple-400 font-bold">Binary Math — The Language of Computers!</span>
        </p>
      </motion.div>
    </div>
  );
}
