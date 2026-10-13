import React, { useState } from 'react';
import { 
  BookOpen, Plus, Trash2, Edit3, Sparkles, Feather, FileText, 
  CheckCircle2, Wand2, RefreshCw, MessageSquare, Zap, Flame, 
  Compass, ArrowRight, Save, Clock, Sliders, FolderPlus, Layers,
  ChevronDown, Check, AlertCircle, Play
} from 'lucide-react';

export default function NovelStudioEditor({
  series,
  onUpdateSeries,
  onConvertToScreenplay
}) {
  const defaultVolumes = series.volumes || [
    { id: "vol-01", title: "เล่มที่ 1: เพลิงแค้นกลางสายฝน" },
    { id: "vol-02", title: "เล่มที่ 2: ในเงามืดของศัตรู" }
  ];

  const defaultChapters = series.chapters || [
    {
      id: "ch-001",
      number: 1,
      volumeId: "vol-01",
      title: "ตอนที่ 1: พันธสัญญาเที่ยงคืน",
      status: "พร้อมแปลงเป็นบท",
      wordCount: 1450,
      content: `สายฝนยามค่ำคืนกระหน่ำซัดกระจกนิรภัยบานยักษ์ของห้องประชุมชั้น 48 อาคารคุโรดะ ทาวเวอร์ แสงนีออนจากมหานครเบื้องล่างส่องสะท้อนผิวกระจกที่เปียกปอน ดูราวกับหยดเลือดที่ไหลรินอย่างไม่มีวันสิ้นสุด

ริน ลลิตา ยืนกำหมัดแน่นอยู่หน้าโต๊ะทำงานไม้โอ๊คดำ ในมือของเธอคือแฟ้มคดีลับที่มีรอยไหม้เกรียมตรงมุมกระดาษ หัวใจของเธอเต้นระรัวราวกับเสียงฟ้าร้องที่คำรามอยู่ภายนอก แต่ดวงตากลับแน่วแน่ไม่ยอมกะพริบ

"ถ้าคืนนี้คุณไม่เซ็นรับรองความบริสุทธิ์ของพ่อฉัน..." น้ำเสียงของเธอสั่นเครือเพียงเสี้ยววินาที ก่อนจะแปรเปลี่ยนเป็นความกร้าวกระด้างที่เยือกเย็น "พรุ่งนี้เช้า ข้อมูลชุดนี้จะถูกส่งตรงไปยังสำนักข่าวทุกแห่งในประเทศ!"

ทาดาโอะ คุโรดะ ประธานหนุ่มผู้กุมชะตาธุรกิจระดับหมื่นล้าน ค่อยๆ วางแก้วคริสตัลบรรจุวิสกี้ลงบนโต๊ะ เสียงแก้วกระทบเนื้อไม้ดังกังวานในความเงียบสงัด เขาลุกขึ้นยืนเต็มความสูง สูทชาร์โคลสั่งตัดพิเศษขับเน้นรูปร่างสง่างามน่าเกรงขาม ดวงตาสีรัตติกาลของเขาจ้องมองหญิงสาวตรงหน้าราวกับพญาเหยี่ยวที่กำลังจดจ้องเหยื่อ

"คุณคิดว่าการเอาชีวิตมาเสี่ยงในห้องของผม..." ทาดาโอะก้าวเข้ามาใกล้เธอช้าๆ ระยะห่างลดลงจนเธอได้กลิ่นไอความเย็นชาและน้ำหอมกลิ่นแซนดัลวูดจากตัวเขา "...มันจะเปลี่ยนความจริงที่ว่าพ่อคุณทรยศตระกูลของผมได้เหรอ ริน?"

รินเปิดกระเป๋าถือหนังหรูราคาแพง หยิบไดรฟ์ข้อมูลลับที่ซ่อนอยู่ข้างขวดเซรั่มสีทองอำพันขึ้นมาวางกระแทกลงบนโต๊ะ แววตาของเธอไม่มีความหวาดกลัวหลงเหลืออยู่อีกต่อไป

"ฉันไม่ได้มาเสี่ยง... ฉันมาจบเกมโกหกที่คุณสร้างขึ้นมาต่างหาก!"

ทันใดนั้น เสียงตัดกระแสไฟฟ้าดังพรึ่บ! แสงไฟทั่วทั้งอาคารดับวูบลงสู่ความมืดมิด มีเพียงแสงฟ้าแลบที่สว่างวาบเผยให้เห็นใบหน้าของทั้งสองในระยะประชิด ทาดาโอะคว้าข้อมือของเธอไว้อย่างรวดเร็ว ลมหายใจอุ่นร้อนของเขารินรดอยู่ข้างแก้มของเธอ

เสียงสัญญาณเตือนภัยฉุกเฉินสีแดงเริ่มหมุนวนและส่งเสียงหวีดร้องก้องอาคาร ทาดาโอะกระซิบชิดใบหูของเธอด้วยน้ำเสียงที่ตระหนกอย่างแท้จริงเป็นครั้งแรก...

"มีคนตัดระบบอาคาร... ใครบอกให้คุณมาที่นี่กันแน่!?"`,
      notes: "เน้นความขัดแย้งของอารมณ์รักและแค้น ช็อตจบต้องตัดฉึบทันทีที่ไซเรนดังเพื่อเป็น 3s Hook และ Cliffhanger"
    },
    {
      id: "ch-002",
      number: 2,
      volumeId: "vol-01",
      title: "ตอนที่ 2: ในเงามืดของศัตรู",
      status: "กำลังเขียน (Draft)",
      wordCount: 1120,
      content: `สัญญาณเตือนภัยสีแดงสาดส่องเป็นจังหวะ ย้อมทั้งห้องประชุมให้กลายเป็นสีเลือด ความมืดมิดที่เข้าปกคลุมทำให้ประสาทสัมผัสทุกส่วนของรินตื่นตัวสูงสุด ข้อมือของเธอยังคงถูกทาดาโอะกุมแน่นจนแทบแหลกคามือ

"ปล่อยฉัน!" รินพยายามสะบัดตัวออก แต่แรงของเขามหาศาลเกินกว่าที่เธอจะต้านทานได้

"ถ้าคุณอยากรอดตายออกไปจากตึกนี้ อย่าส่งเสียงดัง" ทาดาโอะกระซิบสั่งเสียงต่ำ แววตาของเขาเปลี่ยนไปอย่างสิ้นเชิง มันไม่ใช่สายตาเหยียดยิ้มของผู้กุมอำนาจอีกต่อไป แต่เป็นสัญชาตญาณของนักล่าที่รู้ว่ากำลังตกเป็นเป้าหมาย

เสียงฝีเท้าหนักๆ ของกลุ่มคนในชุดปฏิบัติการพิเศษดังขึ้นจากบันไดหนีไฟด้านนอก เสียงปลดล็อกสลักอาวุธปืนดังกริ๊กชัดเจน รินเบิกตากว้างในความมืด... คนพวกนี้ไม่ได้มาเพื่อเจรจา แต่มาเพื่อกวาดล้าง!

ทาดาโอะกระชากตัวเธอให้หลบหลังเสาต้นใหญ่ มือหนึ่งโอบเอวเธอไว้แนบชิด อีกมือเอื้อมปลดรหัสเซฟลับใต้โต๊ะทำงาน หยิบปืนพกสีดำด้านออกมาอย่างคล่องแคล่ว

"จำไว้ให้ดี ริน..." เขาจ้องลึกเข้าไปในดวงตาของเธอ "ถ้าคืนนี้เราไม่รอด ความจริงเรื่องพ่อของคุณก็จะตายไปพร้อมกับเราสองคน!"`,
      notes: "เพิ่มฉากแอ็กชันและการเอาชีวิตรอดร่วมกันเพื่อสร้างความใกล้ชิดทางอารมณ์ และเปิดปมศัตรูร่วม"
    },
    {
      id: "ch-003",
      number: 3,
      volumeId: "vol-01",
      title: "ตอนที่ 3: กับดักมหาเศรษฐี",
      status: "กำลังเขียน (Draft)",
      wordCount: 980,
      content: `ควันสีเทาจางๆ ลอยลอดผ่านช่องลมใต้ประตู เสียงกระจกด้านนอกระเบิดแตกกระจายบ่งบอกว่าผู้บุกรุกเริ่มกราดยิงเพื่อปิดทางออกทั้งหมด

รินก้มมองแฟ้มข้อมูลที่ตนเองกอดแนบหน้าอกไว้แน่น หากแฟ้มนี้ถูกทำลาย ทุกสิ่งที่เธอพยายามตามหามาตลอดสามปีจะสูญเปล่า ทาดาโอะหันกลับมามองเธอ นิ้วของเขาแตะเบาๆ ที่คางของเธอ ยกใบหน้าเธอขึ้นสบตา

"คุณไว้ใจผมไหม?" คำถามนั้นสั้นกระชับแต่หนักแน่นราวกับภูผา

"ไม่เลยแม้แต่น้อย" รินตอบกลับทันทีโดยไม่ลังเล แม้ว่าหัวใจจะเต้นผิดจังหวะ

ทาดาโอะกระตุกยิ้มมุมปากเล็กน้อย "ดี... เพราะคนที่ไว้ใจผมในวงการนี้ ล้วนไม่มีใครมีชีวิตรอดเกินห้าปี แต่ถ้าคุณอยากออกจากตึกนี้ ทำตามที่ผมบอกทุกคำ!"`,
      notes: "สร้างไดนามิกความสัมพันธ์แบบ Enemies to Allies ปูทางสู่ Climax ประจำเล่ม"
    }
  ];

  const [volumes, setVolumes] = useState(defaultVolumes);
  const [chapters, setChapters] = useState(defaultChapters);
  const [selectedVolumeId, setSelectedVolumeId] = useState(defaultVolumes[0].id);
  const [activeChapterId, setActiveChapterId] = useState(defaultChapters[0].id);
  
  // AI Co-writer states
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [aiNotice, setAiNotice] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [selectedTone, setSelectedTone] = useState('dark');
  const [tensionLevel, setTensionLevel] = useState(8);
  const [showAddVolumeModal, setShowAddVolumeModal] = useState(false);
  const [newVolumeTitle, setNewVolumeTitle] = useState('');

  // Active chapter and volume references
  const currentChapter = chapters.find(c => c.id === activeChapterId) || chapters[0] || {};
  const currentVolume = volumes.find(v => v.id === selectedVolumeId) || volumes[0] || {};
  
  // Filter chapters for current volume
  const filteredChapters = chapters.filter(c => !c.volumeId || c.volumeId === selectedVolumeId);

  // Sync update
  const syncSeriesData = (updatedChapters, updatedVolumes = volumes) => {
    if (onUpdateSeries) {
      onUpdateSeries({
        ...series,
        volumes: updatedVolumes,
        chapters: updatedChapters
      });
    }
  };

  const handleUpdateContent = (newText) => {
    const wordCount = newText.trim() ? newText.trim().split(/\s+/).length : 0;
    const updated = chapters.map(ch => ch.id === currentChapter.id ? {
      ...ch,
      content: newText,
      wordCount: wordCount
    } : ch);
    setChapters(updated);
    syncSeriesData(updated);
  };

  const handleUpdateTitle = (newTitle) => {
    const updated = chapters.map(ch => ch.id === currentChapter.id ? {
      ...ch,
      title: newTitle
    } : ch);
    setChapters(updated);
    syncSeriesData(updated);
  };

  const handleUpdateNotes = (newNotes) => {
    const updated = chapters.map(ch => ch.id === currentChapter.id ? {
      ...ch,
      notes: newNotes
    } : ch);
    setChapters(updated);
    syncSeriesData(updated);
  };

  const handleUpdateStatus = (newStatus) => {
    const updated = chapters.map(ch => ch.id === currentChapter.id ? {
      ...ch,
      status: newStatus
    } : ch);
    setChapters(updated);
    syncSeriesData(updated);
  };

  // Add Chapter
  const handleAddChapter = () => {
    const nextNumber = chapters.length + 1;
    const newCh = {
      id: `ch-${Date.now()}`,
      number: nextNumber,
      volumeId: selectedVolumeId,
      title: `ตอนที่ ${nextNumber}: ตอนใหม่ที่ยังไม่ตั้งชื่อ`,
      status: "กำลังเขียน (Draft)",
      wordCount: 0,
      content: "",
      notes: "โครงเรื่องย่อสำหรับตอนนี้..."
    };
    const updated = [...chapters, newCh];
    setChapters(updated);
    setActiveChapterId(newCh.id);
    syncSeriesData(updated);
  };

  // Delete Chapter
  const handleDeleteChapter = (id) => {
    if (chapters.length <= 1) {
      alert("ไม่สามารถลบตอนสุดท้ายของนิยายได้");
      return;
    }
    if (window.confirm("คุณต้องการลบตอนนี้ออกจากนิยายใช่หรือไม่?")) {
      const remaining = chapters.filter(c => c.id !== id);
      setChapters(remaining);
      setActiveChapterId(remaining[0].id);
      syncSeriesData(remaining);
    }
  };

  // Add Volume (เล่ม/ภาค)
  const handleAddVolume = (e) => {
    e.preventDefault();
    if (!newVolumeTitle.trim()) return;
    const newVol = {
      id: `vol-${Date.now()}`,
      title: newVolumeTitle.trim()
    };
    const updatedVols = [...volumes, newVol];
    setVolumes(updatedVols);
    setSelectedVolumeId(newVol.id);
    setNewVolumeTitle('');
    setShowAddVolumeModal(false);
    
    // Also create first chapter for this new volume
    const nextNumber = chapters.length + 1;
    const newCh = {
      id: `ch-${Date.now()}`,
      number: nextNumber,
      volumeId: newVol.id,
      title: `ตอนที่ ${nextNumber}: จุดเริ่มต้นของ${newVol.title}`,
      status: "กำลังเขียน (Draft)",
      wordCount: 0,
      content: "",
      notes: "เปิดบทใหม่ของเล่มนี้"
    };
    const updatedChs = [...chapters, newCh];
    setChapters(updatedChs);
    setActiveChapterId(newCh.id);
    syncSeriesData(updatedChs, updatedVols);
  };

  // AI Co-Writer Assistant Actions
  const handleAiAction = (actionType) => {
    setIsAiGenerating(true);
    setAiNotice('');

    setTimeout(() => {
      setIsAiGenerating(false);
      let addition = '';

      if (actionType === 'continue') {
        addition = `\n\nความเงียบเข้าปกคลุมชั่วขณะ ได้ยินเพียงเสียงหยดน้ำที่ไหลรินตามผิวกระจก ทาดาโอะหันกลับมาสบตากับเธออีกครั้ง แววตาที่เคยมั่นใจกลับมีความลังเลแฝงอยู่ลึกๆ "คุณแน่ใจเหรอว่าพร้อมจะรู้ความจริงทั้งหมด... แม้ว่ามันอาจทำลายทุกสิ่งที่คุณเชื่อมาทั้งชีวิต?" รินสูดลมหายใจลึก กำหมัดแน่นจนเล็บจิกเนื้อ`;
        handleUpdateContent(currentChapter.content + addition);
        setAiNotice('AI ช่วยเขียนเนื้อเรื่องต่อตามโครงสร้างดราม่าเรียบร้อยแล้ว');
      } else if (actionType === 'cliffhanger') {
        addition = `\n\nทันใดนั้น เสียงโทรศัพท์ฉุกเฉินบนโต๊ะทำงานที่ควรจะตัดสัญญาณไปแล้วกลับดังขึ้น! หน้าจอแสดงชื่อผู้โทรเข้าที่ทำให้เลือดในกายของรินเย็นเฉียบ..."พ่อ" ทาดาโอะหันขวับมามองเธอทันทีด้วยสายตาที่ยากจะคาดเดา!`;
        handleUpdateContent(currentChapter.content + addition);
        setAiNotice('AI แทรกจุดทิ้งท้าย Cliffhanger (กระชากอารมณ์ท้ายตอน) สำเร็จ');
      } else if (actionType === 'atmosphere') {
        addition = `\n\nบรรยากาศในห้องเย็นยะเยือกด้วยอุณหภูมิของเครื่องปรับอากาศที่ตัดสลับกับไอร้อนจากพายุฝนภายนอก กลิ่นไอความชื้นของฝนและกลิ่นควันจากเอกสารที่มอดไหม้ ผสานกับความกดดันที่บีบคั้นจนแทบหายใจไม่ออก แสงฟ้าแลบสาดประกายวาบเป็นระยะ เผยให้เห็นเงามืดทอดผ่านใบหน้าของทั้งสอง`;
        handleUpdateContent(currentChapter.content + addition);
        setAiNotice('AI บรรยายบรรยากาศและประสาทสัมผัส (Sensory Immersion) เพิ่มเติมแล้ว');
      } else if (actionType === 'dialogue') {
        addition = `\n\n"คุณคิดว่าตัวเองเป็นใคร ทาดาโอะ?" รินเค้นเสียงลอดไรฟัน "พระเจ้าที่กุมชะตาชีวิตคนอื่นงั้นเหรอ?"\n"ผมไม่ใช่พระเจ้า..." ทาดาโอะก้าวเข้ามาจนปลายจมูกแทบชิดกัน "แต่ในตึกนี้ ผมคือคนที่ตัดสินว่าใครจะได้อยู่ต่อ หรือใครต้องหายไป"`;
        handleUpdateContent(currentChapter.content + addition);
        setAiNotice('AI ขัดเกลาบทพูดให้เชือดเฉือนและกระชับคมคายเรียบร้อยแล้ว');
      } else if (actionType === 'escalate') {
        addition = `\n\nเสียงลิฟต์ฉุกเฉินดังขึ้นตึ้ง! ตัวเลขบนหน้าปัดกำลังเลื่อนขึ้นสู่ชั้น 48 อย่างรวดเร็ว ใครบางคนกำลังถือการ์ดผู้บริหารสูงสุดขึ้นมา ทาดาโอะกระชากตัวรินเข้ามาหลบในมุมอับ ลมหายใจของทั้งคู่ประสานกันในระยะเพียงคืบ`;
        handleUpdateContent(currentChapter.content + addition);
        setAiNotice('AI ยกระดับความตึงเครียด (Tension Boost) สู่ขีดสุด');
      } else if (actionType === 'custom') {
        if (!customPrompt.trim()) return;
        addition = `\n\n[เนื้อหาที่ AI แต่งตามคำสั่ง: "${customPrompt}"]\nรินหันไปมองตามทิศทางนั้นทันที สิ่งที่ปรากฏอยู่เบื้องหน้าทำให้แผนการทั้งหมดที่เธอเตรียมมาต้องพลิกผัน ทาดาโอะไม่รอช้า เขาคว้าสิ่งนั้นขึ้นมาแล้วจ้องตรงมาที่เธอ "นี่ใช่ไหม... สิ่งที่คุณตามหามาตลอด?"`;
        handleUpdateContent(currentChapter.content + addition);
        setCustomPrompt('');
        setAiNotice('AI ปฏิบัติตามคำสั่งการแต่งนิยายเรียบร้อยแล้ว');
      }

      setTimeout(() => setAiNotice(''), 4000);
    }, 850);
  };

  const totalWords = chapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* TOP HEADER: NOVEL TITLE & VOLUME / CHAPTER COUNTERS */}
      <div className="clay-card" style={{ padding: '20px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '12px',
              background: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-teal-btn)',
              flexShrink: 0
            }}>
              <Feather size={22} strokeWidth={2} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-teal">สตูดิโอแต่งนิยาย (Novel Writing Studio)</span>
                <span className="badge badge-sand">{currentVolume.title}</span>
                <span className="badge badge-teal-subtle">โหมด AI Co-Writer พร้อมใช้งาน</span>
              </div>
              <h2 style={{ fontSize: '1.35rem', color: 'var(--text-main)', margin: '4px 0 0 0', fontWeight: 800 }}>
                {series.title}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{
              background: 'var(--bg-inset)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              รวมทั้งหมด: <strong style={{ color: 'var(--text-main)' }}>{volumes.length} เล่ม</strong> &bull;{' '}
              <strong style={{ color: 'var(--text-main)' }}>{chapters.length} ตอน</strong> &bull;{' '}
              <strong style={{ color: 'var(--teal-primary)' }}>{totalWords.toLocaleString()} คำ</strong>
            </div>

            <button
              onClick={() => setShowAddVolumeModal(true)}
              className="btn-secondary"
              title="เพิ่มเล่มหรือภาคใหม่สำหรับเรื่องนี้"
            >
              <FolderPlus size={15} strokeWidth={2} />
              <span>เพิ่มเล่ม/ภาค</span>
            </button>

            <button
              onClick={handleAddChapter}
              className="btn-primary"
            >
              <Plus size={16} strokeWidth={2} />
              <span>เพิ่มตอนใหม่</span>
            </button>

            {onConvertToScreenplay && (
              <button
                onClick={() => onConvertToScreenplay(currentChapter)}
                className="btn-secondary"
                style={{
                  background: 'var(--bg-surface)',
                  color: 'var(--teal-primary)',
                  border: '1.5px solid var(--teal-primary)',
                  fontWeight: 700
                }}
                title="นำเนื้อหาตอนนี้ไปแยก Beat Sheet และแปลงเป็นบทซีรีส์ 9:16 ทันที"
              >
                <Play size={14} strokeWidth={2} />
                <span>แปลงเป็นบทซีรีส์ 9:16</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3-COLUMN NOVEL WRITING SUITE */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr 340px',
        gap: '20px',
        alignItems: 'start'
      }}>
        
        {/* ========================================================
            COLUMN 1: VOLUMES & CHAPTERS HIERARCHY (เล่ม และ ตอน)
           ======================================================== */}
        <div className="clay-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', minHeight: '780px' }}>
          
          {/* Volume Selector Header */}
          <div style={{ marginBottom: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Layers size={16} strokeWidth={2} color="var(--teal-primary)" />
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                  เล่ม / ภาค (Volumes)
                </strong>
              </div>
              <button
                onClick={() => setShowAddVolumeModal(true)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--teal-primary)',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontWeight: 700
                }}
              >
                <Plus size={13} strokeWidth={2} />
                <span>เพิ่มเล่ม</span>
              </button>
            </div>

            {/* Volume Selector Dropdown / Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {volumes.map(vol => {
                const isVolActive = vol.id === selectedVolumeId;
                const volChaptersCount = chapters.filter(c => c.volumeId === vol.id).length;
                return (
                  <div
                    key={vol.id}
                    onClick={() => {
                      setSelectedVolumeId(vol.id);
                      const firstCh = chapters.find(c => c.volumeId === vol.id);
                      if (firstCh) setActiveChapterId(firstCh.id);
                    }}
                    style={{
                      padding: '8px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: isVolActive ? 'var(--teal-primary)' : 'var(--bg-inset)',
                      color: isVolActive ? '#FFFFFF' : 'var(--text-main)',
                      fontSize: '0.78rem',
                      fontWeight: isVolActive ? 700 : 500,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.15s ease',
                      border: isVolActive ? 'none' : '1px solid var(--border-subtle)',
                      boxShadow: isVolActive ? 'var(--shadow-teal-btn)' : 'var(--shadow-inset)'
                    }}
                  >
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {vol.title}
                    </span>
                    <span style={{
                      fontSize: '0.7rem',
                      opacity: 0.85,
                      padding: '1px 6px',
                      borderRadius: '10px',
                      background: isVolActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface)'
                    }}>
                      {volChaptersCount} ตอน
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chapters List */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '12px 0 8px 0', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={16} strokeWidth={2} color="var(--teal-primary)" />
              <strong style={{ fontSize: '0.88rem', color: 'var(--text-main)' }}>
                สารบัญรายตอน (Chapters)
              </strong>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontWeight: 600 }}>
              {filteredChapters.length} ตอน
            </span>
          </div>

          {/* Chapter cards list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, maxHeight: '560px', paddingRight: '4px' }}>
            {filteredChapters.map(ch => {
              const isActive = ch.id === currentChapter.id;
              return (
                <div
                  key={ch.id}
                  onClick={() => setActiveChapterId(ch.id)}
                  style={{
                    padding: '12px',
                    borderRadius: 'var(--radius-md)',
                    background: isActive ? 'var(--bg-raised)' : 'var(--bg-surface)',
                    border: isActive ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                    boxShadow: isActive ? 'var(--shadow-raised)' : 'var(--shadow-raised-sm)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                    <span style={{
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      color: isActive ? 'var(--teal-primary)' : 'var(--text-main)',
                      lineHeight: 1.3
                    }}>
                      {ch.title}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px', fontSize: '0.7rem' }}>
                    <span style={{ color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FileText size={11} strokeWidth={2} />
                      {ch.wordCount || 0} คำ
                    </span>
                    <span className={ch.status === "พร้อมแปลงเป็นบท" ? "badge badge-teal" : "badge badge-sand"} style={{ fontSize: '0.62rem', padding: '2px 6px' }}>
                      {ch.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleAddChapter}
            className="btn-secondary"
            style={{ width: '100%', marginTop: '14px', justifyContent: 'center' }}
          >
            <Plus size={15} strokeWidth={2} />
            <span>เพิ่มตอนใหม่ในเล่มนี้</span>
          </button>
        </div>

        {/* ========================================================
            COLUMN 2: MANUSCRIPT WRITING CANVAS (หน้าแต่งนิยายหลัก)
           ======================================================== */}
        <div className="clay-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '780px' }}>
          
          {/* Chapter Metadata & Header Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ flex: 1, minWidth: '260px' }}>
              <input
                type="text"
                value={currentChapter.title || ''}
                onChange={(e) => handleUpdateTitle(e.target.value)}
                placeholder="ชื่อตอน..."
                style={{
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-display)',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  borderBottom: '2px solid transparent',
                  width: '100%',
                  padding: '4px 0'
                }}
                onFocus={(e) => e.target.style.borderBottom = '2px solid var(--border-focus)'}
                onBlur={(e) => e.target.style.borderBottom = '2px solid transparent'}
              />
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                สังกัด: <strong style={{ color: 'var(--teal-primary)' }}>{currentVolume.title}</strong>
              </div>
            </div>

            {/* Status Selector & Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <select
                value={currentChapter.status || "กำลังเขียน (Draft)"}
                onChange={(e) => handleUpdateStatus(e.target.value)}
                style={{
                  background: 'var(--bg-inset)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-pill)',
                  padding: '4px 10px',
                  fontSize: '0.75rem',
                  color: 'var(--text-main)',
                  fontWeight: 600,
                  outline: 'none'
                }}
              >
                <option value="กำลังเขียน (Draft)">ร่าง (Draft)</option>
                <option value="ตรวจทานแล้ว (Reviewed)">ตรวจทานแล้ว</option>
                <option value="พร้อมแปลงเป็นบท">พร้อมแปลงเป็นบท 9:16</option>
              </select>

              <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={13} strokeWidth={2} />
                อ่าน {Math.ceil((currentChapter.wordCount || 0) / 250) || 1} นาที
              </span>
              
              {chapters.length > 1 && (
                <button
                  onClick={() => handleDeleteChapter(currentChapter.id)}
                  style={{
                    background: 'var(--accent-red-bg)',
                    border: '1px solid rgba(185,56,72,0.2)',
                    borderRadius: '50%',
                    width: '30px',
                    height: '30px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-red)',
                    cursor: 'pointer'
                  }}
                  title="ลบตอนนี้"
                >
                  <Trash2 size={14} strokeWidth={2} />
                </button>
              )}
            </div>
          </div>

          {/* AI Success Notification Toast */}
          {aiNotice && (
            <div style={{
              marginBottom: '14px',
              padding: '10px 16px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-green-bg)',
              color: 'var(--accent-green)',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(31, 122, 89, 0.3)'
            }}>
              <CheckCircle2 size={16} strokeWidth={2} />
              <span>{aiNotice}</span>
            </div>
          )}

          {/* Writing Textarea Canvas */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <textarea
              value={currentChapter.content || ''}
              onChange={(e) => handleUpdateContent(e.target.value)}
              placeholder="เริ่มแต่งนิยายบทนี้ที่นี่... คุณสามารถพิมพ์เนื้อหาได้อย่างอิสระ หรือเลือกกดปุ่มเครื่องมือ AI ด้านขวา เพื่อให้ระบบช่วยเขียนต่อ แทรกจุดหักมุม Cliffhanger หรือขัดเกลาบทพูด..."
              style={{
                flex: 1,
                minHeight: '440px',
                width: '100%',
                background: 'var(--bg-inset)',
                boxShadow: 'var(--shadow-inset)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '20px 24px',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.96rem',
                lineHeight: 1.85,
                resize: 'vertical',
                outline: 'none',
                letterSpacing: '0.01em'
              }}
            />
          </div>

          {/* Chapter Author Notes / Director's Memo */}
          <div style={{
            marginTop: '14px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px 16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.78rem', color: 'var(--teal-primary)', fontWeight: 700 }}>
              <Edit3 size={13} strokeWidth={2} />
              <span>บันทึกช่วยจำของผู้แต่ง & จุดเน้นฉาก (Author's Director Memo):</span>
            </div>
            <input
              type="text"
              value={currentChapter.notes || ''}
              onChange={(e) => handleUpdateNotes(e.target.value)}
              placeholder="เช่น บันทึกจุดขัดแย้งของอารมณ์, สิ่งที่ต้องเฉลยในท้ายตอน..."
              style={{
                width: '100%',
                background: 'transparent',
                border: 'none',
                borderBottom: '1px dashed var(--border-subtle)',
                outline: 'none',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}
            />
          </div>

          {/* Canvas Bottom Bar: Counts & Auto-save Status */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '12px',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)'
          }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>จำนวนคำ: <strong style={{ color: 'var(--text-main)' }}>{(currentChapter.wordCount || 0).toLocaleString()} คำ</strong></span>
              <span>ตัวอักษร: <strong style={{ color: 'var(--text-main)' }}>{(currentChapter.content?.length || 0).toLocaleString()} ตัว</strong></span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-green)', fontWeight: 600 }}>
              <CheckCircle2 size={14} strokeWidth={2} />
              <span>บันทึกร่างเรียบร้อยแล้ว</span>
            </div>
          </div>
        </div>

        {/* ========================================================
            COLUMN 3: AI CO-WRITER TOOLBOX (เครื่องมือให้ AI ช่วยเขียน)
           ======================================================== */}
        <div className="clay-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', minHeight: '780px', gap: '16px' }}>
          
          {/* AI Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--teal-primary)', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
            <Sparkles size={18} strokeWidth={2} />
            <h3 style={{ fontSize: '0.98rem', margin: 0, fontWeight: 800 }}>
              เครื่องมือ AI ช่วยแต่งนิยาย
            </h3>
          </div>

          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
            ชุดเครื่องมือ AI Co-Writer ช่วยเขียนเนื้อหาต่อ เติมจุดหักมุมกระชากอารมณ์ และเกลาบทพูดให้เข้ากับจังหวะซีรีส์แนวตั้ง
          </p>

          {/* Quick AI Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            
            {/* 1. Continue Writing */}
            <button
              onClick={() => handleAiAction('continue')}
              disabled={isAiGenerating}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
            >
              <Wand2 size={16} strokeWidth={2} />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>เขียนต่อให้อัตโนมัติ</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.85 }}>AI ศึกษาบริบทแล้วแต่งฉากถัดไปให้ลื่นไหล</div>
              </div>
            </button>

            {/* 2. Cliffhanger Twist */}
            <button
              onClick={() => handleAiAction('cliffhanger')}
              disabled={isAiGenerating}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
            >
              <Zap size={16} strokeWidth={2} color="var(--teal-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>แทรกจุดหักมุม Cliffhanger</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>สร้างจุดทิ้งท้ายกระชากอารมณ์ท้ายตอน</div>
              </div>
            </button>

            {/* 3. Sensory Atmosphere */}
            <button
              onClick={() => handleAiAction('atmosphere')}
              disabled={isAiGenerating}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
            >
              <Compass size={16} strokeWidth={2} color="var(--teal-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>บรรยายฉาก & ประสาทสัมผัส</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>เติมมิติแสง กลิ่นไอฝน และความเงียบ</div>
              </div>
            </button>

            {/* 4. Dialogue Polish */}
            <button
              onClick={() => handleAiAction('dialogue')}
              disabled={isAiGenerating}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
            >
              <MessageSquare size={16} strokeWidth={2} color="var(--teal-primary)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>ขัดเกลาบทพูดให้เชือดเฉือน</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>คำพูดสั้นกระชับ ซ่อนเจตนาและ Subtext</div>
              </div>
            </button>

            {/* 5. Escalate Tension */}
            <button
              onClick={() => handleAiAction('escalate')}
              disabled={isAiGenerating}
              className="btn-secondary"
              style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
            >
              <Flame size={16} strokeWidth={2} color="var(--accent-amber)" />
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>ยกระดับความขัดแย้ง (Escalate)</div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>เร่งจังหวะการคุกคามและปะทะทางอารมณ์</div>
              </div>
            </button>
          </div>

          {/* Custom Prompt Box */}
          <div style={{
            background: 'var(--bg-inset)',
            boxShadow: 'var(--shadow-inset)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px'
          }}>
            <strong style={{ fontSize: '0.78rem', color: 'var(--teal-primary)', display: 'block', marginBottom: '6px' }}>
              สั่ง AI เขียนเฉพาะจุด (Custom Prompt):
            </strong>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="เช่น: ให้รินค้นพบความลับในลิ้นชัก หรือให้ทาดาโอะดึงรินเข้ามาประชิดตัว..."
              rows={2}
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px',
                fontSize: '0.75rem',
                color: 'var(--text-main)',
                resize: 'none',
                outline: 'none',
                marginBottom: '8px'
              }}
            />
            <button
              onClick={() => handleAiAction('custom')}
              disabled={isAiGenerating || !customPrompt.trim()}
              className="btn-primary"
              style={{ width: '100%', fontSize: '0.75rem', padding: '6px 10px', justifyContent: 'center' }}
            >
              <Wand2 size={13} strokeWidth={2} />
              <span>{isAiGenerating ? 'AI กำลังเขียน...' : 'ให้ AI เขียนตามคำสั่ง'}</span>
            </button>
          </div>

          {/* Writing Tone & Tension Controls */}
          <div style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
              <Sliders size={14} strokeWidth={2} color="var(--teal-primary)" />
              <strong style={{ fontSize: '0.78rem', color: 'var(--teal-primary)' }}>
                ปรับจังหวะ & โทนอารมณ์นิยาย
              </strong>
            </div>

            {/* Tone Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
              {[
                { id: 'dark', label: 'ดาร์กดราม่า / ล้างแค้น (Revenge)' },
                { id: 'romance', label: 'โรแมนติกตึงเครียด (Enemies to Lovers)' },
                { id: 'mystery', label: 'สืบสวนชิงไหวชิงพริบ (Mind Games)' },
                { id: 'action', label: 'แอ็กชันหนีเอาชีวิตรอด (Survival)' }
              ].map(tone => (
                <label
                  key={tone.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.72rem',
                    color: 'var(--text-main)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="radio"
                    name="writing-tone"
                    checked={selectedTone === tone.id}
                    onChange={() => setSelectedTone(tone.id)}
                    style={{ accentColor: 'var(--teal-primary)' }}
                  />
                  <span>{tone.label}</span>
                </label>
              ))}
            </div>

            {/* Tension Slider */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>ความตึงเครียด (Tension):</span>
                <strong style={{ color: 'var(--teal-primary)' }}>ระดับ {tensionLevel}/10</strong>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={tensionLevel}
                onChange={(e) => setTensionLevel(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--teal-primary)' }}
              />
            </div>
          </div>

        </div>

      </div>

      {/* MODAL: ADD NEW VOLUME (เพิ่มเล่ม/ภาค) */}
      {showAddVolumeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(30, 25, 20, 0.45)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '20px'
        }}>
          <div className="clay-card" style={{ maxWidth: '440px', width: '100%', padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', color: 'var(--teal-primary)' }}>
              <FolderPlus size={20} strokeWidth={2} />
              <h3 style={{ fontSize: '1.1rem', margin: 0, fontWeight: 700, color: 'var(--text-main)' }}>
                เพิ่มเล่ม / ภาคใหม่
              </h3>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              แบ่งโครงเรื่องนิยายออกเป็นเล่มหรือภาค (Arcs) เพื่อจัดระเบียบเนื้อเรื่องและตอนต่างๆ
            </p>

            <form onSubmit={handleAddVolume}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>
                  ชื่อเล่ม / ภาค (Volume Title)
                </label>
                <input
                  type="text"
                  placeholder="เช่น เล่มที่ 3: กับดักหัวใจในเพลิงแค้น"
                  value={newVolumeTitle}
                  onChange={(e) => setNewVolumeTitle(e.target.value)}
                  className="clay-input"
                  style={{ width: '100%' }}
                  autoFocus
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowAddVolumeModal(false)}
                  className="btn-secondary"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!newVolumeTitle.trim()}
                >
                  <Plus size={15} strokeWidth={2} />
                  <span>สร้างเล่มใหม่</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
