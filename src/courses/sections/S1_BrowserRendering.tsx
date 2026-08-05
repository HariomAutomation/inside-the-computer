import { motion } from 'framer-motion';

export default function S1_BrowserRendering() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Browser Rendering Pipeline</h2>
        <p className="text-white/60 text-sm">How HTML, CSS, and JavaScript become pixels on your screen.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Rendering Pipeline</h3>
        <div className="space-y-3">
          {[
            { step: '1. Parse HTML → DOM', desc: 'Browser builds Document Object Model tree', color: '#3b82f6' },
            { step: '2. Parse CSS → CSSOM', desc: 'CSS rules applied to elements', color: '#8b5cf6' },
            { step: '3. Render Tree', desc: 'DOM + CSSOM combined (hidden elements excluded)', color: '#22c55e' },
            { step: '4. Layout (Reflow)', desc: 'Calculate exact positions and sizes', color: '#f59e0b' },
            { step: '5. Paint', desc: 'Draw pixels — colors, borders, text, shadows', color: '#ef4444' },
            { step: '6. Composite', desc: 'Layer stacking, GPU acceleration', color: '#06b6d4' },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
              <div className="flex-1">
                <p className="text-xs font-mono font-bold" style={{ color: item.color }}>{item.step}</p>
                <p className="text-[10px] text-white/50">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Rendering Pipeline Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Browser pehle <span className="text-blue-400 font-bold">HTML parse</span> karke DOM tree banata hai.
          Phir <span className="text-purple-400 font-bold">CSS parse</span> karke CSSOM banata hai.
          Dono mil ke <span className="text-green-400 font-bold">Render Tree</span> banate hain.
          <span className="text-amber-400 font-bold">Layout</span> mein exact positions calculate hoti hain.
          <span className="text-red-400 font-bold">Paint</span> mein pixels draw hote hain.
          <span className="text-cyan-400 font-bold">Composite</span> mein layers arrange hoti hain — GPU加速! 🚀
        </p>
      </div>
    </div>
  );
}
