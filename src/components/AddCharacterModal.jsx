import React, { useState, useEffect } from 'react';
import { 
  X, Sparkles, User, UserPlus, Check, RefreshCw, Key, ShieldCheck, 
  Layers, Volume2, Sliders, ExternalLink, AlertCircle, Eye, Lock,
  Dice5, Edit3, HeartPulse, Palette, MessageSquare, Image, CheckCircle2,
  Square
} from 'lucide-react';
import { 
  OPENROUTER_MODELS, 
  PRESET_AVATARS, 
  getOpenRouterApiKey, 
  getSelectedOpenRouterModel, 
  generateCharacterProfile
} from '../utils/openRouter';

export default function AddCharacterModal({ 
  isOpen, 
  onClose, 
  onSaveCharacter, 
  series, 
  characterToEdit = null, 
  mode = 'create' 
}) {
  if (!isOpen) return null;

  const isEditMode = mode === 'edit' && characterToEdit != null;

  // Active Tab: 'identity' | 'facelock' | 'wardrobe' | 'facs' | 'voice' | 'media' | 'ai'
  const [activeModalTab, setActiveModalTab] = useState(isEditMode ? 'identity' : 'ai');

  // AI Prompt State
  const [selectedModel, setSelectedModel] = useState(getSelectedOpenRouterModel());
  const [promptText, setPromptText] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genNotice, setGenNotice] = useState('');

  // 1. Identity & Role
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [age, setAge] = useState('28');
  const [gender, setGender] = useState('หญิง (Female)');
  const [occupation, setOccupation] = useState('ทนายความสายสืบสวน');
  const [description, setDescription] = useState('');
  const [coreConflict, setCoreConflict] = useState('ทวงความยุติธรรมให้ครอบครัว VS พันธสัญญาความรักกับศัตรู');
  const [fatalFlaw, setFatalFlaw] = useState('ดื้อรั้น ไม่ยอมปล่อยวางอดีต มักเอาตัวเข้าแลกอันตรายโดยไม่คิดถึงตนเอง');
  const [relationshipNotes, setRelationshipNotes] = useState('คู่ปรับและศัตรูทางสายเลือดที่ไม่อาจต้านทานแรงดึงดูด');

  // 2. Face-Lock & Prompts
  const [actorSeed, setActorSeed] = useState(77100000);
  const [loraModel, setLoraModel] = useState('Custom_Char_V1_fp16.safetensors');
  const [loraWeight, setLoraWeight] = useState(0.88);
  const [faceLockAccuracy, setFaceLockAccuracy] = useState('98.8%');
  const [positiveAnchorPrompt, setPositiveAnchorPrompt] = useState('(face_anchor:1.2), sharp jawline, intense cinematic gaze, high cheekbones, 8k vertical portrait, highly detailed facial features');
  const [negativeGuardPrompt, setNegativeGuardPrompt] = useState('face drift, deformed eyes, extra fingers, blurry facial features, costume inconsistency, low resolution');

  // 3. Wardrobe & Continuity
  const [wardrobeSpec, setWardrobeSpec] = useState('สูทเข้ารูปสีกรมท่า (Navy Wool Suit), เชิ้ตขาวผ้าไหม, ต่างหูมุกเรียบหรู');
  const [fabricCutting, setFabricCutting] = useState('Wool 120s / Matte Silk Lapel');
  const [lapelButtons, setLapelButtons] = useState('Double-Breasted 4-Button / Peak Lapel');
  const [accessoriesProps, setAccessoriesProps] = useState('Silver Pearl Earrings, แฟ้มคดีลับ, นาฬิกาข้อมือสายหนัง');
  const [colorPalette, setColorPalette] = useState('Navy Blue (#0B4A51), Silk White (#FAF7F2), Silver Accent');

  // 4. Acting & FACS
  const [actingStyle, setActingStyle] = useState('Method Acting — สื่ออารมณ์ผ่านแววตาและกล้ามเนื้อใบหน้ามากกว่าคำพูด');
  const [facs, setFacs] = useState({
    browInnerRaiser: 0.80,
    browLowerer: 0.70,
    lipTremor: 0.65,
    tearWelling: 0.60,
    pupilDilation: 0.85,
    jawTension: 0.75
  });

  // 5. Voice Profile & TTS
  const [voiceId, setVoiceId] = useState('TH-Fem-Deep-02');
  const [voiceTone, setVoiceTone] = useState('คมชัด เยือกเย็น ซ่อนความกดดันและกลั้นน้ำตา');
  const [voicePitch, setVoicePitch] = useState('-2 semitones');
  const [voiceSpeed, setVoiceSpeed] = useState('1.05x');
  const [breathIntensity, setBreathIntensity] = useState('0.45');
  const [microBreathing, setMicroBreathing] = useState('Auto-insert [stifled gasp] and [voice crack] on high tension');
  const [sampleLine, setSampleLine] = useState('[เสียงสั่นเครือ] ถ้าคืนนี้คุณไม่เซ็นรับรอง... ข้อมูลนี้จะถึงมือนักข่าวทุกสำนัก!');
  const [testingVoice, setTestingVoice] = useState(false);

  // 6. Visual Media
  const [portraitUrl, setPortraitUrl] = useState('/assets/rin_portrait.jpg');
  const [sheetImageUrl, setSheetImageUrl] = useState('/assets/rin_sheet.jpg');
  const [extremeActingUrl, setExtremeActingUrl] = useState('/assets/rin_extreme_acting.jpg');

  // Archetypes for quick generation
  const archetypes = [
    { label: 'ทนาย / สายสืบสวน', role: 'ทนายฝ่ายตรงข้าม & อดีตคนรัก', prompt: 'ทนายสาวเฉียบคมที่เคยเป็นคนรักเก่า ถือหลักฐานลับที่พลิกคดีได้' },
    { label: 'ประธาน / ทายาทตระกูล', role: 'ทายาทตระกูลพันล้านคู่แข่ง', prompt: 'ประธานหนุ่มตระกูลคู่แข่งที่มีแผนการฮุบกิจการและครอบงำตลาด' },
    { label: 'บอดี้การ์ด / มือสังหาร', role: 'บอดี้การ์ดคุ้มกันเงียบขรึม', prompt: 'บอดี้การ์ดอดีตหน่วยรบพิเศษ มีความภักดีสูงแต่เก็บงำอดีตสังหาร' },
    { label: 'ตัวร้าย / บอสเงามืด', role: 'ผู้บงการระดับสูงในเงามืด', prompt: 'บอสใหญ่ผู้มีอิทธิพลเหนือกฎหมาย ควบคุมกลไกธุรกิจสีเทา' },
    { label: 'แพทย์นิติเวช / ผู้ช่วย', role: 'แพทย์นิติเวชที่ปรึกษาลับ', prompt: 'แพทย์สาวเพื่อนสนิทที่ตรวจพบร่องรอยการฆาตกรรมอำพราง' },
    { label: 'ทายาทสาวผู้สูญเสีย', role: 'ทายาทสาวตกอับ ปลอมตัวล้างแค้น', prompt: 'คุณหนูทายาทมหาเศรษฐีที่ถูกหักหลังและแย่งสมบัติ ต้องปลอมตัวเข้ามาเป็นคนรับใช้' }
  ];

  // Initialize or reset values when opening
  useEffect(() => {
    if (isOpen) {
      if (isEditMode && characterToEdit) {
        setName(characterToEdit.name || '');
        setRole(characterToEdit.role || '');
        setDescription(characterToEdit.description || '');
        setActingStyle(characterToEdit.actingStyle || 'Method Acting');
        setActorSeed(characterToEdit.actorSeed || (77100000 + Math.floor(Math.random() * 899999)));
        setLoraModel(characterToEdit.loraModel || 'Custom_Char_V1_fp16.safetensors');
        setLoraWeight(characterToEdit.loraWeight ?? 0.88);
        setFaceLockAccuracy(characterToEdit.faceLockAccuracy || '98.8%');
        setPortraitUrl(characterToEdit.portrait || '/assets/rin_portrait.jpg');
        setSheetImageUrl(characterToEdit.sheetImage || '/assets/rin_sheet.jpg');
        setExtremeActingUrl(characterToEdit.extremeActingImage || characterToEdit.portrait || '/assets/rin_extreme_acting.jpg');
        setWardrobeSpec(characterToEdit.wardrobeSpec || '');
        
        if (characterToEdit.voiceProfile) {
          setVoiceId(characterToEdit.voiceProfile.voiceId || 'TH-Fem-Deep-02');
          setVoiceTone(characterToEdit.voiceProfile.tone || '');
          setVoicePitch(characterToEdit.voiceProfile.pitch || '-1 semitones');
          setVoiceSpeed(characterToEdit.voiceProfile.speed || '1.0x');
          setBreathIntensity(characterToEdit.voiceProfile.breathIntensity || '0.40');
          setMicroBreathing(characterToEdit.voiceProfile.microBreathing || '');
          setSampleLine(characterToEdit.voiceProfile.sampleLine || '');
        }

        if (characterToEdit.facsControls) {
          setFacs(characterToEdit.facsControls);
        }

        if (characterToEdit.positiveAnchorPrompt) setPositiveAnchorPrompt(characterToEdit.positiveAnchorPrompt);
        if (characterToEdit.negativeGuardPrompt) setNegativeGuardPrompt(characterToEdit.negativeGuardPrompt);
        if (characterToEdit.relationshipNotes) setRelationshipNotes(characterToEdit.relationshipNotes);
        if (characterToEdit.colorPalette) setColorPalette(characterToEdit.colorPalette);

        setActiveModalTab('identity');
      } else {
        // Create mode default
        setName('');
        setRole('');
        setDescription('');
        setActorSeed(77100000 + Math.floor(Math.random() * 899999));
        setPortraitUrl('/assets/rin_portrait.jpg');
        setSheetImageUrl('/assets/rin_sheet.jpg');
        setExtremeActingUrl('/assets/rin_extreme_acting.jpg');
        setActiveModalTab('ai');
      }
      setGenNotice('');
      setTestingVoice(false);
    }
  }, [isOpen, characterToEdit, isEditMode]);

  // Clean text for speech synthesis
  const cleanSpeechText = (txt) => (txt || '').replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim() || txt;

  const handleTestModalVoice = () => {
    if (typeof window === 'undefined') return;

    if (testingVoice) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setTestingVoice(false);
      return;
    }

    const textToSpeak = cleanSpeechText(sampleLine) || 'นี่คือการทดสอบเสียงของตัวละครในระบบ';
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

      if (voicePitch.includes('-4')) utterance.pitch = 0.75;
      else if (voicePitch.includes('-2')) utterance.pitch = 0.88;
      else if (voicePitch.includes('+')) utterance.pitch = 1.25;
      else utterance.pitch = 1.0;

      const speedVal = parseFloat(voiceSpeed);
      if (!isNaN(speedVal)) utterance.rate = speedVal;

      utterance.onstart = () => setTestingVoice(true);
      utterance.onend = () => setTestingVoice(false);
      utterance.onerror = () => setTestingVoice(false);

      window.speechSynthesis.speak(utterance);
      setTestingVoice(true);
    } else {
      setTestingVoice(true);
      setTimeout(() => setTestingVoice(false), 2000);
    }
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
      setSheetImageUrl(char.sheetImage || '/assets/rin_sheet.jpg');
      setExtremeActingUrl(char.extremeActingImage || char.portrait);
      setWardrobeSpec(char.wardrobeSpec || '');

      if (char.voiceProfile) {
        setVoiceId(char.voiceProfile.voiceId || 'TH-Fem-Deep-02');
        setVoiceTone(char.voiceProfile.tone || 'คมชัด เยือกเย็น');
        setSampleLine(char.voiceProfile.sampleLine || '');
        setVoicePitch(char.voiceProfile.pitch || '-1 semitones');
        setVoiceSpeed(char.voiceProfile.speed || '1.0x');
      }

      if (char.facsControls) {
        setFacs(char.facsControls);
      }

      setGenNotice(`AI สร้างตัวละคร "${char.name.split('/')[0]}" ครบถ้วนแล้ว! สามารถตรวจสอบและปรับแต่งในแต่ละแท็บได้`);
      setActiveModalTab('identity');
    } catch (err) {
      console.error(err);
      setGenNotice('เกิดข้อผิดพลาดในการสร้างตัวละคร กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomSeed = () => {
    setActorSeed(77100000 + Math.floor(Math.random() * 899999));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('กรุณากรอกชื่อตัวละคร');
      setActiveModalTab('identity');
      return;
    }

    const savedCharacter = {
      id: isEditMode && characterToEdit?.id ? characterToEdit.id : `char-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'ตัวละครในเรื่อง (Supporting Cast)',
      actorSeed: Number(actorSeed),
      loraModel: loraModel.trim() || 'Default_Character_V1.safetensors',
      loraWeight: Number(loraWeight),
      faceLockAccuracy: faceLockAccuracy || '98.8%',
      portrait: portraitUrl,
      sheetImage: sheetImageUrl,
      extremeActingImage: extremeActingUrl,
      actingStyle: actingStyle.trim(),
      description: description.trim(),
      age: age.trim(),
      gender: gender.trim(),
      occupation: occupation.trim(),
      coreConflict: coreConflict.trim(),
      fatalFlaw: fatalFlaw.trim(),
      relationshipNotes: relationshipNotes.trim(),
      colorPalette: colorPalette.trim(),
      positiveAnchorPrompt: positiveAnchorPrompt.trim(),
      negativeGuardPrompt: negativeGuardPrompt.trim(),
      wardrobeSpec: wardrobeSpec.trim(),
      fabricCutting: fabricCutting.trim(),
      lapelButtons: lapelButtons.trim(),
      accessoriesProps: accessoriesProps.trim(),
      voiceProfile: {
        voiceId: voiceId,
        tone: voiceTone,
        pitch: voicePitch,
        speed: voiceSpeed,
        breathIntensity: breathIntensity,
        microBreathing: microBreathing,
        sampleLine: sampleLine
      },
      expressionMatrix: characterToEdit?.expressionMatrix || [
        { label: 'Neutral (สุขุม)', status: 'Locked 100%' },
        { label: 'High Tension (กดดัน)', status: 'Locked 98.8%' },
        { label: 'Emotional / Grief (สะเทือนใจ)', status: 'Locked 97.9%' },
        { label: 'Climax / Confront (เผชิญหน้า)', status: 'Locked 98.5%' }
      ],
      facsControls: { ...facs }
    };

    onSaveCharacter(savedCharacter);
    onClose();
  };

  const modalTabs = [
    { id: 'ai', label: '1. AI Generator', icon: Sparkles },
    { id: 'identity', label: '2. อัตลักษณ์ & ปูมหลัง', icon: User },
    { id: 'facelock', label: '3. Face-Lock & Prompts', icon: ShieldCheck },
    { id: 'wardrobe', label: '4. คอสตูม & ความต่อเนื่อง', icon: Layers },
    { id: 'facs', label: '5. การแสดง & FACS', icon: HeartPulse },
    { id: 'voice', label: '6. เสียงพากย์ & TTS', icon: Volume2 },
    { id: 'media', label: '7. รูปภาพ & Sheet', icon: Image }
  ];

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
          background: 'rgba(25, 20, 15, 0.65)',
          backdropFilter: 'blur(6px)'
        }}
      />

      {/* Modal Dialog */}
      <div
        className="clay-card animate-fade-in"
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'var(--bg-surface)',
          maxWidth: '920px',
          width: '100%',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--shadow-raised)',
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid var(--border-subtle)'
        }}
      >
        {/* Top Header */}
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
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: isEditMode ? 'var(--teal-primary)' : 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-teal-btn)'
            }}>
              {isEditMode ? <Edit3 size={20} strokeWidth={2.5} /> : <UserPlus size={20} strokeWidth={2.5} />}
            </div>
            <div>
              <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>
                {isEditMode ? `แก้ไขข้อมูลตัวละคร: ${name.split('/')[0] || characterToEdit?.name || 'ตัวละคร'}` : 'เพิ่มตัวละครใหม่ในเรื่อง (Add Character)'}
              </h2>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                ซีรีส์: <strong style={{ color: 'var(--teal-primary)' }}>{series?.title || 'ซีรีส์ปัจจุบัน'}</strong> &bull; สเปกระดับพรีเมียม 9:16 Vertical Drama
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '8px'
              }}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '8px 16px',
          background: 'var(--bg-inset)',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}>
          {modalTabs.map(t => {
            const isActive = activeModalTab === t.id;
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setActiveModalTab(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '7px 12px',
                  borderRadius: 'var(--radius-pill)',
                  background: isActive ? 'var(--bg-raised)' : 'transparent',
                  border: isActive ? '1px solid var(--border-subtle)' : '1px solid transparent',
                  color: isActive ? 'var(--teal-primary)' : 'var(--text-muted)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? 'var(--shadow-raised-sm)' : 'none'
                }}
              >
                <Icon size={14} strokeWidth={2} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
          <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {genNotice && (
              <div style={{
                padding: '10px 16px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-green-bg)',
                color: 'var(--accent-green)',
                border: '1px solid rgba(31, 122, 89, 0.3)',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <CheckCircle2 size={16} />
                <span>{genNotice}</span>
              </div>
            )}

            {/* TAB 1: AI GENERATOR */}
            {activeModalTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-inset)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-inset)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <strong style={{ fontSize: '0.88rem', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={16} />
                      ให้ AI ช่วยสร้างตัวละครพร้อมรายละเอียดทั้งระบบใน 1 คลิก
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      โมเดล: {OPENROUTER_MODELS.find(m => m.id === selectedModel)?.name || 'Claude 3.5 Sonnet'}
                    </span>
                  </div>

                  <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, margin: '0 0 12px 0' }}>
                    ป้อนไอเดียหรือเลือก Archetype บทบาท เพื่อให้ AI คิดค้นชื่อ ประวัติ ปูมหลัง ปมดราม่า สเปกเสื้อผ้า โทนเสียง และค่ากล้ามเนื้อใบหน้า FACS ให้โดยอัตโนมัติ
                  </p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '12px' }}>
                    {archetypes.map((arch, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setSelectedArchetype(arch.label);
                          setPromptText(arch.prompt);
                          setRole(arch.role);
                        }}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-pill)',
                          border: selectedArchetype === arch.label ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                          background: selectedArchetype === arch.label ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                          color: selectedArchetype === arch.label ? 'var(--teal-primary)' : 'var(--text-main)',
                          fontSize: '0.74rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {arch.label}
                      </button>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={promptText}
                      onChange={(e) => setPromptText(e.target.value)}
                      placeholder="เช่น: ทายาทสาวตระกูลดังที่ถูกลักพาตัวในวัยเด็ก เติบโตมาเป็นแฮกเกอร์สายเทา มีแววตามุ่งมั่นไม่ไว้ใจใคร..."
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                        fontSize: '0.85rem'
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="btn-primary"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap' }}
                    >
                      <RefreshCw size={15} className={isGenerating ? 'animate-spin' : ''} />
                      <span>{isGenerating ? 'AI กำลังสร้าง...' : 'สร้างตัวละครทันที'}</span>
                    </button>
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  💡 <em>เมื่อกดสร้างเสร็จแล้ว ข้อมูลจะถูกกระจายลงแท็บ 2 ถึง 7 (อัตลักษณ์, Face-Lock, คอสตูม, FACS, เสียงพากย์) โดยอัตโนมัติ ซึ่งคุณสามารถตรวจสอบและปรับแก้ต่อได้ตามต้องการ</em>
                </div>
              </div>
            )}

            {/* TAB 2: IDENTITY & BACKSTORY */}
            {activeModalTab === 'identity' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ชื่อตัวละคร (ไทย / อังกฤษ หรือ ฉายา) *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="เช่น: ริน ลลิตา / Yuna Kim (Rin)"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1.5px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: 'var(--text-main)'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    บทบาทหน้าที่ในเรื่อง (Story Role)
                  </label>
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="เช่น: ตัวเอกหญิง (Protagonist) - ทนายสาวสายสืบสวน"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.84rem'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      อายุ (Age)
                    </label>
                    <input
                      type="text"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="28"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      เพศ (Gender)
                    </label>
                    <input
                      type="text"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      placeholder="หญิง / ชาย"
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                        fontSize: '0.84rem'
                      }}
                    />
                  </div>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ประวัติภูมิหลัง & บุคลิกภาพเชิงลึก (Backstory & Psychological Profile)
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="ภูมิหลัง ปูมความแค้นในอดีต จุดอ่อน และแรงขับเคลื่อนที่ทำให้ตัวละครนี้ยอมเสี่ยงชีวิต..."
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.82rem',
                      lineHeight: 1.4,
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ปมขัดแย้งหลัก (Core Conflict)
                  </label>
                  <input
                    type="text"
                    value={coreConflict}
                    onChange={(e) => setCoreConflict(e.target.value)}
                    placeholder="ความจริงเรื่องพ่อ VS ความรู้สึกที่มีต่อศัตรู"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    จุดอ่อนร้ายแรง / ข้อบกพร่อง (Fatal Flaw)
                  </label>
                  <input
                    type="text"
                    value={fatalFlaw}
                    onChange={(e) => setFatalFlaw(e.target.value)}
                    placeholder="ความทะนงตน และ ไม่ยอมขอความช่วยเหลือจากใคร"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ความสัมพันธ์กับตัวละครอื่น (Relationship Dynamics)
                  </label>
                  <input
                    type="text"
                    value={relationshipNotes}
                    onChange={(e) => setRelationshipNotes(e.target.value)}
                    placeholder="คู่ปรับทางจิตวิทยาที่ไม่มีใครยอมใครกับทาดาโอะ / ไว้วางใจหมอพิมเป็นคนเดียว"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.82rem'
                    }}
                  />
                </div>
              </div>
            )}

            {/* TAB 3: FACE-LOCK & PROMPTS */}
            {activeModalTab === 'facelock' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{
                  padding: '16px',
                  background: 'var(--bg-inset)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '12px'
                }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>Actor Fixed Seed *</span>
                      <button
                        type="button"
                        onClick={handleRandomSeed}
                        style={{ background: 'transparent', border: 'none', color: 'var(--teal-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px', fontSize: '0.72rem' }}
                      >
                        <Dice5 size={13} />
                        <span>สุ่มใหม่</span>
                      </button>
                    </label>
                    <input
                      type="number"
                      value={actorSeed}
                      onChange={(e) => setActorSeed(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem', fontFamily: 'monospace' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      LoRA Consistency Model
                    </label>
                    <input
                      type="text"
                      value={loraModel}
                      onChange={(e) => setLoraModel(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem', fontFamily: 'monospace' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span>LoRA Weight:</span>
                      <strong style={{ color: 'var(--teal-primary)' }}>{loraWeight}</strong>
                    </label>
                    <input
                      type="range"
                      min="0.4"
                      max="1.0"
                      step="0.02"
                      value={loraWeight}
                      onChange={(e) => setLoraWeight(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer', marginTop: '6px' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Positive Anchor Prompt Tokens (คำสั่งล็อกโครงหน้า โครงกระดูก และทรงผม)
                  </label>
                  <textarea
                    rows={3}
                    value={positiveAnchorPrompt}
                    onChange={(e) => setPositiveAnchorPrompt(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.8rem', fontFamily: 'monospace', resize: 'vertical' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    * โทเคนเหล่านี้จะถูกใส่เข้าไปในทุกช็อตของตัวละครนี้ เพื่อให้ Midjourney / Stable Diffusion เจนเนอเรตหน้าเหมือนเดิม 100%
                  </span>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    Negative Guard Prompt Tokens (คำสั่งป้องกันใบหน้าเพี้ยน)
                  </label>
                  <textarea
                    rows={2}
                    value={negativeGuardPrompt}
                    onChange={(e) => setNegativeGuardPrompt(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.8rem', fontFamily: 'monospace', resize: 'vertical' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 4: WARDROBE & CONTINUITY */}
            {activeModalTab === 'wardrobe' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    สเปกชุดเครื่องแต่งกายหลัก (Episode Wardrobe Spec)
                  </label>
                  <input
                    type="text"
                    value={wardrobeSpec}
                    onChange={(e) => setWardrobeSpec(e.target.value)}
                    placeholder="เช่น: สูทเข้ารูปสีกรมท่า (Navy Wool Suit), เชิ้ตขาวผ้าไหม, ต่างหูมุกเรียบหรู"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    เนื้อผ้า & การตัดเย็บ (Fabric & Cutting)
                  </label>
                  <input
                    type="text"
                    value={fabricCutting}
                    onChange={(e) => setFabricCutting(e.target.value)}
                    placeholder="Wool 120s / Matte Silk Lapel"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ทรงปก & กระดุม (Lapel & Buttons)
                  </label>
                  <input
                    type="text"
                    value={lapelButtons}
                    onChange={(e) => setLapelButtons(e.target.value)}
                    placeholder="Peak Lapel / Double-Breasted 4-Button"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    เครื่องประดับ & อุปกรณ์ประจำตัว (Accessories & Props)
                  </label>
                  <input
                    type="text"
                    value={accessoriesProps}
                    onChange={(e) => setAccessoriesProps(e.target.value)}
                    placeholder="Silver Pearl Earrings, แฟ้มคดีลับ, นาฬิกาข้อมือ"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    โทนสีประจำตัวละคร (Character Color Palette)
                  </label>
                  <input
                    type="text"
                    value={colorPalette}
                    onChange={(e) => setColorPalette(e.target.value)}
                    placeholder="Navy Blue (#0B4A51), Silk White (#FAF7F2)"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 5: ACTING & FACS */}
            {activeModalTab === 'facs' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    สไตล์การแสดง (Acting Style Specification)
                  </label>
                  <input
                    type="text"
                    value={actingStyle}
                    onChange={(e) => setActingStyle(e.target.value)}
                    placeholder="Method Acting — อารมณ์ดิบ ลึกซึ้ง แสดงออกทางสายตาและกล้ามเนื้อใบหน้ามากกว่าคำพูด"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem' }}
                  />
                </div>

                <div style={{
                  padding: '16px',
                  background: 'var(--bg-inset)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px'
                }}>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <HeartPulse size={16} />
                    FACS Facial Micro-Expression Vector Tuning
                  </strong>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '2px' }}>
                        <span>AU1 หัวคิ้วยกขึ้น (Brow Inner Raiser):</span>
                        <strong>{Math.round(facs.browInnerRaiser * 100)}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={facs.browInnerRaiser}
                        onChange={(e) => setFacs({ ...facs, browInnerRaiser: parseFloat(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '2px' }}>
                        <span>AU4 ขมวดคิ้วแน่น (Brow Lowerer):</span>
                        <strong>{Math.round(facs.browLowerer * 100)}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={facs.browLowerer}
                        onChange={(e) => setFacs({ ...facs, browLowerer: parseFloat(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '2px' }}>
                        <span>AU20 ริมฝีปากล่างสั่นระริก (Lip Tremor):</span>
                        <strong style={{ color: 'var(--accent-red)' }}>{Math.round(facs.lipTremor * 100)}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={facs.lipTremor}
                        onChange={(e) => setFacs({ ...facs, lipTremor: parseFloat(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--accent-red)' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '2px' }}>
                        <span>AU43 น้ำตาคลอเบ้า (Tear Welling):</span>
                        <strong style={{ color: 'var(--teal-primary)' }}>{Math.round(facs.tearWelling * 100)}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={facs.tearWelling}
                        onChange={(e) => setFacs({ ...facs, tearWelling: parseFloat(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '2px' }}>
                        <span>ม่านตาขยายตื่นตัว (Pupil Dilation):</span>
                        <strong>{Math.round(facs.pupilDilation * 100)}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={facs.pupilDilation}
                        onChange={(e) => setFacs({ ...facs, pupilDilation: parseFloat(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                      />
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '2px' }}>
                        <span>ขบกรามเกร็งสันนูน (Jaw Muscle Tension):</span>
                        <strong style={{ color: 'var(--accent-amber)' }}>{Math.round(facs.jawTension * 100)}%</strong>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={facs.jawTension}
                        onChange={(e) => setFacs({ ...facs, jawTension: parseFloat(e.target.value) })}
                        style={{ width: '100%', accentColor: 'var(--accent-amber)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: VOICE & TTS */}
            {activeModalTab === 'voice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      Voice ID
                    </label>
                    <input
                      type="text"
                      value={voiceId}
                      onChange={(e) => setVoiceId(e.target.value)}
                      placeholder="TH-Fem-Deep-02"
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      ระดับความทุ้ม/แหลม (Pitch)
                    </label>
                    <select
                      value={voicePitch}
                      onChange={(e) => setVoicePitch(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                    >
                      <option value="-4 semitones">-4 semitones (ทุ้มต่ำมาก บาริโทน)</option>
                      <option value="-2 semitones">-2 semitones (ทุ้มลึก หนักแน่น)</option>
                      <option value="0 semitones">0 semitones (โทนมาตรฐาน)</option>
                      <option value="+2 semitones">+2 semitones (ใส อ่อนโยน)</option>
                      <option value="+4 semitones">+4 semitones (แหลมสูง ตื่นเต้น)</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      ความเร็วการพูด (Speed)
                    </label>
                    <select
                      value={voiceSpeed}
                      onChange={(e) => setVoiceSpeed(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                    >
                      <option value="0.90x">0.90x (เนิบช้า กดดัน เยือกเย็น)</option>
                      <option value="0.95x">0.95x (สุขุม รอบคอบ)</option>
                      <option value="1.0x">1.0x (ความเร็วปกติ)</option>
                      <option value="1.05x">1.05x (ฉะฉาน คล่องแคล่ว)</option>
                      <option value="1.15x">1.15x (รวดเร็ว เร่งด่วน)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    โทนเสียงและคำอธิบาย (Voice Tone Description)
                  </label>
                  <input
                    type="text"
                    value={voiceTone}
                    onChange={(e) => setVoiceTone(e.target.value)}
                    placeholder="คมชัด เยือกเย็น ซ่อนความกดดันและกลั้นน้ำตา"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                  />
                </div>

                <div style={{
                  padding: '16px',
                  background: 'var(--bg-inset)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Volume2 size={16} />
                      บทพูดตัวอย่างสำหรับทดสอบเสียง (Sample Dialogue Line)
                    </label>
                    <button
                      type="button"
                      onClick={handleTestModalVoice}
                      className={testingVoice ? 'btn-secondary' : 'btn-primary'}
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: testingVoice ? 'var(--accent-red-bg)' : undefined,
                        color: testingVoice ? 'var(--accent-red)' : undefined
                      }}
                    >
                      {testingVoice ? <Square size={14} fill="currentColor" /> : <Volume2 size={14} strokeWidth={2} />}
                      <span>{testingVoice ? 'หยุดเสียง' : '🔊 ทดสอบฟังเสียงทันที'}</span>
                    </button>
                  </div>

                  <textarea
                    rows={2}
                    value={sampleLine}
                    onChange={(e) => setSampleLine(e.target.value)}
                    placeholder="[เสียงสั่นเครือ] ถ้าคืนนี้คุณไม่เซ็นรับรอง... ข้อมูลนี้จะถึงมือนักข่าวทุกสำนัก!"
                    style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem', resize: 'vertical' }}
                  />
                </div>
              </div>
            )}

            {/* TAB 7: VISUAL MEDIA */}
            {activeModalTab === 'media' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                    เลือกภาพโปรไฟล์หลัก (Preset Avatars) หรือ กรอก URL รูปภาพ
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '14px' }}>
                    {PRESET_AVATARS.map(av => {
                      const isSel = portraitUrl === av.url;
                      return (
                        <div
                          key={av.id}
                          onClick={() => {
                            setPortraitUrl(av.url);
                            setExtremeActingUrl(av.url);
                          }}
                          style={{
                            border: isSel ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-sm)',
                            padding: '6px',
                            background: isSel ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                            cursor: 'pointer',
                            textAlign: 'center'
                          }}
                        >
                          <img src={av.url} alt={av.label} style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '4px', display: 'block', marginBottom: '4px' }} />
                          <span style={{ fontSize: '0.72rem', color: isSel ? 'var(--teal-primary)' : 'var(--text-muted)', fontWeight: 600 }}>{av.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      URL ภาพหลัก (Main Portrait URL)
                    </label>
                    <input
                      type="text"
                      value={portraitUrl}
                      onChange={(e) => setPortraitUrl(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      URL ภาพแสดงอารมณ์สุดขั้ว (Extreme Acting Portrait)
                    </label>
                    <input
                      type="text"
                      value={extremeActingUrl}
                      onChange={(e) => setExtremeActingUrl(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                      URL ภาพ Turnaround Sheet 4 มุมมอง (Frontal, 45°, Profile, Expression)
                    </label>
                    <input
                      type="text"
                      value={sheetImageUrl}
                      onChange={(e) => setSheetImageUrl(e.target.value)}
                      style={{ width: '100%', padding: '8px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.82rem' }}
                    />
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Actions */}
          <div style={{
            padding: '16px 24px',
            background: 'var(--bg-surface)',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              ยกเลิก
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '0.9rem' }}
              >
                <Check size={18} strokeWidth={2.5} />
                <span>{isEditMode ? 'บันทึกการแก้ไขตัวละคร' : 'เพิ่มตัวละครเข้าสู่โปรเจกต์'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
