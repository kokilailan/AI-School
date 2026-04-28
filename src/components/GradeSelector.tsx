import React from 'react';
import type { Grade } from '../types/curriculum';
import { User } from 'lucide-react';

interface GradeSelectorProps {
  grades: Grade[];
  selectedGrade: number | null;
  onGradeSelect: (gradeId: number) => void;
}

export const GradeSelector: React.FC<GradeSelectorProps> = ({
  grades,
  selectedGrade,
  onGradeSelect
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <User className="w-6 h-6 text-primary-600 mr-3" />
        <h2 className="text-2xl font-bold text-gray-800">Select Your Grade</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {grades.map((grade) => (
          <button
            key={grade.id}
            onClick={() => onGradeSelect(grade.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedGrade === grade.id
                ? 'border-primary-500 bg-primary-50 text-primary-700 transform scale-105'
                : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-lg font-bold mb-1">{grade.name}</div>
            <div className="text-xs text-gray-600">{grade.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
