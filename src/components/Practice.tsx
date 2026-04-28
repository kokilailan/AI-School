import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Trophy, Target, Zap, Star } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface PracticeProps {
  lessonTitle: string;
  subject: string;
  grade: number;
}

export const Practice: React.FC<PracticeProps> = ({ lessonTitle, subject, grade }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [streak, setStreak] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  useEffect(() => {
    generateQuestions();
  }, [lessonTitle, subject, grade]);

  const generateQuestions = () => {
    const generatedQuestions: Question[] = [
      {
        id: '1',
        question: `What is the main concept of ${lessonTitle}?`,
        options: [
          'Understanding the basics',
          'Advanced applications',
          'Historical context',
          'Mathematical formulas'
        ],
        correctAnswer: 0,
        explanation: `The main concept focuses on understanding the fundamental basics of ${lessonTitle}.`,
        difficulty: 'easy'
      },
      {
        id: '2',
        question: `Which of these best describes ${lessonTitle}?`,
        options: [
          'Complex and difficult',
          'Simple and straightforward',
          'Moderate difficulty',
          'Very challenging'
        ],
        correctAnswer: 1,
        explanation: `${lessonTitle} is designed to be simple and straightforward for grade ${grade} students.`,
        difficulty: 'easy'
      },
      {
        id: '3',
        question: `How would you apply ${lessonTitle} in real life?`,
        options: [
          'Never use it',
          'Use it in daily activities',
          'Only in exams',
          'For entertainment only'
        ],
        correctAnswer: 1,
        explanation: `${lessonTitle} can be applied in many daily activities and real-life situations.`,
        difficulty: 'medium'
      },
      {
        id: '4',
        question: `What is the most important skill to learn in ${lessonTitle}?`,
        options: [
          'Memorization',
          'Understanding and application',
          'Speed',
          'Competition'
        ],
        correctAnswer: 1,
        explanation: `Understanding and application are the most important skills in ${lessonTitle}.`,
        difficulty: 'medium'
      },
      {
        id: '5',
        question: `Why is ${lessonTitle} important for your education?`,
        options: [
          'It builds foundation',
          'It\'s required',
          'It\'s easy',
          'It\'s fun'
        ],
        correctAnswer: 0,
        explanation: `${lessonTitle} builds a strong foundation for future learning.`,
        difficulty: 'hard'
      }
    ];

    setQuestions(generatedQuestions);
    setTotalQuestions(generatedQuestions.length);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (answered) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setAnswered(true);
    setShowResult(true);
    
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setAnswered(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnswered(false);
    setStreak(0);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'hard': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStreakBadge = () => {
    if (streak >= 5) return { icon: Trophy, color: 'text-amber-500', label: 'On Fire!' };
    if (streak >= 3) return { icon: Zap, color: 'text-blue-500', label: 'Hot Streak!' };
    if (streak >= 2) return { icon: Star, color: 'text-purple-500', label: 'Good!' };
    return null;
  };

  const streakBadge = getStreakBadge();

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin-slow">
            <Target className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          </div>
          <p className="text-gray-600">Loading practice questions...</p>
        </div>
      </div>
    );
  }

  if (currentQuestion >= questions.length) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="mb-6">
            <Trophy className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-bounce-slow" />
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Practice Complete!</h2>
            <div className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {score}/{totalQuestions}
            </div>
            <p className="text-gray-600 text-lg">
              You got {Math.round((score / totalQuestions) * 100)}% correct!
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-emerald-50 rounded-lg p-4">
              <CheckCircle className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-700">{score}</div>
              <div className="text-sm text-emerald-600">Correct</div>
            </div>
            <div className="bg-rose-50 rounded-lg p-4">
              <XCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-rose-700">{totalQuestions - score}</div>
              <div className="text-sm text-rose-600">Incorrect</div>
            </div>
            <div className="bg-amber-50 rounded-lg p-4">
              <Zap className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-amber-700">{streak}</div>
              <div className="text-sm text-amber-600">Best Streak</div>
            </div>
          </div>
          
          <button
            onClick={handleRestart}
            className="btn-primary bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-white">Practice Mode</h3>
          {streakBadge && (
            <div className={`flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2`}>
              <streakBadge.icon className={`w-5 h-5 ${streakBadge.color}`} />
              <span className="text-white font-medium">{streakBadge.label}</span>
            </div>
          )}
        </div>
        
        {/* Progress */}
        <div className="bg-white/20 backdrop-blur-sm rounded-full h-3 mb-4">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        
        <div className="flex items-center justify-between text-white">
          <span className="text-sm">Question {currentQuestion + 1} of {questions.length}</span>
          <div className="flex items-center space-x-4">
            <span className="text-sm">Score: {score}</span>
            <span className="text-sm">Streak: {streak}🔥</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xl font-semibold text-gray-900">{question.question}</h4>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
              {question.difficulty}
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = showResult && isCorrect;
            const showIncorrect = showResult && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={answered}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  showCorrect
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : showIncorrect
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : isSelected
                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                    : 'border-gray-200 hover:border-purple-300 hover:bg-gray-50'
                } ${answered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                    showCorrect
                      ? 'border-emerald-500 bg-emerald-500'
                      : showIncorrect
                      ? 'border-rose-500 bg-rose-500'
                      : isSelected
                      ? 'border-purple-500 bg-purple-500'
                      : 'border-gray-300'
                  }`}>
                    {(showCorrect || showIncorrect || isSelected) && (
                      <div className="w-2 h-2 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                  {showCorrect && <CheckCircle className="w-5 h-5 ml-auto text-emerald-500" />}
                  {showIncorrect && <XCircle className="w-5 h-5 ml-auto text-rose-500" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`p-4 rounded-lg mb-6 ${
            selectedAnswer === question.correctAnswer
              ? 'bg-emerald-50 border border-emerald-200'
              : 'bg-amber-50 border border-amber-200'
          }`}>
            <div className="flex items-start">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle className="w-5 h-5 text-emerald-500 mr-3 mt-0.5" />
              ) : (
                <XCircle className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
              )}
              <div>
                <p className="font-medium text-gray-900 mb-1">
                  {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not quite right'}
                </p>
                <p className="text-gray-700 text-sm">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between">
          {!answered ? (
            <button
              onClick={handleSubmitAnswer}
              disabled={selectedAnswer === null}
              className="btn-primary bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500"
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="btn-primary bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
