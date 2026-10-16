import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Save, X, Sparkles, User, RefreshCw, ShieldCheck, 
  Layers, Volume2, Sliders, HeartPulse, Image, Dice5, Square, 
  CheckCircle2, AlertCircle, Edit3, Trash2, Upload, Copy, Check,
  Film, Video, Eye, Plus, Camera, Palette, CloudRain, Building,
  Wine, Car, Siren, Compass, ArrowRight, Wand2, Star
} from 'lucide-react';
import { 
  OPENROUTER_MODELS, 
  PRESET_AVATARS, 
  getSelectedOpenRouterModel, 
  generateCharacterProfile
} from '../utils/openRouter';

export default function CharacterEditorPage({
  series,
  characterToEdit = null,
  mode = 'create',
  onSave,
  onCancel,
  onDelete
}) {
  const isEditMode = mode === 'edit' && characterToEdit != null;

  // Active Tab: 'identity' | 'facelock' | 'wardrobe' | 'facs' | 'voice' | 'media' | 'promptbg' | 'ai'
  const [activeTab, setActiveTab] = useState(isEditMode ? 'identity' : 'ai');

  // AI Prompt State
  const [selectedModel, setSelectedModel] = useState(getSelectedOpenRouterModel());
  const [promptText, setPromptText] = useState('');
  const [selectedArchetype, setSelectedArchetype] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genNotice, setGenNotice] = useState('');
  const [copyNotice, setCopyNotice] = useState('');

  // 1. Identity & Role
  const [name, setName] = useState(characterToEdit?.name || '');
  const [role, setRole] = useState(characterToEdit?.role || '');
  const [age, setAge] = useState(characterToEdit?.age || '28');
  const [gender, setGender] = useState(characterToEdit?.gender || 'หญิง (Female)');
  const [occupation, setOccupation] = useState(characterToEdit?.occupation || 'ทนายความสายสืบสวน');
  const [description, setDescription] = useState(characterToEdit?.description || '');
  const [coreConflict, setCoreConflict] = useState(characterToEdit?.coreConflict || 'ทวงความยุติธรรมให้ครอบครัว VS พันธสัญญาความรักกับศัตรู');
  const [fatalFlaw, setFatalFlaw] = useState(characterToEdit?.fatalFlaw || 'ดื้อรั้น ไม่ยอมปล่อยวางอดีต มักเอาตัวเข้าแลกอันตรายโดยไม่คิดถึงตนเอง');
  const [relationshipNotes, setRelationshipNotes] = useState(characterToEdit?.relationshipNotes || 'คู่ปรับและศัตรูทางสายเลือดที่ไม่อาจต้านทานแรงดึงดูด');

  // 2. Face-Lock & Prompts
  const [actorSeed, setActorSeed] = useState(characterToEdit?.actorSeed || (77100000 + Math.floor(Math.random() * 899999)));
  const [loraModel, setLoraModel] = useState(characterToEdit?.loraModel || 'Custom_Char_V1_fp16.safetensors');
  const [loraWeight, setLoraWeight] = useState(characterToEdit?.loraWeight ?? 0.88);
  const [faceLockAccuracy, setFaceLockAccuracy] = useState(characterToEdit?.faceLockAccuracy || '98.8%');
  const [positiveAnchorPrompt, setPositiveAnchorPrompt] = useState(
    characterToEdit?.positiveAnchorPrompt || 
    '(face_anchor:1.2), sharp jawline, intense cinematic gaze, high cheekbones, 8k vertical portrait, highly detailed facial features'
  );
  const [negativeGuardPrompt, setNegativeGuardPrompt] = useState(
    characterToEdit?.negativeGuardPrompt || 
    'face drift, deformed eyes, extra fingers, blurry facial features, costume inconsistency, low resolution'
  );

  // 3. Wardrobe Sets per Scene / Episode (คอสตูมแต่ละฉาก)
  const defaultInitialWardrobeSets = [
    {
      id: 'outfit-1',
      name: 'ชุดสูทสีกรมท่าทางการ (Navy Formal Suit)',
      sceneTag: 'EP.01 ฉาก 1-3 (ห้องประชุมสืบคดี)',
      isDefault: true,
      imageUrl: characterToEdit?.portrait || '/assets/rin_portrait.jpg',
      spec: characterToEdit?.wardrobeSpec || 'สูทเข้ารูปสีกรมท่า (Navy Wool Suit), เชิ้ตขาวผ้าไหม, ต่างหูมุกเรียบหรู',
      fabricCutting: characterToEdit?.fabricCutting || 'Wool 120s / Matte Silk Lapel',
      lapelButtons: characterToEdit?.lapelButtons || 'Double-Breasted 4-Button / Peak Lapel',
      accessories: characterToEdit?.accessoriesProps || 'Silver Pearl Earrings, แฟ้มคดีลับ, นาฬิกาข้อมือสายหนัง',
      colorPalette: characterToEdit?.colorPalette || 'Navy Blue (#0B4A51), Silk White (#FAF7F2), Silver Accent',
      promptTokens: 'wearing tailored navy wool double-breasted suit, crisp silk white collared shirt, elegant pearl studs, professional attorney attire',
      negativeTokens: 'casual clothes, t-shirt, mismatched costume, loose buttons, casual jewelry'
    },
    {
      id: 'outfit-2',
      name: 'ชุดกาล่าดินเนอร์แฝงตัว (Black Velvet Evening Gown)',
      sceneTag: 'EP.01 ฉาก 5 (งานเลี้ยงระดมทุนหมื่นล้าน)',
      isDefault: false,
      imageUrl: characterToEdit?.sheetImage || '/assets/rin_sheet.jpg',
      spec: 'เดรสราตรีผ้ากำมะหยี่สีดำผ่าข้าง เรียบหรู เซ็กซี่แต่ลึกลับ คลัตช์หนังสีเงิน',
      fabricCutting: 'Silk Velvet / Asymmetric Halter',
      lapelButtons: 'Backless / Hidden Zip / Diamond Clasp',
      accessories: 'Diamond Drop Earrings, กระเป๋าคลัตช์สีเงิน, รองเท้าส้นสูง Stiletto',
      colorPalette: 'Midnight Black (#0D0D11), Silver Diamond (#E2E8F0)',
      promptTokens: 'wearing luxurious midnight black silk velvet evening dress, high slit, diamond pendant necklace, sleek evening hairstyle, gala attire',
      negativeTokens: 'business suit, casual jacket, sneakers, daylight office attire'
    },
    {
      id: 'outfit-3',
      name: 'ชุดลุยฝนกลางคืน (Weatherproof Action Trench Coat)',
      sceneTag: 'EP.01 ไคลแม็กซ์ (ลานจอดรถ & สะพานเปียกฝน)',
      isDefault: false,
      imageUrl: characterToEdit?.extremeActingImage || '/assets/rin_extreme_acting.jpg',
      spec: 'เสื้อเทรนช์โค้ตกันน้ำสีเทาเข้ม ชายเสื้อสะบัด กางเกงสแล็กส์คล่องตัว',
      fabricCutting: 'Waterproof Gabardine / Storm Flap',
      lapelButtons: 'Belted Trench / Tortoiseshell Buttons',
      accessories: 'ซองปืนพกซ่อน, ถุงมือหนังบางสีดำ, แฟลชไดรฟ์ลับ',
      colorPalette: 'Charcoal Grey (#2D3748), Matte Black (#1A202C)',
      promptTokens: 'wearing charcoal grey weatherproof belted trench coat, wet fabric sheen, black tactical leather gloves, motion-ready action silhouette',
      negativeTokens: 'clean dry blazer, colorful dress, bright patterns'
    }
  ];

  const [wardrobeSets, setWardrobeSets] = useState(
    characterToEdit?.wardrobeSets && characterToEdit.wardrobeSets.length > 0 
      ? characterToEdit.wardrobeSets 
      : defaultInitialWardrobeSets
  );
  const [selectedOutfitId, setSelectedOutfitId] = useState(
    characterToEdit?.wardrobeSets?.[0]?.id || defaultInitialWardrobeSets[0].id
  );

  const activeOutfit = wardrobeSets.find(o => o.id === selectedOutfitId) || wardrobeSets[0];

  const updateActiveOutfitField = (field, value) => {
    setWardrobeSets(prev => prev.map(o => o.id === activeOutfit.id ? { ...o, [field]: value } : o));
  };

  const handleSetDefaultOutfit = (outfitId) => {
    setWardrobeSets(prev => prev.map(o => ({
      ...o,
      isDefault: o.id === outfitId
    })));
    setSelectedOutfitId(outfitId);
    showNotice(`ตั้งชุด "${wardrobeSets.find(o => o.id === outfitId)?.name || 'ชุดคอสตูม'}" เป็นชุดหลักประจำช็อตปัจจุบันแล้ว`);
  };

  const handleAddNewOutfit = () => {
    const newId = `outfit-${Date.now()}`;
    const newOutfit = {
      id: newId,
      name: `ชุดคอสตูมลำดับที่ ${wardrobeSets.length + 1} (New Outfit)`,
      sceneTag: `EP.01 ฉากใหม่`,
      isDefault: false,
      imageUrl: portraitUrl,
      spec: 'เสื้อเชิ้ตลำลอง กางเกงสแล็กส์ สไตล์สมจริง',
      fabricCutting: 'Cotton Silk Blend / Relaxed Fit',
      lapelButtons: 'Spread Collar / 1-Button',
      accessories: 'นาฬิกาข้อมือเรียบหรู',
      colorPalette: 'Neutral Slate (#4A5568), White (#FFFFFF)',
      promptTokens: 'wearing stylish relaxed collared shirt and tailored trousers, modern cinematic lighting',
      negativeTokens: 'oversized costume, wrong colors, dirty clothing'
    };
    setWardrobeSets([...wardrobeSets, newOutfit]);
    setSelectedOutfitId(newId);
    showNotice('เพิ่มชุดคอสตูมใหม่ประจำฉากสำเร็จ');
  };

  const handleDeleteOutfit = (outfitId) => {
    if (wardrobeSets.length <= 1) {
      alert('ตัวละครต้องมีชุดคอสตูมอย่างน้อย 1 ชุดในระบบ');
      return;
    }
    const remaining = wardrobeSets.filter(o => o.id !== outfitId);
    setWardrobeSets(remaining);
    setSelectedOutfitId(remaining[0].id);
    showNotice('ลบชุดคอสตูมเรียบร้อยแล้ว');
  };

  // 4. Acting & FACS
  const [actingStyle, setActingStyle] = useState(characterToEdit?.actingStyle || 'Method Acting — สื่ออารมณ์ผ่านแววตาและกล้ามเนื้อใบหน้ามากกว่าคำพูด');
  const [facs, setFacs] = useState(characterToEdit?.facsControls || {
    browInnerRaiser: 0.80,
    browLowerer: 0.70,
    lipTremor: 0.65,
    tearWelling: 0.60,
    pupilDilation: 0.85,
    jawTension: 0.75
  });

  // 5. Voice Profile & TTS
  const [voiceId, setVoiceId] = useState(characterToEdit?.voiceProfile?.voiceId || 'TH-Fem-Deep-02');
  const [voiceTone, setVoiceTone] = useState(characterToEdit?.voiceProfile?.tone || 'คมชัด เยือกเย็น ซ่อนความกดดันและกลั้นน้ำตา');
  const [voicePitch, setVoicePitch] = useState(characterToEdit?.voiceProfile?.pitch || '-2 semitones');
  const [voiceSpeed, setVoiceSpeed] = useState(characterToEdit?.voiceProfile?.speed || '1.05x');
  const [breathIntensity, setBreathIntensity] = useState(characterToEdit?.voiceProfile?.breathIntensity || '0.45');
  const [microBreathing, setMicroBreathing] = useState(characterToEdit?.voiceProfile?.microBreathing || 'Auto-insert [stifled gasp] and [voice crack] on high tension');
  const [sampleLine, setSampleLine] = useState(characterToEdit?.voiceProfile?.sampleLine || '[เสียงสั่นเครือ] ถ้าคืนนี้คุณไม่เซ็นรับรอง... ข้อมูลนี้จะถึงมือนักข่าวทุกสำนัก!');
  const [testingVoice, setTestingVoice] = useState(false);

  // 6. Visual Media & Multi-Angle PNGs (หน้าตรง หน้าข้าง ด้านหลัง รูปร่าง)
  const [portraitUrl, setPortraitUrl] = useState(characterToEdit?.portrait || '/assets/rin_portrait.jpg');
  const [sideProfileUrl, setSideProfileUrl] = useState(characterToEdit?.sideProfileImage || '/assets/rin_sheet.jpg');
  const [backViewUrl, setBackViewUrl] = useState(characterToEdit?.backViewImage || '');
  const [fullBodyUrl, setFullBodyUrl] = useState(characterToEdit?.fullBodyImage || '/assets/rin_sheet.jpg');
  const [extremeActingUrl, setExtremeActingUrl] = useState(characterToEdit?.extremeActingImage || characterToEdit?.portrait || '/assets/rin_extreme_acting.jpg');
  const [sheetImageUrl, setSheetImageUrl] = useState(characterToEdit?.sheetImage || '/assets/rin_sheet.jpg');

  // 7. Background & Video Prompt Studio State
  const [selectedBgPreset, setSelectedBgPreset] = useState('rain_noir');
  const [customBgPrompt, setCustomBgPrompt] = useState('');
  const [selectedCameraAngle, setSelectedCameraAngle] = useState('vertical_cinematic');
  const [selectedLighting, setSelectedLighting] = useState('rim_neon');
  const [selectedEmotionPreset, setSelectedEmotionPreset] = useState('tearful_defiance');

  // Scroll to top on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const showNotice = (msg) => {
    setCopyNotice(msg);
    setTimeout(() => setCopyNotice(''), 3500);
  };

  // Generic File Upload Handler for PNG/JPEG
  const handleFileUpload = (event, setter, label = 'รูปภาพ') => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('กรุณาเลือกไฟล์รูปภาพที่ถูกต้อง (PNG, JPEG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setter(e.target.result);
      showNotice(`อัปโหลดไฟล์ ${label} (PNG) เรียบร้อยแล้ว!`);
    };
    reader.readAsDataURL(file);
  };

  // Clean text for speech synthesis
  const cleanSpeechText = (txt) => (txt || '').replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim() || txt;

  const handleTestVoice = () => {
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
        model: selectedModel
      });

      if (char) {
        if (char.name) setName(char.name);
        if (char.role) setRole(char.role);
        if (char.age) setAge(String(char.age));
        if (char.gender) setGender(char.gender);
        if (char.occupation) setOccupation(char.occupation);
        if (char.description) setDescription(char.description);
        if (char.coreConflict) setCoreConflict(char.coreConflict);
        if (char.fatalFlaw) setFatalFlaw(char.fatalFlaw);
        if (char.relationshipNotes) setRelationshipNotes(char.relationshipNotes);
        if (char.actingStyle) setActingStyle(char.actingStyle);
        if (char.positiveAnchorPrompt) setPositiveAnchorPrompt(char.positiveAnchorPrompt);
        if (char.negativeGuardPrompt) setNegativeGuardPrompt(char.negativeGuardPrompt);
        
        if (char.wardrobeSpec) {
          updateActiveOutfitField('spec', char.wardrobeSpec);
        }
        if (char.fabricCutting) updateActiveOutfitField('fabricCutting', char.fabricCutting);
        if (char.lapelButtons) updateActiveOutfitField('lapelButtons', char.lapelButtons);
        if (char.accessoriesProps) updateActiveOutfitField('accessories', char.accessoriesProps);
        if (char.colorPalette) updateActiveOutfitField('colorPalette', char.colorPalette);

        if (char.voiceProfile) {
          if (char.voiceProfile.tone) setVoiceTone(char.voiceProfile.tone);
          if (char.voiceProfile.sampleLine) setSampleLine(char.voiceProfile.sampleLine);
        }

        if (char.facsControls) {
          setFacs(char.facsControls);
        }

        setGenNotice('AI สร้างข้อมูลตัวละครพร้อมสเปกคอสตูมและเสียงพากย์เสร็จสิ้น!');
        setActiveTab('identity');
      }
    } catch (err) {
      console.error('Generation failed:', err);
      setGenNotice('เกิดข้อผิดพลาดในการสร้าง กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRandomSeed = () => {
    setActorSeed(77100000 + Math.floor(Math.random() * 899999));
    showNotice('สุ่ม Face-Lock Actor Seed ใหม่เรียบร้อย');
  };

  const handleSubmit = (e) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!name.trim()) {
      alert('กรุณากรอกชื่อตัวละครก่อนบันทึก');
      setActiveTab('identity');
      return;
    }

    const defaultOutfit = wardrobeSets.find(o => o.isDefault) || wardrobeSets[0];

    const savedCharacter = {
      id: isEditMode && characterToEdit?.id ? characterToEdit.id : `char-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'ตัวละครในเรื่อง (Supporting Cast)',
      actorSeed: Number(actorSeed),
      loraModel: loraModel.trim() || 'Default_Character_V1.safetensors',
      loraWeight: Number(loraWeight),
      faceLockAccuracy: faceLockAccuracy || '98.8%',
      portrait: portraitUrl,
      sideProfileImage: sideProfileUrl,
      backViewImage: backViewUrl,
      fullBodyImage: fullBodyUrl,
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
      colorPalette: defaultOutfit.colorPalette || 'Navy Blue (#0B4A51), Silk White (#FAF7F2)',
      positiveAnchorPrompt: positiveAnchorPrompt.trim(),
      negativeGuardPrompt: negativeGuardPrompt.trim(),
      wardrobeSpec: defaultOutfit.spec || 'สูททางการสีกรมท่า',
      fabricCutting: defaultOutfit.fabricCutting || 'Wool 120s',
      lapelButtons: defaultOutfit.lapelButtons || 'Peak Lapel',
      accessoriesProps: defaultOutfit.accessories || 'ต่างหูมุก',
      wardrobeSets: wardrobeSets,
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

    onSave(savedCharacter);
  };

  // Background Environment Presets
  const bgPresets = [
    {
      id: 'rain_noir',
      label: '🌧️ ฝนตกกลางคืน แสงนีออน (Rainy Tokyo Noir)',
      tag: 'ซีนดราม่าสืบสวน & อารมณ์คลั่ง',
      prompt: 'heavy cinematic rainstorm, reflections of cyan and amber neon lights on wet asphalt, mist rising from street grates, blurred city traffic bokeh, dark moody Tokyo noir night backdrop'
    },
    {
      id: 'penthouse_48f',
      label: '🏢 ห้องประชุมเพนต์เฮาส์ 48F (Executive Penthouse)',
      tag: 'ซีนปะทะคารมธุรกิจ & ความรักศัตรู',
      prompt: 'luxurious 48th floor corporate penthouse office, massive rain-slicked floor-to-ceiling glass windows overlooking stormy night city skyline, lightning flash illumination, dark polished mahogany interior'
    },
    {
      id: 'luxury_gala',
      label: '🍸 งานเลี้ยงกาล่าหรูหรา (Luxury Gala Ballroom)',
      tag: 'ซีนแฝงตัวสืบคดี & งานเลี้ยงหมื่นล้าน',
      prompt: 'exclusive high-society gala ballroom, shimmering crystal chandeliers, warm golden bokeh lights, silver champagne trays, lavish corporate party atmosphere, VIP banquet background'
    },
    {
      id: 'underground_garage',
      label: '🚗 ลานจอดรถใต้ดินมืดสลัว (Underground Garage)',
      tag: 'ซีนเผชิญหน้า & ลอบสังหาร',
      prompt: 'underground concrete parking garage, gloomy damp atmosphere, single flickering fluorescent tube light overhead, deep shadow noir aesthetic, damp puddles, high tension crime scene'
    },
    {
      id: 'emergency_stairwell',
      label: '🚨 ทางหนีไฟฉุกเฉิน (Emergency Stairwell)',
      tag: 'ซีนวิ่งหนีเอาชีวิตรอด & ไคลแม็กซ์',
      prompt: 'industrial concrete emergency stairwell, rhythmic crimson strobe light from rotating emergency sirens, sharp diagonal shadows, adrenaline chase atmosphere, emergency exit sign glow'
    },
    {
      id: 'custom',
      label: '✍️ พิมพ์ฉากหลังเอง (Custom Environment)',
      tag: 'กำหนดบรรยากาศอิสระ',
      prompt: customBgPrompt || 'cinematic atmospheric film set, shallow depth of field'
    }
  ];

  // Emotion Acting Presets
  const emotionPresets = [
    {
      id: 'tearful_defiance',
      label: '💧 กลั้นน้ำตาตาคลอเบ้า ริมฝีปากสั่น (Tearful Defiance)',
      prompt: 'intense tear-filled eyes, tear welling on lower eyelid, slight lip tremor, clenched jaw muscle, defiantly holding back sobs, extreme raw emotional acting, AU1+AU4+AU20 facial action units'
    },
    {
      id: 'cold_calculated',
      label: '❄️ เยือกเย็น สายตาดุดัน คมกริบ (Cold Calculated)',
      prompt: 'piercing icy stare, subtle cold smirk, completely composed expression masking dangerous inner fury, calm predator gaze, sharp eyebrow tension'
    },
    {
      id: 'breathless_panic',
      label: '⚡ ตกใจสุดขีด หายใจกระชั้น (Breathless Panic)',
      prompt: 'parted trembling lips, rapid shallow breathing motion, widened pupils in shock, clutching collar in sudden realization, high suspense drama'
    },
    {
      id: 'melancholic_vulnerability',
      label: '🥀 เจ็บปวด อ่อนโยนแต่ใจสลาย (Melancholic Heartbreak)',
      prompt: 'soft sorrowful gaze, downcast eyes, gentle melancholy, longing heartbreak expression, single cinematic tear rolling down cheek'
    }
  ];

  // Active Synthesized Prompts
  const currentBgObj = bgPresets.find(b => b.id === selectedBgPreset) || bgPresets[0];
  const activeBgPrompt = selectedBgPreset === 'custom' ? (customBgPrompt || 'cinematic film background') : currentBgObj.prompt;
  const currentEmotionObj = emotionPresets.find(e => e.id === selectedEmotionPreset) || emotionPresets[0];

  const synthesizedImagePrompt = `(face_seed_${actorSeed}:1.2), ${name.split('/')[0]}, ${gender}, ${age} years old, ${positiveAnchorPrompt}, ${activeOutfit.promptTokens || activeOutfit.spec}, ${currentEmotionObj.prompt}, ${activeBgPrompt}, 9:16 vertical drama framing, 85mm portrait prime lens, F/1.4 shallow depth of field, dramatic cinematic rim lighting, 8k resolution, Masterpiece, ultra realistic skin texture --ar 9:16 --v 6.1`;

  const synthesizedVideoPrompt = `9:16 vertical drama cinematic shot. ${name.split('/')[0]} wearing ${activeOutfit.name}. Camera: Slow push-in on 85mm lens. Character Motion: ${currentEmotionObj.label}, natural chest breathing 14 bpm, subtle micro-tremor of lower lip, ocular saccade micro-movements, hair strands reacting to breeze and humidity. Environment: ${activeBgPrompt}. Lighting: strong edge rim lighting, deep contrast shadows. Ultra-photorealistic 24fps motion, no face deformation, continuous wardrobe fidelity.`;

  const copyToClipboard = (text, type = 'Prompt') => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showNotice(`คัดลอก ${type} เรียบร้อยแล้ว! นำไปวางใน Midjourney หรือ Video AI ได้ทันที`);
    }
  };

  const archetypes = [
    { label: 'ทนาย / สายสืบสวน', role: 'ทนายฝ่ายตรงข้าม & อดีตคนรัก', prompt: 'ทนายสาวเฉียบคมที่เคยเป็นคนรักเก่า ถือหลักฐานลับที่พลิกคดีได้' },
    { label: 'ประธาน / ทายาทตระกูล', role: 'ทายาทตระกูลพันล้านคู่แข่ง', prompt: 'ประธานหนุ่มตระกูลคู่แข่งที่มีแผนการฮุบกิจการและครอบงำตลาด' },
    { label: 'บอดี้การ์ด / มือสังหาร', role: 'บอดี้การ์ดคุ้มกันเงียบขรึม', prompt: 'บอดี้การ์ดอดีตหน่วยรบพิเศษ มีความภักดีสูงแต่เก็บงำอดีตสังหาร' },
    { label: 'ตัวร้าย / บอสเงามืด', role: 'ผู้บงการระดับสูงในเงามืด', prompt: 'บอสใหญ่ผู้มีอิทธิพลเหนือกฎหมาย ควบคุมกลไกธุรกิจสีเทา' },
    { label: 'แพทย์นิติเวช / ผู้ช่วย', role: 'แพทย์นิติเวชที่ปรึกษาลับ', prompt: 'แพทย์สาวเพื่อนสนิทที่ตรวจพบร่องรอยการฆาตกรรมอำพราง' },
    { label: 'ทายาทสาวผู้สูญเสีย', role: 'ทายาทสาวตกอับ ปลอมตัวล้างแค้น', prompt: 'คุณหนูทายาทมหาเศรษฐีที่ถูกหักหลังและแย่งสมบัติ ต้องปลอมตัวเข้ามาเป็นคนรับใช้' }
  ];

  const tabs = [
    { id: 'identity', label: '1. อัตลักษณ์ & ปูมหลัง', icon: User },
    { id: 'facelock', label: '2. Face-Lock 98.7% & Prompts', icon: ShieldCheck },
    { id: 'wardrobe', label: '3. คอสตูม & ชุดแต่ละฉาก (Multi-Scene)', icon: Layers },
    { id: 'facs', label: '4. การแสดง & FACS', icon: HeartPulse },
    { id: 'voice', label: '5. เสียงพากย์ & TTS', icon: Volume2 },
    { id: 'media', label: '6. รูปภาพ & Turnaround (PNG Uploads)', icon: Image },
    { id: 'promptbg', label: '7. Prompt ฉากหลัง & AI Video', icon: Film },
    { id: 'ai', label: '8. AI Auto-Generator', icon: Sparkles }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px 0 60px 0' }}>
      {/* Toast Notice Banner */}
      {copyNotice && (
        <div style={{
          position: 'fixed',
          top: '24px',
          right: '24px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 20px',
          background: 'var(--teal-primary)',
          color: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 8px 24px rgba(11, 74, 81, 0.35)',
          fontSize: '0.88rem',
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          <CheckCircle2 size={18} />
          <span>{copyNotice}</span>
        </div>
      )}

      {/* Top Breadcrumb & Action Header */}
      <div className="clay-card" style={{ padding: '18px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                fontSize: '0.85rem',
                fontWeight: 700
              }}
              title="ย้อนกลับไปหน้า Casting & Character Bible"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>ย้อนกลับ (Back)</span>
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                  {isEditMode ? 'โหมดแก้ไขตัวละคร' : 'โหมดสร้างตัวละครใหม่'}
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  ซีรีส์: <strong style={{ color: 'var(--text-main)' }}>{series?.title || 'ซีรีส์ปัจจุบัน'}</strong>
                </span>
              </div>
              <h2 style={{ margin: '4px 0 0 0', fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 800 }}>
                {isEditMode ? `แก้ไขข้อมูล: ${name || 'ไม่มีชื่อ'}` : 'เพิ่มตัวละครใหม่ในเรื่อง (New Character Studio)'}
              </h2>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isEditMode && onDelete && (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`คุณต้องการลบตัวละคร "${name}" จริงหรือไม่?`)) {
                    onDelete(characterToEdit.id);
                  }
                }}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  color: 'var(--accent-red)',
                  borderColor: 'rgba(185, 56, 72, 0.3)',
                  background: 'var(--accent-red-bg)',
                  fontSize: '0.82rem'
                }}
              >
                <Trash2 size={15} />
                <span>ลบตัวละคร</span>
              </button>
            )}

            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              ยกเลิก
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-teal-btn)'
              }}
            >
              <Save size={16} strokeWidth={2.5} />
              <span>{isEditMode ? 'บันทึกการแก้ไขตัวละคร' : 'บันทึกตัวละครใหม่'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation (8 Tabs) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        padding: '6px',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-raised-sm)'
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isAct = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-pill)',
                border: isAct ? '1px solid var(--border-focus)' : '1px solid transparent',
                background: isAct ? 'var(--bg-raised)' : 'transparent',
                color: isAct ? 'var(--teal-primary)' : 'var(--text-muted)',
                fontWeight: isAct ? 700 : 500,
                fontSize: '0.8rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <Icon size={15} strokeWidth={isAct ? 2.5 : 2} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Tab Panels Container */}
      <div className="clay-card" style={{ padding: '24px' }}>

        {/* TAB 1: IDENTITY & ROLE */}
        {activeTab === 'identity' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ชื่อตัวละคร (ไทย / อังกฤษ หรือ ฉายา) *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="เช่น: ริน ลลิตา / Yuna Kim (Rin)"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.95rem',
                  fontWeight: 600
                }}
                required
              />
            </div>

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                บทบาทหน้าที่ในเรื่อง (Story Role)
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="เช่น: ตัวเอกหญิง (Protagonist) - ทนายสาวสายสืบสวน"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  อายุ (Age)
                </label>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="28"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  เพศ (Gender)
                </label>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="หญิง (Female)"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface)',
                    fontSize: '0.88rem'
                  }}
                />
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                อาชีพ & หน้าที่การงาน (Occupation)
              </label>
              <input
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                placeholder="เช่น: ทนายความอิสระ / ทายาทตระกูลมหาเศรษฐี / แพทย์นิติเวช"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.88rem'
                }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ประวัติภูมิหลัง & บุคลิกภาพเชิงลึก (Backstory & Psychological Profile)
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ภูมิหลัง ปูมความแค้นในอดีต จุดอ่อน และแรงขับเคลื่อนที่ทำให้ตัวละครนี้ยอมเสี่ยงชีวิต..."
                style={{
                  width: '100%',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.86rem',
                  lineHeight: 1.5,
                  resize: 'vertical'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ปมขัดแย้งหลัก (Core Conflict)
              </label>
              <input
                type="text"
                value={coreConflict}
                onChange={(e) => setCoreConflict(e.target.value)}
                placeholder="ความจริงเรื่องพ่อ VS ความรู้สึกที่มีต่อศัตรู"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                จุดอ่อนร้ายแรง / ข้อบกพร่อง (Fatal Flaw)
              </label>
              <input
                type="text"
                value={fatalFlaw}
                onChange={(e) => setFatalFlaw(e.target.value)}
                placeholder="ความทะนงตน และ ไม่ยอมขอความช่วยเหลือจากใคร"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ความสัมพันธ์กับตัวละครอื่นในเรื่อง (Relationship Dynamics)
              </label>
              <input
                type="text"
                value={relationshipNotes}
                onChange={(e) => setRelationshipNotes(e.target.value)}
                placeholder="คู่ปรับทางจิตวิทยาที่ไม่มีใครยอมใครกับทาดาโอะ / ไว้วางใจหมอพิมเป็นคนเดียว"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  fontSize: '0.86rem'
                }}
              />
            </div>
          </div>
        )}

        {/* TAB 2: FACE-LOCK & PROMPTS */}
        {activeTab === 'facelock' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              padding: '18px',
              background: 'var(--bg-inset)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '16px'
            }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span>Actor Fixed Seed *</span>
                  <button
                    type="button"
                    onClick={handleRandomSeed}
                    style={{ background: 'transparent', border: 'none', color: 'var(--teal-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.74rem', fontWeight: 700 }}
                  >
                    <Dice5 size={14} />
                    <span>สุ่ม Seed ใหม่</span>
                  </button>
                </label>
                <input
                  type="number"
                  value={actorSeed}
                  onChange={(e) => setActorSeed(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.9rem', fontFamily: 'monospace' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  LoRA Consistency Model
                </label>
                <input
                  type="text"
                  value={loraModel}
                  onChange={(e) => setLoraModel(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.88rem', fontFamily: 'monospace' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
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
                  style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer', marginTop: '10px' }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Positive Anchor Prompt Tokens (คำสั่งล็อกโครงหน้า โครงกระดูก และทรงผม)
              </label>
              <textarea
                rows={3}
                value={positiveAnchorPrompt}
                onChange={(e) => setPositiveAnchorPrompt(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem', fontFamily: 'monospace', resize: 'vertical' }}
              />
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                * โทเคนเหล่านี้จะถูกใส่เข้าไปในทุกช็อตของตัวละครนี้ เพื่อให้โมเดล AI เจนเนอเรตหน้าตาและทรงผมตรงกัน 100% ทุกฉาก
              </span>
            </div>

            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                Negative Guard Prompt Tokens (คำสั่งป้องกันใบหน้าเพี้ยน)
              </label>
              <textarea
                rows={2}
                value={negativeGuardPrompt}
                onChange={(e) => setNegativeGuardPrompt(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem', fontFamily: 'monospace', resize: 'vertical' }}
              />
            </div>
          </div>
        )}

        {/* TAB 3: WARDROBE & MULTI-SCENE COSTUMES (คอสตูม & แต่ละฉากใส่ไม่เหมือนกัน) */}
        {activeTab === 'wardrobe' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Top Toolbar for Outfits */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
              paddingBottom: '14px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-main)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Layers size={18} color="var(--teal-primary)" />
                  <span>ระบบจัดการชุดคอสตูมประจำฉาก & ความต่อเนื่อง (Scene Wardrobe Continuity)</span>
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  ในแต่ละฉากหรือตอน ตัวละครอาจเปลี่ยนชุดเสื้อผ้าเพื่อความสมจริง สามารถเพิ่มชุด สลับชุดที่ใช้ในฉาก และอัปโหลดภาพชุด PNG อ้างอิงได้
                </p>
              </div>

              <button
                type="button"
                onClick={handleAddNewOutfit}
                className="btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '0.82rem' }}
              >
                <Plus size={16} strokeWidth={2.5} />
                <span>+ เพิ่มชุดคอสตูมฉากใหม่</span>
              </button>
            </div>

            {/* Outfits Switcher Pill Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
              {wardrobeSets.map((outfit, index) => {
                const isSelected = outfit.id === activeOutfit.id;
                return (
                  <div
                    key={outfit.id}
                    onClick={() => setSelectedOutfitId(outfit.id)}
                    style={{
                      border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 14px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      boxShadow: isSelected ? 'var(--shadow-raised-sm)' : 'none',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <img
                      src={outfit.imageUrl || portraitUrl}
                      alt={outfit.name}
                      style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: 'var(--radius-sm)',
                        objectFit: 'cover',
                        border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)'
                      }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
                        <strong style={{ fontSize: '0.84rem', color: isSelected ? 'var(--teal-primary)' : 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {outfit.name}
                        </strong>
                        {outfit.isDefault && (
                          <span className="badge badge-teal" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                            ชุดหลัก
                          </span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {outfit.sceneTag || `ลำดับที่ ${index + 1}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Outfit Detailed Editor Card */}
            <div style={{
              background: 'var(--bg-inset)',
              padding: '20px',
              borderRadius: 'var(--radius-md)',
              border: '1.5px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-teal" style={{ fontSize: '0.76rem' }}>กำลังปรับแต่งชุด:</span>
                  <strong style={{ fontSize: '0.94rem', color: 'var(--text-main)' }}>{activeOutfit.name}</strong>
                  {activeOutfit.isDefault ? (
                    <span className="badge badge-teal-subtle" style={{ fontSize: '0.72rem' }}>
                      ✓ เลือกเป็นชุดหลักประจำช็อตปัจจุบัน
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSetDefaultOutfit(activeOutfit.id)}
                      className="btn-secondary"
                      style={{ fontSize: '0.75rem', padding: '4px 10px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Star size={13} />
                      <span>เลือกเป็นชุดหลักฉากนี้ (Set Active)</span>
                    </button>
                  )}
                </div>

                {wardrobeSets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteOutfit(activeOutfit.id)}
                    className="btn-secondary"
                    style={{ color: 'var(--accent-red)', borderColor: 'rgba(185, 56, 72, 0.3)', padding: '5px 12px', fontSize: '0.76rem' }}
                  >
                    <Trash2 size={13} />
                    <span>ลบชุดนี้</span>
                  </button>
                )}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ชื่อชุดคอสตูม (Outfit Title)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.name}
                    onChange={(e) => updateActiveOutfitField('name', e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ฉาก / ตอนที่ใช้สวมใส่ (Target Scene & Episode)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.sceneTag}
                    onChange={(e) => updateActiveOutfitField('sceneTag', e.target.value)}
                    placeholder="เช่น: EP.01 ฉาก 1-3 (ห้องประชุม)"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>

                {/* Outfit PNG Upload Box */}
                <div style={{ gridColumn: 'span 2', background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px dashed var(--teal-primary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Upload size={16} color="var(--teal-primary)" />
                      <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>
                        อัปโหลดภาพสเปกชุดคอสตูม (PNG Outfit Reference / Swatch)
                      </strong>
                    </div>
                    <label
                      className="btn-primary"
                      style={{ cursor: 'pointer', padding: '6px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Upload size={14} />
                      <span>อัปโหลดรูป PNG ชุดนี้</span>
                      <input
                        type="file"
                        accept="image/png,image/jpeg,image/webp"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileUpload(e, (data) => updateActiveOutfitField('imageUrl', data), `ชุด ${activeOutfit.name}`)}
                      />
                    </label>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <img
                      src={activeOutfit.imageUrl || portraitUrl}
                      alt="Costume Preview"
                      style={{
                        width: '80px',
                        height: '100px',
                        objectFit: 'cover',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid var(--border-subtle)'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <input
                        type="text"
                        value={activeOutfit.imageUrl}
                        onChange={(e) => updateActiveOutfitField('imageUrl', e.target.value)}
                        placeholder="URL รูปภาพ หรืออัปโหลดไฟล์ PNG ด้านบน"
                        style={{ width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.8rem', background: 'var(--bg-inset)' }}
                      />
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                        * แนะนำให้อัปโหลดภาพชุดแบบพื้นหลังโปร่งใส (PNG) หรือภาพฟิตติ้งเสื้อผ้า เพื่อส่งเข้า IP-Adapter ควบคุมการเปลี่ยนชุดในวิดีโอ
                      </span>
                    </div>
                  </div>
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    สเปกชุดเครื่องแต่งกายฉากนี้ (Wardrobe Spec Details)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.spec}
                    onChange={(e) => updateActiveOutfitField('spec', e.target.value)}
                    placeholder="สูทเข้ารูปสีกรมท่า (Navy Wool Suit), เชิ้ตขาวผ้าไหม, ต่างหูมุกเรียบหรู"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.88rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    เนื้อผ้า & การตัดเย็บ (Fabric & Cutting)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.fabricCutting}
                    onChange={(e) => updateActiveOutfitField('fabricCutting', e.target.value)}
                    placeholder="Wool 120s / Matte Silk Lapel"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ทรงปก & กระดุม (Lapels & Buttons)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.lapelButtons}
                    onChange={(e) => updateActiveOutfitField('lapelButtons', e.target.value)}
                    placeholder="Peak Lapel / Double-Breasted 4-Button"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    เครื่องประดับ & อุปกรณ์ประจำตัว (Accessories & Props)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.accessories}
                    onChange={(e) => updateActiveOutfitField('accessories', e.target.value)}
                    placeholder="Silver Pearl Earrings, แฟ้มคดีลับ, นาฬิกาข้อมือ"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    โทนสีประจำชุด (Costume Color Palette)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.colorPalette}
                    onChange={(e) => updateActiveOutfitField('colorPalette', e.target.value)}
                    placeholder="Navy Blue (#0B4A51), Silk White (#FAF7F2), Silver Accent"
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--teal-primary)', display: 'block', marginBottom: '4px' }}>
                    Costume Prompt Tokens (คำสั่งใส่ชุดนี้ในโมเดล AI เจนเนอเรตภาพและวิดีโอ)
                  </label>
                  <textarea
                    rows={2}
                    value={activeOutfit.promptTokens}
                    onChange={(e) => updateActiveOutfitField('promptTokens', e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem', fontFamily: 'monospace', resize: 'vertical' }}
                  />
                </div>

                <div style={{ gridColumn: 'span 2' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-red)', display: 'block', marginBottom: '4px' }}>
                    Negative Costume Guard (คำสั่งล็อกไม่ให้ชุดเพี้ยน เช่น no t-shirt, consistent buttons)
                  </label>
                  <input
                    type="text"
                    value={activeOutfit.negativeTokens}
                    onChange={(e) => updateActiveOutfitField('negativeTokens', e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.84rem', fontFamily: 'monospace' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: ACTING & FACS */}
        {activeTab === 'facs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                สไตล์การแสดงและการเคลื่อนไหว (Acting Style & Method)
              </label>
              <textarea
                rows={2}
                value={actingStyle}
                onChange={(e) => setActingStyle(e.target.value)}
                placeholder="Method Acting — สื่ออารมณ์ผ่านแววตาและกล้ามเนื้อใบหน้ามากกว่าคำพูด"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.88rem', resize: 'vertical' }}
              />
            </div>

            <div style={{
              padding: '20px',
              background: 'var(--bg-inset)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--teal-primary)' }}>
                <Sliders size={18} strokeWidth={2.5} />
                <strong style={{ fontSize: '0.92rem' }}>FACS Micro-Expression Real-Time Tuning</strong>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span>เลิกคิ้วด้านใน (AU1 Brow Inner Raiser):</span>
                    <strong style={{ color: 'var(--teal-primary)' }}>{Math.round(facs.browInnerRaiser * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.browInnerRaiser}
                    onChange={(e) => setFacs({ ...facs, browInnerRaiser: parseFloat(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span>กดหัวคิ้วลง (AU4 Brow Lowerer / Furrow):</span>
                    <strong style={{ color: 'var(--accent-red)' }}>{Math.round(facs.browLowerer * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.browLowerer}
                    onChange={(e) => setFacs({ ...facs, browLowerer: parseFloat(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span>ริมฝีปากสั่นระริก (AU20 Lip Tremor):</span>
                    <strong style={{ color: 'var(--accent-red)' }}>{Math.round(facs.lipTremor * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.lipTremor}
                    onChange={(e) => setFacs({ ...facs, lipTremor: parseFloat(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span>น้ำตาคลอเบ้า & ความชื้นตา (Tear Welling):</span>
                    <strong style={{ color: 'var(--accent-green)' }}>{Math.round(facs.tearWelling * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.tearWelling}
                    onChange={(e) => setFacs({ ...facs, tearWelling: parseFloat(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--accent-green)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
                    <span>ม่านตาขยายเวลากดดัน (Pupil Dilation):</span>
                    <strong style={{ color: 'var(--teal-primary)' }}>{Math.round(facs.pupilDilation * 100)}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={facs.pupilDilation}
                    onChange={(e) => setFacs({ ...facs, pupilDilation: parseFloat(e.target.value) })}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                  />
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '4px' }}>
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
                    style={{ width: '100%', accentColor: 'var(--accent-amber)', cursor: 'pointer' }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: VOICE & TTS */}
        {activeTab === 'voice' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  Voice ID
                </label>
                <input
                  type="text"
                  value={voiceId}
                  onChange={(e) => setVoiceId(e.target.value)}
                  placeholder="TH-Fem-Deep-02"
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  ระดับความทุ้ม/แหลม (Pitch)
                </label>
                <select
                  value={voicePitch}
                  onChange={(e) => setVoicePitch(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                >
                  <option value="-4 semitones">-4 semitones (ทุ้มต่ำมาก บาริโทน)</option>
                  <option value="-2 semitones">-2 semitones (ทุ้มลึก หนักแน่น)</option>
                  <option value="0 semitones">0 semitones (โทนมาตรฐาน)</option>
                  <option value="+2 semitones">+2 semitones (ใส อ่อนโยน)</option>
                  <option value="+4 semitones">+4 semitones (แหลมสูง ตื่นเต้น)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  ความเร็วการพูด (Speed)
                </label>
                <select
                  value={voiceSpeed}
                  onChange={(e) => setVoiceSpeed(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
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
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                โทนเสียงและคำอธิบาย (Voice Tone Description)
              </label>
              <input
                type="text"
                value={voiceTone}
                onChange={(e) => setVoiceTone(e.target.value)}
                placeholder="คมชัด เยือกเย็น ซ่อนความกดดันและกลั้นน้ำตา"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
              />
            </div>

            <div style={{
              padding: '20px',
              background: 'var(--bg-inset)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Volume2 size={18} />
                  บทพูดตัวอย่างสำหรับทดสอบเสียง (Sample Dialogue Line)
                </label>
                <button
                  type="button"
                  onClick={handleTestVoice}
                  className={testingVoice ? 'btn-secondary' : 'btn-primary'}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.82rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: testingVoice ? 'var(--accent-red-bg)' : undefined,
                    color: testingVoice ? 'var(--accent-red)' : undefined
                  }}
                >
                  {testingVoice ? <Square size={15} fill="currentColor" /> : <Volume2 size={15} strokeWidth={2} />}
                  <span>{testingVoice ? 'หยุดเสียง' : '🔊 ทดสอบฟังเสียงทันที'}</span>
                </button>
              </div>

              <textarea
                rows={2}
                value={sampleLine}
                onChange={(e) => setSampleLine(e.target.value)}
                placeholder="[เสียงสั่นเครือ] ถ้าคืนนี้คุณไม่เซ็นรับรอง... ข้อมูลนี้จะถึงมือนักข่าวทุกสำนัก!"
                style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', fontSize: '0.88rem', resize: 'vertical' }}
              />
            </div>
          </div>
        )}

        {/* TAB 6: MULTI-ANGLE & BODY TURNAROUND PNG UPLOADS (หน้าตรง หน้าข้าง ด้านหลัง รูปร่าง) */}
        {activeTab === 'media' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-subtle)'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Camera size={20} color="var(--teal-primary)" />
                  <span>ระบบอัปโหลดรูปภาพตัวละครหลายมุมมอง (Multi-Angle & Full-Body PNG Upload)</span>
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  อัปโหลดไฟล์ภาพ PNG จริง (ทั้งแบบภาพเต็มตัว หน้าตรง หน้าข้าง ด้านหลัง และสัดส่วน) เพื่อป้อนเข้า ControlNet / IP-Adapter ล็อกโครงสร้างตัวละคร 100%
                </p>
              </div>

              <span className="badge badge-teal" style={{ fontSize: '0.78rem' }}>
                รองรับไฟล์ PNG, JPEG, WebP
              </span>
            </div>

            {/* Quick Preset Avatars Picker */}
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                หรือเลือกจากภาพต้นแบบระบบ (Preset Avatars)
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
                {PRESET_AVATARS.map(av => {
                  const isSel = portraitUrl === av.url;
                  return (
                    <div
                      key={av.id}
                      onClick={() => {
                        setPortraitUrl(av.url);
                        setExtremeActingUrl(av.url);
                        showNotice(`เลือกอวาตาร์ "${av.label}" เรียบร้อยแล้ว`);
                      }}
                      style={{
                        border: isSel ? '2.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '8px',
                        background: isSel ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        boxShadow: isSel ? 'var(--shadow-raised-sm)' : 'none'
                      }}
                    >
                      <img src={av.url} alt={av.label} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '6px', display: 'block', marginBottom: '6px' }} />
                      <span style={{ fontSize: '0.76rem', color: isSel ? 'var(--teal-primary)' : 'var(--text-main)', fontWeight: 700 }}>{av.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 6 Dedicated Multi-Angle Upload Slots */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
              
              {/* Slot 1: หน้าตรง (Frontal / Face Portrait) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={16} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>1. ภาพหน้าตรง (Frontal Portrait) *</strong>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>ภาพหลัก</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-inset)' }}>
                  {portraitUrl ? (
                    <img src={portraitUrl} alt="Frontal" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      ยังไม่ได้อัปโหลดภาพหน้าตรง
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn-primary" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Upload size={14} />
                    <span>อัปโหลด PNG หน้าตรง</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setPortraitUrl, 'ภาพหน้าตรง')} />
                  </label>
                  {portraitUrl && (
                    <button type="button" onClick={() => setPortraitUrl('')} className="btn-secondary" style={{ padding: '8px 12px', color: 'var(--accent-red)' }} title="ลบภาพนี้">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={portraitUrl}
                  onChange={(e) => setPortraitUrl(e.target.value)}
                  placeholder="หรือระบุ URL รูปภาพ..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', background: 'var(--bg-inset)' }}
                />
              </div>

              {/* Slot 2: หน้าข้าง 45° / ด้านข้าง (Side Profile / 45° Angle) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Eye size={16} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>2. ภาพหน้าข้าง 45° (Side Profile)</strong>
                  </div>
                  <span className="badge badge-sand" style={{ fontSize: '0.68rem' }}>มุมข้าง</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-inset)' }}>
                  {sideProfileUrl ? (
                    <img src={sideProfileUrl} alt="Side Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      ยังไม่ได้อัปโหลดภาพหน้าข้าง
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn-primary" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Upload size={14} />
                    <span>อัปโหลด PNG หน้าข้าง</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setSideProfileUrl, 'ภาพหน้าข้าง')} />
                  </label>
                  {sideProfileUrl && (
                    <button type="button" onClick={() => setSideProfileUrl('')} className="btn-secondary" style={{ padding: '8px 12px', color: 'var(--accent-red)' }} title="ลบภาพนี้">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={sideProfileUrl}
                  onChange={(e) => setSideProfileUrl(e.target.value)}
                  placeholder="หรือระบุ URL รูปภาพ..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', background: 'var(--bg-inset)' }}
                />
              </div>

              {/* Slot 3: ด้านหลัง (Back View) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Compass size={16} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>3. ภาพด้านหลัง (Back View)</strong>
                  </div>
                  <span className="badge badge-sand" style={{ fontSize: '0.68rem' }}>มุมหลัง</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-inset)' }}>
                  {backViewUrl ? (
                    <img src={backViewUrl} alt="Back View" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.8rem', padding: '16px', textAlign: 'center' }}>
                      <Upload size={24} strokeWidth={1.5} />
                      <span>อัปโหลดภาพทรงผมและชุดด้านหลัง (PNG)</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn-primary" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Upload size={14} />
                    <span>อัปโหลด PNG ด้านหลัง</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setBackViewUrl, 'ภาพด้านหลัง')} />
                  </label>
                  {backViewUrl && (
                    <button type="button" onClick={() => setBackViewUrl('')} className="btn-secondary" style={{ padding: '8px 12px', color: 'var(--accent-red)' }} title="ลบภาพนี้">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={backViewUrl}
                  onChange={(e) => setBackViewUrl(e.target.value)}
                  placeholder="หรือระบุ URL รูปภาพ..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', background: 'var(--bg-inset)' }}
                />
              </div>

              {/* Slot 4: รูปร่าง & สัดส่วนเต็มตัว (Full-Body Turnaround & Proportions) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={16} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>4. รูปร่าง & สัดส่วนเต็มตัว (Full-Body)</strong>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>เต็มตัว 9:16</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-inset)' }}>
                  {fullBodyUrl ? (
                    <img src={fullBodyUrl} alt="Full-Body" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#F8F9FA' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '6px', color: 'var(--text-dim)', fontSize: '0.8rem', padding: '16px', textAlign: 'center' }}>
                      <Upload size={24} strokeWidth={1.5} />
                      <span>อัปโหลดภาพรูปร่างสัดส่วนเต็มตัว (PNG)</span>
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn-primary" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Upload size={14} />
                    <span>อัปโหลด PNG เต็มตัว</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setFullBodyUrl, 'ภาพสัดส่วนเต็มตัว')} />
                  </label>
                  {fullBodyUrl && (
                    <button type="button" onClick={() => setFullBodyUrl('')} className="btn-secondary" style={{ padding: '8px 12px', color: 'var(--accent-red)' }} title="ลบภาพนี้">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={fullBodyUrl}
                  onChange={(e) => setFullBodyUrl(e.target.value)}
                  placeholder="หรือระบุ URL รูปภาพ..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', background: 'var(--bg-inset)' }}
                />
              </div>

              {/* Slot 5: ภาพแสดงอารมณ์สุดขั้ว (Extreme Acting Portrait) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <HeartPulse size={16} color="var(--accent-red)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>5. ภาพแสดงอารมณ์สุดขั้ว (Emotion Drama)</strong>
                  </div>
                  <span className="badge badge-sand" style={{ fontSize: '0.68rem' }}>ซีนดราม่า</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-inset)' }}>
                  {extremeActingUrl ? (
                    <img src={extremeActingUrl} alt="Extreme Acting" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      ยังไม่ได้อัปโหลดภาพแสดงอารมณ์
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn-primary" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Upload size={14} />
                    <span>อัปโหลด PNG ซีนอารมณ์</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setExtremeActingUrl, 'ภาพแสดงอารมณ์สุดขั้ว')} />
                  </label>
                  {extremeActingUrl && (
                    <button type="button" onClick={() => setExtremeActingUrl('')} className="btn-secondary" style={{ padding: '8px 12px', color: 'var(--accent-red)' }} title="ลบภาพนี้">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={extremeActingUrl}
                  onChange={(e) => setExtremeActingUrl(e.target.value)}
                  placeholder="หรือระบุ URL รูปภาพ..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', background: 'var(--bg-inset)' }}
                />
              </div>

              {/* Slot 6: ภาพรวมโมเดลชีท 4 มุมมอง (Turnaround Sheet) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Layers size={16} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>6. โมเดลชีท 4 มุมมอง (Turnaround Sheet)</strong>
                  </div>
                  <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>4-in-1 Sheet</span>
                </div>

                <div style={{ position: 'relative', width: '100%', height: '220px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--bg-inset)' }}>
                  {sheetImageUrl ? (
                    <img src={sheetImageUrl} alt="Turnaround Sheet" style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#F8F9FA' }} />
                  ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      ยังไม่ได้อัปโหลดโมเดลชีท
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <label className="btn-primary" style={{ flex: 1, textAlign: 'center', cursor: 'pointer', padding: '8px 12px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Upload size={14} />
                    <span>อัปโหลด PNG โมเดลชีท</span>
                    <input type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, setSheetImageUrl, 'ภาพโมเดลชีท')} />
                  </label>
                  {sheetImageUrl && (
                    <button type="button" onClick={() => setSheetImageUrl('')} className="btn-secondary" style={{ padding: '8px 12px', color: 'var(--accent-red)' }} title="ลบภาพนี้">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={sheetImageUrl}
                  onChange={(e) => setSheetImageUrl(e.target.value)}
                  placeholder="หรือระบุ URL รูปภาพ..."
                  style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', fontSize: '0.76rem', background: 'var(--bg-inset)' }}
                />
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: BACKGROUND & VIDEO AI PROMPT STUDIO (ทำ prompt bg ไว้ดีๆ ส่งภาพ สร้างวิดีโอ หรือแสดงอารมณ์) */}
        {activeTab === 'promptbg' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              paddingBottom: '14px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.05rem', color: 'var(--text-main)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Film size={20} color="var(--teal-primary)" />
                  <span>ระบบสร้าง Prompt ฉากหลัง แสง และการเคลื่อนไหวสำหรับสร้างภาพ & วิดีโอ AI</span>
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  ประกอบร่าง Face-Lock + ชุดคอสตูมฉากนี้ + อารมณ์การแสดง + ฉากหลังภาพยนตร์ เป็น Prompt สำเร็จรูปพร้อมกด Copy นำไปสร้างภาพและคลิปวิดีโอได้ทันที
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="badge badge-teal" style={{ fontSize: '0.74rem' }}>
                  ชุดปัจจุบัน: {activeOutfit.name} ({activeOutfit.sceneTag})
                </span>
              </div>
            </div>

            {/* Step 1: Select Scene Wardrobe */}
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                1. เลือกชุดคอสตูมที่ใช้ในฉากนี้ (Active Costume for this Shot):
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {wardrobeSets.map(outfit => {
                  const isSel = outfit.id === activeOutfit.id;
                  return (
                    <button
                      key={outfit.id}
                      type="button"
                      onClick={() => setSelectedOutfitId(outfit.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        borderRadius: 'var(--radius-pill)',
                        border: isSel ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        background: isSel ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                        color: isSel ? 'var(--teal-primary)' : 'var(--text-main)',
                        fontWeight: isSel ? 700 : 500,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Layers size={14} />
                      <span>{outfit.name} ({outfit.sceneTag})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Select Background Environment Preset */}
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                2. เลือกสภาพแวดล้อมและฉากหลัง (Scene Background Environment):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
                {bgPresets.map(preset => {
                  const isSel = selectedBgPreset === preset.id;
                  return (
                    <div
                      key={preset.id}
                      onClick={() => setSelectedBgPreset(preset.id)}
                      style={{
                        border: isSel ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        background: isSel ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <strong style={{ fontSize: '0.86rem', color: isSel ? 'var(--teal-primary)' : 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                        {preset.label}
                      </strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', display: 'block' }}>
                        {preset.tag}
                      </span>
                    </div>
                  );
                })}
              </div>

              {selectedBgPreset === 'custom' && (
                <div style={{ marginTop: '10px' }}>
                  <input
                    type="text"
                    value={customBgPrompt}
                    onChange={(e) => setCustomBgPrompt(e.target.value)}
                    placeholder="พิมพ์คำสั่งระบุฉากหลังตามต้องการ (เช่น: abandoned industrial factory warehouse, wet floor, moonlight beaming through cracked roof...)"
                    style={{ width: '100%', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--teal-primary)', background: 'var(--bg-surface)', fontSize: '0.86rem' }}
                  />
                </div>
              )}
            </div>

            {/* Step 3: Select Emotion & Acting FACS */}
            <div>
              <label style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                3. เลือกอารมณ์และการแสดงสีหน้า (Emotion & Dramatic Expression):
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
                {emotionPresets.map(emo => {
                  const isSel = selectedEmotionPreset === emo.id;
                  return (
                    <div
                      key={emo.id}
                      onClick={() => setSelectedEmotionPreset(emo.id)}
                      style={{
                        border: isSel ? '2px solid var(--accent-red)' : '1px solid var(--border-subtle)',
                        background: isSel ? 'var(--accent-red-bg)' : 'var(--bg-surface)',
                        borderRadius: 'var(--radius-md)',
                        padding: '12px 14px',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <strong style={{ fontSize: '0.84rem', color: isSel ? 'var(--accent-red)' : 'var(--text-main)', display: 'block' }}>
                        {emo.label}
                      </strong>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Synthesized Prompts with One-Click Copy */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              
              {/* Box 1: Image AI Prompt (Midjourney / SDXL / Flux) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: 'var(--shadow-raised-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Image size={18} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      1. Prompt สร้างภาพนิ่ง 9:16 (Midjourney / Flux / SDXL)
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(synthesizedImagePrompt, 'Prompt สร้างภาพ')}
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Copy size={13} />
                    <span>คัดลอก Prompt รูปภาพ</span>
                  </button>
                </div>

                <textarea
                  readOnly
                  rows={6}
                  value={synthesizedImagePrompt}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-inset)',
                    color: 'var(--text-main)',
                    fontSize: '0.82rem',
                    fontFamily: 'monospace',
                    lineHeight: 1.45,
                    resize: 'none'
                  }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  * รวม Face-Lock + ชุด {activeOutfit.name} + อารมณ์ + ฉากหลัง + สเปก 9:16 Vertical
                </span>
              </div>

              {/* Box 2: Video AI Generation Prompt (Runway Gen-3 / Kling / Sora) */}
              <div style={{
                background: 'var(--bg-surface)',
                border: '1.5px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '18px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                boxShadow: 'var(--shadow-raised-sm)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Video size={18} color="var(--accent-red)" />
                    <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                      2. Prompt สร้างคลิปวิดีโอ (Runway Gen-3 / Kling / Sora)
                    </strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(synthesizedVideoPrompt, 'Prompt สร้างวิดีโอ')}
                    className="btn-primary"
                    style={{ padding: '6px 12px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Copy size={13} />
                    <span>คัดลอก Prompt วิดีโอ</span>
                  </button>
                </div>

                <textarea
                  readOnly
                  rows={6}
                  value={synthesizedVideoPrompt}
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-inset)',
                    color: 'var(--text-main)',
                    fontSize: '0.82rem',
                    fontFamily: 'monospace',
                    lineHeight: 1.45,
                    resize: 'none'
                  }}
                />
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  * รวมการสั่งเคลื่อนไหวกล้อง อกกระเพื่อมตามการหายใจ ปากสั่น และละอองฝนสะท้อนแสง
                </span>
              </div>

            </div>
          </div>
        )}

        {/* TAB 8: AI AUTO-GENERATOR (OpenRouter) */}
        {activeTab === 'ai' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{
              padding: '20px',
              background: 'var(--bg-inset)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              boxShadow: 'var(--shadow-inset)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <strong style={{ fontSize: '0.94rem', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={18} />
                  ให้ AI ช่วยสร้างตัวละครพร้อมรายละเอียดทั้งระบบใน 1 คลิก
                </strong>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  โมเดล: {OPENROUTER_MODELS.find(m => m.id === selectedModel)?.name || 'Claude 3.5 Sonnet'}
                </span>
              </div>

              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: '0 0 14px 0' }}>
                ป้อนไอเดียหรือเลือก Archetype บทบาท เพื่อให้ AI คิดค้นชื่อ ประวัติ ปูมหลัง ปมดราม่า สเปกเสื้อผ้า โทนเสียง และค่ากล้ามเนื้อใบหน้า FACS ให้โดยอัตโนมัติ
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
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
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-pill)',
                      border: selectedArchetype === arch.label ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      background: selectedArchetype === arch.label ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                      color: selectedArchetype === arch.label ? 'var(--teal-primary)' : 'var(--text-main)',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    {arch.label}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <input
                  type="text"
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder="เช่น: ทายาทสาวตระกูลดังที่ถูกลักพาตัวในวัยเด็ก เติบโตมาเป็นแฮกเกอร์สายเทา มีแววตามุ่งมั่นไม่ไว้ใจใคร..."
                  style={{
                    flex: 1,
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-subtle)',
                    background: 'var(--bg-surface)',
                    color: 'var(--text-main)',
                    fontSize: '0.9rem'
                  }}
                />
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 22px', whiteSpace: 'nowrap' }}
                >
                  <RefreshCw size={16} className={isGenerating ? 'animate-spin' : ''} />
                  <span>{isGenerating ? 'AI กำลังสร้าง...' : 'สร้างตัวละครทันที'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Sticky Bottom Actions Bar */}
      <div style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 40,
        padding: '14px 24px',
        background: 'var(--bg-surface)',
        borderTop: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 -4px 16px rgba(190, 180, 160, 0.2)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          style={{ padding: '8px 20px', fontSize: '0.85rem' }}
        >
          ยกเลิก
        </button>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            ตรวจสอบข้อมูลครบทุกแท็บแล้ว:
          </span>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 28px', fontSize: '0.9rem', fontWeight: 700 }}
          >
            <Save size={18} strokeWidth={2.5} />
            <span>{isEditMode ? 'บันทึกการแก้ไขตัวละคร' : 'บันทึกตัวละครใหม่'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
