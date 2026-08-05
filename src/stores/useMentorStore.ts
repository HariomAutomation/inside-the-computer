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

// Comprehensive Computer Science Knowledge Base for Ada 3.0
const KNOWLEDGE_BASE: { keywords: string[]; response: string }[] = [
  // --- Hardware & Electronics ---
  {
    keywords: ['voltage', 'noise margin', 'noise', 'vcc', 'ground'],
    response: `⚡ **Voltage & Noise Margin:**\nDigital chips mein 0 aur 1 abstract nahi hote.\n- **0.0V – 0.8V** = LOW (0)\n- **2.0V – 5.0V** = HIGH (1)\n- **0.8V – 2.0V** = Forbidden Zone (Noise Margin)\n\nNoise margin isliye hota hai taaki electrical noise ya voltage surge hone par 0 aur 1 confuse na hon! Agar noise margin na ho, toh ek chhoti si spike poora computation bigaad sakti hai.`
  },
  {
    keywords: ['cmos', 'nmos', 'pmos', 'transistor', 'mosfet'],
    response: `🔬 **CMOS Transistor Technology:**\nModern chips mein **PMOS** (Gate=0 par ON) aur **NMOS** (Gate=1 par ON) ki Complementary Pairing hoti hai.\n\n**Faida:** Standby par ek transistor ON, doosra OFF — VCC aur Ground ke beech direct path nahi banta = **Zero Static Power Loss**!\n\nEk NAND gate sirf 4 transistors ka banta hai. Poora CPU millions of transistors ka hota hai — sabka switching pattern precisely controlled hota hai.`
  },
  {
    keywords: ['nand', 'nor', 'universal gate', 'xor', 'xnor'],
    response: `🧱 **Universal Gates & Silicon Efficiency:**\nPhysical silicon fabrication mein **NAND Gate** sabse cheap aur fast banta hai (sirf 4 transistors).\n\n**Universal gate** = aap sirf ek gate se poora circuit bana sakte ho. NAND aur NOR dono universal hain.\n\n- AND = NAND + NOT\n- OR = NAND (inputs inverted)\n- XOR = NAND combination\n\nIsiliye microchips natively NAND gates use karti hain!`
  },
  {
    keywords: ['and gate', 'or gate', 'not gate', 'basic gate', 'logic gate'],
    response: `🔲 **Basic Logic Gates:**\n- **AND** = Dono inputs 1 → output 1 (sabse strict)\n- **OR** = Koi bhi 1 → output 1 (sabse lenient)\n- **NOT** = Input ulta kar deta hai (inverter)\n\nYe teen gates milke poora digital world banate hain. CPU ki har calculation in gates ke combinations se hoti hai. Truth table yaad karna helpful hai — har gate ka 2^n combinations hota hai (n = inputs).`
  },
  {
    keywords: ['half adder', 'full adder', 'adder', 'carry', 'ripple carry'],
    response: `➕ **Adders — Binary Math in Hardware:**\n- **Half Adder**: 2 bits add karta hai. Output = Sum (XOR) + Carry (AND).\n- **Full Adder**: 3 bits add karta hai (A + B + Carry-in).\n\n**Ripple Carry Adder**: Multiple full adders chain mein connect karte hain. Carry ek se doosre mein "ripple" hota hai — isme **propagation delay** hota hai (carry ko sabse last adder tak pahunchne mein time lagta hai).\n\nAaj kal **Carry Lookahead Adder** use hota hai jo parallel mein carry calculate karta hai — bohot fast!`
  },
  {
    keywords: ['alu', 'arithmetic logic unit', 'adder', 'flag', 'status flag', 'zero flag', 'overflow'],
    response: `🧮 **ALU & Hardware Status Flags:**\nALU CPU ka calculator hai — math (ADD, SUB) aur logic (AND, OR, XOR) operations karta hai.\n\nResult nikalte waqt **Status Flags** update hote hain:\n- **Z (Zero)**: Result == 0\n- **C (Carry)**: Unsigned overflow\n- **V (Overflow)**: Signed overflow\n- **N (Negative)**: Result < 0\n\nInhi flags ko check karke CPU \`if/else\` branches decide karta hai — ye assembly level par \`CMP\` instruction ke baad hota hai!`
  },
  // --- Memory ---
  {
    keywords: ['ram', 'cache', 'sram', 'dram', 'memory'],
    response: `💾 **Memory Hierarchy (SRAM vs DRAM):**\n- **SRAM (Cache L1/L2/L3)**: 6-Transistor Flip-Flops. Super-fast (~1ns), zero refresh, lekin mehngi aur badi.\n- **DRAM (Main RAM)**: 1 Transistor + 1 Capacitor. Sasti (~$5/GB) par capacitor charge leak karta hai = **har millisecond refresh** zaroori!\n\n**Cache Hit** = data L1 mein mil gaya (1 cycle). **Cache Miss** = RAM tak jaana padega (100+ cycles).\n\nIsliye cache jitna chhota aur close CPU ke, utna fast!`
  },
  {
    keywords: ['cache miss', 'cache hit', 'cache line', 'eviction', 'lru'],
    response: `🎯 **Cache Mechanics:**\n- **Cache Line**: Cache ka basic block (typically 64 bytes). Jab ek bhi byte chahiye, puri line load hoti hai (spatial locality).\n- **Cache Hit**: Data cache mein mil gaya — instant access!\n- **Cache Miss**: Data nahi mila = RAM se load karna padega (penalty: 50-200 cycles).\n- **Eviction**: Cache full hai toh koi line nikalni padegi. **LRU** (Least Recently Used) sabse common algorithm hai.\n\n**Temporal locality**: Jo access hua, wo phir access hoga. **Spatial locality**: Jo access hua, uske paas wala bhi access hoga.`
  },
  {
    keywords: ['ssd', 'hdd', 'storage', 'flash', 'nvme', 'disk'],
    response: `💿 **Storage Devices:**\n- **HDD**: Magnetic spinning disks. Cheap (~$20/TB), slow (5ms seek), mechanical parts.\n- **SATA SSD**: NAND Flash. Fast (0.1ms), no moving parts, reliable.\n- **NVMe SSD**: PCIe bus. Blazing fast (0.02ms), 7GB/s sequential read.\n\n**Flash Memory** electron traps mein data store karta hai. Write ke liye high voltage chahiye, erase ke liye block-level hota hai — isliye SSD mein **TRIM** command important hai taaki garbage collection ho sake.`
  },
  // --- CPU Architecture ---
  {
    keywords: ['cpu', 'fetch', 'decode', 'execute', 'instruction cycle', 'pipeline'],
    response: `🔄 **CPU Instruction Cycle:**\n1. **Fetch**: PC se instruction memory se padho.\n2. **Decode**: Instruction ka opcode samjho (kya karna hai).\n3. **Execute**: ALU se calculation karo.\n4. **Memory**: Data load/store karo.\n5. **Writeback**: Result register mein likho.\n\n**Pipelining** se ek instruction execute hote waqt doosra decode hota hai — jaise assembly line! 5-stage pipeline mein theoretically 5x speedup milta hai (ideal case).`
  },
  {
    keywords: ['pipelining', 'pipeline', 'hazard', 'data hazard', 'control hazard', 'structural hazard', 'stall', 'forwarding'],
    response: `⚠️ **Pipeline Hazards:**\n1. **Data Hazard**: Instruction B ko A ka result chahiye jo abhi ready nahi. Solution: **Forwarding** (result direct next instruction ko bhejo) ya **Stall** (1 cycle ruko).\n2. **Control Hazard**: Branch instruction ne kya decide kiya? Solution: **Branch Prediction** (guess karo, galat hua toh flush karo).\n3. **Structural Hazard**: Dono instructions ko same resource chahiye. Solution: Duplicate hardware.\n\nForwarding sabse clever hai — data memory se nahi, directly EX/MEM stage se bhej deta hai!`
  },
  {
    keywords: ['branch prediction', 'branch', 'jump', 'pc'],
    response: `🔮 **Branch Prediction:**\nJab \`if\` statement aata hai, CPU already agla instruction load kar raha hota hai. Agar prediction galat hua → pipeline flush = 10-20 cycles waste!\n\nModern CPUs (Intel/ARM) **95%+ accuracy** rakhte hain. Strategy: "Branch historically taken hai → abhi bhi taken hoga."\n\n**Static prediction**: Always taken/not-taken. **Dynamic**: 2-bit saturating counter use karta hai — 2 baar galat hua tabhi prediction change hota hai.`
  },
  {
    keywords: ['isa', 'instruction set', 'risc', 'cisc', 'arm', 'x86', 'mips'],
    response: `📐 **Instruction Set Architecture (ISA):**\nISA = CPU ki vocabulary — kitne instructions hain, kya kya kar sakte ho.\n\n- **CISC (x86)**: Complex instructions. Ek instruction se kaafi kaam hota hai. Variable length. Intel/AMD.\n- **RISC (ARM, MIPS)**: Simple instructions. Har instruction ek kaam. Fixed length. Phones, Apple Silicon.\n\nARM isliye efficient hai kyunki simple instructions kam power consume karte hain — isliye phones mein battery zyada chalti hai!`
  },
  {
    keywords: ['register', 'eax', 'ebx', 'ecx', 'edx', 'rsp', 'rbp', 'rip'],
    response: `📋 **CPU Registers:**\nRegisters CPU ke andar sabse fast storage hain (~0.3ns access).\n\n**x86-64 Registers:**\n- **RAX**: Accumulator (math results)\n- **RBX**: Base (array base address)\n- **RCX**: Counter (loops)\n- **RDX**: Data (I/O operations)\n- **RSP**: Stack Pointer\n- **RBP**: Base Pointer\n- **RIP**: Instruction Pointer (next instruction address)\n\n64-bit registers hain — ek register mein 18 quintillion tak ka number aa sakta hai!`
  },
  // --- Assembly ---
  {
    keywords: ['assembly', 'asm', 'mov', 'push', 'pop', 'call', 'ret', 'jmp', 'int'],
    response: `🔧 **Assembly Language:**\nAssembly = Machine code ka human-readable form. Har instruction ka 1-to-1 mapping hai.\n\n**Common x86 Instructions:**\n- \`MOV RAX, 5\` = RAX = 5\n- \`ADD RAX, RBX\` = RAX = RAX + RBX\n- \`PUSH RAX\` = Stack pe store karo\n- \`POP RBX\` = Stack se nikal ke RBX mein\n- \`CALL func\` = Return address save + jump\n- \`RET\` = Wapas aao\n- \`INT 0x80\` = Linux syscall trigger\n\nHar instruction ek opcode hai jo CPU directly samajhta hai!`
  },
  // --- Compilers ---
  {
    keywords: ['compiler', 'ast', 'lexer', 'parser', 'token', 'syntax', 'parse'],
    response: `⚙️ **Compiler Pipeline:**\n1. **Lexer**: Code ko characters se tokens mein todta hai. \`let x = 10;\` → [KEYWORD:let, IDENT:x, ASSIGN:=, NUMBER:10, SEMI:;]\n2. **Parser**: Tokens se **Abstract Syntax Tree** banata hai — kaun sa expression kiske andar hai.\n3. **Semantic Analysis**: Type checking, scope resolution. Kya \`x\` declared hai? Kya \`string + number\` allowed hai?\n4. **Optimization**: Dead code elimination, constant folding (\`2*3\` → \`6\` at compile time).\n5. **Code Generation**: Target CPU ke liye machine code.\n\nYe sab microseconds mein hota hai!`
  },
  {
    keywords: ['interpreter', 'jit', 'just in time', 'bytecode', 'python', 'pvm'],
    response: `▶️ **Interpreters & JIT:**\n- **Tree-Walk Interpreter**: AST pe directly execute karta hai. Simple but slow.\n- **Bytecode VM**: Pehle bytecode mein compile, phir VM pe run. Python ka PVM is type ka hai.\n- **JIT (Just-In-Time)**: Hot code paths ko runtime pe native machine code mein compile karta hai. JavaScript ka V8 engine is type ka hai.\n\n**JIT ka magic**: Pehle interpret karo, jab function baar baar call ho tab compile karo. Isliye JavaScript C jaisi fast ho sakti hai despite being interpreted!`
  },
  // --- JavaScript Engine ---
  {
    keywords: ['v8', 'javascript', 'js engine', 'ignition', 'turbofan', 'event loop', 'hidden class'],
    response: `⚡ **V8 JavaScript Engine:**\n1. **Parser** → AST banata hai\n2. **Ignition** (Interpreter) → Bytecode generate karta hai, quickly start hota hai\n3. **TurboFan** (JIT Compiler) → Hot functions ko optimized machine code mein compile karta hai\n\n**Event Loop**: JS single-threaded hai par non-blocking hai. \`setTimeout\`, \`fetch\`, \`Promise\` sab event loop ke through handle hote hain.\n\n**Hidden Classes**: V8 har object ke liye hidden class banata hai taaki property access fast ho — same structure ke objects share karte hain.`
  },
  // --- Networking ---
  {
    keywords: ['network', 'tcp', 'ip', 'http', 'https', 'dns', 'port', 'socket', 'packet'],
    response: `🌐 **Networking Fundamentals:**\n- **DNS**: Domain name → IP address. Hierarchical: root → TLD → authoritative.\n- **TCP**: Reliable, ordered. 3-way handshake: SYN → SYN-ACK → ACK.\n- **HTTP/HTTPS**: Request-response. GET, POST, PUT, DELETE. HTTPS = HTTP + TLS encryption.\n- **IP**: Addressing + routing. IPv4 (32-bit, ~4B addresses) vs IPv6 (128-bit).\n- **Ports**: Process identification. HTTP=80, HTTPS=443, SSH=22.\n\n Jab tum google.com type karte ho, DNS se IP milta hai, TCP connect hota hai, HTTP request jaati hai — ye sab milliseconds mein hota hai!`
  },
  {
    keywords: ['tls', 'ssl', 'encryption', 'certificate', 'handshake'],
    response: `🔐 **TLS/SSL Encryption:**\nTLS (Transport Layer Security) HTTPS ko secure banata hai.\n\n**TLS Handshake:**\n1. Client: "Mujhe TLS 1.3 chahiye" + cipher suites\n2. Server: Certificate bhejta hai (public key)\n3. Client: Certificate verify karta hai (CA chain)\n4. Dono: Session key generate karte hain (asymmetric → symmetric)\n5. Ab sab data encrypted hai!\n\n**Asymmetric** (RSA/ECC) sirf key exchange ke liye. **Symmetric** (AES) actual data ke liye — bohot fast hai!`
  },
  // --- AI & ML ---
  {
    keywords: ['ai', 'artificial intelligence', 'machine learning', 'ml', 'deep learning', 'neural network'],
    response: `🤖 **AI & Machine Learning:**\n- **Rule-Based AI**: If-then rules. Expert systems. Limited.\n- **Machine Learning**: Data se patterns seekhta hai. Supervised (labeled data), Unsupervised (clustering), Reinforcement (rewards).\n- **Deep Learning**: Neural networks with many layers. Image, text, speech recognition.\n\n**Neural Network**: Layered neurons. Forward pass → Loss calculation → Backpropagation → Gradient Descent → Weights update. Ye cycle millions of times chalta hai!`
  },
  {
    keywords: ['transformer', 'llm', 'large language model', 'attention', 'chatgpt', 'gpt', 'token', 'embedding'],
    response: `🧠 **Transformers & LLMs:**\n**Transformer Architecture** (2017 — "Attention Is All You Need"):\n- **Tokenization**: Text ko tokens mein todna (BPE algorithm)\n- **Embeddings**: Token IDs → high-dimensional vectors\n- **Self-Attention**: Har token sabhi doosre tokens ko dekhta hai — calculate karta hai kitna relevant hai\n- **Multi-Head Attention**: Alag-alag angles se context samajhta hai\n- **Feed-Forward**: Processing layer\n\nLLMs next token prediction seekhte hain — "The cat sat on the ___" → "mat" (probability: 0.87). Billions of parameters = billions of weights!`
  },
  {
    keywords: ['gradient descent', 'loss function', 'backpropagation', 'learning rate', 'training', 'overfitting'],
    response: `📉 **How AI Learns:**\n1. **Forward Pass**: Data model se guzarta hai, prediction milti hai.\n2. **Loss Function**: Prediction vs actual kitna door hai (MSE, Cross-Entropy).\n3. **Backpropagation**: Gradient nikalta hai — har weight kitna responsible hai loss ke liye.\n4. **Gradient Descent**: Weights ko thoda thoda update karta hai (opposite direction of gradient).\n5. **Learning Rate**: Kitna bada step lena hai. Zyada = fast but unstable. Kam = slow but stable.\n\n**Overfitting**: Model training data rat leta hai, new data pe fail hota hai. Solution: Dropout, Regularization, More data.`
  },
  // --- Data Structures ---
  {
    keywords: ['array', 'linked list', 'stack', 'queue', 'data structure'],
    response: `📚 **Fundamental Data Structures:**\n- **Array**: Contiguous memory. O(1) access by index. Fixed size (usually).\n- **Linked List**: Nodes with pointers. O(1) insert/delete. O(n) access.\n- **Stack**: LIFO (Last In, First Out). Push/Pop. Function calls, undo.\n- **Queue**: FIFO (First In, First Out). BFS, task scheduling.\n\n**When to use what?** Random access → Array. Frequent insert/delete middle → Linked List. Undo/Function calls → Stack. BFS/Printing → Queue.`
  },
  {
    keywords: ['tree', 'bst', 'binary tree', 'heap', 'trie', 'hash', 'hashmap', 'hashtable'],
    response: `🌳 **Trees & Hash Tables:**\n- **BST (Binary Search Tree)**: Left < Root < Right. Search: O(log n) average.\n- **Heap**: Parent >= Children (max-heap). Priority queues.\n- **Trie**: String storage. Prefix search. Autocomplete.\n- **Hash Table**: Key → hash → index. O(1) average lookup. Collision: chaining ya open addressing.\n\n**BST vs Hash**: BST sorted order maintain karta hai. Hash table O(1) direct access deta hai but sorted order nahi.`
  },
  // --- Algorithms ---
  {
    keywords: ['algorithm', 'big o', 'time complexity', 'space complexity', 'sorting', 'searching'],
    response: `⏱️ **Algorithm Complexity:**\n- **O(1)**: Constant. Array access, stack push/pop.\n- **O(log n)**: Logarithmic. Binary search.\n- **O(n)**: Linear. Array traversal.\n- **O(n log n)**: Linearithmic. Merge sort, Quick sort (average).\n- **O(n²)**: Quadratic. Bubble sort, nested loops.\n- **O(2ⁿ)**: Exponential. Brute force subsets.\n\n**Rule of thumb**: O(n log n) tak acceptable hai. O(n²) se upar socho ki optimize kaise kar sakte ho!`
  },
  {
    keywords: ['bubble sort', 'quick sort', 'merge sort', 'selection sort', 'insertion sort', 'sort'],
    response: `🔀 **Sorting Algorithms:**\n- **Bubble Sort**: Adjacent compare + swap. O(n²). Simple but slow.\n- **Selection Sort**: Find min, place at start. O(n²). Minimum swaps.\n- **Insertion Sort**: Insert each element. O(n²). Fast for small/nearly sorted data.\n- **Merge Sort**: Divide + Conquer. O(n log n). Stable. Consistent.\n- **Quick Sort**: Pivot partitioning. O(n log n) avg. Fastest in practice.\n\n**Real-world**: Timsort (Python/Java) = Merge + Insertion. Hybrid approach best hai!`
  },
  // --- Databases ---
  {
    keywords: ['database', 'sql', 'nosql', 'mysql', 'postgres', 'mongo', 'query', 'index'],
    response: `🗄️ **Databases:**\n- **SQL (Relational)**: Structured tables. ACID compliant. MySQL, PostgreSQL.\n- **NoSQL (Non-relational)**: Flexible schema. Document, Key-Value, Column-family. MongoDB, Redis.\n\n**ACID**: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent safe), Durability (crash safe).\n\n**Index**: B-tree data structure for fast lookups. Without index: full table scan (slow). With index: O(log n) search.\n\n**When to use what?** Structured data + relationships → SQL. Flexible schema + scale → NoSQL.`
  },
  // --- General CS ---
  {
    keywords: ['binary', 'hex', 'octal', 'number system', 'bit', 'byte'],
    response: `🔢 **Number Systems:**\n- **Binary (base-2)**: 0,1. Computer native. Transistors = ON/OFF.\n- **Octal (base-8)**: 0-7. Unix file permissions.\n- **Hexadecimal (base-16)**: 0-9, A-F. Memory addresses, colors.\n\n**Conversion:**\n- Binary → Decimal: 1011 = 8+0+2+1 = 11\n- Decimal → Hex: 255 = FF\n\n4 bits = 1 nibble. 8 bits = 1 byte. 1 KB = 1024 bytes. Hex isliye popular hai kyunki 4 bits = 1 hex digit — binary ko compactly represent karta hai!`
  },
  {
    keywords: ['binary search', 'bfs', 'dfs', 'graph', 'traversal', 'dijkstra', 'shortest path'],
    response: `🔍 **Searching & Graph Algorithms:**\n- **Binary Search**: Sorted array mein O(log n). Mid pe check, left/right jao.\n- **BFS (Breadth-First)**: Queue. Level by level. Shortest path (unweighted).\n- **DFS (Depth-First)**: Stack/Recursion. Go deep first. Cycle detection, topological sort.\n- **Dijkstra**: Weighted graph shortest path. Priority queue use karta hai. O((V+E) log V).\n\n**Graph representation**: Adjacency matrix (O(1) edge check) vs Adjacency list (memory efficient).`
  },
  {
    keywords: ['os', 'operating system', 'kernel', 'process', 'thread', 'scheduling', 'system call'],
    response: `🖥️ **Operating System:**\n**Kernel** = Hardware aur software ke beech ka bridge.\n\n**Process vs Thread:**\n- Process: Independent memory space. Heavy. Browser ka ek tab.\n- Thread: Shared memory. Lightweight. Browser ke andar parallel tasks.\n\n**Scheduling**: FCFS, SJF, Round Robin, Priority. Goal: maximize CPU utilization, minimize waiting time.\n\n**System Call**: User program → Kernel. \`open()\`, \`read()\`, \`write()\` sab system calls hain. \`int 0x80\` (x86) ya \`syscall\` instruction se trigger hota hai.`
  },
  {
    keywords: ['git', 'version control', 'commit', 'branch', 'merge', 'repository'],
    response: `📋 **Version Control (Git):**\n- **Repository**: Project ka history database.\n- **Commit**: Snapshot of changes. Message ke saath.\n- **Branch**: Parallel development line. Feature branch se safe experimentation.\n- **Merge**: Branch ko main mein combine karo.\n- **Pull Request**: Code review + merge request.\n\n**Git Internals**: Content-addressable filesystem. Har object ka SHA-1 hash. Commit = tree + parent + author + message. Branch = pointer to commit.`
  },
];

function generateAdaResponse(questionText: string): string {
  const query = questionText.toLowerCase().trim();

  // Greeting detection
  if (/^(hi|hello|hey|namaste|sup|hola|yo|howdy|kya haal|kaise ho)/.test(query)) {
    const greetings = [
      `Namaste! Main **Ada 3.0** hoon. Computer science ke kisi bhi topic pe sawal pucho — hardware, software, algorithms, AI, networking — kuch bhi! 🎓`,
      `Hey! Ada here. Kya sawal hai aaj? CPU ho, JavaScript ho, ya phir neural networks — sab samajhta hoon! 💡`,
      `Hello! Main Ada 3.0 — tumhara CS mentor. Kuch puchna hai? Main yahan hoon! 🤖`,
    ];
    return greetings[Math.floor(Math.random() * greetings.length)];
  }

  // Thank you detection
  if (/^(thank|thanks|shukriya|dhanyavad|thx|ty)/.test(query)) {
    const thanks = [
      `Aapka swagat hai! Aur kuch samajhna ho toh pucho — learning never stops! 🚀`,
      `Koi baat nahi! Knowledge share karna mera kaam hai. Aage bhi pucho! 🎯`,
      `Happy to help! Computer science bahut fascinating hai — explore karte raho! 💪`,
    ];
    return thanks[Math.floor(Math.random() * thanks.length)];
  }

  // Search knowledge base
  for (const entry of KNOWLEDGE_BASE) {
    if (entry.keywords.some(kw => query.includes(kw))) {
      return entry.response;
    }
  }

  // Topic-specific fallbacks with variety
  const fallbacks = [
    `🤔 **"${questionText}"** — interesting sawal hai! Ye specific topic abhi mere detailed knowledge base mein nahi hai, lekin computer science ke fundamentals se related hai.\n\n**Tip**: Zyada specific keywords use karo (jaise "binary addition", "cache miss", "neural network training") toh main better answer de sakta hoon!`,
    `🔍 **"${questionText}"** — ye topic mere current knowledge base mein cover nahi hai. Main primarily computer architecture, programming fundamentals, AI/ML, aur networking pe focused hoon.\n\nKya tum isko aur specific bana sakte ho? Ya phir koi aur CS topic pucho!`,
    `💡 **"${questionText}"** — good question! Abhi mere paas is topic ka detailed answer ready nahi hai.\n\nMain in topics pe expert hoon:\n- Hardware: Transistors, Gates, ALU, CPU, Memory\n- Software: Compilers, Interpreters, JS Engine\n- AI: Neural Networks, Transformers, LLMs\n- Networking: TCP/IP, HTTP, TLS\n\nIn mein se kuch pucho? 🎯`,
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
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
