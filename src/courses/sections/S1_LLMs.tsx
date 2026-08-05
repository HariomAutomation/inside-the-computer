import { motion } from 'framer-motion';

export default function S1_LLMs() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Large Language Models</h2>
        <p className="text-white/60 text-sm">Transformers, attention, tokenization — how LLMs understand and generate text.</p>
      </div>

      <div className="space-y-3">
        {[
          { name: 'Tokenization', desc: 'Break text into tokens (words, subwords, characters)', icon: '✂️', color: 'text-blue-400' },
          { name: 'Embeddings', desc: 'Convert tokens to dense vectors (semantic meaning)', icon: '📐', color: 'text-purple-400' },
          { name: 'Self-Attention', desc: 'Each token looks at all other tokens for context', icon: '👁️', color: 'text-green-400' },
          { name: 'Transformer', desc: 'Stack of attention + feedforward layers', icon: '🏗️', color: 'text-amber-400' },
          { name: 'Pre-training', desc: 'Next token prediction on massive text corpus', icon: '📚', color: 'text-red-400' },
          { name: 'Fine-tuning', desc: 'Adapt to specific tasks with smaller datasets', icon: '🎯', color: 'text-cyan-400' },
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
        <h3 className="font-bold text-sm mb-3 text-primary-400">LLM Kaise Kaam Karta Hai?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          LLM pehle text ko <span className="text-blue-400 font-bold">tokens</span> mein todta hai.
          Phir <span className="text-purple-400 font-bold">embeddings</span> mein convert karta hai.
          <span className="text-green-400 font-bold"> Self-attention</span> se har token doosre tokens se context leta hai.
          <span className="text-amber-400 font-bold"> Transformer</span> layers se深层次 patterns seekhta hai.
          Pre-training mein <span className="text-red-400 font-bold">trillions of tokens</span> pe train hota hai.
          Fine-tuning se specific tasks mein expert ban jaata hai! 🧠
        </p>
      </div>
    </div>
  );
}
