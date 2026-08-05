import { motion } from 'framer-motion';

export default function S3_CombinationalLogic() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Combinational Logic</h2>
        <p className="text-white/60 text-sm">Circuits where output depends only on current inputs — no memory.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Half Adder', desc: 'Adds 2 bits → Sum + Carry', formula: 'S=A⊕B, C=A·B', color: 'border-blue-500/30' },
          { name: 'Full Adder', desc: 'Adds 3 bits (with carry-in)', formula: 'S=A⊕B⊕Cin', color: 'border-purple-500/30' },
          { name: 'Multiplexer', desc: 'Selects one of many inputs', formula: 'Y = S·A + S̄·B', color: 'border-green-500/30' },
          { name: 'Decoder', desc: 'Activates one output from N inputs', formula: '2-to-4 decoder', color: 'border-amber-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`glass rounded-xl border ${item.color} p-5`}
          >
            <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
            <p className="text-[11px] text-white/60 mt-1">{item.desc}</p>
            <p className="text-[10px] text-white/40 font-mono mt-2">{item.formula}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Combinational Logic Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Combinational circuits mein output sirf <span className="text-primary-400 font-bold">current inputs</span> pe depend karta hai —
          koi memory nahi hoti. Jaise half adder — 2 bits add karta hai aur Sum + Carry deta hai.
          Full adder mein carry-in bhi aata hai. <span className="text-purple-400 font-bold">Multiplexers</span> data select karte hain,
          <span className="text-green-400 font-bold"> Decoders</span> binary ko one-hot mein convert karte hain.
          Yeh sab milkar ALU banate hain! ⚡
        </p>
      </div>
    </div>
  );
}
