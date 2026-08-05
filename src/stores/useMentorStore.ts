import { create } from 'zustand';
import type { MentorMessage, AdaMemoryState } from '../types/mentor';

interface MentorStore {
  isOpen: boolean;
  messages: MentorMessage[];
  adaMemory: AdaMemoryState;
  isExplainModalOpen: boolean;
  inspectTarget: string | null;

  toggleDrawer: () => void;
  sendMessage: (text: string) => void;
  openExplainModal: (targetName: string) => void;
  closeExplainModal: () => void;
}

// Deep Computer Science Knowledge Base for Ada 3.0
function generateAdaResponse(questionText: string): string {
  const query = questionText.toLowerCase();

  if (query.includes('voltage') || query.includes('noise margin') || query.includes('noise')) {
    return `⚡ **Voltage & Noise Margin Explanation:**\nDigital chips mein 0 aur 1 abstract text nahi hote. **0.0V - 0.8V** ko Ground LOW (0) aur **2.0V - 5.0V** ko Power VCC HIGH (1) mana jata hai.\n\n**0.8V - 2.0V** ke beech **Noise Margin** (Forbidden Zone) hota hai taaki electrical noise ya voltage surge hone par 0 aur 1 aapas mein confuse na hon!`;
  }

  if (query.includes('cmos') || query.includes('nmos') || query.includes('pmos') || query.includes('transistor')) {
    return `🔬 **CMOS Transistor Technology:**\nModern chips mein **PMOS** (Gate=0 par ON) aur **NMOS** (Gate=1 par ON) transistors ki **Complementary Pairing** hoti hai.\n\nIsse faida ye hai ki standby position par ek transistor ON rehta hai aur doosra OFF, jisse VCC aur Ground ke beech direct path open nahi hota aur **Zero Static Power Loss** hota hai!`;
  }

  if (query.includes('nand') || query.includes('gate') || query.includes('universal')) {
    return `🧱 **Logic Gates & Silicon Efficiency:**\nPhysical silicon fabrication mein **NAND Gate** sabse cheap aur fast banta hai (sirf 4 transistors).\n\nIsiliye microchips natively NAND gates use karti hain, aur **AND Gate** banane ke liye 4-transistor NAND ke aage 2-transistor NOT Inverter (total 6 transistors) lagaya jata hai!`;
  }

  if (query.includes('alu') || query.includes('add') || query.includes('adder') || query.includes('flag')) {
    return `🧮 **ALU & Hardware Status Flags:**\nALU (Arithmetic Logic Unit) 32-bit math (Addition/Subtraction) aur bitwise operations compute karta hai.\n\nResult nikalne ke saath ALU **Status Flags** update karta hai:\n- **Zero Flag (Z)**: Result == 0\n- **Overflow Flag (V)**: Number > limit\n- **Negative Flag (N)**: Result < 0\nInhi flags ko check karke CPU \`if/else\` branches execute karta hai!`;
  }

  if (query.includes('ram') || query.includes('cache') || query.includes('sram') || query.includes('dram')) {
    return `💾 **Memory Hierarchy (SRAM vs DRAM):**\n- **SRAM (Cache L1/L2/L3)**: 6-Transistor Flip-Flops se banti hai. Super-fast aur zero refresh required, lekin mehngi hoti hai.\n- **DRAM (Main RAM)**: 1 Transistor + 1 Capacitor se banti hai. Sasti hoti hai par capacitor charge leak karta hai, isiliye ise har millisecond **refresh** karna padta hai!`;
  }

  if (query.includes('compiler') || query.includes('ast') || query.includes('lexer') || query.includes('parser')) {
    return `⚙️ **Compiler Pipeline:**\n1. **Lexer**: Code text ko Tokens mein todta hai.\n2. **Parser**: Tokens se **Abstract Syntax Tree (AST)** banata hai.\n3. **Intermediate Representation (IR)**: LLVM optimization passes run karta hai.\n4. **CodeGen**: Target CPU ke liye native Machine Opcodes (0101...) generate karta hai!`;
  }

  if (query.includes('ai') || query.includes('transformer') || query.includes('llm') || query.includes('attention')) {
    return `🤖 **Transformers & LLM Architecture:**\nLLMs text generation ke liye **Multi-Head Self-Attention** ($Q, K, V$) matrices use karti hain:\n- **Tokenization**: Text ko BPE token IDs mein convert karna.\n- **Embeddings**: Token IDs ko high-dimensional vector space mein project karna.\n- **Attention Matrix**: Calculate karna ki 'bank' word ka relation 'river' se hai ya 'finance' se!`;
  }

  return `🎓 **Ada 3.0 Answer:**\nAapka sawal "${questionText}" computer architecture ka important topic hai! Computer hardware level par ye silicon transistors, voltage signals (0V/5V), aur binary opcodes (0/1) ke dwara execute hota hai.\n\nKya aap is concept ke visual simulation ko Module browser mein test karna chahenge?`;
}

export const useMentorStore = create<MentorStore>((set) => ({
  isOpen: false,
  messages: [
    {
      id: 'm-1',
      sender: 'ADA',
      timestamp: Date.now() - 3600000,
      text: 'Namaste! Main **Ada 3.0** hoon — aapka Socratic AI Mentor. Aap mujhse computer architecture, voltage levels, CMOS, gates, ALU, RAM, ya compilers ke baare mein koi bhi sawal puch sakte hain!',
      type: 'REVISION_ALERT',
    },
  ],
  adaMemory: {
    completedLessonsCount: 8,
    weakTopics: ['Carry Ripple Propagation Delay', 'DRAM Refresh Cycle'],
    strongTopics: ['CMOS Transistor Inverter', 'XOR Truth Table'],
    failedQuizCount: 1,
    preferredLanguage: 'HINGLISH',
    lastReviewedDate: new Date().toISOString().split('T')[0],
    revisionSchedule: {
      'cmos-inverter': 7,
      'full-adder': 3,
    },
  },
  isExplainModalOpen: false,
  inspectTarget: null,

  toggleDrawer: () => set((state) => ({ isOpen: !state.isOpen })),

  sendMessage: (text) => {
    const userMsg: MentorMessage = {
      id: `u-${Date.now()}`,
      sender: 'USER',
      timestamp: Date.now(),
      text,
    };

    set((state) => ({ messages: [...state.messages, userMsg] }));

    // Dynamic Socratic AI response with real deep knowledge
    setTimeout(() => {
      const replyText = generateAdaResponse(text);

      const adaMsg: MentorMessage = {
        id: `a-${Date.now()}`,
        sender: 'ADA',
        timestamp: Date.now(),
        text: replyText,
        type: 'QUESTION',
      };
      set((state) => ({ messages: [...state.messages, adaMsg] }));
    }, 600);
  },

  openExplainModal: (targetName) => set({ isExplainModalOpen: true, inspectTarget: targetName }),
  closeExplainModal: () => set({ isExplainModalOpen: false, inspectTarget: null }),
}));
