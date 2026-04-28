import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

const Subject = () => {
  const { subject } = useParams()
  const [user, setUser] = useState(null)
  const [lessons, setLessons] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (!userData) {
      window.location.href = '/'
      return
    }
    setUser(userData)

    // Load lessons for this subject and grade
    loadLessons(userData.grade, subject)
  }, [subject])

  const loadLessons = async (grade, subjectName) => {
    setLoading(true)
    try {
      // For now, create sample lessons. In production, this would come from API
      const sampleLessons = [
        { id: 1, title: `Introduction to ${subjectName}`, description: 'Get started with the basics' },
        { id: 2, title: `${subjectName} Fundamentals`, description: 'Core concepts and principles' },
        { id: 3, title: `Advanced ${subjectName}`, description: 'Deeper understanding and application' },
        { id: 4, title: `Practice Problems`, description: 'Test your knowledge' },
        { id: 5, title: `Review and Assessment`, description: 'Comprehensive review' }
      ]
      setLessons(sampleLessons)
    } catch (error) {
      console.error('Error loading lessons:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  if (loading) {
    return <div className="loading">Loading lessons...</div>
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
      </div>
      
      <h1 style={{ color: 'white', marginBottom: '16px' }}>
        {subject} - Grade {user.grade}
      </h1>
      <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
        Choose a lesson to start learning
      </p>

      <div className="lesson-list">
        {lessons.map((lesson) => (
          <Link key={lesson.id} to={`/lesson/${subject}/${lesson.id}`}>
            <div className="lesson-card">
              <h3>{lesson.title}</h3>
              <p style={{ color: '#666', marginTop: '8px' }}>
                {lesson.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Subject
