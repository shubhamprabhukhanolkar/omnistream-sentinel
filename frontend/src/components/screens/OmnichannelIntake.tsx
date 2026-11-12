import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export const OmnichannelIntake: React.FC = () => {
  const { 
    interactions, 
    selectedInteractionId, 
    setSelectedInteractionId, 
    setActiveTab, 
    triggerPipelineStream,
    isProcessing,
    pipelineStatus,
    showToast 
  } = useAppStore();

  const [channelFilter, setChannelFilter] = useState<'all' | 'audio' | 'email'>('all');
  const [showIngestModal, setShowIngestModal] = useState(false);
  const [modalChannel, setModalChannel] = useState<'audio' | 'email'>('audio');
  const [modalCustomer, setModalCustomer] = useState('Rajesh Malhotra');
  const [modalTranscript, setModalTranscript] = useState('');

  const filteredInteractions = interactions.filter(item => {
    if (channelFilter === 'all') return true;
    return item.channel === channelFilter;
  });

  const handleStartProcessing = (id: string, forceLoop: boolean = false) => {
    setSelectedInteractionId(id);
    triggerPipelineStream(id, forceLoop);
    setActiveTab('drafter-agent');
  };

  const handleCreateCase = async () => {
    if (!modalTranscript.trim()) {
      showToast("Please enter transcript or email content");
      return;
    }
    try {
      const res = await fetch('/api/interactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel: modalChannel,
          customer_name: modalCustomer,
          customer_cif: `CIF-${Math.floor(10000000 + Math.random() * 90000000)}`,
          customer_tier: 'Privilege Banking',
          title: modalChannel === 'audio' ? 'Inward High-Value Dispute' : 'MIME Thread: Foreign Inward Instruction',
          raw_transcript: modalTranscript
        })
      });
      if (res.ok) {
        const data = await res.json();
        showToast(`Case #${data.id} Ingested into Kafka Event Bus!`);
        setShowIngestModal(false);
        setModalTranscript('');
        useAppStore.getState().fetchInteractions();
      }
    } catch {
      showToast("Ingestion failed");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-gutter flex flex-col gap-space-lg max-w-[1540px] mx-auto w-full">
        {/* Header & Telemetry Matrix */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold bg-primary-fixed px-space-xs py-0.5 rounded">
                Intake Subsystem 01
              </span>
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-ping"></span> Live Kafka Event Bus
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Omnichannel Ingestion & Smart Dispatcher
            </h1>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-2xl">
              Real-time dual-stream payload normalizer and zero-latency routing layer. Raw acoustic telephony and encrypted MIME payloads are dynamically ingested, parsed, and orchestrated into high-throughput LLM pipelines.
            </p>
          </div>

          {/* Live KPI Pills */}
          <div className="grid grid-cols-3 gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm border border-outline-variant/30">
            <div className="flex flex-col px-space-md py-space-xs rounded-lg bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Today Ingested</span>
              <div className="flex items-baseline gap-space-xs mt-0.5">
                <span className="font-headline-md text-headline-md text-primary font-bold">1,842</span>
                <span className="material-symbols-outlined text-[16px] text-secondary">trending_up</span>
              </div>
              <span className="font-label-sm text-label-sm text-secondary font-medium">+14.2% vs baseline</span>
            </div>
            <div className="flex flex-col px-space-md py-space-xs rounded-lg bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Auto-Classified</span>
              <div className="flex items-baseline gap-space-xs mt-0.5">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">99.4%</span>
                <span className="material-symbols-outlined text-[16px] text-tertiary">verified</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">4 flagged human review</span>
            </div>
            <div className="flex flex-col px-space-md py-space-xs rounded-lg bg-surface-container-low">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Avg Routing Latency</span>
              <div className="flex items-baseline gap-space-xs mt-0.5">
                <span className="font-headline-md text-headline-md text-secondary font-bold">
                  140<span className="text-label-md font-normal text-on-surface-variant">ms</span>
                </span>
                <span className="material-symbols-outlined text-[16px] text-secondary">bolt</span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant">p99 = 192ms</span>
            </div>
          </div>
        </div>

        {/* Central Neural Visualizer & Dispatch Node */}
        <div className="relative w-full rounded-xl bg-surface-container-lowest p-space-lg shadow-sm overflow-hidden border border-outline-variant/30">
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-96 h-96 rounded-full bg-tertiary-fixed-dim/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-space-md">
            <div className="flex items-center justify-between flex-wrap gap-space-sm">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">alt_route</span>
                </div>
                <div>
                  <h2 className="font-headline-sm text-headline-sm text-on-surface">Neural Orchestrator Node</h2>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Bi-directional token mapping & automated context assembly engine (Vertex AI Gemini 3 Flash Preview)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-space-md">
                <button
                  onClick={() => setShowIngestModal(true)}
                  className="px-space-md py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">add_circle</span>
                  <span>Ingest Test Payload</span>
                </button>
                <div className="flex items-center gap-space-xs px-space-sm py-1 bg-surface-container-high rounded-full">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">Active Parallel Clusters: 8/8</span>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Bandwidth</span>
                  <p className="font-label-md text-label-md text-on-surface font-bold">42.8 MB/s</p>
                </div>
              </div>
            </div>

            {/* Orchestrator Topology Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-space-md items-center py-space-sm">
              {/* Ingestion Ports Left */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-7 h-7 rounded bg-secondary-container/30 text-secondary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">graphic_eq</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">Whisper-v3 / Telephony SIP</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Real-time 8kHz PCM acoustic parsing</span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-secondary font-semibold">412 calls/hr</span>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-7 h-7 rounded bg-tertiary-fixed text-tertiary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">mark_email_read</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">MIME Thread NLP Engine</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">HTML parser & attachment OCR</span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-tertiary font-semibold">890 msgs/hr</span>
                </div>
              </div>

              {/* Pulsing Center Core */}
              <div className="col-span-1 flex flex-col items-center justify-center relative py-space-sm">
                <div className="relative flex items-center justify-center">
                  <div className="absolute w-24 h-24 rounded-full bg-secondary-container/20 animate-ping"></div>
                  <div 
                    onClick={() => handleStartProcessing(selectedInteractionId || 'FHF-88294')}
                    className="relative w-20 h-20 rounded-full bg-primary-container text-on-primary flex flex-col items-center justify-center shadow-lg cursor-pointer transform hover:scale-105 transition-transform"
                    title="Click to trigger LangGraph Pipeline"
                  >
                    <span className="material-symbols-outlined text-[30px]">memory</span>
                    <span className="font-label-sm text-label-sm font-bold tracking-tight">FH-CORE</span>
                  </div>
                </div>
                <span className="mt-space-xs font-label-sm text-label-sm text-primary font-bold">
                  {isProcessing ? `LangGraph: ${pipelineStatus}` : 'Zero-Shot Dispatch'}
                </span>
              </div>

              {/* Target Inference Queues Right */}
              <div className="col-span-1 md:col-span-2 flex flex-col gap-space-sm">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-7 h-7 rounded bg-primary-fixed text-primary flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">verified_user</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">Priority HNW & Esc. Buffer</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Zero wait · Ultra tier dedicated</span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm bg-primary text-on-primary px-space-xs py-0.5 rounded font-bold">
                    12 cases
                  </span>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between border border-outline-variant/20">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-7 h-7 rounded bg-surface-container-high text-on-surface flex items-center justify-center">
                      <span className="material-symbols-outlined text-[18px]">model_training</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface block">Drafter v4 Synthesizer</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Cyclical Critic QA Routing</span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {interactions.length} active
                  </span>
                </div>
              </div>
            </div>

            {/* Orchestrator Micro-telemetry bar */}
            <div className="pt-space-xs flex flex-wrap items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/20">
              <div className="flex items-center gap-space-md">
                <span>Core Version: <strong className="text-on-surface">v3.4.19b-orchestrator</strong></span>
                <span>Active Shards: <strong className="text-on-surface">16 node cluster</strong></span>
                <span>Packet Loss: <strong className="text-secondary">0.000%</strong></span>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary"></span>
                <span>Model Consensus: 99.82% Confidence Threshold</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Bar & Channel Selector */}
        <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/30">
          <div className="flex items-center flex-wrap gap-space-xs w-full md:w-auto">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mr-space-xs font-semibold">
              Channels:
            </span>
            <button
              onClick={() => setChannelFilter('all')}
              className={`px-space-sm py-1 rounded font-label-md text-label-md flex items-center gap-1 shadow-sm cursor-pointer ${
                channelFilter === 'all'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span>All Channels</span>
              <span className="bg-primary-container px-1 py-0.2 rounded text-[10px] text-on-primary">
                {interactions.length}
              </span>
            </button>
            <button
              onClick={() => setChannelFilter('audio')}
              className={`px-space-sm py-1 rounded font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer ${
                channelFilter === 'audio'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">headset_mic</span>
              <span>Audio Call</span>
              <span className="bg-surface-container-high px-1 py-0.2 rounded text-[10px] text-on-surface-variant">
                {interactions.filter(i => i.channel === 'audio').length}
              </span>
            </button>
            <button
              onClick={() => setChannelFilter('email')}
              className={`px-space-sm py-1 rounded font-label-md text-label-md flex items-center gap-1 transition-colors cursor-pointer ${
                channelFilter === 'email'
                  ? 'bg-primary text-on-primary'
                  : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary">mail</span>
              <span>Email Thread</span>
              <span className="bg-surface-container-high px-1 py-0.2 rounded text-[10px] text-on-surface-variant">
                {interactions.filter(i => i.channel === 'email').length}
              </span>
            </button>
          </div>

          <div className="flex items-center gap-space-sm w-full md:w-auto justify-end">
            <button 
              onClick={() => handleStartProcessing('FHF-88294', true)}
              className="px-space-md py-1.5 rounded bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary hover:text-on-secondary font-label-md text-label-md flex items-center gap-1 transition-all shadow-sm cursor-pointer font-bold"
              title="Demonstrate cyclical LangGraph retry loop where Sentinel Critic rejects draft and triggers Drafter"
            >
              <span className="material-symbols-outlined text-[18px]">loop</span>
              <span>Demo Cyclical Critic Loop</span>
            </button>
            <button
              onClick={() => useAppStore.getState().fetchInteractions()}
              className="p-2 rounded bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
              title="Refresh Queue"
            >
              <span className="material-symbols-outlined text-[18px]">sync</span>
            </button>
          </div>
        </div>

        {/* 3-Column Stream Pipeline */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-md items-start">
          {/* COLUMN 1: Raw Incoming Streams */}
          <div className="flex flex-col gap-space-sm bg-surface-container-low/60 p-space-md rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <div className="w-3 h-3 rounded-full bg-secondary-container animate-pulse"></div>
                <h3 className="font-label-lg text-label-lg text-on-surface font-bold">1. Incoming Raw Streams</h3>
              </div>
              <span className="font-label-sm text-label-sm font-semibold bg-surface-container-high text-on-surface px-space-xs py-0.5 rounded">
                {filteredInteractions.length} Ingested
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pb-space-xs">
              Unprocessed ingress buffers arriving from telephony trunks & mail gateways.
            </p>

            {filteredInteractions.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedInteractionId(item.id)}
                className={`p-space-md rounded-lg shadow-sm flex flex-col gap-space-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden border ${
                  selectedInteractionId === item.id
                    ? 'border-primary bg-surface-container-lowest ring-1 ring-primary'
                    : 'border-transparent bg-surface-container-lowest'
                }`}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 ${item.channel === 'audio' ? 'bg-secondary' : 'bg-tertiary'}`}></div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="px-space-xs py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed flex items-center gap-1 font-semibold">
                      <span className="material-symbols-outlined text-[14px]">
                        {item.channel === 'audio' ? 'graphic_eq' : 'mail'}
                      </span>
                      {item.channel === 'audio' ? 'Audio Call' : 'Email Thread'}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {item.audio_duration}
                    </span>
                  </div>
                  <span className={`font-label-sm text-label-sm px-1.5 py-0.2 rounded font-bold ${
                    item.status === 'Ready_for_Human' ? 'bg-secondary text-on-secondary' :
                    item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-high text-primary'
                  }`}>
                    {item.status.replace(/_/g, ' ')}
                  </span>
                </div>

                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                      {item.id}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {item.customer_cif}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-medium">
                    {item.customer_name} ({item.customer_tier})
                  </span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    {item.title}
                  </p>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-space-xs border-t border-surface-container-high">
                  <span>RM: <strong className="text-on-surface">{item.relationship_manager}</strong></span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartProcessing(item.id);
                    }}
                    className="px-2 py-1 rounded bg-primary hover:bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold transition-colors flex items-center gap-1"
                  >
                    <span>Synthesize</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* COLUMN 2: Classification & Diarization Engine */}
          <div className="flex flex-col gap-space-sm bg-surface-container-low/60 p-space-md rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
                <h3 className="font-label-lg text-label-lg text-on-surface font-bold">2. Orchestrator Analysis & Ingestion</h3>
              </div>
              <span className="font-label-sm text-label-sm font-semibold bg-primary text-on-primary px-space-xs py-0.5 rounded">
                Processing Live
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pb-space-xs">
              Real-time diarization, CIF retrieval, intent deduction & token alignment.
            </p>

            {/* In-flight Card */}
            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-sm relative overflow-hidden border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm font-bold text-primary">CASE-FHF-88294</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">| Audio Stream</span>
                </div>
                <span className="font-label-sm text-label-sm bg-surface-container-high text-primary px-space-xs py-0.5 rounded font-bold">
                  99.1% Confidence
                </span>
              </div>
              <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Speaker Diarization:</span>
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">2 Speakers (Anita S. & Rajesh M.)</span>
                </div>
                <div className="flex items-center gap-1 w-full bg-surface-container-high h-2 rounded-full overflow-hidden">
                  <div className="bg-secondary h-full w-[35%]"></div>
                  <div className="bg-primary h-full w-[15%]"></div>
                  <div className="bg-secondary h-full w-[50%]"></div>
                </div>
                <div className="flex justify-between text-[10px] text-on-surface-variant font-label-sm">
                  <span>Customer (Rajesh)</span>
                  <span>Privilege RM</span>
                  <span>Customer Confirmation</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Extracted Intent Vectors:</span>
                <div className="flex flex-wrap gap-1">
                  <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface">#nri_fastremit_delay</span>
                  <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-surface-container-high text-on-surface">#fee_waiver_1750</span>
                  <span className="font-label-sm text-label-sm px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed-variant font-semibold">#medical_emergency</span>
                </div>
              </div>
              <div className="pt-space-xs flex items-center justify-between border-t border-surface-container-high">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Drafter Model:</span>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-primary">Gemini 3 Flash Preview</span>
              </div>
            </div>

            {/* In-flight Card 2 */}
            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-sm relative overflow-hidden border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-sm text-label-sm font-bold text-primary">CASE-FHF-88492</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">| Audio Stream</span>
                </div>
                <span className="font-label-sm text-label-sm bg-surface-container-high text-tertiary px-space-xs py-0.5 rounded font-bold">
                  98.8% Confidence
                </span>
              </div>
              <div className="p-space-sm bg-surface-container-low rounded-lg flex flex-col gap-space-xs">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Statutory Flag:</span>
                  <span className="font-label-sm text-label-sm text-error font-semibold">RBI Ombudsman Alert</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface line-clamp-2">
                  "If this remittance delay is not sorted out by noon, I am lodging a formal banking grievance with the RBI Ombudsman."
                </p>
              </div>
              <div className="pt-space-xs flex items-center justify-between border-t border-surface-container-high">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">psychology</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Auditor Assigned:</span>
                </div>
                <span className="font-label-sm text-label-sm font-bold text-primary">Sentinel Critic QA</span>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Routed to AI Summarization Queue */}
          <div className="flex flex-col gap-space-sm bg-surface-container-low/60 p-space-md rounded-xl border border-outline-variant/20">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-space-xs">
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <h3 className="font-label-lg text-label-lg text-on-surface font-bold">3. Routed to Summarization</h3>
              </div>
              <span className="font-label-sm text-label-sm font-semibold bg-surface-container-high text-on-surface px-space-xs py-0.5 rounded">
                Stage 2 Staged
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant pb-space-xs">
              Normalized payloads staged for Drafter Agent dynamic synthesis and Sentinel Critic verification.
            </p>

            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-sm relative border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-primary text-on-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">star</span> High Net Worth Tier
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Priority #1</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">Rajesh Malhotra</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">SLA: 00:45 Target</span>
                </div>
                <span className="font-label-md text-label-md text-primary font-semibold">USD 4,500 JPMorgan Wire Hold</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Quarantined at Central Clearing Hub for middle initial mismatch ("K"). Requires automated override and ₹1,750 fee reversal.
                </p>
              </div>
              <div className="flex items-center justify-between pt-space-xs bg-surface-container-low px-space-sm py-1.5 rounded">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-primary">smart_toy</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Target: <strong>Drafter + Critic</strong></span>
                </div>
                <button
                  onClick={() => {
                    setSelectedInteractionId('FHF-88294');
                    setActiveTab('drafter-agent');
                  }}
                  className="font-label-sm text-label-sm bg-primary hover:bg-primary-container text-on-primary px-space-sm py-1 rounded font-semibold transition-colors cursor-pointer"
                >
                  Inspect Draft
                </button>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-sm flex flex-col gap-space-sm relative border border-outline-variant/20">
              <div className="flex items-center justify-between">
                <span className="px-space-xs py-0.5 rounded font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">account_balance_wallet</span> Instant Shadow Credit
                </span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">POS Failure</span>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">FHF-90412</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">₹14,250 UPI Disputed</span>
                </div>
                <span className="font-label-md text-label-md text-on-surface font-semibold">Apollo Pharmacy Mumbai POS</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Gateway timeout dual debit resolved via NPCI IMPS corridor shadow credit.
                </p>
              </div>
              <div className="flex items-center justify-between pt-space-xs bg-surface-container-low px-space-sm py-1.5 rounded">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-secondary">desktop_windows</span>
                  <span className="font-label-sm text-label-sm text-on-surface">Target: <strong>Agent Workspace</strong></span>
                </div>
                <button
                  onClick={() => {
                    setSelectedInteractionId('FHF-90412');
                    setActiveTab('agent-workspace');
                  }}
                  className="font-label-sm text-label-sm bg-surface-container-high hover:bg-surface-dim text-on-surface px-space-sm py-1 rounded font-semibold transition-colors cursor-pointer"
                >
                  Workspace View
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Active Routing Health & Live Event Stream Table */}
        <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-md mb-space-xl border border-outline-variant/30">
          <div className="flex items-center justify-between flex-wrap gap-space-sm">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Ingress Event Log & Stream Health</h3>
              <span className="font-label-sm text-label-sm text-on-surface-variant">
                Sub-millisecond packet telemetry from edge telephony & web hooks
              </span>
            </div>
            <div className="flex items-center gap-space-sm">
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-secondary font-semibold">
                <span className="w-2 h-2 rounded-full bg-secondary"></span> Cluster Health 100%
              </span>
              <button 
                onClick={() => showToast("Exported 1,842 event packets as JSON")}
                className="px-space-sm py-1 rounded bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">download</span> Export Telemetry
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left font-body-sm text-body-sm border-collapse">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md">
                  <th className="py-space-sm px-space-md rounded-l">Timestamp</th>
                  <th className="py-space-sm px-space-md">Ingress Source</th>
                  <th className="py-space-sm px-space-md">Sender Identifier</th>
                  <th className="py-space-sm px-space-md">Assigned Vector</th>
                  <th className="py-space-sm px-space-md">Inference Engine</th>
                  <th className="py-space-sm px-space-md">Latency</th>
                  <th className="py-space-sm px-space-md rounded-r text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-space-sm px-space-md font-mono text-label-sm text-on-surface-variant">14:04:12.802</td>
                  <td className="py-space-sm px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-medium">
                      <span className="material-symbols-outlined text-[14px]">phone_in_talk</span> Telephony SIP
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md font-medium text-on-surface">+1 (650) 412-8899</td>
                  <td className="py-space-sm px-space-md">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
                      Securities Lending
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-on-surface font-mono text-label-sm">whisper-v3-large</td>
                  <td className="py-space-sm px-space-md text-secondary font-mono font-medium">112 ms</td>
                  <td className="py-space-sm px-space-md text-right">
                    <span className="px-space-xs py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold">
                      Dispatched
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-space-sm px-space-md font-mono text-label-sm text-on-surface-variant">14:04:11.419</td>
                  <td className="py-space-sm px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary font-medium">
                      <span className="material-symbols-outlined text-[14px]">alternate_email</span> TLS Exchange
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md font-medium text-on-surface">j.doe@firstheritage.com</td>
                  <td className="py-space-sm px-space-md">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
                      Escrow Release
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-on-surface font-mono text-label-sm">fh-mime-v2</td>
                  <td className="py-space-sm px-space-md text-secondary font-mono font-medium">144 ms</td>
                  <td className="py-space-sm px-space-md text-right">
                    <span className="px-space-xs py-0.5 rounded-full font-label-sm text-label-sm bg-secondary-fixed text-on-secondary-fixed font-bold">
                      Dispatched
                    </span>
                  </td>
                </tr>
                <tr className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="py-space-sm px-space-md font-mono text-label-sm text-on-surface-variant">14:04:10.021</td>
                  <td className="py-space-sm px-space-md">
                    <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-secondary font-medium">
                      <span className="material-symbols-outlined text-[14px]">chat</span> WhatsApp API
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md font-medium text-on-surface">+91 99203 10091</td>
                  <td className="py-space-sm px-space-md">
                    <span className="px-space-xs py-0.5 rounded bg-surface-container text-on-surface font-label-sm text-label-sm">
                      Card Freeze
                    </span>
                  </td>
                  <td className="py-space-sm px-space-md text-on-surface font-mono text-label-sm">fh-regex-intent</td>
                  <td className="py-space-sm px-space-md text-secondary font-mono font-medium">42 ms</td>
                  <td className="py-space-sm px-space-md text-right">
                    <span className="px-space-xs py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface font-bold">
                      Enqueued
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Ingestion Modal */}
      {showIngestModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xl max-w-xl w-full flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Ingest Customer Interaction</h3>
              <button onClick={() => setShowIngestModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-on-surface-variant">Channel</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setModalChannel('audio')}
                  className={`px-3 py-1.5 rounded font-label-md ${modalChannel === 'audio' ? 'bg-primary text-on-primary' : 'bg-surface-container-low'}`}
                >
                  Acoustic Telephony (Audio)
                </button>
                <button
                  type="button"
                  onClick={() => setModalChannel('email')}
                  className={`px-3 py-1.5 rounded font-label-md ${modalChannel === 'email' ? 'bg-primary text-on-primary' : 'bg-surface-container-low'}`}
                >
                  MIME Email Ingestion
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-on-surface-variant">Customer Name</label>
              <input
                type="text"
                value={modalCustomer}
                onChange={(e) => setModalCustomer(e.target.value)}
                className="h-10 px-3 bg-surface-container-low rounded border border-outline-variant/40 text-on-surface"
              />
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-sm text-on-surface-variant">Raw Telephony Transcript / MIME Body</label>
              <textarea
                rows={4}
                value={modalTranscript}
                onChange={(e) => setModalTranscript(e.target.value)}
                placeholder="Paste customer call transcript or email payload..."
                className="p-3 bg-surface-container-low rounded border border-outline-variant/40 text-on-surface text-body-sm"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowIngestModal(false)}
                className="px-4 py-2 rounded bg-surface-container-high text-on-surface font-label-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCase}
                className="px-4 py-2 rounded bg-primary text-on-primary font-label-md hover:bg-primary-container"
              >
                Ingest & Route to Kafka
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
