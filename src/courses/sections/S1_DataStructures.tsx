import { motion } from 'framer-motion';

export default function S1_DataStructures() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Fundamental Data Structures</h2>
        <p className="text-white/60 text-sm">Arrays, linked lists, stacks, queues — building blocks of all algorithms.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Array', access: 'O(1)', insert: 'O(n)', desc: 'Contiguous memory. Fast random access.', icon: '📦', color: 'text-blue-400' },
          { name: 'Linked List', access: 'O(n)', insert: 'O(1)', desc: 'Nodes with pointers. Fast insert/delete.', icon: '🔗', color: 'text-green-400' },
          { name: 'Stack', access: 'O(1)', insert: 'O(1)', desc: 'LIFO — Last In, First Out. Push/pop.', icon: '📚', color: 'text-purple-400' },
          { name: 'Queue', access: 'O(1)', insert: 'O(1)', desc: 'FIFO — First In, First Out. Enqueue/dequeue.', icon: '🚶', color: 'text-amber-400' },
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
              <p className={`font-mono font-bold text-sm ${item.color}`}>{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-white/40 font-mono">Access: {item.access}</p>
              <p className="text-[9px] text-white/40 font-mono">Insert: {item.insert}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Data Structures Kyun Zaroori Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Sahii data structure choose karna = <span className="text-green-400 font-bold">10x speed difference</span>.
          <span className="text-blue-400 font-bold"> Arrays</span> fast access ke liye, <span className="text-green-400 font-bold"> linked lists</span>
          frequent insert/delete ke liye. <span className="text-purple-400 font-bold"> Stack</span> undo/redo ke liye.
          <span className="text-amber-400 font-bold"> Queue</span> task scheduling ke liye.
          Har problem ka sahi data structure hai! 🧠
        </p>
      </div>
    </div>
  );
}
