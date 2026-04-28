import express from 'express';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('./dist')));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

app.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello from backend!',
    data: {
      users: ['Alice', 'Bob', 'Charlie'],
      posts: ['Post 1', 'Post 2', 'Post 3'],
      timestamp: new Date().toISOString()
    }
  });
});

app.post('/api/submit', (req, res) => {
  const { name, message } = req.body;
  res.json({
    success: true,
    received: { name, message },
    timestamp: new Date().toISOString()
  });
});

// Serve React app for all non-API routes (SPA support)
app.use((req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next();
  }
  res.sendFile(path.resolve('./dist/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});
