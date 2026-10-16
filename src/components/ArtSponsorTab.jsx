import React, { useState, useRef, useEffect } from 'react';
import { 
  DollarSign, ShieldCheck, Eye, Sparkles, Box, CheckCircle2, AlertCircle, 
  Smartphone, Award, Heart, MessageCircle, Share2, Plus, Edit3, Trash2, 
  Upload, Image as ImageIcon, Copy, Check, X, Tag, FileText, Layers, 
  ExternalLink, ArrowRight, RefreshCw, Camera, Sliders, Hand, Maximize2, 
  TrendingUp, Sun
} from 'lucide-react';
import SponsorEditorPage, { PRODUCT_ANGLES, ANCHOR_POSITIONS } from './SponsorEditorPage';

export default function ArtSponsorTab({ 
  sponsorProduct, 
  sponsorProducts: initialSponsorProducts = [], 
  series = {}, 
  onUpdateSeries,
  currentPath = '/art',
  searchParams,
  onNavigate
}) {
  // Ensure we have a default sponsor product
  const defaultProduct = sponsorProduct || {
    id: 'sp-01',
    brand: 'LUMIÈRE Laboratories',
    productName: "LUMIÈRE Elixir D'or (Revitalizing Serum)",
    tagline: 'กุญแจสู่ผิวอ่อนเยาว์เหนือกาลเวลา พลังทองคำบริสุทธิ์',
    heroImage: '/assets/sponsor_serum.jpg',
    sceneImage: '/assets/sponsor_serum.jpg',
    category: 'Luxury Skincare / Cosmetics (สกินแคร์ & เครื่องสำอางหรู)',
    contractTier: 'Tier-1 Exclusive Drama Sponsor (สปอนเซอร์หลักตอนเดียว)',
    placementsPerEpisode: 1,
    targetScreenTimeSec: 4.5,
    actualScreenTimeSec: 4.8,
    estimatedAudienceViews: '2,500,000+ views (Shorts/TikTok Reach)',
    safeZoneVerified: true,
    sponsorStatus: 'Contract Signed & Scene Validated',
    sponsorRevenueTHB: 450000,
    placementNotes: 'วางในฉากโต๊ะทำงานของผู้บริหารและกระเป๋าถือของนางเอก สื่อถึงความหรูหรา น่าเชื่อถือ',
    targetShot: 'Shot 03 (The Sponsor Showcase)',
    anchorPosition: 'center',
    angles: {
      front_eye_level: '/assets/sponsor_serum.jpg',
      three_quarter_hero: '',
      side_profile_90: '',
      macro_detail_close: '',
      handheld_actor_grip: '',
      top_down_flatlay: '',
      low_angle_heroic: '',
      back_reverse_rim: ''
    }
  };

  const [products, setProducts] = useState(() => {
    if (initialSponsorProducts && initialSponsorProducts.length > 0) {
      return initialSponsorProducts;
    }
    return [defaultProduct];
  });

  const [activeProductId, setActiveProductId] = useState(() => {
    if (initialSponsorProducts && initialSponsorProducts.length > 0) {
      return initialSponsorProducts[0].id;
    }
    return defaultProduct.id;
  });

  // Sync state if series changes
  useEffect(() => {
    if (initialSponsorProducts && initialSponsorProducts.length > 0) {
      setProducts(initialSponsorProducts);
      if (!initialSponsorProducts.some(p => p.id === activeProductId)) {
        setActiveProductId(initialSponsorProducts[0].id);
      }
    } else if (sponsorProduct) {
      setProducts([sponsorProduct]);
      setActiveProductId(sponsorProduct.id);
    }
  }, [series?.id]);

  // Full-page edit and create mode controls
  const [internalView, setInternalView] = useState(null); // 'edit' | 'create' | null
  const isRouteEdit = currentPath === '/sponsor-edit' || currentPath === '/art-edit';
  const isRouteCreate = currentPath === '/sponsor-new' || currentPath === '/art-new';
  const isEditMode = internalView === 'edit' || isRouteEdit;
  const isCreateMode = internalView === 'create' || isRouteCreate;

  const [showSafeZoneOverlay, setShowSafeZoneOverlay] = useState(true);
  const [selectedAnchor, setSelectedAnchor] = useState('center');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState('');

  const quickHeroInputRef = useRef(null);

  const activeProduct = products.find(p => p.id === activeProductId) || products[0] || defaultProduct;

  // Calculate total revenue across all sponsors
  const totalRevenue = products.reduce((acc, curr) => acc + (Number(curr.sponsorRevenueTHB) || 0), 0);

  // Helper to persist products back to series & localStorage
  const persistProducts = (updatedList, newActiveId) => {
    setProducts(updatedList);
    if (newActiveId) setActiveProductId(newActiveId);

    const primaryProduct = updatedList.find(p => p.id === (newActiveId || activeProductId)) || updatedList[0];

    if (onUpdateSeries && series?.id) {
      onUpdateSeries({
        ...series,
        sponsorProduct: primaryProduct,
        sponsorProducts: updatedList
      });
    }

    setSaveSuccessMsg('บันทึกข้อมูลสปอนเซอร์และคลังมุมมองภาพลงระบบเรียบร้อยแล้ว');
    setTimeout(() => setSaveSuccessMsg(''), 3500);
  };

  // Direct quick upload for Hero image on overview
  const handleQuickHeroUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64Data = ev.target.result;
      const updated = products.map(p => {
        if (p.id === activeProduct.id) {
          const nextAngles = { ...(p.angles || {}), front_eye_level: base64Data };
          return { ...p, heroImage: base64Data, angles: nextAngles };
        }
        return p;
      });
      persistProducts(updated);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Open Edit Full Page for active product
  const handleOpenEdit = (prod = activeProduct) => {
    if (onNavigate) {
      onNavigate('/sponsor-edit', { id: series?.id, sponsorId: prod.id });
    } else {
      setInternalView('edit');
    }
  };

  // Open Create New Sponsor Full Page
  const handleOpenCreate = () => {
    if (onNavigate) {
      onNavigate('/sponsor-new', { id: series?.id });
    } else {
      setInternalView('create');
    }
  };

  // Return to Overview
  const handleBackToOverview = () => {
    setInternalView(null);
    if (onNavigate) {
      onNavigate('/art', series?.id ? { id: series.id } : {});
    }
  };

  // Delete Sponsor Product
  const handleDeleteProduct = (idToDelete) => {
    if (products.length <= 1) {
      alert('จำเป็นต้องมีสินค้าสปอนเซอร์อย่างน้อย 1 รายการในซีรีส์นี้');
      return;
    }
    const targetProd = products.find(p => p.id === idToDelete);
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบสินค้าสปอนเซอร์ "${targetProd?.productName || 'สินค้านี้'}" ออกจากระบบ?`)) {
      const updatedList = products.filter(p => p.id !== idToDelete);
      const nextActiveId = updatedList[0]?.id;
      persistProducts(updatedList, nextActiveId);
    }
  };

  // FULL PAGE MODE: Create New Sponsor
  if (isCreateMode) {
    return (
      <SponsorEditorPage
        series={series}
        sponsorToEdit={null}
        mode="create"
        onSave={(newSponsor) => {
          const updated = [...products, newSponsor];
          persistProducts(updated, newSponsor.id);
          handleBackToOverview();
        }}
        onCancel={handleBackToOverview}
      />
    );
  }

  // FULL PAGE MODE: Edit Existing Sponsor & 8 Angles
  if (isEditMode) {
    const querySponsorId = searchParams?.get('sponsorId') || activeProductId;
    const targetSponsor = products.find(p => p.id === querySponsorId) || activeProduct;
    return (
      <SponsorEditorPage
        series={series}
        sponsorToEdit={targetSponsor}
        mode="edit"
        onSave={(updatedSponsor) => {
          const updated = products.map(p => p.id === updatedSponsor.id ? updatedSponsor : p);
          persistProducts(updated, updatedSponsor.id);
          handleBackToOverview();
        }}
        onCancel={handleBackToOverview}
        onDelete={(id) => {
          handleDeleteProduct(id);
          handleBackToOverview();
        }}
      />
    );
  }

  // OVERVIEW TAB VIEW:
  // Dynamic AI Video Production Prompt for this Sponsor Placement
  const vppPromptText = `Cinematic vertical 9:16 shot, luxury boardroom executive setting, [VPP PRODUCT HERO: ${activeProduct.brand} - ${activeProduct.productName}], perfectly anchored in safe zone (${activeProduct.anchorPosition || 'Center'}), pristine studio lighting matching Rembrandt 4:1 teal and warm amber reflections on product packaging, ultra shallow depth of field f/1.8, bokeh raindrops on executive glass window, photorealistic material texture, commercial grade presentation --ar 9:16 --v 6.1 --style raw`;

  const currentAnchor = ANCHOR_POSITIONS.find(a => a.id === (activeProduct.anchorPosition || selectedAnchor)) || ANCHOR_POSITIONS[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      
      {/* Header & Global Value Proposition */}
      <div className="clay-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #135E67, #0B4A51)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-teal-btn)'
              }}>
                <Box size={22} color="#FFFFFF" strokeWidth={2.2} />
              </div>
              <div>
                <span className="badge badge-teal" style={{ marginBottom: '4px' }}>3. Art & Sponsor Department</span>
                <h2 style={{ fontSize: '1.45rem', color: 'var(--text-main)', margin: 0, fontFamily: 'var(--font-display)', fontWeight: 700 }}>
                  Virtual Product Placement Hub (ระบบแทรกสินค้าสปอนเซอร์อัจฉริยะ)
                </h2>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                  ระบบ AI แทรกสินค้าสปอนเซอร์เข้ากับบทและฉาก พร้อมสตูดิโอมุมกล้อง 8 มุมมอง และตัวตรวจจับ 9:16 Safe-Zone บนมือถือ
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={handleOpenCreate}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                fontSize: '0.84rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #135E67, #0B4A51)',
                boxShadow: 'var(--shadow-teal-btn)'
              }}
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>เพิ่มสินค้าสปอนเซอร์ใหม่</span>
            </button>

            <div style={{ textAlign: 'right', background: 'var(--bg-inset)', padding: '8px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>รายได้รวมสปอนเซอร์ทั้งหมด:</div>
              <div style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--teal-primary)', fontFamily: 'var(--font-display)' }}>
                ฿{totalRevenue.toLocaleString()} THB
              </div>
            </div>
          </div>
        </div>

        {/* Multi-Sponsor Switcher Bar */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)', overflowX: 'auto', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', whiteSpace: 'nowrap', textTransform: 'uppercase' }}>
            สปอนเซอร์ในโปรเจกต์ ({products.length}):
          </span>

          {products.map((prod) => {
            const isSelected = prod.id === activeProductId;
            return (
              <button
                key={prod.id}
                onClick={() => setActiveProductId(prod.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-pill)',
                  background: isSelected ? 'var(--bg-raised)' : 'transparent',
                  border: isSelected ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                  boxShadow: isSelected ? 'var(--shadow-raised-sm)' : 'none',
                  color: isSelected ? 'var(--teal-primary)' : 'var(--text-main)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.15s ease'
                }}
              >
                <Award size={14} color={isSelected ? 'var(--teal-primary)' : 'var(--text-muted)'} />
                <span>{prod.brand || prod.productName}</span>
                <span style={{
                  fontSize: '0.7rem',
                  background: isSelected ? 'var(--teal-subtle)' : 'var(--bg-inset)',
                  color: isSelected ? 'var(--teal-primary)' : 'var(--text-muted)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  fontWeight: 600
                }}>
                  ฿{((Number(prod.sponsorRevenueTHB) || 0) / 1000).toLocaleString()}k
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Save Success Alert */}
      {saveSuccessMsg && (
        <div style={{
          background: 'var(--accent-green-bg)',
          color: 'var(--accent-green)',
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.86rem',
          fontWeight: 600,
          border: '1px solid rgba(31, 122, 89, 0.2)'
        }}>
          <CheckCircle2 size={18} />
          <span>{saveSuccessMsg}</span>
        </div>
      )}

      {/* Main Grid: Sponsor Asset Detail + Placement Simulator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Sponsor Asset Profile */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="clay-card" style={{ padding: '24px' }}>
            
            {/* Action Bar (Edit & Delete) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                {activeProduct.contractTier?.split('(')[0] || 'Tier-1 Sponsor'}
              </span>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => handleOpenEdit(activeProduct)}
                  className="btn-primary"
                  style={{
                    padding: '6px 14px',
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'var(--teal-primary)'
                  }}
                  title="เปิดหน้าแก้ไขแบบเต็มหน้าเพื่อจัดการคลังภาพ 8 มุมมอง"
                >
                  <Edit3 size={14} />
                  <span>แก้ไขข้อมูล & คลัง 8 มุมมอง</span>
                </button>

                <button
                  onClick={() => handleDeleteProduct(activeProduct.id)}
                  className="btn-secondary"
                  style={{ padding: '6px 10px', fontSize: '0.78rem', color: 'var(--accent-red)' }}
                  title="ลบสปอนเซอร์นี้"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Product Hero Image */}
            <div style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              marginBottom: '18px',
              border: '1px solid var(--border-subtle)',
              position: 'relative',
              boxShadow: 'var(--shadow-raised-sm)',
              background: '#0F172A',
              height: '320px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img
                src={activeProduct.heroImage || '/assets/sponsor_serum.jpg'}
                alt={activeProduct.productName}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'rgba(255, 255, 255, 0.95)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-pill)',
                color: 'var(--teal-primary)',
                fontSize: '0.75rem',
                fontWeight: 700,
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                gap: '5px'
              }}>
                <Award size={13} strokeWidth={2} />
                <span>Official Partner</span>
              </div>

              <input
                type="file"
                ref={quickHeroInputRef}
                onChange={handleQuickHeroUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />

              <button
                onClick={() => quickHeroInputRef.current?.click()}
                style={{
                  position: 'absolute',
                  bottom: '12px',
                  right: '12px',
                  background: 'rgba(15, 25, 26, 0.85)',
                  color: '#FFFFFF',
                  padding: '6px 12px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
                title="คลิกเพื่ออัปโหลดไฟล์ภาพสินค้าใหม่ทันที"
              >
                <Upload size={13} />
                <span>เปลี่ยนภาพ Hero</span>
              </button>
            </div>

            {/* Product Titles & Brand */}
            <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
              {activeProduct.productName || 'ชื่อสินค้าสปอนเซอร์'}
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '3px' }}>
              แบรนด์: <strong>{activeProduct.brand || 'ระบุแบรนด์'}</strong> | หมวด: {activeProduct.category?.split('(')[0] || activeProduct.category}
            </p>
            {activeProduct.tagline && (
              <p style={{ fontSize: '0.85rem', color: 'var(--teal-primary)', marginTop: '8px', fontStyle: 'italic', fontWeight: 500, lineHeight: 1.4 }}>
                "{activeProduct.tagline}"
              </p>
            )}

            {/* 8 MULTI-ANGLE PREVIEW STRIP */}
            <div style={{
              marginTop: '16px',
              padding: '14px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-inset)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Camera size={15} color="var(--teal-primary)" />
                  <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>
                    คลังภาพถ่ายสินค้า 8 มุมมอง (Camera Angles)
                  </strong>
                </div>
                <button
                  onClick={() => handleOpenEdit(activeProduct)}
                  style={{
                    fontSize: '0.74rem',
                    color: 'var(--teal-primary)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>จัดการ 8 มุมมอง</span>
                  <ArrowRight size={13} />
                </button>
              </div>

              {/* Angle Thumbnails Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '8px'
              }}>
                {PRODUCT_ANGLES.slice(0, 8).map(angle => {
                  const img = activeProduct.angles?.[angle.id] || (angle.id === 'front_eye_level' ? activeProduct.heroImage : '');
                  const hasImg = Boolean(img);
                  return (
                    <div
                      key={angle.id}
                      onClick={() => handleOpenEdit(activeProduct)}
                      style={{
                        background: 'var(--bg-surface)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px',
                        border: hasImg ? '1.5px solid var(--accent-green)' : '1px dashed var(--border-subtle)',
                        cursor: 'pointer',
                        textAlign: 'center',
                        transition: 'transform 0.15s ease'
                      }}
                      title={`${angle.title}: ${hasImg ? 'มีรูปภาพแล้ว' : 'คลิกเพื่ออัปโหลด'}`}
                    >
                      <div style={{
                        height: '52px',
                        borderRadius: '4px',
                        background: '#0B0F19',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '4px'
                      }}>
                        {hasImg ? (
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <Camera size={16} color="#64748B" />
                        )}
                      </div>
                      <div style={{
                        fontSize: '0.66rem',
                        fontWeight: 600,
                        color: hasImg ? 'var(--text-main)' : 'var(--text-dim)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}>
                        {angle.title.split('(')[0].replace(/[0-9.]/g, '').trim()}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Placement Specs Grid */}
            <div style={{
              marginTop: '16px',
              background: 'var(--bg-inset)',
              boxShadow: 'var(--shadow-inset)',
              borderRadius: 'var(--radius-md)',
              padding: '14px 16px',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '12px'
            }}>
              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ฉากที่กำหนดจัดวาง:</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block', marginTop: '2px' }}>
                  {activeProduct.targetShot || 'EP 01 - Shot 03'}
                </strong>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>เวลาแอร์ไทม์ต่อตอน:</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--accent-green)', display: 'block', marginTop: '2px' }}>
                  {activeProduct.actualScreenTimeSec || 4.8}s (เป้าหมาย {activeProduct.targetScreenTimeSec || 4.5}s)
                </strong>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>มูลค่าสัญญาในเรื่อง:</span>
                <strong style={{ fontSize: '0.95rem', color: 'var(--accent-green)', display: 'block', marginTop: '2px', fontWeight: 800 }}>
                  ฿{(Number(activeProduct.sponsorRevenueTHB) || 0).toLocaleString()} THB
                </strong>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>คาดการณ์ Reach:</span>
                <strong style={{ fontSize: '0.85rem', color: 'var(--teal-primary)', display: 'block', marginTop: '2px' }}>
                  {activeProduct.estimatedAudienceViews || '2,500,000+ views'}
                </strong>
              </div>
            </div>

            {/* Narrative Justification */}
            <div style={{ marginTop: '16px' }}>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                บทบาทในเนื้อเรื่อง (Narrative Justification):
              </span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginTop: '4px', lineHeight: 1.5, background: 'rgba(255, 255, 255, 0.5)', padding: '10px 12px', borderRadius: 'var(--radius-sm)' }}>
                {activeProduct.placementNotes || 'วางในฉากโต๊ะทำงานของผู้บริหารและกระเป๋าถือของนางเอก สื่อถึงความหรูหรา น่าเชื่อถือ'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: 9:16 Vertical Safe-Zone Validator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  9:16 Vertical Safe-Zone & AI Collision Validator
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  จำลองการจัดวางสินค้าบนหน้าจอมือถือจริง พร้อมตรวจจับการชนของไอคอน TikTok / Reels
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => setShowSafeZoneOverlay(!showSafeZoneOverlay)}
                  className="btn-secondary"
                  style={{ padding: '5px 12px', fontSize: '0.76rem' }}
                >
                  {showSafeZoneOverlay ? 'ซ่อน Safe Zone Overlay' : 'แสดง Safe Zone Overlay'}
                </button>
                <button
                  onClick={() => handleOpenEdit(activeProduct)}
                  className="btn-secondary"
                  style={{ padding: '5px 12px', fontSize: '0.76rem', color: 'var(--teal-primary)' }}
                >
                  <Smartphone size={13} />
                  <span>จัดการในสตูดิโอเต็มหน้า</span>
                </button>
              </div>
            </div>

            {/* Interactive Anchor Positions Selector */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
              {ANCHOR_POSITIONS.map(pos => {
                const isSelected = (activeProduct.anchorPosition || selectedAnchor) === pos.id;
                return (
                  <button
                    key={pos.id}
                    onClick={() => {
                      setSelectedAnchor(pos.id);
                      const updated = products.map(p => p.id === activeProduct.id ? { ...p, anchorPosition: pos.id } : p);
                      persistProducts(updated);
                    }}
                    style={{
                      padding: '5px 12px',
                      borderRadius: 'var(--radius-pill)',
                      border: isSelected ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--bg-raised)' : 'var(--bg-inset)',
                      boxShadow: isSelected ? 'var(--shadow-raised-sm)' : 'none',
                      color: isSelected ? 'var(--teal-primary)' : 'var(--text-muted)',
                      fontSize: '0.74rem',
                      fontWeight: isSelected ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px'
                    }}
                  >
                    <span>{pos.label.split('(')[0]}</span>
                    {pos.safe ? (
                      <span style={{ color: 'var(--accent-green)', fontWeight: 800 }}>✓</span>
                    ) : (
                      <span style={{ color: 'var(--accent-red)', fontWeight: 800 }}>⚠️</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Smartphone 9:16 Mockup Canvas */}
            <div style={{
              width: '100%',
              maxWidth: '310px',
              height: '550px',
              margin: '0 auto',
              borderRadius: '28px',
              overflow: 'hidden',
              position: 'relative',
              background: '#090D16',
              boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
              border: '3px solid #1E293B'
            }}>
              {/* Scene Image */}
              <img
                src={activeProduct.sceneImage || activeProduct.heroImage || '/assets/sponsor_serum.jpg'}
                alt="Scene Frame"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* TikTok Safe-Zone Overlay */}
              {showSafeZoneOverlay && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  pointerEvents: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '16px'
                }}>
                  {/* Top Bar Danger Zone */}
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.18)',
                    border: '1px dashed rgba(239, 68, 68, 0.5)',
                    padding: '6px',
                    borderRadius: '6px',
                    fontSize: '0.62rem',
                    color: '#FECACA',
                    textAlign: 'center'
                  }}>
                    ⚠️ Danger Zone: แถบสถานะระบบ & เมนู Search
                  </div>

                  {/* Right Action Icons Danger Area */}
                  <div style={{
                    alignSelf: 'flex-end',
                    width: '45px',
                    background: 'rgba(239, 68, 68, 0.18)',
                    border: '1px dashed rgba(239, 68, 68, 0.5)',
                    borderRadius: '6px',
                    padding: '6px 2px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    alignItems: 'center',
                    color: '#FECACA',
                    fontSize: '0.58rem'
                  }}>
                    <span>❤️</span>
                    <span>💬</span>
                    <span>↗️</span>
                  </div>

                  {/* Bottom Caption Danger Area */}
                  <div style={{
                    background: 'rgba(239, 68, 68, 0.18)',
                    border: '1px dashed rgba(239, 68, 68, 0.5)',
                    padding: '6px',
                    borderRadius: '6px',
                    fontSize: '0.62rem',
                    color: '#FECACA',
                    textAlign: 'center'
                  }}>
                    ⚠️ Danger Zone: ซับไตเติล & แคปชัน TikTok
                  </div>
                </div>
              )}

              {/* Product Placement Anchor Box */}
              <div style={{
                position: 'absolute',
                top: currentAnchor.top,
                left: currentAnchor.left,
                right: currentAnchor.right,
                bottom: currentAnchor.bottom,
                border: currentAnchor.safe ? '2px solid #10B981' : '2px solid #EF4444',
                background: currentAnchor.safe ? 'rgba(16, 185, 129, 0.22)' : 'rgba(239, 68, 68, 0.35)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                pointerEvents: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
              }}>
                <span style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: currentAnchor.safe ? '#A7F3D0' : '#FECACA',
                  textAlign: 'center',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 5px',
                  borderRadius: '4px'
                }}>
                  {currentAnchor.safe ? '✓ SAFE ZONE' : '⚠️ COLLISION RISK'}
                </span>
                <span style={{ fontSize: '0.55rem', color: '#FFFFFF', textAlign: 'center', marginTop: '2px' }}>
                  {activeProduct.brand}
                </span>
              </div>
            </div>

            {/* Current Safe Status Alert */}
            <div style={{
              marginTop: '16px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              background: currentAnchor.safe ? 'var(--accent-green-bg)' : 'var(--accent-red-bg)',
              color: currentAnchor.safe ? 'var(--accent-green)' : 'var(--accent-red)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              {currentAnchor.safe ? <ShieldCheck size={20} /> : <AlertCircle size={20} />}
              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                {currentAnchor.safe
                  ? 'ตำแหน่งจัดวางผ่านเกณฑ์ Safe-Zone 100% — ปราศจากการบดบังโดยไอคอนของแอป'
                  : 'คำเตือน: ตำแหน่งนี้เสี่ยงต่อการโดนไอคอน Like/Comment หรือซับไตเติลบังสินค้า'}
              </span>
            </div>
          </div>

          {/* AI Video Production Prompt Card */}
          <div className="clay-card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} color="var(--teal-primary)" />
                <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  AI Video Placement Prompt (Hollywood 8-Pillars)
                </h4>
              </div>
              <button
                onClick={() => {
                  if (typeof navigator !== 'undefined' && navigator.clipboard) {
                    navigator.clipboard.writeText(vppPromptText);
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 2000);
                  }
                }}
                className="btn-secondary"
                style={{ padding: '4px 10px', fontSize: '0.74rem', display: 'flex', alignItems: 'center', gap: '4px' }}
              >
                {copiedPrompt ? <Check size={13} color="var(--accent-green)" /> : <Copy size={13} />}
                <span>{copiedPrompt ? 'คัดลอกแล้ว!' : 'คัดลอก Prompt'}</span>
              </button>
            </div>

            <div style={{
              background: 'var(--bg-inset)',
              padding: '12px 14px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1.5,
              color: 'var(--text-main)',
              wordBreak: 'break-word',
              border: '1px solid var(--border-subtle)'
            }}>
              {vppPromptText}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
