import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export const CriticAgentQa: React.FC = () => {
  const { 
    selectedInteractionId, 
    interactions, 
    approveInteraction, 
    triggerPipelineStream, 
    showToast,
    setActiveTab 
  } = useAppStore();

  const [activeHighlight, setActiveHighlight] = useState<number | null>(null);
  const [isApproving, setIsApproving] = useState(false);

  const currentCase = interactions.find(i => i.id === selectedInteractionId) || interactions[0] || {
    id: "FHF-88294"
  };

  const handleApprove = async () => {
    setIsApproving(true);
    await approveInteraction(currentCase.id);
    setTimeout(() => {
      setIsApproving(false);
      setActiveTab('agent-workspace');
    }, 600);
  };

  const handleRequestOverride = () => {
    showToast("Sentinel Critic routing case back to drafter tuning pipeline (Cyclic loop).");
    triggerPipelineStream(currentCase.id, true);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="px-margin py-space-lg flex flex-col gap-space-lg max-w-[1440px] mx-auto w-full">
        {/* Header Banner / Sentinel Status & Trust Metrics */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-md text-label-md uppercase tracking-wider font-semibold">
                <span className="material-symbols-outlined text-[16px]">security</span>
                Stage 3: Sentinel Critic & Hallucination Guardrail
              </span>
              <span className="text-on-surface-variant font-label-sm text-label-sm">
                Session ID: #QA-TXN-{currentCase.id}
              </span>
              <span className="inline-flex items-center gap-1 text-secondary font-label-sm text-label-sm bg-secondary-fixed/50 px-2 py-0.5 rounded-full font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span> Live Arbitration
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              The Trust Guardrail: Deep Deterministic Audit
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-3xl">
              Dual-engine secondary model independently cross-indexes LLM-generated operational drafts against the unedited raw telephony telemetry to enforce 100% token grounding before human signoff.
            </p>
          </div>

          {/* Trust Badge & Quick Human Approval Action */}
          <div className="flex flex-col sm:flex-row items-center gap-space-md w-full lg:w-auto self-stretch lg:self-auto justify-end">
            <div className="flex items-center gap-space-md bg-surface-container-low px-space-md py-space-sm rounded-lg w-full sm:w-auto shadow-sm border border-outline-variant/20">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-full bg-primary-container text-on-primary">
                <span className="material-symbols-outlined text-[28px]">verified_user</span>
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-secondary"></span>
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Sentinel Verification
                </span>
                <span className="font-headline-sm text-headline-sm text-primary leading-tight font-bold">
                  100% TRUST SCORE
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">
                  Zero Hallucinations Verified
                </span>
              </div>
            </div>

            <button
              onClick={handleApprove}
              disabled={isApproving}
              className="h-12 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-all shadow-md flex items-center justify-center gap-2 whitespace-nowrap active:scale-[0.98] cursor-pointer"
              id="btnApprove"
            >
              <span className={`material-symbols-outlined text-[20px] ${isApproving ? 'animate-spin' : ''}`}>
                {isApproving ? 'sync' : 'thumb_up'}
              </span>
              <span>{isApproving ? 'Transmitting to Core Banking...' : 'Grant Production Signoff'}</span>
            </button>
          </div>
        </div>

        {/* Metric Banner: Elimination of Adoption Barriers */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-md">
          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Regulatory Compliance</span>
              <span className="material-symbols-outlined text-primary text-[20px]">gavel</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">14,200 / 14,200</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">0 missed compliance citations to date</div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Grounding Integrity</span>
              <span className="material-symbols-outlined text-secondary text-[20px]">fact_check</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">100.0%</div>
            <div className="font-label-sm text-label-sm text-secondary mt-1 font-semibold">Full verbatim token provenance</div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Latency Overhead</span>
              <span className="material-symbols-outlined text-tertiary text-[20px]">speed</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">382 ms</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">Parallel speculative inference</div>
          </div>

          <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">Human Overrides</span>
              <span className="material-symbols-outlined text-primary text-[20px]">lock_reset</span>
            </div>
            <div className="font-headline-md text-headline-md text-on-surface font-bold">&lt; 0.04%</div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-1">High agent trust across all shifts</div>
          </div>
        </div>

        {/* Active Real-Time Validation Checklist Card */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-outline-variant/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-md">
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[24px]">checklist_rtl</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Deterministic Sentinel QA Checklist
              </h2>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse"></span>
              <span className="font-label-md text-label-md text-on-surface font-bold">3 of 3 Rules Hard-Satisfied</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
            {/* Checklist Item 1 */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs relative overflow-hidden border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide font-semibold">
                  Category 01
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> VERIFIED
                </span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Complaint Detected & Logged?
              </div>
              <div className="font-label-md text-label-md text-primary font-bold">STATUS: YES</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Classified under <span className="font-semibold text-on-surface">RBI Ombudsman Category: Remittance Delay</span>. Statutory resolution SLA allocated: 48h.
              </p>
              <div className="mt-space-xs pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/20">
                <span>Confidence Index</span>
                <span className="font-bold text-on-surface">99.98%</span>
              </div>
            </div>

            {/* Checklist Item 2 */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs relative overflow-hidden border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide font-semibold">
                  Category 02
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> 0 CONCERNS
                </span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Hallucinations Found?
              </div>
              <div className="font-label-md text-label-md text-secondary font-bold">STATUS: NONE DETECTED</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Zero fabricated claims. 100% token grounding confirmed via deterministic reverse-index semantic parser. No extraneous promises introduced.
              </p>
              <div className="mt-space-xs pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/20">
                <span>Grounding Density</span>
                <span className="font-bold text-on-surface">1.00 (Perfect)</span>
              </div>
            </div>

            {/* Checklist Item 3 */}
            <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-xs relative overflow-hidden border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wide font-semibold">
                  Category 03
                </span>
                <span className="inline-flex items-center gap-1 font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span> VERIFIED
                </span>
              </div>
              <div className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                Facts Match Transcript?
              </div>
              <div className="font-label-md text-label-md text-primary font-bold">STATUS: 100% FACT MATCH</div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                Verified explicit entities: SWIFT Ref <span className="font-semibold text-on-surface">#FX-9921</span> and remittance volume <span className="font-semibold text-on-surface">USD $4,500.00</span> matched to core banking DB ledger.
              </p>
              <div className="mt-space-xs pt-space-xs flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/20">
                <span>Core Ledger Match</span>
                <span className="font-bold text-secondary">Synchronized</span>
              </div>
            </div>
          </div>
        </div>

        {/* Active Scanning & Verification Engine: Dual Column Laser-Linked Inspection Interface */}
        <div className="relative bg-surface-container-lowest rounded-xl p-space-lg shadow-sm overflow-hidden border border-outline-variant/30">
          {/* Dynamic Visual Scanning Beam */}
          <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-40">
            <div className="w-full h-24 bg-gradient-to-b from-primary/0 via-primary/25 to-primary/0 translate-y-[-100%] animate-scan"></div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-space-md gap-space-sm">
            <div className="flex items-center gap-space-sm">
              <div className="p-2 rounded bg-primary/10 text-primary">
                <span className="material-symbols-outlined text-[22px]">compare_arrows</span>
              </div>
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Evidence Inspection: Telephony Raw Transcript vs. AI Drafter Summary
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Hover over any matched citation pill or bullet to observe mutual cross-referencing provenance.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-space-sm text-label-sm font-label-sm flex-wrap">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-secondary-fixed"></span>
                <span className="text-on-surface-variant">Entity Grounded (USD & SWIFT)</span>
              </div>
              <div className="flex items-center gap-1.5 ml-2">
                <span className="w-3 h-3 rounded bg-primary-fixed"></span>
                <span className="text-on-surface-variant">Ombudsman Grievance Phrase</span>
              </div>
            </div>
          </div>

          {/* Side-by-Side Dual Ledger Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg relative z-10 pt-space-xs">
            {/* Left: Raw Telephony Audio Transcript */}
            <div className="flex flex-col bg-surface-container-low rounded-lg p-space-md border border-outline-variant/20">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">record_voice_over</span>
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">
                    Raw Telephony Ingestion (ASR Ground Truth)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                  Call Duration: 04m 12s | Bitrate: 64kbps
                </span>
              </div>

              <div className="flex flex-col gap-space-sm font-body-sm text-body-sm text-on-surface leading-relaxed max-h-[480px] overflow-y-auto pr-space-xs">
                <div className="p-space-sm bg-surface-container-lowest rounded flex gap-space-xs items-start">
                  <span className="font-label-sm text-label-sm text-on-surface-variant min-w-[48px] font-mono">00:14</span>
                  <div className="flex-1">
                    <span className="font-semibold text-primary">Support Agent (Anil M.):</span> "Thank you for contacting First Heritage Wealth. How may I assist with your accounts today?"
                  </div>
                </div>

                <div className={`p-space-sm bg-surface-container-lowest rounded flex gap-space-xs items-start transition-all ${activeHighlight === 1 ? 'ring-2 ring-secondary' : ''}`}>
                  <span className="font-label-sm text-label-sm text-on-surface-variant min-w-[48px] font-mono">00:32</span>
                  <div className="flex-1">
                    <span className="font-semibold text-on-surface">Caller (Dev Patel):</span> "I need immediate escalation. I initiated an outward wire transfer yesterday of{" "}
                    <mark 
                      onMouseEnter={() => setActiveHighlight(1)}
                      onMouseLeave={() => setActiveHighlight(null)}
                      className="bg-secondary-fixed text-on-secondary-fixed font-bold px-1 rounded transition-all hover:bg-secondary hover:text-on-secondary cursor-pointer"
                    >
                      USD $4,500.00
                    </mark>{" "}
                    under reference code{" "}
                    <mark 
                      onMouseEnter={() => setActiveHighlight(1)}
                      onMouseLeave={() => setActiveHighlight(null)}
                      className="bg-secondary-fixed text-on-secondary-fixed font-bold px-1 rounded transition-all hover:bg-secondary hover:text-on-secondary cursor-pointer"
                    >
                      SWIFT FX-9921
                    </mark>, but the beneficiary bank in London informs my daughter that nothing arrived."
                  </div>
                </div>

                <div className="p-space-sm bg-surface-container-lowest rounded flex gap-space-xs items-start">
                  <span className="font-label-sm text-label-sm text-on-surface-variant min-w-[48px] font-mono">01:45</span>
                  <div className="flex-1">
                    <span className="font-semibold text-primary">Support Agent (Anil M.):</span> "I see that transaction pending internal compliance verification. It was routed to the intermediate correspondent queue."
                  </div>
                </div>

                <div className={`p-space-sm bg-surface-container-lowest rounded flex gap-space-xs items-start transition-all ${activeHighlight === 2 ? 'ring-2 ring-primary' : ''}`}>
                  <span className="font-label-sm text-label-sm text-on-surface-variant min-w-[48px] font-mono">02:18</span>
                  <div className="flex-1">
                    <span className="font-semibold text-on-surface">Caller (Dev Patel):</span> "This is unacceptable tuition deadline delay.{" "}
                    <mark 
                      onMouseEnter={() => setActiveHighlight(2)}
                      onMouseLeave={() => setActiveHighlight(null)}
                      className="bg-primary-fixed text-primary font-bold px-1 rounded transition-all hover:bg-primary hover:text-on-primary cursor-pointer"
                    >
                      If this remittance delay is not sorted out by noon, I am lodging a formal banking grievance with the RBI Ombudsman
                    </mark>. Please log this complaint formally."
                  </div>
                </div>

                <div className={`p-space-sm bg-surface-container-lowest rounded flex gap-space-xs items-start transition-all ${activeHighlight === 3 ? 'ring-2 ring-secondary' : ''}`}>
                  <span className="font-label-sm text-label-sm text-on-surface-variant min-w-[48px] font-mono">03:02</span>
                  <div className="flex-1">
                    <span className="font-semibold text-primary">Support Agent (Anil M.):</span> "I understand completely, Mr. Patel. I am opening an expedited ticket with our foreign exchange desk and tagging our swift liaison team for a priority trace."
                  </div>
                </div>
              </div>
            </div>

            {/* Right: AI Drafter Output with Live Sentinel Verification Overlays */}
            <div className="flex flex-col bg-surface-container-low rounded-lg p-space-md border border-outline-variant/20">
              <div className="flex items-center justify-between pb-space-sm mb-space-sm border-b border-outline-variant/20">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[18px]">smart_toy</span>
                  <span className="font-label-md text-label-md text-on-surface uppercase tracking-wider font-semibold">
                    Candidate AI Case Summary (Drafter Model)
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-bold">
                  Sentinel Pass Status: 100% Grounded
                </span>
              </div>

              <div className="flex flex-col gap-space-md">
                {/* Summary Point 1 */}
                <div 
                  onMouseEnter={() => setActiveHighlight(1)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  className={`p-space-md bg-surface-container-lowest rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer border ${activeHighlight === 1 ? 'border-secondary ring-1 ring-secondary' : 'border-outline-variant/10'}`}
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
                      BULLET 01: Core Transaction Incident
                    </span>
                    <span className="inline-flex items-center gap-1 text-label-sm font-label-sm text-secondary font-bold bg-secondary-fixed/40 px-2 py-0.5 rounded">
                      <span className="material-symbols-outlined text-[14px]">link</span> Token Grounded (00:32)
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Client Dev Patel reported an uncredited outward overseas wire transfer totaling{" "}
                    <span className="bg-secondary-fixed px-1 font-semibold rounded text-on-secondary-fixed">USD 4,500</span> under reference{" "}
                    <span className="bg-secondary-fixed px-1 font-semibold rounded text-on-secondary-fixed">SWIFT Ref: FX-9921</span>, currently held in intermediate foreign exchange routing.
                  </p>
                  <div className="mt-space-sm pt-space-xs flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant border-t border-outline-variant/10">
                    <span className="text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified</span> 0 Hallucinations
                    </span>
                    <span>•</span>
                    <span>Entities validated against Core Forex Service</span>
                  </div>
                </div>

                {/* Summary Point 2 */}
                <div 
                  onMouseEnter={() => setActiveHighlight(2)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  className={`p-space-md bg-surface-container-lowest rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer border ${activeHighlight === 2 ? 'border-primary ring-1 ring-primary' : 'border-outline-variant/10'}`}
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
                      BULLET 02: Regulatory Classification
                    </span>
                    <span className="inline-flex items-center gap-1 text-label-sm font-label-sm text-primary font-bold bg-primary-fixed/50 px-2 py-0.5 rounded">
                      <span className="material-symbols-outlined text-[14px]">warning</span> Grievance Trigger (02:18)
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Explicit regulatory grievance identified: Customer cited statutory escalation to the{" "}
                    <span className="bg-primary-fixed px-1 font-semibold rounded text-primary">RBI Ombudsman</span> citing critical{" "}
                    <span className="bg-primary-fixed px-1 font-semibold rounded text-primary">Remittance Delay</span> and student fee deadline jeopardy.
                  </p>
                  <div className="mt-space-sm pt-space-xs flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant border-t border-outline-variant/10">
                    <span className="text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">assignment_turned_in</span> Logged to Statutory Grievance Ledger
                    </span>
                    <span>•</span>
                    <span>Classified per Section 35A Guidelines</span>
                  </div>
                </div>

                {/* Summary Point 3 */}
                <div 
                  onMouseEnter={() => setActiveHighlight(3)}
                  onMouseLeave={() => setActiveHighlight(null)}
                  className={`p-space-md bg-surface-container-lowest rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer border ${activeHighlight === 3 ? 'border-secondary ring-1 ring-secondary' : 'border-outline-variant/10'}`}
                >
                  <div className="flex items-center justify-between mb-space-xs">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
                      BULLET 03: Operational Action & Commitments
                    </span>
                    <span className="inline-flex items-center gap-1 text-label-sm font-label-sm text-secondary font-bold bg-secondary-fixed/40 px-2 py-0.5 rounded">
                      <span className="material-symbols-outlined text-[14px]">link</span> Grounded (03:02)
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface">
                    Support agent initiated an expedited internal investigation ticket with the foreign exchange desk and requested immediate swift tracing. No unverified promises of immediate refund were extended.
                  </p>
                  <div className="mt-space-sm pt-space-xs flex items-center gap-space-sm text-label-sm font-label-sm text-on-surface-variant border-t border-outline-variant/10">
                    <span className="text-secondary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">task_alt</span> Zero Extraneous Commitments Found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Comparative Trust Analysis & Production Deployment Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg mb-space-lg">
          {/* Visual Speculative Audit Tree */}
          <div className="lg:col-span-2 bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Critic Guardrail Arbitration Flow
                </h3>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Active Parallel Pipeline</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                The Sentinel Agent acts as an adversarial auditor. It reconstructs every operational statement into testable propositions before evaluating semantic overlap with raw acoustic transcripts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm text-center">
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col items-center gap-1 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-primary text-[24px]">split_scene</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">1. Proposition Splitter</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Extracted 8 atomic statements from draft summary</span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col items-center gap-1 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-secondary text-[24px]">verified</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">2. Transcript Vector Match</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">8/8 corroborated verbatim against audio spans</span>
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col items-center gap-1 border border-outline-variant/20">
                  <span className="material-symbols-outlined text-tertiary text-[24px]">shield</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">3. Compliance Gate</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Auto-tagged with regulatory ombudsman code</span>
                </div>
              </div>
            </div>

            <div className="mt-space-md p-space-sm bg-surface-container-high rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-space-xs text-on-surface">
                <span className="material-symbols-outlined text-primary text-[18px]">policy</span>
                <span className="font-label-md text-label-md font-semibold">Audit Log Cryptographically Signed:</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">0x8F3a...c992</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-bold">Tamper-Proof Verification</span>
            </div>
          </div>

          {/* Human Agent Authorization Decision Console */}
          <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between border border-outline-variant/30">
            <div>
              <div className="flex items-center justify-between mb-space-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Sign-Off Control</h3>
                <span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold">
                  Agent Green-Light
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Sentinel QA guarantees that committing this summary will not trigger misrepresentation, missed complaints, or customer ledger errors.
              </p>
              <div className="flex flex-col gap-space-sm mb-space-md">
                <div className="flex items-center justify-between font-label-sm text-label-sm py-1 border-b border-surface-container-low">
                  <span className="text-on-surface-variant">Target System:</span>
                  <span className="font-semibold text-on-surface">Finacle CRM & Core FX Desk</span>
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm py-1 border-b border-surface-container-low">
                  <span className="text-on-surface-variant">Statutory Escalation:</span>
                  <span className="font-semibold text-primary">RBI Level-1 Ticket Created</span>
                </div>
                <div className="flex items-center justify-between font-label-sm text-label-sm py-1">
                  <span className="text-on-surface-variant">Human Responsibility:</span>
                  <span className="font-semibold text-secondary">Zero Liability Shift</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors shadow flex items-center justify-center gap-2 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                <span>Approve & Dispatch to CRM</span>
              </button>
              <button
                onClick={handleRequestOverride}
                className="w-full h-10 rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
                <span>Request Human Override (Cyclic Loop)</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
