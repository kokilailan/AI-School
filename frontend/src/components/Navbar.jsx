import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <Link to="/" className="logo">
            🎓 AI School
          </Link>
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span>👤 {user.name} (Grade {user.grade})</span>
              <button className="btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/signup">
              <button className="btn">Sign Up</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
