import type { Lesson, Subject, Grade } from '../types/curriculum';

export const subjects: Subject[] = [
  {
    id: 'ela',
    name: 'English Language Arts',
    description: 'Reading, writing, and communication skills',
    color: '#3b82f6',
    icon: '📚'
  },
  {
    id: 'math',
    name: 'Mathematics',
    description: 'Numbers, patterns, and problem-solving',
    color: '#10b981',
    icon: '🔢'
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Exploring the natural world',
    color: '#f59e0b',
    icon: '🔬'
  },
  {
    id: 'social',
    name: 'Social Studies',
    description: 'History, geography, and communities',
    color: '#8b5cf6',
    icon: '🌍'
  }
];

export const grades: Grade[] = [
  { id: 1, name: 'Grade 1', description: 'Foundation skills', subjects: ['ela', 'math', 'science', 'social'] },
  { id: 2, name: 'Grade 2', description: 'Building basics', subjects: ['ela', 'math', 'science', 'social'] },
  { id: 3, name: 'Grade 3', description: 'Growing knowledge', subjects: ['ela', 'math', 'science', 'social'] },
  { id: 4, name: 'Grade 4', description: 'Expanding horizons', subjects: ['ela', 'math', 'science', 'social'] },
  { id: 5, name: 'Grade 5', description: 'Advanced concepts', subjects: ['ela', 'math', 'science', 'social'] },
  { id: 6, name: 'Grade 6', description: 'Middle school preparation', subjects: ['ela', 'math', 'science', 'social'] },
  { id: 7, name: 'Grade 7', description: 'Intermediate learning', subjects: ['ela', 'math', 'science', 'social'] },
  { id: 8, name: 'Grade 8', description: 'Advanced intermediate', subjects: ['ela', 'math', 'science', 'social'] }
];

export const lessons: Lesson[] = [
  // Grade 1 ELA
  {
    id: 'g1-ela-1',
    title: 'Letter Recognition',
    explanation: 'Learning to identify and name all letters of the alphabet',
    deepExplanation: 'Students will learn to recognize both uppercase and lowercase letters, understand their sounds, and begin to connect letters to words they know.',
    keyPoints: [
      { id: 'g1-ela-1-1', text: 'Identify uppercase letters A-Z' },
      { id: 'g1-ela-1-2', text: 'Identify lowercase letters a-z' },
      { id: 'g1-ela-1-3', text: 'Learn letter sounds' },
      { id: 'g1-ela-1-4', text: 'Match letters to pictures' }
    ],
    grade: 1,
    subject: 'ela',
    order: 1
  },
  {
    id: 'g1-ela-2',
    title: 'Basic Sight Words',
    explanation: 'Recognizing common words without sounding them out',
    deepExplanation: 'Students will memorize high-frequency words that appear often in texts, helping them read more fluently.',
    keyPoints: [
      { id: 'g1-ela-2-1', text: 'Learn common sight words' },
      { id: 'g1-ela-2-2', text: 'Practice word recognition' },
      { id: 'g1-ela-2-3', text: 'Use sight words in sentences' }
    ],
    grade: 1,
    subject: 'ela',
    order: 2
  },
  // Grade 1 Math
  {
    id: 'g1-math-1',
    title: 'Counting to 20',
    explanation: 'Learning to count numbers from 1 to 20',
    deepExplanation: 'Students will master counting forward and backward, recognizing numbers, and understanding one-to-one correspondence.',
    keyPoints: [
      { id: 'g1-math-1-1', text: 'Count forward from 1 to 20' },
      { id: 'g1-math-1-2', text: 'Count backward from 20 to 1' },
      { id: 'g1-math-1-3', text: 'Recognize number symbols' },
      { id: 'g1-math-1-4', text: 'Count objects accurately' }
    ],
    grade: 1,
    subject: 'math',
    order: 1
  },
  {
    id: 'g1-math-2',
    title: 'Basic Addition',
    explanation: 'Adding numbers together to find sums',
    deepExplanation: 'Students will learn to combine groups of objects and use the plus sign to find totals up to 10.',
    keyPoints: [
      { id: 'g1-math-2-1', text: 'Understand addition concept' },
      { id: 'g1-math-2-2', text: 'Use plus sign (+)' },
      { id: 'g1-math-2-3', text: 'Add numbers up to 10' },
      { id: 'g1-math-2-4', text: 'Solve simple word problems' }
    ],
    grade: 1,
    subject: 'math',
    order: 2
  },
  // Grade 1 Science
  {
    id: 'g1-science-1',
    title: 'Living vs Non-Living',
    explanation: 'Understanding the difference between living and non-living things',
    deepExplanation: 'Students will learn characteristics of living things (grow, breathe, eat, move) and identify objects that are living or non-living.',
    keyPoints: [
      { id: 'g1-science-1-1', text: 'Identify living things' },
      { id: 'g1-science-1-2', text: 'Identify non-living things' },
      { id: 'g1-science-1-3', text: 'Learn characteristics of life' },
      { id: 'g1-science-1-4', text: 'Classify objects' }
    ],
    grade: 1,
    subject: 'science',
    order: 1
  },
  // Grade 2 ELA
  {
    id: 'g2-ela-1',
    title: 'Reading Comprehension',
    explanation: 'Understanding stories and texts',
    deepExplanation: 'Students will learn to identify main ideas, characters, settings, and plot in simple stories.',
    keyPoints: [
      { id: 'g2-ela-1-1', text: 'Identify main idea' },
      { id: 'g2-ela-1-2', text: 'Recognize characters' },
      { id: 'g2-ela-1-3', text: 'Understand setting' },
      { id: 'g2-ela-1-4', text: 'Follow story sequence' }
    ],
    grade: 2,
    subject: 'ela',
    order: 1
  },
  // Grade 2 Math
  {
    id: 'g2-math-1',
    title: 'Place Value',
    explanation: 'Understanding tens and ones',
    deepExplanation: 'Students will learn that two-digit numbers are made of tens and ones, and how to represent numbers in different ways.',
    keyPoints: [
      { id: 'g2-math-1-1', text: 'Identify tens place' },
      { id: 'g2-math-1-2', text: 'Identify ones place' },
      { id: 'g2-math-1-3', text: 'Build numbers with blocks' },
      { id: 'g2-math-1-4', text: 'Expand numbers (23 = 20+3)' }
    ],
    grade: 2,
    subject: 'math',
    order: 1
  },
  // Add more lessons as needed...
];

export const getLessonsByGradeAndSubject = (grade: number, subject: string): Lesson[] => {
  return lessons.filter(lesson => lesson.grade === grade && lesson.subject === subject)
    .sort((a, b) => a.order - b.order);
};

export const getLessonById = (id: string): Lesson | undefined => {
  return lessons.find(lesson => lesson.id === id);
};
