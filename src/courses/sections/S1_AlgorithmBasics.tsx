import { motion } from 'framer-motion';

export default function S1_AlgorithmBasics() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Algorithm Basics</h2>
        <p className="text-white/60 text-sm">Big O notation, time/space complexity — measuring algorithm efficiency.</p>
      </div>

      <div className="space-y-3">
        {[
          { complexity: 'O(1)', name: 'Constant', desc: 'Same time regardless of input', example: 'Array index access', color: 'text-green-400' },
          { complexity: 'O(log n)', name: 'Logarithmic', desc: 'Halves problem each step', example: 'Binary search', color: 'text-blue-400' },
          { complexity: 'O(n)', name: 'Linear', desc: 'Processes each element once', example: 'Linear search', color: 'text-amber-400' },
          { complexity: 'O(n log n)', name: 'Linearithmic', desc: 'Efficient sorting', example: 'Merge sort, quicksort', color: 'text-purple-400' },
          { complexity: 'O(n²)', name: 'Quadratic', desc: 'Nested loops', example: 'Bubble sort, insertion sort', color: 'text-orange-400' },
          { complexity: 'O(2ⁿ)', name: 'Exponential', desc: 'Doubles each step', example: 'Recursive Fibonacci', color: 'text-red-400' },
        ].map((item, i) => (
          <motion.div
            key={item.complexity}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="glass rounded-xl border border-white/5 p-3 flex items-center gap-4"
          >
            <span className={`font-mono font-bold text-sm w-20 ${item.color}`}>{item.complexity}</span>
            <div className="flex-1">
              <p className="text-xs font-mono font-bold text-white/70">{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <p className="text-[10px] text-white/40">{item.example}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Big O Notation Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Big O batata hai algorithm <span className="text-green-400 font-bold">kitna time/space</span> lega input size ke hisaab se.
          <span className="text-blue-400 font-bold"> O(1)</span> best hai (constant), <span className="text-red-400 font-bold"> O(2ⁿ)</span> worst hai.
          Har algorithm choose karte waqt Big O dekho — yeh batata hai
          algorithm <span className="text-amber-400 font-bold">scale</span> karegi ya nahi! 📊
        </p>
      </div>
    </div>
  );
}
