import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Eye, Sparkles, Box, CheckCircle2, AlertCircle, Smartphone } from 'lucide-react';

export default function ArtSponsorTab({ sponsorProduct }) {
  const [showSafeZoneOverlay, setShowSafeZoneOverlay] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Header and Value Proposition */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12), rgba(139, 92, 246, 0.08))',
        border: '1px solid rgba(245, 158, 11, 0.35)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={20} color="#fbbf24" />
              <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
                Virtual Product Placement Hub (ระบบแทรกสินค้าสปอนเซอร์อัจฉริยะ)
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#fef3c7', marginTop: '6px' }}>
              ระบบ AI แทรกสินค้าสปอนเซอร์เข้ากับบทและฉากอย่างแนบเนียน พร้อมตรวจจับ Safe Zone ไม่ให้ไอคอนแอปบังสินค้า 100%
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>รายได้จากสปอนเซอร์ตอนที่ 1:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
                ฿{sponsorProduct.sponsorRevenueTHB.toLocaleString()} THB
              </div>
            </div>
            <span className="badge badge-amber">{sponsorProduct.contractTier}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sponsor Asset Detail + Placement Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
        {/* Left Column: Sponsor Asset Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '16px',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              position: 'relative'
            }}>
              <img
                src={sponsorProduct.heroImage}
                alt={sponsorProduct.productName}
                style={{ width: '100%', height: '360px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0,0,0,0.8)',
                padding: '4px 10px',
                borderRadius: '20px',
                color: '#fbbf24',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid rgba(245, 158, 11, 0.5)'
              }}>
                🌟 Official Drama Partner
              </div>
            </div>

            <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
              {sponsorProduct.productName}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              แบรนด์: <strong>{sponsorProduct.brand}</strong> | หมวด: {sponsorProduct.category}
            </p>
            <p style={{ fontSize: '0.85rem', color: '#fbbf24', marginTop: '8px', fontStyle: 'italic' }}>
              "{sponsorProduct.tagline}"
            </p>

            <div style={{
              marginTop: '16px',
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '8px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>เป้าหมายเวลาแอร์ไทม์:</span>
                <strong style={{ color: '#fff' }}>{sponsorProduct.targetScreenTimeSec}s</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>เวลาแอร์ไทม์จริงใน Shot 03:</span>
                <strong style={{ color: '#34d399' }}>{sponsorProduct.actualScreenTimeSec}s (+0.3s)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>คาดการณ์ยอดคนดู (Reach):</span>
                <strong style={{ color: '#60a5fa' }}>{sponsorProduct.estimatedAudienceViews}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Safe-Zone Live Simulator & Scene Placement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Safe-Zone Interactive Viewer */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  📱 9:16 Vertical Safe-Zone Validator (การจำลองเลเยอร์ TikTok / Reels)
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ตรวจสอบว่าตำแหน่งสินค้าสปอนเซอร์และหน้าตัวละคร ไม่โดนปุ่ม Like, คอมเมนต์, หรือคำบรรยายบัง
                </p>
              </div>
              <button
                onClick={() => setShowSafeZoneOverlay(!showSafeZoneOverlay)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  background: showSafeZoneOverlay ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                  border: showSafeZoneOverlay ? '1px solid #f43f5e' : '1px solid var(--border-subtle)',
                  color: showSafeZoneOverlay ? '#fb7185' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: 600
                }}
              >
                <Smartphone size={14} />
                {showSafeZoneOverlay ? 'ซ่อน Overlay โซเชียล' : 'แสดง TikTok Overlay'}
              </button>
            </div>

            {/* Mobile Viewport Simulation Container */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div style={{
                position: 'relative',
                width: '260px',
                height: '460px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.8)',
                border: '4px solid #1e2230',
                background: '#000'
              }}>
                <img
                  src="/assets/sponsor_serum.jpg"
                  alt="Product Placement Scene"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {/* Safe Zone Boundary Box (Green dashed line) */}
                <div style={{
                  position: 'absolute',
                  top: '60px',
                  left: '16px',
                  right: '65px',
                  bottom: '90px',
                  border: '2px dashed rgba(16, 185, 129, 0.7)',
                  borderRadius: '12px',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '6px'
                }}>
                  <span style={{
                    fontSize: '0.65rem',
                    color: '#34d399',
                    background: 'rgba(0,0,0,0.7)',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}>
                    Safe Zone 100%
                  </span>
                </div>

                {/* Simulated Social Overlay */}
                {showSafeZoneOverlay && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    pointerEvents: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: '16px 12px'
                  }}>
                    {/* Top Bar */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '16px',
                      color: 'rgba(255,255,255,0.8)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      <span>กำลังติดตาม</span>
                      <span style={{ color: '#fff', borderBottom: '2px solid #fff' }}>สำหรับคุณ</span>
                    </div>

                    {/* Right Side Social Action Icons */}
                    <div style={{
                      alignSelf: 'flex-end',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                      color: '#ffffff'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>❤️</div>
                        <div style={{ fontSize: '0.6rem', marginTop: '2px' }}>142K</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>💬</div>
                        <div style={{ fontSize: '0.6rem', marginTop: '2px' }}>3,890</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem' }}>↗️</div>
                        <div style={{ fontSize: '0.6rem', marginTop: '2px' }}>18K</div>
                      </div>
                    </div>

                    {/* Bottom Caption Safe Zone */}
                    <div style={{ color: '#fff', fontSize: '0.7rem', background: 'rgba(0,0,0,0.4)', padding: '6px 8px', borderRadius: '6px' }}>
                      <strong style={{ color: '#fb7185' }}>@SeriesX_Studio</strong>
                      <div style={{ marginTop: '2px', opacity: 0.9 }}>
                        EP 01: ความลับที่ไม่เคยเปิดเผย... #เงารัตติกาล #ซีรีส์สั้น
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Status explanation */}
              <div style={{ flex: 1, minWidth: '280px' }}>
                <div style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', fontWeight: 700, fontSize: '0.9rem' }}>
                    <ShieldCheck size={18} />
                    ตำแหน่งปลอดภัย ไม่โดนไอคอนบัง (Safe Zone Verified)
                  </div>
                  <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '6px', lineHeight: 1.5 }}>
                    ขวดเซรั่มตั้งอยู่ในแนวแกนกึ่งกลาง (Center Pivot) เว้นระยะห่างจากขอบขวา 65px และขอบล่าง 90px ปลอดภัยจากแผงปุ่ม Like/Share ของ TikTok 100%
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  color: '#cbd5e1',
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: '#fff' }}>บทบาทในเนื้อเรื่อง (Narrative Justification):</strong>
                  <p style={{ margin: '6px 0 0 0' }}>{sponsorProduct.placementNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
