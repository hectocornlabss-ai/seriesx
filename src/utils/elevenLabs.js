/**
 * ElevenLabs Voice & Audio Synthesis Integration Utility
 * Supports real ElevenLabs API calls, voice ID management,
 * and seamless fallback to Web Speech API + Web Audio Synthesizer.
 */

const STORAGE_KEY_API_KEY = 'seriesx_elevenlabs_api_key';
const STORAGE_KEY_VOICE_CONFIGS = 'seriesx_elevenlabs_voice_configs';

export const ELEVENLABS_MODELS = [
  { id: 'eleven_multilingual_v2', name: 'Eleven Multilingual v2 (แนะนำสำหรับภาษาไทย & อารมณ์ดราม่า)', description: 'รองรับภาษาไทย สำเนียงและอารมณ์สมจริงสูงสุด' },
  { id: 'eleven_turbo_v2_5', name: 'Eleven Turbo v2.5 (ความเร็วสูงพิเศษ Low Latency)', description: 'ประมวลผลเร็วที่สุด เหมาะสำหรับงานพรีวิวทันใจ' },
  { id: 'eleven_flash_v2', name: 'Eleven Flash v2 (ประหยัดเครดิต)', description: 'สังเคราะห์รวดเร็ว ใช้เครดิตน้อย' }
];

export const PRESET_VOICES = [
  {
    id: 'custom',
    name: '🎯 ระบุ ElevenLabs Voice ID เอง (Custom Cloned Voice)',
    category: 'custom',
    description: 'ใส่ Voice ID ที่คุณสร้างหรือโคลนไว้ใน ElevenLabs Voice Lab'
  },
  {
    id: 'EXAVITQu4vr4xnSDxMaL',
    name: 'Bella (Emotional / Despair / Tears)',
    category: 'standard',
    gender: 'female',
    description: 'เสียงหญิงดราม่า สั่นเครือ สื่ออารมณ์โกรธปนน้ำตา'
  },
  {
    id: '21m00Tcm4TlvDq8ikWAM',
    name: 'Rachel (Calm / Authoritative)',
    category: 'standard',
    gender: 'female',
    description: 'เสียงหญิงนิ่ง ทรงอำนาจ มั่นใจ'
  },
  {
    id: 'ErXwobaYiN019PkySvjV',
    name: 'Antoni (Intense / Cold Male)',
    category: 'standard',
    gender: 'male',
    description: 'เสียงชายทุ้ม เยือกเย็น น่าเกรงขาม'
  },
  {
    id: 'pNInz6obpgDQGcFmaJgB',
    name: 'Adam (Deep Cinematic Baritone)',
    category: 'standard',
    gender: 'male',
    description: 'เสียงผู้ชายทุ้มต่ำ สไตล์เจ้าพ่อ/ซีอีโอฮอลลีวูด'
  },
  {
    id: 'AZnzlk1XvdvUeBnXmlld',
    name: 'Domi (Sharp / Fierce)',
    category: 'standard',
    gender: 'female',
    description: 'เสียงเฉียบคม ดุดัน สู้คน'
  }
];

// Helper to retrieve API key
export function getStoredElevenLabsApiKey() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(STORAGE_KEY_API_KEY) || '';
}

// Helper to store API key
export function setStoredElevenLabsApiKey(key) {
  if (typeof window === 'undefined') return;
  if (key) {
    localStorage.setItem(STORAGE_KEY_API_KEY, key.trim());
  } else {
    localStorage.removeItem(STORAGE_KEY_API_KEY);
  }
}

// Helper to get voice configs saved for character or shot
export function getStoredVoiceConfigs() {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_VOICE_CONFIGS);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    return {};
  }
}

// Helper to save voice config for character or shot
export function saveVoiceConfig(id, config) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredVoiceConfigs();
    current[id] = { ...current[id], ...config, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY_VOICE_CONFIGS, JSON.stringify(current));
  } catch (e) {
    console.error('Failed to save voice config:', e);
  }
}

/**
 * Clean cue brackets like [เสียงสั่นเครือ] for TTS engines
 */
export function cleanDialogueForSpeech(text) {
  if (!text) return '';
  return text
    .replace(/\[.*?\]/g, '') // remove [stage cues]
    .replace(/\(.*?\)/g, '') // remove (parenthesis cues)
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Call ElevenLabs TTS API
 */
export async function synthesizeSpeechWithElevenLabs({
  text,
  voiceId,
  apiKey,
  modelId = 'eleven_multilingual_v2',
  stability = 0.40,
  similarityBoost = 0.85,
  style = 0.25,
  speakerBoost = true
}) {
  const cleanText = cleanDialogueForSpeech(text);
  if (!cleanText) {
    throw new Error('ไม่มีบทสนทนาสำหรับสังเคราะห์เสียง');
  }

  const effectiveKey = apiKey || getStoredElevenLabsApiKey();
  if (!effectiveKey) {
    throw new Error('กรุณาระบุ ElevenLabs API Key ในการตั้งค่า');
  }

  const targetVoiceId = voiceId || 'EXAVITQu4vr4xnSDxMaL';

  const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${targetVoiceId}`, {
    method: 'POST',
    headers: {
      'Accept': 'audio/mpeg',
      'Content-Type': 'application/json',
      'xi-api-key': effectiveKey
    },
    signal: AbortSignal.timeout(18000),
    body: JSON.stringify({
      text: cleanText,
      model_id: modelId,
      voice_settings: {
        stability: parseFloat(stability) || 0.4,
        similarity_boost: parseFloat(similarityBoost) || 0.85,
        style: parseFloat(style) || 0.25,
        use_speaker_boost: Boolean(speakerBoost)
      }
    })
  });

  if (!response.ok) {
    let errorDetail = `ElevenLabs API Error: ${response.status} ${response.statusText}`;
    try {
      const errJson = await response.json();
      if (errJson?.detail?.message) {
        errorDetail = errJson.detail.message;
      } else if (errJson?.detail) {
        errorDetail = typeof errJson.detail === 'string' ? errJson.detail : JSON.stringify(errJson.detail);
      }
    } catch (_) {}
    throw new Error(errorDetail);
  }

  const blob = await response.blob();
  const audioUrl = URL.createObjectURL(blob);
  return {
    success: true,
    audioUrl,
    blob,
    durationEstimate: Math.max(2, Math.round(cleanText.length / 10))
  };
}

/**
 * Web Speech API Fallback
 * Speaks Thai or multi-lingual text using browser speech synthesis
 */
export function speakWithBrowserWebSpeech({
  text,
  pitch = 1.0,
  rate = 1.0,
  onStart,
  onEnd,
  onError
}) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    if (onError) onError(new Error('Browser does not support SpeechSynthesis'));
    return null;
  }

  window.speechSynthesis.cancel();
  const cleanText = cleanDialogueForSpeech(text);
  if (!cleanText) {
    if (onEnd) onEnd();
    return null;
  }

  const utterance = new SpeechSynthesisUtterance(cleanText);
  const isThai = /[\u0E00-\u0E7F]/.test(cleanText);
  const voices = window.speechSynthesis.getVoices();

  if (isThai) {
    const thVoice = voices.find(v => v.lang && (v.lang.startsWith('th') || v.lang.toLowerCase() === 'th-th'));
    if (thVoice) utterance.voice = thVoice;
    utterance.lang = 'th-TH';
  }

  utterance.pitch = Math.max(0.5, Math.min(2.0, pitch));
  utterance.rate = Math.max(0.5, Math.min(2.0, rate));

  if (onStart) utterance.onstart = onStart;
  if (onEnd) utterance.onend = onEnd;
  if (onError) utterance.onerror = onError;

  window.speechSynthesis.speak(utterance);
  return utterance;
}

export function stopBrowserSpeech() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Web Audio Ambient Sound Generator
 * Generates realistic rain ambience (SFX) and low cinematic cello drone (BGM)
 * using standard HTML5 Web Audio API so it plays without needing external MP3 files!
 */
class CinematicAudioEngine {
  constructor() {
    this.ctx = null;
    this.rainNode = null;
    this.rainGain = null;
    this.droneOsc1 = null;
    this.droneOsc2 = null;
    this.droneGain = null;
    this.masterGain = null;
    this.isPlaying = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    this.rainGain.connect(this.masterGain);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
    this.droneGain.connect(this.masterGain);
  }

  setRainVolume(val) {
    if (this.rainGain && this.ctx) {
      this.rainGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  setDroneVolume(val) {
    if (this.droneGain && this.ctx) {
      this.droneGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  setMasterVolume(val) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  startAmbiance({ rain = true, drone = true, rainVol = 0.25, droneVol = 0.20 } = {}) {
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.stopAmbiance();

    const now = this.ctx.currentTime;

    // 1. Generate Rain Noise Buffer (Pink/Brown noise filter)
    if (rain) {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.05;
        b6 = white * 0.115926;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter for rain sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      whiteNoise.connect(filter);
      filter.connect(this.rainGain);
      whiteNoise.start(now);
      this.rainNode = whiteNoise;
      this.rainGain.gain.setValueAtTime(rainVol, now);
    }

    // 2. Generate Cinematic Drone (Dark low cello / suspense pad)
    if (drone) {
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(65.41, now); // C2 low cello note

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(130.81, now); // C3 octave above

      const droneFilter = this.ctx.createBiquadFilter();
      droneFilter.type = 'lowpass';
      droneFilter.frequency.setValueAtTime(260, now);

      osc1.connect(droneFilter);
      osc2.connect(droneFilter);
      droneFilter.connect(this.droneGain);

      osc1.start(now);
      osc2.start(now);

      this.droneOsc1 = osc1;
      this.droneOsc2 = osc2;
      this.droneGain.gain.setValueAtTime(droneVol, now);
    }

    this.isPlaying = true;
  }

  stopAmbiance() {
    if (this.rainNode) {
      try { this.rainNode.stop(); } catch (_) {}
      this.rainNode = null;
    }
    if (this.droneOsc1) {
      try { this.droneOsc1.stop(); } catch (_) {}
      this.droneOsc1 = null;
    }
    if (this.droneOsc2) {
      try { this.droneOsc2.stop(); } catch (_) {}
      this.droneOsc2 = null;
    }
    this.isPlaying = false;
  }
}

export const cinematicAudio = new CinematicAudioEngine();
