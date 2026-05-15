import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, NavLink } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Home, MessageSquare, Bell, User as UserIcon, LogOut } from 'lucide-react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Account from './pages/Account';
import AskAI from './pages/AskAI';
import HRMSDashboard from './pages/HRMSDashboard';
import ApplyLeave from './pages/ApplyLeave';
import NewTicket from './pages/NewTicket';
import ITSMDashboard from './pages/ITSMDashboard';

const ME_QUERY = gql`
  query GetMe {
    me {
      id
      username
      role
    }
  }
`;

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const navigate = useNavigate();

  const { data, loading, error } = useQuery(ME_QUERY, {
    fetchPolicy: 'network-only',
    onCompleted: (data) => {
      if (data && data.me) {
        setIsAuthenticated(true);
      }
      setIsInitializing(false);
    },
    onError: () => {
      setIsInitializing(false);
    }
  });

  const handleLogin = (e) => {
    // This is just for UI transition, the real login happens in the Login page
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (isInitializing || loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white' }}>Loading Helpexa...</div>;
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <div className="app-container">
      <aside className="sidebar glass">
        <div className="sidebar-logo">Helpexa</div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Home size={20} /> Home
          </NavLink>
          <NavLink to="/ask-ai" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <MessageSquare size={20} /> ASK AI
          </NavLink>
          <NavLink to="/notifications" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <Bell size={20} /> Notifications
          </NavLink>
          <NavLink to="/account" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
            <UserIcon size={20} /> Account
          </NavLink>
        </nav>
        <button onClick={handleLogout} className="nav-item" style={{ background: 'transparent', border: 'none', width: '100%', cursor: 'pointer', textAlign: 'left' }}>
          <LogOut size={20} /> Sign Out
        </button>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/notifications" element={<div className="glass" style={{padding: '40px'}}><h2>Notifications</h2><p style={{color: 'var(--text-muted)'}}>You are all caught up!</p></div>} />
          <Route path="/account" element={<Account onLogout={handleLogout} />} />
          <Route path="/hrms" element={<HRMSDashboard />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
          <Route path="/new-ticket" element={<NewTicket />} />
          <Route path="/itsm" element={<ITSMDashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
