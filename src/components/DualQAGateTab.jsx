import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Send, History, Check, Clock, UserCheck, Bot, Sparkles } from 'lucide-react';

export default function DualQAGateTab({ qaReport, onDirectorApprove, isApproved }) {
  const [directorNotes, setDirectorNotes] = useState(qaReport.directorReview.directorNote);
  const [newFeedback, setNewFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState(qaReport.directorReview.revisionHistory);
  const [actionNotice, setActionNotice] = useState('');

  const handleAddFeedback = (e) => {
    e.preventDefault();
    if (!newFeedback.trim()) return;

    const newEntry = {
      version: `v1.${feedbackList.length}`,
      date: new Date().toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' วันนี้',
      author: 'ผู้กำกับ ณัฐวุฒิ (Director)',
      note: newFeedback
    };

    setFeedbackList([newEntry, ...feedbackList]);
    setNewFeedback('');
    setActionNotice('บันทึกข้อเสนอแนะและส่งต่อให้แผนกที่เกี่ยวข้องเรียบร้อยแล้ว');
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleApprove = () => {
    onDirectorApprove();
    setActionNotice('ผู้กำกับยืนยันอนุมัติ (Director Sign-off) ปลดล็อกขั้นตอนผลิต Master Export สำเร็จ');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Banner: Dual QA Workflow Status */}
      <div className="clay-card" style={{
        padding: '24px',
        borderLeft: isApproved ? '5px solid var(--accent-green)' : '5px solid var(--accent-amber)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={26} strokeWidth={2} color={isApproved ? 'var(--accent-green)' : 'var(--accent-amber)'} />
              <div>
                <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                  ระบบตรวจทาน 2 ชั้น (Dual-Layer Quality Assurance System)
                </h2>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                  ชั้นที่ 1: AI Auto-Auditor (ผ่าน 100%) &bull; ชั้นที่ 2: Human Director Review Gate (การเซ็นอนุมัติโดยมนุษย์)
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>คะแนน AI รวม:</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--teal-primary)', fontFamily: 'var(--font-display)' }}>
                {qaReport.overallScore}%
              </div>
            </div>
            {isApproved ? (
              <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '8px 14px' }}>
                <CheckCircle2 size={16} strokeWidth={2} /> DIRECTOR APPROVED
              </span>
            ) : (
              <span className="badge badge-amber" style={{ fontSize: '0.82rem', padding: '8px 14px' }}>
                <Clock size={16} strokeWidth={2} /> AWAITING DIRECTOR APPROVAL
              </span>
            )}
          </div>
        </div>
      </div>

      {actionNotice && (
        <div style={{
          padding: '12px 18px',
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-green-bg)',
          border: '1px solid rgba(31, 122, 89, 0.4)',
          color: 'var(--accent-green)',
          fontSize: '0.88rem',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <CheckCircle2 size={18} strokeWidth={2} />
          <span>{actionNotice}</span>
        </div>
      )}

      {/* Main Dual Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Layer 1: AI Auto-Auditor Checks */}
        <div className="clay-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Bot size={18} strokeWidth={2} color="var(--teal-primary)" />
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                ชั้นที่ 1: รายงานตรวจทานอัตโนมัติ (AI Auto-Auditor)
              </h3>
            </div>
            <span className="badge badge-teal">5/5 Checks Passed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {qaReport.checks.map(chk => (
              <div
                key={chk.id}
                style={{
                  background: 'var(--bg-inset)',
                  boxShadow: 'var(--shadow-inset)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-main)' }}>
                    {chk.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                      {chk.score}%
                    </span>
                    <span className="badge badge-green" style={{ fontSize: '0.65rem' }}>{chk.status}</span>
                  </div>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>
                  {chk.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Layer 2: Human Director Review Gate */}
        <div className="clay-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserCheck size={18} strokeWidth={2} color="var(--teal-primary)" />
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                ชั้นที่ 2: Human Director Review Gate
              </h3>
            </div>
            <span className="badge badge-sand">Executive Decision</span>
          </div>

          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-raised-sm)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <UserCheck size={18} strokeWidth={2} color="var(--teal-primary)" />
              <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>ผู้ตรวจทาน: ณัฐวุฒิ (Supervising Director)</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
              "{directorNotes}"
            </p>
          </div>

          {/* Action Approval Buttons (Image 2 style: Deep Teal Capsule) */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={handleApprove}
              disabled={isApproved}
              className="btn-primary"
              style={{
                flex: 1,
                padding: '12px',
                background: isApproved ? 'var(--accent-green)' : 'var(--teal-primary)',
                opacity: isApproved ? 0.9 : 1
              }}
            >
              <CheckCircle2 size={18} strokeWidth={2} />
              <span>{isApproved ? 'อนุมัติเรียบร้อย (Approved)' : 'ยืนยันอนุมัติงาน (Approve & Lock)'}</span>
            </button>
          </div>

          {/* Conflict Resolution & Revision Comment System */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: '0 0 10px 0', fontWeight: 700 }}>
              ส่งข้อเสนอแนะเพื่อสั่งปรับแต่ง (Request Revision / Settle Conflict)
            </h4>

            <form onSubmit={handleAddFeedback} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="ระบุจุดที่ต้องการให้ AI ปรับแก้ เช่น [00:15] ขอเพิ่มเงาสะท้อนกระจก..."
                className="clay-input"
                style={{ flex: 1, padding: '9px 14px', fontSize: '0.82rem' }}
              />
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '9px 18px' }}
              >
                <Send size={14} strokeWidth={2} />
                <span>บันทึก</span>
              </button>
            </form>

            {/* Audit History & Version Log */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 600 }}>
                ประวัติการตรวจทานและแก้ไข (Revision Audit Log):
              </span>
              {feedbackList.map((entry, idx) => (
                <div
                  key={idx}
                  style={{
                    background: 'var(--bg-inset)',
                    boxShadow: 'var(--shadow-inset)',
                    border: '1px solid var(--border-subtle)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.78rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--teal-primary)', fontWeight: 600 }}>
                    <span>{entry.version} &bull; {entry.author}</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>{entry.date}</span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', color: 'var(--text-main)' }}>{entry.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
