export const initialProductionData = {
  project: {
    id: "proj-001",
    title: "เงารัตติกาล (The Gilded Shadow)",
    englishTitle: "The Gilded Shadow",
    logline: "เมื่อทนายสาวผู้สูญเสียครอบครัว ต้องปลอมตัวเข้าไปเป็นผู้ช่วยส่วนตัวของทายาทมหาเศรษฐีผู้ทรงอิทธิพล แต่กลับค้นพบว่าเขาคือคนเดียวที่อาจช่วยเธอเปิดโปงความจริง หรือไม่ก็ทำลายเธอให้ดับสูญ",
    genre: "Romantic Revenge / Billionaire Mystery / Corporate Thriller",
    aspectRatio: "9:16 Vertical UHD (1080x1920)",
    targetFormat: "TikTok / ReelShort / DramaBox / Kuaishou",
    episodesCount: 60,
    currentEpisode: 1,
    episodeTitle: "EP 01: พันธสัญญาเที่ยงคืน (Midnight Collusion)",
    productionStatus: "Review & Approval Stage",
    pacingScore: {
      hookScore: 96,
      cliffhangerScore: 94,
      tensionIndex: 91,
      retentionProbability: "98.2% (High Virality)"
    }
  },

  characters: [
    {
      id: "char-rin",
      name: "ริน ลลิตา / Yuna Kim (Rin)",
      role: "ตัวเอกหญิง (Protagonist) - ทนายสาวสายสืบสวน",
      actorSeed: 77391024,
      loraModel: "Yuna_V2_Consistency_fp16.safetensors",
      loraWeight: 0.88,
      faceLockAccuracy: "98.7%",
      portrait: "/assets/rin_portrait.jpg",
      sheetImage: "/assets/rin_sheet.jpg",
      voiceProfile: {
        voiceId: "TH-Fem-Deep-04",
        tone: "คม ชัดเจน ซ่อนความเจ็บปวดและกลั้นน้ำตา",
        pitch: "-2 semitones",
        speed: "1.05x",
        breathIntensity: "0.45"
      },
      wardrobeSpec: "สูทเข้ารูปสีกรมท่า (Navy Wool Suit), เชิ้ตขาวผ้าไหม, ต่างหูมุกเรียบหรู",
      description: "อายุ 28 ปี ทนายสาวผู้ฉลาดรอบคอบ มีสายตามุ่งมั่นเด็ดเดี่ยว ไม่ยอมแพ้ต่ออำนาจมืด",
      expressionMatrix: [
        { label: "Neutral (สุขุม)", status: "Locked 100%" },
        { label: "Side Profile (ด้านข้าง)", status: "Locked 99%" },
        { label: "Anger/Stressed (โกรธแค้น)", status: "Locked 98%" },
        { label: "Sorrow (น้ำตาคลอ)", status: "Locked 98%" }
      ]
    },
    {
      id: "char-tadao",
      name: "ทาดาโอะ คุโรดะ / Tadao Kuroda",
      role: "พระเอก / ทายาทมหาเศรษฐี (Anti-Hero Lead)",
      actorSeed: 88941201,
      loraModel: "Tadao_Charismatic_V3.safetensors",
      loraWeight: 0.92,
      faceLockAccuracy: "99.1%",
      portrait: "/assets/tadao_portrait.jpg",
      voiceProfile: {
        voiceId: "TH-Male-Baritone-01",
        tone: "ทุ้มต่ำ ทรงอำนาจ เยือกเย็น ไร้ความปรานี",
        pitch: "-4 semitones",
        speed: "0.95x",
        breathIntensity: "0.30"
      },
      wardrobeSpec: "สูทกระดุมสองแถวสีเทาชาร์โคล (Charcoal Double-breasted), เนกไทไหมลายก้างปลา, นาฬิกาหรู",
      description: "อายุ 30 ปี ผู้นำตระกูลคุโรดะคนใหม่ ผู้กุมบังเหียนธุรกิจระดับหมื่นล้าน อารมณ์นิ่งดั่งผิวน้ำแต่ซ่อนแผนการลึกซึ้ง",
      expressionMatrix: [
        { label: "Dominant Smirk (เหยียดยิ้ม)", status: "Locked 99%" },
        { label: "Cold Stare (สายตาพิฆาต)", status: "Locked 100%" },
        { label: "Subtle Softness (แววตาอ่อนโยนแวบหนึ่ง)", status: "Locked 97%" }
      ]
    }
  ],

  shots: [
    {
      id: "shot-01",
      number: "01",
      name: "The 3-Second Hook (ฉากเปิดตรึงคนดู)",
      timecode: "00:00 - 00:04",
      duration: "4.0s",
      cameraAngle: "Vertical Medium Close-up (9:16 Slow Push-in)",
      location: "ห้องประชุมกระจกชั้น 48 ท่ามกลางพายุฝนยามค่ำ",
      lighting: "Cinematic Teal & Orange, Rim Light จากวิวตึกระฟ้า",
      character: "ริน & ทาดาโอะ",
      action: "รินยืนประจันหน้าทาดาโอะด้วยดวงตาสั่นระริกแต่แน่วแน่ ชูแฟ้มคดีที่มุมกระดาษมีรอยไหม้",
      dialogue: "ถ้าคืนนี้คุณไม่เซ็นรับรองความบริสุทธิ์ของพ่อฉัน... พรุ่งนี้เช้า ข้อมูลนี้จะอยู่บนหน้าหนึ่งทุกสำนักข่าว!",
      emotionTag: "Furious Despair (แค้นระคนสิ้นหวัง 9/10)",
      sfx: "Thunderclap rumble, rain lashing on window pane",
      bgm: "Dark cinematic low cello swell",
      qaStatus: "PASS",
      aiHookScore: 98,
      mediaUrl: "/assets/vertical_shot_boardroom.jpg"
    },
    {
      id: "shot-02",
      number: "02",
      name: "The Cold Retaliation (การโต้กลับสุดเย็นชา)",
      timecode: "00:04 - 00:15",
      duration: "11.0s",
      cameraAngle: "Low Angle Close-up on Tadao",
      location: "ห้องประชุมชั้น 48",
      lighting: "Moody shadow over eye sockets, edge light",
      character: "ทาดาโอะ",
      action: "ทาดาโอะค่อยๆ วางแก้ววิสกี้ลงบนโต๊ะไม้โอ๊คดำ ก้าวเข้าหารินช้าๆ อย่างไร้ความกลัว",
      dialogue: "คุณคิดว่าการเอาชีวิตมาเสี่ยงในห้องของผม... มันจะเปลี่ยนความจริงที่ว่าพ่อคุณทรยศตระกูลผมได้เหรอ ริน?",
      emotionTag: "Chilling Composure (เย็นยะเยือก 10/10)",
      sfx: "Heavy crystal glass tap, slow measured footsteps",
      bgm: "Ominous violin tremolo",
      qaStatus: "PASS",
      aiHookScore: 94,
      mediaUrl: "/assets/vertical_shot_boardroom.jpg"
    },
    {
      id: "shot-03",
      number: "03",
      name: "Sponsor Product Showcase (ซีนเปิดเผยหลักฐาน & สปอนเซอร์)",
      timecode: "00:15 - 00:35",
      duration: "20.0s",
      cameraAngle: "Over-Shoulder 9:16 + Focus Shift to Desk",
      location: "โต๊ะประชุมหินอ่อนดำ",
      lighting: "Soft warm amber highlight on luxury serum bottle",
      character: "ริน",
      action: "รินเปิดกระเป๋าถือหรูเพื่อหยิบไดรฟ์ลับ ข้างกระเป๋ามีขวดสปอนเซอร์ 'LUMIÈRE Elixir D'or' ตั้งเด่นอย่างเป็นธรรมชาติ ตัวละครแตะผิวหน้าอย่างมั่นใจ",
      dialogue: "ฉันไม่ได้มาเสี่ยง... ฉันมาจบเกมโกหกที่คุณสร้างขึ้นมาต่างหาก",
      emotionTag: "Defiant Confidence (มั่นใจไม่หวั่นไหว)",
      sfx: "Bag zipper unzip, leather friction, digital beep",
      bgm: "High-tension rhythmic synth pulse",
      qaStatus: "PASS",
      sponsorIntegration: {
        productName: "LUMIÈRE Elixir D'or Serum",
        exposureTime: "4.8s",
        safeZoneCompliance: "100% (No UI obstruction)",
        sponsorImpressionScore: "9.8/10"
      },
      mediaUrl: "/assets/sponsor_serum.jpg"
    },
    {
      id: "shot-04",
      number: "04",
      name: "The Midnight Cliffhanger (จุดทิ้งท้ายชวนช็อก)",
      timecode: "00:35 - 01:10",
      duration: "35.0s",
      cameraAngle: "Extreme Dutch Close-up on both faces",
      location: "ห้องประชุมชั้น 48",
      lighting: "Sudden lightning strobe flash",
      character: "ริน & ทาดาโอะ",
      action: "ทาดาโอะคว้าข้อมือรินไว้ สายตาสบกันระยะประชิด ทันใดนั้นมีเสียงลิฟต์ฉุกเฉินเปิด และเสียงสัญญาณเตือนภัยดังขึ้น!",
      dialogue: "ทาดาโอะ: 'มีคนปิดระบบอาคาร... ใครบอกให้คุณมาที่นี่กันแน่!?'",
      emotionTag: "Pure Shock & Escalated Threat (ตื่นตระหนกสุดขีด)",
      sfx: "Building blackout alarm klaxon, emergency red beacon",
      bgm: "Sudden explosive bass drop into silence",
      qaStatus: "APPROVED",
      cliffhangerScore: 98,
      mediaUrl: "/assets/vertical_shot_boardroom.jpg"
    }
  ],

  sponsorProduct: {
    id: "sp-01",
    brand: "LUMIÈRE Laboratories",
    productName: "LUMIÈRE Elixir D'or (Revitalizing Serum)",
    tagline: "กุญแจสู่ผิวอ่อนเยาว์เหนือกาลเวลา พลังทองคำบริสุทธิ์",
    heroImage: "/assets/sponsor_serum.jpg",
    category: "Luxury Skincare / Cosmetics",
    contractTier: "Tier-1 Exclusive Drama Sponsor",
    placementsPerEpisode: 1,
    targetScreenTimeSec: 4.5,
    actualScreenTimeSec: 4.8,
    estimatedAudienceViews: "2,500,000+ views (Shorts/TikTok Reach)",
    safeZoneVerified: true,
    sponsorStatus: "Contract Signed & Scene Validated",
    sponsorRevenueTHB: 450000,
    placementNotes: "วางในฉากโต๊ะทำงานของผู้บริหารและกระเป๋าถือของนางเอก สื่อถึงความหรูหรา น่าเชื่อถือ"
  },

  qaReport: {
    overallScore: 97.4,
    status: "Ready for Human Director Sign-Off",
    timestamp: "2026-10-13 21:28:45",
    checks: [
      {
        id: "chk-face",
        category: "Face & Character Consistency",
        score: 98.7,
        status: "PASS",
        details: "ใบหน้ารินและทาดาโอะมีความต่อเนื่องกับ Character Bible 98.7% ไม่พบอาการ Morphing หรือฟีเจอร์เบลอ"
      },
      {
        id: "chk-audio",
        category: "Emotion-Aware Lip-Sync & Voice Fidelity",
        score: 97.2,
        status: "PASS",
        details: "รูปปากและการออกเสียงภาษาไทยตรงจังหวะคำพูด พลังเสียงในประโยคตะโกนเข้าคู่กับเส้นเสียงความโกรธ 9/10"
      },
      {
        id: "chk-safezone",
        category: "9:16 Vertical Safe Zone Compliance",
        score: 100,
        status: "PASS",
        details: "ใบหน้านักแสดง ซับไตเติล และสินค้าสปอนเซอร์ ไม่ทับซ้อนกับปุ่ม Like/Comment/Share ของ TikTok/Reels"
      },
      {
        id: "chk-hook",
        category: "3-Second Hook & Retention Dynamics",
        score: 96.5,
        status: "PASS",
        details: "ฉากเปิดเสี้ยววินาทีแรกมี Visual Tension สูงมาก (สายฝน + แฟ้มไฟลุก + สีหน้าแค้น) คาดการณ์ยอดดูจบตอน >85%"
      },
      {
        id: "chk-wardrobe",
        category: "Wardrobe & Lighting Continuity",
        score: 96.0,
        status: "PASS",
        details: "ชุดสูทของตัวละครและเงาสะท้อนกระจกไม่ผิดเพี้ยนระหว่างการตัดสลับ Shot 01 -> Shot 02"
      }
    ],
    directorReview: {
      isApproved: false,
      approvedBy: "ผู้กำกับ ณัฐวุฒิ (Director)",
      directorNote: "จังหวะ Shot 01 แสงสะท้อนกระจกสวยมาก ให้เพิ่มเสียงฟ้าร้องให้สะเทือนอารมณ์ขึ้นอีก 10% ใน Shot 04 จุด Cliffhanger ตัดเข้าเครดิตได้สมบูรณ์แบบ!",
      revisionHistory: [
        {
          version: "v1.0",
          date: "13 ต.ค. 2026 19:40",
          author: "AI Auditor",
          note: "สร้างฉากและวิดีโอรอบแรก - ตรวจพบ Safe Zone ใน Shot 03 ชิดขวาเกินไป 40px"
        },
        {
          version: "v1.1",
          date: "13 ต.ค. 2026 20:55",
          author: "Art & Sponsor AI Agent",
          note: "ขยับตำแหน่งขวดเซรั่ม LUMIÈRE มาตรงกลาง ปรับกล้อง 9:16 - ผลตรวจผ่าน 100%"
        }
      ]
    }
  }
};
