import React, { useState } from 'react';
import { 
  BookOpen, ArrowLeft, Check, Sparkles, Flame, Zap, ShieldCheck, 
  Layers, Film, Save, Clock, HelpCircle, AlertCircle, RefreshCw,
  Image as ImageIcon, Sliders, Feather, Plus, FileText, ExternalLink
} from 'lucide-react';

export default function SeriesStructurePage({
  series,
  isNew = false,
  onSave,
  onCancel,
  onGoToNovel,
  onAddNewChapter
}) {
  const [formData, setFormData] = useState({
    title: series?.title || '',
    englishTitle: series?.englishTitle || '',
    genre: series?.genre || 'Romantic Revenge / Billionaire Mystery',
    episodesCount: series?.episodesCount || 60,
    coverUrl: series?.coverUrl || '/assets/cover_gilded_shadow.jpg',
    logline: series?.logline || '',
    synopsis: series?.synopsis || '',
    coreConflict: series?.coreConflict || '',
    hookStrategy: series?.hookStrategy || '',
    cliffhangerStrategy: series?.cliffhangerStrategy || '',
    aspectRatio: series?.aspectRatio || '9:16 Vertical UHD (1080x1920)',
    targetFormat: series?.targetFormat || 'TikTok / ReelShort / DramaBox / Kuaishou'
  });

  const [aiSuggestionNotice, setAiSuggestionNotice] = useState('');
  const [isAiPolishing, setIsAiPolishing] = useState(false);

  const chapters = series?.chapters || [
    {
      id: "ch-001",
      number: 1,
      title: "ตอนที่ 1: พันธสัญญาเที่ยงคืน",
      status: "พร้อมแปลงเป็นบท",
      wordCount: 1450
    },
    {
      id: "ch-002",
      number: 2,
      title: "ตอนที่ 2: ในเงามืดของศัตรู",
      status: "กำลังเขียน (Draft)",
      wordCount: 1120
    }
  ];

  const availableCovers = [
    { id: 'c1', url: '/assets/cover_gilded_shadow.jpg', label: 'The Gilded Shadow (ทนายสาว & ทายาท)' },
    { id: 'c2', url: '/assets/cover_ruthless_heir.jpg', label: 'The Ruthless Heir (ทายาทมังกรซ่อนเล็บ)' },
    { id: 'c3', url: '/assets/rin_extreme_acting.jpg', label: 'Emotional Drama (ซีนดราม่าเข้มข้น)' },
    { id: 'c4', url: '/assets/tadao_dutch_acting.jpg', label: 'Billionaire Dutch Tilt (ซีนมุมกล้องช้อนต่ำ)' }
  ];

  const handleAiPolishSynopsis = () => {
    setIsAiPolishing(true);
    setTimeout(() => {
      setIsAiPolishing(false);
      setFormData(prev => ({
        ...prev,
        hookStrategy: prev.hookStrategy || "ภาพเปิดกล้อง 85mm ส่องประกายน้ำตาคลอเบ้า + เสียงจุดชนวนเอกสารสำคัญ ถูกขยี้ใน 3 วินาทีแรก",
        cliffhangerStrategy: prev.cliffhangerStrategy || "เสียงสัญญาณเตือนภัยดับไฟทั้งตึก + ประโยคขู่ชิดริมฝีปาก 'ใครบอกให้คุณมาที่นี่กันแน่!?' ทิ้งท้ายด้วยเสียงตัดฉึบ",
        coreConflict: prev.coreConflict || "ความยุติธรรมและการล้างแค้นตระกูลศัตรู VS สัญชาตญาณความรักที่ไม่อาจต้านทาน"
      }));
      setAiSuggestionNotice("AI ช่วยขัดเกลากลยุทธ์ 3s Hook และ Cliffhanger ให้เหมาะกับซีรีส์แนวตั้ง 9:16 เรียบร้อยแล้ว");
      setTimeout(() => setAiSuggestionNotice(''), 4000);
    }, 900);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) {
      alert('กรุณากรอกชื่อเรื่องภาษาไทย');
      return;
    }
    onSave(formData);
  };

  const handleDirectGoToNovel = () => {
    if (onGoToNovel) {
      onGoToNovel(formData);
    } else {
      handleSubmit();
    }
  };

  const handleAddNewChapterClick = () => {
    if (onAddNewChapter) {
      onAddNewChapter(formData);
    } else if (onGoToNovel) {
      onGoToNovel(formData);
    } else {
      handleSubmit();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
      
      {/* Top Breadcrumb & Main Action Bar */}
      <div className="clay-card" style={{ padding: '16px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onCancel}
              id="btn-structure-back"
              className="btn-secondary"
              style={{ padding: '8px 16px', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, color: 'var(--teal-primary)', borderColor: 'var(--teal-primary)' }}
              title="กลับไปยังคลังโปรเจ็กต์นิยายทั้งหมด"
            >
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>← กลับไปคลังนิยายทั้งหมด (Projects)</span>
            </button>

            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-teal">
                  {isNew ? "สร้างเรื่องใหม่ & ภาพปก" : "โครงสร้างเรื่อง & ภาพปกนิยาย"}
                </span>
                <span className="badge badge-sand">สัดส่วน 9:16 Vertical</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0 0 0', fontWeight: 800 }}>
                {isNew ? (formData.title || "เริ่มสร้างซีรีส์เรื่องใหม่") : formData.title}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleAiPolishSynopsis}
              disabled={isAiPolishing}
              className="btn-secondary"
              style={{ color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.82rem' }}
              title="ให้ AI ช่วยปรับแต่งพล็อตและกลยุทธ์การดึงดูดคนดู"
            >
              <Sparkles size={15} strokeWidth={2} />
              <span>{isAiPolishing ? "AI กำลังวิเคราะห์..." : "✨ AI ช่วยเกลา Hook & พล็อต"}</span>
            </button>

            {/* Direct Novel Editing (Google Docs) Button */}
            <button
              type="button"
              onClick={handleDirectGoToNovel}
              id="btn-goto-novel-gdocs-top"
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: '0.84rem',
                fontWeight: 700,
                color: 'var(--teal-primary)',
                background: 'var(--teal-subtle)',
                borderColor: 'var(--teal-border)'
              }}
              title="เปิดหน้าแต่งนิยายรายตอนในรูปแบบ Google Docs ทันที"
            >
              <Feather size={15} strokeWidth={2.5} />
              <span>✍️ ไปหน้าแก้ไขนิยาย (Google Docs)</span>
            </button>

            {/* Save & Start Writing in Google Docs */}
            <button
              type="button"
              onClick={handleSubmit}
              id="btn-save-and-write-novel"
              className="btn-primary"
              style={{ padding: '8px 22px', fontSize: '0.85rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px', boxShadow: 'var(--shadow-teal-btn)' }}
            >
              <Check size={16} strokeWidth={2.5} />
              <span>{isNew ? "✨ สร้างเรื่องและเริ่มแต่งนิยาย" : "💾 บันทึกและเปิดเขียนนิยาย (Google Docs)"}</span>
            </button>
          </div>
        </div>
      </div>

      {aiSuggestionNotice && (
        <div style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-green-bg)',
          color: 'var(--accent-green)',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid rgba(31, 122, 89, 0.3)'
        }}>
          <ShieldCheck size={18} strokeWidth={2} />
          <span>{aiSuggestionNotice}</span>
        </div>
      )}

      {/* Main 2-Column Full Page Workspace */}
      <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '360px 1fr', gap: '24px', alignItems: 'start' }}>
        
        {/* COLUMN 1: COVER ART & MASTER METRICS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Cover Art Preview & Selector */}
          <div className="clay-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--teal-primary)' }}>
              <ImageIcon size={18} strokeWidth={2} />
              <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>ภาพปกนิยาย & ซีรีส์ (Book Cover Art)</strong>
            </div>

            <div style={{
              width: '100%',
              aspectRatio: '2/3',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-raised)',
              border: '2px solid var(--border-subtle)',
              marginBottom: '14px',
              position: 'relative',
              background: '#000000'
            }}>
              <img
                src={formData.coverUrl}
                alt="Book Cover"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.85), transparent)',
                padding: '16px 12px 8px 12px',
                color: '#FFFFFF'
              }}>
                <div style={{ fontSize: '0.72rem', opacity: 0.85 }}>สัดส่วน 2:3 Official Key Visual</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>{formData.title || 'ชื่อเรื่องนิยาย'}</div>
              </div>
            </div>

            <label style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
              เลือกภาพปกจากคลังภาพงานสร้าง:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
              {availableCovers.map(cov => {
                const isSelected = formData.coverUrl === cov.url;
                return (
                  <div
                    key={cov.id}
                    onClick={() => setFormData({ ...formData, coverUrl: cov.url })}
                    style={{
                      aspectRatio: '2/3',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: isSelected ? '2.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      boxShadow: isSelected ? 'var(--shadow-teal-btn)' : 'none',
                      transition: 'all 0.15s'
                    }}
                    title={cov.label}
                  >
                    <img src={cov.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                );
              })}
            </div>

            <div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>
                หรือระบุ URL ภาพปกเอง:
              </span>
              <input
                type="text"
                value={formData.coverUrl}
                onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                placeholder="https://... หรือ /assets/..."
                className="clay-input"
                style={{ width: '100%', fontSize: '0.78rem' }}
              />
            </div>
          </div>

          {/* Format & Target Platform */}
          <div className="clay-card" style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <strong style={{ fontSize: '0.88rem', color: 'var(--teal-primary)' }}>
              คุณลักษณะงานสร้างซีรีส์แนวตั้ง
            </strong>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                สัดส่วนภาพ (Aspect Ratio)
              </label>
              <input
                type="text"
                value={formData.aspectRatio}
                onChange={(e) => setFormData({ ...formData, aspectRatio: e.target.value })}
                className="clay-input"
                style={{ width: '100%', fontSize: '0.82rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                แพลตฟอร์มเป้าหมาย (Target Distribution)
              </label>
              <input
                type="text"
                value={formData.targetFormat}
                onChange={(e) => setFormData({ ...formData, targetFormat: e.target.value })}
                className="clay-input"
                style={{ width: '100%', fontSize: '0.82rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                จำนวนตอนที่วางแผนไว้ (Episodes Count)
              </label>
              <input
                type="number"
                value={formData.episodesCount}
                onChange={(e) => setFormData({ ...formData, episodesCount: Number(e.target.value) })}
                className="clay-input"
                style={{ width: '100%', fontSize: '0.82rem' }}
              />
            </div>
          </div>
        </div>

        {/* COLUMN 2: STORY LORE & GOOGLE DOCS CHAPTER ENGINE */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Main Story Meta Card */}
          <div className="clay-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
              <BookOpen size={18} strokeWidth={2} />
              <strong style={{ fontSize: '0.98rem', color: 'var(--text-main)' }}>
                ข้อมูลโครงสร้างเนื้อเรื่อง & กลยุทธ์ซีรีส์แนวตั้ง (Master Story & Lore)
              </strong>
            </div>

            {/* Titles */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  ชื่อเรื่องภาษาไทย *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="เช่น เงารัตติกาล (The Gilded Shadow)"
                  className="clay-input"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                  ชื่อเรื่องภาษาอังกฤษ (English Title)
                </label>
                <input
                  type="text"
                  value={formData.englishTitle}
                  onChange={(e) => setFormData({ ...formData, englishTitle: e.target.value })}
                  placeholder="เช่น The Gilded Shadow"
                  className="clay-input"
                  style={{ width: '100%' }}
                />
              </div>
            </div>

            {/* Genre */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                หมวดหมู่ / แนวนิยาย (Genre & Themes)
              </label>
              <input
                type="text"
                value={formData.genre}
                onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                placeholder="เช่น Romantic Revenge / Billionaire Mystery / Corporate Thriller"
                className="clay-input"
                style={{ width: '100%' }}
              />
            </div>

            {/* Logline */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  คำโปรยเรื่อง (Logline) — สรุปใจความใน 1-2 ประโยคสำหรับดึงดูดคนดู
                </label>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{formData.logline.length} ตัวอักษร</span>
              </div>
              <textarea
                rows={2}
                value={formData.logline}
                onChange={(e) => setFormData({ ...formData, logline: e.target.value })}
                placeholder="เช่น เมื่อทนายสาวผู้สูญเสียครอบครัว ต้องปลอมตัวเข้าไปเป็นผู้ช่วยส่วนตัวของทายาทมหาเศรษฐี..."
                className="clay-input"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            {/* Synopsis */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>
                  เรื่องย่อฉบับเต็ม (Full Synopsis & Story Arcs)
                </label>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{formData.synopsis.length} ตัวอักษร</span>
              </div>
              <textarea
                rows={5}
                value={formData.synopsis}
                onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                placeholder="อธิบายจุดเริ่มต้น การเผชิญหน้า ความขัดแย้ง จุดหักมุม และบทสรุปของซีรีส์..."
                className="clay-input"
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            {/* Core Conflict */}
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '4px' }}>
                ความขัดแย้งหลักของตัวละคร (Core Conflict & Emotional Dilemma)
              </label>
              <input
                type="text"
                value={formData.coreConflict}
                onChange={(e) => setFormData({ ...formData, coreConflict: e.target.value })}
                placeholder="เช่น ความยุติธรรมและการล้างแค้น VS พันธสัญญาความรักกับศัตรูทางสายเลือด"
                className="clay-input"
                style={{ width: '100%' }}
              />
            </div>

            {/* 3s Hook Strategy & Cliffhanger Strategy */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: 'var(--bg-inset)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-inset)' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', marginBottom: '6px' }}>
                  <Flame size={15} strokeWidth={2} />
                  <strong style={{ fontSize: '0.82rem' }}>กลยุทธ์ 3-Second Hook (หยุดนิ้วคนดู)</strong>
                </div>
                <textarea
                  rows={3}
                  value={formData.hookStrategy}
                  onChange={(e) => setFormData({ ...formData, hookStrategy: e.target.value })}
                  placeholder="เช่น ภาพเปิดห้องประชุมชั้น 48 ท่ามกลางพายุฝน + แฟ้มคดีไฟลุก..."
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.8rem', background: 'var(--bg-surface)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', marginBottom: '6px' }}>
                  <Zap size={15} strokeWidth={2} />
                  <strong style={{ fontSize: '0.82rem' }}>กลยุทธ์ Cliffhanger ท้ายตอน (เร่งยอดดูต่อ)</strong>
                </div>
                <textarea
                  rows={3}
                  value={formData.cliffhangerStrategy}
                  onChange={(e) => setFormData({ ...formData, cliffhangerStrategy: e.target.value })}
                  placeholder="เช่น สัญญาณเตือนภัยดับอาคาร + เสียงกระซิบชิดหู..."
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.8rem', background: 'var(--bg-surface)' }}
                />
              </div>
            </div>

          </div>

          {/* ========================================================
              DEDICATED SECTION: NOVEL CHAPTERS & GOOGLE DOCS WORKSPACE
             ======================================================== */}
          <div className="clay-card" style={{ padding: '22px', border: '1.5px solid var(--teal-primary)', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  background: 'var(--teal-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF'
                }}>
                  <Feather size={17} strokeWidth={2.5} />
                </div>
                <div>
                  <strong style={{ fontSize: '0.96rem', color: 'var(--text-main)', display: 'block' }}>
                    บทนิยาย & ตอนในเรื่องนี้ ({chapters.length} ตอน)
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    เปิดเขียนหรือแก้ไขต้นฉบับในหน้าบรรณาธิกรณ์สไตล์ Google Docs ได้ทันที
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleAddNewChapterClick}
                  id="btn-add-chapter-gdocs"
                  className="btn-primary"
                  style={{ fontSize: '0.8rem', padding: '6px 14px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  title="สร้างตอนใหม่และเปิดหน้า Google Docs เพื่อพิมพ์ต่อทันที"
                >
                  <Plus size={14} strokeWidth={2.5} />
                  <span>+ เพิ่มตอนใหม่ใน Google Docs</span>
                </button>
              </div>
            </div>

            {/* Chapters List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
              {chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--bg-inset)',
                    border: '1px solid var(--border-subtle)',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      background: 'var(--teal-subtle)',
                      color: 'var(--teal-primary)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      {idx + 1}
                    </span>
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)' }}>{ch.title}</strong>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        <span>{ch.wordCount ? ch.wordCount.toLocaleString() : 0} คำ</span>
                        <span style={{ margin: '0 6px' }}>&bull;</span>
                        <span style={{ color: 'var(--teal-primary)', fontWeight: 600 }}>{ch.status || 'ร่างเนื้อหา'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleDirectGoToNovel}
                    className="btn-secondary"
                    style={{ fontSize: '0.76rem', padding: '5px 12px', display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', borderColor: 'var(--teal-primary)' }}
                    title="เปิดแก้ไขบทนี้ในหน้า Google Docs"
                  >
                    <Feather size={12} strokeWidth={2} />
                    <span>✍️ แก้ไขใน Google Docs</span>
                  </button>
                </div>
              ))}
            </div>

            {/* Bottom Actions Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', flexWrap: 'wrap', gap: '10px' }}>
              <button
                type="button"
                onClick={onCancel}
                className="btn-secondary"
                style={{ fontSize: '0.84rem' }}
              >
                ← ยกเลิก / กลับไปคลังนิยาย
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={handleDirectGoToNovel}
                  className="btn-secondary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '9px 18px',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--teal-primary)',
                    borderColor: 'var(--teal-primary)'
                  }}
                >
                  <Feather size={15} strokeWidth={2} />
                  <span>เข้าสู่หน้าเขียนนิยาย (Google Docs)</span>
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '9px 24px', fontSize: '0.88rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px', boxShadow: 'var(--shadow-teal-btn)' }}
                >
                  <Check size={16} strokeWidth={2.5} />
                  <span>{isNew ? "✨ สร้างเรื่องและเริ่มแต่งนิยาย" : "💾 บันทึกโครงสร้างและเปิด Google Docs"}</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </form>
    </div>
  );
}
