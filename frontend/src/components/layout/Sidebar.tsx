import React from 'react';
import { useAppStore, type PipelineStage } from '../../store/useAppStore';

interface NavItem {
  id: PipelineStage;
  label: string;
  icon: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { id: 'omnichannel-intake', label: '1. Omnichannel Intake', icon: 'hub' },
  { id: 'drafter-agent', label: '2. Drafter Agent', icon: 'smart_toy' },
  { id: 'sentinel-critic', label: '3. Sentinel Critic', icon: 'gavel', badge: '100% QA' },
  { id: 'agent-workspace', label: '4. Agent Workspace', icon: 'desktop_windows' },
  { id: 'shift-capacity', label: '5. Shift & Capacity', icon: 'groups' },
  { id: 'cfo-financials', label: '6. CFO Financials', icon: 'account_balance' },
];

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, pipelineStatus } = useAppStore();

  return (
    <aside className="fixed left-0 top-20 bottom-0 w-64 bg-surface-container-lowest shadow-[0_1px_8px_rgba(37,36,59,0.04)] z-40 flex flex-col justify-between py-space-md border-r border-outline-variant/30">
      <div className="flex flex-col gap-space-xs px-space-sm">
        <div className="px-space-sm py-space-xs font-label-sm text-label-sm text-on-surface-variant tracking-wider uppercase font-semibold">
          Pipeline Stages
        </div>
        <nav className="flex flex-col gap-space-xs">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center justify-between px-space-sm py-2 rounded-lg transition-all cursor-pointer text-left w-full ${
                  isActive
                    ? 'bg-primary-container text-on-primary font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                }`}
              >
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span className="font-label-md text-label-md">{item.label}</span>
                </div>
                {item.badge && !isActive && (
                  <span className="font-label-sm text-[10px] px-1.5 py-0.2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                    {item.badge}
                  </span>
                )}
                {pipelineStatus !== 'idle' && item.id === 'sentinel-critic' && (
                  <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="px-space-sm">
        <div className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-space-xs border border-outline-variant/20">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">SLA Health</span>
            <span className="font-label-sm text-label-sm text-secondary font-bold">99.8%</span>
          </div>
          <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
            <div className="bg-secondary h-full w-[99.8%]"></div>
          </div>
          <div className="flex items-center justify-between pt-space-xs text-on-surface-variant font-label-sm text-label-sm">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
              Sync Live
            </span>
            <span>v4.12 Enterprise</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
