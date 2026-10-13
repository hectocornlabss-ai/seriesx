import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Video, Smartphone, Sparkles, Layers, Sliders, CheckCircle2, Camera, Eye, Activity, Crosshair } from 'lucide-react';

export default function GenerationPipelineTab({ shots, characters }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentShotIdx, setCurrentShotIdx] = useState(0);
  const [playbackTime, setPlaybackTime] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showFaceTracking, setShowFaceTracking] = useState(true);
  const [showFramingGrid, setShowFramingGrid] = useState(true);
  const [selectedLens, setSelectedLens] = useState('85mm');
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(100);

  const activeShot = shots[currentShotIdx] || shots[0];

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setPlaybackTime(prev => {
          if (prev >= 70) {
            setIsPlaying(false);
            return 0;
          }
          const nextTime = prev + 1;
          if (nextTime < 4) setCurrentShotIdx(0);
          else if (nextTime < 15) setCurrentShotIdx(1);
          else if (nextTime < 35) setCurrentShotIdx(2);
          else setCurrentShotIdx(3);
          return nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSimulateRender = () => {
    setIsRendering(true);
    setRenderProgress(0);
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      if (current >= 100) {
        clearInterval(interval);
        setRenderProgress(100);
        setIsRendering(false);
      } else {
        setRenderProgress(current);
      }
    }, 400);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '24px 0' }}>
      {/* Engine Status Banner */}
      <div className="glass-panel" style={{
        padding: '18px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        borderLeft: '4px solid #06b6d4'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(6, 182, 212, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#06b6d4'
          }}>
            <Camera size={20} />
          </div>
          <div>
            <h2 style={{ fontSize: '1rem', color: '#ffffff', margin: 0 }}>
              AI Cinematography, Acting & Sound Synthesis Engine
            </h2>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              ประมวลผลมุมกล้อง 9:16 (Lens & Motion) + สีหน้าการแสดงสมจริง (FACS & Tears) + เสียงพากย์และลมหายใจ
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={handleSimulateRender}
            disabled={isRendering}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #f43f5e 0%, #8b5cf6 100%)',
              color: '#ffffff',
              fontSize: '0.82rem',
              fontWeight: 600,
              boxShadow: '0 0 15px rgba(244, 63, 94, 0.3)'
            }}
          >
            <Sparkles size={15} />
            {isRendering ? `กำลังเรนเดอร์... (${renderProgress}%)` : 'Re-render Shot Acting'}
          </button>
        </div>
      </div>

      {/* Main Studio Viewport & Mixer Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: '24px' }}>
        {/* Left Column: 9:16 Vertical Video Monitor with HUD Overlays */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            height: '640px',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '2px solid rgba(255, 255, 255, 0.12)',
            background: '#000000',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8)'
          }}>
            {/* Main Video Frame */}
            <img
              src={activeShot.mediaUrl}
              alt="Vertical Frame"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'all 0.3s ease-in-out'
              }}
            />

            {/* 9:16 Cinematic Rule-of-Thirds Grid */}
            {showFramingGrid && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gridTemplateRows: '1fr 1fr 1fr',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.15)', borderBottom: '1px dashed rgba(255,255,255,0.15)' }} />
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.15)', borderBottom: '1px dashed rgba(255,255,255,0.15)' }} />
                <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.15)' }} />
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.15)', borderBottom: '1px dashed rgba(255,255,255,0.15)' }} />
                <div style={{ borderRight: '1px dashed rgba(255,255,255,0.15)', borderBottom: '1px dashed rgba(255,255,255,0.15)' }} />
                <div style={{ borderBottom: '1px dashed rgba(255,255,255,0.15)' }} />
              </div>
            )}

            {/* Actor Face-Mesh & FACS HUD */}
            {showFaceTracking && (
              <div style={{
                position: 'absolute',
                top: '22%',
                left: '18%',
                width: '140px',
                height: '160px',
                border: '1.5px solid #10b981',
                borderRadius: '8px',
                pointerEvents: 'none',
                boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '6px'
              }}>
                <span style={{ fontSize: '0.62rem', color: '#10b981', background: 'rgba(0,0,0,0.75)', padding: '2px 4px', borderRadius: '3px', width: 'fit-content' }}>
                  FACS: {activeShot.actorDirecting ? activeShot.actorDirecting.facsCode : 'AU1+AU4 Synced'}
                </span>
                <span style={{ fontSize: '0.6rem', color: '#38bdf8', background: 'rgba(0,0,0,0.75)', padding: '2px 4px', borderRadius: '3px', alignSelf: 'flex-end' }}>
                  {activeShot.cameraDirector?.lens || '85mm f/1.4'}
                </span>
              </div>
            )}

            {/* Social Overlay for Safe Zone Checking */}
            {showOverlay && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                pointerEvents: 'none',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 600 }}>
                  <span>สำหรับคุณ (FYP Safe Zone)</span>
                </div>
                <div style={{ alignSelf: 'flex-end', display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.2rem' }}>❤️</div>
                  <div style={{ fontSize: '1.2rem' }}>💬</div>
                  <div style={{ fontSize: '1.2rem' }}>↗️</div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.5)', padding: '8px', borderRadius: '6px', color: '#fff', fontSize: '0.75rem' }}>
                  <strong>@SeriesX_Studio</strong>
                  <div>{activeShot.dialogue}</div>
                </div>
              </div>
            )}

            {/* Bottom Scrubber & Controls inside Video */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '16px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.95), transparent)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#fff', fontSize: '0.75rem' }}>
                <span>Shot {activeShot.number}: {activeShot.name.split(':')[0]}</span>
                <span style={{ fontFamily: 'var(--font-mono)' }}>00:{playbackTime.toString().padStart(2, '0')} / 01:10</span>
              </div>

              {/* Scrubber bar */}
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.2)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${(playbackTime / 70) * 100}%`, height: '100%', background: '#f43f5e' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#f43f5e',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                  </button>
                  <button
                    onClick={() => { setPlaybackTime(0); setCurrentShotIdx(0); }}
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => setShowFramingGrid(!showFramingGrid)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: showFramingGrid ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '0.7rem'
                    }}
                  >
                    Grid 9:16
                  </button>
                  <button
                    onClick={() => setShowFaceTracking(!showFaceTracking)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: showFaceTracking ? 'rgba(16,185,129,0.3)' : 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '0.7rem'
                    }}
                  >
                    FACS Mesh
                  </button>
                  <button
                    onClick={() => setShowOverlay(!showOverlay)}
                    style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      background: showOverlay ? 'rgba(244,63,94,0.3)' : 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: '0.7rem'
                    }}
                  >
                    TikTok
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Cinematography Director & Audio Stems Mixer */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Shot Switcher Tabs */}
          <div className="glass-panel" style={{ padding: '16px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
              Select Active Shot Preview:
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginTop: '8px' }}>
              {shots.map((shot, idx) => {
                const isActive = idx === currentShotIdx;
                return (
                  <button
                    key={shot.id}
                    onClick={() => { setCurrentShotIdx(idx); setPlaybackTime(idx === 0 ? 0 : idx === 1 ? 5 : idx === 2 ? 16 : 36); }}
                    style={{
                      padding: '8px 10px',
                      borderRadius: '6px',
                      background: isActive ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      border: isActive ? '1px solid #f43f5e' : '1px solid var(--border-subtle)',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: isActive ? '#fb7185' : '#fff' }}>
                      Shot {shot.number}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                      {shot.name.split(':')[0]}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Deep Camera & Acting Performance Specs Card */}
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8' }}>
                <Camera size={18} />
                <h4 style={{ fontSize: '0.95rem', margin: 0, color: '#ffffff' }}>
                  การกำกับมุมกล้อง & การแสดงอารมณ์สด (Live Shot Directing)
                </h4>
              </div>
              <span className="badge badge-purple">{activeShot.cameraDirector?.lens || '85mm Cine Prime'}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem' }}>
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: '#38bdf8', display: 'block', marginBottom: '4px' }}>
                  🎥 มุมกล้องและการเคลื่อนไหว:
                </strong>
                <p style={{ margin: 0, color: '#cbd5e1' }}>
                  {activeShot.cameraDirector?.movement || activeShot.cameraAngle}
                </p>
                <div style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                  องศา: {activeShot.cameraDirector?.tiltAngle || 'Level Eye-line'} &bull; โบเก้: {activeShot.cameraDirector?.depthOfField || 'f/1.4'}
                </div>
              </div>

              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <strong style={{ color: '#34d399', display: 'block', marginBottom: '4px' }}>
                  🎭 สีหน้าและการเคลื่อนไหวกล้ามเนื้อ:
                </strong>
                <p style={{ margin: 0, color: '#cbd5e1' }}>
                  {activeShot.actorDirecting?.facialMicroExpressions || activeShot.action}
                </p>
                <div style={{ marginTop: '6px', fontSize: '0.75rem', color: '#10b981' }}>
                  FACS Code: {activeShot.actorDirecting?.facsCode || 'AU1+AU4+AU20 Synced'}
                </div>
              </div>
            </div>
          </div>

          {/* Audio Multi-Track Stems with Micro-Breathing Waveform */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
                  🎙️ Multi-Stem Audio Engine & Vocal Prosody Waveform
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  ซิงค์เสียงพูดกับจังหวะลมหายใจ (Breath Sync), เอฟเฟกต์สภาพแวดล้อม (SFX), และดนตรีดราม่า (BGM)
                </p>
              </div>
              <span className="badge badge-green">48kHz Lossless</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Track 1: Dialogue with micro-cues */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '14px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Volume2 size={16} color="#fb7185" />
                    <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Track 1: Vocal Emotion & Micro-Breathing</strong>
                  </div>
                  <span className="badge badge-red" style={{ fontSize: '0.7rem' }}>
                    {activeShot.vocalProsody?.emotionTag || activeShot.emotionTag}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#f8fafc', fontStyle: 'italic', marginBottom: '8px' }}>
                  "{activeShot.vocalProsody?.withCues || activeShot.dialogue}"
                </div>
                {/* Simulated Audio Waveform */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '28px' }}>
                  {[40, 65, 80, 50, 95, 100, 70, 85, 90, 60, 45, 80, 95, 75, 40, 60, 85, 100, 90, 50, 30].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: isPlaying ? '#f43f5e' : 'rgba(244, 63, 94, 0.4)',
                        borderRadius: '2px',
                        transition: 'height 0.2s'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Track 2: SFX */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Track 2: Foley & Environmental SFX</strong>
                  <span style={{ fontSize: '0.75rem', color: '#67e8f9' }}>{activeShot.sfx}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '20px' }}>
                  {[20, 30, 90, 40, 20, 15, 60, 70, 20, 30, 15, 40, 35, 20, 15, 20, 30, 40, 25, 20, 15].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: isPlaying ? '#06b6d4' : 'rgba(6, 182, 212, 0.4)',
                        borderRadius: '2px'
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Track 3: BGM */}
              <div style={{ background: 'rgba(0,0,0,0.3)', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#ffffff' }}>Track 3: Cinematic Score (BGM)</strong>
                  <span style={{ fontSize: '0.75rem', color: '#c084fc' }}>{activeShot.bgm}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '20px' }}>
                  {[30, 35, 40, 45, 55, 60, 65, 75, 80, 85, 90, 95, 90, 85, 80, 75, 70, 65, 60, 50, 40].map((h, i) => (
                    <div
                      key={i}
                      style={{
                        flex: 1,
                        height: `${h}%`,
                        background: isPlaying ? '#8b5cf6' : 'rgba(139, 92, 246, 0.4)',
                        borderRadius: '2px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
