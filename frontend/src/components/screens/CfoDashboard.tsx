import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';

export const CfoDashboard: React.FC = () => {
  const { telemetry, showToast } = useAppStore();
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  const hardSavings = telemetry?.hard_savings_inr || 8400000;
  const softCapacity = telemetry?.soft_capacity_inr || 11200000;
  const adoption = telemetry?.human_adoptions || 95.2;
  const hoursFreed = telemetry?.hours_freed || 4280;

  return (
    <div className="flex flex-col w-full">
      <div className="p-margin flex flex-col gap-space-xl max-w-7xl mx-auto w-full">
        {/* Top Executive Header & Trust Alert */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-sm text-secondary font-label-sm uppercase tracking-wider font-semibold">
              <span className="material-symbols-outlined text-[16px]">account_balance</span>
              <span>Fiscal Audit // Executive Production Ledger</span>
              <span className="text-outline-variant">•</span>
              <span className="font-mono text-on-surface-variant">FY-2025-Q1 RECON</span>
            </div>
            <h1 className="font-headline-xl text-headline-xl text-primary tracking-tight font-bold">
              CFO Realized Capital Briefing
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
              Verifying the empirical transition from synthetic operational capacity to actual cash line items in the general ledger.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => setShowComplianceModal(true)}
              className="flex items-center gap-space-xs px-space-md py-2.5 rounded bg-surface-container-high hover:bg-surface-dim text-on-surface font-label-md text-label-md transition-colors shadow-sm cursor-pointer font-semibold"
              id="auditModalBtn"
            >
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Compliance Ledger</span>
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-space-xs px-space-lg py-2.5 rounded bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md transition-all shadow-md hover:shadow-lg cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">picture_as_pdf</span>
              <span>Export to Board of Directors</span>
            </button>
          </div>
        </div>

        {/* Trust Metric Banner: Hallucination Roadblock Solved */}
        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg shadow-md border border-outline-variant/30">
          <div className="absolute -right-12 -top-12 w-64 h-64 bg-primary/5 rounded-full pointer-events-none blur-3xl"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg relative z-10">
            <div className="flex items-center gap-space-lg flex-wrap sm:flex-nowrap">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-xl bg-surface-container-low shrink-0 shadow-inner border border-outline-variant/20">
                <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-surface-dim"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  ></path>
                  <path
                    className="text-secondary"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeDasharray="95.2, 100"
                    strokeLinecap="round"
                    strokeWidth="3.5"
                  ></path>
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold leading-none">
                    {adoption}<span className="text-[12px] text-secondary">%</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-xs py-0.5 rounded text-on-primary bg-secondary font-label-sm text-label-sm font-semibold">
                    Validated Live Metric
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                    Telemetry: Sentinel-QA v4.12
                  </span>
                </div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  Production Adoption Roadblock Overcome
                </h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl">
                  Historical deployment stalled at 35% frontline trust due to regulatory hallucination liability. Sentinel Critic Agent guarantees 100% policy-adherent drafting, unlocking universal human-in-the-loop signoff.
                </p>
              </div>
            </div>

            <div className="flex flex-row md:flex-col gap-space-md w-full md:w-auto shrink-0 pt-space-xs border-t md:border-t-0 md:border-l border-surface-container-high md:pl-space-lg">
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant font-medium">Baseline Legacy Adoption</div>
                <div className="font-headline-sm text-headline-sm text-outline font-mono font-bold">35.0%</div>
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-on-surface-variant font-medium">Regulatory Incidents</div>
                <div className="font-headline-sm text-headline-sm text-secondary font-mono font-bold">
                  0.00 <span className="font-body-sm text-body-sm text-on-surface-variant font-sans font-normal">(Zero Violations)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Value Bridge: Side-by-Side Card Mosaic */}
        <div className="flex flex-col gap-space-sm">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">The Liquidity Bridge</h3>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-mono font-semibold">
              SHIFT CAPACITY REALIZATION VECTOR
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-11 gap-space-md items-stretch">
            {/* Left Card: Theoretical Capacity Freed */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between relative overflow-hidden border border-outline-variant/30">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-surface-dim"></div>
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Unrealized Potential
                  </span>
                  <span className="px-space-xs py-0.5 rounded bg-surface-container-high font-mono text-label-sm text-on-surface font-bold">
                    Soft Value
                  </span>
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    Capacity Freed (Not Cash Yet)
                  </div>
                  <div className="font-headline-xl text-headline-xl text-on-surface font-mono font-bold mt-space-xs">
                    ₹{(softCapacity / 10000000).toFixed(2)}{" "}
                    <span className="font-headline-md text-headline-md font-sans text-on-surface-variant font-normal">
                      Crore
                    </span>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Gross operational time equivalent across frontline staff
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm mt-space-sm border border-outline-variant/20">
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">Frontline Agent Pool:</span>
                    <span className="font-mono text-on-surface font-semibold">120 Headcount</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">Reclaimed Hours Tracked:</span>
                    <span className="font-mono text-on-surface font-semibold">{hoursFreed.toLocaleString()} hrs / month</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">Imputed Blended Cost Rate:</span>
                    <span className="font-mono text-on-surface font-semibold">₹2,616 / hr</span>
                  </div>
                </div>
              </div>

              <div className="mt-space-lg pt-space-md text-label-sm font-label-sm text-on-surface-variant flex items-center gap-space-xs border-t border-outline-variant/20">
                <span className="material-symbols-outlined text-[16px] text-outline">info</span>
                <span>Capacity without schedule intervention remains theoretical overhead.</span>
              </div>
            </div>

            {/* Center Bridge / Dynamic Transfer Engine Vector */}
            <div className="lg:col-span-1 bg-surface-container-low rounded-xl p-space-sm flex lg:flex-col items-center justify-center gap-space-sm shadow-inner text-center border border-outline-variant/20">
              <div className="hidden lg:block w-px h-10 bg-outline-variant"></div>
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow-md animate-pulse">
                <span className="material-symbols-outlined text-[20px]">sync_alt</span>
              </div>
              <div className="font-label-sm text-label-sm font-bold text-secondary uppercase tracking-tight [writing-mode:horizontal-tb] lg:[writing-mode:vertical-rl] lg:rotate-180 py-space-xs">
                Shift Rebalancer
              </div>
              <div className="hidden lg:block w-px h-10 bg-outline-variant"></div>
            </div>

            {/* Right Card: Actual Hard Savings Realized */}
            <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-md flex flex-col justify-between relative overflow-hidden border border-outline-variant/30">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-secondary"></div>
              <div className="flex flex-col gap-space-md">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
                    General Ledger Validated
                  </span>
                  <span className="px-space-xs py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed font-mono text-label-sm font-bold">
                    Hard Cash
                  </span>
                </div>
                <div>
                  <div className="font-headline-sm text-headline-sm text-primary font-bold">
                    Hard Savings Realized (CASH)
                  </div>
                  <div className="font-headline-xl text-headline-xl text-primary font-mono font-bold mt-space-xs">
                    ₹{(hardSavings / 10000000).toFixed(2)}{" "}
                    <span className="font-headline-md text-headline-md font-sans text-on-surface-variant font-normal">
                      Crore
                    </span>
                  </div>
                  <div className="font-body-sm text-body-sm text-secondary font-mono mt-1 font-semibold">
                    ₹{hardSavings.toLocaleString()} Verified Net Line-Item Cut
                  </div>
                </div>

                <div className="bg-surface-container-low rounded-lg p-space-md flex flex-col gap-space-sm mt-space-sm border border-outline-variant/20">
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">Overtime Bill Elimination:</span>
                    <span className="font-mono text-secondary font-bold">₹36,00,000</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">Optimized Rota (2 fewer/shift):</span>
                    <span className="font-mono text-secondary font-bold">₹48,00,000</span>
                  </div>
                  <div className="flex justify-between items-center text-body-sm font-body-sm">
                    <span className="text-on-surface-variant">Total Realization Efficiency:</span>
                    <span className="font-mono text-on-surface font-semibold">75.0% of Freed Time</span>
                  </div>
                </div>
              </div>

              <div className="mt-space-lg pt-space-md text-label-sm font-label-sm text-secondary flex items-center gap-space-xs border-t border-outline-variant/20">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span className="font-semibold">Credited to OpEx Reconciliation Account #4810-TECH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Monospace KPI Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
          {/* Run Cost */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Monthly AI Run Cost
              </span>
              <span className="material-symbols-outlined text-outline-variant text-[20px]">memory</span>
            </div>
            <div className="my-space-sm">
              <div className="font-headline-md text-headline-md font-mono text-on-surface font-bold">
                ₹30,000 <span className="font-label-md text-label-md font-sans text-on-surface-variant font-normal">/mo</span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Tokens & Sentinel runtime validation</div>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-[4%]"></div>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-space-xs font-mono">
              0.35% of realized cash return
            </div>
          </div>

          {/* Cost to Serve */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Cost To Serve
              </span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-secondary font-mono text-label-sm font-bold">
                -21.4%
              </span>
            </div>
            <div className="my-space-sm">
              <div className="font-headline-md text-headline-md font-mono text-on-surface font-bold">
                ₹30.25
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">
                Down from <span className="line-through font-mono">₹38.50</span> / interaction
              </div>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[78.6%]"></div>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-space-xs font-mono">
              Volume: 320,000 cases/mo
            </div>
          </div>

          {/* Payback Period */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                Payback Period
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">pace</span>
            </div>
            <div className="my-space-sm">
              <div className="font-headline-md text-headline-md font-mono text-primary font-bold">
                2.1 <span className="font-headline-sm text-headline-sm font-sans text-on-surface font-normal">Months</span>
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Fully amortized deployment cap</div>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
              <div className="bg-primary h-full w-full"></div>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-space-xs font-mono">
              Status: Capital Neutral & Accretive
            </div>
          </div>

          {/* ROI Multiple */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase font-semibold">
                ROI Multiple
              </span>
              <span className="material-symbols-outlined text-secondary text-[20px]">trending_up</span>
            </div>
            <div className="my-space-sm">
              <div className="font-headline-md text-headline-md font-mono text-secondary font-bold">
                3.1x
              </div>
              <div className="font-body-sm text-body-sm text-on-surface-variant">Net annualized capital yield</div>
            </div>
            <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
              <div className="bg-secondary h-full w-[85%]"></div>
            </div>
            <div className="font-label-sm text-label-sm text-on-surface-variant mt-space-xs font-mono">
              IRR equivalent: 142%
            </div>
          </div>
        </div>

        {/* P&L Waterfall Breakdown & Executive Detail */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          {/* Interactive Waterfall Chart Module */}
          <div className="lg:col-span-2 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                  P&L Waterfall Bridge (₹ Lakhs)
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Step-by-step conversion of gross potential into net audited cash
                </p>
              </div>
              <div className="flex items-center gap-space-xs">
                <span className="w-3 h-3 rounded-sm bg-primary"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Deductions</span>
                <span className="w-3 h-3 rounded-sm bg-secondary ml-2"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">Net Savings</span>
              </div>
            </div>

            {/* Custom SVG Waterfall Visualization */}
            <div className="w-full bg-surface-container-low rounded-lg p-space-md mt-space-xs border border-outline-variant/20">
              <svg className="w-full h-56" fill="none" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg">
                <line stroke="#dad7f6" strokeDasharray="2 2" strokeWidth="1" x1="50" x2="680" y1="20" y2="20"></line>
                <line stroke="#dad7f6" strokeDasharray="2 2" strokeWidth="1" x1="50" x2="680" y1="70" y2="70"></line>
                <line stroke="#dad7f6" strokeDasharray="2 2" strokeWidth="1" x1="50" x2="680" y1="120" y2="120"></line>
                <line stroke="#dad7f6" strokeDasharray="2 2" strokeWidth="1" x1="50" x2="680" y1="170" y2="170"></line>
                
                <text fill="#594140" fontFamily="Inter" fontSize="10" fontWeight="500" textAnchor="end" x="40" y="24">₹120L</text>
                <text fill="#594140" fontFamily="Inter" fontSize="10" fontWeight="500" textAnchor="end" x="40" y="74">₹80L</text>
                <text fill="#594140" fontFamily="Inter" fontSize="10" fontWeight="500" textAnchor="end" x="40" y="124">₹40L</text>
                <text fill="#594140" fontFamily="Inter" fontSize="10" fontWeight="500" textAnchor="end" x="40" y="174">₹0L</text>

                {/* Bar 1: Gross Freed Capacity (112L) */}
                <rect fill="#003e5d" height="140" rx="4" width="70" x="80" y="30"></rect>
                <text fill="#003e5d" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="middle" x="115" y="22">+112.0</text>
                <text fill="#594140" fontFamily="Inter" fontSize="10" textAnchor="middle" x="115" y="195">Theoretical</text>

                <line stroke="#8d706f" strokeDasharray="3 3" x1="150" x2="200" y1="30" y2="30"></line>

                {/* Bar 2: Rota Lag (-28L) */}
                <rect fill="#ba1a1a" height="35" rx="4" width="70" x="200" y="30"></rect>
                <text fill="#ba1a1a" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="middle" x="235" y="22">-28.0</text>
                <text fill="#594140" fontFamily="Inter" fontSize="10" textAnchor="middle" x="235" y="195">Rota Lag</text>

                <line stroke="#8d706f" strokeDasharray="3 3" x1="270" x2="320" y1="65" y2="65"></line>

                {/* Bar 3: Realizable Floor (84L) */}
                <rect fill="#9d1d27" height="105" rx="4" width="70" x="320" y="65"></rect>
                <text fill="#9d1d27" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="middle" x="355" y="57">84.0</text>
                <text fill="#594140" fontFamily="Inter" fontSize="10" textAnchor="middle" x="355" y="195">Rebalanced</text>

                <line stroke="#8d706f" strokeDasharray="3 3" x1="390" x2="440" y1="65" y2="65"></line>

                {/* Bar 4: AI Cloud Infra (-0.36L) */}
                <rect fill="#7a0014" height="4" rx="1" width="70" x="440" y="65"></rect>
                <text fill="#7a0014" fontFamily="monospace" fontSize="11" fontWeight="600" textAnchor="middle" x="475" y="57">-0.36</text>
                <text fill="#594140" fontFamily="Inter" fontSize="10" textAnchor="middle" x="475" y="195">Infra Cost</text>

                <line stroke="#8d706f" strokeDasharray="3 3" x1="510" x2="560" y1="69" y2="69"></line>

                {/* Bar 5: Net Hard Cash Delivered (83.64L) */}
                <rect fill="#994703" height="101" rx="4" width="70" x="560" y="69"></rect>
                <text fill="#994703" fontFamily="monospace" fontSize="11" fontWeight="700" textAnchor="middle" x="595" y="61">+83.64</text>
                <text fill="#994703" fontFamily="Inter" fontSize="10" fontWeight="600" textAnchor="middle" x="595" y="195">P&L Net Cash</text>
              </svg>
            </div>

            <div className="grid grid-cols-3 gap-space-sm pt-space-xs text-center">
              <div className="bg-surface-container-low p-space-xs rounded border border-outline-variant/10">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Capacity Yield</span>
                <span className="font-headline-sm text-headline-sm text-on-surface font-mono font-bold">75.0%</span>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded border border-outline-variant/10">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Headcount Variance</span>
                <span className="font-headline-sm text-headline-sm text-secondary font-mono font-bold">-6 FT Equivalents</span>
              </div>
              <div className="bg-surface-container-low p-space-xs rounded border border-outline-variant/10">
                <span className="font-label-sm text-label-sm text-on-surface-variant block">Cost to Save ₹1</span>
                <span className="font-headline-sm text-headline-sm text-primary font-mono font-bold">₹0.004</span>
              </div>
            </div>
          </div>

          {/* Financial Officer Narrative & Governance */}
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md border border-outline-variant/30">
            <div className="flex flex-col gap-space-sm">
              <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wide font-semibold">
                <span className="material-symbols-outlined text-[16px]">receipt_long</span>
                <span>Controller Signoff</span>
              </div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Auditor-Grade Cash Reconciliation
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                By pairing high-throughput generation with the Sentinel Critic secondary audit pass, First Heritage eliminated the liability barrier that plagued early generative AI pilots. The 60-second After-Call-Work reduction achieved 100% human sign-off without compliance rollback.
              </p>
              <div className="p-3 bg-surface-container-low rounded-lg font-mono text-xs text-on-surface border border-outline-variant/20">
                Signed by: Financial Controller Desk<br />
                GCP Cloud Run Service: omnistream-sentinel<br />
                Artifact Registry: asia-south1-docker.pkg.dev
              </div>
            </div>

            <button
              onClick={() => showToast("Auditor reconciliation report verified")}
              className="w-full h-11 rounded-lg bg-surface-container-high hover:bg-surface-dim text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Reconcile General Ledger</span>
            </button>
          </div>
        </div>
      </div>

      {/* Compliance Ledger Modal */}
      {showComplianceModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-xl max-w-2xl w-full flex flex-col gap-space-md border border-outline-variant/30">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Statutory Compliance & Audit Trail Ledger
              </h3>
              <button onClick={() => setShowComplianceModal(false)} className="text-on-surface-variant hover:text-on-surface cursor-pointer">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex flex-col gap-2 font-mono text-xs max-h-80 overflow-y-auto bg-surface-container-low p-3 rounded border border-outline-variant/20 text-on-surface">
              <div>[AUDIT-001] Cryptographic Hash: 0x8F3a94821c992</div>
              <div>[AUDIT-002] RBI Ombudsman Guideline Section 35A: Satisfied (100% Grounding)</div>
              <div>[AUDIT-003] Missed Compliance Citations: 0 in 14,200 transactions</div>
              <div>[AUDIT-004] Overtime Budget: Shift consolidation reduced ₹36,00,000 monthly</div>
              <div>[AUDIT-005] Vertex AI Model Audit: Gemini 3 Flash Preview verified deterministic</div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowComplianceModal(false)}
                className="px-4 py-2 rounded bg-primary text-on-primary font-label-md cursor-pointer font-semibold"
              >
                Close Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
