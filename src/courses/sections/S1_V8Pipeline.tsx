import { motion } from 'framer-motion';

export default function S1_V8Pipeline() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">V8 Engine Pipeline</h2>
        <p className="text-white/60 text-sm">How Chrome's V8 engine executes JavaScript at lightning speed.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-amber-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-amber-400">V8 Pipeline: Ignition + TurboFan</h3>
        <svg viewBox="0 0 500 120" className="w-full">
          {[
            { x: 40, label: 'JS Source', color: '#3b82f6' },
            { x: 130, label: 'Parser', color: '#8b5cf6' },
            { x: 210, label: 'AST', color: '#22c55e' },
            { x: 280, label: 'Ignition', color: '#f59e0b' },
            { x: 370, label: 'TurboFan', color: '#ef4444' },
            { x: 450, label: 'Machine Code', color: '#06b6d4' },
          ].map((item, i) => (
            <g key={i}>
              <rect x={item.x - 30} y="35" width="60" height="25" rx="5" fill={item.color + '20'} stroke={item.color} strokeWidth="1" />
              <text x={item.x} y="52" textAnchor="middle" fill={item.color} fontSize="8" fontWeight="bold" fontFamily="monospace">{item.label}</text>
              {i < 5 && <line x1={item.x + 30} y1="47" x2={item.x + 50} y2="47" stroke="#64748b" strokeWidth="1" />}
            </g>
          ))}
          <path d="M 370 60 L 370 95 L 280 95 L 280 60" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
          <text x="325" y="108" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">deoptimize</text>
        </svg>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-blue-500/30 p-5">
          <p className="font-mono font-bold text-sm text-blue-400 mb-2">Ignition (Interpreter)</p>
          <p className="text-[11px] text-white/60">Fast startup, low memory. Generates bytecode. Profiles hot functions.</p>
        </div>
        <div className="glass rounded-2xl border border-red-500/30 p-5">
          <p className="font-mono font-bold text-sm text-red-400 mb-2">TurboFan (JIT Compiler)</p>
          <p className="text-[11px] text-white/60">Optimizes hot paths to native code. Handles deoptimization gracefully.</p>
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">V8 Itna Fast Kyun Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          V8 <span className="text-blue-400 font-bold">Ignition</span> interpreter se fast start hota hai.
          Hot functions (baar baar chalne wale) ko <span className="text-red-400 font-bold">TurboFan</span> native code
          mein compile karta hai. <span className="text-amber-400 font-bold">Hidden classes</span> se property access fast hota hai.
          <span className="text-green-400 font-bold"> Inline caching</span> se repeated lookups skip hote hain.
          Isliye JS itna fast hai despite being dynamic! 🔥
        </p>
      </div>
    </div>
  );
}
