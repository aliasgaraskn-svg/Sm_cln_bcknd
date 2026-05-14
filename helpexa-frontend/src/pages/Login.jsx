import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin(e);
    } else {
      setError('Invalid credentials. Use admin / admin');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glass">
        <h1 style={{ marginBottom: '8px', background: 'linear-gradient(to right, #8b5cf6, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Helpexa
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Unified Employee Experience</p>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input 
              type="text" 
              placeholder="Enter 'admin'"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter 'admin'"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          {error && <div style={{ color: 'var(--danger, #ef4444)', marginBottom: '16px', fontSize: '0.875rem' }}>{error}</div>}
          
          <button type="submit" className="btn">Sign In</button>
        </form>
      </div>
    </div>
  );
}
