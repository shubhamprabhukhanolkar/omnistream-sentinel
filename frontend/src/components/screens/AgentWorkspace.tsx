import React, { useState, useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';

export const AgentWorkspace: React.FC = () => {
  const { 
    selectedInteractionId, 
    interactions, 
    approveInteraction, 
    showToast 
  } = useAppStore();

  const [seconds, setSeconds] = useState(14);
  const [isDispatched, setIsDispatched] = useState(false);
  const [isDispatching, setIsDispatching] = useState(false);
  const [shiftProgress, setShiftProgress] = useState(82);

  // Live stopwatch counter
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60).toString().padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentCase = interactions.find(i => i.id === selectedInteractionId) || interactions[0] || {
    id: "FHF-88294",
    customer_name: "Rajesh Malhotra",
    customer_cif: "CIF-9041284"
  };

  const handleDispatch = async () => {
    setIsDispatching(true);
    await approveInteraction(currentCase.id);
    setTimeout(() => {
      setIsDispatching(false);
      setIsDispatched(true);
      setShiftProgress(84);
      showToast(`Case #${currentCase.id} Closed. Shadow credit ₹14,250 posted to ${currentCase.customer_name}.`);
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-gutter pb-space-xl max-w-[1540px] mx-auto">
      {/* Top Banner: Sentinel QA Verification Badge */}
      <div className="relative overflow-hidden bg-surface-container-lowest rounded-xl p-space-md shadow-sm mb-space-lg flex flex-col md:flex-row md:items-center justify-between gap-space-md border border-outline-variant/30">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
        
        <div className="flex items-center gap-space-md pl-space-xs">
          <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[24px]">verified</span>
          </div>
          <div>
            <div className="flex items-center gap-space-sm">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Verified & Locked by Sentinel QA
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded-full uppercase tracking-wider font-semibold">
                Audit Pass 99.8%
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Ready for single-click dispatch. Raw 4m 18s audio transcript compressed to standardized compliance schema.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-sm">
          <div className="flex items-center gap-space-xs bg-surface-container px-space-sm py-1.5 rounded-lg border border-outline-variant/20">
            <span className="material-symbols-outlined text-[18px] text-on-surface-variant">timer</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Review Time:</span>
            <span className="font-label-md text-label-md text-on-surface tabular-nums font-mono font-bold">
              {formatTime(seconds)}
            </span>
          </div>
          <div className="flex items-center gap-space-xs bg-surface-container-low px-space-sm py-1.5 rounded-lg text-primary font-label-md text-label-md font-bold">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            Priority Case #{currentCase.id}
          </div>
        </div>
      </div>

      {/* Main Grid Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Column: The Synthesized Structured Summary (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          {/* Primary Resolution Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden transition-all duration-300 border border-outline-variant/30">
            {/* Card Header with Burgundy Financial Accent */}
            <div className="h-1 bg-gradient-to-r from-primary via-primary-container to-secondary"></div>
            
            <div className="p-space-lg flex flex-col gap-space-md">
              <div className="flex items-start justify-between gap-space-sm">
                <div className="flex flex-col">
                  <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider mb-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">account_balance</span>
                    Retail UPI Disputed Settlement
                  </div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">
                    Immediate Shadow Credit Remediation
                  </h2>
                </div>
                <div className="flex items-center gap-space-xs bg-surface-container text-on-surface px-space-sm py-1 rounded-full font-label-md text-label-md shadow-sm border border-outline-variant/20">
                  <span className="material-symbols-outlined text-[16px] text-secondary">lock</span>
                  Payload Sealed
                </div>
              </div>

              {/* Structured Payload Ledger Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm bg-surface-container-low p-space-md rounded-lg border border-outline-variant/20">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Intent Classification</span>
                  <span className="font-label-md text-label-md text-on-surface mt-0.5 font-bold">UPI Double Debit</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Disputed Amount</span>
                  <span className="font-headline-sm text-headline-sm text-primary mt-0.5 font-bold">₹14,250.00</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Resolution SLA</span>
                  <span className="font-label-md text-label-md text-secondary mt-0.5 font-bold">T+2 Hrs (Express)</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Customer Sentiment</span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">72/100</span>
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Mellowed</span>
                  </div>
                </div>
              </div>

              {/* Synthetic Transcript Summary View */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  AI Executive Brief (Sentinelled)
                </span>
                <div className="bg-surface p-space-md rounded-lg font-body-sm text-body-sm text-on-surface flex flex-col gap-space-xs leading-relaxed border border-outline-variant/20">
                  <p>
                    <strong>Root Cause:</strong> Client attempted point-of-sale merchant transaction at Apollo Pharmacy Mumbai on 14-Oct 19:42 IST. Gateway timeout triggered dual deduction from Savings A/C ...9041 without settlement confirmation.
                  </p>
                  <p>
                    <strong>Pre-Approved Automated Action:</strong> Release shadow ledger reversal of ₹14,250.00 into client's primary account instantly via NPCI IMPS corridor. Merchant reconciliation routed to batch overnight clearing.
                  </p>
                </div>
              </div>

              {/* Policy & Regulatory Checklist */}
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Compliance Safeguards
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xs text-on-surface font-label-md text-label-md">
                  <div className="flex items-center gap-space-xs bg-surface-container-lowest p-2 rounded border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                    RBI Circular DPSS.CO.PD No.629/02.01 Compliant
                  </div>
                  <div className="flex items-center gap-space-xs bg-surface-container-lowest p-2 rounded border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[18px] text-secondary">check_circle</span>
                    Customer Verified via Biometric Mobile Banking
                  </div>
                </div>
              </div>

              {/* Primary Dispatch Button Section */}
              <div className="pt-space-sm flex flex-col sm:flex-row items-center gap-space-md">
                <button
                  onClick={handleDispatch}
                  disabled={isDispatching}
                  className={`w-full sm:flex-1 h-14 font-headline-sm text-headline-sm rounded-lg flex items-center justify-center gap-space-sm shadow-md transition-all duration-200 cursor-pointer font-bold ${
                    isDispatched
                      ? 'bg-secondary text-on-secondary'
                      : 'bg-tertiary-container hover:bg-tertiary text-on-tertiary active:scale-[0.99]'
                  }`}
                  id="dispatch-btn"
                >
                  <span className={`material-symbols-outlined text-[24px] ${isDispatching ? 'animate-spin' : ''}`}>
                    {isDispatching ? 'sync' : isDispatched ? 'verified' : 'task_alt'}
                  </span>
                  <span>
                    {isDispatching
                      ? 'Transmitting to Finacle & Closing...'
                      : isDispatched
                      ? 'Ticket Resolved & Dispatched!'
                      : 'Accept Summary & Close Ticket'}
                  </span>
                </button>

                <button
                  onClick={() => showToast("Note recorded in audit trail")}
                  className="w-full sm:w-auto px-space-md h-14 bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md rounded-lg flex items-center justify-center gap-space-xs transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  <span>Add Note</span>
                </button>
              </div>

              {/* Secondary Rapid Execution Bar */}
              <div className="pt-space-xs flex flex-wrap items-center justify-between gap-space-xs text-on-surface-variant border-t border-outline-variant/20">
                <div className="flex items-center gap-space-xs text-body-sm font-body-sm">
                  <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span>
                  Saves Anita ~3m 45s of transcript reading
                </div>
                <div className="flex items-center gap-space-sm">
                  <button
                    className="hover:text-primary transition-colors flex items-center gap-1 font-label-sm text-label-sm cursor-pointer"
                    onClick={() => showToast('Copied to Finacle CRM')}
                  >
                    <span className="material-symbols-outlined text-[16px]">content_copy</span> Finacle CRM
                  </button>
                  <span className="text-outline-variant">|</span>
                  <button
                    className="hover:text-primary transition-colors flex items-center gap-1 font-label-sm text-label-sm cursor-pointer"
                    onClick={() => showToast('SMS dispatched to registered mobile')}
                  >
                    <span className="material-symbols-outlined text-[16px]">sms</span> SMS Confirmation
                  </button>
                  <span className="text-outline-variant">|</span>
                  <button
                    className="hover:text-error transition-colors flex items-center gap-1 font-label-sm text-label-sm cursor-pointer"
                    onClick={() => showToast('Escalated to Tier 2 Head')}
                  >
                    <span className="material-symbols-outlined text-[16px]">flag</span> Escalate Tier 2
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Gamified Capacity Widget: Anita Sharma Velocity */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-9 h-9 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">electric_bolt</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Freed Capacity Tracker</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Real-time Human-in-the-Loop Efficiency Engine
                  </span>
                </div>
              </div>

              <div
                className={`px-space-sm py-1 rounded-full font-label-md text-label-md font-bold flex items-center gap-1 transition-all duration-300 ${
                  isDispatched ? 'bg-secondary text-on-secondary scale-105' : 'bg-surface-container-high text-secondary'
                }`}
                id="capacity-bump"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isDispatched ? 'celebration' : 'trending_up'}
                </span>
                {isDispatched ? '+60s Saved! Total: 1h 15m' : '+60s Logged on Dispatch'}
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between text-body-sm font-body-sm">
                <span className="text-on-surface">
                  <strong>Anita Sharma:</strong> 1 hr {isDispatched ? '15' : '14'} mins saved today
                </span>
                <span className="font-semibold text-primary">{isDispatched ? 75 : 74} tickets closed</span>
              </div>
              <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${shiftProgress}%` }}
                ></div>
              </div>
              <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant pt-1">
                <span>Shift Target: 90 Cases</span>
                <span>{shiftProgress}% Achieved • Shift Ends in 2h 45m</span>
              </div>
            </div>

            {/* Metric Sparkline Row */}
            <div className="grid grid-cols-3 gap-space-sm pt-space-xs">
              <div className="bg-surface p-space-sm rounded-lg flex flex-col border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Avg Handle Time</span>
                <span className="font-headline-sm text-headline-sm text-on-surface mt-1 font-semibold">48s</span>
                <span className="font-label-sm text-label-sm text-secondary flex items-center gap-0.5 font-bold">
                  -76% vs Manual
                </span>
              </div>
              <div className="bg-surface p-space-sm rounded-lg flex flex-col border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Accuracy Audit</span>
                <span className="font-headline-sm text-headline-sm text-on-surface mt-1 font-semibold">100%</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">0 Reversals Today</span>
              </div>
              <div className="bg-surface p-space-sm rounded-lg flex flex-col border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Team Rank</span>
                <span className="font-headline-sm text-headline-sm text-on-surface mt-1 font-semibold">#2</span>
                <span className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 font-semibold">
                  Top 5% Ops
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Customer 360 & Context Dossier (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          {/* Customer 360 Header Profile Card */}
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Customer 360 • {currentCase.customer_cif}
              </span>
              <span className="bg-primary/10 text-primary px-space-sm py-0.5 rounded-full font-label-md text-label-md flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[14px]">star</span>
                Privilege Tier
              </span>
            </div>

            <div className="flex items-center gap-space-md">
              <div className="relative">
                <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary font-bold text-xl border border-primary/20">
                  RM
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary rounded-full flex items-center justify-center ring-2 ring-surface-container-lowest">
                  <span className="material-symbols-outlined text-[10px] text-on-secondary font-bold">check</span>
                </div>
              </div>

              <div className="flex flex-col min-w-0">
                <h3 className="font-headline-sm text-headline-sm text-on-surface truncate font-bold">
                  {currentCase.customer_name}
                </h3>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  Director, Malhotra Logistics LLP
                </span>
                <div className="flex items-center gap-space-xs mt-1">
                  <span className="font-label-sm text-label-sm bg-surface-container text-on-surface px-1.5 py-0.5 rounded">
                    KYC Compliant
                  </span>
                  <span className="font-label-sm text-label-sm bg-surface-container text-on-surface px-1.5 py-0.5 rounded">
                    Branch: Nariman Point
                  </span>
                </div>
              </div>
            </div>

            {/* Relationship Wealth Gauge */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Total Relationship Value (TRV)
                </span>
                <span className="font-label-md text-label-md text-on-surface font-bold">12-Year Tenure</span>
              </div>
              <div className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
                ₹48,50,000
              </div>
              <div className="grid grid-cols-3 gap-2 pt-1 font-label-sm text-label-sm text-on-surface-variant">
                <div>CASA: <strong className="text-on-surface font-semibold">₹14.2L</strong></div>
                <div>Fixed Dep: <strong className="text-on-surface font-semibold">₹22.0L</strong></div>
                <div>Mutual F: <strong className="text-on-surface font-semibold">₹12.3L</strong></div>
              </div>
            </div>

            {/* Active Accounts & Holding Micro-list */}
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Associated Products
              </span>
              <div className="flex items-center justify-between p-space-sm bg-surface rounded-lg border border-outline-variant/10">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-primary">credit_card</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">
                      First Wealth Visa Infinite
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">Active • Limit ₹7,50,000</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Zero Default</span>
              </div>

              <div className="flex items-center justify-between p-space-sm bg-surface rounded-lg border border-outline-variant/10">
                <div className="flex items-center gap-space-sm">
                  <span className="material-symbols-outlined text-[20px] text-tertiary">home</span>
                  <div className="flex flex-col">
                    <span className="font-label-md text-label-md text-on-surface font-semibold">Priority Home Loan</span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">A/C ...8810 • Regular EMI</span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Auto-Debit On</span>
              </div>
            </div>

            {/* Recent Contact History Snapshot */}
            <div className="flex flex-col gap-space-xs pt-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                Interaction Touchpoints (Last 30 Days)
              </span>
              <div className="flex flex-col gap-2 font-body-sm text-body-sm">
                <div className="flex items-start gap-space-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-label-sm font-label-sm">
                      <span className="text-on-surface font-semibold">Inbound IVR → Transferred</span>
                      <span className="text-on-surface-variant font-mono">Today 19:44</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm">
                      Caller frustrated regarding UPI debit at pharmacy. AI voice bot deflected and queued.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-space-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-surface-dim mt-2"></div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center text-label-sm font-label-sm">
                      <span className="text-on-surface font-semibold">Branch Visit • Nariman Point</span>
                      <span className="text-on-surface-variant font-mono">02 Oct 2024</span>
                    </div>
                    <p className="text-on-surface-variant text-body-sm">
                      Met RM for commercial Forex credit line renewal.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick AI Transcript Inspector Tray */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-outline-variant/30">
            <details className="group cursor-pointer">
              <summary className="flex items-center justify-between font-label-md text-label-md text-on-surface select-none list-none font-semibold">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">transcribe</span>
                  Raw Transcript & Waveform (4m 18s)
                </span>
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant transition-transform group-open:rotate-180">
                  expand_more
                </span>
              </summary>
              <div className="pt-space-md flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                <div className="bg-surface-container-low p-space-sm rounded font-mono text-[12px] leading-relaxed max-h-36 overflow-y-auto border border-outline-variant/20">
                  [00:03] CUST: "Hello? I just tried paying ₹14,250 at Apollo Pharmacy through UPI and it failed, but money got deducted from my First Heritage account immediately!"<br />
                  [00:24] BOT: "I understand Mr. Malhotra. Let me instantly trace the NPCI RRN reference for this debit..."<br />
                  [01:15] CUST: "I am standing at the counter and need this resolved now."<br />
                  [02:40] BOT: "Verified. Initiating automated shadow credit under token RFC-491..."
                </div>
                <div className="flex items-center justify-between text-label-sm font-label-sm border-t border-outline-variant/20 pt-1">
                  <span>Speech-to-Text Confidence: 99.4%</span>
                  <span className="text-secondary font-semibold">Acoustic Stress Index: Low</span>
                </div>
              </div>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
};
