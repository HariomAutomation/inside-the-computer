import { motion } from 'framer-motion';
import { useState } from 'react';
import { Cpu, Zap, Info } from 'lucide-react';

export default function Section2() {
  const [gateVoltage, setGateVoltage] = useState<boolean>(false);
  const [showTechGlossary, setShowTechGlossary] = useState<boolean>(true);

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
          Section 2 of 12 — CMOS Semiconductor Physics
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          CMOS Technology: NMOS vs PMOS
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Modern processors do not use simple single transistors. They use <strong>CMOS (Complementary MOS)</strong> — pairing <strong>NMOS</strong> (turns ON when Gate=1) and <strong>PMOS</strong> (turns ON when Gate=0) to achieve near-zero static power consumption!
        </p>
      </motion.div>

      {/* Interactive CMOS Workbench */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="w-full flex items-center justify-between glass p-4 rounded-2xl border border-primary-500/30">
          <div className="flex items-center gap-2">
            <Cpu size={20} className="text-primary-400" />
            <span className="text-sm font-semibold text-white/90">
              NMOS vs PMOS Complementary Switching Engine
            </span>
          </div>
          <button
            onClick={() => setShowTechGlossary(!showTechGlossary)}
            className="px-3 py-1.5 rounded-lg glass text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5"
          >
            <Info size={14} /> {showTechGlossary ? 'Hide IIT Terms' : 'Show IIT Terms'}
          </button>
        </div>

        {/* Tech Terms Glossary Card */}
        {showTechGlossary && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-white/80">
            <div className="glass p-3 rounded-xl border border-blue-500/20">
              <span className="text-blue-300 font-bold block mb-1">NMOS Transistor</span>
              <span>Conducts current when Gate = HIGH (1). Pulls Output to Ground (0V).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-purple-500/20">
              <span className="text-purple-300 font-bold block mb-1">PMOS Transistor</span>
              <span>Conducts current when Gate = LOW (0). Pulls Output to VCC (+5V).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-green-500/20">
              <span className="text-green-300 font-bold block mb-1">CMOS Complementary</span>
              <span>Combines NMOS + PMOS so one is ALWAYS OFF, wasting 0 standby power!</span>
            </div>
          </div>
        )}

        {/* Gate Control Button */}
        <motion.button
          onClick={() => setGateVoltage(!gateVoltage)}
          className={`px-8 py-4 rounded-2xl font-bold text-base flex items-center gap-3 transition-all ${
            gateVoltage
              ? 'bg-primary-500/20 border border-primary-500/50 text-primary-300 shadow-lg shadow-primary-500/20'
              : 'glass text-white/70 hover:text-white'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Zap size={18} className={gateVoltage ? 'text-primary-400' : 'text-white/40'} />
          {gateVoltage ? 'GATE SIGNAL: HIGH (1) → NMOS ON, PMOS OFF' : 'GATE SIGNAL: LOW (0) → PMOS ON, NMOS OFF'}
        </motion.button>

        {/* Transistor Dual State Display */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="glass rounded-xl p-4 text-center border border-purple-500/30">
            <div className="text-xs text-purple-300 font-mono mb-1">PMOS (Pull-Up to VCC)</div>
            <div className={`text-lg font-bold font-mono ${!gateVoltage ? 'text-green-400' : 'text-red-400'}`}>
              {!gateVoltage ? 'ON (VCC Active)' : 'OFF (Blocked)'}
            </div>
          </div>

          <div className="glass rounded-xl p-4 text-center border border-blue-500/30">
            <div className="text-xs text-blue-300 font-mono mb-1">NMOS (Pull-Down to GND)</div>
            <div className={`text-lg font-bold font-mono ${gateVoltage ? 'text-green-400' : 'text-red-400'}`}>
              {gateVoltage ? 'ON (GND Active)' : 'OFF (Blocked)'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
