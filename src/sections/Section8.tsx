import { motion } from 'framer-motion';
import { useState } from 'react';
import { Binary } from 'lucide-react';
import Quiz from '../components/Quiz';

export default function Section8() {
  const [opcodeBits, setOpcodeBits] = useState<string>('0001'); // 0001 = ADD, 0010 = SUB, 0011 = AND
  const [regA, setRegA] = useState<string>('0001'); // R1
  const [regB, setRegB] = useState<string>('0010'); // R2

  const opcodes: Record<string, string> = {
    '0001': 'ADD',
    '0010': 'SUB',
    '0011': 'AND',
    '0100': 'OR',
  };

  const currentOp = opcodes[opcodeBits] || 'UNKNOWN';

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
          Section 8 of 12 — Pure Binary Code
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Machine Code (Asli 0s aur 1s)
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Sabse nichle level par, executable programs sirf <strong>0s aur 1s</strong> ke bit-patterns hote hain: Opcode + Target Register + Source Register.
        </p>
      </motion.div>

      {/* Interactive Machine Code Decoder */}
      <div className="w-full max-w-2xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="flex items-center gap-2 font-mono text-sm text-primary-300 font-semibold">
          <Binary size={18} /> 12-Bit Machine Code Instruction Decoder
        </div>

        {/* Binary Bit Fields Editor */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {/* Opcode Bits */}
          <div className="glass p-3 rounded-2xl text-center border border-primary-500/30">
            <span className="text-[10px] text-primary-300 font-mono block mb-1">Opcode (4-bit)</span>
            <select
              value={opcodeBits}
              onChange={(e) => setOpcodeBits(e.target.value)}
              className="bg-surface-500 text-white font-mono text-sm p-1.5 rounded-lg border border-white/10 outline-none w-full text-center"
            >
              <option value="0001">0001 (ADD)</option>
              <option value="0010">0010 (SUB)</option>
              <option value="0011">0011 (AND)</option>
              <option value="0100">0100 (OR)</option>
            </select>
          </div>

          {/* Reg A Bits */}
          <div className="glass p-3 rounded-2xl text-center border border-accent-500/30">
            <span className="text-[10px] text-accent-300 font-mono block mb-1">Reg Dest (4-bit)</span>
            <select
              value={regA}
              onChange={(e) => setRegA(e.target.value)}
              className="bg-surface-500 text-white font-mono text-sm p-1.5 rounded-lg border border-white/10 outline-none w-full text-center"
            >
              <option value="0001">0001 (R1)</option>
              <option value="0010">0010 (R2)</option>
              <option value="0011">0011 (R3)</option>
            </select>
          </div>

          {/* Reg B Bits */}
          <div className="glass p-3 rounded-2xl text-center border border-green-500/30">
            <span className="text-[10px] text-green-300 font-mono block mb-1">Reg Src (4-bit)</span>
            <select
              value={regB}
              onChange={(e) => setRegB(e.target.value)}
              className="bg-surface-500 text-white font-mono text-sm p-1.5 rounded-lg border border-white/10 outline-none w-full text-center"
            >
              <option value="0001">0001 (R1)</option>
              <option value="0010">0010 (R2)</option>
              <option value="0011">0011 (R3)</option>
            </select>
          </div>
        </div>

        {/* Assembled 12-Bit Machine Code Word */}
        <div className="glass p-4 rounded-2xl w-full max-w-md text-center border border-white/10">
          <span className="text-xs font-mono text-white/50 block mb-2">RAW BINARY MACHINE CODE INSTRUCTION WORD</span>
          <div className="text-3xl font-extrabold font-mono tracking-widest text-green-400">
            <span className="text-primary-400">{opcodeBits}</span> <span className="text-accent-400">{regA}</span> <span className="text-green-400">{regB}</span>
          </div>
        </div>

        {/* CPU Hardware Interpretation */}
        <div className="glass-strong rounded-2xl p-6 text-center w-full max-w-md border border-primary-500/30">
          <div className="text-xs text-white/40 font-mono mb-1">Hardware Interpretation (No English Used)</div>
          <div className="text-xl font-bold font-mono text-white mb-2">
            Action: <span className="text-primary-300">{currentOp}</span> | Target: <span className="text-accent-300">R{parseInt(regA, 2)}</span> | Source: <span className="text-green-300">R{parseInt(regB, 2)}</span>
          </div>
          <div className="text-xs text-white/60 leading-relaxed">
            Dhyan Dein: "{currentOp}" jaise English shabd sirf hamare samajhne ke liye hain! CPU ko sirf upar wala binary electrical sequence milta hai.
          </div>
        </div>
      </div>

      {/* Quiz */}
      <div className="w-full max-w-lg mt-4">
        <Quiz
          sectionTitle="Machine Code"
          questions={[
            {
              question: 'Kya Silicon CPU chip ke andar English words jaise "ADD" ya "SUB" samajhne ki ability hoti hai?',
              options: [
                'Haan, CPU mein English dictionary hoti hai',
                'Nahi! CPU sirf 0s aur 1s ke binary bit patterns samajhta hai. English keywords sirf insaan ke padhne ke liye hote hain',
                'Sirf Windows par',
                'Haan, AI chips mein',
              ],
              correct: 1,
              explanation: 'Hardware logic decoders sirf binary voltage patterns (jaise 0001) par react karke specific circuit lines active karte hain.',
            },
          ]}
        />
      </div>
    </div>
  );
}
