import { useState } from 'react';
import { motion } from 'framer-motion';

interface TransistorCircuitProps {
  initialGateVoltage?: boolean;
}

export default function TransistorCircuit({ initialGateVoltage = false }: TransistorCircuitProps) {
  const [gateVoltage, setGateVoltage] = useState(initialGateVoltage);
  const isOn = gateVoltage;

  return (
    <div className="space-y-4">
      <motion.button
        onClick={() => setGateVoltage(!gateVoltage)}
        className={`px-6 py-3 rounded-2xl font-mono text-sm font-bold transition-all border ${
          isOn
            ? 'bg-green-500/20 border-green-500/50 text-green-400 glow-green'
            : 'glass border-white/10 text-white/60'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Gate Voltage: {isOn ? 'HIGH (1) → NMOS ON' : 'LOW (0) → NMOS OFF'}
      </motion.button>

      <svg viewBox="0 0 300 200" className="w-full max-w-sm mx-auto">
        {/* VCC Rail */}
        <line x1="50" y1="20" x2="250" y2="20" stroke="#22c55e" strokeWidth="2" />
        <text x="40" y="24" fill="#22c55e" fontSize="8" fontFamily="monospace">VCC</text>

        {/* GND Rail */}
        <line x1="50" y1="180" x2="250" y2="180" stroke="#64748b" strokeWidth="2" />
        <text x="35" y="184" fill="#64748b" fontSize="8" fontFamily="monospace">GND</text>

        {/* NMOS Transistor */}
        <rect x="110" y="80" width="80" height="50" rx="6" fill={isOn ? '#1e3a5f' : '#1e293b'} stroke={isOn ? '#3b82f6' : '#334155'} strokeWidth="2" />
        <text x="150" y="102" textAnchor="middle" fill={isOn ? '#3b82f6' : '#64748b'} fontSize="10" fontWeight="bold" fontFamily="monospace">NMOS</text>
        <text x="150" y="118" textAnchor="middle" fill={isOn ? '#22c55e' : '#ef4444'} fontSize="9" fontFamily="monospace">
          {isOn ? 'ON ✓' : 'OFF ✕'}
        </text>

        {/* Gate line */}
        <line x1="50" y1="105" x2="110" y2="105" stroke={isOn ? '#22c55e' : '#64748b'} strokeWidth="2" />
        <text x="55" y="100" fill={isOn ? '#22c55e' : '#64748b'} fontSize="8" fontFamily="monospace">GATE</text>

        {/* Drain to VCC */}
        <line x1="150" y1="80" x2="150" y2="20" stroke={isOn ? '#22c55e' : '#334155'} strokeWidth="2" />

        {/* Source to GND */}
        <line x1="150" y1="130" x2="150" y2="180" stroke={isOn ? '#22c55e' : '#334155'} strokeWidth="2" />

        {/* Output */}
        <line x1="190" y1="105" x2="250" y2="105" stroke={isOn ? '#22c55e' : '#475569'} strokeWidth="2" />
        <motion.circle
          cx="255"
          cy="105"
          r="8"
          fill={isOn ? '#22c55e' : '#1e293b'}
          stroke={isOn ? '#22c55e' : '#475569'}
          strokeWidth="2"
          animate={isOn ? { filter: ['drop-shadow(0 0 3px #22c55e)', 'drop-shadow(0 0 10px #22c55e)', 'drop-shadow(0 0 3px #22c55e)'] } : {}}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <text x="270" y="108" fill={isOn ? '#22c55e' : '#475569'} fontSize="10" fontFamily="monospace">
          {isOn ? '1' : '0'}
        </text>
      </svg>

      <div className="text-center">
        <p className="text-xs text-white/60 font-mono">
          {isOn
            ? '⚡ Gate=1 → NMOS conducts → Current flows → Output=1'
            : '💤 Gate=0 → NMOS blocked → No current → Output=0'}
        </p>
      </div>
    </div>
  );
}
