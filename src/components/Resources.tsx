import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Download, 
  Video, 
  FileText, 
  Headphones,
  Search,
  Star,
  Clock,
  Bookmark
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'worksheet' | 'audio' | 'article' | 'interactive';
  subject: string;
  grade: number;
  duration?: string;
  fileSize?: string;
  url?: string;
  rating: number;
  downloads: number;
  featured: boolean;
}

interface ResourcesProps {
  subject: string;
  grade: number;
}

export const Resources: React.FC<ResourcesProps> = ({ subject, grade }) => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [filteredResources, setFilteredResources] = useState<Resource[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedSubject] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'rating' | 'downloads' | 'title'>('rating');

  useEffect(() => {
    generateResources();
  }, [subject, grade]);

  useEffect(() => {
    filterAndSortResources();
  }, [resources, searchTerm, selectedType, selectedSubject, sortBy]);

  const generateResources = () => {
    const resourceList: Resource[] = [
      // Videos
      {
        id: '1',
        title: 'Introduction to Letters',
        description: 'Fun animated video teaching alphabet recognition',
        type: 'video',
        subject: 'ela',
        grade: 1,
        duration: '10:30',
        rating: 4.8,
        downloads: 1250,
        featured: true
      },
      {
        id: '2',
        title: 'Counting to 20 Song',
        description: 'Musical video for learning numbers',
        type: 'video',
        subject: 'math',
        grade: 1,
        duration: '5:45',
        rating: 4.9,
        downloads: 2100,
        featured: true
      },
      // Worksheets
      {
        id: '3',
        title: 'Letter Tracing Practice',
        description: 'Printable worksheet for handwriting practice',
        type: 'worksheet',
        subject: 'ela',
        grade: 1,
        fileSize: '2.3 MB',
        rating: 4.6,
        downloads: 890,
        featured: false
      },
      {
        id: '4',
        title: 'Addition Problems Set',
        description: '20 basic addition problems with solutions',
        type: 'worksheet',
        subject: 'math',
        grade: 1,
        fileSize: '1.8 MB',
        rating: 4.7,
        downloads: 1560,
        featured: false
      },
      // Audio
      {
        id: '5',
        title: 'Phonics Sounds',
        description: 'Audio guide for letter sounds',
        type: 'audio',
        subject: 'ela',
        grade: 1,
        duration: '15:00',
        rating: 4.5,
        downloads: 650,
        featured: false
      },
      // Articles
      {
        id: '6',
        title: 'Living Things Guide',
        description: 'Colorful guide about plants and animals',
        type: 'article',
        subject: 'science',
        grade: 1,
        fileSize: '4.2 MB',
        rating: 4.8,
        downloads: 980,
        featured: true
      },
      // Interactive
      {
        id: '7',
        title: 'Math Adventure Game',
        description: 'Interactive game for practicing addition',
        type: 'interactive',
        subject: 'math',
        grade: 1,
        rating: 4.9,
        downloads: 3200,
        featured: true
      },
      {
        id: '8',
        title: 'Story Time Collection',
        description: 'Collection of short stories for reading practice',
        type: 'article',
        subject: 'ela',
        grade: 2,
        fileSize: '6.1 MB',
        rating: 4.7,
        downloads: 1450,
        featured: false
      }
    ];
    setResources(resourceList);
  };

  const filterAndSortResources = () => {
    let filtered = resources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || resource.type === selectedType;
      const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
      
      return matchesSearch && matchesType && matchesSubject;
    });

    // Sort resources
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'downloads':
          return b.downloads - a.downloads;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredResources(filtered);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return Video;
      case 'worksheet': return FileText;
      case 'audio': return Headphones;
      case 'article': return BookOpen;
      case 'interactive': return Star;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-red-100 text-red-700';
      case 'worksheet': return 'bg-blue-100 text-blue-700';
      case 'audio': return 'bg-purple-100 text-purple-700';
      case 'article': return 'bg-emerald-100 text-emerald-700';
      case 'interactive': return 'bg-amber-100 text-amber-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const handleDownload = (resource: Resource) => {
    // Simulate download
    alert(`Downloading: ${resource.title}`);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Learning Resources</h2>
            <p className="text-emerald-100">Videos, worksheets, and more to enhance your learning!</p>
          </div>
          <BookOpen className="w-12 h-12 text-emerald-200" />
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Type Filter */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="video">Videos</option>
              <option value="worksheet">Worksheets</option>
              <option value="audio">Audio</option>
              <option value="article">Articles</option>
              <option value="interactive">Interactive</option>
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="rating">Top Rated</option>
              <option value="downloads">Most Downloaded</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>
      </div>

      {/* Featured Resources */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Star className="w-6 h-6 mr-2 text-amber-500" />
          Featured Resources
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.filter(r => r.featured).slice(0, 3).map((resource) => {
            const IconComponent = getTypeIcon(resource.type);
            return (
              <div
                key={resource.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)} mr-3`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{resource.title}</h4>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                        {getTypeLabel(resource.type)}
                      </span>
                    </div>
                  </div>
                  <Bookmark className="w-4 h-4 text-gray-400 hover:text-amber-500 cursor-pointer" />
                </div>
                
                <p className="text-gray-600 text-sm mb-3">{resource.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center">
                    <Star className="w-3 h-3 text-amber-400 mr-1" />
                    <span>{resource.rating}</span>
                  </div>
                  <div className="flex items-center">
                    <Download className="w-3 h-3 mr-1" />
                    <span>{resource.downloads}</span>
                  </div>
                  {resource.duration && (
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{resource.duration}</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => handleDownload(resource)}
                  className="w-full btn-primary bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  <Download className="w-4 h-4 mr-2 inline" />
                  Download
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* All Resources */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          All Resources ({filteredResources.length})
        </h3>
        
        {filteredResources.length === 0 ? (
          <div className="text-center py-8">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No resources found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((resource) => {
              const IconComponent = getTypeIcon(resource.type);
              return (
                <div
                  key={resource.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getTypeColor(resource.type)} flex-shrink-0`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-semibold text-gray-900 truncate">{resource.title}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                              {getTypeLabel(resource.type)}
                            </span>
                            <div className={`w-2 h-2 rounded-full ${getSubjectColor(resource.subject)}`} />
                            <span className="text-xs text-gray-500 capitalize">{resource.subject}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-600 text-sm mb-2 line-clamp-2">{resource.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-amber-400 mr-1" />
                            <span>{resource.rating}</span>
                          </div>
                          <div className="flex items-center">
                            <Download className="w-3 h-3 mr-1" />
                            <span>{resource.downloads}</span>
                          </div>
                          {resource.duration && (
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              <span>{resource.duration}</span>
                            </div>
                          )}
                          {resource.fileSize && (
                            <span>{resource.fileSize}</span>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleDownload(resource)}
                          className="btn-secondary text-sm px-3 py-1"
                        >
                          <Download className="w-3 h-3 mr-1 inline" />
                          Get
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
