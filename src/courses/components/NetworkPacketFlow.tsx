import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Packet {
  id: number;
  type: 'SYN' | 'SYN-ACK' | 'ACK' | 'DATA' | 'FIN' | 'FIN-ACK';
  from: string;
  to: string;
  progress: number;
  color: string;
}

const STEPS = [
  { type: 'SYN' as const, from: 'Client', to: 'Server', desc: 'Client sends SYN (seq=0)', color: '#3b82f6' },
  { type: 'SYN-ACK' as const, from: 'Server', to: 'Client', desc: 'Server replies SYN-ACK (seq=1, ack=1)', color: '#8b5cf6' },
  { type: 'ACK' as const, from: 'Client', to: 'Server', desc: 'Client sends ACK (ack=2) — Connection established!', color: '#22c55e' },
  { type: 'DATA' as const, from: 'Client', to: 'Server', desc: 'Client sends HTTP GET /index.html', color: '#f59e0b' },
  { type: 'DATA' as const, from: 'Server', to: 'Client', desc: 'Server sends HTTP 200 OK + HTML content', color: '#06b6d4' },
  { type: 'FIN' as const, from: 'Client', to: 'Server', desc: 'Client sends FIN — wants to close', color: '#ef4444' },
  { type: 'FIN-ACK' as const, from: 'Server', to: 'Client', desc: 'Server sends FIN-ACK — connection closed', color: '#ec4899' },
];

export default function NetworkPacketFlow() {
  const [step, setStep] = useState(0);
  const [packets, setPackets] = useState<Packet[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [packetId, setPacketId] = useState(0);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setStep((s) => {
        if (s >= STEPS.length) { setIsRunning(false); return s; }
        const pkt = STEPS[s];
        setPacketId((pid) => pid + 1);
        setPackets((prev) => [...prev.slice(-5), { id: packetId, ...pkt, progress: 0 }]);
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(interval);
  }, [isRunning, packetId]);

  useEffect(() => {
    if (packets.length === 0) return;
    const interval = setInterval(() => {
      setPackets((prev) =>
        prev.map((p) => (p.progress < 100 ? { ...p, progress: Math.min(100, p.progress + 8) } : p))
      );
    }, 50);
    return () => clearInterval(interval);
  }, [packets.length]);

  const reset = () => {
    setIsRunning(false);
    setStep(0);
    setPackets([]);
    setPacketId(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all"
          style={{ backgroundColor: isRunning ? '#ef444430' : '#22c55e30', border: `1px solid ${isRunning ? '#ef4444' : '#22c55e'}`, color: isRunning ? '#ef4444' : '#22c55e' }}
        >
          {isRunning ? '⏸ Pause' : '▶ Simulate'}
        </button>
        <button onClick={() => { if (step < STEPS.length) { const pkt = STEPS[step]; setPacketId((pid) => pid + 1); setPackets((prev) => [...prev.slice(-5), { id: packetId, ...pkt, progress: 0 }]); setStep(step + 1); } }} className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-blue-500/20 border border-blue-500 text-blue-400">
          ⏭ Step
        </button>
        <button onClick={reset} className="px-4 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60">↺ Reset</button>
        <span className="text-[10px] text-white/40 font-mono ml-auto">Step {Math.min(step, STEPS.length)}/{STEPS.length}</span>
      </div>

      <div className="glass rounded-xl border border-white/10 p-6 relative h-48 overflow-hidden">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute right-6 top-0 bottom-0 w-px bg-white/10" />
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-mono text-blue-400 -rotate-90 whitespace-nowrap">Client</div>
        <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-purple-400 rotate-90 whitespace-nowrap">Server</div>

        <AnimatePresence>
          {packets.map((pkt, i) => {
            const y = 20 + (i % 6) * 36;
            const fromLeft = pkt.from === 'Client';
            const x = fromLeft ? pkt.progress : 100 - pkt.progress;
            return (
              <motion.div
                key={pkt.id}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: pkt.progress >= 100 ? 0.3 : 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="absolute rounded-full px-2 py-0.5 text-[8px] font-mono font-bold whitespace-nowrap"
                style={{
                  left: `${8 + (x / 100) * 84}%`,
                  top: `${y}px`,
                  backgroundColor: pkt.color + '25',
                  border: `1px solid ${pkt.color}`,
                  color: pkt.color,
                }}
              >
                {pkt.type}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">
        {step > 0 && step <= STEPS.length && (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="glass rounded-xl border border-white/10 p-3"
          >
            <p className="text-[11px] font-mono" style={{ color: STEPS[step - 1].color }}>{STEPS[step - 1].desc}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="glass rounded-xl border border-white/10 p-4">
        <h4 className="text-[11px] font-mono font-bold text-primary-400 mb-2">TCP 3-Way Handshake + Data Transfer</h4>
        <div className="grid grid-cols-7 gap-1 text-center">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`rounded-lg p-1.5 text-[8px] font-mono transition-all ${i < step ? 'opacity-100' : 'opacity-30'}`}
              style={{ backgroundColor: s.color + '15', border: `1px solid ${s.color}30`, color: s.color }}
            >
              <p className="font-bold">{s.type}</p>
              <p className="text-[7px] opacity-60 mt-0.5">{s.from}→{s.to}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
