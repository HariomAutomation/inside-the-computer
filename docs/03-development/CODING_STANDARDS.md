# Coding Standards & Best Practices

## 📐 Component & Directory Guidelines
1. **Component Modularity**: UI component files should aim for ≤ 250–300 lines of code. Split complex components into cohesive sub-components.
2. **Decoupled Architecture**:
   - Pure domain logic & math live in `/src/engines/`.
   - Global reactive state lives in `/src/stores/` (Zustand).
   - Presentation UI lives in `/src/components/` and `/src/features/`.
3. **Strict Type Safety**:
   - `noImplicitAny: true`.
   - Never use `any` unless explicitly documented with a justification comment.
   - Use centralized interfaces in `/src/types/`.

## 🔤 Naming Conventions
- **React Components**: `PascalCase` (e.g., `SimulationCanvas.tsx`, `LessonView.tsx`).
- **Hooks & Stores**: `camelCase` starting with `use` (e.g., `useProgressStore.ts`).
- **Utilities & Engines**: `camelCase` (e.g., `computeBinaryAdder.ts`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MODULES_DATA`).

## 🎨 Styling & Glassmorphism
- Use Tailwind CSS v4 design tokens (`bg-surface-500`, `glass`, `glass-strong`, `gradient-text`).
- Never hardcode static pixel layout heights when elements can wrap; use flexbox/grid containers.
