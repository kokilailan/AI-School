export interface KeyPoint {
  id: string;
  text: string;
}

export interface Lesson {
  id: string;
  title: string;
  explanation: string;
  deepExplanation: string;
  keyPoints: KeyPoint[];
  grade: number;
  subject: string;
  order: number;
}

export interface MindMapBranch {
  title: string;
  subBranches: {
    title: string;
    points: string[];
  }[];
}

export interface MindMap {
  centralTopic: string;
  mainBranches: MindMapBranch[];
}

export interface MindMapData {
  grade: number;
  subject: string;
  lessonId: string;
  mindMap: MindMap;
}

export interface Subject {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface Grade {
  id: number;
  name: string;
  description: string;
  subjects: string[];
}
