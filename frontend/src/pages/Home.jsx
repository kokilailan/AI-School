import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <h1 style={{ fontSize: '48px', marginBottom: '24px', color: 'white' }}>
        Welcome to AI School Platform
      </h1>
      <p style={{ fontSize: '20px', marginBottom: '32px', color: 'rgba(255,255,255,0.9)' }}>
        Personalized learning experience powered by AI
      </p>
      <Link to="/signup">
        <button className="btn" style={{ fontSize: '18px', padding: '16px 32px' }}>
          Get Started
        </button>
      </Link>
    </div>
  )
}

export default Home
