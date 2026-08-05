import { motion } from 'framer-motion';

export default function S5_FSM() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Finite State Machines</h2>
        <p className="text-white/60 text-sm">How circuits "know" what state they're in and what to do next.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <svg viewBox="0 0 400 200" className="w-full max-w-lg">
          {/* States */}
          {[
            { x: 80, y: 100, label: 'S0', sub: 'Idle' },
            { x: 200, y: 100, label: 'S1', sub: 'Fetch' },
            { x: 320, y: 100, label: 'S2', sub: 'Execute' },
          ].map((s, i) => (
            <g key={i}>
              <circle cx={s.x} cy={s.y} r="35" fill="#1e293b" stroke={i === 0 ? '#22c55e' : '#3b82f6'} strokeWidth="2" />
              <text x={s.x} y={s.y - 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="monospace">{s.label}</text>
              <text x={s.x} y={s.y + 12} textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">{s.sub}</text>
            </g>
          ))}
          {/* Arrows */}
          <line x1="115" y1="100" x2="165" y2="100" stroke="#3b82f6" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="140" y="90" textAnchor="middle" fill="#3b82f6" fontSize="8" fontFamily="monospace">start</text>
          <line x1="235" y1="100" x2="285" y2="100" stroke="#8b5cf6" strokeWidth="2" markerEnd="url(#arrow)" />
          <text x="260" y="90" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">decode</text>
          <path d="M 200 135 Q 200 180 80 135" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" />
          <text x="140" y="175" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">done</text>
          <defs>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
            </marker>
          </defs>
        </svg>
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-blue-500/30 p-5">
          <p className="font-mono font-bold text-sm text-blue-400 mb-2">Mealy Machine</p>
          <p className="text-[11px] text-white/60">Output depends on current state AND input. Faster response.</p>
        </div>
        <div className="glass rounded-2xl border border-purple-500/30 p-5">
          <p className="font-mono font-bold text-sm text-purple-400 mb-2">Moore Machine</p>
          <p className="text-[11px] text-white/60">Output depends only on current state. More stable.</p>
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">FSM Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Har circuit ek <span className="text-primary-400 font-bold">state</span> mein hota hai aur input pe
          dusre state mein jaata hai. CPU ka instruction cycle bhi ek FSM hai —
          Fetch → Decode → Execute → Memory → Writeback. <span className="text-purple-400 font-bold">Mealy machine</span> mein
          output input pe bhi depend karta hai, <span className="text-blue-400 font-bold">Moore machine</span> mein sirf state pe.
          Traffic lights, vending machines, protocols — sab FSM based hain! 🔧
        </p>
      </div>
    </div>
  );
}
