import { motion } from 'framer-motion';
import ALUBlock from '../components/ALUBlock';

export default function S6_ALUDesign() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">ALU Design</h2>
        <p className="text-white/60 text-sm">Building the Arithmetic Logic Unit from scratch — the heart of the CPU.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ALUBlock inputA={7} inputB={3} opcode="ADD" output={10} active={true} />
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { op: 'ADD', result: 'A + B', use: 'Math calculations', color: 'text-green-400' },
          { op: 'SUB', result: 'A - B', use: 'Subtraction', color: 'text-red-400' },
          { op: 'AND', result: 'A & B', use: 'Bitwise masking', color: 'text-blue-400' },
          { op: 'OR', result: 'A | B', use: 'Setting bits', color: 'text-purple-400' },
          { op: 'XOR', result: 'A ^ B', use: 'Toggling bits, adders', color: 'text-amber-400' },
          { op: 'NOT', result: '~A', use: 'Inverting bits', color: 'text-pink-400' },
          { op: 'SHL', result: 'A << n', use: 'Multiply by 2^n', color: 'text-cyan-400' },
          { op: 'SHR', result: 'A >> n', use: 'Divide by 2^n', color: 'text-orange-400' },
        ].map((item, i) => (
          <motion.div
            key={item.op}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.05 }}
            className="glass rounded-xl border border-white/5 p-3 flex items-center gap-3"
          >
            <span className={`font-mono font-bold text-sm w-10 ${item.color}`}>{item.op}</span>
            <div className="flex-1">
              <p className="text-[10px] text-white/50 font-mono">{item.result}</p>
              <p className="text-[10px] text-white/40">{item.use}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">ALU Kaise Banta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          ALU basically <span className="text-green-400 font-bold">adders</span> aur
          <span className="text-blue-400 font-bold"> logic gates</span> ka combination hai.
          Sabse pehle half adder banta hai (XOR + AND), phir full adder (3 bits add).
          Multiple full adders jod ke 8-bit, 16-bit, 32-bit adder ban jaata hai.
          Logic operations ke liye AND, OR, XOR gates alag se hote hain.
          <span className="text-amber-400 font-bold"> Multiplexer</span> select karta hai ki konsa operation karna hai.
          Flags (Zero, Carry, Overflow) result ki status batate hain! ⚡
        </p>
      </div>
    </div>
  );
}
