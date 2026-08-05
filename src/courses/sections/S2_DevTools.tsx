import { motion } from 'framer-motion';

export default function S2_DevTools() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Browser DevTools</h2>
        <p className="text-white/60 text-sm">Performance profiling, debugging, and optimization techniques.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Elements Panel', desc: 'Inspect/edit DOM and CSS live', icon: '🔍', use: 'Debugging layout' },
          { name: 'Console', desc: 'Execute JS, view logs and errors', icon: '💻', use: 'Quick testing' },
          { name: 'Network Panel', desc: 'Monitor HTTP requests, timing, size', icon: '🌐', use: 'Performance analysis' },
          { name: 'Performance Panel', desc: 'Record and analyze runtime performance', icon: '📊', use: 'Finding bottlenecks' },
          { name: 'Lighthouse', desc: 'Audit performance, accessibility, SEO', icon: '🗼', use: 'Quality assessment' },
          { name: 'Memory Panel', desc: 'Find memory leaks, heap snapshots', icon: '🧠', use: 'Memory debugging' },
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
        <h3 className="font-bold text-sm mb-3 text-primary-400">DevTools Kaise Use Karte Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">Elements panel</span> se DOM inspect karo.
          <span className="text-green-400 font-bold"> Network panel</span> se dekho kitna time lag raha hai requests mein.
          <span className="text-purple-400 font-bold"> Performance panel</span> record karo aur Flame chart dekho
          kahan slow hai. <span className="text-amber-400 font-bold">Lighthouse</span> overall score deta hai. 🔧
        </p>
      </div>
    </div>
  );
}
