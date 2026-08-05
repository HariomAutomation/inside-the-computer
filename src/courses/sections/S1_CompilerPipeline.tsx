import { motion } from 'framer-motion';

export default function S1_CompilerPipeline() {
  const steps = [
    { phase: 'Source Code', desc: 'Human writes code', icon: '📝', color: '#3b82f6' },
    { phase: 'Lexical Analysis', desc: 'Break into tokens', icon: '✂️', color: '#8b5cf6' },
    { phase: 'Syntax Analysis', desc: 'Build AST (Abstract Syntax Tree)', icon: '🌳', color: '#22c55e' },
    { phase: 'Semantic Analysis', desc: 'Type checking, scope resolution', icon: '🔍', color: '#f59e0b' },
    { phase: 'Optimization', desc: 'Dead code elimination, inlining', icon: '⚡', color: '#ef4444' },
    { phase: 'Code Generation', desc: 'Emit target machine code', icon: '🔧', color: '#06b6d4' },
  ];

  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Compiler Pipeline</h2>
        <p className="text-white/60 text-sm">How source code becomes executable machine code.</p>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.phase}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="glass rounded-xl border border-white/10 p-4 flex items-center gap-4"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: step.color + '20', border: `1px solid ${step.color}` }}>
              <span className="text-xs font-mono font-bold" style={{ color: step.color }}>{i + 1}</span>
            </div>
            <div className="text-2xl">{step.icon}</div>
            <div className="flex-1">
              <p className="font-mono font-bold text-sm" style={{ color: step.color }}>{step.phase}</p>
              <p className="text-[11px] text-white/50">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Compiler Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Compiler <span className="text-blue-400 font-bold">pehle</span> code padhta hai, tokens mein todta hai,
          phir <span className="text-green-400 font-bold">AST</span> (tree structure) banata hai.
          <span className="text-amber-400 font-bold">Semantic analysis</span> type errors check karta hai.
          <span className="text-red-400 font-bold"> Optimization</span> slow code ko fast banata hai.
          Finally <span className="text-cyan-400 font-bold">machine code</span> generate hota hai. 💡
        </p>
      </div>
    </div>
  );
}
