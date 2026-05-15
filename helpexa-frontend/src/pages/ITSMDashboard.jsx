import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Layout, 
  Users, 
  Monitor, 
  Lock, 
  ShoppingBag, 
  Settings, 
  ChevronRight,
  ChevronLeft,
  LifeBuoy
} from 'lucide-react';

const ITSM_DASHBOARD_QUERY = gql`
  query GetItsmDashboard {
    itsmDashboard {
      stats {
        openCount
        inProgressCount
        resolvedYtd
        avgResolutionTime
      }
      myAssets {
        id
        name
        type
      }
      recentTickets {
        id
        subject
        status
        category
        openDate
      }
    }
  }
`;

export default function ITSMDashboard() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ITSM_DASHBOARD_QUERY);

  if (loading) return <div className="loading">Loading ITSM data...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const { stats, myAssets, recentTickets } = data.itsmDashboard;

  return (
    <div className="itsm-dashboard" style={{ paddingBottom: '100px' }}>
      <div className="header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <button onClick={() => navigate('/')} className="back-btn glass">
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>ITSM</h1>
          <p style={{ margin: 0, opacity: 0.6, fontSize: '0.875rem' }}>IT Service Management</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="stats-row">
        <div className="stat-card orange">
          <div className="top">
            <span>OPEN TICKETS</span>
            <Layout size={20} />
          </div>
          <div className="value">{stats.openCount}</div>
          <div className="subtext">{stats.inProgressCount} in progress</div>
        </div>

        <div className="stat-card glass">
          <div className="top">
            <span>RESOLVED YTD</span>
          </div>
          <div className="value">{stats.resolvedYtd}</div>
          <div className="subtext">Avg. {stats.avgResolutionTime}</div>
        </div>
      </div>

      {/* Tickets Section */}
      <section className="dashboard-section">
        <h3 className="hrms-section-title">Tickets</h3>
        <div className="action-list glass">
          <div className="action-item" onClick={() => navigate('/new-ticket')}>
            <div className="icon-box"><Plus size={20} /></div>
            <div className="content">
              <div className="title">Raise a ticket</div>
              <div className="subtitle">Hardware · Software · Access</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
          <div className="action-item">
            <div className="icon-box"><Layout size={20} /></div>
            <div className="content">
              <div className="title">My tickets</div>
              <div className="subtitle">{stats.openCount} open · {stats.resolvedYtd} resolved YTD</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
        </div>
      </section>

      {/* Recent Tickets List */}
      <section className="dashboard-section">
        <h3 className="hrms-section-title">RECENT ACTIVITY</h3>
        <div className="action-list glass">
          {recentTickets.length > 0 ? recentTickets.map(ticket => (
            <div key={ticket.id} className="action-item">
              <div className="icon-box">
                {ticket.category === 'Hardware' ? <Monitor size={20} /> : <Layout size={20} />}
              </div>
              <div className="content">
                <div className="title">{ticket.subject}</div>
                <div className="subtitle">{ticket.status} · {ticket.category}</div>
              </div>
              <div style={{ fontSize: '0.75rem', opacity: 0.5 }}>
                {new Date(ticket.openDate).toLocaleDateString()}
              </div>
            </div>
          )) : (
            <div style={{ padding: '20px', textAlign: 'center', opacity: 0.5 }}>No recent tickets</div>
          )}
        </div>
      </section>

      {/* Assets & Access */}
      <section className="dashboard-section">
        <h3 className="hrms-section-title">ASSETS & ACCESS</h3>
        <div className="action-list glass">
          <div className="action-item">
            <div className="icon-box"><Monitor size={20} /></div>
            <div className="content">
              <div className="title">My assets</div>
              <div className="subtitle">{myAssets.map(a => a.name).join(' · ')}</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
          <div className="action-item">
            <div className="icon-box"><Lock size={20} /></div>
            <div className="content">
              <div className="title">Request access</div>
              <div className="subtitle">Apps · Folders · VPN</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
        </div>
      </section>

      <style>{`
        .itsm-dashboard {
          max-width: 800px;
          margin: 0 auto;
        }
        .stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }
        .stat-card {
          padding: 24px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-card.orange {
          background: #ff6b00;
          color: white;
          box-shadow: 0 10px 20px rgba(255, 107, 0, 0.2);
        }
        .stat-card .top {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          opacity: 0.9;
        }
        .stat-card .value {
          font-size: 2.5rem;
          font-weight: 800;
        }
        .stat-card .subtext {
          font-size: 0.875rem;
          opacity: 0.8;
          font-weight: 500;
        }

        .dashboard-section {
          margin-bottom: 32px;
        }
        .hrms-section-title {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 12px;
          padding-left: 4px;
        }
        .action-list {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
        }
        .action-item {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: all 0.2s;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }
        .action-item:last-child {
          border-bottom: none;
        }
        .action-item:hover {
          background: rgba(255,255,255,0.05);
        }
        .icon-box {
          width: 48px;
          height: 48px;
          background: rgba(255,255,255,0.05);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.8;
        }
        .content {
          flex: 1;
        }
        .content .title {
          font-weight: 600;
          font-size: 1rem;
          color: white;
        }
        .content .subtitle {
          font-size: 0.8125rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 2px;
        }
        .chevron {
          opacity: 0.3;
          color: white;
        }
        .back-btn {
          width: 44px;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
        }
      `}</style>
    </div>
  );
}
