import React, { useState, useEffect } from 'react';
import { GradeSelector } from './components/GradeSelector';
import { SubjectSelector } from './components/SubjectSelector';
import { LessonList } from './components/LessonList';
import { MindMapVisualization } from './components/MindMap';
import { AITutor } from './components/AITutor';
import { grades, subjects, getLessonsByGradeAndSubject } from './data/curriculum';
import { generateMindMap } from './utils/mindMapGenerator';
import type { Lesson, Grade, Subject } from './types/curriculum';
import { Brain, Sparkles, BookOpen } from 'lucide-react';

function App() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [availableLessons, setAvailableLessons] = useState<Lesson[]>([]);
  const [mindMapData, setMindMapData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'mindmap' | 'tutor'>('mindmap');

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      const lessons = getLessonsByGradeAndSubject(selectedGrade, selectedSubject);
      setAvailableLessons(lessons);
      setSelectedLesson(null);
      setMindMapData(null);
    }
  }, [selectedGrade, selectedSubject]);

  useEffect(() => {
    if (selectedLesson) {
      const mindMap = generateMindMap(selectedLesson);
      setMindMapData(mindMap);
    }
  }, [selectedLesson]);

  const getGradeById = (gradeId: number): Grade | undefined => {
    return grades.find(g => g.id === gradeId);
  };

  const getSubjectById = (subjectId: string): Subject | undefined => {
    return subjects.find(s => s.id === subjectId);
  };

  const resetSelection = () => {
    setSelectedGrade(null);
    setSelectedSubject(null);
    setSelectedLesson(null);
    setAvailableLessons([]);
    setMindMapData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Mind Spark AI School</h1>
                <p className="text-sm text-gray-600">Learn anything with your personal AI teacher</p>
              </div>
            </div>
            
            {(selectedGrade || selectedSubject || selectedLesson) && (
              <button
                onClick={resetSelection}
                className="btn-secondary"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {!selectedGrade && !selectedSubject && !selectedLesson && (
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-primary-100 p-6 rounded-full">
                <Sparkles className="w-12 h-12 text-primary-600" />
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Your AI Learning Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stop memorizing. Start understanding with AI-powered learning. 
              Choose your grade below to begin your personalized education experience.
            </p>
          </div>
        )}

        {/* Grade Selection */}
        {!selectedGrade && (
          <GradeSelector
            grades={grades}
            selectedGrade={selectedGrade}
            onGradeSelect={setSelectedGrade}
          />
        )}

        {/* Subject Selection */}
        {selectedGrade && !selectedSubject && (
          <SubjectSelector
            subjects={subjects}
            availableSubjects={getGradeById(selectedGrade)?.subjects || []}
            selectedSubject={selectedSubject}
            onSubjectSelect={setSelectedSubject}
          />
        )}

        {/* Lesson List */}
        {selectedGrade && selectedSubject && !selectedLesson && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <LessonList
                lessons={availableLessons}
                selectedLesson={selectedLesson}
                onLessonSelect={setSelectedLesson}
              />
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {getGradeById(selectedGrade)?.name} - {getSubjectById(selectedSubject)?.name}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <BookOpen className="w-4 h-4 mr-2" />
                    <span>{availableLessons.length} lessons available</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Brain className="w-4 h-4 mr-2" />
                    <span>AI-powered learning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lesson Content */}
        {selectedLesson && mindMapData && (
          <div>
            {/* Lesson Header */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedLesson.title}
                  </h2>
                  <p className="text-lg text-gray-600">
                    {selectedLesson.explanation}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="btn-secondary"
                >
                  Back to Lessons
                </button>
              </div>
              
              {/* Tab Navigation */}
              <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setActiveTab('mindmap')}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'mindmap'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Mind Map
                </button>
                <button
                  onClick={() => setActiveTab('tutor')}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    activeTab === 'tutor'
                      ? 'bg-white text-primary-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  AI Tutor
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {activeTab === 'mindmap' ? (
                  <MindMapVisualization mindMap={mindMapData.mindMap} />
                ) : (
                  <AITutor
                    lessonTitle={selectedLesson.title}
                    lessonExplanation={selectedLesson.explanation}
                  />
                )}
              </div>
              
              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Key Points */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Points</h3>
                  <div className="space-y-2">
                    {selectedLesson.keyPoints.map((point) => (
                      <div key={point.id} className="flex items-start">
                        <span className="text-primary-500 mr-2">•</span>
                        <span className="text-sm text-gray-700">{point.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deep Explanation */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Deep Explanation</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedLesson.deepExplanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Mind Spark AI School. Powered by AI for better learning.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
