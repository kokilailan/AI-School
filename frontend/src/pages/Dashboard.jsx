import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [subjects, setSubjects] = useState([])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'))
    if (!userData) {
      window.location.href = '/'
      return
    }
    setUser(userData)

    // Define subjects based on grade
    const gradeSubjects = userData.grade <= 3 
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

    setSubjects(gradeSubjects)
  }, [])

  if (!user) {
    return <div className="loading">Loading...</div>
  }

  return (
    <div>
      <h1 style={{ color: 'white', marginBottom: '24px' }}>
        Welcome back, {user.name}!
      </h1>
      <h2 style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '32px' }}>
        Grade {user.grade} Subjects
      </h2>
      
      <div className="subject-grid">
        {subjects.map((subject) => (
          <Link key={subject.name} to={`/subject/${subject.name}`}>
            <div className="subject-card">
              <div className="subject-icon">{subject.icon}</div>
              <h3>{subject.name}</h3>
              <p style={{ color: '#666', marginTop: '8px' }}>
                {subject.description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
