import { useState } from 'react';
import { motion } from 'framer-motion';

interface MemoryCellProps {
  type?: 'SRAM' | 'DRAM';
}

export default function MemoryCell({ type = 'SRAM' }: MemoryCellProps) {
  const [storedBit, setStoredBit] = useState(false);
  const [clockPulse, setClockPulse] = useState(false);

  const triggerClock = () => {
    setClockPulse(true);
    setStoredBit(!storedBit);
    setTimeout(() => setClockPulse(false), 600);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 justify-center">
        <motion.button
          onClick={() => setStoredBit(!storedBit)}
          className={`w-16 h-16 rounded-2xl font-mono font-bold text-2xl transition-all border ${
            storedBit
              ? 'bg-green-500/20 border-green-500/50 text-green-400'
              : 'glass border-white/10 text-white/30'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {storedBit ? '1' : '0'}
        </motion.button>

        <motion.button
          onClick={triggerClock}
          className={`w-16 h-16 rounded-2xl font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all border ${
            clockPulse
              ? 'bg-green-500 border-green-400 text-white'
              : 'glass border-white/10 text-white/60'
          }`}
          whileTap={{ scale: 0.9 }}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
          </svg>
          CLK
        </motion.button>
      </div>

      <svg viewBox="0 0 250 120" className="w-full max-w-xs mx-auto">
        {type === 'SRAM' ? (
          <>
            {/* SRAM: 6T cell representation */}
            <rect x="30" y="10" width="80" height="100" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />
            <text x="70" y="30" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">Cross-Coupled</text>
            <text x="70" y="42" textAnchor="middle" fill="#8b5cf6" fontSize="8" fontFamily="monospace">Inverters</text>

            {/* Storage indicator */}
            <motion.circle
              cx="70" cy="70" r="15"
              fill={storedBit ? '#22c55e40' : '#1e293b'}
              stroke={storedBit ? '#22c55e' : '#475569'}
              strokeWidth="2"
              animate={storedBit ? { filter: ['drop-shadow(0 0 3px #22c55e)', 'drop-shadow(0 0 10px #22c55e)', 'drop-shadow(0 0 3px #22c55e)'] } : {}}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <text x="70" y="74" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="monospace">
              {storedBit ? '1' : '0'}
            </text>

            <text x="70" y="100" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">6 Transistors</text>
          </>
        ) : (
          <>
            {/* DRAM: 1T-1C cell representation */}
            <rect x="30" y="10" width="80" height="100" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1" />

            {/* Capacitor */}
            <line x1="50" y1="50" x2="50" y2="90" stroke="#f59e0b" strokeWidth="2" />
            <line x1="60" y1="50" x2="60" y2="90" stroke="#f59e0b" strokeWidth="2" />
            <text x="55" y="100" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">C</text>

            {/* Transistor */}
            <rect x="70" y="55" width="30" height="20" rx="3" fill="#1e3a5f" stroke="#3b82f6" strokeWidth="1" />
            <text x="85" y="68" textAnchor="middle" fill="#3b82f6" fontSize="6" fontFamily="monospace">T</text>

            <text x="70" y="25" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">1T + 1C</text>
            <text x="70" y="108" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="monospace">Needs Refresh!</text>
          </>
        )}

        {/* Output */}
        <line x1="110" y1="60" x2="160" y2="60" stroke={storedBit ? '#22c55e' : '#475569'} strokeWidth="2" />
        <circle cx="170" cy="60" r="12" fill={storedBit ? '#22c55e40' : '#1e293b'} stroke={storedBit ? '#22c55e' : '#475569'} strokeWidth="2" />
        <text x="170" y="64" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="monospace">
          {storedBit ? '1' : '0'}
        </text>
        <text x="170" y="85" textAnchor="middle" fill="#64748b" fontSize="7" fontFamily="monospace">Output Q</text>
      </svg>
    </div>
  );
}
