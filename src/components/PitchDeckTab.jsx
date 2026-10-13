import React, { useState } from 'react';
import { Sparkles, Download, CheckCircle, Share2, DollarSign, TrendingUp, Layers, Video } from 'lucide-react';

export default function PitchDeckTab({ project, characters, sponsorProduct, shots }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadDeck = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('📄 ดาวน์โหลดเอกสาร Pitch Deck (Master Commercial Package) สำเร็จ!');
    }, 1200);
  };

  const handleShareLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Pitch Deck Header */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.15), rgba(139, 92, 246, 0.15))',
        border: '1px solid rgba(244, 63, 94, 0.4)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-red" style={{ marginBottom: '8px' }}>Executive Pitch Deck</span>
            <h2 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0, fontFamily: 'var(--font-display)' }}>
              {project.title} — Commercial Series Proposal
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#cbd5e1', marginTop: '6px', maxWidth: '750px', lineHeight: 1.5 }}>
              เอกสารนำเสนอโครงการผลิตซีรีส์สั้นแนวตั้ง (60 ตอน) เกรดพรีเมียม สำหรับแพลตฟอร์มสตรีมมิ่งและผู้สนับสนุนแบรนด์สินค้า
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleShareLink}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 18px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <Share2 size={16} />
              {copied ? 'คัดลอกลิงก์แล้ว!' : 'แชร์ Pitch Link'}
            </button>
            <button
              onClick={handleDownloadDeck}
              disabled={downloading}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)',
                color: '#ffffff',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: '0 0 20px rgba(244, 63, 94, 0.35)'
              }}
            >
              <Download size={16} />
              {downloading ? 'กำลังสร้างเอกสาร...' : 'ดาวน์โหลด Pitch Deck (PDF)'}
            </button>
          </div>
        </div>
      </div>

      {/* Commercial Highlights & ROI Projection */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '16px'
      }}>
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f43f5e', marginBottom: '8px' }}>
            <TrendingUp size={20} />
            <strong style={{ fontSize: '0.85rem' }}>คาดการณ์ยอดชม (Projected Reach)</strong>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
            25,000,000+
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            ยอดวิวรวม 60 ตอน บนเครือข่าย TikTok / Reels / DramaBox
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '8px' }}>
            <DollarSign size={20} />
            <strong style={{ fontSize: '0.85rem' }}>มูลค่าสปอนเซอร์รวม (Total Sponsor Pipeline)</strong>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
            ฿4,500,000+
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            รายได้จากสปอนเซอร์หลัก + ค่าสิทธิฉาย Exclusive
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8b5cf6', marginBottom: '8px' }}>
            <Layers size={20} />
            <strong style={{ fontSize: '0.85rem' }}>AI Production Speed</strong>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-display)' }}>
            5x เร็วกว่าเดิม
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            ลดต้นทุนการเช่ากองถ่ายจริงกว่า 70% ควบคุมคุณภาพได้ 100%
          </p>
        </div>
      </div>

      {/* Deck Sections: Character Casting + Virtual Product Placement Pitch */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Character Casting & Quality Proof */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: '0 0 16px 0' }}>
            🎭 ทีมนักแสดงและมาตรฐานความต่อเนื่อง (Casting & Consistency)
          </h3>
          <div style={{ display: 'flex', gap: '16px' }}>
            {characters.map(c => (
              <div key={c.id} style={{ flex: 1, background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '12px', border: '1px solid var(--border-subtle)' }}>
                <img
                  src={c.portrait}
                  alt={c.name}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', display: 'block', marginBottom: '8px' }}
                />
                <strong style={{ fontSize: '0.85rem', color: '#fff', display: 'block' }}>{c.name.split('/')[0]}</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{c.role.split('-')[0]}</p>
                <div style={{ marginTop: '6px', fontSize: '0.72rem', color: '#34d399' }}>Face-Lock: {c.faceLockAccuracy}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Placement Case Study */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: '0 0 16px 0' }}>
            💎 แผนการสปอนเซอร์ (Featured Sponsor Partner)
          </h3>
          <div style={{ display: 'flex', gap: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '16px', border: '1px solid var(--border-subtle)' }}>
            <img
              src={sponsorProduct.heroImage}
              alt="Sponsor"
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', display: 'block' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge badge-amber" style={{ width: 'fit-content', marginBottom: '6px' }}>
                {sponsorProduct.contractTier}
              </span>
              <strong style={{ fontSize: '1rem', color: '#fff' }}>{sponsorProduct.productName}</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                ระยะเวลาแอร์ไทม์ต่อตอน: <strong style={{ color: '#34d399' }}>{sponsorProduct.actualScreenTimeSec} วินาที</strong> (ผ่านเกณฑ์ Safe-Zone 100%)
              </p>
              <div style={{ marginTop: '8px', fontSize: '0.78rem', color: '#60a5fa' }}>
                ประมาณการการมองเห็น: {sponsorProduct.estimatedAudienceViews}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
