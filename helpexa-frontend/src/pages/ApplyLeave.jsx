import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  Phone, 
  CheckCircle2,
  Heart,
  Star,
  Monitor
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const APPLY_LEAVE_MUTATION = gql`
  mutation ApplyLeave($input: ApplyLeaveInput!) {
    applyLeave(input: $input) {
      id
      title
      status
    }
  }
`;

export default function ApplyLeave() {
  const navigate = useNavigate();
  const [leaveType, setLeaveType] = useState('Casual');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('+91 98xxx xxxxx');
  const [submitted, setSubmitted] = useState(false);

  const [applyLeave, { loading }] = useMutation(APPLY_LEAVE_MUTATION, {
    refetchQueries: ['hrDashboard'],
    onCompleted: () => {
      setSubmitted(true);
      setTimeout(() => navigate('/hrms'), 2000);
    }
  });

  const calculateDays = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const handleSubmit = () => {
    applyLeave({
      variables: {
        input: {
          type: leaveType,
          startDate,
          endDate,
          reason,
          contact
        }
      }
    });
  };

  if (submitted) {
    return (
      <div className="glass" style={{ padding: '60px', textAlign: 'center', maxWidth: '500px', margin: '100px auto' }}>
        <CheckCircle2 size={64} color="var(--success)" style={{ marginBottom: '20px' }} />
        <h2>Request Submitted!</h2>
        <p style={{ color: 'var(--text-muted)' }}>Redirecting to HRMS Dashboard...</p>
      </div>
    );
  }

  const leaveTypes = [
    { id: 'Casual', label: 'Casual', icon: <Calendar className="text-primary" />, color: '#6366f1' },
    { id: 'Sick', label: 'Sick', icon: <Heart color="#ef4444" />, color: '#ef4444' },
    { id: 'Privilege', label: 'Privilege', icon: <Star color="#f59e0b" />, color: '#f59e0b' },
    { id: 'WFH', label: 'WFH', icon: <Monitor color="#10b981" />, color: '#10b981' },
  ];

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', paddingBottom: '100px' }}>
      <div className="hrms-header" style={{ marginBottom: '24px' }}>
        <button className="back-btn" onClick={() => navigate('/hrms')}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ color: 'white', margin: 0 }}>Apply Leave</h1>
      </div>

      <h3 className="hrms-section-title">LEAVE TYPE</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
        {leaveTypes.map((type) => (
          <div 
            key={type.id}
            onClick={() => setLeaveType(type.id)}
            style={{
              padding: '16px',
              borderRadius: '16px',
              background: leaveType === type.id ? 'var(--bg-card)' : 'white',
              border: '1px solid rgba(0,0,0,0.05)',
              cursor: 'pointer',
              display: 'flex',
              gap: '12px',
              transition: 'all 0.2s',
              color: leaveType === type.id ? 'white' : '#111827'
            }}
          >
            <div style={{ 
              background: leaveType === type.id ? 'rgba(255,255,255,0.1)' : '#f3f4f6', 
              padding: '8px', 
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center'
            }}>
              {type.icon}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{type.label}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="hrms-section-title">DATES</h3>
      <div className="glass" style={{ padding: '20px', borderRadius: '20px', marginBottom: '32px', background: 'white' }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '8px' }}>From</label>
            <div style={{ border: '1px solid #e5e7eb', padding: '12px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Calendar size={16} color="#6b7280" />
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ border: 'none', fontSize: '0.875rem', outline: 'none', width: '100%' }} />
            </div>
          </div>
          <div style={{ color: '#d1d5db', marginTop: '20px' }}>→</div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: '8px' }}>To</label>
            <div style={{ border: '1px solid #e5e7eb', padding: '12px', borderRadius: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Calendar size={16} color="#6b7280" />
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ border: 'none', fontSize: '0.875rem', outline: 'none', width: '100%' }} />
            </div>
          </div>
        </div>
        <div style={{ background: '#fef3f2', padding: '12px 16px', borderRadius: '12px', display: 'flex', gap: '12px', alignItems: 'center', color: '#991b1b' }}>
          <Clock size={18} />
          <div style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{calculateDays()} working days</div>
        </div>
      </div>

      <h3 className="hrms-section-title">Reason (optional)</h3>
      <div style={{ marginBottom: '32px' }}>
        <textarea 
          placeholder="Brief note for your manager"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          style={{
            width: '100%',
            height: '100px',
            padding: '16px',
            borderRadius: '16px',
            border: '1px solid #e5e7eb',
            outline: 'none',
            fontSize: '0.9375rem',
            resize: 'none',
            fontFamily: 'inherit'
          }}
        />
      </div>

      <h3 className="hrms-section-title">Contact while away</h3>
      <div style={{ marginBottom: '40px' }}>
        <div style={{ border: '1px solid #e5e7eb', padding: '16px', borderRadius: '16px', display: 'flex', gap: '12px', alignItems: 'center', background: 'white' }}>
          <Phone size={18} color="#6b7280" />
          <input 
            type="text" 
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={{ border: 'none', fontSize: '0.9375rem', outline: 'none', width: '100%' }}
          />
        </div>
      </div>

      <button 
        onClick={handleSubmit}
        disabled={loading}
        style={{
          width: '100%',
          padding: '20px',
          background: 'var(--bg-card)',
          color: 'white',
          border: 'none',
          borderRadius: '16px',
          fontSize: '1rem',
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px'
        }}
      >
        {loading ? 'Submitting...' : 'Submit request'}
      </button>
    </div>
  );
}
