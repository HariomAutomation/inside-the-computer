import { motion } from 'framer-motion';

export default function S1_AIIntro() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">What is Artificial Intelligence?</h2>
        <p className="text-white/60 text-sm">From rule-based systems to neural networks — the journey of AI.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Rule-Based AI', desc: 'If-then rules. Expert systems. Limited.', era: '1950s-1980s', icon: '📜', color: 'text-blue-400' },
          { name: 'Machine Learning', desc: 'Learn patterns from data. Statistical.', era: '1990s-2010s', icon: '📊', color: 'text-green-400' },
          { name: 'Deep Learning', desc: 'Neural networks with many layers. Image, text, speech.', era: '2010s-now', icon: '🧠', color: 'text-purple-400' },
          { name: 'LLMs & AGI', desc: 'Large language models. Reasoning, generation.', era: '2020s-now', icon: '🤖', color: 'text-amber-400' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
            className="glass rounded-xl border border-white/5 p-4 flex items-center gap-4"
          >
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <p className={`font-mono font-bold text-sm ${item.color}`}>{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
            <p className="text-[10px] text-white/40">{item.era}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">AI Kya Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          AI basically <span className="text-primary-400 font-bold">machines se sochwaana</span> hai.
          <span className="text-blue-400 font-bold"> Rule-based</span> AI mein hum rules dete the.
          <span className="text-green-400 font-bold"> Machine Learning</span> mein data se khud seekhta hai.
          <span className="text-purple-400 font-bold"> Deep Learning</span> neurons ke layers use karta hai —
          bilkul insaan ke dimaag jaisa. Aaj kal <span className="text-amber-400 font-bold"> LLMs</span> se
          AI literally baat kar sakta hai, code likh sakta hai! 🤖
        </p>
      </div>
    </div>
  );
}
