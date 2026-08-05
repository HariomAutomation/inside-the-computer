import { motion } from 'framer-motion';

export default function S4_HelloWorld() {
  return (
    <div className="space-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Hello World in Assembly</h2>
        <p className="text-white/60 text-sm">Your first assembly program — Linux x86 system calls.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl border border-green-500/30 p-6"
      >
        <h3 className="font-mono font-bold text-sm text-green-400 mb-3">NASM x86 Linux</h3>
        <pre className="text-xs text-white/70 font-mono leading-relaxed overflow-x-auto">
{`section .data
    msg db "Hello, World!", 10
    len equ $ - msg

section .text
    global _start

_start:
    ; sys_write(1, msg, len)
    mov eax, 4          ; sys_write
    mov ebx, 1          ; stdout
    mov ecx, msg        ; buffer
    mov edx, len        ; length
    int 0x80            ; syscall

    ; sys_exit(0)
    mov eax, 1          ; sys_exit
    mov ebx, 0          ; status
    int 0x80            ; syscall`}
        </pre>
      </motion.div>

      <div className="glass rounded-2xl border border-white/10 p-6">
        <h3 className="font-bold text-sm mb-3 text-primary-400">System Calls Kya Hain?</h3>
        <p className="text-sm text-white/70 leading-relaxed">
          <span className="text-green-400 font-bold">System call</span> OS se baat karne ka tarika hai.
          <span className="text-primary-400 font-bold"> int 0x80</span> Linux kernel ko interrupt karta hai.
          <span className="text-purple-400 font-bold"> EAX</span> register mein syscall number hota hai —
          4 = write, 1 = exit. Baaki registers mein arguments hain.
          Yeh sab tum directly hardware se baat kar rahe ho! 🔧
        </p>
      </div>
    </div>
  );
}
