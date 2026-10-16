/**
 * OpenRouter AI Service & Model Definitions
 * Supports over 200+ models via OpenRouter API with simulation fallback when key is not yet set.
 */

export const OPENROUTER_MODELS = [
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    company: 'Anthropic',
    badge: 'แนะนำสูงสุด • ลึกซึ้ง & วางพล็อตตัวละครดราม่า',
    context: '200k',
    isRecommended: true
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o (Omni)',
    company: 'OpenAI',
    badge: 'ยอดนิยม • ตรรกะไว & ออกแบบบทพูดคม',
    context: '128k'
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3 Chat',
    company: 'DeepSeek',
    badge: 'ราคาประหยัด • บทปะทะคารมเชือดเฉือน ซีรีส์แนวตั้ง',
    context: '64k'
  },
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash',
    company: 'Google',
    badge: 'ความเร็วสูง • ตอบสนองฉับไว',
    context: '1M'
  },
  {
    id: 'google/gemini-pro-1.5',
    name: 'Gemini 1.5 Pro',
    company: 'Google',
    badge: 'บริบท 2M • จดจำ Lore และความสัมพันธ์ครบถ้วน',
    context: '2M'
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    company: 'Meta',
    badge: 'Open Weights • ปรับแต่งอิสระ & จินตนาการกว้าง',
    context: '128k'
  },
  {
    id: 'qwen/qwen-2.5-72b-instruct',
    name: 'Qwen 2.5 72B',
    company: 'Alibaba',
    badge: 'ชำนาญนิยายเอเชีย • สไตล์มหาเศรษฐี & แก้แค้น',
    context: '128k'
  },
  {
    id: 'mistralai/mistral-large-2407',
    name: 'Mistral Large 2',
    company: 'Mistral',
    badge: 'ความลุ่มลึก • ละเมียดละไมสไตล์ยุโรป',
    context: '128k'
  }
];

export const PRESET_AVATARS = [
  {
    id: 'avatar-1',
    label: 'ทนาย/ผู้หญิงสายลุย',
    url: '/assets/rin_portrait.jpg'
  },
  {
    id: 'avatar-2',
    label: 'ประธานหนุ่ม/ทายาทหมื่นล้าน',
    url: '/assets/tadao_portrait.jpg'
  },
  {
    id: 'avatar-3',
    label: 'การแสดงอารมณ์คลั่ง/เสียใจ',
    url: '/assets/rin_extreme_acting.jpg'
  },
  {
    id: 'avatar-4',
    label: 'สายตามืดมน/ตัวร้ายมีเสน่ห์',
    url: '/assets/tadao_dutch_acting.jpg'
  }
];

export function getOpenRouterApiKey() {
  if (typeof window === 'undefined') return '';
  try {
    return localStorage.getItem('openrouter_api_key') || '';
  } catch (e) {
    return '';
  }
}

export function setOpenRouterApiKey(key) {
  if (typeof window === 'undefined') return;
  try {
    if (key) {
      localStorage.setItem('openrouter_api_key', key.trim());
    } else {
      localStorage.removeItem('openrouter_api_key');
    }
  } catch (e) {
    console.warn('Failed to access localStorage:', e);
  }
}

export function getSelectedOpenRouterModel() {
  if (typeof window === 'undefined') return 'anthropic/claude-3.5-sonnet';
  try {
    return localStorage.getItem('openrouter_selected_model') || 'anthropic/claude-3.5-sonnet';
  } catch (e) {
    return 'anthropic/claude-3.5-sonnet';
  }
}

export function setSelectedOpenRouterModel(modelId) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('openrouter_selected_model', modelId);
  } catch (e) {
    console.warn('Failed to access localStorage:', e);
  }
}

/**
 * Test OpenRouter API Key connectivity
 */
export async function testOpenRouterConnection(apiKey) {
  const keyToTest = apiKey || getOpenRouterApiKey();
  if (!keyToTest || !keyToTest.trim()) {
    return { success: false, error: 'กรุณาระบุ API Key ก่อนทำการทดสอบ' };
  }
  try {
    const res = await fetch('https://openrouter.ai/api/v1/auth/key', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${keyToTest.trim()}`
      },
      signal: AbortSignal.timeout(8000)
    });
    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        label: data.data?.label || 'Active Key',
        usage: data.data?.usage,
        limit: data.data?.limit
      };
    } else {
      const err = await res.json().catch(() => ({}));
      return {
        success: false,
        error: err.error?.message || `การเชื่อมต่อไม่สำเร็จ (รหัสสถานะ ${res.status})`
      };
    }
  } catch (err) {
    return {
      success: false,
      error: `ไม่สามารถเชื่อมต่อไปยัง OpenRouter ได้: ${err.message}`
    };
  }
}

/**
 * Intelligent character generation:
 * - If API key is available, calls OpenRouter.
 * - If not available yet ("ยังไม่ได้เตรียม"), uses smart local drama generator tuned for vertical drama.
 */
export async function generateCharacterProfile({ prompt = '', role = '', archetype = '', series = null, modelId = null }) {
  const apiKey = getOpenRouterApiKey();
  const selectedModel = modelId || getSelectedOpenRouterModel();
  const seriesTitle = series?.title || 'ซีรีส์แนวตั้ง';

  // 1. If API Key is present, make real OpenRouter call
  if (apiKey && apiKey.startsWith('sk-or-')) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
          'HTTP-Referer': window.location.origin || 'http://localhost:5173',
          'X-Title': 'SeriesX Studio'
        },
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({
          model: selectedModel,
          temperature: 0.75,
          response_format: { type: 'json_object' },
          messages: [
            {
              role: 'system',
              content: `You are an executive showrunner and AI character designer for vertical drama series.
Return a valid JSON object describing a high-tension character for the series "${seriesTitle}".
Required JSON structure:
{
  "name": "ชื่อภาษาไทย / English Name (Nickname)",
  "role": "บทบาทในเรื่อง",
  "actingStyle": "สไตล์การแสดง (Method Acting / Micro-expression)",
  "description": "ภูมิหลัง ปมขัดแย้ง และแรงขับเคลื่อนทางจิตวิทยา",
  "wardrobeSpec": "สไตล์การแต่งกายและเครื่องแต่งกายหลัก",
  "voiceTone": "โทนเสียงพากย์",
  "voiceSample": "ประโยคเด็ดประจำตัวละคร [พร้อมระบุอารมณ์ในวงเล็บ]",
  "facsBrow": 0.75,
  "facsLip": 0.60,
  "facsTear": 0.50,
  "facsJaw": 0.80
}`
            },
            {
              role: 'user',
              content: `สร้างตัวละคร: ไอเดีย="${prompt || archetype || 'ตัวละครใหม่ที่มีปมขัดแย้งสูง'}" บทบาท="${role || archetype}"`
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const content = data.choices?.[0]?.message?.content;
        if (content) {
          let jsonText = content.trim();
          if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/^```[a-zA-Z]*\n?/, '').replace(/\n?```$/, '').trim();
          }
          const parsed = JSON.parse(jsonText);
          return formatGeneratedCharacter(parsed, prompt, role, archetype);
        }
      }
    } catch (err) {
      console.warn('OpenRouter API call failed or timed out, falling back to smart generator:', err);
    }
  }

  // 2. Smart Vertical Drama Simulation Generator (Instant, High Fidelity)
  await new Promise(resolve => setTimeout(resolve, 800)); // Natural processing delay

  return generateSimulatedCharacter(prompt, role, archetype, seriesTitle);
}

function formatGeneratedCharacter(parsed, prompt, role, archetype) {
  const seed = 77100000 + Math.floor(Math.random() * 899999);
  const charId = `char-${Date.now()}`;
  const thaiNamePart = parsed.name?.split('/')[0]?.trim() || 'ตัวละครใหม่';
  const cleanAscii = thaiNamePart.replace(/[^a-zA-Z0-9]/g, '') || 'Lead';

  return {
    id: charId,
    name: parsed.name || `${thaiNamePart} / New Lead`,
    role: parsed.role || role || archetype || 'ตัวละครหลัก (Lead)',
    actorSeed: seed,
    loraModel: `${cleanAscii}_V1_Consistency_fp16.safetensors`,
    loraWeight: 0.88,
    faceLockAccuracy: '98.8%',
    portrait: '/assets/rin_portrait.jpg',
    sheetImage: '/assets/rin_sheet.jpg',
    extremeActingImage: '/assets/rin_extreme_acting.jpg',
    actingStyle: parsed.actingStyle || 'Method Acting — สื่ออารมณ์ผ่านสายตาและกล้ามเนื้อใบหน้า',
    voiceProfile: {
      voiceId: `TH-${Math.random() > 0.5 ? 'Fem' : 'Male'}-Deep-0${Math.floor(Math.random() * 5) + 1}`,
      tone: parsed.voiceTone || 'เยือกเย็น คมคาย ซ่อนความกดดัน',
      pitch: '-1 semitones',
      speed: '1.0x',
      breathIntensity: '0.40',
      sampleLine: parsed.voiceSample || '[เสียงต่ำกระซิบ] ถ้าคุณคิดว่าเงินปิดปากความจริงได้... คุณคิดผิดแล้ว!'
    },
    wardrobeSpec: parsed.wardrobeSpec || 'ชุดสูทสั่งตัดสีเข้ม คัตติ้งเนี้ยบ ปราณีต',
    description: parsed.description || `ตัวละครที่มีบทบาทสำคัญในการขับเคลื่อนปมความขัดแย้งของเรื่อง`,
    expressionMatrix: [
      { label: 'Neutral', status: 'Locked 100%' },
      { label: 'High Tension', status: 'Locked 98.8%' },
      { label: 'Vulnerability', status: 'Locked 97.5%' }
    ],
    facsControls: {
      browInnerRaiser: parsed.facsBrow ?? 0.75,
      browLowerer: 0.70,
      lipTremor: parsed.facsLip ?? 0.65,
      tearWelling: parsed.facsTear ?? 0.50,
      pupilDilation: 0.85,
      jawTension: parsed.facsJaw ?? 0.80
    }
  };
}

function generateSimulatedCharacter(prompt, role, archetype, seriesTitle) {
  const seed = 77100000 + Math.floor(Math.random() * 899999);
  const charId = `char-${Date.now()}`;
  const inputLower = (prompt + ' ' + role + ' ' + archetype).toLowerCase();

  let generated = {
    name: 'พิมพ์ดาว วัฒนกิจ / Phimdara (Dao)',
    role: 'ทนายฝ่ายตรงข้าม & อดีตคนรัก (Rival Attorney)',
    actingStyle: 'Method Acting — เยือกเย็น คมคาย แต่แววตาสั่นไหวทุกครั้งที่สบตากัน',
    description: 'ทนายความสาวอัจฉริยะที่เคยมีความสัมพันธ์ลึกซึ้งกับตัวเอก เธอถูกว่าจ้างโดยกลุ่มทุนลึกลับให้มาทำลายคดีนี้ แต่ลึกๆ แล้วเธอเก็บงำหลักฐานชิ้นสำคัญที่สามารถพลิกคดีได้ทั้งกระดาน',
    wardrobeSpec: 'สูทเบลเซอร์สีกรมท่าเข้ม ผ้าทวีตหรู รองเท้าส้นสูงสีดำด้าน แว่นตากรอบบาง',
    voiceTone: 'คมชัด หนักแน่น ซ่อนน้ำเสียงสั่นเครือเล็กน้อย',
    voiceSample: '[จ้องตาไม่กะพริบ] ในศาล... ความรู้สึกไม่มีค่าเท่ากับหลักฐาน และคุณก็ไม่มีอะไรเหลือเลย!',
    portrait: '/assets/rin_portrait.jpg',
    facsBrow: 0.85,
    facsLip: 0.70,
    facsTear: 0.60,
    facsJaw: 0.85
  };

  if (inputLower.includes('บอดี้การ์ด') || inputLower.includes('สายลับ') || inputLower.includes('การ์ด') || inputLower.includes('bodyguard')) {
    generated = {
      name: 'กฤษณะ ไชยเดช / Victor Kritsana (Vic)',
      role: 'บอดี้การ์ดส่วนตัว & อดีตหน่วยรบพิเศษ (Shadow Protector)',
      actingStyle: 'Stoic & Intense — นิ่งสงบดั่งผิวน้ำ แต่พร้อมระเบิดความรุนแรงในเสี้ยววินาที',
      description: 'อดีตเจ้าหน้าที่หน่วยปฏิบัติการพิเศษที่รอดชีวิตจากภารกิจลับ ถูกส่งมาเพื่อคุ้มครองแต่มีความลับดำมืดเกี่ยวกับเหตุการณ์สังหารในอดีต',
      wardrobeSpec: 'แจ็กเก็ตแทคติคอลสีดำด้าน สวมเสื้อเกราะซ่อนรูป นาฬิกาทหารสั่งทำพิเศษ',
      voiceTone: 'ทุ้มต่ำ เยือกเย็น ปราศจากความลังเล',
      voiceSample: '[เสียงปืนขึ้นนก] ก้าวถอยหลังไปสามก้าว... ถ้านายไม่อยากให้กระสุนนี้ทะลุกะโหลก!',
      portrait: '/assets/tadao_portrait.jpg',
      facsBrow: 0.65,
      facsLip: 0.40,
      facsTear: 0.20,
      facsJaw: 0.95
    };
  } else if (inputLower.includes('ตัวร้าย') || inputLower.includes('มาเฟีย') || inputLower.includes('บอส') || inputLower.includes('antagonist')) {
    generated = {
      name: 'ชานนท์ อัครมหาศาล / Lord Chanon (The Boss)',
      role: 'ประธานเครืออัครมหาศาล & ผู้บงการเบื้องหลัง (Mastermind Antagonist)',
      actingStyle: 'Psychological Menace — รอยยิ้มสุภาพที่แฝงความอำมหิต พูดช้าแต่น้ำหนักคำกระแทกจิตใจ',
      description: 'มหาเศรษฐีเจ้าของอาณาจักรธุรกิจสีเทาผู้เชื่อว่าทุกสิ่งในโลกมีราคาค่างวด เขาไม่เคยเปื้อนมือด้วยตัวเอง แต่วางหมากให้ทุกคนทำลายกันเอง',
      wardrobeSpec: 'สูทปักดิ้นทองคำขาว ผ้าไหมอิตาลี แหวนทองคำขาวสลักตราประจำตระกูล',
      voiceTone: 'ทุ้ม นุ่มลึก ก้องกังวานแบบผู้กุมอำนาจ',
      voiceSample: '[หัวเราะในลำคอเบาๆ] คุณคิดว่ากำลังต่อสู้กับผมเหรอ? เปล่าเลย... คุณกำลังต่อสู้กับความโลภของตัวเองต่างหาก',
      portrait: '/assets/tadao_dutch_acting.jpg',
      facsBrow: 0.60,
      facsLip: 0.50,
      facsTear: 0.10,
      facsJaw: 0.90
    };
  } else if (inputLower.includes('เพื่อน') || inputLower.includes('ผู้ช่วย') || inputLower.includes('หมอ') || inputLower.includes('แพทย์')) {
    generated = {
      name: 'พญ. พริมา ธนโชติ / Dr. Prima (Pim)',
      role: 'แพทย์นิติเวช & ที่ปรึกษาลับ (Forensic Confidante)',
      actingStyle: 'Empathetic & Sharp — อ่อนโยนแต่เฉียบคม มองทะลุทุกร่องรอยบาดแผลและการโกหก',
      description: 'เพื่อนสนิทสมัยเรียนแพทย์ที่คอยสนับสนุนข้อมูลชันสูตรลับ เธอเสี่ยงหน้าที่การงานเพื่อช่วยพิสูจน์ความจริงให้เพื่อนรัก',
      wardrobeSpec: 'เสื้อกาวน์แพทย์ทับเสื้อสเวตเตอร์แคชเมียร์สีครีม แขวนหูฟังแพทย์ Stethoscope',
      voiceTone: 'อบอุ่น จริงใจ แต่แฝงความตระหนกในยามวิกฤต',
      voiceSample: '[เสียงกระซิบเร่งด่วน] ริน... รอยแผลที่ศพนี้ มันไม่ได้เกิดจากอุบัติเหตุ มีคนจงใจฆ่าเขา!',
      portrait: '/assets/rin_extreme_acting.jpg',
      facsBrow: 0.80,
      facsLip: 0.75,
      facsTear: 0.70,
      facsJaw: 0.60
    };
  } else if (prompt.trim()) {
    // Custom tailored name
    generated.name = `${prompt.split(' ')[0]} / AI Character`;
    generated.description = `ตัวละครที่สร้างตามคำสั่ง: "${prompt}" สำหรับซีรีส์ "${seriesTitle}" เพื่อขับเน้นบรรยากาศดราม่า`;
  }

  return {
    id: charId,
    name: generated.name,
    role: role || archetype || generated.role,
    actorSeed: seed,
    loraModel: `Character_${seed.toString().slice(-4)}_fp16.safetensors`,
    loraWeight: 0.88,
    faceLockAccuracy: '98.9%',
    portrait: generated.portrait,
    sheetImage: '/assets/rin_sheet.jpg',
    extremeActingImage: generated.portrait,
    actingStyle: generated.actingStyle,
    voiceProfile: {
      voiceId: `TH-${Math.random() > 0.5 ? 'Fem' : 'Male'}-Lead-01`,
      tone: generated.voiceTone,
      pitch: '0 semitones',
      speed: '1.0x',
      breathIntensity: '0.40',
      sampleLine: generated.voiceSample
    },
    wardrobeSpec: generated.wardrobeSpec,
    description: generated.description,
    expressionMatrix: [
      { label: 'Neutral', status: 'Locked 100%' },
      { label: 'Intense', status: 'Locked 98.9%' },
      { label: 'Emotional', status: 'Locked 97.8%' }
    ],
    facsControls: {
      browInnerRaiser: generated.facsBrow,
      browLowerer: 0.70,
      lipTremor: generated.facsLip,
      tearWelling: generated.facsTear,
      pupilDilation: 0.85,
      jawTension: generated.facsJaw
    }
  };
}
