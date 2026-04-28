import { useState, useEffect } from 'react';
import { GradeSelector } from './components/GradeSelector';
import { SubjectSelector } from './components/SubjectSelector';
import { LessonList } from './components/LessonList';
import { MindMapVisualization } from './components/MindMap';
import { AITutor } from './components/AITutor';
import { Practice } from './components/Practice';
import { Progress } from './components/Progress';
import { Games } from './components/Games';
import { Resources } from './components/Resources';
import { grades, subjects, getLessonsByGradeAndSubject } from './data/curriculum';
import { generateMindMap } from './utils/mindMapGenerator';
import type { Lesson, Grade, Subject } from './types/curriculum';
import { 
  Brain, 
  Sparkles, 
  BookOpen, 
  Target,
  Gamepad2,
  Download,
  TrendingUp,
  Home
} from 'lucide-react';

type TabType = 'home' | 'practice' | 'progress' | 'games' | 'resources';

function App() {
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [availableLessons, setAvailableLessons] = useState<Lesson[]>([]);
  const [mindMapData, setMindMapData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [activeLessonTab, setActiveLessonTab] = useState<'mindmap' | 'tutor'>('mindmap');

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
    setActiveTab('home');
  };

  const getTabIcon = (tab: TabType) => {
    switch (tab) {
      case 'home': return Home;
      case 'practice': return Target;
      case 'progress': return TrendingUp;
      case 'games': return Gamepad2;
      case 'resources': return Download;
      default: return Home;
    }
  };

  const getTabLabel = (tab: TabType) => {
    switch (tab) {
      case 'home': return 'Learn';
      case 'practice': return 'Practice';
      case 'progress': return 'Progress';
      case 'games': return 'Games';
      case 'resources': return 'Resources';
      default: return 'Home';
    }
  };

  const getTabColor = (tab: TabType) => {
    switch (tab) {
      case 'home': return 'from-blue-500 to-purple-600';
      case 'practice': return 'from-emerald-500 to-teal-600';
      case 'progress': return 'from-purple-500 to-pink-600';
      case 'games': return 'from-orange-500 to-red-600';
      case 'resources': return 'from-cyan-500 to-blue-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const tabs: TabType[] = ['home', 'practice', 'progress', 'games', 'resources'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-lg border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="relative">
                <Brain className="w-8 h-8 text-purple-600 mr-3 animate-pulse" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Mind Spark AI School
                </h1>
                <p className="text-sm text-gray-600">Learn anything with your personal AI teacher</p>
              </div>
            </div>
            
            {(selectedGrade || selectedSubject || selectedLesson) && (
              <button
                onClick={resetSelection}
                className="btn-secondary bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      {selectedGrade && selectedSubject && (
        <div className="relative bg-white/60 backdrop-blur-sm border-b border-purple-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const IconComponent = getTabIcon(tab);
                const isActive = activeTab === tab;
                
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${getTabColor(tab)} text-white shadow-lg transform -translate-y-1`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="font-medium">{getTabLabel(tab)}</span>
                    {isActive && (
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {!selectedGrade && !selectedSubject && !selectedLesson && (
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-full animate-gradient">
                  <Sparkles className="w-12 h-12 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            <h2 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-4 animate-gradient">
              Welcome to Your AI Learning Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stop memorizing. Start understanding with AI-powered learning. 
              Choose your grade below to begin your personalized education experience.
            </p>
            
            <div className="flex justify-center space-x-4 mt-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-purple-600">8+</div>
                <div className="text-sm text-gray-600">Grades</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-pink-600">4</div>
                <div className="text-sm text-gray-600">Subjects</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <div className="text-3xl font-bold text-blue-600">AI</div>
                <div className="text-sm text-gray-600">Powered</div>
              </div>
            </div>
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

        {/* Tab Content */}
        {selectedGrade && selectedSubject && (
          <div>
            {/* Home Tab - Lessons */}
            {activeTab === 'home' && !selectedLesson && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <LessonList
                    lessons={availableLessons}
                    selectedLesson={selectedLesson}
                    onLessonSelect={setSelectedLesson}
                  />
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">
                      {getGradeById(selectedGrade)?.name} - {getSubjectById(selectedSubject)?.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
                        <span>{availableLessons.length} lessons available</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Brain className="w-4 h-4 mr-2 text-pink-500" />
                        <span>AI-powered learning</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-2 text-emerald-500" />
                        <span>Interactive practice</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Gamepad2 className="w-4 h-4 mr-2 text-orange-500" />
                        <span>Educational games</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Lesson Content */}
            {activeTab === 'home' && selectedLesson && mindMapData && (
              <div>
                {/* Lesson Header */}
                <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
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
                      onClick={() => setActiveLessonTab('mindmap')}
                      className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                        activeLessonTab === 'mindmap'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      🧠 Mind Map
                    </button>
                    <button
                      onClick={() => setActiveLessonTab('tutor')}
                      className={`flex-1 py-2 px-4 rounded-md transition-all duration-300 ${
                        activeLessonTab === 'tutor'
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      🤖 AI Tutor
                    </button>
                  </div>
                </div>

                {/* Tab Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    {activeLessonTab === 'mindmap' ? (
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
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Target className="w-5 h-5 mr-2 text-purple-500" />
                        Key Points
                      </h3>
                      <div className="space-y-2">
                        {selectedLesson.keyPoints.map((point) => (
                          <div key={point.id} className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span className="text-sm text-gray-700">{point.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Deep Explanation */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-pink-500" />
                        Deep Explanation
                      </h3>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {selectedLesson.deepExplanation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Practice Tab */}
            {activeTab === 'practice' && (
              <Practice
                lessonTitle={selectedLesson?.title || 'Current Lesson'}
                subject={selectedSubject}
                grade={selectedGrade}
              />
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <Progress
                grade={selectedGrade}
                subjects={getGradeById(selectedGrade)?.subjects || []}
              />
            )}

            {/* Games Tab */}
            {activeTab === 'games' && (
              <Games
                subject={selectedSubject}
                grade={selectedGrade}
              />
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <Resources
                subject={selectedSubject}
                grade={selectedGrade}
              />
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-white/80 backdrop-blur-sm border-t border-purple-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <div className="flex justify-center space-x-4 mb-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>
            <p>&copy; 2024 Mind Spark AI School. Powered by AI for better learning. 🚀</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
