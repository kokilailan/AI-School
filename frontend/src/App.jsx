import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import ErrorBoundary from './components/ErrorBoundary'
import Analytics from './components/Analytics'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Subject from './pages/Subject'
import Lesson from './pages/Lesson'

function App() {
  const location = useLocation()
  const trackingId = import.meta.env.VITE_GA_TRACKING_ID

  // Track page views
  useEffect(() => {
    if (window.gtag && trackingId) {
      window.gtag('config', trackingId, {
        page_path: location.pathname,
      })
    }
  }, [location, trackingId])

  return (
    <div className="App">
      <Analytics trackingId={trackingId} />
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
