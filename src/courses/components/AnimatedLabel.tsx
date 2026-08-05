import { motion } from 'framer-motion';

interface AnimatedLabelProps {
  text: string;
  delay?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-lg',
};

export default function AnimatedLabel({ text, delay = 0, className = '', size = 'md' }: AnimatedLabelProps) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`text-white/70 font-sans leading-relaxed ${sizeClasses[size]} ${className}`}
    >
      {text}
    </motion.p>
  );
}
