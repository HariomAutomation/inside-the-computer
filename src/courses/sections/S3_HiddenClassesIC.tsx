import { motion } from 'framer-motion';

export default function S3_HiddenClassesIC() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Hidden Classes & Inline Caching</h2>
        <p className="text-white/60 text-sm">V8's tricks to make dynamic JavaScript fast.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-primary-400">Hidden Classes</h3>
        <pre className="text-xs text-white/70 font-mono leading-relaxed overflow-x-auto">
{`// V8 creates hidden classes for object shapes
const obj1 = { x: 1, y: 2 };
// HiddenClass0: { x: offset0, y: offset1 }

const obj2 = { x: 3, y: 4 };
// Same HiddenClass0! (same shape)

// Different shape = different hidden class
const obj3 = { x: 5, z: 6 };
// HiddenClass1: { x: offset0, z: offset1 }`}
        </pre>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass rounded-2xl border border-purple-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-purple-400">Inline Caching</h3>
        <pre className="text-xs text-white/70 font-mono leading-relaxed overflow-x-auto">
{`// IC caches property access results
function getX(obj) {
  return obj.x; // First call: slow lookup
  // Second call: IC hits, returns cached offset
  // TurboFan: compiles to direct memory access
}`}
        </pre>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Yeh Optimizations Kyun Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          JavaScript <span className="text-red-400 font-bold">dynamic</span> hai — objects ka shape change ho sakta hai.
          V8 <span className="text-blue-400 font-bold">hidden classes</span> se similar objects ko ek saath treat karta hai.
          <span className="text-purple-400 font-bold"> Inline caching</span> se property access fast hota hai —
          ek baar dekha toh yaad rakh leta hai. TurboFan phir yeh info use karke
          super fast machine code generate karta hai! 🔥
        </p>
      </div>
    </div>
  );
}
