import { motion } from 'framer-motion';

export default function S3_CodegenOptimization() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Code Generation & Optimization</h2>
        <p className="text-white/60 text-sm">Turning AST into fast machine code.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Dead Code Elimination', desc: 'Remove unreachable code', before: 'x = 5; return;', after: 'return;', color: 'border-red-500/30' },
          { name: 'Constant Folding', desc: 'Evaluate at compile time', before: 'x = 3 * 4', after: 'x = 12', color: 'border-green-500/30' },
          { name: 'Loop Unrolling', desc: 'Reduce loop overhead', before: 'for(i=0;i<4;i++)', after: 'i0();i1();i2();i3();', color: 'border-blue-500/30' },
          { name: 'Inlining', desc: 'Replace call with function body', before: 'f(x)', after: 'x+1', color: 'border-purple-500/30' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className={`glass rounded-xl border ${item.color} p-4`}
          >
            <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
            <p className="text-[10px] text-white/50 mt-1">{item.desc}</p>
            <div className="mt-2 space-y-1">
              <p className="text-[9px] text-red-400/60 font-mono line-through">{item.before}</p>
              <p className="text-[9px] text-green-400 font-mono">{item.after}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Optimization Kyun Important Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-green-400 font-bold">Constant folding</span> se compile time pe calculations ho jaati hain.
          <span className="text-blue-400 font-bold"> Dead code elimination</span> se useless code hat jaata hai.
          <span className="text-purple-400 font-bold"> Inlining</span> se function call overhead bachta hai.
          Yeh sab <span className="text-amber-400 font-bold">10-100x speed</span> badha sakte hain! ⚡
        </p>
      </div>
    </div>
  );
}
