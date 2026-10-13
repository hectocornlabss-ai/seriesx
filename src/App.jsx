import React, { useState } from 'react';
import Header from './components/Header';
import WritersRoomTab from './components/WritersRoomTab';
import CharacterBibleTab from './components/CharacterBibleTab';
import ArtSponsorTab from './components/ArtSponsorTab';
import GenerationPipelineTab from './components/GenerationPipelineTab';
import DualQAGateTab from './components/DualQAGateTab';
import PitchDeckTab from './components/PitchDeckTab';
import { initialSeriesList } from './data/mockProductionData';
import './App.css';

export default function App() {
  const [seriesList, setSeriesList] = useState(initialSeriesList);
  const [trashList, setTrashList] = useState([]);
  const [activeSeriesId, setActiveSeriesId] = useState(initialSeriesList[0].id);
  const [activeTab, setActiveTab] = useState('writers');
  const [writersSubTab, setWritersSubTab] = useState('shelf');
  const [isApproved, setIsApproved] = useState(false);

  const activeSeries = seriesList.find(s => s.id === activeSeriesId) || seriesList[0];

  const handleGoHome = () => {
    setActiveTab('writers');
    setWritersSubTab('shelf');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSeries = (id) => {
    setActiveSeriesId(id);
    setIsApproved(false);
  };

  const handleAddSeries = (newSeries) => {
    setSeriesList([newSeries, ...seriesList]);
    setActiveSeriesId(newSeries.id);
  };

  const handleUpdateSeries = (updatedSeries) => {
    setSeriesList(prev => prev.map(s => s.id === updatedSeries.id ? updatedSeries : s));
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
      {/* Header with Navigation and Active Series Title */}
      <Header
        activeSeries={activeSeries}
        seriesList={seriesList}
        onSelectSeries={handleSelectSeries}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportPitchDeck={() => setActiveTab('pitch')}
        qaStatus={isApproved ? 'APPROVED' : 'REVIEW'}
        onGoHome={handleGoHome}
      />

      {/* Main Studio Viewport */}
      <main className="studio-container animate-fade-in" key={`${activeTab}-${activeSeries.id}`}>
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
            onOpenCharacterBible={() => setActiveTab('character')}
            activeSubTab={writersSubTab}
            onSubTabChange={setWritersSubTab}
            onGoHome={handleGoHome}
          />
        )}

        {activeTab === 'character' && (
          <CharacterBibleTab
            characters={activeSeries.characters}
          />
        )}

        {activeTab === 'art' && (
          <ArtSponsorTab
            sponsorProduct={activeSeries.sponsorProduct}
          />
        )}

        {activeTab === 'pipeline' && (
          <GenerationPipelineTab
            shots={activeSeries.shots}
            characters={activeSeries.characters}
          />
        )}

        {activeTab === 'qa' && (
          <DualQAGateTab
            qaReport={activeSeries.qaReport}
            onDirectorApprove={handleDirectorApprove}
            isApproved={isApproved}
          />
        )}

        {activeTab === 'pitch' && (
          <PitchDeckTab
            project={activeSeries}
            characters={activeSeries.characters}
            sponsorProduct={activeSeries.sponsorProduct}
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
            <strong style={{ color: 'var(--teal-primary)' }}>SeriesX Studio 2.0</strong> — Multi-Series AI Production Platform ({seriesList.length} Active Series)
          </div>
          <div style={{ display: 'flex', gap: '16px', color: 'var(--text-dim)' }}>
            <span>9:16 UHD Vertical</span>
            <span>Multi-Story CRUD</span>
            <span>Book Cover Visuals</span>
            <span>Dual QA Gateway</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
