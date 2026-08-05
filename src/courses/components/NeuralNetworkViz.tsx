import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Neuron {
  id: string;
  x: number;
  y: number;
  value: number;
  layer: number;
}

interface Connection {
  from: string;
  to: string;
  weight: number;
  active: boolean;
}

const LAYERS = [3, 4, 4, 2];
const LAYER_LABELS = ['Input', 'Hidden 1', 'Hidden 2', 'Output'];
const LAYER_COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#22c55e'];

export default function NeuralNetworkViz() {
  const [neurons, setNeurons] = useState<Neuron[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [activeLayer, setActiveLayer] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [inputValues, setInputValues] = useState([0.5, 0.8, 0.3]);

  useEffect(() => {
    const newNeurons: Neuron[] = [];
    const newConnections: Connection[] = [];
    let id = 0;

    LAYERS.forEach((count, layerIdx) => {
      const layerX = 60 + (layerIdx / (LAYERS.length - 1)) * 280;
      for (let i = 0; i < count; i++) {
        const layerY = 30 + ((i + 0.5) / count) * 140;
        const neuronId = `n${id}`;
        newNeurons.push({ id: neuronId, x: layerX, y: layerY, value: layerIdx === 0 ? inputValues[i] || 0 : Math.random(), layer: layerIdx });
        id++;
      }
    });

    for (let l = 0; l < LAYERS.length - 1; l++) {
      const fromNeurons = newNeurons.filter((n) => n.layer === l);
      const toNeurons = newNeurons.filter((n) => n.layer === l + 1);
      fromNeurons.forEach((from) => {
        toNeurons.forEach((to) => {
          newConnections.push({ from: from.id, to: to.id, weight: Math.random() * 2 - 1, active: false });
        });
      });
    }

    setNeurons(newNeurons);
    setConnections(newConnections);
  }, [inputValues]);

  const forwardPass = () => {
    setIsAnimating(true);
    setActiveLayer(0);

    let layer = 0;
    const interval = setInterval(() => {
      setActiveLayer(layer);
      setConnections((prev) =>
        prev.map((c) => {
          const fromN = neurons.find((n) => n.id === c.from);
          const toN = neurons.find((n) => n.id === c.to);
          if (!fromN || !toN) return c;
          return { ...c, active: fromN.layer === layer && toN.layer === layer + 1 };
        })
      );
      layer++;
      if (layer >= LAYERS.length - 1) {
        clearInterval(interval);
        setTimeout(() => {
          setConnections((prev) => prev.map((c) => ({ ...c, active: false })));
          setActiveLayer(-1);
          setIsAnimating(false);
        }, 500);
      }
    }, 700);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <button
          onClick={forwardPass}
          disabled={isAnimating}
          className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all disabled:opacity-30"
          style={{ backgroundColor: '#22c55e30', border: '1px solid #22c55e', color: '#22c55e' }}
        >
          {isAnimating ? '⏳ Forward Pass...' : '▶ Forward Pass'}
        </button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] text-white/40">Inputs:</span>
          {inputValues.map((v, i) => (
            <input
              key={i}
              type="range" min={0} max={1} step={0.1} value={v}
              onChange={(e) => { const nv = [...inputValues]; nv[i] = Number(e.target.value); setInputValues(nv); }}
              className="w-14 accent-blue-500"
            />
          ))}
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-4">
        <svg viewBox="0 0 400 200" className="w-full h-48">
          {connections.map((c, i) => {
            const from = neurons.find((n) => n.id === c.from);
            const to = neurons.find((n) => n.id === c.to);
            if (!from || !to) return null;
            return (
              <motion.line
                key={i}
                x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                stroke={c.active ? LAYER_COLORS[from.layer + 1] : 'rgba(255,255,255,0.08)'}
                strokeWidth={c.active ? 2 : 0.5}
                initial={false}
                animate={{ stroke: c.active ? LAYER_COLORS[from.layer + 1] : 'rgba(255,255,255,0.08)', strokeWidth: c.active ? 2 : 0.5 }}
              />
            );
          })}

          {neurons.map((n) => {
            const isActive = activeLayer === n.layer;
            return (
              <g key={n.id}>
                <motion.circle
                  cx={n.x} cy={n.y} r={12}
                  fill={isActive ? LAYER_COLORS[n.layer] + '30' : 'rgba(255,255,255,0.05)'}
                  stroke={isActive ? LAYER_COLORS[n.layer] : 'rgba(255,255,255,0.15)'}
                  strokeWidth={isActive ? 2 : 1}
                  initial={false}
                  animate={{ r: isActive ? 14 : 12, fill: isActive ? LAYER_COLORS[n.layer] + '30' : 'rgba(255,255,255,0.05)' }}
                />
                <text x={n.x} y={n.y + 3} textAnchor="middle" fill={isActive ? LAYER_COLORS[n.layer] : 'rgba(255,255,255,0.4)'} fontSize="7" fontFamily="monospace">
                  {n.value.toFixed(1)}
                </text>
              </g>
            );
          })}

          {LAYERS.map((_count, l) => {
            const x = 60 + (l / (LAYERS.length - 1)) * 280;
            return (
              <text key={l} x={x} y={195} textAnchor="middle" fill={LAYER_COLORS[l]} fontSize="8" fontFamily="monospace" fontWeight="bold">
                {LAYER_LABELS[l]}
              </text>
            );
          })}
        </svg>
      </div>

      <div className="glass rounded-xl border border-white/10 p-4">
        <h4 className="text-[11px] font-mono font-bold text-primary-400 mb-2">How Neural Networks Learn</h4>
        <div className="grid grid-cols-4 gap-2 text-center">
          {LAYERS.map((count, l) => (
            <div key={l} className="rounded-lg p-2 text-[9px] font-mono" style={{ backgroundColor: LAYER_COLORS[l] + '10', border: `1px solid ${LAYER_COLORS[l]}30` }}>
              <p className="font-bold" style={{ color: LAYER_COLORS[l] }}>{LAYER_LABELS[l]}</p>
              <p className="text-white/40">{count} neurons</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/50 mt-3">
          Each connection has a <span className="text-amber-400 font-bold">weight</span>. During training,
          <span className="text-green-400 font-bold"> gradient descent</span> adjusts these weights to minimize
          the <span className="text-red-400 font-bold">loss function</span>.
        </p>
      </div>
    </div>
  );
}
