import { motion } from 'framer-motion';

export default function S1_InterpreterArch() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Interpreter Architecture</h2>
        <p className="text-white/60 text-sm">Tree-walk, bytecode, and JIT — three interpreter strategies.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Tree-Walk', desc: 'Traverse AST directly, evaluate nodes', speed: 'Slowest', use: 'Ruby, early JS', icon: '🌳', color: 'border-green-500/30' },
          { name: 'Bytecode VM', desc: 'Compile to bytecode, run on virtual machine', speed: 'Medium', use: 'Python, Lua, C#', icon: '📦', color: 'border-blue-500/30' },
          { name: 'JIT Compiler', desc: 'Compile hot paths to native code at runtime', speed: 'Fastest', use: 'V8, JVM, HotSpot', icon: '🔥', color: 'border-red-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.12 }}
            className={`glass rounded-xl border ${item.color} p-5`}
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
                <p className="text-[10px] text-white/40">Speed: {item.speed}</p>
              </div>
            </div>
            <p className="text-[11px] text-white/60">{item.desc}</p>
            <p className="text-[10px] text-white/40 mt-1">Used in: {item.use}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Tree-Walk vs Bytecode vs JIT?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-green-400 font-bold">Tree-Walk</span> sabse simple hai — AST traverse karte jaao.
          <span className="text-blue-400 font-bold"> Bytecode VM</span> pehle AST ko bytecode mein convert karta hai
          (Python .pyc files), phir VM run karta hai. <span className="text-red-400 font-bold">JIT</span> hot code
          (baar baar chalne wala) ko native machine code mein compile karta hai —
          speed C/C++ jaisi aati hai! 🔥
        </p>
      </div>
    </div>
  );
}
