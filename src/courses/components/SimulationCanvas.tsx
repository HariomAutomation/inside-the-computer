import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface SimulationCanvasProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  className?: string;
}

export default function SimulationCanvas({ children, title, subtitle, className = '' }: SimulationCanvasProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className={`w-full glass-strong rounded-3xl border border-white/10 overflow-hidden ${className}`}
    >
      <div className="glass px-6 py-3 border-b border-white/10 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-white font-mono">{title}</h3>
          {subtitle && <p className="text-[10px] text-white/50 font-mono">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-[10px] text-white/40 font-mono">INTERACTIVE</span>
        </div>
      </div>
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </motion.div>
  );
}
