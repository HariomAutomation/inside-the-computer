import { motion } from 'framer-motion';

export default function S1_GPU() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">GPU Computing</h2>
        <p className="text-white/60 text-sm">Why GPUs are 100x faster than CPUs for AI and graphics.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-blue-500/30 p-5">
          <p className="font-mono font-bold text-sm text-blue-400 mb-2">CPU</p>
          <p className="text-[11px] text-white/60">Few powerful cores (8-64). Great for serial tasks. Branch prediction, out-of-order execution.</p>
          <p className="text-[10px] text-white/40 mt-2">Good for: OS, general computing</p>
        </div>
        <div className="glass rounded-2xl border border-green-500/30 p-5">
          <p className="font-mono font-bold text-sm text-green-400 mb-2">GPU</p>
          <p className="text-[11px] text-white/60">Thousands of small cores. Great for parallel tasks. SIMD execution.</p>
          <p className="text-[10px] text-white/40 mt-2">Good for: AI, graphics, crypto</p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-purple-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-purple-400">Matrix Multiplication — GPU's Killer App</h3>
        <p className="text-sm text-white/60 leading-relaxed">
          Neural networks = <span className="text-green-400 font-bold">millions of matrix multiplications</span>.
          CPU karta hai ek-ek karke. GPU <span className="text-amber-400 font-bold">thousands of cores</span> se
          ek saath karta hai. Isliye GPU AI ke liye zaroori hai!
        </p>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">GPU Kyun Important Hai AI ke Liye?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">CPU</span> powerful hai but kam cores hain.
          <span className="text-green-400 font-bold"> GPU</span> mein thousands of cores hain —
          parallel computations ke liye perfect. Neural networks mein
          <span className="text-purple-400 font-bold"> matrix math</span> hota hai — GPU usme king hai.
          NVIDIA ka <span className="text-amber-400 font-bold">CUDA</span> framework se GPU programming easy hai.
          Isliye AI researchers ke paas GPUs hote hain! 🎮
        </p>
      </div>
    </div>
  );
}
