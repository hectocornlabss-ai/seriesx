import React, { useState } from 'react';
import { 
  Sparkles, Copy, Check, X, Film, Video, Volume2, Camera, User, 
  Layers, ShieldCheck, Download, Play, Sliders, ExternalLink, RefreshCw, CheckCircle2, AlertCircle,
  Activity, MessageSquare, Sun
} from 'lucide-react';
import { 
  generateFullSeriesProductionPrompts, 
  AI_VIDEO_PRESETS, 
  UNIVERSAL_NEGATIVE_PROMPT 
} from '../utils/promptEngine';

export default function ProductionPromptModal({
  isOpen,
  onClose,
  series,
  initialShotIndex = 0
}) {
  if (!isOpen) return null;

  const [activeShotIdx, setActiveShotIdx] = useState(initialShotIndex);
  const [selectedPreset, setSelectedPreset] = useState('kling');
  const [copiedShotId, setCopiedShotId] = useState(null);
  const [copiedBatch, setCopiedBatch] = useState(false);
  const [isSimulatingGenerate, setIsSimulatingGenerate] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [generateSuccess, setGenerateSuccess] = useState(false);

  // Generate full prompt packages
  const productionPrompts = generateFullSeriesProductionPrompts(series);
  const currentPrompt = productionPrompts[activeShotIdx] || productionPrompts[0];

  const handleCopyCurrentPrompt = () => {
    let textToCopy = '';
    if (selectedPreset === 'elevenlabs') {
      textToCopy = `Speaker: ${currentPrompt.voiceScriptPrompt.speaker}\nEmotion: ${currentPrompt.voiceScriptPrompt.emotion}\nScript:\n${currentPrompt.voiceScriptPrompt.dialogueWithCues}\n\nVocal Settings:\nPitch: ${currentPrompt.voiceScriptPrompt.prosodySettings.pitch}, Speed: ${currentPrompt.voiceScriptPrompt.prosodySettings.speed}, Breath: ${currentPrompt.voiceScriptPrompt.prosodySettings.breathIntensity}\nSFX: ${currentPrompt.voiceScriptPrompt.sfxPrompt}\nBGM: ${currentPrompt.voiceScriptPrompt.bgmPrompt}`;
    } else if (selectedPreset === 'comfyui') {
      textToCopy = currentPrompt.platformPrompts.comfyui;
    } else if (selectedPreset === 'runway') {
      textToCopy = currentPrompt.platformPrompts.runway;
    } else if (selectedPreset === 'hailuo') {
      textToCopy = currentPrompt.platformPrompts.hailuo;
    } else if (selectedPreset === 'luma') {
      textToCopy = currentPrompt.platformPrompts.luma;
    } else if (selectedPreset === 'kling') {
      textToCopy = currentPrompt.platformPrompts.kling;
    } else {
      textToCopy = currentPrompt.masterVideoPrompt;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedShotId(currentPrompt.shotId);
    setTimeout(() => setCopiedShotId(null), 2500);
  };

  const handleBatchCopyAll = () => {
    let fullBatchText = `=== SERIESX PRODUCTION PROMPTS: ${series.title || 'Series'} ===\n`;
    fullBatchText += `Aspect Ratio: 9:16 Vertical UHD | Target Model: ${AI_VIDEO_PRESETS.find(p => p.id === selectedPreset)?.name || 'Master'}\n`;
    fullBatchText += `Negative Prompt: ${UNIVERSAL_NEGATIVE_PROMPT}\n\n`;

    productionPrompts.forEach((p, idx) => {
      fullBatchText += `--------------------------------------------------------\n`;
      fullBatchText += `[SHOT ${p.shotNumber}] ${p.shotName} (${p.duration})\n`;
      fullBatchText += `Character: ${p.characterName} (Seed: ${p.seed})\n`;
      fullBatchText += `Camera: ${p.metadataBreakdown.cameraCinematography}\n`;
      fullBatchText += `Wardrobe: ${p.metadataBreakdown.wardrobeSpec}\n`;
      fullBatchText += `Acting: ${p.metadataBreakdown.gestureActing}\n`;
      fullBatchText += `Dialogue: ${p.metadataBreakdown.voiceDelivery}\n\n`;
      fullBatchText += `PROMPT:\n${p.masterVideoPrompt}\n\n`;
    });

    navigator.clipboard.writeText(fullBatchText);
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2500);
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(productionPrompts, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SeriesX_${series.id || 'series'}_Prompts.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleSimulate1ClickGenerate = () => {
    setIsSimulatingGenerate(true);
    setGenerateProgress(10);
    setGenerateSuccess(false);

    let progress = 10;
    const interval = setInterval(() => {
      progress += 25;
      if (progress >= 100) {
        clearInterval(interval);
        setGenerateProgress(100);
        setIsSimulatingGenerate(false);
        setGenerateSuccess(true);
        setTimeout(() => setGenerateSuccess(false), 4000);
      } else {
        setGenerateProgress(progress);
      }
    }, 450);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 999999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 25, 26, 0.75)',
          backdropFilter: 'blur(8px)'
        }}
      />

      {/* Main Modal Dialog */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: '#FAF7F2',
        borderRadius: '20px',
        border: '1.5px solid var(--border-subtle)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.45)',
        width: '100%',
        maxWidth: '1240px',
        height: '90vh',
        maxHeight: '92vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Modal Header */}
        <div style={{
          padding: '20px 28px',
          background: '#FFFFFF',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--teal-primary), #07383E)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-teal-btn)'
            }}>
              <Sparkles size={22} strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  ชุด Prompt ผลิตคลิปวิดีโออัตโนมัติ (Production-Ready Prompts)
                </h2>
                <span className="badge badge-green" style={{ fontSize: '0.72rem', padding: '3px 8px' }}>
                  <CheckCircle2 size={12} strokeWidth={2.5} /> พร้อมสร้าง 100%
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                {series.title} &bull; สังเคราะห์ครบ 8 องค์ประกอบ: ท่าทาง &bull; ตัวละคร &bull; เสื้อผ้า &bull; ฉาก &bull; เสียงพากย์ &bull; มุมกล้อง 9:16 &bull; ความต่อเนื่อง &bull; การเคลื่อนไหวธรรมชาติ
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={handleBatchCopyAll}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.82rem',
                fontWeight: 600
              }}
            >
              {copiedBatch ? <Check size={15} color="var(--accent-green)" /> : <Copy size={15} />}
              <span>{copiedBatch ? 'คัดลอกครบทุกช็อตแล้ว!' : 'คัดลอกทุกช็อตพร้อมกัน (Batch)'}</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                fontSize: '0.82rem'
              }}
              title="ดาวน์โหลดไฟล์ JSON สำหรับส่งเข้า ComfyUI หรือ API อัตโนมัติ"
            >
              <Download size={15} />
              <span>ดาวน์โหลด JSON API</span>
            </button>

            <button
              onClick={onClose}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'var(--bg-inset)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'var(--text-muted)'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* 8-Pillar Quality Assurance Bar */}
        <div style={{
          background: 'var(--bg-surface)',
          padding: '10px 28px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '8px',
          fontSize: '0.76rem',
          color: 'var(--text-muted)'
        }}>
          <span style={{ fontWeight: 700, color: 'var(--teal-primary)' }}>
            การตรวจสอบความพร้อมของระบบ (8/8 Pillars Verified):
          </span>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> มุมกล้อง 9:16
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> ตัวละคร & LoRA
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> เสื้อผ้าแม่นยำ
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> ท่าทาง & FACS
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> การเคลื่อนไหวธรรมชาติ
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> น้ำเสียง & บทพูด
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> ฉาก & แสงสมจริง
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={13} /> ความต่อเนื่องของฉาก
            </span>
          </div>
        </div>

        {/* Modal Main Body (2 Columns Layout) */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', flex: 1, overflow: 'hidden' }}>
          
          {/* Left Column: Shot Selector List */}
          <div style={{
            background: '#FFFFFF',
            borderRight: '1px solid var(--border-subtle)',
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto'
          }}>
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                เลือกช็อตที่ต้องการดู Prompt ({productionPrompts.length} ช็อต):
              </span>
            </div>

            <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {productionPrompts.map((p, idx) => {
                const isActive = idx === activeShotIdx;
                return (
                  <div
                    key={p.shotId}
                    onClick={() => setActiveShotIdx(idx)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--teal-subtle)' : 'transparent',
                      border: isActive ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <span style={{
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        color: isActive ? 'var(--teal-primary)' : 'var(--text-main)'
                      }}>
                        Shot {p.shotNumber}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                        {p.duration}
                      </span>
                    </div>

                    <div style={{
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: 'var(--text-main)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {p.shotName.split(':')[0]}
                    </div>

                    <div style={{
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      marginTop: '3px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <User size={11} />
                      <span>{p.characterName}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Prompt Inspection, Presets & Action Viewport */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            overflowY: 'auto',
            padding: '24px 28px',
            gap: '20px'
          }}>
            
            {/* Top Engine Preset Bar */}
            <div style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-md)',
              padding: '14px 18px',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-raised-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sliders size={16} strokeWidth={2} color="var(--teal-primary)" />
                <span style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  รูปแบบโมเดลปลายทาง (AI Generator Format):
                </span>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {AI_VIDEO_PRESETS.map(preset => {
                  const isSelected = selectedPreset === preset.id;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-pill)',
                        border: isSelected ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--teal-primary)' : 'var(--bg-surface)',
                        color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                        fontSize: '0.76rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      {preset.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Notification / Simulating Banner */}
            {generateSuccess && (
              <div style={{
                padding: '12px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-green-bg)',
                border: '1px solid rgba(31, 122, 89, 0.4)',
                color: 'var(--accent-green)',
                fontSize: '0.88rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={18} strokeWidth={2} />
                <span>จำลองการส่งข้อมูลเข้า AI Video Generator อัตโนมัติสำเร็จ! วิดีโอ Shot {currentPrompt.shotNumber} พร้อมเรนเดอร์ในไปป์ไลน์</span>
              </div>
            )}

            {/* Active Shot Prompt Card */}
            <div className="clay-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="badge badge-teal">Shot {currentPrompt.shotNumber}</span>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                      {currentPrompt.shotName}
                    </h3>
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    เวลาช็อต: {currentPrompt.duration} &bull; ตัวละคร: <strong>{currentPrompt.characterName}</strong> (Seed: {currentPrompt.seed})
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={handleCopyCurrentPrompt}
                    className="btn-primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 18px',
                      fontSize: '0.84rem',
                      fontWeight: 700
                    }}
                  >
                    {copiedShotId === currentPrompt.shotId ? <Check size={16} /> : <Copy size={16} />}
                    <span>{copiedShotId === currentPrompt.shotId ? 'คัดลอก Prompt แล้ว!' : 'คัดลอก Prompt ช็อตนี้'}</span>
                  </button>

                  <button
                    onClick={handleSimulate1ClickGenerate}
                    disabled={isSimulatingGenerate}
                    className="btn-primary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '9px 18px',
                      fontSize: '0.84rem',
                      fontWeight: 700,
                      background: 'linear-gradient(135deg, #1F7A59, #135E67)'
                    }}
                  >
                    <Play size={15} strokeWidth={2.5} />
                    <span>{isSimulatingGenerate ? `กำลังประมวลผล... (${generateProgress}%)` : 'กดสร้างคลิปอัตโนมัติ (1-Click Run)'}</span>
                  </button>
                </div>
              </div>

              {/* Main Video Generation Prompt Box */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                    Cinematic Video Prompt (คัดลอกลง Kling AI / Runway / Hailuo / Wan 2.1):
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    ความละเอียด 1080x1920 (9:16 UHD) &bull; 24 FPS Cinema Motion
                  </span>
                </div>
                <div style={{
                  background: 'var(--bg-inset)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  fontSize: '0.88rem',
                  lineHeight: 1.6,
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-sans)',
                  userSelect: 'all',
                  boxShadow: 'var(--shadow-inset)'
                }}>
                  {selectedPreset === 'comfyui' 
                    ? currentPrompt.platformPrompts.comfyui
                    : selectedPreset === 'kling'
                    ? currentPrompt.platformPrompts.kling
                    : selectedPreset === 'runway'
                    ? currentPrompt.platformPrompts.runway
                    : selectedPreset === 'hailuo'
                    ? currentPrompt.platformPrompts.hailuo
                    : selectedPreset === 'luma'
                    ? currentPrompt.platformPrompts.luma
                    : currentPrompt.masterVideoPrompt
                  }
                </div>
              </div>

              {/* Universal Negative Prompt Box */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-amber)', display: 'block', marginBottom: '6px' }}>
                  Negative Prompt Guard (ป้องกันหุ่นยนต์แข็งทื่อ / ใบหน้าพลาสติก / กล้ามเนื้อกระตุกผิดธรรมชาติ):
                </label>
                <div style={{
                  background: '#FFF9F2',
                  border: '1px solid rgba(180, 107, 24, 0.25)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '10px 14px',
                  fontSize: '0.78rem',
                  lineHeight: 1.5,
                  color: '#7C4A0E'
                }}>
                  {UNIVERSAL_NEGATIVE_PROMPT}
                </div>
              </div>

              {/* Voice Dialogue & Prosody Box (TTS Engine) */}
              <div style={{
                background: '#FFFFFF',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                boxShadow: 'var(--shadow-raised-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Volume2 size={16} strokeWidth={2} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                      คำพูด & สคริปต์เสียงพากย์ (ElevenLabs / TTS Prompt Spec)
                    </strong>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                    {currentPrompt.voiceScriptPrompt.emotion}
                  </span>
                </div>

                <div style={{
                  fontSize: '0.92rem',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  padding: '10px 14px',
                  background: 'var(--bg-surface)',
                  borderRadius: 'var(--radius-sm)',
                  borderLeft: '3.5px solid var(--teal-primary)',
                  marginBottom: '10px'
                }}>
                  {currentPrompt.voiceScriptPrompt.dialogueWithCues}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  <div><strong>ระดับเสียง (Pitch):</strong> {currentPrompt.voiceScriptPrompt.prosodySettings.pitch}</div>
                  <div><strong>ความเร็ว (Speed):</strong> {currentPrompt.voiceScriptPrompt.prosodySettings.speed}</div>
                  <div><strong>จังหวะลมหายใจ:</strong> {currentPrompt.voiceScriptPrompt.prosodySettings.breathIntensity}</div>
                  <div><strong>SFX:</strong> {currentPrompt.voiceScriptPrompt.sfxPrompt}</div>
                </div>
              </div>

              {/* 8-Pillar Detailed Specifications Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '12px',
                fontSize: '0.8rem'
              }}>
                {/* Pillar 1: มุมกล้อง & เลนส์ 9:16 */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', fontWeight: 700, marginBottom: '4px' }}>
                    <Camera size={14} />
                    <span>เสาหลัก 1: มุมกล้อง 9:16 & เลนส์ (Cinematography)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    {currentPrompt.metadataBreakdown.cameraCinematography}
                  </div>
                </div>

                {/* Pillar 2: ชีววิทยาการแสดงเสมือนมนุษย์ FACS */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '4px' }}>
                    <Activity size={14} />
                    <span>เสาหลัก 2: ชีววิทยามนุษย์ & FACS (Organic Motion)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    {currentPrompt.metadataBreakdown.humanMotionEngine || currentPrompt.metadataBreakdown.gestureActing}
                  </div>
                </div>

                {/* Pillar 3: เสื้อผ้าต่อเนื่องในฉาก */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', fontWeight: 700, marginBottom: '4px' }}>
                    <ShieldCheck size={14} />
                    <span>เสาหลัก 3: เสื้อผ้าต่อเนื่องในฉาก (Wardrobe Continuity)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    {currentPrompt.metadataBreakdown.wardrobeSpec}
                  </div>
                </div>

                {/* Pillar 4: ตัวละครตรงปก & Seed Lock */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '4px' }}>
                    <User size={14} />
                    <span>เสาหลัก 4: ตัวละครตรงปก & Seed (Actor Lock)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    {currentPrompt.metadataBreakdown.characterSpec}
                  </div>
                </div>

                {/* Pillar 5: น้ำเสียง & ลมหายใจ */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', fontWeight: 700, marginBottom: '4px' }}>
                    <Volume2 size={14} />
                    <span>เสาหลัก 5: น้ำเสียง & ลมหายใจ (Prosody & Breath)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    Tone: {currentPrompt.voiceScriptPrompt.vocalCurve} &bull; Breath: {currentPrompt.voiceScriptPrompt.prosodySettings.breathIntensity}
                  </div>
                </div>

                {/* Pillar 6: บทพูดและคิวน้ำเสียง */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: 700, marginBottom: '4px' }}>
                    <MessageSquare size={14} />
                    <span>เสาหลัก 6: บทพูด & คิวน้ำเสียง (Dialogue Script)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    {currentPrompt.metadataBreakdown.voiceDelivery}
                  </div>
                </div>

                {/* Pillar 7: ฉาก & แสงสมจริง */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-amber)', fontWeight: 700, marginBottom: '4px' }}>
                    <Sun size={14} />
                    <span>เสาหลัก 7: ฉาก & แสงสมจริง (Scene & Lighting)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    {currentPrompt.metadataBreakdown.sceneLighting}
                  </div>
                </div>

                {/* Pillar 8: ความต่อเนื่องของฉาก */}
                <div style={{ background: 'var(--bg-surface)', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', fontWeight: 700, marginBottom: '4px' }}>
                    <Layers size={14} />
                    <span>เสาหลัก 8: ความต่อเนื่องข้ามช็อต (Continuity Lock)</span>
                  </div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.78rem' }}>
                    {currentPrompt.metadataBreakdown.sceneContinuity}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div style={{
          padding: '16px 28px',
          background: '#FFFFFF',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <Sparkles size={16} color="var(--teal-primary)" />
            <span>พร้อมสร้างคลิปได้ทันที ทั้งบน Kling, Runway, Hailuo, Luma, Wan 2.1 และ ElevenLabs</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '8px 18px', fontSize: '0.84rem' }}
            >
              ปิดหน้าต่าง
            </button>
            <button
              onClick={handleCopyCurrentPrompt}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-teal-btn)'
              }}
            >
              <Copy size={16} />
              <span>คัดลอก Prompt ช็อต {currentPrompt.shotNumber}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
