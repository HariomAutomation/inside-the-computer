import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Info } from 'lucide-react';
import { useSimulationStore } from '../stores/useSimulationStore';

export default function Section1() {
  const { currentFrame, totalFrames, setActiveSimulator } = useSimulationStore();
  const [showTechGlossary, setShowTechGlossary] = useState<boolean>(true);

  // Set active simulator ID on mount
  useEffect(() => {
    setActiveSimulator('cmos-inverter');
  }, [setActiveSimulator]);

  // Bind voltage directly to player currentFrame (0 to 100 -> 0.0V to 5.0V)
  const voltage = parseFloat(((currentFrame / totalFrames) * 5.0).toFixed(1));

  const isHigh = voltage >= 2.0;
  const isLow = voltage <= 0.8;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-4 px-4 sm:px-8 pb-8 gap-8 w-full max-w-4xl">
      {/* Title */}
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-block text-xs font-mono text-primary-400 mb-3 tracking-widest uppercase glass px-4 py-1 rounded-full border border-primary-500/30">
          Module 1 of 24 — Microchip Voltage & Physics Layer
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Electricity, Voltage & Noise Margins
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed font-sans">
          Computers operate on physical <strong>Analog Voltage Signals (0V to 5V)</strong> mapped into <strong>Digital Binary States (0 and 1)</strong>. Press <strong>Play (▶️)</strong> on the player above to watch voltage sweep across noise margins!
        </p>
      </motion.div>

      {/* Interactive Voltage & Threshold Workbench */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20 shadow-2xl">
        <div className="w-full flex items-center justify-between glass p-4 rounded-2xl border border-primary-500/30">
          <div className="flex items-center gap-2">
            <Zap size={20} className={isHigh ? 'text-green-400' : isLow ? 'text-white/40' : 'text-yellow-400'} />
            <span className="text-sm font-semibold text-white/90 font-mono">
              Live Voltage Signal Sweep & Noise Margin Analyzer
            </span>
          </div>
          <button
            onClick={() => setShowTechGlossary(!showTechGlossary)}
            className="px-3 py-1.5 rounded-lg glass text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5"
          >
            <Info size={14} /> {showTechGlossary ? 'Hide IIT Terms' : 'Show IIT Terms'}
          </button>
        </div>

        {/* Technical Glossary Info Card */}
        {showTechGlossary && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono text-white/80">
            <div className="glass p-3 rounded-xl border border-primary-500/20">
              <span className="text-primary-300 font-bold block mb-1">VCC (+5V / +1.2V)</span>
              <span>Power rail supplying positive voltage for HIGH state (1).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-primary-500/20">
              <span className="text-primary-300 font-bold block mb-1">GND (0V Ground)</span>
              <span>Zero-voltage reference point for LOW state (0).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-yellow-500/20">
              <span className="text-yellow-300 font-bold block mb-1">Noise Margin</span>
              <span>Forbidden voltage zone (0.8V - 2.0V) preventing electrical interference.</span>
            </div>
          </div>
        )}

        {/* Voltage Signal Sweep Display */}
        <div className="w-full max-w-md glass p-6 rounded-2xl flex flex-col items-center gap-4 border border-white/10">
          <div className="flex justify-between w-full text-xs font-mono">
            <span className="text-white/50">GND (0.0V)</span>
            <span className="text-primary-300 font-bold text-lg">Signal: {voltage.toFixed(1)}V</span>
            <span className="text-green-400">VCC (5.0V)</span>
          </div>

          {/* Visual Voltage Gauge Bar driven by Player */}
          <div className="w-full h-4 bg-surface-500 rounded-full overflow-hidden relative border border-white/10">
            <div
              className={`h-full transition-all duration-150 ${
                isHigh ? 'bg-green-400' : isLow ? 'bg-slate-500' : 'bg-yellow-400'
              }`}
              style={{ width: `${(voltage / 5.0) * 100}%` }}
            />
          </div>

          <div className="w-full flex justify-between text-[10px] font-mono text-white/40">
            <span>0.0V - 0.8V (LOW = 0)</span>
            <span className="text-yellow-400 font-bold">0.8V - 2.0V (Forbidden Buffer)</span>
            <span>2.0V - 5.0V (HIGH = 1)</span>
          </div>
        </div>

        {/* Dynamic Binary Output */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          <div className="glass rounded-2xl p-4 text-center border border-white/10">
            <div className="text-xs text-white/50 font-mono mb-1">Analog Voltage Region</div>
            <div className={`text-lg font-bold font-mono ${isHigh ? 'text-green-400' : isLow ? 'text-white/50' : 'text-yellow-400'}`}>
              {isHigh ? 'HIGH REGION' : isLow ? 'LOW REGION' : '⚡ NOISE MARGIN'}
            </div>
          </div>

          <div className="glass rounded-2xl p-4 text-center border border-white/10">
            <div className="text-xs text-white/50 font-mono mb-1">Interpreted Bit Output</div>
            <div className={`text-3xl font-extrabold font-mono ${isHigh ? 'text-green-400' : isLow ? 'text-white/40' : 'text-yellow-400'}`}>
              {isHigh ? '1' : isLow ? '0' : '⚡ INVALID'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
