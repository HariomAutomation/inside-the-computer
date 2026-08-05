import { motion } from 'framer-motion';

export default function S3_ControlFlow() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Control Flow & Functions</h2>
        <p className="text-white/60 text-sm">Loops, conditionals, and function calls in assembly.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'JMP label', desc: 'Unconditional jump', use: 'Loops', icon: '➡️' },
          { name: 'JE / JNE', desc: 'Jump if equal / not equal', use: 'if/else', icon: '🔀' },
          { name: 'JG / JL', desc: 'Jump if greater / less', use: 'Comparisons', icon: '📊' },
          { name: 'LOOP label', desc: 'Decrement ECX, jump if not zero', use: 'for loops', icon: '🔄' },
          { name: 'CALL label', desc: 'Push return address, jump', use: 'Functions', icon: '📞' },
          { name: 'RET', desc: 'Pop return address, jump back', use: 'Return from func', icon: '↩️' },
          { name: 'PUSH / POP', desc: 'Stack operations', use: 'Save/restore registers', icon: '📚' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="glass rounded-xl border border-white/5 p-4 flex items-center gap-4"
          >
            <span className="text-xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <p className="text-[10px] text-white/40">{item.use}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Functions Kaise Kaam Karti Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">CALL</span> instruction return address stack pe push karta hai aur
          function mein jump karta hai. <span className="text-green-400 font-bold">RET</span> address pop karta hai aur
          wapas aata hai. <span className="text-purple-400 font-bold">Stack</span> save/restore ke liye use hota hai —
          jo registers function use kar raha hai wo pehle push karo, baad mein pop karo. 📚
        </p>
      </div>
    </div>
  );
}
