import { motion } from 'framer-motion';
import { useState } from 'react';
import Quiz from '../components/Quiz';

export default function Section10() {
  const [sourceExpr, setSourceExpr] = useState<string>('x = 5 + 3');
  const [activeTab, setActiveTab] = useState<'LEXER' | 'PARSER' | 'CODEGEN'>('LEXER');

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
          Section 10 of 12 — Compiler Ki Machine
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          Programming Languages Kaise Kaam Karti Hain
        </h1>
        <p className="text-white/70 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          High-level languages (C, JS, Python) ko Compiler 3 mukhya stages mein convert karta hai: <strong>Lexer</strong> (Tokens banana) → <strong>Parser</strong> (AST Tree) → <strong>Code Generator</strong> (Binary code).
        </p>
      </motion.div>

      {/* Interactive Compiler Stage Explorer */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        {/* Expression Input */}
        <div className="w-full max-w-md flex flex-col items-center gap-2">
          <span className="text-xs font-mono text-white/50 uppercase">High-Level Code Expression</span>
          <input
            type="text"
            value={sourceExpr}
            onChange={(e) => setSourceExpr(e.target.value)}
            className="w-full bg-surface-500 border border-primary-500/30 rounded-xl p-3 text-center text-lg font-bold font-mono text-white outline-none focus:border-primary-400"
          />
        </div>

        {/* Compiler Pipeline Stage Tabs */}
        <div className="flex items-center gap-2">
          {(['LEXER', 'PARSER', 'CODEGEN'] as const).map((stage) => (
            <button
              key={stage}
              onClick={() => setActiveTab(stage)}
              className={`px-5 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
                activeTab === stage ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' : 'glass text-white/40'
              }`}
            >
              {stage === 'LEXER' && '1. Lexer (Tokens)'}
              {stage === 'PARSER' && '2. Parser (AST Tree)'}
              {stage === 'CODEGEN' && '3. CodeGen (Binary)'}
            </button>
          ))}
        </div>

        {/* Stage Visualization Body */}
        <div className="w-full max-w-md glass rounded-2xl p-6 border border-white/10 flex flex-col items-center gap-4 min-h-[180px]">
          {activeTab === 'LEXER' && (
            <div className="w-full flex flex-col items-center gap-3">
              <span className="text-xs font-mono text-primary-300">Lexical Analysis (Words Ko Break Karna)</span>
              <div className="flex flex-wrap justify-center gap-2 font-mono text-xs">
                <span className="px-3 py-1.5 rounded-lg bg-purple-500/20 border border-purple-400 text-purple-300">IDENTIFIER: "x"</span>
                <span className="px-3 py-1.5 rounded-lg bg-blue-500/20 border border-blue-400 text-blue-300">ASSIGN: "="</span>
                <span className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-400 text-green-300">NUMBER: "5"</span>
                <span className="px-3 py-1.5 rounded-lg bg-yellow-500/20 border border-yellow-400 text-yellow-300">PLUS: "+"</span>
                <span className="px-3 py-1.5 rounded-lg bg-green-500/20 border border-green-400 text-green-300">NUMBER: "3"</span>
              </div>
            </div>
          )}

          {activeTab === 'PARSER' && (
            <div className="w-full flex flex-col items-center gap-2">
              <span className="text-xs font-mono text-primary-300">Abstract Syntax Tree (Grammar Tree)</span>
              <div className="glass p-4 rounded-xl w-full text-center font-mono text-xs text-white/80 space-y-1">
                <div className="text-accent-300 font-bold">AssignmentStatement</div>
                <div className="text-white/40">├─ Variable: <span className="text-purple-300">x</span></div>
                <div className="text-white/40">└─ BinaryExpression: <span className="text-yellow-300">(+)</span></div>
                <div className="text-white/40 pl-6">├─ Left: <span className="text-green-300">5</span></div>
                <div className="text-white/40 pl-6">└─ Right: <span className="text-green-300">3</span></div>
              </div>
            </div>
          )}

          {activeTab === 'CODEGEN' && (
            <div className="w-full flex flex-col items-center gap-2 font-mono text-xs">
              <span className="text-xs font-mono text-primary-300">Generated Binary / Assembly Code</span>
              <div className="glass p-4 rounded-xl w-full text-left font-mono space-y-2 text-white/80">
                <div className="text-primary-300">MOV R1, 5  <span className="text-white/30">(0010 0001 0101)</span></div>
                <div className="text-primary-300">MOV R2, 3  <span className="text-white/30">(0010 0010 0011)</span></div>
                <div className="text-primary-300">ADD R1, R2 <span className="text-white/30">(0001 0001 0010)</span></div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quiz */}
      <div className="w-full max-w-lg mt-4">
        <Quiz
          sectionTitle="Compiler Pipeline"
          questions={[
            {
              question: 'Kya human programming syntax (English keywords ya formatting) se hardware CPU ko koi matlab hota hai?',
              options: [
                'Haan, CPU English syntax padhta hai',
                'Bilkul nahi! Syntax sirf insaano ke samajhne ke liye hota hai. Compiler use parse karke binary signals bana deta hai',
                'English syntax se chip ki speed badhti hai',
                'Only compiled languages work',
              ],
              correct: 1,
              explanation: 'Syntax aur English words insaano ki suvidha ke liye hote hain. Compiler syntax tree bana kar aakhir mein 0s aur 1s mein badal deta hai.',
            },
          ]}
        />
      </div>
    </div>
  );
}
