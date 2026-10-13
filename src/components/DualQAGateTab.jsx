import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, FileText, Send, History, Check, Clock, UserCheck } from 'lucide-react';

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
    setActionNotice('✅ บันทึกข้อเสนอแนะและส่งต่อให้แผนกที่เกี่ยวข้องเรียบร้อยแล้ว');
    setTimeout(() => setActionNotice(''), 4000);
  };

  const handleApprove = () => {
    onDirectorApprove();
    setActionNotice('🎉 ผู้กำกับยืนยันอนุมัติ (Director Sign-off) ปลดล็อกขั้นตอนผลิต Master Export สำเร็จ!');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Banner: Dual QA Workflow Status */}
      <div className="glass-panel" style={{
        padding: '24px',
        borderLeft: isApproved ? '4px solid #10b981' : '4px solid #f59e0b',
        background: isApproved
          ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(6, 182, 212, 0.05))'
          : 'linear-gradient(135deg, rgba(245, 158, 11, 0.1), rgba(244, 63, 94, 0.05))'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={26} color={isApproved ? '#34d399' : '#fbbf24'} />
              <div>
                <h2 style={{ fontSize: '1.25rem', color: '#ffffff', margin: 0 }}>
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
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', fontFamily: 'var(--font-display)' }}>
                {qaReport.overallScore}%
              </div>
            </div>
            {isApproved ? (
              <span className="badge badge-green" style={{ fontSize: '0.85rem', padding: '8px 14px' }}>
                <CheckCircle2 size={16} /> DIRECTOR APPROVED
              </span>
            ) : (
              <span className="badge badge-amber" style={{ fontSize: '0.85rem', padding: '8px 14px' }}>
                <Clock size={16} /> AWAITING DIRECTOR APPROVAL
              </span>
            )}
          </div>
        </div>
      </div>

      {actionNotice && (
        <div style={{
          padding: '12px 18px',
          borderRadius: '10px',
          background: 'rgba(16, 185, 129, 0.2)',
          border: '1px solid rgba(16, 185, 129, 0.5)',
          color: '#34d399',
          fontSize: '0.9rem',
          fontWeight: 600
        }}>
          {actionNotice}
        </div>
      )}

      {/* Main Dual Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Layer 1: AI Auto-Auditor Checks */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
              🤖 ชั้นที่ 1: รายงานตรวจทานอัตโนมัติ (AI Auto-Auditor)
            </h3>
            <span className="badge badge-green">5/5 Checks Passed</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {qaReport.checks.map(chk => (
              <div
                key={chk.id}
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '10px',
                  padding: '14px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#f8fafc' }}>
                    {chk.category}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#34d399' }}>
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
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
              👤 ชั้นที่ 2: Human Director Review Gate
            </h3>
            <span className="badge badge-blue">Executive Decision</span>
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.35)',
            borderRadius: '10px',
            padding: '16px',
            border: '1px solid var(--border-subtle)',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <UserCheck size={18} color="#60a5fa" />
              <strong style={{ fontSize: '0.9rem', color: '#fff' }}>ผู้ตรวจทาน: ณัฐวุฒิ (Supervising Director)</strong>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
              "{directorNotes}"
            </p>
          </div>

          {/* Action Approval / Reject Buttons */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            <button
              onClick={handleApprove}
              disabled={isApproved}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                background: isApproved ? 'rgba(16, 185, 129, 0.2)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                border: isApproved ? '1px solid #10b981' : 'none',
                boxShadow: isApproved ? 'none' : '0 0 20px rgba(16, 185, 129, 0.4)'
              }}
            >
              <CheckCircle2 size={18} />
              {isApproved ? 'อนุมัติเรียบร้อย (Approved)' : 'ยืนยันอนุมัติงาน (Approve & Lock)'}
            </button>
          </div>

          {/* Conflict Resolution & Revision Comment System */}
          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '16px' }}>
            <h4 style={{ fontSize: '0.9rem', color: '#ffffff', margin: '0 0 10px 0' }}>
              💬 ส่งข้อเสนอแนะเพื่อสั่งปรับแต่ง (Request Revision / Settle Conflict)
            </h4>

            <form onSubmit={handleAddFeedback} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                value={newFeedback}
                onChange={(e) => setNewFeedback(e.target.value)}
                placeholder="ระบุจุดที่ต้องการให้ AI ปรับแก้ เช่น [00:15] ขอเพิ่มเงาสะท้อนกระจก..."
                style={{
                  flex: 1,
                  background: 'rgba(8, 9, 13, 0.7)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.82rem'
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '8px 14px',
                  borderRadius: '6px',
                  background: '#f43f5e',
                  color: '#fff',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Send size={14} />
                บันทึก
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
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid var(--border-subtle)',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    fontSize: '0.78rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#fb7185', fontWeight: 600 }}>
                    <span>{entry.version} &bull; {entry.author}</span>
                    <span style={{ color: 'var(--text-dim)', fontSize: '0.7rem' }}>{entry.date}</span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', color: '#cbd5e1' }}>{entry.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
