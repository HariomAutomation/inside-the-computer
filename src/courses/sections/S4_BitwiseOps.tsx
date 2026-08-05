import { motion } from 'framer-motion';

export default function S4_BitwiseOps() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Bitwise Operations</h2>
        <p className="text-white/60 text-sm">Manipulate individual bits — the programmer's superpower.</p>
      </div>

      <div className="space-y-2">
        {[
          { op: '&', name: 'AND', desc: 'Both bits must be 1', ex: '1010 & 1100 = 1000', color: 'text-blue-400' },
          { op: '|', name: 'OR', desc: 'At least one bit is 1', ex: '1010 | 1100 = 1110', color: 'text-purple-400' },
          { op: '^', name: 'XOR', desc: 'Bits are different', ex: '1010 ^ 1100 = 0110', color: 'text-green-400' },
          { op: '~', name: 'NOT', desc: 'Flip all bits', ex: '~1010 = 0101', color: 'text-red-400' },
          { op: '<<', name: 'Left Shift', desc: 'Multiply by 2^n', ex: '0011 << 2 = 1100', color: 'text-amber-400' },
          { op: '>>', name: 'Right Shift', desc: 'Divide by 2^n', ex: '1100 >> 2 = 0011', color: 'text-cyan-400' },
        ].map((item, i) => (
          <motion.div
            key={item.op}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="glass rounded-xl border border-white/5 p-3 flex items-center gap-4"
          >
            <span className={`font-mono font-bold text-lg w-8 ${item.color}`}>{item.op}</span>
            <div className="flex-1">
              <p className="text-xs font-mono font-bold">{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <p className="text-[10px] text-white/40 font-mono">{item.ex}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Bitwise Operations Kyun Use Hote Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Bitwise ops <span className="text-green-400 font-bold">bohot fast</span> hain kyunki CPU directly
          ek instruction mein kar deta hai. <span className="text-blue-400 font-bold">AND</span> se mask kar sakte ho
          (specific bits nikal sakte ho). <span className="text-purple-400 font-bold">XOR</span> se encryption hoti hai.
          <span className="text-amber-400 font-bold"> Shift</span> se multiply/divide by 2 hota hai bina ALU ke.
          OS kernels, network protocols, graphics — sab jagah bitwise ops use hote hain! 🔧
        </p>
      </div>
    </div>
  );
}
