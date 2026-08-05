import { motion } from 'framer-motion';

export default function S7_Compilers() {
  const steps = [
    { phase: 'Source Code', desc: 'Human writes code in high-level language', icon: '📝', color: 'border-blue-500/30' },
    { phase: 'Lexer', desc: 'Break code into tokens', icon: '✂️', color: 'border-purple-500/30' },
    { phase: 'Parser', desc: 'Build syntax tree (AST)', icon: '🌳', color: 'border-amber-500/30' },
    { phase: 'Optimizer', desc: 'Make code faster/smaller', icon: '⚡', color: 'border-green-500/30' },
    { phase: 'Code Gen', desc: 'Generate machine code (binary)', icon: '🔢', color: 'border-red-500/30' },
    { phase: 'Executable', desc: 'Ready to run on CPU!', icon: '🚀', color: 'border-cyan-500/30' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Compilers & Interpreters</h2>
        <p className="text-white/60 text-sm">How high-level code becomes machine instructions.</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.phase}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
            className={`glass rounded-xl border ${step.color} p-4 flex items-center gap-4`}
          >
            <div className="text-2xl">{step.icon}</div>
            <div className="flex-1">
              <p className="font-mono font-bold text-sm">{step.phase}</p>
              <p className="text-[11px] text-white/50">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="text-white/20 text-lg">→</div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-blue-500/30 p-5">
          <p className="font-mono font-bold text-sm text-blue-400 mb-2">Compiler</p>
          <p className="text-[11px] text-white/60">
            Pura code ek saath translate karta hai. <span className="text-green-400 font-bold">Fast execution</span> but slow compilation.
            Examples: C, C++, Rust, Go
          </p>
        </div>
        <div className="glass rounded-2xl border border-purple-500/30 p-5">
          <p className="font-mono font-bold text-sm text-purple-400 mb-2">Interpreter</p>
          <p className="text-[11px] text-white/60">
            Line by line execute karta hai. <span className="text-amber-400 font-bold">Slow execution</span> but instant feedback.
            Examples: Python, JavaScript (mostly)
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Compiler vs Interpreter?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">Compiler</span> pura code ek saath padhta hai aur binary mein convert kar deta hai —
          uske baad binary directly run hota hai. <span className="text-purple-400 font-bold">Interpreter</span> line by line padhta hai
          aur turant execute karta hai. Isliye compiler fast hota hai but debugging mushkil hai.
          Interpreter slow hai but error turant dikhta hai. 💡
        </p>
      </div>
    </div>
  );
}
