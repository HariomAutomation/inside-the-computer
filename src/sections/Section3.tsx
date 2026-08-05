import { motion } from 'framer-motion';
import { useState } from 'react';
import { Layers, Info, CheckCircle2 } from 'lucide-react';

type GateType = 'NOT' | 'NAND' | 'AND' | 'NOR' | 'OR' | 'XOR' | 'XNOR';

export default function Section3() {
  const [selectedGate, setSelectedGate] = useState<GateType>('NAND');
  const [inputA, setInputA] = useState<boolean>(false);
  const [inputB, setInputB] = useState<boolean>(false);
  const [showTechDetails, setShowTechDetails] = useState<boolean>(true);

  // Compute logic gate output
  const computeOutput = (gate: GateType, a: boolean, b: boolean): boolean => {
    switch (gate) {
      case 'NOT':
        return !a;
      case 'NAND':
        return !(a && b);
      case 'AND':
        return a && b;
      case 'NOR':
        return !(a || b);
      case 'OR':
        return a || b;
      case 'XOR':
        return a !== b;
      case 'XNOR':
        return a === b;
    }
  };

  const output = computeOutput(selectedGate, inputA, inputB);

  // CMOS Transistor Details for each gate
  const gateInfo: Record<GateType, {
    name: string;
    transistorCount: number;
    cmosLayout: string;
    siliconFact: string;
    realWorldUse: string;
    explanation: string;
  }> = {
    NOT: {
      name: 'NOT Gate (CMOS Inverter)',
      transistorCount: 2,
      cmosLayout: '1 PMOS (Pull-Up) + 1 NMOS (Pull-Down)',
      siliconFact: 'Silicon ka sabse chhota aur fast gate. Input 0 par PMOS VCC se connect karta hai; Input 1 par NMOS GND se connect karta hai.',
      realWorldUse: 'Signal Inversion, Clock Buffers, Memory Storage Cells.',
      explanation: 'Jab Input=0 hota hai, PMOS ON hota hai aur output ko +VCC (+5V) se jod deta hai (Output=1). Jab Input=1 hota hai, NMOS ON hota hai aur output ko GND (0V) se jod deta hai (Output=0).',
    },
    NAND: {
      name: 'NAND Gate (Universal Gate)',
      transistorCount: 4,
      cmosLayout: '2 PMOS (Parallel Pull-Up) + 2 NMOS (Series Pull-Down)',
      siliconFact: 'Silicon Fabrication ka SABSE EFFICIENT gate! Sirf 4 transistors lagte hain. Isiliye microchips mein AND ke bajaye natively NAND banta hai.',
      realWorldUse: 'NAND Flash Memory (SD Cards, SSDs), Microprocessor Control Logic.',
      explanation: 'Jab dono Inputs A=1 aur B=1 hote hain, dono NMOS series mein ON hokar Output ko Ground (0) kar dete hain. Kisi ek ke bhi 0 hone par PMOS Output ko VCC (1) bana deta hai.',
    },
    AND: {
      name: 'AND Gate (NAND + NOT Inverter)',
      transistorCount: 6,
      cmosLayout: '4-Transistor NAND + 2-Transistor NOT Inverter',
      siliconFact: 'Microchip mein direct AND gate nahi banta! Pehle 4-transistor NAND banta hai, phir uske aage 2-transistor NOT lagaya jata hai (Total 6 transistors).',
      realWorldUse: 'Car Seatbelt Alarm (Seat Occupied AND Belt Unbuckled = Alarm ON), Security Systems.',
      explanation: 'Dono inputs A=1 AND B=1 hone par hi output 1 milta hai. Hardware level par ye pehle NAND calculate karta hai aur fir inverter se bit ko palat deta hai.',
    },
    NOR: {
      name: 'NOR Gate (Universal Gate)',
      transistorCount: 4,
      cmosLayout: '2 PMOS (Series Pull-Up) + 2 NMOS (Parallel Pull-Down)',
      siliconFact: 'NAND ki tarah NOR bhi Universal Gate hai. Sirf 4 transistors se banta hai.',
      realWorldUse: 'NOR Flash Memory (BIOS Chips), High-Reliability Aerospace Controllers.',
      explanation: 'Agar koi ek bhi Input 1 ho jaye, toh parallel NMOS Output ko Ground (0) kheench lete hain. Output 1 tabhi milega jab DONO inputs 0 hon.',
    },
    OR: {
      name: 'OR Gate (NOR + NOT Inverter)',
      transistorCount: 6,
      cmosLayout: '4-Transistor NOR + 2-Transistor NOT Inverter',
      siliconFact: 'OR Gate banane ke liye 4-transistor NOR ke aage 2-transistor inverter lagaya jata hai.',
      realWorldUse: 'Fire Alarm System (Smoke Sensor OR Heat Sensor = Alarm Trigger).',
      explanation: 'Agar Input A=1 OR Input B=1 (ya dono 1), toh output 1 milta hai. Dono 0 hone par hi output 0 hota hai.',
    },
    XOR: {
      name: 'XOR Gate (Exclusive OR / Bit Comparator)',
      transistorCount: 8,
      cmosLayout: 'Transmission Gates & Complementary CMOS (8 Transistors)',
      siliconFact: 'Digital Addition (Maths) ka dil! XOR gate do bits ko compare karke bataata hai ki wo ALAG hain ya NAHI.',
      realWorldUse: 'ALU Binary Adders, Parity Checkers, Cryptographic Ciphers (AES Encryption).',
      explanation: 'Output 1 tabhi milega jab Inputs ALAG ALAG hon (A=0, B=1 ya A=1, B=0). Agar dono inputs same hon (0,0 ya 1,1), toh output 0 milta hai.',
    },
    XNOR: {
      name: 'XNOR Gate (Equivalence Gate)',
      transistorCount: 8,
      cmosLayout: 'XOR Gate + NOT Inverter (8 Transistors)',
      siliconFact: 'Check karta hai ki do binary numbers bilkul EQUAL hain ya nahi.',
      realWorldUse: 'Digital Equality Comparators, Error Correction Code (ECC Memory).',
      explanation: 'Output 1 tabhi milega jab Dono Inputs EXACTLY SAME hon (0,0 = 1 ya 1,1 = 1).',
    },
  };

  const currentInfo = gateInfo[selectedGate];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 sm:px-8 pb-8 gap-8">
      {/* Header */}
      <motion.div
        className="text-center max-w-3xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.span
          className="inline-block text-xs font-mono text-primary-400 mb-3 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Section 3 of 12 — IIT-Grade CMOS Logic Gate Masterclass
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          All 7 Logic Gates (CMOS Transistor Level)
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Real silicon chips (Intel, Apple M3, Nvidia) mein single transistor nahi, balki <strong>CMOS (PMOS + NMOS)</strong> pairing use hoti hai. Samjhein har gate silicon ke andar kaise banta hai!
        </p>
      </motion.div>

      {/* Gate Selector Buttons */}
      <div className="flex flex-wrap justify-center gap-2 max-w-2xl">
        {(['NOT', 'NAND', 'AND', 'NOR', 'OR', 'XOR', 'XNOR'] as GateType[]).map((gate) => (
          <button
            key={gate}
            onClick={() => setSelectedGate(gate)}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs font-bold transition-all ${
              selectedGate === gate
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30 ring-2 ring-primary-400'
                : 'glass text-white/70 hover:text-white'
            }`}
          >
            {gate} {gate === 'NAND' || gate === 'NOR' ? '★' : ''}
          </button>
        ))}
      </div>

      {/* Main Interactive CMOS Circuit Workbench */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        {/* Gate Banner */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 glass p-4 rounded-2xl border border-primary-500/30">
          <div>
            <h2 className="text-xl font-extrabold text-white font-mono flex items-center gap-2">
              <Layers className="text-primary-400" size={20} /> {currentInfo.name}
            </h2>
            <p className="text-xs text-primary-300 font-mono mt-1">
              Silicon Layout: {currentInfo.cmosLayout} ({currentInfo.transistorCount} Transistors)
            </p>
          </div>
          <button
            onClick={() => setShowTechDetails(!showTechDetails)}
            className="px-3 py-1.5 rounded-lg glass text-xs font-mono text-white/70 hover:text-white flex items-center gap-1.5"
          >
            <Info size={14} /> {showTechDetails ? 'Hide Deep Details' : 'Show Deep Details'}
          </button>
        </div>

        {/* Deep Tech Explanation Card */}
        {showTechDetails && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans text-white/80">
            <div className="glass p-4 rounded-xl border border-yellow-500/20 space-y-1">
              <span className="font-bold text-yellow-300 block mb-1">⚡ IIT Microchip Fact:</span>
              <p className="leading-relaxed text-white/70">{currentInfo.siliconFact}</p>
            </div>

            <div className="glass p-4 rounded-xl border border-green-500/20 space-y-1">
              <span className="font-bold text-green-300 block mb-1">🚀 Real-World Tech Use Case:</span>
              <p className="leading-relaxed text-white/70">{currentInfo.realWorldUse}</p>
            </div>
          </div>
        )}

        {/* Input Control Switches */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-white/80 font-bold">Input A:</span>
            <button
              onClick={() => setInputA(!inputA)}
              className={`w-14 h-14 rounded-2xl font-mono font-bold text-xl transition-all shadow-md ${
                inputA ? 'bg-green-500 text-white shadow-green-500/30' : 'glass text-white/40'
              }`}
            >
              {inputA ? '1' : '0'}
            </button>
          </div>

          {selectedGate !== 'NOT' && (
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm text-white/80 font-bold">Input B:</span>
              <button
                onClick={() => setInputB(!inputB)}
                className={`w-14 h-14 rounded-2xl font-mono font-bold text-xl transition-all shadow-md ${
                  inputB ? 'bg-green-500 text-white shadow-green-500/30' : 'glass text-white/40'
                }`}
              >
                {inputB ? '1' : '0'}
              </button>
            </div>
          )}
        </div>

        {/* CMOS Transistor Circuit Schematic SVG using standard Hex/RGB colors */}
        <div className="relative w-full max-w-lg bg-surface-500/50 rounded-2xl p-4 border border-white/10 flex flex-col items-center">
          <svg viewBox="0 0 450 250" className="w-full">
            {/* Power Lines */}
            {/* VCC (+5V Pull-Up Rail) */}
            <line x1="50" y1="25" x2="400" y2="25" stroke="#22c55e" strokeWidth="3" />
            <text x="50" y="18" fill="#22c55e" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">VCC (+5V Power Rail)</text>

            {/* GND (0V Pull-Down Rail) */}
            <line x1="50" y1="230" x2="400" y2="230" stroke="#64748b" strokeWidth="3" />
            <text x="50" y="245" fill="#94a3b8" fontSize="10" fontFamily="var(--font-mono)" fontWeight="bold">GND (0V Ground Rail)</text>

            {/* Render CMOS Transistor Topology */}
            {selectedGate === 'NOT' && (
              <g transform="translate(170, 30)">
                {/* Pull-Up PMOS */}
                <rect x="30" y="20" width="40" height="40" rx="6" fill={!inputA ? '#8b5cf6' : '#1e293b'} stroke="#a855f7" strokeWidth="2" />
                <text x="50" y="44" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">PMOS</text>

                {/* Pull-Down NMOS */}
                <rect x="30" y="120" width="40" height="40" rx="6" fill={inputA ? '#3b82f6' : '#1e293b'} stroke="#60a5fa" strokeWidth="2" />
                <text x="50" y="144" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">NMOS</text>

                {/* Input Line */}
                <line x1="-50" y1="90" x2="10" y2="90" stroke={inputA ? '#22c55e' : '#64748b'} strokeWidth="3" />
                <line x1="10" y1="40" x2="10" y2="140" stroke={inputA ? '#22c55e' : '#64748b'} strokeWidth="3" />
                <line x1="10" y1="40" x2="30" y2="40" stroke={inputA ? '#22c55e' : '#64748b'} strokeWidth="3" />
                <line x1="10" y1="140" x2="30" y2="140" stroke={inputA ? '#22c55e' : '#64748b'} strokeWidth="3" />

                {/* Output Tap Line */}
                <line x1="50" y1="60" x2="50" y2="120" stroke={output ? '#22c55e' : '#64748b'} strokeWidth="3" />
                <line x1="50" y1="90" x2="150" y2="90" stroke={output ? '#22c55e' : '#64748b'} strokeWidth="3" />

                {/* VCC & GND connections */}
                <line x1="50" y1="-5" x2="50" y2="20" stroke="#22c55e" strokeWidth="3" />
                <line x1="50" y1="160" x2="50" y2="200" stroke="#64748b" strokeWidth="3" />
              </g>
            )}

            {selectedGate !== 'NOT' && (
              <g transform="translate(130, 30)">
                {/* Pull-Up PMOS Pair */}
                <rect x="20" y="20" width="40" height="35" rx="5" fill={!inputA ? '#8b5cf6' : '#1e293b'} stroke="#a855f7" strokeWidth="2" />
                <text x="40" y="42" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">PMOS A</text>

                <rect x="120" y="20" width="40" height="35" rx="5" fill={!inputB ? '#8b5cf6' : '#1e293b'} stroke="#a855f7" strokeWidth="2" />
                <text x="140" y="42" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">PMOS B</text>

                {/* Pull-Down NMOS Pair */}
                <rect x="70" y="100" width="40" height="35" rx="5" fill={inputA ? '#3b82f6' : '#1e293b'} stroke="#60a5fa" strokeWidth="2" />
                <text x="90" y="122" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">NMOS A</text>

                <rect x="70" y="150" width="40" height="35" rx="5" fill={inputB ? '#3b82f6' : '#1e293b'} stroke="#60a5fa" strokeWidth="2" />
                <text x="90" y="172" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">NMOS B</text>

                {/* Connections */}
                <line x1="90" y1="55" x2="90" y2="100" stroke={output ? '#22c55e' : '#64748b'} strokeWidth="3" />
                <line x1="90" y1="80" x2="190" y2="80" stroke={output ? '#22c55e' : '#64748b'} strokeWidth="3" />
              </g>
            )}

            {/* Output Indicator Bulb */}
            <g transform="translate(370, 100)">
              <circle
                cx="20"
                cy="20"
                r="22"
                fill={output ? 'rgba(34, 197, 94, 0.25)' : '#0f172a'}
                stroke={output ? '#22c55e' : '#475569'}
                strokeWidth="3"
              />
              <text
                x="20"
                y="26"
                textAnchor="middle"
                fill={output ? '#22c55e' : '#64748b'}
                fontSize="18"
                fontWeight="bold"
                fontFamily="var(--font-mono)"
              >
                {output ? '1' : '0'}
              </text>
              <text x="20" y="55" textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="var(--font-mono)">OUTPUT</text>
            </g>
          </svg>
        </div>

        {/* Truth Table */}
        <div className="w-full max-w-md glass rounded-2xl p-4 overflow-hidden">
          <div className="text-xs font-mono text-white/60 mb-3 uppercase tracking-wider text-center flex items-center justify-center gap-2">
            <CheckCircle2 size={14} className="text-primary-400" /> {selectedGate} Truth Table
          </div>
          <table className="w-full text-center text-xs font-mono">
            <thead>
              <tr className="border-b border-white/10 text-white/40">
                <th className="py-2">Input A</th>
                {selectedGate !== 'NOT' && <th className="py-2">Input B</th>}
                <th className="py-2 text-primary-300">Output</th>
              </tr>
            </thead>
            <tbody>
              {selectedGate === 'NOT' ? (
                [
                  { a: false, out: true },
                  { a: true, out: false },
                ].map((row, i) => (
                  <tr
                    key={i}
                    className={`transition-colors ${
                      inputA === row.a ? 'bg-primary-500/30 font-bold text-white' : 'text-white/60'
                    }`}
                  >
                    <td className="py-2">{row.a ? '1' : '0'}</td>
                    <td className={`py-2 ${row.out ? 'text-green-400 font-bold' : 'text-white/40'}`}>{row.out ? '1' : '0'}</td>
                  </tr>
                ))
              ) : (
                [
                  { a: false, b: false },
                  { a: false, b: true },
                  { a: true, b: false },
                  { a: true, b: true },
                ].map((row, i) => {
                  const out = computeOutput(selectedGate, row.a, row.b);
                  const isCurrent = inputA === row.a && inputB === row.b;
                  return (
                    <tr
                      key={i}
                      className={`transition-colors ${
                        isCurrent ? 'bg-primary-500/30 font-bold text-white' : 'text-white/60'
                      }`}
                    >
                      <td className="py-2">{row.a ? '1' : '0'}</td>
                      <td className="py-2">{row.b ? '1' : '0'}</td>
                      <td className={`py-2 ${out ? 'text-green-400 font-bold' : 'text-white/40'}`}>{out ? '1' : '0'}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
