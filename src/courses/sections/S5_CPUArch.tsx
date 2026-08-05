import { motion } from 'framer-motion';
import CPUIsometric from '../components/CPUIsometric';
import AnimatedLabel from '../components/AnimatedLabel';

export default function S5_CPUArch() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">CPU Architecture</h2>
        <p className="text-white/60 text-sm">Inside the CPU: ALU, Control Unit, Registers, and Cache.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="w-full max-w-md">
          <CPUIsometric size={400} />
          <AnimatedLabel text="Hover over components to explore" delay={0.6} className="text-center mt-2" />
        </div>
      </motion.div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { name: 'ALU', desc: 'Does math: +, -, *, /, AND, OR', color: 'text-blue-400', border: 'border-blue-500/30' },
          { name: 'Control Unit', desc: 'Directs traffic — tells everyone what to do', color: 'text-purple-400', border: 'border-purple-500/30' },
          { name: 'Registers', desc: 'Tiny, super-fast storage inside CPU', color: 'text-green-400', border: 'border-green-500/30' },
          { name: 'L1 Cache', desc: 'Small but fast memory, closer to CPU', color: 'text-amber-400', border: 'border-amber-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className={`glass rounded-xl border ${item.border} p-4`}
          >
            <p className={`font-mono font-bold text-sm ${item.color}`}>{item.name}</p>
            <p className="text-[11px] text-white/50 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">CPU Architecture Kaise Kaam Karti Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          CPU ke andar bohot kuch hota hai — <span className="text-blue-400 font-bold">ALU</span> math karta hai,
          <span className="text-purple-400 font-bold"> Control Unit</span> sab ko direction deta hai,
          <span className="text-green-400 font-bold"> Registers</span> super-fast temporary storage hain,
          aur <span className="text-amber-400 font-bold"> Cache</span> frequently used data rakhta hai taaki
          RAM se baar baar na padhna pade. Yeh sab milkar ek instruction ko microseconds mein complete karte hain! ⚡
        </p>
      </div>
    </div>
  );
}
