import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Calendar, 
  Clock, 
  Flame,
  Star,
  BookOpen,
  Brain,
  Zap,
  Trophy,
  Medal
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

interface ProgressData {
  totalLessons: number;
  completedLessons: number;
  totalTime: number;
  streak: number;
  averageScore: number;
  subjectProgress: {
    [key: string]: {
      completed: number;
      total: number;
      averageScore: number;
    };
  };
  weeklyActivity: {
    day: string;
    minutes: number;
    lessons: number;
  }[];
}

interface ProgressProps {
  grade: number;
  subjects: string[];
}

export const Progress: React.FC<ProgressProps> = ({ grade, subjects }) => {
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    generateProgressData();
    generateAchievements();
  }, [grade, subjects]);

  const generateProgressData = () => {
    const data: ProgressData = {
      totalLessons: 32,
      completedLessons: 18,
      totalTime: 245, // minutes
      streak: 7,
      averageScore: 85,
      subjectProgress: {
        ela: { completed: 5, total: 8, averageScore: 88 },
        math: { completed: 6, total: 8, averageScore: 82 },
        science: { completed: 4, total: 8, averageScore: 86 },
        social: { completed: 3, total: 8, averageScore: 84 }
      },
      weeklyActivity: [
        { day: 'Mon', minutes: 45, lessons: 2 },
        { day: 'Tue', minutes: 30, lessons: 1 },
        { day: 'Wed', minutes: 60, lessons: 3 },
        { day: 'Thu', minutes: 25, lessons: 1 },
        { day: 'Fri', minutes: 40, lessons: 2 },
        { day: 'Sat', minutes: 35, lessons: 2 },
        { day: 'Sun', minutes: 10, lessons: 1 }
      ]
    };
    setProgressData(data);
  };

  const generateAchievements = () => {
    const achievementList: Achievement[] = [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first lesson',
        icon: BookOpen,
        color: 'text-emerald-500',
        unlocked: true,
        progress: 1,
        maxProgress: 1
      },
      {
        id: '2',
        title: 'Week Warrior',
        description: '7-day learning streak',
        icon: Flame,
        color: 'text-orange-500',
        unlocked: true,
        progress: 7,
        maxProgress: 7
      },
      {
        id: '3',
        title: 'Knowledge Seeker',
        description: 'Complete 10 lessons',
        icon: Brain,
        color: 'text-purple-500',
        unlocked: true,
        progress: 18,
        maxProgress: 10
      },
      {
        id: '4',
        title: 'Perfect Score',
        description: 'Get 100% on a practice test',
        icon: Star,
        color: 'text-yellow-500',
        unlocked: false,
        progress: 85,
        maxProgress: 100
      },
      {
        id: '5',
        title: 'Time Master',
        description: 'Study for 10 hours total',
        icon: Clock,
        color: 'text-blue-500',
        unlocked: true,
        progress: 245,
        maxProgress: 600
      },
      {
        id: '6',
        title: 'Subject Expert',
        description: 'Complete all lessons in one subject',
        icon: Trophy,
        color: 'text-amber-500',
        unlocked: false,
        progress: 6,
        maxProgress: 8
      },
      {
        id: '7',
        title: 'Quick Learner',
        description: 'Complete 5 lessons in one day',
        icon: Zap,
        color: 'text-indigo-500',
        unlocked: false,
        progress: 3,
        maxProgress: 5
      },
      {
        id: '8',
        title: 'Achievement Master',
        description: 'Unlock 10 achievements',
        icon: Medal,
        color: 'text-rose-500',
        unlocked: false,
        progress: 5,
        maxProgress: 10
      }
    ];
    setAchievements(achievementList);
  };

  const getSubjectColor = (subject: string) => {
    const colors: { [key: string]: string } = {
      ela: 'bg-blue-500',
      math: 'bg-emerald-500',
      science: 'bg-amber-500',
      social: 'bg-purple-500'
    };
    return colors[subject] || 'bg-gray-500';
  };

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      ela: '📚',
      math: '🔢',
      science: '🔬',
      social: '🌍'
    };
    return icons[subject] || '📖';
  };

  if (!progressData) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="animate-spin-slow">
            <TrendingUp className="w-12 h-12 text-primary-600 mx-auto mb-4" />
          </div>
          <p className="text-gray-600">Loading progress data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Target className="w-8 h-8" />
            <span className="text-2xl font-bold">{Math.round((progressData.completedLessons / progressData.totalLessons) * 100)}%</span>
          </div>
          <div className="text-sm opacity-90">Progress</div>
          <div className="text-xs opacity-75 mt-1">{progressData.completedLessons}/{progressData.totalLessons} lessons</div>
        </div>

        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-8 h-8" />
            <span className="text-2xl font-bold">{progressData.streak}</span>
          </div>
          <div className="text-sm opacity-90">Day Streak</div>
          <div className="text-xs opacity-75 mt-1">Keep it going!</div>
        </div>

        <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-8 h-8" />
            <span className="text-2xl font-bold">{Math.round(progressData.totalTime / 60)}h</span>
          </div>
          <div className="text-sm opacity-90">Study Time</div>
          <div className="text-xs opacity-75 mt-1">{progressData.totalTime} minutes total</div>
        </div>

        <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-2">
            <Star className="w-8 h-8" />
            <span className="text-2xl font-bold">{progressData.averageScore}%</span>
          </div>
          <div className="text-sm opacity-90">Average Score</div>
          <div className="text-xs opacity-75 mt-1">Great job!</div>
        </div>
      </div>

      {/* Subject Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <BookOpen className="w-6 h-6 mr-2 text-primary-600" />
          Subject Progress
        </h3>
        
        <div className="space-y-4">
          {Object.entries(progressData.subjectProgress).map(([subject, progress]) => (
            <div key={subject} className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-2xl">
                {getSubjectIcon(subject)}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 capitalize">{subject}</span>
                  <span className="text-sm text-gray-600">{progress.completed}/{progress.total} lessons</span>
                </div>
                
                <div className="bg-gray-200 rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full ${getSubjectColor(subject)} transition-all duration-500`}
                    style={{ width: `${(progress.completed / progress.total) * 100}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Avg Score: {progress.averageScore}%</span>
                  <span>{Math.round((progress.completed / progress.total) * 100)}% complete</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Activity */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-primary-600" />
            Weekly Activity
          </h3>
          
          <div className="flex space-x-2">
            {(['week', 'month', 'all'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setSelectedTimeRange(range)}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                  selectedTimeRange === range
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          {progressData.weeklyActivity.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs text-gray-500 mb-2">{day.day}</div>
              <div className="relative">
                <div 
                  className="bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg transition-all duration-500 hover:from-purple-600 hover:to-pink-600"
                  style={{ height: `${Math.max((day.minutes / 60) * 100, 10)}px` }}
                />
                <div className="text-xs text-gray-700 mt-1 font-medium">{day.minutes}</div>
                <div className="text-xs text-gray-500">{day.lessons}L</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Award className="w-6 h-6 mr-2 text-primary-600" />
          Achievements
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`relative rounded-lg p-4 border-2 transition-all duration-300 hover:shadow-lg ${
                achievement.unlocked
                  ? 'border-amber-300 bg-gradient-to-br from-amber-50 to-orange-50'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center mb-3">
                <achievement.icon className={`w-8 h-8 mr-3 ${achievement.color}`} />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 text-sm">{achievement.title}</h4>
                  <p className="text-xs text-gray-600">{achievement.description}</p>
                </div>
              </div>
              
              {!achievement.unlocked && (
                <div className="mt-3">
                  <div className="bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-center">
                    {achievement.progress}/{achievement.maxProgress}
                  </div>
                </div>
              )}
              
              {achievement.unlocked && (
                <div className="absolute top-2 right-2">
                  <Star className="w-4 h-4 text-amber-500 fill-current" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
