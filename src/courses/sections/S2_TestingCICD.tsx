import { motion } from 'framer-motion';

export default function S2_TestingCICD() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Testing & CI/CD</h2>
        <p className="text-white/60 text-sm">Unit tests, integration tests, and automated deployment pipelines.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { name: 'Unit Tests', desc: 'Test individual functions/components in isolation', coverage: '70-80%', color: 'border-green-500/30' },
          { name: 'Integration Tests', desc: 'Test how modules work together', coverage: '20-30%', color: 'border-blue-500/30' },
          { name: 'E2E Tests', desc: 'Test complete user workflows (Cypress, Playwright)', coverage: '5-10%', color: 'border-purple-500/30' },
          { name: 'Snapshot Tests', desc: 'Detect unexpected UI changes', coverage: 'Varies', color: 'border-amber-500/30' },
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
            <p className="text-[10px] text-green-400 mt-1">Typical: {item.coverage}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-primary-400">CI/CD Pipeline</h3>
        <div className="flex items-center gap-2 flex-wrap">
          {['Code Push', 'Lint', 'Test', 'Build', 'Deploy'].map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg glass border border-white/10 text-xs font-mono">{step}</span>
              {i < 4 && <span className="text-white/30">→</span>}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Testing Kyun Zaroori Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Tests <span className="text-green-400 font-bold">bugs pakadte hain</span> before users see them.
          <span className="text-blue-400 font-bold"> CI/CD</span> se har push pe automatically test + deploy hota hai.
          <span className="text-purple-400 font-bold"> Refactoring</span> karte waqt tests safety net ka kaam karte hain.
          Bad code = bad product. Good tests = confident team! 🧪
        </p>
      </div>
    </div>
  );
}
