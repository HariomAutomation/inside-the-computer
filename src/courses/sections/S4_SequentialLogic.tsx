import { motion } from 'framer-motion';
import MemoryCell from '../components/MemoryCell';

export default function S4_SequentialLogic() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sequential Logic</h2>
        <p className="text-white/60 text-sm">Circuits with memory — output depends on current AND past inputs.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-sm font-bold mb-3 text-primary-400">SR Latch — Simplest Memory</h3>
        <MemoryCell type="SRAM" />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'SR Latch', desc: 'Basic memory using 2 cross-coupled NOR gates', use: 'Set-Reset memory', color: 'border-blue-500/30' },
          { name: 'D Flip-Flop', desc: 'Captures input D on clock edge', use: 'Registers, counters', color: 'border-purple-500/30' },
          { name: 'Register', desc: 'Group of flip-flops storing multiple bits', use: 'CPU registers', color: 'border-green-500/30' },
          { name: 'Counter', desc: 'Cycles through states on clock', use: 'Timers, program counters', color: 'border-amber-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`glass rounded-xl border ${item.color} p-5`}
          >
            <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
            <p className="text-[11px] text-white/60 mt-1">{item.desc}</p>
            <p className="text-[10px] text-white/40 mt-2">Used in: {item.use}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-purple-400">Sequential Logic Kyun Zaroori Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Combinational logic sirf present inputs dekhta hai. But <span className="text-purple-400 font-bold">Sequential logic</span>
          past bhi yaad rakhta hai — isliye memory ban sakti hai. <span className="text-blue-400 font-bold">Flip-flops</span>
          clock signal pe data capture karte hain. Registers multiple bits store karte hain.
          Counters sequence mein states count karte hain — jaise program counter!
          Yeh sab milkar <span className="text-green-400 font-bold">CPU ka foundation</span> banate hain. 🧠
        </p>
      </div>
    </div>
  );
}
