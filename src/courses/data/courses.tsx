import { lazy } from 'react';
import type { Course } from '../types';

// Lazy-loaded section components — one chunk per course
// Course 1
const S1_History = lazy(() => import('../sections/S1_History'));
const S2_CPUBasics = lazy(() => import('../sections/S2_CPUBasics'));
const S3_LogicGates = lazy(() => import('../sections/S3_LogicGates'));
const S4_BinaryMath = lazy(() => import('../sections/S4_BinaryMath'));
const S5_CPUArch = lazy(() => import('../sections/S5_CPUArch'));
const S6_Assembly = lazy(() => import('../sections/S6_Assembly'));
const S7_Compilers = lazy(() => import('../sections/S7_Compilers'));
const S8_Capstone = lazy(() => import('../sections/S8_Capstone'));

// Course 4: Digital Logic Design
const S1_BasicGates = lazy(() => import('../sections/S1_BasicGates'));
const S2_UniversalGates = lazy(() => import('../sections/S2_UniversalGates'));
const S3_CombinationalLogic = lazy(() => import('../sections/S3_CombinationalLogic'));
const S4_SequentialLogic = lazy(() => import('../sections/S4_SequentialLogic'));
const S5_FSM = lazy(() => import('../sections/S5_FSM'));
const S6_ALUDesign = lazy(() => import('../sections/S6_ALUDesign'));
const S7_Capstone_LogicGates = lazy(() => import('../sections/S7_Capstone_LogicGates'));

// Course 5: Binary Math
const S1_NumberSystems = lazy(() => import('../sections/S1_NumberSystems'));
const S2_BinaryArithmetic = lazy(() => import('../sections/S2_BinaryArithmetic'));
const S3_Representations = lazy(() => import('../sections/S3_Representations'));
const S4_BitwiseOps = lazy(() => import('../sections/S4_BitwiseOps'));
const S5_Capstone_Binary = lazy(() => import('../sections/S5_Capstone_Binary'));

// Course 6: CPU Architecture
const S1_ISA = lazy(() => import('../sections/S1_ISA'));
const S2_Microarchitecture = lazy(() => import('../sections/S2_Microarchitecture'));
const S3_Pipelining = lazy(() => import('../sections/S3_Pipelining'));
const S4_MemoryHierarchy = lazy(() => import('../sections/S4_MemoryHierarchy'));
const S5_Capstone_CPU = lazy(() => import('../sections/S5_Capstone_CPU'));

// Course 7: Assembly Language
const S1_AssemblyIntro = lazy(() => import('../sections/S1_AssemblyIntro'));
const S2_RegistersMemory = lazy(() => import('../sections/S2_RegistersMemory'));
const S3_ControlFlow = lazy(() => import('../sections/S3_ControlFlow'));
const S4_HelloWorld = lazy(() => import('../sections/S4_HelloWorld'));
const S5_Capstone_Assembly = lazy(() => import('../sections/S5_Capstone_Assembly'));

// Course 8: Compilers
const S1_CompilerPipeline = lazy(() => import('../sections/S1_CompilerPipeline'));
const S2_LexerParser = lazy(() => import('../sections/S2_LexerParser'));
const S3_CodegenOptimization = lazy(() => import('../sections/S3_CodegenOptimization'));
const S4_InterpreterBasics = lazy(() => import('../sections/S4_InterpreterBasics'));
const S5_Capstone_Compilers = lazy(() => import('../sections/S5_Capstone_Compilers'));

// Course 9: Interpreters
const S1_InterpreterArch = lazy(() => import('../sections/S1_InterpreterArch'));
const S2_PythonVM = lazy(() => import('../sections/S2_PythonVM'));
const S3_JITCompilation = lazy(() => import('../sections/S3_JITCompilation'));
const S4_Capstone_Interpreters = lazy(() => import('../sections/S4_Capstone_Interpreters'));

// Course 10: JS Engine
const S1_V8Pipeline = lazy(() => import('../sections/S1_V8Pipeline'));
const S2_EventLoop = lazy(() => import('../sections/S2_EventLoop'));
const S3_HiddenClassesIC = lazy(() => import('../sections/S3_HiddenClassesIC'));
const S4_Capstone_JSEngine = lazy(() => import('../sections/S4_Capstone_JSEngine'));

// Course 11: TypeScript
const S1_TypeSystem = lazy(() => import('../sections/S1_TypeSystem'));
const S2_TypescriptTypes = lazy(() => import('../sections/S2_TypescriptTypes'));

// Course 12: Browser
const S1_BrowserRendering = lazy(() => import('../sections/S1_BrowserRendering'));
const S2_DevTools = lazy(() => import('../sections/S2_DevTools'));

// Course 13: Networking
const S1_NetworkingBasics = lazy(() => import('../sections/S1_NetworkingBasics'));
const S2_Protocols = lazy(() => import('../sections/S2_Protocols'));

// Course 14: Databases
const S1_DatabaseFundamentals = lazy(() => import('../sections/S1_DatabaseFundamentals'));

// Course 15: Algorithms
const S1_AlgorithmBasics = lazy(() => import('../sections/S1_AlgorithmBasics'));
const S2_SortingAlgorithms = lazy(() => import('../sections/S2_SortingAlgorithms'));
const S3_SearchingGraphs = lazy(() => import('../sections/S3_SearchingGraphs'));

// Course 16: Data Structures
const S1_DataStructures = lazy(() => import('../sections/S1_DataStructures'));
const S2_TreesHashTables = lazy(() => import('../sections/S2_TreesHashTables'));

// Course 17: Software Engineering
const S1_SEPrinciples = lazy(() => import('../sections/S1_SEPrinciples'));
const S2_TestingCICD = lazy(() => import('../sections/S2_TestingCICD'));

// Course 18: AI
const S1_AIIntro = lazy(() => import('../sections/S1_AIIntro'));
const S2_NeuralNetworks = lazy(() => import('../sections/S2_NeuralNetworks'));
const S3_MLConcepts = lazy(() => import('../sections/S3_MLConcepts'));

// Course 19: LLMs
const S1_LLMs = lazy(() => import('../sections/S1_LLMs'));

// Course 20: GPU
const S1_GPU = lazy(() => import('../sections/S1_GPU'));

// Course 21: How AI Learns
const S1_HowAILearns = lazy(() => import('../sections/S1_HowAILearns'));

// Course 22: Build Everything
const S1_BuildEverything = lazy(() => import('../sections/S1_BuildEverything'));

// Shared capstone
const S3_Capstone = lazy(() => import('../sections/S3_Capstone'));

const quizMCQ = (q: string, opts: string[], correct: number, explanation: string) => ({
  id: Math.random().toString(36).slice(2, 8),
  type: 'MCQ' as const,
  question: q,
  options: opts,
  correct,
  explanation,
});

const quizFill = (q: string, correct: string, explanation: string) => ({
  id: Math.random().toString(36).slice(2, 8),
  type: 'FILL_BLANK' as const,
  question: q,
  correct,
  explanation,
});

export const COURSES: Course[] = [
  // ═══════════════════════════════════════════════════
  // COURSE 1: What is a Computer?
  // ═══════════════════════════════════════════════════
  {
    id: 'what-is-a-computer',
    number: 1,
    title: 'What is a Computer?',
    subtitle: 'From Electricity to Silicon',
    description: 'Understand electricity, binary, logic gates, transistors, and how they combine to create computers.',
    icon: 'Computer',
    color: '#3b82f6',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-history', title: 'History of Computing', subtitle: 'Abacus to Modern CPUs', duration: '25 min', component: <S1_History />, quiz: [quizMCQ('Which is the oldest computing device?', ['Abacus', 'ENIAC', 'Apple II', 'Vacuum Tube'], 0, 'The Abacus dates back to ~2400 BC.')] },
      { id: 's2-cpu-basics', title: 'How a CPU Works', subtitle: 'Fetch → Decode → Execute', duration: '30 min', component: <S2_CPUBasics />, quiz: [quizMCQ('What is the first step of CPU cycle?', ['Fetch', 'Decode', 'Execute', 'Store'], 0, 'The CPU first fetches the next instruction.')] },
      { id: 's3-logic-gates', title: 'Logic Gates', subtitle: 'Building Blocks of Computing', duration: '35 min', component: <S3_LogicGates />, quiz: [quizMCQ('Which gate outputs 1 only when BOTH inputs are 1?', ['AND', 'OR', 'NOT', 'XOR'], 0, 'The AND gate outputs 1 only when both inputs are 1.')] },
      { id: 's4-binary', title: 'Binary Math', subtitle: 'Why Computers Think in 0s and 1s', duration: '30 min', component: <S4_BinaryMath />, quiz: [quizMCQ('How many values can one bit represent?', ['2', '8', '16', '256'], 0, 'A single bit = 0 or 1 = 2 values.')] },
      { id: 's5-cpu-arch', title: 'CPU Architecture', subtitle: 'ALU, Control Unit, Registers, Cache', duration: '35 min', component: <S5_CPUArch />, quiz: [quizMCQ('What are registers?', ['Fast storage inside CPU', 'Hard drive sectors', 'RAM modules', 'USB ports'], 0, 'Registers are tiny, fast storage inside the CPU.')] },
      { id: 's6-assembly', title: 'Assembly Language', subtitle: 'Closest to Machine Code', duration: '30 min', component: <S6_Assembly />, quiz: [quizMCQ('What does MOV do?', ['Copies data', 'Adds numbers', 'Stops CPU', 'Multiplies'], 0, 'MOV copies data from one location to another.')] },
      { id: 's7-compilers', title: 'Compilers & Interpreters', subtitle: 'How Code Becomes Instructions', duration: '30 min', component: <S7_Compilers />, quiz: [quizMCQ('What does a compiler do?', ['Translates entire code at once', 'Executes line by line', 'Deletes code', 'Writes code'], 0, 'A compiler translates the entire source code at once.')] },
      { id: 's8-capstone', title: 'Course 1 Capstone', subtitle: 'Test Your Knowledge', duration: '20 min', component: <S8_Capstone />, quiz: [quizMCQ('Correct evolution order?', ['Abacus → Vacuum Tubes → Transistors → ICs', 'Transistors → Abacus', 'ICs → Transistors', 'Vacuum Tubes → Abacus'], 0, 'Mechanical → vacuum tubes → transistors → ICs.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 2: How CPUs Work
  // ═══════════════════════════════════════════════════
  {
    id: 'how-cpus-work',
    number: 2,
    title: 'How CPUs Work',
    subtitle: 'The Brain of the Computer',
    description: 'Dive inside the CPU — ALU, registers, control unit, instruction cycle, pipelining, and caches.',
    icon: 'Cpu',
    color: '#8b5cf6',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-cpu-anatomy', title: 'CPU Anatomy', subtitle: 'Inside the Brain', duration: '30 min', component: <S5_CPUArch />, quiz: [quizMCQ('What does the ALU do?', ['Performs arithmetic and logic', 'Stores data', 'Fetches instructions', 'Manages memory'], 0, 'ALU = Arithmetic Logic Unit.')] },
      { id: 's2-alu', title: 'ALU Deep Dive', subtitle: 'The Calculator Inside', duration: '35 min', component: <S2_CPUBasics />, quiz: [quizMCQ('What does the Zero Flag indicate?', ['Result is zero', 'Result is negative', 'Overflow', 'Carry'], 0, 'Zero Flag set when result = 0.')] },
      { id: 's3-registers', title: 'Registers', subtitle: 'Fast Temporary Storage', duration: '25 min', component: <S5_CPUArch />, quiz: [quizMCQ('Why are registers faster than RAM?', ['Inside the CPU', 'Magnetic storage', 'Bigger', 'USB'], 0, 'Registers are physically inside the CPU.')] },
      { id: 's4-instruction-cycle', title: 'Instruction Cycle', subtitle: 'Fetch → Decode → Execute', duration: '35 min', component: <S2_CPUBasics />, quiz: [quizMCQ('First step of instruction cycle?', ['Fetch', 'Decode', 'Execute', 'Writeback'], 0, 'CPU first fetches instruction from memory.')] },
      { id: 's5-pipelining', title: 'Pipelining', subtitle: 'Overlapping Instructions', duration: '30 min', component: <S5_CPUArch />, quiz: [quizMCQ('Classic RISC pipeline stages?', ['5', '3', '7', '10'], 0, '5 stages: Fetch, Decode, Execute, Memory, Writeback.')] },
      { id: 's6-caches', title: 'CPU Caches', subtitle: 'L1, L2, L3 — Speed Layers', duration: '30 min', component: <S5_CPUArch />, quiz: [quizMCQ('Which cache is fastest?', ['L1', 'L2', 'L3', 'RAM'], 0, 'L1 is smallest and fastest.')] },
      { id: 's7-capstone', title: 'Course 2 Capstone', subtitle: 'Build a Virtual CPU', duration: '25 min', component: <S3_Capstone />, quiz: [quizMCQ('What is the Program Counter?', ['Holds next instruction address', 'Counts errors', 'Stores ALU result', 'Manages input'], 0, 'PC holds address of next instruction.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 3: Memory & Storage
  // ═══════════════════════════════════════════════════
  {
    id: 'memory-and-storage',
    number: 3,
    title: 'Memory & Storage',
    subtitle: 'How Computers Remember',
    description: 'SRAM, DRAM, caches, SSDs, HDDs — why RAM forgets but SSDs remember.',
    icon: 'Database',
    color: '#22c55e',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-memory-hierarchy', title: 'Memory Hierarchy', subtitle: 'Speed vs Size', duration: '25 min', component: <S4_MemoryHierarchy />, quiz: [quizMCQ('Why does memory hierarchy exist?', ['Balance speed and cost', 'Confuse programmers', 'Waste space', 'Decoration'], 0, 'Fast memory is expensive, slow is cheap.')] },
      { id: 's2-sram-dram', title: 'SRAM vs DRAM', subtitle: 'Two Ways to Store Bits', duration: '30 min', component: <S4_MemoryHierarchy />, quiz: [quizMCQ('How many transistors in SRAM cell?', ['6', '1', '4', '8'], 0, 'SRAM uses 6 transistors per bit.')] },
      { id: 's3-cache', title: 'Cache Mechanics', subtitle: 'Hits, Misses & Eviction', duration: '35 min', component: <S4_MemoryHierarchy />, quiz: [quizMCQ('What is a cache hit?', ['Data found in cache', 'Cache full', 'CPU overheated', 'Memory corrupted'], 0, 'Cache hit = data found in cache.')] },
      { id: 's4-storage', title: 'Storage Devices', subtitle: 'HDD, SSD, NVMe', duration: '30 min', component: <S4_MemoryHierarchy />, quiz: [quizMCQ('Why does SSD remember after power off?', ['Flash memory cells', 'Battery', 'Magnetic disks', 'Vacuum tubes'], 0, 'SSDs use NAND flash memory.')] },
      { id: 's5-capstone', title: 'Course 3 Capstone', subtitle: 'Build a Memory Simulator', duration: '25 min', component: <S3_Capstone />, quiz: [quizMCQ('Fastest memory type?', ['CPU Registers', 'L3 Cache', 'RAM', 'SSD'], 0, 'CPU registers are fastest.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 4: Digital Logic Design
  // ═══════════════════════════════════════════════════
  {
    id: 'digital-logic-design',
    number: 4,
    title: 'Digital Logic Design',
    subtitle: 'From Gates to Circuits',
    description: 'Master logic gates, combinational/sequential circuits, FSMs, and ALU design.',
    icon: 'Zap',
    color: '#f59e0b',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-basic-gates', title: 'AND, OR, NOT Gates', subtitle: 'Fundamental Gates', duration: '25 min', component: <S1_BasicGates />, quiz: [quizMCQ('Which gate needs both inputs 1?', ['AND', 'OR', 'NOT', 'XOR'], 0, 'AND = both inputs must be 1.')] },
      { id: 's2-universal-gates', title: 'NAND, NOR, XOR', subtitle: 'Universal Gates', duration: '30 min', component: <S2_UniversalGates />, quiz: [quizMCQ('Which gate is universal?', ['NAND', 'AND', 'OR', 'NOT'], 0, 'NAND can build any logic circuit.')] },
      { id: 's3-combinational', title: 'Combinational Logic', subtitle: 'Adders, MUX, Decoders', duration: '35 min', component: <S3_CombinationalLogic />, quiz: [quizMCQ('What does a half adder compute?', ['Sum + Carry of 2 bits', 'Product', 'Difference', 'Quotient'], 0, 'Half adder: Sum = A XOR B, Carry = A AND B.')] },
      { id: 's4-sequential', title: 'Sequential Logic', subtitle: 'Flip-Flops & Registers', duration: '35 min', component: <S4_SequentialLogic />, quiz: [quizMCQ('What allows a circuit to remember?', ['Feedback loop', 'Battery', 'Wire', 'Transistor alone'], 0, 'Feedback loops in flip-flops store data.')] },
      { id: 's5-fsm', title: 'Finite State Machines', subtitle: 'States & Transitions', duration: '30 min', component: <S5_FSM />, quiz: [quizMCQ('Output depends on state AND input?', ['Mealy', 'Moore', 'FSM', 'ALU'], 0, 'Mealy machine output depends on state + input.')] },
      { id: 's6-alu-design', title: 'ALU Design', subtitle: 'Building the Calculator', duration: '35 min', component: <S6_ALUDesign />, quiz: [quizMCQ('What does XOR do in an adder?', ['Generates sum bit', 'Generates carry', 'Inverts input', 'Stores result'], 0, 'XOR generates the sum bit.')] },
      { id: 's7-capstone', title: 'Course 4 Capstone', subtitle: 'Build a Complete CPU', duration: '25 min', component: <S7_Capstone_LogicGates />, quiz: [quizMCQ('Combinational vs sequential?', ['Output = f(inputs) vs f(inputs, state)', 'Same thing', 'Sequential is faster', 'Combinational has memory'], 0, 'Combinational: no memory. Sequential: has memory.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 5: Binary Math & Number Systems
  // ═══════════════════════════════════════════════════
  {
    id: 'binary-math',
    number: 5,
    title: 'Binary Math & Number Systems',
    subtitle: 'The Language of Computers',
    description: 'Number systems, binary arithmetic, signed representations, IEEE 754 floats, and bitwise operations.',
    icon: 'Binary',
    color: '#06b6d4',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-number-systems', title: 'Number Systems', subtitle: 'Decimal, Binary, Hex', duration: '25 min', component: <S1_NumberSystems />, quiz: [quizMCQ('What base is hexadecimal?', ['16', '10', '2', '8'], 0, 'Hexadecimal = base 16.')] },
      { id: 's2-binary-arith', title: 'Binary Arithmetic', subtitle: 'Add, Subtract in Binary', duration: '30 min', component: <S2_BinaryArithmetic />, quiz: [quizMCQ('What is 1+1 in binary?', ['10', '2', '11', '0'], 0, '1+1 = 10 in binary (carry).')] },
      { id: 's3-representations', title: 'Signed Numbers & Floats', subtitle: "Two's Complement & IEEE 754", duration: '35 min', component: <S3_Representations />, quiz: [quizMCQ('MSB in signed binary represents?', ['Sign (0=pos, 1=neg)', 'Value', 'Decimal', 'Nothing'], 0, 'Most significant bit is the sign bit.')] },
      { id: 's4-bitwise', title: 'Bitwise Operations', subtitle: 'AND, OR, XOR, Shift', duration: '30 min', component: <S4_BitwiseOps />, quiz: [quizMCQ('What does << 1 do?', ['Multiply by 2', 'Divide by 2', 'Add 1', 'Subtract 1'], 0, 'Left shift by 1 = multiply by 2.')] },
      { id: 's5-capstone', title: 'Course 5 Capstone', subtitle: 'Binary Mastery', duration: '20 min', component: <S5_Capstone_Binary />, quiz: [quizMCQ('1010 in decimal?', ['10', '12', '8', '2'], 0, '8+0+2+0 = 10.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 6: CPU Architecture
  // ═══════════════════════════════════════════════════
  {
    id: 'cpu-architecture',
    number: 6,
    title: 'CPU Architecture',
    subtitle: 'ISA, Microarchitecture & Pipelining',
    description: 'CISC vs RISC, microarchitecture, pipelining, branch prediction, memory hierarchy.',
    icon: 'Cpu',
    color: '#ef4444',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-isa', title: 'Instruction Set Architecture', subtitle: 'CISC vs RISC', duration: '30 min', component: <S1_ISA />, quiz: [quizMCQ('ARM uses which architecture?', ['RISC', 'CISC', 'VLIW', 'EPIC'], 0, 'ARM = RISC architecture.')] },
      { id: 's2-microarch', title: 'Microarchitecture', subtitle: 'How ISA is Implemented', duration: '35 min', component: <S2_Microarchitecture />, quiz: [quizMCQ('What is branch prediction?', ['Guessing jump direction', 'Calculating addresses', 'Storing results', 'Fetching data'], 0, 'Branch prediction guesses which way branches go.')] },
      { id: 's3-pipelining', title: 'Pipelining Deep Dive', subtitle: 'Hazards & Solutions', duration: '35 min', component: <S3_Pipelining />, quiz: [quizMCQ('What is a data hazard?', ['Instruction needs result not yet ready', 'Memory full', 'Cache miss', 'Stack overflow'], 0, 'Data hazard: dependent instruction needs result.')] },
      { id: 's4-memory-hier', title: 'Memory Hierarchy', subtitle: 'Registers → Cache → RAM → SSD', duration: '30 min', component: <S4_MemoryHierarchy />, quiz: [quizMCQ('What is temporal locality?', ['Recently accessed data likely accessed again', 'Nearby data accessed', 'Sequential access', 'Random access'], 0, 'Temporal = recent accesses tend to repeat.')] },
      { id: 's5-capstone', title: 'Course 6 Capstone', subtitle: 'CPU Mastery', duration: '25 min', component: <S5_Capstone_CPU />, quiz: [quizMCQ('CISC vs RISC?', ['Complex vs Simple instructions', 'Same thing', 'RISC is slower', 'CISC is newer'], 0, 'CISC: complex. RISC: simple, fixed-length.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 7: Assembly Language
  // ═══════════════════════════════════════════════════
  {
    id: 'assembly-language',
    number: 7,
    title: 'Assembly Language',
    subtitle: 'The Closest to Machine Code',
    description: 'x86 assembly instructions, registers, memory addressing, control flow, and system calls.',
    icon: 'Code',
    color: '#10b981',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-asm-intro', title: 'Assembly Basics', subtitle: 'Instructions & Syntax', duration: '30 min', component: <S1_AssemblyIntro />, quiz: [quizMCQ('What does PUSH do?', ['Push to stack', 'Pop from stack', 'Add values', 'Compare'], 0, 'PUSH stores data on the stack.')] },
      { id: 's2-reg-mem', title: 'Registers & Memory', subtitle: 'x86 Register Set', duration: '30 min', component: <S2_RegistersMemory />, quiz: [quizMCQ('Which register holds the instruction pointer?', ['EIP', 'EAX', 'EBX', 'ESP'], 0, 'EIP = Extended Instruction Pointer.')] },
      { id: 's3-control-flow', title: 'Control Flow', subtitle: 'Jumps, Loops, Functions', duration: '35 min', component: <S3_ControlFlow />, quiz: [quizMCQ('What does CALL do?', ['Push return addr + jump', 'Just jump', 'Return', 'Stop CPU'], 0, 'CALL pushes return address then jumps.')] },
      { id: 's4-hello-world', title: 'Hello World', subtitle: 'Linux System Calls', duration: '25 min', component: <S4_HelloWorld />, quiz: [quizMCQ('What is int 0x80?', ['Linux syscall interrupt', 'Error', 'Math operation', 'NOP'], 0, 'int 0x80 triggers Linux kernel syscall.')] },
      { id: 's5-capstone', title: 'Course 7 Capstone', subtitle: 'Assembly Mastery', duration: '20 min', component: <S5_Capstone_Assembly />, quiz: [quizMCQ('MOV vs LEA?', ['Copy data vs Calculate address', 'Same thing', 'LEA is faster', 'MOV is deprecated'], 0, 'MOV copies. LEA computes address without memory access.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 8: Compilers
  // ═══════════════════════════════════════════════════
  {
    id: 'compilers',
    number: 8,
    title: 'Compilers',
    subtitle: 'From Source to Machine Code',
    description: 'Lexing, parsing, AST, semantic analysis, optimization, and code generation.',
    icon: 'FileCode',
    color: '#ec4899',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-compiler-pipeline', title: 'Compiler Pipeline', subtitle: '6 Phases of Compilation', duration: '30 min', component: <S1_CompilerPipeline />, quiz: [quizMCQ('First phase of compilation?', ['Lexical Analysis', 'Code Generation', 'Optimization', 'Parsing'], 0, 'Lexical analysis = tokenizing.')] },
      { id: 's2-lexer-parser', title: 'Lexing & Parsing', subtitle: 'Tokens → AST', duration: '35 min', component: <S2_LexerParser />, quiz: [quizMCQ('What does a parser produce?', ['AST', 'Tokens', 'Machine code', 'Binary'], 0, 'Parser produces Abstract Syntax Tree.')] },
      { id: 's3-codegen', title: 'Code Gen & Optimization', subtitle: 'Fast Machine Code', duration: '35 min', component: <S3_CodegenOptimization />, quiz: [quizMCQ('What is constant folding?', ['Evaluate at compile time', 'Fold paper', 'Run at runtime', 'Delete code'], 0, 'Constant folding evaluates expressions at compile time.')] },
      { id: 's4-interpreters', title: 'Interpreter Basics', subtitle: 'Line by Line Execution', duration: '30 min', component: <S4_InterpreterBasics />, quiz: [quizMCQ('Interpreter advantage?', ['Instant feedback', 'Faster execution', 'Less memory', 'Better optimization'], 0, 'Interpreters give immediate feedback.')] },
      { id: 's5-capstone', title: 'Course 8 Capstone', subtitle: 'Compiler Mastery', duration: '25 min', component: <S5_Capstone_Compilers />, quiz: [quizMCQ('What is JIT?', ['Compile at runtime', 'Compile before run', 'Interpret only', 'Delete code'], 0, 'JIT = Just-In-Time compilation at runtime.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 9: Interpreters & Runtime Systems
  // ═══════════════════════════════════════════════════
  {
    id: 'interpreters',
    number: 9,
    title: 'Interpreters & Runtime Systems',
    subtitle: 'Tree-Walk, Bytecode VMs, JIT',
    description: 'Interpreter architectures, Python PVM, JIT compilation, and runtime optimization.',
    icon: 'Play',
    color: '#a855f7',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-interp-arch', title: 'Interpreter Architecture', subtitle: 'Three Strategies', duration: '30 min', component: <S1_InterpreterArch />, quiz: [quizMCQ('Fastest interpreter type?', ['JIT', 'Tree-Walk', 'Bytecode VM', 'All same'], 0, 'JIT compiles hot paths to native code.')] },
      { id: 's2-python-vm', title: 'Python Virtual Machine', subtitle: 'Source → Bytecode → PVM', duration: '35 min', component: <S2_PythonVM />, quiz: [quizMCQ('What does Python compile to?', ['Bytecode', 'Machine code', 'Assembly', 'HTML'], 0, 'Python compiles to .pyc bytecode files.')] },
      { id: 's3-jit', title: 'JIT Compilation', subtitle: 'Runtime Native Code', duration: '35 min', component: <S3_JITCompilation />, quiz: [quizMCQ('What triggers JIT compilation?', ['Hot code paths', 'Cold code', 'All code', 'Errors'], 0, 'JIT compiles functions called frequently.')] },
      { id: 's4-capstone', title: 'Course 9 Capstone', subtitle: 'Interpreter Mastery', duration: '20 min', component: <S4_Capstone_Interpreters />, quiz: [quizMCQ('Why is Python slower than C?', ['Interprets bytecode vs direct machine code', 'Different hardware', 'Older technology', 'Less memory'], 0, 'Python interprets bytecode; C compiles to machine code.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 10: JavaScript Engine
  // ═══════════════════════════════════════════════════
  {
    id: 'js-engine',
    number: 10,
    title: 'JavaScript Engine',
    subtitle: 'V8, Ignition, TurboFan',
    description: 'How V8 executes JS at lightning speed — parsing, Ignition, TurboFan, hidden classes.',
    icon: 'Braces',
    color: '#eab308',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-v8-pipeline', title: 'V8 Pipeline', subtitle: 'Ignition + TurboFan', duration: '30 min', component: <S1_V8Pipeline />, quiz: [quizMCQ('V8 interpreter is called?', ['Ignition', 'TurboFan', 'Hermes', 'SpiderMonkey'], 0, 'Ignition = V8 interpreter.')] },
      { id: 's2-event-loop', title: 'Event Loop', subtitle: 'Async on Single Thread', duration: '35 min', component: <S2_EventLoop />, quiz: [quizMCQ('JavaScript is single-threaded but?', ['Non-blocking', 'Parallel', 'Multi-core', 'Synchronous'], 0, 'JS is single-threaded with non-blocking event loop.')] },
      { id: 's3-hidden-classes', title: 'Hidden Classes & IC', subtitle: 'V8 Optimization Tricks', duration: '30 min', component: <S3_HiddenClassesIC />, quiz: [quizMCQ('Hidden classes optimize?', ['Property access', 'Function calls', 'Memory allocation', 'Garbage collection'], 0, 'Hidden classes make property access fast.')] },
      { id: 's4-capstone', title: 'Course 10 Capstone', subtitle: 'JS Engine Mastery', duration: '20 min', component: <S4_Capstone_JSEngine />, quiz: [quizMCQ('TurboFan is a?', ['JIT compiler', 'Interpreter', 'Parser', 'Debugger'], 0, 'TurboFan = V8 JIT optimizing compiler.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 11: TypeScript
  // ═══════════════════════════════════════════════════
  {
    id: 'typescript',
    number: 11,
    title: 'TypeScript',
    subtitle: 'Type-Safe JavaScript',
    description: 'Type systems, interfaces, generics, utility types, and the TypeScript compiler.',
    icon: 'FileCode',
    color: '#3b82f6',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-type-system', title: 'Type Systems', subtitle: 'Static vs Dynamic, Strong vs Weak', duration: '30 min', component: <S1_TypeSystem />, quiz: [quizMCQ('TypeScript uses?', ['Static typing', 'Dynamic typing', 'No typing', 'Weak typing'], 0, 'TypeScript adds static typing to JavaScript.')] },
      { id: 's2-ts-types', title: 'TypeScript Types', subtitle: 'Interfaces, Generics, Unions', duration: '35 min', component: <S2_TypescriptTypes />, quiz: [quizMCQ('What does "any" type mean?', ['Anything goes — no type checking', 'Only numbers', 'Only strings', 'Only objects'], 0, 'any disables type checking.')] },
      { id: 's3-capstone', title: 'Course 11 Capstone', subtitle: 'TypeScript Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ('TypeScript compiles to?', ['JavaScript', 'Machine code', 'Bytecode', 'Python'], 0, 'TypeScript compiles to plain JavaScript.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 12: Web Browser Internals
  // ═══════════════════════════════════════════════════
  {
    id: 'browser-internals',
    number: 12,
    title: 'Web Browser Internals',
    subtitle: 'Rendering Pipeline & DevTools',
    description: 'HTML parsing, CSS rendering, JavaScript execution, DevTools, and performance optimization.',
    icon: 'Globe',
    color: '#0ea5e9',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-rendering', title: 'Rendering Pipeline', subtitle: 'HTML → Pixels', duration: '35 min', component: <S1_BrowserRendering />, quiz: [quizMCQ('What comes after DOM + CSSOM?', ['Render Tree', 'Layout', 'Paint', 'Composite'], 0, 'DOM + CSSOM = Render Tree.')] },
      { id: 's2-devtools', title: 'Browser DevTools', subtitle: 'Performance & Debugging', duration: '30 min', component: <S2_DevTools />, quiz: [quizMCQ('Which panel records runtime performance?', ['Performance', 'Elements', 'Console', 'Network'], 0, 'Performance panel records CPU/memory profiles.')] },
      { id: 's3-capstone', title: 'Course 12 Capstone', subtitle: 'Browser Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ('What does Layout (Reflow) calculate?', ['Element positions and sizes', 'Colors', 'Fonts', 'JavaScript'], 0, 'Layout calculates exact positions and sizes.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 13: Computer Networking
  // ═══════════════════════════════════════════════════
  {
    id: 'networking',
    number: 13,
    title: 'Computer Networking',
    subtitle: 'TCP/IP, HTTP, DNS & Beyond',
    description: 'Network protocols, TCP/IP stack, HTTP, DNS, TLS, load balancing, and CDNs.',
    icon: 'Network',
    color: '#14b8a6',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-networking-basics', title: 'Networking Fundamentals', subtitle: 'TCP/IP, HTTP, DNS', duration: '35 min', component: <S1_NetworkingBasics />, quiz: [quizMCQ('What does DNS do?', ['Domain → IP address', 'Encrypts data', 'Compresses files', 'Stores passwords'], 0, 'DNS resolves domain names to IP addresses.')] },
      { id: 's2-protocols', title: 'Network Protocols', subtitle: 'TLS, NAT, CDN, Firewalls', duration: '35 min', component: <S2_Protocols />, quiz: [quizMCQ('What does NAT do?', ['Translates private ↔ public IPs', 'Encrypts data', 'Loads websites', 'Stores cookies'], 0, 'NAT = Network Address Translation.')] },
      { id: 's3-capstone', title: 'Course 13 Capstone', subtitle: 'Networking Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ('HTTPS uses which protocol for encryption?', ['TLS', 'HTTP', 'TCP', 'UDP'], 0, 'HTTPS = HTTP + TLS encryption.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 14: Databases
  // ═══════════════════════════════════════════════════
  {
    id: 'databases',
    number: 14,
    title: 'Databases',
    subtitle: 'SQL, NoSQL & Data Modeling',
    description: 'Relational databases, SQL, normalization, NoSQL, indexing, and transaction management.',
    icon: 'Database',
    color: '#f97316',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-db-fundamentals', title: 'Database Fundamentals', subtitle: 'SQL vs NoSQL', duration: '35 min', component: <S1_DatabaseFundamentals />, quiz: [quizMCQ('ACID stands for?', ['Atomicity, Consistency, Isolation, Durability', 'Add, Count, Index, Delete', 'All data is safe', 'Always consistent'], 0, 'ACID ensures reliable transactions.')] },
      { id: 's2-capstone', title: 'Course 14 Capstone', subtitle: 'Database Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ('What is a database index?', ['Data structure for fast lookups', 'A table', 'A query', 'A backup'], 0, 'Indexes (usually B-trees) speed up queries.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 15: Algorithms
  // ═══════════════════════════════════════════════════
  {
    id: 'algorithms',
    number: 15,
    title: 'Algorithms',
    subtitle: 'Sorting, Searching & Graph Theory',
    description: 'Big O notation, sorting algorithms, searching, BFS/DFS, Dijkstra, and dynamic programming.',
    icon: 'GitBranch',
    color: '#6366f1',
    totalDuration: '6 hours',
    sections: [
      { id: 's1-algo-basics', title: 'Algorithm Basics', subtitle: 'Big O Notation', duration: '30 min', component: <S1_AlgorithmBasics />, quiz: [quizMCQ('Best possible time complexity?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'O(1) = constant time, best possible.')] },
      { id: 's2-sorting', title: 'Sorting Algorithms', subtitle: 'Bubble to Quick Sort', duration: '35 min', component: <S2_SortingAlgorithms />, quiz: [quizMCQ('Fastest average-case sort?', ['Quick Sort', 'Bubble Sort', 'Selection Sort', 'Insertion Sort'], 0, 'Quick Sort is fastest on average.')] },
      { id: 's3-searching', title: 'Searching & Graphs', subtitle: 'Binary Search, BFS, DFS', duration: '40 min', component: <S3_SearchingGraphs />, quiz: [quizMCQ('Binary search requires?', ['Sorted array', 'Any array', 'Linked list', 'Tree'], 0, 'Binary search needs sorted data.')] },
      { id: 's4-capstone', title: 'Course 15 Capstone', subtitle: 'Algorithm Mastery', duration: '25 min', component: <S3_Capstone />, quiz: [quizMCQ('What is dynamic programming?', ['Optimal substructure + overlapping subproblems', 'Random guessing', 'Linear search', 'Bubble sort'], 0, 'DP solves problems by breaking into overlapping subproblems.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 16: Data Structures
  // ═══════════════════════════════════════════════════
  {
    id: 'data-structures',
    number: 16,
    title: 'Data Structures',
    subtitle: 'Arrays, Trees, Hash Tables & More',
    description: 'Arrays, linked lists, stacks, queues, trees, heaps, tries, hash tables, and graphs.',
    icon: 'Layers',
    color: '#8b5cf6',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-ds-fundamentals', title: 'Fundamental Data Structures', subtitle: 'Arrays, Lists, Stacks, Queues', duration: '30 min', component: <S1_DataStructures />, quiz: [quizMCQ('Best data structure for LIFO?', ['Stack', 'Queue', 'Array', 'Hash Table'], 0, 'Stack = Last In, First Out.')] },
      { id: 's2-trees-hash', title: 'Trees & Hash Tables', subtitle: 'BST, Heap, Trie, HashMap', duration: '35 min', component: <S2_TreesHashTables />, quiz: [quizMCQ('Hash table average lookup?', ['O(1)', 'O(n)', 'O(log n)', 'O(n²)'], 0, 'Hash tables give O(1) average lookup.')] },
      { id: 's3-capstone', title: 'Course 16 Capstone', subtitle: 'Data Structure Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ('When to use BST over hash table?', ['Need sorted order', 'Need O(1) lookup', 'Need O(1) insert', 'Need LIFO'], 0, "BSTs maintain sorted order; hash tables don't.")] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 17: Software Engineering
  // ═══════════════════════════════════════════════════
  {
    id: 'software-engineering',
    number: 17,
    title: 'Software Engineering',
    subtitle: 'Clean Code, Testing & CI/CD',
    description: 'SOLID principles, design patterns, testing strategies, version control, and deployment.',
    icon: 'Wrench',
    color: '#78716c',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-se-principles', title: 'SE Principles', subtitle: 'SOLID, DRY, KISS', duration: '30 min', component: <S1_SEPrinciples />, quiz: [quizMCQ("DRY stands for?", ["Don't Repeat Yourself", 'Do Repeat Yesterday', 'Data Remains Youthful', 'Dynamic Runtime Yield'], 0, "DRY = Don't Repeat Yourself.")] },
      { id: 's2-testing-cicd', title: 'Testing & CI/CD', subtitle: 'Automated Quality', duration: '35 min', component: <S2_TestingCICD />, quiz: [quizMCQ('What does CI/CD do?', ['Automate build/test/deploy', 'Write code', 'Debug errors', 'Design UI'], 0, 'CI/CD automates the entire delivery pipeline.')] },
      { id: 's3-capstone', title: 'Course 17 Capstone', subtitle: 'SE Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ('What is composition over inheritance?', ['Build from simple pieces', 'Use classes only', 'Avoid functions', 'Copy code'], 0, 'Composition = combine simple components vs deep inheritance trees.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 18: Artificial Intelligence
  // ═══════════════════════════════════════════════════
  {
    id: 'artificial-intelligence',
    number: 18,
    title: 'Artificial Intelligence',
    subtitle: 'Neural Networks & Machine Learning',
    description: 'AI history, neural networks, ML paradigms, training, and real-world applications.',
    icon: 'Brain',
    color: '#d946ef',
    totalDuration: '6 hours',
    sections: [
      { id: 's1-ai-intro', title: 'What is AI?', subtitle: 'Rule-Based to Neural Networks', duration: '30 min', component: <S1_AIIntro />, quiz: [quizMCQ('What era brought deep learning?', ['2010s-now', '1950s', '1990s', '2000s'], 0, 'Deep learning took off in 2010s with GPUs.')] },
      { id: 's2-neural-nets', title: 'Neural Networks', subtitle: 'Forward Pass, Backpropagation', duration: '40 min', component: <S2_NeuralNetworks />, quiz: [quizMCQ('What updates neural network weights?', ['Gradient descent', 'Random guess', 'User input', 'Time'], 0, 'Gradient descent minimizes loss by updating weights.')] },
      { id: 's3-ml-concepts', title: 'ML Concepts', subtitle: 'Supervised, Unsupervised, RL', duration: '35 min', component: <S3_MLConcepts />, quiz: [quizMCQ('Clustering is which type of ML?', ['Unsupervised', 'Supervised', 'Reinforcement', 'Transfer'], 0, 'Clustering finds patterns in unlabeled data.')] },
      { id: 's4-capstone', title: 'Course 18 Capstone', subtitle: 'AI Mastery', duration: '25 min', component: <S3_Capstone />, quiz: [quizMCQ('What is transfer learning?', ['Reuse pre-trained model', 'Transfer data', 'Move files', 'Copy code'], 0, 'Transfer learning = fine-tune a pre-trained model.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 19: Large Language Models
  // ═══════════════════════════════════════════════════
  {
    id: 'llms',
    number: 19,
    title: 'Large Language Models',
    subtitle: 'Transformers, Attention & ChatGPT',
    description: 'Tokenization, embeddings, self-attention, transformer architecture, and prompt engineering.',
    icon: 'MessageSquare',
    color: '#f43f5e',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-llms', title: 'LLMs', subtitle: 'How ChatGPT Works', duration: '40 min', component: <S1_LLMs />, quiz: [quizMCQ('What makes transformers special?', ['Self-attention mechanism', 'Faster CPU', 'More memory', 'Better graphics'], 0, 'Self-attention lets every token consider all other tokens.')] },
      { id: 's2-capstone', title: 'Course 19 Capstone', subtitle: 'LLM Mastery', duration: '25 min', component: <S3_Capstone />, quiz: [quizMCQ('LLM pre-training objective?', ['Next token prediction', 'Image recognition', 'Audio processing', 'File compression'], 0, 'LLMs are trained to predict the next token.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 20: GPU Computing
  // ═══════════════════════════════════════════════════
  {
    id: 'gpu-computing',
    number: 20,
    title: 'GPU Computing',
    subtitle: 'Parallel Processing for AI & Graphics',
    description: 'GPU architecture, CUDA, parallel computing, matrix math, and why GPUs power AI.',
    icon: 'Monitor',
    color: '#22c55e',
    totalDuration: '4 hours',
    sections: [
      { id: 's1-gpu', title: 'GPU Architecture', subtitle: 'Thousands of Cores', duration: '35 min', component: <S1_GPU />, quiz: [quizMCQ('GPU advantage over CPU?', ['Massive parallelism', 'Faster single core', 'Less power', 'Cheaper'], 0, 'GPU has thousands of cores for parallel work.')] },
      { id: 's2-capstone', title: 'Course 20 Capstone', subtitle: 'GPU Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ("CUDA is used for?", ['GPU programming', 'CPU programming', 'Database queries', 'Web development'], 0, "CUDA = NVIDIA's GPU programming framework.")] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 21: How AI Learns
  // ═══════════════════════════════════════════════════
  {
    id: 'how-ai-learns',
    number: 21,
    title: 'How AI Learns',
    subtitle: 'Training, Loss, Optimization',
    description: 'Training data, loss functions, gradient descent, regularization, and the complete ML pipeline.',
    icon: 'GraduationCap',
    color: '#0ea5e9',
    totalDuration: '5 hours',
    sections: [
      { id: 's1-how-ai-learns', title: 'How AI Learns', subtitle: 'The Complete Pipeline', duration: '40 min', component: <S1_HowAILearns />, quiz: [quizMCQ('What is overfitting?', ['Model memorizes training data', 'Model is too simple', 'Too much data', 'Too fast training'], 0, 'Overfitting = performs well on training, poorly on new data.')] },
      { id: 's2-capstone', title: 'Course 21 Capstone', subtitle: 'ML Pipeline Mastery', duration: '20 min', component: <S3_Capstone />, quiz: [quizMCQ('Learning rate controls?', ['Step size of weight updates', 'Model size', 'Data amount', 'Training time'], 0, 'Learning rate = how big each gradient descent step is.')] },
    ],
  },

  // ═══════════════════════════════════════════════════
  // COURSE 22: Build Everything
  // ═══════════════════════════════════════════════════
  {
    id: 'build-everything',
    number: 22,
    title: 'Build Everything',
    subtitle: 'From Atoms to Intelligence',
    description: 'The capstone course — review your complete journey from transistors to AI.',
    icon: 'Rocket',
    color: '#f97316',
    totalDuration: '3 hours',
    sections: [
      { id: 's1-build-everything', title: 'The Complete Journey', subtitle: 'From Transistors to AI', duration: '40 min', component: <S1_BuildEverything />, quiz: [quizMCQ('Smallest building block of a computer?', ['Transistor', 'CPU', 'RAM', 'Software'], 0, 'A transistor is the smallest switch — ON or OFF.')] },
      { id: 's2-capstone', title: 'Final Capstone', subtitle: 'You Built Everything!', duration: '25 min', component: <S3_Capstone />, quiz: [quizFill('The CPU follows this cycle: Fetch → _____ → Execute', 'Decode', 'The CPU follows Fetch → Decode → Execute.')] },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return COURSES.find((c) => c.id === id);
}

export function getSectionById(courseId: string, sectionId: string) {
  const course = getCourseById(courseId);
  return course?.sections.find((s) => s.id === sectionId);
}
