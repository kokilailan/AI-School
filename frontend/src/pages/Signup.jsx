import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    grade: ''
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.name.trim() || !formData.grade) {
      setError('Please fill in all fields')
      return
    }

    // Store user in localStorage
    localStorage.setItem('user', JSON.stringify(formData))
    navigate('/dashboard')
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '40px 0' }}>
      <div className="card">
        <h2 style={{ textAlign: 'center', marginBottom: '24px' }}>
          Create Your Account
        </h2>
        
        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter your name"
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
              Grade
            </label>
            <select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              className="select"
            >
              <option value="">Select your grade</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map(grade => (
                <option key={grade} value={grade}>
                  Grade {grade}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn" style={{ width: '100%' }}>
            Start Learning
          </button>
        </form>
      </div>
    </div>
  )
}

export default Signup
