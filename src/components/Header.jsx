import React, { useState } from 'react';
import { Film, Sparkles, PenTool, UserCheck, Package, Camera, ShieldCheck, FileText, CheckCircle2, Clock, ChevronDown, BookOpen } from 'lucide-react';

export default function Header({ activeSeries, seriesList, onSelectSeries, activeTab, setActiveTab, onExportPitchDeck, qaStatus, onGoHome }) {
  const [showSeriesDropdown, setShowSeriesDropdown] = useState(false);

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
        {/* Brand & Series Title with Book Cover Thumbnail */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', position: 'relative' }}>
          {/* Home Icon Button (Film reel) */}
          <button
            onClick={onGoHome}
            id="btn-header-home-icon"
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--shadow-teal-btn)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              outline: 'none',
              padding: 0
            }}
            title="คลิกกลับไปหน้าหลัก (คลังซีรีส์ & ภาพรวม)"
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.08)';
              e.currentTarget.style.boxShadow = '0 6px 18px rgba(11, 74, 81, 0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'var(--shadow-teal-btn)';
            }}
          >
            <Film size={22} color="#FFFFFF" strokeWidth={2} />
          </button>

          {/* Book Cover Thumbnail */}
          <div
            onClick={() => setShowSeriesDropdown(!showSeriesDropdown)}
            style={{
              width: '34px',
              height: '48px',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-raised-sm)',
              border: '1.5px solid var(--teal-primary)',
              cursor: 'pointer',
              flexShrink: 0
            }}
            title="คลิกเพื่อสลับเรื่อง"
          >
            <img src={activeSeries.coverUrl} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1
                onClick={onGoHome}
                id="btn-header-home-title"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--text-main)',
                  letterSpacing: '-0.02em',
                  margin: 0,
                  cursor: 'pointer',
                  userSelect: 'none',
                  transition: 'color 0.15s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--teal-primary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                title="คลิกกลับไปหน้าหลัก (คลังซีรีส์ & ภาพรวม)"
              >
                SeriesX Studio
              </h1>

              {/* Series Switcher Pill */}
              <button
                onClick={() => setShowSeriesDropdown(!showSeriesDropdown)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'var(--bg-inset)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--teal-primary)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <BookOpen size={12} strokeWidth={2} />
                <span>{seriesList.length} เรื่องในระบบ</span>
                <ChevronDown size={12} strokeWidth={2} />
              </button>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              เรื่องที่เปิด: <strong style={{ color: 'var(--text-main)' }}>{activeSeries.title}</strong> — {activeSeries.episodeTitle}
            </p>
          </div>

          {/* Series Switcher Dropdown */}
          {showSeriesDropdown && (
            <div style={{
              position: 'absolute',
              top: '55px',
              left: '56px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-raised)',
              padding: '8px',
              zIndex: 100,
              minWidth: '320px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div style={{ padding: '6px 10px', fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                เลือกซีรีส์ที่ต้องการผลิต:
              </div>
              {seriesList.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    onSelectSeries(item.id);
                    setShowSeriesDropdown(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 10px',
                    borderRadius: 'var(--radius-sm)',
                    background: item.id === activeSeries.id ? 'var(--bg-inset)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.15s'
                  }}
                >
                  <img src={item.coverUrl} alt="Cover" style={{ width: '28px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)', display: 'block' }}>{item.title}</strong>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.episodesCount} ตอน &bull; {item.genre.split('/')[0]}</span>
                  </div>
                  {item.id === activeSeries.id && (
                    <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>Active</span>
                  )}
                </div>
              ))}
            </div>
          )}
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

      {/* Navigation Tabs */}
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
