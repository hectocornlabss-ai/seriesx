import React from 'react';
import { Film, Sparkles, CheckCircle2, AlertTriangle, Layers, Download, SlidersHorizontal } from 'lucide-react';

export default function Header({ project, activeTab, setActiveTab, onExportPitchDeck, qaStatus }) {
  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(8, 9, 13, 0.92)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '12px 24px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Brand & Series Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(244, 63, 94, 0.35)'
          }}>
            <Film size={22} color="#ffffff" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                margin: 0
              }}>
                SeriesX Studio
              </h1>
              <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>
                9:16 VERTICAL ENGINE
              </span>
              <span className="badge badge-purple" style={{ fontSize: '0.7rem' }}>
                AI MULTI-AGENT
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              ซีรีส์: <strong style={{ color: '#fff' }}>{project.title}</strong> — {project.episodeTitle}
            </p>
          </div>
        </div>

        {/* Global Pipeline Health & Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '6px 14px',
            borderRadius: '20px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.8rem'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: qaStatus === 'APPROVED' ? '#10b981' : '#f59e0b',
              boxShadow: qaStatus === 'APPROVED' ? '0 0 10px #10b981' : '0 0 10px #f59e0b'
            }} />
            <span style={{ color: 'var(--text-muted)' }}>สถานะโปรเจกต์:</span>
            <strong style={{ color: qaStatus === 'APPROVED' ? '#34d399' : '#fbbf24' }}>
              {qaStatus === 'APPROVED' ? 'Director Approved (พร้อมส่งมอบ)' : 'In Quality Review Gate'}
            </strong>
          </div>

          <button
            onClick={() => setActiveTab('pitch')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.2), rgba(139, 92, 246, 0.2))',
              border: '1px solid rgba(244, 63, 94, 0.4)',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <Sparkles size={16} color="#f43f5e" />
            Sponsor & Pitch Deck
          </button>
        </div>
      </div>

      {/* Department Tabs Bar */}
      <nav style={{
        display: 'flex',
        gap: '6px',
        marginTop: '16px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        {[
          { id: 'writers', label: '1. Writers Room (บท & 3s Hook)', badge: 'Hook: 96/100' },
          { id: 'character', label: '2. Casting & Character Bible', badge: 'Face-Lock 98.7%' },
          { id: 'art', label: '3. Art & Sponsor Vault (VPP)', badge: 'Sponsor: LUMIÈRE' },
          { id: 'pipeline', label: '4. Video & Audio Engine', badge: '9:16 UHD' },
          { id: 'qa', label: '5. Dual QA Gate (AI + Director)', badge: qaStatus === 'APPROVED' ? 'APPROVED' : 'Awaiting Sign-off' },
          { id: 'pitch', label: '6. Commercial Pitch & Export', badge: 'Deck Ready' }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: isActive ? 600 : 500,
                whiteSpace: 'nowrap',
                background: isActive ? 'rgba(244, 63, 94, 0.15)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                border: isActive ? '1px solid rgba(244, 63, 94, 0.5)' : '1px solid transparent',
                cursor: 'pointer'
              }}
            >
              <span>{tab.label}</span>
              <span style={{
                fontSize: '0.7rem',
                padding: '2px 6px',
                borderRadius: '10px',
                background: isActive ? 'rgba(244, 63, 94, 0.3)' : 'rgba(255, 255, 255, 0.06)',
                color: isActive ? '#fecdd3' : 'var(--text-dim)'
              }}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}
