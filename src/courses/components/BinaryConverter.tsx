import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BinaryConverterProps {
  initialValue?: number;
}

export default function BinaryConverter({ initialValue = 42 }: BinaryConverterProps) {
  const [decimal, setDecimal] = useState(initialValue);
  const [binary, setBinary] = useState('');
  const [hex, setHex] = useState('');

  useEffect(() => {
    const val = Math.max(0, Math.min(255, decimal));
    setBinary(val.toString(2).padStart(8, '0'));
    setHex(val.toString(16).toUpperCase().padStart(2, '0'));
  }, [decimal]);

  const toggleBit = (index: number) => {
    const bits = binary.split('');
    bits[index] = bits[index] === '0' ? '1' : '0';
    setDecimal(parseInt(bits.join(''), 2));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-white/50 font-mono mb-1">DECIMAL</span>
          <input
            type="number"
            min={0}
            max={255}
            value={decimal}
            onChange={(e) => setDecimal(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
            className="w-20 bg-surface-800 border border-primary-500/30 rounded-xl p-2 text-center text-xl font-bold font-mono text-white outline-none focus:border-primary-400"
          />
        </div>
        <div className="text-white/30 text-2xl font-mono mt-4">=</div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-white/50 font-mono mb-1">HEXADECIMAL</span>
          <div className="w-20 bg-surface-800 border border-purple-500/30 rounded-xl p-2 text-center text-xl font-bold font-mono text-purple-400">
            0x{hex}
          </div>
        </div>
      </div>

      <div>
        <span className="text-[10px] text-white/50 font-mono mb-2 block">BINARY (click bits to toggle)</span>
        <div className="flex gap-1">
          {binary.split('').map((bit, i) => (
            <motion.button
              key={i}
              onClick={() => toggleBit(i)}
              className={`binary-bulb w-10 h-10 rounded-xl font-mono font-bold text-lg flex items-center justify-center border transition-all ${
                bit === '1'
                  ? 'on border-green-500/50 text-white'
                  : 'off border-white/10 text-white/30'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {bit}
            </motion.button>
          ))}
        </div>
        <div className="flex gap-1 mt-1">
          {binary.split('').map((_, i) => (
            <span key={i} className="w-10 text-center text-[8px] text-white/30 font-mono">
              {128 >> i}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
