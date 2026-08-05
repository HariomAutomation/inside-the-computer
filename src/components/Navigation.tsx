import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavigationProps {
  current: number;
  total: number;
  onNext: () => void;
  onPrev: () => void;
  sectionTitles: string[];
}

export default function Navigation({ current, total, onNext, onPrev, sectionTitles }: NavigationProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      {/* Progress bar */}
      <div className="h-1 w-full bg-surface-400/30 overflow-hidden">
        <motion.div
          className="h-full rounded-r-full"
          style={{
            background: 'linear-gradient(90deg, oklch(0.55 0.22 275), oklch(0.55 0.24 295))',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>

      <div className="flex items-center justify-between px-4 sm:px-8 py-3">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 sm:gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center"
               style={{ background: 'linear-gradient(135deg, oklch(0.55 0.22 275), oklch(0.55 0.24 295))' }}>
            <span className="text-white font-bold text-sm">ISA</span>
          </div>
          <span className="hidden sm:block text-sm font-semibold text-white/80">
            ISA vs Microarchitecture
          </span>
        </motion.div>

        {/* Section indicator */}
        <div className="hidden md:flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <motion.div
              key={i}
              className="relative group"
            >
              <motion.div
                className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-300 ${
                  i === current
                    ? 'bg-primary-400'
                    : i < current
                    ? 'bg-primary-600'
                    : 'bg-surface-300/50'
                }`}
                whileHover={{ scale: 1.5 }}
              />
              {/* Tooltip */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="glass px-3 py-1.5 rounded-lg text-xs whitespace-nowrap text-white/80">
                  {sectionTitles[i]}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/50 font-mono mr-1">
            {current + 1}/{total}
          </span>
          <motion.button
            onClick={onPrev}
            disabled={current === 0}
            className="w-9 h-9 rounded-xl glass flex items-center justify-center text-white/70 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            whileHover={{ scale: current > 0 ? 1.1 : 1 }}
            whileTap={{ scale: current > 0 ? 0.9 : 1 }}
          >
            <ChevronLeft size={18} />
          </motion.button>
          <motion.button
            onClick={onNext}
            disabled={current === total - 1}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            style={{
              background: current < total - 1
                ? 'linear-gradient(135deg, oklch(0.55 0.22 275), oklch(0.55 0.24 295))'
                : undefined,
            }}
            whileHover={{ scale: current < total - 1 ? 1.1 : 1 }}
            whileTap={{ scale: current < total - 1 ? 0.9 : 1 }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
