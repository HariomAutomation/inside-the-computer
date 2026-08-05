# ADR 0001: Use Zustand for Global State Management

## Context & Problem
We require a lightweight, boilerplate-free state management library for managing progress, curriculum state, simulation frame steppers, learning DNA, and AI mentor memories across React components.

## Decision
We choose **Zustand** as the primary state management framework.

## Rationale
- Zero boilerplate compared to Redux Toolkit.
- Native TypeScript support with type inferencing.
- Framework-agnostic store access (can be read/written directly inside domain engines in `/src/engines/` outside React components).
- High performance without context re-render thrashing.
