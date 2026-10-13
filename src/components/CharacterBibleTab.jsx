import React, { useState } from 'react';
import { Lock, Unlock, Sliders, Volume2, ShieldCheck, Sparkles, User, RefreshCw, Eye } from 'lucide-react';

export default function CharacterBibleTab({ characters }) {
  const [selectedCharId, setSelectedCharId] = useState(characters[0].id);
  const [isSeedLocked, setIsSeedLocked] = useState(true);
  const [loraWeight, setLoraWeight] = useState(0.88);
  const [activeLightingTest, setActiveLightingTest] = useState('penthouse');
  const [playingVoice, setPlayingVoice] = useState(false);

  const character = characters.find(c => c.id === selectedCharId) || characters[0];

  const handleTestVoice = () => {
    setPlayingVoice(true);
    setTimeout(() => {
      setPlayingVoice(false);
    }, 2500);
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
        <div style={{ display: 'flex', gap: '12px' }}>
          {characters.map(char => {
            const isSelected = char.id === selectedCharId;
            return (
              <button
                key={char.id}
                onClick={() => setSelectedCharId(char.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '8px 16px',
                  borderRadius: '12px',
                  background: isSelected ? 'rgba(244, 63, 94, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1px solid #f43f5e' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
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
                    border: isSelected ? '2px solid #f43f5e' : '1px solid var(--border-subtle)'
                  }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: isSelected ? '#fb7185' : '#ffffff' }}>
                    {char.name.split('/')[0]}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                    Face-Lock: {char.faceLockAccuracy}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setIsSeedLocked(!isSeedLocked)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: isSeedLocked ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
              border: isSeedLocked ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
              color: isSeedLocked ? '#34d399' : '#f87171',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            {isSeedLocked ? <Lock size={15} /> : <Unlock size={15} />}
            {isSeedLocked ? `Actor Seed Locked (${character.actorSeed})` : 'Seed Unlocked'}
          </button>
        </div>
      </div>

      {/* Main Character Bible Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px' }}>
        {/* Left Column: Key Portrait & Face-Lock Control */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '16px',
              border: '2px solid rgba(244, 63, 94, 0.4)',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
            }}>
              <img
                src={character.portrait}
                alt={character.name}
                style={{ width: '100%', height: '380px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(0, 0, 0, 0.75)',
                backdropFilter: 'blur(8px)',
                padding: '4px 10px',
                borderRadius: '20px',
                border: '1px solid rgba(16, 185, 129, 0.5)',
                color: '#34d399',
                fontSize: '0.72rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <ShieldCheck size={13} />
                Face Identity 98.7%
              </div>
              <div style={{
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
                padding: '16px',
                textAlign: 'left'
              }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#fff' }}>{character.name}</h3>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: '#cbd5e1' }}>{character.role}</p>
              </div>
            </div>

            {/* Consistency Sliders */}
            <div style={{
              background: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              padding: '14px',
              textAlign: 'left'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  IP-Adapter / LoRA Weight
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#f43f5e' }}>
                  {loraWeight}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="1.0"
                step="0.01"
                value={loraWeight}
                onChange={(e) => setLoraWeight(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#f43f5e', cursor: 'pointer' }}
              />
              <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '6px' }}>
                ค่าแนะนำ 0.85 - 0.92 เพื่อให้หน้าเหมือนเดิม 100% โดยไม่อารมณ์แข็งกระด้าง
              </p>
            </div>
          </div>

          {/* Voice Profile Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Volume2 size={18} color="#06b6d4" />
                <h4 style={{ fontSize: '0.95rem', margin: 0, color: '#ffffff' }}>โมเดลเสียงพากย์เฉพาะตัว (Voice Bible)</h4>
              </div>
              <span className="badge badge-blue">{character.voiceProfile.voiceId}</span>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
              <strong>โทนเสียง:</strong> {character.voiceProfile.tone}
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              background: 'rgba(0,0,0,0.3)',
              padding: '10px',
              borderRadius: '8px',
              fontSize: '0.75rem',
              color: 'var(--text-dim)',
              textAlign: 'center'
            }}>
              <div>Pitch: <strong style={{ color: '#fff' }}>{character.voiceProfile.pitch}</strong></div>
              <div>Speed: <strong style={{ color: '#fff' }}>{character.voiceProfile.speed}</strong></div>
              <div>Breath: <strong style={{ color: '#fff' }}>{character.voiceProfile.breathIntensity}</strong></div>
            </div>

            <button
              onClick={handleTestVoice}
              disabled={playingVoice}
              style={{
                width: '100%',
                marginTop: '14px',
                padding: '10px',
                borderRadius: '8px',
                background: playingVoice ? 'rgba(6, 182, 212, 0.3)' : 'rgba(6, 182, 212, 0.15)',
                border: '1px solid rgba(6, 182, 212, 0.4)',
                color: '#67e8f9',
                fontSize: '0.8rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <Volume2 size={16} />
              {playingVoice ? 'กำลังสังเคราะห์เสียงตามอารมณ์ในบท...' : 'ทดสอบสังเคราะห์เสียง (Voice & Emotion Test)'}
            </button>
          </div>
        </div>

        {/* Right Column: Multi-Angle Turnaround Sheet & Expression Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Turnaround Sheet (4 angles & expressions) */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  📐 Character Turnaround & Expression Sheet
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ภาพอ้างอิงรอบด้านและสีหน้าสำหรับป้อนเข้า ControlNet / IP-Adapter เพื่อล็อกโครงหน้า 100% ทุกมุมกล้อง
                </p>
              </div>
              <span className="badge badge-purple">4-Angle Synced</span>
            </div>

            {character.sheetImage ? (
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: '#12141a'
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
                background: 'rgba(0,0,0,0.3)',
                borderRadius: '10px',
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
              {character.expressionMatrix.map((expr, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span style={{ fontSize: '0.78rem', color: '#e2e8f0' }}>{expr.label}</span>
                  <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 600 }}>{expr.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wardrobe Continuity Lock */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h4 style={{ fontSize: '0.95rem', color: '#ffffff', margin: '0 0 8px 0' }}>
              👔 Wardrobe & Styling Continuity Lock (คุมชุดเสื้อผ้าและเครื่องประดับ)
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              <strong>สเปกชุด Episode 01:</strong> {character.wardrobeSpec}
            </p>
            <div style={{
              marginTop: '10px',
              padding: '10px 14px',
              background: 'rgba(16, 185, 129, 0.1)',
              borderRadius: '8px',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              fontSize: '0.78rem',
              color: '#34d399',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <ShieldCheck size={16} />
              ระบบ Prompt Negative Guard ป้องกันโมเดลแอบเปลี่ยนสีเสื้อหรือเพิ่มกระดุมผิดตำแหน่ง
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
