import { useState } from 'react';
import { COURSES } from './data/courses';
import type { LearnerProfile } from './types';
import CourseShell from './components/CourseShell';
import CourseBrowser from './components/CourseBrowser';

interface CourseManagerProps {
  profile: LearnerProfile;
  onSectionComplete: (courseId: string, sectionId: string) => void;
  onQuizComplete: (courseId: string, sectionId: string, score: number) => void;
}

export default function CourseManager({ profile, onSectionComplete, onQuizComplete }: CourseManagerProps) {
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);

  const activeCourse = COURSES.find((c) => c.id === activeCourseId);
  const currentCourseIdx = COURSES.findIndex((c) => c.id === activeCourseId);
  const nextCourse = currentCourseIdx >= 0 && currentCourseIdx < COURSES.length - 1 ? COURSES[currentCourseIdx + 1] : null;

  if (activeCourse) {
    return (
      <CourseShell
        courseId={activeCourse.id}
        title={activeCourse.title}
        sections={activeCourse.sections}
        profile={profile}
        onSectionComplete={(_courseId, sectionId) => onSectionComplete(activeCourse.id, sectionId)}
        onQuizComplete={(_courseId, sectionId, score) => onQuizComplete(activeCourse.id, sectionId, score)}
        onBack={() => setActiveCourseId(null)}
        onNextCourse={nextCourse ? () => setActiveCourseId(nextCourse.id) : undefined}
        nextCourseTitle={nextCourse?.title}
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
