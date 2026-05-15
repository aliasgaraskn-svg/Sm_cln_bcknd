import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { 
  ChevronLeft, 
  Calendar, 
  Clock, 
  User, 
  Award, 
  Briefcase, 
  FileText,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HR_DASHBOARD_QUERY = gql`
  query GetHrDashboard {
    hrDashboard {
      leaveBalance {
        total
        casual
        sick
        earned
      }
      attendance {
        workedHours
        targetHours
      }
      recentRequests {
        id
        title
        status
        startDate
        endDate
      }
    }
  }
`;

export default function HRMSDashboard() {
  const { loading, error, data } = useQuery(HR_DASHBOARD_QUERY);
  const navigate = useNavigate();

  if (loading) return <div className="loading">Loading HRMS data...</div>;
  if (error) return <div className="error">Error loading HRMS: {error.message}</div>;

  const { hrDashboard } = data;

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div className="hrms-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={24} />
        </button>
        <h1 style={{ color: 'white', margin: 0 }}>HRMS</h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>Human Resources</p>
      </div>

      <div className="hrms-stats-grid">
        <div className="hrms-stat-card dark">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.8, textTransform: 'uppercase' }}>Leave Balance</span>
            <Calendar size={16} opacity={0.8} />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px' }}>
            {hrDashboard.leaveBalance.total}d
          </div>
          <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>
            {hrDashboard.leaveBalance.casual} CL · {hrDashboard.leaveBalance.sick} SL · {hrDashboard.leaveBalance.earned} PL
          </div>
        </div>

        <div className="hrms-stat-card light">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Worked This Month</span>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '4px', color: '#111827' }}>
            {hrDashboard.attendance.workedHours}h
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            Target: {hrDashboard.attendance.targetHours}h
          </div>
        </div>
      </div>

      <h3 className="hrms-section-title">Time off</h3>
      <div className="hrms-menu-list">
        <div className="hrms-menu-item" onClick={() => navigate('/apply-leave')}>
          <div className="hrms-menu-icon"><Calendar size={20} /></div>
          <div className="hrms-menu-content">
            <span className="hrms-menu-label">Apply leave</span>
            <span className="hrms-menu-subtext">
              {hrDashboard.recentRequests[0] 
                ? `Last: ${hrDashboard.recentRequests[0].title}`
                : 'No recent requests'}
            </span>
          </div>
          <ChevronRight size={20} color="#d1d5db" />
        </div>

        <div className="hrms-menu-item">
          <div className="hrms-menu-icon"><Clock size={20} /></div>
          <div className="hrms-menu-content">
            <span className="hrms-menu-label">Attendance & timesheet</span>
            <span className="hrms-menu-subtext">Week of 12 May · 24h logged</span>
          </div>
          <ChevronRight size={20} color="#d1d5db" />
        </div>
        <div className="hrms-menu-item">
          <div className="hrms-menu-icon"><Calendar size={20} /></div>
          <div className="hrms-menu-content">
            <span className="hrms-menu-label">Holiday calendar 2026</span>
          </div>
          <ChevronRight size={20} color="#d1d5db" />
        </div>
      </div>

      <h3 className="hrms-section-title">Career</h3>
      <div className="hrms-menu-list">
        <div className="hrms-menu-item">
          <div className="hrms-menu-icon"><User size={20} /></div>
          <div className="hrms-menu-content">
            <span className="hrms-menu-label">My profile</span>
            <span className="hrms-menu-subtext">Senior Product Designer</span>
          </div>
          <ChevronRight size={20} color="#d1d5db" />
        </div>
        <div className="hrms-menu-item">
          <div className="hrms-menu-icon"><Award size={20} /></div>
          <div className="hrms-menu-content">
            <span className="hrms-menu-label">Performance review</span>
            <span className="hrms-menu-subtext">Self-assessment open</span>
          </div>
          <ChevronRight size={20} color="#d1d5db" />
        </div>
        <div className="hrms-menu-item">
          <div className="hrms-menu-icon"><Briefcase size={20} /></div>
          <div className="hrms-menu-content">
            <span className="hrms-menu-label">Internal job board</span>
            <span className="hrms-menu-subtext">12 open roles</span>
          </div>
          <ChevronRight size={20} color="#d1d5db" />
        </div>
      </div>

      <h3 className="hrms-section-title">Payroll</h3>
      <div className="hrms-menu-list">
        <div className="hrms-menu-item">
          <div className="hrms-menu-icon"><FileText size={20} /></div>
          <div className="hrms-menu-content">
            <span className="hrms-menu-label">Payslips</span>
            <span className="hrms-menu-subtext">April</span>
          </div>
          <ChevronRight size={20} color="#d1d5db" />
        </div>
      </div>
    </div>
  );
}
