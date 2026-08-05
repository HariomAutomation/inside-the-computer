import { useState, useCallback } from 'react';

type GateType = 'AND' | 'OR' | 'NOT' | 'NAND' | 'NOR' | 'XOR' | 'XNOR';

interface Gate {
  id: string;
  type: GateType;
  x: number;
  y: number;
}

const GATE_COLORS: Record<GateType, string> = {
  AND: '#3b82f6',
  OR: '#8b5cf6',
  NOT: '#ef4444',
  NAND: '#f59e0b',
  NOR: '#ec4899',
  XOR: '#22c55e',
  XNOR: '#06b6d4',
};

function computeGateOutput(type: GateType, inputs: boolean[]): boolean {
  switch (type) {
    case 'AND': return inputs[0] && inputs[1];
    case 'OR': return inputs[0] || inputs[1];
    case 'NOT': return !inputs[0];
    case 'NAND': return !(inputs[0] && inputs[1]);
    case 'NOR': return !(inputs[0] || inputs[1]);
    case 'XOR': return inputs[0] !== inputs[1];
    case 'XNOR': return inputs[0] === inputs[1];
  }
}

export default function CircuitBuilder() {
  const [gates, setGates] = useState<Gate[]>([
    { id: 'g1', type: 'AND', x: 100, y: 80 },
    { id: 'g2', type: 'OR', x: 300, y: 80 },
  ]);
  const [inputs, setInputs] = useState<Record<string, boolean[]>>({
    g1: [false, false],
    g2: [false, false],
  });
  const [selectedGate, setSelectedGate] = useState<GateType>('AND');

  const addGate = useCallback(() => {
    const newGate: Gate = {
      id: `g${Date.now()}`,
      type: selectedGate,
      x: 100 + Math.random() * 200,
      y: 60 + Math.random() * 80,
    };
    setGates((prev) => [...prev, newGate]);
    setInputs((prev) => ({
      ...prev,
      [newGate.id]: selectedGate === 'NOT' ? [false] : [false, false],
    }));
  }, [selectedGate]);

  const toggleInput = useCallback((gateId: string, portIndex: number) => {
    setInputs((prev) => {
      const gateInputs = [...(prev[gateId] || [])];
      gateInputs[portIndex] = !gateInputs[portIndex];
      return { ...prev, [gateId]: gateInputs };
    });
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['AND', 'OR', 'NOT', 'NAND', 'NOR', 'XOR', 'XNOR'] as GateType[]).map((type) => (
          <button
            key={type}
            onClick={() => setSelectedGate(type)}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs font-bold transition-all border ${
              selectedGate === type
                ? 'text-white border-white/30'
                : 'glass text-white/60 border-white/10 hover:text-white'
            }`}
            style={selectedGate === type ? { backgroundColor: GATE_COLORS[type] + '40', borderColor: GATE_COLORS[type] } : {}}
          >
            {type}
          </button>
        ))}
        <button
          onClick={addGate}
          className="px-3 py-1.5 rounded-lg font-mono text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30 transition-all"
        >
          + Add Gate
        </button>
      </div>

      <svg viewBox="0 0 500 200" className="w-full bg-surface-800/50 rounded-2xl border border-white/10">
        {gates.map((gate) => {
          const gateInputs = inputs[gate.id] || [];
          const output = computeGateOutput(gate.type, gateInputs);
          const color = GATE_COLORS[gate.type];

          return (
            <g key={gate.id} transform={`translate(${gate.x}, ${gate.y})`}>
              <rect
                x="0" y="0" width="80" height="60" rx="8"
                fill={color + '20'}
                stroke={color}
                strokeWidth="2"
              />
              <text x="40" y="35" textAnchor="middle" fill={color} fontSize="11" fontWeight="bold" fontFamily="monospace">
                {gate.type}
              </text>

              {gateInputs.map((val, i) => (
                <g key={i}>
                  <line x1="-20" y1={20 + i * 20} x2="0" y2={20 + i * 20} stroke={val ? '#22c55e' : '#475569'} strokeWidth="2" />
                  <circle
                    cx="-20" cy={20 + i * 20} r="8"
                    fill={val ? '#22c55e' : '#1e293b'}
                    stroke={val ? '#22c55e' : '#475569'}
                    strokeWidth="2"
                    className="cursor-pointer"
                    onClick={() => toggleInput(gate.id, i)}
                  />
                  <text x="-20" y={24 + i * 20} textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">
                    {val ? '1' : '0'}
                  </text>
                </g>
              ))}

              <line x1="80" y1="30" x2="100" y2="30" stroke={output ? '#22c55e' : '#475569'} strokeWidth="2" />
              <circle cx="105" cy="30" r="6" fill={output ? '#22c55e' : '#1e293b'} stroke={output ? '#22c55e' : '#475569'} strokeWidth="2" />
              <text x="105" y="33" textAnchor="middle" fill="white" fontSize="8" fontFamily="monospace">
                {output ? '1' : '0'}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
