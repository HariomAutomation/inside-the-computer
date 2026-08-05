import { motion } from 'framer-motion';
import CompilerPipelineViz from '../components/CompilerPipelineViz';

export default function S2_LexerParser() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Lexing & Parsing</h2>
        <p className="text-white/60 text-sm">Tokenizing source code and building the Abstract Syntax Tree.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-4 text-primary-400">Interactive: Compiler Pipeline</h3>
        <CompilerPipelineViz />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-primary-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-primary-400">Example: Lexer</h3>
        <div className="space-y-2">
          <p className="text-[10px] text-white/40 font-mono">Input: <span className="text-white/70">let x = 42 + 3;</span></p>
          <p className="text-[10px] text-white/40 font-mono">Output:</p>
          <div className="flex flex-wrap gap-2">
            {[
              { type: 'KEYWORD', value: 'let', color: '#8b5cf6' },
              { type: 'IDENT', value: 'x', color: '#3b82f6' },
              { type: 'ASSIGN', value: '=', color: '#22c55e' },
              { type: 'NUMBER', value: '42', color: '#f59e0b' },
              { type: 'OP', value: '+', color: '#ef4444' },
              { type: 'NUMBER', value: '3', color: '#f59e0b' },
              { type: 'SEMI', value: ';', color: '#64748b' },
            ].map((tok) => (
              <span key={tok.value} className="px-2 py-1 rounded-lg text-[10px] font-mono border" style={{ color: tok.color, borderColor: tok.color + '40', backgroundColor: tok.color + '10' }}>
                {tok.type}: {tok.value}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl border border-purple-500/30 p-6"
      >
        <h3 className="text-sm font-bold mb-3 text-purple-400">AST (Abstract Syntax Tree)</h3>
        <svg viewBox="0 0 300 150" className="w-full">
          <rect x="120" y="10" width="60" height="25" rx="5" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="1" />
          <text x="150" y="27" textAnchor="middle" fill="#8b5cf6" fontSize="9" fontFamily="monospace">BinaryExpr</text>
          <line x1="135" y1="35" x2="80" y2="60" stroke="#64748b" strokeWidth="1" />
          <line x1="165" y1="35" x2="220" y2="60" stroke="#64748b" strokeWidth="1" />
          <rect x="55" y="60" width="50" height="25" rx="5" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="1" />
          <text x="80" y="77" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">42</text>
          <rect x="105" y="60" width="30" height="25" rx="5" fill="#ef444420" stroke="#ef4444" strokeWidth="1" />
          <text x="120" y="77" textAnchor="middle" fill="#ef4444" fontSize="9" fontFamily="monospace">+</text>
          <rect x="195" y="60" width="50" height="25" rx="5" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="1" />
          <text x="220" y="77" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">3</text>
        </svg>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Lexer vs Parser?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-blue-400 font-bold">Lexer</span> code ko characters se tokens mein convert karta hai.
          <span className="text-purple-400 font-bold">Parser</span> tokens ko tree structure (AST) mein arrange karta hai —
          kaun sa expression kiske andar hai, kya operator kisko operate karta hai. 💡
        </p>
      </div>
    </div>
  );
}
