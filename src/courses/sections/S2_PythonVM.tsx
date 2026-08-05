import { motion } from 'framer-motion';

export default function S2_PythonVM() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Python: From Source to Bytecode</h2>
        <p className="text-white/60 text-sm">How Python compiles to bytecode and runs on the PVM.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-blue-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-blue-400">Python Compilation Pipeline</h3>
        <pre className="text-xs text-white/70 font-mono leading-relaxed overflow-x-auto">
{`# Source code
def add(a, b):
    return a + b

# Compiled to bytecode (dis module)
# 2     0 LOAD_FAST    0 (a)
#       2 LOAD_FAST    1 (b)
#       4 BINARY_ADD
#       6 RETURN_VALUE`}
        </pre>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { step: '1. Source', desc: '.py file', icon: '📝' },
          { step: '2. Compile', desc: '→ .pyc bytecode', icon: '⚙️' },
          { step: '3. Execute', desc: 'PVM runs bytecode', icon: '🚀' },
        ].map((item, i) => (
          <motion.div
            key={item.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass rounded-xl border border-white/5 p-4 text-center"
          >
            <div className="text-2xl mb-1">{item.icon}</div>
            <p className="text-xs font-mono font-bold text-primary-300">{item.step}</p>
            <p className="text-[10px] text-white/50">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Python Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Python pehle <span className="text-blue-400 font-bold">.pyc</span> file banata hai (bytecode).
          Phir <span className="text-green-400 font-bold">Python Virtual Machine (PVM)</span> bytecode execute karta hai.
          Yeh tree-walk interpreter hai — slow but flexible.
          <span className="text-amber-400 font-bold"> PyPy</span> JIT use karta hai aur 10x fast hota hai! ⚡
        </p>
      </div>
    </div>
  );
}
