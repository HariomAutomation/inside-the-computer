import { motion } from 'framer-motion';
import { useState } from 'react';
import { Zap, Cpu, Layers, Database, Code, Terminal, Trophy, Rocket } from 'lucide-react';

export default function Section12() {
  const [selectedLayer, setSelectedLayer] = useState<number>(0);

  const fullStackLayers = [
    {
      title: '1. Physics & Semiconductor Layer',
      icon: <Zap className="text-yellow-400" size={24} />,
      desc: 'Silicon lithography, PMOS/NMOS MOSFET transistors, +VCC vs GND voltage thresholds, and Noise Margins.',
    },
    {
      title: '2. Digital Logic Gate Layer',
      icon: <Layers className="text-purple-400" size={24} />,
      desc: 'NOT, NAND, AND, NOR, OR, XOR, XNOR gates built using Complementary CMOS pull-up and pull-down networks.',
    },
    {
      title: '3. Functional Hardware Layer',
      icon: <Cpu className="text-green-400" size={24} />,
      desc: 'Ripple Carry / Carry Lookahead Full Adders, 8-bit ALUs, Multiplexers (MUX), and Status Flags (Zero, Overflow, Negative).',
    },
    {
      title: '4. Memory & Sequential Logic',
      icon: <Database className="text-accent-400" size={24} />,
      desc: 'SR Latches, Edge-Triggered D Flip-Flops, 6T-SRAM Cache Cells, 1T-1C DRAM, and CPU Registers.',
    },
    {
      title: '5. Microarchitecture & CPU Core',
      icon: <Cpu className="text-blue-400" size={24} />,
      desc: 'von Neumann Fetch-Decode-Execute pipeline, Control Unit, Program Counter (PC), IR, MAR, MDR registers.',
    },
    {
      title: '6. Instruction Set Architecture (ISA) & Binary Machine Code',
      icon: <Code className="text-primary-400" size={24} />,
      desc: '16-bit binary instruction word encoding (Opcode + Operands) forming the hardware-software contract.',
    },
    {
      title: '7. Compiler & Custom Programming Language Layer',
      icon: <Terminal className="text-green-300" size={24} />,
      desc: 'Lexer (Tokenization) → Parser (Abstract Syntax Tree AST) → Code Generator → Hardware Execution.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 px-4 sm:px-8 pb-12 gap-8">
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
          Section 12 of 12 — IIT-Grade Mastery & Startup Roadmap
        </motion.span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold gradient-text mb-4 leading-tight">
          The Full Stack & Hardware Startup Roadmap
        </h1>
        <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          From quantum electrons in silicon MOSFETs to logic gates, ALUs, CPUs, and custom language compilers — you now have complete **IIT-grade mastery** of computer architecture!
        </p>
      </motion.div>

      {/* Interactive Stack Explorer */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-6 border border-primary-500/20">
        <div className="flex flex-col gap-3 w-full">
          {fullStackLayers.map((layer, index) => (
            <motion.div
              key={index}
              onClick={() => setSelectedLayer(index)}
              className={`p-4 rounded-2xl cursor-pointer flex items-center justify-between transition-all border ${
                selectedLayer === index
                  ? 'bg-primary-500/20 border-primary-400 shadow-lg shadow-primary-500/20'
                  : 'glass border-white/5 hover:border-white/20'
              }`}
              whileHover={{ x: 6 }}
            >
              <div className="flex items-center gap-4">
                {layer.icon}
                <div>
                  <h3 className="font-bold text-sm text-white">{layer.title}</h3>
                  <p className="text-xs text-white/60">{layer.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Startup & Deep Tech Insight Card */}
      <div className="w-full max-w-3xl glass-strong rounded-3xl p-6 sm:p-8 flex flex-col items-center gap-4 border border-green-500/30">
        <div className="flex items-center gap-2 text-green-400 font-mono font-bold text-base">
          <Rocket size={20} /> How Tech Startups Build Custom Processors & Compilers
        </div>
        <p className="text-xs text-white/80 leading-relaxed text-center max-w-xl">
          Companies like Apple (M-series), Nvidia (AI Tensor Cores), and AI chip startups design hardware using <strong>Verilog / VHDL (Hardware Description Languages)</strong>. They simulate gates and CMOS layouts, fabricate chips at TSMC, and write custom compilers (LLVM backends) to run high-level code natively on their hardware!
        </p>
      </div>

      {/* Completion Trophy Card */}
      <motion.div
        className="glass-strong rounded-3xl p-8 text-center max-w-md border border-yellow-500/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Trophy size={48} className="mx-auto text-yellow-400 mb-4" />
        <h2 className="text-2xl font-extrabold gradient-text mb-2">IIT-Level Mastery Unlocked! 🎉</h2>
        <p className="text-sm text-white/80 leading-relaxed">
          Aapke paas ab computer architecture, CMOS circuit design, microprocessors aur compilers ki deep, fundamental IIT-grade knowledge hai!
        </p>
      </motion.div>
    </div>
  );
}
