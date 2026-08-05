import { useState } from 'react';
import { COURSES } from './data/courses';
import type { LearnerProfile } from './types';
import CourseShell from './components/CourseShell';
import CourseBrowser from './components/CourseBrowser';

interface CourseManagerProps {
  profile: LearnerProfile;
  onSectionComplete: (sectionId: string) => void;
  onQuizComplete: (sectionId: string, score: number) => void;
}

export default function CourseManager({ profile, onSectionComplete, onQuizComplete }: CourseManagerProps) {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const activeCourse = COURSES.find((c) => c.id === activeCourseId);

  if (activeCourse) {
    return (
      <CourseShell
        courseId={activeCourse.id}
        title={activeCourse.title}
        sections={activeCourse.sections}
        profile={profile}
        onSectionComplete={onSectionComplete}
        onQuizComplete={onQuizComplete}
        onBack={() => setActiveCourseId(null)}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl px-4 sm:px-8 py-8">
      <CourseBrowser
        courses={COURSES}
        profile={profile}
        onStartCourse={(id) => setActiveCourseId(id)}
      />
    </div>
  );
}
