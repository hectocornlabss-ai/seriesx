import React, { useState } from 'react';
import { 
  BookOpen, Plus, Trash2, Edit3, Sparkles, Feather, FileText, 
  CheckCircle2, Wand2, RefreshCw, MessageSquare, Zap, Flame, 
  Compass, ArrowRight, Save, Clock, Sliders, FolderPlus, Layers,
  ChevronDown, Check, AlertCircle, Play, Maximize2, Minimize2,
  CornerDownRight, CheckSquare, Square, MessageSquarePlus, Quote,
  Bold, Italic, Underline, ListFilter, User, Send, Undo2, Redo2,
  Search, Eye, HelpCircle
} from 'lucide-react';

export default function NovelStudioEditor({
  series,
  onUpdateSeries,
  onConvertToScreenplay,
  onOpenSeriesSettings
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
      wordCount: 2150,
      content: `สายฝนยามค่ำคืนกระหน่ำซัดกระจกนิรภัยบานยักษ์ของห้องประชุมชั้น 48 อาคารคุโรดะ ทาวเวอร์ แสงนีออนจากมหานครเบื้องล่างส่องสะท้อนผิวกระจกที่เปียกปอน ดูราวกับหยดเลือดที่ไหลรินอย่างไม่มีวันสิ้นสุด

ริน ลลิตา ยืนกำหมัดแน่นอยู่หน้าโต๊ะทำงานไม้โอ๊คดำ ในมือของเธอคือแฟ้มคดีลับที่มีรอยไหม้เกรียมตรงมุมกระดาษ หัวใจของเธอเต้นระรัวราวกับเสียงฟ้าร้องที่คำรามอยู่ภายนอก แต่ดวงตากลับแน่วแน่ไม่ยอมกะพริบ

"ถ้าคืนนี้คุณไม่เซ็นรับรองความบริสุทธิ์ของพ่อฉัน..." น้ำเสียงของเธอสั่นเครือเพียงเสี้ยววินาที ก่อนจะแปรเปลี่ยนเป็นความกร้าวกระด้างที่เยือกเย็น "พรุ่งนี้เช้า ข้อมูลชุดนี้จะถูกส่งตรงไปยังสำนักข่าวทุกแห่งในประเทศ!"

ทาดาโอะ คุโรดะ ประธานหนุ่มผู้กุมชะตาธุรกิจระดับหมื่นล้าน ค่อยๆ วางแก้วคริสตัลบรรจุวิสกี้ลงบนโต๊ะ เสียงแก้วกระทบเนื้อไม้ดังกังวานในความเงียบสงัด เขาลุกขึ้นยืนเต็มความสูง สูทชาร์โคลสั่งตัดพิเศษขับเน้นรูปร่างสง่างามน่าเกรงขาม ดวงตาสีรัตติกาลของเขาจ้องมองหญิงสาวตรงหน้าราวกับพญาเหยี่ยวที่กำลังจดจ้องเหยื่อ

"คุณคิดว่าการเอาชีวิตมาเสี่ยงในห้องของผม..." ทาดาโอะก้าวเข้ามาใกล้เธอช้าๆ ระยะห่างลดลงจนเธอได้กลิ่นไอความเย็นชาและน้ำหอมกลิ่นแซนดัลวูดจากตัวเขา "...มันจะเปลี่ยนความจริงที่ว่าพ่อคุณทรยศตระกูลของผมได้เหรอ ริน?"

รินเปิดกระเป๋าถือหนังหรูราคาแพง หยิบไดรฟ์ข้อมูลลับที่ซ่อนอยู่ข้างขวดเซรั่มสีทองอำพันขึ้นมาวางกระแทกลงบนโต๊ะ แววตาของเธอไม่มีความหวาดกลัวหลงเหลืออยู่อีกต่อไป

"ฉันไม่ได้มาเสี่ยง... ฉันมาจบเกมโกหกที่คุณสร้างขึ้นมาต่างหาก!"

ทันใดนั้น เสียงตัดกระแสไฟฟ้าดังพรึ่บ! แสงไฟทั่วทั้งอาคารดับวูบลงสู่ความมืดมิด มีเพียงแสงฟ้าแลบที่สว่างวาบเผยให้เห็นใบหน้าของทั้งสองในระยะประชิด ทาดาโอะคว้าข้อมือของเธอไว้อย่างรวดเร็ว ลมหายใจอุ่นร้อนของเขารินรดอยู่ข้างแก้มของเธอ

เสียงสัญญาณเตือนภัยฉุกเฉินสีแดงเริ่มหมุนวนและส่งเสียงหวีดร้องก้องอาคาร ทาดาโอะกระซิบชิดใบหูของเธอด้วยน้ำเสียงที่ตระหนกอย่างแท้จริงเป็นครั้งแรก...

"มีคนตัดระบบอาคาร... ใครบอกให้คุณมาที่นี่กันแน่!?"

ความเงียบเข้าปกคลุมอีกครั้งท่ามกลางเสียงหัวใจของคนทั้งสองที่เต้นถี่เร็ว แสงไฟฉุกเฉินสีแดงกะพริบสาดเงาของทาดาโอะทาบทับร่างของริน เขายังคงไม่ยอมปล่อยมือ แต่กลับออกแรงดึงเธอให้ขยับมาชิดแผ่นอกกว้างของเขามากขึ้น

"ถ้าคุณอยากมีชีวิตรอดออกไปพิสูจน์ความบริสุทธิ์ของพ่อคุณ..." ทาดาโอะกระซิบเสียงต่ำแผ่วเบาจนแทบกลืนหายไปกับเสียงฝน "อย่าก้าวห่างจากผมแม้แต่ก้าวเดียว!"`,
      notes: "เน้นความขัดแย้งของอารมณ์รักและแค้น ช็อตจบต้องตัดฉึบทันทีที่ไซเรนดังเพื่อเป็น 3s Hook และ Cliffhanger",
      comments: [
        {
          id: "cmt-1",
          author: "ผู้กำกับ ธีรภัทร (Director)",
          role: "Director",
          avatarColor: "var(--teal-primary)",
          targetQuote: "รินเปิดกระเป๋าถือหนังหรูราคาแพง หยิบไดรฟ์ข้อมูลลับที่ซ่อนอยู่ข้างขวดเซรั่มสีทองอำพันขึ้นมาวางกระแทกลงบนโต๊ะ",
          comment: "จุดนี้มีการ Tie-in ขวดเซรั่ม LUMIÈRE ได้อย่างเป็นธรรมชาติ แนะนำให้เพิ่มจังหวะปลายนิ้วที่สั่นสะท้าน 1.2 วินาที ก่อนจะกระแทกลงโต๊ะ เพื่อขับเน้นอารมณ์โกรธแค้นที่เก็บกดไว้",
          timestamp: "13 ต.ค. 21:15",
          resolved: false,
          replies: [
            {
              id: "rep-1",
              author: "รินทร์ (Writer)",
              comment: "ปรับแก้เรียบร้อยครับ เพิ่มจังหวะปลายนิ้วสั่นและเสียงหายใจสะอื้นในบทพูดแล้วครับ",
              timestamp: "13 ต.ค. 21:30"
            }
          ]
        },
        {
          id: "cmt-2",
          author: "บรรณาธิการ พิมพ์ชนก (Editor)",
          role: "Editor",
          avatarColor: "#B93848",
          targetQuote: "เสียงสัญญาณเตือนภัยฉุกเฉินสีแดงเริ่มหมุนวนและส่งเสียงหวีดร้องก้องอาคาร ทาดาโอะกระซิบชิดใบหูของเธอด้วยน้ำเสียงที่ตระหนกอย่างแท้จริงเป็นครั้งแรก...",
          comment: "จังหวะนี้เป็น 3-Second Hook ประจำซีรีส์แนวตั้งที่ยอดเยี่ยมมาก แนะนำให้ตัดจบแบบกระชากอารมณ์ (Cliffhanger Cut) อย่าเพิ่งเฉลยว่าใครเป็นคนตัดระบบ",
          timestamp: "13 ต.ค. 21:45",
          resolved: true,
          replies: []
        },
        {
          id: "cmt-3",
          author: "AI Script Doctor",
          role: "AI Co-Auditor",
          avatarColor: "#D97706",
          targetQuote: "ถ้าคืนนี้คุณไม่เซ็นรับรองความบริสุทธิ์ของพ่อฉัน...",
          comment: "คำพูดประโยคนี้ควรเน้นน้ำเสียงสั่นเครือช่วงต้น แล้วกดเสียงต่ำให้เยือกเย็นช่วงท้าย จะสอดคล้องกับ Micro-expression AU1+AU4",
          timestamp: "13 ต.ค. 22:05",
          resolved: false,
          replies: []
        }
      ]
    },
    {
      id: "ch-002",
      number: 2,
      volumeId: "vol-01",
      title: "ตอนที่ 2: ในเงามืดของศัตรู",
      status: "กำลังเขียน (Draft)",
      wordCount: 1650,
      content: `สัญญาณเตือนภัยสีแดงสาดส่องเป็นจังหวะ ย้อมทั้งห้องประชุมให้กลายเป็นสีเลือด ความมืดมิดที่เข้าปกคลุมทำให้ประสาทสัมผัสทุกส่วนของรินตื่นตัวสูงสุด ข้อมือของเธอยังคงถูกทาดาโอะกุมแน่นจนแทบแหลกคามือ

"ปล่อยฉัน!" รินพยายามสะบัดตัวออก แต่แรงของเขามหาศาลเกินกว่าที่เธอจะต้านทานได้

"ถ้าคุณอยากรอดตายออกไปจากตึกนี้ อย่าส่งเสียงดัง" ทาดาโอะกระซิบสั่งเสียงต่ำ แววตาของเขาเปลี่ยนไปอย่างสิ้นเชิง มันไม่ใช่สายตาเหยียดยิ้มของผู้กุมอำนาจอีกต่อไป แต่เป็นสัญชาตญาณของนักล่าที่รู้ว่ากำลังตกเป็นเป้าหมาย

เสียงฝีเท้าหนักๆ ของกลุ่มคนในชุดปฏิบัติการพิเศษดังขึ้นจากบันไดหนีไฟด้านนอก เสียงปลดล็อกสลักอาวุธปืนดังกริ๊กชัดเจน รินเบิกตากว้างในความมืด... คนพวกนี้ไม่ได้มาเพื่อเจรจา แต่มาเพื่อกวาดล้าง!

ทาดาโอะกระชากตัวเธอให้หลบหลังเสาต้นใหญ่ มือหนึ่งโอบเอวเธอไว้แนบชิด อีกมือเอื้อมปลดรหัสเซฟลับใต้โต๊ะทำงาน หยิบปืนพกสีดำด้านออกมาอย่างคล่องแคล่ว

"จำไว้ให้ดี ริน..." เขาจ้องลึกเข้าไปในดวงตาของเธอ "ถ้าคืนนี้เราไม่รอด ความจริงเรื่องพ่อของคุณก็จะตายไปพร้อมกับเราสองคน!"`,
      notes: "เพิ่มฉากแอ็กชันและการเอาชีวิตรอดร่วมกันเพื่อสร้างความใกล้ชิดทางอารมณ์",
      comments: []
    }
  ];

  const [volumes, setVolumes] = useState(defaultVolumes);
  const [chapters, setChapters] = useState(defaultChapters);
  const [selectedVolumeId, setSelectedVolumeId] = useState(defaultVolumes[0].id);
  const [activeChapterId, setActiveChapterId] = useState(defaultChapters[0].id);
  
  // View Modes & Sidebar State
  const [focusMode, setFocusMode] = useState(false); // Zen / Focus Mode
  const [rightPanelTab, setRightPanelTab] = useState('comments'); // 'comments' | 'ai'
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentFilter, setCommentFilter] = useState('all'); // 'all' | 'active' | 'resolved'
  
  // New Comment Form State
  const [newCommentText, setNewCommentText] = useState('');
  const [newCommentTarget, setNewCommentTarget] = useState('');
  const [newCommentAuthor, setNewCommentAuthor] = useState('ผู้กำกับ ธีรภัทร (Director)');
  const [showAddCommentForm, setShowAddCommentForm] = useState(false);
  const [replyInputMap, setReplyInputMap] = useState({});

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
  const chapterComments = currentChapter.comments || [];
  
  // Filter chapters for current volume
  const filteredChapters = chapters.filter(c => !c.volumeId || c.volumeId === selectedVolumeId);

  // Sync update to parent
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
      notes: "โครงเรื่องย่อสำหรับตอนนี้...",
      comments: []
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

  // Comments Management
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const newCmt = {
      id: `cmt-${Date.now()}`,
      author: newCommentAuthor,
      role: newCommentAuthor.includes('Director') ? 'Director' : newCommentAuthor.includes('Editor') ? 'Editor' : 'Reviewer',
      avatarColor: newCommentAuthor.includes('Director') ? 'var(--teal-primary)' : '#B93848',
      targetQuote: newCommentTarget || "ทั้งย่อหน้า / ภาพรวมของฉาก",
      comment: newCommentText.trim(),
      timestamp: "เมื่อสักครู่",
      resolved: false,
      replies: []
    };

    const updatedChapters = chapters.map(ch => {
      if (ch.id === currentChapter.id) {
        return {
          ...ch,
          comments: [newCmt, ...(ch.comments || [])]
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    syncSeriesData(updatedChapters);
    setNewCommentText('');
    setNewCommentTarget('');
    setShowAddCommentForm(false);
    setActiveCommentId(newCmt.id);
    setRightPanelTab('comments');
  };

  const handleToggleResolveComment = (commentId) => {
    const updatedChapters = chapters.map(ch => {
      if (ch.id === currentChapter.id) {
        return {
          ...ch,
          comments: (ch.comments || []).map(cmt => cmt.id === commentId ? {
            ...cmt,
            resolved: !cmt.resolved
          } : cmt)
        };
      }
      return ch;
    });
    setChapters(updatedChapters);
    syncSeriesData(updatedChapters);
  };

  const handleAddReply = (commentId) => {
    const text = replyInputMap[commentId];
    if (!text || !text.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: "คุณ (นักเขียน/ผู้แต่ง)",
      comment: text.trim(),
      timestamp: "เมื่อสักครู่"
    };

    const updatedChapters = chapters.map(ch => {
      if (ch.id === currentChapter.id) {
        return {
          ...ch,
          comments: (ch.comments || []).map(cmt => cmt.id === commentId ? {
            ...cmt,
            replies: [...(cmt.replies || []), newReply]
          } : cmt)
        };
      }
      return ch;
    });

    setChapters(updatedChapters);
    syncSeriesData(updatedChapters);
    setReplyInputMap(prev => ({ ...prev, [commentId]: '' }));
  };

  // AI Assistant Actions
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
      } else if (actionType === 'custom') {
        if (!customPrompt.trim()) return;
        addition = `\n\n[เนื้อหาที่ AI แต่งตามคำสั่ง: "${customPrompt}"]\nรินหันไปมองตามทิศทางนั้นทันที สิ่งที่ปรากฏอยู่เบื้องหน้าทำให้แผนการทั้งหมดที่เธอเตรียมมาต้องพลิกผัน ทาดาโอะไม่รอช้า เขาคว้าสิ่งนั้นขึ้นมาแล้วจ้องตรงมาที่เธอ "นี่ใช่ไหม... สิ่งที่คุณตามหามาตลอด?"`;
        handleUpdateContent(currentChapter.content + addition);
        setCustomPrompt('');
        setAiNotice('AI ปฏิบัติตามคำสั่งการแต่งนิยายเรียบร้อยแล้ว');
      }

      setTimeout(() => setAiNotice(''), 4000);
    }, 800);
  };

  // Filtered comments
  const filteredComments = chapterComments.filter(cmt => {
    if (commentFilter === 'active') return !cmt.resolved;
    if (commentFilter === 'resolved') return cmt.resolved;
    return true;
  });

  const activeCommentsCount = chapterComments.filter(c => !c.resolved).length;
  const totalWords = chapters.reduce((acc, c) => acc + (c.wordCount || 0), 0);
  const estimatedPages = Math.ceil((currentChapter.wordCount || 0) / 350) || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      
      {/* 1. TOP DOCK: NOVEL INFO, STATS & FOCUS MODE TOGGLE */}
      <div className="clay-card" style={{ padding: '16px 22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'var(--teal-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: 'var(--shadow-teal-btn)',
              flexShrink: 0
            }}>
              <Feather size={19} strokeWidth={2} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                <span className="badge badge-teal">Google Docs Style Novel Editor</span>
                <span className="badge badge-sand">{currentVolume.title}</span>
                {activeCommentsCount > 0 && (
                  <span className="badge badge-teal-subtle" style={{ color: 'var(--teal-primary)', fontWeight: 700 }}>
                    {activeCommentsCount} ข้อเสนอแนะยังไม่แก้
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: '2px 0 0 0', fontWeight: 800 }}>
                {series.title}
              </h2>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Live Stats Pill */}
            <div style={{
              background: 'var(--bg-inset)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.78rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <span>ตอนนี้: <strong style={{ color: 'var(--text-main)' }}>{(currentChapter.wordCount || 0).toLocaleString()} คำ</strong></span>
              <span>เอกสาร: <strong style={{ color: 'var(--teal-primary)' }}>~{estimatedPages} หน้า A4</strong></span>
              <span>อ่าน: <strong style={{ color: 'var(--text-main)' }}>{Math.ceil((currentChapter.wordCount || 0) / 250) || 1} นาที</strong></span>
            </div>

            {/* Focus Mode Button */}
            <button
              onClick={() => setFocusMode(!focusMode)}
              className="btn-secondary"
              style={{ padding: '6px 12px', fontSize: '0.76rem' }}
              title={focusMode ? "ออกจากโหมดโฟกัส" : "เปิดโหมดโฟกัสไร้สิ่งรบกวน (Zen Mode)"}
            >
              {focusMode ? <Minimize2 size={14} strokeWidth={2} /> : <Maximize2 size={14} strokeWidth={2} />}
              <span>{focusMode ? "มุมมองปกติ" : "โหมดโฟกัสเขียนยาว"}</span>
            </button>

            {/* Link to Series Master Settings (Non-popup!) */}
            {onOpenSeriesSettings && (
              <button
                onClick={onOpenSeriesSettings}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                title="เปิดหน้าตั้งค่าโครงสร้างซีรีส์และภาพปกแบบเต็มหน้า (ไม่ใช่ Popup)"
              >
                <Sliders size={14} strokeWidth={2} />
                <span>ตั้งค่าโครงสร้างซีรีส์</span>
              </button>
            )}

            {/* Convert to 9:16 Script */}
            {onConvertToScreenplay && (
              <button
                onClick={() => onConvertToScreenplay(currentChapter)}
                className="btn-primary"
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                title="แปลงเนื้อหาบทนี้เป็น Beat Sheet บทซีรีส์ 9:16 ทันที"
              >
                <Play size={14} strokeWidth={2} />
                <span>แปลงเป็นบทซีรีส์ 9:16</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. MAIN 3-COLUMN WORKSPACE (TOC | GOOGLE DOCS CANVAS | COMMENTS & AI RAIL) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: focusMode ? '1fr' : '260px 1fr 340px',
        gap: '20px',
        alignItems: 'start',
        transition: 'all 0.25s ease'
      }}>
        
        {/* ========================================================
            COLUMN 1: VOLUMES & CHAPTERS HIERARCHY (เล่ม/ตอน)
           ======================================================== */}
        {!focusMode && (
          <div className="clay-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', minHeight: '820px' }}>
            
            {/* Volume Selector */}
            <div style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Layers size={15} strokeWidth={2} color="var(--teal-primary)" />
                  <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>เล่ม / ภาค (Volumes)</strong>
                </div>
                <button
                  onClick={() => setShowAddVolumeModal(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--teal-primary)',
                    cursor: 'pointer',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '2px'
                  }}
                >
                  <Plus size={12} strokeWidth={2} />
                  <span>เพิ่มเล่ม</span>
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {volumes.map(vol => {
                  const isVolActive = vol.id === selectedVolumeId;
                  const count = chapters.filter(c => c.volumeId === vol.id).length;
                  return (
                    <div
                      key={vol.id}
                      onClick={() => {
                        setSelectedVolumeId(vol.id);
                        const firstCh = chapters.find(c => c.volumeId === vol.id);
                        if (firstCh) setActiveChapterId(firstCh.id);
                      }}
                      style={{
                        padding: '8px 10px',
                        borderRadius: 'var(--radius-sm)',
                        background: isVolActive ? 'var(--teal-primary)' : 'var(--bg-inset)',
                        color: isVolActive ? '#FFFFFF' : 'var(--text-main)',
                        fontSize: '0.76rem',
                        fontWeight: isVolActive ? 700 : 500,
                        cursor: 'pointer',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        border: isVolActive ? 'none' : '1px solid var(--border-subtle)',
                        boxShadow: isVolActive ? 'var(--shadow-teal-btn)' : 'none'
                      }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {vol.title}
                      </span>
                      <span style={{
                        fontSize: '0.68rem',
                        padding: '1px 5px',
                        borderRadius: '10px',
                        background: isVolActive ? 'rgba(255,255,255,0.2)' : 'var(--bg-surface)'
                      }}>
                        {count} ตอน
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Chapters TOC Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 8px 0', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <BookOpen size={15} strokeWidth={2} color="var(--teal-primary)" />
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>สารบัญรายตอน</strong>
              </div>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-dim)' }}>{filteredChapters.length} ตอน</span>
            </div>

            {/* Chapter Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, maxHeight: '600px', paddingRight: '4px' }}>
              {filteredChapters.map(ch => {
                const isActive = ch.id === currentChapter.id;
                const cmtsCount = (ch.comments || []).length;
                return (
                  <div
                    key={ch.id}
                    onClick={() => setActiveChapterId(ch.id)}
                    style={{
                      padding: '10px 12px',
                      borderRadius: 'var(--radius-md)',
                      background: isActive ? 'var(--bg-raised)' : 'var(--bg-surface)',
                      border: isActive ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                      boxShadow: isActive ? 'var(--shadow-raised)' : 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: isActive ? 'var(--teal-primary)' : 'var(--text-main)', lineHeight: 1.3 }}>
                      {ch.title}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.7rem' }}>
                      <span style={{ color: 'var(--text-dim)' }}>
                        {(ch.wordCount || 0).toLocaleString()} คำ
                      </span>
                      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        {cmtsCount > 0 && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '2px', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.65rem' }}>
                            <MessageSquare size={10} strokeWidth={2} />
                            {cmtsCount}
                          </span>
                        )}
                        <span className={ch.status === "พร้อมแปลงเป็นบท" ? "badge badge-teal" : "badge badge-sand"} style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                          {ch.status}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleAddChapter}
              className="btn-secondary"
              style={{ width: '100%', marginTop: '12px', justifyContent: 'center', fontSize: '0.78rem' }}
            >
              <Plus size={14} strokeWidth={2} />
              <span>เพิ่มตอนใหม่ในเล่มนี้</span>
            </button>
          </div>
        )}

        {/* ========================================================
            COLUMN 2: GOOGLE DOCS STYLE LONG-FORM MANUSCRIPT CANVAS
           ======================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'center' }}>
          
          {/* Google Docs Toolbar */}
          <div className="clay-card" style={{
            width: '100%',
            maxWidth: '850px',
            padding: '10px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '5px 8px', fontSize: '0.74rem' }}
                title="ย้อนกลับ (Undo)"
              >
                <Undo2 size={13} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="btn-secondary"
                style={{ padding: '5px 8px', fontSize: '0.74rem' }}
                title="ทำซ้ำ (Redo)"
              >
                <Redo2 size={13} strokeWidth={2} />
              </button>

              <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)', margin: '0 4px' }} />

              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>ฟอนต์นิยาย: Cordia / Sarabun 16pt</span>

              <div style={{ width: '1px', height: '18px', background: 'var(--border-subtle)', margin: '0 4px' }} />

              <button
                type="button"
                onClick={() => handleUpdateContent(currentChapter.content + "\n\n***\n\n")}
                className="btn-secondary"
                style={{ padding: '5px 9px', fontSize: '0.72rem' }}
                title="แทรกจุดตัดฉาก (Scene Break)"
              >
                <span>ตัดฉาก ***</span>
              </button>

              <button
                type="button"
                onClick={() => handleUpdateContent(currentChapter.content + `\n\n"..."`)}
                className="btn-secondary"
                style={{ padding: '5px 9px', fontSize: '0.72rem' }}
                title="แทรกบรรทัดบทพูดตัวละคร"
              >
                <Quote size={12} strokeWidth={2} />
                <span>บทพูด " "</span>
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Add Comment Button */}
              <button
                type="button"
                onClick={() => {
                  setShowAddCommentForm(true);
                  setRightPanelTab('comments');
                  setNewCommentTarget("ย่อหน้าปัจจุบัน / ประโยคที่กำลังเขียน");
                }}
                className="btn-primary"
                style={{ padding: '5px 12px', fontSize: '0.75rem' }}
                title="เพิ่มความคิดเห็นของทีมงานหรือผู้กำกับบนจุดนี้"
              >
                <MessageSquarePlus size={14} strokeWidth={2} />
                <span>+ เพิ่มคอมเมนต์</span>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--accent-green)', fontWeight: 600 }}>
                <CheckCircle2 size={13} strokeWidth={2} />
                <span>บันทึกอัตโนมัติ</span>
              </div>
            </div>
          </div>

          {/* REALISTIC GOOGLE DOC PAPER SHEET */}
          <div style={{
            width: '100%',
            maxWidth: '850px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid rgba(220, 215, 205, 0.6)',
            padding: '52px 64px',
            minHeight: '850px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}>
            
            {/* Top Sheet Header: Document Title & Metadata */}
            <div style={{ marginBottom: '28px', borderBottom: '1px solid #ECE7DD', paddingBottom: '16px' }}>
              <input
                type="text"
                value={currentChapter.title || ''}
                onChange={(e) => handleUpdateTitle(e.target.value)}
                placeholder="ชื่อตอนนิยาย..."
                style={{
                  fontSize: '1.45rem',
                  fontWeight: 800,
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-display)',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  padding: '2px 0',
                  borderBottom: '2px solid transparent'
                }}
                onFocus={(e) => e.target.style.borderBottom = '2px solid var(--teal-primary)'}
                onBlur={(e) => e.target.style.borderBottom = '2px solid transparent'}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <div>
                  สังกัด: <strong style={{ color: 'var(--teal-primary)' }}>{currentVolume.title}</strong> &bull;{' '}
                  สถานะ: <strong style={{ color: 'var(--text-main)' }}>{currentChapter.status}</strong>
                </div>
                <div>
                  เวลาอ่านประมาณ: <strong style={{ color: 'var(--teal-primary)' }}>{Math.ceil((currentChapter.wordCount || 0) / 250) || 1} นาที</strong>
                </div>
              </div>
            </div>

            {/* AI Notification Alert */}
            {aiNotice && (
              <div style={{
                marginBottom: '16px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-green-bg)',
                color: 'var(--accent-green)',
                fontSize: '0.8rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '1px solid rgba(31, 122, 89, 0.3)'
              }}>
                <CheckCircle2 size={15} strokeWidth={2} />
                <span>{aiNotice}</span>
              </div>
            )}

            {/* Long-Form Textarea formatted as a Google Doc page */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <textarea
                value={currentChapter.content || ''}
                onChange={(e) => handleUpdateContent(e.target.value)}
                placeholder="เริ่มพิมพ์เนื้อหานิยายขนาดยาวที่นี่... ระบบรองรับเนื้อเรื่องหลายพันคำ สามารถจัดย่อหน้า พิมพ์บทสนทนา หรือสั่งให้ AI ช่วยแต่งต่อได้ทันที"
                style={{
                  flex: 1,
                  minHeight: '680px',
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#2B2620',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '1.02rem',
                  lineHeight: 2.1,
                  letterSpacing: '0.015em',
                  resize: 'none',
                  padding: 0
                }}
              />
            </div>

            {/* Author Director Memo Box */}
            <div style={{
              marginTop: '28px',
              padding: '14px 18px',
              borderRadius: 'var(--radius-sm)',
              background: '#F9F7F2',
              border: '1px dashed #D8D2C4'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--teal-primary)', fontWeight: 700, marginBottom: '4px' }}>
                <Edit3 size={13} strokeWidth={2} />
                <span>บันทึกช่วยจำของผู้แต่ง & จุดเน้นตอน (Author Memo):</span>
              </div>
              <input
                type="text"
                value={currentChapter.notes || ''}
                onChange={(e) => {
                  const val = e.target.value;
                  const updated = chapters.map(c => c.id === currentChapter.id ? { ...c, notes: val } : c);
                  setChapters(updated);
                  syncSeriesData(updated);
                }}
                placeholder="เช่น จุดหักมุมท้ายตอน, ความรู้สึกผิดของตัวละครหลัก..."
                style={{
                  width: '100%',
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.8rem',
                  color: '#4A4238'
                }}
              />
            </div>

            {/* Document Bottom Footer Info */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid #ECE7DD',
              fontSize: '0.75rem',
              color: '#8A8275'
            }}>
              <div>
                หน้า 1 จาก {estimatedPages} หน้า &bull; {(currentChapter.wordCount || 0).toLocaleString()} คำ
              </div>
              <div>
                SeriesX Novel Studio &bull; Google Docs Collaborative Engine
              </div>
            </div>

          </div>
        </div>

        {/* ========================================================
            COLUMN 3: COLLABORATIVE COMMENTS & AI CO-WRITER RAIL
           ======================================================== */}
        {!focusMode && (
          <div className="clay-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', minHeight: '820px', gap: '14px' }}>
            
            {/* Tab Switcher: Comments vs AI */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-inset)',
              padding: '4px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-subtle)',
              gap: '4px'
            }}>
              <button
                type="button"
                onClick={() => setRightPanelTab('comments')}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: rightPanelTab === 'comments' ? 'var(--teal-primary)' : 'transparent',
                  color: rightPanelTab === 'comments' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: rightPanelTab === 'comments' ? 700 : 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.15s'
                }}
              >
                <MessageSquare size={14} strokeWidth={2} />
                <span>ความคิดเห็น ({chapterComments.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setRightPanelTab('ai')}
                style={{
                  flex: 1,
                  padding: '7px 10px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: rightPanelTab === 'ai' ? 'var(--teal-primary)' : 'transparent',
                  color: rightPanelTab === 'ai' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: rightPanelTab === 'ai' ? 700 : 500,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.15s'
                }}
              >
                <Sparkles size={14} strokeWidth={2} />
                <span>AI ช่วยเขียน</span>
              </button>
            </div>

            {/* TAB CONTENT A: COMMENTS & EDITORIAL REVIEW */}
            {rightPanelTab === 'comments' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                
                {/* Filter & Add Comment Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[
                      { id: 'all', label: `ทั้งหมด (${chapterComments.length})` },
                      { id: 'active', label: `เปิดอยู่ (${activeCommentsCount})` },
                      { id: 'resolved', label: `แก้ไขแล้ว` }
                    ].map(f => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setCommentFilter(f.id)}
                        style={{
                          background: commentFilter === f.id ? 'var(--teal-primary)' : 'transparent',
                          color: commentFilter === f.id ? '#FFFFFF' : 'var(--text-muted)',
                          border: 'none',
                          borderRadius: 'var(--radius-pill)',
                          padding: '3px 8px',
                          fontSize: '0.7rem',
                          fontWeight: commentFilter === f.id ? 700 : 500,
                          cursor: 'pointer'
                        }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowAddCommentForm(!showAddCommentForm)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--teal-primary)',
                      cursor: 'pointer',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Plus size={13} strokeWidth={2} />
                    <span>เขียนคอมเมนต์</span>
                  </button>
                </div>

                {/* Form: Add New Comment */}
                {showAddCommentForm && (
                  <form onSubmit={handleAddComment} style={{
                    background: 'var(--bg-inset)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                        เพิ่มความคิดเห็น / ข้อเสนอแนะ:
                      </span>
                      <select
                        value={newCommentAuthor}
                        onChange={(e) => setNewCommentAuthor(e.target.value)}
                        style={{
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-pill)',
                          fontSize: '0.7rem',
                          padding: '2px 6px',
                          outline: 'none'
                        }}
                      >
                        <option value="ผู้กำกับ ธีรภัทร (Director)">ผู้กำกับ (Director)</option>
                        <option value="บรรณาธิการ พิมพ์ชนก (Editor)">บรรณาธิการ (Editor)</option>
                        <option value="AI Script Doctor">AI Script Doctor</option>
                        <option value="ผู้เขียนร่วม (Co-Writer)">ผู้เขียนร่วม (Co-Writer)</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      value={newCommentTarget}
                      onChange={(e) => setNewCommentTarget(e.target.value)}
                      placeholder="ระบุข้อความหรือจุดที่ต้องการคอมเมนต์..."
                      style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 8px',
                        fontSize: '0.74rem',
                        color: 'var(--text-main)',
                        outline: 'none'
                      }}
                    />

                    <textarea
                      rows={2}
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="พิมพ์ข้อเสนอแนะ เช่น ควรปรับไดอะล็อกให้กระชับขึ้น, เพิ่มจังหวะสบตา..."
                      style={{
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 8px',
                        fontSize: '0.74rem',
                        color: 'var(--text-main)',
                        outline: 'none',
                        resize: 'none'
                      }}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setShowAddCommentForm(false)}
                        className="btn-secondary"
                        style={{ padding: '4px 10px', fontSize: '0.72rem' }}
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="submit"
                        disabled={!newCommentText.trim()}
                        className="btn-primary"
                        style={{ padding: '4px 12px', fontSize: '0.72rem' }}
                      >
                        <Send size={11} strokeWidth={2} />
                        <span>ส่งข้อเสนอแนะ</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* Comment Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '580px', paddingRight: '2px' }}>
                  {filteredComments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-dim)', fontSize: '0.8rem' }}>
                      <MessageSquare size={24} strokeWidth={1.5} style={{ margin: '0 auto 8px auto', display: 'block', opacity: 0.6 }} />
                      ไม่มีความคิดเห็นในหมวดนี้
                    </div>
                  ) : (
                    filteredComments.map(cmt => {
                      const isTargetActive = activeCommentId === cmt.id;
                      return (
                        <div
                          key={cmt.id}
                          onClick={() => setActiveCommentId(cmt.id)}
                          style={{
                            background: cmt.resolved ? 'var(--bg-inset)' : isTargetActive ? 'var(--bg-raised)' : 'var(--bg-surface)',
                            border: isTargetActive ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-md)',
                            padding: '12px',
                            boxShadow: isTargetActive ? 'var(--shadow-raised)' : 'none',
                            opacity: cmt.resolved ? 0.7 : 1,
                            transition: 'all 0.15s'
                          }}
                        >
                          {/* Comment Header: Author & Resolve Toggle */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '50%',
                                background: cmt.avatarColor || 'var(--teal-primary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: '#FFFFFF',
                                fontSize: '0.65rem',
                                fontWeight: 700
                              }}>
                                {cmt.author.charAt(0)}
                              </div>
                              <div>
                                <strong style={{ fontSize: '0.78rem', color: 'var(--text-main)', display: 'block', lineHeight: 1.1 }}>
                                  {cmt.author}
                                </strong>
                                <span style={{ fontSize: '0.66rem', color: 'var(--text-dim)' }}>
                                  {cmt.timestamp}
                                </span>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleToggleResolveComment(cmt.id);
                              }}
                              style={{
                                background: cmt.resolved ? 'var(--accent-green-bg)' : 'transparent',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 'var(--radius-pill)',
                                padding: '2px 8px',
                                fontSize: '0.66rem',
                                color: cmt.resolved ? 'var(--accent-green)' : 'var(--text-muted)',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '4px'
                              }}
                              title={cmt.resolved ? "คลิกเพื่อเปิดความคิดเห็นนี้อีกครั้ง" : "คลิกเพื่อทำเครื่องหมายว่าปรับปรุงแล้ว"}
                            >
                              {cmt.resolved ? <CheckSquare size={11} strokeWidth={2} /> : <Square size={11} strokeWidth={2} />}
                              <span>{cmt.resolved ? "แก้ไขแล้ว" : "แก้ไข"}</span>
                            </button>
                          </div>

                          {/* Quoted Target Text Snippet */}
                          {cmt.targetQuote && (
                            <div style={{
                              background: 'rgba(11, 74, 81, 0.06)',
                              borderLeft: '2.5px solid var(--teal-primary)',
                              padding: '4px 8px',
                              borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
                              fontSize: '0.72rem',
                              color: 'var(--teal-primary)',
                              fontStyle: 'italic',
                              marginBottom: '8px',
                              lineHeight: 1.4
                            }}>
                              "{cmt.targetQuote}"
                            </div>
                          )}

                          {/* Comment Body */}
                          <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                            {cmt.comment}
                          </p>

                          {/* Replies Thread */}
                          {(cmt.replies || []).length > 0 && (
                            <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                              {cmt.replies.map(rep => (
                                <div key={rep.id} style={{ background: 'var(--bg-inset)', padding: '6px 8px', borderRadius: 'var(--radius-sm)', fontSize: '0.72rem' }}>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', fontSize: '0.66rem', marginBottom: '2px' }}>
                                    <strong>{rep.author}</strong>
                                    <span>{rep.timestamp}</span>
                                  </div>
                                  <div style={{ color: 'var(--text-main)' }}>{rep.comment}</div>
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Reply Input Box */}
                          <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
                            <input
                              type="text"
                              value={replyInputMap[cmt.id] || ''}
                              onChange={(e) => setReplyInputMap({ ...replyInputMap, [cmt.id]: e.target.value })}
                              placeholder="ตอบกลับ..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddReply(cmt.id);
                                }
                              }}
                              style={{
                                flex: 1,
                                background: 'var(--bg-inset)',
                                border: '1px solid var(--border-subtle)',
                                borderRadius: 'var(--radius-sm)',
                                padding: '4px 8px',
                                fontSize: '0.72rem',
                                color: 'var(--text-main)',
                                outline: 'none'
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleAddReply(cmt.id)}
                              className="btn-primary"
                              style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                            >
                              <CornerDownRight size={11} strokeWidth={2} />
                            </button>
                          </div>

                        </div>
                      );
                    })
                  )}
                </div>

              </div>
            )}

            {/* TAB CONTENT B: AI CO-WRITER TOOLBOX */}
            {rightPanelTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.5, margin: 0 }}>
                  เครื่องมือ AI ช่วยต่อเติมเนื้อหา ขัดเกลาบทพูด และวางจังหวะพล็อตซีรีส์แนวตั้ง
                </p>

                {/* AI Action Buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <button
                    onClick={() => handleAiAction('continue')}
                    disabled={isAiGenerating}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
                  >
                    <Wand2 size={16} strokeWidth={2} />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>เขียนต่อให้อัตโนมัติ</div>
                      <div style={{ fontSize: '0.68rem', opacity: 0.85 }}>AI ศึกษาบริบทแล้วแต่งฉากถัดไปให้ต่อเนื่อง</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAiAction('cliffhanger')}
                    disabled={isAiGenerating}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
                  >
                    <Zap size={16} strokeWidth={2} color="var(--teal-primary)" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>แทรกจุดหักมุม Cliffhanger</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>กระชากอารมณ์ให้คนดูอยากดูตอนถัดไป</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAiAction('atmosphere')}
                    disabled={isAiGenerating}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
                  >
                    <Compass size={16} strokeWidth={2} color="var(--teal-primary)" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>บรรยายฉาก & ประสาทสัมผัส</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>เพิ่มมิติแสง เสียงฝน กลิ่น และความรู้สึก</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAiAction('dialogue')}
                    disabled={isAiGenerating}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '10px 14px' }}
                  >
                    <MessageSquare size={16} strokeWidth={2} color="var(--teal-primary)" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-main)' }}>ขัดเกลาบทพูดให้เชือดเฉือน</div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>บทพูดคมคาย สั้นกระชับ ซ่อนเจตนา</div>
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
                    สั่ง AI แต่งตามต้องการ (Custom Prompt):
                  </strong>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="เช่น: ให้รินเดินเข้าไปเผชิญหน้ากับทาดาโอะ..."
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

                {/* Writing Tone & Tension */}
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                    <Sliders size={14} strokeWidth={2} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.78rem', color: 'var(--teal-primary)' }}>
                      ปรับโทนอารมณ์ & ความตึงเครียด
                    </strong>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '10px' }}>
                    {[
                      { id: 'dark', label: 'ดาร์กดราม่า / ล้างแค้น (Revenge)' },
                      { id: 'romance', label: 'โรแมนติกตึงเครียด (Enemies to Lovers)' },
                      { id: 'mystery', label: 'สืบสวนชิงไหวชิงพริบ (Mind Games)' }
                    ].map(tone => (
                      <label key={tone.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', color: 'var(--text-main)', cursor: 'pointer' }}>
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

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>ความตึงเครียด:</span>
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
            )}

          </div>
        )}

      </div>

      {/* MODAL: ADD VOLUME (Simple dialog) */}
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
          <div className="clay-card" style={{ maxWidth: '420px', width: '100%', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', margin: '0 0 12px 0', fontWeight: 700, color: 'var(--text-main)' }}>
              เพิ่มเล่ม / ภาคใหม่
            </h3>
            <input
              type="text"
              placeholder="เช่น เล่มที่ 3: กับดักหัวใจในเพลิงแค้น"
              value={newVolumeTitle}
              onChange={(e) => setNewVolumeTitle(e.target.value)}
              className="clay-input"
              style={{ width: '100%', marginBottom: '16px' }}
              autoFocus
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setShowAddVolumeModal(false)}
                className="btn-secondary"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!newVolumeTitle.trim()) return;
                  const newVol = { id: `vol-${Date.now()}`, title: newVolumeTitle.trim() };
                  const updatedVols = [...volumes, newVol];
                  setVolumes(updatedVols);
                  setSelectedVolumeId(newVol.id);
                  setNewVolumeTitle('');
                  setShowAddVolumeModal(false);
                  syncSeriesData(chapters, updatedVols);
                }}
                className="btn-primary"
                disabled={!newVolumeTitle.trim()}
              >
                <span>สร้างเล่มใหม่</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
