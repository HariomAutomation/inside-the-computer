import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/common/Navbar';
import AIMentorDrawer from './features/mentor/AIMentorDrawer';
import AIExplainModal from './features/mentor/AIExplainModal';
import ProgressDashboard from './features/progress/ProgressDashboard';
import QuizArena from './features/quiz/QuizArena';
import UniversalSimulationControlBar from './features/simulations/UniversalSimulationControlBar';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Section8 from './sections/Section8';
import Section9 from './sections/Section9';
import Section10 from './sections/Section10';
import Section11 from './sections/Section11';
import Section12 from './sections/Section12';
import CourseManager from './courses';
import { MASTER_MODULES } from './constants/modulesData';
import { Sparkles, CheckCircle2, ChevronRight, Zap, Grid, Layers } from 'lucide-react';
import { useMentorStore } from './stores/useMentorStore';
import { useCourseStore } from './courses/store';
import type { LearnerProfile } from './courses/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('curriculum');
  const [selectedModuleIndex, setSelectedModuleIndex] = useState<number>(0);
  const [isModuleDrawerOpen, setIsModuleDrawerOpen] = useState<boolean>(false);
  const { openExplainModal } = useMentorStore();
  const courseStore = useCourseStore();

  const handleSectionComplete = useCallback((courseId: string, sectionId: string) => {
    courseStore.completeSection(courseId, sectionId, 10, 10);
  }, [courseStore]);

  const handleQuizComplete = useCallback((courseId: string, sectionId: string, score: number) => {
    courseStore.completeSection(courseId, sectionId, score, 10);
    courseStore.addXP(score * 10);
  }, [courseStore]);

  const courseProfile: LearnerProfile = {
    totalXP: courseStore.totalXP,
    level: courseStore.level,
    streakDays: courseStore.streakDays,
    coursesCompleted: courseStore.coursesCompleted,
    totalQuizzesTaken: courseStore.totalQuizzesTaken,
    totalQuizzesPassed: courseStore.totalQuizzesPassed,
    weakTopics: courseStore.weakTopics,
    strongTopics: courseStore.strongTopics,
    courseProgress: courseStore.courseProgress,
    activityHeatmap: courseStore.activityHeatmap,
    achievements: courseStore.achievements,
  };

  const sections = [
    Section1,
    Section2,
    Section3,
    Section4,
    Section5,
    Section6,
    Section7,
    Section8,
    Section9,
    Section10,
    Section11,
    Section12,
  ];

  const CurrentSection = sections[selectedModuleIndex] || Section1;
  const currentModule = MASTER_MODULES[selectedModuleIndex] || MASTER_MODULES[0];

  // Group 24 Modules into 9 Master Categories for clean UI/UX
  const moduleCategories = [
    { title: '⚡ PART 1: Silicon Semiconductors & Physics', range: [0, 2] },
    { title: '🧮 PART 2: Binary Math, Encodings & Logic', range: [3, 5] },
    { title: '🧱 PART 3: Combinational & Sequential Circuits', range: [6, 8] },
    { title: '💻 PART 4: Microprocessor Architecture & CPU', range: [9, 12] },
    { title: '💾 PART 5: Memory Hierarchy, Cache & Storage', range: [13, 14] },
    { title: '⚙️ PART 6: Assembly, ISAs & Compilers', range: [15, 17] },
    { title: '🖥️ PART 7: OS Kernels, Virtual Memory & Runtimes', range: [18, 20] },
    { title: '🌐 PART 8: Web Browsers & Computer Networks', range: [21, 22] },
    { title: '🤖 PART 9: Artificial Intelligence & LLMs', range: [23, 23] },
  ];

  return (
    <div className="min-h-screen bg-surface-500 text-white flex flex-col items-center selection:bg-primary-500 selection:text-white transition-colors duration-300">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Body */}
      <main className="w-full flex-1 pt-16 flex flex-col items-center justify-start">
        {activeTab === 'curriculum' && (
          <div className="w-full max-w-5xl px-4 sm:px-8 py-8 flex flex-col items-center gap-8">
            {/* Hero Banner */}
            <motion.div
              className="text-center max-w-3xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block text-xs font-mono text-primary-400 mb-3 tracking-widest uppercase glass px-4 py-1.5 rounded-full border border-primary-500/30">
                Inside the Computer — 24 Master Module CS Degree Roadmap
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold gradient-text mb-4 leading-tight">
                From Silicon Transistors to Large Language Models
              </h1>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans">
                A 3-month comprehensive visual degree curriculum. Learn every concept through step-by-step interactive simulations!
              </p>
            </motion.div>

            {/* Categorized 24 Module Tree Browser */}
            <div className="w-full space-y-8">
              {moduleCategories.map((cat, catIdx) => (
                <motion.div
                  key={catIdx}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: catIdx * 0.05 }}
                >
                  <h2 className="text-sm font-mono font-bold text-primary-300 tracking-wider uppercase border-b border-primary-500/20 pb-2 flex items-center justify-between">
                    <span>{cat.title}</span>
                    <span className="text-[10px] text-white/40 font-normal">Modules {cat.range[0] + 1} - {cat.range[1] + 1}</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MASTER_MODULES.slice(cat.range[0], cat.range[1] + 1).map((mod) => {
                      const actualIdx = mod.moduleNumber - 1;
                      return (
                        <motion.div
                          key={mod.id}
                          onClick={() => {
                            setSelectedModuleIndex(actualIdx);
                            setActiveTab('simulations');
                          }}
                          className={`glass-strong p-6 rounded-3xl cursor-pointer flex flex-col justify-between gap-4 border transition-all hover:scale-[1.02] shadow-xl ${
                            selectedModuleIndex === actualIdx
                              ? 'border-primary-400 shadow-primary-500/20 bg-primary-500/10'
                              : 'border-white/10 hover:border-white/30'
                          }`}
                          whileHover={{ y: -3 }}
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="text-[10px] font-mono text-primary-300 uppercase tracking-widest block mb-1">
                                Module {mod.moduleNumber} of 24
                              </span>
                              <h3 className="text-base font-bold text-white flex items-center gap-2">
                                {mod.title}
                              </h3>
                              <p className="text-xs text-primary-200 font-mono mt-1">{mod.subtitle}</p>
                            </div>
                            <div className="w-9 h-9 rounded-2xl glass flex items-center justify-center text-primary-400 border border-primary-500/20">
                              <ChevronRight size={18} />
                            </div>
                          </div>

                          <p className="text-xs text-white/70 leading-relaxed font-sans">{mod.description}</p>

                          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs font-mono">
                            <span className="text-green-400 font-bold flex items-center gap-1">
                              <CheckCircle2 size={14} /> Capstone: {mod.capstoneProject.title}
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                openExplainModal(mod.title);
                              }}
                              className="text-[10px] text-yellow-300 flex items-center gap-1 hover:underline"
                            >
                              <Sparkles size={12} /> AI Explain
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'simulations' && (
          <div className="w-full flex flex-col items-center gap-6 pb-8">
            {/* Active Module Selector Button Header */}
            <div className="w-full max-w-3xl px-4 flex items-center justify-between glass p-3.5 rounded-2xl border border-primary-500/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-primary-500/20 border border-primary-400 flex items-center justify-center text-primary-300">
                  <Layers size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-primary-300 uppercase block">
                    Active Simulation Module {currentModule.moduleNumber} of 24
                  </span>
                  <h3 className="text-sm font-extrabold text-white font-mono">
                    {currentModule.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => setIsModuleDrawerOpen(!isModuleDrawerOpen)}
                className="px-3.5 py-1.5 rounded-xl glass text-xs font-mono text-white flex items-center gap-1.5 hover:bg-white/10 transition-all border border-white/10"
              >
                <Grid size={14} className="text-primary-400" /> Choose Module ({selectedModuleIndex + 1}/24)
              </button>
            </div>

            {/* Expandable Module Selector Drawer */}
            <AnimatePresence>
              {isModuleDrawerOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="w-full max-w-3xl px-4"
                >
                  <div className="glass-strong p-5 rounded-3xl border border-primary-500/30 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs font-mono">
                    {MASTER_MODULES.map((m, idx) => (
                      <button
                        key={m.id}
                        onClick={() => {
                          setSelectedModuleIndex(idx);
                          setIsModuleDrawerOpen(false);
                        }}
                        className={`p-2.5 rounded-xl text-left transition-all border flex flex-col gap-1 ${
                          selectedModuleIndex === idx
                            ? 'bg-primary-500 text-white border-primary-400 font-bold shadow-md shadow-primary-500/30'
                            : 'glass text-white/70 hover:text-white border-white/5'
                        }`}
                      >
                        <span className="text-[9px] opacity-60">Mod {m.moduleNumber}</span>
                        <span className="truncate">{m.title.split('.')[1] || m.title}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Universal Simulation Control Bar - only for modules with simulations */}
            {MASTER_MODULES[selectedModuleIndex]?.id && ['m2', 'm3'].includes(MASTER_MODULES[selectedModuleIndex].id) && (
              <UniversalSimulationControlBar />
            )}

            {/* Active Section Simulation Component */}
            <CurrentSection />
          </div>
        )}

        {activeTab === 'courses' && (
          <CourseManager
            profile={courseProfile}
            onSectionComplete={handleSectionComplete}
            onQuizComplete={handleQuizComplete}
          />
        )}

        {activeTab === 'quiz' && <QuizArena />}

        {activeTab === 'story' && (
          <div className="w-full max-w-4xl px-4 py-8 flex flex-col items-center gap-6">
            <div className="text-center">
              <span className="text-xs font-mono text-primary-400 tracking-widest uppercase mb-2 block">
                Story Mode Game Loop — The Engineer's Quest
              </span>
              <h1 className="text-3xl font-extrabold gradient-text">
                Build a Virtual Computer From Scratch
              </h1>
              <p className="text-xs text-white/70 max-w-md mx-auto mt-2">
                Unlock components step-by-step: ⚡ Transistor → Logic Gate → ALU → RAM → CPU → OS → Web → AI.
              </p>
            </div>

            <div className="w-full glass-strong p-8 rounded-3xl border border-primary-500/20 text-center space-y-4 shadow-xl">
              <Zap size={48} className="mx-auto text-yellow-400" />
              <h3 className="text-xl font-bold text-white">Component Unlocked: 1 Transistor Switch</h3>
              <p className="text-xs text-white/70 max-w-md mx-auto leading-relaxed">
                Aapne Voltage & NMOS Transistor switch ko master kar liya hai! Ab next level par NAND Gate unlock karne ke liye Module 2 & 3 complete karein.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'progress' && <ProgressDashboard />}
      </main>

      {/* Socratic AI Mentor Drawer ("Ada 3.0") */}
      <AIMentorDrawer />

      {/* "AI Explain Anything" Modal */}
      <AIExplainModal />
    </div>
  );
}
