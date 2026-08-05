import { motion } from 'framer-motion';

export default function S2_Microarchitecture() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Microarchitecture</h2>
        <p className="text-white/60 text-sm">How the ISA is implemented in hardware — datapath, control, pipeline.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Datapath', desc: 'The "roads" where data flows between ALU, registers, memory', icon: '🛣️' },
          { name: 'Control Unit', desc: 'The "traffic light" — decodes instructions, directs signals', icon: '🚦' },
          { name: 'Pipeline', desc: 'Overlapping instruction stages for throughput', icon: '🏗️' },
          { name: 'Branch Predictor', desc: 'Guesses which way jumps go to keep pipeline full', icon: '🔮' },
          { name: 'Out-of-Order', desc: 'Executes instructions in optimal order, not program order', icon: '🎲' },
          { name: 'Superscalar', desc: 'Multiple execution units, multiple instructions per cycle', icon: '⚡' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="glass rounded-xl border border-white/5 p-4 flex items-center gap-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <div>
              <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
              <p className="text-[11px] text-white/60">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Microarchitecture Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          ISA batata hai CPU kya kar sakta hai, <span className="text-primary-400 font-bold">microarchitecture</span> batati hai
          kaise karta hai. <span className="text-purple-400 font-bold">Pipeline</span> mein ek instruction execute hote waqt
          agla fetch hota hai — jaise assembly line. <span className="text-green-400 font-bold">Branch prediction</span>
          guess karta hai if/else kahan jayega. Modern CPUs multiple instructions ek saath
          execute karte hain (superscalar). Yeh sab speed ke liye hai! ⚡
        </p>
      </div>
    </div>
  );
}
