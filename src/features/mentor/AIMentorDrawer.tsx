import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Sparkles, ShieldCheck, RefreshCw } from 'lucide-react';
import { useMentorStore } from '../../stores/useMentorStore';

export default function AIMentorDrawer() {
  const { isOpen, toggleDrawer, messages, sendMessage, adaMemory } = useMentorStore();
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-md h-full bg-surface-500/95 glass-strong border-l border-primary-500/30 p-6 flex flex-col justify-between shadow-2xl"
        >
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400 flex items-center justify-center text-purple-300">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white flex items-center gap-2">
                    Ada 3.0 <Sparkles size={14} className="text-yellow-400" />
                  </h3>
                  <span className="text-[10px] font-mono text-primary-300">
                    Socratic AI Mentor (Privacy Guaranteed 🛡️)
                  </span>
                </div>
              </div>
              <button
                onClick={toggleDrawer}
                className="p-2 rounded-xl glass text-white/60 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Ada Memory Insight Badge */}
            <div className="mt-4 glass p-3 rounded-xl border border-purple-500/20 text-xs font-mono text-white/80 space-y-1">
              <div className="flex items-center justify-between text-purple-300 font-bold">
                <span>🧠 Ada's Focus Area for You:</span>
                <span className="text-[10px] text-green-400 flex items-center gap-1">
                  <ShieldCheck size={12} /> Privacy Safe
                </span>
              </div>
              <p className="text-[11px] text-white/60">
                Weak Spot: <span className="text-yellow-300 font-bold">{adaMemory.weakTopics[0]}</span>
              </p>
            </div>
          </div>

          {/* Chat Messages Stream */}
          <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-1">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'USER' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-sans leading-relaxed ${
                    msg.sender === 'USER'
                      ? 'bg-primary-500 text-white rounded-br-none shadow-md shadow-primary-500/20'
                      : 'glass border border-purple-500/30 text-white/90 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.suggestedAction && (
                    <button className="mt-2 px-3 py-1 rounded-lg bg-purple-600 text-white font-mono text-[10px] font-bold flex items-center gap-1 hover:bg-purple-500 transition-all">
                      <RefreshCw size={12} /> {msg.suggestedAction.label}
                    </button>
                  )}
                </div>
                <span className="text-[9px] font-mono text-white/40 mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="pt-2 border-t border-white/10 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask Ada a question or explain a concept..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1 bg-surface-500 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-white/40 outline-none focus:border-primary-400"
            />
            <button
              onClick={handleSend}
              className="p-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 transition-all shadow-md shadow-primary-500/20"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
