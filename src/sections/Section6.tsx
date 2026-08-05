import { motion } from 'framer-motion';
import { useState } from 'react';
import { Database, Clock, Info } from 'lucide-react';
import Quiz from '../components/Quiz';

export default function Section6() {
  const [storedBit, setStoredBit] = useState<boolean>(false);
  const [dataInput, setDataInput] = useState<boolean>(true);
  const [clockSignal, setClockSignal] = useState<boolean>(false);
  const [showTechGlossary, setShowTechGlossary] = useState<boolean>(true);

  // Trigger Clock pulse
  const triggerClockPulse = () => {
    setClockSignal(true);
    setStoredBit(dataInput);
    setTimeout(() => {
      setClockSignal(false);
    }, 600);
  };

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
          Section 6 of 12 — IIT Digital Memory Architecture
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Flip-Flops, SRAM & Memory Cells
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          How do circuits hold information after inputs disappear? By connecting logic gates in <strong>feedback loops</strong> to build <strong>Latches, Flip-Flops, SRAM cells, and Registers</strong>.
        </p>
      </motion.div>

      {/* Interactive Flip-Flop Workbench */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="w-full flex items-center justify-between glass p-4 rounded-2xl border border-primary-500/30">
          <div className="flex items-center gap-2">
            <Database size={20} className="text-primary-400" />
            <span className="text-sm font-semibold text-white/90">
              Edge-Triggered D Flip-Flop Memory Cell
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
              <span className="text-primary-300 font-bold block mb-1">D Flip-Flop</span>
              <span>1-bit memory cell capturing Data (D) on the rising edge of Clock (CLK).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-blue-500/20">
              <span className="text-blue-300 font-bold block mb-1">SRAM vs DRAM</span>
              <span>SRAM uses 6-transistor Flip-Flops (fast, CPU Cache); DRAM uses 1 transistor + capacitor (main RAM).</span>
            </div>
            <div className="glass p-3 rounded-xl border border-yellow-500/20">
              <span className="text-yellow-300 font-bold block mb-1">Setup & Hold Time</span>
              <span>Minimum time Data D must remain stable before and after Clock edge.</span>
            </div>
          </div>
        )}

        {/* Control Controls */}
        <div className="grid grid-cols-2 gap-6 w-full max-w-md">
          {/* Data Input (D) */}
          <div className="glass p-4 rounded-2xl flex flex-col items-center gap-2">
            <span className="text-xs text-white/60 font-mono">Data Input (D)</span>
            <button
              onClick={() => setDataInput(!dataInput)}
              className={`w-14 h-14 rounded-2xl font-mono font-bold text-2xl transition-all ${
                dataInput ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'glass text-white/30'
              }`}
            >
              {dataInput ? '1' : '0'}
            </button>
            <span className="text-[10px] text-white/50">Toggle Data Bit</span>
          </div>

          {/* Clock Pulse Trigger */}
          <div className="glass p-4 rounded-2xl flex flex-col items-center gap-2">
            <span className="text-xs text-white/60 font-mono">Clock Signal (CLK)</span>
            <motion.button
              onClick={triggerClockPulse}
              className={`w-14 h-14 rounded-2xl font-mono font-bold text-xs flex flex-col items-center justify-center gap-1 transition-all ${
                clockSignal ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'glass text-white/70 hover:text-white'
              }`}
              whileTap={{ scale: 0.9 }}
            >
              <Clock size={18} />
              PULSE
            </motion.button>
            <span className="text-[10px] text-white/50">Trigger Clock Rising Edge</span>
          </div>
        </div>

        {/* Storage State */}
        <div className="glass-strong rounded-2xl p-6 text-center w-full max-w-md border border-green-500/20">
          <div className="text-xs text-white/50 font-mono mb-1">Currently Stored Memory State (Q Output)</div>
          <motion.div
            key={storedBit ? '1' : '0'}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-4xl font-extrabold font-mono ${storedBit ? 'text-green-400' : 'text-white/40'}`}
          >
            {storedBit ? '1 (HIGH VOLTAGE STORED)' : '0 (LOW VOLTAGE STORED)'}
          </motion.div>
        </div>
      </div>

      {/* Quiz */}
      <div className="w-full max-w-lg mt-4">
        <Quiz
          sectionTitle="Circuit Memory"
          questions={[
            {
              question: 'CPU Cache mein use hone wali Static RAM (SRAM) aur main System Memory (DRAM) mein kya farak hota hai?',
              options: [
                'SRAM 6-transistor Flip-Flops se banti hai jo super-fast hoti hai; DRAM mein 1 transistor + 1 capacitor hota hai jise continuously refresh karna padta hai',
                'DRAM fast hoti hai',
                'SRAM mein software chal sakta hai',
                'Donon same hain',
              ],
              correct: 0,
              explanation: 'SRAM 6 transistors per bit use karti hai jisse refresh ki zaroorat nahi padti aur speed super-high hoti hai. DRAM capacitor leakage ki wajah se slow refreshes maangta hai.',
            },
          ]}
        />
      </div>
    </div>
  );
}
