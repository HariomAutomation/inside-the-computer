import { motion } from 'framer-motion';

export default function S1_AssemblyIntro() {
  const instructions = [
    { op: 'MOV', desc: 'Copy data', ex: 'MOV AX, 5', color: 'text-blue-400' },
    { op: 'ADD', desc: 'Add two values', ex: 'ADD AX, BX', color: 'text-green-400' },
    { op: 'SUB', desc: 'Subtract', ex: 'SUB AX, 3', color: 'text-red-400' },
    { op: 'MUL', desc: 'Multiply', ex: 'MUL BX', color: 'text-purple-400' },
    { op: 'CMP', desc: 'Compare values', ex: 'CMP AX, 0', color: 'text-amber-400' },
    { op: 'JMP', desc: 'Jump to label', ex: 'JMP loop', color: 'text-cyan-400' },
    { op: 'JE', desc: 'Jump if equal', ex: 'JE done', color: 'text-pink-400' },
    { op: 'PUSH', desc: 'Push to stack', ex: 'PUSH AX', color: 'text-orange-400' },
    { op: 'POP', desc: 'Pop from stack', ex: 'POP AX', color: 'text-lime-400' },
    { op: 'CALL', desc: 'Call function', ex: 'CALL print', color: 'text-indigo-400' },
    { op: 'RET', desc: 'Return', ex: 'RET', color: 'text-yellow-400' },
    { op: 'HLT', desc: 'Stop CPU', ex: 'HLT', color: 'text-white' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Assembly Language Basics</h2>
        <p className="text-white/60 text-sm">The closest human-readable language to machine code.</p>
      </div>

      <div className="space-y-2">
        {instructions.map((inst, i) => (
          <motion.div
            key={inst.op}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.05 }}
            className="glass rounded-xl border border-white/5 p-3 flex items-center gap-4"
          >
            <span className={`font-mono font-bold text-sm w-12 ${inst.color}`}>{inst.op}</span>
            <div className="flex-1">
              <p className="text-xs text-white/70">{inst.desc}</p>
            </div>
            <p className="text-[10px] text-white/40 font-mono">{inst.ex}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Assembly Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Assembly language CPU ki <span className="text-green-400 font-bold">native language</span> hai.
          Har CPU ka apna instruction set hota hai. Yeh low-level hai — tum directly
          hardware control kar rahe ho. Aaj kal high-level languages use hoti hain but
          OS kernels, drivers, embedded systems mein assembly abhi bhi use hoti hai! 🔧
        </p>
      </div>
    </div>
  );
}
