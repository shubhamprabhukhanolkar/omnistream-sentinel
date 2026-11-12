import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { OmnichannelIntake } from './components/screens/OmnichannelIntake';
import { AiSummarizer } from './components/screens/AiSummarizer';
import { CriticAgentQa } from './components/screens/CriticAgentQa';
import { AgentWorkspace } from './components/screens/AgentWorkspace';
import { ShiftCapacityPlanner } from './components/screens/ShiftCapacityPlanner';
import { CfoDashboard } from './components/screens/CfoDashboard';

export const App: React.FC = () => {
  const { activeTab, toastMessage, clearToast, fetchInteractions, fetchTelemetry } = useAppStore();

  useEffect(() => {
    fetchInteractions();
    fetchTelemetry();
  }, [fetchInteractions, fetchTelemetry]);

  return (
    <div className="bg-background min-h-screen font-body-md text-on-surface antialiased flex flex-col">
      {/* Fixed Header */}
      <Header />

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Screen Body with exact pl-64 top pt-20 padding from design files */}
      <div className="pl-64 w-full flex-1">
        <main className="pt-20 w-full min-h-screen bg-background">
          {activeTab === 'omnichannel-intake' && <OmnichannelIntake />}
          {activeTab === 'drafter-agent' && <AiSummarizer />}
          {activeTab === 'sentinel-critic' && <CriticAgentQa />}
          {activeTab === 'agent-workspace' && <AgentWorkspace />}
          {activeTab === 'shift-capacity' && <ShiftCapacityPlanner />}
          {activeTab === 'cfo-financials' && <CfoDashboard />}
        </main>
      </div>

      {/* Toast Notification Shelf */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
          <div className="bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-lg shadow-lg flex items-center gap-space-sm font-label-md text-label-md pointer-events-auto border border-outline-variant/30 animate-bounce">
            <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
            <span>{toastMessage}</span>
            <button
              onClick={clearToast}
              className="ml-2 text-inverse-on-surface hover:text-white cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">close</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
