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
  const [activeSeriesId, setActiveSeriesId] = useState(initialSeriesList[0].id);
  const [activeTab, setActiveTab] = useState('writers');
  const [writersSubTab, setWritersSubTab] = useState('novel');
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

  const handleDeleteSeries = (deletedId) => {
    if (seriesList.length <= 1) {
      alert('ไม่สามารถลบซีรีส์เรื่องสุดท้ายในระบบได้');
      return;
    }
    const remaining = seriesList.filter(s => s.id !== deletedId);
    setSeriesList(remaining);
    setActiveSeriesId(remaining[0].id);
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
            activeSeries={activeSeries}
            onSelectSeries={handleSelectSeries}
            onAddSeries={handleAddSeries}
            onUpdateSeries={handleUpdateSeries}
            onDeleteSeries={handleDeleteSeries}
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
