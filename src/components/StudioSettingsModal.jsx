import React, { useState, useEffect } from 'react';
import { 
  Settings, X, Key, Cpu, Database, Download, Upload, RotateCcw, 
  CheckCircle2, AlertCircle, ExternalLink, Eye, EyeOff, ShieldCheck, 
  Sparkles, HardDrive, RefreshCw, Mic, Copy, Check
} from 'lucide-react';
import { 
  OPENROUTER_MODELS, 
  getOpenRouterApiKey, 
  setOpenRouterApiKey, 
  getSelectedOpenRouterModel, 
  setSelectedOpenRouterModel,
  testOpenRouterConnection
} from '../utils/openRouter';
import {
  getStoredElevenLabsApiKey,
  setStoredElevenLabsApiKey
} from '../utils/elevenLabs';

export default function StudioSettingsModal({
  isOpen,
  onClose,
  seriesList = [],
  trashList = [],
  onImportData,
  onResetFactoryData
}) {
  const [apiKey, setApiKey] = useState('');
  const [selectedModel, setSelectedModel] = useState('anthropic/claude-3.5-sonnet');
  const [showKey, setShowKey] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const [testResult, setTestResult] = useState(null); // { success: boolean, msg: string }
  const [saveNotice, setSaveNotice] = useState('');
  const [activeTab, setActiveTab] = useState('ai'); // 'ai' | 'elevenlabs' | 'data' | 'system'

  // ElevenLabs State
  const [elevenApiKey, setElevenApiKey] = useState('');
  const [showElevenKey, setShowElevenKey] = useState(false);
  const [testingEleven, setTestingEleven] = useState(false);
  const [elevenTestResult, setElevenTestResult] = useState(null);
  const [elevenVoices, setElevenVoices] = useState([]);
  const [copiedVoiceId, setCopiedVoiceId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      setApiKey(getOpenRouterApiKey());
      setSelectedModel(getSelectedOpenRouterModel());
      setElevenApiKey(getStoredElevenLabsApiKey());
      setTestResult(null);
      setElevenTestResult(null);
      setSaveNotice('');
    }
  }, [isOpen]);

  const handleSaveElevenLabs = () => {
    setStoredElevenLabsApiKey(elevenApiKey.trim());
    // Direct localStorage verification check
    const verified = typeof window !== 'undefined' ? localStorage.getItem('seriesx_elevenlabs_api_key') : '';
    const isSaved = verified && verified === elevenApiKey.trim();
    if (isSaved) {
      setSaveNotice(`✅ ตรวจสอบและบันทึกลง LocalStorage สำเร็จแล้ว! (Key: ${verified.slice(0, 8)}••••••••)`);
    } else if (!elevenApiKey.trim()) {
      setSaveNotice('ℹ️ ล้าง ElevenLabs API Key ใน LocalStorage แล้ว');
    } else {
      setSaveNotice('⚠️ บันทึกแล้ว แต่เกิดปัญหาการอ่านค่าจาก LocalStorage');
    }
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('seriesx_settings_updated'));
    setTimeout(() => setSaveNotice(''), 4500);
  };

  const handleTestElevenLabs = async () => {
    const key = elevenApiKey.trim();
    if (!key) {
      setElevenTestResult({ success: false, msg: 'กรุณากรอก ElevenLabs API Key' });
      return;
    }

    setTestingEleven(true);
    setElevenTestResult(null);
    try {
      const userRes = await fetch('https://api.elevenlabs.io/v1/user', {
        headers: { 'xi-api-key': key },
        signal: AbortSignal.timeout(8000)
      });

      if (!userRes.ok) {
        throw new Error(`เชื่อมต่อไม่สำเร็จ (${userRes.status}): ตรวจสอบ API Key ให้ถูกต้อง`);
      }

      const userData = await userRes.json();

      const voicesRes = await fetch('https://api.elevenlabs.io/v1/voices', {
        headers: { 'xi-api-key': key },
        signal: AbortSignal.timeout(8000)
      });

      let voicesList = [];
      if (voicesRes.ok) {
        const voicesData = await voicesRes.json();
        voicesList = voicesData.voices || [];
      }

      setElevenVoices(voicesList);
      setElevenTestResult({
        success: true,
        tier: userData.subscription?.tier || 'Free',
        used: userData.subscription?.character_count || 0,
        limit: userData.subscription?.character_limit || 10000,
        voiceCount: voicesList.length
      });
      // Auto-save on verified success
      setStoredElevenLabsApiKey(key);
    } catch (err) {
      setElevenTestResult({ success: false, msg: err.message });
    } finally {
      setTestingEleven(false);
    }
  };

  if (!isOpen) return null;

  const handleSaveAiSettings = () => {
    setOpenRouterApiKey(apiKey);
    setSelectedOpenRouterModel(selectedModel);
    // Direct localStorage verification check
    const verifiedKey = typeof window !== 'undefined' ? localStorage.getItem('openrouter_api_key') : '';
    const verifiedModel = typeof window !== 'undefined' ? localStorage.getItem('openrouter_selected_model') : '';
    setSaveNotice(`✅ ตรวจสอบและบันทึกลง LocalStorage แล้ว! (Key: ${verifiedKey ? verifiedKey.slice(0, 10) + '••••' : 'โหมดจำลอง/ว่าง'}, Model: ${verifiedModel})`);
    window.dispatchEvent(new Event('storage'));
    window.dispatchEvent(new CustomEvent('seriesx_settings_updated'));
    setTimeout(() => setSaveNotice(''), 4500);
  };

  const handleTestPing = async () => {
    setTestingConnection(true);
    setTestResult(null);
    const res = await testOpenRouterConnection(apiKey);
    setTestingConnection(false);
    if (res.success) {
      setTestResult({
        success: true,
        msg: `เชื่อมต่อสำเร็จ! Key ปลอดภัย (${res.label}) ${res.limit ? `• วงเงินคงเหลือ: $${res.limit}` : ''}`
      });
      // Save valid key immediately
      setOpenRouterApiKey(apiKey);
    } else {
      setTestResult({
        success: false,
        msg: res.error || 'การเชื่อมต่อไม่สำเร็จ กรุณาตรวจสอบความถูกต้องของ Key'
      });
    }
  };

  const handleExportBackup = () => {
    try {
      const backupData = {
        version: '2.0.0',
        exportedAt: new Date().toISOString(),
        seriesList,
        trashList,
        settings: {
          selectedModel: getSelectedOpenRouterModel()
        }
      };
      const jsonStr = JSON.stringify(backupData, null, 2);
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `seriesx_backup_${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSaveNotice('ส่งออกไฟล์สำรองข้อมูล (JSON) สำเร็จ');
      setTimeout(() => setSaveNotice(''), 3000);
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการสำรองข้อมูล: ' + err.message);
    }
  };

  const handleFileImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (parsed && Array.isArray(parsed.seriesList)) {
          if (confirm(`พบซีรีส์จำนวน ${parsed.seriesList.length} เรื่องในไฟล์สำรอง ต้องการนำเข้าและแทนที่ข้อมูลปัจจุบันหรือไม่?`)) {
            onImportData(parsed.seriesList, parsed.trashList || []);
            setSaveNotice('นำเข้าข้อมูลสำเร็จเรียบร้อย');
            setTimeout(() => setSaveNotice(''), 3000);
          }
        } else {
          alert('รูปแบบไฟล์ JSON ไม่ถูกต้องสำหรับระบบ SeriesX');
        }
      } catch (err) {
        alert('ไม่สามารถอ่านไฟล์ JSON ได้: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleFactoryResetConfirm = () => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้นจากโรงงาน? (ข้อมูลซีรีส์และตอนที่สร้างขึ้นใหม่จะถูกแทนที่ด้วยชุดข้อมูลตัวอย่าง)')) {
      onResetFactoryData();
      setSaveNotice('รีเซ็ตข้อมูลเป็นค่าเริ่มต้นเรียบร้อยแล้ว');
      setTimeout(() => setSaveNotice(''), 3000);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.65)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div 
        className="clay-card animate-fade-in"
        style={{
          width: '80vw',
          maxWidth: '1380px',
          minWidth: '380px',
          height: '88vh',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: 'var(--bg-surface)',
          border: '1.5px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-raised)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-surface)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #135E67, #0B4A51)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-teal-btn)'
            }}>
              <Settings size={22} strokeWidth={2} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: 700 }}>
                ศูนย์การตั้งค่าสตูดิโอ (Studio Settings Hub)
              </h3>
              <p style={{ margin: '3px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                กำหนดค่า OpenRouter AI, สถาปัตยกรรมโมเดล, ElevenLabs Voice Engine, และสำรอง/กู้คืนข้อมูลโปรเจกต์
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
              padding: '8px',
              borderRadius: '8px'
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Tab navigation (Equal 4-Column Grid, exactly 25% width each) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '12px',
          padding: '14px 28px',
          background: 'var(--bg-inset)',
          borderBottom: '1px solid var(--border-subtle)'
        }}>
          <button
            onClick={() => setActiveTab('ai')}
            style={{
              width: '100%',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-pill)',
              background: activeTab === 'ai' ? 'var(--bg-raised)' : 'transparent',
              border: activeTab === 'ai' ? '1.5px solid var(--teal-primary)' : '1px solid transparent',
              color: activeTab === 'ai' ? 'var(--teal-primary)' : 'var(--text-muted)',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'ai' ? 700 : 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'ai' ? 'var(--shadow-raised-sm)' : 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <Cpu size={16} strokeWidth={2.2} />
            <span>OpenRouter & AI Models</span>
          </button>

          <button
            onClick={() => setActiveTab('elevenlabs')}
            style={{
              width: '100%',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-pill)',
              background: activeTab === 'elevenlabs' ? 'var(--bg-raised)' : 'transparent',
              border: activeTab === 'elevenlabs' ? '1.5px solid var(--teal-primary)' : '1px solid transparent',
              color: activeTab === 'elevenlabs' ? 'var(--teal-primary)' : 'var(--text-muted)',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'elevenlabs' ? 700 : 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'elevenlabs' ? 'var(--shadow-raised-sm)' : 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <Mic size={16} strokeWidth={2.2} />
            <span>ElevenLabs AI Voice</span>
            {elevenApiKey ? (
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)' }} title="เชื่อมต่อ ElevenLabs แล้ว" />
            ) : (
              <span style={{ fontSize: '0.68rem', background: 'var(--accent-amber-bg)', color: '#92400E', padding: '1px 7px', borderRadius: '4px', fontWeight: 600 }}>
                ใส่ Key
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('data')}
            style={{
              width: '100%',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-pill)',
              background: activeTab === 'data' ? 'var(--bg-raised)' : 'transparent',
              border: activeTab === 'data' ? '1.5px solid var(--teal-primary)' : '1px solid transparent',
              color: activeTab === 'data' ? 'var(--teal-primary)' : 'var(--text-muted)',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'data' ? 700 : 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'data' ? 'var(--shadow-raised-sm)' : 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <Database size={16} strokeWidth={2} />
            <span>คลังข้อมูล & สำรองโปรเจกต์</span>
          </button>

          <button
            onClick={() => setActiveTab('system')}
            style={{
              width: '100%',
              height: '46px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '8px 12px',
              borderRadius: 'var(--radius-pill)',
              background: activeTab === 'system' ? 'var(--bg-raised)' : 'transparent',
              border: activeTab === 'system' ? '1.5px solid var(--teal-primary)' : '1px solid transparent',
              color: activeTab === 'system' ? 'var(--teal-primary)' : 'var(--text-muted)',
              fontSize: '0.84rem',
              fontWeight: activeTab === 'system' ? 700 : 600,
              cursor: 'pointer',
              boxShadow: activeTab === 'system' ? 'var(--shadow-raised-sm)' : 'none',
              whiteSpace: 'nowrap',
              textAlign: 'center',
              transition: 'all 0.15s ease'
            }}
          >
            <ShieldCheck size={16} strokeWidth={2} />
            <span>พอร์ต & สภาพแวดล้อมระบบ</span>
          </button>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {saveNotice && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              background: 'var(--accent-green-bg)',
              border: '1px solid rgba(31, 122, 89, 0.3)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-green)',
              fontSize: '0.84rem',
              fontWeight: 600
            }}>
              <CheckCircle2 size={16} />
              <span>{saveNotice}</span>
            </div>
          )}

          {/* TAB 1: AI & OPENROUTER */}
          {activeTab === 'ai' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{
                background: 'var(--bg-inset)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-inset)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Key size={16} color="var(--teal-primary)" />
                    OpenRouter API Key
                  </label>
                  <a
                    href="https://openrouter.ai/keys"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.74rem', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none' }}
                  >
                    <span>ขอรับ API Key ฟรีที่ openrouter.ai</span>
                    <ExternalLink size={12} />
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '8px', position: 'relative' }}>
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxx"
                    style={{
                      flex: 1,
                      padding: '10px 42px 10px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.85rem',
                      fontFamily: 'monospace'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      position: 'absolute',
                      right: '120px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    title={showKey ? 'ซ่อน Key' : 'แสดง Key'}
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>

                  <button
                    type="button"
                    onClick={handleTestPing}
                    disabled={testingConnection || !apiKey.trim()}
                    className="btn-secondary"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 14px',
                      fontSize: '0.8rem',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    <RefreshCw size={14} className={testingConnection ? 'animate-spin' : ''} />
                    <span>{testingConnection ? 'กำลังทดสอบ...' : 'ทดสอบ Ping'}</span>
                  </button>
                </div>

                {testResult && (
                  <div style={{
                    marginTop: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: testResult.success ? 'var(--accent-green-bg)' : 'var(--accent-red-bg)',
                    color: testResult.success ? 'var(--accent-green)' : 'var(--accent-red)',
                    border: `1px solid ${testResult.success ? 'rgba(31, 122, 89, 0.3)' : 'rgba(185, 56, 72, 0.3)'}`
                  }}>
                    {testResult.success ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
                    <span>{testResult.msg}</span>
                  </div>
                )}

                <p style={{ margin: '8px 0 0 0', fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                  * หากไม่ได้ใส่ API Key ระบบจะใช้ <strong>Vertical Drama Smart Engine (Simulation Mode)</strong> โดยอัตโนมัติ ซึ่งสามารถสร้างตัวละคร พล็อตเรื่อง และบทซีรีส์แนวตั้งได้ทันทีโดยไม่ต้องต่ออินเทอร์เน็ต
                </p>
              </div>

              {/* Model Selection */}
              <div>
                <label style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '8px' }}>
                  โมเดล AI มาตรฐานสำหรับการเขียนบทและคัดเลือกนักแสดง (Default LLM Model)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '10px' }}>
                  {OPENROUTER_MODELS.map((m) => {
                    const isSelected = selectedModel === m.id;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedModel(m.id)}
                        style={{
                          padding: '12px 14px',
                          borderRadius: 'var(--radius-sm)',
                          border: isSelected ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <input
                            type="radio"
                            name="ai_model"
                            checked={isSelected}
                            onChange={() => setSelectedModel(m.id)}
                            style={{ accentColor: 'var(--teal-primary)', cursor: 'pointer' }}
                          />
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>{m.name}</strong>
                              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', background: 'var(--bg-inset)', padding: '1px 6px', borderRadius: '4px' }}>
                                {m.company}
                              </span>
                            </div>
                            <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{m.badge}</span>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.72rem', color: 'var(--teal-primary)', fontWeight: 600, background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '4px' }}>
                          Context: {m.context}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Quick shortcut to ElevenLabs Voice Engine */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(11, 74, 81, 0.08), rgba(31, 122, 89, 0.08))',
                border: '1px solid var(--teal-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mic size={20} color="var(--teal-primary)" />
                  <div>
                    <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', display: 'block' }}>
                      ต้องการใส่ ElevenLabs API Key สำหรับเสียงพากย์ AI หรือไม่?
                    </strong>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      ระบบรองรับการสังเคราะห์เสียงพากย์ภาษาไทย อารมณ์สะอื้น และซิงค์ลมหายใจผ่าน ElevenLabs Voice Lab
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('elevenlabs')}
                  className="btn-primary"
                  style={{ fontSize: '0.78rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Mic size={14} />
                  <span>ไปที่แท็บ ElevenLabs AI Voice &rarr;</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={handleSaveAiSettings}
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>บันทึกการตั้งค่า AI</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB: ELEVENLABS AI VOICE ENGINE */}
          {activeTab === 'elevenlabs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* API Key Box */}
              <div style={{
                background: 'var(--bg-inset)',
                padding: '20px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-inset)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Key size={18} color="var(--teal-primary)" />
                      ElevenLabs API Key
                    </label>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      ใช้สำหรับสังเคราะห์เสียงพากย์ตัวละคร 9:16 และโคลนเสียงภาษาไทยจาก ElevenLabs Voice Lab
                    </p>
                  </div>
                  <a
                    href="https://elevenlabs.io/app/settings/api-keys"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: '0.78rem', color: 'var(--teal-primary)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'none', fontWeight: 600 }}
                  >
                    <span>ขอรับ API Key ที่ elevenlabs.io</span>
                    <ExternalLink size={13} />
                  </a>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type={showElevenKey ? 'text' : 'password'}
                    value={elevenApiKey}
                    onChange={(e) => setElevenApiKey(e.target.value)}
                    placeholder="sk_..."
                    style={{
                      flex: 1,
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      color: 'var(--text-main)',
                      fontSize: '0.88rem',
                      fontFamily: 'var(--font-mono)'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowElevenKey(!showElevenKey)}
                    className="btn-secondary"
                    style={{ padding: '0 12px', height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {showElevenKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  <button
                    type="button"
                    onClick={handleTestElevenLabs}
                    disabled={testingEleven || !elevenApiKey.trim()}
                    className="btn-secondary"
                    style={{ padding: '0 16px', height: '42px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem' }}
                  >
                    <RefreshCw size={14} className={testingEleven ? 'spin' : ''} />
                    <span>{testingEleven ? 'กำลังทดสอบ...' : 'ทดสอบการเชื่อมต่อ'}</span>
                  </button>
                </div>

                {/* Test Feedback Box */}
                {elevenTestResult && (
                  <div style={{
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.82rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px',
                    background: elevenTestResult.success ? 'var(--accent-green-bg)' : 'var(--accent-red-bg)',
                    color: elevenTestResult.success ? 'var(--accent-green)' : 'var(--accent-red)',
                    border: `1px solid ${elevenTestResult.success ? 'rgba(31, 122, 89, 0.3)' : 'rgba(185, 56, 72, 0.3)'}`
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700 }}>
                      {elevenTestResult.success ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      <span>{elevenTestResult.success ? 'เชื่อมต่อ ElevenLabs API สำเร็จแล้ว!' : elevenTestResult.msg}</span>
                    </div>
                    {elevenTestResult.success && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '0.78rem', color: 'var(--text-main)', marginTop: '4px' }}>
                        <div>แพ็กเกจ: <strong>{elevenTestResult.tier}</strong></div>
                        <div>โควตาตัวอักษร: <strong>{elevenTestResult.used?.toLocaleString()} / {elevenTestResult.limit?.toLocaleString()}</strong></div>
                        <div>เสียงในบัญชี: <strong>{elevenTestResult.voiceCount} เสียง</strong></div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Cloned Voices List from User Account */}
              {elevenVoices.length > 0 && (
                <div style={{
                  background: 'var(--bg-surface)',
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>
                      เสียงที่คุณสร้าง/โคลนไว้ใน ElevenLabs ({elevenVoices.length} เสียง):
                    </strong>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>คลิกเพื่อคัดลอก Voice ID</span>
                  </div>
                  <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {elevenVoices.map(voice => (
                      <div
                        key={voice.voice_id}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '8px 12px',
                          background: 'var(--bg-inset)',
                          borderRadius: 'var(--radius-sm)',
                          fontSize: '0.8rem'
                        }}
                      >
                        <div>
                          <strong>{voice.name}</strong>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginLeft: '8px', fontFamily: 'var(--font-mono)' }}>
                            ID: {voice.voice_id}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(voice.voice_id);
                            setCopiedVoiceId(voice.voice_id);
                            setTimeout(() => setCopiedVoiceId(null), 2000);
                          }}
                          className="btn-secondary"
                          style={{ padding: '3px 8px', fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          {copiedVoiceId === voice.voice_id ? <Check size={12} color="var(--accent-green)" /> : <Copy size={12} />}
                          <span>{copiedVoiceId === voice.voice_id ? 'คัดลอกแล้ว!' : 'คัดลอก Voice ID'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Instructions Guide */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(11, 74, 81, 0.05), rgba(212, 175, 55, 0.06))',
                border: '1px solid rgba(11, 74, 81, 0.15)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                fontSize: '0.8rem',
                lineHeight: 1.5,
                color: 'var(--text-main)'
              }}>
                <strong style={{ color: 'var(--teal-primary)', display: 'block', marginBottom: '6px' }}>
                  💡 วิธีการโคลนเสียงภาษาไทยใน ElevenLabs:
                </strong>
                <ol style={{ margin: 0, paddingLeft: '18px', color: 'var(--text-muted)' }}>
                  <li>ไปที่ <strong>ElevenLabs &rarr; VoiceLab</strong></li>
                  <li>เลือก <strong>Instant Voice Clone</strong> แล้วอัปโหลดคลิปเสียงตัวอย่างภาษาไทย 1-2 นาที (ชัดเจน ไร้เสียงรบกวน)</li>
                  <li>ตั้งชื่อตัวละคร (เช่น ริน ลลิตา หรือ ทาดาโอะ) แล้วกด <strong>Create Voice</strong></li>
                  <li>ก๊อปปี้ <strong>Voice ID</strong> มาวางในหน้าสร้างคลิป หรือกดทดสอบการเชื่อมต่อด้านบนเพื่อดึง Voice ID มาใช้อัตโนมัติ</li>
                </ol>
              </div>

              {/* Save Button */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleSaveElevenLabs}
                  className="btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CheckCircle2 size={16} />
                  <span>บันทึก ElevenLabs API Key</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: DATA & BACKUP */}
          {activeTab === 'data' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{
                background: 'var(--bg-inset)',
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                boxShadow: 'var(--shadow-inset)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--teal-primary)' }}>
                  <HardDrive size={18} strokeWidth={2} />
                  <strong style={{ fontSize: '0.9rem' }}>สถานะการจัดเก็บข้อมูลในเบราว์เซอร์ (Browser LocalStorage)</strong>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginTop: '12px' }}>
                  <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>จำนวนซีรีส์ที่บันทึก:</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>{seriesList.length} เรื่อง</strong>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>ในถังขยะ (Trash):</span>
                    <strong style={{ fontSize: '1.2rem', color: 'var(--text-dim)' }}>{trashList.length} เรื่อง</strong>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', padding: '10px 14px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block' }}>ระบบบันทึกอัตโนมัติ:</span>
                    <strong style={{ fontSize: '1rem', color: 'var(--accent-green)' }}>เปิดทำงานตลอดเวลา</strong>
                  </div>
                </div>
              </div>

              {/* Backup & Restore Action Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {/* Export Backup Card */}
                <div className="clay-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', marginBottom: '8px' }}>
                      <Download size={18} strokeWidth={2} />
                      <strong style={{ fontSize: '0.88rem' }}>สำรองข้อมูลทั้งหมด (Backup JSON)</strong>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      ส่งออกซีรีส์ทั้งหมด ตัวละคร บทนิยาย และช็อต 9:16 เป็นไฟล์ JSON เพื่อเก็บไว้ในเครื่องหรือย้ายไปทำงานเครื่องอื่น
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportBackup}
                    className="btn-primary"
                    style={{ marginTop: '14px', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Download size={16} />
                    <span>ดาวน์โหลดไฟล์สำรอง (.json)</span>
                  </button>
                </div>

                {/* Import Restore Card */}
                <div className="clay-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-amber)', marginBottom: '8px' }}>
                      <Upload size={18} strokeWidth={2} />
                      <strong style={{ fontSize: '0.88rem' }}>นำเข้าข้อมูล (Restore JSON)</strong>
                    </div>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                      เลือกไฟล์ JSON ที่เคยสำรองไว้เพื่อนำข้อมูลซีรีส์และบทกลับเข้ามาทำงานในระบบ
                    </p>
                  </div>
                  <label
                    className="btn-secondary"
                    style={{
                      marginTop: '14px',
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Upload size={16} />
                    <span>เลือกไฟล์นำเข้า (.json)</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleFileImport}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>
              </div>

              {/* Factory Reset */}
              <div style={{
                padding: '16px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid rgba(185, 56, 72, 0.3)',
                background: 'var(--accent-red-bg)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <strong style={{ fontSize: '0.86rem', color: 'var(--accent-red)', display: 'block' }}>
                    รีเซ็ตเป็นข้อมูลตัวอย่างตั้งต้น (Factory Reset)
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    ล้างการเปลี่ยนแปลงทั้งหมดและโหลดโปรเจกต์ต้นแบบ "เงารัตติกาล (The Gilded Shadow)" และตัวละครตัวอย่างกลับมา
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleFactoryResetConfirm}
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent-red)',
                    color: '#FFFFFF',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <RotateCcw size={14} />
                  <span>รีเซ็ตข้อมูลทั้งหมด</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SYSTEM INFO */}
          {activeTab === 'system' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="clay-card" style={{ padding: '20px' }}>
                <h4 style={{ fontSize: '0.94rem', color: 'var(--text-main)', marginBottom: '12px', fontWeight: 700 }}>
                  สถาปัตยกรรมและพอร์ตระบบ (Port & Architecture)
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-inset)', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>ระบบปัจจุบัน:</span>
                    <strong style={{ color: 'var(--teal-primary)' }}>SeriesX Studio 2.0 (AI Vertical Drama)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-inset)', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>พอร์ตระบบทำงาน (Fixed Port):</span>
                    <strong style={{ color: 'var(--accent-green)' }}>http://localhost:5174/ (Strict Port Enforced)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-inset)', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>การแยกพอร์ตคู่ขนาน (Parallel Isolation):</span>
                    <span style={{ color: 'var(--text-muted)' }}>IdleDreamLands @ Port 5173 (แยกอิสระ 100%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-inset)', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>อัตราส่วนภาพหลัก (Canvas Aspect Ratio):</span>
                    <strong>9:16 Vertical UHD (1080 x 1920)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'var(--bg-inset)', borderRadius: '6px' }}>
                    <span style={{ color: 'var(--text-muted)' }}>ระบบเสียงสังเคราะห์ (Voice Engine):</span>
                    <strong>Web Speech API (Thai/English Real-time Synthesis)</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'flex-end',
          background: 'var(--bg-surface)'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '8px 20px', fontSize: '0.85rem' }}
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
