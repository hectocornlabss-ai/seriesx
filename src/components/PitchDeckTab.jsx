import React, { useState } from 'react';
import { Sparkles, Download, CheckCircle, Share2, DollarSign, TrendingUp, Layers, Users, Award, FileText } from 'lucide-react';

export default function PitchDeckTab({ project, characters, sponsorProduct, shots }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadDeck = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert('ดาวน์โหลดเอกสาร Pitch Deck (Master Commercial Package) สำเร็จ');
    }, 1000);
  };

  const handleShareLink = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Pitch Deck Header */}
      <div className="clay-card" style={{ padding: '28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="badge badge-teal" style={{ marginBottom: '8px' }}>Executive Pitch Deck</span>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
              {project.title} — Commercial Series Proposal
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '6px', maxWidth: '750px', lineHeight: 1.5 }}>
              เอกสารนำเสนอโครงการผลิตซีรีส์สั้นแนวตั้ง (60 ตอน) เกรดพรีเมียม สำหรับแพลตฟอร์มสตรีมมิ่งและผู้สนับสนุนแบรนด์สินค้า
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleShareLink}
              className="btn-secondary"
            >
              <Share2 size={16} strokeWidth={2} />
              <span>{copied ? 'คัดลอกลิงก์แล้ว' : 'แชร์ Pitch Link'}</span>
            </button>
            <button
              onClick={handleDownloadDeck}
              disabled={downloading}
              className="btn-primary"
            >
              <Download size={16} strokeWidth={2} />
              <span>{downloading ? 'กำลังสร้างเอกสาร...' : 'ดาวน์โหลด Pitch Deck (PDF)'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Commercial Highlights & ROI Projection */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '18px'
      }}>
        <div className="clay-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', marginBottom: '8px' }}>
            <TrendingUp size={20} strokeWidth={2} />
            <strong style={{ fontSize: '0.85rem' }}>คาดการณ์ยอดชม (Projected Reach)</strong>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
            25,000,000+
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            ยอดวิวรวม 60 ตอน บนเครือข่าย TikTok / Reels / DramaBox
          </p>
        </div>

        <div className="clay-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', marginBottom: '8px' }}>
            <DollarSign size={20} strokeWidth={2} />
            <strong style={{ fontSize: '0.85rem' }}>มูลค่าสปอนเซอร์รวม (Total Sponsor Pipeline)</strong>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-display)' }}>
            ฿4,500,000+
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            รายได้จากสปอนเซอร์หลัก + ค่าสิทธิฉาย Exclusive
          </p>
        </div>

        <div className="clay-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', marginBottom: '8px' }}>
            <Layers size={20} strokeWidth={2} />
            <strong style={{ fontSize: '0.85rem' }}>AI Production Speed</strong>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--teal-primary)', fontFamily: 'var(--font-display)' }}>
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
        <div className="clay-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Users size={18} strokeWidth={2} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              ทีมนักแสดงและมาตรฐานความต่อเนื่อง (Casting & Consistency)
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            {characters.map(c => (
              <div key={c.id} style={{
                flex: 1,
                background: 'var(--bg-inset)',
                boxShadow: 'var(--shadow-inset)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                border: '1px solid var(--border-subtle)'
              }}>
                <img
                  src={c.portrait}
                  alt={c.name}
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', display: 'block', marginBottom: '8px' }}
                />
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block' }}>{c.name.split('/')[0]}</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>{c.role.split('-')[0]}</p>
                <div style={{ marginTop: '6px', fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 600 }}>Face-Lock: {c.faceLockAccuracy}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsor Placement Case Study */}
        <div className="clay-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Award size={18} strokeWidth={2} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              แผนการสปอนเซอร์ (Featured Sponsor Partner)
            </h3>
          </div>
          <div style={{
            display: 'flex',
            gap: '16px',
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            border: '1px solid var(--border-subtle)'
          }}>
            <img
              src={sponsorProduct.heroImage}
              alt="Sponsor"
              style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', display: 'block' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="badge badge-teal" style={{ width: 'fit-content', marginBottom: '6px' }}>
                {sponsorProduct.contractTier}
              </span>
              <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{sponsorProduct.productName}</strong>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                ระยะเวลาแอร์ไทม์ต่อตอน: <strong style={{ color: 'var(--accent-green)' }}>{sponsorProduct.actualScreenTimeSec} วินาที</strong> (ผ่านเกณฑ์ Safe-Zone 100%)
              </p>
              <div style={{ marginTop: '8px', fontSize: '0.78rem', color: 'var(--teal-primary)', fontWeight: 600 }}>
                ประมาณการการมองเห็น: {sponsorProduct.estimatedAudienceViews}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
