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
    }
  }
`;

export default function ITSMDashboard() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(ITSM_DASHBOARD_QUERY);

  if (loading) return <div className="loading">Loading ITSM data...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const { stats, myAssets } = data.itsmDashboard;

  return (
    <div className="itsm-dashboard">
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
        <h3>Tickets</h3>
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
              <div className="subtitle">{stats.openCount} open · 12 closed this quarter</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
          <div className="action-item">
            <div className="icon-box"><Users size={20} /></div>
            <div className="content">
              <div className="title">Team tickets</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
        </div>
      </section>

      {/* Assets & Access */}
      <section className="dashboard-section">
        <h3>Assets & Access</h3>
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
          <div className="action-item">
            <div className="icon-box"><ShoppingBag size={20} /></div>
            <div className="content">
              <div className="title">Software catalog</div>
              <div className="subtitle">Self-service install</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="dashboard-section">
        <h3>Status</h3>
        <div className="action-list glass">
          <div className="action-item">
            <div className="icon-box"><Settings size={20} /></div>
            <div className="content">
              <div className="title">System status</div>
              <div className="subtitle">All systems operational</div>
            </div>
            <ChevronRight size={20} className="chevron" />
          </div>
          <div className="action-item">
            <div className="icon-box"><LifeBuoy size={20} /></div>
            <div className="content">
              <div className="title">Knowledge base</div>
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
          padding: 20px;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .stat-card.orange {
          background: #ff6b00;
          color: white;
        }
        .stat-card .top {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          font-weight: 600;
          opacity: 0.9;
        }
        .stat-card .value {
          font-size: 2.5rem;
          font-weight: 700;
        }
        .stat-card .subtext {
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .dashboard-section {
          margin-bottom: 24px;
        }
        .dashboard-section h3 {
          font-size: 1.125rem;
          margin-bottom: 12px;
          opacity: 0.9;
        }
        .action-list {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .action-item {
          padding: 16px;
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
          width: 40px;
          height: 40px;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0.7;
        }
        .content {
          flex: 1;
        }
        .content .title {
          font-weight: 600;
          font-size: 1rem;
        }
        .content .subtitle {
          font-size: 0.8125rem;
          color: var(--text-muted);
          margin-top: 2px;
        }
        .chevron {
          opacity: 0.3;
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
      `}</style>
    </div>
  );
}
