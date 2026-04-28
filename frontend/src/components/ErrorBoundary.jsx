import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <h2 style={{ color: '#e74c3c', marginBottom: '16px' }}>
            Something went wrong
          </h2>
          <p style={{ color: '#666', marginBottom: '24px' }}>
            We apologize for the inconvenience. Please refresh the page to try again.
          </p>
          <button 
            className="btn" 
            onClick={() => window.location.reload()}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
