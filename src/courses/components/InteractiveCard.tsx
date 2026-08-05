import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface InteractiveCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  glow?: boolean;
  glowColor?: 'blue' | 'purple' | 'green' | 'red';
  delay?: number;
}

export default function InteractiveCard({ children, className = '', onClick, glow = false, glowColor = 'blue', delay = 0 }: InteractiveCardProps) {
  const glowClass = glow ? `glow-${glowColor}` : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, type: 'spring', stiffness: 100 }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      onClick={onClick}
      className={`glass-strong rounded-2xl p-6 card-3d ${glowClass} ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
