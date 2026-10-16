import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Check, Upload, Image as ImageIcon, Camera, Eye, 
  Sparkles, ShieldCheck, AlertCircle, Copy, Trash2, Box, 
  Layers, Maximize2, Sliders, Hand, TrendingUp, Sun, DollarSign,
  Tag, FileText, CheckCircle2, RefreshCw, Award, Smartphone
} from 'lucide-react';

export const CATEGORY_OPTIONS = [
  'Luxury Skincare / Cosmetics (สกินแคร์ & เครื่องสำอางหรู)',
  'Beverages & Energy Drinks (เครื่องดื่ม & ฟังก์ชันนอลดริ้งก์)',
  'Fashion & Jewelry (เสื้อผ้า & เครื่องประดับแฟชั่น)',
  'Automotive & Supercars (ยานยนต์ & รถหรู)',
  'Tech & Smart Devices (สมาร์ตโฟน & แกดเจ็ต)',
  'Luxury Watches & Accessories (นาฬิกาหรู & เครื่องหนัง)',
  'Food & Restaurant (อาหาร & เครื่องปรุงระดับพรีเมียม)',
  'Health & Wellness (ผลิตภัณฑ์เพื่อสุขภาพ & วิตามิน)',
  'Other / Custom Category (หมวดหมู่อื่นๆ)'
];

export const CONTRACT_TIERS = [
  'Tier-1 Exclusive Drama Sponsor (สปอนเซอร์หลักตอนเดียว)',
  'Tier-2 Co-Sponsor (สปอนเซอร์ร่วมระดับพรีเมียม)',
  'Product Placement Standard (แทรกสินค้าทั่วไป)',
  'Scene Brand Barter (ความร่วมมือด้านสถานที่ & สินค้าประกอบฉาก)'
];

export const ANCHOR_POSITIONS = [
  { id: 'center', label: 'Center Pivot (กึ่งกลาง - แนะนำ ปลอดภัย 100%)', safe: true, top: '40%', left: '30%', right: '30%', bottom: '35%' },
  { id: 'desk', label: 'Lower Desk / Foreground (โต๊ะทำงานด้านหน้า)', safe: true, top: '55%', left: '25%', right: '35%', bottom: '20%' },
  { id: 'handheld', label: 'Actor Handheld (ตัวละครถือโชว์ข้างลำตัว)', safe: true, top: '42%', left: '20%', right: '45%', bottom: '38%' },
  { id: 'upper_shelf', label: 'Upper Display / Shelf (ชั้นวางด้านหลัง)', safe: true, top: '22%', left: '35%', right: '35%', bottom: '60%' },
  { id: 'danger_right', label: 'Edge Right (ขวาติดขอบ - เสี่ยงโดนปุ่ม Like บัง)', safe: false, top: '45%', left: '60%', right: '5%', bottom: '35%' }
];

export const PRODUCT_ANGLES = [
  {
    id: 'front_eye_level',
    title: '1. Front Eye-Level (มุมตรงระนาบสายตา)',
    englishTag: 'Front Eye-Level Commercial Hero Shot',
    description: 'มุมตรง 0° ระดับสายตา เห็นโลโก้ ฉลาก และสัดส่วนบรรจุภัณฑ์ 100% ชัดเจนที่สุด ไร้การบิดเบือนทรง',
    recommendedUse: 'ช็อตเปิดตัวสินค้า / Hero Product Reveal / โคลสอัพแบรนด์หลัก',
    cameraSpec: 'Camera: Eye-Level, 50mm Anamorphic, f/2.0, studio key light 4:1',
    promptSnippet: 'front eye-level commercial hero shot, crisp centered logo typography, studio reflections, pristine packaging texture',
    icon: Maximize2,
    badgeColor: 'var(--teal-primary)'
  },
  {
    id: 'three_quarter_hero',
    title: '2. 3/4 Perspective Hero (มุมเฉียง 45 องศา)',
    englishTag: 'Three-Quarter Angle Heroic Shot',
    description: 'มุมเฉียง 45° ส่องสะท้อนมิติ ความลึก เส้นขอบ และความโค้งมนของขวด/กล่อง packaging ระดับพรีเมียม',
    recommendedUse: 'ช็อตวางบนโต๊ะสนทนาผู้บริหาร / มุมมองคลาสสิกโฆษณาพรีเมียม',
    cameraSpec: 'Camera: 45° angle, 65mm focal length, f/1.8, soft rim backlight',
    promptSnippet: '45-degree three-quarter commercial perspective, deep dimensional reflections, ambient boardroom illumination, shallow depth of field',
    icon: Box,
    badgeColor: '#0284C7'
  },
  {
    id: 'side_profile_90',
    title: '3. Side Profile (มุมข้าง 90 องศา)',
    englishTag: 'Side Profile Silhouette & Thickness',
    description: 'มุมมองด้านข้าง 90° เน้นความเพรียวบาง เส้นสายการดีไซน์ ความหนา และรายละเอียดฝาเปิด',
    recommendedUse: 'ช็อตแพนกล้องผ่าน (Whip Pan / Tracking Shot) หรือวางชิดขอบโต๊ะ',
    cameraSpec: 'Camera: 90° lateral side-on, 85mm prime lens, f/2.8, linear dolly track',
    promptSnippet: 'clean 90-degree lateral side profile, minimalist studio silhouette, edge light contouring, sleek packaging form',
    icon: Sliders,
    badgeColor: '#6366F1'
  },
  {
    id: 'macro_detail_close',
    title: '4. Macro Texture & Detail (มุมเจาะซูมระยะประชิด)',
    englishTag: 'Macro Detail Close-Up (Droplets & Cap)',
    description: 'มุมซูมระดับมาโคร โฟกัสหัวปั๊ม ดรอปเปอร์ หยดของเหลว หรือประกายอัญมณี สะท้อนความพิถีพิถัน',
    recommendedUse: 'ช็อตไฮไลต์เนื้อสัมผัส (Sensory Shot) / หยดน้ำยา / สัมผัสความหรูหรา',
    cameraSpec: 'Camera: 100mm Macro 1:1, f/2.8, extreme close-up, golden liquid droplets refraction',
    promptSnippet: 'extreme macro close-up 100mm, pristine gold amber liquid droplets suspended on dropper tip, caustic light reflections, 8k hyper-detail',
    icon: Sparkles,
    badgeColor: '#D97706'
  },
  {
    id: 'handheld_actor_grip',
    title: '5. In-Hand Actor Grip (มุมขณะนักแสดงจับถือ)',
    englishTag: 'Actor Handheld Usage Angle',
    description: 'มุมมองขณะตัวละครหยิบขวด/สินค้าในมือ โชว์ขนาดจริงเมื่อเทียบกับมือคนอย่างเป็นธรรมชาติ',
    recommendedUse: 'ฉากที่นางเอกหรือพระเอกหยิบขึ้นมาใช้ในบทสนทนา (Diegetic Placement)',
    cameraSpec: 'Camera: Medium close-up, 40mm handheld camera, f/2.2, natural skin-tones interaction',
    promptSnippet: 'diegetic product placement, character hand gently holding luxury packaging, fingertips resting naturally, natural motion blur, authentic interaction',
    icon: Hand,
    badgeColor: 'var(--accent-green)'
  },
  {
    id: 'top_down_flatlay',
    title: '6. Top-Down / Flat Lay (มุมมองมุมกด 90 องศา)',
    englishTag: 'Top-Down Overhead Flat Lay',
    description: 'มุมมองจากด้านบนตรง Bird’s Eye View เหมาะกับสินค้าที่วางคู่เอกสารหรือในกระเป๋าถือ',
    recommendedUse: 'ฉากรื้อกระเป๋า / วางบนโต๊ะทำงานคู่แฟ้มคดีลับ / ฉากเปิดกล่อง Unboxing',
    cameraSpec: 'Camera: Overhead 90° directly above, 35mm wide flat perspective, f/4.0',
    promptSnippet: 'top-down flat-lay overhead view, placed beside open luxury leather bag and confidential casefile, organized luxury composition, soft top-light',
    icon: Layers,
    badgeColor: '#8B5CF6'
  },
  {
    id: 'low_angle_heroic',
    title: '7. Low-Angle Heroic (มุมเงยช้อนต่ำ ทรงพลัง)',
    englishTag: 'Low-Angle Dramatic Heroic View',
    description: 'มุมเงยจากล่างขึ้นบน ถ่ายทอดความสูงสง่า มั่งคั่ง โอ่อ่า และสร้างอิมแพกต์ทางสายตา',
    recommendedUse: 'ช็อตโชว์ความสำเร็จ / บิลบอร์ด / สินค้าทรงสูงหรือขวดแก้วหรู',
    cameraSpec: 'Camera: Low-angle tilting upwards 25°, 28mm wide, f/2.0, dramatic amber backlight',
    promptSnippet: 'low-angle heroic composition looking up at product, monumental scale, dramatic corporate tower window background, volumetric lighting rays',
    icon: TrendingUp,
    badgeColor: '#EC4899'
  },
  {
    id: 'back_reverse_rim',
    title: '8. Back Reverse / Rim-Lit (มุมด้านหลังย้อนแสง)',
    englishTag: 'Back Silhouette & Rim Light Glow',
    description: 'มุมมองด้านหลังตัวสินค้า เน้นการย้อนแสง Rim-light ส่องทะลุเนื้อแก้วและของเหลว สร้างบรรยากาศลึกลับ',
    recommendedUse: 'ช็อตสร้างบรรยากาศลึกลับ (Atmospheric / Mood & Tone) ยามค่ำคืน',
    cameraSpec: 'Camera: Reverse backlight, 50mm, f/1.4, translucent amber glow, silhouette outline',
    promptSnippet: 'backlit reverse angle, rim light illuminating translucent liquid, silhouette outline, moody night raindrops bokeh on window behind',
    icon: Sun,
    badgeColor: '#F59E0B'
  }
];

export default function SponsorEditorPage({
  series = {},
  sponsorToEdit = null,
  mode = 'edit', // 'edit' or 'create'
  onSave,
  onCancel,
  onDelete
}) {
  const isCreate = mode === 'create' || !sponsorToEdit;

  // Initial State normalization
  const [formData, setFormData] = useState(() => {
    if (sponsorToEdit) {
      return {
        ...sponsorToEdit,
        angles: sponsorToEdit.angles || {
          front_eye_level: sponsorToEdit.heroImage || '/assets/sponsor_serum.jpg',
          three_quarter_hero: '',
          side_profile_90: '',
          macro_detail_close: '',
          handheld_actor_grip: '',
          top_down_flatlay: '',
          low_angle_heroic: '',
          back_reverse_rim: ''
        }
      };
    }
    return {
      id: `sp-${Date.now().toString().slice(-4)}`,
      brand: '',
      productName: '',
      tagline: '',
      heroImage: '/assets/sponsor_serum.jpg',
      sceneImage: '/assets/sponsor_serum.jpg',
      category: CATEGORY_OPTIONS[0],
      contractTier: CONTRACT_TIERS[0],
      placementsPerEpisode: 1,
      targetScreenTimeSec: 5.0,
      actualScreenTimeSec: 5.0,
      estimatedAudienceViews: '2,500,000+ views',
      safeZoneVerified: true,
      sponsorStatus: 'Contract Signed & Scene Validated',
      sponsorRevenueTHB: 450000,
      placementNotes: 'วางในฉากโต๊ะทำงานของผู้บริหารและกระเป๋าถือของนางเอก สื่อถึงความหรูหรา',
      targetShot: 'EP 01 - Shot 03 (The Sponsor Showcase)',
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
  });

  const [activeSection, setActiveSection] = useState('angles'); // 'angles' | 'safezone' | 'contract' | 'prompt'
  const [activeAngleId, setActiveAngleId] = useState('front_eye_level');
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [saveToast, setSaveToast] = useState('');

  // Refs for each angle file upload
  const fileInputRefs = useRef({});
  const sceneInputRef = useRef(null);

  const activeAngle = PRODUCT_ANGLES.find(a => a.id === activeAngleId) || PRODUCT_ANGLES[0];
  const currentAnchor = ANCHOR_POSITIONS.find(a => a.id === formData.anchorPosition) || ANCHOR_POSITIONS[0];

  // Count uploaded angles
  const uploadedAnglesCount = Object.values(formData.angles || {}).filter(Boolean).length;

  // Handle uploading image for a specific angle
  const handleAngleUpload = (angleId, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target.result;
      setFormData(prev => {
        const nextAngles = { ...prev.angles, [angleId]: base64Data };
        // If uploading to front_eye_level or if heroImage is empty, sync to heroImage
        const shouldSyncHero = angleId === 'front_eye_level' || !prev.heroImage;
        return {
          ...prev,
          heroImage: shouldSyncHero ? base64Data : prev.heroImage,
          angles: nextAngles
        };
      });
      setSaveToast(`อัปโหลดภาพมุม "${PRODUCT_ANGLES.find(a => a.id === angleId)?.title}" สำเร็จ!`);
      setTimeout(() => setSaveToast(''), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Set an angle as primary hero image
  const handleSetPrimaryHero = (angleId) => {
    const imgData = formData.angles?.[angleId];
    if (!imgData) {
      alert('กรุณาอัปโหลดรูปภาพในมุมมองนี้ก่อนกำหนดเป็น Hero Image');
      return;
    }
    setFormData(prev => ({ ...prev, heroImage: imgData }));
    setSaveToast(`กำหนดให้ภาพมุมนี้เป็น Product Hero Shot หลักเรียบร้อยแล้ว`);
    setTimeout(() => setSaveToast(''), 3000);
  };

  // Handle Scene Image Upload (9:16 In-Scene Placement Frame)
  const handleSceneImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64Data = uploadEvent.target.result;
      setFormData(prev => ({ ...prev, sceneImage: base64Data }));
      setSaveToast(`อัปโหลดเฟรมแนวตั้ง 9:16 สำหรับตรวจ Safe-Zone เรียบร้อย`);
      setTimeout(() => setSaveToast(''), 3000);
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Dynamic Hollywood AI Video Placement Prompt for Selected Angle
  const vppPromptText = `Cinematic vertical 9:16 shot, luxury boardroom executive setting, [VPP PRODUCT HERO: ${formData.brand || 'LUMIÈRE'} - ${formData.productName || 'Serum'}], Angle: [${activeAngle.englishTag}], ${activeAngle.promptSnippet}, anchored in safe zone (${currentAnchor.label.split('(')[0]}), pristine studio lighting matching Rembrandt 4:1 teal and warm amber reflections on product packaging, ultra shallow depth of field f/1.8, bokeh raindrops on executive glass window, photorealistic material texture, commercial grade presentation --ar 9:16 --v 6.1 --style raw`;

  const handleCopyPrompt = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(vppPromptText);
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2500);
    }
  };

  // Handle Form Save
  const handleSave = (e) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (!formData.productName?.trim()) {
      alert('กรุณากรอกชื่อสินค้า/ผลิตภัณฑ์');
      return;
    }
    if (!formData.brand?.trim()) {
      alert('กรุณากรอกชื่อแบรนด์ผู้สนับสนุน');
      return;
    }

    const payload = {
      ...formData,
      heroImage: formData.angles?.front_eye_level || formData.heroImage || '/assets/sponsor_serum.jpg',
      sponsorRevenueTHB: Number(formData.sponsorRevenueTHB) || 0,
      actualScreenTimeSec: Number(formData.actualScreenTimeSec) || 4.5,
      targetScreenTimeSec: Number(formData.targetScreenTimeSec) || 4.5
    };

    if (onSave) {
      onSave(payload);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', padding: '16px 0', minHeight: '100vh' }}>
      
      {/* Toast Notice */}
      {saveToast && (
        <div style={{
          position: 'fixed',
          top: '80px',
          right: '24px',
          zIndex: 9999,
          background: 'var(--teal-primary)',
          color: '#FFFFFF',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 8px 24px rgba(11, 74, 81, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.86rem',
          fontWeight: 600,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 size={18} color="#A7F3D0" />
          <span>{saveToast}</span>
        </div>
      )}

      {/* Top Navigation & Action Header */}
      <div className="clay-card" style={{ padding: '22px 28px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <button
              onClick={onCancel}
              className="btn-secondary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '10px',
                color: 'var(--teal-primary)'
              }}
            >
              <ArrowLeft size={15} />
              <span>กลับสู่ Art & Sponsor Vault</span>
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span className="badge badge-teal" style={{ fontSize: '0.74rem' }}>
                {isCreate ? 'สร้างสปอนเซอร์ใหม่ (New Sponsor)' : 'สตูดิโอจัดทำมุมกล้องสินค้า (Product Camera Studio)'}
              </span>
              <span className="badge" style={{ background: 'var(--bg-inset)', color: 'var(--text-main)', fontSize: '0.74rem' }}>
                {uploadedAnglesCount} / {PRODUCT_ANGLES.length} มุมมองพร้อมใช้งาน
              </span>
              <span className="badge" style={{ background: 'var(--accent-green-bg)', color: 'var(--accent-green)', fontSize: '0.74rem', fontWeight: 700 }}>
                ฿{(Number(formData.sponsorRevenueTHB) || 0).toLocaleString()} THB
              </span>
            </div>

            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', margin: '8px 0 0 0', fontWeight: 800, fontFamily: 'var(--font-display)' }}>
              {formData.brand || 'แบรนด์สินค้า'} — {formData.productName || 'ชื่อผลิตภัณฑ์'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
              คลังภาพถ่ายผลิตภัณฑ์ 8 มุมมองสำหรับป้อนเข้า AI Video Generator (Sora / Kling / Runway Gen-3) เพื่อรักษาความถูกต้องของบรรจุภัณฑ์ 100%
            </p>
          </div>

          {/* Top Save / Cancel Buttons */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
              style={{ padding: '9px 18px', fontSize: '0.84rem' }}
            >
              ยกเลิก
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 20px',
                fontSize: '0.86rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #135E67, #0B4A51)',
                boxShadow: 'var(--shadow-teal-btn)'
              }}
            >
              <Check size={16} strokeWidth={2.5} />
              <span>บันทึกข้อมูลสปอนเซอร์</span>
            </button>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginTop: '20px',
          paddingTop: '16px',
          borderTop: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch'
        }}>
          <button
            onClick={() => setActiveSection('angles')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: activeSection === 'angles' ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
              background: activeSection === 'angles' ? 'var(--teal-primary)' : 'var(--bg-inset)',
              color: activeSection === 'angles' ? '#FFFFFF' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Camera size={14} />
            <span>1. คลังภาพ 8 มุมมองสินค้า ({uploadedAnglesCount}/{PRODUCT_ANGLES.length})</span>
          </button>

          <button
            onClick={() => setActiveSection('safezone')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: activeSection === 'safezone' ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
              background: activeSection === 'safezone' ? 'var(--teal-primary)' : 'var(--bg-inset)',
              color: activeSection === 'safezone' ? '#FFFFFF' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Smartphone size={14} />
            <span>2. เฟรมฉากแนวตั้ง 9:16 & Safe-Zone</span>
          </button>

          <button
            onClick={() => setActiveSection('contract')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: activeSection === 'contract' ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
              background: activeSection === 'contract' ? 'var(--teal-primary)' : 'var(--bg-inset)',
              color: activeSection === 'contract' ? '#FFFFFF' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Tag size={14} />
            <span>3. ข้อมูลสัญญา & บทบาทในเนื้อเรื่อง</span>
          </button>

          <button
            onClick={() => setActiveSection('prompt')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: activeSection === 'prompt' ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
              background: activeSection === 'prompt' ? 'var(--teal-primary)' : 'var(--bg-inset)',
              color: activeSection === 'prompt' ? '#FFFFFF' : 'var(--text-main)',
              fontWeight: 700,
              fontSize: '0.82rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            <Sparkles size={14} />
            <span>4. Hollywood AI Video Prompt Hub</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: 8 MULTI-ANGLE PRODUCT PHOTOGRAPHY STUDIO */}
      {activeSection === 'angles' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Section Introduction */}
          <div className="clay-card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #135E67, #0B4A51)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF'
              }}>
                <Camera size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  คลังภาพถ่ายสินค้า 8 มุมมองสำหรับกองถ่าย AI (8 Multi-Angle Product Studio)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
                  อัปโหลดรูปภาพของสินค้าในแต่ละมุมมอง (PNG/JPG) พร้อมระบุเลนส์กล้องและคำแนะนำการจัดวาง เพื่อให้โมเดลวิดีโอเข้าใจมุมสินค้าได้อย่างถูกต้องสมจริง
                </p>
              </div>
            </div>
          </div>

          {/* 8 Angles Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '18px'
          }}>
            {PRODUCT_ANGLES.map((angle) => {
              const Icon = angle.icon;
              const imgUrl = formData.angles?.[angle.id] || (angle.id === 'front_eye_level' ? formData.heroImage : '');
              const hasImage = Boolean(imgUrl);
              const isSelected = activeAngleId === angle.id;

              return (
                <div
                  key={angle.id}
                  onClick={() => setActiveAngleId(angle.id)}
                  className="clay-card"
                  style={{
                    padding: '20px',
                    border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                    boxShadow: isSelected ? 'var(--shadow-raised)' : 'var(--shadow-raised-sm)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    position: 'relative'
                  }}
                >
                  {/* Top Angle Title & Tag */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '8px',
                          background: hasImage ? 'var(--accent-green-bg)' : 'var(--bg-inset)',
                          color: hasImage ? 'var(--accent-green)' : 'var(--text-muted)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}>
                          <Icon size={16} />
                        </div>
                        <div>
                          <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)', display: 'block' }}>
                            {angle.title}
                          </strong>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                            {angle.englishTag}
                          </span>
                        </div>
                      </div>

                      {hasImage ? (
                        <span style={{
                          fontSize: '0.68rem',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'var(--accent-green-bg)',
                          color: 'var(--accent-green)',
                          fontWeight: 700,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}>
                          <CheckCircle2 size={11} />
                          <span>มีภาพแล้ว</span>
                        </span>
                      ) : (
                        <span style={{
                          fontSize: '0.68rem',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'var(--bg-inset)',
                          color: 'var(--text-dim)'
                        }}>
                          ยังไม่มีภาพ
                        </span>
                      )}
                    </div>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45, margin: '6px 0 10px 0' }}>
                      {angle.description}
                    </p>

                    {/* Image Preview Area */}
                    <div style={{
                      height: '190px',
                      borderRadius: 'var(--radius-sm)',
                      overflow: 'hidden',
                      background: '#0B0F19',
                      border: '1px solid var(--border-subtle)',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '12px'
                    }}>
                      {hasImage ? (
                        <img
                          src={imgUrl}
                          alt={angle.title}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <div style={{ textAlign: 'center', color: '#64748B', padding: '16px' }}>
                          <ImageIcon size={36} strokeWidth={1.5} style={{ margin: '0 auto 8px auto', display: 'block', opacity: 0.5 }} />
                          <span style={{ fontSize: '0.76rem', display: 'block' }}>ยังไม่ได้อัปโหลดภาพมุมนี้</span>
                          <span style={{ fontSize: '0.68rem', opacity: 0.8 }}>รองรับไฟล์ PNG หรือ JPG คุณภาพสูง</span>
                        </div>
                      )}

                      {/* Primary Hero Shot Badge */}
                      {imgUrl && formData.heroImage === imgUrl && (
                        <span style={{
                          position: 'absolute',
                          top: '8px',
                          left: '8px',
                          background: 'var(--teal-primary)',
                          color: '#FFFFFF',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '3px 8px',
                          borderRadius: '4px',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.3)'
                        }}>
                          ⭐ Primary Hero Shot
                        </span>
                      )}
                    </div>

                    {/* Camera Spec & Recommended Use */}
                    <div style={{
                      background: 'var(--bg-inset)',
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '0.74rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      marginBottom: '12px'
                    }}>
                      <div style={{ color: 'var(--teal-primary)', fontWeight: 700 }}>
                        🎬 {angle.recommendedUse}
                      </div>
                      <div style={{ color: 'var(--text-dim)', fontStyle: 'italic' }}>
                        📷 {angle.cameraSpec}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for this Angle */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <input
                      type="file"
                      ref={el => fileInputRefs.current[angle.id] = el}
                      onChange={(e) => handleAngleUpload(angle.id, e)}
                      accept="image/*"
                      style={{ display: 'none' }}
                    />

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRefs.current[angle.id]?.click();
                      }}
                      className="btn-secondary"
                      style={{
                        flex: 1,
                        padding: '7px 10px',
                        fontSize: '0.76rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Upload size={13} />
                      <span>{hasImage ? 'เปลี่ยนรูปภาพ' : 'อัปโหลดภาพมุมนี้'}</span>
                    </button>

                    {hasImage && formData.heroImage !== imgUrl && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSetPrimaryHero(angle.id);
                        }}
                        className="btn-secondary"
                        style={{
                          padding: '7px 10px',
                          fontSize: '0.74rem',
                          color: 'var(--teal-primary)'
                        }}
                        title="กำหนดให้ภาพมุมนี้เป็น Product Hero Shot หลัก"
                      >
                        ตั้งเป็น Hero หลัก
                      </button>
                    )}

                    {hasImage && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormData(prev => ({
                            ...prev,
                            angles: { ...prev.angles, [angle.id]: '' }
                          }));
                        }}
                        className="btn-secondary"
                        style={{
                          padding: '7px 10px',
                          fontSize: '0.74rem',
                          color: 'var(--accent-red)'
                        }}
                        title="ลบภาพมุมนี้"
                      >
                        <Trash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SECTION 2: 9:16 VERTICAL IN-SCENE PLACEMENT & SAFE-ZONE */}
      {activeSection === 'safezone' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 420px) 1fr', gap: '24px' }}>
          
          {/* Left Column: 9:16 In-Scene Vertical Simulator */}
          <div className="clay-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Smartphone size={18} color="var(--teal-primary)" />
                <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  เฟรมจำลองฉากแนวตั้ง 9:16
                </h3>
              </div>
              <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                TikTok / Reels 1080x1920
              </span>
            </div>

            {/* Smartphone Simulation Container */}
            <div style={{
              width: '100%',
              maxWidth: '300px',
              height: '533px', // 9:16 ratio
              margin: '0 auto',
              borderRadius: '24px',
              overflow: 'hidden',
              position: 'relative',
              background: '#090D16',
              boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
              border: '3px solid #1E293B'
            }}>
              {/* Scene Frame Image */}
              <img
                src={formData.sceneImage || formData.heroImage || '/assets/sponsor_serum.jpg'}
                alt="Scene Placement"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Safe-Zone Overlays (TikTok UI Simulation) */}
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
                {/* Top Bar Safe-zone Danger Area */}
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

                {/* Bottom Caption & Sound Danger Area */}
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

              {/* Product Placement Anchor Bounding Box */}
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
                  {currentAnchor.safe ? '✓ SAFE' : '⚠️ COLLISION'}
                </span>
                <span style={{ fontSize: '0.55rem', color: '#FFFFFF', textAlign: 'center', marginTop: '2px' }}>
                  {formData.brand || 'Product'}
                </span>
              </div>
            </div>

            {/* Upload 9:16 Scene Frame Button */}
            <div style={{ marginTop: '16px' }}>
              <input
                type="file"
                ref={sceneInputRef}
                onChange={handleSceneImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => sceneInputRef.current?.click()}
                className="btn-secondary"
                style={{
                  width: '100%',
                  padding: '9px 14px',
                  fontSize: '0.8rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <Upload size={14} />
                <span>อัปโหลดเฟรมฉากแนวตั้ง 9:16 (In-Scene Frame)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Safe-Zone Anchor Controls & Guidelines */}
          <div className="clay-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                เลือกตำแหน่งจัดวางสินค้าในเฟรม (Safe-Zone Placement Anchors)
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                เลือกตำแหน่งจัดวางเพื่อให้ระบบตรวจสอบการชนของปุ่ม Like/Comment และซับไตเติลบนหน้าจอมือถือ
              </p>
            </div>

            {/* Anchor Position Selectors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {ANCHOR_POSITIONS.map(pos => {
                const isSelected = formData.anchorPosition === pos.id;
                return (
                  <button
                    key={pos.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, anchorPosition: pos.id })}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-sm)',
                      border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'var(--bg-raised)' : 'var(--bg-inset)',
                      boxShadow: isSelected ? 'var(--shadow-raised-sm)' : 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: '0.86rem', color: 'var(--text-main)', display: 'block' }}>
                        {pos.label}
                      </strong>
                    </div>

                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-pill)',
                      background: pos.safe ? 'var(--accent-green-bg)' : 'var(--accent-red-bg)',
                      color: pos.safe ? 'var(--accent-green)' : 'var(--accent-red)'
                    }}>
                      {pos.safe ? '100% ปลอดภัย' : 'เสี่ยงโดนปุ่มบัง'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Current Safe Status Alert */}
            <div style={{
              padding: '14px 18px',
              borderRadius: 'var(--radius-md)',
              background: currentAnchor.safe ? 'var(--accent-green-bg)' : 'var(--accent-red-bg)',
              color: currentAnchor.safe ? 'var(--accent-green)' : 'var(--accent-red)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px'
            }}>
              {currentAnchor.safe ? <ShieldCheck size={22} style={{ flexShrink: 0 }} /> : <AlertCircle size={22} style={{ flexShrink: 0 }} />}
              <div>
                <strong style={{ fontSize: '0.88rem', display: 'block' }}>
                  {currentAnchor.safe ? 'ตำแหน่งนี้ผ่านเกณฑ์ Mobile Safe-Zone 100%' : 'คำเตือน: ตำแหน่งนี้เสี่ยงต่อการโดน UI ของแอปบัง'}
                </strong>
                <p style={{ fontSize: '0.78rem', margin: '4px 0 0 0', lineHeight: 1.45 }}>
                  {currentAnchor.safe 
                    ? 'สินค้าอยู่ในโซนมองเห็นชัดเจน ผู้ชมจะมองเห็นแบรนด์และฉลากได้อย่างสมบูรณ์แบบโดยไม่มีปุ่ม Like, Share, หรือช่องแชตมาบดบัง'
                    : 'ตำแหน่งชิดขอบขวาหรือล่างมากเกินไป จะถูกปุ่มโปรไฟล์ ปุ่มไลก์ หรือแถบแคปชันของ TikTok บดบังฉลากสินค้า แนะนำให้เลือก Center Pivot หรือ Lower Desk แทน'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: BRAND & COMMERCIAL CONTRACT TERMS */}
      {activeSection === 'contract' && (
        <div className="clay-card" style={{ padding: '28px' }}>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: '0 0 16px 0', fontWeight: 700 }}>
            รายละเอียดสัญญาสปอนเซอร์และการจัดวางในเรื่อง (Commercial Contract Specifications)
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {/* Brand Name */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                แบรนด์ผู้สนับสนุน (Brand Name): *
              </label>
              <input
                type="text"
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="เช่น LUMIÈRE Laboratories"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            {/* Product Name */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ชื่อสินค้า / ผลิตภัณฑ์ (Product Name): *
              </label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                placeholder="เช่น LUMIÈRE Elixir D'or (Serum)"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            {/* Tagline */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                สโลแกน / คีย์เวิร์ดจุดเด่น (Product Tagline):
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                placeholder="เช่น กุญแจสู่ผิวอ่อนเยาว์เหนือกาลเวลา พลังทองคำบริสุทธิ์"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            {/* Category */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                หมวดหมู่สินค้า (Category):
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              >
                {CATEGORY_OPTIONS.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Contract Tier */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ระดับสัญญา (Contract Tier):
              </label>
              <select
                value={formData.contractTier}
                onChange={(e) => setFormData({ ...formData, contractTier: e.target.value })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              >
                {CONTRACT_TIERS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            {/* Revenue THB */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                มูลค่าสัญญาในเรื่อง (Sponsor Revenue - THB):
              </label>
              <input
                type="number"
                value={formData.sponsorRevenueTHB}
                onChange={(e) => setFormData({ ...formData, sponsorRevenueTHB: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            {/* Screen Time Seconds */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                เวลาแอร์ไทม์เป้าหมายต่อตอน (วินาที):
              </label>
              <input
                type="number"
                step="0.1"
                value={formData.actualScreenTimeSec}
                onChange={(e) => setFormData({ ...formData, actualScreenTimeSec: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            {/* Target Shot */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                ฉาก / ช็อตที่กำหนดปรากฏ:
              </label>
              <input
                type="text"
                value={formData.targetShot}
                onChange={(e) => setFormData({ ...formData, targetShot: e.target.value })}
                placeholder="เช่น EP 01 - Shot 03"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            {/* Estimated Reach */}
            <div>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                คาดการณ์ยอดคนดู (Reach Views):
              </label>
              <input
                type="text"
                value={formData.estimatedAudienceViews}
                onChange={(e) => setFormData({ ...formData, estimatedAudienceViews: e.target.value })}
                placeholder="เช่น 2,500,000+ views"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem'
                }}
              />
            </div>

            {/* Narrative Justification */}
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                บทบาทในเนื้อเรื่อง & คำแนะนำจัดวาง (Narrative Justification):
              </label>
              <textarea
                rows={3}
                value={formData.placementNotes}
                onChange={(e) => setFormData({ ...formData, placementNotes: e.target.value })}
                placeholder="เช่น วางในฉากโต๊ะทำงานของผู้บริหารและกระเป๋าถือของนางเอก สื่อถึงความหรูหรา และเป็นของขวัญสำคัญในฉากที่ 3"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--bg-inset)',
                  fontSize: '0.86rem',
                  fontFamily: 'inherit',
                  resize: 'vertical'
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: HOLLYWOOD AI VIDEO PROMPT HUB */}
      {activeSection === 'prompt' && (
        <div className="clay-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} color="var(--teal-primary)" />
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  Hollywood 8-Pillar AI Video Placement Prompt
                </h3>
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '4px 0 0 0' }}>
                พรอมต์ที่ผ่านการสังเคราะห์ตามหลัก Cinematography ประจำมุมมอง <strong>"{activeAngle.title}"</strong>
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyPrompt}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                fontSize: '0.84rem'
              }}
            >
              {copiedPrompt ? <Check size={16} color="#A7F3D0" /> : <Copy size={16} />}
              <span>{copiedPrompt ? 'คัดลอกพรอมต์แล้ว!' : 'คัดลอกพรอมต์ AI Video'}</span>
            </button>
          </div>

          <div style={{
            background: 'var(--bg-inset)',
            padding: '16px 20px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.84rem',
            lineHeight: 1.6,
            color: 'var(--text-main)',
            wordBreak: 'break-word',
            boxShadow: 'var(--shadow-inset)'
          }}>
            {vppPromptText}
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginTop: '16px'
          }}>
            <div style={{ background: 'rgba(255,255,255,0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>มุมมองที่ใช้งาน (Angle):</span>
              <strong style={{ fontSize: '0.82rem', color: 'var(--teal-primary)' }}>{activeAngle.title}</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>สเปกกล้อง & เลนส์ (Lens):</span>
              <strong style={{ fontSize: '0.82rem', color: 'var(--text-main)' }}>{activeAngle.cameraSpec}</strong>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.6)', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block' }}>ตำแหน่ง Anchor ในเฟรม:</span>
              <strong style={{ fontSize: '0.82rem', color: currentAnchor.safe ? 'var(--accent-green)' : 'var(--accent-red)' }}>
                {currentAnchor.label.split('(')[0]}
              </strong>
            </div>
          </div>
        </div>
      )}

      {/* Sticky Bottom Save Action Bar */}
      <div style={{
        position: 'sticky',
        bottom: '16px',
        zIndex: 40,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(12px)',
        border: '1.5px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
        padding: '14px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            สปอนเซอร์: <strong style={{ color: 'var(--text-main)' }}>{formData.brand || 'แบรนด์ใหม่'}</strong> &bull; {formData.productName || 'สินค้า'}
          </span>
          <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
            {uploadedAnglesCount}/8 มุมมอง
          </span>
          <span style={{
            fontSize: '0.72rem',
            padding: '2px 8px',
            borderRadius: 'var(--radius-pill)',
            background: currentAnchor.safe ? 'var(--accent-green-bg)' : 'var(--accent-red-bg)',
            color: currentAnchor.safe ? 'var(--accent-green)' : 'var(--accent-red)',
            fontWeight: 700
          }}>
            {currentAnchor.safe ? 'Safe-Zone 100%' : 'Edge Collision Risk'}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            style={{ padding: '8px 18px', fontSize: '0.84rem' }}
          >
            ยกเลิก
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 22px',
              fontSize: '0.86rem',
              fontWeight: 700,
              background: 'linear-gradient(135deg, #135E67, #0B4A51)',
              boxShadow: 'var(--shadow-teal-btn)'
            }}
          >
            <Check size={16} strokeWidth={2.5} />
            <span>บันทึกข้อมูลสปอนเซอร์และมุมมองทั้งหมด</span>
          </button>
        </div>
      </div>

    </div>
  );
}
