import { motion } from 'framer-motion';

export default function S1_BuildEverything() {
  const steps = [
    { icon: '⚡', name: 'Transistor', desc: 'Smallest switch — ON/OFF' },
    { icon: '🔲', name: 'Logic Gates', desc: 'AND, OR, NOT — decisions' },
    { icon: '➕', name: 'ALU', desc: 'Math + logic operations' },
    { icon: '💾', name: 'Registers', desc: 'Fast storage inside CPU' },
    { icon: '🧠', name: 'CPU', desc: 'Fetch-Decode-Execute cycle' },
    { icon: '📦', name: 'Memory', desc: 'RAM, Cache hierarchy' },
    { icon: '💾', name: 'Storage', desc: 'SSD, HDD — persistent' },
    { icon: '🔌', name: 'Motherboard', desc: 'Connects everything' },
    { icon: '🖥️', name: 'OS', desc: 'Manages hardware + apps' },
    { icon: '🌐', name: 'Network', desc: 'TCP/IP, HTTP — internet' },
    { icon: '📝', name: 'Compiler', desc: 'High-level → machine code' },
    { icon: '🤖', name: 'AI', desc: 'Neural networks, LLMs' },
  ];

  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Build Everything: The Complete Journey</h2>
        <p className="text-white/60 text-sm">From a single transistor to a full AI-powered computer — you built it all.</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {steps.map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="glass rounded-xl border border-white/10 p-3 text-center"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="text-[10px] font-mono font-bold text-primary-300">{item.name}</p>
            <p className="text-[8px] text-white/40 mt-0.5">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="glass rounded-2xl border border-primary-500/30 p-8 text-center"
      >
        <p className="text-4xl mb-4">🎓</p>
        <h3 className="font-bold text-xl text-primary-400 mb-3">Congratulations!</h3>
        <p className="text-sm text-white/70 leading-relaxed max-w-lg mx-auto">
          You've journeyed from <span className="text-blue-400 font-bold">electricity</span> to
          <span className="text-purple-400 font-bold"> transistors</span>, from
          <span className="text-green-400 font-bold"> logic gates</span> to
          <span className="text-amber-400 font-bold"> CPUs</span>, from
          <span className="text-red-400 font-bold"> assembly</span> to
          <span className="text-cyan-400 font-bold"> compilers</span>, from
          <span className="text-pink-400 font-bold"> networking</span> to
          <span className="text-indigo-400 font-bold"> AI</span>.
        </p>
        <p className="text-sm text-white/50 mt-4">
          You now understand how a computer works — from atoms to intelligence. 🚀
        </p>
      </motion.div>
    </div>
  );
}
