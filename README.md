# AI School Platform

A comprehensive AI-powered educational platform providing personalized learning experiences for students in grades 1-8.

## Features

- **User Account System**: Simple signup with name and grade selection
- **Grade-Based Subjects**: Dynamic subject allocation based on student grade
- **Interactive Lessons**: Structured curriculum with explanations and examples
- **Mind Maps**: Visual learning tools for better comprehension
- **Oral Teacher**: AI-powered lesson explanations
- **Progress Tracking**: Monitor learning journey

## Grade Structure

### Grades 1-3
- ELA (English Language Arts)
- Mathematics
- Art
- Music

### Grades 4-8
- ELA (English Language Arts)
- Mathematics
- Science
- Social Studies
- Music

## Technology Stack

- **Frontend**: React 18 with Vite
- **Backend**: Node.js with Express
- **Styling**: Custom CSS with modern design
- **Routing**: React Router DOM
- **Deployment**: Ready for Railway

## Quick Start

1. Install dependencies:
```bash
npm run install:all
```

2. Start development servers:
```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

3. Open browser to `http://localhost:3000`

## Project Structure

```
ai-school-platform/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   └── styles/         # CSS styles
│   └── package.json
├── backend/                 # Node.js backend API
│   ├── server.js           # Express server
│   └── package.json
└── README.md
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/subjects/:grade` - Get subjects for grade
- `GET /api/lessons/:grade/:subject` - Get lessons for subject
- `GET /api/lesson/:grade/:subject/:lessonId` - Get specific lesson

## Deployment

The application is configured for deployment on Railway with same-host setup:

1. Build the frontend: `npm run build`
2. Start the backend: `npm start`
3. The backend serves both API and static frontend files

## Learning Features

### Mind Maps
Structured visual representations of lesson content with:
- Central topic
- Main branches
- Sub-topics and connections

### Oral Teacher
AI-powered explanations including:
- Lesson introduction
- Main content explanation
- Conclusion and next steps

### Lesson Structure
Each lesson includes:
- Basic explanation
- Detailed content
- Interactive mind map
- Oral teacher guidance

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details
