import { motion } from 'framer-motion';

export default function S3_JITCompilation() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">JIT Compilation</h2>
        <p className="text-white/60 text-sm">Compiling at runtime for C-like performance in dynamic languages.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-red-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-red-400">How JIT Works</h3>
        <svg viewBox="0 0 500 80" className="w-full">
          {[
            { x: 40, label: 'Interpret', color: '#3b82f6' },
            { x: 140, label: 'Profile', color: '#8b5cf6' },
            { x: 240, label: 'Detect Hot', color: '#f59e0b' },
            { x: 340, label: 'Compile', color: '#ef4444' },
            { x: 440, label: 'Execute', color: '#22c55e' },
          ].map((item, i) => (
            <g key={i}>
              <rect x={item.x - 35} y="25" width="70" height="28" rx="6" fill={item.color + '20'} stroke={item.color} strokeWidth="1" />
              <text x={item.x} y="43" textAnchor="middle" fill={item.color} fontSize="8" fontWeight="bold" fontFamily="monospace">{item.label}</text>
              {i < 4 && <line x1={item.x + 35} y1="39" x2={item.x + 55} y2="39" stroke="#64748b" strokeWidth="1" />}
            </g>
          ))}
          <path d="M 440 53 Q 440 70 240 70 Q 140 70 140 53" fill="none" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 2" />
          <text x="300" y="78" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">re-interpret if deoptimized</text>
        </svg>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">JIT Kaise Fast Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          JIT <span className="text-blue-400 font-bold">profile</span> karta hai kaun sa code baar baar chal raha hai.
          Jab koi function 1000+ baar chale, JIT usse <span className="text-red-400 font-bold">native machine code</span>
          mein compile kar deta hai. Agar assumption galat ho jaaye toh
          <span className="text-amber-400 font-bold"> deoptimize</span> karta hai aur wapas interpret karta hai.
          V8, JVM, .NET CLR sab yahi karte hain! 🔥
        </p>
      </div>
    </div>
  );
}
