import React, { useState } from 'react';
import { Sparkles, Zap, Flame, Video, MessageSquare, Volume2, Eye, Camera, UserCheck, Activity, BookOpen, Music, ShieldCheck, Film, Award, Plus, Edit3, Trash2, Check, ArrowRight, ArrowLeft, Image as ImageIcon, Feather, Layers, List, Play, Sliders, AlertTriangle, Clock, RotateCcw, X } from 'lucide-react';
import NovelStudioEditor from './NovelStudioEditor';
import SeriesStructurePage from './SeriesStructurePage';

export default function WritersRoomTab({
  seriesList,
  trashList = [],
  activeSeries,
  onSelectSeries,
  onAddSeries,
  onUpdateSeries,
  onDeleteSeries,
  onRestoreSeries,
  onPermanentDeleteSeries,
  onEmptyTrash,
  onOpenCharacterBible,
  onAddCharacter,
  activeSubTab,
  onSubTabChange,
  onGoHome,
  onNavigate
}) {
  const [internalSubTab, setInternalSubTab] = useState(activeSubTab || 'shelf');
  const subTab = activeSubTab || internalSubTab;

  const setSubTab = (newTab, optionalId) => {
    setInternalSubTab(newTab);
    const targetId = optionalId || activeSeries?.id;
    if (onNavigate) {
      if (newTab === 'novel') onNavigate('/novel', { id: targetId });
      else if (newTab === 'structure') onNavigate('/structure', { id: targetId });
      else if (newTab === 'new-series') onNavigate('/new-series');
      else if (newTab === 'screenplay') onNavigate('/screenplay', { id: targetId });
      else onNavigate('/');
    } else if (onSubTabChange) {
      onSubTabChange(newTab);
    }
  };

  // Trash & Soft Delete States
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [seriesPendingDelete, setSeriesPendingDelete] = useState(null);
  const [showTrashModal, setShowTrashModal] = useState(false);
  const [noticeMessage, setNoticeMessage] = useState('');

  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);
  const [optimizationSuccess, setOptimizationSuccess] = useState('');

  const shots = activeSeries.shots || [];
  const selectedShot = shots[activeShotIndex] || shots[0] || {};

  const handleSaveStructure = (formData) => {
    onUpdateSeries({
      ...activeSeries,
      ...formData
    });
    setSubTab('novel', activeSeries.id);
    setOptimizationSuccess(`บันทึกการแก้ไขโครงสร้าง "${formData.title}" เรียบร้อยแล้ว`);
    setTimeout(() => setOptimizationSuccess(''), 3500);
  };

  const handleAddNewChapterFromStructure = (formData) => {
    const existingChapters = activeSeries.chapters || [];
    const newNumber = existingChapters.length + 1;
    const newChapterId = `ch-${Date.now()}`;
    const newVolId = activeSeries.volumes?.[0]?.id || `vol-01`;

    const newChapter = {
      id: newChapterId,
      number: newNumber,
      volumeId: newVolId,
      title: `ตอนที่ ${newNumber}: ปมปริศนาบทใหม่`,
      status: 'กำลังเขียน (Draft)',
      wordCount: 0,
      content: '',
      notes: 'เริ่มต้นแต่งตอนใหม่...',
      comments: []
    };

    onUpdateSeries({
      ...activeSeries,
      ...formData,
      chapters: [...existingChapters, newChapter]
    });

    setSubTab('novel', activeSeries.id);
    setOptimizationSuccess(`สร้างตอนที่ ${newNumber} สำเร็จ พร้อมเขียนใน Google Docs`);
    setTimeout(() => setOptimizationSuccess(''), 3500);
  };

  const handleSaveNewSeries = (formData) => {
    const newId = `series-${Date.now()}`;
    const createdSeries = {
      ...formData,
      id: newId,
      currentEpisode: 1,
      episodeTitle: 'EP 01: จุดเริ่มต้น (The Beginning)',
      productionStatus: 'Writers Room Drafting',
      pacingScore: {
        hookScore: 95,
        cliffhangerScore: 92,
        tensionIndex: 90,
        retentionProbability: '97.5% (High)'
      },
      volumes: [
        { id: `vol-${Date.now()}`, title: 'เล่มที่ 1: ปฐมบท' }
      ],
      chapters: [
        {
          id: `ch-${Date.now()}`,
          number: 1,
          volumeId: `vol-${Date.now()}`,
          title: 'ตอนที่ 1: การเริ่มต้น',
          status: 'กำลังเขียน (Draft)',
          wordCount: 0,
          content: '',
          notes: 'เริ่มต้นแต่งนิยายเรื่องใหม่...',
          comments: []
        }
      ],
      characters: [
        {
          id: `char-${Date.now()}`,
          name: 'ตัวละครเอก (Main Lead)',
          role: 'ตัวเอกหลัก (Protagonist)',
          actorSeed: 77100000 + Math.floor(Math.random() * 99999),
          loraModel: 'Default_Lead_V1.safetensors',
          loraWeight: 0.88,
          faceLockAccuracy: '98.5%',
          portrait: formData.coverUrl || '/assets/rin_portrait.jpg',
          sheetImage: '/assets/rin_sheet.jpg',
          actingStyle: 'Method Acting',
          voiceProfile: {
            voiceId: 'TH-Fem-Deep-01',
            tone: 'ทรงพลัง มุ่งมั่น',
            pitch: '0 semitones',
            speed: '1.0x',
            breathIntensity: '0.35',
            sampleLine: 'เรื่องนี้ฉันจะไม่ยอมแพ้ง่ายๆ แน่นอน!'
          },
          wardrobeSpec: 'ชุดสุภาพทันสมัย',
          description: 'ตัวละครหลักของเรื่อง',
          expressionMatrix: [
            { label: 'Neutral', status: 'Locked 100%' },
            { label: 'Emotional', status: 'Locked 98%' }
          ]
        }
      ],
      shots: activeSeries.shots || []
    };

    onAddSeries(createdSeries);
    setSubTab('novel');
    setOptimizationSuccess(`สร้างซีรีส์เรื่องใหม่ "${createdSeries.title}" สำเร็จ! พร้อมเริ่มแต่งนิยาย`);
    setTimeout(() => setOptimizationSuccess(''), 3500);
  };



  const handleRunAiOptimize = (type) => {
    setIsAiOptimizing(true);
    setOptimizationSuccess('');
    setTimeout(() => {
      setIsAiOptimizing(false);
      if (type === 'hook') {
        setOptimizationSuccess('3-Second Hook ปรับจังหวะให้กระชับ เพิ่มสปีดการตัดภาพ และเพิ่มเสียงฟ้าร้องกระแทกอารมณ์สำเร็จ');
      } else if (type === 'cliffhanger') {
        setOptimizationSuccess('Cliffhanger Index เพิ่มขึ้นเป็น 98/100 ด้วยการใส่จุดตัดเสียงฉับพลันและเสียงไซเรนฉุกเฉิน');
      } else {
        setOptimizationSuccess('ปรับเพิ่มความลึกซึ้งของการแสดง (Micro-expressions & FACS) และคิวมุมกล้องเรียบร้อย');
      }
    }, 900);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px 0' }}>
      
      {/* SUB-VIEW 1: NOVEL STUDIO & AI CO-WRITER (DEDICATED SEPARATE PAGE) */}
      {subTab === 'novel' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Top Breadcrumb & Quick Action Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
            background: 'var(--bg-surface)',
            padding: '12px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-raised-sm)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <button
                onClick={() => setSubTab('shelf')}
                id="btn-back-to-shelf"
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: 'var(--teal-primary)',
                  borderColor: 'var(--teal-primary)',
                  background: 'var(--bg-inset)',
                  cursor: 'pointer'
                }}
                title="กลับไปยังคลังโปรเจ็กต์นิยายทั้งหมด"
              >
                <ArrowLeft size={16} strokeWidth={2.5} />
                <span>กลับไปคลังนิยายทั้งหมด (Projects)</span>
              </button>

              <div style={{ width: '1px', height: '28px', background: 'var(--border-subtle)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={activeSeries.coverUrl}
                  alt=""
                  style={{ width: '28px', height: '40px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                />
                <div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>กำลังเขียนนิยายเรื่อง:</div>
                  <strong style={{ fontSize: '1rem', color: 'var(--text-main)' }}>{activeSeries.title}</strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button
                onClick={() => setSubTab('structure')}
                className="btn-secondary"
                style={{ padding: '7px 14px', fontSize: '0.78rem' }}
                title="เปิดหน้าตั้งค่าโครงสร้างซีรีส์และ Lore"
              >
                <Sliders size={14} strokeWidth={2} />
                <span>โครงสร้างเรื่อง & Lore</span>
              </button>
              <button
                onClick={() => setSubTab('screenplay')}
                className="btn-secondary"
                style={{ padding: '7px 14px', fontSize: '0.78rem' }}
                title="แปลงและดูบทซีรีส์ 9:16"
              >
                <Film size={14} strokeWidth={2} />
                <span>บทซีรีส์ 9:16</span>
              </button>
            </div>
          </div>

          <NovelStudioEditor
            series={activeSeries}
            onUpdateSeries={onUpdateSeries}
            onAddCharacter={onAddCharacter}
            onConvertToScreenplay={(chapter, customShots) => {
              if (customShots && customShots.length > 0) {
                onUpdateSeries({
                  ...activeSeries,
                  shots: customShots
                });
              }
              setSubTab('screenplay');
            }}
            onOpenSeriesSettings={() => setSubTab('structure')}
            onOpenCharacterBible={onOpenCharacterBible}
            onGoHome={() => setSubTab('shelf')}
          />
        </div>
      )}

      {/* SUB-VIEW 2: DEDICATED FULL-PAGE EDIT SERIES STRUCTURE */}
      {subTab === 'structure' && (
        <SeriesStructurePage
          series={activeSeries}
          isNew={false}
          onSave={handleSaveStructure}
          onCancel={() => setSubTab('shelf')}
          onGoToNovel={(formData) => {
            onUpdateSeries({ ...activeSeries, ...formData });
            setSubTab('novel', activeSeries.id);
          }}
          onAddNewChapter={handleAddNewChapterFromStructure}
        />
      )}

      {/* SUB-VIEW 3: DEDICATED FULL-PAGE CREATE NEW SERIES */}
      {subTab === 'new-series' && (
        <SeriesStructurePage
          series={null}
          isNew={true}
          onSave={handleSaveNewSeries}
          onCancel={() => setSubTab('shelf')}
          onGoToNovel={handleSaveNewSeries}
          onAddNewChapter={handleSaveNewSeries}
        />
      )}

      {/* SUB-VIEW 4: MAIN NOVEL PROJECTS & BOOK COVERS SHELF (DEFAULT) */}
      {subTab === 'shelf' && (
        <>
          {/* 1. TOP SECTION: SERIES LIBRARY & BOOK COVERS SHELF (แสดงชื่อนิยาย ภาพปก และปุ่มสร้างเรื่องใหม่) */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: 'var(--teal-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    boxShadow: 'var(--shadow-teal-btn)'
                  }}>
                    <BookOpen size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontWeight: 800 }}>
                      โปรเจ็กต์นิยาย & คลังซีรีส์ (Novel Projects & Series)
                    </h2>
                    <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                      จัดการนิยายและซีรีส์ทั้งหมดในระบบ แสดงชื่อนิยาย ภาพปก และปุ่มเข้าห้องแต่งนิยาย หรือสร้างเรื่องใหม่ได้ทันที
                    </p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <button
                  type="button"
                  onClick={() => setShowTrashModal(true)}
                  id="btn-open-trash-modal"
                  className="btn-secondary"
                  style={{
                    padding: '9px 14px',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: trashList.length > 0 ? 'var(--accent-red)' : 'var(--text-muted)',
                    borderColor: trashList.length > 0 ? 'rgba(185, 56, 72, 0.4)' : 'var(--border-subtle)',
                    background: trashList.length > 0 ? 'var(--accent-red-bg)' : 'var(--bg-surface)'
                  }}
                  title="ดูรายการนิยายที่ถูกลบชั่วคราว (Soft Delete 7 วัน)"
                >
                  <Trash2 size={16} strokeWidth={2} />
                  <span>ถังขยะ</span>
                  {trashList.length > 0 && (
                    <span style={{
                      background: 'var(--accent-red)',
                      color: '#fff',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '1px 6px',
                      borderRadius: '10px',
                      marginLeft: '2px'
                    }}>
                      {trashList.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setSubTab('new-series')}
                  id="btn-add-new-series-main"
                  className="btn-primary"
                  style={{
                    padding: '10px 20px',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(11, 74, 81, 0.35)'
                  }}
                >
                  <Plus size={18} strokeWidth={2.5} />
                  <span>+ เพิ่มนิยาย / เรื่องใหม่</span>
                </button>
              </div>
            </div>

            {/* Notice Message Alert if item trashed or restored */}
            {noticeMessage && (
              <div style={{
                marginBottom: '18px',
                padding: '10px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(11, 74, 81, 0.08)',
                border: '1.5px solid var(--teal-primary)',
                color: 'var(--text-main)',
                fontSize: '0.82rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 'var(--shadow-raised-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={16} strokeWidth={2.5} color="var(--teal-primary)" />
                  <span>{noticeMessage}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {trashList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowTrashModal(true)}
                      style={{
                        background: 'var(--teal-primary)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 'var(--radius-pill)',
                        padding: '4px 10px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      เปิดถังขยะ ({trashList.length})
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setNoticeMessage('')}
                    style={{ background: 'none', border: 'none', color: 'var(--text-dim)', cursor: 'pointer', padding: '2px' }}
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Series Covers Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '22px'
            }}>
          {seriesList.map(item => {
            const isActive = item.id === activeSeries.id;
            return (
              <div
                key={item.id}
                style={{
                  background: isActive ? 'var(--bg-raised)' : 'var(--bg-surface)',
                  border: isActive ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  boxShadow: isActive ? 'var(--shadow-raised)' : 'var(--shadow-raised-sm)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Book Cover Image 2:3 */}
                <div
                  onClick={() => { onSelectSeries(item.id); setSubTab('novel', item.id); }}
                  style={{ position: 'relative', height: '240px', background: '#000', overflow: 'hidden', cursor: 'pointer' }}
                  title="คลิกภาพปกเพื่อเข้าสู่ห้องเขียนนิยาย"
                >
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  />
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: 'var(--teal-primary)',
                      color: '#FFFFFF',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-pill)',
                      boxShadow: 'var(--shadow-teal-btn)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Check size={12} strokeWidth={3} />
                      <span>กำลังทำงาน (ACTIVE)</span>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '8px',
                    right: '8px',
                    background: 'rgba(0, 0, 0, 0.75)',
                    color: '#fff',
                    fontSize: '0.7rem',
                    padding: '3px 8px',
                    borderRadius: '4px'
                  }}>
                    {item.episodesCount} ตอน
                  </div>
                </div>

                {/* Card Content & Metadata */}
                <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <h3
                    onClick={() => { onSelectSeries(item.id); setSubTab('novel', item.id); }}
                    style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700, cursor: 'pointer' }}
                    title="คลิกเพื่อเข้าสู่ห้องเขียนนิยาย"
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--teal-primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-main)'}
                  >
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.75rem', color: 'var(--teal-primary)', marginTop: '2px', fontWeight: 600 }}>
                    {item.englishTitle}
                  </p>
                  <p style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    marginTop: '8px',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {item.logline}
                  </p>

                  <div style={{ marginTop: 'auto', paddingTop: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {isActive ? (
                        <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                          เรื่องที่เปิดอยู่
                        </span>
                      ) : (
                        <button
                          onClick={() => onSelectSeries(item.id)}
                          className="btn-secondary"
                          style={{ padding: '5px 10px', fontSize: '0.72rem' }}
                        >
                          <span>เลือกเรื่องนี้</span>
                        </button>
                      )}

                      <button
                        onClick={() => { onSelectSeries(item.id); setSubTab('novel', item.id); }}
                        className="btn-primary"
                        style={{ padding: '6px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700 }}
                        title="เปิดหน้าแต่งนิยายรายตอนสำหรับเรื่องนี้"
                      >
                        <Feather size={13} strokeWidth={2} />
                        <span>เข้าสู่หน้าเขียนนิยาย</span>
                      </button>

                      <button
                        onClick={() => { onSelectSeries(item.id); setSubTab('screenplay', item.id); }}
                        className="btn-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.72rem' }}
                        title="เปิดดูบทซีรีส์ 9:16"
                      >
                        <Film size={12} strokeWidth={2} />
                        <span>บท 9:16</span>
                      </button>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => { onSelectSeries(item.id); setSubTab('structure', item.id); }}
                        style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '50%',
                          background: 'var(--bg-inset)',
                          border: '1px solid var(--border-subtle)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          color: 'var(--text-main)'
                        }}
                        title="แก้ไขโครงสร้างเรื่อง"
                      >
                        <Edit3 size={14} strokeWidth={2} />
                      </button>

                      {seriesList.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            setSeriesPendingDelete(item);
                            setShowDeleteConfirmModal(true);
                          }}
                          id={`btn-trash-series-${item.id}`}
                          style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: 'var(--accent-red-bg)',
                            border: '1px solid rgba(185, 56, 72, 0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: 'var(--accent-red)'
                          }}
                          title="ลบซีรีส์นี้ (ย้ายไปถังขยะ 7 วัน)"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. NOVEL & MASTER LORE STRUCTURE (ของเรื่องที่เปิดอยู่) */}
      <div className="clay-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <img
              src={activeSeries.coverUrl}
              alt={activeSeries.title}
              style={{
                width: '100px',
                height: '145px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                boxShadow: 'var(--shadow-raised-sm)',
                border: '1px solid var(--border-subtle)'
              }}
            />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-teal">{activeSeries.genre}</span>
                <span className="badge badge-sand">{activeSeries.episodesCount} ตอน</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: '8px 0 2px 0', fontWeight: 800 }}>
                {activeSeries.title}
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                {activeSeries.englishTitle} &bull; สัดส่วน 9:16 Vertical UHD
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setSubTab('structure')} className="btn-secondary">
              <Edit3 size={15} strokeWidth={2} />
              <span>แก้ไขโครงสร้างนิยาย</span>
            </button>
            <button onClick={() => handleRunAiOptimize('hook')} className="btn-primary">
              <Flame size={15} strokeWidth={2} />
              <span>AI Boost 3s Hook</span>
            </button>
          </div>
        </div>

        {optimizationSuccess && (
          <div style={{
            marginBottom: '18px',
            padding: '10px 16px',
            background: 'var(--accent-green-bg)',
            border: '1px solid rgba(31, 122, 89, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--accent-green)',
            fontSize: '0.85rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} strokeWidth={2} />
            <span>{optimizationSuccess}</span>
          </div>
        )}

        {/* Story Structure Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '18px' }}>
          <div style={{
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <strong style={{ color: 'var(--teal-primary)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
              Logline (โครงเรื่องย่อ 1 ประโยคทองคำ):
            </strong>
            <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {activeSeries.logline}
            </p>
          </div>

          <div style={{
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <strong style={{ color: 'var(--teal-primary)', fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>
              ปมขัดแย้งหลักของเรื่อง (Core Conflict):
            </strong>
            <p style={{ margin: 0, color: 'var(--text-main)', fontSize: '0.88rem', lineHeight: 1.5 }}>
              {activeSeries.coreConflict}
            </p>
          </div>

          <div style={{
            gridColumn: '1 / -1',
            background: 'var(--bg-surface)',
            boxShadow: 'var(--shadow-raised-sm)',
            padding: '18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <strong style={{ color: 'var(--teal-primary)', fontSize: '0.9rem', display: 'block', marginBottom: '6px' }}>
              เรื่องย่อฉบับเต็ม (Full Synopsis & Lore):
            </strong>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
              {activeSeries.synopsis}
            </p>
          </div>
        </div>
      </div>

      {/* 3. VERTICAL METRICS & BEAT SHEET BREAKDOWN */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '18px'
      }}>
        {/* 3-Second Hook */}
        <div className="clay-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--teal-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--teal-primary)'
              }}>
                <Flame size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>3-Second Hook Score</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>วัดพลังการหยุดนิ้วคนดู 3 วินาทีแรก</p>
              </div>
            </div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: 'var(--teal-primary)',
              fontFamily: 'var(--font-display)'
            }}>
              {activeSeries.pacingScore?.hookScore || 96}<span style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>/100</span>
            </div>
          </div>
          <div style={{
            height: '7px',
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            borderRadius: '4px',
            marginTop: '14px',
            overflow: 'hidden'
          }}>
            <div style={{ width: `${activeSeries.pacingScore?.hookScore || 96}%`, height: '100%', background: 'var(--teal-primary)' }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.5 }}>
            <strong>กลยุทธ์ 3s Hook:</strong> {activeSeries.hookStrategy}
          </p>
        </div>

        {/* Cliffhanger Index */}
        <div className="clay-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--teal-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--teal-primary)'
              }}>
                <Zap size={20} strokeWidth={2} />
              </div>
              <div>
                <h3 style={{ fontSize: '0.95rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>Cliffhanger Index</h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ดัชนีแรงจูงใจให้กดดูตอนต่อไป</p>
              </div>
            </div>
            <div style={{
              fontSize: '1.8rem',
              fontWeight: 800,
              color: 'var(--teal-primary)',
              fontFamily: 'var(--font-display)'
            }}>
              {activeSeries.pacingScore?.cliffhangerScore || 94}<span style={{ fontSize: '0.95rem', color: 'var(--text-dim)' }}>/100</span>
            </div>
          </div>
          <div style={{
            height: '7px',
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            borderRadius: '4px',
            marginTop: '14px',
            overflow: 'hidden'
          }}>
            <div style={{ width: `${activeSeries.pacingScore?.cliffhangerScore || 94}%`, height: '100%', background: 'var(--teal-primary)' }} />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px', lineHeight: 1.5 }}>
            <strong>กลยุทธ์ Cliffhanger:</strong> {activeSeries.cliffhangerStrategy}
          </p>
        </div>
      </div>
    </>
  )}

  {/* SUB-VIEW 5: VERTICAL SCREENPLAY BREAKDOWN (9:16 BEATS) */}
  {subTab === 'screenplay' && (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Top Breadcrumb Navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'var(--bg-surface)',
        padding: '12px 20px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-raised-sm)'
      }}>
        <button
          onClick={() => setSubTab('shelf')}
          className="btn-secondary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            fontSize: '0.85rem',
            fontWeight: 700,
            color: 'var(--teal-primary)',
            borderColor: 'var(--teal-primary)',
            background: 'var(--bg-inset)',
            cursor: 'pointer'
          }}
          title="กลับไปยังคลังโปรเจ็กต์นิยายทั้งหมด"
        >
          <ArrowLeft size={16} strokeWidth={2.5} />
          <span>กลับไปคลังนิยายทั้งหมด (Projects)</span>
        </button>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            onClick={() => setSubTab('novel')}
            className="btn-secondary"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <Feather size={16} strokeWidth={2} />
            <span>เข้าสู่หน้าเขียนนิยาย (Novel Studio)</span>
          </button>

          <button
            onClick={() => {
              if (onNavigate) onNavigate('/pipeline');
            }}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              fontSize: '0.85rem',
              boxShadow: 'var(--shadow-teal-btn)'
            }}
            title="ส่งช็อตทั้งหมดเข้าสู่กระบวนการเจนเสียงพากย์และวิดีโอ 9:16"
          >
            <Video size={16} strokeWidth={2} />
            <span>ไปที่ Video & Audio Engine (Step 4)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px' }}>
        {/* Shots List / Beat Sheet */}
        <div className="clay-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Film size={16} strokeWidth={2} color="var(--teal-primary)" />
              <h4 style={{ fontSize: '0.95rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                Beat Sheet ({shots.length} ช็อต)
              </h4>
            </div>
            <span className="badge badge-sand">9:16 Vertical</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {shots.map((shot, idx) => {
              const isSelected = idx === activeShotIndex;
              return (
                <div
                  key={shot.id}
                  onClick={() => setActiveShotIndex(idx)}
                  style={{
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: isSelected ? 'var(--bg-raised)' : 'transparent',
                    border: isSelected ? '1px solid var(--border-focus)' : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-raised-sm)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      color: isSelected ? 'var(--teal-primary)' : 'var(--text-main)'
                    }}>
                      Shot {shot.number}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      {shot.duration}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.78rem',
                    color: 'var(--text-main)',
                    marginTop: '4px',
                    fontWeight: 600
                  }}>
                    {shot.name.split(':')[0]}
                  </div>
                  <div style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {shot.cameraDirector ? shot.cameraDirector.lens : shot.cameraAngle}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Shot Detail Editor */}
        <div className="clay-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-teal">Shot {selectedShot.number}</span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  {selectedShot.name}
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                Timecode: {selectedShot.timecode} ({selectedShot.duration}) | สถานที่: {selectedShot.location}
              </p>
            </div>
            <span className="badge badge-teal-subtle">FACS Acting Ready</span>
          </div>

          {/* Deep Cinematography & Camera Box */}
          <div style={{
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', marginBottom: '10px' }}>
              <Camera size={18} strokeWidth={2} />
              <strong style={{ fontSize: '0.9rem' }}>การกำกับมุมกล้อง 9:16 (Cinematography Directing)</strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>เลนส์และทางยาวโฟกัส:</span>
                <strong style={{ color: 'var(--text-main)' }}>{selectedShot.cameraDirector?.lens || '85mm Cine Prime'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>การเคลื่อนกล้องแนวตั้ง:</span>
                <strong style={{ color: 'var(--teal-primary)' }}>{selectedShot.cameraDirector?.movement || selectedShot.cameraAngle}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>ระยะชัดลึก (Depth of Field):</span>
                <strong style={{ color: 'var(--text-main)' }}>{selectedShot.cameraDirector?.depthOfField || 'Shallow f/1.4'}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block' }}>องศาเอียง (Tilt / Dutch Angle):</span>
                <strong style={{ color: 'var(--accent-amber)' }}>{selectedShot.cameraDirector?.tiltAngle || 'Dutch Angle'}</strong>
              </div>
            </div>
          </div>

          {/* Deep Actor Directing & Micro-Expressions Box */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-raised-sm)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', marginBottom: '10px' }}>
              <UserCheck size={18} strokeWidth={2} />
              <strong style={{ fontSize: '0.9rem' }}>การกำกับการแสดง & สีหน้า (Method Acting & Micro-Expressions)</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.82rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)' }}>สีหน้าละเอียดและดวงตา (Facial & Eye Cues):</span>
                <p style={{ margin: '4px 0 0 0', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {selectedShot.actorDirecting?.facialMicroExpressions || selectedShot.action}
                </p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>ภาษากายและท่าทาง:</span>{' '}
                  <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{selectedShot.actorDirecting?.bodyLanguage || 'เกร็งกล้ามเนื้อ สู้สายตา'}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>FACS Muscle Code:</span>{' '}
                  <span className="badge badge-sand" style={{ fontSize: '0.7rem' }}>
                    {selectedShot.actorDirecting?.facsCode || 'AU1+AU4+AU20'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Dialogue & Emotion Subtext */}
          <div style={{
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '18px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MessageSquare size={16} strokeWidth={2} color="var(--teal-primary)" />
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>
                  บทพูดและการออกเสียงอารมณ์: {selectedShot.actorDirecting?.character || selectedShot.character || 'ตัวละคร'}
                </strong>
              </div>
              <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                {selectedShot.vocalProsody?.emotionTag || selectedShot.emotionTag || 'Dramatic'}
              </span>
            </div>

            <div style={{
              fontSize: '1rem',
              color: 'var(--text-main)',
              fontWeight: 500,
              lineHeight: 1.6,
              padding: '12px 16px',
              background: 'var(--bg-raised)',
              boxShadow: 'var(--shadow-raised-sm)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '4px solid var(--teal-primary)'
            }}>
              {selectedShot.vocalProsody?.withCues && selectedShot.vocalProsody.withCues.includes('(') && (
                <div style={{ fontSize: '0.8rem', color: 'var(--teal-primary)', fontWeight: 600, fontStyle: 'italic', marginBottom: '4px' }}>
                  คิวน้ำเสียง: {selectedShot.vocalProsody.withCues.split('"')[0].trim()}
                </div>
              )}
              <div style={{ fontWeight: 600 }}>
                &ldquo;{selectedShot.vocalProsody?.dialogue || selectedShot.dialogue}&rdquo;
              </div>
            </div>

            <div style={{
              marginTop: '10px',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              <div>
                <strong style={{ color: 'var(--teal-primary)' }}>Vocal Curve & Micro-Breathing:</strong>{' '}
                {selectedShot.vocalProsody?.vocalCurve || 'เสียงสั่นเครือปลายเสียงสะอื้น'}
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                <span><strong>SFX:</strong> {selectedShot.sfx}</span>
                <span><strong>BGM:</strong> {selectedShot.bgm}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Navigation Footer Banner */}
      <div style={{
        marginTop: '16px',
        padding: '18px 24px',
        background: 'var(--bg-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-raised-sm)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(11, 74, 81, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--teal-primary)'
          }}>
            <Sparkles size={20} strokeWidth={2.2} />
          </div>
          <div>
            <strong style={{ fontSize: '0.94rem', color: 'var(--text-main)', display: 'block' }}>
              บทซีรีส์ 9:16 พร้อมเข้าสู่สายการผลิต ({shots.length} ช็อต)
            </strong>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              ส่งช็อตที่ดึงมาจากนิยายเข้าสู่ห้องแคสติ้งตัวละคร หรือส่งไปสังเคราะห์เสียงพากย์และเจนวิดีโอ 9:16 ได้ทันที
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={() => setSubTab('novel')}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.82rem' }}
          >
            ← กลับไปแก้บทนิยาย
          </button>

          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('/characters');
            }}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.82rem', color: 'var(--teal-primary)', borderColor: 'var(--teal-primary)' }}
          >
            แคสติ้งตัวละคร (Step 2)
          </button>

          <button
            type="button"
            onClick={() => {
              if (onNavigate) onNavigate('/pipeline');
            }}
            className="btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 18px', fontSize: '0.84rem' }}
          >
            <span>ส่งไป Video & Audio Engine (Step 4)</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  )}
    {/* ========================================================
        CONFIRMATION MODAL: SOFT DELETE 7 DAYS (ป๊อปอัปยืนยันการลบ)
       ======================================================== */}
    {showDeleteConfirmModal && seriesPendingDelete && (
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
        padding: '24px'
      }}>
        {/* Backdrop */}
        <div
          onClick={() => {
            setShowDeleteConfirmModal(false);
            setSeriesPendingDelete(null);
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(25, 20, 15, 0.65)',
            backdropFilter: 'blur(4px)'
          }}
        />

        {/* Dialog Card */}
        <div className="clay-card" style={{
          position: 'relative',
          zIndex: 1,
          background: '#FFFFFF',
          maxWidth: '520px',
          width: '100%',
          padding: '26px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)'
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'var(--accent-red-bg)',
                border: '1px solid rgba(185, 56, 72, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Trash2 size={22} color="var(--accent-red)" strokeWidth={2.2} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ยืนยันการย้ายนิยายไปที่ถังขยะ?
                </h3>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  ระบบป้องกันความผิดพลาดด้วยการ Soft Delete สำรองไว้ 7 วัน
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowDeleteConfirmModal(false);
                setSeriesPendingDelete(null);
              }}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: '4px' }}
            >
              <X size={18} strokeWidth={2} />
            </button>
          </div>

          {/* Target Series Preview Card */}
          <div style={{
            display: 'flex',
            gap: '14px',
            padding: '12px',
            background: 'var(--bg-inset)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '16px',
            alignItems: 'center'
          }}>
            <img
              src={seriesPendingDelete.coverUrl}
              alt=""
              style={{ width: '54px', height: '80px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-subtle)', flexShrink: 0 }}
            />
            <div style={{ flex: 1, overflow: 'hidden' }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {seriesPendingDelete.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--teal-primary)', fontWeight: 600, marginTop: '2px' }}>
                {seriesPendingDelete.englishTitle}
              </div>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '6px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>{seriesPendingDelete.episodesCount || 0} ตอน</span>
                <span>&bull;</span>
                <span>{(seriesPendingDelete.characters || []).length} ตัวละคร</span>
              </div>
            </div>
          </div>

          {/* Soft Delete Explanation Box */}
          <div style={{
            background: 'rgba(11, 74, 81, 0.06)',
            border: '1.5px dashed var(--teal-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.82rem', marginBottom: '6px' }}>
              <Clock size={16} strokeWidth={2} />
              <span>นโยบายถังขยะ 7 วัน (7-Day Soft Delete Guarantee)</span>
            </div>
            <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
              การลบนี้เป็น <strong>Soft Delete</strong> โดยเนื้อหาทั้งหมด (ตอน, เล่ม, ตัวละคร, บทร่าง) จะถูกย้ายไปเก็บไว้ใน <strong>ถังขยะ (Trash Bin)</strong> ชั่วคราวเป็นเวลา <strong>7 วัน</strong> คุณสามารถกดกู้คืน (Restore) กลับมาได้ตลอดเวลา หรือปล่อยให้ระบบลบถาวรหลังพ้น 7 วัน
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => {
                setShowDeleteConfirmModal(false);
                setSeriesPendingDelete(null);
              }}
              className="btn-secondary"
              style={{ padding: '8px 18px', fontSize: '0.82rem' }}
            >
              ยกเลิก
            </button>

            <button
              type="button"
              id="btn-confirm-soft-delete"
              onClick={() => {
                const targetTitle = seriesPendingDelete.title;
                onDeleteSeries(seriesPendingDelete.id);
                setShowDeleteConfirmModal(false);
                setSeriesPendingDelete(null);
                setNoticeMessage(`ย้ายนิยาย "${targetTitle}" ไปที่ถังขยะแล้ว (สามารถกู้คืนได้ภายใน 7 วัน)`);
                setTimeout(() => setNoticeMessage(''), 7000);
              }}
              style={{
                background: 'var(--accent-red)',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: 'var(--radius-pill)',
                padding: '8px 20px',
                fontSize: '0.82rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 12px rgba(185, 56, 72, 0.35)'
              }}
            >
              <Trash2 size={14} strokeWidth={2} />
              <span>ย้ายไปถังขยะ (Soft Delete 7 วัน)</span>
            </button>
          </div>
        </div>
      </div>
    )}

    {/* ========================================================
        TRASH BIN MODAL: VIEW & RESTORE SOFT-DELETED STORIES
       ======================================================== */}
    {showTrashModal && (
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
        padding: '24px'
      }}>
        {/* Backdrop */}
        <div
          onClick={() => setShowTrashModal(false)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(25, 20, 15, 0.65)',
            backdropFilter: 'blur(4px)'
          }}
        />

        {/* Dialog Card */}
        <div className="clay-card" style={{
          position: 'relative',
          zIndex: 1,
          background: '#FFFFFF',
          maxWidth: '680px',
          width: '100%',
          padding: '26px',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Modal Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'var(--accent-red-bg)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Trash2 size={20} color="var(--accent-red)" strokeWidth={2.2} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  ถังขยะระบบนิยาย & ซีรีส์ (Trash Bin)
                </h3>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  รายการที่ถูกลบชั่วคราวจะถูกเก็บไว้ 7 วัน ก่อนระบบจะลบถาวร
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowTrashModal(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: '4px' }}
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Trashed Items List or Empty State */}
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '4px', minHeight: '220px' }}>
            {trashList.length === 0 ? (
              <div style={{
                padding: '48px 24px',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--bg-inset)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-muted)'
                }}>
                  <Trash2 size={28} strokeWidth={1.5} />
                </div>
                <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>
                  ไม่มีนิยายในถังขยะ
                </strong>
                <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '340px' }}>
                  นิยายและโครงสร้างทั้งหมดของคุณอยู่ในสถานะปลอดภัย เมื่อคุณลบนิยาย รายการจะมาพักไว้ที่นี่ 7 วันเพื่อป้องกันการลบพลาด
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {trashList.map(item => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '12px 14px',
                      background: 'var(--bg-surface)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.coverUrl}
                      alt=""
                      style={{ width: '50px', height: '74px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border-subtle)', flexShrink: 0 }}
                    />
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title}
                        </strong>
                        <span style={{
                          background: 'var(--accent-red-bg)',
                          color: 'var(--accent-red)',
                          fontSize: '0.66rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          border: '1px solid rgba(185, 56, 72, 0.25)',
                          whiteSpace: 'nowrap',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <Clock size={11} strokeWidth={2.5} />
                          <span>เหลือเวลา {item.daysRemaining || 7} วัน</span>
                        </span>
                      </div>

                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {item.englishTitle} &bull; ย้ายลงถังขยะเมื่อ: {item.deletedDateFormatted || 'เมื่อสักครู่'}
                      </div>

                      <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                        {item.episodesCount} ตอน &bull; {(item.characters || []).length} ตัวละคร &bull; {(item.volumes || []).length} เล่ม
                      </div>
                    </div>

                    {/* Restore & Permanent Delete Actions */}
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                      <button
                        type="button"
                        onClick={() => {
                          if (onRestoreSeries) onRestoreSeries(item.id);
                          setNoticeMessage(`กู้คืนนิยาย "${item.title}" กลับสู่หน้าหลักเรียบร้อยแล้ว`);
                          setTimeout(() => setNoticeMessage(''), 5000);
                        }}
                        className="btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.76rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                        title="กู้คืนนิยายเรื่องนี้กลับสู่คลังโปรเจกต์"
                      >
                        <RotateCcw size={12} strokeWidth={2.2} />
                        <span>กู้คืน</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบ "${item.title}" ถาวร? ข้อมูลทั้งหมดจะไม่สามารถกู้คืนได้อีก`)) {
                            if (onPermanentDeleteSeries) onPermanentDeleteSeries(item.id);
                          }
                        }}
                        style={{
                          background: 'transparent',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--accent-red)',
                          padding: '6px 10px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.74rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="ลบถาวรทันที"
                      >
                        <Trash2 size={12} strokeWidth={2} />
                        <span>ลบถาวร</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid var(--border-subtle)' }}>
            {trashList.length > 0 ? (
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("คุณต้องการล้างถังขยะทั้งหมดหรือไม่? นิยายทั้งหมดในถังขยะจะถูกลบถาวร")) {
                    if (onEmptyTrash) onEmptyTrash();
                  }
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--accent-red)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0
                }}
              >
                <Trash2 size={13} strokeWidth={2} />
                <span>ล้างถังขยะทั้งหมด ({trashList.length})</span>
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={() => setShowTrashModal(false)}
              className="btn-secondary"
              style={{ padding: '6px 18px', fontSize: '0.8rem' }}
            >
              ปิดหน้าต่าง
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
