import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Video, Users, Award, ShieldCheck, 
  Download, Check, X, ArrowRight, ArrowLeft, Play, Smartphone, 
  HelpCircle, MessageSquare, Feather, Sliders, ExternalLink,
  CheckCircle2, Film, AtSign, Eye, Zap, Volume2
} from 'lucide-react';

export default function UserGuideModal({ isOpen, onClose, onNavigateTab }) {
  if (!isOpen) return null;

  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "1. ห้องเขียนนิยาย & บทซีรีส์ (Writers Room)",
      badge: "Google Docs + 9:16 Script",
      icon: Feather,
      summary: "เขียนเนื้อหานิยาย กำหนดตัวละครผู้พูดด้วย @ และแปลงเป็นคัทมุมกล้องแนวตั้งอัตโนมัติ",
      content: [
        {
          heading: "วิธีพิมพ์บทพูดด้วยเครื่องหมาย @ (Mention Autocomplete):",
          desc: "ขณะพิมพ์เนื้อเรื่องในหน้ากระดาษ เพียงพิมพ์เครื่องหมาย @ ตรงตำแหน่งที่ต้องการ จะมีเมนูดรอปดาวน์รายชื่อตัวละคร (เช่น ริน ลลิตา, ทาดาโอะ) เด้งขึ้นมาทันที กดลูกศร ↑↓ แล้วกด Enter เพื่อใส่บทพูด @ชื่อ: \"...\" หรือกดปุ่ม '@ระบุตัวละคร' บนแถบเครื่องมือ"
        },
        {
          heading: "ระบบตรวจจับผู้พูดอัตโนมัติ (Auto Speaker Attribution):",
          desc: "หากเขียนนิยายเป็นบทร้อยแก้วธรรมดาโดยไม่ได้ใส่ @ ไว้ ให้คลิกปุ่ม 'ตรวจจับผู้พูด & แปลงบทซีรีส์' (ประกายดาว ✨) ระบบ AI จะวิเคราะห์คำพูดในเครื่องหมายคำพูด \"...\" และตรวจจับว่าใครเป็นคนพูดจากชื่อ สรรพนาม และคู่สนทนาสลับกันให้เอง 100%"
        },
        {
          heading: "แปลงเป็นบทซีรีส์ 9:16 (Convert to Screenplay):",
          desc: "คลิกปุ่ม 'แปลงเป็นบทซีรีส์ 9:16 ทันที' ระบบจะนำประโยคคำพูดทั้งหมดไปหั่นเป็น Beat Sheet คัทมุมกล้องแนวตั้ง (Tight Portrait, Dutch Tilt, FACS Acting Cues, Vocal Curve) พร้อมส่งต่อไปยังสายการผลิต"
        }
      ],
      route: '/novel',
      routeLabel: 'ไปที่ห้องเขียนนิยาย (Novel Studio)'
    },
    {
      id: 2,
      title: "2. แคสติ้ง & กำหนดตัวละคร (Casting & Character Bible)",
      badge: "Face-Lock 98.7% & LoRA",
      icon: Users,
      summary: "จัดการหน้าตานักแสดง ล็อคความนิ่งของใบหน้าข้ามช็อต และตั้งค่าโปรไฟล์เสียงพากย์",
      content: [
        {
          heading: "การล็อคใบหน้านักแสดง (Face-Lock 98.7%):",
          desc: "ตัวละครแต่ละตัวถูกผูกด้วย LoRA Model และ Actor Seed เฉพาะตัว เพื่อให้มั่นใจว่าไม่ว่าตัวละครจะแสดงในมุมมองไหน หรือกี่ตอน หน้าตาจะเหมือนเดิมเสมอไม่มีเพี้ยน"
        },
        {
          heading: "คอนโทรลกล้ามเนื้อใบหน้า (FACS Sliders):",
          desc: "ปรับจูนอารมณ์ละเอียด เช่น การเลิกคิ้ว (AU1+AU4), ริมฝีปากสั่นระริก (Lip Tremor), น้ำตาคลอเบ้า (Tear Welling), และการขบกรามแน่น (Jaw Tension)"
        },
        {
          heading: "โปรไฟล์เสียงพากย์ (Voice Profile):",
          desc: "กดปุ่ม 'ทดสอบเสียงพากย์' เพื่อฟังตัวอย่างน้ำเสียง โทนความถี่ และจังหวะลมหายใจ (Micro-Breathing) ที่แมตช์กับบุคลิกตัวละคร"
        }
      ],
      route: '/characters',
      routeLabel: 'ไปที่หน้าแคสติ้งตัวละคร (Character Bible)'
    },
    {
      id: 3,
      title: "3. สินค้าสปอนเซอร์ในฉาก (Art & Sponsor Vault)",
      badge: "Virtual Product Placement",
      icon: Award,
      summary: "สอดแทรกสินค้าสปอนเซอร์ลงในเนื้อเรื่องอย่างแนบเนียน และคำนวณ Safe Zone 9:16",
      content: [
        {
          heading: "การแทรกสินค้าแบบไม่ขัดอารมณ์ (Contextual VPP):",
          desc: "เช่น ในเรื่อง 'เงารัตติกาล' ฉากห้องประชุมชั้น 48 มีการสอดแทรก 'AuraGold Radiance Elixir' ไว้ในกระเป๋าถือของนางเอก ทำให้การโฆษณาแนบเนียนไปกับปมคดี"
        },
        {
          heading: "การจำลอง Safe Zone สำหรับ TikTok / ReelShort:",
          desc: "เปิดสวิตช์ Safe Zone Overlay เพื่อตรวจสอบว่ามุมที่วางสินค้า จะไม่ถูกปุ่ม Like, Comment, Share หรือคำบรรยายของแอปโซเชียลบดบัง 100%"
        },
        {
          heading: "คำนวณรายได้จากสปอนเซอร์ (Revenue Tracking):",
          desc: "แสดงรายได้ค่าสปอนเซอร์ต่อตอน (เช่น ฿150,000 THB) และสัญญาผูกขาดของแบรนด์"
        }
      ],
      route: '/art',
      routeLabel: 'ไปที่หน้าสปอนเซอร์ (Sponsor Hub)'
    },
    {
      id: 4,
      title: "4. วิดีโอ & เสียงพากย์ 9:16 (Video & Audio Engine)",
      badge: "Realtime Viewport & Multi-Stem",
      icon: Video,
      summary: "จอมือถือจำลอง 9:16 เล่นภาพการแสดงดารา AI และตรวจสอบคลื่นเสียงพากย์",
      content: [
        {
          heading: "จอมือถือจำลอง 9:16 (Vertical HUD Viewport):",
          desc: "กดปุ่ม Play ▶️ ด้านล่างหน้าจอเพื่อดูการเคลื่อนไหวของช็อต สามารถเปิด-ปิดเส้นกริด (Cinematic Rule-of-Thirds Grid) และกรอบตรวจจับใบหน้า (FACS HUD)"
        },
        {
          heading: "ระบบเสียงแยกแทร็ก (Multi-Stem Audio Engine):",
          desc: "ตรวจสอบ 3 แทร็กเสียงในช็อต: Track 1 บทพูดตามบทนิยาย, Track 2 เสียงเอฟเฟกต์บรรยากาศ (SFX ฝน/แก้ว), และ Track 3 ดนตรีประกอบดราม่า (BGM)"
        },
        {
          heading: "ปุ่ม Re-render Shot Acting:",
          desc: "กดเพื่อจำลองการประมวลผลการแสดงใหม่ของ AI ในช็อตนั้นๆ หากต้องการปรับอารมณ์ให้เข้มข้นยิ่งขึ้น"
        }
      ],
      route: '/pipeline',
      routeLabel: 'ไปที่หน้า Video & Audio Engine'
    },
    {
      id: 5,
      title: "5. ตรวจสอบคุณภาพ 2 ชั้น (Dual QA Gate)",
      badge: "AI Auditor + Director Approval",
      icon: ShieldCheck,
      summary: "การันตีมาตรฐานผลงานด้วยระบบตรวจเช็คอัตโนมัติ และการเซ็นอนุมัติโดยมนุษย์",
      content: [
        {
          heading: "ชั้นที่ 1: AI Auto-Auditor (ผ่าน 100%):",
          desc: "ตรวจสอบความนิ่งของใบหน้า (Face Consistency), ลิปซิงก์ตรงกับคำพูด (Lip Sync), และดัชนีจุดตัดระทึกท้ายตอน (Cliffhanger Index)"
        },
        {
          heading: "ชั้นที่ 2: Human Director Review Gate & 1-Click Prompt Export:",
          desc: "เมื่อผู้กำกับมนุษย์ตรวจทานบทและกดยืนยันอนุมัติ (Director Sign-off) ระบบจะปลดล็อกปุ่ม 'ส่งออก Prompt ถ่ายทำอัตโนมัติ (1-Click Ready Prompts)' สังเคราะห์ครบ 8 มิติ (มุมกล้อง 9:16, ตัวละคร, เสื้อผ้า, เสียงพากย์, ท่าทาง, การเคลื่อนไหวธรรมชาติ, ฉาก, และความต่อเนื่อง) พร้อมกดสร้างใน Kling, Runway, Hailuo, Luma หรือ Wan 2.1 ได้ทันที"
        }
      ],
      route: '/qa',
      routeLabel: 'ไปที่หน้าตรวจทาน (Dual QA Gate)'
    },
    {
      id: 6,
      title: "6. แฟ้มนำเสนอ & ส่งออก (Commercial Pitch & Export)",
      badge: "Pitch Deck Ready & Master Files",
      icon: Download,
      summary: "สร้างเอกสารนำเสนอระดับผู้บริหาร คาดการณ์ผลตอบแทน (ROI) และดาวน์โหลดผลงาน",
      content: [
        {
          heading: "Executive Pitch Deck อัตโนมัติ:",
          desc: "ระบบรวบรวม Logline, เรื่องย่อ, นักแสดง, ภาพฉากสำคัญ, และแบรนด์สปอนเซอร์ ออกมาเป็นแฟ้มนำเสนอสำหรับเสนอขายสตรีมมิ่งหรือนายทุน"
        },
        {
          heading: "การคาดการณ์ยอดชมและรายได้ (ROI Projection):",
          desc: "ประเมินคะแนนความไวรัล (Viral Score 98.2%) และประมาณการยอดรับชมรวมกว่า 120 ล้านวิวบนแพลตฟอร์มแนวตั้ง"
        },
        {
          heading: "ดาวน์โหลดเอกสาร (Export PDF):",
          desc: "กดคลิกเดียวเพื่อดาวน์โหลดเอกสารหรือแชร์ Pitch Link ให้กับพาร์ตเนอร์ทางธุรกิจ"
        }
      ],
      route: '/pitch',
      routeLabel: 'ไปที่หน้า Pitch Deck & Export'
    }
  ];

  const currentStepData = steps.find(s => s.id === activeStep) || steps[0];
  const StepIcon = currentStepData.icon;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999999,
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
          background: 'rgba(25, 20, 15, 0.72)',
          backdropFilter: 'blur(8px)'
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
        maxWidth: '1020px',
        height: '88vh',
        maxHeight: '90vh',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        
        {/* Top Header */}
        <div style={{
          padding: '16px 24px',
          background: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-teal-btn)'
            }}>
              <BookOpen size={20} strokeWidth={2.2} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h2 style={{ fontSize: '1.2rem', margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>
                  คู่มือการใช้งานระบบ SeriesX Studio (Workflow & User Manual)
                </h2>
                <span className="badge badge-teal" style={{ fontSize: '0.68rem' }}>
                  6-Step Pipeline
                </span>
              </div>
              <p style={{ margin: '2px 0 0 0', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                เรียนรู้วิธีผลิตซีรีส์แนวตั้ง 9:16 จากนิยายตัวหนังสือ สู่คลิปวิดีโอพร้อมเสียงพากย์ใน 6 ขั้นตอน
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

        {/* Horizontal Step Tabs Navigator */}
        <div style={{
          display: 'flex',
          background: 'var(--bg-inset)',
          padding: '8px 16px',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto',
          gap: '8px'
        }}>
          {steps.map(step => {
            const isCurrent = step.id === activeStep;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActiveStep(step.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-pill)',
                  border: isCurrent ? '1.5px solid var(--teal-primary)' : '1px solid transparent',
                  background: isCurrent ? 'var(--bg-raised)' : 'transparent',
                  color: isCurrent ? 'var(--teal-primary)' : 'var(--text-main)',
                  fontWeight: isCurrent ? 800 : 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isCurrent ? 'var(--shadow-raised-sm)' : 'none',
                  transition: 'all 0.15s ease'
                }}
              >
                <Icon size={14} strokeWidth={isCurrent ? 2.5 : 2} />
                <span>{step.id}. {step.title.split('(')[0].replace(/^\d+\.\s*/, '')}</span>
              </button>
            );
          })}
        </div>

        {/* Main Body */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          background: 'var(--bg-base)'
        }}>
          {/* Step Header Banner */}
          <div style={{
            background: 'var(--bg-raised)',
            padding: '20px 24px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-raised-sm)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(11, 74, 81, 0.08)',
                color: 'var(--teal-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <StepIcon size={24} strokeWidth={2.2} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
                    {currentStepData.title}
                  </h3>
                  <span className="badge badge-sand" style={{ fontSize: '0.7rem' }}>
                    {currentStepData.badge}
                  </span>
                </div>
                <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  {currentStepData.summary}
                </p>
              </div>
            </div>

            {/* Direct Jump Button */}
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onNavigateTab) onNavigateTab(currentStepData.route);
              }}
              className="btn-primary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 18px',
                fontSize: '0.82rem',
                fontWeight: 700
              }}
            >
              <span>{currentStepData.routeLabel}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          {/* Cards of details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {currentStepData.content.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--bg-raised)',
                  padding: '18px 22px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: 'var(--shadow-raised-sm)',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start'
                }}
              >
                <div style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--teal-primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  flexShrink: 0,
                  marginTop: '2px'
                }}>
                  {idx + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '0.96rem', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 6px 0' }}>
                    {item.heading}
                  </h4>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Workflow Diagram Banner */}
          <div style={{
            background: 'rgba(11, 74, 81, 0.04)',
            border: '1.5px dashed var(--teal-primary)',
            borderRadius: 'var(--radius-md)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Sparkles size={20} color="var(--teal-primary)" />
              <div>
                <strong style={{ fontSize: '0.86rem', color: 'var(--teal-primary)', display: 'block' }}>
                  เคล็ดลับการทำงานเร็ว (Pro-Tip):
                </strong>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  ในหน้าเขียนนิยาย สามารถพิมพ์เนื้อเรื่องรวดเดียว แล้วกดปุ่ม <strong>"ตรวจจับผู้พูด & แปลงบทซีรีส์"</strong> ระบบจะพาคุณข้ามมาถึงขั้นที่ 4 วิดีโอได้ภายใน 30 วินาที!
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div style={{
          padding: '14px 24px',
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <button
            type="button"
            onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              fontSize: '0.82rem',
              opacity: activeStep === 1 ? 0.4 : 1,
              cursor: activeStep === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <ArrowLeft size={14} />
            <span>ขั้นตอนก่อนหน้า</span>
          </button>

          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ขั้นตอนที่ <strong style={{ color: 'var(--teal-primary)' }}>{activeStep}</strong> จาก 6
          </div>

          <button
            type="button"
            onClick={() => {
              if (activeStep < 6) {
                setActiveStep(prev => prev + 1);
              } else {
                onClose();
              }
            }}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              fontSize: '0.82rem'
            }}
          >
            <span>{activeStep < 6 ? 'ขั้นตอนถัดไป' : 'เข้าใจแล้ว / ปิดคู่มือ'}</span>
            <ArrowRight size={14} />
          </button>
        </div>

      </div>
    </div>
  );
}
