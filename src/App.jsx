import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import WritersRoomTab from './components/WritersRoomTab';
import CharacterBibleTab from './components/CharacterBibleTab';
import ArtSponsorTab from './components/ArtSponsorTab';
import GenerationPipelineTab from './components/GenerationPipelineTab';
import DualQAGateTab from './components/DualQAGateTab';
import PitchDeckTab from './components/PitchDeckTab';
import StudioSettingsModal from './components/StudioSettingsModal';
import { initialSeriesList } from './data/mockProductionData';
import { usePathRouter } from './utils/router';
import './App.css';

const STORAGE_KEY_SERIES = 'seriesx_projects_v2';
const STORAGE_KEY_TRASH = 'seriesx_trash_v2';

function loadInitialSeriesList() {
  if (typeof window === 'undefined') return initialSeriesList;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_SERIES);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load series list from localStorage', e);
  }
  return initialSeriesList;
}

function loadInitialTrashList() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TRASH);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn('Failed to load trash list from localStorage', e);
  }
  return [];
}

export default function App() {
  const { path, searchParams, navigate } = usePathRouter();
  const [seriesList, setSeriesList] = useState(loadInitialSeriesList);
  const [trashList, setTrashList] = useState(loadInitialTrashList);
  const [showSettings, setShowSettings] = useState(false);

  // Auto-save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SERIES, JSON.stringify(seriesList));
    } catch (e) {
      console.warn('Failed to persist seriesList', e);
    }
  }, [seriesList]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRASH, JSON.stringify(trashList));
    } catch (e) {
      console.warn('Failed to persist trashList', e);
    }
  }, [trashList]);

  // Read initial series from URL query ?id=... or fallback to first series
  const querySeriesId = searchParams.get('id');
  const initialId = querySeriesId && (seriesList.some(s => s.id === querySeriesId) || initialSeriesList.some(s => s.id === querySeriesId))
    ? querySeriesId
    : (seriesList[0]?.id || initialSeriesList[0]?.id || 'series-001');

  const [activeSeriesId, setActiveSeriesId] = useState(initialId);
  const [isApproved, setIsApproved] = useState(false);

  // Synchronize activeSeriesId if URL ?id=... changes (e.g. popstate back/forward or direct navigation)
  useEffect(() => {
    const urlId = searchParams.get('id');
    if (urlId && seriesList.some(s => s.id === urlId) && urlId !== activeSeriesId) {
      setActiveSeriesId(urlId);
    }
  }, [searchParams, seriesList, activeSeriesId]);

  const activeSeries = seriesList.find(s => s.id === activeSeriesId) || seriesList[0] || initialSeriesList[0] || {};

  // Map path to active tab and subTab
  let activeTab = 'writers';
  let writersSubTab = 'shelf';

  if (path === '/novel') {
    activeTab = 'writers';
    writersSubTab = 'novel';
  } else if (path === '/structure') {
    activeTab = 'writers';
    writersSubTab = 'structure';
  } else if (path === '/new-series') {
    activeTab = 'writers';
    writersSubTab = 'new-series';
  } else if (path === '/screenplay') {
    activeTab = 'writers';
    writersSubTab = 'screenplay';
  } else if (path === '/characters' || path === '/character' || path === '/casting' || path === '/character-edit' || path === '/character-new') {
    activeTab = 'character';
  } else if (path === '/art' || path === '/art-edit' || path === '/art-new' || path === '/sponsor-edit' || path === '/sponsor-new') {
    activeTab = 'art';
  } else if (path === '/pipeline') {
    activeTab = 'pipeline';
  } else if (path === '/qa') {
    activeTab = 'qa';
  } else if (path === '/pitch') {
    activeTab = 'pitch';
  } else {
    // Default: '/' or '/shelf'
    activeTab = 'writers';
    writersSubTab = 'shelf';
  }

  const handleGoHome = () => {
    navigate('/');
  };

  const handleSelectSeries = (id) => {
    setActiveSeriesId(id);
    setIsApproved(false);
    // If currently on a series-scoped route, update the URL query
    if (['/novel', '/structure', '/screenplay'].includes(path)) {
      navigate(path, { id });
    }
  };

  const handleAddSeries = (newSeries) => {
    setSeriesList([newSeries, ...seriesList]);
    setActiveSeriesId(newSeries.id);
    navigate('/novel', { id: newSeries.id });
  };

  const handleUpdateSeries = (updatedSeries) => {
    setSeriesList(prev => prev.map(s => s.id === updatedSeries.id ? updatedSeries : s));
  };

  const handleAddCharacterToActiveSeries = (newChar) => {
    const updatedSeries = {
      ...activeSeries,
      characters: [...(activeSeries.characters || []), newChar]
    };
    handleUpdateSeries(updatedSeries);
  };

  const handleUpdateCharacterInActiveSeries = (updatedChar) => {
    const updatedSeries = {
      ...activeSeries,
      characters: (activeSeries.characters || []).map(c => c.id === updatedChar.id ? updatedChar : c)
    };
    handleUpdateSeries(updatedSeries);
  };

  const handleDeleteCharacterFromActiveSeries = (charId) => {
    if ((activeSeries.characters || []).length <= 1) {
      alert('ไม่สามารถลบตัวละครสุดท้ายของเรื่องได้ ซีรีส์ต้องมีตัวละครอย่างน้อย 1 คน');
      return;
    }
    const target = (activeSeries.characters || []).find(c => c.id === charId);
    if (!confirm(`คุณต้องการลบตัวละคร "${target?.name || 'ตัวละครนี้'}" ออกจากซีรีส์จริงหรือไม่?`)) {
      return;
    }
    const updatedSeries = {
      ...activeSeries,
      characters: (activeSeries.characters || []).filter(c => c.id !== charId)
    };
    handleUpdateSeries(updatedSeries);
  };

  // Soft Delete: Move to Trash for 7 days
  const handleSoftDeleteSeries = (deletedId) => {
    if (seriesList.length <= 1) {
      alert('ไม่สามารถลบซีรีส์เรื่องสุดท้ายในระบบได้ กรุณาสร้างเรื่องใหม่ก่อนทำการลบ');
      return;
    }
    const target = seriesList.find(s => s.id === deletedId);
    if (!target) return;

    const now = new Date();
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const trashedItem = {
      ...target,
      deletedAt: now.toISOString(),
      expiresAt: expires.toISOString(),
      daysRemaining: 7,
      deletedDateFormatted: `${now.toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} ${now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })}`
    };

    setTrashList(prev => [trashedItem, ...prev]);
    const remaining = seriesList.filter(s => s.id !== deletedId);
    setSeriesList(remaining);
    if (activeSeriesId === deletedId && remaining.length > 0) {
      setActiveSeriesId(remaining[0].id);
    }
  };

  // Restore from Trash
  const handleRestoreSeries = (restoredId) => {
    const item = trashList.find(s => s.id === restoredId);
    if (!item) return;
    const { deletedAt, expiresAt, daysRemaining, deletedDateFormatted, ...cleanSeries } = item;
    setSeriesList(prev => [...prev, cleanSeries]);
    setTrashList(prev => prev.filter(s => s.id !== restoredId));
    setActiveSeriesId(cleanSeries.id);
  };

  // Permanent Delete
  const handlePermanentDeleteSeries = (permanentId) => {
    setTrashList(prev => prev.filter(s => s.id !== permanentId));
  };

  // Empty Trash
  const handleEmptyTrash = () => {
    setTrashList([]);
  };

  const handleDirectorApprove = () => {
    setIsApproved(true);
    setSeriesList(prev => prev.map(s => s.id === activeSeries.id ? {
      ...s,
      productionStatus: 'Director Approved (Ready for Master Release)'
    } : s));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-base)' }}>
      {/* Header with Navigation, URL Routing, and Active Series Title */}
      <Header
        activeSeries={activeSeries}
        seriesList={seriesList}
        onSelectSeries={handleSelectSeries}
        activeTab={activeTab}
        setActiveTab={(tabId) => {
          const sid = activeSeries?.id || 'series-001';
          if (tabId === 'writers') navigate('/');
          else if (tabId === 'character') navigate('/characters', { id: sid });
          else if (tabId === 'art') navigate('/art', { id: sid });
          else if (tabId === 'pipeline') navigate('/pipeline', { id: sid });
          else if (tabId === 'qa') navigate('/qa', { id: sid });
          else if (tabId === 'pitch') navigate('/pitch', { id: sid });
        }}
        onExportPitchDeck={() => navigate('/pitch', { id: activeSeries?.id || 'series-001' })}
        qaStatus={isApproved ? 'APPROVED' : 'REVIEW'}
        onGoHome={handleGoHome}
        currentPath={path}
        onNavigate={(route, params) => navigate(route, params)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Main Studio Viewport */}
      <main className="studio-container animate-fade-in" key={`${path}-${activeSeries?.id || 'default'}`}>
        {activeTab === 'writers' && (
          <WritersRoomTab
            seriesList={seriesList}
            trashList={trashList}
            activeSeries={activeSeries}
            onSelectSeries={handleSelectSeries}
            onAddSeries={handleAddSeries}
            onUpdateSeries={handleUpdateSeries}
            onDeleteSeries={handleSoftDeleteSeries}
            onRestoreSeries={handleRestoreSeries}
            onPermanentDeleteSeries={handlePermanentDeleteSeries}
            onEmptyTrash={handleEmptyTrash}
            onOpenCharacterBible={() => navigate('/characters', { id: activeSeries.id })}
            onAddCharacter={handleAddCharacterToActiveSeries}
            activeSubTab={writersSubTab}
            onSubTabChange={(sub) => {
              if (sub === 'novel') navigate('/novel', { id: activeSeries.id });
              else if (sub === 'structure') navigate('/structure', { id: activeSeries.id });
              else if (sub === 'new-series') navigate('/new-series');
              else if (sub === 'screenplay') navigate('/screenplay', { id: activeSeries.id });
              else navigate('/');
            }}
            onNavigate={(to, params) => navigate(to, params)}
            onGoHome={handleGoHome}
          />
        )}

        {activeTab === 'character' && (
          <CharacterBibleTab
            characters={activeSeries.characters || []}
            series={activeSeries}
            onAddCharacter={handleAddCharacterToActiveSeries}
            onUpdateCharacter={handleUpdateCharacterInActiveSeries}
            onDeleteCharacter={handleDeleteCharacterFromActiveSeries}
            currentPath={path}
            searchParams={searchParams}
            onNavigate={(route, params) => navigate(route, params)}
          />
        )}

        {activeTab === 'art' && (
          <ArtSponsorTab
            sponsorProduct={activeSeries.sponsorProduct}
            sponsorProducts={activeSeries.sponsorProducts || (activeSeries.sponsorProduct ? [activeSeries.sponsorProduct] : [])}
            series={activeSeries}
            onUpdateSeries={handleUpdateSeries}
            currentPath={path}
            searchParams={searchParams}
            onNavigate={(route, params) => navigate(route, params)}
          />
        )}

        {activeTab === 'pipeline' && (
          <GenerationPipelineTab
            shots={activeSeries.shots}
            characters={activeSeries.characters}
            series={activeSeries}
          />
        )}

        {activeTab === 'qa' && (
          <DualQAGateTab
            qaReport={activeSeries.qaReport}
            onDirectorApprove={handleDirectorApprove}
            isApproved={isApproved}
            series={activeSeries}
          />
        )}

        {activeTab === 'pitch' && (
          <PitchDeckTab
            project={activeSeries}
            characters={activeSeries.characters}
            sponsorProduct={activeSeries.sponsorProduct}
            sponsorProducts={activeSeries.sponsorProducts || (activeSeries.sponsorProduct ? [activeSeries.sponsorProduct] : [])}
            shots={activeSeries.shots}
          />
        )}
      </main>

      {/* Studio Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-surface)',
        boxShadow: '0 -2px 10px rgba(190, 180, 160, 0.1)',
        padding: '16px 24px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <strong style={{ color: 'var(--teal-primary)' }}>SeriesX Studio 2.0</strong> — Multi-Series AI Production Platform ({seriesList.length} Active Series) &bull; Route: <code style={{ background: 'var(--bg-inset)', padding: '2px 6px', borderRadius: '4px', color: 'var(--teal-primary)' }}>{path}</code>
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-dim)' }}>
            <span>9:16 UHD Vertical</span>
            <span>Multi-Story CRUD</span>
            <span>Book Cover Visuals</span>
            <span>Google Docs Novel Canvas</span>
          </div>
        </div>
      </footer>

      {/* Studio Settings Modal */}
      <StudioSettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        seriesList={seriesList}
        trashList={trashList}
        onImportData={(newSeries, newTrash) => {
          setSeriesList(newSeries);
          setTrashList(newTrash);
          if (newSeries.length > 0) setActiveSeriesId(newSeries[0].id);
        }}
        onResetFactoryData={() => {
          setSeriesList(initialSeriesList);
          setTrashList([]);
          setActiveSeriesId(initialSeriesList[0]?.id || 'series-001');
          localStorage.removeItem(STORAGE_KEY_SERIES);
          localStorage.removeItem(STORAGE_KEY_TRASH);
        }}
      />
    </div>
  );
}
