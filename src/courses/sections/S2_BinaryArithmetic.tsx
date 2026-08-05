import { motion } from 'framer-motion';
import BinaryConverter from '../components/BinaryConverter';
import BinaryArithmeticSimulator from '../components/BinaryArithmeticSimulator';

export default function S2_BinaryArithmetic() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Binary Arithmetic</h2>
        <p className="text-white/60 text-sm">Add, subtract, multiply in binary — the CPU's daily bread.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Interactive: Binary Adder</h3>
        <BinaryArithmeticSimulator />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { op: 'Binary Addition', rules: ['0+0=0', '0+1=1', '1+0=1', '1+1=10 (carry)'], color: 'border-green-500/30' },
          { op: 'Binary Subtraction', rules: ['0-0=0', '1-0=1', '1-1=0', '0-1=1 (borrow)'], color: 'border-red-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.op}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.15 }}
            className={`glass rounded-2xl border ${item.color} p-5`}
          >
            <p className="font-mono font-bold text-sm text-primary-300 mb-3">{item.op}</p>
            {item.rules.map((rule, j) => (
              <p key={j} className="text-xs text-white/60 font-mono">{rule}</p>
            ))}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Try Binary Addition</h3>
        <BinaryConverter initialValue={15} />
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-green-400">Binary Arithmetic Kaise Kaam Karti Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Binary addition bilkul decimal jaisa hai — <span className="text-green-400 font-bold">carry propagate</span> hota hai.
          Jab 1+1 karte ho toh 0 likhte ho aur 1 carry karte ho. <span className="text-red-400 font-bold">Subtraction</span> mein
          borrow hota hai. CPU mein <span className="text-primary-400 font-bold">half adder</span> aur
          <span className="text-purple-400 font-bold"> full adder</span> circuits yeh sab karte hain. ⚡
        </p>
      </div>
    </div>
  );
}
