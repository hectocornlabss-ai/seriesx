import React, { useState, useRef, useEffect } from 'react';
import { 
  BookOpen, Plus, Trash2, Edit3, Sparkles, Feather, FileText, 
  CheckCircle2, Wand2, RefreshCw, MessageSquare, Zap, Flame, 
  Compass, ArrowRight, Save, Clock, Sliders, FolderPlus, Layers,
  ChevronDown, Check, AlertCircle, Play, Maximize2, Minimize2,
  CornerDownRight, CheckSquare, Square, MessageSquarePlus, Quote,
  Bold, Italic, Underline, Strikethrough, Highlighter, Palette, Type,
  AlignLeft, AlignCenter, AlignRight, AlignJustify, List, ListOrdered,
  Indent, Outdent, RemoveFormatting, Undo2, Redo2, Search, Replace,
  Scissors, Split, Ruler, X, ChevronUp, Copy, CheckCheck, Eye,
  UserPlus, Users, UserCheck, ArrowUpRight, ExternalLink, Home, Volume2,
  AtSign, Film
} from 'lucide-react';

import AddCharacterModal from './AddCharacterModal';
import AutoSpeakerScriptModal from './AutoSpeakerScriptModal';
import { detectDialoguesAndSpeakers, convertDialoguesTo916Shots } from '../utils/dialogueDetector';

export default function NovelStudioEditor({
  series,
  onUpdateSeries,
  onAddCharacter,
  onConvertToScreenplay,
  onOpenSeriesSettings,
  onOpenCharacterBible,
  onGoHome
}) {
  const safeSeries = series || {};
  const defaultVolumes = safeSeries.volumes && safeSeries.volumes.length > 0 ? safeSeries.volumes : [
    { id: "vol-01", title: "เล่มที่ 1: เพลิงแค้นกลางสายฝน" },
    { id: "vol-02", title: "เล่มที่ 2: ในเงามืดของศัตรู" }
  ];

  const defaultChapters = safeSeries.chapters && safeSeries.chapters.length > 0 ? safeSeries.chapters : [
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

  // Primary States
  const [volumes, setVolumes] = useState(defaultVolumes);
  const [chapters, setChapters] = useState(defaultChapters);
  const [selectedVolumeId, setSelectedVolumeId] = useState(defaultVolumes[0]?.id || 'vol-01');
  const [activeChapterId, setActiveChapterId] = useState(defaultChapters[0]?.id || 'ch-001');

  // Sync state if series changes (e.g. user selects another project)
  useEffect(() => {
    if (series) {
      const newVols = series.volumes && series.volumes.length > 0 ? series.volumes : defaultVolumes;
      const newChaps = series.chapters && series.chapters.length > 0 ? series.chapters : defaultChapters;
      setVolumes(newVols);
      setChapters(newChaps);
      setSelectedVolumeId(newVols[0]?.id || 'vol-01');
      setActiveChapterId(newChaps[0]?.id || 'ch-001');
    }
  }, [series?.id]);

  // Active References
  const currentChapter = chapters.find(c => c.id === activeChapterId) || chapters[0] || {};
  const currentVolume = volumes.find(v => v.id === selectedVolumeId) || volumes[0] || {};
  const chapterComments = currentChapter.comments || [];
  const filteredChapters = chapters.filter(c => !c.volumeId || c.volumeId === selectedVolumeId);

  // Series Characters (Scoped strictly to this series)
  const currentCharacters = safeSeries.characters || [];

  // Editor Ref & Auto-Save
  const editorRef = useRef(null);
  const savedSelectionRange = useRef(null);
  const [saveStatus, setSaveStatus] = useState('บันทึกอัตโนมัติแล้ว');
  const [currentWordCount, setCurrentWordCount] = useState(currentChapter.wordCount || 0);
  const [currentCharCount, setCurrentCharCount] = useState(currentChapter.content ? currentChapter.content.length : 0);

  // View Modes & Sidebar State
  const [focusMode, setFocusMode] = useState(false);
  const [leftSidebarTab, setLeftSidebarTab] = useState('chapters'); // 'chapters' | 'characters'
  const [rightPanelTab, setRightPanelTab] = useState('comments'); // 'comments' | 'ai' | 'split' | 'characters'
  const [activeCommentId, setActiveCommentId] = useState(null);
  const [commentFilter, setCommentFilter] = useState('all');

  // Toolbar Formatting States
  const [currentFont, setCurrentFont] = useState('Sarabun');
  const [currentFontSize, setCurrentFontSize] = useState(16);
  const [currentHeading, setCurrentHeading] = useState('p');
  const [showTextColorMenu, setShowTextColorMenu] = useState(false);
  const [showHighlightMenu, setShowHighlightMenu] = useState(false);
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [activeTextColor, setActiveTextColor] = useState('#1D2425');
  const [activeHighlightColor, setActiveHighlightColor] = useState('transparent');

  // @ Character Mention & Dialogue States
  const [mentionMenu, setMentionMenu] = useState({
    open: false,
    query: '',
    activeIndex: 0,
    coords: { top: 0, left: 0 },
    rangeNode: null,
    atOffset: -1,
    cursorOffset: 0
  });

  // Auto Speaker Detection & Screenplay Modal States
  const [showAutoSpeakerModal, setShowAutoSpeakerModal] = useState(false);
  const [autoSpeakerAnalysis, setAutoSpeakerAnalysis] = useState(null);

  // Find & Replace
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [findKeyword, setFindKeyword] = useState('');
  const [replaceKeyword, setReplaceKeyword] = useState('');

  // Comments System Form
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

  // AI Episode & Chapter Splitter States
  const [showAiSplitModal, setShowAiSplitModal] = useState(false);
  const [splitFormat, setSplitFormat] = useState('vertical');
  const [targetSplitCount, setTargetSplitCount] = useState(3);
  const [splitPacing, setSplitPacing] = useState('high-hook');
  const [isAnalyzingSplit, setIsAnalyzingSplit] = useState(false);
  const [splitResults, setSplitResults] = useState([]);

  // ========================================================
  // NEW: TEXT SELECTION & AI INLINE REWRITE + CHARACTER TAGGING
  // ========================================================
  const [selectedSnippet, setSelectedSnippet] = useState(
    'ริน ลลิตา ยืนกำหมัดแน่นอยู่หน้าโต๊ะทำงานไม้โอ๊คดำ ในมือของเธอคือแฟ้มคดีลับที่มีรอยไหม้เกรียมตรงมุมกระดาษ หัวใจของเธอเต้นระรัวราวกับเสียงฟ้าร้องที่คำรามอยู่ภายนอก แต่ดวงตากลับแน่วแน่ไม่ยอมกะพริบ'
  );
  const [hasActiveSelection, setHasActiveSelection] = useState(false);
  const [aiRewritePrompt, setAiRewritePrompt] = useState('ช่วยแก้ไขเนื้อหานี้ให้ดีหน่อย');
  const [taggedCharacterIds, setTaggedCharacterIds] = useState(
    (safeSeries.characters || []).slice(0, 2).map(c => c.id)
  );
  const [showCharacterPicker, setShowCharacterPicker] = useState(false);
  const [showNewCharacterModal, setShowNewCharacterModal] = useState(false);
  const [isAiRewriting, setIsAiRewriting] = useState(false);
  const [rewrittenResult, setRewrittenResult] = useState('');
  const [charSuccessNotice, setCharSuccessNotice] = useState('');

  // New Character Form
  const [newCharName, setNewCharName] = useState('');
  const [newCharRole, setNewCharRole] = useState('');
  const [newCharTraits, setNewCharTraits] = useState('');
  const [newCharVoice, setNewCharVoice] = useState('');

  // Handle save new character from AddCharacterModal
  const handleSaveNewCharacter = (newChar) => {
    if (onAddCharacter) {
      onAddCharacter(newChar);
    } else if (onUpdateSeries) {
      onUpdateSeries({
        ...safeSeries,
        characters: [...(safeSeries.characters || []), newChar]
      });
    }
    setTaggedCharacterIds(prev => [...prev, newChar.id]);
    setCharSuccessNotice(`เพิ่มตัวละคร "${newChar.name.split('/')[0]}" ในนิยายเรียบร้อยแล้ว`);
    setTimeout(() => setCharSuccessNotice(''), 4000);
  };

  // Sync to Parent
  const syncSeriesData = (updatedChapters, updatedVolumes = volumes) => {
    if (onUpdateSeries) {
      onUpdateSeries({
        ...safeSeries,
        volumes: updatedVolumes,
        chapters: updatedChapters
      });
    }
  };

  // Convert plain text to clean HTML paragraphs
  const formatTextToHtml = (text) => {
    if (!text) return '<p><br></p>';
    if (text.includes('<p>') || text.includes('<div>')) return text;
    return text.split(/\n\n+/).map(para => {
      const trimmed = para.trim();
      if (!trimmed) return '';
      if (trimmed === '***') {
        return '<hr style="border: none; border-top: 1.5px dashed #D1C9BE; margin: 28px 0;" /><p style="text-align: center; color: var(--teal-primary); font-weight: 700; margin: 12px 0; text-indent: 0;">* * *</p>';
      }
      return `<p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">${trimmed.replace(/\n/g, '<br/>')}</p>`;
    }).join('');
  };

  // Initialize or Switch Chapter in contentEditable
  useEffect(() => {
    if (editorRef.current) {
      const initialHtml = currentChapter.contentHtml || formatTextToHtml(currentChapter.content);
      editorRef.current.innerHTML = initialHtml;
      const text = editorRef.current.innerText || '';
      setCurrentWordCount(text.trim() ? text.trim().split(/\s+/).length : 0);
      setCurrentCharCount(text.length);
    }
  }, [activeChapterId]);

  // Handle Input in contentEditable
  const handleEditorInput = () => {
    if (!editorRef.current) return;
    const html = editorRef.current.innerHTML;
    const text = editorRef.current.innerText || '';
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    setCurrentWordCount(words);
    setCurrentCharCount(text.length);
    setSaveStatus('กำลังบันทึก...');

    const updated = chapters.map(ch => ch.id === currentChapter.id ? {
      ...ch,
      content: text,
      contentHtml: html,
      wordCount: words
    } : ch);

    setChapters(updated);
    syncSeriesData(updated);

    setTimeout(() => {
      setSaveStatus('บันทึกอัตโนมัติแล้ว');
    }, 600);
  };

  // Save selection range when user highlights text
  const handleSelectionChange = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0 && !sel.isCollapsed) {
      const text = sel.toString().trim();
      if (text.length > 0) {
        savedSelectionRange.current = sel.getRangeAt(0).cloneRange();
        setSelectedSnippet(text);
        setHasActiveSelection(true);
        return;
      }
    }
  };

  // Filter characters for @mention
  const filteredMentionChars = currentCharacters.filter(char => {
    if (!mentionMenu.query) return true;
    const name = (char.name || '').toLowerCase();
    const role = (char.role || '').toLowerCase();
    return name.includes(mentionMenu.query) || role.includes(mentionMenu.query);
  });

  // Check if @ was typed at cursor position
  const checkMentionTrigger = () => {
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || !sel.isCollapsed) {
      if (mentionMenu.open) setMentionMenu(prev => ({ ...prev, open: false }));
      return;
    }
    const range = sel.getRangeAt(0);
    const node = range.startContainer;
    if (node && node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const cursorOffset = range.startOffset;
      const textBefore = text.slice(0, cursorOffset);
      const atIdx = textBefore.lastIndexOf('@');
      
      if (atIdx !== -1) {
        const query = textBefore.slice(atIdx + 1);
        if (!/[\s\n]/.test(query) && query.length < 25) {
          let coords = { top: 180, left: 100 };
          try {
            const tempRange = range.cloneRange();
            tempRange.setStart(node, atIdx);
            tempRange.setEnd(node, cursorOffset);
            const rects = tempRange.getClientRects();
            const r = rects.length > 0 ? rects[0] : tempRange.getBoundingClientRect();
            if (r && r.bottom) {
              coords = {
                top: r.bottom + 6,
                left: Math.max(10, Math.min(window.innerWidth - 330, r.left))
              };
            }
          } catch (e) {
            if (editorRef.current) {
              const r = editorRef.current.getBoundingClientRect();
              coords = { top: r.top + 100, left: r.left + 50 };
            }
          }

          setMentionMenu({
            open: true,
            query: query.trim().toLowerCase(),
            activeIndex: 0,
            coords,
            rangeNode: node,
            atOffset: atIdx,
            cursorOffset
          });
          return;
        }
      }
    }
    if (mentionMenu.open) {
      setMentionMenu(prev => ({ ...prev, open: false }));
    }
  };

  // Keyboard navigation inside mention menu
  const handleEditorKeyDown = (e) => {
    if (mentionMenu.open && filteredMentionChars.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setMentionMenu(prev => ({ ...prev, activeIndex: (prev.activeIndex + 1) % filteredMentionChars.length }));
        return;
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setMentionMenu(prev => ({ ...prev, activeIndex: (prev.activeIndex - 1 + filteredMentionChars.length) % filteredMentionChars.length }));
        return;
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        handleSelectMention(filteredMentionChars[mentionMenu.activeIndex] || filteredMentionChars[0], 'dialogue');
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        setMentionMenu(prev => ({ ...prev, open: false }));
        return;
      }
    }
  };

  // Select character from mention menu
  const handleSelectMention = (char, type = 'dialogue') => {
    if (!char) {
      setMentionMenu(prev => ({ ...prev, open: false }));
      return;
    }
    const shortName = (char.name || '').split('/')[0].trim();
    const sel = window.getSelection();

    try {
      if (mentionMenu.rangeNode && mentionMenu.rangeNode.parentNode) {
        const node = mentionMenu.rangeNode;
        const atIdx = mentionMenu.atOffset;
        const endIdx = Math.min(node.textContent.length, sel.focusOffset || mentionMenu.cursorOffset);

        const range = document.createRange();
        range.setStart(node, atIdx);
        range.setEnd(node, endIdx);
        range.deleteContents();

        if (type === 'dialogue') {
          const wrapper = document.createElement('div');
          wrapper.innerHTML = `<p style="margin: 14px 0; padding: 10px 14px; background: rgba(11, 74, 81, 0.04); border-left: 3.5px solid var(--teal-primary); border-radius: 0 8px 8px 0; text-indent: 0; line-height: 1.8;"><strong style="color: var(--teal-primary); font-weight: 700; margin-right: 6px;">@${shortName}:</strong><span style="color: #2D3748;">&ldquo;...&rdquo;</span></p><p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;"><br></p>`;

          const frag = document.createDocumentFragment();
          let child;
          while ((child = wrapper.firstChild)) {
            frag.appendChild(child);
          }
          range.insertNode(frag);
        } else {
          const tag = document.createElement('span');
          tag.className = 'character-inline-tag';
          tag.style.cssText = 'color: var(--teal-primary); font-weight: 700; background: rgba(11,74,81,0.09); padding: 1px 6px; border-radius: 4px; display: inline-block; margin: 0 2px;';
          tag.textContent = `@${shortName}`;
          range.insertNode(tag);

          const space = document.createTextNode(' ');
          range.collapse(false);
          range.insertNode(space);
        }

        if (!taggedCharacterIds.includes(char.id)) {
          setTaggedCharacterIds(prev => [...prev, char.id]);
        }

        handleEditorInput();
      }
    } catch (err) {
      console.error("Error inserting mention", err);
    }

    setMentionMenu(prev => ({ ...prev, open: false }));
  };

  // Open Auto Speaker Detection & Screenplay Modal
  const handleOpenAutoSpeaker = () => {
    const rawText = editorRef.current ? editorRef.current.innerText : (currentChapter.content || '');
    const analysis = detectDialoguesAndSpeakers(rawText, currentCharacters);
    setAutoSpeakerAnalysis(analysis);
    setShowAutoSpeakerModal(true);
  };

  // Google Docs Command Runner
  const executeCommand = (cmd, value = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    document.execCommand('styleWithCSS', false, true);
    document.execCommand(cmd, false, value);
    handleEditorInput();
  };

  // Font Size Application
  const applyFontSize = (sizePt) => {
    setCurrentFontSize(sizePt);
    if (!editorRef.current) return;
    editorRef.current.focus();
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const span = document.createElement('span');
    span.style.fontSize = `${sizePt}pt`;
    span.appendChild(range.extractContents());
    range.insertNode(span);
    handleEditorInput();
  };

  // Change Font Size by delta (+/-)
  const stepFontSize = (delta) => {
    const newSize = Math.max(10, Math.min(48, currentFontSize + delta));
    applyFontSize(newSize);
  };

  // Apply Text Color
  const applyTextColor = (color) => {
    setActiveTextColor(color);
    executeCommand('foreColor', color);
    setShowTextColorMenu(false);
  };

  // Apply Highlight Color
  const applyHighlightColor = (color) => {
    setActiveHighlightColor(color);
    if (color === 'transparent') {
      executeCommand('removeFormat');
    } else {
      executeCommand('hiliteColor', color);
    }
    setShowHighlightMenu(false);
  };

  // Apply Font Family
  const applyFontFamily = (fontName) => {
    setCurrentFont(fontName);
    executeCommand('fontName', fontName);
    setShowFontMenu(false);
  };

  // Apply Heading / Style
  const applyHeadingStyle = (tag) => {
    setCurrentHeading(tag);
    executeCommand('formatBlock', tag);
    setShowHeadingMenu(false);
  };

  // Capture selection for comments
  const handleCaptureSelectionForComment = () => {
    const sel = window.getSelection();
    const text = sel ? sel.toString().trim() : '';
    setNewCommentTarget(text || selectedSnippet || "ทั้งย่อหน้า / บริบทปัจจุบัน");
    setShowAddCommentForm(true);
    setRightPanelTab('comments');
  };

  // Insert Scene Divider
  const insertSceneBreak = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const dividerHtml = `<hr style="border: none; border-top: 1.5px dashed #D1C9BE; margin: 28px 0;" /><p style="text-align: center; color: var(--teal-primary); font-weight: 700; margin: 12px 0; text-indent: 0;">* * *</p><p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;"><br></p>`;
    document.execCommand('insertHTML', false, dividerHtml);
    handleEditorInput();
  };

  // Insert Character Dialogue Template
  const insertDialogueQuote = () => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const dialogueHtml = `<p style="margin: 14px 0; padding-left: 14px; border-left: 3px solid var(--teal-primary); color: #1E293B; text-indent: 0; font-style: normal;">"..."</p><p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;"><br></p>`;
    document.execCommand('insertHTML', false, dialogueHtml);
    handleEditorInput();
  };

  // Insert Named Character Dialogue directly into manuscript & tag character
  const insertCharacterDialogue = (char) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const shortName = (char.name || '').split('/')[0].trim();
    const dialogueHtml = `<p style="margin: 14px 0; padding-left: 14px; border-left: 3px solid var(--teal-primary); color: #1E293B; text-indent: 0; font-style: normal;"><strong style="color: var(--teal-primary);">${shortName}:</strong> "..."</p><p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;"><br></p>`;
    document.execCommand('insertHTML', false, dialogueHtml);
    handleEditorInput();
    if (!taggedCharacterIds.includes(char.id)) {
      setTaggedCharacterIds(prev => [...prev, char.id]);
    }
  };

  // Update Title
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
      contentHtml: "<p><br></p>",
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

  // Add Comment
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

  // Toggle Resolve Comment
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

  // Add Reply
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

  // Find and Replace Handler
  const handleExecuteReplace = (replaceAll = false) => {
    if (!findKeyword.trim() || !editorRef.current) return;
    const currentHtml = editorRef.current.innerHTML;
    let newHtml = '';
    if (replaceAll) {
      const regex = new RegExp(findKeyword, 'g');
      newHtml = currentHtml.replace(regex, replaceKeyword);
    } else {
      newHtml = currentHtml.replace(findKeyword, replaceKeyword);
    }
    editorRef.current.innerHTML = newHtml;
    handleEditorInput();
  };

  // ========================================================
  // NEW: CREATE CHARACTER SPECIFIC TO THIS SERIES & AUTO-SYNC
  // ========================================================
  const handleCreateNewCharacter = (e) => {
    if (e) e.preventDefault();
    if (!newCharName.trim()) return;

    const cleanName = newCharName.trim();
    const newChar = {
      id: `char-${Date.now()}`,
      name: cleanName,
      role: newCharRole.trim() || 'ตัวละครสมทบ (Supporting Role)',
      actorSeed: Math.floor(10000000 + Math.random() * 90000000),
      loraModel: `${cleanName.replace(/\s+/g, '_')}_V1_fp16.safetensors`,
      loraWeight: 0.88,
      faceLockAccuracy: "98.5%",
      portrait: "/assets/rin_portrait.jpg",
      extremeActingImage: "/assets/rin_extreme_acting.jpg",
      actingStyle: newCharTraits.trim() || "Dynamic Acting — สื่ออารมณ์ทางสายตาและการเคลื่อนไหว",
      voiceProfile: {
        voiceId: `TH-${Date.now().toString().slice(-4)}`,
        tone: newCharVoice.trim() || "คมชัด ทรงพลัง สื่ออารมณ์ลึกซึ้ง",
        pitch: "0 semitones",
        speed: "1.0x",
        breathIntensity: "0.35",
        microBreathing: "Auto-insert natural breath on dramatic beats",
        sampleLine: `นี่ไม่ใช่เรื่องบังเอิญ... ทุกอย่างถูกจัดฉากไว้แล้ว!`
      },
      wardrobeSpec: "เครื่องแต่งกายสั่งตัดเฉพาะตัวละคร",
      description: newCharTraits.trim() || `ตัวละครใหม่ในเรื่อง ${safeSeries.title || ''}`,
      expressionMatrix: [
        { label: "Neutral (สุขุม)", status: "Locked 100%" },
        { label: "Tense (ตึงเครียด)", status: "Locked 98%" },
        { label: "Shock (ตกใจ)", status: "Locked 99%" },
        { label: "Determined (มุ่งมั่น)", status: "Locked 98%" }
      ],
      facsControls: {
        browInnerRaiser: 0.80,
        browLowerer: 0.65,
        lipTremor: 0.50,
        tearWelling: 0.60,
        pupilDilation: 0.75,
        jawTension: 0.70
      }
    };

    const updatedCharacters = [...(safeSeries.characters || []), newChar];
    if (onUpdateSeries) {
      onUpdateSeries({
        ...safeSeries,
        characters: updatedCharacters
      });
    }

    setTaggedCharacterIds(prev => [...prev, newChar.id]);
    setNewCharName('');
    setNewCharRole('');
    setNewCharTraits('');
    setNewCharVoice('');
    setShowNewCharacterModal(false);
    setCharSuccessNotice(`สร้างตัวละคร "${cleanName}" ในเรื่อง "${safeSeries.title || ''}" เรียบร้อย พร้อมซิงค์ไปหน้า Character Bible`);
    setTimeout(() => setCharSuccessNotice(''), 6000);
  };

  // Toggle Character Tagging
  const handleToggleCharacterTag = (charId) => {
    if (taggedCharacterIds.includes(charId)) {
      setTaggedCharacterIds(taggedCharacterIds.filter(id => id !== charId));
    } else {
      setTaggedCharacterIds([...taggedCharacterIds, charId]);
    }
  };

  // ========================================================
  // NEW: EXECUTE AI REWRITE ON SELECTED TEXT + CHARACTERS
  // ========================================================
  const handleExecuteAiRewrite = () => {
    const textToProcess = selectedSnippet || (editorRef.current ? editorRef.current.innerText.slice(0, 300) : '');
    if (!textToProcess) return;

    setIsAiRewriting(true);
    setRewrittenResult('');

    const activeChars = (safeSeries.characters || []).filter(c => taggedCharacterIds.includes(c.id));
    const charNames = activeChars.map(c => c.name.split('/')[0].trim()).join(' และ ');

    setTimeout(() => {
      setIsAiRewriting(false);

      let output = '';
      if (textToProcess.includes('ริน') || textToProcess.includes('ทาดาโอะ') || activeChars.length > 0) {
        output = `${textToProcess}

"คุณคิดว่าแฟ้มไหม้เกรียมแผ่นเดียว จะล้มตระกูลคุโรดะได้งั้นเหรอ ริน?" ทาดาโอะ คุโรดะ เปรยขึ้นด้วยน้ำเสียงทุ้มต่ำเย็นยะเยือก เขายังคงไม่ขยับตัว แต่รังสีอำมหิตที่แผ่ออกมาทำให้ห้องประชุมชั้น 48 เย็นยะเยือกยิ่งกว่าพายุฝนภายนอก

รินสูดลมหายใจลึก ก้าวประชิดโต๊ะทำงานอีกก้าว ปลายนิ้วที่แตะขอบแฟ้มยังคงสั่นระริก "มันอาจจะล้มตระกูลคุณไม่ได้ในทันที... แต่ถ้าคืนนี้คุณไม่เซ็นรับรองความบริสุทธิ์ของพ่อฉัน พรุ่งนี้เช้า ประชาชนทุกคนจะได้เห็นว่าความมั่งคั่งของคุโรดะ แลกมาด้วยเลือดของกี่ชีวิต!"`;
      } else {
        output = `${textToProcess}

บรรยากาศทวีความตึงเครียดขึ้นในทันที ทุกสายตาจับจ้องมายังจุดศูนย์กลางของห้อง ${charNames ? `[ขับเน้นบทบาทและมิติของ: ${charNames}]` : ''} ความลับที่ถูกซ่อนไว้ใต้เงามืดกำลังจะถูกเปิดเผย และไม่มีใครในที่นี้ที่จะสามารถถอยหลังกลับไปได้อีกแล้ว!`;
      }

      setRewrittenResult(output);
    }, 850);
  };

  // Apply Replace to Document Selection
  const handleApplyReplaceSelection = () => {
    if (!rewrittenResult || !editorRef.current) return;
    editorRef.current.focus();

    if (savedSelectionRange.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelectionRange.current);
    }

    const htmlSnippet = rewrittenResult.split(/\n\n+/).map(p => `<p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">${p.replace(/\n/g, '<br/>')}</p>`).join('');
    document.execCommand('insertHTML', false, htmlSnippet);
    handleEditorInput();
    setRewrittenResult('');
    setAiNotice('แทนที่ข้อความเดิมด้วยบทที่ AI ปรับปรุงเรียบร้อยแล้ว');
    setTimeout(() => setAiNotice(''), 4000);
  };

  // Apply Insert Below Selection
  const handleApplyInsertAfter = () => {
    if (!rewrittenResult || !editorRef.current) return;
    editorRef.current.focus();

    if (savedSelectionRange.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelectionRange.current);
      sel.collapseToEnd();
    }

    const htmlSnippet = rewrittenResult.split(/\n\n+/).map(p => `<p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">${p.replace(/\n/g, '<br/>')}</p>`).join('');
    document.execCommand('insertHTML', false, `<br/>` + htmlSnippet);
    handleEditorInput();
    setRewrittenResult('');
    setAiNotice('แทรกบทที่ AI คิดเพิ่มเติมต่อท้ายข้อความเดิมเรียบร้อยแล้ว');
    setTimeout(() => setAiNotice(''), 4000);
  };

  // AI Co-writer Actions
  const handleAiAction = (actionType) => {
    setIsAiGenerating(true);
    setAiNotice('');

    setTimeout(() => {
      setIsAiGenerating(false);
      let additionHtml = '';

      if (actionType === 'continue') {
        additionHtml = `<p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">ความเงียบเข้าปกคลุมชั่วขณะ ได้ยินเพียงเสียงหยดน้ำที่ไหลรินตามผิวกระจก ทาดาโอะหันกลับมาสบตากับเธออีกครั้ง แววตาที่เคยมั่นใจกลับมีความลังเลแฝงอยู่ลึกๆ "คุณแน่ใจเหรอว่าพร้อมจะรู้ความจริงทั้งหมด... แม้ว่ามันอาจทำลายทุกสิ่งที่คุณเชื่อมาทั้งชีวิต?" รินสูดลมหายใจลึก กำหมัดแน่นจนเล็บจิกเนื้อ</p>`;
        setAiNotice('AI ช่วยเขียนเนื้อเรื่องต่อตามโครงสร้างดราม่าเรียบร้อยแล้ว');
      } else if (actionType === 'cliffhanger') {
        additionHtml = `<p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">ทันใดนั้น เสียงโทรศัพท์ฉุกเฉินบนโต๊ะทำงานที่ควรจะตัดสัญญาณไปแล้วกลับดังขึ้น! หน้าจอแสดงชื่อผู้โทรเข้าที่ทำให้เลือดในกายของรินเย็นเฉียบ..."พ่อ" ทาดาโอะหันขวับมามองเธอทันทีด้วยสายตาที่ยากจะคาดเดา!</p>`;
        setAiNotice('AI แทรกจุดทิ้งท้าย Cliffhanger (กระชากอารมณ์ท้ายตอน) สำเร็จ');
      } else if (actionType === 'atmosphere') {
        additionHtml = `<p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">บรรยากาศในห้องเย็นยะเยือกด้วยอุณหภูมิของเครื่องปรับอากาศที่ตัดสลับกับไอร้อนจากพายุฝนภายนอก กลิ่นไอความชื้นของฝนและกลิ่นควันจากเอกสารที่มอดไหม้ ผสานกับความกดดันที่บีบคั้นจนแทบหายใจไม่ออก แสงฟ้าแลบสาดประกายวาบเป็นระยะ เผยให้เห็นเงามืดทอดผ่านใบหน้าของทั้งสอง</p>`;
        setAiNotice('AI บรรยายบรรยากาศและประสาทสัมผัส (Sensory Immersion) เพิ่มเติมแล้ว');
      } else if (actionType === 'dialogue') {
        additionHtml = `<p style="margin: 14px 0; padding-left: 14px; border-left: 3px solid var(--teal-primary); color: #1E293B; text-indent: 0;">"คุณคิดว่าตัวเองเป็นใคร ทาดาโอะ?" รินเค้นเสียงลอดไรฟัน "พระเจ้าที่กุมชะตาชีวิตคนอื่นงั้นเหรอ?"</p><p style="margin: 14px 0; padding-left: 14px; border-left: 3px solid var(--teal-primary); color: #1E293B; text-indent: 0;">"ผมไม่ใช่พระเจ้า..." ทาดาโอะก้าวเข้ามาจนปลายจมูกแทบชิดกัน "แต่ในตึกนี้ ผมคือคนที่ตัดสินว่าใครจะได้อยู่ต่อ หรือใครต้องหายไป"</p>`;
        setAiNotice('AI ขัดเกลาบทพูดให้เชือดเฉือนและกระชับคมคายเรียบร้อยแล้ว');
      } else if (actionType === 'custom') {
        if (!customPrompt.trim()) return;
        additionHtml = `<blockquote style="border-left: 3.5px solid var(--teal-primary); padding: 8px 16px; margin: 1.2em 0; background: rgba(11, 74, 81, 0.04); font-style: italic;">[เนื้อหาที่ AI แต่งตามคำสั่ง: "${customPrompt}"]</blockquote><p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">รินหันไปมองตามทิศทางนั้นทันที สิ่งที่ปรากฏอยู่เบื้องหน้าทำให้แผนการทั้งหมดที่เธอเตรียมมาต้องพลิกผัน ทาดาโอะไม่รอช้า เขาคว้าสิ่งนั้นขึ้นมาแล้วจ้องตรงมาที่เธอ "นี่ใช่ไหม... สิ่งที่คุณตามหามาตลอด?"</p>`;
        setCustomPrompt('');
        setAiNotice('AI ปฏิบัติตามคำสั่งการแต่งนิยายเรียบร้อยแล้ว');
      }

      if (editorRef.current && additionHtml) {
        editorRef.current.innerHTML += additionHtml;
        handleEditorInput();
      }

      setTimeout(() => setAiNotice(''), 4000);
    }, 700);
  };

  // AI Chapter & Episode Splitter Generator
  const handleGenerateEpisodeSplit = () => {
    setIsAnalyzingSplit(true);
    setSplitResults([]);

    setTimeout(() => {
      setIsAnalyzingSplit(false);
      
      const count = targetSplitCount || 3;
      const results = [
        {
          epNumber: 1,
          title: "ตอนที่ 1: สัญญาเลือดในคืนพายุคลั่ง",
          hook: "ภาพเปิดห้องประชุมชั้น 48 ท่ามกลางพายุฝน + แฟ้มคดีลับไหม้เกรียม",
          conflict: "รินนำหลักฐานขู่แบล็กเมล์ทาดาโอะ แต่ถูกประธานหนุ่มตลบหลังด้วยความลับของตระกูล",
          cliffhanger: "สัญญาณเตือนภัยฉุกเฉินดับอาคารทั้งตึก + ประตูอัตโนมัติล็อกตาย!",
          estWords: splitFormat === 'vertical' ? 750 : 2100,
          estDuration: splitFormat === 'vertical' ? "75 วินาที" : "4-5 นาที",
          snippet: "สายฝนยามค่ำคืนกระหน่ำซัดกระจกนิรภัยบานยักษ์... 'ถ้าคืนนี้คุณไม่เซ็นรับรองความบริสุทธิ์ของพ่อฉัน พรุ่งนี้เช้าข้อมูลชุดนี้จะถูกส่งตรงไปทุกสำนักข่าว!'"
        },
        {
          epNumber: 2,
          title: "ตอนที่ 2: ในเงามืดของมือสังหาร",
          hook: "เสียงสลักปืนกลปลดล็อกที่ช่องบันไดหนีไฟในความมืดสนิท",
          conflict: "ทั้งคู่ถูกไล่ล่าโดยกลุ่มมือสังหารนิรนามที่ต้องการชิงเซรั่มและทำลายหลักฐาน",
          cliffhanger: "ทาดาโอะดึงรินเข้ามาจูบหลบวิถีกระสุน ก่อนกระซิบว่ามีหนอนบ่อนไส้เป็นคนใกล้ตัวเธอ!",
          estWords: splitFormat === 'vertical' ? 820 : 2300,
          estDuration: splitFormat === 'vertical' ? "85 วินาที" : "5 นาที",
          snippet: "สัญญาณเตือนภัยสีแดงสาดส่องเป็นจังหวะ ย้อมทั้งห้องประชุมให้กลายเป็นสีเลือด... 'ถ้าคุณอยากรอดตายออกไปจากตึกนี้ อย่าส่งเสียงดัง!'"
        },
        {
          epNumber: 3,
          title: "ตอนที่ 3: กับดักหัวใจและไฟแค้น",
          hook: "รินพบตราสัญลักษณ์ของพ่อตัวเองอยู่บนด้ามมีดของหัวหน้ามือสังหาร",
          conflict: "ความจริงเปิดเผยว่าพ่อของรินอาจไม่ได้เป็นเหยื่อ แต่เป็นผู้วางแผนสังหารตั้งแต่ต้น",
          cliffhanger: "ทาดาโอะยื่นปืนให้รินแล้วสั่ง: 'ยิงผมสิ ถ้านั่นจะทำให้คุณหายแค้น... หรือไม่ก็ยอมเป็นผู้หญิงของผม!'",
          estWords: splitFormat === 'vertical' ? 880 : 2500,
          estDuration: splitFormat === 'vertical' ? "90 วินาที" : "6 นาที",
          snippet: "ความจริงที่สะท้อนผ่านกระจกเงาแตกร้าว... ดวงตาของรินสั่นไหวเมื่อนิ้วชี้ของเธอแตะเข้ากับไกปืนที่เย็นเยียบ"
        }
      ];

      if (count > 3) {
        results.push({
          epNumber: 4,
          title: "ตอนที่ 4: การเปิดตัวทายาทตัวจริง",
          hook: "งานแถลงข่าวควบรวมกิจการหมื่นล้าน รินก้าวขึ้นเวทีในฐานะคู่หมั้นลับ",
          conflict: "การปะทะคารมชิงไหวชิงพริบกลางงานกาล่าเพื่อหาตัวผู้ถือหุ้นใหญ่ตัวจริง",
          cliffhanger: "พินัยกรรมฉบับที่แท้จริงปรากฏชื่อริน ลลิตา เป็นผู้ถือหุ้น 51% แต่เพียงผู้เดียว!",
          estWords: splitFormat === 'vertical' ? 790 : 2200,
          estDuration: splitFormat === 'vertical' ? "80 วินาที" : "5 นาที",
          snippet: "แสงแฟลชสาดส่องกระทบใบหน้าของทั้งสอง ทาดาโอะกระตุกยิ้มมุมปากอย่างเยือกเย็น 'ยินดีต้อนรับสู่สนามรบตัวจริง คุณผู้หญิง'"
        });
      }

      setSplitResults(results);
    }, 900);
  };

  // Apply Generated Episodes to Chapters List
  const handleApplySplitToChapters = () => {
    if (!splitResults.length) return;

    const newGeneratedChapters = splitResults.map((item, idx) => ({
      id: `ch-split-${Date.now()}-${idx}`,
      number: chapters.length + idx + 1,
      volumeId: selectedVolumeId,
      title: item.title,
      status: "กำลังเขียน (Draft)",
      wordCount: item.estWords,
      content: `${item.snippet}\n\n[3s Hook]: ${item.hook}\n[ปมหลัก]: ${item.conflict}\n[Cliffhanger]: ${item.cliffhanger}`,
      contentHtml: `<p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">${item.snippet}</p><div class="chapter-cut-marker">3-Second Hook: ${item.hook}</div><p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;">${item.conflict}</p><div class="chapter-cut-marker">จุดตัด Cliffhanger ท้ายตอน: ${item.cliffhanger}</div>`,
      notes: `Hook: ${item.hook} | Cliffhanger: ${item.cliffhanger}`,
      comments: []
    }));

    const updated = [...chapters, ...newGeneratedChapters];
    setChapters(updated);
    syncSeriesData(updated);
    setShowAiSplitModal(false);
    setActiveChapterId(newGeneratedChapters[0].id);
    alert(`AI สร้างตอนใหม่ ${newGeneratedChapters.length} ตอนลงในสารบัญเรียบร้อยแล้ว`);
  };

  // Insert Chapter Cut Banners into Current Document
  const handleInsertCutMarkersToDoc = () => {
    if (!editorRef.current || !splitResults.length) return;
    
    let markersHtml = '';
    splitResults.forEach((ep) => {
      markersHtml += `<div class="chapter-cut-marker">=== [จุดตัดจบตอน: ${ep.title} | Cliffhanger: ${ep.cliffhanger}] ===</div><p style="margin-bottom: 1.25em; text-indent: 2.2em; line-height: 2.15;"><br></p>`;
    });

    editorRef.current.innerHTML += markersHtml;
    handleEditorInput();
    setShowAiSplitModal(false);
  };

  // Filtered comments
  const filteredComments = chapterComments.filter(cmt => {
    if (commentFilter === 'active') return !cmt.resolved;
    if (commentFilter === 'resolved') return cmt.resolved;
    return true;
  });

  const activeCommentsCount = chapterComments.filter(c => !c.resolved).length;
  const estimatedPages = Math.ceil(currentWordCount / 350) || 1;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      
      {/* 1. TOP DOCK: NOVEL INFO, STATS & FOCUS MODE TOGGLE */}
      <div className="clay-card" style={{ padding: '14px 20px' }}>
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
                <span className="badge badge-teal">Google Docs Novel Engine</span>
                <span className="badge badge-sand">{currentVolume.title}</span>
                {activeCommentsCount > 0 && (
                  <span className="badge badge-teal-subtle" style={{ color: 'var(--teal-primary)', fontWeight: 700 }}>
                    {activeCommentsCount} ข้อเสนอแนะรอตรวจ
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--text-main)', margin: '2px 0 0 0', fontWeight: 800 }}>
                {safeSeries.title || 'นิยาย'}
              </h2>

              {/* Google Docs Menu Bar */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px', userSelect: 'none' }}>
                {['ไฟล์', 'แก้ไข', 'มุมมอง', 'แทรก', 'รูปแบบ', 'เครื่องมือ AI', 'ส่วนเสริม'].map(menu => (
                  <span
                    key={menu}
                    style={{
                      fontSize: '0.74rem',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '2px 5px',
                      borderRadius: '4px',
                      transition: 'all 0.15s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--teal-primary)'; e.currentTarget.style.background = 'var(--bg-inset)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
                  >
                    {menu}
                  </span>
                ))}
              </div>
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
              <span>ตอนนี้: <strong style={{ color: 'var(--text-main)' }}>{currentWordCount.toLocaleString()} คำ</strong></span>
              <span>ตัวอักษร: <strong style={{ color: 'var(--text-main)' }}>{currentCharCount.toLocaleString()}</strong></span>
              <span>เอกสาร: <strong style={{ color: 'var(--teal-primary)' }}>~{estimatedPages} หน้า A4</strong></span>
              <span>อ่าน: <strong style={{ color: 'var(--text-main)' }}>{Math.ceil(currentWordCount / 250) || 1} นาที</strong></span>
            </div>

            {/* AI Chapter Breakdown Quick Button */}
            <button
              onClick={() => {
                setFocusMode(false);
                setRightPanelTab('split');
                if (!splitResults.length) handleGenerateEpisodeSplit();
              }}
              className="btn-primary"
              style={{ padding: '6px 14px', fontSize: '0.76rem', background: '#0B4A51' }}
              title="เปิดระบบ AI ช่วยแบ่งตอนและวางจังหวะ Cliffhanger สำหรับซีรีส์แนวตั้ง"
            >
              <Split size={14} strokeWidth={2} />
              <span>AI ช่วยแบ่งตอน/บท</span>
            </button>

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

            {/* Go to Home / Series Library Button */}
            {onGoHome && (
              <button
                onClick={onGoHome}
                id="btn-editor-go-home"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.76rem', color: 'var(--teal-primary)', borderColor: 'var(--teal-primary)' }}
                title="กลับไปหน้าหลัก (คลังซีรีส์ & ภาพรวม)"
              >
                <Home size={14} strokeWidth={2} />
                <span>กลับหน้าหลัก</span>
              </button>
            )}

            {/* Link to Series Master Settings (Non-popup!) */}
            {onOpenSeriesSettings && (
              <button
                onClick={onOpenSeriesSettings}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.76rem' }}
                title="เปิดหน้าตั้งค่าโครงสร้างซีรีส์และภาพปกแบบเต็มหน้า"
              >
                <Sliders size={14} strokeWidth={2} />
                <span>ตั้งค่าโครงสร้างซีรีส์</span>
              </button>
            )}

            {/* Auto Speaker & Screenplay Button */}
            <button
              type="button"
              onClick={handleOpenAutoSpeaker}
              className="btn-primary"
              style={{
                padding: '6px 14px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: 'var(--shadow-teal-btn)'
              }}
              title="วิเคราะห์ตรวจจับตัวละครผู้พูดอัตโนมัติ และแปลงเป็นบทสคิปต์ 9:16 ได้ทันที แม้ไม่ได้พิมพ์ @"
            >
              <Sparkles size={14} strokeWidth={2} />
              <span>ตรวจจับผู้พูด & แปลงบทซีรีส์</span>
            </button>

            {/* Convert to 9:16 Script */}
            {onConvertToScreenplay && (
              <button
                onClick={() => {
                  const rawText = editorRef.current ? editorRef.current.innerText : (currentChapter.content || '');
                  const analysis = detectDialoguesAndSpeakers(rawText, currentCharacters);
                  const generatedShots = convertDialoguesTo916Shots(analysis.beats, safeSeries);
                  onConvertToScreenplay(currentChapter, generatedShots);
                }}
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: '0.78rem', background: 'var(--bg-raised)', borderColor: 'var(--teal-primary)', color: 'var(--teal-primary)' }}
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
        gridTemplateColumns: focusMode ? '1fr' : '260px 1fr 360px',
        gap: '20px',
        alignItems: 'start',
        transition: 'all 0.25s ease'
      }}>
        
        {/* ========================================================
            COLUMN 1: VOLUMES & CHAPTERS HIERARCHY (เล่ม/ตอน)
           ======================================================== */}
        {!focusMode && (
          <div className="clay-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', minHeight: '820px' }}>
            
            {/* Column 1 Tab Switcher: Chapters vs Characters */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-inset)',
              padding: '3px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '14px',
              gap: '2px'
            }}>
              <button
                type="button"
                onClick={() => setLeftSidebarTab('chapters')}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: leftSidebarTab === 'chapters' ? 'var(--teal-primary)' : 'transparent',
                  color: leftSidebarTab === 'chapters' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: leftSidebarTab === 'chapters' ? 700 : 500,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <BookOpen size={12} strokeWidth={2} />
                <span>ตอน & เล่ม ({chapters.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setLeftSidebarTab('characters')}
                id="btn-sidebar-characters-tab"
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: leftSidebarTab === 'characters' ? 'var(--teal-primary)' : 'transparent',
                  color: leftSidebarTab === 'characters' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: leftSidebarTab === 'characters' ? 700 : 500,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Users size={12} strokeWidth={2} />
                <span>ตัวละคร ({currentCharacters.length})</span>
              </button>
            </div>

            {/* VIEW 1: CHAPTERS & VOLUMES */}
            {leftSidebarTab === 'chapters' ? (
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
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
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, maxHeight: '520px', paddingRight: '4px' }}>
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

                {/* Add Chapter / Split Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                  <button
                    onClick={handleAddChapter}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} strokeWidth={2} />
                    <span>เพิ่มตอนใหม่ในเล่มนี้</span>
                  </button>

                  <button
                    onClick={() => {
                      setRightPanelTab('split');
                      setFocusMode(false);
                      if (!splitResults.length) handleGenerateEpisodeSplit();
                    }}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.76rem', color: 'var(--teal-primary)', borderColor: 'var(--teal-subtle)' }}
                  >
                    <Sparkles size={13} strokeWidth={2} color="var(--teal-primary)" />
                    <span>AI วิเคราะห์แบ่งตอนอัตโนมัติ</span>
                  </button>
                </div>
              </div>
            ) : (
              /* VIEW 2: CHARACTERS IN THIS STORY ROSTER */
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Users size={15} strokeWidth={2} color="var(--teal-primary)" />
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>ตัวละครในเรื่อง ({currentCharacters.length})</strong>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewCharacterModal(true)}
                    id="btn-add-char-sidebar"
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
                    <span>เพิ่มตัวละคร</span>
                  </button>
                </div>

                <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: '0 0 10px 0', lineHeight: 1.4 }}>
                  คลิก "+ใส่บทพูด" เพื่อแทรกชื่อและบทพูดลงในเนื้อหา หรือคลิก "แท็กเข้า AI" เพื่อให้ AI รู้จักตัวละครในฉากนี้
                </p>

                {/* Character Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, maxHeight: '580px', paddingRight: '4px' }}>
                  {currentCharacters.map(char => {
                    const isTagged = taggedCharacterIds.includes(char.id);
                    const shortName = (char.name || '').split('/')[0].trim();
                    return (
                      <div
                        key={char.id}
                        style={{
                          padding: '10px',
                          borderRadius: 'var(--radius-md)',
                          background: isTagged ? 'rgba(11, 74, 81, 0.05)' : 'var(--bg-surface)',
                          border: isTagged ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                          boxShadow: isTagged ? 'var(--shadow-raised-sm)' : 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '6px',
                          transition: 'all 0.15s'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <img
                            src={char.portrait}
                            alt=""
                            style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--border-subtle)', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                              <strong style={{ fontSize: '0.8rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {shortName}
                              </strong>
                              {isTagged && (
                                <span className="badge badge-teal" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                                  ในฉาก AI
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {char.role}
                            </div>
                          </div>
                        </div>

                        {char.voiceProfile?.tone && (
                          <div style={{ fontSize: '0.66rem', color: 'var(--teal-primary)', background: 'var(--bg-inset)', padding: '2px 6px', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            เสียง: {char.voiceProfile.tone}
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '5px', marginTop: '2px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleCharacterTag(char.id)}
                            style={{
                              flex: 1,
                              padding: '5px 6px',
                              borderRadius: 'var(--radius-pill)',
                              background: isTagged ? 'var(--teal-primary)' : 'var(--bg-inset)',
                              color: isTagged ? '#FFFFFF' : 'var(--text-main)',
                              border: isTagged ? 'none' : '1px solid var(--border-subtle)',
                              fontSize: '0.68rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '3px'
                            }}
                            title={isTagged ? "ยกเลิกแท็กในฉาก AI" : "แท็กให้ AI รู้จักตัวละครนี้"}
                          >
                            {isTagged ? <Check size={11} strokeWidth={3} /> : <Plus size={11} strokeWidth={2} />}
                            <span>{isTagged ? 'ในฉากแล้ว' : 'แท็กเข้า AI'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => insertCharacterDialogue(char)}
                            style={{
                              flex: 1,
                              padding: '5px 6px',
                              borderRadius: 'var(--radius-pill)',
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--teal-primary)',
                              color: 'var(--teal-primary)',
                              fontSize: '0.68rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '3px'
                            }}
                            title="แทรกบรรทัดบทพูดลงในหน้านิยาย"
                          >
                            <Quote size={11} strokeWidth={2} />
                            <span>+ ใส่บทพูด</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setShowNewCharacterModal(true)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} strokeWidth={2} />
                    <span>+ สร้างตัวละครใหม่ในเรื่องนี้</span>
                  </button>

                  {onOpenCharacterBible && (
                    <button
                      type="button"
                      onClick={onOpenCharacterBible}
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.74rem', color: 'var(--teal-primary)' }}
                    >
                      <ExternalLink size={12} strokeWidth={2} />
                      <span>เปิดดู Character Bible ทั้งหมด</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            COLUMN 2: GOOGLE DOCS STYLE LONG-FORM MANUSCRIPT CANVAS
           ======================================================== */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center', width: '100%' }}>
          
          {/* Quick Scene Characters & AI Context Bar */}
          <div className="clay-card" style={{
            width: '100%',
            maxWidth: '860px',
            padding: '8px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            background: 'var(--bg-surface)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0, flex: 1, overflowX: 'auto', paddingBottom: '2px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, fontSize: '0.74rem', fontWeight: 700, color: 'var(--teal-primary)' }}>
                <Users size={14} strokeWidth={2} />
                <span>ตัวละครในเรื่อง:</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                {currentCharacters.map(char => {
                  const isTagged = taggedCharacterIds.includes(char.id);
                  const shortName = (char.name || '').split('/')[0].trim();
                  return (
                    <div
                      key={char.id}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '3px 8px 3px 4px',
                        borderRadius: 'var(--radius-pill)',
                        background: isTagged ? 'rgba(11, 74, 81, 0.12)' : 'var(--bg-inset)',
                        border: isTagged ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                        fontSize: '0.72rem',
                        transition: 'all 0.15s ease'
                      }}
                      title={`${char.name} (${char.role})\nคลิกชื่อเพื่อแท็กเข้า AI / คลิกปุ่มพูดเพื่อใส่บท`}
                    >
                      <img
                        src={char.portrait}
                        alt=""
                        style={{ width: '22px', height: '22px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <span
                        onClick={() => handleToggleCharacterTag(char.id)}
                        style={{
                          fontWeight: isTagged ? 700 : 500,
                          color: isTagged ? 'var(--teal-primary)' : 'var(--text-main)',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        {shortName}
                        {isTagged && <Check size={11} strokeWidth={2.5} />}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          insertCharacterDialogue(char);
                        }}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--teal-primary)',
                          cursor: 'pointer',
                          padding: '0 2px',
                          display: 'flex',
                          alignItems: 'center',
                          fontSize: '0.68rem',
                          fontWeight: 700
                        }}
                        title={`แทรกบทพูดของ ${shortName}`}
                      >
                        <Quote size={11} strokeWidth={2} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
              <button
                type="button"
                onClick={() => setShowNewCharacterModal(true)}
                className="btn-secondary"
                id="btn-quick-bar-add-char"
                style={{ padding: '3px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '3px' }}
                title="เพิ่มตัวละครใหม่ในนิยายเรื่องนี้"
              >
                <Plus size={11} strokeWidth={2} />
                <span>+ ตัวละคร</span>
              </button>

              {onOpenCharacterBible && (
                <button
                  type="button"
                  onClick={onOpenCharacterBible}
                  className="btn-secondary"
                  style={{ padding: '3px 8px', fontSize: '0.7rem', display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--teal-primary)' }}
                  title="เปิดดู Character Bible ละเอียดครบทุกมุม"
                >
                  <ExternalLink size={11} strokeWidth={2} />
                  <span>Bible</span>
                </button>
              )}
            </div>
          </div>

          {/* ========================================================
              FULL GOOGLE DOCS FORMATTING TOOLBAR
             ======================================================== */}
          <div className="clay-card" style={{
            width: '100%',
            maxWidth: '860px',
            padding: '8px 14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {/* Row 1: Primary Formatting Tools */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexWrap: 'wrap' }}>
                
                {/* 1. Undo / Redo (ย้อนกลับ / เดินหน้า) */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('undo'); }}
                  className="gdoc-tool-btn"
                  title="ย้อนกลับ (Undo: Ctrl+Z)"
                >
                  <Undo2 size={15} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('redo'); }}
                  className="gdoc-tool-btn"
                  title="ทำซ้ำ (Redo: Ctrl+Y)"
                >
                  <Redo2 size={15} strokeWidth={2} />
                </button>

                <div className="gdoc-divider" />

                {/* 2. Heading / Paragraph Styles */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setShowHeadingMenu(!showHeadingMenu); }}
                    style={{
                      height: '28px',
                      padding: '0 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.74rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      color: 'var(--text-main)',
                      fontWeight: 600
                    }}
                    title="รูปแบบหัวข้อและย่อหน้า"
                  >
                    <span>
                      {currentHeading === 'p' && 'ข้อความปกติ'}
                      {currentHeading === 'h1' && 'หัวเรื่องหลัก'}
                      {currentHeading === 'h2' && 'หัวข้อตอน'}
                      {currentHeading === 'h3' && 'หัวข้อย่อยฉาก'}
                      {currentHeading === 'blockquote' && 'คำคม / บทพูด'}
                    </span>
                    <ChevronDown size={11} strokeWidth={2} />
                  </button>

                  {showHeadingMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '32px',
                      left: 0,
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      zIndex: 30,
                      width: '160px',
                      padding: '4px 0'
                    }}>
                      {[
                        { tag: 'p', label: 'ข้อความปกติ' },
                        { tag: 'h1', label: 'หัวเรื่องหลัก (H1)' },
                        { tag: 'h2', label: 'หัวข้อตอน (H2)' },
                        { tag: 'h3', label: 'หัวข้อย่อยฉาก (H3)' },
                        { tag: 'blockquote', label: 'คำคม / บทพูดเด่น' }
                      ].map(item => (
                        <div
                          key={item.tag}
                          onMouseDown={(e) => { e.preventDefault(); applyHeadingStyle(item.tag); }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                            color: currentHeading === item.tag ? 'var(--teal-primary)' : 'var(--text-main)',
                            fontWeight: currentHeading === item.tag ? 700 : 500,
                            background: currentHeading === item.tag ? 'var(--teal-subtle)' : 'transparent'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'var(--bg-inset)'}
                          onMouseLeave={(e) => e.target.style.background = currentHeading === item.tag ? 'var(--teal-subtle)' : 'transparent'}
                        >
                          {item.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* 3. Font Family Selector */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setShowFontMenu(!showFontMenu); }}
                    style={{
                      height: '28px',
                      padding: '0 8px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      fontSize: '0.74rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                      color: 'var(--text-main)',
                      fontWeight: 600
                    }}
                    title="เปลี่ยนแบบอักษร (Font)"
                  >
                    <span>{currentFont}</span>
                    <ChevronDown size={11} strokeWidth={2} />
                  </button>

                  {showFontMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '32px',
                      left: 0,
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      zIndex: 30,
                      width: '150px',
                      padding: '4px 0'
                    }}>
                      {['Sarabun', 'Prompt', 'Bai Jamjuree', 'Kodchasan', 'Georgia', 'Courier New'].map(font => (
                        <div
                          key={font}
                          onMouseDown={(e) => { e.preventDefault(); applyFontFamily(font); }}
                          style={{
                            padding: '6px 12px',
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                            fontFamily: font,
                            color: currentFont === font ? 'var(--teal-primary)' : 'var(--text-main)',
                            fontWeight: currentFont === font ? 700 : 500,
                            background: currentFont === font ? 'var(--teal-subtle)' : 'transparent'
                          }}
                          onMouseEnter={(e) => e.target.style.background = 'var(--bg-inset)'}
                          onMouseLeave={(e) => e.target.style.background = currentFont === font ? 'var(--teal-subtle)' : 'transparent'}
                        >
                          {font}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="gdoc-divider" />

                {/* 4. Font Size Controls (ขยายฟอนต์ / ลดฟอนต์) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', border: '1px solid var(--border-subtle)', borderRadius: '4px', padding: '1px 3px', background: 'var(--bg-surface)' }}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); stepFontSize(-1); }}
                    className="gdoc-tool-btn"
                    style={{ width: '22px', height: '24px', fontSize: '0.8rem', fontWeight: 700 }}
                    title="ลดขนาดตัวอักษร"
                  >
                    -
                  </button>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, width: '26px', textAlign: 'center', color: 'var(--text-main)' }}>
                    {currentFontSize}
                  </span>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); stepFontSize(1); }}
                    className="gdoc-tool-btn"
                    style={{ width: '22px', height: '24px', fontSize: '0.8rem', fontWeight: 700 }}
                    title="ขยายขนาดตัวอักษร"
                  >
                    +
                  </button>
                </div>

                <div className="gdoc-divider" />

                {/* 5. Bold, Italic, Underline, Strikethrough */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('bold'); }}
                  className="gdoc-tool-btn"
                  title="ตัวหนา (Ctrl+B)"
                >
                  <Bold size={14} strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('italic'); }}
                  className="gdoc-tool-btn"
                  title="ตัวเอียง (Ctrl+I)"
                >
                  <Italic size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('underline'); }}
                  className="gdoc-tool-btn"
                  title="ขีดเส้นใต้ (Ctrl+U)"
                >
                  <Underline size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('strikeThrough'); }}
                  className="gdoc-tool-btn"
                  title="ขีดฆ่า (Strikethrough)"
                >
                  <Strikethrough size={14} strokeWidth={2} />
                </button>

                <div className="gdoc-divider" />

                {/* 6. Text Color (เปลี่ยนสีตัวอักษร) */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setShowTextColorMenu(!showTextColorMenu); setShowHighlightMenu(false); }}
                    className="gdoc-tool-btn"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                    title="เปลี่ยนสีตัวอักษร"
                  >
                    <span style={{ fontSize: '0.78rem', fontWeight: 900, lineHeight: 1 }}>A</span>
                    <div style={{ width: '12px', height: '3px', background: activeTextColor, marginTop: '1px', borderRadius: '1px' }} />
                  </button>

                  {showTextColorMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '32px',
                      left: '-20px',
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
                      zIndex: 30,
                      padding: '8px',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(4, 22px)',
                      gap: '6px'
                    }}>
                      {[
                        { color: '#1D2425', title: 'ดำเข้ม' },
                        { color: '#0B4A51', title: 'เขียวเทล SeriesX' },
                        { color: '#1E3A8A', title: 'กรมท่า' },
                        { color: '#B91C1C', title: 'แดงเลือดหมู' },
                        { color: '#C2410C', title: 'ส้มอิฐ' },
                        { color: '#15803D', title: 'เขียวมรกต' },
                        { color: '#7E22CE', title: 'ม่วง' },
                        { color: '#6B7280', title: 'เทาเข้ม' }
                      ].map(swatch => (
                        <div
                          key={swatch.color}
                          onMouseDown={(e) => { e.preventDefault(); applyTextColor(swatch.color); }}
                          style={{
                            width: '22px',
                            height: '22px',
                            background: swatch.color,
                            borderRadius: '3px',
                            cursor: 'pointer',
                            border: activeTextColor === swatch.color ? '2px solid #000' : '1px solid rgba(0,0,0,0.1)'
                          }}
                          title={swatch.title}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* 7. Highlight Color (การใส่ไฮไลท์) */}
                <div style={{ position: 'relative' }}>
                  <button
                    type="button"
                    onMouseDown={(e) => { e.preventDefault(); setShowHighlightMenu(!showHighlightMenu); setShowTextColorMenu(false); }}
                    className="gdoc-tool-btn"
                    title="สีไฮไลท์ข้อความ"
                  >
                    <Highlighter size={14} strokeWidth={2} color={activeHighlightColor === 'transparent' ? 'var(--text-main)' : 'var(--teal-primary)'} />
                  </button>

                  {showHighlightMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '32px',
                      left: '-20px',
                      background: '#FFFFFF',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-sm)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
                      zIndex: 30,
                      padding: '8px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      <div
                        onMouseDown={(e) => { e.preventDefault(); applyHighlightColor('transparent'); }}
                        style={{
                          padding: '4px 6px',
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          borderBottom: '1px solid #ECE7DD'
                        }}
                      >
                        <X size={12} strokeWidth={2} />
                        <span>ไม่ใส่ไฮไลท์ (ล้างสี)</span>
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 22px)', gap: '6px' }}>
                        {[
                          { color: '#FEF08A', title: 'เหลืองนีออน' },
                          { color: '#BBF7D0', title: 'เขียวมินต์' },
                          { color: '#BAE6FD', title: 'ฟ้าพาสเทล' },
                          { color: '#FBCFE8', title: 'ชมพูพาสเทล' },
                          { color: '#FED7AA', title: 'ส้มพีช' },
                          { color: '#E9D5FF', title: 'ม่วงอ่อน' },
                          { color: '#E5E7EB', title: 'เทาอ่อน' },
                          { color: '#FED7D7', title: 'แดงกุหลาบ' }
                        ].map(swatch => (
                          <div
                            key={swatch.color}
                            onMouseDown={(e) => { e.preventDefault(); applyHighlightColor(swatch.color); }}
                            style={{
                              width: '22px',
                              height: '22px',
                              background: swatch.color,
                              borderRadius: '3px',
                              cursor: 'pointer',
                              border: activeHighlightColor === swatch.color ? '2px solid var(--teal-primary)' : '1px solid rgba(0,0,0,0.15)'
                            }}
                            title={swatch.title}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="gdoc-divider" />

                {/* 8. Text Alignment */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyLeft'); }}
                  className="gdoc-tool-btn"
                  title="จัดชิดซ้าย"
                >
                  <AlignLeft size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyCenter'); }}
                  className="gdoc-tool-btn"
                  title="จัดกึ่งกลาง"
                >
                  <AlignCenter size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyRight'); }}
                  className="gdoc-tool-btn"
                  title="จัดชิดขวา"
                >
                  <AlignRight size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('justifyFull'); }}
                  className="gdoc-tool-btn"
                  title="จัดเต็มแนวบรรทัด"
                >
                  <AlignJustify size={14} strokeWidth={2} />
                </button>

                <div className="gdoc-divider" />

                {/* 9. Lists & Indentation */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('insertUnorderedList'); }}
                  className="gdoc-tool-btn"
                  title="รายการสัญลักษณ์ (Bullet List)"
                >
                  <List size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('insertOrderedList'); }}
                  className="gdoc-tool-btn"
                  title="รายการตัวเลข (Numbered List)"
                >
                  <ListOrdered size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('indent'); }}
                  className="gdoc-tool-btn"
                  title="เพิ่มการเยื้องหน้า (Indent)"
                >
                  <Indent size={14} strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); executeCommand('outdent'); }}
                  className="gdoc-tool-btn"
                  title="ลดการเยื้องหน้า (Outdent)"
                >
                  <Outdent size={14} strokeWidth={2} />
                </button>

                <div className="gdoc-divider" />

                {/* 10. Scene Divider & Dialogue Quote */}
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); insertSceneBreak(); }}
                  className="btn-secondary"
                  style={{ padding: '3px 7px', fontSize: '0.72rem', height: '26px' }}
                  title="แทรกจุดตัดฉาก (Scene Break ***)"
                >
                  <span>ตัดฉาก ***</span>
                </button>

                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); insertDialogueQuote(); }}
                  className="btn-secondary"
                  style={{ padding: '3px 7px', fontSize: '0.72rem', height: '26px' }}
                  title="แทรกบรรทัดบทพูดตัวละคร"
                >
                  <Quote size={12} strokeWidth={2} />
                  <span>บทพูด " "</span>
                </button>

                {/* Find & Replace Toggle */}
                <button
                  type="button"
                  onClick={() => setShowFindReplace(!showFindReplace)}
                  className={showFindReplace ? "gdoc-tool-btn active" : "gdoc-tool-btn"}
                  title="ค้นหาและแทนที่คำ (Find & Replace)"
                >
                  <Search size={14} strokeWidth={2} />
                </button>

                {/* Dedicated Button for AI Text Rewrite */}
                <button
                  type="button"
                  onClick={() => {
                    setRightPanelTab('ai');
                    setFocusMode(false);
                  }}
                  className={hasActiveSelection ? "btn-primary" : "btn-secondary"}
                  style={{
                    padding: '3px 9px',
                    fontSize: '0.72rem',
                    height: '26px',
                    background: hasActiveSelection ? 'var(--teal-primary)' : 'var(--bg-surface)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                  title="คลุมดำข้อความแล้วคลิกเพื่อให้ AI ช่วยแก้ไขหรือต่อยอดบท"
                >
                  <Wand2 size={12} strokeWidth={2} />
                  <span>{hasActiveSelection ? "AI ปรับแก้ที่เลือก" : "AI แก้ไขบท"}</span>
                </button>

                {/* Quick @ Mention Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!editorRef.current) return;
                    editorRef.current.focus();
                    document.execCommand('insertText', false, '@');
                    handleEditorInput();
                    checkMentionTrigger();
                  }}
                  className="btn-secondary"
                  style={{
                    padding: '3px 9px',
                    fontSize: '0.72rem',
                    height: '26px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--teal-primary)',
                    borderColor: 'var(--teal-primary)',
                    background: 'rgba(11, 74, 81, 0.05)'
                  }}
                  title="พิมพ์ @ เพื่อระบุตัวละครผู้พูดและแทรกบทพูดทันที"
                >
                  <AtSign size={12} strokeWidth={2.5} />
                  <span>@ระบุตัวละคร</span>
                </button>
              </div>

              {/* Right Side Tools: Comment Button & Auto-Save */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleOpenAutoSpeaker}
                  className="btn-secondary"
                  style={{
                    padding: '4px 10px',
                    fontSize: '0.74rem',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: 'var(--teal-primary)',
                    borderColor: 'var(--teal-primary)',
                    background: 'var(--bg-raised)'
                  }}
                  title="สแกนตรวจจับผู้พูดในนิยายอัตโนมัติ และแปลงเป็นบทซีรีส์ 9:16"
                >
                  <Sparkles size={12} strokeWidth={2} />
                  <span>สแกนผู้พูด</span>
                </button>
                <button
                  type="button"
                  onClick={handleCaptureSelectionForComment}
                  className="btn-primary"
                  style={{ padding: '4px 10px', fontSize: '0.74rem', height: '28px' }}
                  title="เลือกข้อความแล้วกดเพื่อเพิ่มคอมเมนต์เจาะจงจุดนี้"
                >
                  <MessageSquarePlus size={13} strokeWidth={2} />
                  <span>+ เพิ่มคอมเมนต์</span>
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.7rem', color: 'var(--accent-green)', fontWeight: 600, whiteSpace: 'nowrap' }}>
                  <CheckCircle2 size={12} strokeWidth={2} />
                  <span>{saveStatus}</span>
                </div>
              </div>

            </div>

            {/* Find & Replace Bar (Collapsible) */}
            {showFindReplace && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                paddingTop: '6px',
                borderTop: '1px dashed var(--border-subtle)',
                flexWrap: 'wrap'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Search size={13} strokeWidth={2} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="ค้นหาคำ..."
                    value={findKeyword}
                    onChange={(e) => setFindKeyword(e.target.value)}
                    style={{
                      padding: '3px 8px',
                      fontSize: '0.75rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-inset)',
                      outline: 'none',
                      width: '130px'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Replace size={13} strokeWidth={2} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="แทนที่ด้วย..."
                    value={replaceKeyword}
                    onChange={(e) => setReplaceKeyword(e.target.value)}
                    style={{
                      padding: '3px 8px',
                      fontSize: '0.75rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-inset)',
                      outline: 'none',
                      width: '130px'
                    }}
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleExecuteReplace(false)}
                  className="btn-secondary"
                  style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                >
                  แทนที่
                </button>
                <button
                  type="button"
                  onClick={() => handleExecuteReplace(true)}
                  className="btn-secondary"
                  style={{ padding: '3px 8px', fontSize: '0.72rem' }}
                >
                  แทนที่ทั้งหมด
                </button>

                <button
                  type="button"
                  onClick={() => setShowFindReplace(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: '2px' }}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            )}
          </div>

          {/* ========================================================
              FLOATING SELECTION ACTION DOCK (IF TEXT SELECTED)
             ======================================================== */}
          {hasActiveSelection && selectedSnippet && (
            <div style={{
              width: '100%',
              maxWidth: '860px',
              background: 'linear-gradient(135deg, #0B4A51, #08373C)',
              color: '#FFFFFF',
              borderRadius: 'var(--radius-pill)',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 6px 18px rgba(11, 74, 81, 0.35)',
              animation: 'floatIn 0.2s cubic-bezier(0.16, 1, 0.3, 1) forwards'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <Sparkles size={15} strokeWidth={2} />
                <span>
                  <strong>เลือกข้อความ:</strong> "{selectedSnippet.slice(0, 48)}..."
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                <button
                  type="button"
                  onClick={() => {
                    setRightPanelTab('ai');
                    setFocusMode(false);
                  }}
                  style={{
                    background: '#FFFFFF',
                    color: 'var(--teal-primary)',
                    border: 'none',
                    borderRadius: 'var(--radius-pill)',
                    padding: '4px 12px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Wand2 size={13} strokeWidth={2} />
                  <span>สั่ง AI ช่วยแก้ไข / คิดบทเพิ่ม</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHasActiveSelection(false)}
                  style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: '2px' }}
                >
                  <X size={14} strokeWidth={2} />
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              GOOGLE DOCS RULER BAR (ไม้บรรทัดหน้ากระดาษ)
             ======================================================== */}
          <div style={{ width: '100%', maxWidth: '860px', padding: '0 4px' }}>
            <div className="googledocs-ruler">
              <div style={{ width: '64px', height: '100%', background: '#DDD7CC', borderRight: '1px solid #C5BCAD' }} />
              
              <div style={{ flex: 1, position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px' }}>
                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                  <div key={num} style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.62rem', color: '#7A7265', fontWeight: 600 }}>{num}</span>
                    <div style={{ width: '1px', height: '4px', background: '#9E9484' }} />
                  </div>
                ))}
              </div>

              <div style={{ width: '64px', height: '100%', background: '#DDD7CC', borderLeft: '1px solid #C5BCAD' }} />
            </div>
          </div>

          {/* ========================================================
              REALISTIC GOOGLE DOC PAPER SHEET (CONTENTEDITABLE)
             ======================================================== */}
          <div style={{
            width: '100%',
            maxWidth: '860px',
            position: 'relative'
          }}>
            <div className="googledocs-sheet" style={{ fontFamily: currentFont }}>
              
              {/* Document Header (Editable Title) */}
              <div style={{ marginBottom: '24px', borderBottom: '1px solid #EDE7DC', paddingBottom: '14px' }}>
                <input
                  type="text"
                  value={currentChapter.title || ''}
                  onChange={(e) => handleUpdateTitle(e.target.value)}
                  placeholder="ชื่อตอนนิยาย..."
                  style={{
                    fontSize: '1.5rem',
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
                    เวลาอ่านประมาณ: <strong style={{ color: 'var(--teal-primary)' }}>{Math.ceil(currentWordCount / 250) || 1} นาที</strong>
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

              {/* Real Rich-Text Document Body (ContentEditable) */}
              <div
                ref={editorRef}
                contentEditable="true"
                suppressContentEditableWarning={true}
                onInput={() => {
                  handleEditorInput();
                  checkMentionTrigger();
                }}
                onKeyDown={handleEditorKeyDown}
                onMouseUp={() => {
                  handleSelectionChange();
                  checkMentionTrigger();
                }}
                onKeyUp={() => {
                  handleSelectionChange();
                  checkMentionTrigger();
                }}
                style={{
                  minHeight: '720px',
                  outline: 'none',
                  fontSize: `${currentFontSize}pt`
                }}
              />

              {/* Floating @ Character Mention Autocomplete Dropdown */}
              {mentionMenu.open && filteredMentionChars.length > 0 && (
                <div
                  style={{
                    position: 'fixed',
                    top: `${mentionMenu.coords.top}px`,
                    left: `${mentionMenu.coords.left}px`,
                    width: '320px',
                    maxHeight: '360px',
                    background: 'var(--bg-raised)',
                    border: '1.5px solid var(--teal-primary)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: '0 12px 32px rgba(11, 74, 81, 0.28)',
                    zIndex: 99999,
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    animation: 'fadeIn 0.12s ease-out'
                  }}
                >
                  {/* Mention Header */}
                  <div style={{
                    padding: '8px 12px',
                    background: 'var(--bg-surface)',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--teal-primary)', fontWeight: 700 }}>
                      <AtSign size={13} strokeWidth={2.5} />
                      <span>เลือกตัวละครกำหนดบทพูด (Mention)</span>
                    </div>
                    <span style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>
                      กด Enter หรือคลิกเลือก
                    </span>
                  </div>

                  {/* Character Items List */}
                  <div style={{ overflowY: 'auto', flex: 1, padding: '4px', maxHeight: '260px' }}>
                    {filteredMentionChars.map((char, idx) => {
                      const isSelected = idx === mentionMenu.activeIndex;
                      const shortName = (char.name || '').split('/')[0].trim();
                      return (
                        <div
                          key={char.id}
                          onMouseEnter={() => setMentionMenu(prev => ({ ...prev, activeIndex: idx }))}
                          style={{
                            padding: '8px 10px',
                            borderRadius: 'var(--radius-sm)',
                            background: isSelected ? 'rgba(11, 74, 81, 0.08)' : 'transparent',
                            border: isSelected ? '1px solid var(--teal-primary)' : '1px solid transparent',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '8px',
                            transition: 'background 0.1s'
                          }}
                        >
                          <div 
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, overflow: 'hidden' }}
                            onClick={() => handleSelectMention(char, 'dialogue')}
                          >
                            <img
                              src={char.portrait || '/assets/default_avatar.jpg'}
                              alt=""
                              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '1px solid var(--border-subtle)' }}
                            />
                            <div style={{ overflow: 'hidden' }}>
                              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {shortName}
                              </div>
                              <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {char.role}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleSelectMention(char, 'dialogue'); }}
                              title="แทรกเป็นบทพูด: @ชื่อ: &quot;...&quot;"
                              style={{
                                padding: '3px 8px',
                                borderRadius: 'var(--radius-pill)',
                                background: 'var(--teal-primary)',
                                color: '#fff',
                                border: 'none',
                                fontSize: '0.68rem',
                                fontWeight: 700,
                                cursor: 'pointer'
                              }}
                            >
                              + บทพูด
                            </button>
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleSelectMention(char, 'tag'); }}
                              title="แทรกเฉพาะแท็กชื่อ: @ชื่อ"
                              style={{
                                padding: '3px 6px',
                                borderRadius: 'var(--radius-pill)',
                                background: 'var(--bg-inset)',
                                color: 'var(--text-main)',
                                border: '1px solid var(--border-subtle)',
                                fontSize: '0.66rem',
                                cursor: 'pointer'
                              }}
                            >
                              แท็กชื่อ
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Keyboard Shortcut Footer */}
                  <div style={{
                    padding: '5px 10px',
                    background: 'var(--bg-inset)',
                    borderTop: '1px solid var(--border-subtle)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>↑↓ นำทาง | Enter ใส่บทพูด</span>
                    <span>Esc ปิดเมนู</span>
                  </div>
                </div>
              )}

              {/* Author Director Memo Box */}
              <div style={{
                marginTop: '32px',
                padding: '12px 16px',
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
                marginTop: '24px',
                paddingTop: '12px',
                borderTop: '1px solid #ECE7DD',
                fontSize: '0.75rem',
                color: '#8A8275'
              }}>
                <div>
                  หน้า 1 จาก {estimatedPages} หน้า &bull; {currentWordCount.toLocaleString()} คำ &bull; {currentCharCount.toLocaleString()} ตัวอักษร
                </div>
                <div>
                  SeriesX Novel Studio &bull; Google Docs Rich Manuscript Engine
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ========================================================
            COLUMN 3: COLLABORATIVE COMMENTS & AI CO-WRITER RAIL
           ======================================================== */}
        {!focusMode && (
          <div className="clay-card" style={{ padding: '18px', display: 'flex', flexDirection: 'column', minHeight: '820px', gap: '14px' }}>
            
            {/* 3-Tab Switcher: Comments vs AI Writer vs AI Splitter */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-inset)',
              padding: '3px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border-subtle)',
              gap: '2px'
            }}>
              <button
                type="button"
                onClick={() => setRightPanelTab('comments')}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: rightPanelTab === 'comments' ? 'var(--teal-primary)' : 'transparent',
                  color: rightPanelTab === 'comments' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: rightPanelTab === 'comments' ? 700 : 500,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <MessageSquare size={12} strokeWidth={2} />
                <span>คอมเมนต์ ({chapterComments.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setRightPanelTab('ai')}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: rightPanelTab === 'ai' ? 'var(--teal-primary)' : 'transparent',
                  color: rightPanelTab === 'ai' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: rightPanelTab === 'ai' ? 700 : 500,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Sparkles size={12} strokeWidth={2} />
                <span>AI ช่วยแต่ง</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRightPanelTab('split');
                  if (!splitResults.length) handleGenerateEpisodeSplit();
                }}
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: rightPanelTab === 'split' ? 'var(--teal-primary)' : 'transparent',
                  color: rightPanelTab === 'split' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: rightPanelTab === 'split' ? 700 : 500,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Split size={12} strokeWidth={2} />
                <span>AI แบ่งตอน</span>
              </button>

              <button
                type="button"
                onClick={() => setRightPanelTab('characters')}
                id="btn-right-tab-characters"
                style={{
                  flex: 1,
                  padding: '6px 4px',
                  borderRadius: 'var(--radius-pill)',
                  border: 'none',
                  background: rightPanelTab === 'characters' ? 'var(--teal-primary)' : 'transparent',
                  color: rightPanelTab === 'characters' ? '#FFFFFF' : 'var(--text-main)',
                  fontWeight: rightPanelTab === 'characters' ? 700 : 500,
                  fontSize: '0.72rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <Users size={12} strokeWidth={2} />
                <span>ตัวละคร ({currentCharacters.length})</span>
              </button>
            </div>

            {/* TAB CONTENT 1: COMMENTS & EDITORIAL REVIEW */}
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
                          padding: '3px 7px',
                          fontSize: '0.68rem',
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
                      <strong style={{ fontSize: '0.76rem', color: 'var(--text-main)' }}>เพิ่มข้อเสนอแนะตรวจบท</strong>
                      <button
                        type="button"
                        onClick={() => setShowAddCommentForm(false)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
                      >
                        <X size={12} strokeWidth={2} />
                      </button>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '2px' }}>ตำแหน่ง/ข้อความที่ตรวจ:</label>
                      <input
                        type="text"
                        value={newCommentTarget}
                        onChange={(e) => setNewCommentTarget(e.target.value)}
                        placeholder="ไฮไลต์ข้อความในเอกสาร หรือพิมพ์ระบุจุด..."
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '5px 8px',
                          fontSize: '0.72rem',
                          color: 'var(--text-main)'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '2px' }}>บทบาทผู้ตรวจ:</label>
                      <select
                        value={newCommentAuthor}
                        onChange={(e) => setNewCommentAuthor(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '5px 8px',
                          fontSize: '0.72rem',
                          color: 'var(--text-main)'
                        }}
                      >
                        <option value="ผู้กำกับ ธีรภัทร (Director)">ผู้กำกับ ธีรภัทร (Director)</option>
                        <option value="บรรณาธิการ พิมพ์ชนก (Editor)">บรรณาธิการ พิมพ์ชนก (Editor)</option>
                        <option value="AI Script Doctor">AI Script Doctor (ตรวจความสมเหตุสมผล)</option>
                        <option value="ผู้แต่ง/นักเขียนบท (Writer)">ผู้แต่ง/นักเขียนบท (Writer)</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '0.68rem', color: 'var(--text-dim)', display: 'block', marginBottom: '2px' }}>คำแนะนำ/คอมเมนต์:</label>
                      <textarea
                        value={newCommentText}
                        onChange={(e) => setNewCommentText(e.target.value)}
                        placeholder="พิมพ์สิ่งที่ควรปรับ เช่น มุมกล้อง, คำพูดกระชับขึ้น, การแสดงอารมณ์..."
                        rows={2}
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '6px 8px',
                          fontSize: '0.74rem',
                          color: 'var(--text-main)',
                          resize: 'none'
                        }}
                        autoFocus
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => setShowAddCommentForm(false)}
                        className="btn-secondary"
                        style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                      >
                        ยกเลิก
                      </button>
                      <button
                        type="submit"
                        className="btn-primary"
                        style={{ padding: '4px 10px', fontSize: '0.7rem' }}
                        disabled={!newCommentText.trim()}
                      >
                        ส่งคอมเมนต์
                      </button>
                    </div>
                  </form>
                )}

                {/* Comments List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1, maxHeight: '600px', paddingRight: '4px' }}>
                  {filteredComments.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px 16px', color: 'var(--text-dim)', fontSize: '0.78rem' }}>
                      <MessageSquare size={28} strokeWidth={1.5} style={{ margin: '0 auto 8px auto', opacity: 0.4 }} />
                      <div>ไม่มีความคิดเห็นในหมวดนี้</div>
                      <div style={{ fontSize: '0.7rem', marginTop: '4px' }}>ไฮไลต์ข้อความในเอกสารแล้วกด "+ เพิ่มคอมเมนต์" ได้ทันที</div>
                    </div>
                  ) : (
                    filteredComments.map(cmt => {
                      const isSelected = cmt.id === activeCommentId;
                      return (
                        <div
                          key={cmt.id}
                          onClick={() => setActiveCommentId(cmt.id)}
                          style={{
                            padding: '12px',
                            borderRadius: 'var(--radius-md)',
                            background: cmt.resolved ? 'var(--bg-inset)' : isSelected ? 'var(--bg-raised)' : 'var(--bg-surface)',
                            border: isSelected ? '2px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                            boxShadow: isSelected ? 'var(--shadow-raised-sm)' : 'none',
                            opacity: cmt.resolved ? 0.7 : 1,
                            transition: 'all 0.15s'
                          }}
                        >
                          {/* Header: Author & Resolve Toggle */}
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <div style={{
                                width: '20px',
                                height: '20px',
                                borderRadius: '50%',
                                background: cmt.avatarColor || 'var(--teal-primary)',
                                color: '#FFFFFF',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.62rem',
                                fontWeight: 700
                              }}>
                                {cmt.author.charAt(0)}
                              </div>
                              <div>
                                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-main)', lineHeight: 1.2 }}>
                                  {cmt.author}
                                </div>
                                <span style={{ fontSize: '0.64rem', color: 'var(--text-dim)' }}>
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
                                background: 'none',
                                border: 'none',
                                color: cmt.resolved ? 'var(--accent-green)' : 'var(--text-dim)',
                                cursor: 'pointer',
                                fontSize: '0.7rem',
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

            {/* TAB CONTENT 2: AI CO-WRITER & HIGHLIGHT REWRITER */}
            {rightPanelTab === 'ai' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', flex: 1 }}>
                
                {/* Notice Banner if character created */}
                {charSuccessNotice && (
                  <div style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'var(--accent-green-bg)',
                    border: '1px solid rgba(31, 122, 89, 0.3)',
                    color: 'var(--accent-green)',
                    fontSize: '0.75rem',
                    lineHeight: 1.4
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, marginBottom: '2px' }}>
                      <CheckCircle2 size={13} strokeWidth={2} />
                      <span>บันทึกตัวละครสำเร็จ</span>
                    </div>
                    <div>{charSuccessNotice}</div>
                    {onOpenCharacterBible && (
                      <button
                        onClick={onOpenCharacterBible}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--teal-primary)',
                          fontWeight: 700,
                          fontSize: '0.72rem',
                          cursor: 'pointer',
                          padding: 0,
                          marginTop: '4px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px'
                        }}
                      >
                        <span>เปิดดูในหน้ากำหนดตัวละคร (Character Bible)</span>
                        <ArrowUpRight size={12} strokeWidth={2} />
                      </button>
                    )}
                  </div>
                )}

                {/* ========================================================
                    SECTION A: AI SMART TEXT SELECTION REWRITER & EXPANDER
                   ======================================================== */}
                <div style={{
                  background: 'var(--bg-inset)',
                  boxShadow: 'var(--shadow-inset)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Sparkles size={15} strokeWidth={2} color="var(--teal-primary)" />
                      <strong style={{ fontSize: '0.8rem', color: 'var(--teal-primary)' }}>
                        AI ปรับปรุง & คิดบทเพิ่มจากข้อความที่เลือก
                      </strong>
                    </div>
                    {hasActiveSelection && (
                      <span className="badge badge-teal" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                        กำลังคลุมดำ
                      </span>
                    )}
                  </div>

                  {/* Quoted Selected Snippet */}
                  <div style={{
                    background: 'var(--bg-surface)',
                    borderLeft: '3px solid var(--teal-primary)',
                    padding: '8px 10px',
                    borderRadius: '0 6px 6px 0',
                    fontSize: '0.72rem',
                    color: 'var(--text-main)',
                    fontStyle: 'italic',
                    maxHeight: '90px',
                    overflowY: 'auto',
                    lineHeight: 1.45
                  }}>
                    "{selectedSnippet}"
                  </div>

                  {/* Character Context Selector Section */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <Users size={12} strokeWidth={2} />
                        <strong>ตัวละครในฉากนี้ (สำหรับให้ AI คิดบทแม่นยำ):</strong>
                      </div>
                      
                      {/* + Button to open Character Selector */}
                      <button
                        type="button"
                        onClick={() => setShowCharacterPicker(!showCharacterPicker)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--teal-primary)',
                          cursor: 'pointer',
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '2px'
                        }}
                      >
                        <Plus size={13} strokeWidth={2} />
                        <span>เลือกตัวละคร</span>
                      </button>
                    </div>

                    {/* Active Tagged Characters Pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                      {taggedCharacterIds.length === 0 ? (
                        <span style={{ fontSize: '0.68rem', color: 'var(--text-dim)', fontStyle: 'italic' }}>
                          ยังไม่ได้เลือกตัวละคร (กด + ด้านบนเพื่อเลือกหรือสร้างใหม่)
                        </span>
                      ) : (
                        taggedCharacterIds.map(cId => {
                          const char = currentCharacters.find(c => c.id === cId);
                          if (!char) return null;
                          return (
                            <span
                              key={char.id}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                background: 'var(--teal-primary)',
                                color: '#FFFFFF',
                                padding: '2px 8px',
                                borderRadius: 'var(--radius-pill)',
                                fontSize: '0.68rem',
                                fontWeight: 600
                              }}
                            >
                              <span>{char.name.split('/')[0].trim()}</span>
                              <button
                                type="button"
                                onClick={() => handleToggleCharacterTag(char.id)}
                                style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 0, display: 'flex' }}
                              >
                                <X size={10} strokeWidth={2} />
                              </button>
                            </span>
                          );
                        })
                      )}
                    </div>

                    {/* Popover: Character Picker & New Character Creator */}
                    {showCharacterPicker && (
                      <div style={{
                        background: '#FFFFFF',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                        padding: '10px',
                        marginBottom: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '8px'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '6px' }}>
                          <strong style={{ fontSize: '0.74rem', color: 'var(--text-main)' }}>
                            เลือกตัวละครในเรื่อง "{safeSeries.title || 'นิยาย'}":
                          </strong>
                          <button
                            type="button"
                            onClick={() => setShowCharacterPicker(false)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
                          >
                            <X size={12} strokeWidth={2} />
                          </button>
                        </div>

                        {/* List of existing characters for this series */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '140px', overflowY: 'auto' }}>
                          {currentCharacters.map(char => {
                            const isTagged = taggedCharacterIds.includes(char.id);
                            return (
                              <div
                                key={char.id}
                                onClick={() => handleToggleCharacterTag(char.id)}
                                style={{
                                  padding: '5px 8px',
                                  borderRadius: '6px',
                                  background: isTagged ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                                  border: isTagged ? '1px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  fontSize: '0.72rem'
                                }}
                              >
                                <div>
                                  <strong style={{ color: isTagged ? 'var(--teal-primary)' : 'var(--text-main)' }}>
                                    {char.name.split('/')[0]}
                                  </strong>
                                  <span style={{ fontSize: '0.64rem', color: 'var(--text-dim)', marginLeft: '6px' }}>
                                    {char.role}
                                  </span>
                                </div>
                                {isTagged && <Check size={12} strokeWidth={2.5} color="var(--teal-primary)" />}
                              </div>
                            );
                          })}
                        </div>

                        {/* Create New Character Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setShowNewCharacterModal(true);
                            setShowCharacterPicker(false);
                          }}
                          className="btn-secondary"
                          style={{
                            width: '100%',
                            fontSize: '0.72rem',
                            padding: '6px 8px',
                            justifyContent: 'center',
                            color: 'var(--teal-primary)',
                            borderColor: 'var(--teal-subtle)'
                          }}
                        >
                          <UserPlus size={13} strokeWidth={2} />
                          <span>+ สร้างตัวละครใหม่ในเรื่องนี้</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* AI Instruction Input */}
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>
                      คำสั่งให้ AI ดำเนินการ (AI Instruction):
                    </label>
                    <input
                      type="text"
                      value={aiRewritePrompt}
                      onChange={(e) => setAiRewritePrompt(e.target.value)}
                      placeholder="เช่น: ช่วยแก้ไขเนื้อหานี้ให้ดีหน่อย..."
                      style={{
                        width: '100%',
                        padding: '6px 8px',
                        fontSize: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-subtle)',
                        background: 'var(--bg-surface)',
                        color: 'var(--text-main)',
                        fontWeight: 600,
                        outline: 'none'
                      }}
                    />

                    {/* Quick Presets */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px', marginTop: '5px' }}>
                      {[
                        'ช่วยแก้ไขเนื้อหานี้ให้ดีหน่อย',
                        'เพิ่มความตึงเครียด & อารมณ์บีบคั้น',
                        'ขัดเกลาสำนวนและบทบรรยาย',
                        'คิดบทต่อยอดฉากนี้ทันที'
                      ].map(preset => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAiRewritePrompt(preset)}
                          style={{
                            background: aiRewritePrompt === preset ? 'var(--teal-subtle)' : 'var(--bg-surface)',
                            color: aiRewritePrompt === preset ? 'var(--teal-primary)' : 'var(--text-muted)',
                            border: '1px solid var(--border-subtle)',
                            borderRadius: 'var(--radius-pill)',
                            padding: '2px 7px',
                            fontSize: '0.64rem',
                            cursor: 'pointer'
                          }}
                        >
                          {preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="button"
                    onClick={handleExecuteAiRewrite}
                    disabled={isAiRewriting}
                    className="btn-primary"
                    style={{ width: '100%', fontSize: '0.76rem', padding: '8px 12px', justifyContent: 'center' }}
                  >
                    <Wand2 size={14} strokeWidth={2} />
                    <span>{isAiRewriting ? "AI กำลังคิดบทและปรับแก้..." : "สั่ง AI คิดบทและปรับแก้ทันที"}</span>
                  </button>

                  {/* Rewritten Result Box & Actions */}
                  {rewrittenResult && (
                    <div style={{
                      background: 'var(--bg-surface)',
                      border: '1.5px solid var(--teal-primary)',
                      borderRadius: 'var(--radius-md)',
                      padding: '10px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      animation: 'floatIn 0.2s ease-out'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <strong style={{ fontSize: '0.74rem', color: 'var(--teal-primary)' }}>
                          ผลลัพธ์บทที่ AI ปรับปรุง & คิดเพิ่ม:
                        </strong>
                        <span className="badge badge-teal" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>
                          พร้อมใช้งาน
                        </span>
                      </div>

                      <div style={{
                        fontSize: '0.74rem',
                        color: 'var(--text-main)',
                        lineHeight: 1.55,
                        maxHeight: '180px',
                        overflowY: 'auto',
                        whiteSpace: 'pre-line',
                        background: 'var(--bg-inset)',
                        padding: '8px',
                        borderRadius: '4px'
                      }}>
                        {rewrittenResult}
                      </div>

                      {/* Action Buttons to Apply */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        <button
                          type="button"
                          onClick={handleApplyReplaceSelection}
                          className="btn-primary"
                          style={{ fontSize: '0.7rem', padding: '6px 8px', justifyContent: 'center' }}
                        >
                          <span>แทนที่ข้อความเดิม</span>
                        </button>

                        <button
                          type="button"
                          onClick={handleApplyInsertAfter}
                          className="btn-secondary"
                          style={{ fontSize: '0.7rem', padding: '6px 8px', justifyContent: 'center', borderColor: 'var(--teal-primary)', color: 'var(--teal-primary)' }}
                        >
                          <span>แทรกต่อท้ายข้อความเดิม</span>
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* ========================================================
                    SECTION B: QUICK CONTINUATION & SCENE TOOLS
                   ======================================================== */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', fontWeight: 700 }}>
                    เครื่องมือช่วยแต่งแบบคลิกเดียว:
                  </div>

                  <button
                    onClick={() => handleAiAction('continue')}
                    disabled={isAiGenerating}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 12px' }}
                  >
                    <Wand2 size={14} strokeWidth={2} color="var(--teal-primary)" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>เขียนฉากต่อไปให้อัตโนมัติ</div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>ศึกษาบริบทแล้วแต่งต่อท้ายเอกสาร</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAiAction('cliffhanger')}
                    disabled={isAiGenerating}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 12px' }}
                  >
                    <Zap size={14} strokeWidth={2} color="var(--teal-primary)" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>แทรกจุดหักมุม Cliffhanger</div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>กระชากอารมณ์ให้คนดูอยากดูตอนถัดไป</div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleAiAction('dialogue')}
                    disabled={isAiGenerating}
                    className="btn-secondary"
                    style={{ width: '100%', justifyContent: 'flex-start', padding: '8px 12px' }}
                  >
                    <MessageSquare size={14} strokeWidth={2} color="var(--teal-primary)" />
                    <div style={{ textAlign: 'left' }}>
                      <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-main)' }}>ขัดเกลาบทพูดให้เชือดเฉือน</div>
                      <div style={{ fontSize: '0.66rem', color: 'var(--text-muted)' }}>บทพูดกระชับ คมคาย สไตล์ซีรีส์สั้น</div>
                    </div>
                  </button>
                </div>

                {/* Tension Level Slider */}
                <div style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                    <span>ระดับความตึงเครียด (Tension):</span>
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

            {/* TAB CONTENT 3: AI CHAPTER & EPISODE BREAKDOWN ASSISTANT */}
            {rightPanelTab === 'split' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                
                <div style={{ background: 'rgba(11, 74, 81, 0.05)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--teal-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.8rem', marginBottom: '4px' }}>
                    <Split size={14} strokeWidth={2} />
                    <span>AI วางโครงและแบ่งตอน/บท</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    AI ช่วยคำนวณจุดตัดตอนสำหรับซีรีส์แนวตั้ง (60-90 วินาที) โดยเน้น 3-Second Hook และ Cliffhanger ท้ายตอน
                  </p>
                </div>

                {/* Split Configuration */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div>
                    <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>รูปแบบการตัดตอน:</label>
                    <select
                      value={splitFormat}
                      onChange={(e) => setSplitFormat(e.target.value)}
                      style={{
                        width: '100%',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-sm)',
                        padding: '6px 8px',
                        fontSize: '0.75rem',
                        color: 'var(--text-main)',
                        fontWeight: 600
                      }}
                    >
                      <option value="vertical">ซีรีส์แนวตั้ง 9:16 (60-90 วินาที / ตอน)</option>
                      <option value="webnovel">เว็บนิยายรายตอน (1,500 - 2,500 คำ)</option>
                      <option value="scenes">แบ่งฉากย่อยในบทนี้ (Scene Beats)</option>
                    </select>
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>จำนวนตอน:</label>
                      <select
                        value={targetSplitCount}
                        onChange={(e) => setTargetSplitCount(Number(e.target.value))}
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '6px 8px',
                          fontSize: '0.75rem',
                          color: 'var(--text-main)'
                        }}
                      >
                        <option value={3}>3 ตอน</option>
                        <option value={5}>5 ตอน</option>
                        <option value={8}>8 ตอน</option>
                        <option value={10}>10 ตอน</option>
                      </select>
                    </div>

                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>จุดเน้น:</label>
                      <select
                        value={splitPacing}
                        onChange={(e) => setSplitPacing(e.target.value)}
                        style={{
                          width: '100%',
                          background: 'var(--bg-surface)',
                          border: '1px solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '6px 8px',
                          fontSize: '0.75rem',
                          color: 'var(--text-main)'
                        }}
                      >
                        <option value="high-hook">เน้น Cliffhanger สูงสุด</option>
                        <option value="emotional">เน้นดราม่าอารมณ์รัก</option>
                        <option value="mystery">เน้นเปิดปมความลับ</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={handleGenerateEpisodeSplit}
                    disabled={isAnalyzingSplit}
                    className="btn-primary"
                    style={{ width: '100%', fontSize: '0.78rem', padding: '8px 12px', justifyContent: 'center', marginTop: '4px' }}
                  >
                    <Wand2 size={14} strokeWidth={2} />
                    <span>{isAnalyzingSplit ? "AI กำลังวิเคราะห์จังหวะพล็อต..." : "วิเคราะห์และแบ่งตอนใหม่ด้วย AI"}</span>
                  </button>
                </div>

                {/* Generated Episodes Outline List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', flex: 1, maxHeight: '420px', paddingRight: '4px' }}>
                  {splitResults.map((item) => (
                    <div
                      key={item.epNumber}
                      style={{
                        padding: '10px 12px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-subtle)',
                        fontSize: '0.74rem'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <strong style={{ color: 'var(--teal-primary)', fontSize: '0.78rem' }}>{item.title}</strong>
                        <span style={{ fontSize: '0.65rem', color: 'var(--text-dim)', background: 'var(--bg-inset)', padding: '1px 5px', borderRadius: '4px' }}>
                          ~{item.estDuration} ({item.estWords} คำ)
                        </span>
                      </div>

                      <div style={{ margin: '4px 0', color: 'var(--text-muted)' }}>
                        <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>Hook:</span> {item.hook}
                      </div>

                      <div style={{ margin: '4px 0', color: 'var(--text-main)' }}>
                        <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>Cliffhanger:</span> {item.cliffhanger}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons for Generated Results */}
                {splitResults.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '8px', borderTop: '1px dashed var(--border-subtle)' }}>
                    <button
                      onClick={handleApplySplitToChapters}
                      className="btn-primary"
                      style={{ width: '100%', fontSize: '0.76rem', padding: '8px 12px', justifyContent: 'center' }}
                    >
                      <Plus size={14} strokeWidth={2} />
                      <span>นำไปสร้างเป็นตอนใหม่ในสารบัญทั้งหมด</span>
                    </button>

                    <button
                      onClick={handleInsertCutMarkersToDoc}
                      className="btn-secondary"
                      style={{ width: '100%', fontSize: '0.74rem', padding: '6px 12px', justifyContent: 'center' }}
                    >
                      <Scissors size={13} strokeWidth={2} />
                      <span>แทรกจุดตัดตอนลงในเอกสารปัจจุบัน</span>
                    </button>
                  </div>
                )}

              </div>
            )}

            {/* TAB CONTENT 4: CHARACTERS ROSTER & AI SCENE CONTEXT */}
            {rightPanelTab === 'characters' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
                
                <div style={{ background: 'rgba(11, 74, 81, 0.05)', padding: '10px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--teal-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--teal-primary)', fontWeight: 700, fontSize: '0.8rem' }}>
                      <Users size={14} strokeWidth={2} />
                      <span>ตัวละครประจำเรื่อง ({currentCharacters.length})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowNewCharacterModal(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--teal-primary)',
                        cursor: 'pointer',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2px'
                      }}
                    >
                      <Plus size={12} strokeWidth={2} />
                      <span>เพิ่มตัวละคร</span>
                    </button>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                    AI ผู้ช่วยแต่งจะดึงน้ำเสียง ท่าทาง และความสัมพันธ์ของตัวละครที่ถูก "แท็กในฉาก" ไปแต่งบทและคำพูด
                  </p>
                </div>

                {/* Character Profile Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', flex: 1, maxHeight: '580px', paddingRight: '4px' }}>
                  {currentCharacters.map(char => {
                    const isTagged = taggedCharacterIds.includes(char.id);
                    const shortName = (char.name || '').split('/')[0].trim();
                    return (
                      <div
                        key={char.id}
                        style={{
                          padding: '12px',
                          borderRadius: 'var(--radius-md)',
                          background: isTagged ? 'rgba(11, 74, 81, 0.06)' : 'var(--bg-surface)',
                          border: isTagged ? '1.5px solid var(--teal-primary)' : '1px solid var(--border-subtle)',
                          boxShadow: isTagged ? 'var(--shadow-raised-sm)' : 'none',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={char.portrait}
                            alt=""
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1.5px solid var(--teal-subtle)', flexShrink: 0 }}
                          />
                          <div style={{ flex: 1, overflow: 'hidden' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
                              <strong style={{ fontSize: '0.84rem', color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {char.name}
                              </strong>
                              {isTagged ? (
                                <span className="badge badge-teal" style={{ fontSize: '0.62rem', padding: '1px 6px', display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                                  <Check size={9} strokeWidth={2.5} />
                                  <span>ในฉาก AI</span>
                                </span>
                              ) : (
                                <span className="badge badge-sand" style={{ fontSize: '0.62rem', padding: '1px 6px' }}>
                                  นอกฉาก
                                </span>
                              )}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {char.role}
                            </div>
                          </div>
                        </div>

                        {char.actingStyle && (
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-dim)', background: 'var(--bg-inset)', padding: '4px 8px', borderRadius: 'var(--radius-sm)', lineHeight: 1.35 }}>
                            <strong style={{ color: 'var(--text-main)' }}>บุคลิกการแสดง:</strong> {char.actingStyle}
                          </div>
                        )}

                        {char.voiceProfile?.tone && (
                          <div style={{ fontSize: '0.68rem', color: 'var(--teal-primary)', background: 'rgba(11, 74, 81, 0.08)', padding: '3px 8px', borderRadius: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Volume2 size={11} strokeWidth={2} />
                            <span><strong>น้ำเสียง:</strong> {char.voiceProfile.tone}</span>
                          </div>
                        )}

                        <div style={{ display: 'flex', gap: '6px', marginTop: '2px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleCharacterTag(char.id)}
                            style={{
                              flex: 1,
                              padding: '5px 8px',
                              borderRadius: 'var(--radius-pill)',
                              background: isTagged ? 'var(--teal-primary)' : 'var(--bg-inset)',
                              color: isTagged ? '#FFFFFF' : 'var(--text-main)',
                              border: isTagged ? 'none' : '1px solid var(--border-subtle)',
                              fontSize: '0.7rem',
                              fontWeight: 600,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '3px'
                            }}
                          >
                            {isTagged ? <Check size={11} strokeWidth={3} /> : <Plus size={11} strokeWidth={2} />}
                            <span>{isTagged ? 'อยู่ในฉาก AI' : 'แท็กเข้า AI'}</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => insertCharacterDialogue(char)}
                            style={{
                              flex: 1,
                              padding: '5px 8px',
                              borderRadius: 'var(--radius-pill)',
                              background: 'var(--bg-surface)',
                              border: '1px solid var(--teal-primary)',
                              color: 'var(--teal-primary)',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '3px'
                            }}
                            title="แทรกบล็อกบทพูดพร้อมชื่อตัวละครลงในหน้าเอกสาร"
                          >
                            <Quote size={11} strokeWidth={2} />
                            <span>+ ใส่บทพูด</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: 'auto', paddingTop: '10px', borderTop: '1px solid var(--border-subtle)' }}>
                  <button
                    type="button"
                    onClick={() => setShowNewCharacterModal(true)}
                    className="btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
                  >
                    <Plus size={14} strokeWidth={2} />
                    <span>+ สร้างตัวละครใหม่ในเรื่องนี้</span>
                  </button>

                  {onOpenCharacterBible && (
                    <button
                      type="button"
                      onClick={onOpenCharacterBible}
                      className="btn-secondary"
                      style={{ width: '100%', justifyContent: 'center', fontSize: '0.74rem', color: 'var(--teal-primary)' }}
                    >
                      <ExternalLink size={12} strokeWidth={2} />
                      <span>เปิดดู Character Bible เต็มระบบ</span>
                    </button>
                  )}
                </div>

              </div>
            )}

          </div>
        )}

      </div>

      {/* ========================================================
          MODAL: CREATE NEW CHARACTER FOR THIS SPECIFIC SERIES
         ======================================================== */}
      {showNewCharacterModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div
            onClick={() => setShowNewCharacterModal(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(25, 20, 15, 0.6)',
              backdropFilter: 'blur(3px)'
            }}
          />
          <div className="clay-card" style={{
            position: 'relative',
            zIndex: 1,
            background: '#FFFFFF',
            maxWidth: '520px',
            width: '100%',
            padding: '24px',
            boxShadow: '0 24px 60px rgba(0,0,0,0.25)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={18} strokeWidth={2} color="var(--teal-primary)" />
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-main)' }}>
                  สร้างตัวละครใหม่ในเรื่อง: {safeSeries.title || 'นิยาย'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewCharacterModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <p style={{ margin: '0 0 14px 0', fontSize: '0.74rem', color: 'var(--text-muted)' }}>
              ตัวละครที่สร้างขึ้นนี้จะถูกบันทึก<strong>เฉพาะในเรื่องนี้เท่านั้น</strong> และจะซิงค์ไปยังหน้า <strong>Casting & Character Bible</strong> โดยอัตโนมัติ เพื่อตั้งค่าหน้าตา เสียง และท่าทางต่อไป
            </p>

            <form onSubmit={handleCreateNewCharacter} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>
                  ชื่อตัวละคร (เช่น ผู้การชัยวัฒน์, เลขาพิมพ์ชนก): *
                </label>
                <input
                  type="text"
                  value={newCharName}
                  onChange={(e) => setNewCharName(e.target.value)}
                  placeholder="ระบุชื่อตัวละคร..."
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '8px 12px' }}
                  autoFocus
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>
                  บทบาทในเรื่อง (Role):
                </label>
                <input
                  type="text"
                  value={newCharRole}
                  onChange={(e) => setNewCharRole(e.target.value)}
                  placeholder="เช่น หัวหน้าตำรวจสายสืบสวน, พยานปากเอก, ทายาทตระกูลศัตรู..."
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '8px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>
                  ลักษณะนิสัย / อารมณ์เด่น:
                </label>
                <input
                  type="text"
                  value={newCharTraits}
                  onChange={(e) => setNewCharTraits(e.target.value)}
                  placeholder="เช่น สุขุม เยือกเย็น แววตาดุดัน ซ่อนความลับบางอย่าง..."
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '8px 12px' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '3px' }}>
                  โทนเสียง / สไตล์การพูด (Voice):
                </label>
                <input
                  type="text"
                  value={newCharVoice}
                  onChange={(e) => setNewCharVoice(e.target.value)}
                  placeholder="เช่น เสียงแหบทุ้ม พูดช้าแต่ทรงอำนาจ..."
                  className="clay-input"
                  style={{ width: '100%', fontSize: '0.82rem', padding: '8px 12px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowNewCharacterModal(false)}
                  className="btn-secondary"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={!newCharName.trim()}
                >
                  <Plus size={14} strokeWidth={2} />
                  <span>บันทึกตัวละครเข้าเรื่องนี้</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AI EPISODE & CHAPTER BREAKDOWN STUDIO */}
      {showAiSplitModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div
            onClick={() => setShowAiSplitModal(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(25, 20, 15, 0.6)',
              backdropFilter: 'blur(3px)'
            }}
          />
          <div className="clay-card" style={{
            position: 'relative',
            zIndex: 1,
            background: '#FFFFFF',
            maxWidth: '720px',
            width: '100%',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            padding: '26px',
            overflow: 'hidden',
            boxShadow: '0 24px 60px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--teal-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                  <Split size={18} strokeWidth={2} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 800, color: 'var(--text-main)' }}>
                    AI ช่วยแบ่งตอน & วางจังหวะซีรีส์แนวตั้ง (AI Episode Outliner)
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    คำนวณจุดตัด 3-Second Hook และ Cliffhanger ท้ายตอนตามสูตรซีรีส์แนวตั้งยอดนิยม
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowAiSplitModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', padding: '4px' }}
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px', background: 'var(--bg-inset)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>ประเภทผลงาน:</label>
                <select
                  value={splitFormat}
                  onChange={(e) => setSplitFormat(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                >
                  <option value="vertical">ซีรีส์แนวตั้ง 9:16 (60-90 วินาที)</option>
                  <option value="webnovel">เว็บนิยายรายตอน (1,500-2,500 คำ)</option>
                  <option value="scenes">แบ่งฉากย่อยในบทนี้</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>จำนวนตอนเป้าหมาย:</label>
                <select
                  value={targetSplitCount}
                  onChange={(e) => setTargetSplitCount(Number(e.target.value))}
                  style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                >
                  <option value={3}>3 ตอนย่อย</option>
                  <option value={5}>5 ตอนย่อย</option>
                  <option value={8}>8 ตอนย่อย</option>
                  <option value={10}>10 ตอนย่อย</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-dim)', display: 'block', marginBottom: '4px' }}>ความแรง Cliffhanger:</label>
                <select
                  value={splitPacing}
                  onChange={(e) => setSplitPacing(e.target.value)}
                  style={{ width: '100%', padding: '6px', fontSize: '0.75rem', borderRadius: '6px', border: '1px solid var(--border-subtle)', background: 'var(--bg-surface)' }}
                >
                  <option value="high-hook">ระดับ 10: ตัดอารมณ์ค้างสูงสุด</option>
                  <option value="emotional">ระดับ 8: บีบคั้นหัวใจ</option>
                  <option value="mystery">ระดับ 7: เปิดปมปริศนาใหม่</option>
                </select>
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '6px', marginBottom: '16px' }}>
              {isAnalyzingSplit ? (
                <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--teal-primary)' }}>
                  <RefreshCw size={28} className="animate-spin" style={{ margin: '0 auto 12px auto' }} />
                  <div style={{ fontSize: '0.88rem', fontWeight: 700 }}>AI กำลังศึกษาจังหวะเนื้อเรื่องและวางจุดตัดตอน...</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '4px' }}>กำลังค้นหา 3-Second Hook และ Cliffhanger ที่กระชากอารมณ์ที่สุด</div>
                </div>
              ) : splitResults.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-dim)' }}>
                  <Split size={32} style={{ margin: '0 auto 8px auto', opacity: 0.4 }} />
                  <div>กดปุ่ม "ประมวลผลการแบ่งตอน" ด้านล่างเพื่อให้ AI ช่วยวางโครงสร้าง</div>
                </div>
              ) : (
                splitResults.map((ep) => (
                  <div
                    key={ep.epNumber}
                    style={{
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      padding: '12px 16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <strong style={{ fontSize: '0.88rem', color: 'var(--teal-primary)' }}>{ep.title}</strong>
                      <span className="badge badge-sand" style={{ fontSize: '0.68rem' }}>
                        ความยาวประมาณ: {ep.estDuration} ({ep.estWords.toLocaleString()} คำ)
                      </span>
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                      <strong style={{ color: 'var(--accent-amber)' }}>3-Second Hook:</strong> {ep.hook}
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--text-main)', lineHeight: 1.4 }}>
                      <strong style={{ color: 'var(--text-muted)' }}>ปมหลักประจำตอน:</strong> {ep.conflict}
                    </div>

                    <div style={{ fontSize: '0.76rem', color: 'var(--accent-red)', lineHeight: 1.4, background: 'var(--accent-red-bg)', padding: '4px 8px', borderRadius: '4px' }}>
                      <strong>จุดตัด Cliffhanger ท้ายตอน:</strong> {ep.cliffhanger}
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', flexWrap: 'wrap', gap: '8px' }}>
              <button
                type="button"
                onClick={handleGenerateEpisodeSplit}
                disabled={isAnalyzingSplit}
                className="btn-secondary"
                style={{ fontSize: '0.78rem' }}
              >
                <RefreshCw size={13} strokeWidth={2} />
                <span>วิเคราะห์ใหม่อีกครั้ง</span>
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleInsertCutMarkersToDoc}
                  disabled={!splitResults.length}
                  className="btn-secondary"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Scissors size={14} strokeWidth={2} />
                  <span>แทรกจุดตัดลงในเอกสาร</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplySplitToChapters}
                  disabled={!splitResults.length}
                  className="btn-primary"
                  style={{ fontSize: '0.78rem' }}
                >
                  <Plus size={14} strokeWidth={2} />
                  <span>สร้างตอนใหม่ในสารบัญทันที</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: ADD VOLUME */}
      {showAddVolumeModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div
            onClick={() => setShowAddVolumeModal(false)}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(30, 25, 20, 0.45)',
              backdropFilter: 'blur(3px)'
            }}
          />
          <div className="clay-card" style={{ position: 'relative', zIndex: 1, background: '#FFFFFF', maxWidth: '420px', width: '100%', padding: '24px' }}>
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

      {/* ADD CHARACTER MODAL (OPENROUTER AI) */}
      <AddCharacterModal
        isOpen={showNewCharacterModal}
        onClose={() => setShowNewCharacterModal(false)}
        series={series}
        onSaveCharacter={handleSaveNewCharacter}
      />

      {/* AUTO SPEAKER & SCREENPLAY CONVERSION MODAL */}
      <AutoSpeakerScriptModal
        isOpen={showAutoSpeakerModal}
        onClose={() => setShowAutoSpeakerModal(false)}
        analysisData={autoSpeakerAnalysis}
        characters={currentCharacters}
        series={safeSeries}
        originalText={editorRef.current ? editorRef.current.innerText : (currentChapter.content || '')}
        onApplyScreenplay={(shots) => {
          if (onConvertToScreenplay) {
            onConvertToScreenplay(currentChapter, shots);
          }
        }}
        onApplyToNovel={(formattedText) => {
          if (editorRef.current) {
            const formattedHtml = formatTextToHtml(formattedText);
            editorRef.current.innerHTML = formattedHtml;
            handleEditorInput();
            setAiNotice('แทรกป้ายชื่อตัวละคร @ เข้าสู่เนื้อหานิยายเรียบร้อยแล้ว');
            setTimeout(() => setAiNotice(''), 3500);
          }
        }}
      />

    </div>
  );
}
