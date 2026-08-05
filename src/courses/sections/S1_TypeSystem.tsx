import { motion } from 'framer-motion';

export default function S1_TypeSystem() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Type Systems</h2>
        <p className="text-white/60 text-sm">Static vs dynamic, strong vs weak — understanding type safety.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Static Typing', desc: 'Types checked at compile time', examples: 'TypeScript, Java, Rust', color: 'border-blue-500/30', pros: 'Catch errors early', icon: '🔒' },
          { name: 'Dynamic Typing', desc: 'Types checked at runtime', examples: 'Python, JavaScript, Ruby', color: 'border-purple-500/30', pros: 'More flexible', icon: '🔓' },
          { name: 'Strong Typing', desc: 'No implicit type conversion', examples: 'Python, Rust, Haskell', color: 'border-green-500/30', pros: 'Safer code', icon: '💪' },
          { name: 'Weak Typing', desc: 'Implicit type conversion allowed', examples: 'JavaScript, C, PHP', color: 'border-amber-500/30', pros: 'More permissive', icon: '🪶' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`glass rounded-xl border ${item.color} p-4`}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon}</span>
              <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
            </div>
            <p className="text-[11px] text-white/60">{item.desc}</p>
            <p className="text-[10px] text-white/40 mt-1">Examples: {item.examples}</p>
            <p className="text-[10px] text-green-400 mt-1">Pro: {item.pros}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Type System Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">Static typing</span> se compile time pe errors mil jaati hain —
          runtime pe crash nahi hoga. <span className="text-purple-400 font-bold">Dynamic typing</span> flexible hai
          but bugs baad mein milte hain. TypeScript <span className="text-green-400 font-bold">static</span> typing
          JavaScript mein add karta hai — best of both worlds! 💡
        </p>
      </div>
    </div>
  );
}
