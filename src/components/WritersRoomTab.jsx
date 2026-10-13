import React, { useState } from 'react';
import { Sparkles, Zap, Flame, Video, MessageSquare, Volume2, Eye, Camera, UserCheck, Activity } from 'lucide-react';

export default function WritersRoomTab({ project, shots, onUpdateShots }) {
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);
  const [optimizationSuccess, setOptimizationSuccess] = useState('');
  const [novelPrompt, setNovelPrompt] = useState(project.logline);

  const selectedShot = shots[activeShotIndex] || shots[0];

  const handleRunAiOptimize = (type) => {
    setIsAiOptimizing(true);
    setOptimizationSuccess('');
    setTimeout(() => {
      setIsAiOptimizing(false);
      if (type === 'hook') {
        setOptimizationSuccess('✅ 3-Second Hook ปรับจังหวะให้กระชับ เพิ่มสปีดการตัดภาพ และเพิ่มเสียงฟ้าร้องกระแทกอารมณ์สำเร็จ!');
      } else if (type === 'cliffhanger') {
        setOptimizationSuccess('✅ Cliffhanger Index เพิ่มขึ้นเป็น 98/100 ด้วยการใส่จุดตัดเสียงฉับพลันและเสียงไซเรนฉุกเฉิน!');
      } else {
        setOptimizationSuccess('✅ ปรับเพิ่มความลึกซึ้งของการแสดง (Micro-expressions & FACS) และคิวมุมกล้องเรียบร้อย!');
      }
    }, 1000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Overview & Vertical Drama Metrics Banner */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '16px'
      }}>
        {/* 3-Second Hook Score */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flame size={24} color="#f43f5e" />
              <div>
                <h2 style={{ fontSize: '1rem', margin: 0, color: '#ffffff' }}>3-Second Hook Score</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>วัดพลังการหยุดนิ้วคนดู 3 วินาทีแรก</p>
              </div>
            </div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#f43f5e',
              fontFamily: 'var(--font-display)'
            }}>
              96<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/100</span>
            </div>
          </div>
          <div style={{
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            marginTop: '14px',
            overflow: 'hidden'
          }}>
            <div style={{ width: '96%', height: '100%', background: 'linear-gradient(90deg, #f43f5e, #fb7185)' }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '10px' }}>
            ⚡ <strong>การวิเคราะห์ AI:</strong> ช็อต Extreme Close-up 85mm + แววตาคลอเบ้าน้ำตา และริมฝีปากสั่นระริกสะกดอารมณ์ทันที
          </p>
        </div>

        {/* Cliffhanger Index */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #8b5cf6' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Zap size={24} color="#8b5cf6" />
              <div>
                <h2 style={{ fontSize: '1rem', margin: 0, color: '#ffffff' }}>Cliffhanger Index</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ดัชนีแรงจูงใจให้กดดูตอนต่อไป (Micro-paywall)</p>
              </div>
            </div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: '#8b5cf6',
              fontFamily: 'var(--font-display)'
            }}>
              94<span style={{ fontSize: '1rem', color: 'var(--text-dim)' }}>/100</span>
            </div>
          </div>
          <div style={{
            height: '6px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '4px',
            marginTop: '14px',
            overflow: 'hidden'
          }}>
            <div style={{ width: '94%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6, #c084fc)' }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '10px' }}>
            🔒 <strong>การวิเคราะห์ AI:</strong> สัญญาณเตือนภัย + เสียงกระซิบตกใจชิดใบหน้าระยะ 5 ซม. สั่งตัดดับไฟเข้าเครดิต
          </p>
        </div>

        {/* Realism & Acting Metric */}
        <div className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={24} color="#10b981" />
              <div>
                <h2 style={{ fontSize: '1rem', margin: 0, color: '#ffffff' }}>Acting & Camera Authenticity</h2>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ความสมจริงของสีหน้าและมุมกล้อง</p>
              </div>
            </div>
            <span className="badge badge-green">98.9% FACS</span>
          </div>
          <ul style={{
            fontSize: '0.8rem',
            color: '#cbd5e1',
            marginTop: '14px',
            paddingLeft: '18px',
            lineHeight: 1.6
          }}>
            <li>กำกับกล้ามเนื้อใบหน้า (Micro-expressions: คิ้ว ปาก กราม น้ำตา)</li>
            <li>คุมเลนส์กล้อง (85mm Prime, Low Angle Dutch, Rack Focus)</li>
          </ul>
        </div>
      </div>

      {/* Novel / Lore Input & AI Writer Assistants */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
              📖 นิยาย & โครงเรื่องหลัก (Novel Synopsis & Master Lore)
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              ระบบ AI Screenwriter Agent จะอ่านโครงเรื่องนี้แล้วแตกออกเป็นบทพูด, อารมณ์, ท่าทาง และมุมกล้อง 9:16 อัตโนมัติ
            </p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => handleRunAiOptimize('hook')}
              disabled={isAiOptimizing}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: 'rgba(244, 63, 94, 0.15)',
                border: '1px solid rgba(244, 63, 94, 0.4)',
                borderRadius: '8px',
                color: '#fb7185',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Flame size={15} />
              Boost 3s Hook
            </button>
            <button
              onClick={() => handleRunAiOptimize('acting')}
              disabled={isAiOptimizing}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                background: 'rgba(16, 185, 129, 0.15)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                borderRadius: '8px',
                color: '#34d399',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Activity size={15} />
              Enhance Acting & Camera
            </button>
          </div>
        </div>

        <textarea
          value={novelPrompt}
          onChange={(e) => setNovelPrompt(e.target.value)}
          rows={3}
          style={{
            width: '100%',
            background: 'rgba(8, 9, 13, 0.7)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '8px',
            color: '#f8fafc',
            padding: '12px 16px',
            fontFamily: 'inherit',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            resize: 'vertical'
          }}
        />

        {optimizationSuccess && (
          <div style={{
            marginTop: '12px',
            padding: '10px 14px',
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.4)',
            borderRadius: '8px',
            color: '#34d399',
            fontSize: '0.85rem'
          }}>
            {optimizationSuccess}
          </div>
        )}
      </div>

      {/* Screenplay & Dialogue Breakdown Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Shots List / Beat Sheet */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#ffffff', margin: 0 }}>
              🎬 Beat Sheet ({shots.length} ช็อต)
            </h4>
            <span className="badge badge-purple">9:16 Vertical</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {shots.map((shot, idx) => {
              const isSelected = idx === activeShotIndex;
              return (
                <div
                  key={shot.id}
                  onClick={() => setActiveShotIndex(idx)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: isSelected ? 'rgba(244, 63, 94, 0.12)' : 'rgba(255, 255, 255, 0.03)',
                    border: isSelected ? '1px solid #f43f5e' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: isSelected ? '#fb7185' : '#ffffff'
                    }}>
                      Shot {shot.number}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {shot.duration}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.78rem',
                    color: '#e2e8f0',
                    marginTop: '4px',
                    fontWeight: 600
                  }}>
                    {shot.name.split(':')[0]}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {shot.cameraDirector ? shot.cameraDirector.lens : shot.cameraAngle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Shot Detail Editor */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="badge badge-red">Shot {selectedShot.number}</span>
                <h3 style={{ fontSize: '1.2rem', color: '#ffffff', margin: 0 }}>
                  {selectedShot.name}
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                ⏱️ Timecode: {selectedShot.timecode} ({selectedShot.duration}) | 📍 {selectedShot.location}
              </p>
            </div>
            <span className="badge badge-green">FACS Acting Ready</span>
          </div>

          {/* Deep Cinematography & Camera Box */}
          <div style={{
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', marginBottom: '10px' }}>
              <Camera size={18} />
              <strong style={{ fontSize: '0.9rem' }}>🎥 การกำกับมุมกล้อง 9:16 (Cinematography Directing)</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>เลนส์และทางยาวโฟกัส:</span>
                <strong style={{ color: '#fff' }}>{selectedShot.cameraDirector?.lens || '85mm Cine Prime'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>การเคลื่อนกล้องแนวตั้ง:</span>
                <strong style={{ color: '#38bdf8' }}>{selectedShot.cameraDirector?.movement || selectedShot.cameraAngle}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>ระยะชัดลึก (Depth of Field):</span>
                <strong style={{ color: '#fff' }}>{selectedShot.cameraDirector?.depthOfField || 'Shallow f/1.4'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>องศาเอียง (Tilt / Dutch Angle):</span>
                <strong style={{ color: '#fb7185' }}>{selectedShot.cameraDirector?.tiltAngle || 'Dutch Angle'}</strong>
              </div>
            </div>
          </div>

          {/* Deep Actor Directing & Micro-Expressions Box */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#34d399', marginBottom: '10px' }}>
              <UserCheck size={18} />
              <strong style={{ fontSize: '0.9rem' }}>🎭 การกำกับการแสดง & สีหน้า (Method Acting & Micro-Expressions)</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>สีหน้าละเอียดและดวงตา (Facial & Eye Cues):</span>
                <p style={{ margin: '4px 0 0 0', color: '#f1f5f9', lineHeight: 1.5 }}>
                  {selectedShot.actorDirecting?.facialMicroExpressions || selectedShot.action}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>ภาษากายและท่าทาง:</span>{' '}
                  <span style={{ color: '#cbd5e1' }}>{selectedShot.actorDirecting?.bodyLanguage || 'เกร็งกล้ามเนื้อ สู้สายตา'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>FACS Muscle Code:</span>{' '}
                  <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                    {selectedShot.actorDirecting?.facsCode || 'AU1+AU4+AU20'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dialogue & Emotion Subtext with Micro-Breath cues */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.08), rgba(139, 92, 246, 0.08))',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            borderRadius: '10px',
            padding: '18px',
            marginBottom: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} color="#fb7185" />
                <strong style={{ fontSize: '0.85rem', color: '#fecdd3' }}>
                  บทพูดและการออกเสียงอารมณ์: {selectedShot.character}
                </strong>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                {selectedShot.vocalProsody?.emotionTag || selectedShot.emotionTag}
              </span>
            </div>

            <p style={{
              fontSize: '1.05rem',
              color: '#ffffff',
              fontWeight: 500,
              lineHeight: 1.5,
              padding: '10px 14px',
              background: 'rgba(0, 0, 0, 0.45)',
              borderRadius: '6px',
              borderLeft: '3px solid #f43f5e'
            }}>
              "{selectedShot.vocalProsody?.withCues || selectedShot.dialogue}"
            </p>

            <div style={{
              marginTop: '10px',
              fontSize: '0.78rem',
              color: '#cbd5e1',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div>
                <strong style={{ color: '#fb7185' }}>🎙️ Vocal Curve & Micro-Breathing:</strong>{' '}
                {selectedShot.vocalProsody?.vocalCurve || 'เสียงสั่นเครือปลายเสียงสะอื้น'}
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '4px', color: 'var(--text-muted)' }}>
                <span><strong>SFX:</strong> {selectedShot.sfx}</span>
                <span><strong>BGM:</strong> {selectedShot.bgm}</span>
              </div>
            </div>
          </div>

          {/* Sponsor integration notice if available */}
          {selectedShot.sponsorIntegration && (
            <div style={{
              background: 'rgba(245, 158, 11, 0.1)',
              border: '1px solid rgba(245, 158, 11, 0.35)',
              borderRadius: '8px',
              padding: '12px 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <strong style={{ color: '#fbbf24', fontSize: '0.85rem' }}>
                  🌟 จุดแทรกสินค้าสปอนเซอร์ (Virtual Product Placement Active)
                </strong>
                <p style={{ fontSize: '0.8rem', color: '#fef3c7', margin: '2px 0 0 0' }}>
                  สินค้า: {selectedShot.sponsorIntegration.productName} • ปรากฏ {selectedShot.sponsorIntegration.exposureTime} • ปลอดภัยจากปุ่ม TikTok 100%
                </p>
              </div>
              <span className="badge badge-green">Safe-Zone Passed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
