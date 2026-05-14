import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { 
  Monitor, 
  Users, 
  CreditCard, 
  GraduationCap, 
  CheckCircle, 
  BarChart3,
  ChevronRight,
  Info
} from 'lucide-react';

const DASHBOARD_QUERY = gql`
  query GetDashboard {
    hrRequests { id title status }
    itsmTickets { id issue status assignedTo }
    expenseItems { id title }
    approvals { id title requestor }
    surveys { id title deadline }
  }
`;

const announcements = [
  { id: 1, title: 'New IT Service Portal Live!', description: 'Please submit all VPN and hardware requests through the updated IT Helpdesk module.', color: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)' },
  { id: 2, title: 'Q2 Performance Reviews', description: 'Annual performance review cycle has started. Complete your self-appraisal by Friday.', color: 'linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)' },
  { id: 3, title: 'Company Offsite 2026', description: 'Voting is open for the upcoming team building location. Cast your vote in the Surveys tab.', color: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)' },
];

import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { loading, error, data } = useQuery(DASHBOARD_QUERY);
  const [activeSlide, setActiveSlide] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (loading) return <div className="loading">Loading dashboard data...</div>;
  if (error) return <div className="error">Error connecting to BFF: {error.message}</div>;

  const domains = [
    { id: 'it', title: 'IT Helpdesk', icon: <Monitor size={32} />, count: data.itsmTickets.length },
    { id: 'hr', title: 'HR Self-Service', icon: <Users size={32} />, count: data.hrRequests.length },
    { id: 'expense', title: 'Expense / Travel', icon: <CreditCard size={32} />, count: data.expenseItems.length },
    { id: 'learning', title: 'Learning', icon: <GraduationCap size={32} />, count: 0 },
    { id: 'approvals', title: 'Approvals', icon: <CheckCircle size={32} />, count: data.approvals.length },
    { id: 'surveys', title: 'Engagement Surveys', icon: <BarChart3 size={32} />, count: data.surveys.length },
  ];

  return (
    <div>
      <div className="header">
        <h1>Dashboard</h1>
        <p>Manage your enterprise services and requests in one place.</p>
      </div>

      {/* Banner Carousel */}
      <div className="carousel-container glass">
        {announcements.map((ann, index) => (
          <div 
            key={ann.id} 
            className={`carousel-slide ${index === activeSlide ? 'active' : ''}`}
            style={{ background: ann.color, opacity: index === activeSlide ? 1 : 0 }}
          >
            <h2 style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{ann.title}</h2>
            <p style={{ maxWidth: '600px', opacity: 0.9 }}>{ann.description}</p>
          </div>
        ))}
      </div>

      <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Info size={20} className="text-primary" /> Service Domains
      </h3>

      <div className="domain-grid">
        {domains.map((domain) => (
          <div 
            key={domain.id} 
            className="domain-card glass"
            onClick={() => domain.id === 'hr' && navigate('/hrms')}
            style={{ cursor: domain.id === 'hr' ? 'pointer' : 'default' }}
          >
            <div className="domain-icon">{domain.icon}</div>
            <h4 style={{ marginBottom: '4px' }}>{domain.title}</h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              {domain.count} Pending Items
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}
