import React, { useState } from 'react';
import { Sparkles, Zap, Flame, Video, MessageSquare, Volume2, Eye, Camera, UserCheck, Activity, BookOpen, Music, ShieldCheck, Film, Award, Plus, Edit3, Trash2, Check, ArrowRight, Image as ImageIcon, Feather, Layers, List, Play } from 'lucide-react';
import NovelStudioEditor from './NovelStudioEditor';

export default function WritersRoomTab({
  seriesList,
  activeSeries,
  onSelectSeries,
  onAddSeries,
  onUpdateSeries,
  onDeleteSeries
}) {
  const [subTab, setSubTab] = useState('novel'); // 'novel' | 'shelf' | 'screenplay'
  const [activeShotIndex, setActiveShotIndex] = useState(0);
  const [isAiOptimizing, setIsAiOptimizing] = useState(false);
  const [optimizationSuccess, setOptimizationSuccess] = useState('');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Form state for New Series
  const [newSeriesForm, setNewSeriesForm] = useState({
    title: '',
    englishTitle: '',
    genre: 'Romantic Revenge / Billionaire Mystery',
    episodesCount: 60,
    coverUrl: '/assets/cover_gilded_shadow.jpg',
    logline: '',
    synopsis: '',
    coreConflict: '',
    hookStrategy: '',
    cliffhangerStrategy: ''
  });

  // Form state for Editing Active Series
  const [editSeriesForm, setEditSeriesForm] = useState({ ...activeSeries });

  const shots = activeSeries.shots || [];
  const selectedShot = shots[activeShotIndex] || shots[0] || {};

  const handleOpenEdit = () => {
    setEditSeriesForm({ ...activeSeries });
    setShowEditModal(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    onUpdateSeries(editSeriesForm);
    setShowEditModal(false);
    setOptimizationSuccess('บันทึกการแก้ไขโครงสร้างนิยายเรียบร้อย');
    setTimeout(() => setOptimizationSuccess(''), 3000);
  };

  const handleSaveNew = (e) => {
    e.preventDefault();
    if (!newSeriesForm.title.trim()) return;

    const newId = `series-${Date.now()}`;
    const createdSeries = {
      ...newSeriesForm,
      id: newId,
      currentEpisode: 1,
      episodeTitle: 'EP 01: จุดเริ่มต้น (The Beginning)',
      productionStatus: 'Writers Room Drafting',
      aspectRatio: '9:16 Vertical UHD (1080x1920)',
      targetFormat: 'TikTok / ReelShort / DramaBox',
      pacingScore: {
        hookScore: 95,
        cliffhangerScore: 92,
        tensionIndex: 90,
        retentionProbability: '97.5% (High)'
      },
      characters: [
        {
          id: `char-${Date.now()}`,
          name: 'ตัวละครเอก (Main Lead)',
          role: 'ตัวเอกหลัก (Protagonist)',
          actorSeed: 77100000 + Math.floor(Math.random() * 99999),
          loraModel: 'Default_Lead_V1.safetensors',
          loraWeight: 0.88,
          faceLockAccuracy: '98.5%',
          portrait: newSeriesForm.coverUrl || '/assets/rin_portrait.jpg',
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
      shots: [
        {
          id: `shot-${Date.now()}-1`,
          number: '01',
          name: 'The 3-Second Hook Scene',
          timecode: '00:00 - 00:04',
          duration: '4.0s',
          cameraDirector: {
            lens: '85mm Cine Prime f/1.4',
            movement: 'Vertical Slow Push-In',
            framing: 'Extreme Close-Up 9:16',
            depthOfField: 'Ultra Shallow f/1.4',
            tiltAngle: 'Eye-level'
          },
          actorDirecting: {
            character: 'ตัวละครเอก',
            facialMicroExpressions: 'ดวงตามุ่งมั่นสบตากล้องโดยตรง ริมฝีปากเม้มแน่น',
            bodyLanguage: 'ยืนสง่างาม ไม่หวั่นไหว',
            facsCode: 'AU1+AU4 Synced'
          },
          vocalProsody: {
            dialogue: 'ความจริงมีเพียงหนึ่งเดียว และฉันจะเปิดเผยมันในคืนนี้!',
            withCues: '[เสียงสูดลมหายใจมุ่งมั่น] ความจริงมีเพียงหนึ่งเดียว และฉันจะเปิดเผยมันในคืนนี้!',
            emotionTag: 'Fierce Determination 9/10',
            vocalCurve: 'เสียงคมชัดทรงพลัง'
          },
          location: 'ฉากเปิดเรื่องหลัก',
          lighting: 'Cinematic High Contrast',
          sfx: 'Dramatic whoosh and heavy heartbeat',
          bgm: 'Rising orchestral tension',
          qaStatus: 'PASS',
          aiHookScore: 95,
          mediaUrl: newSeriesForm.coverUrl || '/assets/vertical_shot_boardroom.jpg'
        }
      ],
      sponsorProduct: {
        id: `sp-${Date.now()}`,
        brand: 'PREMIUM BRAND',
        productName: 'Signature Luxury Product',
        tagline: 'คุณภาพระดับพรีเมียม',
        heroImage: '/assets/sponsor_serum.jpg',
        category: 'Luxury Goods',
        contractTier: 'Tier-1 Sponsor',
        placementsPerEpisode: 1,
        targetScreenTimeSec: 4.5,
        actualScreenTimeSec: 4.5,
        estimatedAudienceViews: '2,000,000+ views',
        safeZoneVerified: true,
        sponsorStatus: 'Planning',
        sponsorRevenueTHB: 350000,
        placementNotes: 'วางในฉากสำคัญ'
      },
      qaReport: {
        overallScore: 96.5,
        status: 'Drafting',
        checks: [
          {
            id: 'chk-new-1',
            category: 'Story & Hook Structure',
            score: 96.0,
            status: 'PASS',
            details: 'โครงสร้างเรื่องมี Hook และจุด Climax ชัดเจน'
          }
        ],
        directorReview: {
          isApproved: false,
          approvedBy: 'ผู้กำกับ',
          directorNote: 'พล็อตน่าสนใจ ดำเนินการต่อได้',
          revisionHistory: []
        }
      }
    };

    onAddSeries(createdSeries);
    setShowAddModal(false);
    setNewSeriesForm({
      title: '',
      englishTitle: '',
      genre: 'Romantic Revenge / Billionaire Mystery',
      episodesCount: 60,
      coverUrl: '/assets/cover_gilded_shadow.jpg',
      logline: '',
      synopsis: '',
      coreConflict: '',
      hookStrategy: '',
      cliffhangerStrategy: ''
    });
    setOptimizationSuccess(`สร้างซีรีส์เรื่องใหม่ "${createdSeries.title}" สำเร็จ!`);
    setTimeout(() => setOptimizationSuccess(''), 3000);
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
      
      {/* 0. WRITERS ROOM SUB-NAV BAR (สลับระหว่าง หน้าแต่งนิยาย, คลังภาพปก & โครงสร้างหลัก, และบทซีรีส์ 9:16) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div style={{
          display: 'inline-flex',
          background: 'var(--bg-inset)',
          padding: '6px',
          borderRadius: 'var(--radius-pill)',
          border: '1px solid var(--border-subtle)',
          boxShadow: 'var(--shadow-inset)',
          gap: '6px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setSubTab('novel')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              background: subTab === 'novel' ? 'var(--teal-primary)' : 'transparent',
              color: subTab === 'novel' ? '#FFFFFF' : 'var(--text-main)',
              border: 'none',
              fontWeight: subTab === 'novel' ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: subTab === 'novel' ? 'var(--shadow-teal-btn)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Feather size={16} strokeWidth={2} />
            <span>1. หน้าแต่งนิยาย & AI ช่วยเขียน (Novel Studio)</span>
          </button>

          <button
            onClick={() => setSubTab('shelf')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              background: subTab === 'shelf' ? 'var(--teal-primary)' : 'transparent',
              color: subTab === 'shelf' ? '#FFFFFF' : 'var(--text-main)',
              border: 'none',
              fontWeight: subTab === 'shelf' ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: subTab === 'shelf' ? 'var(--shadow-teal-btn)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <BookOpen size={16} strokeWidth={2} />
            <span>2. คลังภาพปก & โครงสร้างหลัก (Series Shelf & Lore)</span>
          </button>

          <button
            onClick={() => setSubTab('screenplay')}
            style={{
              padding: '8px 18px',
              borderRadius: 'var(--radius-pill)',
              background: subTab === 'screenplay' ? 'var(--teal-primary)' : 'transparent',
              color: subTab === 'screenplay' ? '#FFFFFF' : 'var(--text-main)',
              border: 'none',
              fontWeight: subTab === 'screenplay' ? 700 : 500,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: subTab === 'screenplay' ? 'var(--shadow-teal-btn)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Film size={16} strokeWidth={2} />
            <span>3. บทซีรีส์ 9:16 (Vertical Screenplay)</span>
          </button>
        </div>

        {/* Active Series Indicator Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>เรื่องที่ทำงานอยู่:</span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--bg-surface)',
            padding: '4px 12px 4px 6px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-raised-sm)'
          }}>
            <img
              src={activeSeries.coverUrl}
              alt=""
              style={{ width: '22px', height: '30px', objectFit: 'cover', borderRadius: '4px' }}
            />
            <strong style={{ fontSize: '0.82rem', color: 'var(--teal-primary)' }}>
              {activeSeries.title}
            </strong>
          </div>
        </div>
      </div>

      {/* SUB-VIEW 1: NOVEL STUDIO & AI CO-WRITER */}
      {subTab === 'novel' && (
        <NovelStudioEditor
          series={activeSeries}
          onUpdateSeries={onUpdateSeries}
          onConvertToScreenplay={(chapter) => {
            setSubTab('screenplay');
          }}
        />
      )}

      {/* SUB-VIEW 2: SERIES SHELF & MASTER LORE */}
      {subTab === 'shelf' && (
        <>
          {/* 1. TOP SECTION: SERIES LIBRARY & BOOK COVERS SHELF (เพิ่ม / แก้ไข / ลบ เรื่อง) */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <BookOpen size={20} strokeWidth={2} color="var(--teal-primary)" />
                  <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    คลังซีรีส์ & ภาพปกนิยาย (Series Library & Book Covers)
                  </h2>
                </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              สตูดิโอรองรับการสร้างหลายเรื่องและหลายตัวละคร สามารถสลับเรื่องทำงาน เพิ่มเรื่องใหม่ หรือแก้ไขโครงสร้างนิยายได้อิสระ
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-primary"
            >
              <Plus size={16} strokeWidth={2} />
              <span>สร้างซีรีส์เรื่องใหม่</span>
            </button>
          </div>
        </div>

        {/* Series Covers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
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
                <div style={{ position: 'relative', height: '240px', background: '#000', overflow: 'hidden' }}>
                  <img
                    src={item.coverUrl}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
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
                        onClick={() => { onSelectSeries(item.id); setSubTab('novel'); }}
                        className="btn-primary"
                        style={{ padding: '5px 12px', fontSize: '0.72rem' }}
                        title="เปิดหน้าแต่งนิยายรายตอนสำหรับเรื่องนี้"
                      >
                        <Feather size={12} strokeWidth={2} />
                        <span>แต่งนิยาย</span>
                      </button>

                      <button
                        onClick={() => { onSelectSeries(item.id); setSubTab('screenplay'); }}
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
                        onClick={() => { onSelectSeries(item.id); handleOpenEdit(); }}
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
                          onClick={() => {
                            if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบซีรีส์ "${item.title}"?`)) {
                              onDeleteSeries(item.id);
                            }
                          }}
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
                          title="ลบซีรีส์นี้"
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
            <button onClick={handleOpenEdit} className="btn-secondary">
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

  {/* SUB-VIEW 3: VERTICAL SCREENPLAY BREAKDOWN (9:16 BEATS) */}
  {subTab === 'screenplay' && (
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
                  บทพูดและการออกเสียงอารมณ์: {selectedShot.character}
                </strong>
              </div>
              <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                {selectedShot.vocalProsody?.emotionTag || selectedShot.emotionTag}
              </span>
            </div>

            <p style={{
              fontSize: '1rem',
              color: 'var(--text-main)',
              fontWeight: 500,
              lineHeight: 1.5,
              padding: '10px 14px',
              background: 'var(--bg-raised)',
              boxShadow: 'var(--shadow-raised-sm)',
              borderRadius: 'var(--radius-sm)',
              borderLeft: '4px solid var(--teal-primary)'
            }}>
              "{selectedShot.vocalProsody?.withCues || selectedShot.dialogue}"
            </p>

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
    )}

      {/* 4. MODAL: สร้างซีรีส์เรื่องใหม่ (CREATE NEW SERIES) */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(29, 36, 37, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="clay-card" style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            background: 'var(--bg-surface)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={20} strokeWidth={2} color="var(--teal-primary)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  สร้างซีรีส์เรื่องใหม่ (New Series & Book Structure)
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-dim)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveNew} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ชื่อเรื่องภาษาไทย *
                  </label>
                  <input
                    type="text"
                    required
                    value={newSeriesForm.title}
                    onChange={(e) => setNewSeriesForm({ ...newSeriesForm, title: e.target.value })}
                    placeholder="เช่น กับดักรักประธานมาเฟีย"
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ชื่อเรื่องภาษาอังกฤษ
                  </label>
                  <input
                    type="text"
                    value={newSeriesForm.englishTitle}
                    onChange={(e) => setNewSeriesForm({ ...newSeriesForm, englishTitle: e.target.value })}
                    placeholder="e.g. Underworld Vow"
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    หมวดหมู่ / แนวนิยาย (Genre)
                  </label>
                  <input
                    type="text"
                    value={newSeriesForm.genre}
                    onChange={(e) => setNewSeriesForm({ ...newSeriesForm, genre: e.target.value })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    จำนวนตอนที่วางแผนไว้ (ตอน)
                  </label>
                  <input
                    type="number"
                    value={newSeriesForm.episodesCount}
                    onChange={(e) => setNewSeriesForm({ ...newSeriesForm, episodesCount: parseInt(e.target.value) || 60 })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              {/* Cover Selection */}
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  เลือกภาพปกนิยาย (Book Cover Art)
                </label>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {[
                    { id: 'c1', url: '/assets/cover_gilded_shadow.jpg', label: 'The Gilded Shadow' },
                    { id: 'c2', url: '/assets/cover_ruthless_heir.jpg', label: 'The Ruthless Heir' },
                    { id: 'c3', url: '/assets/rin_extreme_acting.jpg', label: 'Emotional Drama' }
                  ].map(c => (
                    <div
                      key={c.id}
                      onClick={() => setNewSeriesForm({ ...newSeriesForm, coverUrl: c.url })}
                      style={{
                        cursor: 'pointer',
                        borderRadius: 'var(--radius-sm)',
                        overflow: 'hidden',
                        border: newSeriesForm.coverUrl === c.url ? '3px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        boxShadow: newSeriesForm.coverUrl === c.url ? 'var(--shadow-teal-btn)' : 'none',
                        textAlign: 'center'
                      }}
                    >
                      <img src={c.url} alt={c.label} style={{ width: '80px', height: '110px', objectFit: 'cover', display: 'block' }} />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Logline (ประโยคแกนเรื่อง 1 ประโยค)
                </label>
                <input
                  type="text"
                  value={newSeriesForm.logline}
                  onChange={(e) => setNewSeriesForm({ ...newSeriesForm, logline: e.target.value })}
                  placeholder="เช่น เมื่อทายาทตระกูลลึกลับกลับมาเปิดโปงความแค้น..."
                  className="clay-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  โครงเรื่องเต็ม (Full Synopsis)
                </label>
                <textarea
                  rows={3}
                  value={newSeriesForm.synopsis}
                  onChange={(e) => setNewSeriesForm({ ...newSeriesForm, synopsis: e.target.value })}
                  placeholder="เนื้อเรื่องหลัก, ปมขัดแย้ง และจุดเปลี่ยนของเรื่อง..."
                  className="clay-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="btn-secondary"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  <Plus size={16} strokeWidth={2} />
                  <span>สร้างซีรีส์</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 5. MODAL: แก้ไขโครงสร้างซีรีส์ (EDIT SERIES STRUCTURE) */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(29, 36, 37, 0.65)',
          backdropFilter: 'blur(6px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="clay-card" style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            background: 'var(--bg-surface)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Edit3 size={20} strokeWidth={2} color="var(--teal-primary)" />
                <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  แก้ไขโครงสร้างซีรีส์: {activeSeries.title}
                </h3>
              </div>
              <button
                onClick={() => setShowEditModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: 'var(--text-dim)' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEdit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ชื่อเรื่องภาษาไทย
                  </label>
                  <input
                    type="text"
                    value={editSeriesForm.title}
                    onChange={(e) => setEditSeriesForm({ ...editSeriesForm, title: e.target.value })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    ชื่อเรื่องภาษาอังกฤษ
                  </label>
                  <input
                    type="text"
                    value={editSeriesForm.englishTitle}
                    onChange={(e) => setEditSeriesForm({ ...editSeriesForm, englishTitle: e.target.value })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    หมวดหมู่ / แนวนิยาย
                  </label>
                  <input
                    type="text"
                    value={editSeriesForm.genre}
                    onChange={(e) => setEditSeriesForm({ ...editSeriesForm, genre: e.target.value })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    จำนวนตอนทั้งหมด
                  </label>
                  <input
                    type="number"
                    value={editSeriesForm.episodesCount}
                    onChange={(e) => setEditSeriesForm({ ...editSeriesForm, episodesCount: parseInt(e.target.value) || 60 })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  Logline
                </label>
                <textarea
                  rows={2}
                  value={editSeriesForm.logline}
                  onChange={(e) => setEditSeriesForm({ ...editSeriesForm, logline: e.target.value })}
                  className="clay-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  เรื่องย่อฉบับเต็ม (Synopsis)
                </label>
                <textarea
                  rows={4}
                  value={editSeriesForm.synopsis}
                  onChange={(e) => setEditSeriesForm({ ...editSeriesForm, synopsis: e.target.value })}
                  className="clay-input"
                  style={{ width: '100%', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    กลยุทธ์ 3-Second Hook
                  </label>
                  <input
                    type="text"
                    value={editSeriesForm.hookStrategy || ''}
                    onChange={(e) => setEditSeriesForm({ ...editSeriesForm, hookStrategy: e.target.value })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                    กลยุทธ์ Cliffhanger ท้ายตอน
                  </label>
                  <input
                    type="text"
                    value={editSeriesForm.cliffhangerStrategy || ''}
                    onChange={(e) => setEditSeriesForm({ ...editSeriesForm, cliffhangerStrategy: e.target.value })}
                    className="clay-input"
                    style={{ width: '100%' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="btn-secondary"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                >
                  <Check size={16} strokeWidth={2} />
                  <span>บันทึกการแก้ไข</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
