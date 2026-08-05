import { motion } from 'framer-motion';
import { useState } from 'react';
import { Cpu, Info } from 'lucide-react';
import Quiz from '../components/Quiz';

export default function Section5() {
  const [valA, setValA] = useState<number>(5);
  const [valB, setValB] = useState<number>(3);
  const [opcode, setOpcode] = useState<'ADD' | 'SUB' | 'AND' | 'OR' | 'XOR'>('ADD');
  const [showTechGlossary, setShowTechGlossary] = useState<boolean>(true);

  const toBinary8 = (n: number) => (n & 0xff).toString(2).padStart(8, '0');

  const computeResult = () => {
    switch (opcode) {
      case 'ADD':
        return (valA + valB) & 0xff;
      case 'SUB':
        return (valA - valB) & 0xff;
      case 'AND':
        return (valA & valB) & 0xff;
      case 'OR':
        return (valA | valB) & 0xff;
      case 'XOR':
        return (valA ^ valB) & 0xff;
    }
  };

  const result = computeResult();

  // Status Flags
  const isZeroFlag = result === 0;
  const isOverflowFlag = opcode === 'ADD' && valA + valB > 255;
  const isNegativeFlag = opcode === 'SUB' && valA < valB;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 sm:px-8 pb-8 gap-8">
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.span
          className="inline-block text-xs font-mono text-primary-400 mb-3 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Section 5 of 12 — IIT Microprocessor Core
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          ALU, MUX & Status Flags
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          The <strong>Arithmetic Logic Unit (ALU)</strong> processes 8-bit registers, routes outputs through a <strong>Multiplexer (MUX)</strong>, and updates hardware <strong>Status Flags (Zero, Overflow, Negative)</strong> for branching decision making!
        </p>
      </motion.div>

      {/* Interactive ALU Workbench */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="w-full flex items-center justify-between glass p-4 rounded-2xl border border-primary-500/30">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-primary-400" />
            <span className="text-sm font-semibold text-white/90">
              8-Bit Parallel ALU & Status Flag Processor Engine
            </span>
          </div>
          <button
            onClick={() => setShowTechGlossary(!showTechGlossary)}
            className="px-3 py-1.5 rounded-lg glass text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5"
          >
            <Info size={14} /> {showTechGlossary ? 'Hide IIT Terms' : 'Show IIT Terms'}
          </button>
        </div>

        {/* Tech Terms Glossary */}
        {showTechGlossary && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-white/80">
            <div className="glass p-3 rounded-xl border border-primary-500/20">
              <span className="text-primary-300 font-bold block mb-1">MUX (Multiplexer)</span>
              <span>Hardware selector switch routing 1 out of N input paths to output.</span>
            </div>
            <div className="glass p-3 rounded-xl border border-yellow-500/20">
              <span className="text-yellow-300 font-bold block mb-1">Status Flags (Z/V/N)</span>
              <span>Special 1-bit registers tracking result conditions (Zero, Overflow, Negative).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-green-500/20">
              <span className="text-green-300 font-bold block mb-1">Opcode Bits</span>
              <span>Binary instruction code selecting the ALU operation.</span>
            </div>
          </div>
        )}

        {/* Input Selectors */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          <div className="glass p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-white/60 font-mono mb-2">Input A (8-bit Register)</span>
            <input
              type="number"
              min="0"
              max="255"
              value={valA}
              onChange={(e) => setValA(Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-24 bg-surface-500 border border-primary-500/30 rounded-xl p-2 text-center text-xl font-bold font-mono text-white outline-none focus:border-primary-400"
            />
            <span className="text-[10px] font-mono text-primary-300 mt-2">{toBinary8(valA)}₂</span>
          </div>

          <div className="glass p-4 rounded-2xl flex flex-col items-center">
            <span className="text-xs text-white/60 font-mono mb-2">Input B (8-bit Register)</span>
            <input
              type="number"
              min="0"
              max="255"
              value={valB}
              onChange={(e) => setValB(Math.min(255, Math.max(0, parseInt(e.target.value) || 0)))}
              className="w-24 bg-surface-500 border border-primary-500/30 rounded-xl p-2 text-center text-xl font-bold font-mono text-white outline-none focus:border-primary-400"
            />
            <span className="text-[10px] font-mono text-primary-300 mt-2">{toBinary8(valB)}₂</span>
          </div>
        </div>

        {/* Opcode Selector Buttons */}
        <div className="flex flex-wrap justify-center gap-2">
          {(['ADD', 'SUB', 'AND', 'OR', 'XOR'] as const).map((op) => (
            <button
              key={op}
              onClick={() => setOpcode(op)}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                opcode === op ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'glass text-white/60'
              }`}
            >
              {op}
            </button>
          ))}
        </div>

        {/* Status Flags Display Bar */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          <div className={`glass p-3 rounded-xl text-center border ${isZeroFlag ? 'border-green-500 text-green-400 bg-green-500/10 font-bold' : 'border-white/10 text-white/40'}`}>
            <span className="text-[10px] font-mono block">ZERO FLAG (Z)</span>
            <span className="text-lg font-mono">{isZeroFlag ? '1 (Result is 0)' : '0'}</span>
          </div>

          <div className={`glass p-3 rounded-xl text-center border ${isOverflowFlag ? 'border-yellow-500 text-yellow-400 bg-yellow-500/10 font-bold' : 'border-white/10 text-white/40'}`}>
            <span className="text-[10px] font-mono block">OVERFLOW (V)</span>
            <span className="text-lg font-mono">{isOverflowFlag ? '1 (>255 Limit)' : '0'}</span>
          </div>

          <div className={`glass p-3 rounded-xl text-center border ${isNegativeFlag ? 'border-red-500 text-red-400 bg-red-500/10 font-bold' : 'border-white/10 text-white/40'}`}>
            <span className="text-[10px] font-mono block">NEGATIVE (N)</span>
            <span className="text-lg font-mono">{isNegativeFlag ? '1 (A < B)' : '0'}</span>
          </div>
        </div>

        {/* Output Register */}
        <div className="glass-strong rounded-2xl p-6 text-center w-full max-w-md border border-green-500/30">
          <div className="text-xs text-white/40 font-mono mb-1">ALU Output Data Bus</div>
          <div className="text-4xl font-extrabold font-mono text-green-400 mb-2">
            {result} <span className="text-xs font-mono text-white/40">({toBinary8(result)}₂)</span>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="w-full max-w-lg mt-4">
        <Quiz
          sectionTitle="ALU & Status Flags"
          questions={[
            {
              question: 'Processor mein Status Flags (jaise Zero Flag Z) ka kya faida hota hai?',
              options: [
                'Display light jalana',
                'Code mein conditional statements (jaise if/else, loops) ko execute karne ke liye hardware condition batana',
                'Processor temperature kam karna',
                'English word check karna',
              ],
              correct: 1,
              explanation: 'Jab ALU kisi subtraction ka result 0 deta hai, toh Zero Flag Z=1 ho jata hai, jisse CPU branches (if A == B) execute karta hai.',
            },
          ]}
        />
      </div>
    </div>
  );
}
