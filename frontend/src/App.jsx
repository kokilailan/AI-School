import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Subject from './pages/Subject'
import Lesson from './pages/Lesson'

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subject/:subject" element={<Subject />} />
            <Route path="/lesson/:subject/:lessonId" element={<Lesson />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </ErrorBoundary>
    </div>
  )
}

export default App
