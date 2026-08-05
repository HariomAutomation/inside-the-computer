import { motion } from 'framer-motion';
import { useState } from 'react';
import { Play, Cpu } from 'lucide-react';
import Quiz from '../components/Quiz';

export default function Section7() {
  const [pc, setPc] = useState<number>(0);
  const [step, setStep] = useState<'IDLE' | 'FETCH' | 'DECODE' | 'EXECUTE'>('IDLE');

  const memoryInstructions = [
    { addr: '0x00', code: '00010001 00100000', label: 'ADD R1, R2' },
    { addr: '0x01', code: '00100011 01000000', label: 'MOV R3, R4' },
    { addr: '0x02', code: '00110101 01100000', label: 'SUB R5, R6' },
  ];

  const currentInst = memoryInstructions[pc % memoryInstructions.length];

  const runNextStep = () => {
    if (step === 'IDLE' || step === 'EXECUTE') {
      setStep('FETCH');
    } else if (step === 'FETCH') {
      setStep('DECODE');
    } else if (step === 'DECODE') {
      setStep('EXECUTE');
      setPc((prev) => (prev + 1) % memoryInstructions.length);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 sm:px-8 pb-8 gap-8">
      {/* Header */}
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.span
          className="inline-block text-xs font-mono text-primary-400 mb-3 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Section 7 of 12 — CPU Ki Dhadkan (Clock Cycle)
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Fetch-Decode-Execute Cycle
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Har CPU 1 second mein billions baar ek hi loop chalata hai: RAM se binary instruction lana (<strong>Fetch</strong>) → Faisla karna (<strong>Decode</strong>) → ALU mein run karna (<strong>Execute</strong>).
        </p>
      </motion.div>

      {/* Cycle Interactive Animation Engine */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        {/* Step Indicator */}
        <div className="flex items-center gap-2">
          {(['FETCH', 'DECODE', 'EXECUTE'] as const).map((s) => (
            <div
              key={s}
              className={`px-4 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
                step === s ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'glass text-white/30'
              }`}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Step Forward Button */}
        <motion.button
          onClick={runNextStep}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-primary-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={16} /> Step Clock Cycle ({step === 'IDLE' ? 'Shuru Karein' : step})
        </motion.button>

        {/* CPU & RAM Bus Architecture Diagram */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* RAM Memory Box */}
          <div className="glass rounded-2xl p-4 flex flex-col gap-3">
            <div className="text-xs font-mono text-white/50 uppercase tracking-wider flex justify-between">
              <span>RAM Memory</span>
              <span className="text-primary-300">Program Counter (PC): {currentInst.addr}</span>
            </div>

            <div className="flex flex-col gap-2">
              {memoryInstructions.map((inst, i) => {
                const isSelected = i === pc % memoryInstructions.length;
                return (
                  <div
                    key={inst.addr}
                    className={`p-3 rounded-xl font-mono text-xs flex justify-between items-center transition-all ${
                      isSelected
                        ? 'bg-primary-500/20 border border-primary-400 text-white font-bold'
                        : 'glass text-white/40'
                    }`}
                  >
                    <span>{inst.addr}</span>
                    <span className="text-[10px] text-primary-300">{inst.code}</span>
                    <span className="text-[10px] text-white/50">{inst.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CPU Processor Control Unit & Registers */}
          <div className="glass rounded-2xl p-4 flex flex-col gap-3 border border-primary-500/30">
            <div className="text-xs font-mono text-primary-300 uppercase tracking-wider flex items-center gap-2">
              <Cpu size={16} /> CPU Control Unit
            </div>

            <div className="glass p-3 rounded-xl flex flex-col gap-1">
              <span className="text-[10px] text-white/40 font-mono">Instruction Register (IR)</span>
              <span className="text-xs font-mono font-bold text-green-400">
                {step === 'IDLE' ? 'KHALI (EMPTY)' : currentInst.code}
              </span>
            </div>

            <div className="glass p-3 rounded-xl flex flex-col gap-1">
              <span className="text-[10px] text-white/40 font-mono">Current Action</span>
              <span className="text-xs font-mono font-bold text-accent-300">
                {step === 'FETCH' && 'RAM se 16-bit binary instruction laya gaya...'}
                {step === 'DECODE' && `Opcode decode hua: ${currentInst.label}`}
                {step === 'EXECUTE' && `ALU mein run hua: ${currentInst.label} → Result R1 mein save hua`}
                {step === 'IDLE' && 'Clock pulse ka intezar...'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="w-full max-w-lg mt-4">
        <Quiz
          sectionTitle="Fetch-Decode-Execute"
          questions={[
            {
              question: 'CPU ke andar Program Counter (PC) ka kya kaam hota hai?',
              options: [
                'Errors count karna',
                'RAM ke us memory address ko yaad rakhna jahan se agla binary instruction fetch (lana) hai',
                'CPU ka temperature napna',
                'English text padhna',
              ],
              correct: 1,
              explanation: 'Program Counter hamesha agle binary instruction ke RAM address ko point karta hai.',
            },
          ]}
        />
      </div>
    </div>
  );
}
