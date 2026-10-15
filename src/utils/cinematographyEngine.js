/**
 * Hollywood Cinematography & Emotional Grammar Engine
 * SeriesX Studio — AI Vertical Drama Production Platform
 * 
 * Deeply integrates Hollywood film grammar, psychological camera positioning,
 * optical lens physics, and biological human micro-acting (FACS) for 9:16 vertical drama.
 */

export const HOLLYWOOD_EMOTIONAL_ARCHETYPES = {
  VULNERABILITY_TEARS: {
    id: 'vulnerability_tears',
    name: 'ความเปราะบาง & กลั้นน้ำตา (Vulnerability & Sorrow)',
    psychologicalIntent: 'ดึงคนดูเข้าสู่จิตใจที่แหลกสลายของตัวละคร บีบพื้นที่ให้รู้สึกอึดอัดและเห็นใจสุดหัวใจ',
    hollywoodRef: 'The Godfather Part III (Al Pacino silent scream) / Manchester by the Sea',
    cameraAngle: 'Level Eye-Line with Tight 9:16 Headroom',
    tiltAngle: '0° Eye-to-Eye Connection',
    lens: '85mm Cine Prime f/1.4 (Master Portrait)',
    depthOfField: 'Ultra-Shallow f/1.4 (ฉากหลังเบลอนวล เม็ดฝนระยิบระยับเป็นโบเก้)',
    movement: 'Vertical Slow Push-In (Z-Axis Depth at 0.25m/s — บีบพื้นที่จิตวิทยาช้าๆ)',
    framing: 'Extreme Close-Up (Tight 9:16 Upper-Third Eyes Focus)',
    lightingRatio: 'Soft Rembrandt Lighting with subtle silver eye-reflector (ส่องประกายน้ำตา)',
    facsCode: 'AU1+AU4 (Brow Anguish), AU20 (Lip Tremor 70%), AU43 (Tear Duct Release)',
    biologicalMotion: 'หายใจสะอื้นแผ่วเบา ยอดอกและไหปลาร้ากระเพื่อม 14 ครั้ง/นาที, กะพริบตาถี่ 2 ครั้งก่อนน้ำตาหยด'
  },
  CHILLING_DOMINANCE: {
    id: 'chilling_dominance',
    name: 'อำนาจคุกคาม & เหนือกว่า (Chilling Dominance & Power)',
    psychologicalIntent: 'ทำให้ตัวละครดูยิ่งใหญ่ น่าเกรงขาม และกดดันอีกฝ่ายจนแทบหายใจไม่ออก',
    hollywoodRef: 'The Dark Knight (Joker interrogation) / Succession (Logan Roy low-angle intimidation)',
    cameraAngle: 'Low-Angle Power Shot (-12° ถึง -18°)',
    tiltAngle: '-14° Low-Angle Tilt-Up',
    lens: '50mm Anamorphic Prime T1.5 (Clean Vertical Stretch)',
    depthOfField: 'Deep Focus on Eyes (เห็นภาพสะท้อนเหยื่อในรูม่านตาอย่างคมชัด)',
    movement: 'Slow Low-Angle Tilt-Up from Oak Desk to Menacing Gaze',
    framing: 'Low-Angle Medium Close-Up 9:16 (ตัวละครสูงตระหง่านเต็ม 75% ของจอมือถือ)',
    lightingRatio: 'Moody High-Contrast Chiaroscuro 4:1 (เบ้าตาจมอยู่ในเงาดำ Edge Light ตัดสันกราม)',
    facsCode: 'AU4 (Brow Lowerer 85%), AU14 (Dimpler Smirk 40%), Jaw Clench 95%',
    biologicalMotion: 'การหายใจนิ่งสงบช้า 8 ครั้ง/นาที, ไม่กะพริบตาเป็นเวลา 4 วินาที, ขากรรไกรขบแน่นเป็นสันนูน'
  },
  PSYCHOLOGICAL_CRISIS: {
    id: 'psychological_crisis',
    name: 'วิกฤตจิตวิทยา & พลิกผัน (Psychological Crisis & Cliffhanger)',
    psychologicalIntent: 'สร้างความรู้สึกว่าโลกกำลังพังทลาย ควบคุมสถานการณ์ไม่ได้ และกระตุ้นอะดรีนาลีนคนดูสูงสุด',
    hollywoodRef: 'Inception (Hotel hallway tilt) / Parasite (Basement discovery dutch angle)',
    cameraAngle: 'Extreme Dutch Angle (มุมเอียงคาสิโน 15° - 18°)',
    tiltAngle: '16° Dutch Tilt (ฉากหลังเอียงกระชากอารมณ์)',
    lens: '35mm Wide-Angle Cine Prime f/1.8',
    depthOfField: 'Dynamic Motion Blur on Sudden Movement',
    movement: 'Vertical Whip-Pan to Proximity 2-Shot + Rapid Dutch Counter-Tilt',
    framing: 'Vertical Split Profile (ระยะประชิด 5 ซม. สองตัวละครในหนึ่งเฟรมแนวตั้ง)',
    lightingRatio: 'Emergency Red Beacon Strobe + Sudden Lightning Flash Contrast',
    facsCode: 'AU5 (Upper Lid Raiser 100%), AU26 (Jaw Drop 45%), Sudden Reflex Pulse',
    biologicalMotion: 'การหายใจหอบกระชั้นชิด 24 ครั้ง/นาที, ม่านตาขยายฉับพลัน (Pupil Dilation 85%), กลืนน้ำลายสะดุด'
  },
  INTIMATE_TENSION: {
    id: 'intimate_tension',
    name: 'ความตึงเครียดโรแมนติก & ใกล้ชิด (Intimate Subtext & Sexual Tension)',
    psychologicalIntent: 'ให้ผู้ชมสัมผัสได้ถึงแรงดึงดูดระหว่างศัตรูที่ไม่อาจห้ามใจ ลมหายใจรดใบหน้า',
    hollywoodRef: 'In the Mood for Love (Wong Kar-wai narrow hallway framing) / Mr. & Mrs. Smith',
    cameraAngle: 'Over-the-Shoulder Tight 9:16 Profile',
    tiltAngle: 'Level 0° Subtle Eye Contact',
    lens: '85mm Cine Prime f/1.4',
    depthOfField: 'Razor-thin DOF with foreground shoulder silhouette',
    movement: 'Slow Orbit Micro-Track (0.15m/s หมุนรอบใบหน้าช้าๆ)',
    framing: 'Dirty OTS 9:16 Close-Up (ไหล่ของอีกฝ่ายเบลอเป็นกรอบหน้า)',
    lightingRatio: 'Warm Amber Key Light 2700K with Cyan Silhouette Separation',
    facsCode: 'AU12 (Lip Corner Puller 20%), AU41 (Lip Droop/Sigh), Subtle Eye Dart to Lips',
    biologicalMotion: 'สายตาเหลือบมองริมฝีปากสลับกับดวงตา (Triangular Gaze), อุณหภูมิลมหายใจรินรดข้างแก้ม'
  },
  DEFIANT_RETALIATION: {
    id: 'defiant_retaliation',
    name: 'การตอบโต้ไม่ยอมแพ้ (Defiant Determination & Retaliation)',
    psychologicalIntent: 'ส่งพลังความแข็งแกร่งของตัวละครหญิงที่ไม่ยอมก้มหัวให้อำนาจมืด จุดประกายความสะใจให้คนดู',
    hollywoodRef: 'Kill Bill (The Bride stance) / Queen\'s Gambit (Beth Harmon final match gaze)',
    cameraAngle: 'Level to Low-Angle Hero Push (+2° Slight Upward Tilt)',
    tiltAngle: '+3° Confident Chin-Up',
    lens: '50mm High-Speed Cine T1.3',
    depthOfField: 'Split Diopter Focus (หน้าตัวละครชัด + หลักฐานบนโต๊ะชัดพร้อมกัน)',
    movement: 'Steady Handheld Gimbal Push with Snap Hold on Line Delivery',
    framing: 'Medium Close-Up Centered 9:16 (องค์ประกอบสมดุล มั่นคงดั่งหินผา)',
    lightingRatio: 'Golden Hour Rim Light ตัดขอบเส้นผม ขับเน้นความเด็ดเดี่ยว',
    facsCode: 'AU12 (Subtle Confident Smirk 15%), AU53 (Head Up 12°), Piercing Eye Lock',
    biologicalMotion: 'เชิดคางขึ้นอย่างสง่างาม, ยืนเต็มความสูง ไหล่นิ่งไม่สั่นไหว, ปลายนิ้วสัมผัสหลักฐานอย่างแม่นยำ'
  },
  SPONSOR_CINEMATIC_HERO: {
    id: 'sponsor_cinematic_hero',
    name: 'จัดวางสปอนเซอร์ระดับพรีเมียม (Cinematic Brand Hero Showcase)',
    psychologicalIntent: 'ผสมผสานสินค้าเข้ากับเนื้อหาอย่างหรูหรา ไม่รู้สึกว่าถูกยัดเยียด แต่ดูเลอค่าและน่าปรารถนา',
    hollywoodRef: 'James Bond (Omega / Aston Martin macro rack focus) / Crazy Rich Asians',
    cameraAngle: 'Over-the-Shoulder with Center-Weighted Product Stage',
    tiltAngle: '-5° Gentle downward reveal to desk',
    lens: '50mm Macro Cine Prime f/2.0',
    depthOfField: 'Selective Dual Plane Focus (หน้าตัวละครคมชัด 80% + ขวดเซรั่มชัด 100%)',
    movement: 'Dynamic Rack Focus from Determined Eyes to Amber Gold Glass Serum',
    framing: 'Safe Zone 9:16 Compliant (อยู่กึ่งกลางแนวตั้ง ไม่โดน UI บัง)',
    lightingRatio: 'Dedicated 3200K Warm Gold Spot Highlight on Gold Flakes & Dropper',
    facsCode: 'AU12 (Subtle Confident Smile 20%), Calm Regal Poise',
    biologicalMotion: 'การเคลื่อนไหวมืออย่างนุ่มนวล หยิบกระเป๋าและเปิดอย่างใจเย็น แสดงถึงความมีระดับ'
  }
};

/**
 * Intelligently analyze dialogue text, emotion tag, and context action
 * to return the ideal Hollywood camera angle, lens, and acting directives.
 */
export function analyzeDialogueEmotionAndCamera(dialogue = '', emotionTag = '', contextAction = '', speakerRole = '') {
  const text = (dialogue + ' ' + emotionTag + ' ' + contextAction).toLowerCase();
  const isHeroine = speakerRole.includes('นางเอก') || speakerRole.includes('หญิง');

  // 1. Shock / Cliffhanger / Emergency Blackout
  if (text.includes('ตัดไฟ') || text.includes('ดับ') || text.includes('ปิดระบบ') || text.includes('ใครบอกให้') || text.includes('ไซเรน') || text.includes('cliffhanger') || text.includes('ตกใจ')) {
    return {
      archetype: HOLLYWOOD_EMOTIONAL_ARCHETYPES.PSYCHOLOGICAL_CRISIS,
      reason: 'จุดตัดฉุกเฉินและสัญญาณเตือนภัย ต้องใช้ Dutch Tilt 16° และเลนส์กว้าง 35mm เพื่อกระชากอารมณ์ให้คนดูลุ้นระทึกไม่กดเลื่อนผ่าน'
    };
  }

  // 2. Tears / Grief / Despair / Weeping
  if (text.includes('น้ำตา') || text.includes('พ่อฉัน') || text.includes('สั่นเครือ') || text.includes('ร้องไห้') || text.includes('สิ้นหวัง') || text.includes('บริสุทธิ์') || text.includes('สะอื้น')) {
    return {
      archetype: HOLLYWOOD_EMOTIONAL_ARCHETYPES.VULNERABILITY_TEARS,
      reason: 'บทเผยความเจ็บปวดลึกสุดใจ ต้องใช้เลนส์ Telephoto 85mm f/1.4 พร้อม Slow Push-in เพื่อโฟกัสที่หยดน้ำตาเอ่อล้นเบ้าตาขวาและริมฝีปากที่สั่นระริก'
    };
  }

  // 3. Dominance / Threat / Power Stare / Cruelty
  if (text.includes('ทรยศ') || text.includes('เอาชีวิตมาเสี่ยง') || text.includes('เปลี่ยนอะไร') || text.includes('ตระกูล') || text.includes('อำมหิต') || text.includes('ประธาน') || text.includes('เหยียด')) {
    return {
      archetype: HOLLYWOOD_EMOTIONAL_ARCHETYPES.CHILLING_DOMINANCE,
      reason: 'การข่มขู่ด้วยอำนาจและฐานะมหาเศรษฐี ต้องใช้ Low-Angle -14° เพื่อให้ตัวละครดูสูงตระหง่านน่าเกรงขาม แสงเงา Chiaroscuro ปกคลุมเบ้าตา'
    };
  }

  // 4. Sponsor Placement / Product integration
  if (text.includes('เซรั่ม') || text.includes('ขวด') || text.includes('lumière') || text.includes('สปอนเซอร์') || text.includes('ทองคำ')) {
    return {
      archetype: HOLLYWOOD_EMOTIONAL_ARCHETYPES.SPONSOR_CINEMATIC_HERO,
      reason: 'การจัดวางสินค้าแบรนด์หรู ใช้ Rack Focus เลนส์มาโคร 50mm เพื่อขับเน้นประกายทองคำบริสุทธิ์ โดยรักษา Safe Zone 9:16 ให้พ้นปุ่ม Like/Comment'
    };
  }

  // 5. Intimate / Breath / Whisper / Forbidden Attraction
  if (text.includes('ลมหายใจ') || text.includes('กระซิบ') || text.includes('ชิดหู') || text.includes('ใกล้') || text.includes('ข้อมือ')) {
    return {
      archetype: HOLLYWOOD_EMOTIONAL_ARCHETYPES.INTIMATE_TENSION,
      reason: 'การประชิดตัวและแรงดึงดูดของศัตรู ใช้ Over-The-Shoulder แคบ พร้อมโบเก้ตื้น เพื่อให้คนดูรู้สึกเหมือนยืนอยู่ตรงกลางระหว่างลมหายใจของทั้งคู่'
    };
  }

  // Default: Defiant Retaliation
  return {
    archetype: isHeroine ? HOLLYWOOD_EMOTIONAL_ARCHETYPES.DEFIANT_RETALIATION : HOLLYWOOD_EMOTIONAL_ARCHETYPES.CHILLING_DOMINANCE,
    reason: 'การเผชิญหน้าปะทะคารม ใช้เลนส์ 50mm High-Speed จัดองค์ประกอบกึ่งกลางหน้าจอ 9:16 ถ่ายทอดความเด็ดเดี่ยวไม่ยอมแพ้'
  };
}
