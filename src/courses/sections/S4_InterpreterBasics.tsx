import { motion } from 'framer-motion';

export default function S4_InterpreterBasics() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interpreter Basics</h2>
        <p className="text-white/60 text-sm">Executing code line by line without prior compilation.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-blue-500/30 p-5">
          <p className="font-mono font-bold text-sm text-blue-400 mb-2">Compiler</p>
          <p className="text-[11px] text-white/60">Pura code ek saath translate. <span className="text-green-400 font-bold">Fast execution</span>, slow compile.</p>
          <p className="text-[10px] text-white/40 mt-2">C, C++, Rust, Go</p>
        </div>
        <div className="glass rounded-2xl border border-purple-500/30 p-5">
          <p className="font-mono font-bold text-sm text-purple-400 mb-2">Interpreter</p>
          <p className="text-[11px] text-white/60">Line by line execute. <span className="text-amber-400 font-bold">Instant feedback</span>, slow execution.</p>
          <p className="text-[10px] text-white/40 mt-2">Python, JavaScript, Ruby</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-primary-400">Interpreter Architecture</h3>
        <svg viewBox="0 0 400 100" className="w-full">
          {[
            { x: 20, label: 'Source', color: '#3b82f6' },
            { x: 110, label: 'Lexer', color: '#8b5cf6' },
            { x: 190, label: 'Parser', color: '#22c55e' },
            { x: 270, label: 'Evaluator', color: '#f59e0b' },
            { x: 350, label: 'Result', color: '#ef4444' },
          ].map((item, i) => (
            <g key={i}>
              <rect x={item.x - 30} y="30" width="60" height="30" rx="6" fill={item.color + '20'} stroke={item.color} strokeWidth="1" />
              <text x={item.x} y="50" textAnchor="middle" fill={item.color} fontSize="9" fontWeight="bold" fontFamily="monospace">{item.label}</text>
              {i < 4 && <line x1={item.x + 30} y1="45" x2={item.x + 60} y2="45" stroke="#64748b" strokeWidth="1" markerEnd="url(#arr)" />}
            </g>
          ))}
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#64748b" />
            </marker>
          </defs>
        </svg>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Interpreter vs Compiler?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Interpreter <span className="text-purple-400 font-bold">turant</span> execute karta hai — error milta hai abhi.
          Compiler pehle translate karta hai, phir run hota hai — error baad mein milta hai.
          Modern <span className="text-amber-400 font-bold">JIT (Just-In-Time)</span> compilers dono ka best use karte hain —
          interpret karte waqt hot code compile karte hain. V8, JVM aise hi kaam karte hain! 💡
        </p>
      </div>
    </div>
  );
}
