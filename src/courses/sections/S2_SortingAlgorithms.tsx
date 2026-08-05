import { motion } from 'framer-motion';
import SortingVisualizer from '../components/SortingVisualizer';

export default function S2_SortingAlgorithms() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sorting Algorithms</h2>
        <p className="text-white/60 text-sm">Bubble, merge, quick, heap — from simple to optimal sorting.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Interactive: Sorting Visualizer</h3>
        <SortingVisualizer />
      </motion.div>

      <div className="space-y-3">
        {[
          { name: 'Bubble Sort', time: 'O(n²)', space: 'O(1)', desc: 'Compare adjacent, swap. Simple but slow.', color: 'text-red-400' },
          { name: 'Selection Sort', time: 'O(n²)', space: 'O(1)', desc: 'Find min, place at start. Simple.', color: 'text-orange-400' },
          { name: 'Insertion Sort', time: 'O(n²)', space: 'O(1)', desc: 'Insert each element in correct position. Good for small data.', color: 'text-amber-400' },
          { name: 'Merge Sort', time: 'O(n log n)', space: 'O(n)', desc: 'Divide and conquer. Stable. Consistent performance.', color: 'text-blue-400' },
          { name: 'Quick Sort', time: 'O(n log n) avg', space: 'O(log n)', desc: 'Pivot partitioning. Fastest in practice.', color: 'text-green-400' },
          { name: 'Heap Sort', time: 'O(n log n)', space: 'O(1)', desc: 'Using heap data structure. In-place.', color: 'text-purple-400' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 + i * 0.06 }}
            className="glass rounded-xl border border-white/5 p-3 flex items-center gap-4"
          >
            <div className="flex-1">
              <p className={`font-mono font-bold text-sm ${item.color}`}>{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-white/40 font-mono">Time: {item.time}</p>
              <p className="text-[10px] text-white/40 font-mono">Space: {item.space}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Sorting Algorithm Kab Use Karein?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-green-400 font-bold">Quick Sort</span> generally fastest hai average case mein.
          <span className="text-blue-400 font-bold"> Merge Sort</span> stable hai aur guaranteed O(n log n).
          <span className="text-purple-400 font-bold"> Insertion Sort</span> small datasets ke liye best hai.
          <span className="text-amber-400 font-bold"> Heap Sort</span> jab guaranteed time chahiye aur memory limited ho.
          Real-world mein usually <span className="text-green-400 font-bold">hybrid algorithms</span> use hote hain (Timsort = merge + insertion)! ⚡
        </p>
      </div>
    </div>
  );
}
