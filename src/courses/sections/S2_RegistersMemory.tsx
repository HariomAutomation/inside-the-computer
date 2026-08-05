export default function S2_RegistersMemory() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Registers & Memory Access</h2>
        <p className="text-white/60 text-sm">How assembly interacts with CPU registers and RAM.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="glass rounded-2xl border border-green-500/30 p-5">
          <p className="font-mono font-bold text-sm text-green-400 mb-3">x86 Registers</p>
          {['EAX (Accumulator)', 'EBX (Base)', 'ECX (Counter)', 'EDX (Data)', 'ESI (Source)', 'EDI (Dest)', 'ESP (Stack Ptr)', 'EIP (Instr Ptr)'].map((r) => (
            <p key={r} className="text-[10px] text-white/60 font-mono">{r}</p>
          ))}
        </div>
        <div className="glass rounded-2xl border border-purple-500/30 p-5">
          <p className="font-mono font-bold text-sm text-purple-400 mb-3">Memory Addressing</p>
          {['[address] — direct', '[ register ] — indirect', '[reg + offset] — indexed', '[reg1 + reg2*scale] — scaled', 'MOV EAX, [EBX] — read', 'MOV [EBX], EAX — write'].map((r) => (
            <p key={r} className="text-[10px] text-white/60 font-mono">{r}</p>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">Registers vs Memory?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          Registers CPU ke andar hain — <span className="text-green-400 font-bold">fastest storage</span>.
          Memory (RAM) bahar hai — slower. Assembly mein tum register se register,
          register se memory, memory se register data move karte ho.
          <span className="text-purple-400 font-bold"> Addressing modes</span> batate hain data kahan se uthana hai. ⚡
        </p>
      </div>
    </div>
  );
}
