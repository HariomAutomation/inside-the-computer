import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Stage = 'IF' | 'ID' | 'EX' | 'MEM' | 'WB';
const STAGES: Stage[] = ['IF', 'ID', 'EX', 'MEM', 'WB'];
const STAGE_COLORS: Record<Stage, string> = {
  IF: '#3b82f6',
  ID: '#8b5cf6',
  EX: '#f59e0b',
  MEM: '#22c55e',
  WB: '#ef4444',
};

interface PipelineRow {
  instruction: string;
  stage: Stage;
  cycle: number;
}

interface HazardInfo {
  type: string;
  description: string;
}

const INSTRUCTIONS = [
  'ADD R1, R2, R3',
  'SUB R4, R1, R5',
  'MUL R6, R1, R7',
  'ADD R8, R6, R4',
  'DIV R9, R8, R3',
  'SUB R10, R9, R1',
];

export default function PipeliningSimulator() {
  const [cycle, setCycle] = useState(0);
  const [pipeline, setPipeline] = useState<PipelineRow[]>([]);
  const [hazard, setHazard] = useState<HazardInfo | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(800);

  const getHazard = useCallback((instrIdx: number, stage: Stage): HazardInfo | null => {
    if (instrIdx >= 1 && stage === 'EX') {
      return { type: 'Data Hazard', description: 'SUB R4, R1, R5 needs R1 which ADD R1 is still computing' };
    }
    if (instrIdx >= 2 && stage === 'EX') {
      return { type: 'Data Hazard', description: 'MUL R6, R1, R7 needs R1 — forwarding from ADD pipeline' };
    }
    return null;
  }, []);

  const tick = useCallback(() => {
    setCycle((c) => {
      const nextCycle = c + 1;
      const newPipeline: PipelineRow[] = [];

      for (let i = 0; i < INSTRUCTIONS.length; i++) {
        const stageIdx = nextCycle - i - 1;
        if (stageIdx >= 0 && stageIdx < STAGES.length) {
          newPipeline.push({
            instruction: INSTRUCTIONS[i],
            stage: STAGES[stageIdx],
            cycle: nextCycle,
          });
        }
      }

      const hazardInstr = newPipeline.find((r) => r.stage === 'EX');
      if (hazardInstr) {
        const idx = INSTRUCTIONS.indexOf(hazardInstr.instruction);
        const h = getHazard(idx, 'EX');
        setHazard(h);
      } else {
        setHazard(null);
      }

      setPipeline(newPipeline);
      return nextCycle;
    });
  }, [getHazard]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(tick, speed);
    return () => clearInterval(interval);
  }, [isRunning, speed, tick]);

  const reset = () => {
    setIsRunning(false);
    setCycle(0);
    setPipeline([]);
    setHazard(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all"
          style={{ backgroundColor: isRunning ? '#ef444430' : '#22c55e30', border: `1px solid ${isRunning ? '#ef4444' : '#22c55e'}`, color: isRunning ? '#ef4444' : '#22c55e' }}
        >
          {isRunning ? '⏸ Pause' : '▶ Run Pipeline'}
        </button>
        <button onClick={tick} className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-blue-500/20 border border-blue-500 text-blue-400">
          ⏭ Step
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-white/5 border border-white/10 text-white/60">
          ↺ Reset
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] text-white/40">Speed:</span>
          <input
            type="range" min={200} max={1500} value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-20 accent-primary-500"
          />
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-4 overflow-x-auto">
        <div className="grid grid-cols-[80px_repeat(5,1fr)] gap-1 text-center min-w-[500px]">
          <div className="text-[9px] text-white/30 font-mono p-1">Cycle</div>
          {STAGES.map((s) => (
            <div key={s} className="text-[10px] font-mono font-bold p-1 rounded" style={{ color: STAGE_COLORS[s], backgroundColor: STAGE_COLORS[s] + '15' }}>
              {s}
            </div>
          ))}

          {INSTRUCTIONS.map((instr, i) => (
            <>
              <div key={`cyc-${i}`} className="text-[10px] text-white/40 font-mono p-1">{instr.split(' ')[0]}</div>
              {STAGES.map((s, si) => {
                const entry = pipeline.find((p) => p.instruction === instr && p.stage === s);
                const isActive = !!entry;
                return (
                  <div
                    key={`${i}-${si}`}
                    className={`rounded p-1 text-[9px] font-mono transition-all duration-300 ${isActive ? 'font-bold' : 'text-white/10'}`}
                    style={isActive ? { backgroundColor: STAGE_COLORS[s] + '25', border: `1px solid ${STAGE_COLORS[s]}50`, color: STAGE_COLORS[s] } : { border: '1px solid transparent' }}
                  >
                    {isActive ? instr.split(' ')[0] : '·'}
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      <div className="text-center text-[10px] text-white/40 font-mono">Cycle: {cycle}</div>

      <AnimatePresence>
        {hazard && (
          <motion.div
            initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="glass rounded-xl border border-amber-500/30 p-3 flex items-center gap-3"
          >
            <span className="text-lg">⚠️</span>
            <div>
              <p className="text-xs font-mono font-bold text-amber-400">{hazard.type}</p>
              <p className="text-[10px] text-white/60">{hazard.description}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-xl border border-white/10 p-4">
        <h4 className="text-[11px] font-mono font-bold text-primary-400 mb-2">Pipeline Stages</h4>
        <div className="flex gap-2 flex-wrap">
          {STAGES.map((s) => (
            <div key={s} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: STAGE_COLORS[s] }} />
              <span className="text-[10px] text-white/50 font-mono">{s} = {s === 'IF' ? 'Instruction Fetch' : s === 'ID' ? 'Instruction Decode' : s === 'EX' ? 'Execute' : s === 'MEM' ? 'Memory Access' : 'Write Back'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
