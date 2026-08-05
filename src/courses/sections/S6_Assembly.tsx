import { motion } from 'framer-motion';

export default function S6_Assembly() {
  const instructions = [
    { op: 'MOV', desc: 'Copy data from one place to another', ex: 'MOV AX, 5 → AX = 5' },
    { op: 'ADD', desc: 'Add two numbers', ex: 'ADD AX, BX → AX = AX + BX' },
    { op: 'SUB', desc: 'Subtract', ex: 'SUB AX, 3 → AX = AX - 3' },
    { op: 'JMP', desc: 'Jump to another instruction', ex: 'JMP 100 → go to line 100' },
    { op: 'CMP', desc: 'Compare two values', ex: 'CMP AX, 0 → is AX == 0?' },
    { op: 'HLT', desc: 'Stop the CPU', ex: 'HLT → done!' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Assembly Language</h2>
        <p className="text-white/60 text-sm">The closest human-readable language to machine code.</p>
      </div>

      <div className="glass rounded-2xl border border-green-500/30 p-6">
        <h3 className="font-mono font-bold text-sm text-green-400 mb-4">CPU Instructions</h3>
        <div className="space-y-2">
          {instructions.map((inst, i) => (
            <motion.div
              key={inst.op}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-3 p-3 rounded-xl glass border border-white/5"
            >
              <span className="font-mono font-bold text-sm text-green-400 w-12 shrink-0">{inst.op}</span>
              <div className="flex-1">
                <p className="text-xs text-white/70">{inst.desc}</p>
                <p className="text-[10px] text-white/40 font-mono mt-0.5">{inst.ex}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-purple-400">Assembly Language Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Assembly language basically CPU ki <span className="text-green-400 font-bold">native language</span> hai.
          Har CPU ka apna instruction set hota hai — jaise x86 ka ADD, MOV, JMP.
          Yeh low-level hai, matlab tum directly hardware ko control kar rahe ho.
          Aaj kal zyada tar log high-level languages (Python, JS) use karte hain,
          but OS kernels, drivers, aur embedded systems mein abhi bhi assembly use hoti hai. 🔧
        </p>
      </div>
    </div>
  );
}
