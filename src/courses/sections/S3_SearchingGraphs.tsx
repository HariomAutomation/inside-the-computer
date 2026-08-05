import { motion } from 'framer-motion';

export default function S3_SearchingGraphs() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Searching & Graph Algorithms</h2>
        <p className="text-white/60 text-sm">Binary search, BFS, DFS, Dijkstra — finding paths and patterns.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Binary Search', time: 'O(log n)', desc: 'Halves search space. Requires sorted array.', icon: '🔍' },
          { name: 'BFS', time: 'O(V+E)', desc: 'Level-by-level traversal. Shortest path in unweighted graph.', icon: '🌊' },
          { name: 'DFS', time: 'O(V+E)', desc: 'Depth-first traversal. Cycle detection, topological sort.', icon: '🏔️' },
          { name: "Dijkstra's", time: 'O((V+E)logV)', desc: 'Shortest path with weighted edges. Uses priority queue.', icon: '🗺️' },
          { name: 'A*', time: 'O(E)', desc: 'Heuristic-guided search. Used in pathfinding, games.', icon: '🧭' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="glass rounded-xl border border-white/5 p-4 flex items-center gap-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <p className="text-[10px] text-white/40 font-mono">{item.time}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Graph Algorithms Kyun Important Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">Graphs</span> real-world relationships represent karte hain —
          social networks, road maps, web links. <span className="text-green-400 font-bold">BFS/DFS</span> se
          nodes explore karte hain. <span className="text-amber-400 font-bold"> Dijkstra</span> shortest path deta hai.
          GPS navigation, Google Maps, social media — sab graph algorithms use karte hain! 🌐
        </p>
      </div>
    </div>
  );
}
