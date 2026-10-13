import React, { useState } from 'react';
import { DollarSign, ShieldCheck, Eye, Sparkles, Box, CheckCircle2, AlertCircle, Smartphone, Award, Heart, MessageCircle, Share2 } from 'lucide-react';

export default function ArtSponsorTab({ sponsorProduct }) {
  const [showSafeZoneOverlay, setShowSafeZoneOverlay] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Header and Value Proposition */}
      <div className="clay-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={20} strokeWidth={2} color="var(--teal-primary)" />
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                Virtual Product Placement Hub (ระบบแทรกสินค้าสปอนเซอร์อัจฉริยะ)
              </h2>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '6px' }}>
              ระบบ AI แทรกสินค้าสปอนเซอร์เข้ากับบทและฉากอย่างแนบเนียน พร้อมตรวจจับ Safe Zone ไม่ให้ไอคอนแอปบังสินค้า 100%
            </p>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>รายได้จากสปอนเซอร์ตอนที่ 1:</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--teal-primary)', fontFamily: 'var(--font-display)' }}>
                ฿{sponsorProduct.sponsorRevenueTHB.toLocaleString()} THB
              </div>
            </div>
            <span className="badge badge-teal">{sponsorProduct.contractTier}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Sponsor Asset Detail + Placement Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
        {/* Left Column: Sponsor Asset Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="clay-card" style={{ padding: '20px' }}>
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '16px',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              boxShadow: 'var(--shadow-raised-sm)'
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
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                color: 'var(--teal-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Award size={13} strokeWidth={2} />
                <span>Official Partner</span>
              </div>
            </div>

            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              {sponsorProduct.productName}
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              แบรนด์: <strong>{sponsorProduct.brand}</strong> | หมวด: {sponsorProduct.category}
            </p>
            <p style={{ fontSize: '0.85rem', color: 'var(--teal-primary)', marginTop: '8px', fontStyle: 'italic', fontWeight: 500 }}>
              "{sponsorProduct.tagline}"
            </p>

            <div style={{
              marginTop: '16px',
              background: 'var(--bg-inset)',
              boxShadow: 'var(--shadow-inset)',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>เป้าหมายเวลาแอร์ไทม์:</span>
                <strong style={{ color: 'var(--text-main)' }}>{sponsorProduct.targetScreenTimeSec}s</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>เวลาแอร์ไทม์จริงใน Shot 03:</span>
                <strong style={{ color: 'var(--accent-green)' }}>{sponsorProduct.actualScreenTimeSec}s (+0.3s)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>คาดการณ์ยอดคนดู (Reach):</span>
                <strong style={{ color: 'var(--teal-primary)' }}>{sponsorProduct.estimatedAudienceViews}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Safe-Zone Live Simulator & Scene Placement */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Safe-Zone Interactive Viewer */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Smartphone size={18} strokeWidth={2} color="var(--teal-primary)" />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    9:16 Vertical Safe-Zone Validator (การจำลองเลเยอร์โซเชียลมีเดีย)
                  </h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ตรวจสอบว่าตำแหน่งสินค้าสปอนเซอร์และหน้าตัวละคร ไม่โดนปุ่ม Like, คอมเมนต์, หรือคำบรรยายบัง
                </p>
              </div>
              <button
                onClick={() => setShowSafeZoneOverlay(!showSafeZoneOverlay)}
                className="btn-secondary"
              >
                <Smartphone size={14} strokeWidth={2} />
                <span>{showSafeZoneOverlay ? 'ซ่อน Overlay โซเชียล' : 'แสดง TikTok Overlay'}</span>
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
                boxShadow: 'var(--shadow-raised)',
                border: '4px solid var(--border-subtle)',
                background: '#000000'
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
                  border: '2px dashed var(--accent-green)',
                  borderRadius: '12px',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  padding: '6px'
                }}>
                  <span style={{
                    fontSize: '0.65rem',
                    color: 'var(--accent-green)',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '2px 6px',
                    borderRadius: '4px',
                    fontWeight: 700
                  }}>
                    Safe Zone 100%
                  </span>
                </div>

                {/* Simulated Social Overlay with SVG Icons (NO EMOJIS) */}
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
                      color: 'rgba(255,255,255,0.9)',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      <span>กำลังติดตาม</span>
                      <span style={{ color: '#FFFFFF', borderBottom: '2px solid #FFFFFF' }}>สำหรับคุณ</span>
                    </div>

                    {/* Right Side Social Action SVG Icons */}
                    <div style={{
                      alignSelf: 'flex-end',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      alignItems: 'center',
                      color: '#ffffff'
                    }}>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Heart size={16} strokeWidth={2} fill="#ffffff" color="#ffffff" />
                        </div>
                        <div style={{ fontSize: '0.62rem', marginTop: '2px', fontWeight: 600 }}>142K</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <MessageCircle size={16} strokeWidth={2} color="#ffffff" />
                        </div>
                        <div style={{ fontSize: '0.62rem', marginTop: '2px', fontWeight: 600 }}>3,890</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Share2 size={16} strokeWidth={2} color="#ffffff" />
                        </div>
                        <div style={{ fontSize: '0.62rem', marginTop: '2px', fontWeight: 600 }}>18K</div>
                      </div>
                    </div>

                    {/* Bottom Caption Safe Zone */}
                    <div style={{ color: '#fff', fontSize: '0.7rem', background: 'rgba(0,0,0,0.55)', padding: '6px 8px', borderRadius: '6px' }}>
                      <strong style={{ color: '#FFFFFF' }}>@SeriesX_Studio</strong>
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
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-green-bg)',
                  border: '1px solid rgba(31, 122, 89, 0.3)',
                  marginBottom: '14px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.9rem' }}>
                    <ShieldCheck size={18} strokeWidth={2} />
                    <span>ตำแหน่งปลอดภัย ไม่โดนไอคอนบัง (Safe Zone Verified)</span>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '6px', lineHeight: 1.5 }}>
                    ขวดเซรั่มตั้งอยู่ในแนวแกนกึ่งกลาง (Center Pivot) เว้นระยะห่างจากขอบขวา 65px และขอบล่าง 90px ปลอดภัยจากแผงปุ่ม Like/Share ของ TikTok 100%
                  </p>
                </div>

                <div style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-inset)',
                  boxShadow: 'var(--shadow-inset)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  color: 'var(--text-main)',
                  lineHeight: 1.6
                }}>
                  <strong style={{ color: 'var(--teal-primary)' }}>บทบาทในเนื้อเรื่อง (Narrative Justification):</strong>
                  <p style={{ margin: '6px 0 0 0', color: 'var(--text-muted)' }}>{sponsorProduct.placementNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
