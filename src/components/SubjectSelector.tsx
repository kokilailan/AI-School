import React from 'react';
import type { Subject } from '../types/curriculum';

interface SubjectSelectorProps {
  subjects: Subject[];
  availableSubjects: string[];
  selectedSubject: string | null;
  onSubjectSelect: (subjectId: string) => void;
}

export const SubjectSelector: React.FC<SubjectSelectorProps> = ({
  subjects,
  availableSubjects,
  selectedSubject,
  onSubjectSelect
}) => {
  const filteredSubjects = subjects.filter(subject => 
    availableSubjects.includes(subject.id)
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex items-center mb-6">
        <div className="w-6 h-6 text-primary-600 mr-3">📖</div>
        <h2 className="text-2xl font-bold text-gray-800">Choose Subject</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredSubjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => onSubjectSelect(subject.id)}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              selectedSubject === subject.id
                ? 'border-primary-500 bg-primary-50 text-primary-700 transform scale-105'
                : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-3xl mb-2">{subject.icon}</div>
            <div className="font-semibold mb-1" style={{ color: subject.color }}>
              {subject.name}
            </div>
            <div className="text-xs text-gray-600">{subject.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
