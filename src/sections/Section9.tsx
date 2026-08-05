import { motion } from 'framer-motion';
import { useState } from 'react';
import { Code, Play } from 'lucide-react';
import Quiz from '../components/Quiz';

export default function Section9() {
  const [asmCode, setAsmCode] = useState<string>('ADD R1, R2\nMOV R3, R1\nSUB R3, R2');
  const [translated, setTranslated] = useState<boolean>(false);

  const assembleLine = (line: string) => {
    const clean = line.trim().toUpperCase();
    if (clean.startsWith('ADD')) return '0001 0001 0010 (ADD R1, R2)';
    if (clean.startsWith('MOV')) return '0010 0011 0001 (MOV R3, R1)';
    if (clean.startsWith('SUB')) return '0011 0011 0010 (SUB R3, R2)';
    return '0000 0000 0000 (UNKNOWN)';
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
          Section 9 of 12 — Pehla Insaani Layer
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Assembly Language & Assemblers
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Kewal 0s aur 1s likhna bahut mushkil tha. Programmers ne <strong>Assembly Language</strong> banayi — jisme binary code ke liye chhote text names (jaise ADD, MOV, SUB) rakhe gaye.
        </p>
      </motion.div>

      {/* Interactive Assembler Workbench */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="flex items-center gap-2 font-mono text-sm text-primary-300 font-semibold">
          <Code size={18} /> Assembly → Binary Translator Pipeline
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Assembly Input Editor */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-white/50 uppercase">Human Assembly Code (.asm)</span>
            <textarea
              value={asmCode}
              onChange={(e) => {
                setAsmCode(e.target.value);
                setTranslated(false);
              }}
              className="code-editor h-40"
              placeholder="Type assembly code..."
            />
          </div>

          {/* Machine Code Output */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-white/50 uppercase">Assembler Output (Asli Binary 0/1)</span>
            <div className="code-editor h-40 bg-surface-600/60 overflow-y-auto flex flex-col gap-1 font-mono text-xs">
              {translated ? (
                asmCode
                  .split('\n')
                  .filter((l) => l.trim().length > 0)
                  .map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.15 }}
                      className="text-green-400 font-bold"
                    >
                      {assembleLine(line)}
                    </motion.div>
                  ))
              ) : (
                <span className="text-white/30 italic font-sans text-xs">"Run Assembler" par click karke text ko binary mein badlein...</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          onClick={() => setTranslated(true)}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-bold text-base flex items-center gap-3 shadow-lg shadow-primary-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={18} /> Run Assembler (Translate Text → Binary)
        </motion.button>
      </div>

      {/* Quiz */}
      <div className="w-full max-w-lg mt-4">
        <Quiz
          sectionTitle="Assembly Language"
          questions={[
            {
              question: 'Assembler program ka asli kaam kya hota hai?',
              options: [
                'Silicon chips banana',
                'Assembly ke text words (jaise ADD) ko direct machine code binary (0s aur 1s) mein translate karna',
                'Browser extension chalana',
                'Operating system kernel banana',
              ],
              correct: 1,
              explanation: 'Assembler ek 1-to-1 translator hota hai jo human-readable words ko unke exact binary opcode bit patterns se replace kar deta hai.',
            },
          ]}
        />
      </div>
    </div>
  );
}
