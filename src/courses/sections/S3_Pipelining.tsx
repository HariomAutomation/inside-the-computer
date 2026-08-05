import { motion } from 'framer-motion';
import PipeliningSimulator from '../components/PipeliningSimulator';

export default function S3_Pipelining() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Pipelining Deep Dive</h2>
        <p className="text-white/60 text-sm">How CPUs overlap instructions for maximum throughput.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Interactive: Pipeline Simulator</h3>
        <PipeliningSimulator />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">5-Stage RISC Pipeline</h3>
        <svg viewBox="0 0 500 180" className="w-full">
          {['IF', 'ID', 'EX', 'MEM', 'WB'].map((stage, i) => (
            <g key={stage}>
              <rect x={20 + i * 95} y="30" width="85" height="35" rx="6"
                fill={['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'][i] + '30'}
                stroke={['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'][i]}
                strokeWidth="1.5" />
              <text x={62 + i * 95} y="52" textAnchor="middle" fill={['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'][i]}
                fontSize="11" fontWeight="bold" fontFamily="monospace">{stage}</text>
            </g>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <text key={i} x={62 + i * 95} y="80" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">
              {['Fetch', 'Decode', 'Execute', 'Memory', 'Writeback'][i]}
            </text>
          ))}
          {/* Pipeline timeline */}
          {[0, 1, 2, 3, 4].map((inst) => (
            <g key={inst}>
              {[0, 1, 2, 3, 4].map((stage) => (
                <rect key={stage}
                  x={20 + ((inst + stage) % 5) * 95}
                  y={100 + inst * 16}
                  width="85" height="13" rx="3"
                  fill={['#3b82f6', '#8b5cf6', '#22c55e', '#f59e0b', '#ef4444'][stage] + '40'}
                />
              ))}
            </g>
          ))}
          <text x="10" y="112" fill="#64748b" fontSize="7" fontFamily="monospace">I1</text>
          <text x="10" y="128" fill="#64748b" fontSize="7" fontFamily="monospace">I2</text>
          <text x="10" y="144" fill="#64748b" fontSize="7" fontFamily="monospace">I3</text>
          <text x="10" y="160" fill="#64748b" fontSize="7" fontFamily="monospace">I4</text>
          <text x="10" y="176" fill="#64748b" fontSize="7" fontFamily="monospace">I5</text>
        </svg>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Pipeline Hazards Kya Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Pipeline mein 3 problems aati hain — <span className="text-red-400 font-bold">Data hazard</span> (instruction B ko
          A ka result chahiye), <span className="text-amber-400 font-bold">Control hazard</span> (branch ne kya decide kiya),
          <span className="text-purple-400 font-bold"> Structural hazard</span> (same resource chahiye dono ko).
          In solutions ke liye forwarding, stalling, branch prediction use hota hai! 🔧
        </p>
      </div>
    </div>
  );
}
