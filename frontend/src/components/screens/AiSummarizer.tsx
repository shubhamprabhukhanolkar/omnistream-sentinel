import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export const AiSummarizer: React.FC = () => {
  const { 
    interactions, 
    selectedInteractionId, 
    setActiveTab,
    audioPlaying, 
    toggleAudioPlaying, 
    showToast 
  } = useAppStore();

  const currentCase = interactions.find(i => i.id === selectedInteractionId) || interactions[0] || {
    id: "FHF-88294",
    channel: "audio",
    customer_name: "Rajesh Malhotra",
    customer_cif: "CIF-99482103",
    customer_tier: "Platinum NRI / Privilege Banking",
    title: "NRI FastRemit & Premium Savings Dispute",
    relationship_manager: "Anita Sharma",
    audio_duration: "04:18",
    noise_floor: "-42dB",
    filler_words_count: 14,
    status: "Ready_for_Human"
  };

  const [activeSubTab, setActiveSubTab] = useState<'diarized' | 'audio' | 'prompt'>('diarized');
  const [isSynthesizing, setIsSynthesizing] = useState(false);

  const handleRegenerate = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      showToast("Draft updated via Vertex AI Gemini 3 Flash Preview");
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Top Telemetry & Case Context Header */}
      <section className="px-margin pt-space-lg pb-space-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm relative overflow-hidden border border-outline-variant/30">
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full pointer-events-none blur-2xl"></div>
          
          <div className="flex flex-col gap-space-xs z-10">
            <div className="flex flex-wrap items-center gap-space-xs">
              <span className="font-label-sm text-label-sm bg-primary text-on-primary px-2.5 py-0.5 rounded-full tracking-wider uppercase font-semibold">
                Case #{currentCase.id}
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded">
                Priority Tier: {currentCase.customer_tier}
              </span>
              <span className="font-label-sm text-label-sm bg-surface-container-low text-secondary font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Live Drafting
              </span>
            </div>

            <div className="flex flex-col md:flex-row md:items-baseline gap-space-xs md:gap-space-md">
              <h1 className="font-headline-md text-headline-md text-on-surface tracking-tight">
                {currentCase.title}
              </h1>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Customer: <strong className="text-on-surface">{currentCase.customer_name}</strong> ({currentCase.customer_cif})
              </span>
            </div>

            <div className="flex items-center gap-space-md text-on-surface-variant pt-1 font-body-sm text-body-sm flex-wrap">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-primary">headset_mic</span>
                Relationship Mgr: {currentCase.relationship_manager}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-secondary">hourglass_top</span>
                Target: 60s manual note elimination
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">swap_horiz</span>
                SWIFT UETR: FX-9921-INW-BOM
              </span>
            </div>
          </div>

          {/* Quick Metrics Right Widget */}
          <div className="flex items-center gap-space-md z-10 self-start lg:self-center">
            <div className="bg-surface-container-low px-space-md py-space-sm rounded-lg flex items-center gap-space-sm border border-outline-variant/20">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[22px]">timer</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Typing Time Saved
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  58.4s <span className="font-label-sm text-label-sm text-secondary font-normal">/ 60.0s goal</span>
                </span>
              </div>
            </div>

            <button
              onClick={handleRegenerate}
              className="h-10 px-space-md bg-primary text-on-primary font-label-md text-label-md rounded-lg flex items-center gap-space-xs hover:bg-primary-container transition-all shadow-sm cursor-pointer"
              id="btn-re-synthesize"
            >
              <span className={`material-symbols-outlined text-[18px] ${isSynthesizing ? 'animate-spin' : ''}`}>sync</span>
              <span>Regenerate Summary</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Sub-Tab Bar */}
      <section className="px-margin pb-space-sm">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-lg border border-outline-variant/20">
            <button
              onClick={() => setActiveSubTab('diarized')}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'diarized'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
              <span>Diarized Transcript</span>
            </button>
            <button
              onClick={() => setActiveSubTab('audio')}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'audio'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
              <span>Raw Audio Player ({currentCase.audio_duration})</span>
            </button>
            <button
              onClick={() => setActiveSubTab('prompt')}
              className={`px-space-md py-1.5 rounded-lg font-label-md text-label-md transition-all flex items-center gap-1.5 cursor-pointer ${
                activeSubTab === 'prompt'
                  ? 'bg-surface-container-lowest text-on-surface shadow-sm font-semibold'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">code</span>
              <span>Drafter Prompt & Grounding</span>
            </button>
          </div>

          <div className="hidden md:flex items-center gap-space-sm font-label-sm text-label-sm text-on-surface-variant">
            <span className="flex items-center gap-1 text-secondary font-semibold">
              <span className="w-2 h-2 rounded-full bg-secondary"></span> 100% LLM Grounded
            </span>
            <span>•</span>
            <span>Model: GCP Vertex AI (Gemini 3 Flash Preview)</span>
          </div>
        </div>
      </section>

      {/* 50/50 Split Screen Workstation Area */}
      <section className="px-margin pb-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg items-start">
          {/* LEFT PANEL: Raw Customer Input */}
          <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
            {/* Left Panel Header */}
            <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <span className="p-1.5 rounded bg-surface-container-high text-primary">
                  <span className="material-symbols-outlined text-[20px]">hearing</span>
                </span>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">Raw Customer Input</h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Messy Audio & Inward Telephony Feed • 8 kHz Dual Channel
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="font-label-sm text-label-sm bg-surface-container-highest px-2 py-0.5 rounded text-on-surface-variant font-mono">
                  Noise Floor: {currentCase.noise_floor}
                </span>
                <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-primary font-bold">
                  {currentCase.filler_words_count} Filler Words
                </span>
              </div>
            </div>

            {/* Audio Scrubber Bar */}
            <div className="p-space-md bg-surface-container-lowest flex flex-col gap-space-xs border-b border-outline-variant/10">
              <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                <div className="flex items-center gap-space-xs">
                  <button
                    onClick={toggleAudioPlaying}
                    className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary-container transition-colors shadow-sm cursor-pointer"
                    id="audio-play-toggle"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {audioPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>
                  <span className="font-label-md text-label-md text-on-surface pl-1">02:14</span>
                  <span>/</span>
                  <span>{currentCase.audio_duration}</span>
                </div>
                <div className="flex items-center gap-space-md">
                  <span className="text-secondary font-medium">Channel A: RM Anita</span>
                  <span>Channel B: Caller Rajesh</span>
                  <span className="material-symbols-outlined text-[18px] cursor-pointer hover:text-on-surface">volume_up</span>
                </div>
              </div>

              {/* Waveform Visualizer Simulation */}
              <div className="relative w-full h-12 bg-surface-container-low rounded-lg p-2 flex items-center gap-[3px] overflow-hidden cursor-pointer border border-outline-variant/20">
                {[3, 5, 8, 4, 7, 10, 6, 2, 7, 9, 4, 8, 10, 5, 3, 2, 8, 11, 7, 4, 9, 5, 6, 3, 8].map((h, idx) => (
                  <div
                    key={idx}
                    className={`w-1 rounded-full ${audioPlaying ? 'animate-pulse' : ''} bg-primary`}
                    style={{ height: `${h * 3.5}px` }}
                  ></div>
                ))}
                {/* Scrubber Playhead */}
                <div className="absolute left-[52%] top-0 bottom-0 w-0.5 bg-secondary flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-secondary shadow"></div>
                </div>
                {[2, 6, 9, 4, 8, 10, 5, 3, 7, 2, 8, 6, 4, 9, 7, 3, 2, 5, 8, 3, 1].map((h, idx) => (
                  <div
                    key={`dim-${idx}`}
                    className="w-1 rounded-full bg-outline-variant/60"
                    style={{ height: `${h * 3.5}px` }}
                  ></div>
                ))}
              </div>
            </div>

            {/* Diarized Audio Transcript Container */}
            <div className="p-space-lg flex flex-col gap-space-md max-h-[640px] overflow-y-auto" id="transcript-feed">
              {activeSubTab === 'prompt' ? (
                <div className="flex flex-col gap-3 font-mono text-xs bg-surface-container-low p-4 rounded-lg text-on-surface">
                  <div className="font-bold text-primary">// Vertex AI Prompt Instruction:</div>
                  <p>Model: GCP Vertex AI / gemini-3-flash-preview</p>
                  <p>Task: Distill customer dialogue into intent, discrete verifiable actions, and tone trajectory.</p>
                  <div className="p-3 bg-surface-container rounded border border-outline-variant/30">
                    System Instruction: "You are the AI Drafter Agent for First Heritage Financial. Extract intent, fee waivers, currency, and resolution SLA. Ground 100% verbatim."
                  </div>
                </div>
              ) : (
                <>
                  {/* Turn 1: Agent Greeting */}
                  <div className="flex items-start gap-space-sm">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">
                      AS
                    </div>
                    <div className="flex flex-col gap-1 min-w-0 bg-surface-container-low p-space-sm rounded-lg w-full border border-outline-variant/10">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-primary font-bold">Anita Sharma (Privilege RM)</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">00:04</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        Namaste Mr. Malhotra, thank you for calling First Heritage Privilege Banking Desk. I see your FastRemit inward alert on my terminal. How may I assist you today, sir?
                      </p>
                    </div>
                  </div>

                  {/* Turn 2: Customer Angry/Anxious Rant */}
                  <div className="flex items-start gap-space-sm">
                    <div className="w-7 h-7 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">
                      RM
                    </div>
                    <div className="flex flex-col gap-1 min-w-0 bg-surface-container-high p-space-sm rounded-lg w-full border border-outline-variant/20">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-secondary font-bold">Rajesh Malhotra</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">00:19</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        Anita ji, listen... <span className="bg-amber-100 px-1 text-on-secondary-container rounded">uh, basically</span> I am totally furious. My brother initiated a wire of <strong className="text-primary font-semibold">USD 4,500</strong> from JPMorgan Chase New York on Tuesday morning via FastRemit to my <span className="font-mono bg-surface-container px-1 rounded">NRE Savings Account ending in 4108</span>. Today is Friday! The SWIFT reference code is <span className="font-mono font-bold text-on-surface">FX-9921-INW-BOM</span>.
                      </p>
                      <p className="font-body-md text-body-md text-on-surface mt-1">
                        The money has left the US, but your Mumbai treasury desk hasn’t credited it! Moreover, I see a provisional debit penalty charge of <strong className="text-primary font-semibold">₹1,750</strong> for foreign outward clearance processing! Why am I paying penalties when your systems are delaying my settlement? I want this fee waived immediately, and I need the money credited for my mother's hospital bill in Pune!
                      </p>
                    </div>
                  </div>

                  {/* Turn 3: Agent Calming & Action */}
                  <div className="flex items-start gap-space-sm">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">
                      AS
                    </div>
                    <div className="flex flex-col gap-1 min-w-0 bg-surface-container-low p-space-sm rounded-lg w-full border border-outline-variant/10">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-primary font-bold">Anita Sharma (Privilege RM)</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">01:42</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        I completely understand your frustration, Mr. Malhotra, and I deeply apologize for this anxiety. Let me immediately trace SWIFT FX-9921. <span className="text-on-surface-variant italic">[pause 4s • keyboard typing sounds]</span> Yes, I can locate the MT103 packet. It was quarantined at Central Clearing Hub due to the beneficiary name matching an extra middle initial "K".
                      </p>
                      <p className="font-body-md text-body-md text-on-surface mt-1">
                        I am triggering an automated internal clearance override right now under Priority SLA. Furthermore, I have already reversed the ₹1,750 handling levy—you will receive an instant SMS confirmation. Because you are a Privilege Client, I am releasing a provisional bridge credit of USD 4,500 equivalent in INR directly into your NRE account within 45 minutes.
                      </p>
                    </div>
                  </div>

                  {/* Turn 4: Customer Relieved Confirmation */}
                  <div className="flex items-start gap-space-sm">
                    <div className="w-7 h-7 rounded-full bg-secondary/20 text-secondary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">
                      RM
                    </div>
                    <div className="flex flex-col gap-1 min-w-0 bg-surface-container-high p-space-sm rounded-lg w-full border border-outline-variant/20">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-secondary font-bold">Rajesh Malhotra</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">03:15</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        Alright, thank you Anita. If the provisional credit reflects within 45 minutes and the ₹1,750 fee is credited back, I am satisfied. Please ensure the confirmation SMS is sent to my Singapore registered mobile number +65 9128 4402 as well as my Indian WhatsApp.
                      </p>
                    </div>
                  </div>

                  {/* Turn 5: Agent Closing */}
                  <div className="flex items-start gap-space-sm">
                    <div className="w-7 h-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-label-sm text-label-sm font-bold">
                      AS
                    </div>
                    <div className="flex flex-col gap-1 min-w-0 bg-surface-container-low p-space-sm rounded-lg w-full border border-outline-variant/10">
                      <div className="flex items-center justify-between">
                        <span className="font-label-md text-label-md text-primary font-bold">Anita Sharma (Privilege RM)</span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">04:02</span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface">
                        Noted with priority, Mr. Malhotra. Dual dispatch confirmed to both numbers. Ticket #{currentCase.id} has been tagged with Treasury Desk head sign-off. Have a peaceful evening, sir.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Left Panel Footer Diagnostic Info */}
            <div className="px-space-lg py-space-sm bg-surface-container-low flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant border-t border-outline-variant/20">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px] text-tertiary">verified_user</span>
                Audio Verified • SHA-256 Checksum Valid
              </span>
              <span>Diarization Accuracy: 99.4%</span>
            </div>
          </div>

          {/* RIGHT PANEL: AI Drafter Agent (Violet/Purple Accent #7c3aed) */}
          <div className="flex flex-col bg-surface-container-lowest rounded-xl shadow-md overflow-hidden relative border border-outline-variant/30">
            {/* Drafter Glow Accent Bar */}
            <div className="h-1.5 w-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-primary"></div>

            {/* Right Panel Header */}
            <div className="px-space-lg py-space-md bg-surface-container-low flex items-center justify-between border-b border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/15 text-[#7c3aed] flex items-center justify-center font-bold relative">
                  <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#7c3aed] animate-ping"></span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-headline-sm text-headline-sm text-on-surface leading-tight">AI Drafter Agent</h2>
                    <span className="font-label-sm text-label-sm bg-[#7c3aed]/10 text-[#7c3aed] font-semibold px-2 py-0.5 rounded-full">
                      v4.8 Production Core
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Extracting Entities, Tone Trajectory & Operational Directives
                  </span>
                </div>
              </div>

              {/* Live Synthesis State Pill */}
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] font-label-sm text-label-sm font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#7c3aed] animate-pulse"></span>
                <span>{isSynthesizing ? 'Distilling Audio...' : 'Draft Ready'}</span>
              </div>
            </div>

            {/* Purple Glowing Skeleton Loader (shown during synthesis) */}
            {isSynthesizing ? (
              <div className="p-space-lg flex flex-col gap-space-md">
                <div className="flex items-center justify-between pb-2">
                  <div className="h-4 w-40 bg-[#7c3aed]/20 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-[#7c3aed]/20 rounded animate-pulse"></div>
                </div>
                <div className="h-20 w-full bg-gradient-to-r from-[#7c3aed]/10 via-[#7c3aed]/20 to-[#7c3aed]/10 rounded-lg animate-pulse"></div>
                <div className="h-32 w-full bg-gradient-to-r from-[#7c3aed]/10 via-[#7c3aed]/20 to-[#7c3aed]/10 rounded-lg animate-pulse"></div>
                <div className="h-24 w-full bg-gradient-to-r from-[#7c3aed]/10 via-[#7c3aed]/20 to-[#7c3aed]/10 rounded-lg animate-pulse"></div>
              </div>
            ) : (
              /* Structured Output Fields Container */
              <div className="p-space-lg flex flex-col gap-space-lg max-h-[640px] overflow-y-auto" id="drafter-content">
                {/* Section 1: Customer Intent & Primary Request */}
                <div className="flex flex-col gap-space-xs bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-[#7c3aed] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-[18px]">psychology</span>
                      Customer Intent & Core Dispute
                    </span>
                    <span className="font-label-sm text-label-sm bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant font-mono">
                      Confidence: 99.1%
                    </span>
                  </div>
                  <p className="font-body-md text-body-md text-on-surface font-medium leading-relaxed">
                    Urgent inquiry and formal grievance regarding delayed foreign inward remittance (<strong className="text-primary font-bold">USD 4,500</strong>) dispatched via JPMorgan Chase into NRE Account <span className="font-mono bg-surface-container px-1 py-0.5 rounded text-primary">#...4108</span>. Customer demands immediate credit release and absolute waiver/reversal of <strong className="text-primary font-bold">₹1,750</strong> inward handling fee.
                  </p>
                  <div className="flex flex-wrap gap-space-xs pt-1">
                    <span className="font-label-sm text-label-sm bg-surface-container-low text-on-surface px-2 py-0.5 rounded">
                      Category: Cross-Border FX / Remittance Delay
                    </span>
                    <span className="font-label-sm text-label-sm bg-surface-container-low text-on-surface px-2 py-0.5 rounded">
                      Priority: Medical Emergency Clause
                    </span>
                  </div>
                </div>

                {/* Section 2: Key Actions Taken & Scheduled */}
                <div className="flex flex-col gap-space-xs bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/20">
                  <div className="flex items-center justify-between pb-1">
                    <span className="font-label-md text-label-md uppercase tracking-wider text-[#7c3aed] flex items-center gap-1.5 font-bold">
                      <span className="material-symbols-outlined text-[18px]">task_alt</span>
                      Key Actions Taken & Scheduled
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary font-semibold">
                      4 / 4 Auto-Executions Synced
                    </span>
                  </div>

                  <div className="flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            SWIFT UETR FX-9921 Inspection Executed
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Located MT103 packet held at Central Hub for middle initial mismatch ("K")
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        COMPLETED
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            ₹1,750 Processing Fee Reversal Initiated
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Auth code #REV-7721 applied under RM Privilege Discretionary Policy
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        REVERSED
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-6 h-6 rounded-full bg-amber-100 text-secondary flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Provisional Bridge Credit ($4,500 Equivalent INR)
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Treasury Clearing Hub SLA dispatch scheduled within 45 mins
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm bg-amber-100 text-secondary px-2 py-0.5 rounded-full font-bold">
                        PROCESSING
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-space-sm bg-surface-container-low rounded-lg">
                      <div className="flex items-center gap-space-sm">
                        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </span>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Dual Delivery SMS Dispatch
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Sent to Singapore (+65 9128 4402) and India WhatsApp Gateway
                          </span>
                        </div>
                      </div>
                      <span className="font-label-sm text-label-sm bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                        DELIVERED
                      </span>
                    </div>
                  </div>
                </div>

                {/* Section 3: Sentiment & Emotional Trajectory */}
                <div className="flex flex-col gap-space-xs bg-surface-container-lowest p-space-md rounded-lg shadow-sm border border-outline-variant/20">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-[#7c3aed] flex items-center gap-1.5 font-bold">
                    <span className="material-symbols-outlined text-[18px]">insights</span>
                    Customer Sentiment & Tone Trajectory
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-2">
                    <div className="p-space-sm bg-surface-container-high rounded-lg flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">00:00 - 01:30 (Inception)</span>
                        <span className="font-label-sm text-label-sm bg-error text-on-error px-2 py-0.2 rounded-full font-semibold">
                          High Anxious • Frustrated
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-headline-sm text-headline-sm text-error font-bold">-78</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Frustration Quotient</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Trigger: Healthcare emergency combined with unexplained debit fee.
                      </span>
                    </div>

                    <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-1">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">03:00 - 04:18 (Resolution)</span>
                        <span className="font-label-sm text-label-sm bg-emerald-100 text-emerald-800 px-2 py-0.2 rounded-full font-semibold">
                          Neutral / Constructive
                        </span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="font-headline-sm text-headline-sm text-emerald-700 font-bold">+64</span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">Satisfaction Rebound</span>
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Outcome: Immediate fee reversal & transparent 45-min bridge credit commitment.
                      </span>
                    </div>
                  </div>

                  {/* Tone Progression Bar */}
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant">
                      <span>Call Beginning (Agitated)</span>
                      <span>Intervention (Reversal)</span>
                      <span className="text-secondary font-medium">Wrap-up (Reassured)</span>
                    </div>
                    <div className="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                      <div className="h-full bg-error w-1/3"></div>
                      <div className="h-full bg-secondary w-1/3"></div>
                      <div className="h-full bg-[#7c3aed] w-1/3"></div>
                    </div>
                  </div>
                </div>

                {/* Section 4: Relationship Manager Typing Time ROI */}
                <div className="bg-gradient-to-br from-[#7c3aed]/10 via-surface-container-low to-primary/5 p-space-md rounded-lg flex items-center justify-between border border-[#7c3aed]/20">
                  <div className="flex items-center gap-space-md">
                    <div className="w-12 h-12 rounded-xl bg-[#7c3aed] text-white flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[28px]">speed</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        60.0s Manual Typing Eliminated
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        RM Anita Sharma bypassed CRM narrative entry, manual SWIFT tagging, and ledger logging.
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab('sentinel-critic')}
                    className="h-10 px-space-lg bg-[#7c3aed] text-white hover:bg-[#6d28d9] font-label-md text-label-md rounded-lg shadow-sm flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                    id="btn-push-core"
                  >
                    <span>Proceed to Sentinel Critic QA</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            )}

            {/* Right Panel Footer */}
            <div className="px-space-lg py-space-sm bg-surface-container-low flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant border-t border-outline-variant/20">
              <span>Target System: Finacle Core Banking • Salesforce Financial Services Cloud</span>
              <span className="text-[#7c3aed] font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">auto_fix_high</span> Zero Human Review Delay
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
