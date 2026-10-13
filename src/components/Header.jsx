import React from 'react';
import { Film, Sparkles, PenTool, UserCheck, Package, Camera, ShieldCheck, FileText, CheckCircle2, Clock } from 'lucide-react';

export default function Header({ project, activeTab, setActiveTab, onExportPitchDeck, qaStatus }) {
  const tabs = [
    { id: 'writers', label: '1. Writers Room', sub: 'Hook 96/100', icon: PenTool },
    { id: 'character', label: '2. Casting & Character Bible', sub: 'Face-Lock 98.7%', icon: UserCheck },
    { id: 'art', label: '3. Art & Sponsor Vault (VPP)', sub: 'LUMIÈRE', icon: Package },
    { id: 'pipeline', label: '4. Video & Audio Engine', sub: '9:16 UHD', icon: Camera },
    { id: 'qa', label: '5. Dual QA Gate', sub: qaStatus === 'APPROVED' ? 'Approved' : 'Review', icon: ShieldCheck },
    { id: 'pitch', label: '6. Commercial Pitch & Export', sub: 'Deck Ready', icon: FileText }
  ];

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'var(--bg-surface)',
      boxShadow: '0 4px 16px rgba(190, 180, 160, 0.15)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '14px 24px 12px 24px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Series Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'var(--teal-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-teal-btn)'
          }}>
            <Film size={22} color="#FFFFFF" strokeWidth={2} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                SeriesX Studio
              </h1>
              <span className="badge badge-teal" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                9:16 VERTICAL
              </span>
              <span className="badge badge-sand" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                AI MULTI-AGENT
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              ซีรีส์: <strong style={{ color: 'var(--text-main)' }}>{project.title}</strong> — {project.episodeTitle}
            </p>
          </div>
        </div>

        {/* Global Pipeline Health & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            padding: '7px 14px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: qaStatus === 'APPROVED' ? 'var(--accent-green)' : 'var(--accent-amber)',
              boxShadow: qaStatus === 'APPROVED' ? '0 0 6px rgba(31, 122, 89, 0.6)' : '0 0 6px rgba(180, 107, 24, 0.6)'
            }} />
            <span style={{ color: 'var(--text-muted)' }}>สถานะ:</span>
            <strong style={{ color: qaStatus === 'APPROVED' ? 'var(--accent-green)' : 'var(--accent-amber)' }}>
              {qaStatus === 'APPROVED' ? 'Director Approved (พร้อมส่งมอบ)' : 'In Quality Review Gate'}
            </strong>
          </div>

          <button
            onClick={() => setActiveTab('pitch')}
            className="btn-primary"
          >
            <Sparkles size={16} strokeWidth={2} />
            <span>Sponsor & Pitch Deck</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs (Image 2 style: Inset track with white raised pills) */}
      <nav style={{
        display: 'flex',
        gap: '4px',
        marginTop: '14px',
        padding: '4px',
        background: 'var(--bg-inset)',
        borderRadius: 'var(--radius-pill)',
        boxShadow: 'var(--shadow-inset)',
        overflowX: 'auto',
        border: '1px solid var(--border-subtle)'
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '7px 16px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                whiteSpace: 'nowrap',
                background: isActive ? 'var(--bg-raised)' : 'transparent',
                color: isActive ? 'var(--teal-primary)' : 'var(--text-muted)',
                boxShadow: isActive ? 'var(--shadow-raised-sm)' : 'none',
                border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={15} strokeWidth={2} color={isActive ? 'var(--teal-primary)' : 'var(--text-muted)'} />
              <span>{tab.label}</span>
              <span style={{
                fontSize: '0.68rem',
                padding: '2px 7px',
                borderRadius: 'var(--radius-pill)',
                background: isActive ? 'var(--teal-subtle)' : 'rgba(0, 0, 0, 0.05)',
                color: isActive ? 'var(--teal-primary)' : 'var(--text-dim)',
                fontWeight: 600
              }}>
                {tab.sub}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
