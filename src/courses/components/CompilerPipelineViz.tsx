import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Token {
  type: string;
  value: string;
  color: string;
}

interface ASTNode {
  type: string;
  value?: string;
  children?: ASTNode[];
}

const SOURCE = 'let x = 10 + 20 * 3;';

const TOKENS: Token[] = [
  { type: 'KEYWORD', value: 'let', color: '#8b5cf6' },
  { type: 'IDENT', value: 'x', color: '#3b82f6' },
  { type: 'ASSIGN', value: '=', color: '#f59e0b' },
  { type: 'NUMBER', value: '10', color: '#22c55e' },
  { type: 'OP', value: '+', color: '#ef4444' },
  { type: 'NUMBER', value: '20', color: '#22c55e' },
  { type: 'OP', value: '*', color: '#ef4444' },
  { type: 'NUMBER', value: '3', color: '#22c55e' },
  { type: 'SEMICOLON', value: ';', color: '#6b7280' },
];

const AST: ASTNode = {
  type: 'Program',
  children: [
    {
      type: 'VariableDeclaration',
      children: [
        { type: 'Identifier', value: 'x' },
        {
          type: 'BinaryExpression',
          value: '+',
          children: [
            { type: 'NumberLiteral', value: '10' },
            {
              type: 'BinaryExpression',
              value: '*',
              children: [
                { type: 'NumberLiteral', value: '20' },
                { type: 'NumberLiteral', value: '3' },
              ],
            },
          ],
        },
      ],
    },
  ],
};

type Phase = 'source' | 'tokenize' | 'parse' | 'analyze' | 'optimize' | 'codegen';
const PHASES: { key: Phase; name: string; icon: string; color: string }[] = [
  { key: 'source', name: 'Source Code', icon: '📝', color: '#3b82f6' },
  { key: 'tokenize', name: 'Lexical Analysis', icon: '✂️', color: '#8b5cf6' },
  { key: 'parse', name: 'Syntax Analysis', icon: '🌳', color: '#22c55e' },
  { key: 'analyze', name: 'Semantic Analysis', icon: '🔍', color: '#f59e0b' },
  { key: 'optimize', name: 'Optimization', icon: '⚡', color: '#ef4444' },
  { key: 'codegen', name: 'Code Generation', icon: '🔧', color: '#06b6d4' },
];

function ASTTree({ node, depth = 0 }: { node: ASTNode; depth?: number }) {
  const hasChildren = node.children && node.children.length > 0;
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: depth * 0.1 }}
        className="rounded-lg px-2 py-1 text-[9px] font-mono border whitespace-nowrap"
        style={{
          backgroundColor: node.value ? '#22c55e15' : '#3b82f615',
          borderColor: node.value ? '#22c55e40' : '#3b82f640',
          color: node.value ? '#22c55e' : '#3b82f6',
        }}
      >
        {node.type}{node.value ? `(${node.value})` : ''}
      </motion.div>
      {hasChildren && (
        <div className="flex gap-3 mt-1 relative">
          <div className="absolute left-1/2 -top-1 w-px h-1 bg-white/20" />
          {node.children!.map((child, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="w-px h-1 bg-white/20" />
              <ASTTree node={child} depth={depth + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CompilerPipelineViz() {
  const [phase, setPhase] = useState<Phase>('source');
  const [visibleTokens, setVisibleTokens] = useState(0);
  const [optimized, setOptimized] = useState(false);

  useEffect(() => {
    if (phase === 'tokenize') {
      setVisibleTokens(0);
      const interval = setInterval(() => {
        setVisibleTokens((v) => { if (v >= TOKENS.length) { clearInterval(interval); return v; } return v + 1; });
      }, 200);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    if (phase === 'optimize') {
      setOptimized(false);
      const t = setTimeout(() => setOptimized(true), 1000);
      return () => clearTimeout(t);
    }
  }, [phase]);

  return (
    <div className="space-y-4">
      <div className="flex gap-1 flex-wrap">
        {PHASES.map((p) => (
          <button
            key={p.key}
            onClick={() => setPhase(p.key)}
            className={`px-3 py-1.5 rounded-lg text-[10px] font-mono font-bold transition-all ${phase === p.key ? '' : 'opacity-40 hover:opacity-70'}`}
            style={phase === p.key ? { backgroundColor: p.color + '20', border: `1px solid ${p.color}`, color: p.color } : { border: '1px solid transparent' }}
          >
            {p.icon} {p.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={phase} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass rounded-xl border border-white/10 p-4 min-h-[200px]">
          {phase === 'source' && (
            <div>
              <p className="text-[11px] font-mono text-white/60 mb-3">Source code the compiler receives:</p>
              <pre className="bg-black/30 rounded-lg p-4 text-sm font-mono text-green-400 border border-green-500/20">{SOURCE}</pre>
            </div>
          )}

          {phase === 'tokenize' && (
            <div>
              <p className="text-[11px] font-mono text-white/60 mb-3">Breaking source into tokens:</p>
              <div className="flex flex-wrap gap-1.5">
                {TOKENS.slice(0, visibleTokens).map((t, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="rounded-lg px-2 py-1 text-[10px] font-mono" style={{ backgroundColor: t.color + '15', border: `1px solid ${t.color}40`, color: t.color }}>
                    <span className="opacity-50 text-[8px] block">{t.type}</span>
                    {t.value}
                  </motion.div>
                ))}
              </div>
              {visibleTokens >= TOKENS.length && <p className="text-[10px] text-green-400 mt-3 font-mono">✓ {TOKENS.length} tokens generated</p>}
            </div>
          )}

          {phase === 'parse' && (
            <div>
              <p className="text-[11px] font-mono text-white/60 mb-3">Building Abstract Syntax Tree:</p>
              <div className="overflow-x-auto flex justify-center py-2">
                <ASTTree node={AST} />
              </div>
            </div>
          )}

          {phase === 'analyze' && (
            <div className="space-y-3">
              <p className="text-[11px] font-mono text-white/60">Semantic checks:</p>
              {[
                { check: 'Type checking', status: 'pass', detail: 'x is number, 10+20*3 is number' },
                { check: 'Scope resolution', status: 'pass', detail: 'x declared in current scope' },
                { check: 'Unused variables', status: 'warn', detail: 'x is assigned but never used' },
                { check: 'Type inference', status: 'info', detail: 'x inferred as number (let → number)' },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }} className="flex items-center gap-3 p-2 rounded-lg bg-white/5">
                  <span className="text-sm">{item.status === 'pass' ? '✅' : item.status === 'warn' ? '⚠️' : 'ℹ️'}</span>
                  <div>
                    <p className="text-[11px] font-mono font-bold text-white/80">{item.check}</p>
                    <p className="text-[9px] text-white/40">{item.detail}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {phase === 'optimize' && (
            <div className="space-y-3">
              <p className="text-[11px] font-mono text-white/60">Optimization passes:</p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: 'Constant Folding', before: '20 * 3', after: '60', done: optimized },
                  { name: 'Constant Folding', before: '10 + 60', after: '70', done: optimized },
                  { name: 'Dead Code Elimination', before: 'let x = 70', after: '// removed (unused)', done: optimized },
                ].map((opt, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.4 }} className="bg-white/5 rounded-lg p-2 text-[10px] font-mono">
                    <p className="text-amber-400 font-bold mb-1">{opt.name}</p>
                    <p className="text-red-400 line-through">{opt.before}</p>
                    {opt.done && <p className="text-green-400">→ {opt.after}</p>}
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {phase === 'codegen' && (
            <div>
              <p className="text-[11px] font-mono text-white/60 mb-3">Generated x86-like assembly:</p>
              <pre className="bg-black/30 rounded-lg p-4 text-[11px] font-mono text-cyan-400 border border-cyan-500/20 leading-relaxed">{`; Generated code\nmov eax, 70       ; constant folded: 10 + 20 * 3\n; x unused — dead code eliminated`}</pre>
              <p className="text-[10px] text-green-400 mt-2 font-mono">✓ Optimization reduced 3 operations to 1 mov instruction</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
