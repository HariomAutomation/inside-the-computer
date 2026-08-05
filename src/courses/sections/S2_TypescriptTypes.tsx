import { motion } from 'framer-motion';

export default function S2_TypescriptTypes() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">TypeScript Type System</h2>
        <p className="text-white/60 text-sm">Interfaces, generics, unions, and type narrowing.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-blue-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-blue-400">TypeScript vs JavaScript</h3>
        <pre className="text-xs text-white/70 font-mono leading-relaxed overflow-x-auto">
{`// JavaScript (no types)
function add(a, b) { return a + b; }

// TypeScript (with types)
function add(a: number, b: number): number {
  return a + b;
}

// Interface
interface User {
  name: string;
  age: number;
  email?: string;  // optional
}

// Generic
function identity<T>(arg: T): T { return arg; }

// Union
type Status = "loading" | "error" | "success";`}
        </pre>
      </motion.div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'Interfaces', desc: 'Define object shapes', icon: '📋' },
          { name: 'Generics', desc: 'Type-safe reusable code', icon: '🔄' },
          { name: 'Unions', desc: 'Multiple possible types', icon: '🔀' },
          { name: 'Type Guards', desc: 'Narrow types at runtime', icon: '🛡️' },
          { name: 'Mapped Types', desc: 'Transform existing types', icon: '🗺️' },
          { name: 'Utility Types', desc: 'Partial, Pick, Omit, etc.', icon: '🧰' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.05 }}
            className="glass rounded-xl border border-white/5 p-3 text-center"
          >
            <div className="text-xl mb-1">{item.icon}</div>
            <p className="text-xs font-mono font-bold text-primary-300">{item.name}</p>
            <p className="text-[10px] text-white/50">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">TypeScript Kyun Use Karte Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          TypeScript compile time pe <span className="text-blue-400 font-bold">type errors</span> pakadta hai.
          <span className="text-green-400 font-bold"> Interfaces</span> se object ka structure define hota hai.
          <span className="text-purple-400 font-bold"> Generics</span> se reusable, type-safe functions banti hain.
          <span className="text-amber-400 font-bold"> IDE support</span> zabardast hai — autocomplete, refactoring, docs.
          Large codebases ke liye TypeScript zaroori hai! 🔧
        </p>
      </div>
    </div>
  );
}
