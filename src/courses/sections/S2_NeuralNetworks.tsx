import { motion } from 'framer-motion';
import NeuralNetworkViz from '../components/NeuralNetworkViz';

export default function S2_NeuralNetworks() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Neural Networks</h2>
        <p className="text-white/60 text-sm">How artificial neurons learn — forward pass, backpropagation, gradient descent.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Interactive: Neural Network Forward Pass</h3>
        <NeuralNetworkViz />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <svg viewBox="0 0 400 200" className="w-full max-w-md">
          {[
            { x: 50, nodes: [40, 80, 120, 160], color: '#3b82f6' },
            { x: 175, nodes: [50, 100, 150], color: '#8b5cf6' },
            { x: 300, nodes: [60, 140], color: '#22c55e' },
            { x: 370, nodes: [100], color: '#f59e0b' },
          ].map((layer, li) => (
            <g key={li}>
              {layer.nodes.map((y, ni) => (
                <g key={ni}>
                  <circle cx={layer.x} cy={y} r="12" fill={layer.color + '30'} stroke={layer.color} strokeWidth="1.5" />
                  {li < 3 && layer.nodes.map((_, ci) => (
                    <line key={ci} x1={layer.x + 12} y1={y} x2={[175, 300, 370][li] - 12} y2={[50, 100, 150, 60, 140, 100][ci] || 100} stroke="#334155" strokeWidth="0.5" opacity="0.4" />
                  ))}
                </g>
              ))}
            </g>
          ))}
          <text x="50" y="195" textAnchor="middle" fill="#3b82f6" fontSize="8" fontFamily="monospace">Input</text>
          <text x="175" y="195" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">Hidden</text>
          <text x="300" y="195" textAnchor="middle" fill="#22c55e" fontSize="8" fontFamily="monospace">Hidden</text>
          <text x="370" y="195" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace">Output</text>
        </svg>
      </motion.div>

      <div className="space-y-3">
        {[
          { name: 'Forward Pass', desc: 'Data flows input to output. Each neuron: weighted sum + activation.', icon: '➡️' },
          { name: 'Loss Function', desc: 'Measures how wrong the prediction is.', icon: '📉' },
          { name: 'Backpropagation', desc: 'Calculate gradients of loss w.r.t each weight.', icon: '⬅️' },
          { name: 'Gradient Descent', desc: 'Update weights to minimize loss. Learning rate controls step size.', icon: '⬇️' },
        ].map((item, i) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.08 }}
            className="glass rounded-xl border border-white/5 p-4 flex items-center gap-4"
          >
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="font-mono font-bold text-sm text-primary-300">{item.name}</p>
              <p className="text-[10px] text-white/50">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Neural Network Kaise Seekhta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Neural network <span className="text-blue-400 font-bold">forward pass</span> mein prediction karta hai.
          Phir <span className="text-red-400 font-bold">loss</span> calculate karta hai (kitna galat hai).
          <span className="text-purple-400 font-bold"> Backpropagation</span> se gradient nikalta hai.
          <span className="text-green-400 font-bold"> Gradient descent</span> se weights update karta hai.
          Yeh cycle <span className="text-amber-400 font-bold">millions of times</span> chalta hai until model seekh jaaye! 🧠
        </p>
      </div>
    </div>
  );
}
