import React, { useState } from 'react';
import Header from './components/Header';
import WritersRoomTab from './components/WritersRoomTab';
import CharacterBibleTab from './components/CharacterBibleTab';
import ArtSponsorTab from './components/ArtSponsorTab';
import GenerationPipelineTab from './components/GenerationPipelineTab';
import DualQAGateTab from './components/DualQAGateTab';
import PitchDeckTab from './components/PitchDeckTab';
import { initialProductionData } from './data/mockProductionData';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('writers');
  const [projectData, setProjectData] = useState(initialProductionData);
  const [isApproved, setIsApproved] = useState(false);

  const handleDirectorApprove = () => {
    setIsApproved(true);
    setProjectData(prev => ({
      ...prev,
      project: {
        ...prev.project,
        productionStatus: 'Director Approved (Ready for Master Release)'
      }
    }));
  };

  const handleUpdateShots = (newShots) => {
    setProjectData(prev => ({
      ...prev,
      shots: newShots
    }));
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--bg-primary)' }}>
      {/* Header with Navigation and Studio Status */}
      <Header
        project={projectData.project}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onExportPitchDeck={() => setActiveTab('pitch')}
        qaStatus={isApproved ? 'APPROVED' : 'REVIEW'}
      />

      {/* Main Studio Viewport */}
      <main className="studio-container animate-fade-in" key={activeTab}>
        {activeTab === 'writers' && (
          <WritersRoomTab
            project={projectData.project}
            shots={projectData.shots}
            onUpdateShots={handleUpdateShots}
          />
        )}

        {activeTab === 'character' && (
          <CharacterBibleTab
            characters={projectData.characters}
          />
        )}

        {activeTab === 'art' && (
          <ArtSponsorTab
            sponsorProduct={projectData.sponsorProduct}
          />
        )}

        {activeTab === 'pipeline' && (
          <GenerationPipelineTab
            shots={projectData.shots}
            characters={projectData.characters}
          />
        )}

        {activeTab === 'qa' && (
          <DualQAGateTab
            qaReport={projectData.qaReport}
            onDirectorApprove={handleDirectorApprove}
            isApproved={isApproved}
          />
        )}

        {activeTab === 'pitch' && (
          <PitchDeckTab
            project={projectData.project}
            characters={projectData.characters}
            sponsorProduct={projectData.sponsorProduct}
            shots={projectData.shots}
          />
        )}
      </main>

      {/* Studio Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(8, 9, 13, 0.95)',
        padding: '16px 24px',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-dim)'
      }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <strong>SeriesX Studio 2.0</strong> — End-to-End Vertical Drama AI Production Platform
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>9:16 UHD Pipeline</span>
            <span>Character Face-Lock Active</span>
            <span>Virtual Product Placement (VPP)</span>
            <span>Dual QA Gateway</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
