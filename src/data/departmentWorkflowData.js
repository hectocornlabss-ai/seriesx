/**
 * Cross-Department Workflow, Role Coordination & QA Task Tracking Data
 * SeriesX Studio AI Production Platform
 */

export const PRODUCTION_ROLES = [
  {
    id: 'director',
    label: 'ผู้กำกับใหญ่',
    title: 'Supervising Director / Showrunner',
    leadName: 'ผู้กำกับ ณัฐวุฒิ',
    avatar: '/assets/director_avatar.png',
    color: '#0B4A51',
    badgeClass: 'badge-teal',
    scope: 'วิสัยทัศน์รวม, เซ็นอนุมัติไฟนอล (Director Sign-Off), ปลดล็อก Master Export'
  },
  {
    id: 'screenplay',
    label: 'ฝ่ายบท & โครงสร้าง',
    title: 'Screenplay & Novel Lead',
    leadName: 'พิมลภัส (Head Writer)',
    avatar: '/assets/writer_avatar.png',
    color: '#854D0E',
    badgeClass: 'badge-sand',
    scope: 'นิยายต้นฉบับ, ตรวจสอบ 3s Hook, ไดอะล็อกปะทะอารมณ์, Cliffhanger'
  },
  {
    id: 'casting',
    label: 'ฝ่ายแคสติ้ง & ตัวละคร',
    title: 'Casting & Character LoRA Lead',
    leadName: 'กวินทร์ (Casting Director)',
    avatar: '/assets/casting_avatar.png',
    color: '#6B21A8',
    badgeClass: 'badge-purple',
    scope: 'Character Bible, Face Lock 98.7%, เสื้อผ้าตรงคัมภีร์, Actor Seed'
  },
  {
    id: 'cinematography',
    label: 'ฝ่ายกำกับภาพ & กล้อง',
    title: 'Director of Photography (DoP)',
    leadName: 'อานนท์ (Cinematographer)',
    avatar: '/assets/dop_avatar.png',
    color: '#0369A1',
    badgeClass: 'badge-blue',
    scope: 'มุมกล้อง 9:16 แนวตั้ง, เลนส์ 85mm/50mm, การเคลื่อนกล้อง, แสง Teal & Gold'
  },
  {
    id: 'sound',
    label: 'ฝ่ายเสียง & ดนตรี',
    title: 'Sound Designer & Voice Director',
    leadName: 'มนัส (Sound Lead)',
    avatar: '/assets/sound_avatar.png',
    color: '#B45309',
    badgeClass: 'badge-amber',
    scope: 'เสียงพากย์ภาษาไทย, ลมหายใจสะอื้น (Micro-Breathing), SFX, BGM'
  },
  {
    id: 'art_sponsor',
    label: 'ฝ่ายศิลป์ & สปอนเซอร์',
    title: 'Art Director & Brand Placement Lead',
    leadName: 'ชลิดา (Art & Brand Lead)',
    avatar: '/assets/art_avatar.png',
    color: '#BE185D',
    badgeClass: 'badge-pink',
    scope: 'Safe Zone TikTok, จัดวางขวดเซรั่ม LUMIÈRE, สีสันบรรยากาศภาพรวม'
  },
  {
    id: 'qa',
    label: 'ฝ่ายควบคุมคุณภาพ (QA)',
    title: 'QA & Compliance Auditor',
    leadName: 'ศิรภัสสร & AI Auditor',
    avatar: '/assets/qa_avatar.png',
    color: '#15803D',
    badgeClass: 'badge-green',
    scope: 'ตรวจสอบระบบ 2 ชั้น, ตรวจจับการกระตุก/Morphing, มาตรฐานแพลตฟอร์ม'
  }
];

export const INITIAL_DEPARTMENT_TASKS = [
  {
    id: 'task-01',
    title: 'เขียนบทร่างนิยายตอนที่ 1 & สกัดเป็น 4 ช็อตหลัก',
    deptId: 'screenplay',
    assignee: 'พิมลภัส (Head Writer)',
    status: 'COMPLETED', // COMPLETED, IN_PROGRESS, OVERDUE
    reviewStatus: 'PASS', // PASS, NEEDS_REVISION, PENDING
    score: 98,
    deadline: '13 ต.ค. 14:00',
    deadlineDisplay: '13 ต.ค. 14:00 (ส่งตรงเวลา)',
    isOverdue: false,
    progress: 100,
    target: 'ตอนที่ 1 (Ch.1)',
    commentsCount: 3,
    lastComment: {
      author: 'ผู้กำกับ ณัฐวุฒิ',
      roleId: 'director',
      text: 'บทช่วงเปิด 3 วินาทีกระชับดีมาก อารมณ์พุ่งทะลุจอ ผ่านครับ',
      date: '13 ต.ค. 14:15'
    }
  },
  {
    id: 'task-02',
    title: 'ล็อคอัตลักษณ์ใบหน้านางเอกริน & พระเอกทาดาโอะ (LoRA Face Lock)',
    deptId: 'casting',
    assignee: 'กวินทร์ (Casting Lead)',
    status: 'COMPLETED',
    reviewStatus: 'PASS',
    score: 98.7,
    deadline: '13 ต.ค. 17:00',
    deadlineDisplay: '13 ต.ค. 17:00 (ส่งตรงเวลา)',
    isOverdue: false,
    progress: 100,
    target: 'Character Bible',
    commentsCount: 2,
    lastComment: {
      author: 'ศิรภัสสร (QA)',
      roleId: 'qa',
      text: 'ทดสอบหมุนมุมกล้อง 360 องศาแล้ว ใบหน้าตรงตาม Bible ไม่พบอาการ Morphing',
      date: '13 ต.ค. 17:10'
    }
  },
  {
    id: 'task-03',
    title: 'จัดมุมกล้อง 85mm Slow Push-in & Dutch Angle Shot 01-04',
    deptId: 'cinematography',
    assignee: 'อานนท์ (Cinematographer)',
    status: 'COMPLETED',
    reviewStatus: 'PASS',
    score: 99.2,
    deadline: '13 ต.ค. 19:30',
    deadlineDisplay: '13 ต.ค. 19:30 (ส่งตรงเวลา)',
    isOverdue: false,
    progress: 100,
    target: 'Shot 01-04 (Camera)',
    commentsCount: 4,
    lastComment: {
      author: 'ผู้กำกับ ณัฐวุฒิ',
      roleId: 'director',
      text: 'โบเก้เม็ดฝนสวยงามมาก องศา Low-angle ใน Shot 02 เสริมความดุดันได้ดี',
      date: '13 ต.ค. 20:10'
    }
  },
  {
    id: 'task-04',
    title: 'ตรวจสอบตำแหน่งวางขวดเซรั่ม LUMIÈRE 4.8s และ TikTok Safe Zone',
    deptId: 'art_sponsor',
    assignee: 'ชลิดา (Art & Brand Lead)',
    status: 'COMPLETED',
    reviewStatus: 'PASS',
    score: 100,
    deadline: '13 ต.ค. 21:00',
    deadlineDisplay: '13 ต.ค. 21:00 (ส่งตรงเวลา)',
    isOverdue: false,
    progress: 100,
    target: 'Shot 03 (Sponsor Placement)',
    commentsCount: 3,
    lastComment: {
      author: 'ชลิดา (Art & Brand Lead)',
      roleId: 'art_sponsor',
      text: 'ขยับขวดเซรั่มมาตรงกลาง 40px ไม่ทับปุ่ม Like/Share ของ TikTok แล้ว ผ่าน 100%',
      date: '13 ต.ค. 21:05'
    }
  },
  {
    id: 'task-05',
    title: 'มิกซ์เสียงพากย์ภาษาไทย + ลมหายใจสะอื้น (Micro-Breathing) Shot 01 & 04',
    deptId: 'sound',
    assignee: 'มนัส (Sound & Voice Lead)',
    status: 'IN_PROGRESS',
    reviewStatus: 'PENDING',
    score: 98.5,
    deadline: '13 ต.ค. 23:30',
    deadlineDisplay: '13 ต.ค. 23:30 (กำลังดำเนินการ)',
    isOverdue: false,
    progress: 85,
    target: 'Audio Track 1 & 2',
    commentsCount: 2,
    lastComment: {
      author: 'มนัส (Sound & Voice Lead)',
      roleId: 'sound',
      text: 'กำลังปรับคัทเสียงฟ้าร้องให้ดรอปตอนพระเอกเริ่มพูดประโยคสุดท้าย เพื่อดึงอารมณ์ดิ่ง',
      date: '13 ต.ค. 22:45'
    }
  },
  {
    id: 'task-06',
    title: 'ตรวจความต่อเนื่องข้ามคัต (Spatial & Lighting Continuity) ระหว่าง Shot 01 และ 02',
    deptId: 'qa',
    assignee: 'ศิรภัสสร & AI Auditor',
    status: 'OVERDUE',
    reviewStatus: 'NEEDS_REVISION',
    score: 91.2,
    deadline: '13 ต.ค. 21:30',
    deadlineDisplay: '13 ต.ค. 21:30 (เกินกำหนดส่งมาแล้ว 1 ชม. 15 นาที)',
    isOverdue: true,
    progress: 60,
    target: 'Shot 01 ➜ Shot 02',
    commentsCount: 4,
    lastComment: {
      author: 'ศิรภัสสร (QA Lead)',
      roleId: 'qa',
      text: 'แสงแฟลชฟ้าแลบใน Shot 01 กับ Shot 02 สว่างต่างกัน ขอให้ปรับ Color Temp ให้ตรงกัน 6500K',
      date: '13 ต.ค. 21:40'
    }
  },
  {
    id: 'task-07',
    title: 'ส่งตรวจไฟล์ Master ฉบับพรีวิวให้แบรนด์สปอนเซอร์ลงนามปล่อยคลิป',
    deptId: 'art_sponsor',
    assignee: 'ชลิดา (Art & Brand Lead)',
    status: 'OVERDUE',
    reviewStatus: 'NEEDS_REVISION',
    score: 93.5,
    deadline: '13 ต.ค. 22:00',
    deadlineDisplay: '13 ต.ค. 22:00 (เกินกำหนดส่งมาแล้ว 45 นาที)',
    isOverdue: true,
    progress: 50,
    target: 'Master Commercial Package',
    commentsCount: 3,
    lastComment: {
      author: 'แบรนด์ LUMIÈRE (Client)',
      roleId: 'art_sponsor',
      text: 'ขอให้ขวดเซรั่มใน Shot 03 เห็นประกายทองคำวิบวับชัดกว่านี้อีก 10% ก่อนเซ็นปล่อย',
      date: '13 ต.ค. 22:15'
    }
  },
  {
    id: 'task-08',
    title: 'เซ็นอนุมัติไฟนอลโดยผู้กำกับมนุษย์ (Director Sign-Off Master Release)',
    deptId: 'director',
    assignee: 'ผู้กำกับ ณัฐวุฒิ',
    status: 'IN_PROGRESS',
    reviewStatus: 'PENDING',
    score: 98.4,
    deadline: '14 ต.ค. 00:30',
    deadlineDisplay: '14 ต.ค. 00:30 (ขั้นตอนสุดท้าย)',
    isOverdue: false,
    progress: 90,
    target: 'Final Release Gate',
    commentsCount: 5,
    lastComment: {
      author: 'ผู้กำกับ ณัฐวุฒิ',
      roleId: 'director',
      text: 'ภาพรวม 98% พร้อมแล้ว รอฝ่ายภาพแก้แสงและฝ่ายสปอนเซอร์แก้ประกายทองคำเสร็จ พร้อมกดอนุมัติทันที',
      date: '13 ต.ค. 22:50'
    }
  }
];

export const INITIAL_DEPARTMENT_COMMENTS = [
  {
    id: 'cmt-01',
    author: 'ผู้กำกับ ณัฐวุฒิ',
    roleId: 'director',
    target: 'Shot 01: [00:00 - 00:04] น้ำตานางเอก',
    status: 'PASS',
    date: '13 ต.ค. 22:50',
    text: 'การแสดงใน Shot 01 น้ำตาที่เอ่อคลอเบ้ากับริมฝีปากที่สั่นสะกดอารมณ์ได้ทรงพลังมาก มุมกล้อง Low Angle ใน Shot 02 เสริมความอำมหิตของทาดาโอะได้ยอดเยี่ยม',
    pinned: true
  },
  {
    id: 'cmt-02',
    author: 'ศิรภัสสร (QA Lead)',
    roleId: 'qa',
    target: 'Shot 01 ➜ Shot 02 ความต่อเนื่องของแสง',
    status: 'NEEDS_REVISION',
    date: '13 ต.ค. 22:30',
    text: 'ตรวจพบความต่อเนื่องของแสงแฟลช: ช็อต 1 สว่างวาบโทน 6500K แต่ช็อต 2 สีติดอุ่น 5400K ขอให้อานนท์ปรับ White Balance ให้แมตช์กันด่วน',
    pinned: false
  },
  {
    id: 'cmt-03',
    author: 'แบรนด์ LUMIÈRE (Client & Sponsor)',
    roleId: 'art_sponsor',
    target: 'Shot 03: [00:15 - 00:35] ขวดเซรั่มทองคำ',
    status: 'NEEDS_REVISION',
    date: '13 ต.ค. 22:15',
    text: 'ตำแหน่งขวดและการจัดกรอบ 9:16 ดีมาก ไม่โดนปุ่ม UI บัง แต่ขอเพิ่มแสงไฮไลต์ตกกระทบฝาขวดสีทองคำให้ออร่าเด่นชัดขึ้นอีกนิดนึงครับ',
    pinned: false
  },
  {
    id: 'cmt-04',
    author: 'มนัส (Sound & Voice Lead)',
    roleId: 'sound',
    target: 'Shot 04: [00:35 - 01:10] ลมหายใจและคัทเสียง',
    status: 'PASS',
    date: '13 ต.ค. 21:55',
    text: 'เพิ่มเสียงลมหายใจ Stifled Gasp ตรงจังหวะสะอื้น และใส่เสียงตัดไฟดับพรึ่บพร้อมเสียงไซเรนเตือนภัยเรียบร้อย ได้อารมณ์ Cliffhanger สมบูรณ์แบบ',
    pinned: false
  },
  {
    id: 'cmt-05',
    author: 'อานนท์ (Cinematographer)',
    roleId: 'cinematography',
    target: 'Shot 02: มุมกล้อง -12° Low Angle',
    status: 'PASS',
    date: '13 ต.ค. 21:20',
    text: 'เซ็ตเลนส์ 50mm Anamorphic มุมเงย -12° เพื่อขับเน้นอำนาจของตัวละครทาดาโอะ คุม DoF ให้เห็นเงารินสะท้อนในกระจกตาเรียบร้อย',
    pinned: false
  },
  {
    id: 'cmt-06',
    author: 'กวินทร์ (Casting Director)',
    roleId: 'casting',
    target: 'Character Bible: เสื้อผ้าสูทสีกรมท่า',
    status: 'PASS',
    date: '13 ต.ค. 20:30',
    text: 'ล็อคชุดสูท Navy Wool Suit ของริน และสูทชาร์โคลสั่งตัดของทาดาโอะ รัน LoRA Weight 0.88 ไม่พบการเพี้ยนของกระดุมหรือเนกไท',
    pinned: false
  }
];
