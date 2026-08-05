import { motion } from 'framer-motion';
import CircuitBuilder from '../components/CircuitBuilder';

export default function S1_BasicGates() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">AND, OR, NOT Gates</h2>
        <p className="text-white/60 text-sm">The three fundamental logic gates that make up all digital circuits.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { gate: 'AND', truth: '1·1=1, else 0', desc: 'Both inputs must be 1', color: 'border-blue-500/30', icon: '⚡' },
          { gate: 'OR', truth: '0+0=0, else 1', desc: 'At least one input must be 1', color: 'border-purple-500/30', icon: '🔥' },
          { gate: 'NOT', truth: '0→1, 1→0', desc: 'Inverts the input', color: 'border-red-500/30', icon: '🔄' },
        ].map((item, i) => (
          <motion.div
            key={item.gate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`glass rounded-2xl border ${item.color} p-5 text-center`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="font-mono font-bold text-sm text-primary-300">{item.gate}</p>
            <p className="text-[10px] text-white/50 mt-1 font-mono">{item.truth}</p>
            <p className="text-[11px] text-white/60 mt-2">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-bold mb-3 text-primary-400">Build Your Own Circuit</h3>
        <CircuitBuilder />
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Logic Gates Kya Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Logic gates <span className="text-primary-400 font-bold">decisions</span> lete hain binary inputs pe.
          AND gate tabhi 1 deta hai jab dono inputs 1 hon. OR gate jab koi bhi ek 1 ho. NOT gate sirf ulta kar deta hai.
          In sab ko mila ke tum <span className="text-purple-400 font-bold">adders, multipliers, bana sakte ho</span> —
          poora computer sirf in gates se banta hai! 🔥
        </p>
      </div>
    </div>
  );
}
