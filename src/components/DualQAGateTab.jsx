import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, FileText, Send, History, Check, Clock, 
  UserCheck, Bot, Sparkles, Video, Play, Copy, ArrowRight, Users, Layers, AlertCircle, 
  Calendar, Filter, MessageSquare, Flame, TrendingUp, Sliders, ChevronDown, CheckSquare
} from 'lucide-react';
import ProductionPromptModal from './ProductionPromptModal';
import { 
  PRODUCTION_ROLES, 
  INITIAL_DEPARTMENT_TASKS, 
  INITIAL_DEPARTMENT_COMMENTS 
} from '../data/departmentWorkflowData';

export default function DualQAGateTab({ qaReport, onDirectorApprove, isApproved, series = {} }) {
  const [directorNotes, setDirectorNotes] = useState(qaReport.directorReview?.directorNote || 'การแสดงในภาพรวมเข้มข้นตรงตามวิสัยทัศน์');
  const [actionNotice, setActionNotice] = useState('');
  const [showPromptModal, setShowPromptModal] = useState(false);

  // Active QA sub-tab: 'qa-gate' | 'tasks-sla' | 'comments'
  const [activeSubView, setActiveSubView] = useState('tasks-sla');

  // Roles & Tasks State
  const [selectedRoleFilter, setSelectedRoleFilter] = useState('all');
  const [taskStatusFilter, setTaskStatusFilter] = useState('all'); // 'all', 'OVERDUE', 'IN_PROGRESS', 'COMPLETED'
  const [tasks, setTasks] = useState(INITIAL_DEPARTMENT_TASKS);

  // Comments & Feedback State
  const [comments, setComments] = useState(INITIAL_DEPARTMENT_COMMENTS);
  const [selectedPostRole, setSelectedPostRole] = useState('director');
  const [selectedTarget, setSelectedTarget] = useState('Shot 01: [00:00 - 00:04]');
  const [selectedReviewOutcome, setSelectedReviewOutcome] = useState('PASS'); // 'PASS', 'NEEDS_REVISION', 'INFO'
  const [newCommentText, setNewCommentText] = useState('');

  // Handle posting a new cross-department comment
  const handlePostComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const roleObj = PRODUCTION_ROLES.find(r => r.id === selectedPostRole) || PRODUCTION_ROLES[0];
    const now = new Date();
    const formattedDate = `วันนี้ ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;

    const newComment = {
      id: `cmt-${Date.now()}`,
      author: `${roleObj.leadName}`,
      roleId: roleObj.id,
      target: selectedTarget,
      status: selectedReviewOutcome,
      date: formattedDate,
      text: newCommentText.trim(),
      pinned: selectedReviewOutcome === 'NEEDS_REVISION'
    };

    setComments([newComment, ...comments]);
    setNewCommentText('');
    setActionNotice(`บันทึกคอมเมนต์ในฐานะ "${roleObj.leadName}" สำเร็จ และแจ้งเตือนฝ่ายที่เกี่ยวข้องแล้ว`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  // Toggle task review status (Quick check: Pass vs Needs Revision)
  const handleToggleTaskStatus = (taskId, newReviewStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        const isDone = newReviewStatus === 'PASS';
        return {
          ...t,
          reviewStatus: newReviewStatus,
          status: isDone ? 'COMPLETED' : t.isOverdue ? 'OVERDUE' : 'IN_PROGRESS',
          progress: isDone ? 100 : Math.max(t.progress, 65)
        };
      }
      return t;
    }));
    setActionNotice(`อัปเดตผลตรวจงานเป็น "${newReviewStatus === 'PASS' ? 'ผ่าน (PASS)' : 'ไม่ผ่าน ต้องแก้ไข'}" เรียบร้อยแล้ว`);
    setTimeout(() => setActionNotice(''), 3000);
  };

  const handleApprove = () => {
    onDirectorApprove();
    setActionNotice('ผู้กำกับยืนยันอนุมัติ (Director Sign-off) ปลดล็อกชุด Prompt ผลิตคลิปอัตโนมัติสำเร็จ!');
    setShowPromptModal(true);
  };

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesRole = selectedRoleFilter === 'all' || task.deptId === selectedRoleFilter;
    const matchesStatus = taskStatusFilter === 'all' || task.status === taskStatusFilter;
    return matchesRole && matchesStatus;
  });

  // Calculate task summary metrics
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter(t => t.status === 'COMPLETED').length;
  const inProgressTasksCount = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const overdueTasksCount = tasks.filter(t => t.status === 'OVERDUE').length;
  const passedReviewsCount = tasks.filter(t => t.reviewStatus === 'PASS').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '20px 0' }}>
      
      {/* Top Banner: Dual QA & Department Coordination Center */}
      <div className="clay-card" style={{
        padding: '24px',
        borderLeft: isApproved ? '5px solid var(--accent-green)' : '5px solid var(--accent-amber)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={28} strokeWidth={2.2} color={isApproved ? 'var(--accent-green)' : 'var(--accent-amber)'} />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <h2 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    ศูนย์ตรวจทานคุณภาพ & ประสานงานทุกฝ่าย (Cross-Department QA & Workflow)
                  </h2>
                  <span className="badge badge-teal" style={{ fontSize: '0.72rem' }}>
                    {PRODUCTION_ROLES.length} ฝ่ายประสานงาน
                  </span>
                </div>
                <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                  เช็กงานผ่าน/ไม่ผ่าน &bull; คอมเมนต์เจาะลึกรายฝ่าย &bull; ติดตามงานที่เสร็จแล้ว / กำลังทำ / เกินเวลาส่ง (SLA Overdue) &bull; เซ็นอนุมัติไฟนอล
                </p>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>คะแนน AI รวม:</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--teal-primary)', fontFamily: 'var(--font-display)' }}>
                {qaReport.overallScore}%
              </div>
            </div>

            <button
              onClick={() => setShowPromptModal(true)}
              className="btn-secondary"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                fontSize: '0.84rem',
                borderColor: 'var(--teal-primary)',
                color: 'var(--teal-primary)',
                fontWeight: 700
              }}
              title="เปิดชุด Prompt ผลิตคลิปวิดีโอ 9:16 ที่สังเคราะห์ครบทั้ง 8 เสาหลัก"
            >
              <Sparkles size={16} strokeWidth={2.2} />
              <span>ดู Prompt ถ่ายทำ (8 มิติ)</span>
            </button>

            {isApproved ? (
              <span className="badge badge-green" style={{ fontSize: '0.82rem', padding: '9px 14px' }}>
                <CheckCircle2 size={16} strokeWidth={2} /> DIRECTOR APPROVED
              </span>
            ) : (
              <button
                onClick={handleApprove}
                className="btn-primary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 18px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  boxShadow: 'var(--shadow-teal-btn)'
                }}
              >
                <CheckCircle2 size={16} strokeWidth={2} />
                <span>ยืนยันอนุมัติงาน (Approve & Lock)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Action Notification Alert */}
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

      {/* Navigation Sub-Tabs Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px',
        background: 'var(--bg-surface)',
        padding: '8px 16px',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-subtle)',
        boxShadow: 'var(--shadow-raised-sm)'
      }}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveSubView('tasks-sla')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: activeSubView === 'tasks-sla' ? 'var(--teal-primary)' : 'transparent',
              color: activeSubView === 'tasks-sla' ? '#FFFFFF' : 'var(--text-main)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <CheckSquare size={16} />
            <span>กระดานติดตามงาน & กำหนดส่ง (Tasks & SLA)</span>
            {overdueTasksCount > 0 && (
              <span style={{
                background: '#DC2626',
                color: '#FFF',
                padding: '1px 6px',
                borderRadius: 'var(--radius-pill)',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {overdueTasksCount} เกินกำหนด
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSubView('comments')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: activeSubView === 'comments' ? 'var(--teal-primary)' : 'transparent',
              color: activeSubView === 'comments' ? '#FFFFFF' : 'var(--text-main)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <MessageSquare size={16} />
            <span>คอมเมนต์ & ตรวจงานรายฝ่าย ({comments.length})</span>
          </button>

          <button
            onClick={() => setActiveSubView('qa-gate')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              borderRadius: 'var(--radius-pill)',
              border: 'none',
              background: activeSubView === 'qa-gate' ? 'var(--teal-primary)' : 'transparent',
              color: activeSubView === 'qa-gate' ? '#FFFFFF' : 'var(--text-main)',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
          >
            <Bot size={16} />
            <span>รายงานตรวจ 2 ชั้น (AI Auditor & Director)</span>
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          <span>เสร็จแล้ว {completedTasksCount}/{totalTasksCount} งาน</span>
          <span>&bull;</span>
          <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>ผ่านการตรวจ {passedReviewsCount} งาน</span>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-VIEW 1: DEPARTMENT TASKS & SLA TRACKING BOARD (เสร็จ / กำลังทำ / เกินเวลา) */}
      {/* ========================================================================= */}
      {activeSubView === 'tasks-sla' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Summary Metric Counters (4 Cards) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '16px'
          }}>
            {/* Total Tasks */}
            <div 
              onClick={() => setTaskStatusFilter('all')}
              className="clay-card" 
              style={{ 
                padding: '18px 20px', 
                cursor: 'pointer',
                border: taskStatusFilter === 'all' ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>งานทั้งหมดในรอบผลิต</span>
                <Layers size={18} color="var(--teal-primary)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
                {totalTasksCount} งาน
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-dim)' }}>กระจายครบทั้ง 7 ฝ่ายผลิต</span>
            </div>

            {/* Completed */}
            <div 
              onClick={() => setTaskStatusFilter('COMPLETED')}
              className="clay-card" 
              style={{ 
                padding: '18px 20px', 
                cursor: 'pointer',
                border: taskStatusFilter === 'COMPLETED' ? '2px solid var(--accent-green)' : '1px solid var(--border-subtle)' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-green)', fontWeight: 600 }}>ทำเสร็จแล้ว (Done)</span>
                <CheckCircle2 size={18} color="var(--accent-green)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-green)', fontFamily: 'var(--font-display)' }}>
                {completedTasksCount} งาน
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>ส่งมอบงานตรงตามกำหนดเวลา 100%</span>
            </div>

            {/* In Progress */}
            <div 
              onClick={() => setTaskStatusFilter('IN_PROGRESS')}
              className="clay-card" 
              style={{ 
                padding: '18px 20px', 
                cursor: 'pointer',
                border: taskStatusFilter === 'IN_PROGRESS' ? '2px solid var(--accent-amber)' : '1px solid var(--border-subtle)' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-amber)', fontWeight: 600 }}>กำลังทำ (In Progress)</span>
                <Clock size={18} color="var(--accent-amber)" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--accent-amber)', fontFamily: 'var(--font-display)' }}>
                {inProgressTasksCount} งาน
              </div>
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>อยู่ในกำหนด SLA ปกติ</span>
            </div>

            {/* Overdue (Delayed Warning) */}
            <div 
              onClick={() => setTaskStatusFilter('OVERDUE')}
              className="clay-card" 
              style={{ 
                padding: '18px 20px', 
                cursor: 'pointer',
                background: overdueTasksCount > 0 ? 'rgba(220, 38, 38, 0.04)' : 'var(--bg-surface)',
                border: taskStatusFilter === 'OVERDUE' ? '2px solid #DC2626' : '1.5px solid rgba(220, 38, 38, 0.3)' 
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8rem', color: '#DC2626', fontWeight: 700 }}>เกินเวลาส่งแล้ว (Overdue)</span>
                <AlertTriangle size={18} color="#DC2626" />
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#DC2626', fontFamily: 'var(--font-display)' }}>
                {overdueTasksCount} งาน ⚠️
              </div>
              <span style={{ fontSize: '0.74rem', color: '#DC2626', fontWeight: 600 }}>ต้องเร่งประสานงานแก้ไขด่วน</span>
            </div>
          </div>

          {/* Department Roles Filter Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexWrap: 'wrap',
            background: 'var(--bg-surface)',
            padding: '12px 18px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-subtle)'
          }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Users size={15} /> กรองตามฝ่าย (Department Role):
            </span>

            <button
              onClick={() => setSelectedRoleFilter('all')}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                border: selectedRoleFilter === 'all' ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                background: selectedRoleFilter === 'all' ? 'var(--teal-primary)' : 'transparent',
                color: selectedRoleFilter === 'all' ? '#FFFFFF' : 'var(--text-main)',
                fontSize: '0.76rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ทุกฝ่าย ({tasks.length})
            </button>

            {PRODUCTION_ROLES.map(role => {
              const isSelected = selectedRoleFilter === role.id;
              const roleTasksCount = tasks.filter(t => t.deptId === role.id).length;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRoleFilter(role.id)}
                  style={{
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-pill)',
                    border: isSelected ? `1.5px solid ${role.color}` : '1px solid var(--border-subtle)',
                    background: isSelected ? role.color : 'transparent',
                    color: isSelected ? '#FFFFFF' : 'var(--text-main)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {role.label} ({roleTasksCount})
                </button>
              );
            })}
          </div>

          {/* Tasks Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
            {filteredTasks.map(task => {
              const roleObj = PRODUCTION_ROLES.find(r => r.id === task.deptId) || PRODUCTION_ROLES[0];
              const isPass = task.reviewStatus === 'PASS';
              const isNeedsRevision = task.reviewStatus === 'NEEDS_REVISION';
              const isPending = task.reviewStatus === 'PENDING';

              return (
                <div
                  key={task.id}
                  className="clay-card"
                  style={{
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderLeft: task.isOverdue 
                      ? '5px solid #DC2626' 
                      : isPass 
                      ? '5px solid var(--accent-green)' 
                      : '5px solid var(--accent-amber)',
                    background: task.isOverdue ? '#FFFDFD' : 'var(--bg-surface)'
                  }}
                >
                  <div>
                    {/* Header: Dept Badge & Review Status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                      <span style={{
                        padding: '3px 9px',
                        borderRadius: 'var(--radius-pill)',
                        background: roleObj.color,
                        color: '#FFFFFF',
                        fontSize: '0.7rem',
                        fontWeight: 700
                      }}>
                        {roleObj.label} &bull; {task.assignee}
                      </span>

                      {/* Review Outcome Badge */}
                      {isPass && (
                        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                          <Check size={12} strokeWidth={2.5} /> ผ่าน (PASS)
                        </span>
                      )}
                      {isNeedsRevision && (
                        <span style={{
                          background: '#FEE2E2',
                          color: '#DC2626',
                          border: '1px solid #FCA5A5',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          <AlertTriangle size={12} /> ไม่ผ่าน (ต้องแก้)
                        </span>
                      )}
                      {isPending && (
                        <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>
                          <Clock size={12} /> รอตรวจสอบ
                        </span>
                      )}
                    </div>

                    {/* Task Title */}
                    <h4 style={{ fontSize: '0.96rem', color: 'var(--text-main)', margin: '0 0 6px 0', fontWeight: 700, lineHeight: 1.4 }}>
                      {task.title}
                    </h4>

                    {/* Target deliverable */}
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginBottom: '12px' }}>
                      ชิ้นงานเป้าหมาย: <strong style={{ color: 'var(--text-muted)' }}>{task.target}</strong>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ marginBottom: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        <span>ความคืบหน้า</span>
                        <span style={{ fontWeight: 700, color: task.progress === 100 ? 'var(--accent-green)' : 'var(--teal-primary)' }}>
                          {task.progress}%
                        </span>
                      </div>
                      <div style={{ height: '6px', background: 'var(--bg-inset)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${task.progress}%`,
                          height: '100%',
                          background: task.isOverdue ? '#DC2626' : task.progress === 100 ? 'var(--accent-green)' : 'var(--teal-primary)',
                          transition: 'width 0.3s'
                        }} />
                      </div>
                    </div>

                    {/* Deadline & Overdue Alert */}
                    <div style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: task.isOverdue ? '#FEF2F2' : 'var(--bg-inset)',
                      border: task.isOverdue ? '1px solid #FECACA' : '1px solid var(--border-subtle)',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '0.76rem',
                      color: task.isOverdue ? '#DC2626' : 'var(--text-main)'
                    }}>
                      <Calendar size={14} color={task.isOverdue ? '#DC2626' : 'var(--text-muted)'} />
                      <div>
                        <strong>กำหนดส่ง:</strong> {task.deadlineDisplay}
                      </div>
                    </div>

                    {/* Latest Comment Snippet */}
                    {task.lastComment && (
                      <div style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '10px 12px',
                        fontSize: '0.76rem',
                        marginBottom: '14px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--teal-primary)', fontWeight: 600, marginBottom: '2px' }}>
                          <span>{task.lastComment.author}</span>
                          <span style={{ color: 'var(--text-dim)', fontSize: '0.68rem' }}>{task.lastComment.date}</span>
                        </div>
                        <p style={{ margin: 0, color: 'var(--text-main)', fontStyle: 'italic', lineHeight: 1.4 }}>
                          "{task.lastComment.text}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action: Quick Toggle Review Outcome */}
                  <div style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      เปลี่ยนผลตรวจ:
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleToggleTaskStatus(task.id, 'PASS')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: isPass ? '1.5px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                          background: isPass ? 'var(--accent-green)' : 'var(--bg-raised)',
                          color: isPass ? '#FFFFFF' : 'var(--accent-green)',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        ✓ ให้ผ่าน
                      </button>

                      <button
                        onClick={() => handleToggleTaskStatus(task.id, 'NEEDS_REVISION')}
                        style={{
                          padding: '4px 10px',
                          borderRadius: 'var(--radius-sm)',
                          border: isNeedsRevision ? '1.5px solid #DC2626' : '1px solid var(--border-subtle)',
                          background: isNeedsRevision ? '#DC2626' : 'var(--bg-raised)',
                          color: isNeedsRevision ? '#FFFFFF' : '#DC2626',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        ✕ ให้แก้
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 2: CROSS-DEPARTMENT COMMENTS & DISCUSSION STREAM */}
      {/* ========================================================================= */}
      {activeSubView === 'comments' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px' }}>
          
          {/* Left Column: Comments Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                ประวัติความคิดเห็น & คำสั่งปรับแต่งงานทุกฝ่าย ({comments.length} รายการ)
              </h3>
              <span className="badge badge-teal">ระบุตัวตนและสถานะครบถ้วน</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {comments.map((cmt) => {
                const roleObj = PRODUCTION_ROLES.find(r => r.id === cmt.roleId) || PRODUCTION_ROLES[0];
                const isPass = cmt.status === 'PASS';
                const isNeedsRevision = cmt.status === 'NEEDS_REVISION';

                return (
                  <div
                    key={cmt.id}
                    className="clay-card"
                    style={{
                      padding: '16px 20px',
                      borderLeft: isPass 
                        ? '4px solid var(--accent-green)' 
                        : isNeedsRevision 
                        ? '4px solid #DC2626' 
                        : '4px solid var(--teal-primary)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          padding: '3px 10px',
                          borderRadius: 'var(--radius-pill)',
                          background: roleObj.color,
                          color: '#FFFFFF',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}>
                          {cmt.author} &bull; {roleObj.label}
                        </span>

                        <span style={{ fontSize: '0.76rem', color: 'var(--text-dim)' }}>
                          {cmt.date}
                        </span>
                      </div>

                      {/* Status Tag */}
                      {isPass && (
                        <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>
                          <Check size={12} strokeWidth={2.5} /> ผ่านการตรวจ
                        </span>
                      )}
                      {isNeedsRevision && (
                        <span style={{
                          background: '#FEE2E2',
                          color: '#DC2626',
                          border: '1px solid #FCA5A5',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.7rem',
                          fontWeight: 700
                        }}>
                          ⚠️ สั่งแก้ไขด่วน
                        </span>
                      )}
                      {cmt.status === 'INFO' && (
                        <span className="badge badge-teal-subtle" style={{ fontSize: '0.7rem' }}>
                          ข้อเสนอแนะ
                        </span>
                      )}
                    </div>

                    {/* Target Item Reference */}
                    <div style={{ fontSize: '0.78rem', color: 'var(--teal-primary)', fontWeight: 600, marginBottom: '6px' }}>
                      เป้าหมาย: {cmt.target}
                    </div>

                    {/* Comment Body */}
                    <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--text-main)', lineHeight: 1.55 }}>
                      {cmt.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Interactive Comment & Review Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="clay-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--teal-primary)' }}>
                <Send size={18} strokeWidth={2} />
                <h4 style={{ fontSize: '0.98rem', margin: 0, color: 'var(--text-main)', fontWeight: 700 }}>
                  ส่งข้อเสนอแนะในฐานะฝ่ายของคุณ
                </h4>
              </div>

              <form onSubmit={handlePostComment} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Select Role */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    เลือกบทบาทพนักงาน (Post as Role):
                  </label>
                  <select
                    value={selectedPostRole}
                    onChange={(e) => setSelectedPostRole(e.target.value)}
                    className="clay-input"
                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.82rem', background: '#FFFFFF' }}
                  >
                    {PRODUCTION_ROLES.map(role => (
                      <option key={role.id} value={role.id}>
                        {role.label} — {role.leadName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Target Deliverable */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    ชิ้นงานที่ต้องการคอมเมนต์ (Target Deliverable):
                  </label>
                  <select
                    value={selectedTarget}
                    onChange={(e) => setSelectedTarget(e.target.value)}
                    className="clay-input"
                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.82rem', background: '#FFFFFF' }}
                  >
                    <option value="Shot 01: [00:00 - 00:04] น้ำตานางเอก">Shot 01: [00:00 - 00:04] น้ำตานางเอก</option>
                    <option value="Shot 02: [00:04 - 00:15] Low Angle พระเอก">Shot 02: [00:04 - 00:15] Low Angle พระเอก</option>
                    <option value="Shot 03: [00:15 - 00:35] วางขวดเซรั่มสปอนเซอร์">Shot 03: [00:15 - 00:35] วางขวดเซรั่มสปอนเซอร์</option>
                    <option value="Shot 04: [00:35 - 01:10] ฉากไฟดับ & ไซเรน">Shot 04: [00:35 - 01:10] ฉากไฟดับ & ไซเรน</option>
                    <option value="Character Bible & LoRA Consistency">Character Bible & LoRA Consistency</option>
                    <option value="Voice & Dialogue Stems (เสียงพากย์)">Voice & Dialogue Stems (เสียงพากย์)</option>
                    <option value="Master Commercial Package">Master Commercial Package</option>
                  </select>
                </div>

                {/* Select Review Outcome */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    ผลการตรวจงาน (Review Outcome):
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedReviewOutcome('PASS')}
                      style={{
                        padding: '7px',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedReviewOutcome === 'PASS' ? '1.5px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                        background: selectedReviewOutcome === 'PASS' ? 'var(--accent-green-bg)' : 'transparent',
                        color: 'var(--accent-green)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ✓ ผ่าน (PASS)
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedReviewOutcome('NEEDS_REVISION')}
                      style={{
                        padding: '7px',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedReviewOutcome === 'NEEDS_REVISION' ? '1.5px solid #DC2626' : '1px solid var(--border-subtle)',
                        background: selectedReviewOutcome === 'NEEDS_REVISION' ? '#FEE2E2' : 'transparent',
                        color: '#DC2626',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ✕ ให้แก้ด่วน
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedReviewOutcome('INFO')}
                      style={{
                        padding: '7px',
                        borderRadius: 'var(--radius-sm)',
                        border: selectedReviewOutcome === 'INFO' ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        background: selectedReviewOutcome === 'INFO' ? 'var(--teal-subtle)' : 'transparent',
                        color: 'var(--teal-primary)',
                        fontSize: '0.74rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      ข้อเสนอแนะ
                    </button>
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                    ข้อความคอมเมนต์อย่างละเอียด:
                  </label>
                  <textarea
                    rows={4}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="ระบุจุดที่ต้องการให้ปรับแต่ง เช่น [00:15] แสงเงาสะท้อนกระจกยังไม่พอ หรือ ลมหายใจช่วงจบคำพูด..."
                    className="clay-input"
                    style={{ width: '100%', padding: '10px', fontSize: '0.82rem', lineHeight: 1.5, resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    padding: '11px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    boxShadow: 'var(--shadow-teal-btn)'
                  }}
                >
                  <Send size={15} />
                  <span>บันทึกคอมเมนต์และแจ้งเตือนทีม</span>
                </button>
              </form>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-VIEW 3: DUAL-LAYER QA GATE (AI AUTO-AUDITOR & DIRECTOR SIGN-OFF) */}
      {/* ========================================================================= */}
      {activeSubView === 'qa-gate' && (
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
              {qaReport.checks?.map(chk => (
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

            {/* Production Prompt Ready Card when Approved */}
            {isApproved && (
              <div style={{
                background: 'linear-gradient(135deg, rgba(31, 122, 89, 0.08), rgba(11, 74, 81, 0.08))',
                border: '1.5px solid var(--accent-green)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                marginBottom: '16px',
                boxShadow: 'var(--shadow-raised-sm)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <CheckCircle2 size={18} color="var(--accent-green)" />
                  <strong style={{ fontSize: '0.92rem', color: 'var(--accent-green)' }}>
                    บทผ่านการยืนยันแล้ว: พร้อมส่งออก Prompt สร้างคลิปอัตโนมัติทันที
                  </strong>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                  ระบบตรวจทานและสังเคราะห์ข้อมูลครบถ้วน: มุมกล้อง 9:16 &bull; ตัวละคร & LoRA &bull; เสื้อผ้าตรงตามคัมภีร์ &bull; ท่าทาง & สีหน้า FACS &bull; การเคลื่อนไหวธรรมชาติสมจริง &bull; บทพูด & น้ำเสียง &bull; ฉาก & แสง &bull; ความต่อเนื่องของฉาก
                </p>
                <button
                  onClick={() => setShowPromptModal(true)}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '11px',
                    background: 'linear-gradient(135deg, #1F7A59, #0B4A51)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    fontSize: '0.86rem',
                    fontWeight: 700,
                    boxShadow: 'var(--shadow-teal-btn)'
                  }}
                >
                  <Sparkles size={16} strokeWidth={2.2} />
                  <span>เปิดตัวสร้าง & ส่งออก Prompt ผลิตคลิปอัตโนมัติ (1-Click Auto Prompts)</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            )}

            {/* Action Approval Buttons */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
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

              <button
                onClick={() => setShowPromptModal(true)}
                className="btn-secondary"
                style={{
                  padding: '12px 18px',
                  borderColor: 'var(--teal-primary)',
                  color: 'var(--teal-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  fontSize: '0.84rem'
                }}
              >
                <Sparkles size={16} strokeWidth={2} />
                <span>ดู Prompt ถ่ายทำ</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Production Prompt Modal */}
      <ProductionPromptModal
        isOpen={showPromptModal}
        onClose={() => setShowPromptModal(false)}
        series={series}
      />
    </div>
  );
}
