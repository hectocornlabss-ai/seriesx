import React, { useState, useEffect } from 'react';
import { X, Key, CheckCircle2, AlertCircle, ExternalLink, Sparkles, RefreshCw, Volume2, Copy, Check } from 'lucide-react';
import { getStoredElevenLabsApiKey, setStoredElevenLabsApiKey } from '../utils/elevenLabs';

export default function ElevenLabsSettingsModal({ isOpen, onClose, onKeySaved, onSelectVoice }) {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [testingStatus, setTestingStatus] = useState('idle'); // 'idle' | 'testing' | 'success' | 'error'
  const [testResult, setTestResult] = useState(null);
  const [userVoices, setUserVoices] = useState([]);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      const stored = getStoredElevenLabsApiKey();
      setApiKey(stored);
      if (stored) {
        testElevenLabsConnection(stored);
      }
    }
  }, [isOpen]);

  const testElevenLabsConnection = async (keyToTest) => {
    const key = (keyToTest || apiKey).trim();
    if (!key) {
      setTestingStatus('error');
      setTestResult({ message: 'กรุณากรอก ElevenLabs API Key' });
      return;
    }

    setTestingStatus('testing');
    setTestResult(null);

    try {
      // 1. Fetch user info
      const userRes = await fetch('https://api.elevenlabs.io/v1/user', {
        headers: { 'xi-api-key': key }
      });

      if (!userRes.ok) {
        throw new Error(`เชื่อมต่อไม่สำเร็จ (${userRes.status}): ตรวจสอบว่า API Key ถูกต้อง`);
      }

      const userData = await userRes.json();

      // 2. Fetch voices from user account
      const voicesRes = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': key }
      });

      let voicesList = [];
      if (voicesRes.ok) {
        const voicesData = await voicesRes.json();
        voicesList = voicesData.voices || [];
      }

      setUserVoices(voicesList);
      setTestingStatus('success');
      setTestResult({
        tier: userData.subscription?.tier || 'Free',
        characterCount: userData.subscription?.character_count || 0,
        characterLimit: userData.subscription?.character_limit || 10000,
        voiceCount: voicesList.length
      });
    } catch (err) {
      setTestingStatus('error');
      setTestResult({ message: err.message || 'ไม่สามารถเชื่อมต่อกับ ElevenLabs API ได้' });
    }
  };

  const handleSave = () => {
    setStoredElevenLabsApiKey(apiKey.trim());
    setSavedSuccess(true);
    if (onKeySaved) onKeySaved(apiKey.trim());
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleClear = () => {
    setApiKey('');
    setStoredElevenLabsApiKey('');
    setTestingStatus('idle');
    setTestResult(null);
    setUserVoices([]);
    if (onKeySaved) onKeySaved('');
  };

  const handleCopyVoiceId = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    if (onSelectVoice) {
      onSelectVoice(id);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 25, 26, 0.75)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="clay-card" style={{
        width: '100%',
        maxWidth: '640px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        background: 'var(--bg-surface)',
        border: '1.5px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-raised)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
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
              <Volume2 size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                ElevenLabs Voice Engine Configuration
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                ตั้งค่า API Key และจัดการ Voice ID จาก ElevenLabs Voice Lab
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
              padding: '6px',
              borderRadius: '8px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* API Key Input */}
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)', marginBottom: '8px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Key size={15} color="var(--teal-primary)" />
              ElevenLabs API Key
            </span>
            <a
              href="https://elevenlabs.io/app/settings/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '0.75rem', color: 'var(--teal-primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              รับ API Key จาก ElevenLabs <ExternalLink size={12} />
            </a>
          </label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type={showKey ? 'text' : 'password'}
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk_..."
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-inset)',
                color: 'var(--text-main)',
                fontSize: '0.88rem',
                fontFamily: 'var(--font-mono)'
              }}
            />
            <button
              onClick={() => setShowKey(!showKey)}
              className="btn-secondary"
              style={{ padding: '0 14px', fontSize: '0.8rem' }}
            >
              {showKey ? 'ซ่อน' : 'แสดง'}
            </button>
            <button
              onClick={() => testElevenLabsConnection(apiKey)}
              disabled={testingStatus === 'testing' || !apiKey.trim()}
              className="btn-secondary"
              style={{ padding: '0 14px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} className={testingStatus === 'testing' ? 'spin' : ''} />
              <span>ทดสอบ</span>
            </button>
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)', marginTop: '4px', display: 'block' }}>
            * API Key จะถูกบันทึกไว้ใน Browser ของคุณอย่างปลอดภัย (localStorage)
          </span>
        </div>

        {/* Status / Test Feedback Box */}
        {testingStatus === 'testing' && (
          <div style={{
            background: 'var(--teal-subtle)',
            border: '1px solid var(--teal-border)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.82rem',
            color: 'var(--teal-primary)'
          }}>
            <RefreshCw size={16} className="spin" />
            <span>กำลังตรวจสอบการเชื่อมต่อกับ ElevenLabs...</span>
          </div>
        )}

        {testingStatus === 'success' && testResult && (
          <div style={{
            background: 'var(--accent-green-bg)',
            border: '1px solid var(--accent-green)',
            padding: '14px 16px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-green)', fontWeight: 700, fontSize: '0.88rem' }}>
              <CheckCircle2 size={18} />
              <span>เชื่อมต่อ ElevenLabs สำเร็จแล้ว! (พร้อมใช้งาน)</span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '4px' }}>
              <div>แพ็กเกจ: <strong>{testResult.tier}</strong></div>
              <div>โควตาตัวอักษร: <strong>{testResult.characterCount?.toLocaleString()} / {testResult.characterLimit?.toLocaleString()}</strong></div>
              <div>จำนวนเสียงในบัญชี: <strong>{testResult.voiceCount} เสียง</strong></div>
            </div>
          </div>
        )}

        {testingStatus === 'error' && testResult && (
          <div style={{
            background: 'var(--accent-red-bg)',
            border: '1px solid var(--accent-red)',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.82rem',
            color: 'var(--accent-red)'
          }}>
            <AlertCircle size={18} />
            <span>{testResult.message}</span>
          </div>
        )}

        {/* User's Cloned Voices List (if connected) */}
        {userVoices.length > 0 && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)' }}>
                เสียงที่พบบนบัญชี ElevenLabs ของคุณ ({userVoices.length} เสียง):
              </label>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>คลิกเพื่อเลือกหรือคัดลอก Voice ID</span>
            </div>
            <div style={{
              maxHeight: '180px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              padding: '6px',
              background: 'var(--bg-inset)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)'
            }}>
              {userVoices.map(voice => (
                <div
                  key={voice.voice_id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)'
                  }}
                >
                  <div>
                    <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{voice.name}</strong>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      ID: {voice.voice_id} {voice.category ? `• ${voice.category}` : ''}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleCopyVoiceId(voice.voice_id)}
                      className="btn-secondary"
                      style={{ padding: '4px 8px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      {copiedId === voice.voice_id ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                      <span>{copiedId === voice.voice_id ? 'เลือกแล้ว!' : 'ใช้เสียงนี้'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructions Card for User */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(11, 74, 81, 0.05), rgba(212, 175, 55, 0.06))',
          border: '1px solid rgba(11, 74, 81, 0.15)',
          borderRadius: 'var(--radius-md)',
          padding: '14px 16px',
          fontSize: '0.8rem',
          lineHeight: 1.5,
          color: 'var(--text-main)'
        }}>
          <strong style={{ color: 'var(--teal-primary)', display: 'block', marginBottom: '6px' }}>
            💡 ขั้นตอนสร้างเสียงและหา Voice ID ใน ElevenLabs:
          </strong>
          <ol style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-muted)' }}>
            <li>ไปที่ <a href="https://elevenlabs.io/app/voice-lab" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal-primary)', fontWeight: 600 }}>ElevenLabs Voice Lab</a></li>
            <li>กด <strong>Add Generative or Cloned Voice</strong> &rarr; เลือก <strong>Instant Voice Clone</strong> (อัปโหลดไฟล์เสียงตัวอย่างภาษาไทย 1-2 นาที) หรือ <strong>Voice Design</strong></li>
            <li>เมื่อสร้างเสร็จ ให้คลิกที่ไอคอน <strong>ID</strong> เพื่อคัดลอก Voice ID (เช่น <code style={{ fontFamily: 'var(--font-mono)', background: 'var(--bg-inset)', padding: '2px 4px', borderRadius: '3px' }}>21m00Tcm4TlvDq8ikWAM</code>)</li>
            <li>นำ Voice ID มากรอกในช่อง Voice ID ของตัวละคร หรือเลือกจากรายการด้านบนได้ทันที!</li>
          </ol>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            onClick={handleClear}
            className="btn-secondary"
            style={{ fontSize: '0.82rem', color: 'var(--accent-red)' }}
          >
            ล้าง API Key
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '0.84rem' }}
            >
              ปิดหน้าต่าง
            </button>
            <button
              onClick={handleSave}
              className="btn-primary"
              style={{
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: savedSuccess ? 'var(--accent-green)' : 'linear-gradient(135deg, #135E67, #0B4A51)'
              }}
            >
              {savedSuccess ? <Check size={16} /> : <CheckCircle2 size={16} />}
              <span>{savedSuccess ? 'บันทึกสำเร็จ!' : 'บันทึกการตั้งค่า'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
