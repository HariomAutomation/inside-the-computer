import { motion } from 'framer-motion';
import ALUBlock from '../components/ALUBlock';

export default function S2_CPUBasics() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">How a CPU Works</h2>
        <p className="text-white/60 text-sm">The CPU follows a simple cycle: Fetch → Decode → Execute → Store.</p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <ALUBlock inputA={5} inputB={3} opcode="ADD" output={8} active={true} />
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Fetch', 'Decode', 'Execute', 'Store'].map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 + i * 0.1 }}
            className="glass rounded-xl border border-white/10 p-4 text-center"
          >
            <div className="w-8 h-8 rounded-full bg-primary-500/20 border border-primary-500/30 flex items-center justify-center mx-auto mb-2">
              <span className="text-xs font-mono font-bold text-primary-400">{i + 1}</span>
            </div>
            <p className="text-xs font-mono font-bold">{step}</p>
            <p className="text-[10px] text-white/40 mt-1">
              {step === 'Fetch' && 'Get instruction from RAM'}
              {step === 'Decode' && 'Figure out what to do'}
              {step === 'Execute' && 'ALU does the math'}
              {step === 'Store' && 'Save result back'}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-purple-400">Fetch-Decode-Execute Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          CPU ek cycle mein kaam karta hai — pehle <span className="text-primary-400 font-bold">Fetch</span> karta hai ki
          agla instruction kya hai, phir <span className="text-purple-400 font-bold">Decode</span> karta hai ki
          wo instruction ka matlab kya hai, phir <span className="text-green-400 font-bold">Execute</span> karta hai
          (jaise add, multiply), aur finally result <span className="text-amber-400 font-bold">Store</span> karta hai.
          Yeh cycle billions of times per second hoti hai! 🤯
        </p>
      </div>
    </div>
  );
}
