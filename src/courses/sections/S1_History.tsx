import { motion } from 'framer-motion';
import CPUIsometric from '../components/CPUIsometric';
import AnimatedLabel from '../components/AnimatedLabel';
import FloatingTooltip from '../components/FloatingTooltip';

export default function S1_History() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">What is a Computer?</h2>
        <p className="text-white/60 text-sm">A computer is a machine that takes INPUT, PROCESSES it, and gives OUTPUT.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex justify-center"
      >
        <div className="relative">
          <CPUIsometric size={350} />
          <AnimatedLabel text="The CPU — Brain of the Computer" delay={0.8} className="absolute bottom-4 left-1/2 -translate-x-1/2" />
          <FloatingTooltip text="CPU stands for Central Processing Unit. It executes instructions from programs." position="top" />
        </div>
      </motion.div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'INPUT', desc: 'Keyboard, Mouse, Screen touch', icon: '⌨️', color: 'from-blue-500/20 to-blue-500/5 border-blue-500/30' },
          { label: 'PROCESS', desc: 'CPU, RAM, GPU', icon: '⚡', color: 'from-purple-500/20 to-purple-500/5 border-purple-500/30' },
          { label: 'OUTPUT', desc: 'Screen, Speaker, Printer', icon: '🖥️', color: 'from-green-500/20 to-green-500/5 border-green-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className={`glass rounded-2xl border p-5 text-center bg-gradient-to-b ${item.color}`}
          >
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="font-mono font-bold text-sm text-primary-300">{item.label}</p>
            <p className="text-[11px] text-white/50 mt-1">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Bhai, Ek Computer Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Dekho, computer basically ek <span className="text-primary-400 font-mono font-bold">input-process-output</span> machine hai.
          Tum keyboard se type karte ho (input), wo CPU mein process hota hai, aur output screen pe dikhta hai.
          Jaise tumhara dimaag — aankhon se dekhta hai (input), sochta hai (process), aur bolta hai (output).
          Bas yahi kaam computer karta hai, but bohot zyada fast! 🚀
        </p>
      </div>
    </div>
  );
}
