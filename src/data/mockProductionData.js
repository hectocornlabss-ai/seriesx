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
      extremeActingImage: "/assets/rin_extreme_acting.jpg",
      actingStyle: "Method Acting — อารมณ์ดิบ ลึกซึ้ง แสดงออกทางสายตาและกล้ามเนื้อใบหน้ามากกว่าคำพูด",
      voiceProfile: {
        voiceId: "TH-Fem-Deep-04",
        tone: "คม ชัดเจน ซ่อนความเจ็บปวดและกลั้นน้ำตา",
        pitch: "-2 semitones",
        speed: "1.05x",
        breathIntensity: "0.45",
        microBreathing: "Auto-insert [stifled gasp] and [voice crack] on high tension",
        sampleLine: "[เสียงสั่นเครือ] ถ้าคืนนี้คุณไม่เซ็น... [สูดลมหายใจ] ข้อมูลนี้จะถึงมือนักข่าว!"
      },
      wardrobeSpec: "สูทเข้ารูปสีกรมท่า (Navy Wool Suit), เชิ้ตขาวผ้าไหม, ต่างหูมุกเรียบหรู",
      description: "อายุ 28 ปี ทนายสาวผู้ฉลาดรอบคอบ มีสายตามุ่งมั่นเด็ดเดี่ยว ไม่ยอมแพ้ต่ออำนาจมืด",
      expressionMatrix: [
        { label: "Neutral (สุขุม)", status: "Locked 100%" },
        { label: "Side Profile (ด้านข้าง)", status: "Locked 99%" },
        { label: "Anger/Stressed (โกรธแค้น)", status: "Locked 98%" },
        { label: "Sorrow / Tearful (น้ำตาคลอเบ้า)", status: "Locked 99%" }
      ],
      facsControls: {
        browInnerRaiser: 0.85,
        browLowerer: 0.70,
        lipTremor: 0.65,
        tearWelling: 0.80,
        pupilDilation: 0.85,
        jawTension: 0.75
      }
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
      extremeActingImage: "/assets/tadao_dutch_acting.jpg",
      actingStyle: "Micro-Suppression — ควบคุมอารมณ์ให้ดูนิ่งดั่งหินผา แต่แววตาดุจเหยี่ยวและขากรรไกรเกร็ง",
      voiceProfile: {
        voiceId: "TH-Male-Baritone-01",
        tone: "ทุ้มต่ำ ทรงอำนาจ เยือกเย็น ไร้ความปรานี",
        pitch: "-4 semitones",
        speed: "0.95x",
        breathIntensity: "0.30",
        microBreathing: "Slow measured exhales, vocal fry on sentence endings",
        sampleLine: "คุณคิดว่าการเอาชีวิตมาเสี่ยงในห้องของผม... [หยุดหายใจ 0.8s] มันจะเปลี่ยนอะไรได้เหรอ ริน?"
      },
      wardrobeSpec: "สูทกระดุมสองแถวสีเทาชาร์โคล (Charcoal Double-breasted), เนกไทไหมลายก้างปลา, นาฬิกาหรู",
      description: "อายุ 30 ปี ผู้นำตระกูลคุโรดะคนใหม่ ผู้กุมบังเหียนธุรกิจระดับหมื่นล้าน อารมณ์นิ่งดั่งผิวน้ำแต่ซ่อนแผนการลึกซึ้ง",
      expressionMatrix: [
        { label: "Dominant Smirk (เหยียดยิ้ม)", status: "Locked 99%" },
        { label: "Cold Stare (สายตาพิฆาต)", status: "Locked 100%" },
        { label: "Subtle Softness (แววตาอ่อนโยนแวบหนึ่ง)", status: "Locked 97%" }
      ],
      facsControls: {
        browInnerRaiser: 0.10,
        browLowerer: 0.85,
        lipTremor: 0.05,
        tearWelling: 0.00,
        pupilDilation: 0.60,
        jawTension: 0.95
      }
    }
  ],

  shots: [
    {
      id: "shot-01",
      number: "01",
      name: "The 3-Second Hook: Emotional Vulnerability & Threat",
      timecode: "00:00 - 00:04",
      duration: "4.0s",
      cameraDirector: {
        lens: "85mm Cine Prime f/1.4 (Master Portrait)",
        movement: "Vertical Slow Push-In (Z-Axis Depth + Subtle Handheld Shake)",
        framing: "Extreme Close-Up (Tight 9:16 Upper-Third Eyes)",
        depthOfField: "Ultra Shallow (ฉากหลังเบลอนวล เม็ดฝนบนกระจกเป็นโบเก้ระยิบระยับ)",
        tiltAngle: "Eye-level with 2° subtle Dutch Tilt to evoke instability"
      },
      actorDirecting: {
        character: "ริน ลลิตา",
        facialMicroExpressions: "น้ำตาเอ่อล้นคลอเบ้าขวา กะพริบตาช้าๆ 1 ครั้งให้น้ำตาหยดอาบแก้ม ริมฝีปากล่างสั่นระริก 1.2s ก่อนเกร็งเม้มสะกดความอ่อนแอ",
        bodyLanguage: "ยืนตัวตรงแต่ไหล่สั่นเล็กน้อย ปลายนิ้วมือขวาจิกมุมเอกสารจนข้อนิ้วขาว",
        facsCode: "AU1+AU4 (Brow Furrow), AU20 (Lip Tremor 70%), AU43 (Tear Shed)"
      },
      vocalProsody: {
        dialogue: "ถ้าคืนนี้คุณไม่เซ็นรับรองความบริสุทธิ์ของพ่อฉัน... พรุ่งนี้เช้า ข้อมูลนี้จะอยู่บนหน้าหนึ่งทุกสำนักข่าว!",
        withCues: "[เสียงสั่นเครือแผ่วเบา] ถ้าคืนนี้คุณไม่เซ็น... [สูดลมหายใจลึก กระแทกเสียงแค้น] พรุ่งนี้เช้า ข้อมูลนี้จะอยู่บนหน้าหนึ่งทุกสำนักข่าว!",
        emotionTag: "Furious Despair (แค้นระคนสิ้นหวัง 9/10)",
        vocalCurve: "เริ่มจากกระซิบสั่น 140Hz สู่การตะโกนคอแห้ง 260Hz พร้อมเสียงลมหายใจหอบหลังพูดจบ"
      },
      location: "ห้องประชุมกระจกชั้น 48 ท่ามกลางพายุฝนยามค่ำ",
      lighting: "Cinematic Teal & Warm Gold, Rim Light จากวิวตึกระฟ้า",
      sfx: "Thunderclap rumble, rain lashing on window pane, stifled breath intake",
      bgm: "Dark cinematic low cello swell with dissonant violin screech",
      qaStatus: "PASS",
      aiHookScore: 98,
      mediaUrl: "/assets/rin_extreme_acting.jpg"
    },
    {
      id: "shot-02",
      number: "02",
      name: "The Cold Retaliation: Low-Angle Power Stare",
      timecode: "00:04 - 00:15",
      duration: "11.0s",
      cameraDirector: {
        lens: "50mm Anamorphic Lens (Clean Vertical)",
        movement: "Low Angle Tilt-Up from Oak Desk to Tadao's Face",
        framing: "Low-Angle Power Shot 9:16 (มองจากมุมต่ำ เสริมความน่าเกรงขามและกดดัน)",
        depthOfField: "Deep Focus on Eyes (เห็นเงาสะท้อนของรินในกระจกตา)",
        tiltAngle: "-12° Low Angle"
      },
      actorDirecting: {
        character: "ทาดาโอะ คุโรดะ",
        facialMicroExpressions: "กรามขบแน่นเป็นสันนูน แววตาคมกริบไร้ความลังเล ไม่กะพริบตา มุมปากกระตุกเป็นรอยยิ้มเย็นชา 0.5s",
        bodyLanguage: "ทิ้งน้ำหนักแขนข้างหนึ่งลงบนโต๊ะ โน้มตัวเข้าหารินช้าๆ สร้างระยะคุกคาม",
        facsCode: "AU4 (Brow Lowerer 85%), AU14 (Dimpler Smirk 40%), Jaw Clench 95%"
      },
      vocalProsody: {
        dialogue: "คุณคิดว่าการเอาชีวิตมาเสี่ยงในห้องของผม... มันจะเปลี่ยนความจริงที่ว่าพ่อคุณทรยศตระกูลผมได้เหรอ ริน?",
        withCues: "คุณคิดว่าการเอาชีวิตมาเสี่ยงในห้องของผม... [หยุดนิ่ง 1.0s วางแก้วกระทบโต๊ะกริ๊ก] มันจะเปลี่ยนอะไรได้เหรอ... ริน?",
        emotionTag: "Chilling Composure (เย็นยะเยือก 10/10)",
        vocalCurve: "เสียงบาริโทนทุ้มต่ำคงที่ 90Hz เรียบนิ่ง ปลายเสียงทอดหนัก (Authoritative Vocal Fry)"
      },
      location: "ห้องประชุมชั้น 48",
      lighting: "Moody shadow over eye sockets, edge light",
      sfx: "Heavy crystal glass tap on black oak, slow measured footsteps",
      bgm: "Ominous violin tremolo",
      qaStatus: "PASS",
      aiHookScore: 94,
      mediaUrl: "/assets/tadao_dutch_acting.jpg"
    },
    {
      id: "shot-03",
      number: "03",
      name: "Sponsor Showcase: Defiant Confidence & Micro-Focus",
      timecode: "00:15 - 00:35",
      duration: "20.0s",
      cameraDirector: {
        lens: "50mm Macro Cine Prime f/2.0",
        movement: "Rack Focus from Rin's Determined Gaze to Serum Bottle on Desk",
        framing: "Over-the-Shoulder 9:16 with Center-weighted Product Framing",
        depthOfField: "Split Diopter Effect (หน้าตัวละครชัด + ขวดสปอนเซอร์ชัดพร้อมกัน)",
        tiltAngle: "Level Eye-line"
      },
      actorDirecting: {
        character: "ริน ลลิตา",
        facialMicroExpressions: "เชิดคางขึ้นเล็กน้อย แววตาเปลี่ยนจากเจ็บปวดเป็นความมั่นใจเด็ดเดี่ยว ปาดน้ำตาอย่างสง่างาม",
        bodyLanguage: "เปิดกระเป๋าหรูอย่างใจเย็น หยิบแฟ้มหลักฐานวางขนาบข้างขวดเซรั่มทองคำ",
        facsCode: "AU12 (Subtle Confident Smile 20%), AU53 (Head Up 15°)"
      },
      vocalProsody: {
        dialogue: "ฉันไม่ได้มาเสี่ยง... ฉันมาจบเกมโกหกที่คุณสร้างขึ้นมาต่างหาก",
        withCues: "ฉันไม่ได้มาเสี่ยง... [หัวเราะในลำคอเบาๆ] ฉันมาจบเกมโกหกที่คุณสร้างขึ้นมาต่างหาก",
        emotionTag: "Defiant Confidence (มั่นใจไม่หวั่นไหว)",
        vocalCurve: "น้ำเสียงสดใสขึ้น จังหวะพูดกระชับ คมชัดทุกพยางค์"
      },
      location: "โต๊ะประชุมหินอ่อนดำ",
      lighting: "Soft warm amber highlight on luxury serum bottle",
      sfx: "Bag zipper unzip, leather friction, digital key click",
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
      name: "The Midnight Cliffhanger: Extreme Dutch Proximity Clash",
      timecode: "00:35 - 01:10",
      duration: "35.0s",
      cameraDirector: {
        lens: "35mm Wide-Angle Cine",
        movement: "Vertical Whip-Pan to Proximity 2-Shot + Rapid Dutch Tilt (18°)",
        framing: "Vertical Split Profile (ระยะห่างระหว่างใบหน้าเพียง 5 ซม.)",
        depthOfField: "Cinematic Motion Blur on Sudden Movement",
        tiltAngle: "18° Dutch Angle for Extreme Psychological Crisis"
      },
      actorDirecting: {
        character: "ริน & ทาดาโอะ",
        facialMicroExpressions: "ทาดาโอะ: แววตาเบิกกว้างด้วยความตกใจอย่างแท้จริง ลืมตาโต 100% / ริน: หายใจหอบถี่ หันขวับมองสัญญาณไฟ",
        bodyLanguage: "ทาดาโอะคว้าข้อมือรินอย่างฉับพลัน ทั้งสองหยุดชะงัก ร่างกายเกร็งตึงพร้อมสู้",
        facsCode: "AU5 (Upper Lid Raiser), AU26 (Jaw Drop 45%), Sudden Reflex Pulse"
      },
      vocalProsody: {
        dialogue: "ทาดาโอะ: 'มีคนปิดระบบอาคาร... ใครบอกให้คุณมาที่นี่กันแน่!?'",
        withCues: "[เสียงตัดไฟพรึ่บ] ทาดาโอะ: [ตะคอกกระซิบชิดหู] 'มีคนปิดระบบอาคาร... ใครบอกให้คุณมาที่นี่กันแน่!?'",
        emotionTag: "Pure Shock & Escalated Threat (ตื่นตระหนกสุดขีด)",
        vocalCurve: "เสียงแตกพร่าด้วยความตื่นตระหนก ผสมเสียงหายใจหอบกระชั้นชิด"
      },
      location: "ห้องประชุมชั้น 48",
      lighting: "Sudden lightning strobe flash + Emergency Red Flashing Strobe",
      sfx: "Building blackout alarm klaxon, emergency red beacon, power cut boom",
      bgm: "Sudden explosive bass drop into total dead silence",
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
    overallScore: 98.4,
    status: "Ready for Human Director Sign-Off",
    timestamp: "2026-10-13 21:50:30",
    checks: [
      {
        id: "chk-acting",
        category: "Actor Micro-Expressions & FACS Realism",
        score: 98.9,
        status: "PASS",
        details: "ตรวจพบการเคลื่อนไหวกล้ามเนื้อใบหน้าสมจริง (AU1 คิ้วขมวด, AU20 ปากล่างสั่นระริก, หยดน้ำตาไหลเป็นทางอย่างเป็นธรรมชาติ ไม่แข็งทื่อ)"
      },
      {
        id: "chk-camera",
        category: "9:16 Vertical Cinematography & Camera Movement",
        score: 99.2,
        status: "PASS",
        details: "การจัดมุมกล้องแนวตั้ง 85mm Slow Push-in และ Low Angle Dutch Tilt สอดรับกับอารมณ์ดราม่าและไม่หลุด Safe Zone"
      },
      {
        id: "chk-voice",
        category: "Voice Prosody, Micro-Breath & Emotion Fidelity",
        score: 98.5,
        status: "PASS",
        details: "การออกเสียงภาษาไทยมีมิติอารมณ์สมบูรณ์แบบ ทั้งเสียงสั่นเครือ (Tremor), ลมหายใจสะอื้น (Stifled Gasp) และการทอดเสียงทุ้มต่ำ"
      },
      {
        id: "chk-face",
        category: "Face & Character Consistency",
        score: 98.7,
        status: "PASS",
        details: "ใบหน้ารินและทาดาโอะตรงกับ Character Bible 98.7% ไม่พบอาการ Morphing ระหว่างเปลี่ยนมุมกล้อง"
      },
      {
        id: "chk-safezone",
        category: "9:16 Vertical Safe Zone Compliance",
        score: 100,
        status: "PASS",
        details: "ใบหน้านักแสดง ซับไตเติล และสินค้าสปอนเซอร์ ไม่ทับซ้อนกับปุ่ม Like/Comment/Share ของ TikTok/Reels"
      }
    ],
    directorReview: {
      isApproved: false,
      approvedBy: "ผู้กำกับ ณัฐวุฒิ (Director)",
      directorNote: "การแสดงใน Shot 01 น้ำตาที่เอ่อคลอเบ้ากับริมฝีปากที่สั่นสะกดอารมณ์ได้ทรงพลังมาก มุมกล้อง Low Angle ใน Shot 02 เสริมความอำมหิตของทาดาโอะได้ยอดเยี่ยม เสียงกระซิบปนลมหายใจใน Shot 04 ทำให้คนดูลุ้นจนลืมหายใจ",
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
        },
        {
          version: "v1.2",
          date: "13 ต.ค. 2026 21:50",
          author: "Cinematography & Acting Director Agent",
          note: "เพิ่มระดับ FACS Micro-expressions: น้ำตาคลอเบ้า 85mm f/1.4, ขากรรไกรเกร็ง, และเพิ่มเสียงลมหายใจ Stifled Gasp ตรงจังหวะสะอื้น"
        }
      ]
    }
  }
};
