import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', message: '' });
  const [response, setResponse] = useState(null);

  // Fetch data from backend
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (err) {
      setError('Failed to connect to backend');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setResponse(result);
      setFormData({ name: '', message: '' });
    } catch (err) {
      setResponse({ success: false, error: 'Failed to submit data' });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading application...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <h2>❌ Connection Error</h2>
          <p>{error}</p>
          <button onClick={fetchData} className="btn btn-primary">
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="header">
        <h1>🚀 Full-Stack Web Application</h1>
        <p>React Frontend + Express Backend</p>
      </header>

      <main className="main">
        {/* Backend Data Display */}
        <section className="card">
          <h2>📡 Backend Data</h2>
          {data && (
            <div className="data-display">
              <p><strong>Message:</strong> {data.message}</p>
              <div className="data-grid">
                <div>
                  <h3>Users:</h3>
                  <ul>
                    {data.data.users.map((user, index) => (
                      <li key={index}>{user}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Posts:</h3>
                  <ul>
                    {data.data.posts.map((post, index) => (
                      <li key={index}>{post}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className="timestamp">
                <small>Last updated: {new Date(data.data.timestamp).toLocaleString()}</small>
              </p>
            </div>
          )}
        </section>

        {/* Form Section */}
        <section className="card">
          <h2>📝 Send Data to Backend</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="4"
                className="textarea"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Send to Backend
            </button>
          </form>

          {response && (
            <div className={`response ${response.success ? 'success' : 'error'}`}>
              <h3>{response.success ? '✅ Success!' : '❌ Error'}</h3>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
        </section>

        {/* Connection Status */}
        <section className="card status-card">
          <h2>🔗 Connection Status</h2>
          <div className="status-indicator">
            <div className="status-dot online"></div>
            <span>Connected to Backend</span>
          </div>
          <button onClick={fetchData} className="btn btn-secondary">
            🔄 Refresh Data
          </button>
        </section>
      </main>

      <footer className="footer">
        <p>Full-Stack Application Demo • React + Express</p>
      </footer>
    </div>
  );
}

export default App;
