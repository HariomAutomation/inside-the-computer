import { motion } from 'framer-motion';

interface ALUBlockProps {
  inputA: number;
  inputB: number;
  opcode: string;
  output: number;
  active?: boolean;
}

export default function ALUBlock({ inputA, inputB, opcode, output, active = false }: ALUBlockProps) {
  return (
    <motion.svg
      viewBox="0 0 300 180"
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Input A */}
      <motion.g initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        <line x1="20" y1="50" x2="80" y2="50" stroke={active ? '#3b82f6' : '#475569'} strokeWidth="2" className={active ? 'data-flow-line' : ''} />
        <text x="15" y="45" fill="#3b82f6" fontSize="10" fontWeight="bold" fontFamily="monospace">A</text>
        <text x="45" y="45" fill="#94a3b8" fontSize="9" fontFamily="monospace">{inputA}</text>
      </motion.g>

      {/* Input B */}
      <motion.g initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
        <line x1="20" y1="130" x2="80" y2="130" stroke={active ? '#8b5cf6' : '#475569'} strokeWidth="2" className={active ? 'data-flow-line' : ''} />
        <text x="15" y="125" fill="#8b5cf6" fontSize="10" fontWeight="bold" fontFamily="monospace">B</text>
        <text x="45" y="125" fill="#94a3b8" fontSize="9" fontFamily="monospace">{inputB}</text>
      </motion.g>

      {/* ALU Body */}
      <motion.g
        animate={active ? { filter: ['drop-shadow(0 0 5px #3b82f680)', 'drop-shadow(0 0 15px #3b82f680)', 'drop-shadow(0 0 5px #3b82f680)'] } : {}}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <polygon points="80,30 80,150 200,160 200,20" fill={active ? '#1e3a5f' : '#1e293b'} stroke={active ? '#3b82f6' : '#334155'} strokeWidth="2" />
        <text x="140" y="85" textAnchor="middle" fill="#3b82f6" fontSize="14" fontWeight="bold" fontFamily="monospace">ALU</text>
        <text x="140" y="105" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace">{opcode}</text>
      </motion.g>

      {/* Output */}
      <motion.g initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }}>
        <line x1="200" y1="90" x2="270" y2="90" stroke={active ? '#22c55e' : '#475569'} strokeWidth="2" className={active ? 'data-flow-line' : ''} />
        <text x="275" y="85" fill="#22c55e" fontSize="10" fontWeight="bold" fontFamily="monospace">OUT</text>
        <motion.text
          x="275"
          y="100"
          fill="#22c55e"
          fontSize="12"
          fontWeight="bold"
          fontFamily="monospace"
          initial={{ opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.3 }}
        >
          {output}
        </motion.text>
      </motion.g>

      {/* Opcode input */}
      <line x1="140" y1="160" x2="140" y2="130" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 2" />
      <text x="140" y="170" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">OPCODE</text>
    </motion.svg>
  );
}
