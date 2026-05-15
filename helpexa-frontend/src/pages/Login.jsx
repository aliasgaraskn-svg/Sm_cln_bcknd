import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      user {
        id
        username
        role
      }
      token
    }
  }
`;

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      onLogin(data.login.user);
    },
    onError: (err) => {
      setError(err.message || 'Login failed');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    login({
      variables: {
        input: { username, password }
      }
    });
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
              required
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter 'admin'"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.875rem' }}>{error}</div>}
          
          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
