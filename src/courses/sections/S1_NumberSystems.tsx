import { motion } from 'framer-motion';
import BinaryConverter from '../components/BinaryConverter';

export default function S1_NumberSystems() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Number Systems</h2>
        <p className="text-white/60 text-sm">Decimal, Binary, Octal, Hexadecimal — four ways to represent numbers.</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {[
          { base: 10, name: 'Decimal', digits: '0-9', use: 'Human counting', color: 'border-blue-500/30' },
          { base: 2, name: 'Binary', digits: '0,1', use: 'Computer native', color: 'border-green-500/30' },
          { base: 8, name: 'Octal', digits: '0-7', use: 'Unix permissions', color: 'border-purple-500/30' },
          { base: 16, name: 'Hex', digits: '0-9,A-F', use: 'Memory addresses, colors', color: 'border-amber-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className={`glass rounded-xl border ${item.color} p-4 text-center`}
          >
            <p className="font-mono font-bold text-lg text-primary-300">{item.base}</p>
            <p className="text-xs font-mono font-bold mt-1">{item.name}</p>
            <p className="text-[10px] text-white/40 mt-1">Digits: {item.digits}</p>
            <p className="text-[10px] text-white/50 mt-1">{item.use}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Interactive: Convert Any Number</h3>
        <BinaryConverter initialValue={42} />
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Number Systems Kyun Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Humans <span className="text-blue-400 font-bold">decimal</span> use karte hain (10 fingers). Computers
          <span className="text-green-400 font-bold"> binary</span> use karte hain (transistors sirf ON/OFF).
          <span className="text-amber-400 font-bold"> Hexadecimal</span> binary ko compactly represent karta hai —
          4 bits = 1 hex digit. Isliye memory addresses hex mein hote hain. 💡
        </p>
      </div>
    </div>
  );
}
