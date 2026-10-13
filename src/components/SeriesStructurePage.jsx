import React, { useState } from 'react';
import { 
  BookOpen, ArrowLeft, Check, Sparkles, Flame, Zap, ShieldCheck, 
  Layers, Film, Save, Clock, HelpCircle, AlertCircle, RefreshCw,
  Image as ImageIcon, Sliders
} from 'lucide-react';

export default function SeriesStructurePage({
  series,
  isNew = false,
  onSave,
  onCancel
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
    e.preventDefault();
    if (!formData.title.trim()) return;
    onSave(formData);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '16px 0' }}>
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="clay-card" style={{ padding: '18px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={onCancel}
              className="btn-secondary"
              style={{ padding: '8px 14px', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={16} strokeWidth={2} />
              <span>กลับสู่สตูดิโอ</span>
            </button>

            <div style={{ borderLeft: '1px solid var(--border-subtle)', paddingLeft: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-teal">
                  {isNew ? "สร้างซีรีส์เรื่องใหม่ (New Series)" : "หน้าตั้งค่าโครงสร้างซีรีส์ (Series Lore Settings)"}
                </span>
                <span className="badge badge-sand">สัดส่วน 9:16 Vertical</span>
              </div>
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0 0 0', fontWeight: 800 }}>
                {isNew ? (formData.title || "ตั้งค่าซีรีส์เรื่องใหม่") : formData.title}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              type="button"
              onClick={handleAiPolishSynopsis}
              disabled={isAiPolishing}
              className="btn-secondary"
              style={{ color: 'var(--teal-primary)', fontWeight: 700 }}
              title="ให้ AI ช่วยปรับแต่งพล็อตและกลยุทธ์การดึงดูดคนดู"
            >
              <Sparkles size={15} strokeWidth={2} />
              <span>{isAiPolishing ? "AI กำลังวิเคราะห์..." : "AI ช่วยเกลา Hook & พล็อต"}</span>
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="btn-primary"
              style={{ padding: '8px 22px' }}
            >
              <Check size={16} strokeWidth={2} />
              <span>{isNew ? "สร้างซีรีส์และเริ่มแต่งนิยาย" : "บันทึกการแก้ไขโครงสร้าง"}</span>
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
              position: 'relative'
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
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
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
                onChange={(e) => setFormData({ ...formData, episodesCount: parseInt(e.target.value) || 60 })}
                className="clay-input"
                style={{ width: '100%', fontSize: '0.82rem' }}
              />
            </div>
          </div>

        </div>

        {/* COLUMN 2: STORY LORE & SCRIPTING STRATEGY */}
        <div className="clay-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '14px' }}>
            <BookOpen size={20} strokeWidth={2} color="var(--teal-primary)" />
            <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 800 }}>
              ข้อมูลโครงสร้างเนื้อเรื่อง & กลยุทธ์ซีรีส์แนวตั้ง (Master Story & Lore)
            </h3>
          </div>

          {/* Titles */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
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
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ชื่อเรื่องภาษาอังกฤษ (English Title)
              </label>
              <input
                type="text"
                value={formData.englishTitle}
                onChange={(e) => setFormData({ ...formData, englishTitle: e.target.value })}
                placeholder="e.g. The Gilded Shadow"
                className="clay-input"
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Genre */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                คำโปรยเรื่อง (Logline) — สรุปใจความใน 1-2 ประโยคสำหรับดึงดูดคนดู
              </label>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                {(formData.logline || '').length} ตัวอักษร
              </span>
            </div>
            <textarea
              rows={3}
              value={formData.logline}
              onChange={(e) => setFormData({ ...formData, logline: e.target.value })}
              placeholder="เมื่อทนายสาวผู้สูญเสียครอบครัว ต้องปลอมตัวเข้าไปเป็นผู้ช่วยส่วนตัวของทายาทมหาเศรษฐี..."
              className="clay-input"
              style={{ width: '100%', lineHeight: 1.6, resize: 'vertical' }}
            />
          </div>

          {/* Full Synopsis */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                เรื่องย่อฉบับเต็ม (Full Synopsis & Story Arcs)
              </label>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                {(formData.synopsis || '').length} ตัวอักษร
              </span>
            </div>
            <textarea
              rows={5}
              value={formData.synopsis}
              onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
              placeholder="บรรยายโครงเรื่องตั้งแต่จุดเริ่มต้น ความขัดแย้ง และจุดหักมุมหลักของซีรีส์..."
              className="clay-input"
              style={{ width: '100%', lineHeight: 1.6, resize: 'vertical' }}
            />
          </div>

          {/* Core Conflict */}
          <div>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
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
                placeholder="เช่น ภาพเปิดห้องประชุมชั้น 48 ท่ามกลางพายุฝน + แฟ้มคดีไฟลุก + แววตาคลอเบ้าน้ำตา..."
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
                placeholder="เช่น สัญญาณเตือนภัยดับอาคาร + เสียงกระซิบชิดหู 'มีคนปิดระบบอาคาร... ใครบอกให้คุณมาที่นี่กันแน่!?'"
                className="clay-input"
                style={{ width: '100%', fontSize: '0.8rem', background: 'var(--bg-surface)' }}
              />
            </div>
          </div>

          {/* Bottom Submit Actions */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ padding: '10px 24px' }}
            >
              <Check size={16} strokeWidth={2} />
              <span>{isNew ? "สร้างซีรีส์และเริ่มแต่งนิยาย" : "บันทึกการแก้ไขโครงสร้าง"}</span>
            </button>
          </div>

        </div>

      </form>
    </div>
  );
}
