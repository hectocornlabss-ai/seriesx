import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Film, Sparkles, Activity, Layers, Play, Check } from 'lucide-react';

export default function RenderSimulationModal({ isOpen, onClose, activeShot, activeChar, onRenderComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    { id: 1, title: 'FACS & Biological Emotion Extraction', desc: 'ตรวจจับ AU1+AU4, อัตราการกะพริบตา และคลื่นการหายใจ' },
    { id: 2, title: '9:16 Camera Path & Depth-of-Field Synthesis', desc: 'คำนวณ Z-Axis Slow Push-In และ โบเก้ f/1.4' },
    { id: 3, title: 'ElevenLabs Voice Lip-Sync & Prosody Alignment', desc: 'ซิงค์ริมฝีปากกับคลื่นเสียงพากย์ 48kHz' },
    { id: 4, title: '4K UHD Neural Rendering & Color Grading', desc: 'สังเคราะห์ภาพ 1080x1920 ด้วย Kling / Gen-3 Pipeline' }
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      setProgress(0);
      setLogs([]);
      setIsCompleted(false);
      return;
    }

    setIsCompleted(false);
    setProgress(5);
    setCurrentStep(0);
    setLogs([`[00:00.01] 🎬 เริ่มต้นกระบวนการเรนเดอร์ Shot ${activeShot?.number || '01'}: ${activeShot?.name || 'Hook'}`]);

    const timer1 = setTimeout(() => {
      setCurrentStep(0);
      setProgress(25);
      setLogs(prev => [...prev, `[00:00.45] 🧬 สกัดรหัสใบหน้า FACS: ${activeShot?.actorDirecting?.facsCode || 'AU1+AU4'} สำเร็จ`]);
    }, 600);

    const timer2 = setTimeout(() => {
      setCurrentStep(1);
      setProgress(50);
      setLogs(prev => [...prev, `[00:01.10] 🎥 คำนวณเลนส์กล้อง: ${activeShot?.cameraDirector?.lens || '85mm f/1.4'} พร้อมองศาเอียง ${activeShot?.cameraDirector?.tiltAngle || 'Level'}`]);
    }, 1400);

    const timer3 = setTimeout(() => {
      setCurrentStep(2);
      setProgress(75);
      setLogs(prev => [...prev, `[00:01.85] 🎙️ ซิงค์คลื่นเสียง ElevenLabs กับจังหวะขยับริมฝีปาก (Lip-Sync Lock 99.4%)`]);
    }, 2300);

    const timer4 = setTimeout(() => {
      setCurrentStep(3);
      setProgress(100);
      setLogs(prev => [
        ...prev,
        `[00:02.70] ✨ การเรนเดอร์เฟรม 9:16 UHD สมบูรณ์แบบ (Bitrate: 45Mbps, Colorspace: Rec.709)`,
        `[00:02.80] 🏆 ผลลัพธ์พร้อมใช้งานในไพพ์ไลน์การผลิตแล้ว`
      ]);
      setIsCompleted(true);
      if (onRenderComplete) onRenderComplete();
    }, 3200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isOpen, activeShot]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 25, 26, 0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="clay-card" style={{
        width: '100%',
        maxWidth: '580px',
        padding: '28px',
        background: 'var(--bg-surface)',
        border: '1.5px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-raised)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #135E67, #0B4A51)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-teal-btn)'
            }}>
              <Film size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                AI Shot Re-Rendering Engine (9:16 UHD)
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '2px 0 0 0' }}>
                Shot {activeShot?.number}: {activeShot?.name?.split(':')[0]} ({activeChar?.name || 'Character'})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Big Progress Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-primary)', marginBottom: '8px' }}>
            <span>{isCompleted ? 'เรนเดอร์เสร็จสมบูรณ์ 100%' : 'กำลังประมวลผลกระบวนการสังเคราะห์...'}</span>
            <span>{progress}%</span>
          </div>
          <div style={{ height: '8px', background: 'var(--bg-inset)', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              width: `${progress}%`,
              height: '100%',
              background: isCompleted ? 'var(--accent-green)' : 'linear-gradient(90deg, #135E67, #1F7A59)',
              transition: 'width 0.4s ease-out'
            }} />
          </div>
        </div>

        {/* 4 Multi-Pass Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {steps.map((st, i) => {
            const isDone = progress >= (i + 1) * 25;
            const isCurrent = currentStep === i && !isCompleted;
            return (
              <div
                key={st.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: isDone ? 'var(--accent-green-bg)' : isCurrent ? 'var(--teal-subtle)' : 'var(--bg-inset)',
                  border: isDone ? '1px solid var(--accent-green)' : isCurrent ? '1px solid var(--teal-border)' : '1px solid var(--border-subtle)',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isDone ? 'var(--accent-green)' : isCurrent ? 'var(--teal-primary)' : 'var(--border-subtle)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}>
                  {isDone ? <Check size={14} /> : st.id}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {st.title}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {st.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terminal Logs */}
        <div style={{
          background: '#0D1415',
          borderRadius: 'var(--radius-md)',
          padding: '12px 14px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.74rem',
          color: '#5EEAD4',
          maxHeight: '110px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}>
          {logs.map((log, index) => (
            <div key={index}>{log}</div>
          ))}
        </div>

        {/* Modal Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={onClose}
            className="btn-secondary"
            style={{ fontSize: '0.84rem' }}
          >
            {isCompleted ? 'ปิดหน้าต่าง' : 'ยกเลิก'}
          </button>
          {isCompleted && (
            <button
              onClick={onClose}
              className="btn-primary"
              style={{
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'linear-gradient(135deg, #135E67, #0B4A51)'
              }}
            >
              <Play size={15} />
              <span>ดูพรีวิวช็อตนี้ในเครื่องเล่น</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
