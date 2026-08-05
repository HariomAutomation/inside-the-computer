import { motion } from 'framer-motion';
import { BookOpen, Clock, Cpu, Database, Zap, ChevronRight } from 'lucide-react';
import type { Course, LearnerProfile } from '../types';

interface CourseBrowserProps {
  courses: Course[];
  profile: LearnerProfile;
  onStartCourse: (courseId: string) => void;
}

const COURSE_ICONS: Record<string, React.ReactNode> = {
  'what-is-a-computer': <Cpu className="w-8 h-8" />,
  'how-cpus-work': <Zap className="w-8 h-8" />,
  'memory-and-storage': <Database className="w-8 h-8" />,
};

const COURSE_COLORS: Record<string, { from: string; to: string; border: string }> = {
  'what-is-a-computer': { from: 'from-blue-500/20', to: 'to-cyan-500/20', border: 'border-blue-500/30' },
  'how-cpus-work': { from: 'from-purple-500/20', to: 'to-pink-500/20', border: 'border-purple-500/30' },
  'memory-and-storage': { from: 'from-amber-500/20', to: 'to-orange-500/20', border: 'border-amber-500/30' },
};

export default function CourseBrowser({ courses, profile, onStartCourse }: CourseBrowserProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <BookOpen className="w-6 h-6 text-primary-400" />
        <h2 className="text-xl font-bold">Learning Paths</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course, i) => {
          const colors = COURSE_COLORS[course.id] || COURSE_COLORS['what-is-a-computer'];
          const courseProg = profile.courseProgress?.[course.id];
          const completedSections = courseProg ? Object.keys(courseProg.sections).length : 0;
          const totalSections = course.sections.length;
          const pct = Math.round((completedSections / totalSections) * 100);

          return (
            <motion.button
              key={course.id}
              onClick={() => onStartCourse(course.id)}
              className={`glass rounded-2xl border ${colors.border} p-6 text-left hover:scale-[1.02] transition-all group relative overflow-hidden`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${colors.from} ${colors.to} opacity-0 group-hover:opacity-100 transition-opacity`} />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl glass border border-white/10">
                    {COURSE_ICONS[course.id] || <BookOpen className="w-8 h-8 text-white/60" />}
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
                </div>

                <h3 className="font-bold text-sm mb-2">{course.title}</h3>
                <p className="text-xs text-white/50 mb-4 line-clamp-2">{course.description}</p>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-surface-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary-500 to-purple-500 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">{completedSections}/{totalSections}</span>
                </div>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {totalSections} sections
                  </span>
                  <span className="text-[10px] text-white/40 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> {course.sections.reduce((a, s) => a + (s.quiz?.length || 0), 0)} quizzes
                  </span>
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
