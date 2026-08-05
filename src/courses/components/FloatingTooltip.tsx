import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Info, X } from 'lucide-react';

interface FloatingTooltipProps {
  text: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function FloatingTooltip({ text, position = 'bottom' }: FloatingTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div className="relative inline-flex">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-lg glass text-white/50 hover:text-white/80 transition-colors"
      >
        {isOpen ? <X size={14} /> : <Info size={14} />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`absolute z-50 ${positionClasses[position]} w-64 glass-strong rounded-xl p-3 border border-white/10`}
          >
            <p className="text-xs text-white/70 leading-relaxed">{text}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
