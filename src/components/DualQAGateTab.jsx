import React, { useState } from 'react';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, FileText, Send, History, Check, Clock, 
  UserCheck, Bot, Sparkles, Video, Play, Copy, ArrowRight, Users, Layers, AlertCircle, 
  Calendar, Filter, MessageSquare, Flame, TrendingUp, Sliders, ChevronDown, CheckSquare,
  Eye, Upload, Image, Film, Bell, X, ExternalLink, CornerDownLeft, Download, Paperclip
} from 'lucide-react';
import ProductionPromptModal from './ProductionPromptModal';
import { 
  PRODUCTION_ROLES, 
  INITIAL_DEPARTMENT_TASKS, 
  INITIAL_DEPARTMENT_COMMENTS,
  INITIAL_DEPARTMENT_NOTIFICATIONS
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

  // Deliverable Inspection Modal State
  const [inspectingTask, setInspectingTask] = useState(null);

  // Return / Revision Form Modal State
  const [revisionTask, setRevisionTask] = useState(null);
  const [revisionComment, setRevisionComment] = useState('');
  const [revisionImage, setRevisionImage] = useState('');
  const [revisionVideo, setRevisionVideo] = useState('');
  const [revisionPriority, setRevisionPriority] = useState('URGENT'); // 'URGENT' | 'NORMAL'

  // Notifications State
  const [notifications, setNotifications] = useState(INITIAL_DEPARTMENT_NOTIFICATIONS);
  const [showNotificationDrawer, setShowNotificationDrawer] = useState(false);

  // Comments & Feedback State
  const [comments, setComments] = useState(INITIAL_DEPARTMENT_COMMENTS);
  const [selectedPostRole, setSelectedPostRole] = useState('director');
  const [selectedTarget, setSelectedTarget] = useState('Shot 01: [00:00 - 00:04]');
  const [selectedReviewOutcome, setSelectedReviewOutcome] = useState('PASS'); // 'PASS', 'NEEDS_REVISION', 'INFO'
  const [newCommentText, setNewCommentText] = useState('');

  // Handle Opening Deliverable Inspection
  const handleOpenInspect = (task) => {
    setInspectingTask(task);
  };

  // Handle Approving a Deliverable from the Inspector
  const handleApproveDeliverable = (taskId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return {
          ...t,
          reviewStatus: 'PASS',
          status: 'COMPLETED',
          progress: 100,
          revisionTicket: null
        };
      }
      return t;
    }));

    const task = tasks.find(t => t.id === taskId);
    const newNotif = {
      id: `notif-${Date.now()}`,
      taskId,
      deptId: task?.deptId || 'screenplay',
      targetAssignee: task?.assignee || 'ผู้รับผิดชอบ',
      taskTitle: task?.title || '',
      reviewer: 'ผู้กำกับ ณัฐวุฒิ (Sign-Off)',
      type: 'APPROVED',
      message: `งาน "${task?.title}" ได้รับการตรวจทานและอนุมัติให้ผ่าน (PASS) 100% เรียบร้อยแล้ว`,
      attachmentImage: '',
      attachmentVideo: '',
      timestamp: 'เมื่อสักครู่',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);
    setInspectingTask(null);
    setActionNotice(`อนุมัติให้ "${task?.title}" ผ่าน (PASS) เรียบร้อย และส่งแจ้งเตือนถึง ${task?.assignee} แล้ว`);
    setTimeout(() => setActionNotice(''), 4000);
  };

  // Handle Opening Revision Modal
  const handleOpenRevisionModal = (task) => {
    setRevisionTask(task);
    setRevisionComment('');
    setRevisionImage('');
    setRevisionVideo('');
    setRevisionPriority('URGENT');
  };

  // Handle Image File Upload for revision return
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setRevisionImage(uploadEvent.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Submitting a Revision Return
  const handleSubmitRevision = (e) => {
    e.preventDefault();
    if (!revisionTask) return;
    if (!revisionComment.trim()) {
      alert('กรุณาระบุรายละเอียดสิ่งที่ต้องการให้แก้ไข');
      return;
    }

    const now = new Date();
    const formattedDate = `วันนี้ ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.`;
    const reviewerName = 'ผู้กำกับ ณัฐวุฒิ / ศิรภัสสร (QA Lead)';

    const ticket = {
      id: `rev-${Date.now()}`,
      reviewer: reviewerName,
      comment: revisionComment.trim(),
      attachmentImage: revisionImage,
      attachmentVideo: revisionVideo,
      priority: revisionPriority,
      date: formattedDate,
      resolved: false
    };

    // Update Tasks
    setTasks(prev => prev.map(t => {
      if (t.id === revisionTask.id) {
        return {
          ...t,
          reviewStatus: 'NEEDS_REVISION',
          status: 'OVERDUE',
          isOverdue: true,
          progress: Math.min(t.progress, 65),
          revisionTicket: ticket,
          lastComment: {
            author: reviewerName,
            roleId: 'director',
            text: `[ตีกลับให้แก้ไข]: ${revisionComment.trim()}`,
            date: formattedDate
          }
        };
      }
      return t;
    }));

    // Add to Comments List
    const newComment = {
      id: `cmt-${Date.now()}`,
      author: reviewerName,
      roleId: 'director',
      target: revisionTask.target,
      status: 'NEEDS_REVISION',
      date: formattedDate,
      text: `[ส่งกลับให้แก้ไขถึง ${revisionTask.assignee}]: ${revisionComment.trim()}${revisionImage ? ' (มีแนบรูปภาพอ้างอิง)' : ''}${revisionVideo ? ' (มีแนบวิดีโออ้างอิง)' : ''}`,
      pinned: true
    };
    setComments(prev => [newComment, ...prev]);

    // Create Notification
    const newNotif = {
      id: `notif-${Date.now()}`,
      taskId: revisionTask.id,
      deptId: revisionTask.deptId,
      targetAssignee: revisionTask.assignee,
      taskTitle: revisionTask.title,
      reviewer: reviewerName,
      type: 'REVISION_RETURNED',
      message: revisionComment.trim(),
      attachmentImage: revisionImage,
      attachmentVideo: revisionVideo,
      priority: revisionPriority,
      timestamp: 'เมื่อสักครู่',
      isRead: false
    };
    setNotifications(prev => [newNotif, ...prev]);

    setRevisionTask(null);
    setInspectingTask(null);
    setActionNotice(`ตีกลับงานให้ "${revisionTask.assignee}" แก้ไขเรียบร้อย พร้อมส่งไฟล์แนบและแจ้งเตือนแล้ว 🔔`);
    setTimeout(() => setActionNotice(''), 4500);
  };

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

            {/* Notification Bell & Drawer */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowNotificationDrawer(prev => !prev)}
                className="btn-secondary"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '9px 14px',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  position: 'relative',
                  background: showNotificationDrawer ? 'var(--teal-primary)' : 'var(--bg-surface)',
                  color: showNotificationDrawer ? '#FFFFFF' : 'var(--text-main)',
                  borderColor: showNotificationDrawer ? 'var(--teal-primary)' : 'var(--border-subtle)',
                  cursor: 'pointer'
                }}
                title="ศูนย์การแจ้งเตือนงานส่งกลับ & อนุมัติของทุกฝ่าย"
              >
                <Bell size={16} strokeWidth={2.2} />
                <span>แจ้งเตือน</span>
                {notifications.length > 0 && (
                  <span style={{
                    background: '#DC2626',
                    color: '#FFFFFF',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '1px 7px',
                    borderRadius: 'var(--radius-pill)',
                    minWidth: '18px',
                    textAlign: 'center',
                    boxShadow: '0 0 8px rgba(220, 38, 38, 0.4)'
                  }}>
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notification Drawer Popover */}
              {showNotificationDrawer && (
                <div className="clay-card" style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 8px)',
                  width: '420px',
                  maxHeight: '480px',
                  overflowY: 'auto',
                  zIndex: 200,
                  padding: '18px',
                  boxShadow: '0 18px 45px rgba(0,0,0,0.22)',
                  border: '1.5px solid var(--border-subtle)',
                  background: 'var(--bg-surface)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  borderRadius: 'var(--radius-md)'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Bell size={17} color="var(--teal-primary)" />
                      <strong style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>
                        แจ้งเตือนงาน & ตรวจทาน ({notifications.length})
                      </strong>
                    </div>
                    <button
                      onClick={() => setShowNotificationDrawer(false)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '2px' }}
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {notifications.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-muted)', fontSize: '0.84rem' }}>
                      ไม่มีการแจ้งเตือนใหม่ในขณะนี้
                    </div>
                  ) : (
                    notifications.map(notif => {
                      const isReturn = notif.type === 'REVISION_RETURNED';
                      return (
                        <div
                          key={notif.id}
                          style={{
                            padding: '12px',
                            borderRadius: 'var(--radius-sm)',
                            background: isReturn ? '#FFF7F7' : 'var(--accent-green-bg)',
                            borderLeft: isReturn ? '4px solid #DC2626' : '4px solid var(--accent-green)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '6px'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{
                              fontSize: '0.7rem',
                              fontWeight: 800,
                              color: isReturn ? '#DC2626' : 'var(--accent-green)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '4px'
                            }}>
                              {isReturn ? <CornerDownLeft size={13} /> : <CheckCircle2 size={13} />}
                              {isReturn ? 'ตีกลับให้แก้ไขงาน' : 'อนุมัติให้ผ่าน (PASS)'}
                            </span>
                            <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                              {notif.timestamp}
                            </span>
                          </div>

                          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            <strong>ถึง:</strong> {notif.targetAssignee}
                          </div>

                          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>
                            {notif.taskTitle}
                          </div>

                          <p style={{ margin: 0, fontSize: '0.76rem', color: 'var(--text-main)', lineHeight: 1.4, background: '#FFFFFF', padding: '8px', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}>
                            "{notif.message}"
                          </p>

                          {/* Media Attachment Badges */}
                          {(notif.attachmentImage || notif.attachmentVideo) && (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '2px' }}>
                              {notif.attachmentImage && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#B91C1C', background: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', border: '1px solid #FECACA' }}>
                                  <Image size={12} />
                                  <span>มีรูปภาพอ้างอิง</span>
                                </div>
                              )}
                              {notif.attachmentVideo && (
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: '#B91C1C', background: '#FFFFFF', padding: '2px 6px', borderRadius: '4px', border: '1px solid #FECACA' }}>
                                  <Film size={12} />
                                  <span>มีคลิปวิดีโออ้างอิง</span>
                                </div>
                              )}
                            </div>
                          )}

                          {/* Action inside notification */}
                          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                            <button
                              onClick={() => {
                                const targetTask = tasks.find(t => t.id === notif.taskId);
                                if (targetTask) {
                                  setInspectingTask(targetTask);
                                  setShowNotificationDrawer(false);
                                }
                              }}
                              style={{
                                padding: '4px 10px',
                                background: 'transparent',
                                border: '1px solid var(--teal-primary)',
                                color: 'var(--teal-primary)',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                            >
                              <Eye size={12} /> ดูชิ้นงานนี้
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
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

                    {/* Revision Return Ticket Banner (If returned) */}
                    {task.revisionTicket && (
                      <div style={{
                        background: '#FFF5F5',
                        border: '1.5px dashed #DC2626',
                        borderRadius: 'var(--radius-sm)',
                        padding: '12px',
                        marginBottom: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '6px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#DC2626', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CornerDownLeft size={14} /> ตีกลับให้แก้ไขโดย: {task.revisionTicket.reviewer}
                          </span>
                          <span style={{
                            background: task.revisionTicket.priority === 'URGENT' ? '#DC2626' : 'var(--accent-amber)',
                            color: '#FFF',
                            fontSize: '0.65rem',
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-pill)',
                            fontWeight: 700
                          }}>
                            {task.revisionTicket.priority === 'URGENT' ? '🔴 ด่วนมาก (SLA 2 ชม.)' : '🟡 ปกติ'}
                          </span>
                        </div>

                        <p style={{ margin: 0, fontSize: '0.76rem', color: '#991B1B', lineHeight: 1.45, fontWeight: 500 }}>
                          "{task.revisionTicket.comment}"
                        </p>

                        {/* Attachments preview if present */}
                        {(task.revisionTicket.attachmentImage || task.revisionTicket.attachmentVideo) && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', paddingTop: '4px', borderTop: '1px solid rgba(220, 38, 38, 0.15)' }}>
                            {task.revisionTicket.attachmentImage && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', border: '1px solid #FECACA' }}>
                                <img src={task.revisionTicket.attachmentImage} alt="Ref" style={{ width: '22px', height: '22px', objectFit: 'cover', borderRadius: '3px' }} />
                                <span style={{ fontSize: '0.68rem', color: '#B91C1C', fontWeight: 600 }}>มีรูปเรฟแนบ</span>
                              </div>
                            )}
                            {task.revisionTicket.attachmentVideo && (
                              <a
                                href={task.revisionTicket.attachmentVideo}
                                target="_blank"
                                rel="noreferrer"
                                style={{ display: 'flex', alignItems: 'center', gap: '5px', background: '#FFFFFF', padding: '3px 8px', borderRadius: '4px', border: '1px solid #FECACA', textDecoration: 'none' }}
                              >
                                <Film size={12} color="#B91C1C" />
                                <span style={{ fontSize: '0.68rem', color: '#B91C1C', fontWeight: 600 }}>คลิปเรฟ</span>
                                <ExternalLink size={10} color="#B91C1C" />
                              </a>
                            )}
                          </div>
                        )}
                        <div style={{ fontSize: '0.66rem', color: 'var(--text-dim)', textAlign: 'right' }}>
                          ส่งกลับเมื่อ: {task.revisionTicket.date}
                        </div>
                      </div>
                    )}

                    {/* Latest Comment Snippet */}
                    {!task.revisionTicket && task.lastComment && (
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

                    {/* Inspect Deliverable Button */}
                    <button
                      onClick={() => handleOpenInspect(task)}
                      className="btn-secondary"
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '10px 14px',
                        marginBottom: '12px',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        background: 'rgba(19, 94, 103, 0.08)',
                        borderColor: 'var(--teal-primary)',
                        color: 'var(--teal-primary)',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer'
                      }}
                      title="คลิกเพื่อเปิดอ่าน/ตรวจเนื้อหา ไฟล์ และผลงานที่ฝ่ายนี้ส่งมาอย่างละเอียด"
                    >
                      <Eye size={16} />
                      <span>ตรวจดูงานที่ส่งมา (Inspect Deliverables)</span>
                    </button>
                  </div>

                  {/* Action: Approve or Return for Revision */}
                  <div style={{
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                      สั่งการตรวจงาน:
                    </span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        onClick={() => handleApproveDeliverable(task.id)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: isPass ? '1.5px solid var(--accent-green)' : '1px solid var(--border-subtle)',
                          background: isPass ? 'var(--accent-green)' : '#FFFFFF',
                          color: isPass ? '#FFFFFF' : 'var(--accent-green)',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="ตรวจแล้วงานสมบูรณ์ ให้ผ่าน (PASS 100%)"
                      >
                        <Check size={13} strokeWidth={2.5} /> ให้ผ่าน
                      </button>

                      <button
                        onClick={() => handleOpenRevisionModal(task)}
                        style={{
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-sm)',
                          border: isNeedsRevision ? '1.5px solid #DC2626' : '1px solid var(--border-subtle)',
                          background: isNeedsRevision ? '#DC2626' : '#FFFFFF',
                          color: isNeedsRevision ? '#FFFFFF' : '#DC2626',
                          fontSize: '0.74rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        title="ตีกลับให้ผู้รับผิดชอบแก้ไข พร้อมใส่คอมเมนต์และแนบรูป/วิดีโอ"
                      >
                        <CornerDownLeft size={13} strokeWidth={2.2} /> ตีกลับให้แก้
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

      {/* ========================================================================= */}
      {/* DELIVERABLE INSPECTION MODAL (คลิกเข้าไปดูชิ้นงานที่ส่งมา) */}
      {/* ========================================================================= */}
      {inspectingTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 25, 26, 0.82)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div className="clay-card" style={{
            width: '100%',
            maxWidth: '920px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              background: 'linear-gradient(180deg, rgba(19, 94, 103, 0.05), transparent)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 'var(--radius-pill)',
                    background: PRODUCTION_ROLES.find(r => r.id === inspectingTask.deptId)?.color || 'var(--teal-primary)',
                    color: '#FFFFFF',
                    fontSize: '0.72rem',
                    fontWeight: 700
                  }}>
                    {PRODUCTION_ROLES.find(r => r.id === inspectingTask.deptId)?.label} &bull; {inspectingTask.assignee}
                  </span>
                  <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                    ชิ้นงานเป้าหมาย: {inspectingTask.target}
                  </span>
                  {inspectingTask.reviewStatus === 'PASS' && (
                    <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>✓ ผ่าน (PASS)</span>
                  )}
                  {inspectingTask.reviewStatus === 'NEEDS_REVISION' && (
                    <span style={{ background: '#FEE2E2', color: '#DC2626', padding: '2px 8px', borderRadius: 'var(--radius-pill)', fontSize: '0.7rem', fontWeight: 700 }}>
                      ⚠️ ตีกลับให้แก้ไข
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)', margin: '4px 0 0 0', fontWeight: 800 }}>
                  {inspectingTask.title}
                </h3>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  ส่งเมื่อ: <strong>{inspectingTask.deliverable?.submittedAt || '13 ต.ค. 14:00 น.'}</strong> &bull; ผู้ส่งงาน: <strong>{inspectingTask.deliverable?.submittedBy || inspectingTask.assignee}</strong>
                </div>
              </div>

              <button
                onClick={() => setInspectingTask(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Deliverable Summary Bar */}
              <div style={{
                padding: '14px 18px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(19, 94, 103, 0.06)',
                border: '1px solid rgba(19, 94, 103, 0.18)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '12px'
              }}>
                <div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--teal-primary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    สรุปเนื้อหาชิ้นงานที่ส่งมอบ (Submitted Deliverable Overview)
                  </div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: 600, marginTop: '2px' }}>
                    {inspectingTask.deliverable?.title || inspectingTask.title}
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {inspectingTask.deliverable?.summary}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>คะแนนประเมิน AI:</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-green)' }}>
                    {inspectingTask.score}%
                  </div>
                </div>
              </div>

              {/* SPECIFIC DELIVERABLE VIEW: NOVEL WRITER (ฝ่ายเขียนนิยาย) */}
              {inspectingTask.deliverable?.content?.novelExcerpt && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {/* Hook Metrics Badge Bar */}
                  {(inspectingTask.deliverable.content.metrics || inspectingTask.deliverable.content.hookMetrics) && (() => {
                    const m = inspectingTask.deliverable.content.metrics || inspectingTask.deliverable.content.hookMetrics;
                    return (
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                        gap: '12px'
                      }}>
                        <div style={{ padding: '12px', background: '#FFFDF5', borderRadius: '8px', border: '1px solid #FEF3C7' }}>
                          <div style={{ fontSize: '0.72rem', color: '#92400E', fontWeight: 700 }}>⚡ 3-Second Hook Score</div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#B45309' }}>
                            {m.hookScore || m.threeSecondHookScore || '96/100'}
                          </div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg-inset)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>📝 จำนวนคำทั้งหมด</div>
                          <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--teal-primary)' }}>
                            {m.wordCount || m.totalWords || '2,450 คำ'}
                          </div>
                        </div>
                        <div style={{ padding: '12px', background: 'var(--bg-inset)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700 }}>🎯 จุดกระชาก & ความไวรัล</div>
                          <div style={{ fontSize: '0.86rem', fontWeight: 600, color: 'var(--text-main)', marginTop: '4px' }}>
                            {m.viralityIndex ? `ความไวรัล ${m.viralityIndex}` : (m.cliffhangerHook || 'เปิดฉากกระชากอารมณ์ 3s Hook')}
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  {/* Novel Text Manuscript (เนื้อหานิยายต้นฉบับ) */}
                  <div style={{
                    background: '#FDFBF7',
                    border: '1.5px solid #E8DFD0',
                    borderRadius: 'var(--radius-md)',
                    padding: '22px 26px',
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.02)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #EDE6D8', paddingBottom: '10px' }}>
                      <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#684E29', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={16} /> เนื้อหาบทร่างนิยายตอนที่ 1 (Draft Manuscript Ch.1):
                      </span>
                      <span style={{ fontSize: '0.74rem', color: '#9A7B4F', background: '#F5ECE0', padding: '2px 8px', borderRadius: '4px' }}>
                        เขียนโดย: พิมลภัส (Head Writer)
                      </span>
                    </div>
                    <div style={{
                      fontFamily: 'var(--font-serif, "Noto Serif Thai", Georgia, serif)',
                      fontSize: '0.94rem',
                      lineHeight: 1.8,
                      color: '#2A241E',
                      whiteSpace: 'pre-line'
                    }}>
                      {inspectingTask.deliverable.content.novelExcerpt}
                    </div>
                  </div>

                  {/* 4-Shot Cinematic Breakdown Table */}
                  {(inspectingTask.deliverable.content.shotsBreakdown || inspectingTask.deliverable.content.fourShots) && (() => {
                    const shotsList = inspectingTask.deliverable.content.shotsBreakdown || inspectingTask.deliverable.content.fourShots;
                    return (
                      <div>
                        <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: '0 0 10px 0', fontWeight: 700 }}>
                          🎬 ตารางสกัด 4 ช็อตหลักสำหรับสร้างวิดีโอ (4-Shot Cinematic Breakdown):
                        </h4>
                        <div style={{ overflowX: 'auto', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
                            <thead>
                              <tr style={{ background: 'var(--bg-inset)', textAlign: 'left', color: 'var(--text-muted)' }}>
                                <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', width: '130px' }}>ช็อต & จังหวะ</th>
                                <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', width: '220px' }}>การเคลื่อนไหว & อารมณ์</th>
                                <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', width: '220px' }}>บทพูด/เสียงบรรยาย (TH)</th>
                                <th style={{ padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)' }}>AI Video Prompt (EN)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {shotsList.map((shot, idx) => (
                                <tr key={idx} style={{ borderBottom: '1px solid var(--border-subtle)', background: idx % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.01)' }}>
                                  <td style={{ padding: '10px 12px', fontWeight: 700, color: 'var(--teal-primary)' }}>
                                    {shot.shot || shot.shotNum}
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 500 }}>{shot.timing}</div>
                                  </td>
                                  <td style={{ padding: '10px 12px', color: 'var(--text-main)', lineHeight: 1.4 }}>
                                    {shot.action || shot.emotion || shot.name}
                                  </td>
                                  <td style={{ padding: '10px 12px', color: '#B91C1C', fontWeight: 600, lineHeight: 1.4 }}>
                                    {shot.dialogue.startsWith('"') ? shot.dialogue : `"${shot.dialogue}"`}
                                  </td>
                                  <td style={{ padding: '10px 12px', color: 'var(--text-muted)', fontFamily: 'monospace', fontSize: '0.72rem' }}>
                                    {shot.prompt || 'Rembrandt lighting 4:1, 9:16 vertical cinema, cinematic photorealistic, 8k'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* SPECIFIC DELIVERABLE VIEW: CASTING & CHARACTER BIBLE */}
              {inspectingTask.deliverable?.content?.characterProfiles && (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '16px' }}>
                  {inspectingTask.deliverable.content.characterProfiles.map((char, cIdx) => (
                    <div key={cIdx} className="clay-card" style={{ padding: '18px', borderLeft: '4px solid var(--teal-primary)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                        <h4 style={{ margin: 0, fontSize: '0.98rem', color: 'var(--text-main)', fontWeight: 700 }}>
                          {char.name}
                        </h4>
                        <span className="badge badge-teal" style={{ fontSize: '0.7rem' }}>
                          LoRA Lock: {char.loraWeight}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <strong>ใบหน้าคงที่:</strong> {char.facialLock}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '8px' }}>
                        <strong>คอสตูม & เสื้อผ้า:</strong> {char.wardrobe}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: 'var(--teal-primary)', background: 'var(--bg-inset)', padding: '6px 10px', borderRadius: '4px' }}>
                        <strong>น้ำเสียง:</strong> {char.voiceTone}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SPECIFIC DELIVERABLE VIEW: CINEMATOGRAPHY */}
              {inspectingTask.deliverable?.content?.cameraSpecs && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ fontSize: '0.92rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>
                    สเปกเลนส์และการเคลื่อนกล้อง 9:16 (Camera Specs):
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
                    {inspectingTask.deliverable.content.cameraSpecs.map((spec, sIdx) => (
                      <div key={sIdx} style={{ padding: '14px', background: 'var(--bg-inset)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                        <div style={{ fontWeight: 700, color: 'var(--teal-primary)', fontSize: '0.84rem', marginBottom: '4px' }}>
                          {spec.shot} &bull; {spec.lens}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-main)', marginBottom: '3px' }}>
                          <strong>เวกเตอร์กล้อง:</strong> {spec.move}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '3px' }}>
                          <strong>มุมกล้อง:</strong> {spec.angle}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--accent-amber)' }}>
                          <strong>การจัดแสง:</strong> {spec.lighting}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SPECIFIC DELIVERABLE VIEW: SPONSOR / SAFE ZONE */}
              {inspectingTask.deliverable?.content?.brandName && (
                <div style={{ padding: '18px', background: 'var(--bg-inset)', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <h4 style={{ margin: '0 0 10px 0', fontSize: '0.94rem', color: 'var(--text-main)', fontWeight: 700 }}>
                    {inspectingTask.deliverable.content.brandName}
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.78rem' }}>
                    <div><strong>ช่วงเวลาปรากฏ:</strong> {inspectingTask.deliverable.content.placementWindow}</div>
                    <div><strong>ตำแหน่งในจอ:</strong> {inspectingTask.deliverable.content.position}</div>
                    <div><strong>สถานะ Safe Zone:</strong> <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{inspectingTask.deliverable.content.safeZoneAudit}</span></div>
                  </div>
                </div>
              )}

              {/* SPECIFIC DELIVERABLE VIEW: SOUND */}
              {inspectingTask.deliverable?.content?.thaiDialogueLines && (
                <div style={{ padding: '18px', background: 'var(--bg-inset)', borderRadius: '8px', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <h4 style={{ margin: 0, fontSize: '0.94rem', color: 'var(--text-main)', fontWeight: 700 }}>
                    ระบบเสียง & เสียงพากย์ไทย (ElevenLabs Voice Stems):
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <strong>พารามิเตอร์เสียง:</strong> {inspectingTask.deliverable.content.vocalSettings}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <strong>แทร็กเอฟเฟกต์ (SFX):</strong> {inspectingTask.deliverable.content.sfxTrack}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <strong>ดนตรีประกอบ (BGM):</strong> {inspectingTask.deliverable.content.bgmTrack}
                  </div>
                </div>
              )}

              {/* SPECIFIC DELIVERABLE VIEW: QA CONTINUITY */}
              {inspectingTask.deliverable?.content?.issueDetected && (
                <div style={{ padding: '16px', background: '#FFF5F5', borderRadius: '8px', border: '1px solid #FECACA' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#DC2626', marginBottom: '4px' }}>
                    ⚠️ จุดบกพร่องที่ตรวจพบ (Issue Detected):
                  </div>
                  <p style={{ margin: '0 0 8px 0', fontSize: '0.82rem', color: '#991B1B' }}>
                    {inspectingTask.deliverable.content.issueDetected}
                  </p>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                    คำสั่งแก้ไข (Required Action): {inspectingTask.deliverable.content.requiredFix}
                  </div>
                </div>
              )}

              {/* Attached Files List */}
              {inspectingTask.deliverable?.files && (
                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Paperclip size={14} /> ไฟล์เอกสารและแอสเซทที่ส่งมา ({inspectingTask.deliverable.files.length} ไฟล์):
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                    {inspectingTask.deliverable.files.map((file, fIdx) => (
                      <div key={fIdx} style={{
                        padding: '10px 14px',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                          <FileText size={16} color="var(--teal-primary)" />
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-main)', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {file.name}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>{file.size} &bull; {file.type.toUpperCase()}</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.7rem', color: 'var(--teal-primary)', fontWeight: 600 }}>แนบแล้ว</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Action Bar (Bottom) */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-inset)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}>
              <button
                onClick={() => setInspectingTask(null)}
                className="btn-secondary"
                style={{ padding: '8px 16px', fontSize: '0.82rem' }}
              >
                ปิดหน้าต่าง
              </button>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => {
                    const currentTask = inspectingTask;
                    setInspectingTask(null);
                    handleOpenRevisionModal(currentTask);
                  }}
                  style={{
                    padding: '9px 18px',
                    borderRadius: 'var(--radius-md)',
                    border: '1.5px solid #DC2626',
                    background: '#FFFFFF',
                    color: '#DC2626',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  title="หากงานยังต้องแก้ไข ให้กดปุ่มนี้เพื่อใส่คอมเมนต์ แนบภาพ/วิดีโอ และส่งกลับไปยังผู้เขียน"
                >
                  <CornerDownLeft size={16} strokeWidth={2.2} />
                  <span>ตีกลับให้แก้ไข (Return for Revision)</span>
                </button>

                <button
                  onClick={() => handleApproveDeliverable(inspectingTask.id)}
                  className="btn-primary"
                  style={{
                    padding: '9px 20px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    background: 'var(--accent-green)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 14px rgba(31, 122, 89, 0.3)'
                  }}
                  title="หากตรวจดูแล้วชิ้นงานสมบูรณ์ ให้อนุมัติผ่าน"
                >
                  <CheckCircle2 size={16} strokeWidth={2.2} />
                  <span>ตรวจแล้วสมบูรณ์ - อนุมัติให้ผ่าน (PASS)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* REVISION RETURN MODAL (ส่งกลับให้คนเขียน/ฝ่ายนั้นๆ แก้ไข พร้อมแนบรูป & วิดีโอ) */}
      {/* ========================================================================= */}
      {revisionTask && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 25, 26, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1100,
          padding: '20px'
        }}>
          <div className="clay-card" style={{
            width: '100%',
            maxWidth: '680px',
            maxHeight: '92vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--border-subtle)',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: '#FFF5F5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: '#FEE2E2',
                  color: '#DC2626',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <CornerDownLeft size={20} strokeWidth={2.5} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#991B1B', margin: 0, fontWeight: 800 }}>
                    ส่งกลับให้แก้ไขงาน (Return for Revision)
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#B91C1C' }}>
                    ระบบจะแจ้งเตือนไปยังผู้รับผิดชอบโดยตรง พร้อมส่งคอมเมนต์และไฟล์แนบ
                  </p>
                </div>
              </div>

              <button
                onClick={() => setRevisionTask(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '6px' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSubmitRevision} style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
              <div style={{ padding: '22px 24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '18px' }}>
                
                {/* Recipient Details Card */}
                <div style={{
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-inset)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>ผู้รับงานแก้ไข (Target Assignee):</div>
                    <div style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '2px' }}>
                      {revisionTask.assignee}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--teal-primary)' }}>
                      {PRODUCTION_ROLES.find(r => r.id === revisionTask.deptId)?.label} &bull; {revisionTask.title}
                    </div>
                  </div>
                  <span className="badge badge-amber" style={{ fontSize: '0.72rem' }}>
                    ตีกลับงาน
                  </span>
                </div>

                {/* Priority Toggle */}
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
                    ระดับความเร่งด่วนในการแก้ไข (Priority SLA):
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <button
                      type="button"
                      onClick={() => setRevisionPriority('URGENT')}
                      style={{
                        padding: '9px',
                        borderRadius: 'var(--radius-sm)',
                        border: revisionPriority === 'URGENT' ? '2px solid #DC2626' : '1px solid var(--border-subtle)',
                        background: revisionPriority === 'URGENT' ? '#FEE2E2' : 'var(--bg-surface)',
                        color: revisionPriority === 'URGENT' ? '#DC2626' : 'var(--text-main)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      🔴 ด่วนมาก (SLA ไม่เกิน 2 ชม.)
                    </button>

                    <button
                      type="button"
                      onClick={() => setRevisionPriority('NORMAL')}
                      style={{
                        padding: '9px',
                        borderRadius: 'var(--radius-sm)',
                        border: revisionPriority === 'NORMAL' ? '2px solid var(--accent-amber)' : '1px solid var(--border-subtle)',
                        background: revisionPriority === 'NORMAL' ? '#FEF3C7' : 'var(--bg-surface)',
                        color: revisionPriority === 'NORMAL' ? '#B45309' : 'var(--text-main)',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      🟡 ตามรอบปกติ (SLA 6 ชม.)
                    </button>
                  </div>
                </div>

                {/* Feedback & Instructions Textarea */}
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                    ข้อคิดเห็น & รายละเอียดสิ่งที่ต้องแก้ไข (Feedback & Instructions) <span style={{ color: '#DC2626' }}>*</span>
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={revisionComment}
                    onChange={(e) => setRevisionComment(e.target.value)}
                    placeholder='เช่น "บทร่างนิยาย 3 วินาทีแรกยังดึงอารมณ์ไม่พอ ขอเพิ่มความตื่นตระหนกของนางเอกตอนเจอรอยลิปสติก และปรับบทพูดให้กระชับคมคายตามเรฟที่แนบ"'
                    className="clay-input"
                    style={{
                      width: '100%',
                      padding: '12px',
                      fontSize: '0.86rem',
                      lineHeight: 1.5,
                      background: '#FFFFFF',
                      borderRadius: 'var(--radius-sm)',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                {/* Image Attachment (แนบภาพอ้างอิง) */}
                <div style={{
                  padding: '14px 16px',
                  background: 'var(--bg-inset)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Image size={16} color="var(--teal-primary)" /> แนบรูปภาพอ้างอิง (Reference Image):
                    </label>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>รองรับไฟล์รูปภาพ PNG / JPG หรือเลือกตัวอย่าง</span>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    {/* File Input */}
                    <label style={{
                      padding: '7px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--teal-primary)',
                      background: '#FFFFFF',
                      color: 'var(--teal-primary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <Upload size={14} /> อัปโหลดรูปภาพจากเครื่อง
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                    </label>

                    {/* Quick Presets for Demo */}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>หรือเลือกเรฟสำเร็จรูป:</span>
                    <button
                      type="button"
                      onClick={() => setRevisionImage('/assets/sponsor_product.png')}
                      style={{ padding: '5px 10px', fontSize: '0.72rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      📸 ขวดเซรั่ม Safe-zone
                    </button>
                    <button
                      type="button"
                      onClick={() => setRevisionImage('/assets/actor_female.png')}
                      style={{ padding: '5px 10px', fontSize: '0.72rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      📸 หน้านางเอก LoRA
                    </button>
                    <button
                      type="button"
                      onClick={() => setRevisionImage('/assets/actor_male.png')}
                      style={{ padding: '5px 10px', fontSize: '0.72rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      📸 หน้าพระเอก LoRA
                    </button>
                  </div>

                  {/* Thumbnail Preview */}
                  {revisionImage && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '10px',
                      background: '#FFFFFF',
                      borderRadius: '6px',
                      border: '1px solid var(--accent-green)'
                    }}>
                      <img
                        src={revisionImage}
                        alt="Preview"
                        style={{ width: '54px', height: '54px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-subtle)' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--accent-green)' }}>
                          ✓ แนบรูปภาพอ้างอิงเรียบร้อย
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                          ภาพนี้จะถูกส่งแนบไปในข้อความแจ้งเตือนถึงผู้รับผิดชอบ
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setRevisionImage('')}
                        style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontSize: '0.74rem', fontWeight: 600 }}
                      >
                        ✕ นำรูปออก
                      </button>
                    </div>
                  )}
                </div>

                {/* Video Attachment (แนบวิดีโออ้างอิง) */}
                <div style={{
                  padding: '14px 16px',
                  background: 'var(--bg-inset)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Film size={16} color="var(--teal-primary)" /> แนบวิดีโออ้างอิง (Reference Video URL / Motion Link):
                    </label>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>URL หรือลิงก์สตูดิโอ</span>
                  </div>

                  <input
                    type="text"
                    value={revisionVideo}
                    onChange={(e) => setRevisionVideo(e.target.value)}
                    placeholder="เช่น https://assets.seriesx.studio/refs/hook_drama_3s.mp4"
                    className="clay-input"
                    style={{ width: '100%', padding: '9px 12px', fontSize: '0.82rem', background: '#FFFFFF', boxSizing: 'border-box' }}
                  />

                  {/* Quick Video Presets */}
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>หรือเลือกคลิปตัวอย่าง:</span>
                    <button
                      type="button"
                      onClick={() => setRevisionVideo('https://assets.seriesx.studio/refs/hook_drama_3s.mp4')}
                      style={{ padding: '4px 9px', fontSize: '0.72rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      🎬 เรฟการเปิดฉาก 3s Hook
                    </button>
                    <button
                      type="button"
                      onClick={() => setRevisionVideo('https://assets.seriesx.studio/refs/camera_85mm_pushin.mp4')}
                      style={{ padding: '4px 9px', fontSize: '0.72rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      🎬 เรฟกล้อง 85mm Push-in
                    </button>
                    <button
                      type="button"
                      onClick={() => setRevisionVideo('https://assets.seriesx.studio/refs/lightning_continuity.mp4')}
                      style={{ padding: '4px 9px', fontSize: '0.72rem', background: '#FFFFFF', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer' }}
                    >
                      🎬 เรฟแสงฟ้าแลบข้ามคัต
                    </button>
                  </div>

                  {revisionVideo && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: 'var(--teal-primary)', fontWeight: 600 }}>
                      <Film size={14} /> แนบลิงก์วิดีโอแล้ว: {revisionVideo}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Submit Footer */}
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid var(--border-subtle)',
                background: 'var(--bg-inset)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <button
                  type="button"
                  onClick={() => setRevisionTask(null)}
                  className="btn-secondary"
                  style={{ padding: '9px 18px', fontSize: '0.84rem' }}
                >
                  ยกเลิก
                </button>

                <button
                  type="submit"
                  className="btn-primary"
                  style={{
                    padding: '10px 22px',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    background: '#DC2626',
                    boxShadow: '0 4px 14px rgba(220, 38, 38, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <Send size={15} />
                  <span>ยืนยันส่งกลับให้แก้ไข & แจ้งเตือนทันที</span>
                </button>
              </div>
            </form>
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
