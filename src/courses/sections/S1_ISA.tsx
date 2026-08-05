import { motion } from 'framer-motion';
import CPUIsometric from '../components/CPUIsometric';

export default function S1_ISA() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Instruction Set Architecture</h2>
        <p className="text-white/60 text-sm">The contract between hardware and software — what the CPU can do.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <CPUIsometric size={350} />
      </motion.div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-blue-500/30 p-5">
          <p className="font-mono font-bold text-sm text-blue-400 mb-2">CISC (x86)</p>
          <p className="text-[11px] text-white/60">Complex instructions — one instruction does many things. Variable length. Used in Intel/AMD.</p>
        </div>
        <div className="glass rounded-2xl border border-green-500/30 p-5">
          <p className="font-mono font-bold text-sm text-green-400 mb-2">RISC (ARM)</p>
          <p className="text-[11px] text-white/60">Simple instructions — each does one thing. Fixed length. Used in phones, Apple Silicon, Raspberry Pi.</p>
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">ISA Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          ISA (Instruction Set Architecture) basically CPU ki <span className="text-primary-400 font-bold">vocabulary</span> hai —
          kitne instructions hain, kya kya kar sakte ho. <span className="text-blue-400 font-bold">CISC</span> mein ek instruction
          kaafi kaam kar sakta hai (complex), <span className="text-green-400 font-bold">RISC</span> mein har instruction
          simple hai but zyada instructions chahiye. ARM phones mein isliye efficient hai
          kyunki simple instructions kam power consume karte hain! 📱
        </p>
      </div>
    </div>
  );
}
