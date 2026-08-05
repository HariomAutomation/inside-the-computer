import { Cpu, Zap, Flame, Award, Bot, BookOpen, Layers, HelpCircle, Sun, Moon } from 'lucide-react';
import { useProgressStore } from '../../stores/useProgressStore';
import { useMentorStore } from '../../stores/useMentorStore';
import { useThemeStore } from '../../stores/useThemeStore';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const { xp, level, currentStreakDays } = useProgressStore();
  const { toggleDrawer } = useMentorStore();
  const { theme, toggleTheme } = useThemeStore();

  const navItems = [
    { id: 'curriculum', label: 'Curriculum', icon: <BookOpen size={16} /> },
    { id: 'courses', label: 'Courses', icon: <Layers size={16} /> },
    { id: 'simulations', label: 'Simulators', icon: <Layers size={16} /> },
    { id: 'quiz', label: 'Quiz Arena', icon: <HelpCircle size={16} /> },
    { id: 'story', label: 'Story Mode', icon: <Cpu size={16} /> },
    { id: 'progress', label: 'Progress & DNA', icon: <Award size={16} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 glass-strong z-50 px-4 sm:px-8 flex items-center justify-between border-b border-primary-500/20">
      {/* Brand & Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setActiveTab('curriculum')}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-500 to-purple-600 flex items-center justify-center shadow-lg shadow-primary-500/30">
          <Cpu className="text-white" size={22} />
        </div>
        <div>
          <span className="font-extrabold text-sm sm:text-base gradient-text block leading-none">
            Inside the Computer
          </span>
          <span className="text-[10px] font-mono text-primary-400 tracking-wider uppercase">
            From Electricity to AI
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="hidden md:flex items-center gap-1 glass p-1.5 rounded-2xl border border-white/10">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === item.id
                ? 'bg-primary-500 text-white shadow-md shadow-primary-500/30'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>

      {/* Gamification Stats & Theme & AI Mentor */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Light / Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl glass text-yellow-400 hover:scale-110 transition-all border border-yellow-500/20"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} className="text-purple-400" />}
        </button>

        {/* Streak */}
        <div className="glass px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-mono text-orange-400 border border-orange-500/20">
          <Flame size={16} className="fill-orange-400" />
          <span className="font-bold">{currentStreakDays}d</span>
        </div>

        {/* XP & Level */}
        <div className="glass px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-xs font-mono text-yellow-400 border border-yellow-500/20">
          <Zap size={16} className="fill-yellow-400" />
          <span className="font-bold">{xp} XP (Lvl {level})</span>
        </div>

        {/* Socratic AI Mentor Button */}
        <button
          onClick={toggleDrawer}
          className="relative px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-primary-500 text-white font-mono text-xs font-bold flex items-center gap-2 shadow-lg shadow-purple-500/30 hover:brightness-110 transition-all"
        >
          <Bot size={18} />
          <span className="hidden sm:inline">Ada AI</span>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        </button>
      </div>
    </nav>
  );
}
