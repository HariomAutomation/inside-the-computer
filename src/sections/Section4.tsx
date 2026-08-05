import { motion } from 'framer-motion';
import { useState } from 'react';
import { Cpu, Info } from 'lucide-react';

export default function Section4() {
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);
  const [carryIn, setCarryIn] = useState<boolean>(false);
  const [circuitType, setCircuitType] = useState<'XOR' | 'HALF_ADDER' | 'FULL_ADDER'>('FULL_ADDER');
  const [showTechGlossary, setShowTechGlossary] = useState<boolean>(true);

  // Compute Half Adder
  const halfSum = inputA !== inputB; // XOR
  const halfCarry = inputA && inputB; // AND

  // Compute Full Adder
  const fullSum = (inputA !== inputB) !== carryIn;
  const fullCarry = (inputA && inputB) || (carryIn && (inputA !== inputB));

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
          Section 4 of 12 — IIT Digital Arithmetic Layer
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Binary Adders & Arithmetic Logic
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          How does electricity perform math? By combining <strong>XOR</strong> and <strong>AND</strong> gates to calculate the <strong>Sum (S)</strong> and <strong>Carry Out (Cout)</strong> bits for multi-bit binary addition!
        </p>
      </motion.div>

      {/* Interactive Workbench */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="w-full flex items-center justify-between glass p-4 rounded-2xl border border-primary-500/30">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-primary-400" />
            <span className="text-sm font-semibold text-white/90">
              Binary Adder Gate Architecture Engine
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
              <span className="text-primary-300 font-bold block mb-1">Half Adder</span>
              <span>Adds 2 bits (A + B) using XOR (Sum) + AND (Carry).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-primary-500/20">
              <span className="text-primary-300 font-bold block mb-1">Full Adder</span>
              <span>Adds 3 bits (A + B + Cin) allowing multi-bit column addition.</span>
            </div>
            <div className="glass p-3 rounded-xl border border-yellow-500/20">
              <span className="text-yellow-300 font-bold block mb-1">Carry Ripple Delay</span>
              <span>Delay caused when carry bit propagates through 64 bits sequentially.</span>
            </div>
          </div>
        )}

        {/* Selector */}
        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setCircuitType('XOR')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              circuitType === 'XOR' ? 'bg-primary-500 text-white' : 'glass text-white/60'
            }`}
          >
            1. XOR Gate Only
          </button>
          <button
            onClick={() => setCircuitType('HALF_ADDER')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              circuitType === 'HALF_ADDER' ? 'bg-primary-500 text-white' : 'glass text-white/60'
            }`}
          >
            2. Half Adder (2-Bit)
          </button>
          <button
            onClick={() => setCircuitType('FULL_ADDER')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              circuitType === 'FULL_ADDER' ? 'bg-primary-500 text-white' : 'glass text-white/60'
            }`}
          >
            3. Full Adder (+ Cin)
          </button>
        </div>

        {/* Input Switches */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white/80 font-bold">Bit A:</span>
            <button
              onClick={() => setInputA(!inputA)}
              className={`w-12 h-12 rounded-xl font-mono font-bold text-xl transition-all shadow-md ${
                inputA ? 'bg-green-500 text-white' : 'glass text-white/40'
              }`}
            >
              {inputA ? '1' : '0'}
            </button>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white/80 font-bold">Bit B:</span>
            <button
              onClick={() => setInputB(!inputB)}
              className={`w-12 h-12 rounded-xl font-mono font-bold text-xl transition-all shadow-md ${
                inputB ? 'bg-green-500 text-white' : 'glass text-white/40'
              }`}
            >
              {inputB ? '1' : '0'}
            </button>
          </div>

          {circuitType === 'FULL_ADDER' && (
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-white/80 font-bold">Carry In (Cin):</span>
              <button
                onClick={() => setCarryIn(!carryIn)}
                className={`w-12 h-12 rounded-xl font-mono font-bold text-xl transition-all shadow-md ${
                  carryIn ? 'bg-green-500 text-white' : 'glass text-white/40'
                }`}
              >
                {carryIn ? '1' : '0'}
              </button>
            </div>
          )}
        </div>

        {/* Binary Math Result */}
        <div className="glass-strong rounded-2xl px-8 py-5 text-center w-full max-w-md border border-green-500/30">
          <div className="text-xs text-white/50 font-mono mb-1">Binary Arithmetic Result</div>
          <div className="text-3xl font-extrabold font-mono flex items-center justify-center gap-3 text-white">
            <span>{inputA ? '1' : '0'} + {inputB ? '1' : '0'} {circuitType === 'FULL_ADDER' ? `+ ${carryIn ? '1' : '0'}` : ''} =</span>
            <span className="text-green-400 font-mono">
              {circuitType === 'FULL_ADDER'
                ? `${fullCarry ? '1' : '0'}${fullSum ? '1' : '0'}₂ (${(inputA ? 1 : 0) + (inputB ? 1 : 0) + (carryIn ? 1 : 0)})`
                : `${halfCarry ? '1' : '0'}${halfSum ? '1' : '0'}₂ (${(inputA ? 1 : 0) + (inputB ? 1 : 0)})`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
