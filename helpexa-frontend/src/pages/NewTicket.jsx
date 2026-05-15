import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  Box, 
  Lock, 
  Wifi, 
  Briefcase, 
  MoreHorizontal,
  ChevronLeft,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const CREATE_TICKET = gql`
  mutation CreateTicket($input: CreateTicketInput!) {
    createTicket(input: $input) {
      id
      subject
      status
    }
  }
`;

const categories = [
  { id: 'Hardware', label: 'Hardware', icon: <Monitor size={24} /> },
  { id: 'Software', label: 'Software', icon: <Box size={24} /> },
  { id: 'Access', label: 'Access', icon: <Lock size={24} /> },
  { id: 'Network', label: 'Network', icon: <Wifi size={24} /> },
  { id: 'Workplace', label: 'Workplace', icon: <Briefcase size={24} /> },
  { id: 'Other', label: 'Other', icon: <MoreHorizontal size={24} /> },
];

const priorities = [
  { id: 'Low', label: 'Low', sla: '24h', color: '#6366f1' },
  { id: 'Medium', label: 'Medium', sla: '8h', color: '#3b82f6' },
  { id: 'High', label: 'High', sla: '4h', color: '#f59e0b' },
  { id: 'Urgent', label: 'Urgent', sla: '1h', color: '#ef4444' },
];

export default function NewTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: 'Hardware',
    priority: 'Medium',
    subject: '',
    description: ''
  });

  const [createTicket, { loading, error }] = useMutation(CREATE_TICKET, {
    onCompleted: () => {
      alert('Ticket submitted successfully!');
      navigate('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.description) return;
    createTicket({ variables: { input: formData } });
  };

  return (
    <div className="new-ticket-page">
      <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button onClick={() => navigate(-1)} className="back-btn glass">
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ margin: 0 }}>New Ticket</h1>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Category Selection */}
        <section>
          <h4 style={{ marginBottom: '12px', opacity: 0.8 }}>CATEGORY</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px' }}>
            {categories.map(cat => (
              <div 
                key={cat.id} 
                className={`category-card glass ${formData.category === cat.id ? 'active' : ''}`}
                onClick={() => setFormData({...formData, category: cat.id})}
              >
                <div className="icon">{cat.icon}</div>
                <span>{cat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Priority Selection */}
        <section>
          <h4 style={{ marginBottom: '12px', opacity: 0.8 }}>PRIORITY</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '12px' }}>
            {priorities.map(prio => (
              <div 
                key={prio.id} 
                className={`priority-card glass ${formData.priority === prio.id ? 'active' : ''}`}
                onClick={() => setFormData({...formData, priority: prio.id})}
                style={{ '--prio-color': prio.color }}
              >
                <div className="prio-label">{prio.label}</div>
                <div className="sla">SLA {prio.sla}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Text Inputs */}
        <div className="glass" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Subject</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="Brief one-line summary"
              value={formData.subject}
              onChange={(e) => setFormData({...formData, subject: e.target.value})}
              required
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Description</label>
            <textarea 
              className="form-input" 
              rows="5"
              placeholder="What's happening? Steps to reproduce..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
          </div>
        </div>

        {error && (
          <div className="error-msg glass" style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}>
            <AlertCircle size={20} />
            {error.message}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn" 
          disabled={loading || !formData.subject || !formData.description}
        >
          {loading ? 'Submitting...' : 'Submit ticket'}
        </button>
      </form>

      <style>{`
        .new-ticket-page {
          max-width: 800px;
          margin: 0 auto;
        }
        .back-btn {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          cursor: pointer;
        }
        .category-card {
          padding: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .category-card:hover {
          background: rgba(255,255,255,0.1);
          transform: translateY(-2px);
        }
        .category-card.active {
          background: var(--primary-light);
          border-color: var(--primary);
          color: var(--primary);
        }
        .category-card .icon {
          opacity: 0.7;
        }
        .category-card.active .icon {
          opacity: 1;
        }

        .priority-card {
          padding: 12px;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
        }
        .priority-card.active {
          border-color: var(--prio-color);
          background: rgba(from var(--prio-color) r g b / 0.1);
        }
        .priority-card.active .prio-label {
          color: var(--prio-color);
          font-weight: 600;
        }
        .sla {
          font-size: 0.75rem;
          opacity: 0.6;
          margin-top: 2px;
        }

        .form-input {
          width: 100%;
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-family: inherit;
          font-size: 1rem;
        }
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          background: rgba(0,0,0,0.3);
        }

        .submit-btn {
          background: #ff6b00;
          color: white;
          border: none;
          padding: 18px;
          border-radius: 16px;
          font-size: 1.125rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          filter: brightness(1.1);
          box-shadow: 0 10px 20px -10px #ff6b00;
        }
        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .error-msg {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          color: #ef4444;
          font-size: 0.875rem;
        }
      `}</style>
    </div>
  );
}
