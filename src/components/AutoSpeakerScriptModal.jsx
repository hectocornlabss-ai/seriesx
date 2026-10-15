import React, { useState } from 'react';
import { 
  Sparkles, Film, Copy, Check, X, User, MessageSquare, 
  ArrowRight, Play, Edit3, Sliders, CheckCircle2, ChevronRight,
  Info, CornerDownRight
} from 'lucide-react';
import { convertDialoguesTo916Shots, formatNovelWithSpeakers } from '../utils/dialogueDetector';

export default function AutoSpeakerScriptModal({
  isOpen,
  onClose,
  analysisData,
  characters = [],
  series,
  originalText,
  onApplyScreenplay,
  onApplyToNovel
}) {
  if (!isOpen) return null;

  const [beats, setBeats] = useState(analysisData?.beats || []);
  const [copied, setCopied] = useState(false);
  const [appliedNovel, setAppliedNovel] = useState(false);
  const [filterSpeaker, setFilterSpeaker] = useState('all');

  // Synchronize beats when analysisData updates
  React.useEffect(() => {
    if (analysisData?.beats) {
      setBeats(analysisData.beats);
    }
  }, [analysisData]);

  const dialogueBeats = beats.filter(b => b.type === 'dialogue');

  // Handle manual speaker change by author
  const handleChangeSpeaker = (beatId, newCharId) => {
    const newChar = characters.find(c => c.id === newCharId);
    if (!newChar) return;

    setBeats(prev => prev.map(b => {
      if (b.id === beatId) {
        return {
          ...b,
          speaker: newChar,
          speakerName: (newChar.name || '').split('/')[0].trim(),
          confidence: 'manual',
          detectionReason: 'ผู้แต่งกำหนดเอง'
        };
      }
      return b;
    }));
  };

  // Handle parenthetical/emotion change
  const handleChangeEmotion = (beatId, newEmotion) => {
    setBeats(prev => prev.map(b => {
      if (b.id === beatId) {
        return {
          ...b,
          parenthetical: newEmotion.startsWith('(') ? newEmotion : `(${newEmotion})`
        };
      }
      return b;
    }));
  };

  // Export to 9:16 Screenplay
  const handleConvertTo916 = () => {
    const shots = convertDialoguesTo916Shots(beats, series);
    if (onApplyScreenplay) {
      onApplyScreenplay(shots);
    }
    onClose();
  };

  // Apply @tags into original novel manuscript
  const handleInsertTagsToNovel = () => {
    const updatedNovel = formatNovelWithSpeakers(originalText, beats);
    if (onApplyToNovel) {
      onApplyToNovel(updatedNovel);
    }
    setAppliedNovel(true);
    setTimeout(() => {
      setAppliedNovel(false);
      onClose();
    }, 1200);
  };

  // Copy Screenplay formatted script to clipboard
  const handleCopyScript = () => {
    let scriptText = `=== บทซีรีส์ 9:16 (สร้างจากนิยายโดย AI Speaker Detection) ===\n\n`;
    
    dialogueBeats.forEach((beat, idx) => {
      scriptText += `[ช็อตที่ ${idx + 1}]\n`;
      if (beat.contextAction) {
        scriptText += `ฉาก/แอ็กชัน: ${beat.contextAction}\n`;
      }
      scriptText += `${beat.speakerName.toUpperCase()}\n`;
      scriptText += `${beat.parenthetical}\n`;
      scriptText += `"${beat.dialogue}"\n\n`;
    });

    navigator.clipboard.writeText(scriptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredBeats = filterSpeaker === 'all' 
    ? dialogueBeats 
    : dialogueBeats.filter(b => b.speaker?.id === filterSpeaker);

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
      <div style={{
        position: 'relative',
        zIndex: 1,
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.35)',
        width: '100%',
        maxWidth: '960px',
        height: '86vh',
        maxHeight: '88vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--teal-primary), #135E67)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: 'var(--shadow-teal-btn)'
            }}>
              <Sparkles size={22} strokeWidth={2} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                  ระบบตรวจจับผู้พูด & แปลงเป็นบทซีรีส์อัตโนมัติ
                </h3>
                <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                  Auto Speaker AI
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                ระบบวิเคราะห์ประโยคคำพูดและบริบทแวดล้อมเพื่อระบุตัวละครผู้พูด แม้ไม่ได้พิมพ์ @ หรือระบุชื่อไว้
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '50%'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Stats & Filter Bar */}
        <div style={{
          padding: '12px 24px',
          background: 'var(--bg-inset)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)' }}>
              พบบทพูดทั้งหมด: <strong style={{ color: 'var(--teal-primary)' }}>{dialogueBeats.length} ประโยค</strong>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)' }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>ตัวละครในฉากนี้ ({analysisData.charactersInScene.length}):</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '-6px' }}>
                {analysisData.charactersInScene.map(char => (
                  <img
                    key={char.id}
                    src={char.portrait || '/assets/default_avatar.jpg'}
                    alt={char.name}
                    title={char.name}
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #fff',
                      marginLeft: '-6px'
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)' }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>
              ความแม่นยำ AI: {analysisData.stats?.highConfidencePct || 98}%
            </div>
          </div>

          {/* Filter by Character */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>กรองตามตัวละคร:</span>
            <select
              value={filterSpeaker}
              onChange={(e) => setFilterSpeaker(e.target.value)}
              style={{
                padding: '4px 10px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-subtle)',
                background: 'var(--bg-raised)',
                fontSize: '0.78rem',
                color: 'var(--text-main)'
              }}
            >
              <option value="all">แสดงทั้งหมด ({dialogueBeats.length})</option>
              {characters.map(char => (
                <option key={char.id} value={char.id}>
                  {(char.name || '').split('/')[0].trim()}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Body: List of detected dialogue beats */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
          background: 'var(--bg-base)'
        }}>
          {filteredBeats.length === 0 ? (
            <div style={{
              padding: '40px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              background: 'var(--bg-surface)',
              borderRadius: 'var(--radius-md)',
              border: '1px dashed var(--border-subtle)'
            }}>
              <Info size={32} style={{ margin: '0 auto 10px auto', opacity: 0.5 }} />
              <p style={{ margin: 0, fontWeight: 600 }}>ไม่พบบทสนทนาในเครื่องหมายคำพูด ("...") สำหรับตัวละครนี้</p>
              <p style={{ fontSize: '0.8rem', margin: '4px 0 0 0' }}>พิมพ์บทพูดลงในเนื้อหาด้วยเครื่องหมายคำพูด เช่น "สวัสดี" หรือกดปุ่ม @ เพื่อแทรก</p>
            </div>
          ) : (
            filteredBeats.map((beat, idx) => {
              const char = beat.speaker;
              const isManual = beat.confidence === 'manual';
              const isHigh = beat.confidence === 'high';

              return (
                <div
                  key={beat.id}
                  style={{
                    background: 'var(--bg-raised)',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-subtle)',
                    padding: '16px',
                    boxShadow: 'var(--shadow-raised-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  {/* Top Bar of Beat */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '8px'
                  }}>
                    {/* Speaker Selector */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        color: 'var(--teal-primary)',
                        background: 'rgba(11, 74, 81, 0.08)',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)'
                      }}>
                        ช็อต #{idx + 1}
                      </span>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <img
                          src={char?.portrait || '/assets/default_avatar.jpg'}
                          alt=""
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1.5px solid var(--teal-primary)'
                          }}
                        />
                        <select
                          value={char?.id || ''}
                          onChange={(e) => handleChangeSpeaker(beat.id, e.target.value)}
                          style={{
                            padding: '4px 8px',
                            borderRadius: '6px',
                            border: '1px solid var(--border-subtle)',
                            background: 'var(--bg-surface)',
                            fontWeight: 700,
                            fontSize: '0.84rem',
                            color: 'var(--teal-primary)',
                            cursor: 'pointer'
                          }}
                          title="คลิกเพื่อเปลี่ยนตัวละครผู้พูดหากต้องการปรับแก้"
                        >
                          {characters.map(c => (
                            <option key={c.id} value={c.id}>
                              {(c.name || '').split('/')[0].trim()} ({c.role?.split('/')[0].trim() || 'ตัวละคร'})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Confidence & Detection Reason Badge */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        fontSize: '0.7rem',
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-pill)',
                        background: isManual ? 'var(--accent-amber-bg)' : isHigh ? 'var(--accent-green-bg)' : 'rgba(11, 74, 81, 0.08)',
                        color: isManual ? 'var(--accent-amber)' : isHigh ? 'var(--accent-green)' : 'var(--teal-primary)',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}>
                        {isManual ? '✏️ กำหนดเอง' : isHigh ? '✓ ตรวจพบชื่อตรงตัว' : '⚡ วิเคราะห์จากบริบท'}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                        ({beat.detectionReason})
                      </span>
                    </div>
                  </div>

                  {/* Context Action in Novel */}
                  {beat.contextAction && (
                    <div style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      fontStyle: 'italic',
                      background: 'var(--bg-inset)',
                      padding: '6px 12px',
                      borderRadius: 'var(--radius-sm)',
                      borderLeft: '2.5px solid var(--border-subtle)'
                    }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-main)', fontStyle: 'normal' }}>บริบทในนิยาย: </span>
                      "{beat.contextAction}"
                    </div>
                  )}

                  {/* Dialogue & Parenthetical Box */}
                  <div style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(11, 74, 81, 0.03)',
                    borderLeft: '3.5px solid var(--teal-primary)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '6px'
                  }}>
                    {/* Parenthetical Cue */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 600 }}>การแสดง/อารมณ์:</span>
                      <input
                        type="text"
                        value={beat.parenthetical}
                        onChange={(e) => handleChangeEmotion(beat.id, e.target.value)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px dashed var(--border-subtle)',
                          fontSize: '0.76rem',
                          color: 'var(--teal-primary)',
                          fontStyle: 'italic',
                          fontWeight: 600,
                          outline: 'none',
                          padding: '1px 4px',
                          width: '280px'
                        }}
                        title="คลิกเพื่อแก้ไขอารมณ์หรือท่าทางการพูด"
                      />
                    </div>

                    {/* Quoted Dialogue */}
                    <div style={{
                      fontSize: '0.96rem',
                      color: '#1E293B',
                      fontWeight: 600,
                      lineHeight: 1.6
                    }}>
                      &ldquo;{beat.dialogue}&rdquo;
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            {/* Copy Script Button */}
            <button
              type="button"
              onClick={handleCopyScript}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.8rem'
              }}
            >
              {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
              <span>{copied ? 'คัดลอกบทสคิปต์แล้ว!' : 'คัดลอกบทสคิปต์'}</span>
            </button>

            {/* Insert @Tags into Novel */}
            <button
              type="button"
              onClick={handleInsertTagsToNovel}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                fontSize: '0.8rem',
                color: 'var(--teal-primary)',
                borderColor: 'var(--teal-primary)'
              }}
              title="แทรกป้ายชื่อ @ตัวละคร เข้าไปในเนื้อหานิยายต้นฉบับอัตโนมัติ"
            >
              {appliedNovel ? <Check size={14} /> : <Edit3 size={14} />}
              <span>{appliedNovel ? 'แทรกป้ายชื่อเรียบร้อย!' : 'แทรกป้าย @ตัวละคร ลงในนิยาย'}</span>
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.82rem' }}
            >
              ปิด
            </button>

            {/* Convert to 9:16 Screenplay Primary Action */}
            <button
              type="button"
              onClick={handleConvertTo916}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                fontSize: '0.85rem',
                fontWeight: 700,
                boxShadow: 'var(--shadow-teal-btn)'
              }}
            >
              <Film size={16} strokeWidth={2} />
              <span>แปลงเป็นบทซีรีส์ 9:16 ทันที ({dialogueBeats.length} ช็อต)</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
