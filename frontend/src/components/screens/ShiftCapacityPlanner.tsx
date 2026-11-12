import React from 'react';
import { useAppStore } from '../../store/useAppStore';

export const ShiftCapacityPlanner: React.FC = () => {
  const { erlangStaffing, setErlangStaffing, erlangData, telemetry, showToast } = useAppStore();

  const hubs = telemetry?.hubs || [
    { name: "Mumbai", hours: 1240, shifts_day: 14, utilization: 94 },
    { name: "Bengaluru", hours: 1080, shifts_day: 12, utilization: 88 },
    { name: "Delhi NCR", hours: 920, shifts_day: 10, utilization: 82 },
    { name: "Chennai", hours: 580, shifts_day: 8, utilization: 76 },
    { name: "Pune", hours: 460, shifts_day: 6, utilization: 70 }
  ];

  const totalHours = telemetry ? telemetry.hours_freed : 4280;

  return (
    <div className="flex flex-col w-full">
      <div className="p-margin flex flex-col gap-space-xl max-w-[1400px] mx-auto w-full">
        {/* Top Strategic Anchor: Page Header & Executive KPI Ribbon */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm">
              <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                STAGE 05: WORKFORCE ALLOCATION
              </span>
              <span className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span> Real-Time Production Bridge
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight font-bold">
              Shift & Capacity Planner
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Monetizing automated post-call telemetry. Transforming cumulative 60-second summary wrap-up reductions into tangible shift consolidation and direct OPEX reallocation.
            </p>
          </div>

          {/* Action & Filter Pills */}
          <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-lowest p-space-xs rounded-xl shadow-sm border border-outline-variant/30">
            <div className="flex items-center px-space-sm py-1.5 bg-surface-container-low rounded-lg text-on-surface font-label-md text-label-md gap-space-xs">
              <span className="material-symbols-outlined text-[18px] text-primary">location_city</span>
              <span className="font-semibold">5 Hubs Aggregated</span>
            </div>
            <button
              onClick={() => showToast("Live roster synchronized across Mumbai, Bengaluru, Delhi, Chennai & Pune")}
              className="px-space-md py-1.5 bg-primary text-on-primary rounded-lg font-label-md text-label-md hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer font-semibold shadow-sm"
              id="viewToggleRoster"
            >
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              <span>Live Synchronized Roster</span>
            </button>
            <button
              onClick={() => showToast("Exported ERP Schedule as CSV/JSON")}
              className="px-space-md py-1.5 bg-surface-container-high text-on-surface rounded-lg font-label-md text-label-md hover:bg-surface-dim transition-colors flex items-center gap-1.5 cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export ERP Schedule</span>
            </button>
          </div>
        </div>

        {/* Hero Metric Banner: 4,280 Hours Freed & Hub Breakdown */}
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg relative overflow-hidden flex flex-col xl:flex-row gap-space-xl items-stretch border border-outline-variant/30">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute right-96 -bottom-10 w-48 h-48 bg-secondary-fixed/30 rounded-full blur-2xl pointer-events-none"></div>

          {/* Main Anchor Metric */}
          <div className="xl:w-5/12 flex flex-col justify-between pr-0 xl:pr-space-xl border-b xl:border-b-0 xl:border-r border-outline-variant/20 pb-4 xl:pb-0">
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold">
                  Total Efficiency Gain • Current Rolling Week
                </span>
                <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
                  <span className="material-symbols-outlined text-[16px]">trending_up</span> +14.6% vs Target
                </span>
              </div>
              <div className="flex items-baseline gap-space-sm pt-space-xs">
                <span className="font-headline-xl text-headline-xl text-primary font-extrabold tracking-tight">
                  {totalHours.toLocaleString()}
                </span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-medium">Hours Freed</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Calculated across 256,800 validated caller touchpoints. Automated Drafter generation and Sentinel QA stripped 60 seconds of manual ACW (After Call Work) from every record.
              </p>
            </div>

            <div className="pt-space-md mt-space-md bg-surface-container-low p-space-md rounded-lg flex items-center justify-between border border-outline-variant/20">
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Baseline AHT</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-semibold line-through decoration-primary decoration-2">
                  5m 45s
                </span>
              </div>
              <span className="material-symbols-outlined text-primary text-[28px]">arrow_forward</span>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-primary font-semibold">AI-Assisted AHT</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">4m 45s</span>
              </div>
              <div className="w-px h-8 bg-outline-variant"></div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Instant Net Gain</span>
                <span className="font-label-lg text-label-lg text-secondary font-bold">60s / Call</span>
              </div>
            </div>
          </div>

          {/* Hub Breakdown Cards */}
          <div className="xl:w-7/12 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-space-xs">
              <span className="font-label-md text-label-md text-on-surface font-semibold">
                Tier-1 Operational Hub Telemetry
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Normalized 8-Hour Shift Quotas
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm pt-space-xs">
              {hubs.map((hub) => (
                <div
                  key={hub.name}
                  className="bg-surface-container-low p-space-sm rounded-lg flex flex-col gap-space-xs hover:bg-surface-container-high transition-colors border border-outline-variant/20"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-bold text-on-surface">{hub.name}</span>
                    <span className="w-2 h-2 rounded-full bg-secondary"></span>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold">
                    {hub.hours.toLocaleString()} h
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {hub.shifts_day} shifts/day
                  </span>
                  <div className="w-full bg-surface-dim h-1 rounded-full overflow-hidden mt-1">
                    <div className="bg-primary h-full" style={{ width: `${hub.utilization}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Real-Time Cash Savings Callout Pill */}
            <div className="mt-space-md p-space-sm bg-secondary-fixed/30 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border border-secondary-fixed/50">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">currency_rupee</span>
                </div>
                <div>
                  <span className="font-label-md text-label-md text-on-secondary-fixed font-bold">
                    Direct P&L Hard Cash Unlock:
                  </span>
                  <span className="font-body-sm text-body-sm text-on-secondary-fixed block">
                    ₹14.2 Lakhs / month liberated into High-Value Outbound Wealth Advisory
                  </span>
                </div>
              </div>
              <span className="px-space-sm py-1 bg-surface-container-lowest text-secondary font-label-md text-label-md rounded shadow-xs whitespace-nowrap self-start sm:self-auto font-bold">
                Audit Approved
              </span>
            </div>
          </div>
        </div>

        {/* Centerpiece Interactive Section: The Schedule Optimizer & Hard Realignment Widget */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-start">
          {/* Interactive Schedule Optimizer Tool (8 Columns) */}
          <div className="xl:col-span-8 bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-lg border border-outline-variant/30">
            {/* Header & Simulation Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md pb-space-sm border-b border-outline-variant/20">
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Dynamic Shift Capacity Modeler
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Simulate Erlang-C staffing requirements under automated 60-second summary reduction.
                </p>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-low p-1 rounded-lg border border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant px-space-xs">Erlang Standard:</span>
                <span className="px-2 py-0.5 rounded bg-surface-container-lowest font-label-sm text-label-sm text-primary font-semibold shadow-xs">
                  C-Modified
                </span>
              </div>
            </div>

            {/* The Interactive Range Slider */}
            <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-md border border-outline-variant/20">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
                  <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                    Target Shift Manning Level
                  </span>
                </div>
                <div className="flex items-center gap-space-md">
                  <span
                    className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-label-md font-bold"
                    id="sliderStatusTag"
                  >
                    {erlangData.status_tag}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-primary font-bold" id="agentsPerShiftDisplay">
                    {erlangStaffing} Agents
                  </span>
                </div>
              </div>

              {/* Custom Interactive Slider Track */}
              <div className="flex flex-col gap-space-xs">
                <input
                  className="w-full h-2.5 bg-surface-dim rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none"
                  id="staffingSlider"
                  max="54"
                  min="48"
                  step="1"
                  type="range"
                  value={erlangStaffing}
                  onChange={(e) => setErlangStaffing(parseInt(e.target.value, 10))}
                />
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-1 px-1">
                  <span>Hyper-Lean (48)</span>
                  <span className="text-primary font-semibold">AI Optimized (50)</span>
                  <span>Legacy Baseline (52)</span>
                  <span>Over-Provisioned (54)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm pt-space-xs">
                <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between border border-outline-variant/10">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Daily Demand Absorbed</span>
                  <span className="font-label-md text-label-md text-on-surface font-bold">48,000 Calls</span>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between border border-outline-variant/10">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Shift SLA Confidence</span>
                  <span className="font-label-md text-label-md text-secondary font-bold" id="slaConfidenceDisplay">
                    {erlangData.sla_confidence}%
                  </span>
                </div>
                <div className="bg-surface-container-lowest p-space-sm rounded-lg flex items-center justify-between border border-outline-variant/10">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Idle Seat Ratio</span>
                  <span className="font-label-md text-label-md text-primary font-bold" id="idleRatioDisplay">
                    {erlangData.idle_ratio}% (Target)
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Shift Timeline Schedule */}
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  24-Hour Production Roster Distribution
                </span>
                <div className="flex items-center gap-space-md font-label-sm text-label-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-primary"></span> Core Manning
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-secondary-container"></span> Surplus Liberated
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded bg-surface-dim"></span> Buffer Standby
                  </span>
                </div>
              </div>

              {/* Morning Shift */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary font-bold">
                      <span className="material-symbols-outlined text-[18px]">wb_sunny</span>
                    </span>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Shift A: Morning Peak (07:00 - 15:30)
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block">
                        Primary Retail & NEFT/RTGS Disputes
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-label-md text-label-md text-primary font-bold">
                      {erlangData.shift_a_manning}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary block font-semibold">
                      +{52 - erlangStaffing >= 0 ? 52 - erlangStaffing : 0} Reallocated to Outbound
                    </span>
                  </div>
                </div>

                <div className="h-6 w-full bg-surface-dim rounded-md overflow-hidden flex mt-space-xs">
                  <div className="h-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-label-sm" style={{ width: '82%' }}>
                    42 Handling
                  </div>
                  <div className="h-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-sm text-label-sm flex items-center justify-center" style={{ width: '14%' }}>
                    8 Ready
                  </div>
                  <div className="h-full bg-secondary-container text-on-secondary font-label-sm text-label-sm flex items-center justify-center font-bold" style={{ width: '4%' }}>
                    -2
                  </div>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-0.5">
                  <span>07:00</span>
                  <span>09:00 (Rush)</span>
                  <span>11:30 (Peak)</span>
                  <span>13:30</span>
                  <span>15:30</span>
                </div>
              </div>

              {/* Afternoon Shift */}
              <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-xs border border-outline-variant/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <span className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-secondary font-bold">
                      <span className="material-symbols-outlined text-[18px]">wb_twilight</span>
                    </span>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface font-bold">
                        Shift B: Midday Regular (15:00 - 23:30)
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant block">
                        Cards Settlement, UPI Verification, Demat queries
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-label-md text-label-md text-primary font-bold">
                      {erlangData.shift_b_manning}
                    </span>
                    <span className="font-label-sm text-label-sm text-secondary block font-semibold">
                      +{52 - erlangStaffing >= 0 ? 52 - erlangStaffing : 0} Reallocated to Outbound
                    </span>
                  </div>
                </div>

                <div className="h-6 w-full bg-surface-dim rounded-md overflow-hidden flex mt-space-xs">
                  <div className="h-full bg-primary flex items-center justify-center text-on-primary font-label-sm text-label-sm" style={{ width: '78%' }}>
                    40 Handling
                  </div>
                  <div className="h-full bg-tertiary-fixed-dim text-on-tertiary-fixed font-label-sm text-label-sm flex items-center justify-center" style={{ width: '18%' }}>
                    10 Ready
                  </div>
                  <div className="h-full bg-secondary-container text-on-secondary font-label-sm text-label-sm flex items-center justify-center font-bold" style={{ width: '4%' }}>
                    -2
                  </div>
                </div>
                <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant pt-0.5">
                  <span>15:00</span>
                  <span>17:00</span>
                  <span>19:30 (UPI Rush)</span>
                  <span>21:30</span>
                  <span>23:30</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Allocation Destination Card (4 Columns) */}
          <div className="xl:col-span-4 flex flex-col gap-space-md">
            <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant/20">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Capacity Reallocation Destination
                </span>
                <span className="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold">
                  Active
                </span>
              </div>

              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  High-Value NRI Outbound Advisory
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 leading-relaxed">
                  Freed frontline bandwidth is immediately channeled away from administrative note-taking into revenue-generating relationship banking.
                </p>
              </div>

              <div className="bg-surface-container-low p-space-md rounded-lg flex flex-col gap-space-sm border border-outline-variant/20">
                <div className="flex items-center justify-between font-body-sm">
                  <span className="text-on-surface-variant">Transferred Capacity:</span>
                  <span className="font-bold text-primary">6 FTE Equivalents</span>
                </div>
                <div className="flex items-center justify-between font-body-sm">
                  <span className="text-on-surface-variant">Net AUM Mobilized:</span>
                  <span className="font-bold text-secondary">₹3.4 Crore / mo</span>
                </div>
                <div className="flex items-center justify-between font-body-sm">
                  <span className="text-on-surface-variant">Outbound Conversion:</span>
                  <span className="font-bold text-on-surface">2.4x Baseline</span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Shift Reallocation Audit Log
                </span>
                <div className="flex flex-col gap-2 font-body-sm text-body-sm">
                  <div className="flex items-center justify-between p-2 rounded bg-surface-container-low border border-outline-variant/10">
                    <span className="text-on-surface font-medium">Rota Batch #RB-2026-Q1</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold">Approved</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-surface-container-low border border-outline-variant/10">
                    <span className="text-on-surface font-medium">Headcount Shift Signoff</span>
                    <span className="font-label-sm text-label-sm text-secondary font-bold">Verified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
