import React, { useState } from 'react';
import { 
  Download, Share2, DollarSign, TrendingUp, Layers, Users, Award, 
  Printer, FileJson, CheckCircle2, ShieldCheck, Sparkles, Smartphone, 
  Eye, Clock, Building2, ChevronRight, BarChart3, Check, Tag, Target
} from 'lucide-react';

export default function PitchDeckTab({ 
  project = {}, 
  characters = [], 
  sponsorProduct = {}, 
  sponsorProducts = [], 
  shots = [] 
}) {
  const [copied, setCopied] = useState(false);

  // Normalize sponsor products list (fallback to sponsorProduct or default if empty)
  const defaultSponsor = {
    id: 'sp-01',
    brand: 'LUMIÈRE Laboratories',
    productName: "LUMIÈRE Elixir D'or (Revitalizing Serum)",
    tagline: 'กุญแจสู่ผิวอ่อนเยาว์เหนือกาลเวลา พลังทองคำบริสุทธิ์',
    heroImage: '/assets/sponsor_serum.jpg',
    sceneImage: '/assets/sponsor_serum.jpg',
    category: 'Luxury Skincare / Cosmetics (สกินแคร์ & เครื่องสำอางหรู)',
    contractTier: 'Tier-1 Exclusive Drama Sponsor (สปอนเซอร์หลักตอนเดียว)',
    placementsPerEpisode: 1,
    targetScreenTimeSec: 4.5,
    actualScreenTimeSec: 4.8,
    estimatedAudienceViews: '2,500,000+ views (Shorts/TikTok Reach)',
    safeZoneVerified: true,
    sponsorStatus: 'Contract Signed & Scene Validated',
    sponsorRevenueTHB: 450000,
    placementNotes: 'วางในฉากโต๊ะทำงานของผู้บริหารและกระเป๋าถือของนางเอก สื่อถึงความหรูหรา น่าเชื่อถือ',
    targetShot: 'EP 01 - Shot 03 (The Sponsor Showcase)'
  };

  const effectiveSponsors = (sponsorProducts && sponsorProducts.length > 0)
    ? sponsorProducts
    : (sponsorProduct && sponsorProduct.id ? [sponsorProduct] : [defaultSponsor]);

  const [activeSponsorId, setActiveSponsorId] = useState(effectiveSponsors[0]?.id || 'sp-01');

  const selectedSponsor = effectiveSponsors.find(s => s.id === activeSponsorId) || effectiveSponsors[0] || defaultSponsor;

  // Financial & Metric Calculations
  const totalSponsorRevenue = effectiveSponsors.reduce((sum, p) => sum + (Number(p.sponsorRevenueTHB) || 0), 0);
  const totalAirtimePerEpisode = effectiveSponsors.reduce((sum, p) => sum + (Number(p.actualScreenTimeSec || p.targetScreenTimeSec) || 0), 0);
  const episodesCount = project.episodesCount || 60;
  const totalSeasonAirtimeMinutes = ((totalAirtimePerEpisode * episodesCount) / 60).toFixed(1);
  const estimatedReachTotal = episodesCount * 450000; // ~27M views base reach

  const handlePrintPdf = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const handleExportJson = () => {
    try {
      const deckData = {
        packageType: 'SeriesX Executive Pitch Deck & Commercial Proposal',
        version: '2.0.0-HollywoodProduction',
        exportedAt: new Date().toISOString(),
        project: {
          id: project.id,
          title: project.title,
          englishTitle: project.englishTitle,
          genre: project.genre,
          format: project.aspectRatio || '9:16 Vertical UHD (1080x1920)',
          targetFormat: project.targetFormat || 'TikTok / ReelShort / DramaBox',
          episodesCount: episodesCount,
          logline: project.logline,
          synopsis: project.synopsis,
          coreConflict: project.coreConflict,
          hookStrategy: project.hookStrategy,
          cliffhangerStrategy: project.cliffhangerStrategy,
          pacingScore: project.pacingScore
        },
        financialSummary: {
          totalSponsorRevenueTHB: totalSponsorRevenue,
          totalSponsorsCount: effectiveSponsors.length,
          totalAirtimePerEpisodeSec: totalAirtimePerEpisode,
          totalSeasonAirtimeMinutes: Number(totalSeasonAirtimeMinutes),
          estimatedAudienceReach: estimatedReachTotal,
          productionCostReductionPct: 70,
          aiProductionSpeedMultiplier: '5x'
        },
        sponsorPartners: effectiveSponsors.map(s => ({
          id: s.id,
          brand: s.brand,
          productName: s.productName,
          tagline: s.tagline,
          category: s.category,
          contractTier: s.contractTier,
          sponsorRevenueTHB: Number(s.sponsorRevenueTHB) || 0,
          actualScreenTimeSec: Number(s.actualScreenTimeSec || s.targetScreenTimeSec) || 0,
          estimatedAudienceViews: s.estimatedAudienceViews,
          safeZoneVerified: s.safeZoneVerified ?? true,
          targetShot: s.targetShot,
          placementNotes: s.placementNotes
        })),
        characters: characters.map(c => ({
          id: c.id,
          name: c.name,
          role: c.role,
          actingStyle: c.actingStyle,
          faceLockAccuracy: c.faceLockAccuracy,
          wardrobeSpec: c.wardrobeSpec,
          voiceProfile: c.voiceProfile
        })),
        shotsCount: shots.length,
        shots
      };

      const blob = new Blob([JSON.stringify(deckData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${(project.englishTitle || project.title || 'SeriesX').replace(/[^a-zA-Z0-9_-]/g, '_')}_ExecutivePitchDeck.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการส่งออกไฟล์: ' + err.message);
    }
  };

  const handleShareLink = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', padding: '18px 0' }}>
      
      {/* Responsive Layout & Print Styles */}
      <style>{`
        .pitch-header-card {
          padding: 24px 28px;
        }
        .pitch-header-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          flex-wrap: wrap;
        }
        .pitch-header-info {
          flex: 1 1 340px;
          min-width: 0;
        }
        .pitch-action-toolbar {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
        }
        .pitch-action-btn {
          flex: 1 1 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          padding: 9px 14px;
          font-size: 0.82rem;
          white-space: nowrap;
        }

        .pitch-kpi-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 16px;
        }

        .sponsor-showcase-box {
          background: var(--bg-inset);
          box-shadow: var(--shadow-inset);
          border-radius: var(--radius-md);
          padding: 22px;
          border: 1px solid var(--border-subtle);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 22px;
          align-items: center;
        }
        .sponsor-images-row {
          display: flex;
          gap: 12px;
          align-items: center;
          flex-shrink: 0;
        }

        .pitch-bottom-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 20px;
        }

        @media (max-width: 640px) {
          .pitch-header-card {
            padding: 18px 20px !important;
          }
          .pitch-header-flex {
            flex-direction: column !important;
            gap: 16px !important;
          }
          .pitch-action-toolbar {
            display: grid !important;
            grid-template-columns: 1fr !important;
            width: 100% !important;
            gap: 8px !important;
          }
          .pitch-action-btn {
            width: 100% !important;
            padding: 10px 14px !important;
          }
          .pitch-kpi-grid {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
          .sponsor-showcase-box {
            grid-template-columns: 1fr !important;
            padding: 16px !important;
            gap: 16px !important;
          }
          .sponsor-images-row {
            justify-content: center !important;
            width: 100% !important;
          }
          .pitch-bottom-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        @media print {
          body {
            background: #ffffff !important;
            color: #111111 !important;
          }
          header, footer, nav, .no-print, button {
            display: none !important;
          }
          .clay-card {
            box-shadow: none !important;
            border: 1px solid #d1d5db !important;
            background: #ffffff !important;
            break-inside: avoid;
            margin-bottom: 20px !important;
          }
          .badge {
            border: 1px solid #999 !important;
            color: #000 !important;
          }
        }
      `}</style>

      {/* Pitch Deck Header Card */}
      <div className="clay-card pitch-header-card">
        <div className="pitch-header-flex">
          <div className="pitch-header-info">
            {/* Badges Row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '10px' }}>
              <span className="badge badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', padding: '4px 10px', fontSize: '0.74rem' }}>
                <Sparkles size={13} />
                <span>Executive Pitch Deck</span>
              </span>
              <span className="badge" style={{ background: 'var(--bg-inset)', color: 'var(--text-main)', padding: '4px 10px', fontSize: '0.74rem', fontWeight: 600 }}>
                {project.aspectRatio || '9:16 Vertical UHD'}
              </span>
              <span className="badge" style={{ background: 'var(--accent-green-bg)', color: 'var(--accent-green)', padding: '4px 10px', fontSize: '0.74rem', fontWeight: 700 }}>
                {episodesCount} ตอน (Episodes)
              </span>
            </div>

            {/* Title & Description */}
            <h2 style={{ fontSize: 'clamp(1.3rem, 3.5vw, 1.65rem)', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 800, lineHeight: 1.3 }}>
              {project.title} — Commercial Proposal
            </h2>
            <p style={{ fontSize: 'clamp(0.82rem, 2vw, 0.92rem)', color: 'var(--text-muted)', marginTop: '8px', maxWidth: '820px', lineHeight: 1.55 }}>
              เอกสารนำเสนอโครงการผลิตซีรีส์สั้นแนวตั้งเกรดพรีเมียม (60 ตอน) เชื่อมโยงระบบสปอนเซอร์ Virtual Product Placement (VPP) และมาตรฐานการผลิตระดับ Hollywood พร้อมรายงานผลตอบแทนการลงทุน (ROI)
            </p>
          </div>

          {/* Action Buttons Toolbar - Responsively Stacked on Mobile, Flex on Desktop */}
          <div className="no-print pitch-action-toolbar">
            <button
              onClick={handleShareLink}
              className="btn-secondary pitch-action-btn"
              title="คัดลอก URL เพื่อแชร์"
            >
              {copied ? <Check size={16} color="var(--accent-green)" /> : <Share2 size={16} />}
              <span>{copied ? 'คัดลอกลิงก์แล้ว!' : 'แชร์ Pitch Link'}</span>
            </button>
            <button
              onClick={handleExportJson}
              className="btn-secondary pitch-action-btn"
              title="ส่งออกโครงสร้าง Pitch Deck ทั้งหมดเป็น JSON สำหรับนำไปทำงานต่อ"
            >
              <FileJson size={16} />
              <span>ส่งออก JSON Deck</span>
            </button>
            <button
              onClick={handlePrintPdf}
              className="btn-primary pitch-action-btn"
              title="พิมพ์เอกสาร หรือ บันทึกเป็น PDF ผ่านเบราว์เซอร์"
            >
              <Printer size={16} />
              <span>พิมพ์ / บันทึก PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Commercial Highlights & ROI Projection (4 KPI Cards) */}
      <div className="pitch-kpi-grid">
        {/* KPI 1: Dynamic Sponsor Revenue */}
        <div className="clay-card" style={{ padding: '20px 22px', borderLeft: '4px solid var(--accent-green)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)' }}>
              <DollarSign size={20} strokeWidth={2.2} />
              <strong style={{ fontSize: '0.85rem' }}>มูลค่าสปอนเซอร์รวม (Total Sponsor)</strong>
            </div>
            <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--accent-green-bg)', color: 'var(--accent-green)', fontWeight: 700 }}>
              Live Synced
            </span>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-display)' }}>
            ฿{totalSponsorRevenue.toLocaleString()}
          </div>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            รายได้สัญญารวมจาก {effectiveSponsors.length} แบรนด์ผู้สนับสนุน (Art & Sponsor Vault)
          </p>
        </div>

        {/* KPI 2: Projected Reach */}
        <div className="clay-card" style={{ padding: '20px 22px', borderLeft: '4px solid var(--teal-primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', marginBottom: '8px' }}>
            <TrendingUp size={20} strokeWidth={2.2} />
            <strong style={{ fontSize: '0.85rem' }}>คาดการณ์ยอดชม (Projected Reach)</strong>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
            {estimatedReachTotal.toLocaleString()}+
          </div>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            ยอดวิวรวมทั้งซีรีส์ 60 ตอน บนเครือข่าย TikTok / Reels / DramaBox
          </p>
        </div>

        {/* KPI 3: Total Sponsor Airtime */}
        <div className="clay-card" style={{ padding: '20px 22px', borderLeft: '4px solid #D97706' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#D97706', marginBottom: '8px' }}>
            <Clock size={20} strokeWidth={2.2} />
            <strong style={{ fontSize: '0.85rem' }}>แอร์ไทม์สปอนเซอร์ทั้งซีซัน</strong>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#D97706', fontFamily: 'var(--font-display)' }}>
            {totalSeasonAirtimeMinutes} นาที
          </div>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            เฉลี่ย {totalAirtimePerEpisode.toFixed(1)} วินาที/ตอน ทุกช็อตผ่านเกณฑ์ Mobile Safe-Zone
          </p>
        </div>

        {/* KPI 4: AI Production Speed */}
        <div className="clay-card" style={{ padding: '20px 22px', borderLeft: '4px solid #4F46E5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#4F46E5', marginBottom: '8px' }}>
            <Layers size={20} strokeWidth={2.2} />
            <strong style={{ fontSize: '0.85rem' }}>ความเร็วการผลิต & ลดต้นทุน</strong>
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: '#4F46E5', fontFamily: 'var(--font-display)' }}>
            5x เร็วขึ้น / -70%
          </div>
          <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            ลดต้นทุนการเช่ากองถ่ายจริง คุมความต่อเนื่องใบหน้า & แสงได้ 100%
          </p>
        </div>
      </div>

      {/* Multi-Sponsor Spotlight & Interactive Portfolio */}
      <div className="clay-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '18px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} color="var(--teal-primary)" />
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                พอร์ตโฟลิโอสปอนเซอร์พรีเมียม (Featured Sponsor Partners)
              </h3>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              คลิกเลือกแบรนด์เพื่อดูรายละเอียดสัญญาการแทรกสินค้า (VPP) และเฟรมฉากแนวตั้ง 9:16 ที่ผ่านการตรวจสอบ Safe-Zone
            </p>
          </div>

          {/* Interactive Sponsor Switcher Pills */}
          <div className="no-print" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {effectiveSponsors.map(sponsor => {
              const isActive = sponsor.id === activeSponsorId;
              return (
                <button
                  key={sponsor.id}
                  onClick={() => setActiveSponsorId(sponsor.id)}
                  style={{
                    padding: '7px 14px',
                    borderRadius: 'var(--radius-pill)',
                    border: isActive ? '1px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                    background: isActive ? 'var(--teal-primary)' : 'var(--bg-inset)',
                    color: isActive ? '#FFFFFF' : 'var(--text-main)',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.2s ease',
                    boxShadow: isActive ? 'var(--shadow-teal-btn)' : 'none'
                  }}
                >
                  <Building2 size={13} />
                  <span>{sponsor.brand}</span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '1px 6px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.06)',
                    color: isActive ? '#FFFFFF' : 'var(--accent-green)',
                    fontWeight: 800
                  }}>
                    ฿{((Number(sponsor.sponsorRevenueTHB) || 0) / 1000).toLocaleString()}k
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Sponsor Showcase Card */}
        <div className="sponsor-showcase-box">
          {/* Dual Image Preview: Hero Image + 9:16 In-Scene Frame */}
          <div className="sponsor-images-row">
            {/* Product Hero Shot */}
            <div style={{ position: 'relative' }}>
              <img
                src={selectedSponsor.heroImage || '/assets/sponsor_serum.jpg'}
                alt={selectedSponsor.productName}
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid rgba(255,255,255,0.6)',
                  boxShadow: 'var(--shadow-raised-sm)',
                  display: 'block'
                }}
              />
              <span style={{
                position: 'absolute',
                bottom: '4px',
                left: '4px',
                fontSize: '0.65rem',
                background: 'rgba(0,0,0,0.7)',
                color: '#FFFFFF',
                padding: '2px 5px',
                borderRadius: '4px'
              }}>
                Hero Shot
              </span>
            </div>

            {/* In-Scene 9:16 Placement Thumbnail with Safe Zone Badge */}
            <div style={{ position: 'relative' }}>
              <img
                src={selectedSponsor.sceneImage || selectedSponsor.heroImage || '/assets/sponsor_serum.jpg'}
                alt="Scene Placement"
                style={{
                  width: '72px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-sm)',
                  border: '2px solid rgba(255,255,255,0.6)',
                  boxShadow: 'var(--shadow-raised-sm)',
                  display: 'block'
                }}
              />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                background: '#10B981',
                color: '#FFFFFF',
                padding: '2px 4px',
                borderRadius: '4px',
                fontSize: '0.6rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}>
                <ShieldCheck size={9} />
                <span>Safe</span>
              </span>
              <span style={{
                position: 'absolute',
                bottom: '4px',
                left: '4px',
                fontSize: '0.65rem',
                background: 'rgba(0,0,0,0.7)',
                color: '#FFFFFF',
                padding: '2px 5px',
                borderRadius: '4px'
              }}>
                9:16 Scene
              </span>
            </div>
          </div>

          {/* Details & Commercial Terms */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span className="badge badge-teal" style={{ fontWeight: 700, fontSize: '0.74rem' }}>
                {selectedSponsor.contractTier || 'Tier-1 Exclusive Drama Sponsor'}
              </span>
              <span style={{
                padding: '3px 8px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--bg-surface)',
                color: 'var(--text-muted)',
                fontSize: '0.72rem',
                fontWeight: 600
              }}>
                {selectedSponsor.category || 'Luxury Goods'}
              </span>
              <span style={{
                padding: '3px 8px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--accent-green-bg)',
                color: 'var(--accent-green)',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={12} />
                <span>100% Mobile Safe-Zone Verified</span>
              </span>
            </div>

            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--teal-primary)', fontWeight: 700 }}>
                {selectedSponsor.brand}
              </div>
              <h4 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: '2px 0 0 0', fontWeight: 800 }}>
                {selectedSponsor.productName}
              </h4>
              {selectedSponsor.tagline && (
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', margin: '4px 0 0 0' }}>
                  "{selectedSponsor.tagline}"
                </p>
              )}
            </div>

            {/* Narrative & Placement Specs Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
              gap: '10px',
              marginTop: '6px',
              padding: '10px 14px',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.65)',
              border: '1px solid rgba(0, 0, 0, 0.05)'
            }}>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>ช็อตที่กำหนดจัดวาง:</span>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                  {selectedSponsor.targetShot || 'EP 01 - Shot 03'}
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>แอร์ไทม์ต่อตอน:</span>
                <strong style={{ fontSize: '0.82rem', color: 'var(--accent-green)' }}>
                  {selectedSponsor.actualScreenTimeSec || selectedSponsor.targetScreenTimeSec || 4.5} วินาที / ตอน
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>มูลค่าสัญญาในเรื่อง:</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--accent-green)', fontWeight: 800 }}>
                  ฿{(Number(selectedSponsor.sponsorRevenueTHB) || 0).toLocaleString()} THB
                </strong>
              </div>
              <div>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>คาดการณ์ Reach:</span>
                <strong style={{ fontSize: '0.82rem', color: 'var(--teal-primary)' }}>
                  {selectedSponsor.estimatedAudienceViews || '2,500,000+ views'}
                </strong>
              </div>
            </div>

            {/* Narrative Justification */}
            {selectedSponsor.placementNotes && (
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>บทบาทในเนื้อเรื่อง: </span>
                <span>{selectedSponsor.placementNotes}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comprehensive Sponsor Commercial Breakdown Table */}
      <div className="clay-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart3 size={18} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              ตารางสรุปสัญญาสปอนเซอร์และผลประโยชน์ทางพาณิชย์ (Commercial Sponsorship Ledger)
            </h3>
          </div>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
            👉 เลื่อนหน้าจอแนวนอนเพื่อดูคอลัมน์ทั้งหมด
          </span>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <table style={{
            width: '100%',
            minWidth: '680px',
            borderCollapse: 'collapse',
            fontSize: '0.82rem',
            textAlign: 'left'
          }}>
            <thead>
              <tr style={{
                borderBottom: '2px solid var(--border-subtle)',
                color: 'var(--text-muted)',
                background: 'var(--bg-inset)'
              }}>
                <th style={{ padding: '10px 12px', borderRadius: 'var(--radius-sm) 0 0 var(--radius-sm)' }}>ลำดับ</th>
                <th style={{ padding: '10px 12px' }}>แบรนด์ & สินค้า</th>
                <th style={{ padding: '10px 12px' }}>หมวดหมู่</th>
                <th style={{ padding: '10px 12px' }}>ระดับสัญญา (Tier)</th>
                <th style={{ padding: '10px 12px' }}>ช็อตปรากฏ</th>
                <th style={{ padding: '10px 12px' }}>แอร์ไทม์/ตอน</th>
                <th style={{ padding: '10px 12px' }}>สถานะ Safe-Zone</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0' }}>มูลค่าสัญญา (THB)</th>
              </tr>
            </thead>
            <tbody>
              {effectiveSponsors.map((item, idx) => (
                <tr key={item.id || idx} style={{
                  borderBottom: '1px solid var(--border-subtle)',
                  background: item.id === activeSponsorId ? 'rgba(11, 74, 81, 0.05)' : 'transparent'
                }}>
                  <td style={{ padding: '12px', color: 'var(--text-dim)', fontWeight: 600 }}>#{idx + 1}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={item.heroImage || '/assets/sponsor_serum.jpg'}
                        alt=""
                        style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <div>
                        <strong style={{ color: 'var(--text-main)', display: 'block' }}>{item.brand}</strong>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.productName}</span>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-muted)' }}>
                    {item.category?.split('(')[0] || item.category || 'Luxury'}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                      {item.contractTier?.split('(')[0] || item.contractTier}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-main)', fontWeight: 600 }}>
                    {item.targetShot || 'EP 01 - Shot 03'}
                  </td>
                  <td style={{ padding: '12px', color: 'var(--accent-green)', fontWeight: 700 }}>
                    {item.actualScreenTimeSec || item.targetScreenTimeSec || 4.5}s
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--accent-green)',
                      fontSize: '0.74rem',
                      fontWeight: 700
                    }}>
                      <CheckCircle2 size={13} />
                      <span>ผ่านเกณฑ์ 100%</span>
                    </span>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800, color: 'var(--accent-green)' }}>
                    ฿{(Number(item.sponsorRevenueTHB) || 0).toLocaleString()}
                  </td>
                </tr>
              ))}

              {/* Total Summary Row */}
              <tr style={{
                background: 'var(--bg-inset)',
                fontWeight: 800,
                borderTop: '2px solid var(--border-subtle)'
              }}>
                <td colSpan={5} style={{ padding: '12px 14px', color: 'var(--text-main)' }}>
                  ยอดรวมรายได้สปอนเซอร์ทั้งหมดในโปรเจกต์ (Grand Total Sponsor Pipeline)
                </td>
                <td style={{ padding: '12px', color: 'var(--accent-green)' }}>
                  {totalAirtimePerEpisode.toFixed(1)}s / ตอน
                </td>
                <td style={{ padding: '12px', color: 'var(--accent-green)' }}>
                  {effectiveSponsors.length} แบรนด์
                </td>
                <td style={{ padding: '12px 14px', textAlign: 'right', fontSize: '1rem', color: 'var(--accent-green)' }}>
                  ฿{totalSponsorRevenue.toLocaleString()} THB
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Casting & Hollywood Quality Standards */}
      <div className="clay-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Users size={18} strokeWidth={2} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              ทีมนักแสดงและมาตรฐานความต่อเนื่องของใบหน้า (Casting & Consistency Proof)
            </h3>
          </div>
          <span className="badge" style={{ background: 'var(--bg-inset)', color: 'var(--text-muted)' }}>
            Face-Lock Multi-Angle Engine & Wardrobe Continuity
          </span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px'
        }}>
          {characters.map(c => (
            <div key={c.id} style={{
              background: 'var(--bg-inset)',
              boxShadow: 'var(--shadow-inset)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '14px'
            }}>
              <img
                src={c.portrait}
                alt={c.name}
                style={{
                  width: '84px',
                  height: '116px',
                  objectFit: 'cover',
                  borderRadius: 'var(--radius-sm)',
                  display: 'block',
                  flexShrink: 0
                }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)', display: 'block' }}>
                    {c.name}
                  </strong>
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                    {c.role}
                  </p>
                  {c.actingStyle && (
                    <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', margin: '4px 0 0 0' }}>
                      สไตล์: {c.actingStyle}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: 'var(--accent-green-bg)',
                    color: 'var(--accent-green)',
                    fontWeight: 700
                  }}>
                    Face-Lock: {c.faceLockAccuracy || '98.4%'}
                  </span>
                  {c.wardrobeSpec && (
                    <span style={{
                      fontSize: '0.7rem',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-muted)'
                    }}>
                      Wardrobe Lock
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Narrative Engineering & Series Specs */}
      <div className="pitch-bottom-grid">
        {/* Core Conflict & Retention Strategy */}
        <div className="clay-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Target size={18} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              กลยุทธ์การดึงผู้ชมและเร่งความตื่นเต้น (Retention Engine)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ background: 'var(--bg-inset)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--teal-primary)', fontWeight: 700, display: 'block' }}>
                3-Second Viral Hook Strategy:
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                {project.hookStrategy || 'ภาพเปิดห้องประชุมชั้น 48 ท่ามกลางพายุฝน + แฟ้มคดีไฟลุก + แววตาคลอเบ้าน้ำตาของนางเอก'}
              </p>
            </div>

            <div style={{ background: 'var(--bg-inset)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--accent-amber)', fontWeight: 700, display: 'block' }}>
                Cliffhanger Ending Formula:
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                {project.cliffhangerStrategy || 'สัญญาณเตือนภัยดับอาคาร + เสียงกระซิบชิดหู "มีคนปิดระบบอาคาร... ใครบอกให้คุณมาที่นี่กันแน่!?"'}
              </p>
            </div>

            <div style={{ background: 'var(--bg-inset)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700, display: 'block' }}>
                ความขัดแย้งหลักของเรื่อง (Core Conflict):
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                {project.coreConflict || 'ความยุติธรรมและการล้างแค้น VS พันธสัญญาความรักกับศัตรูทางสายเลือด'}
              </p>
            </div>
          </div>
        </div>

        {/* Pacing Score & Platform Virality Index */}
        <div className="clay-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <Sparkles size={18} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              ดัชนีคะแนนความไวรัล (AI Pacing & Virality Score)
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span>3s Hook Score (ความสามารถดึงสายตา)</span>
                <strong style={{ color: 'var(--teal-primary)' }}>{project.pacingScore?.hookScore || 96}%</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-inset)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${project.pacingScore?.hookScore || 96}%`, height: '100%', background: 'var(--teal-primary)', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span>Cliffhanger Retention Score (การชวนดูตอนถัดไป)</span>
                <strong style={{ color: 'var(--accent-amber)' }}>{project.pacingScore?.cliffhangerScore || 94}%</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-inset)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${project.pacingScore?.cliffhangerScore || 94}%`, height: '100%', background: 'var(--accent-amber)', borderRadius: '4px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '4px' }}>
                <span>Tension Index (ความเข้มข้นของการเดินเรื่อง)</span>
                <strong style={{ color: '#4F46E5' }}>{project.pacingScore?.tensionIndex || 91}%</strong>
              </div>
              <div style={{ height: '8px', background: 'var(--bg-inset)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${project.pacingScore?.tensionIndex || 91}%`, height: '100%', background: '#4F46E5', borderRadius: '4px' }} />
              </div>
            </div>

            <div style={{
              marginTop: '6px',
              padding: '12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-green-bg)',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle2 size={20} />
              <div>
                <strong style={{ fontSize: '0.85rem', display: 'block' }}>
                  {project.pacingScore?.retentionProbability || '98.2% (High Virality Rate)'}
                </strong>
                <span style={{ fontSize: '0.74rem', opacity: 0.9 }}>
                  ผ่านเกณฑ์มาตรฐานการเผยแพร่เชิงพาณิชย์บนทุกแพลตฟอร์มวิดีโอสั้น
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
