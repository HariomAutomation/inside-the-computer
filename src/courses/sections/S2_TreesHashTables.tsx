import { motion } from 'framer-motion';

export default function S2_TreesHashTables() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Trees & Hash Tables</h2>
        <p className="text-white/60 text-sm">Hierarchical data and O(1) lookups — trees and hash maps.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Binary Tree', desc: 'Each node has at most 2 children', use: 'Expression parsing, BSTs', icon: '🌳' },
          { name: 'BST', desc: 'Left < Root < Right. O(log n) search.', use: 'Sorted data, range queries', icon: '🌲' },
          { name: 'Heap', desc: 'Parent always >= (max) or <= (min) children', use: 'Priority queues, scheduling', icon: '⛰️' },
          { name: 'Trie', desc: 'Prefix tree for strings. O(m) lookup.', use: 'Autocomplete, spell check', icon: '🔤' },
          { name: 'Hash Table', desc: 'O(1) average lookup via hash function', use: 'Dictionaries, caches, sets', icon: '🗂️' },
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
            <p className="text-[10px] text-white/40">{item.use}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Trees vs Hash Tables?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">Hash tables</span> O(1) average lookup dete hain — fastest!
          But <span className="text-red-400 font-bold">worst case O(n)</span> hota hai collisions mein.
          <span className="text-green-400 font-bold"> BSTs</span> guaranteed O(log n) dete hain aur sorted order maintain karte hain.
          <span className="text-purple-400 font-bold"> Heaps</span> min/max finding ke liye best hain.
          Use case dekh ke choose karo! 🧠
        </p>
      </div>
    </div>
  );
}
