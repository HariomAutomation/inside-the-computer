# Inside the Computer — From Electricity to Artificial Intelligence ⚡➡️🤖

> An open-source, interactive visual operating system and learning engine for Computer Science — from quantum physics and transistors to full-stack operating systems, compilers, browser rendering pipelines, and Large Language Models.

---

## 🌟 Primary Features & Subsystems

- **10 Master Curriculum Modules**: Covers Semiconductors, Binary & Boolean Algebra, Logic Gates, ALU, Memory, Compilers, OS, JS Engine, Computer Networking, and Neural Networks & LLMs.
- **Universal Simulation Controller**: Frame stepper, playback speed (0.5x-2x), step-forward/back, and zoom controls.
- **Ada 3.0 Socratic AI Mentor**: Context-aware AI assistant tracking progress velocity, asking probing questions, and recommending spaced repetition reviews.
- **Learning DNA Profile**: Visual, Coding, Theory, Hardware, and Math learning style analytics.
- **"AI Explain Anything" Modal**: Instant breakdown of any circuit symbol, gate topology, or code token.
- **3-Tier Open Source Documentation**: `/docs/01-product`, `/docs/02-architecture`, and `/docs/03-development`.

---

## 🏗️ Technical Architecture

```
src/
├── components/          # Reusable UI Atoms & Common Layout Shell
├── engines/             # Decoupled Domain Logic (CPU, Memory, Compiler, JS, AI)
├── features/            # Feature Views (Curriculum, Simulations, Mentor, Progress)
├── stores/              # Reactive Zustand State Stores
├── types/               # Centralized TypeScript Data Interfaces
├── constants/           # 10 Module Master Curriculum & Achievements
└── docs/                # Product, Architecture, & Development Docs
```

---

## 🚦 Quickstart Local Setup

```bash
# Clone the repository
git clone https://github.com/your-username/inside-the-computer.git
cd inside-the-computer

# Install dependencies
npm install

# Start development server
npm run dev

# Run TypeScript validation
npx tsc --noEmit

# Build production bundle
npm run build
```

---

## 📜 License
Released under the [MIT License](LICENSE).
