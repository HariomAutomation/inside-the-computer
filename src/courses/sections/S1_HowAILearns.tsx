import { motion } from 'framer-motion';

export default function S1_HowAILearns() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">How AI Learns</h2>
        <p className="text-white/60 text-sm">Training data, loss functions, optimization — the complete learning pipeline.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Training Data', desc: 'Examples the model learns from. Garbage in = garbage out.', icon: '📊', color: 'text-blue-400' },
          { name: 'Loss Function', desc: 'Measures how wrong predictions are. Lower = better.', icon: '📉', color: 'text-red-400' },
          { name: 'Optimizer', desc: 'Algorithm that updates weights (SGD, Adam, etc.)', icon: '⚙️', color: 'text-green-400' },
          { name: 'Learning Rate', desc: 'How big each update step is. Too high = diverge. Too low = slow.', icon: '🎚️', color: 'text-amber-400' },
          { name: 'Epoch', desc: 'One complete pass through all training data.', icon: '🔄', color: 'text-purple-400' },
          { name: 'Overfitting', desc: 'Model memorizes training data but fails on new data.', icon: '⚠️', color: 'text-pink-400' },
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
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">AI Kaise Seekhta Hai — Complete Pipeline</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Pehle <span className="text-blue-400 font-bold">data</span> collect karo. Model banakar
          <span className="text-green-400 font-bold"> forward pass</span> karo — prediction lo.
          <span className="text-red-400 font-bold"> Loss</span> calculate karo (prediction vs actual).
          <span className="text-purple-400 font-bold"> Backpropagation</span> se gradients nikalo.
          <span className="text-amber-400 font-bold"> Optimizer</span> se weights update karo.
          Yeh process <span className="text-pink-400 font-bold">thousands of epochs</span> tak chalta hai.
          Overfitting se bachne ke liye regularization, dropout use karte hain! 🧠
        </p>
      </div>
    </div>
  );
}
