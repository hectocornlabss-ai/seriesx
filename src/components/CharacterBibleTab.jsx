import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Sliders, Volume2, ShieldCheck, Sparkles, User, RefreshCw, Eye, Activity, HeartPulse, Layers, CheckCircle2, UserPlus, Plus } from 'lucide-react';
import AddCharacterModal from './AddCharacterModal';

export default function CharacterBibleTab({ characters = [], series = null, onAddCharacter }) {
  const [selectedCharId, setSelectedCharId] = useState(characters[0]?.id);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSeedLocked, setIsSeedLocked] = useState(true);
  const [loraWeight, setLoraWeight] = useState(0.88);
  const [playingVoice, setPlayingVoice] = useState(false);

  // Sync if character list changes
  useEffect(() => {
    if (!characters.some(c => c.id === selectedCharId) && characters.length > 0) {
      setSelectedCharId(characters[0].id);
    }
  }, [characters, selectedCharId]);

  const character = characters.find(c => c.id === selectedCharId) || characters[0] || {};

  const [facs, setFacs] = useState({
    browInnerRaiser: character.facsControls?.browInnerRaiser ?? 0.85,
    browLowerer: character.facsControls?.browLowerer ?? 0.70,
    lipTremor: character.facsControls?.lipTremor ?? 0.65,
    tearWelling: character.facsControls?.tearWelling ?? 0.80,
    pupilDilation: character.facsControls?.pupilDilation ?? 0.85,
    jawTension: character.facsControls?.jawTension ?? 0.75
  });

  const handleTestVoice = () => {
    setPlayingVoice(true);
    setTimeout(() => {
      setPlayingVoice(false);
    }, 2800);
  };

  const updateFacs = (key, val) => {
    setFacs(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Top Selector Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          {characters.map(char => {
            const isSelected = char.id === selectedCharId;
            return (
              <button
                key={char.id}
                onClick={() => {
                  setSelectedCharId(char.id);
                  if (char.facsControls) setFacs(char.facsControls);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSelected ? 'var(--bg-raised)' : 'transparent',
                  border: isSelected ? '1px solid var(--border-focus)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-raised-sm)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <img
                  src={char.portrait}
                  alt={char.name}
                  style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)'
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isSelected ? 'var(--teal-primary)' : 'var(--text-main)' }}>
                    {char.name.split('/')[0]}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Face-Lock: {char.faceLockAccuracy}
                  </div>
                </div>
              </button>
            );
          })}

          {/* Add New Character Button (OpenRouter AI) */}
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            id="btn-add-character-bible"
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              fontSize: '0.84rem',
              fontWeight: 700,
              boxShadow: 'var(--shadow-teal-btn)',
              whiteSpace: 'nowrap'
            }}
            title="เพิ่มตัวละครใหม่ในเรื่องนี้ด้วย OpenRouter AI"
          >
            <UserPlus size={16} strokeWidth={2.5} />
            <span>+ เพิ่มตัวละคร (OpenRouter AI)</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsSeedLocked(!isSeedLocked)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              background: isSeedLocked ? 'var(--accent-green-bg)' : 'var(--accent-red-bg)',
              border: isSeedLocked ? '1px solid rgba(31, 122, 89, 0.3)' : '1px solid rgba(185, 56, 72, 0.3)',
              color: isSeedLocked ? 'var(--accent-green)' : 'var(--accent-red)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {isSeedLocked ? <Lock size={15} strokeWidth={2} /> : <Unlock size={15} strokeWidth={2} />}
            <span>{isSeedLocked ? `Actor Seed Locked (${character?.actorSeed || 'Locked'})` : 'Seed Unlocked'}</span>
          </button>
        </div>
      </div>

      {/* Modal Add Character */}
      <AddCharacterModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        series={series}
        onSaveCharacter={(newChar) => {
          if (onAddCharacter) onAddCharacter(newChar);
          setSelectedCharId(newChar.id);
          if (newChar.facsControls) setFacs(newChar.facsControls);
        }}
      />

      {/* Main Character Bible Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
        {/* Left Column: Extreme Acting Portrait & Micro-expression FACS Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Extreme Close-Up Acting Visual */}
          <div className="clay-card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '16px',
              border: '2px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-raised-sm)'
            }}>
              <img
                src={character.extremeActingImage || character.portrait}
                alt={character.name}
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                border: '1px solid rgba(31, 122, 89, 0.4)',
                color: 'var(--accent-green)',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={14} strokeWidth={2} />
                <span>FACS Acting Synced</span>
              </div>
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(to top, rgba(15, 25, 26, 0.92), transparent)',
                padding: '16px',
                textAlign: 'left'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#FFFFFF' }}>{character.name}</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#E2E8F0' }}>
                  {character.actingStyle}
                </p>
              </div>
            </div>

            {/* Real-Time Facial Muscle (FACS) Tuning Sliders */}
            <div style={{
              background: 'var(--bg-inset)',
              boxShadow: 'var(--shadow-inset)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--teal-primary)' }}>
                <Activity size={16} strokeWidth={2} />
                <strong style={{ fontSize: '0.85rem' }}>FACS Micro-Expression Tuning</strong>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>น้ำตาคลอเบ้า & ความชุ่มชื้นตา (Tear Welling):</span>
                    <strong style={{ color: 'var(--teal-primary)' }}>{Math.round(facs.tearWelling * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.tearWelling}
                    onChange={(e) => updateFacs('tearWelling', parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>ริมฝีปากล่างสั่นระริก (AU20 Lip Tremor):</span>
                    <strong style={{ color: 'var(--accent-red)' }}>{Math.round(facs.lipTremor * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.lipTremor}
                    onChange={(e) => updateFacs('lipTremor', parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>ขบกรามเกร็งสันนูน (Jaw Muscle Clench):</span>
                    <strong style={{ color: 'var(--accent-amber)' }}>{Math.round(facs.jawTension * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.jawTension}
                    onChange={(e) => updateFacs('jawTension', parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Voice Prosody & Emotion Breath Card */}
          <div className="clay-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={18} strokeWidth={2} color="var(--teal-primary)" />
                <h4 style={{ fontSize: '0.92rem', margin: 0, color: 'var(--text-main)', fontWeight: 700 }}>โมเดลเสียงพากย์สื่ออารมณ์ (Emotion TTS)</h4>
              </div>
              <span className="badge badge-teal-subtle">{character.voiceProfile?.voiceId || 'TH-Voice-AI'}</span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
              <strong>โทนเสียง:</strong> {character.voiceProfile?.tone || 'เสียงพากย์ธรรมชาติ สื่ออารมณ์ชัดเจน'}
            </p>

            <div style={{
              background: 'var(--bg-inset)',
              boxShadow: 'var(--shadow-inset)',
              padding: '10px 12px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              color: 'var(--teal-primary)',
              fontStyle: 'italic',
              marginBottom: '14px',
              borderLeft: '3px solid var(--teal-primary)'
            }}>
              "{character.voiceProfile?.sampleLine || 'นี่คือบททดสอบเสียงของตัวละคร...'}"
            </div>

            <button
              onClick={handleTestVoice}
              disabled={playingVoice}
              className="btn-primary"
              style={{ width: '100%' }}
            >
              <Volume2 size={16} strokeWidth={2} />
              <span>{playingVoice ? 'กำลังสังเคราะห์เสียงสะอื้นและหายใจกระตุก...' : 'ทดสอบสังเคราะห์เสียงและลมหายใจ'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Multi-Angle Turnaround Sheet & Expression Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Turnaround Sheet (4 angles & expressions) */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} strokeWidth={2} color="var(--teal-primary)" />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    Character Turnaround & Expression Sheet
                  </h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ภาพอ้างอิงรอบด้านและสีหน้าสำหรับป้อนเข้า ControlNet / IP-Adapter เพื่อล็อกโครงหน้า 100% ทุกมุมกล้อง
                </p>
              </div>
              <span className="badge badge-teal">4-Angle Synced</span>
            </div>

            {character.sheetImage ? (
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-raised)',
                boxShadow: 'var(--shadow-raised-sm)'
              }}>
                <img
                  src={character.sheetImage}
                  alt="Character Turnaround"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            ) : (
              <div style={{
                padding: '40px',
                textAlign: 'center',
                background: 'var(--bg-inset)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-dim)'
              }}>
                กำลังซิงค์ Turnaround Matrix สำหรับตัวละครนี้
              </div>
            )}

            {/* Expression Matrix Checkers */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '10px',
              marginTop: '16px'
            }}>
              {(character.expressionMatrix || []).map((expr, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    boxShadow: 'var(--shadow-raised-sm)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-main)' }}>{expr.label}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600 }}>{expr.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wardrobe Continuity Lock */}
          <div className="clay-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--teal-primary)' }}>
              <ShieldCheck size={18} strokeWidth={2} />
              <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                Wardrobe & Styling Continuity Lock (คุมชุดเสื้อผ้าและเครื่องประดับ)
              </h4>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              <strong>สเปกชุด Episode 01:</strong> {character.wardrobeSpec}
            </p>
            <div style={{
              marginTop: '12px',
              padding: '10px 14px',
              background: 'var(--accent-green-bg)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(31, 122, 89, 0.3)',
              fontSize: '0.78rem',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} strokeWidth={2} />
              <span>ระบบ Prompt Negative Guard ป้องกันโมเดลแอบเปลี่ยนสีเสื้อหรือเพิ่มกระดุมผิดตำแหน่ง</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
