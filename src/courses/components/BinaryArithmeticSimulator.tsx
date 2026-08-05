import { useState } from 'react';
import { motion } from 'framer-motion';

interface BitRow {
  bits: number[];
  label: string;
  color: string;
}

export default function BinaryArithmeticSimulator() {
  const [a, setA] = useState('1011');
  const [b, setB] = useState('0110');
  const [op, setOp] = useState<'+' | '-'>('+');
  const [showCarry, setShowCarry] = useState(true);

  const pad = (s: string, len: number) => s.padStart(len, '0').slice(-len);
  const maxLen = Math.max(a.length, b.length, 4);
  const aPadded = pad(a, maxLen);
  const bPadded = pad(b, maxLen);

  let result: string;
  let carries: number[] = [];

  if (op === '+') {
    let carry = 0;
    const bits: number[] = [];
    for (let i = maxLen - 1; i >= 0; i--) {
      const sum = parseInt(aPadded[i]) + parseInt(bPadded[i]) + carry;
      bits.unshift(sum % 2);
      carry = Math.floor(sum / 2);
      carries.unshift(carry);
    }
    if (carry) bits.unshift(carry);
    result = bits.join('');
    carries.unshift(0);
  } else {
    const aVal = parseInt(aPadded, 2);
    const bVal = parseInt(bPadded, 2);
    const diff = aVal - bVal;
    result = Math.abs(diff).toString(2).padStart(maxLen + 1, diff < 0 ? '1' : '0');
    if (diff >= 0) result = result.slice(-maxLen);
  }

  const rows: BitRow[] = [
    { bits: aPadded.split('').map(Number), label: `A (${aPadded})`, color: '#3b82f6' },
    { bits: bPadded.split('').map(Number), label: `B (${bPadded})`, color: '#8b5cf6' },
  ];

  if (op === '+') {
    rows.push({ bits: carries, label: 'Carries', color: '#f59e0b' });
  }

  const resultBits = result.split('').map(Number);
  rows.push({ bits: resultBits, label: `Result (${result}) = ${parseInt(result, 2)}`, color: '#22c55e' });

  const toBin = (s: string) => {
    const n = parseInt(s) || 0;
    return n.toString(2);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-[1fr,auto,1fr] gap-3 items-end">
        <div>
          <label className="text-[10px] text-white/40 font-mono mb-1 block">A (decimal)</label>
          <input
            type="number" min={0} max={255}
            value={parseInt(aPadded, 2) || 0}
            onChange={(e) => setA(toBin(e.target.value))}
            className="w-full bg-white/5 border border-blue-500/30 rounded-lg px-3 py-2 text-sm font-mono text-blue-400 focus:outline-none focus:border-blue-500"
          />
          <p className="text-[9px] text-white/30 font-mono mt-1">binary: {aPadded}</p>
        </div>
        <div className="flex flex-col items-center gap-2 pb-1">
          <button
            onClick={() => setOp(op === '+' ? '-' : '+')}
            className="w-10 h-10 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-lg font-bold text-primary-400 hover:bg-white/10 transition-all"
          >
            {op}
          </button>
        </div>
        <div>
          <label className="text-[10px] text-white/40 font-mono mb-1 block">B (decimal)</label>
          <input
            type="number" min={0} max={255}
            value={parseInt(bPadded, 2) || 0}
            onChange={(e) => setB(toBin(e.target.value))}
            className="w-full bg-white/5 border border-purple-500/30 rounded-lg px-3 py-2 text-sm font-mono text-purple-400 focus:outline-none focus:border-purple-500"
          />
          <p className="text-[9px] text-white/30 font-mono mt-1">binary: {bPadded}</p>
        </div>
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={showCarry} onChange={(e) => setShowCarry(e.target.checked)} className="accent-amber-500" />
        <span className="text-[10px] text-white/50">Show carries</span>
      </label>

      <div className="glass rounded-xl border border-white/10 p-4 overflow-x-auto">
        <div className="flex flex-col gap-1 min-w-[250px]">
          {rows.map((row, ri) => {
            if (row.label === 'Carries' && !showCarry) return null;
            return (
              <div key={ri} className="flex items-center gap-2">
                <span className="text-[9px] font-mono w-28 text-right" style={{ color: row.color + '99' }}>{row.label}</span>
                <div className="flex gap-0.5">
                  {row.bits.map((bit, bi) => (
                    <motion.div
                      key={bi}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: ri * 0.1 + bi * 0.03 }}
                      className="w-7 h-7 rounded flex items-center justify-center text-[11px] font-mono font-bold"
                      style={{
                        backgroundColor: bit ? row.color + '20' : 'rgba(255,255,255,0.02)',
                        border: `1px solid ${bit ? row.color + '50' : 'rgba(255,255,255,0.05)'}`,
                        color: bit ? row.color : 'rgba(255,255,255,0.2)',
                      }}
                    >
                      {bit}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}

          <div className="border-t border-white/10 mt-1 pt-1 flex items-center gap-2">
            <span className="text-[9px] font-mono w-28 text-right text-green-400/70">= {parseInt(result, 2)}</span>
            <div className="flex gap-0.5">
              {resultBits.map((bit, bi) => (
                <motion.div
                  key={bi}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + bi * 0.05 }}
                  className="w-7 h-7 rounded flex items-center justify-center text-[11px] font-mono font-bold"
                  style={{
                    backgroundColor: bit ? '#22c55e20' : 'rgba(255,255,255,0.02)',
                    border: `1px solid ${bit ? '#22c55e50' : 'rgba(255,255,255,0.05)'}`,
                    color: bit ? '#22c55e' : 'rgba(255,255,255,0.2)',
                  }}
                >
                  {bit}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-4">
        <h4 className="text-[11px] font-mono font-bold text-primary-400 mb-2">Binary Addition Rules</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          {[
            { a: 0, b: 0, c: 0, s: 0 },
            { a: 0, b: 1, c: 0, s: 1 },
            { a: 1, b: 0, c: 0, s: 1 },
            { a: 1, b: 1, c: 1, s: 0 },
          ].map((r, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-2 text-[10px] font-mono">
              <span className="text-blue-400">{r.a}</span>
              <span className="text-white/30">+</span>
              <span className="text-purple-400">{r.b}</span>
              <span className="text-white/30">=</span>
              <span className="text-amber-400">{r.s}</span>
              {r.c ? <span className="text-red-400 text-[9px] block">carry: 1</span> : null}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
