import React, { useState, useEffect } from 'react';
import { 
  Lock, Unlock, Volume2, ShieldCheck, Activity, HeartPulse, Layers, 
  CheckCircle2, UserPlus, Square, Edit3, Trash2, Copy, Save, BookOpen,
  Sparkles, AlertCircle, RefreshCw, Film, Eye, Upload
} from 'lucide-react';
import CharacterEditorPage from './CharacterEditorPage';

export default function CharacterBibleTab({ 
  characters = [], 
  series = null, 
  onAddCharacter, 
  onUpdateCharacter, 
  onDeleteCharacter,
  currentPath = '/characters',
  searchParams = null,
  onNavigate
}) {
  const [selectedCharId, setSelectedCharId] = useState(characters[0]?.id);
  const [internalView, setInternalView] = useState(null); // null | 'edit' | 'create'
  const [isSeedLocked, setIsSeedLocked] = useState(true);
  const [playingVoice, setPlayingVoice] = useState(false);
  const [actionNotice, setActionNotice] = useState('');

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

  // Sync facs state when switching active character
  useEffect(() => {
    if (character.facsControls) {
      setFacs(character.facsControls);
    }
  }, [selectedCharId, character.facsControls]);

  // Stop any active speech synthesis when unmounting or switching character
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [selectedCharId]);

  const cleanTextToSpeak = (text) => {
    if (!text) return '';
    return text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim() || text;
  };

  const handleTestVoice = () => {
    if (typeof window === 'undefined') return;

    if (playingVoice) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      setPlayingVoice(false);
      return;
    }

    const rawLine = character.voiceProfile?.sampleLine || 'นี่คือบททดสอบเสียงของตัวละครในซีรีส์';
    const textToSpeak = cleanTextToSpeak(rawLine);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);

      const isThai = /[\u0E00-\u0E7F]/.test(textToSpeak);
      const voices = window.speechSynthesis.getVoices();
      if (isThai) {
        const thVoice = voices.find(v => v.lang && (v.lang.startsWith('th') || v.lang.toLowerCase() === 'th-th'));
        if (thVoice) utterance.voice = thVoice;
        utterance.lang = 'th-TH';
      }

      // Dynamic Pitch according to character profile
      if (character.voiceProfile?.pitch?.includes('-4')) {
        utterance.pitch = 0.75;
      } else if (character.voiceProfile?.pitch?.includes('-2')) {
        utterance.pitch = 0.88;
      } else if (character.voiceProfile?.pitch?.includes('+')) {
        utterance.pitch = 1.25;
      } else {
        utterance.pitch = 1.0;
      }

      // Dynamic Speed
      if (character.voiceProfile?.speed) {
        const speedVal = parseFloat(character.voiceProfile.speed);
        if (!isNaN(speedVal)) utterance.rate = speedVal;
      }

      utterance.onstart = () => setPlayingVoice(true);
      utterance.onend = () => setPlayingVoice(false);
      utterance.onerror = () => setPlayingVoice(false);

      window.speechSynthesis.speak(utterance);
      setPlayingVoice(true);
    } else {
      // Fallback
      setPlayingVoice(true);
      setTimeout(() => setPlayingVoice(false), 2500);
    }
  };

  const updateFacs = (key, val) => {
    setFacs(prev => ({ ...prev, [key]: val }));
  };

  // Save slider adjustments to active character
  const handleSaveFacs = () => {
    if (!character || !onUpdateCharacter) return;
    const updated = {
      ...character,
      facsControls: { ...facs }
    };
    onUpdateCharacter(updated);
    setActionNotice('บันทึกค่าการปรับแต่งกล้ามเนื้อใบหน้า FACS ของตัวละครเรียบร้อยแล้ว');
    setTimeout(() => setActionNotice(''), 3000);
  };

  // Clone current character
  const handleCloneCharacter = () => {
    if (!character || !onAddCharacter) return;
    const newSeed = 77100000 + Math.floor(Math.random() * 899999);
    const cloned = {
      ...character,
      id: `char-${Date.now()}`,
      name: `${character.name.split('/')[0].trim()} (สำเนาคัดลอก) / Clone`,
      actorSeed: newSeed,
      role: `${character.role} (สำเนา)`
    };
    onAddCharacter(cloned);
    setSelectedCharId(cloned.id);
    setActionNotice(`โคลนตัวละคร "${character.name.split('/')[0]}" เป็นตัวละครใหม่สำเร็จ!`);
    setTimeout(() => setActionNotice(''), 3500);
  };

  // Delete current character
  const handleDeleteActiveCharacter = () => {
    if (!character || !onDeleteCharacter) return;
    onDeleteCharacter(character.id);
  };

  // Full-Page View Mode Switching (No Popups!)
  const isCreateMode = currentPath === '/character-new' || internalView === 'create';
  const isEditMode = currentPath === '/character-edit' || internalView === 'edit';

  const urlCharId = searchParams?.get ? searchParams.get('charId') : null;
  const activeEditChar = (urlCharId && characters.find(c => c.id === urlCharId)) || characters.find(c => c.id === selectedCharId) || characters[0];

  const handleOpenCreate = () => {
    if (onNavigate) {
      onNavigate('/character-new', series?.id ? { id: series.id } : {});
    }
    setInternalView('create');
  };

  const handleOpenEdit = (charToEdit = character) => {
    const charId = charToEdit?.id || selectedCharId;
    if (onNavigate) {
      onNavigate('/character-edit', {
        ...(series?.id ? { id: series.id } : {}),
        charId: charId
      });
    }
    setSelectedCharId(charId);
    setInternalView('edit');
  };

  const handleBackToOverview = () => {
    setInternalView(null);
    if (onNavigate) {
      onNavigate('/characters', series?.id ? { id: series.id } : {});
    }
  };

  if (isCreateMode) {
    return (
      <CharacterEditorPage
        series={series}
        characterToEdit={null}
        mode="create"
        onSave={(newChar) => {
          if (onAddCharacter) onAddCharacter(newChar);
          setSelectedCharId(newChar.id);
          handleBackToOverview();
          setActionNotice(`เพิ่มตัวละคร "${newChar.name.split('/')[0]}" เข้าสู่โปรเจกต์สำเร็จ!`);
          setTimeout(() => setActionNotice(''), 3500);
        }}
        onCancel={handleBackToOverview}
      />
    );
  }

  if (isEditMode) {
    return (
      <CharacterEditorPage
        series={series}
        characterToEdit={activeEditChar}
        mode="edit"
        onSave={(updatedChar) => {
          if (onUpdateCharacter) onUpdateCharacter(updatedChar);
          if (updatedChar.facsControls) setFacs(updatedChar.facsControls);
          handleBackToOverview();
          setActionNotice(`อัปเดตข้อมูลตัวละคร "${updatedChar.name.split('/')[0]}" เรียบร้อยแล้ว`);
          setTimeout(() => setActionNotice(''), 3500);
        }}
        onCancel={handleBackToOverview}
        onDelete={(charId) => {
          if (onDeleteCharacter) onDeleteCharacter(charId);
          handleBackToOverview();
        }}
      />
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px 0' }}>
      {/* Action Notice Banner */}
      {actionNotice && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '10px 18px',
          background: 'var(--accent-green-bg)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid rgba(31, 122, 89, 0.3)',
          color: 'var(--accent-green)',
          fontSize: '0.84rem',
          fontWeight: 600
        }}>
          <CheckCircle2 size={16} />
          <span>{actionNotice}</span>
        </div>
      )}

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
            onClick={handleOpenCreate}
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
            title="เพิ่มตัวละครใหม่ในเรื่องนี้ด้วย OpenRouter AI หรือกรอกสเปกเอง (เปิดหน้าเต็มจอ)"
          >
            <UserPlus size={16} strokeWidth={2.5} />
            <span>+ เพิ่มตัวละคร (Add Character)</span>
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

      {/* Active Character Quick Action Toolbar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 20px',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-raised-sm)',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>จัดการตัวละคร:</span>
          <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>{character.name}</strong>
          <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>{character.role || 'Casting Lead'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {/* Edit Button - Jumps directly to Full Page Studio */}
          <button
            type="button"
            onClick={() => handleOpenEdit(character)}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 14px', fontSize: '0.8rem' }}
            title="แก้ไขรายละเอียดเชิงลึกทั้งหมดของตัวละครนี้ในหน้า Character Studio เต็มจอ"
          >
            <Edit3 size={15} />
            <span>แก้ไขข้อมูล (Edit)</span>
          </button>

          {/* Clone / Duplicate Button */}
          <button
            type="button"
            onClick={handleCloneCharacter}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', fontSize: '0.8rem' }}
            title="คัดลอกตัวละครนี้เพื่อสร้างเวอร์ชันสำรองหรือร่างแปลงกาย"
          >
            <Copy size={15} />
            <span>โคลนตัวละคร (Clone)</span>
          </button>

          {/* Save FACS Sliders Button */}
          <button
            type="button"
            onClick={handleSaveFacs}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '7px 12px', fontSize: '0.8rem', color: 'var(--teal-primary)' }}
            title="บันทึกค่ากล้ามเนื้อใบหน้า FACS ที่ปรับแต่งด้วย Slider ลงในฐานข้อมูลซีรีส์"
          >
            <Save size={15} />
            <span>บันทึก FACS</span>
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={handleDeleteActiveCharacter}
            disabled={characters.length <= 1}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 12px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent-red-bg)',
              color: 'var(--accent-red)',
              border: '1px solid rgba(185, 56, 72, 0.3)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: characters.length <= 1 ? 'not-allowed' : 'pointer',
              opacity: characters.length <= 1 ? 0.5 : 1
            }}
            title={characters.length <= 1 ? 'ไม่สามารถลบตัวละครสุดท้ายในเรื่องได้' : 'ลบตัวละครนี้ออกจากเรื่อง'}
          >
            <Trash2 size={15} />
            <span>ลบตัวละคร</span>
          </button>
        </div>
      </div>

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
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8rem',
              color: 'var(--teal-primary)',
              fontStyle: 'italic',
              marginBottom: '14px',
              borderLeft: '3px solid var(--teal-primary)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px'
            }}>
              <div>"{character.voiceProfile?.sampleLine || 'นี่คือบททดสอบเสียงของตัวละคร...'}"</div>
              {playingVoice && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                  <span style={{ fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600 }}>กำลังเล่นเสียงสด (Web Speech API):</span>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '3px', height: '14px' }}>
                    <div style={{ width: '3px', height: '12px', background: 'var(--accent-green)', borderRadius: '1px', animation: 'pulse 0.6s infinite ease-in-out alternate' }} />
                    <div style={{ width: '3px', height: '16px', background: 'var(--teal-primary)', borderRadius: '1px', animation: 'pulse 0.4s infinite ease-in-out alternate' }} />
                    <div style={{ width: '3px', height: '8px', background: 'var(--accent-green)', borderRadius: '1px', animation: 'pulse 0.7s infinite ease-in-out alternate' }} />
                    <div style={{ width: '3px', height: '14px', background: 'var(--teal-primary)', borderRadius: '1px', animation: 'pulse 0.5s infinite ease-in-out alternate' }} />
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '14px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <div>Pitch: <strong style={{ color: 'var(--text-main)' }}>{character.voiceProfile?.pitch || 'Standard'}</strong></div>
              <div>Speed: <strong style={{ color: 'var(--text-main)' }}>{character.voiceProfile?.speed || '1.0x'}</strong></div>
            </div>

            <button
              onClick={handleTestVoice}
              className={playingVoice ? 'btn-secondary' : 'btn-primary'}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: playingVoice ? 'var(--accent-red-bg)' : undefined,
                color: playingVoice ? 'var(--accent-red)' : undefined,
                borderColor: playingVoice ? 'rgba(185, 56, 72, 0.4)' : undefined
              }}
            >
              {playingVoice ? <Square size={16} fill="currentColor" /> : <Volume2 size={16} strokeWidth={2} />}
              <span>{playingVoice ? 'หยุดเล่นเสียง (Stop)' : '🔊 ทดสอบสังเคราะห์เสียง (Web Speech API)'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Multi-Angle Turnaround Sheet & Expression Matrix */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Character Lore, Psychology & Relationship Card */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} color="var(--teal-primary)" />
                <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  ข้อมูลอัตลักษณ์ & ปูมหลังตัวละคร (Character Lore & Psychology)
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '6px' }}>
                {character.age && (
                  <span className="badge badge-teal-subtle" style={{ fontSize: '0.72rem' }}>อายุ {character.age} ปี</span>
                )}
                {character.gender && (
                  <span className="badge badge-teal-subtle" style={{ fontSize: '0.72rem' }}>{character.gender}</span>
                )}
              </div>
            </div>

            {/* Backstory & Motivation */}
            <div style={{ marginBottom: '14px' }}>
              <strong style={{ fontSize: '0.82rem', color: 'var(--teal-primary)', display: 'block', marginBottom: '4px' }}>
                ประวัติภูมิหลัง & แรงขับเคลื่อนทางจิตวิทยา (Backstory & Core Motivation):
              </strong>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0, background: 'var(--bg-inset)', padding: '12px 14px', borderRadius: 'var(--radius-sm)' }}>
                {character.description || 'ยังไม่ได้ระบุประวัติภูมิหลังของตัวละครนี้ สามารถกดปุ่ม "แก้ไขข้อมูล (Edit)" ด้านบนเพื่อเพิ่มเติมได้'}
              </p>
            </div>

            {/* Psychology & Conflict Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '14px' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>ปมขัดแย้งหลัก (Core Conflict):</span>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{character.coreConflict || 'ความยุติธรรม VS พันธสัญญาความรักกับศัตรู'}</strong>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-red)', display: 'block' }}>จุดอ่อนร้ายแรง (Fatal Flaw):</span>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{character.fatalFlaw || 'ความเด็ดเดี่ยวที่ไม่ยอมประนีประนอม'}</strong>
              </div>

              <div style={{ background: 'var(--bg-surface)', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--accent-green)', display: 'block' }}>ความสัมพันธ์ในเรื่อง (Dynamics):</span>
                <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{character.relationshipNotes || 'คู่ปรับและศัตรูทางสายเลือด'}</strong>
              </div>
            </div>

            {/* Positive Anchor Tokens (Face-Lock AI Prompts) */}
            <div style={{ background: 'var(--bg-inset)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <span style={{ fontWeight: 700, color: 'var(--teal-primary)' }}>Face-Lock Positive Anchor Prompts (Stable Diffusion / Midjourney):</span>
                <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>Seed: {character.actorSeed || '77391024'}</span>
              </div>
              <code style={{ color: 'var(--text-main)', fontFamily: 'monospace', display: 'block', wordBreak: 'break-all' }}>
                {character.positiveAnchorPrompt || `(face_seed_${character.actorSeed || '77391024'}:1.2), highly detailed portrait, sharp jawline, cinematic rim lighting, 8k vertical drama character sheet`}
              </code>
            </div>
          </div>

          {/* Turnaround Sheet & Multi-Angle Gallery */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} strokeWidth={2} color="var(--teal-primary)" />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    Character Multi-Angle & Body Turnaround (มุมมองรอบด้านและสัดส่วน)
                  </h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ภาพอ้างอิงรอบด้าน (หน้าตรง, หน้าข้าง 45°, ด้านหลัง, รูปร่างเต็มตัว) สำหรับป้อนเข้า ControlNet / IP-Adapter เพื่อล็อกโครงสร้างตัวละคร 100%
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleOpenEdit(character)}
                className="btn-secondary"
                style={{ fontSize: '0.78rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Upload size={14} />
                <span>+ อัปโหลดไฟล์ PNG มุมมองเพิ่ม</span>
              </button>
            </div>

            {/* Multi-Angle Image Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '16px' }}>
              {/* Frontal */}
              <div style={{ background: 'var(--bg-surface)', border: '1.5px solid var(--teal-primary)', borderRadius: 'var(--radius-sm)', padding: '6px', textAlign: 'center' }}>
                <img src={character.portrait} alt="Frontal" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-primary)', display: 'block', marginTop: '4px' }}>หน้าตรง (Frontal)</span>
              </div>
              {/* Side Profile */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px', textAlign: 'center' }}>
                <img src={character.sideProfileImage || character.sheetImage || character.portrait} alt="Side Profile" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginTop: '4px' }}>หน้าข้าง 45° (Side)</span>
              </div>
              {/* Back View */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px', textAlign: 'center' }}>
                {character.backViewImage ? (
                  <img src={character.backViewImage} alt="Back View" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
                ) : (
                  <div style={{ width: '100%', height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-inset)', borderRadius: '4px', color: 'var(--text-dim)', fontSize: '0.7rem', padding: '6px' }}>
                    <Eye size={20} strokeWidth={1.5} />
                    <span>ยังไม่ได้อัปโหลด ด้านหลัง</span>
                  </div>
                )}
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginTop: '4px' }}>ด้านหลัง (Back)</span>
              </div>
              {/* Full Body */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px', textAlign: 'center' }}>
                <img src={character.fullBodyImage || character.sheetImage || character.portrait} alt="Full Body" style={{ width: '100%', height: '140px', objectFit: 'contain', background: '#F8F9FA', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginTop: '4px' }}>รูปร่างเต็มตัว (Full)</span>
              </div>
              {/* Extreme Acting */}
              <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '6px', textAlign: 'center' }}>
                <img src={character.extremeActingImage || character.portrait} alt="Extreme Acting" style={{ width: '100%', height: '140px', objectFit: 'cover', borderRadius: '4px' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--accent-red)', display: 'block', marginTop: '4px' }}>อารมณ์สุดขั้ว</span>
              </div>
            </div>

            {character.sheetImage && (
              <div style={{
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-raised)',
                boxShadow: 'var(--shadow-raised-sm)',
                marginTop: '10px'
              }}>
                <img
                  src={character.sheetImage}
                  alt="Character Turnaround"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
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

          {/* Wardrobe Continuity Lock & Multi-Scene Costumes */}
          <div className="clay-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)' }}>
                <ShieldCheck size={18} strokeWidth={2} />
                <h4 style={{ fontSize: '0.94rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  Wardrobe & Multi-Scene Costumes (ชุดคอสตูมประจำฉากต่าง ๆ)
                </h4>
              </div>
              <button
                type="button"
                onClick={() => handleOpenEdit(character)}
                className="btn-secondary"
                style={{ fontSize: '0.76rem', padding: '5px 12px', color: 'var(--teal-primary)' }}
              >
                + จัดการ / เปลี่ยนชุดคอสตูม
              </button>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 10px 0' }}>
              <strong>สเปกชุดปัจจุบัน:</strong> {character.wardrobeSpec || 'สูทสีกรมท่า Navy Wool 120s, เชิ้ตขาวผ้าไหม, ต่างหูมุก'}
            </p>

            {/* Wardrobe Sets per Scene */}
            {character.wardrobeSets && character.wardrobeSets.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', marginBottom: '14px' }}>
                {character.wardrobeSets.map((outfit) => (
                  <div
                    key={outfit.id}
                    style={{
                      background: outfit.isDefault ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                      border: outfit.isDefault ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}
                  >
                    <img src={outfit.imageUrl || character.portrait} alt={outfit.name} style={{ width: '42px', height: '42px', borderRadius: '4px', objectFit: 'cover' }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <strong style={{ fontSize: '0.8rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {outfit.name}
                        </strong>
                        {outfit.isDefault && (
                          <span className="badge badge-teal" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>ชุดหลัก</span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>
                        {outfit.sceneTag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: '12px' }}>
                <div style={{ background: 'var(--bg-inset)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.74rem' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>เนื้อผ้า & คัตติ้ง:</span>
                  <strong style={{ color: 'var(--text-main)' }}>Wool 120s / Matte Silk Lapel</strong>
                </div>
                <div style={{ background: 'var(--bg-inset)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.74rem' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>จำนวนกระดุม & ทรงปก:</span>
                  <strong style={{ color: 'var(--text-main)' }}>Double-Breasted 4-Button / Peak</strong>
                </div>
                <div style={{ background: 'var(--bg-inset)', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.74rem' }}>
                  <span style={{ color: 'var(--text-muted)', display: 'block' }}>เครื่องประดับ & อุปกรณ์:</span>
                  <strong style={{ color: 'var(--text-main)' }}>Silver Pearl Earrings / Slim Watch</strong>
                </div>
              </div>
            )}

            <div style={{
              padding: '10px 14px',
              background: 'var(--accent-green-bg)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid rgba(31, 122, 89, 0.3)',
              fontSize: '0.76rem',
              color: 'var(--accent-green)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} strokeWidth={2} />
              <span>Prompt Negative Guard & IP-Adapter ล็อกสีเสื้อ รอยยับ และกระดุม ไม่ให้เปลี่ยนข้ามคัทเด็ดขาด</span>
            </div>
          </div>

          {/* AI Image & Video Prompt Studio Card */}
          <div className="clay-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)' }}>
                <Film size={18} strokeWidth={2} />
                <h4 style={{ fontSize: '0.94rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  Prompt Studio สำหรับสร้างภาพ & คลิปวิดีโอ (Image & Video Generation Ready)
                </h4>
              </div>
              <button
                type="button"
                onClick={() => handleOpenEdit(character)}
                className="btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                <Sparkles size={13} />
                <span>ปรับแต่งฉากหลัง แสง & วิดีโอเต็มจอ</span>
              </button>
            </div>

            <div style={{ background: 'var(--bg-inset)', padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--teal-primary)' }}>
                  🎬 Video AI Generation Prompt (Runway Gen-3 / Kling / Sora / Luma):
                </strong>
                <button
                  type="button"
                  onClick={() => {
                    const prompt = `9:16 vertical drama cinematic shot. ${character.name.split('/')[0]} wearing ${character.wardrobeSpec || 'tailored suit'}. Camera: Slow push-in on 85mm lens. Character Motion: subtle chest breathing rise and fall 14 bpm, micro-tremor of lower lip, ocular saccade micro-movements, hair strands reacting to breeze and humidity. Environment: heavy cinematic rainstorm, reflections of cyan and amber neon lights on wet asphalt. Lighting: strong edge rim lighting, deep contrast shadows. Ultra-photorealistic 24fps motion.`;
                    if (navigator.clipboard) navigator.clipboard.writeText(prompt);
                    setActionNotice('คัดลอก Prompt สำหรับ Video AI สำเร็จ!');
                    setTimeout(() => setActionNotice(''), 3000);
                  }}
                  className="btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <Copy size={12} />
                  <span>คัดลอก Prompt วิดีโอ</span>
                </button>
              </div>
              <code style={{ fontSize: '0.76rem', color: 'var(--text-main)', fontFamily: 'monospace', display: 'block', lineHeight: 1.45, background: 'var(--bg-surface)', padding: '8px 10px', borderRadius: '4px' }}>
                {`9:16 vertical drama cinematic shot. ${character.name.split('/')[0]} wearing ${character.wardrobeSpec || 'tailored suit'}. Camera: Slow push-in on 85mm lens. Character Motion: subtle chest breathing rise and fall 14 bpm, micro-tremor of lower lip, ocular saccade micro-movements, hair strands reacting to breeze and humidity. Environment: heavy cinematic rainstorm, reflections of cyan and amber neon lights on wet asphalt...`}
              </code>
            </div>
          </div>

          {/* Biological Human Motion & Kinetic Engine Card */}
          <div className="clay-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)' }}>
                <HeartPulse size={18} strokeWidth={2} />
                <h4 style={{ fontSize: '0.94rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  Biological Human Motion Engine (ฟิสิกส์การเคลื่อนไหวสมจริงเหมือนมนุษย์)
                </h4>
              </div>
              <span className="badge badge-teal-subtle" style={{ fontSize: '0.72rem' }}>
                Anti-Stiffness Active
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', fontSize: '0.78rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--teal-primary)', display: 'block', marginBottom: '2px' }}>การกระเพื่อมของทรวงอก:</strong>
                <span style={{ color: 'var(--text-muted)' }}>ไหปลาร้าและอกกระเพื่อม 14 ครั้ง/นาที ตามจังหวะลมหายใจธรรมชาติ</span>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--accent-green)', display: 'block', marginBottom: '2px' }}>การกะพริบตา & Saccades:</strong>
                <span style={{ color: 'var(--text-muted)' }}>สายตาเหลือบมองและกะพริบทุก 2.5-4 วินาที ไม่จ้องค้างเป็นหุ่นยนต์</span>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--accent-amber)', display: 'block', marginBottom: '2px' }}>การกลืนน้ำลาย & เกร็งคอ:</strong>
                <span style={{ color: 'var(--text-muted)' }}>ลูกกระเดือกขยับกลืนน้ำลายสะดุดเมื่อเผชิญแรงกดดันในซีนดราม่า</span>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--teal-primary)', display: 'block', marginBottom: '2px' }}>กล้ามเนื้อใบหน้า FACS:</strong>
                <span style={{ color: 'var(--text-muted)' }}>AU1+AU4+AU20 ซิงค์กับเสียงสะอื้นและริมฝีปากสั่นระริก</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
