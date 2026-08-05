import { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';

type SortAlgorithm = 'bubble' | 'selection' | 'insertion' | 'quick';

interface SortStep {
  array: number[];
  comparing: number[];
  swapping: number[];
  sorted: number[];
  description: string;
}

function generateRandomArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 95) + 5);
}

function bubbleSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted: number[] = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({ array: [...a], comparing: [j, j + 1], swapping: [], sorted: [...sorted], description: `Comparing ${a[j]} and ${a[j + 1]}` });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({ array: [...a], comparing: [], swapping: [j, j + 1], sorted: [...sorted], description: `Swapped ${a[j + 1]} and ${a[j]}` });
      }
    }
    sorted.push(a.length - i - 1);
  }
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i), description: 'Sorted!' });
  return steps;
}

function selectionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted: number[] = [];
  for (let i = 0; i < a.length; i++) {
    let minIdx = i;
    for (let j = i + 1; j < a.length; j++) {
      steps.push({ array: [...a], comparing: [minIdx, j], swapping: [], sorted: [...sorted], description: `Checking ${a[j]} < ${a[minIdx]}?` });
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({ array: [...a], comparing: [], swapping: [i, minIdx], sorted: [...sorted], description: `Swapped ${a[minIdx]} to position ${i}` });
    }
    sorted.push(i);
  }
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i), description: 'Sorted!' });
  return steps;
}

function insertionSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted: number[] = [0];
  for (let i = 1; i < a.length; i++) {
    let j = i;
    while (j > 0 && a[j - 1] > a[j]) {
      steps.push({ array: [...a], comparing: [j - 1, j], swapping: [], sorted: [...sorted], description: `${a[j]} < ${a[j - 1]}, shifting right` });
      [a[j - 1], a[j]] = [a[j], a[j - 1]];
      steps.push({ array: [...a], comparing: [], swapping: [j - 1, j], sorted: [...sorted], description: `Shifted ${a[j]} left` });
      j--;
    }
    sorted.push(i);
  }
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i), description: 'Sorted!' });
  return steps;
}

function quickSort(arr: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const a = [...arr];
  const sorted: number[] = [];

  function qs(low: number, high: number) {
    if (low >= high) { if (low === high) sorted.push(low); return; }
    const pivot = a[high];
    let i = low;
    steps.push({ array: [...a], comparing: [high], swapping: [], sorted: [...sorted], description: `Pivot: ${pivot}` });
    for (let j = low; j < high; j++) {
      steps.push({ array: [...a], comparing: [j, high], swapping: [], sorted: [...sorted], description: `Comparing ${a[j]} with pivot ${pivot}` });
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        steps.push({ array: [...a], comparing: [], swapping: [i, j], sorted: [...sorted], description: `Swapped ${a[i]} and ${a[j]}` });
        i++;
      }
    }
    [a[i], a[high]] = [a[high], a[i]];
    sorted.push(i);
    steps.push({ array: [...a], comparing: [], swapping: [i, high], sorted: [...sorted], description: `Pivot ${pivot} in final position` });
    qs(low, i - 1);
    qs(i + 1, high);
  }
  qs(0, a.length - 1);
  steps.push({ array: [...a], comparing: [], swapping: [], sorted: Array.from({ length: a.length }, (_, i) => i), description: 'Sorted!' });
  return steps;
}

const ALGORITHMS: Record<SortAlgorithm, { name: string; fn: (arr: number[]) => SortStep[]; complexity: string }> = {
  bubble: { name: 'Bubble Sort', fn: bubbleSort, complexity: 'O(n²)' },
  selection: { name: 'Selection Sort', fn: selectionSort, complexity: 'O(n²)' },
  insertion: { name: 'Insertion Sort', fn: insertionSort, complexity: 'O(n²)' },
  quick: { name: 'Quick Sort', fn: quickSort, complexity: 'O(n log n)' },
};

export default function SortingVisualizer() {
  const [algorithm, setAlgorithm] = useState<SortAlgorithm>('bubble');
  const [steps, setSteps] = useState<SortStep[]>([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(200);
  const [arraySize, setArraySize] = useState(12);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const initArray = useCallback(() => {
    const arr = generateRandomArray(arraySize);
    const generated = ALGORITHMS[algorithm].fn(arr);
    setSteps(generated);
    setStepIdx(0);
    setIsRunning(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, [algorithm, arraySize]);

  useEffect(() => { initArray(); }, [initArray]);

  useEffect(() => {
    if (!isRunning) { if (timerRef.current) clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => {
      setStepIdx((prev) => {
        if (prev >= steps.length - 1) { setIsRunning(false); return prev; }
        return prev + 1;
      });
    }, speed);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isRunning, speed, steps.length]);

  const current = steps[stepIdx] || { array: [], comparing: [], swapping: [], sorted: [], description: '' };
  const maxVal = Math.max(...current.array, 1);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as SortAlgorithm)}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-mono text-white/80 focus:outline-none focus:border-primary-500"
        >
          {Object.entries(ALGORITHMS).map(([k, v]) => (
            <option key={k} value={k}>{v.name} ({v.complexity})</option>
          ))}
        </select>
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all"
          style={{ backgroundColor: isRunning ? '#ef444430' : '#22c55e30', border: `1px solid ${isRunning ? '#ef4444' : '#22c55e'}`, color: isRunning ? '#ef4444' : '#22c55e' }}
        >
          {isRunning ? '⏸ Pause' : '▶ Play'}
        </button>
        <button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60">◀</button>
        <button onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60">▶▶</button>
        <button onClick={initArray} className="px-3 py-2 rounded-lg text-xs bg-white/5 border border-white/10 text-white/60">↻ New Array</button>
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-[10px] text-white/40">Size:</span>
          <input type="range" min={5} max={30} value={arraySize} onChange={(e) => setArraySize(Number(e.target.value))} className="w-16 accent-primary-500" />
          <span className="text-[10px] text-white/40">Speed:</span>
          <input type="range" min={50} max={500} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-16 accent-primary-500" />
        </div>
      </div>

      <div className="glass rounded-xl border border-white/10 p-4">
        <div className="flex items-end gap-1 h-40 justify-center">
          {current.array.map((val, i) => {
            const isComparing = current.comparing.includes(i);
            const isSwapping = current.swapping.includes(i);
            const isSorted = current.sorted.includes(i);
            let color = '#3b82f6';
            if (isComparing) color = '#f59e0b';
            if (isSwapping) color = '#ef4444';
            if (isSorted) color = '#22c55e';
            return (
              <motion.div
                key={`${i}-${val}`}
                initial={{ height: 0 }}
                animate={{ height: `${(val / maxVal) * 100}%` }}
                transition={{ duration: 0.15 }}
                className="rounded-t-md min-w-[16px] flex flex-col items-center justify-end relative group"
                style={{
                  backgroundColor: color + '40',
                  border: `1px solid ${color}`,
                  width: `${Math.max(100 / current.array.length - 1, 3)}%`,
                }}
              >
                <span className="absolute -top-5 text-[9px] font-mono font-bold" style={{ color }}>{val}</span>
                <div className="opacity-0 group-hover:opacity-100 absolute -bottom-8 text-[8px] text-white/40 transition-opacity">idx:{i}</div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-[11px] text-white/60 font-mono">{current.description}</p>
        <p className="text-[10px] text-white/40 font-mono">Step {stepIdx + 1}/{steps.length}</p>
      </div>

      <div className="flex gap-4 text-[10px] text-white/40">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-blue-500" /> Default</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-amber-500" /> Comparing</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-red-500" /> Swapping</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-green-500" /> Sorted</span>
      </div>
    </div>
  );
}
