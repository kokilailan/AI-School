import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Trophy, 
  Target,
  Star,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

interface Game {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  highScore: number;
  plays: number;
}

interface GamesProps {
  subject: string;
  grade: number;
}

export const Games: React.FC<GamesProps> = ({ subject, grade }) => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [gameState, setGameState] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [highScore, setHighScore] = useState<Record<string, number>>({});

  useEffect(() => {
    generateGames();
    loadHighScores();
  }, [subject, grade]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [isPlaying, timeLeft]);

  const generateGames = () => {
    const gameList: Game[] = [
      {
        id: 'math-blaster',
        title: 'Math Blaster',
        description: 'Solve math problems before time runs out!',
        icon: '🚀',
        color: 'from-blue-500 to-purple-600',
        difficulty: 'medium',
        category: 'Math',
        highScore: 0,
        plays: 0
      },
      {
        id: 'word-match',
        title: 'Word Match',
        description: 'Match words with their meanings',
        icon: '📝',
        color: 'from-emerald-500 to-teal-600',
        difficulty: 'easy',
        category: 'ELA',
        highScore: 0,
        plays: 0
      },
      {
        id: 'science-quiz',
        title: 'Science Quiz',
        description: 'Test your science knowledge',
        icon: '🔬',
        color: 'from-amber-500 to-orange-600',
        difficulty: 'medium',
        category: 'Science',
        highScore: 0,
        plays: 0
      },
      {
        id: 'memory-master',
        title: 'Memory Master',
        description: 'Match cards to test your memory',
        icon: '🧠',
        color: 'from-purple-500 to-pink-600',
        difficulty: 'easy',
        category: 'All',
        highScore: 0,
        plays: 0
      },
      {
        id: 'speed-typing',
        title: 'Speed Typing',
        description: 'Type words as fast as you can',
        icon: '⌨️',
        color: 'from-rose-500 to-red-600',
        difficulty: 'medium',
        category: 'ELA',
        highScore: 0,
        plays: 0
      },
      {
        id: 'geo-challenge',
        title: 'Geo Challenge',
        description: 'Identify countries and capitals',
        icon: '🌍',
        color: 'from-indigo-500 to-blue-600',
        difficulty: 'hard',
        category: 'Social Studies',
        highScore: 0,
        plays: 0
      }
    ];
    setGames(gameList);
  };

  const loadHighScores = () => {
    const saved = localStorage.getItem('gameHighScores');
    if (saved) {
      setHighScore(JSON.parse(saved));
    }
  };

  const saveHighScore = (gameId: string, newScore: number) => {
    const newHighScores = { ...highScore, [gameId]: newScore };
    setHighScore(newHighScores);
    localStorage.setItem('gameHighScores', JSON.stringify(newHighScores));
  };

  const startGame = (gameId: string) => {
    setSelectedGame(gameId);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(true);
    
    // Initialize game state based on game type
    switch (gameId) {
      case 'math-blaster':
        setGameState({
          currentProblem: generateMathProblem(),
          answer: '',
          problems: []
        });
        break;
      case 'word-match':
        setGameState({
          words: generateWordPairs(),
          selectedCards: [],
          matchedPairs: []
        });
        break;
      default:
        setGameState({});
    }
  };

  const generateMathProblem = () => {
    const operations = ['+', '-', '×'];
    const operation = operations[Math.floor(Math.random() * operations.length)];
    let a = Math.floor(Math.random() * 20) + 1;
    let b = Math.floor(Math.random() * 20) + 1;
    
    if (operation === '-' && a < b) [a, b] = [b, a];
    if (operation === '×') {
      a = Math.floor(Math.random() * 12) + 1;
      b = Math.floor(Math.random() * 12) + 1;
    }
    
    let answer = 0;
    switch (operation) {
      case '+': answer = a + b; break;
      case '-': answer = a - b; break;
      case '×': answer = a * b; break;
    }
    
    return { question: `${a} ${operation} ${b}`, answer };
  };

  const generateWordPairs = () => {
    const words = [
      { word: 'Happy', meaning: 'Feeling joy' },
      { word: 'Sad', meaning: 'Feeling sorrow' },
      { word: 'Big', meaning: 'Large in size' },
      { word: 'Small', meaning: 'Little in size' },
      { word: 'Fast', meaning: 'Moving quickly' },
      { word: 'Slow', meaning: 'Moving slowly' }
    ];
    
    const cards = [];
    words.forEach((item, index) => {
      cards.push({ id: `word-${index}`, content: item.word, type: 'word', pairId: index });
      cards.push({ id: `meaning-${index}`, content: item.meaning, type: 'meaning', pairId: index });
    });
    
    return cards.sort(() => Math.random() - 0.5);
  };

  const endGame = () => {
    setIsPlaying(false);
    if (selectedGame && score > highScore[selectedGame]) {
      saveHighScore(selectedGame, score);
    }
  };

  const resetGame = () => {
    setSelectedGame(null);
    setGameState(null);
    setScore(0);
    setTimeLeft(60);
    setIsPlaying(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-emerald-100 text-emerald-700';
      case 'medium': return 'bg-amber-100 text-amber-700';
      case 'hard': return 'bg-rose-100 text-rose-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const renderGame = () => {
    if (!selectedGame || !gameState) return null;

    switch (selectedGame) {
      case 'math-blaster':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                Math Blaster
              </h3>
              
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{score}</div>
                  <div className="text-sm text-gray-600">Score</div>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-900'}`}>
                    {timeLeft}
                  </div>
                  <div className="text-sm text-gray-600">Time</div>
                </div>
              </div>
              
              {gameState.currentProblem && (
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
                  <div className="text-5xl font-bold text-gray-900 mb-4">
                    {gameState.currentProblem.question} = ?
                  </div>
                  <input
                    type="number"
                    value={gameState.answer}
                    onChange={(e) => setGameState({
                      ...gameState,
                      answer: e.target.value
                    })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && gameState.answer) {
                        const userAnswer = parseInt(gameState.answer);
                        if (userAnswer === gameState.currentProblem.answer) {
                          setScore(score + 10);
                          setGameState({
                            ...gameState,
                            currentProblem: generateMathProblem(),
                            answer: ''
                          });
                        }
                      }
                    }}
                    className="w-32 px-4 py-2 text-2xl text-center border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
                    placeholder="?"
                    disabled={!isPlaying}
                  />
                </div>
              )}
              
              <div className="flex justify-center space-x-4">
                {isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="btn-secondary bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="btn-primary bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </button>
                )}
                <button
                  onClick={resetGame}
                  className="btn-secondary"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Game
                </button>
              </div>
            </div>
          </div>
        );

      case 'memory-master':
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Memory Master
              </h3>
              
              <div className="flex items-center justify-center space-x-8 mb-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{score}</div>
                  <div className="text-sm text-gray-600">Pairs Found</div>
                </div>
                <div className="text-center">
                  <div className={`text-4xl font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-900'}`}>
                    {timeLeft}
                  </div>
                  <div className="text-sm text-gray-600">Time</div>
                </div>
              </div>
              
              <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
                {gameState.words?.map((card: any) => (
                  <button
                    key={card.id}
                    onClick={() => {
                      if (!isPlaying) return;
                      
                      const newSelectedCards = [...gameState.selectedCards, card];
                      if (newSelectedCards.length === 2) {
                        if (newSelectedCards[0].pairId === newSelectedCards[1].pairId) {
                          // Match found
                          setGameState({
                            ...gameState,
                            selectedCards: [],
                            matchedPairs: [...gameState.matchedPairs, card.pairId]
                          });
                          setScore(score + 1);
                        } else {
                          // No match
                          setTimeout(() => {
                            setGameState({
                              ...gameState,
                              selectedCards: []
                            });
                          }, 1000);
                        }
                      } else {
                        setGameState({
                          ...gameState,
                          selectedCards: newSelectedCards
                        });
                      }
                    }}
                    disabled={!isPlaying}
                    className={`h-20 rounded-lg font-medium text-sm transition-all duration-300 ${
                      gameState.selectedCards?.includes(card) || gameState.matchedPairs?.includes(card.pairId)
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {(gameState.selectedCards?.includes(card) || gameState.matchedPairs?.includes(card.pairId))
                      ? card.content
                      : '?'
                    }
                  </button>
                ))}
              </div>
              
              <div className="flex justify-center space-x-4 mt-6">
                {isPlaying ? (
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="btn-secondary bg-amber-500 hover:bg-amber-600 text-white"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </button>
                ) : (
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="btn-primary bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </button>
                )}
                <button
                  onClick={resetGame}
                  className="btn-secondary"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New Game
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center">
              <Gamepad2 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Game Coming Soon!</h3>
              <p className="text-gray-600">This game is still under development.</p>
              <button
                onClick={resetGame}
                className="btn-primary mt-4"
              >
                Back to Games
              </button>
            </div>
          </div>
        );
    }
  };

  if (selectedGame) {
    return renderGame();
  }

  return (
    <div className="space-y-6">
      {/* Games Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">Educational Games</h2>
            <p className="text-purple-100">Learn while having fun with these exciting games!</p>
          </div>
          <Gamepad2 className="w-12 h-12 text-purple-200" />
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div
            key={game.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <div className={`h-32 bg-gradient-to-br ${game.color} flex items-center justify-center`}>
              <div className="text-5xl">{game.icon}</div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">{game.title}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(game.difficulty)}`}>
                  {game.difficulty}
                </span>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Trophy className="w-4 h-4 mr-1 text-amber-500" />
                  <span>High Score: {highScore[game.id] || 0}</span>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Target className="w-4 h-4 mr-1 text-blue-500" />
                  <span>{game.category}</span>
                </div>
              </div>
              
              <button
                onClick={() => startGame(game.id)}
                className="w-full btn-primary bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Play className="w-4 h-4 mr-2 inline" />
                Play Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
          <Star className="w-6 h-6 mr-2 text-amber-500" />
          Your Gaming Stats
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {Object.values(highScore).reduce((a: number, b: number) => a + b, 0)}
            </div>
            <div className="text-gray-600">Total Points</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">
              {Object.keys(highScore).filter(key => highScore[key] > 0).length}
            </div>
            <div className="text-gray-600">Games Played</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-600 mb-2">
              {Object.keys(highScore).length > 0 ? Math.max(...Object.values(highScore)) : 0}
            </div>
            <div className="text-gray-600">Best Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};
