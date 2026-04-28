import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Lesson = () => {
  const { subject, lessonId } = useParams()
  const [user, setUser] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('content')

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (!userData) {
      window.location.href = '/'
      return
    }
    setUser(userData)

    loadLesson(userData.grade, subject, lessonId)
  }, [subject, lessonId])

  const loadLesson = async (grade, subjectName, id) => {
    setLoading(true)
    try {
      // For now, create sample lesson content. In production, this would come from API
      const sampleLesson = {
        id: parseInt(id),
        title: `${subjectName} Lesson ${id}`,
        subject: subjectName,
        grade: grade,
        content: {
          explanation: `Welcome to ${subjectName} Lesson ${id}. This lesson covers fundamental concepts that are essential for Grade ${grade} students.`,
          deepExplanation: `In this comprehensive lesson, we will explore the core principles of ${subjectName}. You will learn through interactive examples, practice exercises, and detailed explanations designed specifically for your grade level.`
        },
        mindMap: {
          central: subjectName,
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
          introduction: `Hello! I'm your AI teacher for today's ${subjectName} lesson. Let's explore this fascinating topic together!`,
          mainContent: `We'll start with the basics and gradually build up your understanding. Pay close attention to the examples I provide, as they will help you grasp the concepts more easily.`,
          conclusion: `Great job completing this lesson! Remember to practice what you've learned, and don't hesitate to review any section that needs more attention.`
        }
      }
      setLesson(sampleLesson)
    } catch (error) {
      console.error('Error loading lesson:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  if (loading) {
    return <div className="loading">Loading lesson content...</div>
  }

  if (!lesson) {
    return (
      <div className="card">
        <h2>Lesson not found</h2>
        <Link to={`/subject/${subject}`}>
          <button className="btn">Back to {subject}</button>
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Link to={`/subject/${subject}`} style={{ color: 'white', textDecoration: 'none' }}>
          ← Back to {subject}
        </Link>
      </div>

      <div className="card">
        <h1>{lesson.title}</h1>
        <p style={{ color: '#666', marginBottom: '24px' }}>
          Grade {lesson.grade} • {lesson.subject}
        </p>

        <div style={{ marginBottom: '24px' }}>
          <button
            className={`btn ${activeTab === 'content' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('content')}
            style={{ marginRight: '8px', background: activeTab === 'content' ? 'linear-gradient(45deg, #667eea, #764ba2)' : '#ccc' }}
          >
            Lesson Content
          </button>
          <button
            className={`btn ${activeTab === 'mindmap' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('mindmap')}
            style={{ marginRight: '8px', background: activeTab === 'mindmap' ? 'linear-gradient(45deg, #667eea, #764ba2)' : '#ccc' }}
          >
            Mind Map
          </button>
          <button
            className={`btn ${activeTab === 'teacher' ? '' : 'btn-secondary'}`}
            onClick={() => setActiveTab('teacher')}
            style={{ background: activeTab === 'teacher' ? 'linear-gradient(45deg, #667eea, #764ba2)' : '#ccc' }}
          >
            Oral Teacher
          </button>
        </div>

        {activeTab === 'content' && (
          <div>
            <h3>Lesson Overview</h3>
            <p style={{ lineHeight: '1.6', marginBottom: '16px' }}>
              {lesson.content.explanation}
            </p>
            <h3>Detailed Explanation</h3>
            <p style={{ lineHeight: '1.6' }}>
              {lesson.content.deepExplanation}
            </p>
          </div>
        )}

        {activeTab === 'mindmap' && (
          <div>
            <h3>Mind Map - {lesson.mindMap.central}</h3>
            <div style={{ marginTop: '20px' }}>
              {lesson.mindMap.branches.map((branch, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                  <h4 style={{ color: '#667eea', marginBottom: '8px' }}>
                    📍 {branch.name}
                  </h4>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {branch.subtopics.map((subtopic, subIndex) => (
                      <li key={subIndex} style={{ 
                        marginBottom: '4px', 
                        paddingLeft: '16px',
                        position: 'relative'
                      }}>
                        <span style={{ position: 'absolute', left: '0' }}>•</span>
                        {subtopic}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'teacher' && (
          <div>
            <h3>🎓 AI Teacher Explanation</h3>
            <div style={{ background: '#f8f9fa', padding: '20px', borderRadius: '8px', marginTop: '16px' }}>
              <p style={{ marginBottom: '16px', fontStyle: 'italic' }}>
                <strong>Introduction:</strong> {lesson.oralTeacher.introduction}
              </p>
              <p style={{ marginBottom: '16px', fontStyle: 'italic' }}>
                <strong>Main Content:</strong> {lesson.oralTeacher.mainContent}
              </p>
              <p style={{ fontStyle: 'italic' }}>
                <strong>Conclusion:</strong> {lesson.oralTeacher.conclusion}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Lesson
