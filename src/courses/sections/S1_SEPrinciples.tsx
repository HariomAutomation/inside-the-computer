import { motion } from 'framer-motion';

export default function S1_SEPrinciples() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Software Engineering Principles</h2>
        <p className="text-white/60 text-sm">SOLID, DRY, KISS — writing code that scales and survives.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'SOLID', desc: 'Single responsibility, Open-closed, Liskov, Interface seg., Dependency inv.', icon: '🏛️', color: 'text-blue-400' },
          { name: 'DRY', desc: "Don't Repeat Yourself — reuse code, avoid duplication", icon: '🔄', color: 'text-green-400' },
          { name: 'KISS', desc: 'Keep It Simple, Stupid — simplicity over complexity', icon: '💡', color: 'text-amber-400' },
          { name: 'YAGNI', desc: "You Ain't Gonna Need It — don't build what you don't need yet", icon: '🎯', color: 'text-purple-400' },
          { name: 'Composition over Inheritance', desc: 'Build complex behavior from simple, composable pieces', icon: '🧩', color: 'text-pink-400' },
          { name: 'Separation of Concerns', desc: 'Each module handles one thing', icon: '📋', color: 'text-cyan-400' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="glass rounded-xl border border-white/5 p-4 flex items-center gap-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className={`font-mono font-bold text-sm ${item.color}`}>{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">SE Principles Kyun Zaroori Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Bina principles ke code <span className="text-red-400 font-bold">spaghetti</span> ban jaata hai —
          samajhna mushkil, change karna impossible. <span className="text-blue-400 font-bold"> SOLID</span> se
          code maintainable hota hai. <span className="text-green-400 font-bold"> DRY</span> se duplication khatam.
          <span className="text-amber-400 font-bold"> KISS</span> se simple rehta hai.
          Clean code = happy team = fast development! 🚀
        </p>
      </div>
    </div>
  );
}
