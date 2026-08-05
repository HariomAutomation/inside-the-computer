import { motion } from 'framer-motion';

export default function S3_MLConcepts() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Machine Learning Concepts</h2>
        <p className="text-white/60 text-sm">Supervised, unsupervised, reinforcement learning — the three paradigms.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Supervised Learning', desc: 'Learn from labeled data (input → correct output)', examples: 'Classification, Regression', icon: '👨‍🏫', color: 'text-blue-400' },
          { name: 'Unsupervised Learning', desc: 'Find patterns in unlabeled data', examples: 'Clustering, Dimensionality reduction', icon: '🔍', color: 'text-purple-400' },
          { name: 'Reinforcement Learning', desc: 'Learn by trial and error with rewards', examples: 'Game AI, Robotics', icon: '🎮', color: 'text-green-400' },
          { name: 'Transfer Learning', desc: 'Pre-trained model + fine-tune on new data', examples: 'GPT, BERT, ResNet', icon: '🔄', color: 'text-amber-400' },
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
              <p className="text-[10px] text-white/40 mt-1">Examples: {item.examples}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">ML Ke 3 Types Kya Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">Supervised</span> mein hum data ke saath answer dete hain —
          model seekhta hai ki input se output kaise aata hai.
          <span className="text-purple-400 font-bold"> Unsupervised</span> mein bina answer ke patterns dhundhte hain —
          jaise customer segments. <span className="text-green-400 font-bold"> Reinforcement</span> mein agent
          khud se try karta hai aur reward/punishment se seekhta hai —
          jaise AlphaGo ne Go seekha! 🎮
        </p>
      </div>
    </div>
  );
}
