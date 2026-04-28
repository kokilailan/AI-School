import React from 'react';
import type { Lesson } from '../types/curriculum';
import { Brain, Clock, Target } from 'lucide-react';

interface LessonListProps {
  lessons: Lesson[];
  selectedLesson: Lesson | null;
  onLessonSelect: (lesson: Lesson) => void;
  loading?: boolean;
}

export const LessonList: React.FC<LessonListProps> = ({
  lessons,
  selectedLesson,
  onLessonSelect,
  loading = false
}) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <Brain className="w-6 h-6 text-primary-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Lessons</h2>
      </div>
      
      {lessons.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Brain className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p>No lessons available for this selection.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => onLessonSelect(lesson)}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                selectedLesson?.id === lesson.id
                  ? 'border-primary-500 bg-primary-50 shadow-md'
                  : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {lesson.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {lesson.explanation}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>15-20 min</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-3 h-3 mr-1" />
                      <span>{lesson.keyPoints.length} key points</span>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4">
                  <div className="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                    {lesson.order}
                  </div>
                </div>
              </div>
              
              {/* Key points preview */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1">
                  {lesson.keyPoints.slice(0, 3).map((point) => (
                    <span
                      key={point.id}
                      className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                    >
                      {point.text}
                    </span>
                  ))}
                  {lesson.keyPoints.length > 3 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{lesson.keyPoints.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
