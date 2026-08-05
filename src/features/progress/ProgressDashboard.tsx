import { Award, Flame, Zap, Dna, Calendar, CheckCircle2 } from 'lucide-react';
import { useProgressStore } from '../../stores/useProgressStore';
import { useDNAStore } from '../../stores/useDNAStore';

export default function ProgressDashboard() {
  const { xp, level, currentStreakDays, monthlyStreakDays, achievements, activityHeatmap } = useProgressStore();
  const dna = useDNAStore();

  const days = Object.keys(activityHeatmap);

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-8 py-8">
      {/* Header */}
      <div className="text-center">
        <span className="text-xs font-mono text-primary-400 tracking-widest uppercase mb-2 block">
          Learner Mastery & Analytics Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold gradient-text">
          Your Computer Science Journey
        </h1>
      </div>

      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <div className="glass-strong p-6 rounded-3xl border border-yellow-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-yellow-500/20 text-yellow-400 flex items-center justify-center font-bold">
            <Zap size={24} />
          </div>
          <div>
            <span className="text-xs text-white/50 font-mono block">Total XP Earned</span>
            <span className="text-2xl font-extrabold font-mono text-white">{xp} XP</span>
            <span className="text-[10px] text-yellow-400 font-mono block">Level {level} Architect</span>
          </div>
        </div>

        <div className="glass-strong p-6 rounded-3xl border border-orange-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
            <Flame size={24} />
          </div>
          <div>
            <span className="text-xs text-white/50 font-mono block">Learning Streak</span>
            <span className="text-2xl font-extrabold font-mono text-white">{currentStreakDays} Days</span>
            <span className="text-[10px] text-orange-400 font-mono block">{monthlyStreakDays} Days this month</span>
          </div>
        </div>

        <div className="glass-strong p-6 rounded-3xl border border-green-500/30 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-green-500/20 text-green-400 flex items-center justify-center font-bold">
            <Award size={24} />
          </div>
          <div>
            <span className="text-xs text-white/50 font-mono block">Achievements Unlocked</span>
            <span className="text-2xl font-extrabold font-mono text-white">{achievements.length} Badges</span>
            <span className="text-[10px] text-green-400 font-mono block">Silicon Master Class</span>
          </div>
        </div>
      </div>

      {/* Learning DNA Profile */}
      <div className="w-full glass-strong rounded-3xl p-6 sm:p-8 border border-primary-500/20 flex flex-col gap-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2 text-primary-300 font-mono font-bold text-base">
            <Dna size={20} className="text-purple-400" /> Learning DNA Profile (Adaptive AI)
          </div>
          <span className="text-xs font-mono text-purple-300 glass px-3 py-1 rounded-lg">
            Style: {dna.primaryLearningStyle}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Visual Learner */}
          <div className="glass p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/80">Visual Simulations</span>
              <span className="text-primary-300 font-bold">{dna.visualLearnerPercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-500 rounded-full overflow-hidden">
              <div className="h-full bg-primary-400" style={{ width: `${dna.visualLearnerPercent}%` }} />
            </div>
          </div>

          {/* Hardware */}
          <div className="glass p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/80">Hardware & Circuits</span>
              <span className="text-green-400 font-bold">{dna.hardwarePercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-500 rounded-full overflow-hidden">
              <div className="h-full bg-green-400" style={{ width: `${dna.hardwarePercent}%` }} />
            </div>
          </div>

          {/* Coding */}
          <div className="glass p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/80">Coding & Compilers</span>
              <span className="text-purple-300 font-bold">{dna.codingPercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-500 rounded-full overflow-hidden">
              <div className="h-full bg-purple-400" style={{ width: `${dna.codingPercent}%` }} />
            </div>
          </div>

          {/* Theory */}
          <div className="glass p-4 rounded-2xl space-y-2">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-white/80">Theory & Architecture</span>
              <span className="text-yellow-300 font-bold">{dna.theoryPercent}%</span>
            </div>
            <div className="w-full h-2 bg-surface-500 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400" style={{ width: `${dna.theoryPercent}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Activity Heatmap & Badges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {/* Activity Heatmap */}
        <div className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <h3 className="font-bold text-sm font-mono text-white flex items-center gap-2">
            <Calendar size={18} className="text-primary-400" /> Learning Activity Heatmap
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {days.map((date) => (
              <div
                key={date}
                className="w-10 h-10 rounded-xl glass border border-primary-500/30 flex flex-col items-center justify-center text-[10px] font-mono text-white/80"
                title={`${date}: ${activityHeatmap[date]} lessons completed`}
              >
                <span>{date.slice(8)}</span>
                <span className="text-green-400 font-bold">+{activityHeatmap[date]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Badges */}
        <div className="glass-strong rounded-3xl p-6 border border-white/10 flex flex-col gap-4">
          <h3 className="font-bold text-sm font-mono text-white flex items-center gap-2">
            <CheckCircle2 size={18} className="text-green-400" /> Unlocked Badges
          </h3>
          <div className="space-y-3">
            {achievements.map((ach) => (
              <div key={ach.id} className="glass p-3 rounded-2xl flex items-center gap-3 border border-white/5">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-xl">
                  {ach.icon}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{ach.title}</h4>
                  <p className="text-[11px] text-white/60">{ach.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
