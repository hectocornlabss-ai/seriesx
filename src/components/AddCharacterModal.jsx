import React, { useState } from 'react';
import { 
  X, Sparkles, User, UserPlus, Check, RefreshCw, Key, ShieldCheck, 
  Layers, Volume2, Sliders, ExternalLink, AlertCircle, Eye, Lock
} from 'lucide-react';
import { 
  OPENROUTER_MODELS, 
  PRESET_AVATARS, 
  getOpenRouterApiKey, 
  setOpenRouterApiKey, 
  getSelectedOpenRouterModel, 
  setSelectedOpenRouterModel,
  generateCharacterProfile
} from '../utils/openRouter';

export default function AddCharacterModal({ isOpen, onClose, onSaveCharacter, series }) {
  if (!isOpen) return null;

  // OpenRouter State
  const [selectedModel, setSelectedModel] = useState(getSelectedOpenRouterModel());
  const [apiKeyInput, setApiKeyInput] = useState(getOpenRouterApiKey());
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [apiSaveNotice, setApiSaveNotice] = useState('');

  // AI Prompt State
  const [promptText, setPromptText] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genNotice, setGenNotice] = useState('');

  // Character Form Fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [description, setDescription] = useState('');
  const [actingStyle, setActingStyle] = useState('Method Acting — สื่ออารมณ์ผ่านแววตาและกล้ามเนื้อใบหน้า');
  const [actorSeed, setActorSeed] = useState(77100000 + Math.floor(Math.random() * 899999));
  const [loraModel, setLoraModel] = useState('Custom_Char_V1_fp16.safetensors');
  const [faceLockAccuracy, setFaceLockAccuracy] = useState('98.8%');
  const [portraitUrl, setPortraitUrl] = useState('/assets/rin_portrait.jpg');
  const [voiceId, setVoiceId] = useState('TH-Fem-Deep-02');
  const [voiceTone, setVoiceTone] = useState('คมชัด เยือกเย็น ซ่อนความกดดัน');
  const [sampleLine, setSampleLine] = useState('[จ้องตาไม่กะพริบ] ถ้าคุณคิดว่าเงินปิดปากความจริงได้... คุณคิดผิดแล้ว!');
  const [wardrobeSpec, setWardrobeSpec] = useState('ชุดสูททำงานสั่งตัดพิเศษ คัตติ้งเนี้ยบ');

  // Archetypes
  const archetypes = [
    { label: 'ทนาย / สายสืบสวน', role: 'ทนายฝ่ายตรงข้าม & อดีตคนรัก', prompt: 'ทนายสาวเฉียบคมที่เคยเป็นคนรักเก่า ถือหลักฐานลับที่พลิกคดีได้' },
    { label: 'ประธาน / ทายาทตระกูล', role: 'ทายาทตระกูลพันล้านคู่แข่ง', prompt: 'ประธานหนุ่มตระกูลคู่แข่งที่มีแผนการฮุบกิจการและครอบงำตลาด' },
    { label: 'บอดี้การ์ด / มือสังหาร', role: 'บอดี้การ์ดคุ้มกันเงียบขรึม', prompt: 'บอดี้การ์ดอดีตหน่วยรบพิเศษ มีความภักดีสูงแต่เก็บงำอดีตสังหาร' },
    { label: 'ตัวร้าย / บอสเงามืด', role: 'ผู้บงการระดับสูงในเงามืด', prompt: 'บอสใหญ่ผู้มีอิทธิพลเหนือกฎหมาย ควบคุมกลไกธุรกิจสีเทา' },
    { label: 'แพทย์นิติเวช / ผู้ช่วย', role: 'แพทย์นิติเวชที่ปรึกษาลับ', prompt: 'แพทย์สาวเพื่อนสนิทที่ตรวจพบร่องรอยการฆาตกรรมอำพราง' }
  ];

  const handleSelectModel = (modelId) => {
    setSelectedModel(modelId);
    setSelectedOpenRouterModel(modelId);
  };

  const handleSaveApiKey = () => {
    setOpenRouterApiKey(apiKeyInput);
    setApiSaveNotice('บันทึก OpenRouter API Key เรียบร้อยแล้ว!');
    setTimeout(() => {
      setApiSaveNotice('');
      setShowApiSettings(false);
    }, 1800);
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGenNotice('');

    try {
      const char = await generateCharacterProfile({
        prompt: promptText,
        role: role,
        archetype: selectedArchetype,
        series: series,
        modelId: selectedModel
      });

      setName(char.name);
      setRole(char.role);
      setDescription(char.description);
      setActingStyle(char.actingStyle);
      setActorSeed(char.actorSeed);
      setLoraModel(char.loraModel);
      setFaceLockAccuracy(char.faceLockAccuracy);
      setPortraitUrl(char.portrait);
      setVoiceId(char.voiceProfile?.voiceId || 'TH-Fem-Deep-02');
      setVoiceTone(char.voiceProfile?.tone || 'คมชัด เยือกเย็น');
      setSampleLine(char.voiceProfile?.sampleLine || '');
      setWardrobeSpec(char.wardrobeSpec || '');

      setGenNotice(`AI (${OPENROUTER_MODELS.find(m => m.id === selectedModel)?.name || 'OpenRouter'}) สร้างตัวละคร "${char.name.split('/')[0]}" สำเร็จ!`);
      setTimeout(() => setGenNotice(''), 4500);
    } catch (err) {
      console.error(err);
      setGenNotice('เกิดข้อผิดพลาดในการสร้างตัวละคร กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('กรุณากรอกชื่อตัวละคร');
      return;
    }

    const newChar = {
      id: `char-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'ตัวละครใหม่ (New Character)',
      actorSeed: Number(actorSeed),
      loraModel: loraModel.trim() || 'Default_Lead_V1.safetensors',
      loraWeight: 0.88,
      faceLockAccuracy: faceLockAccuracy || '98.8%',
      portrait: portraitUrl,
      sheetImage: '/assets/rin_sheet.jpg',
      extremeActingImage: portraitUrl,
      actingStyle: actingStyle.trim(),
      voiceProfile: {
        voiceId: voiceId,
        tone: voiceTone,
        pitch: '-1 semitones',
        speed: '1.0x',
        breathIntensity: '0.40',
        sampleLine: sampleLine
      },
      wardrobeSpec: wardrobeSpec,
      description: description,
      expressionMatrix: [
        { label: 'Neutral', status: 'Locked 100%' },
        { label: 'High Tension', status: 'Locked 98.8%' },
        { label: 'Emotional', status: 'Locked 97.5%' }
      ],
      facsControls: {
        browInnerRaiser: 0.80,
        browLowerer: 0.70,
        lipTremor: 0.65,
        tearWelling: 0.60,
        pupilDilation: 0.85,
        jawTension: 0.80
      }
    };

    onSaveCharacter(newChar);
    onClose();
  };

  const currentModelObj = OPENROUTER_MODELS.find(m => m.id === selectedModel) || OPENROUTER_MODELS[0];

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
          background: 'rgba(25, 20, 15, 0.6)',
          backdropFilter: 'blur(5px)'
        }}
      />

      {/* Modal Dialog */}
      <div
        className="clay-card animate-fade-in"
        style={{
          position: 'relative',
          zIndex: 1,
          background: '#FFFFFF',
          maxWidth: '840px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(220, 215, 205, 0.8)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Header */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-teal-btn)'
            }}>
              <UserPlus size={20} strokeWidth={2.5} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>
                เพิ่มตัวละครใหม่ในเรื่อง (Add Character)
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                สำหรับเรื่อง: <strong style={{ color: 'var(--teal-primary)' }}>{series?.title || 'ซีรีส์ปัจจุบัน'}</strong> &bull; ขับเคลื่อนด้วย OpenRouter AI Multi-Model
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* OpenRouter API Settings Toggle */}
            <button
              type="button"
              onClick={() => setShowApiSettings(!showApiSettings)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                borderRadius: 'var(--radius-pill)',
                background: apiKeyInput ? 'rgba(31, 122, 89, 0.1)' : 'var(--bg-inset)',
                border: apiKeyInput ? '1.5px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                color: apiKeyInput ? 'var(--accent-green)' : 'var(--teal-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
              title="ตั้งค่า OpenRouter API Key"
            >
              <Key size={13} strokeWidth={2} />
              <span>{apiKeyInput ? 'OpenRouter Connected' : 'ตั้งค่า OpenRouter API'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: '4px' }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* OPENROUTER API KEY DRAWER (EXPANDABLE) */}
          {showApiSettings && (
            <div style={{
              background: 'var(--bg-inset)',
              border: '1.5px solid var(--teal-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Key size={14} />
                  <span>การตั้งค่า OpenRouter API (เชื่อมต่อ AI ได้กว่า 200+ โมเดล)</span>
                </strong>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noreferrer"
                  style={{ fontSize: '0.74rem', color: 'var(--teal-primary)', textDecoration: 'underline', display: 'flex', alignItems: 'center', gap: '3px' }}
                >
                  <span>รับ API Key จาก OpenRouter</span>
                  <ExternalLink size={11} />
                </a>
              </div>
              <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                หากยังไม่ได้เตรียม API Key ระบบจะใช้ <strong>Smart Vertical Drama Simulation Engine</strong> ในการสร้างตัวละครให้คุณทดสอบได้ทันที เมื่อคุณมี Key เพียงนำมาใส่ที่นี่
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="วาง OpenRouter API Key (sk-or-v1-...)"
                  className="clay-input"
                  style={{ flex: 1, fontSize: '0.82rem', fontFamily: 'monospace' }}
                />
                <button
                  type="button"
                  onClick={handleSaveApiKey}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.8rem' }}
                >
                  บันทึก Key
                </button>
              </div>
              {apiSaveNotice && (
                <div style={{ fontSize: '0.75rem', color: 'var(--accent-green)', fontWeight: 700 }}>
                  ✓ {apiSaveNotice}
                </div>
              )}
            </div>
          )}

          {/* 1. OPENROUTER AI CHARACTER GENERATOR BOX */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(11, 74, 81, 0.05) 0%, rgba(204, 185, 150, 0.12) 100%)',
            border: '1.5px solid var(--teal-primary)',
            borderRadius: 'var(--radius-lg)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color="var(--teal-primary)" />
                <strong style={{ fontSize: '0.92rem', color: 'var(--teal-primary)' }}>
                  ให้ AI ช่วยคิดและสร้างโปรไฟล์ตัวละครอัตโนมัติ (OpenRouter)
                </strong>
              </div>

              {/* Model Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>โมเดล AI:</span>
                <select
                  value={selectedModel}
                  onChange={(e) => handleSelectModel(e.target.value)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    border: '1px solid var(--border-subtle)',
                    background: '#FFFFFF',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: 'var(--teal-primary)',
                    cursor: 'pointer'
                  }}
                >
                  {OPENROUTER_MODELS.map(m => (
                    <option key={m.id} value={m.id}>
                      {m.name} ({m.company})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              กำลังเลือกใช้: <strong>{currentModelObj.name}</strong> &bull; <span style={{ color: 'var(--accent-amber)' }}>{currentModelObj.badge}</span>
            </p>

            {/* Quick Archetype Pills */}
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {archetypes.map(arc => (
                <button
                  key={arc.label}
                  type="button"
                  onClick={() => {
                    setSelectedArchetype(arc.label);
                    setRole(arc.role);
                    setPromptText(arc.prompt);
                  }}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    border: selectedArchetype === arc.label ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                    background: selectedArchetype === arc.label ? 'var(--teal-subtle)' : '#FFFFFF',
                    color: selectedArchetype === arc.label ? 'var(--teal-primary)' : 'var(--text-main)',
                    fontSize: '0.72rem',
                    fontWeight: selectedArchetype === arc.label ? 700 : 500,
                    cursor: 'pointer'
                  }}
                >
                  + {arc.label}
                </button>
              ))}
            </div>

            {/* Prompt Input & Action */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="ระบุไอเดียหรือปมตัวละคร เช่น ทนายสาวคู่แข่งที่รู้ความลับตระกูล, บอดี้การ์ดอารักขาสุดเหี้ยม..."
                className="clay-input"
                style={{ flex: 1, fontSize: '0.84rem' }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />

              <button
                type="button"
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '0.84rem', whiteSpace: 'nowrap' }}
              >
                {isGenerating ? <RefreshCw size={15} className="animate-spin" /> : <Sparkles size={15} />}
                <span>{isGenerating ? 'AI กำลังคิด...' : '✨ สร้างตัวละครทันที'}</span>
              </button>
            </div>

            {genNotice && (
              <div style={{
                padding: '6px 12px',
                borderRadius: '6px',
                background: 'rgba(31, 122, 89, 0.1)',
                border: '1px solid var(--accent-green)',
                color: 'var(--accent-green)',
                fontSize: '0.76rem',
                fontWeight: 700
              }}>
                ✓ {genNotice}
              </div>
            )}
          </div>

          {/* 2. CHARACTER FORM DETAILS */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              {/* Character Name */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  ชื่อตัวละคร (ภาษาไทย / อังกฤษ) *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="เช่น พิมพ์ดาว วัฒนกิจ / Phimdara (Dao)"
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.84rem' }}
                />
              </div>

              {/* Role */}
              <div>
                <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  บทบาทในเรื่อง (Role)
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="เช่น ทนายฝ่ายตรงข้าม / บอดี้การ์ด / ตัวร้ายมหาเศรษฐี"
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.84rem' }}
                />
              </div>
            </div>

            {/* Acting Style */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                สไตล์การแสดง (Acting Style)
              </label>
              <input
                type="text"
                value={actingStyle}
                onChange={(e) => setActingStyle(e.target.value)}
                placeholder="เช่น Method Acting — สื่ออารมณ์ผ่านแววตาและกล้ามเนื้อใบหน้า"
                className="clay-input"
                style={{ width: '100%', fontSize: '0.82rem' }}
              />
            </div>

            {/* Description & Lore */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                ประวัติ ปมขัดแย้ง และแรงขับเคลื่อน (Description & Lore)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ภูมิหลัง ปมความแค้น หรือเป้าหมายหลักของตัวละครในซีรีส์นี้..."
                className="clay-input"
                style={{ width: '100%', fontSize: '0.82rem', resize: 'vertical' }}
              />
            </div>

            {/* Avatar Portrait Selection */}
            <div>
              <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                เลือกภาพอวตาร / พอร์ตเทรตตัวละคร (Avatar Portrait)
              </label>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                {PRESET_AVATARS.map(avatar => {
                  const isSelected = portraitUrl === avatar.url;
                  return (
                    <div
                      key={avatar.id}
                      onClick={() => setPortraitUrl(avatar.url)}
                      style={{
                        cursor: 'pointer',
                        padding: '4px',
                        borderRadius: '8px',
                        border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        background: isSelected ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <img
                        src={avatar.url}
                        alt={avatar.label}
                        style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }}
                      />
                      <span style={{ fontSize: '0.65rem', color: isSelected ? 'var(--teal-primary)' : 'var(--text-muted)', fontWeight: isSelected ? 700 : 500 }}>
                        {avatar.label.split('/')[0]}
                      </span>
                    </div>
                  );
                })}

                <div style={{ flex: 1, minWidth: '200px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>
                    หรือระบุ URL รูปภาพเอง:
                  </span>
                  <input
                    type="text"
                    value={portraitUrl}
                    onChange={(e) => setPortraitUrl(e.target.value)}
                    placeholder="https://... หรือ /assets/..."
                    className="clay-input"
                    style={{ width: '100%', fontSize: '0.78rem' }}
                  />
                </div>
              </div>
            </div>

            {/* Voice Profile & LoRA consistency grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', background: 'var(--bg-inset)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>Actor Seed (Locked):</label>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <input
                    type="number"
                    value={actorSeed}
                    onChange={(e) => setActorSeed(Number(e.target.value))}
                    className="clay-input"
                    style={{ width: '100%', fontSize: '0.78rem' }}
                  />
                  <button
                    type="button"
                    onClick={() => setActorSeed(77100000 + Math.floor(Math.random() * 899999))}
                    className="btn-secondary"
                    style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                    title="สุ่ม Seed ใหม่"
                  >
                    🎲
                  </button>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>LoRA Consistent Model:</label>
                <input
                  type="text"
                  value={loraModel}
                  onChange={(e) => setLoraModel(e.target.value)}
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>Face-Lock Accuracy:</label>
                <input
                  type="text"
                  value={faceLockAccuracy}
                  onChange={(e) => setFaceLockAccuracy(e.target.value)}
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                />
              </div>
            </div>

            {/* Voice Line Sample */}
            <div style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>โทนเสียง (Voice Tone):</label>
                <input
                  type="text"
                  value={voiceTone}
                  onChange={(e) => setVoiceTone(e.target.value)}
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>ประโยคตัวอย่างพากย์เสียง (Sample Dialogue):</label>
                <input
                  type="text"
                  value={sampleLine}
                  onChange={(e) => setSampleLine(e.target.value)}
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.78rem' }}
                />
              </div>
            </div>

            {/* Footer Buttons */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              gap: '12px',
              borderTop: '1px solid var(--border-subtle)',
              paddingTop: '14px',
              marginTop: '4px'
            }}>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary"
                style={{ padding: '8px 18px', fontSize: '0.85rem' }}
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 24px',
                  fontSize: '0.88rem',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-teal-btn)'
                }}
              >
                <Check size={16} strokeWidth={2.5} />
                <span>บันทึกตัวละครลงในเรื่อง</span>
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
