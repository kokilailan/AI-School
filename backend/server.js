const express = require('express')
const cors = require('cors')
const path = require('path')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Serve static files from frontend build
app.use(express.static(path.join(__dirname, '../frontend/dist')))

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI School Backend is running' })
})

// Get subjects based on grade
app.get('/api/subjects/:grade', (req, res) => {
  const grade = parseInt(req.params.grade)
  
  const subjects = grade <= 3 
    ? [
        { name: 'ELA', icon: '📚', description: 'English Language Arts' },
        { name: 'Math', icon: '🔢', description: 'Mathematics' },
        { name: 'Art', icon: '🎨', description: 'Visual Arts' },
        { name: 'Music', icon: '🎵', description: 'Music Education' }
      ]
    : [
        { name: 'ELA', icon: '📚', description: 'English Language Arts' },
        { name: 'Math', icon: '🔢', description: 'Mathematics' },
        { name: 'Science', icon: '🔬', description: 'Science' },
        { name: 'Social Studies', icon: '🌍', description: 'Social Studies' },
        { name: 'Music', icon: '🎵', description: 'Music Education' }
      ]

  res.json(subjects)
})

// Get lessons for a subject and grade
app.get('/api/lessons/:grade/:subject', (req, res) => {
  const { grade, subject } = req.params
  
  // Sample lessons - in production, this would come from a database
  const lessons = [
    { 
      id: 1, 
      title: `Introduction to ${subject}`, 
      description: 'Get started with the basics',
      content: {
        explanation: `Welcome to ${subject} Lesson 1. This lesson covers fundamental concepts.`,
        deepExplanation: `In this comprehensive lesson, we will explore the core principles of ${subject}.`
      },
      mindMap: {
        central: subject,
        branches: [
          {
            name: "Core Concepts",
            subtopics: ["Fundamentals", "Key Terms", "Basic Principles"]
          },
          {
            name: "Applications",
            subtopics: ["Real-world examples", "Problem solving", "Practice exercises"]
          }
        ]
      },
      oralTeacher: {
        introduction: `Hello! I'm your AI teacher for today's ${subject} lesson.`,
        mainContent: `We'll start with the basics and gradually build up your understanding.`,
        conclusion: `Great job completing this lesson! Keep practicing what you've learned.`
      }
    },
    { 
      id: 2, 
      title: `${subject} Fundamentals`, 
      description: 'Core concepts and principles',
      content: {
        explanation: `Building on your introduction, let's dive deeper into ${subject}.`,
        deepExplanation: `This lesson focuses on the fundamental principles that govern ${subject}.`
      },
      mindMap: {
        central: subject,
        branches: [
          {
            name: "Fundamentals",
            subtopics: ["Basic Principles", "Core Concepts", "Foundation"]
          },
          {
            name: "Practice",
            subtopics: ["Exercises", "Examples", "Applications"]
          }
        ]
      },
      oralTeacher: {
        introduction: `Let's continue our journey into ${subject}!`,
        mainContent: `Today we'll focus on the fundamental concepts that are crucial for understanding.`,
        conclusion: `Excellent progress! You're building a strong foundation.`
      }
    },
    { 
      id: 3, 
      title: `Advanced ${subject}`, 
      description: 'Deeper understanding and application',
      content: {
        explanation: `Ready for advanced concepts in ${subject}?`,
        deepExplanation: `This lesson challenges you to apply your knowledge in more complex scenarios.`
      },
      mindMap: {
        central: subject,
        branches: [
          {
            name: "Advanced Topics",
            subtopics: ["Complex Concepts", "Advanced Theory", "Critical Thinking"]
          },
          {
            name: "Applications",
            subtopics: ["Real Problems", "Case Studies", "Projects"]
          }
        ]
      },
      oralTeacher: {
        introduction: `Welcome to the advanced ${subject} lesson!`,
        mainContent: `We'll explore complex topics and challenge your understanding.`,
        conclusion: `Outstanding work! You've mastered advanced concepts.`
      }
    }
  ]

  res.json(lessons)
})

// Get specific lesson
app.get('/api/lesson/:grade/:subject/:lessonId', (req, res) => {
  const { grade, subject, lessonId } = req.params
  
  // In production, this would fetch from database
  res.json({
    id: parseInt(lessonId),
    title: `${subject} Lesson ${lessonId}`,
    subject: subject,
    grade: parseInt(grade),
    content: {
      explanation: `Welcome to ${subject} Lesson ${lessonId}. This lesson covers fundamental concepts for Grade ${grade}.`,
      deepExplanation: `In this comprehensive lesson, we will explore the core principles of ${subject} designed specifically for Grade ${grade} students.`
    },
    mindMap: {
      central: subject,
      branches: [
        {
          name: "Core Concepts",
          subtopics: ["Fundamentals", "Key Terms", "Basic Principles"]
        },
        {
          name: "Applications",
          subtopics: ["Real-world examples", "Problem solving", "Practice exercises"]
        },
        {
          name: "Advanced Topics",
          subtopics: ["Deeper understanding", "Complex problems", "Critical thinking"]
        }
      ]
    },
    oralTeacher: {
      introduction: `Hello! I'm your AI teacher for ${subject} Lesson ${lessonId}.`,
      mainContent: `We'll explore this topic step by step with examples tailored for Grade ${grade}.`,
      conclusion: `Great job! Keep practicing and reviewing the material.`
    }
  })
})

// Serve frontend for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
