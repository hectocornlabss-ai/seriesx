/**
 * dialogueDetector.js
 * Intelligent Dialogue & Speaker Detection and Screenplay Converter for SeriesX
 */

/**
 * Clean and normalize text
 */
function cleanText(txt) {
  if (!txt) return '';
  return txt.replace(/&nbsp;/g, ' ').replace(/<[^>]*>/g, '').trim();
}

/**
 * Detect all dialogue quotes and infer speakers from surrounding prose context
 * @param {string} rawContent - The chapter text or HTML
 * @param {Array} characters - List of character objects from the series
 * @returns {Object} { beats, stats, charactersInScene }
 */
export function detectDialoguesAndSpeakers(rawContent, characters = []) {
  if (!rawContent) {
    return { beats: [], stats: { totalDialogues: 0, speakersCount: 0, highConfidencePct: 100 }, charactersInScene: [] };
  }

  // Convert HTML or line breaks to text paragraphs
  const plainText = cleanText(rawContent);
  const paragraphs = plainText.split(/\n+/).map(p => p.trim()).filter(Boolean);

  const beats = [];
  let lastSpeaker = null;
  const charactersInSceneMap = new Map();

  // Regex to match quoted speech: "...", “...”, หรือ '...'
  // Thai & Western quotation marks
  const quoteRegex = /(["“][^"”]+["”])/g;

  // Emotion/Tone keywords for parentheticals
  const emotionKeywords = [
    { pattern: /(สั่นเครือ|น้ำตาคลอ|เสียงแผ่ว|เจ็บปวด)/, label: 'น้ำเสียงสั่นเครือ ระคนเจ็บปวด' },
    { pattern: /(เย็นชา|เยือกเย็น|ไร้ความรู้สึก|สายตานิ่ง)/, label: 'น้ำเสียงเยือกเย็น ไร้ความปรานี' },
    { pattern: /(ตะคอก|ตวาด|ขึ้นเสียง|กระแทกเสียง|เสียงดัง)/, label: 'กระแทกเสียงกร้าว' },
    { pattern: /(กระซิบ|ชิดหู|เสียงเบา|แผ่วเบา)/, label: 'กระซิบชิดใบหู' },
    { pattern: /(เหยียดยิ้ม|ยิ้มมุมปาก|หัวเราะในลำคอ)/, label: 'เหยียดยิ้มมุมปากอย่างเหนือกว่า' },
    { pattern: /(กัดฟัน|ขบกราม|กำหมัด)/, label: 'ขบกรามแน่น สะกดอารมณ์' },
    { pattern: /(ตระหนก|ตกใจ|หวาดกลัว|หน้าซีด)/, label: 'น้ำเสียงตระหนกอย่างแท้จริง' },
    { pattern: /(อ่อนโยน|ปลอบประโลม|สายตาอบอุ่น)/, label: 'น้ำเสียงอ่อนโยนแฝงความห่วงใย' }
  ];

  paragraphs.forEach((para, pIdx) => {
    // Check if this paragraph contains quotes
    const quotes = para.match(quoteRegex);
    if (!quotes || quotes.length === 0) {
      // It's a pure narrative/action paragraph
      if (para.length > 15) {
        beats.push({
          id: `beat-action-${pIdx}`,
          type: 'action',
          narrative: para,
          speaker: null,
          dialogue: null
        });
      }
      return;
    }

    quotes.forEach((quote, qIdx) => {
      const dialogueText = quote.replace(/^[“"']|[”"']$/g, '').trim();
      if (!dialogueText) return;

      // Extract narrative context surrounding the quote
      const quoteIndex = para.indexOf(quote);
      const preText = para.slice(0, quoteIndex).trim();
      const postText = para.slice(quoteIndex + quote.length).trim();
      const contextText = `${preText} ${postText}`.trim();

      let detectedSpeaker = null;
      let confidence = 'inferred';
      let detectionReason = '';

      // 1. Direct Name Match in surrounding context
      for (const char of characters) {
        const full = (char.name || '').toLowerCase();
        const shortName = full.split('/')[0].trim().toLowerCase();
        const engName = full.split('/')[1]?.trim().toLowerCase() || '';
        const thaiFirstName = shortName.split(' ')[0];

        const matchContext = contextText.toLowerCase();

        if (
          matchContext.includes(shortName) || 
          (thaiFirstName && thaiFirstName.length >= 2 && matchContext.includes(thaiFirstName)) ||
          (engName && matchContext.includes(engName))
        ) {
          detectedSpeaker = char;
          confidence = 'high';
          detectionReason = `พบชื่อตรงตัว "${shortName}" ในบริบทบรรยาย`;
          break;
        }
      }

      // 2. Role / Synonym Keyword Match if no exact name match
      if (!detectedSpeaker) {
        const lowerContext = contextText.toLowerCase();
        for (const char of characters) {
          const role = (char.role || '').toLowerCase();
          if (
            (lowerContext.includes('ทนายสาว') || lowerContext.includes('หญิงสาว') || lowerContext.includes('นางเอก') || lowerContext.includes('เธอ')) &&
            (role.includes('นางเอก') || role.includes('ทนาย') || role.includes('หญิง'))
          ) {
            detectedSpeaker = char;
            confidence = 'role-match';
            detectionReason = `ตรวจพบสรรพนาม/บทบาท "${role.split('/')[0]}"`;
            break;
          } else if (
            (lowerContext.includes('ประธาน') || lowerContext.includes('ชายหนุ่ม') || lowerContext.includes('พระเอก') || lowerContext.includes('เขา') || lowerContext.includes('มหาเศรษฐี')) &&
            (role.includes('พระเอก') || role.includes('ประธาน') || role.includes('ชาย'))
          ) {
            detectedSpeaker = char;
            confidence = 'role-match';
            detectionReason = `ตรวจพบสรรพนาม/บทบาท "${role.split('/')[0]}"`;
            break;
          }
        }
      }

      // 3. Vocative Address Check: If dialogue addresses someone by name, the OTHER person is the speaker!
      // Example: "คุณคิดว่า... ได้เหรอ ริน?" -> The speaker is NOT Rin, it's the other character!
      if (!detectedSpeaker || confidence !== 'high') {
        for (const char of characters) {
          const shortName = (char.name || '').split('/')[0].trim().toLowerCase();
          const thaiFirstName = shortName.split(' ')[0];
          if (dialogueText.toLowerCase().includes(thaiFirstName) || dialogueText.toLowerCase().includes(shortName)) {
            // Find another character who is NOT this person
            const otherChar = characters.find(c => c.id !== char.id);
            if (otherChar) {
              detectedSpeaker = otherChar;
              confidence = 'vocative-inference';
              detectionReason = `เอ่ยชื่อเรียกคู่สนทนา (${shortName}) ระบบจึงอนุมานว่าคือ ${otherChar.name.split('/')[0]}`;
              break;
            }
          }
        }
      }

      // 4. Alternating Dialogue (Turn-taking)
      if (!detectedSpeaker && lastSpeaker && characters.length >= 2) {
        const alternateChar = characters.find(c => c.id !== lastSpeaker.id) || characters[0];
        detectedSpeaker = alternateChar;
        confidence = 'turn-inference';
        detectionReason = `สลับคู่สนทนาต่อเนื่องจาก "${lastSpeaker.name.split('/')[0]}"`;
      }

      // Fallback: Default to first character or protagonist
      if (!detectedSpeaker) {
        detectedSpeaker = characters[0] || { id: 'char-unknown', name: 'ตัวละครในฉาก' };
        confidence = 'fallback';
        detectionReason = 'อนุมานตัวละครหลักประจำฉาก';
      }

      lastSpeaker = detectedSpeaker;
      charactersInSceneMap.set(detectedSpeaker.id, detectedSpeaker);

      // Detect Emotion / Parenthetical
      let parenthetical = '(น้ำเสียงปกติ)';
      for (const item of emotionKeywords) {
        if (item.pattern.test(contextText) || item.pattern.test(dialogueText)) {
          parenthetical = `(${item.label})`;
          break;
        }
      }

      beats.push({
        id: `beat-dlg-${pIdx}-${qIdx}`,
        type: 'dialogue',
        speaker: detectedSpeaker,
        speakerName: (detectedSpeaker.name || '').split('/')[0].trim(),
        parenthetical,
        dialogue: dialogueText,
        contextAction: preText || postText || '',
        confidence,
        detectionReason,
        rawQuote: quote
      });
    });
  });

  const totalDialogues = beats.filter(b => b.type === 'dialogue').length;
  const highConfidenceCount = beats.filter(b => b.confidence === 'high' || b.confidence === 'role-match').length;

  return {
    beats,
    charactersInScene: Array.from(charactersInSceneMap.values()),
    stats: {
      totalDialogues,
      speakersCount: charactersInSceneMap.size,
      highConfidencePct: totalDialogues > 0 ? Math.round((highConfidenceCount / totalDialogues) * 100) : 100
    }
  };
}

/**
 * Convert detected dialogue beats into full 9:16 Vertical Screenplay Shots
 */
export function convertDialoguesTo916Shots(beats, series) {
  const dialogueBeats = beats.filter(b => b.type === 'dialogue');
  if (dialogueBeats.length === 0) return [];

  const shots = [];
  let currentTimeSeconds = 0;

  dialogueBeats.forEach((beat, index) => {
    const shotNum = String(index + 1).padStart(2, '0');
    const durationSec = Math.max(3.5, Math.min(8.0, Math.round(beat.dialogue.length / 15) + 2.5));
    
    const startTimeFormatted = formatTimecode(currentTimeSeconds);
    const endTimeFormatted = formatTimecode(currentTimeSeconds + durationSec);
    currentTimeSeconds += durationSec;

    const speaker = beat.speaker || {};
    const shortName = (speaker.name || 'ตัวละคร').split('/')[0].trim();
    const isHeroine = (speaker.role || '').includes('นางเอก') || (speaker.role || '').includes('หญิง');

    // Generate Vertical 9:16 camera parameters
    const cameraSetups = [
      {
        lens: "85mm Cine Prime f/1.4 (Tight Vertical Portrait)",
        movement: "Vertical Slow Push-In (Z-Axis Depth Focus)",
        framing: "Extreme Close-Up (Tight 9:16 Upper-Third Eyes)",
        depthOfField: "Ultra Shallow (ฉากหลังเบลอนวลโบเก้)",
        tiltAngle: "Eye-level with subtle 2° Dutch Tilt"
      },
      {
        lens: "50mm T1.5 High-Speed Prime",
        movement: "Over-the-Shoulder 9:16 Reverse Reaction",
        framing: "Medium Close-Up (Chest to Head Frame)",
        depthOfField: "Cinematic f/1.8 with foreground shoulder silhouette",
        tiltAngle: "Subtle low angle (Power dynamic)"
      },
      {
        lens: "105mm Macro Cine f/2.0",
        movement: "Static Locked-Off Tension Hold",
        framing: "Choker Close-Up (Lips & Jaw Micro-expression)",
        depthOfField: "Razor-thin DOF on eye pupil dilation",
        tiltAngle: "Strict level eye-to-eye"
      }
    ];

    const cam = cameraSetups[index % cameraSetups.length];

    shots.push({
      id: `shot-auto-${shotNum}`,
      number: shotNum,
      name: index === 0 
        ? `ช็อตเปิด 3-Second Hook: ${shortName} ปะทะคารม` 
        : `ช็อตที่ ${shotNum}: ${shortName} ตอบโต้ความขัดแย้ง`,
      timecode: `${startTimeFormatted} - ${endTimeFormatted}`,
      duration: `${durationSec.toFixed(1)}s`,
      cameraDirector: cam,
      actorDirecting: {
        character: shortName,
        facialMicroExpressions: speaker.actingStyle || (isHeroine 
          ? "สายตามุ่งมั่นไม่ยอมแพ้ ริมฝีปากสั่นระริกก่อนเกร็งสะกดอารมณ์" 
          : "สีหน้านิ่งดั่งหินผา ขากรรไกรเกร็ง แววตาคมกริบดั่งเหยี่ยว"),
        bodyLanguage: beat.contextAction || (isHeroine 
          ? "ยืนตัวตรง ไหล่สั่นเล็กน้อย กำหมัดแน่น" 
          : "ยืนเต็มความสูง ก้าวประชิดตัว จ้องลึกเข้าไปในดวงตา"),
        facsCode: isHeroine ? "AU1+AU4 (Brow Furrow), AU20 (Lip Tremor 70%)" : "AU4+AU9 (Wrinkle), AU26 (Jaw Clench)"
      },
      vocalProsody: {
        dialogue: beat.dialogue,
        withCues: `${beat.parenthetical} "${beat.dialogue}"`,
        emotionTag: beat.parenthetical.replace(/[()]/g, ''),
        vocalCurve: speaker.voiceProfile?.tone || "น้ำเสียงหนักแน่น มีพลัง ปรับระดับความดังตามอารมณ์"
      }
    });
  });

  return shots;
}

function formatTimecode(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Format novel prose by inserting @Speaker: tags directly before dialogue lines
 */
export function formatNovelWithSpeakers(rawText, beats) {
  let result = rawText;
  const dialogueBeats = beats.filter(b => b.type === 'dialogue');

  dialogueBeats.forEach(beat => {
    if (!beat.rawQuote || !beat.speakerName) return;
    const taggedQuote = `@${beat.speakerName}: "${beat.dialogue}"`;
    // Replace the first untagged occurrence
    if (result.includes(beat.rawQuote) && !result.includes(`@${beat.speakerName}: ${beat.rawQuote}`)) {
      result = result.replace(beat.rawQuote, taggedQuote);
    }
  });

  return result;
}
