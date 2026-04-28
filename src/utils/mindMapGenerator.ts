import type { Lesson, MindMapData } from '../types/curriculum';

export const generateMindMap = (lesson: Lesson): MindMapData => {
  const grade = lesson.grade;
  const subject = lesson.subject;
  const lessonId = lesson.id;
  
  let mindMap;
  
  switch (lessonId) {
    case 'g1-ela-1':
      mindMap = {
        centralTopic: "Letter Recognition",
        mainBranches: [
          {
            title: "Uppercase Letters",
            subBranches: [
              {
                title: "A-Z Recognition",
                points: ["Identify shapes", "Name each letter", "Find in alphabet"]
              },
              {
                title: "Practice Activities",
                points: ["Flash cards", "Alphabet songs", "Letter matching"]
              }
            ]
          },
          {
            title: "Lowercase Letters",
            subBranches: [
              {
                title: "a-z Recognition",
                points: ["Compare to uppercase", "Identify differences", "Write letters"]
              },
              {
                title: "Letter Sounds",
                points: ["Phonics practice", "Sound association", "Beginning sounds"]
              }
            ]
          },
          {
            title: "Visual Learning",
            subBranches: [
              {
                title: "Picture Connection",
                points: ["Letter-picture pairs", "Object association", "Memory games"]
              }
            ]
          }
        ]
      };
      break;
      
    case 'g1-ela-2':
      mindMap = {
        centralTopic: "Basic Sight Words",
        mainBranches: [
          {
            title: "Common Words",
            subBranches: [
              {
                title: "High Frequency",
                points: ["the", "and", "is", "it", "in", "to", "a", "you"]
              },
              {
                title: "Word Recognition",
                points: ["Instant reading", "No sounding needed", "Quick identification"]
              }
            ]
          },
          {
            title: "Practice Methods",
            subBranches: [
              {
                title: "Daily Practice",
                points: ["Flash cards", "Word walls", "Reading practice"]
              },
              {
                title: "Sentence Building",
                points: ["Simple sentences", "Word order", "Context clues"]
              }
            ]
          }
        ]
      };
      break;
      
    case 'g1-math-1':
      mindMap = {
        centralTopic: "Counting to 20",
        mainBranches: [
          {
            title: "Forward Counting",
            subBranches: [
              {
                title: "Number Sequence",
                points: ["1 to 20 order", "Counting rhythm", "Number patterns"]
              },
              {
                title: "Object Counting",
                points: ["One-to-one", "Touch counting", "Point and count"]
              }
            ]
          },
          {
            title: "Backward Counting",
            subBranches: [
              {
                title: "Reverse Order",
                points: ["20 to 1", "Countdown practice", "Number relationships"]
              }
            ]
          },
          {
            title: "Number Recognition",
            subBranches: [
              {
                title: "Number Symbols",
                points: ["Identify digits", "Write numbers", "Match quantities"]
              }
            ]
          }
        ]
      };
      break;
      
    case 'g1-math-2':
      mindMap = {
        centralTopic: "Basic Addition",
        mainBranches: [
          {
            title: "Addition Concept",
            subBranches: [
              {
                title: "Combining Groups",
                points: ["Put together", "Join sets", "Total amount"]
              },
              {
                title: "Plus Sign",
                points: ["+ symbol", "Add meaning", "Equal sign (=)"]
              }
            ]
          },
          {
            title: "Calculation Methods",
            subBranches: [
              {
                title: "Object Addition",
                points: ["Count objects", "Combine groups", "Count total"]
              },
              {
                title: "Number Addition",
                points: ["Mental math", "Finger counting", "Number lines"]
              }
            ]
          },
          {
            title: "Word Problems",
            subBranches: [
              {
                title: "Story Problems",
                points: ["Find key words", "Identify numbers", "Solve problems"]
              }
            ]
          }
        ]
      };
      break;
      
    case 'g1-science-1':
      mindMap = {
        centralTopic: "Living vs Non-Living",
        mainBranches: [
          {
            title: "Living Things",
            subBranches: [
              {
                title: "Characteristics",
                points: ["Need food", "Breathe air", "Grow and change", "Make babies", "Move around"]
              },
              {
                title: "Examples",
                points: ["Plants", "Animals", "People", "Insects"]
              }
            ]
          },
          {
            title: "Non-Living Things",
            subBranches: [
              {
                title: "Characteristics",
                points: ["Don't grow", "Don't breathe", "Don't eat", "Don't move on own"]
              },
              {
                title: "Examples",
                points: ["Rocks", "Water", "Toys", "Books", "Chairs"]
              }
            ]
          },
          {
            title: "Classification",
            subBranches: [
              {
                title: "Sorting Practice",
                points: ["Group objects", "Explain choices", "Play classification games"]
              }
            ]
          }
        ]
      };
      break;
      
    case 'g2-ela-1':
      mindMap = {
        centralTopic: "Reading Comprehension",
        mainBranches: [
          {
            title: "Story Elements",
            subBranches: [
              {
                title: "Main Idea",
                points: ["What story is about", "Key message", "Central theme"]
              },
              {
                title: "Characters",
                points: ["Who is in story", "Character traits", "Character actions"]
              },
              {
                title: "Setting",
                points: ["Where story happens", "When story happens", "Place details"]
              }
            ]
          },
          {
            title: "Story Structure",
            subBranches: [
              {
                title: "Plot Sequence",
                points: ["Beginning", "Middle events", "End resolution"]
              },
              {
                title: "Understanding",
                points: ["Ask questions", "Make predictions", "Connect to life"]
              }
            ]
          }
        ]
      };
      break;
      
    case 'g2-math-1':
      mindMap = {
        centralTopic: "Place Value",
        mainBranches: [
          {
            title: "Number Parts",
            subBranches: [
              {
                title: "Tens Place",
                points: ["Groups of ten", "First digit", "Value calculation"]
              },
              {
                title: "Ones Place",
                points: ["Single units", "Second digit", "Individual items"]
              }
            ]
          },
          {
            title: "Representation",
            subBranches: [
              {
                title: "Base Ten Blocks",
                points: ["Tens rods", "Ones cubes", "Building numbers"]
              },
              {
                title: "Expanded Form",
                points: ["23 = 20 + 3", "Break apart numbers", "Understand value"]
              }
            ]
          },
          {
            title: "Number Skills",
            subBranches: [
              {
                title: "Comparing Numbers",
                points: ["Greater than", "Less than", "Equal to"]
              }
            ]
          }
        ]
      };
      break;
      
    default:
      // Generate a generic mind map for any lesson
      mindMap = {
        centralTopic: lesson.title,
        mainBranches: [
          {
            title: "Main Concept",
            subBranches: [
              {
                title: "Core Understanding",
                points: lesson.keyPoints.slice(0, 3).map(kp => kp.text)
              }
            ]
          },
          {
            title: "Key Skills",
            subBranches: [
              {
                title: "Practice Areas",
                points: lesson.keyPoints.slice(3, 6).map(kp => kp.text)
              }
            ]
          },
          {
            title: "Applications",
            subBranches: [
              {
                title: "Real World Use",
                points: ["Apply knowledge", "Solve problems", "Make connections"]
              }
            ]
          }
        ]
      };
  }
  
  return {
    grade,
    subject,
    lessonId,
    mindMap
  };
};
