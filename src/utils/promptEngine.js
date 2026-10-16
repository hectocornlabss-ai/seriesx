/**
 * SeriesX Production Prompt Engine
 * Generates ultra-high-fidelity, production-ready prompts for AI video generators
 * (Kling AI, Runway Gen-3, Hailuo/Minimax, Luma Dream Machine, Sora, Wan 2.1, ComfyUI)
 * and TTS audio generators (ElevenLabs, Fish Speech, Cartesia).
 * 
 * Guarantees 8-pillar production fidelity:
 * 1. ท่าทาง (Actor Gestures & Body Language)
 * 2. ตัวละคร (Character Consistency, Facial Identity, Seeds & LoRAs)
 * 3. เสื้อผ้า (Wardrobe Specifications, Colors, Materials)
 * 4. ฉาก & แสง (Scene Environment, Atmospheric Depth, Lighting)
 * 5. น้ำเสียง & คำพูด (Dialogue, Vocal Prosody, Micro-Breathing, Emotion Cues)
 * 6. มุมกล้อง (Vertical 9:16 Cinematography, Lens, Camera Vector, Framing)
 * 7. ความต่อเนื่องของฉาก (Cross-Shot Continuity, Lighting & Spatial Match)
 * 8. การเคลื่อนไหวธรรมชาติเหมือนมนุษย์ (Organic Micro-Movements, Breathing, Zero Robotic Stiffness)
 */

export const AI_VIDEO_PRESETS = [
  { id: 'kling', name: 'Kling AI 1.5', tag: 'Standard & Pro Mode', ext: 'kling' },
  { id: 'runway', name: 'Runway Gen-3 Alpha', tag: 'Text/Image-to-Video', ext: 'runway' },
  { id: 'hailuo', name: 'Hailuo / Minimax Video-01', tag: 'High-Action & Micro-Acting', ext: 'hailuo' },
  { id: 'luma', name: 'Luma Dream Machine', tag: 'Organic Physics & Camera Push', ext: 'luma' },
  { id: 'wan21', name: 'Wan 2.1 / ComfyUI', tag: 'Open Weights & Seed-Locked', ext: 'comfyui' },
  { id: 'elevenlabs', name: 'ElevenLabs Voice Engine', tag: 'Vocal Emotion & Micro-Breathing', ext: 'audio' }
];

/**
 * Standard Universal Negative Prompt to eradicate AI stiffness, robotic glitches, and uncanny valley
 */
export const UNIVERSAL_NEGATIVE_PROMPT = 
  "robotic movements, stiff unnatural posture, mannequin stillness, frozen facial expression, dead eyes, lack of blinking, doll-like skin, plastic face, jittery motion, abrupt camera jump, erratic limbs, extra fingers, deformed hands, morphing clothes, changing wardrobe color, flickering background, blurry resolution, low frame rate, unnatural physics, uncanny valley";

/**
 * Generate precise cinematic prompt directive for custom keyframe camera focus
 */
export function buildKeyframeFocusPromptSnippet(keyframeConfig) {
  if (!keyframeConfig || !keyframeConfig.enabled) return '';
  const { motionType = 'rack_focus', keyframes = [], transitionDuration = 3.5 } = keyframeConfig;
  const kf1 = keyframes[0] || { x: 18, y: 21, zoom: 1.0, dof: 'f/1.4 shallow bokeh', targetName: 'Actor Face' };
  const kf2 = keyframes[1] || { x: 25, y: 60, zoom: 0.88, dof: 'f/4 deep focus', targetName: 'Desk Anchor' };

  if (motionType === 'slow_zoom_out') {
    return `Optical Slow Zoom-Out & Focal Expansion: Over ${transitionDuration}s, camera gently pulls back from tight frame (${kf1.zoom || 1.15}x scale at focal anchor X:${kf1.x}%, Y:${kf1.y}%) to wide composition (${kf2.zoom || 0.88}x scale at X:${kf2.x}%, Y:${kf2.y}%), smoothly expanding frame to reveal environment, buttery smooth vertical 9:16 tracking`;
  }
  if (motionType === 'slow_zoom_in') {
    return `Optical Slow Push-In & Focal Intensification: Over ${transitionDuration}s, camera smoothly moves inward from (${kf1.zoom || 0.95}x scale at X:${kf1.x}%, Y:${kf1.y}%) to extreme tight focus (${kf2.zoom || 1.12}x scale at X:${kf2.x}%, Y:${kf2.y}%), locking razor-sharp focus on ${kf2.targetName || 'actor gaze'}, shallow depth of field`;
  }
  return `Cinematic Rack Focus & Focal Choreography: Camera starts at 0.0s with focus locked on ${kf1.targetName || 'primary subject'} at coordinate (X:${kf1.x}%, Y:${kf1.y}%, ${kf1.dof || 'shallow depth'}), then smoothly transitions over ${transitionDuration}s to rack focus onto ${kf2.targetName || 'secondary target'} at coordinate (X:${kf2.x}%, Y:${kf2.y}%, zoom: ${kf2.zoom || 1.0}x), buttery smooth optical rack focus without lens jitter`;
}

/**
 * Generate a complete, production-ready prompt package for a given shot
 */
export function generateShotProductionPrompt(shot, character, series, shotIndex = 0, allShots = []) {
  const char = character || {};
  const charName = (char.name || shot.character || 'Character').split('/')[0].trim();
  const wardrobe = char.wardrobeSpec || 'Contemporary stylish attire with precise fabric texture';
  const seed = char.actorSeed || 77391024 + (shotIndex * 137);
  const lora = char.loraModel || 'Default_Character_V1.safetensors';
  const loraWeight = char.loraWeight || 0.88;
  
  const cam = shot.cameraDirector || {};
  const lens = cam.lens || '85mm Cine Prime f/1.4';
  const movement = cam.movement || 'Vertical Slow Push-In (Z-Axis Depth)';
  const framing = cam.framing || 'Extreme Close-Up 9:16 (Upper-Third)';
  const dof = cam.depthOfField || 'Ultra-shallow depth of field, creamy background bokeh';
  const tilt = cam.tiltAngle || 'Eye-level with subtle 2° Dutch tilt';

  // Dynamic Keyframe Focus Directive (Only injected when user explicitly activates keyframe focus for this scene)
  const focusDirective = shot.keyframeFocus?.enabled 
    ? buildKeyframeFocusPromptSnippet(shot.keyframeFocus)
    : '';

  const actor = shot.actorDirecting || {};
  const facialActing = actor.facialMicroExpressions || shot.action || 'Subtle emotional micro-expressions, piercing gaze';
  const bodyLanguage = actor.bodyLanguage || 'Stands upright with tensed shoulders, holding position';
  const facs = actor.facsCode || 'AU1+AU4+AU20 Synced';

  const voice = shot.vocalProsody || {};
  const dialogue = voice.dialogue || shot.dialogue || '';
  const dialogueWithCues = voice.withCues || `"${dialogue}"`;
  const emotionTag = voice.emotionTag || shot.emotionTag || 'Intense Drama';
  const vocalCurve = voice.vocalCurve || char.voiceProfile?.tone || 'Deep resonant tone with emotional breath catch';

  const location = shot.location || series?.synopsis?.slice(0, 40) || 'Luxurious modern high-rise office';
  const lighting = shot.lighting || 'Cinematic dual-tone teal and warm amber key lighting with sharp rim highlights';

  // Scene continuity context
  const prevShot = shotIndex > 0 ? allShots[shotIndex - 1] : null;
  const continuityId = `SCENE-${String(series?.currentEpisode || 1).padStart(2, '0')}-01-NIGHT`;

  // 1. Hyper-Realistic Human Motion & Biological Kinetics Directive
  const bioKinetics = shot.actorDirecting?.biologicalMotion || 'subtle involuntary chest rise-and-fall from breathing, realistic eye micro-saccades with natural blinks';
  const organicHumanMotionTokens = 
    `organic human motion physics, ${bioKinetics}, gentle throat swallow cue, subtle lip tremble before speech, slight weight transfer between feet, fluid lifelike muscle tension in neck and jaw, zero robotic stiffness, photorealistic 8K skin pores and micro-translucency`;

  const hollywoodRef = shot.cameraDirector?.hollywoodRef ? `Hollywood Cinematography Grammar: inspired by ${shot.cameraDirector.hollywoodRef}. ` : '';
  const psychologicalIntent = shot.cameraDirector?.psychologicalIntent ? `Emotional Subtext: ${shot.cameraDirector.psychologicalIntent}. ` : '';
  const opticalKeyframeText = focusDirective ? `Camera Motion & Focal Choreography: [${focusDirective}]. ` : '';

  // 2. Cinematic English Master Video Prompt (Models perform significantly better with precise English cinematography terms)
  const masterVideoPrompt = 
    `Vertical 9:16 cinematic video, ${framing}, ${movement}. ` +
    `Subject: ${charName}, authentic Asian actress/actor with photorealistic facial details, Seed: ${seed}, <lora:${lora}:${loraWeight}>. ` +
    `In-Scene Wardrobe Continuity Locked: ${wardrobe}, perfectly consistent fabric texture, button count, collar style, and jewelry strictly preserved across all cuts without mutation. ` +
    `Acting & Facial Dynamics: ${facialActing}. Body language: ${bodyLanguage}. ` +
    `Motion Quality: ${organicHumanMotionTokens}. ` +
    `${hollywoodRef}${psychologicalIntent}${opticalKeyframeText}` +
    `Environment & Setting: ${location}, night rainstorm outside, raindrops sliding down exterior glass pane with glistening neon reflections. ` +
    `Lighting & Optics: Shot on ARRI Alexa Mini, ${lens}, ${dof}, ${tilt}. ${lighting}. ` +
    `Scene Continuity Tag: [Continuity ID: ${continuityId} | Wardrobe Locked 100% | Lighting 2700K/6500K Match | Spatial Anchor: In front of dark oak conference table]. ` +
    `Masterpiece, 8K UHD, photorealistic vertical short drama, 24fps motion blur, high dynamic range.`;

  // 3. Platform Specific Variants
  const klingPrompt = 
    `[9:16 Vertical Video] ${framing} of ${charName}, ${wardrobe}. ${facialActing}, ${bodyLanguage}. Camera: ${lens}, ${movement}, ${tilt}. ${focusDirective ? `[Choreography: ${focusDirective}] ` : ''}${lighting}, ${location}, night rainstorm. Highly natural human acting with micro-breathing and subtle eye blinks. [Seed: ${seed}]`;

  const runwayPrompt = 
    `9:16 vertical cinema shot. ${movement} on ${charName} (${wardrobe}). ${focusDirective ? `Focal shift: ${focusDirective}. ` : ''}Acting: ${facialActing}. Environment: ${location} with rain on glass. Cinematic lighting: ${lighting}. Natural organic human movement, realistic eye blinking, no stiff motion. Lens: ${lens}.`;

  const hailuoPrompt = 
    `Vertical 9:16 frame. ${charName} performing intense dramatic scene. ${facialActing}. ${bodyLanguage}. High fidelity human micro-expressions, realistic mouth tremble, fluid body physics. Camera: ${lens}, ${movement}. ${focusDirective ? `Camera rack focus: ${focusDirective}. ` : ''}Setting: ${location}, moody cinematic lighting.`;

  const lumaPrompt = 
    `A cinematic 9:16 vertical shot. Camera performs a ${movement} towards ${charName}. ${focusDirective ? `Optical transition: ${focusDirective}. ` : ''}She is ${bodyLanguage}, her face displaying ${facialActing}. Ultra-realistic human physics, chest breathing motion, soft eye blinks. Beautiful rain bokeh in background. ${lens}, ${lighting}.`;

  const comfyUiPayload = {
    workflow: "SeriesX_Vertical_9_16_Wan21_ComfyUI",
    aspect_ratio: "9:16",
    resolution: [1080, 1920],
    frame_rate: 24,
    num_frames: 96,
    seed: seed,
    lora_name: lora,
    lora_weight: loraWeight,
    positive_prompt: masterVideoPrompt,
    negative_prompt: UNIVERSAL_NEGATIVE_PROMPT,
    camera_motion: {
      vector: movement,
      lens: lens,
      dof: dof,
      tilt: tilt,
      keyframe_directive: focusDirective || "Standard Auto-Focus"
    },
    continuity: {
      scene_id: continuityId,
      shot_index: shotIndex + 1,
      match_previous_lighting: prevShot ? true : false
    }
  };

  // 4. Voice & Dialogue Prompt (TTS / Voice Clone Ready)
  const voiceScriptPrompt = {
    speaker: charName,
    voiceId: char.voiceProfile?.voiceId || 'TH-Fem-Deep-04',
    emotion: emotionTag,
    dialogueRaw: dialogue,
    dialogueWithCues: dialogueWithCues,
    vocalCurve: vocalCurve,
    prosodySettings: {
      pitch: char.voiceProfile?.pitch || '-2 semitones',
      speed: char.voiceProfile?.speed || '1.05x',
      breathIntensity: char.voiceProfile?.breathIntensity || '0.45',
      microBreathing: char.voiceProfile?.microBreathing || 'Auto-insert [stifled gasp] on tension peaks'
    },
    sfxPrompt: shot.sfx || 'Rain lashing glass, thunderclap, crystal glass clinking',
    bgmPrompt: shot.bgm || 'Dark cinematic cello swell'
  };

  return {
    shotId: shot.id,
    shotNumber: shot.number || String(shotIndex + 1).padStart(2, '0'),
    shotName: shot.name,
    duration: shot.duration || '4.0s',
    characterName: charName,
    seed,
    lora,
    masterVideoPrompt,
    negativePrompt: UNIVERSAL_NEGATIVE_PROMPT,
    platformPrompts: {
      kling: klingPrompt,
      runway: runwayPrompt,
      hailuo: hailuoPrompt,
      luma: lumaPrompt,
      comfyui: JSON.stringify(comfyUiPayload, null, 2)
    },
    comfyUiPayload,
    voiceScriptPrompt,
    metadataBreakdown: {
      characterSpec: `${charName} (Seed: ${seed}, LoRA: ${lora})`,
      wardrobeSpec: wardrobe,
      gestureActing: `${facialActing} | ${bodyLanguage} (FACS: ${facs})`,
      humanMotionEngine: organicHumanMotionTokens,
      cameraCinematography: `${framing} • ${movement} • ${lens} • ${tilt} • ${dof}`,
      sceneLighting: `${location} • ${lighting}`,
      voiceDelivery: `[${emotionTag}] ${dialogueWithCues}`,
      sceneContinuity: `[${continuityId}] Match previous shot lighting & spatial positions`
    }
  };
}

/**
 * Generate full production package for all shots in a series
 */
export function generateFullSeriesProductionPrompts(series) {
  const shots = series.shots || [];
  const characters = series.characters || [];

  return shots.map((shot, idx) => {
    // Find matching character
    const charNameShort = (shot.actorDirecting?.character || shot.character || '').trim();
    const character = characters.find(c => {
      const cName = (c.name || '').split('/')[0].trim();
      return cName.includes(charNameShort) || charNameShort.includes(cName);
    }) || characters[0] || {};

    return generateShotProductionPrompt(shot, character, series, idx, shots);
  });
}
