import { motion } from 'framer-motion';
import TransistorCircuit from '../components/TransistorCircuit';
import CircuitBuilder from '../components/CircuitBuilder';

export default function S3_LogicGates() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Logic Gates</h2>
        <p className="text-white/60 text-sm">The fundamental building blocks of all digital circuits.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-bold mb-3 text-primary-400">1. The Transistor — Smallest Switch</h3>
        <TransistorCircuit />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-sm font-bold mb-3 text-purple-400">2. Build Your Own Circuit</h3>
        <CircuitBuilder />
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-green-400">Logic Gates Kya Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Logic gates basically <span className="text-primary-400 font-bold">decisions</span> lete hain.
          AND gate tabhi 1 deta hai jab dono inputs 1 hon. OR gate tabhi 1 deta hai jab koi bhi ek input 1 ho.
          NOT gate sirf ulta kar deta hai — 1 ko 0, 0 ko 1.
          In sab ko mila ke tum <span className="text-purple-400 font-bold">adders, multipliers, bana sakte ho</span> —
          poora computer sirf in gates se banta hai! 🔥
        </p>
      </div>
    </div>
  );
}
