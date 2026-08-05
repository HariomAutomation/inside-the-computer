import { motion } from 'framer-motion';
import CircuitBuilder from '../components/CircuitBuilder';

export default function S2_UniversalGates() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">NAND, NOR, XOR Gates</h2>
        <p className="text-white/60 text-sm">Universal gates that can build ANY logic circuit.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { gate: 'NAND', truth: 'NOT(AND)', desc: 'Opposite of AND — most used in chip manufacturing', color: 'border-amber-500/30', icon: '🏭' },
          { gate: 'NOR', truth: 'NOT(OR)', desc: 'Opposite of OR — used in memory circuits', color: 'border-pink-500/30', icon: '💾' },
          { gate: 'XOR', truth: 'A≠B', desc: ' outputs 1 when inputs are different — used in adders', color: 'border-green-500/30', icon: '➕' },
        ].map((item, i) => (
          <motion.div
            key={item.gate}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`glass rounded-2xl border ${item.color} p-5 text-center`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="font-mono font-bold text-sm">{item.gate}</p>
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
        <h3 className="text-sm font-bold mb-3 text-purple-400">NAND se sab kuch banao</h3>
        <CircuitBuilder />
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-amber-400">Universal Gates Kyun Important Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-amber-400 font-bold">NAND gate</span> sabse important hai kyunki sirf isse tum
          AND, OR, NOT sab bana sakte ho. Isliye chip manufacturers sirf NAND gates use karte hain —
          ek type ka gate banake poora computer build karte hain. <span className="text-green-400 font-bold">XOR gate</span>
          binary addition mein use hota hai — jab 1+1 karte ho tab carry generate hota hai! 💡
        </p>
      </div>
    </div>
  );
}
