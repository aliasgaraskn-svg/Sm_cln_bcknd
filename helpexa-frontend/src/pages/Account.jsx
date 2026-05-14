import React from 'react';
import { 
  User, 
  MessageSquare, 
  Star, 
  FileText, 
  ShieldCheck, 
  LogOut,
  ChevronRight 
} from 'lucide-react';

export default function Account({ onLogout }) {
  const menuItems = [
    { icon: <User size={20} />, label: 'Edit Profile' },
    { icon: <MessageSquare size={20} />, label: 'Send Feedback' },
    { icon: <Star size={20} />, label: 'Rate the App' },
    { icon: <FileText size={20} />, label: 'Terms and Conditions' },
    { icon: <ShieldCheck size={20} />, label: 'Privacy Policy' },
  ];

  return (
    <div>
      <div className="header">
        <h1>Account</h1>
        <p>Manage your profile and application preferences.</p>
      </div>

      <div className="glass" style={{ padding: '32px', marginBottom: '32px', textAlign: 'center' }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'var(--primary)', 
          margin: '0 auto 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          A
        </div>
        <h3>Admin User</h3>
        <p style={{ color: 'var(--text-muted)' }}>admin@helpexa.com</p>
      </div>

      <div className="glass settings-list">
        {menuItems.map((item, index) => (
          <div key={index} className="settings-item">
            <div className="domain-icon" style={{ marginBottom: 0 }}>{item.icon}</div>
            <span>{item.label}</span>
            <ChevronRight size={18} className="settings-item-icon" />
          </div>
        ))}
        
        <div 
          className="settings-item" 
          onClick={onLogout}
          style={{ borderTop: '1px solid var(--border)', color: '#ef4444' }}
        >
          <div style={{ color: '#ef4444' }}><LogOut size={20} /></div>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
}
