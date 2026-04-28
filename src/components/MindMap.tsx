import React from 'react';
import type { MindMap } from '../types/curriculum';

interface MindMapProps {
  mindMap: MindMap;
  className?: string;
}

export const MindMapVisualization: React.FC<MindMapProps> = ({ mindMap, className = '' }) => {
  return (
    <div className={`mind-map-container ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary-800 mb-2">
          {mindMap.centralTopic}
        </h2>
        <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
      </div>
      
      <div className="relative">
        {/* Central node */}
        <div className="flex justify-center mb-12">
          <div className="bg-primary-600 text-white px-8 py-4 rounded-full shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <span className="text-xl font-bold">{mindMap.centralTopic}</span>
          </div>
        </div>
        
        {/* Main branches */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mindMap.mainBranches.map((branch, branchIndex) => (
            <div key={branchIndex} className="relative">
              {/* Branch connection line */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 w-0.5 h-8 bg-primary-300"></div>
              
              {/* Main branch */}
              <div className="bg-gradient-to-r from-primary-50 to-primary-100 border-2 border-primary-300 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold text-primary-800 mb-3 text-center">
                  {branch.title}
                </h3>
                
                {/* Sub-branches */}
                <div className="space-y-3">
                  {branch.subBranches.map((subBranch, subIndex) => (
                    <div key={subIndex} className="bg-white rounded-lg p-3 border border-primary-200">
                      <h4 className="font-medium text-primary-700 mb-2 text-sm">
                        {subBranch.title}
                      </h4>
                      <ul className="space-y-1">
                        {subBranch.points.map((point, pointIndex) => (
                          <li key={pointIndex} className="flex items-start text-xs text-secondary-600">
                            <span className="text-primary-500 mr-2">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-4xl opacity-20">🧠</div>
      <div className="absolute top-4 right-4 text-4xl opacity-20">💡</div>
      <div className="absolute bottom-4 left-4 text-4xl opacity-20">📚</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-20">🎯</div>
    </div>
  );
};
