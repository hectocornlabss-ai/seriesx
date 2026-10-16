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
    status: 'COMPLETED',
    reviewStatus: 'PASS',
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
    },
    deliverable: {
      type: 'screenplay',
      title: 'บทนิยายต้นฉบับ & การสกัดช็อตผลิต EP01: พันธสัญญาเที่ยงคืน',
      summary: 'ร่างบทความยาว 2,450 คำ พร้อมโครงสร้าง 3-Second Hook และ 4 ช็อตหลักสำหรับการผลิตวิดีโอ 9:16',
      submittedAt: '13 ต.ค. 13:45 น.',
      submittedBy: 'พิมลภัส (Head Writer)',
      files: [
        { name: 'EP01_Midnight_Collusion_Draft_Final.docx', size: '1.4 MB', type: 'doc' },
        { name: '4_Shots_Dramatic_Breakdown.pdf', size: '2.8 MB', type: 'pdf' }
      ],
      content: {
        hookSummary: 'เปิดฉาก 3 วินาทีด้วยน้ำตาที่เอ่อล้นเบ้าตาขวาของริน ลลิตา ตัดสลับกับความเย็นชาของทาดาโอะ คุโรดะ สร้างแรงดึงดูดทะลุจอ 96/100',
        novelExcerpt: `เสียงฟ้าร้องคำรามกึกก้องเหนือเพนต์เฮาส์หรูใจกลางกรุงเทพฯ เม็ดฝนหนาทึบสาดซัดกระจกบานยักษ์จนกลายเป็นม่านน้ำเบลอแสงไฟนีออนของมหานคร

ริน ลลิตา ยืนกำหมัดแน่นจนเล็บจิกเข้าเนื้อตัวเอง ดวงตากลมโตที่เคยเปี่ยมประกายความหวังบัดนี้เอ่อคลอไปด้วยหยาดน้ำตา แต่ริมฝีปากบางกลับเม้มแน่นสะกดกลั้นความอ่อนแอ

ตรงหน้าเธอ คือ ทาดาโอะ คุโรดะ ชายวัยห้าสิบต้นๆ ในสูทชาร์โคลสั่งตัดพิเศษจากมิลาน เขายกแก้ววิสกี้ขึ้นจิบช้าๆ แววตาคมกริบดุจเหยี่ยวล่าเหยื่อปราศจากความเมตตา

"ในโลกนี้ ไม่มีอะไรที่ฉันอยากได้แล้วไม่ได้... แม้แต่ศักดิ์ศรีของเธอ ริน"`,
        shotsBreakdown: [
          { shotNum: 'Shot 01', name: 'The 3-Second Hook', timing: '00:00 - 00:04', dialogue: '"ถ้าคุณคิดว่าเงินซื้อทุกอย่างได้... คุณคิดถูก"', emotion: 'ความสิ้นหวัง & น้ำตาเอ่อคลอ (AU1+AU4)' },
          { shotNum: 'Shot 02', name: 'The Cold Retaliation', timing: '00:05 - 00:15', dialogue: '"ในโลกนี้ ไม่มีอะไรที่ฉันอยากได้แล้วไม่ได้... แม้แต่ศักดิ์ศรีของเธอ"', emotion: 'อำนาจคุกคาม & รอยยิ้มเย็นชา (AU4+AU14)' },
          { shotNum: 'Shot 03', name: 'Sponsor Showcase', timing: '00:16 - 00:35', dialogue: '"อย่าลืมหยิบเซรั่มขวดนั้นไปด้วยล่ะ... มันเหมาะกับคนปากดีอย่างเธอ"', emotion: 'สปอนเซอร์วางหรู 4.8s (Safe Zone 100%)' },
          { shotNum: 'Shot 04', name: 'The Midnight Cliffhanger', timing: '00:36 - 01:10', dialogue: '"แล้วเจอกันที่นรก... คุณทาดาโอะ"', emotion: 'ตัดจบพีคกระชากอารมณ์ ค้างเติ่งข้ามตอน' }
        ],
        metrics: {
          wordCount: '2,450 คำ',
          hookScore: '96/100',
          viralityIndex: '94.2%',
          readTime: '2 นาที 15 วินาที'
        }
      }
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
    },
    deliverable: {
      type: 'casting',
      title: 'คัมภีร์ตัวละคร & LoRA Face Lock 98.7% (ริน ลลิตา & ทาดาโอะ)',
      summary: 'โมเดล LoRA และ Seed ใบหน้า 2 ตัวละครหลัก ล็อคเสื้อผ้า Navy Wool Suit และ Charcoal Double-breasted Coat',
      submittedAt: '13 ต.ค. 16:50 น.',
      submittedBy: 'กวินทร์ (Casting Lead)',
      files: [
        { name: 'Character_Bible_Series001_v3.pdf', size: '4.2 MB', type: 'pdf' },
        { name: 'Rin_FaceLock_v2.safetensors', size: '144 MB', type: 'model' },
        { name: 'Tadao_FaceLock_v2.safetensors', size: '144 MB', type: 'model' }
      ],
      content: {
        characterProfiles: [
          {
            name: 'ริน ลลิตา (Rin Lalita)',
            role: 'นางเอกผู้สูญเสียทุกอย่าง แต่ไม่ยอมแพ้ต่อโชคชะตา',
            seed: 77391024,
            loraModel: 'Rin_Lalita_FaceLock_v2.safetensors (0.88)',
            faceMatchScore: '98.7%',
            wardrobe: 'สูทเข้ารูปสีกรมท่า (Navy Wool Suit), เชิ้ตขาวผ้าไหม, ต่างหูมุกเรียบหรู',
            imageUrl: '/assets/rin_avatar.png'
          },
          {
            name: 'ทาดาโอะ คุโรดะ (Tadao Kuroda)',
            role: 'นักธุรกิจมหาเศรษฐีผู้กุมความลับและอำนาจมืด',
            seed: 88291045,
            loraModel: 'Tadao_Kuroda_FaceLock_v2.safetensors (0.88)',
            faceMatchScore: '99.1%',
            wardrobe: 'สูทกระดุมสองแถวสีเทาชาร์โคล (Charcoal Double-breasted), เนกไทไหมลายก้างปลา, นาฬิกาหรู',
            imageUrl: '/assets/tadao_avatar.png'
          }
        ]
      }
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
    },
    deliverable: {
      type: 'cinematography',
      title: 'แผนกล้องภาพยนตร์แนวตั้ง 9:16 (Cinematography Director Suite)',
      summary: 'สเปกเลนส์ 85mm & 50mm Anamorphic, เวกเตอร์การเคลื่อนกล้อง Slow Push-in, และการจัดแสง Rembrandt 4:1 Dual Teal/Amber',
      submittedAt: '13 ต.ค. 19:15 น.',
      submittedBy: 'อานนท์ (Cinematographer)',
      files: [
        { name: 'Cinematography_Grammar_EP01.pdf', size: '3.1 MB', type: 'pdf' },
        { name: 'Camera_Vector_Timeline_9x16.json', size: '24 KB', type: 'data' }
      ],
      content: {
        cameraSpecs: [
          { shot: 'Shot 01', lens: '85mm Cine Prime f/1.4', move: 'Vertical Slow Push-In (Z-Axis Depth) + Subtle Shake', angle: 'Eye-level 2° Dutch Tilt', lighting: 'Rembrandt 4:1 Teal/Amber (6500K/2700K)' },
          { shot: 'Shot 02', lens: '50mm Anamorphic Prime T1.5', move: 'Low Angle Tilt-Up from Oak Desk to Face', angle: '-12° Low Angle', lighting: 'High-Contrast Side Key 5:1' },
          { shot: 'Shot 03', lens: '50mm Macro Cine Prime f/2.0', move: 'Slow Dutch Orbit over Serum Bottle', angle: 'Product Level 0°', lighting: 'Gold Specular Highlight on Cap' },
          { shot: 'Shot 04', lens: '85mm Cine Prime f/1.4', move: 'Hypnotic Rack Focus & Pull-Out', angle: 'High Angle Despair 15°', lighting: 'Silhouette Edge Rim Light' }
        ]
      }
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
    },
    deliverable: {
      type: 'sponsor',
      title: 'รายงานการจัดวางแบรนด์ LUMIÈRE Serum 4.8s & TikTok Safe Zone',
      summary: 'ชุดภาพถ่ายสินค้า 8 มุมมอง พร้อมการทดสอบ Safe Zone 9:16 ไม่ทับปุ่ม Like, Comment, Share ของแพลตฟอร์มโซเชียล',
      submittedAt: '13 ต.ค. 20:55 น.',
      submittedBy: 'ชลิดา (Art & Brand Lead)',
      files: [
        { name: 'Lumiere_Serum_8Angles_Bank.zip', size: '18.4 MB', type: 'zip' },
        { name: 'TikTok_9x16_SafeZone_Audit.pdf', size: '2.2 MB', type: 'pdf' }
      ],
      content: {
        brandName: 'LUMIÈRE Cellular Rejuvenating Serum',
        commercialContract: 'สัญญาฉบับ LUM-TH-2026-004 | มูลค่า ฿1,150,000 บาท',
        exposureTime: '4.8 วินาที (Anchor Time: 00:22.4s)',
        safeZoneStatus: '100% Pass (ห่างจากขอบขวา 88px, ห่างจากแถบแคปชันล่าง 140px)',
        narrativeJustification: 'ทาดาโอะยื่นขวดเซรั่มให้รินเป็นสัญลักษณ์ของการให้และการครอบงำความงาม กลืนเนียนไปกับบทสนทนา ไม่รู้สึกเหมือนโฆษณาคั่น'
      }
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
    },
    deliverable: {
      type: 'sound',
      title: 'ไฟล์เสียงพากย์สังเคราะห์ ElevenLabs & มิกซ์ 3 แทร็ก (Voice / SFX / BGM)',
      summary: 'เสียงพากย์ไทยโมเดล Multilingual v2 พร้อมไดอะล็อกProsody ลมหายใจสะอื้น และซาวด์แทร็กแอมเบียนต์ฝนตก',
      submittedAt: '13 ต.ค. 22:30 น.',
      submittedBy: 'มนัส (Sound & Voice Lead)',
      files: [
        { name: 'Shot01_Rin_Voice_ElevenLabs.mp3', size: '720 KB', type: 'audio' },
        { name: 'Shot02_Tadao_Voice_ElevenLabs.mp3', size: '940 KB', type: 'audio' },
        { name: 'Full_Episode_AudioMix_3Stems.wav', size: '14.8 MB', type: 'audio' }
      ],
      content: {
        vocalSettings: 'Pitch -2st, Speed 1.05x, Stability 0.40, Similarity 0.85, Breath Intensity 0.45',
        sfxTrack: 'เสียงเม็ดฝนกระทบกระจกเพนต์เฮาส์ + เสียงฟ้าร้องครืนไกลๆ + เสียงแก้ววิสกี้กระทบโต๊ะ',
        bgmTrack: 'Cinematic Low Drone C-Minor + Emotional Piano Minimalist'
      }
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
    },
    revisionTicket: {
      id: 'rev-01',
      reviewer: 'ศิรภัสสร (QA Lead)',
      comment: 'แสงแฟลชฟ้าแลบใน Shot 01 กับ Shot 02 สว่างต่างกัน ขอให้อานนท์ (ฝ่ายกล้อง) ปรับ Color Temp ให้ตรงกัน 6500K และเทียบรูปแนบ',
      attachmentImage: '/assets/sponsor_product.png',
      attachmentVideo: '',
      priority: 'URGENT',
      date: '13 ต.ค. 21:40 น.',
      resolved: false
    },
    deliverable: {
      type: 'qa_continuity',
      title: 'รายงานการตรวจสอบความต่อเนื่องแสงและพื้นที่ (Cross-Shot Continuity Matrix)',
      summary: 'การเปรียบเทียบคัตต่อคัตระหว่าง Shot 01 (ริน) และ Shot 02 (ทาดาโอะ) พบจุดต้องปรับแก้แสงฟ้าแลบ',
      submittedAt: '13 ต.ค. 21:25 น.',
      submittedBy: 'ศิรภัสสร & AI Auditor',
      files: [
        { name: 'Shot01_02_Lighting_Mismatch_Diff.jpg', size: '2.4 MB', type: 'image' },
        { name: 'AI_Continuity_Audit_Report.pdf', size: '1.8 MB', type: 'pdf' }
      ],
      content: {
        issueDetected: 'แสงฟ้าแลบใน Shot 01 อุณหภูมิสี 6500K (Daylight Blue) แต่ใน Shot 02 มีอุณหภูมิสี 5200K (Warm White) ทำให้เกิดอาการ Flickering ข้ามคัต',
        requiredFix: 'ให้อานนท์ (Cinematographer) รีเรนเดอร์ Shot 02 ด้วย Lighting Token [Lightning Flash Temp: 6500K Dual-Matched] ทันที'
      }
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
    },
    revisionTicket: {
      id: 'rev-02',
      reviewer: 'แบรนด์ LUMIÈRE (Client)',
      comment: 'ขอให้ขวดเซรั่มใน Shot 03 เห็นประกายทองคำวิบวับชัดกว่านี้อีก 10% ตามคลิปเรฟเฟอเรนซ์ก่อนเซ็นปล่อยงบ',
      attachmentImage: '',
      attachmentVideo: 'https://assets.seriesx.studio/previews/shot03_ref.mp4',
      priority: 'URGENT',
      date: '13 ต.ค. 22:15 น.',
      resolved: false
    },
    deliverable: {
      type: 'sponsor_master',
      title: 'แพ็กเกจวิดีโอมาสเตอร์สปอนเซอร์ฉบับพรีวิว 9:16 สำหรับแบรนด์ลงนาม',
      summary: 'คลิปความยาว 1 นาที 10 วินาที พร้อมลายน้ำตัวอย่าง และการตัดต่อช็อตสปอนเซอร์ 00:16-00:35',
      submittedAt: '13 ต.ค. 21:50 น.',
      submittedBy: 'ชลิดา (Art & Brand Lead)',
      files: [
        { name: 'SeriesX_EP01_Lumiere_Master_Watermarked.mp4', size: '48.6 MB', type: 'video' },
        { name: 'Commercial_Ledger_Invoice.pdf', size: '890 KB', type: 'pdf' }
      ],
      content: {
        feedbackNotes: 'ตัวแทนแบรนด์ขอให้ปรับเพิ่มความแวววาวสีทอง (Gold Specular Lustre) ของฝาขวดเซรั่มในเฟรมที่ 320-410 ก่อนลงนามอนุมัติเบิกงบ 1,150,000 บาท'
      }
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
    },
    deliverable: {
      type: 'director_signoff',
      title: 'ใบรับรองความสมบูรณ์การผลิต 8 เสาหลัก (Hollywood 8-Pillars Production Release)',
      summary: 'การตรวจสอบไฟนอลทั้ง 8 มิติ: ท่าทาง, ตัวละคร, เสื้อผ้า, ฉาก&แสง, เสียง, มุมกล้อง, ความต่อเนื่อง, การเคลื่อนไหวธรรมชาติ',
      submittedAt: '13 ต.ค. 22:40 น.',
      submittedBy: 'ผู้กำกับ ณัฐวุฒิ',
      files: [
        { name: 'SeriesX_Master_Release_Checklist.pdf', size: '1.5 MB', type: 'pdf' }
      ],
      content: {
        hollywoodAuditStatus: '8/8 เสาหลักผ่านเกณฑ์คุณภาพฮอลลีวูด (98.4% Score)',
        releaseStatus: 'พร้อมส่งออก Production Prompts และนำส่งแพลตฟอร์ม Short Drama ทันทีที่ปลดล็อก'
      }
    }
  }
];

export const INITIAL_DEPARTMENT_NOTIFICATIONS = [
  {
    id: 'notif-01',
    taskId: 'task-06',
    deptId: 'cinematography',
    targetAssignee: 'อานนท์ (Cinematographer)',
    taskTitle: 'ตรวจความต่อเนื่องข้ามคัต (Spatial & Lighting Continuity)',
    reviewer: 'ศิรภัสสร (QA Lead)',
    type: 'REVISION_RETURNED',
    message: 'แสงแฟลชฟ้าแลบใน Shot 01 กับ Shot 02 สว่างต่างกัน ขอให้ปรับ Color Temp ให้ตรงกัน 6500K',
    attachmentImage: '/assets/sponsor_product.png',
    attachmentVideo: '',
    timestamp: '13 ต.ค. 21:40',
    isRead: false
  },
  {
    id: 'notif-02',
    taskId: 'task-07',
    deptId: 'art_sponsor',
    targetAssignee: 'ชลิดา (Art & Brand Lead)',
    taskTitle: 'ส่งตรวจไฟล์ Master ฉบับพรีวิวให้แบรนด์สปอนเซอร์ลงนามปล่อยคลิป',
    reviewer: 'แบรนด์ LUMIÈRE (Client)',
    type: 'REVISION_RETURNED',
    message: 'ขอให้ขวดเซรั่มใน Shot 03 เห็นประกายทองคำวิบวับชัดกว่านี้อีก 10% ก่อนเซ็นปล่อย',
    attachmentImage: '',
    attachmentVideo: 'https://assets.seriesx.studio/previews/shot03_ref.mp4',
    timestamp: '13 ต.ค. 22:15',
    isRead: false
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
