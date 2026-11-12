import { create } from 'zustand';

export type PipelineStage = 
  | 'omnichannel-intake' 
  | 'drafter-agent' 
  | 'sentinel-critic' 
  | 'agent-workspace' 
  | 'shift-capacity' 
  | 'cfo-financials';

export interface KeyActionItem {
  title: string;
  detail: string;
  status: string;
  badge_color?: string;
}

export interface SentimentData {
  inception_score: number;
  inception_label: string;
  inception_trigger?: string;
  resolution_score: number;
  resolution_label: string;
  resolution_outcome?: string;
}

export interface InteractionSummary {
  id?: string;
  generated_text: string;
  intent: string;
  category: string;
  priority_clause: string;
  key_actions: KeyActionItem[];
  sentiment_data: SentimentData;
  hallucinations_detected: number;
  critic_approved: boolean;
  critic_feedback?: string;
  grounding_score: number;
  iteration_count: number;
}

export interface InteractionItem {
  id: string;
  channel: 'audio' | 'email';
  customer_name: string;
  customer_cif: string;
  customer_tier: string;
  title: string;
  relationship_manager: string;
  raw_transcript: string;
  status: 'Processing' | 'QA_Failed' | 'Ready_for_Human' | 'Completed';
  audio_duration: string;
  noise_floor: string;
  filler_words_count: number;
  created_at: string;
  updated_at: string;
  summary?: InteractionSummary | null;
}

export interface HubData {
  name: string;
  hours: number;
  shifts_day: number;
  utilization: number;
}

export interface WaterfallItem {
  label: string;
  amount_lakhs: number;
  type: 'gross' | 'deduction' | 'subtotal' | 'net';
}

export interface SystemTelemetryData {
  total_interactions: number;
  human_adoptions: number;
  capacity_freed_seconds: number;
  hours_freed: number;
  hard_savings_inr: number;
  soft_capacity_inr: number;
  ai_run_cost_inr: number;
  cost_to_serve_inr: number;
  payback_period_months: number;
  roi_multiple: number;
  hubs: HubData[];
  waterfall: WaterfallItem[];
}

interface AppState {
  activeTab: PipelineStage;
  interactions: InteractionItem[];
  selectedInteractionId: string;
  telemetry: SystemTelemetryData | null;
  pipelineStatus: 'idle' | 'ingesting' | 'drafting' | 'critiquing' | 'looping_back' | 'passed' | 'completed';
  pipelineLogs: Array<{ step: string; phase?: string; message: string; timestamp?: string }>;
  audioPlaying: boolean;
  erlangStaffing: number;
  erlangData: {
    agents_per_shift: number;
    sla_confidence: number;
    idle_ratio: number;
    status_tag: string;
    hard_savings_inr: number;
    shift_a_manning: string;
    shift_b_manning: string;
  };
  toastMessage: string | null;
  isProcessing: boolean;

  // Actions
  setActiveTab: (tab: PipelineStage) => void;
  setSelectedInteractionId: (id: string) => void;
  toggleAudioPlaying: () => void;
  setErlangStaffing: (agents: number) => void;
  showToast: (msg: string) => void;
  clearToast: () => void;
  fetchInteractions: () => Promise<void>;
  fetchTelemetry: () => Promise<void>;
  triggerPipelineStream: (interactionId: string, forceReject?: boolean) => void;
  approveInteraction: (interactionId: string) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  activeTab: 'omnichannel-intake',
  interactions: [],
  selectedInteractionId: 'FHF-88294',
  telemetry: null,
  pipelineStatus: 'idle',
  pipelineLogs: [],
  audioPlaying: false,
  erlangStaffing: 50,
  erlangData: {
    agents_per_shift: 50,
    sla_confidence: 99.82,
    idle_ratio: 3.8,
    status_tag: 'Optimized (50 Agents/Shift)',
    hard_savings_inr: 8400000.0,
    shift_a_manning: '50 on duty',
    shift_b_manning: '50 on duty'
  },
  toastMessage: null,
  isProcessing: false,

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedInteractionId: (id) => set({ selectedInteractionId: id }),
  toggleAudioPlaying: () => set((state) => ({ audioPlaying: !state.audioPlaying })),
  
  showToast: (msg) => {
    set({ toastMessage: msg });
    setTimeout(() => {
      if (get().toastMessage === msg) {
        set({ toastMessage: null });
      }
    }, 3200);
  },
  clearToast: () => set({ toastMessage: null }),

  setErlangStaffing: async (agents) => {
    set({ erlangStaffing: agents });
    try {
      const res = await fetch('/api/telemetry/simulate-erlang', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ agents_per_shift: agents })
      });
      if (res.ok) {
        const data = await res.json();
        set({ erlangData: data });
      }
    } catch {
      // Offline fallback calculation
      const sla = agents === 48 ? 98.4 : agents === 50 ? 99.82 : agents === 52 ? 99.95 : 99.99;
      const idle = agents === 48 ? 1.9 : agents === 50 ? 3.8 : agents === 52 ? 7.4 : 11.2;
      const tag = agents === 48 ? 'Hyper-Lean (48 Agents/Shift)' : agents === 50 ? 'Optimized (50 Agents/Shift)' : 'Legacy Baseline (52 Agents/Shift)';
      const savings = agents === 48 ? 9600000 : agents === 50 ? 8400000 : 3600000;
      set({
        erlangData: {
          agents_per_shift: agents,
          sla_confidence: sla,
          idle_ratio: idle,
          status_tag: tag,
          hard_savings_inr: savings,
          shift_a_manning: `${agents} on duty`,
          shift_b_manning: `${agents} on duty`
        }
      });
    }
  },

  fetchInteractions: async () => {
    try {
      const res = await fetch('/api/interactions');
      if (res.ok) {
        const data: InteractionItem[] = await res.json();
        set({ interactions: data });
        if (!get().selectedInteractionId && data.length > 0) {
          set({ selectedInteractionId: data[0].id });
        }
      }
    } catch (err) {
      console.warn("Could not fetch interactions from API, will retry:", err);
    }
  },

  fetchTelemetry: async () => {
    try {
      const res = await fetch('/api/telemetry');
      if (res.ok) {
        const data = await res.json();
        set({ telemetry: data });
      }
    } catch (err) {
      console.warn("Could not fetch telemetry:", err);
    }
  },

  triggerPipelineStream: (interactionId: string, forceReject: boolean = false) => {
    set({ isProcessing: true, pipelineStatus: 'ingesting', pipelineLogs: [] });
    
    const eventSource = new EventSource(`/api/stream/${interactionId}?force_reject_first=${forceReject}`);

    eventSource.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        const { step, phase, message } = payload;
        
        set((state) => ({
          pipelineLogs: [...state.pipelineLogs, { step, phase, message }],
          pipelineStatus: 
            step === 'orchestrator' ? 'ingesting' :
            step === 'drafter' ? 'drafting' :
            step === 'critic' ? 'critiquing' :
            step === 'critic_rejected' ? 'looping_back' :
            step === 'critic_passed' ? 'passed' :
            step === 'complete' ? 'completed' : state.pipelineStatus
        }));

        if (step === 'complete') {
          set({ isProcessing: false });
          eventSource.close();
          get().fetchInteractions();
          get().fetchTelemetry();
          get().showToast(`Case #${interactionId} passed Sentinel QA! Ready for human sign-off.`);
        }
      } catch (e) {
        console.error("Error parsing SSE event:", e);
      }
    };

    eventSource.onerror = (err) => {
      console.warn("SSE connection closed or completed:", err);
      eventSource.close();
      set({ isProcessing: false });
      get().fetchInteractions();
    };
  },

  approveInteraction: async (interactionId: string) => {
    try {
      const res = await fetch(`/api/interactions/${interactionId}/approve`, {
        method: 'POST'
      });
      if (res.ok) {
        get().showToast(`Case #${interactionId} Approved & Dispatched to Finacle CRM!`);
        await get().fetchInteractions();
        await get().fetchTelemetry();
      }
    } catch (e) {
      console.error("Error approving interaction:", e);
    }
  }
}));
