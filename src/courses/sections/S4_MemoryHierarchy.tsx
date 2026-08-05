import { motion } from 'framer-motion';

export default function S4_MemoryHierarchy() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Memory Hierarchy</h2>
        <p className="text-white/60 text-sm">Registers → Cache → RAM → SSD — speed vs size tradeoff.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <svg viewBox="0 0 300 250" className="w-full max-w-sm">
          {[
            { y: 20, w: 80, label: 'Registers', size: '64B', speed: '0.3ns', color: '#22c55e' },
            { y: 60, w: 120, label: 'L1 Cache', size: '32KB', speed: '1ns', color: '#3b82f6' },
            { y: 100, w: 160, label: 'L2 Cache', size: '256KB', speed: '3ns', color: '#8b5cf6' },
            { y: 140, w: 200, label: 'L3 Cache', size: '8MB', speed: '10ns', color: '#f59e0b' },
            { y: 180, w: 240, label: 'RAM', size: '16GB', speed: '100ns', color: '#ef4444' },
            { y: 220, w: 280, label: 'SSD', size: '1TB', speed: '10μs', color: '#64748b' },
          ].map((item, i) => (
            <g key={i}>
              <rect x={(300 - item.w) / 2} y={item.y} width={item.w} height="32" rx="6"
                fill={item.color + '20'} stroke={item.color} strokeWidth="1" />
              <text x="150" y={item.y + 15} textAnchor="middle" fill={item.color} fontSize="9" fontWeight="bold" fontFamily="monospace">
                {item.label}
              </text>
              <text x="150" y={item.y + 26} textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">
                {item.size} • {item.speed}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Memory Hierarchy Kyun Zaroori Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Fast memory <span className="text-red-400 font-bold">mehengi</span> hai, slow memory <span className="text-green-400 font-bold">sasti</span>.
          Isliye hierarchy hai — frequently used data fast mein, baaki slow mein.
          CPU <span className="text-blue-400 font-bold">temporal locality</span> (jo use kiya usse phir use karega) aur
          <span className="text-purple-400 font-bold"> spatial locality</span> (jo paas hai usse use karega) exploit karta hai.
          Cache hit = fast, cache miss = slow! ⚡
        </p>
      </div>
    </div>
  );
}
