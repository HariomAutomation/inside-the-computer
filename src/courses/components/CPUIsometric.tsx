import { motion } from 'framer-motion';

interface CPUIsometricProps {
  highlight?: 'alu' | 'control' | 'cache' | 'registers' | null;
  size?: number;
}

export default function CPUIsometric({ highlight = null, size = 300 }: CPUIsometricProps) {
  const w = size;
  const h = size * 0.75;

  const blockStyle = (id: string) => ({
    fill: highlight === id ? getHighlightColor(id) + '40' : '#1e293b',
    stroke: highlight === id ? getHighlightColor(id) : '#334155',
    strokeWidth: highlight === id ? 2 : 1,
    filter: highlight === id ? `drop-shadow(0 0 8px ${getHighlightColor(id)}80)` : undefined,
  });

  return (
    <motion.svg
      viewBox={`0 0 ${w} ${h}`}
      className="w-full"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: 'spring' }}
    >
      {/* CPU Package */}
      <rect x="20" y="15" width={w - 40} height={h - 30} rx="12" fill="#0f172a" stroke="#334155" strokeWidth="2" />

      {/* Chip Label */}
      <text x={w / 2} y="32" textAnchor="middle" fill="#64748b" fontSize="8" fontFamily="monospace">CPU DIE</text>

      {/* ALU */}
      <motion.g whileHover={{ scale: 1.05 }} className="cursor-pointer">
        <rect x="40" y="50" width="80" height="50" rx="6" {...blockStyle('alu')} />
        <text x="80" y="72" textAnchor="middle" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="monospace">ALU</text>
        <text x="80" y="86" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="monospace">Arithmetic</text>
      </motion.g>

      {/* Control Unit */}
      <motion.g whileHover={{ scale: 1.05 }} className="cursor-pointer">
        <rect x="140" y="50" width="80" height="50" rx="6" {...blockStyle('control')} />
        <text x="180" y="72" textAnchor="middle" fill="#8b5cf6" fontSize="10" fontWeight="bold" fontFamily="monospace">CU</text>
        <text x="180" y="86" textAnchor="middle" fill="#64748b" fontSize="6" fontFamily="monospace">Control</text>
      </motion.g>

      {/* Registers */}
      <motion.g whileHover={{ scale: 1.05 }} className="cursor-pointer">
        <rect x="240" y="50" width="40" height="50" rx="6" {...blockStyle('registers')} />
        <text x="260" y="72" textAnchor="middle" fill="#22c55e" fontSize="9" fontWeight="bold" fontFamily="monospace">REG</text>
        <text x="260" y="86" textAnchor="middle" fill="#64748b" fontSize="5" fontFamily="monospace">x8</text>
      </motion.g>

      {/* Cache */}
      <motion.g whileHover={{ scale: 1.05 }} className="cursor-pointer">
        <rect x="40" y="120" width="240" height="35" rx="6" {...blockStyle('cache')} />
        <text x="160" y="142" textAnchor="middle" fill="#f59e0b" fontSize="10" fontWeight="bold" fontFamily="monospace">L1 Cache</text>
      </motion.g>

      {/* Data Bus */}
      <line x1="80" y1="100" x2="80" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" className="circuit-line" />
      <line x1="180" y1="100" x2="180" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" className="circuit-line" />
      <line x1="260" y1="100" x2="260" y2="120" stroke="#334155" strokeWidth="2" strokeDasharray="4 2" className="circuit-line" />

      {/* Connection pins */}
      {[60, 100, 140, 180, 220, 260].map((x) => (
        <rect key={x} x={x - 3} y={h - 18} width="6" height="8" rx="1" fill="#475569" />
      ))}
    </motion.svg>
  );
}

function getHighlightColor(id: string): string {
  switch (id) {
    case 'alu': return '#3b82f6';
    case 'control': return '#8b5cf6';
    case 'registers': return '#22c55e';
    case 'cache': return '#f59e0b';
    default: return '#64748b';
  }
}
