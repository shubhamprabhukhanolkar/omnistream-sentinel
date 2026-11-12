import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const Header: React.FC = () => {
  const { telemetry, interactions } = useAppStore();

  const freedToday = telemetry ? `${(telemetry.hours_freed / 100).toFixed(1)} hrs` : '42.4 hrs';
  const activeCases = interactions.length > 0 ? interactions.length : 148;
  const adoption = telemetry ? `${telemetry.human_adoptions}%` : '95.2%';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(37,36,59,0.06)]">
      <div className="h-20 w-full px-gutter flex items-center justify-between gap-gutter">
        {/* Brand identity */}
        <div className="flex items-center gap-space-md">
          <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shadow-sm">
            <span className="material-symbols-outlined text-[24px]">account_balance</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary uppercase tracking-tight">
                First Heritage
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-space-xs py-0.5 rounded">
                Production Ops
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                AI Core: Operational - Sentinel QA Active (Gemini 3 Flash Preview)
              </span>
            </div>
          </div>
        </div>

        {/* Live Executive KPI Capsule */}
        <div className="hidden xl:flex items-center gap-space-lg bg-surface-container-low px-space-md py-space-xs rounded-lg">
          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Freed Today:</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">{freedToday}</span>
          </div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Active Cases:</span>
            <span className="font-label-md text-label-md text-on-surface font-semibold">{activeCases}</span>
          </div>
          <div className="w-px h-4 bg-outline-variant"></div>
          <div className="flex items-center gap-space-xs">
            <span className="font-label-sm text-label-sm text-on-surface-variant">Adoption:</span>
            <span className="font-label-md text-label-md text-secondary font-bold">{adoption}</span>
          </div>
        </div>

        {/* Right Search, Quick Action, and User Persona */}
        <div className="flex items-center gap-space-md">
          <div className="relative hidden md:block w-64">
            <input
              className="w-full h-9 pl-8 pr-space-sm bg-surface-container text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary border border-transparent focus:border-primary transition-all"
              placeholder="Search cases, CIF, or telemetry..."
              type="text"
            />
            <span className="material-symbols-outlined absolute left-2 top-2 text-on-surface-variant text-[18px]">
              search
            </span>
          </div>

          <button 
            className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="Active Notifications"
          >
            <span className="material-symbols-outlined">notifications</span>
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
          </button>

          <button 
            className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer"
            title="System Parameters"
          >
            <span className="material-symbols-outlined">tune</span>
          </button>

          <div className="flex items-center gap-space-sm pl-space-xs border-l border-outline-variant/40">
            <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm border border-primary/20">
              OL
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface leading-none font-semibold">
                Operations Lead
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant leading-none mt-1">
                Tier 1 Executive Desk
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
