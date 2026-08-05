import { motion } from 'framer-motion';
import { useState } from 'react';
import { Terminal, Play } from 'lucide-react';
import Quiz from '../components/Quiz';

export default function Section11() {
  const [customCode, setCustomCode] = useState<string>('rakho a = 10\nrakho b = 20\njodo a + b');
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);

  const runCustomCompiler = () => {
    const lines = customCode.split('\n').filter((l) => l.trim().length > 0);
    const logs: string[] = [];
    const vars: Record<string, number> = {};

    logs.push('🚀 [Apna Compiler] Code Lexing aur Parsing shuru hua...');

    lines.forEach((line) => {
      const parts = line.trim().split(/\s+/);
      if (parts[0] === 'rakho' && parts[2] === '=') {
        const varName = parts[1];
        const val = parseInt(parts[3]) || 0;
        vars[varName] = val;
        logs.push(`[AST] Assign ${varName} = ${val}`);
      } else if (parts[0] === 'jodo') {
        const varA = parts[1];
        const varB = parts[3];
        const valA = vars[varA] || 0;
        const valB = vars[varB] || 0;
        const sum = valA + valB;
        logs.push(`[ALU] Executed JODO (${varA} + ${varB}) = ${sum}`);
        logs.push(`✨ [Final Output Result] -> ${sum}`);
      }
    });

    setConsoleOutput(logs);
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
          Section 11 of 12 — Language Designer Baneyein
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Apni Bhasha (Language) Banayein
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Kyunki English sirf ek synthetic text hai, aap apni pasand ke custom keywords se apni khud ki Programming Language bana sakte hain (jaise <code>rakho</code> assignment ke liye, <code>jodo</code> addition ke liye)!
        </p>
      </motion.div>

      {/* Live Custom Language IDE & Compiler */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="flex items-center gap-2 font-mono text-sm text-primary-300 font-semibold">
          <Terminal size={18} /> Custom Language Compiler Playground
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Custom Language Code Editor */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-white/50 uppercase">Apni Bhasha Mein Code Likhein</span>
            <textarea
              value={customCode}
              onChange={(e) => setCustomCode(e.target.value)}
              className="code-editor h-48"
              placeholder="Write custom language code..."
            />
            <span className="text-[10px] text-white/50 font-mono">
              Syntax Rules: <code>rakho [var] = [val]</code> | <code>jodo [var1] + [var2]</code>
            </span>
          </div>

          {/* Compiler Console Output & Binary Execution */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono text-white/50 uppercase">Compiler Output aur CPU Execution Logs</span>
            <div className="code-editor h-48 bg-surface-600/60 overflow-y-auto flex flex-col gap-1 font-mono text-xs text-green-400">
              {consoleOutput.length > 0 ? (
                consoleOutput.map((log, i) => <div key={i}>{log}</div>)
              ) : (
                <span className="text-white/30 italic font-sans text-xs">"Compile & Run" button dabayein aur dekhein aapka code CPU par kaise chalta hai!</span>
              )}
            </div>
          </div>
        </div>

        {/* Compile Button */}
        <motion.button
          onClick={runCustomCompiler}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-primary-500 text-white font-bold text-base flex items-center gap-3 shadow-lg shadow-green-500/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Play size={18} /> Compile & Run Your Custom Language on Visual CPU
        </motion.button>
      </div>

      {/* Quiz */}
      <div className="w-full max-w-lg mt-4">
        <Quiz
          sectionTitle="Custom Languages"
          questions={[
            {
              question: 'Aap Hindi ya kisi bhi custom keywords se apni programming language kyun bana sakte hain?',
              options: [
                'Kyunki microchips Hindi bolte hain',
                'Kyunki keywords sirf insaani rules hain. Aap jo bhi syntax rules chunenge, compiler usko machine binary code mein translate kar dega',
                'Sirf Google ya Apple hi language bana sakte hain',
                'Transistors apne aap bhasha badal dete hain',
              ],
              correct: 1,
              explanation: 'Language design har kisi ke liye open hai. Compiler bas aapke banaye rules ko 0s aur 1s ke binary opcodes mein translate karta hai.',
            },
          ]}
        />
      </div>
    </div>
  );
}
