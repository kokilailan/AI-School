# Mind Spark AI School - Full-Stack Web Application

A complete full-stack web application with React frontend and Express.js backend, featuring AI-powered educational content and interactive learning experiences.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Real-time API Integration**: Live data fetching and form submission
- **Interactive Components**: Dynamic content with loading states
- **SPA Support**: Single Page Application with proper routing
- **Error Handling**: Graceful error states and retry functionality

### Backend (Express.js)
- **RESTful API**: Clean API endpoints for data operations
- **Static File Serving**: Serves React build files
- **CORS Enabled**: Cross-origin requests supported
- **Environment Config**: Flexible configuration via .env
- **SPA Routing**: Catch-all middleware for React Router

### API Endpoints
- `GET /api/health` - Server health check
- `GET /api/data` - Fetch sample data
- `POST /api/submit` - Submit form data

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with gradients and animations
- **JavaScript ES6+** - Modern JavaScript features

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management

## 📁 Project Structure

```
mind-spark-ai-school/
├── client/                 # React frontend
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   ├── App.css      # Styling
│   │   └── main.jsx     # Entry point
│   ├── dist/            # Build output
│   └── package.json     # Frontend dependencies
├── dist/                # Production build (copied from client/dist)
├── server.js           # Express server
├── package.json        # Backend dependencies
└── .env              # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kokilailan/Genius-Spark-AI-School-Tutor.git
   cd Genius-Spark-AI-School-Tutor
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Configure environment**
   ```bash
   # Copy .env.example to .env and configure
   cp .env.example .env
   ```

4. **Build frontend**
   ```bash
   cd client
   npm run build
   cd ..
   ```

5. **Start the application**
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3001`

### Development Mode

For development with hot reload:

```bash
# Terminal 1: Start backend
npm start

# Terminal 2: Start frontend dev server
cd client
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3001
NODE_ENV=development
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

## 📦 Deployment

### Railway Deployment

1. **Connect Repository**
   - Connect your GitHub repository to Railway
   - Railway will automatically detect the Node.js app

2. **Environment Variables**
   - Set `PORT` environment variable (Railway provides this automatically)
   - Add any other required environment variables

3. **Build Command**
   ```bash
   npm install
   cd client && npm run build && cd .. && npm start
   ```

4. **Start Command**
   ```bash
   npm start
   ```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the server**
   ```bash
   npm start
   ```

## 🌐 API Usage

### Fetch Data
```javascript
const response = await fetch('/api/data');
const data = await response.json();
```

### Submit Data
```javascript
const response = await fetch('/api/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'John', message: 'Hello!' }),
});
const result = await response.json();
```

## 🎨 Features in Detail

### Frontend Features
- **Real-time Data Display**: Fetches and displays backend data
- **Interactive Forms**: Submit data to backend with validation
- **Connection Status**: Visual indicator of backend connectivity
- **Loading States**: Smooth loading animations
- **Error Handling**: User-friendly error messages with retry options
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Gradient backgrounds, smooth animations, card-based layout

### Backend Features
- **RESTful API**: Standard HTTP methods and status codes
- **Static File Serving**: Serves React build files efficiently
- **SPA Support**: Proper handling of client-side routing
- **Error Handling**: Comprehensive error handling and logging
- **Security**: CORS configuration and input validation
- **Performance**: Efficient static file serving and caching

## 🔍 Testing

### API Testing
```bash
# Test health endpoint
curl http://localhost:3001/api/health

# Test data endpoint
curl http://localhost:3001/api/data

# Test submit endpoint
curl -X POST http://localhost:3001/api/submit \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","message":"Hello World"}'
```

## 📝 Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "node server.js",
    "client": "cd client && npm run dev",
    "build": "cd client && npm run build",
    "install-deps": "npm install && cd client && npm install"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React team for the amazing framework
- Express.js for the robust backend framework
- Vite for the fast development experience
- All contributors and users of this application

---

**Built with ❤️ using React + Express.js**

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
