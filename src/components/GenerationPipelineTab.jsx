import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Pause, RotateCcw, Volume2, VolumeX, Video, Smartphone, Sparkles, 
  Layers, Sliders, CheckCircle2, Camera, Eye, Activity, Crosshair, Heart, 
  MessageCircle, Share2, Grid, Copy, Check, Download, Compass, Zap, Film, 
  Mic, Settings, AlertCircle, Edit3, Save, Music, CloudRain, Disc, Radio, 
  FastForward, Volume1, RefreshCw, Wand2, Info, Key
} from 'lucide-react';
import ProductionPromptModal from './ProductionPromptModal';
import ElevenLabsSettingsModal from './ElevenLabsSettingsModal';
import RenderSimulationModal from './RenderSimulationModal';
import { generateShotProductionPrompt, buildKeyframeFocusPromptSnippet } from '../utils/promptEngine';
import { HOLLYWOOD_EMOTIONAL_ARCHETYPES } from '../utils/cinematographyEngine';
import { 
  getStoredElevenLabsApiKey, 
  PRESET_VOICES, 
  ELEVENLABS_MODELS, 
  synthesizeSpeechWithElevenLabs, 
  speakWithBrowserWebSpeech, 
  stopBrowserSpeech, 
  cinematicAudio, 
  saveVoiceConfig, 
  getStoredVoiceConfigs,
  cleanDialogueForSpeech
} from '../utils/elevenLabs';

export default function GenerationPipelineTab({ shots = [], characters = [], series = {} }) {
  // Navigation & Player State
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShotIdx, setCurrentShotIdx] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showFaceTracking, setShowFaceTracking] = useState(false); // ค่าเริ่มต้น: ปิดไว้เป็น Auto Focus ป้องกัน AI วิดีโอหลอน
  const [showFramingGrid, setShowFramingGrid] = useState(true);
  const [showGoldenSpiral, setShowGoldenSpiral] = useState(false);
  const [showRainFX, setShowRainFX] = useState(true);

  // Per-shot Custom Keyframe Camera Focus & Motion State (ค่าเริ่มต้น: ทุกฉากเป็น Auto-Focus มาตรฐาน)
  const [shotKeyframeFocusMap, setShotKeyframeFocusMap] = useState({});
  const [activeEditingKeyframe, setActiveEditingKeyframe] = useState('kf1'); // 'kf1' | 'kf2'
  const [copiedKeyframePrompt, setCopiedKeyframePrompt] = useState(false);

  // Interactive Camera Focus Reticle State
  const [focusCoords, setFocusCoords] = useState({ x: 18, y: 21 });
  const [focusPreset, setFocusPreset] = useState('face'); // 'face' | 'golden' | 'center' | 'desk' | 'right' | 'custom'
  const [isDraggingFocus, setIsDraggingFocus] = useState(false);
  const monitorContainerRef = useRef(null);

  const FOCUS_PRESETS = [
    { id: 'face', label: 'Face Anchor (ใบหน้า)', x: 18, y: 21 },
    { id: 'golden', label: 'Golden Spiral (จุดตัดทองคำ)', x: 35, y: 33 },
    { id: 'center', label: 'Center Eye (กึ่งกลาง)', x: 32, y: 38 },
    { id: 'desk', label: 'Desk / Prop (โต๊ะ & สินค้า)', x: 25, y: 60 },
    { id: 'right', label: 'Right Third (ขวา)', x: 50, y: 24 }
  ];

  // Default template for a newly enabled keyframe shot
  const getDefaultKeyframeConfig = () => ({
    enabled: true,
    motionType: 'rack_focus',
    transitionDuration: 3.5,
    curve: 'ease_in_out',
    keyframes: [
      { id: 'kf1', time: 0.0, label: 'Keyframe A (จุดเริ่ม)', x: 18, y: 21, zoom: 1.0, dof: 'f/1.4', targetName: 'Face Anchor' },
      { id: 'kf2', time: 3.5, label: 'Keyframe B (จุดปลาย)', x: 25, y: 60, zoom: 0.88, dof: 'f/4.0', targetName: 'Desk Anchor' }
    ]
  });

  const handleEnableKeyframeFocus = (shotId) => {
    const targetId = shotId || rawActiveShot?.id;
    if (!targetId) return;
    setShotKeyframeFocusMap(prev => ({
      ...prev,
      [targetId]: prev[targetId] ? { ...prev[targetId], enabled: true } : getDefaultKeyframeConfig()
    }));
    setShowFaceTracking(true);
  };

  const handleDisableKeyframeFocus = (shotId) => {
    const targetId = shotId || rawActiveShot?.id;
    if (!targetId) return;
    setShotKeyframeFocusMap(prev => ({
      ...prev,
      [targetId]: { ...(prev[targetId] || getDefaultKeyframeConfig()), enabled: false }
    }));
    setShowFaceTracking(false);
  };

  const handleApplyMotionPreset = (preset) => {
    if (!rawActiveShot?.id) return;
    setShotKeyframeFocusMap(prev => ({
      ...prev,
      [rawActiveShot.id]: {
        enabled: true,
        motionType: preset.id,
        transitionDuration: preset.duration || 3.5,
        curve: 'ease_in_out',
        keyframes: [
          { id: 'kf1', time: 0.0, label: 'Keyframe A (จุดเริ่ม)', ...preset.kf1 },
          { id: 'kf2', time: preset.duration || 3.5, label: 'Keyframe B (จุดปลาย)', ...preset.kf2 }
        ]
      }
    }));
    setShowFaceTracking(true);
  };

  const updateActiveKeyframeCoord = (newX, newY) => {
    if (!rawActiveShot?.id) return;
    setShotKeyframeFocusMap(prev => {
      const current = prev[rawActiveShot.id] || getDefaultKeyframeConfig();
      const updatedKeyframes = current.keyframes.map(kf => {
        if (kf.id === activeEditingKeyframe) {
          return { ...kf, x: newX, y: newY };
        }
        return kf;
      });
      return {
        ...prev,
        [rawActiveShot.id]: {
          ...current,
          enabled: true,
          keyframes: updatedKeyframes
        }
      };
    });
    setFocusCoords({ x: newX, y: newY });
  };

  const updateActiveKeyframeZoom = (newZoom) => {
    if (!rawActiveShot?.id) return;
    setShotKeyframeFocusMap(prev => {
      const current = prev[rawActiveShot.id] || getDefaultKeyframeConfig();
      const updatedKeyframes = current.keyframes.map(kf => {
        if (kf.id === activeEditingKeyframe) {
          return { ...kf, zoom: newZoom };
        }
        return kf;
      });
      return {
        ...prev,
        [rawActiveShot.id]: {
          ...current,
          enabled: true,
          keyframes: updatedKeyframes
        }
      };
    });
  };

  const handleSelectFocusPreset = (preset) => {
    setFocusPreset(preset.id);
    const currentConfig = shotKeyframeFocusMap[rawActiveShot?.id];
    if (currentConfig?.enabled) {
      updateActiveKeyframeCoord(preset.x, preset.y);
    } else {
      setFocusCoords({ x: preset.x, y: preset.y });
    }
  };

  const updateFocusFromEvent = (e) => {
    if (!monitorContainerRef.current) return;
    const rect = monitorContainerRef.current.getBoundingClientRect();
    const clickX = ((e.clientX - rect.left - 74) / rect.width) * 100;
    const clickY = ((e.clientY - rect.top - 84) / rect.height) * 100;
    const clampedX = Math.max(2, Math.min(Math.round(clickX), 72));
    const clampedY = Math.max(2, Math.min(Math.round(clickY), 72));
    
    const currentConfig = shotKeyframeFocusMap[rawActiveShot?.id];
    if (currentConfig?.enabled) {
      updateActiveKeyframeCoord(clampedX, clampedY);
    } else {
      setFocusCoords({ x: clampedX, y: clampedY });
      setFocusPreset('custom');
    }
  };

  const handleMonitorMouseMove = (e) => {
    if (!isDraggingFocus) return;
    updateFocusFromEvent(e);
  };

  const handleMonitorMouseUp = () => {
    setIsDraggingFocus(false);
  };

  // Modals
  const [showRenderModal, setShowRenderModal] = useState(false);
  const [showElevenLabsModal, setShowElevenLabsModal] = useState(false);
  const [showPromptModal, setShowPromptModal] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Script & Cinematography customization
  const [customArchetypeMap, setCustomArchetypeMap] = useState({});
  const [editedDialogueMap, setEditedDialogueMap] = useState({});
  const [isEditingDialogue, setIsEditingDialogue] = useState(false);
  const [customVoiceIdMap, setCustomVoiceIdMap] = useState({});

  // ElevenLabs Voice & Audio Engine State
  const [elevenApiKey, setElevenApiKey] = useState('');
  const [selectedVoicePreset, setSelectedVoicePreset] = useState('EXAVITQu4vr4xnSDxMaL');
  const [customVoiceIdInput, setCustomVoiceIdInput] = useState('');
  const [selectedModelId, setSelectedModelId] = useState('eleven_multilingual_v2');
  const [voiceStability, setVoiceStability] = useState(0.40);
  const [voiceSimilarity, setVoiceSimilarity] = useState(0.85);
  const [voiceStyle, setVoiceStyle] = useState(0.25);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  
  // Voice Synthesis Status
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [synthesisSuccess, setSynthesisSuccess] = useState(false);
  const [synthesisError, setSynthesisError] = useState(null);
  const [generatedAudios, setGeneratedAudios] = useState({}); // shotId -> audioUrl
  const [activeSpeechMode, setActiveSpeechMode] = useState('elevenlabs'); // 'elevenlabs' | 'webspeech'

  // Multi-Track Audio Mixer
  const [mixerVolumes, setMixerVolumes] = useState({
    vocal: 0.95,
    sfx: 0.45,
    bgm: 0.35,
    master: 0.85
  });
  const [mixerMute, setMixerMute] = useState({
    vocal: false,
    sfx: false,
    bgm: false
  });

  const audioElementRef = useRef(null);

  // Load ElevenLabs API key and stored voice preferences on mount & on settings updates
  useEffect(() => {
    const syncSettings = () => {
      const key = getStoredElevenLabsApiKey();
      setElevenApiKey(key);
      const storedConfigs = getStoredVoiceConfigs();
      if (storedConfigs && typeof storedConfigs === 'object') {
        const vMap = {};
        Object.keys(storedConfigs).forEach(id => {
          if (storedConfigs[id]?.voiceId) {
            vMap[id] = storedConfigs[id].voiceId;
          }
        });
        setCustomVoiceIdMap(vMap);
      }
    };

    syncSettings();
    window.addEventListener('storage', syncSettings);
    window.addEventListener('seriesx_settings_updated', syncSettings);
    return () => {
      window.removeEventListener('storage', syncSettings);
      window.removeEventListener('seriesx_settings_updated', syncSettings);
    };
  }, []);

  const rawActiveShot = shots[currentShotIdx] || shots[0] || {};
  const activeChar = characters.find(c => {
    const cName = (c.name || '').split('/')[0].trim();
    const sName = (rawActiveShot?.actorDirecting?.character || rawActiveShot?.character || '').trim();
    return cName.includes(sName) || sName.includes(cName);
  }) || characters[0] || {};

  // Apply custom Hollywood archetype override if selected
  const activeArchKey = customArchetypeMap[rawActiveShot?.id];
  const customArch = activeArchKey ? HOLLYWOOD_EMOTIONAL_ARCHETYPES[activeArchKey] : null;

  const currentDialogue = editedDialogueMap[rawActiveShot?.id] !== undefined
    ? editedDialogueMap[rawActiveShot?.id]
    : (rawActiveShot.vocalProsody?.withCues || rawActiveShot.dialogue || '');

  const activeKeyframeConfig = shotKeyframeFocusMap[rawActiveShot?.id] || {
    enabled: false,
    motionType: 'rack_focus',
    transitionDuration: 3.5,
    curve: 'ease_in_out',
    keyframes: [
      { id: 'kf1', time: 0.0, label: 'Keyframe A (จุดเริ่ม)', x: 18, y: 21, zoom: 1.0, dof: 'f/1.4', targetName: 'Face Anchor' },
      { id: 'kf2', time: 3.5, label: 'Keyframe B (จุดปลาย)', x: 25, y: 60, zoom: 0.88, dof: 'f/4.0', targetName: 'Desk Anchor' }
    ]
  };

  const shotStartTimes = [0, 5, 16, 36];
  const shotStartTime = shotStartTimes[currentShotIdx] || 0;
  const shotElapsedTime = Math.max(0, playbackTime - shotStartTime);

  const currentKeyframeState = (() => {
    const kf1 = activeKeyframeConfig.keyframes?.[0] || { x: 18, y: 21, zoom: 1.0, targetName: 'Face Anchor' };
    const kf2 = activeKeyframeConfig.keyframes?.[1] || { x: 25, y: 60, zoom: 0.88, targetName: 'Desk Anchor' };
    if (!activeKeyframeConfig.enabled) {
      return {
        x: focusCoords.x,
        y: focusCoords.y,
        zoom: 1.0,
        progress: 0,
        isCustom: false,
        kf1,
        kf2
      };
    }
    const dur = activeKeyframeConfig.transitionDuration || 3.5;
    const progress = Math.max(0, Math.min(1, shotElapsedTime / dur));
    // Ease in-out cubic
    const eased = progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    const interpX = Math.round(kf1.x + (kf2.x - kf1.x) * eased);
    const interpY = Math.round(kf1.y + (kf2.y - kf1.y) * eased);
    const interpZoom = +(kf1.zoom + (kf2.zoom - kf1.zoom) * eased).toFixed(2);
    return {
      x: interpX,
      y: interpY,
      zoom: interpZoom,
      progress: Math.round(progress * 100),
      isCustom: true,
      kf1,
      kf2
    };
  })();

  const activeShot = customArch ? {
    ...rawActiveShot,
    dialogue: currentDialogue,
    cameraDirector: {
      ...rawActiveShot.cameraDirector,
      lens: customArch.lens,
      movement: customArch.movement,
      framing: customArch.framing,
      depthOfField: customArch.depthOfField,
      tiltAngle: customArch.tiltAngle,
      hollywoodRef: customArch.hollywoodRef,
      psychologicalIntent: customArch.psychologicalIntent,
      lightingRatio: customArch.lightingRatio
    },
    actorDirecting: {
      ...rawActiveShot.actorDirecting,
      facsCode: customArch.facsCode,
      biologicalMotion: customArch.biologicalMotion
    },
    keyframeFocus: activeKeyframeConfig
  } : {
    ...rawActiveShot,
    dialogue: currentDialogue,
    keyframeFocus: activeKeyframeConfig
  };

  const currentShotPrompt = generateShotProductionPrompt(activeShot, activeChar, series, currentShotIdx, shots);

  // Sync effective voice ID
  const effectiveVoiceId = customVoiceIdMap[rawActiveShot?.id] || 
    (selectedVoicePreset === 'custom' ? customVoiceIdInput : selectedVoicePreset);

  // Synchronized Playback Loop
  useEffect(() => {
    let interval;
    if (isPlaying) {
      // Start ambient audio (SFX rain + BGM drone) via Web Audio API
      cinematicAudio.startAmbiance({
        rain: !mixerMute.sfx,
        drone: !mixerMute.bgm,
        rainVol: mixerVolumes.sfx * mixerVolumes.master,
        droneVol: mixerVolumes.bgm * mixerVolumes.master
      });

      interval = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= 70) {
            setIsPlaying(false);
            cinematicAudio.stopAmbiance();
            stopVoiceAudio();
            return 0;
          }
          const nextTime = prev + 1;
          if (nextTime < 4) setCurrentShotIdx(0);
          else if (nextTime < 15) setCurrentShotIdx(1);
          else if (nextTime < 35) setCurrentShotIdx(2);
          else setCurrentShotIdx(3);
          return nextTime;
        });
      }, 1000);
    } else {
      cinematicAudio.stopAmbiance();
    }
    return () => {
      clearInterval(interval);
      cinematicAudio.stopAmbiance();
    };
  }, [isPlaying, mixerMute, mixerVolumes]);

  // Adjust audio levels dynamically when mixer volumes change
  useEffect(() => {
    cinematicAudio.setRainVolume(mixerMute.sfx ? 0 : mixerVolumes.sfx * mixerVolumes.master);
    cinematicAudio.setDroneVolume(mixerMute.bgm ? 0 : mixerVolumes.bgm * mixerVolumes.master);
    cinematicAudio.setMasterVolume(mixerVolumes.master);
    if (audioElementRef.current) {
      audioElementRef.current.volume = mixerMute.vocal ? 0 : mixerVolumes.vocal * mixerVolumes.master;
    }
  }, [mixerVolumes, mixerMute]);

  // Stop vocal audio helper
  const stopVoiceAudio = () => {
    if (audioElementRef.current) {
      audioElementRef.current.pause();
      audioElementRef.current.currentTime = 0;
    }
    stopBrowserSpeech();
    setIsPlayingVoice(false);
  };

  // Play Vocal Dialogue (Either ElevenLabs generated blob or Web Speech API fallback)
  const handlePlayVoice = () => {
    if (isPlayingVoice) {
      stopVoiceAudio();
      return;
    }

    const cachedAudio = generatedAudios[rawActiveShot?.id];
    if (cachedAudio) {
      // Play high-fidelity ElevenLabs audio from blob
      if (!audioElementRef.current) {
        audioElementRef.current = new Audio(cachedAudio);
      } else {
        audioElementRef.current.src = cachedAudio;
      }
      audioElementRef.current.volume = mixerMute.vocal ? 0 : mixerVolumes.vocal * mixerVolumes.master;
      audioElementRef.current.onplay = () => setIsPlayingVoice(true);
      audioElementRef.current.onended = () => setIsPlayingVoice(false);
      audioElementRef.current.onerror = () => setIsPlayingVoice(false);
      audioElementRef.current.play().catch(e => console.error(e));
      setActiveSpeechMode('elevenlabs');
      return;
    }

    // If no generated audio yet, speak using browser Web Speech API fallback immediately
    setActiveSpeechMode('webspeech');
    setIsPlayingVoice(true);

    let pitch = 1.0;
    if (activeChar?.voiceProfile?.pitch?.includes('-2')) pitch = 0.88;
    else if (activeChar?.voiceProfile?.pitch?.includes('-4')) pitch = 0.75;
    else if (activeChar?.voiceProfile?.pitch?.includes('+')) pitch = 1.25;

    let rate = 1.0;
    if (activeChar?.voiceProfile?.speed) {
      const sp = parseFloat(activeChar.voiceProfile.speed);
      if (!isNaN(sp)) rate = sp;
    }

    speakWithBrowserWebSpeech({
      text: currentDialogue,
      pitch,
      rate,
      onStart: () => setIsPlayingVoice(true),
      onEnd: () => setIsPlayingVoice(false),
      onError: () => setIsPlayingVoice(false)
    });
  };

  // Synthesize Speech with ElevenLabs API
  const handleSynthesizeElevenLabs = async () => {
    setSynthesisError(null);
    setSynthesisSuccess(false);

    if (!elevenApiKey) {
      // Inform user and trigger fallback speech
      setSynthesisError('ยังไม่ได้ระบุ ElevenLabs API Key — กำลังจำลองเสียงด้วย Web Speech API');
      handlePlayVoice();
      return;
    }

    setIsSynthesizing(true);
    try {
      const result = await synthesizeSpeechWithElevenLabs({
        text: currentDialogue,
        voiceId: effectiveVoiceId || 'EXAVITQu4vr4xnSDxMaL',
        apiKey: elevenApiKey,
        modelId: selectedModelId,
        stability: voiceStability,
        similarityBoost: voiceSimilarity,
        style: voiceStyle,
        speakerBoost: speakerBoost
      });

      if (result.success && result.audioUrl) {
        setGeneratedAudios(prev => ({
          ...prev,
          [rawActiveShot?.id]: result.audioUrl
        }));
        setSynthesisSuccess(true);
        setActiveSpeechMode('elevenlabs');

        // Play the newly synthesized audio immediately
        if (!audioElementRef.current) {
          audioElementRef.current = new Audio(result.audioUrl);
        } else {
          audioElementRef.current.src = result.audioUrl;
        }
        audioElementRef.current.volume = mixerMute.vocal ? 0 : mixerVolumes.vocal * mixerVolumes.master;
        audioElementRef.current.onplay = () => setIsPlayingVoice(true);
        audioElementRef.current.onended = () => setIsPlayingVoice(false);
        audioElementRef.current.onerror = () => setIsPlayingVoice(false);
        audioElementRef.current.play();

        // Save voice ID mapping for shot
        saveVoiceConfig(rawActiveShot?.id, { voiceId: effectiveVoiceId });
      }
    } catch (err) {
      setSynthesisError(err.message || 'เกิดข้อผิดพลาดในการสังเคราะห์เสียง ElevenLabs');
      // Graceful fallback to Web Speech
      handlePlayVoice();
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Handle clicking on scrubber bar to seek
  const handleScrubberClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetSeconds = Math.round(ratio * 70);
    setPlaybackTime(targetSeconds);

    if (targetSeconds < 4) setCurrentShotIdx(0);
    else if (targetSeconds < 15) setCurrentShotIdx(1);
    else if (targetSeconds < 35) setCurrentShotIdx(2);
    else setCurrentShotIdx(3);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Engine Status Banner */}
      <div className="clay-card" style={{
        padding: '18px 24px',
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
            background: 'linear-gradient(135deg, #135E67, #0B4A51)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: 'var(--shadow-teal-btn)'
          }}>
            <Camera size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h2 style={{ fontSize: '1.1rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                AI Cinematography, Acting & Sound Synthesis Engine
              </h2>
              <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>9:16 UHD</span>
              {elevenApiKey ? (
                <span className="badge badge-green" style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <CheckCircle2 size={12} /> ElevenLabs Active
                </span>
              ) : (
                <span className="badge badge-amber" style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Mic size={12} /> Web Speech Ready
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              ประมวลผลมุมกล้องฮอลลีวูด 9:16 (Lens & Motion) + สีหน้าการแสดงสมจริง (FACS & Tears) + สังเคราะห์เสียงพากย์ด้วย ElevenLabs
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowElevenLabsModal(true)}
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              border: elevenApiKey ? '1px solid var(--accent-green)' : '1px solid var(--border-subtle)',
              color: elevenApiKey ? 'var(--accent-green)' : 'var(--text-main)'
            }}
            title="ตั้งค่า ElevenLabs API Key และค้นหา Voice ID ที่สร้างไว้"
          >
            <Settings size={15} />
            <span>{elevenApiKey ? 'จัดการ ElevenLabs (เชื่อมแล้ว)' : 'ตั้งค่า ElevenLabs (API & Voice ID)'}</span>
          </button>

          <button
            onClick={() => setShowPromptModal(true)}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              fontSize: '0.82rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #135E67, #0B4A51)',
              boxShadow: 'var(--shadow-teal-btn)'
            }}
            title="เปิดชุด Production Prompts ครบทั้ง 8 มิติสำหรับ Kling, Runway Gen-3, Sora"
          >
            <Sparkles size={16} strokeWidth={2.2} />
            <span>ส่งออก Production Prompts (8 มิติ)</span>
          </button>

          <button
            onClick={() => setShowRenderModal(true)}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <Wand2 size={15} />
            <span>Re-render Shot Acting</span>
          </button>
        </div>
      </div>

      {/* Main Studio Viewport & Mixer Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '24px' }}>
        
        {/* Left Column: 9:16 Vertical Video Monitor with HUD Overlays */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div 
            ref={monitorContainerRef}
            onMouseMove={handleMonitorMouseMove}
            onMouseUp={handleMonitorMouseUp}
            onClick={(e) => {
              if (showFaceTracking && !isDraggingFocus) {
                updateFocusFromEvent(e);
              }
            }}
            style={{
              position: 'relative',
              width: '100%',
              height: '670px',
              borderRadius: '24px',
              overflow: 'hidden',
              border: '4px solid var(--border-subtle)',
              background: '#000000',
              boxShadow: 'var(--shadow-raised)',
              cursor: showFaceTracking ? (isDraggingFocus ? 'grabbing' : 'crosshair') : 'default',
              userSelect: 'none'
            }}>
            {/* Main Video Frame with Dynamic Slow Push-In Animation */}
            <div style={{
              width: '100%',
              height: '100%',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={activeShot.mediaUrl}
                alt="Vertical Frame"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transformOrigin: `${currentKeyframeState.x}% ${currentKeyframeState.y}%`,
                  transform: activeKeyframeConfig.enabled 
                    ? `scale(${currentKeyframeState.zoom})` 
                    : (isPlaying ? 'scale(1.08) translate3d(0px, -4px, 0px)' : 'scale(1.0)'),
                  transition: activeKeyframeConfig.enabled && isPlaying 
                    ? 'transform 0.4s linear' 
                    : 'transform 3.5s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
              />
            </div>

            {/* Rain Atmosphere Layer (เม็ดฝนกระจกหรู) */}
            {showRainFX && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, transparent 60%)',
                opacity: 0.8
              }}>
                {/* Subtle Rain Streaks */}
                <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%', opacity: 0.25 }}>
                  <line x1="15" y1="0" x2="18" y2="100" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="6 20" />
                  <line x1="45" y1="0" x2="48" y2="100" stroke="#FFFFFF" strokeWidth="0.4" strokeDasharray="10 25" />
                  <line x1="75" y1="0" x2="78" y2="100" stroke="#FFFFFF" strokeWidth="0.3" strokeDasharray="8 22" />
                  <line x1="90" y1="0" x2="93" y2="100" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="12 30" />
                </svg>
              </div>
            )}

            {/* 9:16 Cinematic Rule-of-Thirds Grid */}
            {showFramingGrid && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr 1fr',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.22)', borderBottom: '1px dashed rgba(255,255,255,0.22)' }} />
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.22)', borderBottom: '1px dashed rgba(255,255,255,0.22)' }} />
                <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.22)' }} />
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.22)' }} />
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.22)' }} />
                <div />
              </div>
            )}

            {/* 9:16 Cinematic Golden Spiral (ก้นหอยทองคำ φ) Overlay */}
            {showGoldenSpiral && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                zIndex: 10
              }}>
                <svg viewBox="0 0 1080 1920" style={{ width: '100%', height: '100%' }}>
                  <line x1="667" y1="0" x2="667" y2="1920" stroke="rgba(212, 175, 55, 0.4)" strokeDasharray="8 8" strokeWidth="2.5" />
                  <line x1="0" y1="733" x2="1080" y2="733" stroke="rgba(212, 175, 55, 0.4)" strokeDasharray="8 8" strokeWidth="2.5" />
                  <path
                    d="M 0,1920 A 1080,1080 0 0,0 1080,840 A 667,667 0 0,0 413,173 A 413,413 0 0,0 0,586 A 255,255 0 0,0 255,841 A 158,158 0 0,0 413,683 A 97,97 0 0,0 316,586"
                    fill="none"
                    stroke="rgba(212, 175, 55, 0.85)"
                    strokeWidth="4"
                  />
                  <circle cx="380" cy="650" r="18" fill="rgba(212, 175, 55, 0.25)" stroke="rgba(212, 175, 55, 0.95)" strokeWidth="3" />
                  <circle cx="380" cy="650" r="4" fill="#FFFFFF" />
                  <text x="415" y="658" fill="rgba(255, 235, 160, 0.95)" fontSize="34" fontWeight="bold" fontFamily="sans-serif">
                    φ Golden Eye Focal (Upper-Third)
                  </text>
                </svg>
              </div>
            )}

            {/* Keyframe Camera Rack Path Vector */}
            {activeKeyframeConfig.enabled && showFaceTracking && (
              <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 18 }}>
                <defs>
                  <marker id="rackArrow" markerWidth="6" markerHeight="6" refX="4" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L6,3 z" fill="#10B981" />
                  </marker>
                </defs>
                {/* Connecting Path */}
                <line 
                  x1={`${(currentKeyframeState.kf1?.x || 18) + 12}%`} 
                  y1={`${(currentKeyframeState.kf1?.y || 21) + 12}%`} 
                  x2={`${(currentKeyframeState.kf2?.x || 25) + 12}%`} 
                  y2={`${(currentKeyframeState.kf2?.y || 60) + 12}%`} 
                  stroke="rgba(16, 185, 129, 0.65)" 
                  strokeWidth="2.5" 
                  strokeDasharray="4 4"
                  markerEnd="url(#rackArrow)"
                />
                {/* Keyframe A Dot */}
                <circle cx={`${(currentKeyframeState.kf1?.x || 18) + 12}%`} cy={`${(currentKeyframeState.kf1?.y || 21) + 12}%`} r="6" fill="#F59E0B" />
                {/* Keyframe B Dot */}
                <circle cx={`${(currentKeyframeState.kf2?.x || 25) + 12}%`} cy={`${(currentKeyframeState.kf2?.y || 60) + 12}%`} r="6" fill="#10B981" />
              </svg>
            )}

            {/* Actor Face-Mesh & FACS HUD with Interactive Drag & Tap to Focus */}
            {showFaceTracking && (
              <div 
                onMouseDown={(e) => {
                  e.stopPropagation();
                  setIsDraggingFocus(true);
                }}
                style={{
                  position: 'absolute',
                  top: `${currentKeyframeState.y}%`,
                  left: `${currentKeyframeState.x}%`,
                  width: '148px',
                  height: '168px',
                  border: isDraggingFocus ? '2px solid #10B981' : (activeKeyframeConfig.enabled ? '2px solid #10B981' : '1.5px solid var(--accent-green)'),
                  borderRadius: '8px',
                  pointerEvents: 'auto',
                  cursor: isDraggingFocus ? 'grabbing' : 'grab',
                  boxShadow: isPlayingVoice ? '0 0 16px rgba(31, 122, 89, 0.8)' : (isDraggingFocus ? '0 0 20px rgba(16, 185, 129, 0.9)' : '0 0 12px rgba(16, 185, 129, 0.4)'),
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '6px',
                  animation: isPlayingVoice ? 'radarPing 1.8s infinite' : 'none',
                  transition: isDraggingFocus ? 'none' : 'top 0.15s ease, left 0.15s ease',
                  zIndex: 20
                }}
                title={activeKeyframeConfig.enabled ? `กำลังแก้ไข ${activeEditingKeyframe === 'kf1' ? 'Keyframe A' : 'Keyframe B'}: ลากหรือคลิกบนจอเพื่อย้าย` : "คลิกแล้วลากเพื่อเปลี่ยนจุดโฟกัส"}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.62rem', color: '#FFFFFF', background: 'rgba(15, 25, 26, 0.85)', padding: '2px 4px', borderRadius: '3px' }}>
                    {activeKeyframeConfig.enabled 
                      ? (activeEditingKeyframe === 'kf1' ? '📍 KF-A Editing' : '🎯 KF-B Editing')
                      : `FACS: ${activeShot.actorDirecting?.facsCode ? activeShot.actorDirecting.facsCode.split('(')[0] : 'AU1+AU4'}`}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '0.55rem', color: '#A7F3D0', background: 'rgba(0,0,0,0.7)', padding: '1px 4px', borderRadius: '2px', fontWeight: 700 }}>
                      X:{currentKeyframeState.x}% Y:{currentKeyframeState.y}%
                    </span>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: activeKeyframeConfig.enabled ? '#10B981' : (isPlayingVoice ? 'var(--accent-green)' : 'var(--accent-amber)') }} />
                  </div>
                </div>

                {/* Center crosshair indicator */}
                <div style={{ alignSelf: 'center', color: 'rgba(16, 185, 129, 0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px', fontSize: '0.6rem', pointerEvents: 'none' }}>
                  <Crosshair size={14} />
                  {activeKeyframeConfig.enabled ? (
                    <span style={{ fontSize: '0.52rem', textTransform: 'uppercase', color: '#6EE7B7', fontWeight: 700 }}>
                      {currentKeyframeState.progress}% | Zoom: {currentKeyframeState.zoom}x
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.52rem', textTransform: 'uppercase', opacity: 0.9 }}>
                      {isDraggingFocus ? 'Moving Focus...' : 'Focus Target'}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <span style={{ fontSize: '0.58rem', color: 'var(--teal-subtle)', background: 'rgba(15, 25, 26, 0.85)', padding: '2px 4px', borderRadius: '3px' }}>
                    {activeKeyframeConfig.enabled ? `🎬 ${activeKeyframeConfig.motionType}` : (isPlayingVoice ? '🗣️ Lip-Sync Locked' : '👁️ Gaze Track')}
                  </span>
                  <span style={{ fontSize: '0.6rem', color: 'var(--teal-subtle)', background: 'rgba(15, 25, 26, 0.85)', padding: '2px 4px', borderRadius: '3px' }}>
                    {activeShot.cameraDirector?.lens?.split('(')[0] || '85mm f/1.4'}
                  </span>
                </div>
              </div>
            )}

            {/* Social Overlay for Safe Zone Checking */}
            {showOverlay && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span style={{ background: 'rgba(0,0,0,0.5)', padding: '4px 10px', borderRadius: '12px' }}>
                    สำหรับคุณ (FYP Safe Zone)
                  </span>
                </div>
                <div style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Heart size={18} strokeWidth={2} fill="#ffffff" color="#ffffff" />
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={18} strokeWidth={2} color="#ffffff" />
                  </div>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Share2 size={18} strokeWidth={2} color="#ffffff" />
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.7)', padding: '10px', borderRadius: '8px', color: '#fff', fontSize: '0.78rem' }}>
                  <strong>@SeriesX_Studio</strong>
                  <div style={{ marginTop: '2px', lineHeight: 1.3 }}>{currentDialogue}</div>
                </div>
              </div>
            )}

            {/* Bottom Scrubber & Controls inside Video */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px',
              background: 'linear-gradient(to top, rgba(15, 25, 26, 0.96) 20%, transparent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontSize: '0.76rem' }}>
                <span style={{ fontWeight: 600 }}>
                  Shot {activeShot.number}: {activeShot.name.split(':')[0]}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal-subtle)' }}>
                  00:{playbackTime.toString().padStart(2, '0')} / 01:10
                </span>
              </div>

              {/* Interactive Clickable Scrubber Bar */}
              <div
                onClick={handleScrubberClick}
                style={{
                  height: '7px',
                  background: 'rgba(255,255,255,0.22)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                title="คลิกเพื่อกระโดดข้ามเวลาและเปลี่ยนช็อต"
              >
                <div style={{
                  width: `${(playbackTime / 70) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #135E67, #1F7A59)',
                  transition: 'width 0.2s linear'
                }} />
              </div>

              {/* Media Controls Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--teal-primary)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer',
                      boxShadow: 'var(--shadow-teal-btn)'
                    }}
                    title={isPlaying ? 'หยุดเล่น' : 'เล่นคลิป 9:16 + ซาวด์แทร็ก'}
                  >
                    {isPlaying ? <Pause size={17} strokeWidth={2.2} /> : <Play size={17} strokeWidth={2.2} />}
                  </button>
                  <button
                    onClick={() => { setPlaybackTime(0); setCurrentShotIdx(0); stopVoiceAudio(); }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                    title="เริ่มใหม่ตั้งแต่ต้น"
                  >
                    <RotateCcw size={14} strokeWidth={2} />
                  </button>

                  <button
                    onClick={handlePlayVoice}
                    style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      background: isPlayingVoice ? 'var(--accent-green)' : 'rgba(255,255,255,0.18)',
                      color: '#fff',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                    title="ฟังเสียงพากย์ของช็อตนี้"
                  >
                    <Mic size={12} />
                    <span>{isPlayingVoice ? 'กำลังพูด...' : 'ฟังเสียง'}</span>
                  </button>
                </div>

                {/* HUD Toggles */}
                <div style={{ display: 'flex', gap: '5px' }}>
                  <button
                    onClick={() => setShowFramingGrid(!showFramingGrid)}
                    style={{
                      padding: '4px 7px',
                      borderRadius: 'var(--radius-pill)',
                      background: showFramingGrid ? 'var(--teal-primary)' : 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Grid
                  </button>
                  <button
                    onClick={() => setShowGoldenSpiral(!showGoldenSpiral)}
                    style={{
                      padding: '4px 7px',
                      borderRadius: 'var(--radius-pill)',
                      background: showGoldenSpiral ? '#D4AF37' : 'rgba(255,255,255,0.15)',
                      color: showGoldenSpiral ? '#000000' : '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    φ
                  </button>
                  <button
                    onClick={() => setShowFaceTracking(!showFaceTracking)}
                    style={{
                      padding: '4px 7px',
                      borderRadius: 'var(--radius-pill)',
                      background: showFaceTracking ? 'var(--accent-green)' : 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    FACS
                  </button>
                  <button
                    onClick={() => setShowRainFX(!showRainFX)}
                    style={{
                      padding: '4px 7px',
                      borderRadius: 'var(--radius-pill)',
                      background: showRainFX ? '#0284C7' : 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Rain
                  </button>
                  <button
                    onClick={() => setShowOverlay(!showOverlay)}
                    style={{
                      padding: '4px 7px',
                      borderRadius: 'var(--radius-pill)',
                      background: showOverlay ? 'var(--teal-primary)' : 'rgba(255,255,255,0.15)',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    TikTok
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cinema Camera Focus Controller: ค่าเริ่มต้น Auto-Focus หรือเปิด Keyframe เฉพาะฉากพิเศษ */}
          {!activeKeyframeConfig.enabled ? (
            /* [โหมด 1: Auto Focus มาตรฐาน - ค่าเริ่มต้น ปลอดภัย ไม่เสี่ยง AI หลอน] */
            <div className="clay-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '10px',
                    background: 'rgba(19, 94, 103, 0.12)',
                    color: 'var(--teal-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Camera size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>ระบบโฟกัสกล้อง: Auto-Focus (AI Director Standard)</span>
                      <span className="badge badge-teal" style={{ fontSize: '0.65rem' }}>ค่าเริ่มต้น</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '1px' }}>
                      ระบบโฟกัสอัตโนมัติตามธรรมชาติ ปลอดภัย ไม่เสี่ยงภาพบิดเบี้ยว (เหมาะกับฉากทั่วไป)
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowFaceTracking(!showFaceTracking)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-pill)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    background: showFaceTracking ? 'var(--teal-primary)' : 'var(--bg-subtle)',
                    color: showFaceTracking ? '#fff' : 'var(--text-muted)',
                    border: '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                  title={showFaceTracking ? 'ซ่อนกรอบ FACS' : 'แสดงกรอบ FACS'}
                >
                  {showFaceTracking ? 'FACS เปิด' : 'FACS ซ่อน'}
                </button>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-subtle)',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px dashed var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', maxWidth: '280px', lineHeight: 1.4 }}>
                  ต้องการเพิ่มอารมณ์ดราม่าเฉพาะฉากนี้ เช่น <strong>แร็คโฟกัส (Rack Focus)</strong>, <strong>ค่อยๆ ซูมออก</strong>, หรือย้ายโฟกัสเข้า-ออกตามไทม์ไลน์?
                </div>
                <button
                  onClick={() => handleEnableKeyframeFocus(rawActiveShot?.id)}
                  className="btn-primary"
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'linear-gradient(135deg, #10B981, #059669)',
                    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
                  }}
                >
                  <Zap size={14} />
                  <span>เปิดใช้ Keyframe Focus เฉพาะฉากนี้</span>
                </button>
              </div>
            </div>
          ) : (
            /* [โหมด 2: Keyframe Focus & Camera Motion - เปิดเฉพาะฉากที่ผู้กำกับต้องการอารมณ์พิเศษ] */
            <div className="clay-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', border: '1.5px solid rgba(16, 185, 129, 0.45)', boxShadow: '0 4px 20px rgba(16, 185, 129, 0.12)' }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#10B981',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Crosshair size={18} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.84rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>Keyframe Focus Studio (Shot {activeShot.number})</span>
                      <span className="badge badge-green" style={{ fontSize: '0.64rem' }}>เปิดใช้เฉพาะฉากนี้</span>
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      กำหนดคีย์เฟรมเข้า-ออก และสังเคราะห์เป็นคำสั่ง Prompt ให้โมเดล AI
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDisableKeyframeFocus(rawActiveShot?.id)}
                  className="btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.72rem', color: 'var(--accent-red)' }}
                  title="ปิดโหมดนี้และกลับสู่ Auto Focus ทันที"
                >
                  <RotateCcw size={12} style={{ marginRight: '4px' }} />
                  <span>ปิดโหมดนี้ (กลับสู่ Auto)</span>
                </button>
              </div>

              {/* 1-Click Cinematic Motion Presets */}
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px' }}>
                  เลือกรูปแบบการเคลื่อนกล้อง (Motion Presets):
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                  {[
                    { id: 'rack_focus', title: '🎬 Rack Focus', desc: 'หน้า ➔ วัตถุ/โต๊ะ (0s ➔ 3.5s)', kf1: { x: 18, y: 21, zoom: 1.0, dof: 'f/1.4', targetName: 'Actor Face' }, kf2: { x: 25, y: 60, zoom: 1.0, dof: 'f/4.0', targetName: 'Desk Anchor' } },
                    { id: 'slow_zoom_out', title: '🔍 Slow Zoom-Out', desc: 'เจาะหน้า ➔ เปิดกว้างห้อง (1.15x ➔ 0.88x)', kf1: { x: 20, y: 22, zoom: 1.15, dof: 'f/1.4', targetName: 'Tight Face' }, kf2: { x: 25, y: 40, zoom: 0.88, dof: 'f/2.8', targetName: 'Wide Room Context' } },
                    { id: 'slow_zoom_in', title: '🎯 Slow Push-In', desc: 'มุมมอง ➔ เจาะแววตา (0.95x ➔ 1.14x)', kf1: { x: 28, y: 32, zoom: 0.95, dof: 'f/2.8', targetName: 'Medium Upper' }, kf2: { x: 18, y: 21, zoom: 1.14, dof: 'f/1.4', targetName: 'Intense Eye Gaze' } }
                  ].map(preset => {
                    const isCurrent = activeKeyframeConfig.motionType === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => handleApplyMotionPreset(preset)}
                        style={{
                          padding: '7px 8px',
                          borderRadius: 'var(--radius-md)',
                          background: isCurrent ? 'var(--bg-raised)' : 'var(--bg-subtle)',
                          border: isCurrent ? '1.5px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                          boxShadow: isCurrent ? '0 0 10px rgba(16, 185, 129, 0.2)' : 'none',
                          textAlign: 'left',
                          cursor: 'pointer'
                        }}
                      >
                        <div style={{ fontSize: '0.74rem', fontWeight: 700, color: isCurrent ? 'var(--accent-green)' : 'var(--text-main)' }}>
                          {preset.title}
                        </div>
                        <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {preset.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Keyframe Timeline Selector */}
              <div style={{ background: 'var(--bg-subtle)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    จุดคีย์เฟรมตามไทม์ไลน์ (คลิกเพื่อเลือกแก้ไขตำแหน่งบนจอ):
                  </span>
                  <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-green)' }}>
                    ความยาวการเคลื่อน: {activeKeyframeConfig.transitionDuration}s
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  {/* Keyframe A */}
                  <button
                    onClick={() => setActiveEditingKeyframe('kf1')}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      background: activeEditingKeyframe === 'kf1' ? 'rgba(245, 158, 11, 0.12)' : 'var(--bg-surface)',
                      border: activeEditingKeyframe === 'kf1' ? '2px solid #F59E0B' : '1px solid var(--border-subtle)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.74rem', color: '#F59E0B' }}>📍 Keyframe A (เริ่ม 0.0s)</strong>
                      {activeEditingKeyframe === 'kf1' && <span className="badge badge-amber" style={{ fontSize: '0.58rem' }}>กำลังแก้ไข</span>}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-main)', marginTop: '2px' }}>
                      เป้าหมาย: <strong>{currentKeyframeState.kf1?.targetName || 'Face Anchor'}</strong>
                    </div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      X:{currentKeyframeState.kf1?.x}% Y:{currentKeyframeState.kf1?.y}% | Zoom: {currentKeyframeState.kf1?.zoom}x
                    </div>
                  </button>

                  {/* Keyframe B */}
                  <button
                    onClick={() => setActiveEditingKeyframe('kf2')}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      background: activeEditingKeyframe === 'kf2' ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-surface)',
                      border: activeEditingKeyframe === 'kf2' ? '2px solid #10B981' : '1px solid var(--border-subtle)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.74rem', color: '#10B981' }}>🎯 Keyframe B (ปลาย {activeKeyframeConfig.transitionDuration}s)</strong>
                      {activeEditingKeyframe === 'kf2' && <span className="badge badge-green" style={{ fontSize: '0.58rem' }}>กำลังแก้ไข</span>}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-main)', marginTop: '2px' }}>
                      เป้าหมาย: <strong>{currentKeyframeState.kf2?.targetName || 'Desk Anchor'}</strong>
                    </div>
                    <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      X:{currentKeyframeState.kf2?.x}% Y:{currentKeyframeState.kf2?.y}% | Zoom: {currentKeyframeState.kf2?.zoom}x
                    </div>
                  </button>
                </div>

                <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Info size={12} color="var(--teal-primary)" />
                  <span>คลิก Keyframe A หรือ B ด้านบน จากนั้น <strong>คลิกบนภาพวิดีโอ หรือลากกรอบบนจอ</strong> เพื่อย้ายพิกัดได้ทันที</span>
                </div>

                {/* Fine Tuning Sliders for active keyframe */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', paddingTop: '6px', borderTop: '1px dashed var(--border-subtle)' }}>
                  <div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>แกน X ({activeEditingKeyframe === 'kf1' ? 'A' : 'B'})</span>
                      <strong style={{ color: 'var(--text-main)' }}>{activeEditingKeyframe === 'kf1' ? currentKeyframeState.kf1?.x : currentKeyframeState.kf2?.x}%</strong>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="72"
                      value={activeEditingKeyframe === 'kf1' ? (currentKeyframeState.kf1?.x || 18) : (currentKeyframeState.kf2?.x || 25)}
                      onChange={(e) => updateActiveKeyframeCoord(parseInt(e.target.value, 10), activeEditingKeyframe === 'kf1' ? currentKeyframeState.kf1?.y : currentKeyframeState.kf2?.y)}
                      style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>แกน Y ({activeEditingKeyframe === 'kf1' ? 'A' : 'B'})</span>
                      <strong style={{ color: 'var(--text-main)' }}>{activeEditingKeyframe === 'kf1' ? currentKeyframeState.kf1?.y : currentKeyframeState.kf2?.y}%</strong>
                    </div>
                    <input
                      type="range"
                      min="2"
                      max="72"
                      value={activeEditingKeyframe === 'kf1' ? (currentKeyframeState.kf1?.y || 21) : (currentKeyframeState.kf2?.y || 60)}
                      onChange={(e) => updateActiveKeyframeCoord(activeEditingKeyframe === 'kf1' ? currentKeyframeState.kf1?.x : currentKeyframeState.kf2?.x, parseInt(e.target.value, 10))}
                      style={{ width: '100%', accentColor: '#10B981' }}
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                      <span>ระยะซูม (Zoom)</span>
                      <strong style={{ color: 'var(--text-main)' }}>{activeEditingKeyframe === 'kf1' ? currentKeyframeState.kf1?.zoom : currentKeyframeState.kf2?.zoom}x</strong>
                    </div>
                    <input
                      type="range"
                      min="0.75"
                      max="1.4"
                      step="0.02"
                      value={activeEditingKeyframe === 'kf1' ? (currentKeyframeState.kf1?.zoom || 1.0) : (currentKeyframeState.kf2?.zoom || 0.88)}
                      onChange={(e) => updateActiveKeyframeZoom(parseFloat(e.target.value))}
                      style={{ width: '100%', accentColor: '#F59E0B' }}
                    />
                  </div>
                </div>
              </div>

              {/* Live Prompt Output Box */}
              <div style={{ background: 'var(--bg-inset)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-inset)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--teal-primary)' }}>
                    <Sparkles size={13} />
                    <strong style={{ fontSize: '0.72rem', color: 'var(--text-main)' }}>
                      คำสั่ง Prompt มุมกล้องที่สังเคราะห์ออกมา (เชื่อมระบบอัตโนมัติ):
                    </strong>
                  </div>
                  <button
                    onClick={() => {
                      const promptText = buildKeyframeFocusPromptSnippet(activeKeyframeConfig);
                      navigator.clipboard.writeText(promptText);
                      setCopiedKeyframePrompt(true);
                      setTimeout(() => setCopiedKeyframePrompt(false), 2000);
                    }}
                    className="btn-secondary"
                    style={{ padding: '2px 7px', fontSize: '0.66rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    {copiedKeyframePrompt ? <Check size={11} color="var(--accent-green)" /> : <Copy size={11} />}
                    <span>{copiedKeyframePrompt ? 'คัดลอกแล้ว' : 'คัดลอก Prompt'}</span>
                  </button>
                </div>

                <div style={{ fontSize: '0.7rem', color: 'var(--teal-subtle)', lineHeight: 1.45, fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.3)', padding: '7px 9px', borderRadius: '4px', userSelect: 'all' }}>
                  {buildKeyframeFocusPromptSnippet(activeKeyframeConfig)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Cinematography Director & Audio Stems Mixer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Shot Switcher Tabs */}
          <div className="clay-card" style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                Select Active Shot Preview (4 ช็อตหลักในเอพิโสด):
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--teal-primary)', fontWeight: 600 }}>
                ตัวละคร: <strong>{activeChar.name?.split('/')[0] || 'ริน ลลิตา'}</strong>
              </span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {shots.map((shot, idx) => {
                const isActive = idx === currentShotIdx;
                const hasCustomAudio = !!generatedAudios[shot.id];
                return (
                  <button
                    key={shot.id}
                    onClick={() => { 
                      setCurrentShotIdx(idx); 
                      setPlaybackTime(idx === 0 ? 0 : idx === 1 ? 5 : idx === 2 ? 16 : 36); 
                      stopVoiceAudio();
                    }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--bg-raised)' : 'transparent',
                      border: isActive ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      boxShadow: isActive ? 'var(--shadow-raised-sm)' : 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: '0.76rem', fontWeight: 700, color: isActive ? 'var(--teal-primary)' : 'var(--text-main)' }}>
                        Shot {shot.number}
                      </div>
                      {hasCustomAudio && (
                        <span title="มีไฟล์เสียงสังเคราะห์ ElevenLabs แล้ว" style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-green)' }} />
                      )}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {shot.name.split(':')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Hollywood Cinematography & Emotion Directing Suite */}
          <div className="clay-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)' }}>
                <Film size={20} strokeWidth={2.2} />
                <div>
                  <h4 style={{ fontSize: '0.98rem', margin: 0, color: 'var(--text-main)', fontWeight: 700 }}>
                    Hollywood Cinematography & Emotional Camera Suite
                  </h4>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    จิตวิทยามุมกล้องฮอลลีวูด & อารมณ์การแสดง & ความต่อเนื่องของเสื้อผ้า
                  </span>
                </div>
              </div>
              <span className="badge badge-teal" style={{ fontSize: '0.74rem' }}>
                {activeShot.cameraDirector?.lens || '85mm Cine Prime f/1.4'}
              </span>
            </div>

            {/* Emotional Intent & Hollywood Rationale Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(11, 74, 81, 0.06), rgba(212, 175, 55, 0.08))',
              border: '1px solid rgba(11, 74, 81, 0.18)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 16px',
              marginBottom: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', flexWrap: 'wrap', gap: '4px' }}>
                <strong style={{ fontSize: '0.8rem', color: 'var(--teal-primary)' }}>
                  เหตุผลทางจิตวิทยา (Why this shot?):
                </strong>
                <span style={{ fontSize: '0.7rem', color: '#92400E', fontWeight: 600 }}>
                  🎬 {activeShot.cameraDirector?.hollywoodRef || 'อ้างอิงภาพยนตร์ฮอลลีวูด: The Godfather / Succession'}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                {activeShot.hollywoodGrammarReason || activeShot.cameraDirector?.psychologicalIntent || 'ดึงคนดูเข้าสู่จิตใจที่แหลกสลายของตัวละคร บีบพื้นที่จิตวิทยาให้คนดูหยุดเลื่อนผ่านใน 3 วินาทีแรก'}
              </p>
            </div>

            {/* 3-Column Specifications Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.8rem', marginBottom: '14px' }}>
              {/* Column 1: มุมกล้อง & เลนส์ */}
              <div style={{ background: 'var(--bg-inset)', boxShadow: 'var(--shadow-inset)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--teal-primary)', display: 'block', marginBottom: '4px' }}>
                  🎥 มุมกล้อง & การเคลื่อนไหว:
                </strong>
                <p style={{ margin: 0, color: 'var(--text-main)', fontWeight: 600 }}>
                  {activeShot.cameraDirector?.movement || activeShot.cameraAngle}
                </p>
                <div style={{ marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  องศา: <strong>{activeShot.cameraDirector?.tiltAngle || 'Level Eye-line'}</strong> &bull; โบเก้: <strong>{activeShot.cameraDirector?.depthOfField || 'f/1.4'}</strong>
                </div>
              </div>

              {/* Column 2: การแสดง & ฟิสิกส์มนุษย์ FACS */}
              <div style={{ background: 'var(--bg-inset)', boxShadow: 'var(--shadow-inset)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--accent-green)', display: 'block', marginBottom: '4px' }}>
                  🧬 ชีววิทยาการแสดงมนุษย์ (FACS):
                </strong>
                <p style={{ margin: 0, color: 'var(--text-main)' }}>
                  {activeShot.actorDirecting?.facialMicroExpressions || activeShot.action}
                </p>
                <div style={{ marginTop: '6px', fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                  FACS: {activeShot.actorDirecting?.facsCode || 'AU1+AU4 Synced'} &bull; ลมหายใจ 14 ครั้ง/นาที
                </div>
              </div>

              {/* Column 3: เสื้อผ้า & แสงต่อเนื่อง */}
              <div style={{ background: 'var(--bg-inset)', boxShadow: 'var(--shadow-inset)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: 'var(--accent-amber)', display: 'block', marginBottom: '4px' }}>
                  👗 เสื้อผ้า & แสงในฉาก (Locked):
                </strong>
                <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.78rem' }}>
                  {activeChar.wardrobeSpec || 'สูทสีกรมท่า Navy Wool Suit, เชิ้ตขาวผ้าไหม, ต่างหูมุก'}
                </p>
                <div style={{ marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  แสง: {activeShot.cameraDirector?.lightingRatio || 'Rembrandt 4:1 Dual Teal/Amber'}
                </div>
              </div>
            </div>

            {/* Interactive Hollywood Emotion Switcher */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '4px' }}>
                <span style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--teal-primary)', textTransform: 'uppercase' }}>
                  สลับมุมกล้องตามอารมณ์ฮอลลีวูด (Interactive Hollywood Angles):
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>คลิกเพื่อเปลี่ยนมุมกล้องและ Prompt ทันที</span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '6px' }}>
                {Object.entries(HOLLYWOOD_EMOTIONAL_ARCHETYPES).map(([key, arch]) => {
                  const isCurrent = (activeArchKey === key) || (!activeArchKey && (
                    (key === 'VULNERABILITY_TEARS' && activeShot.name.includes('Hook')) ||
                    (key === 'CHILLING_DOMINANCE' && activeShot.name.includes('Low-Angle')) ||
                    (key === 'SPONSOR_CINEMATIC_HERO' && activeShot.name.includes('Sponsor')) ||
                    (key === 'PSYCHOLOGICAL_CRISIS' && activeShot.name.includes('Cliffhanger'))
                  ));
                  return (
                    <button
                      key={key}
                      onClick={() => setCustomArchetypeMap(prev => ({ ...prev, [rawActiveShot.id]: key }))}
                      style={{
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: isCurrent ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        background: isCurrent ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                        color: isCurrent ? 'var(--teal-primary)' : 'var(--text-main)',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s'
                      }}
                    >
                      <div style={{ fontSize: '0.74rem', fontWeight: 700 }}>
                        {arch.name.split('(')[0].trim()}
                      </div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {arch.lens.split('(')[0].trim()}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ElevenLabs Voice & Multi-Track Sound Engine */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Mic size={20} strokeWidth={2.2} color="var(--teal-primary)" />
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    ElevenLabs Vocal & Multi-Track Sound Studio
                  </h3>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  สังเคราะห์เสียงพากย์ด้วย AI Voice Lab พร้อมมิกเซอร์ควบคุม Track 1 (บทสนทนา), Track 2 (SFX ฝน/ฟ้าผ่า), Track 3 (ดนตรี BGM)
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => setShowElevenLabsModal(true)}
                  className="btn-secondary"
                  style={{ fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px' }}
                >
                  <Settings size={14} />
                  <span>จัดการ ElevenLabs API Key & Voice IDs</span>
                </button>
              </div>
            </div>

            {/* Inline ElevenLabs API Key Entry Bar */}
            {!elevenApiKey ? (
              <div style={{
                background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.12), rgba(11, 74, 81, 0.08))',
                border: '1.5px solid var(--accent-amber)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                marginBottom: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Key size={16} color="var(--accent-amber)" />
                    <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                      ใส่ ElevenLabs API Key ที่นี่ (เพื่อเริ่มสังเคราะห์เสียงพากย์จริง):
                    </strong>
                  </div>
                  <a
                    href="https://elevenlabs.io/app/settings/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.76rem', color: 'var(--teal-primary)', fontWeight: 600, textDecoration: 'none' }}
                  >
                    ขอรับ API Key ฟรีที่ elevenlabs.io &rarr;
                  </a>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="password"
                    placeholder="วาง ElevenLabs API Key ของคุณที่นี่ (sk_...)"
                    value={elevenApiKey}
                    onChange={(e) => setElevenApiKey(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.86rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!elevenApiKey.trim()) return;
                      setStoredElevenLabsApiKey(elevenApiKey.trim());
                      setSynthesisSuccess(true);
                      setTimeout(() => setSynthesisSuccess(false), 2500);
                    }}
                    className="btn-primary"
                    style={{ padding: '0 18px', fontSize: '0.84rem', whiteSpace: 'nowrap' }}
                  >
                    บันทึก Key
                  </button>
                </div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                  * หรือคลิกปุ่ม "ศูนย์การตั้งค่าสตูดิโอ" (ไอคอนฟันเฟืองด้านบน) &rarr; แท็บ ElevenLabs AI Voice ก็ได้เช่นกัน
                </span>
              </div>
            ) : (
              <div style={{
                background: 'var(--accent-green-bg)',
                border: '1px solid var(--accent-green)',
                borderRadius: 'var(--radius-md)',
                padding: '10px 16px',
                marginBottom: '16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px',
                fontSize: '0.82rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: 600 }}>
                  <CheckCircle2 size={16} />
                  <span>เชื่อมต่อ ElevenLabs API Key แล้ว: <strong>sk_••••••••••••</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowElevenLabsModal(true)}
                  className="btn-secondary"
                  style={{ padding: '4px 10px', fontSize: '0.74rem' }}
                >
                  เปลี่ยน / ทดสอบ Key
                </button>
              </div>
            )}

            {/* Voice ID & Model Configuration Bar */}
            <div style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              marginBottom: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
                {/* Voice Selector / Custom Voice ID */}
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    🎙️ เลือกเสียงตัวละคร (Voice Profile):
                  </label>
                  <select
                    value={selectedVoicePreset}
                    onChange={(e) => {
                      setSelectedVoicePreset(e.target.value);
                      if (e.target.value !== 'custom') {
                        setCustomVoiceIdMap(prev => ({ ...prev, [rawActiveShot?.id]: e.target.value }));
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-inset)',
                      fontSize: '0.8rem',
                      color: 'var(--text-main)'
                    }}
                  >
                    {PRESET_VOICES.map(pv => (
                      <option key={pv.id} value={pv.id}>
                        {pv.name} {pv.gender ? `(${pv.gender})` : ''}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model Selector */}
                <div>
                  <label style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ⚡ โมเดลประมวลผล (ElevenLabs Model):
                  </label>
                  <select
                    value={selectedModelId}
                    onChange={(e) => setSelectedModelId(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '8px 10px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-inset)',
                      fontSize: '0.8rem',
                      color: 'var(--text-main)'
                    }}
                  >
                    {ELEVENLABS_MODELS.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Voice ID Input (shows if custom selected or user wants to bind custom ID) */}
              {(selectedVoicePreset === 'custom' || customVoiceIdMap[rawActiveShot?.id]) && (
                <div style={{
                  background: 'var(--bg-inset)',
                  padding: '10px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px dashed var(--teal-border)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--teal-primary)', display: 'block', marginBottom: '2px' }}>
                      ใส่ ElevenLabs Voice ID ของคุณ (จาก Voice Lab):
                    </span>
                    <input
                      type="text"
                      value={customVoiceIdMap[rawActiveShot?.id] || customVoiceIdInput}
                      onChange={(e) => {
                        const val = e.target.value;
                        setCustomVoiceIdInput(val);
                        setCustomVoiceIdMap(prev => ({ ...prev, [rawActiveShot?.id]: val }));
                        saveVoiceConfig(rawActiveShot?.id, { voiceId: val });
                      }}
                      placeholder="เช่น EXAVITQu4vr4xnSDxMaL หรือ 21m00Tcm4TlvDq8ikWAM"
                      style={{
                        width: '100%',
                        padding: '6px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                        fontSize: '0.82rem',
                        fontFamily: 'var(--font-mono)'
                      }}
                    />
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', maxWidth: '160px', lineHeight: 1.3 }}>
                    * เสียงที่โคลนไว้จะถูกผูกกับช็อตนี้อัตโนมัติ
                  </span>
                </div>
              )}

              {/* Voice Emotion Sliders (Stability, Similarity, Style) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', paddingTop: '4px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    <span>Stability (ความนิ่ง):</span>
                    <strong>{voiceStability.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={voiceStability}
                    onChange={(e) => setVoiceStability(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                  />
                  <span style={{ fontSize: '0.64rem', color: 'var(--text-dim)' }}>0.40 สำหรับฉากสะอื้น/สั่นเครือ</span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    <span>Similarity (ความเหมือนต้นฉบับ):</span>
                    <strong>{voiceSimilarity.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={voiceSimilarity}
                    onChange={(e) => setVoiceSimilarity(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                  />
                  <span style={{ fontSize: '0.64rem', color: 'var(--text-dim)' }}>0.85 สำหรับความคมชัดระดับ HD</span>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '2px' }}>
                    <span>Style Exaggeration (ดราม่า):</span>
                    <strong>{voiceStyle.toFixed(2)}</strong>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={voiceStyle}
                    onChange={(e) => setVoiceStyle(parseFloat(e.target.value))}
                    style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
                  />
                  <span style={{ fontSize: '0.64rem', color: 'var(--text-dim)' }}>เน้นพลังการเค้นอารมณ์ดราม่า</span>
                </div>
              </div>
            </div>

            {/* Notification / Synthesis Alerts */}
            {synthesisError && (
              <div style={{
                background: 'var(--accent-amber-bg)',
                border: '1px solid var(--accent-amber)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.78rem',
                color: '#92400E',
                marginBottom: '14px'
              }}>
                <Info size={16} />
                <span>{synthesisError}</span>
              </div>
            )}

            {synthesisSuccess && (
              <div style={{
                background: 'var(--accent-green-bg)',
                border: '1px solid var(--accent-green)',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: 'var(--accent-green)',
                marginBottom: '14px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <CheckCircle2 size={16} />
                  <span>สังเคราะห์เสียงด้วย ElevenLabs สำเร็จแล้ว! บันทึกและพร้อมใช้งานในไพพ์ไลน์</span>
                </div>
                {generatedAudios[rawActiveShot?.id] && (
                  <a
                    href={generatedAudios[rawActiveShot?.id]}
                    download={`SeriesX_Shot_${activeShot.number}_Voice.mp3`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      color: 'var(--accent-green)',
                      textDecoration: 'none',
                      fontWeight: 700
                    }}
                  >
                    <Download size={13} />
                    <span>ดาวน์โหลด .MP3</span>
                  </a>
                )}
              </div>
            )}

            {/* Multi-Track Stems Section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              {/* Track 1: Dialogue with micro-cues & ElevenLabs Synthesizer */}
              <div style={{
                background: 'var(--bg-inset)',
                boxShadow: 'var(--shadow-inset)',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                border: isPlayingVoice ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                transition: 'border 0.2s'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Volume2 size={16} strokeWidth={2.2} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>Track 1: Vocal Emotion & Micro-Breathing</strong>
                    <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>
                      {activeShot.vocalProsody?.emotionTag || activeShot.emotionTag || 'Furious Despair'}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {/* Volume Slider for Track 1 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>Vol:</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={mixerMute.vocal ? 0 : mixerVolumes.vocal}
                        onChange={(e) => setMixerVolumes(prev => ({ ...prev, vocal: parseFloat(e.target.value) }))}
                        style={{ width: '60px', accentColor: 'var(--teal-primary)' }}
                      />
                    </div>

                    <button
                      onClick={() => setMixerMute(prev => ({ ...prev, vocal: !prev.vocal }))}
                      className="btn-secondary"
                      style={{ padding: '3px 7px', fontSize: '0.7rem', color: mixerMute.vocal ? 'var(--accent-red)' : 'var(--text-muted)' }}
                    >
                      {mixerMute.vocal ? 'Muted' : 'Mute'}
                    </button>

                    <button
                      onClick={() => setIsEditingDialogue(!isEditingDialogue)}
                      className="btn-secondary"
                      style={{ padding: '3px 8px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Edit3 size={12} />
                      <span>{isEditingDialogue ? 'เสร็จสิ้น' : 'แก้ไขบทพูด'}</span>
                    </button>
                  </div>
                </div>

                {/* Editable / Formatted Dialogue Box */}
                {isEditingDialogue ? (
                  <div style={{ marginBottom: '10px' }}>
                    <textarea
                      value={currentDialogue}
                      onChange={(e) => setEditedDialogueMap(prev => ({ ...prev, [rawActiveShot?.id]: e.target.value }))}
                      rows={2}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--teal-border)',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                        fontSize: '0.84rem',
                        lineHeight: 1.4,
                        fontFamily: 'var(--font-sans)',
                        resize: 'vertical'
                      }}
                      placeholder="ใส่บทสนทนาภาษาไทย พร้อมคำอธิบายอารมณ์ในวงเล็บ เช่น [สะอื้น]..."
                    />
                  </div>
                ) : (
                  <div style={{
                    fontSize: '0.86rem',
                    color: 'var(--text-main)',
                    fontStyle: 'italic',
                    marginBottom: '10px',
                    lineHeight: 1.5,
                    background: 'rgba(255,255,255,0.4)',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    "{currentDialogue}"
                  </div>
                )}

                {/* Synthesis Action & Audio Playback Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <button
                      onClick={handleSynthesizeElevenLabs}
                      disabled={isSynthesizing}
                      className="btn-primary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: 'linear-gradient(135deg, #135E67, #0B4A51)'
                      }}
                    >
                      {isSynthesizing ? <RefreshCw size={14} className="spin" /> : <Mic size={14} />}
                      <span>{isSynthesizing ? 'กำลังสังเคราะห์เสียง...' : '🎙️ สังเคราะห์เสียงด้วย ElevenLabs'}</span>
                    </button>

                    <button
                      onClick={handlePlayVoice}
                      className="btn-secondary"
                      style={{
                        padding: '6px 12px',
                        fontSize: '0.78rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        borderColor: isPlayingVoice ? 'var(--accent-green)' : 'var(--border-subtle)',
                        color: isPlayingVoice ? 'var(--accent-green)' : 'var(--text-main)'
                      }}
                    >
                      {isPlayingVoice ? <Pause size={14} /> : <Play size={14} />}
                      <span>{isPlayingVoice ? 'กำลังเล่น...' : 'ทดลองฟังเสียง'}</span>
                    </button>
                  </div>

                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Voice ID: <code style={{ fontFamily: 'var(--font-mono)', color: 'var(--teal-primary)', fontWeight: 600 }}>{effectiveVoiceId}</code>
                  </span>
                </div>

                {/* Dynamic Waveform Visualizer */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '28px', marginTop: '12px' }}>
                  {[35, 65, 80, 50, 95, 100, 70, 85, 90, 60, 45, 80, 95, 75, 40, 60, 85, 100, 90, 50, 30, 45, 60, 75, 90, 50].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: isPlayingVoice ? `${Math.max(15, (h * (0.4 + Math.sin(Date.now() / 200 + i) * 0.6)))}%` : isPlaying ? `${h * 0.7}%` : `${h * 0.35}%`,
                        background: isPlayingVoice ? 'var(--accent-green)' : isPlaying ? 'var(--teal-primary)' : 'rgba(11, 74, 81, 0.25)',
                        borderRadius: '2px',
                        transition: 'height 0.15s ease'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Track 2: SFX (Foley & Rain Ambience) */}
              <div style={{ background: 'var(--bg-inset)', boxShadow: 'var(--shadow-inset)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CloudRain size={16} strokeWidth={2} color="#0284C7" />
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>Track 2: Foley & Environmental SFX</strong>
                    <span style={{ fontSize: '0.74rem', color: '#0284C7', fontWeight: 600 }}>{activeShot.sfx}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>Vol:</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={mixerMute.sfx ? 0 : mixerVolumes.sfx}
                        onChange={(e) => setMixerVolumes(prev => ({ ...prev, sfx: parseFloat(e.target.value) }))}
                        style={{ width: '60px', accentColor: '#0284C7' }}
                      />
                    </div>
                    <button
                      onClick={() => setMixerMute(prev => ({ ...prev, sfx: !prev.sfx }))}
                      className="btn-secondary"
                      style={{ padding: '3px 7px', fontSize: '0.7rem', color: mixerMute.sfx ? 'var(--accent-red)' : 'var(--text-muted)' }}
                    >
                      {mixerMute.sfx ? 'Muted' : 'Mute'}
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '18px' }}>
                  {[20, 30, 90, 40, 20, 15, 60, 70, 20, 30, 15, 40, 35, 20, 15, 20, 30, 40, 25, 20, 15, 30, 45, 20, 15, 25].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: isPlaying && !mixerMute.sfx ? `${h}%` : '20%',
                        background: isPlaying && !mixerMute.sfx ? '#0284C7' : 'rgba(2, 132, 199, 0.25)',
                        borderRadius: '2px',
                        transition: 'height 0.2s'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Track 3: Cinematic Score (BGM) */}
              <div style={{ background: 'var(--bg-inset)', boxShadow: 'var(--shadow-inset)', padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Music size={16} strokeWidth={2} color="var(--accent-amber)" />
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)' }}>Track 3: Cinematic Score (BGM)</strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-amber)', fontWeight: 600 }}>{activeShot.bgm}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      <span>Vol:</span>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={mixerMute.bgm ? 0 : mixerVolumes.bgm}
                        onChange={(e) => setMixerVolumes(prev => ({ ...prev, bgm: parseFloat(e.target.value) }))}
                        style={{ width: '60px', accentColor: 'var(--accent-amber)' }}
                      />
                    </div>
                    <button
                      onClick={() => setMixerMute(prev => ({ ...prev, bgm: !prev.bgm }))}
                      className="btn-secondary"
                      style={{ padding: '3px 7px', fontSize: '0.7rem', color: mixerMute.bgm ? 'var(--accent-red)' : 'var(--text-muted)' }}
                    >
                      {mixerMute.bgm ? 'Muted' : 'Mute'}
                    </button>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '18px' }}>
                  {[30, 35, 40, 45, 55, 60, 65, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70, 65, 60, 50, 40, 35, 45, 60, 70, 80].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: isPlaying && !mixerMute.bgm ? `${h}%` : '25%',
                        background: isPlaying && !mixerMute.bgm ? 'var(--accent-amber)' : 'rgba(180, 107, 24, 0.25)',
                        borderRadius: '2px',
                        transition: 'height 0.2s'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Master Volume & Director Presets */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: 'var(--bg-surface)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Volume2 size={16} strokeWidth={2} color="var(--teal-primary)" />
                  <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>Master Volume:</span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={mixerVolumes.master}
                    onChange={(e) => setMixerVolumes(prev => ({ ...prev, master: parseFloat(e.target.value) }))}
                    style={{ width: '80px', accentColor: 'var(--teal-primary)' }}
                  />
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{Math.round(mixerVolumes.master * 100)}%</span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => {
                      setMixerVolumes({ vocal: 1.0, sfx: 0.25, bgm: 0.20, master: 0.90 });
                      setMixerMute({ vocal: false, sfx: false, bgm: false });
                    }}
                    className="btn-secondary"
                    style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  >
                    Vocal Focus
                  </button>
                  <button
                    onClick={() => {
                      setMixerVolumes({ vocal: 0.85, sfx: 0.60, bgm: 0.70, master: 0.85 });
                      setMixerMute({ vocal: false, sfx: false, bgm: false });
                    }}
                    className="btn-secondary"
                    style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  >
                    Cinematic Score
                  </button>
                  <button
                    onClick={() => setMixerMute({ vocal: true, sfx: true, bgm: true })}
                    className="btn-secondary"
                    style={{ padding: '3px 8px', fontSize: '0.7rem' }}
                  >
                    Mute All
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Production Prompt Spec Card (8-Pillar Video Prompt) */}
          <div className="clay-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)' }}>
                <Sparkles size={18} strokeWidth={2} />
                <h4 style={{ fontSize: '0.95rem', margin: 0, color: 'var(--text-main)', fontWeight: 700 }}>
                  Prompt ผลิตคลิปอัตโนมัติ (Shot {activeShot.number}: 8 เสาหลักพร้อมสร้าง)
                </h4>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(currentShotPrompt.masterVideoPrompt);
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 2000);
                  }}
                  className="btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {copiedPrompt ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                  <span>{copiedPrompt ? 'คัดลอกแล้ว!' : 'คัดลอก Prompt'}</span>
                </button>

                <button
                  onClick={() => setShowPromptModal(true)}
                  className="btn-primary"
                  style={{ padding: '6px 14px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Sparkles size={14} />
                  <span>ดูครบทุกโมเดล & Batch</span>
                </button>
              </div>
            </div>

            <div style={{
              background: 'var(--bg-inset)',
              boxShadow: 'var(--shadow-inset)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.82rem',
              color: 'var(--text-main)',
              lineHeight: 1.5,
              userSelect: 'all',
              fontFamily: 'var(--font-sans)',
              maxHeight: '110px',
              overflowY: 'auto'
            }}>
              {currentShotPrompt.masterVideoPrompt}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '0.74rem', color: 'var(--text-muted)', flexWrap: 'wrap', gap: '6px' }}>
              <span>
                <strong>Seed:</strong> {currentShotPrompt.seed} &bull; <strong>LoRA:</strong> {currentShotPrompt.lora} &bull; <strong>Wardrobe:</strong> {currentShotPrompt.metadataBreakdown?.wardrobeSpec || 'Navy Wool Suit'}
              </span>
              <span className="badge badge-green" style={{ fontSize: '0.68rem' }}>8/8 Quality Passed</span>
            </div>
          </div>

        </div>
      </div>

      {/* Production Prompt Modal */}
      <ProductionPromptModal
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        series={series?.shots ? series : { ...series, shots, characters }}
        initialShotIndex={currentShotIdx}
      />

      {/* ElevenLabs API Key & Cloned Voices Settings Modal */}
      <ElevenLabsSettingsModal
        isOpen={showElevenLabsModal}
        onClose={() => setShowElevenLabsModal(false)}
        onKeySaved={(newKey) => setElevenApiKey(newKey)}
        onSelectVoice={(voiceId) => {
          setSelectedVoicePreset('custom');
          setCustomVoiceIdInput(voiceId);
          setCustomVoiceIdMap(prev => ({ ...prev, [rawActiveShot?.id]: voiceId }));
          saveVoiceConfig(rawActiveShot?.id, { voiceId });
        }}
      />

      {/* AI Render Simulation Modal */}
      <RenderSimulationModal
        isOpen={showRenderModal}
        onClose={() => setShowRenderModal(false)}
        activeShot={activeShot}
        activeChar={activeChar}
        onRenderComplete={() => {
          // Play simulated video upon render completion
          setIsPlaying(true);
        }}
      />
    </div>
  );
}
