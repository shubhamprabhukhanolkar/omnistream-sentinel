import json
from datetime import datetime
from sqlmodel import SQLModel
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from app.config import settings
from app.models import Interaction, Summary, SystemTelemetry

# Async SQLite Engine
engine = create_async_engine(
    settings.DATABASE_URL,
    echo=False,
    connect_args={"check_same_thread": False}
)

async_session = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False
)

async def get_db():
    async with async_session() as session:
        yield session

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    
    # Pre-populate seed data matching designs
    async with async_session() as session:
        # Check if telemetry already seeded
        existing_telemetry = await session.get(SystemTelemetry, "global_telemetry")
        if not existing_telemetry:
            telemetry = SystemTelemetry(
                id="global_telemetry",
                total_interactions=256800,
                human_adoptions=95.2,
                capacity_freed_seconds=256800 * 60,
                hours_freed=4280.0,
                hard_savings_inr=8400000.0,
                soft_capacity_inr=11200000.0,
                ai_run_cost_inr=30000.0,
                cost_to_serve_inr=30.25,
                payback_period_months=2.1,
                roi_multiple=3.1
            )
            session.add(telemetry)

        # Case 1: Rajesh Malhotra (Audio - NRI FastRemit & Premium Savings Dispute)
        case_1 = await session.get(Interaction, "FHF-88294")
        if not case_1:
            transcript_1 = """[00:04] AS (Anita Sharma - Privilege RM): Namaste Mr. Malhotra, thank you for calling First Heritage Privilege Banking Desk. I see your FastRemit inward alert on my terminal. How may I assist you today, sir?
[00:19] RM (Rajesh Malhotra): Anita ji, listen... uh, basically I am totally furious. My brother initiated a wire of USD 4,500 from JPMorgan Chase New York on Tuesday morning via FastRemit to my NRE Savings Account ending in 4108. Today is Friday! The SWIFT reference code is FX-9921-INW-BOM.
The money has left the US, but your Mumbai treasury desk hasn’t credited it! Moreover, I see a provisional debit penalty charge of ₹1,750 for foreign outward clearance processing! Why am I paying penalties when your systems are delaying my settlement? I want this fee waived immediately, and I need the money credited for my mother's hospital bill in Pune!
[01:42] AS (Anita Sharma - Privilege RM): I completely understand your frustration, Mr. Malhotra, and I deeply apologize for this anxiety. Let me immediately trace SWIFT FX-9921. [pause 4s • keyboard typing sounds] Yes, I can locate the MT103 packet. It was quarantined at Central Clearing Hub due to the beneficiary name matching an extra middle initial "K".
I am triggering an automated internal clearance override right now under Priority SLA. Furthermore, I have already reversed the ₹1,750 handling levy—you will receive an instant SMS confirmation. Because you are a Privilege Client, I am releasing a provisional bridge credit of USD 4,500 equivalent in INR directly into your NRE account within 45 minutes.
[03:15] RM (Rajesh Malhotra): Alright, thank you Anita. If the provisional credit reflects within 45 minutes and the ₹1,750 fee is credited back, I am satisfied. Please ensure the confirmation SMS is sent to my Singapore registered mobile number +65 9128 4402 as well as my Indian WhatsApp.
[04:02] AS (Anita Sharma - Privilege RM): Noted with priority, Mr. Malhotra. Dual dispatch confirmed to both numbers. Ticket #FHF-88294 has been tagged with Treasury Desk head sign-off. Have a peaceful evening, sir."""

            case_1 = Interaction(
                id="FHF-88294",
                channel="audio",
                customer_name="Rajesh Malhotra",
                customer_cif="CIF-99482103",
                customer_tier="Platinum NRI / Privilege Banking",
                title="NRI FastRemit & Premium Savings Dispute",
                relationship_manager="Anita Sharma",
                raw_transcript=transcript_1,
                status="Ready_for_Human",
                audio_duration="04:18",
                noise_floor="-42dB",
                filler_words_count=14
            )
            session.add(case_1)

            actions_1 = [
                {
                    "title": "SWIFT UETR FX-9921 Inspection Executed",
                    "detail": "Located MT103 packet held at Central Hub for middle initial mismatch (\"K\")",
                    "status": "COMPLETED",
                    "badge_color": "emerald"
                },
                {
                    "title": "₹1,750 Processing Fee Reversal Initiated",
                    "detail": "Auth code #REV-7721 applied under RM Privilege Discretionary Policy",
                    "status": "REVERSED",
                    "badge_color": "emerald"
                },
                {
                    "title": "Provisional Bridge Credit ($4,500 Equivalent INR)",
                    "detail": "Treasury Clearing Hub SLA dispatch scheduled within 45 mins",
                    "status": "PROCESSING",
                    "badge_color": "amber"
                },
                {
                    "title": "Dual Delivery SMS Dispatch",
                    "detail": "Sent to Singapore (+65 9128 4402) and India WhatsApp Gateway",
                    "status": "DELIVERED",
                    "badge_color": "emerald"
                }
            ]

            sentiment_1 = {
                "inception_score": -78,
                "inception_label": "High Anxious • Frustrated",
                "inception_trigger": "Healthcare emergency combined with unexplained debit fee.",
                "resolution_score": 64,
                "resolution_label": "Neutral / Constructive",
                "resolution_outcome": "Immediate fee reversal & transparent 45-min bridge credit commitment."
            }

            summary_1 = Summary(
                id="SUMM-88294",
                interaction_id="FHF-88294",
                generated_text="Urgent inquiry and formal grievance regarding delayed foreign inward remittance (USD 4,500) dispatched via JPMorgan Chase into NRE Account #...4108. Customer demands immediate credit release and absolute waiver/reversal of ₹1,750 inward handling fee.",
                intent="Urgent inquiry and formal grievance regarding delayed foreign inward remittance (USD 4,500) dispatched via JPMorgan Chase into NRE Account #...4108. Customer demands immediate credit release and absolute waiver/reversal of ₹1,750 inward handling fee.",
                category="Cross-Border FX / Remittance Delay",
                priority_clause="Medical Emergency Clause",
                key_actions_json=json.dumps(actions_1),
                sentiment_data_json=json.dumps(sentiment_1),
                hallucinations_detected=0,
                critic_approved=True,
                critic_feedback="Sentinel Verification: 100% TRUST SCORE. All entities (USD $4,500.00, SWIFT Ref FX-9921, ₹1,750 levy waiver) verified against acoustic source. Zero fabricated commitments.",
                grounding_score=1.0,
                iteration_count=1
            )
            session.add(summary_1)

        # Case 2: Dev Patel (Audio - SWIFT Outward Wire & RBI Ombudsman Grievance)
        case_2 = await session.get(Interaction, "FHF-88492")
        if not case_2:
            transcript_2 = """[00:14] Support Agent (Anil M.): Thank you for contacting First Heritage Wealth. How may I assist with your accounts today?
[00:32] Caller (Dev Patel): I need immediate escalation. I initiated an outward wire transfer yesterday of USD $4,500.00 under reference code SWIFT FX-9921, but the beneficiary bank in London informs my daughter that nothing arrived.
[01:45] Support Agent (Anil M.): I see that transaction pending internal compliance verification. It was routed to the intermediate correspondent queue.
[02:18] Caller (Dev Patel): This is unacceptable tuition deadline delay. If this remittance delay is not sorted out by noon, I am lodging a formal banking grievance with the RBI Ombudsman. Please log this complaint formally.
[03:02] Support Agent (Anil M.): I understand completely, Mr. Patel. I am opening an expedited ticket with our foreign exchange desk and tagging our swift liaison team for a priority trace."""

            case_2 = Interaction(
                id="FHF-88492",
                channel="audio",
                customer_name="Dev Patel",
                customer_cif="CIF-88492019",
                customer_tier="Wealth Management",
                title="Foreign Exchange Tuition Remittance & Regulatory Escalation",
                relationship_manager="Anil Mehta",
                raw_transcript=transcript_2,
                status="Ready_for_Human",
                audio_duration="04:12",
                noise_floor="-38dB",
                filler_words_count=9
            )
            session.add(case_2)

            actions_2 = [
                {
                    "title": "Outward Wire Trace SWIFT FX-9921",
                    "detail": "Queried London correspondent queue for tuition clearance hold",
                    "status": "COMPLETED",
                    "badge_color": "emerald"
                },
                {
                    "title": "RBI Ombudsman Grievance Classification Logged",
                    "detail": "Tagged under Section 35A Remittance Delay Statutory Ledger",
                    "status": "LOGGED",
                    "badge_color": "emerald"
                },
                {
                    "title": "Forex Desk Priority Escalation Ticket #FX-704",
                    "detail": "Expedited dispatch assigned to Treasury Ops Head",
                    "status": "PROCESSING",
                    "badge_color": "amber"
                }
            ]

            summary_2 = Summary(
                id="SUMM-88492",
                interaction_id="FHF-88492",
                generated_text="Client Dev Patel reported an uncredited outward overseas wire transfer totaling USD 4,500 under reference SWIFT Ref: FX-9921, currently held in intermediate foreign exchange routing. Explicit regulatory grievance identified: Customer cited statutory escalation to the RBI Ombudsman citing critical Remittance Delay and student fee deadline jeopardy.",
                intent="Client reported outward wire delay of USD 4,500 (SWIFT FX-9921) and issued formal RBI Ombudsman escalation warning.",
                category="Remittance Delay / Statutory Regulatory Grievance",
                priority_clause="Section 35A RBI Ombudsman Filing",
                key_actions_json=json.dumps(actions_2),
                sentiment_data_json=json.dumps({
                    "inception_score": -85,
                    "inception_label": "Severe Grievance • Escalation Risk",
                    "inception_trigger": "Student tuition deadline jeopardized by correspondent bank delay.",
                    "resolution_score": 45,
                    "resolution_label": "Calmed • Expedited Tracking Agreed",
                    "resolution_outcome": "Formally logged to grievance ledger with FX desk priority trace."
                }),
                hallucinations_detected=0,
                critic_approved=True,
                critic_feedback="100% FACT MATCH. SWIFT Ref #FX-9921 and USD $4,500.00 matched. RBI Ombudsman complaint verified verbatim. 0 Hallucinations.",
                grounding_score=1.0,
                iteration_count=1
            )
            session.add(summary_2)

        # Case 3: Retail UPI Disputed Settlement (Apollo Pharmacy Mumbai)
        case_3 = await session.get(Interaction, "FHF-90412")
        if not case_3:
            transcript_3 = """[00:03] CUST (Rajesh Malhotra): Hello? I just tried paying ₹14,250 at Apollo Pharmacy through UPI and it failed, but money got deducted from my First Heritage account immediately!
[00:24] BOT (AI Voice Bot): I understand Mr. Malhotra. Let me instantly trace the NPCI RRN reference for this debit...
[01:15] CUST: I am standing at the counter and need this resolved now.
[02:40] BOT: Verified. Initiating automated shadow credit under token RFC-491...
[03:20] AGENT (Anita Sharma): Hello Rajesh ji, I see the AI bot has already validated the timeout on NPCI Gateway. I am authorizing the ₹14,250 shadow ledger credit to your account ...9041 right now. You can retry or use card safely.
[04:05] CUST: Thank you Anita ji, the confirmation SMS just popped up. Excellent service."""

            case_3 = Interaction(
                id="FHF-90412",
                channel="audio",
                customer_name="Rajesh Malhotra",
                customer_cif="CIF-9041284",
                customer_tier="Privilege Tier",
                title="Retail UPI Disputed Settlement - Apollo Pharmacy",
                relationship_manager="Anita Sharma",
                raw_transcript=transcript_3,
                status="Ready_for_Human",
                audio_duration="04:18",
                noise_floor="-40dB",
                filler_words_count=8
            )
            session.add(case_3)

            summary_3 = Summary(
                id="SUMM-90412",
                interaction_id="FHF-90412",
                generated_text="Client attempted point-of-sale merchant transaction at Apollo Pharmacy Mumbai on 14-Oct 19:42 IST. Gateway timeout triggered dual deduction from Savings A/C ...9041 without settlement confirmation. Pre-Approved Automated Action: Release shadow ledger reversal of ₹14,250.00 into client's primary account instantly via NPCI IMPS corridor.",
                intent="UPI double deduction dispute at merchant point-of-sale requiring immediate shadow reversal.",
                category="Retail UPI / POS Settlement Failure",
                priority_clause="Real-Time Shadow Remediation",
                key_actions_json=json.dumps([
                    {
                        "title": "NPCI Gateway Timeout Confirmed",
                        "detail": "RRN #90412-291 verified failed-at-acquirer",
                        "status": "COMPLETED",
                        "badge_color": "emerald"
                    },
                    {
                        "title": "Immediate Shadow Credit ₹14,250.00 Released",
                        "detail": "Credited via NPCI IMPS corridor under Token RFC-491",
                        "status": "COMPLETED",
                        "badge_color": "emerald"
                    }
                ]),
                sentiment_data_json=json.dumps({
                    "inception_score": -60,
                    "inception_label": "Anxious • Counter Delay",
                    "resolution_score": 88,
                    "resolution_label": "High Satisfaction • Instant Rebound",
                    "resolution_outcome": "Immediate shadow reversal delivered before call completion."
                }),
                hallucinations_detected=0,
                critic_approved=True,
                critic_feedback="All amounts (₹14,250.00), merchant (Apollo Pharmacy), and remediation steps 100% corroborated.",
                grounding_score=1.0,
                iteration_count=1
            )
            session.add(summary_3)

        # Case 4: Email Inward Remittance - Awaiting processing
        case_4 = await session.get(Interaction, "FHF-77103")
        if not case_4:
            email_payload = """From: sunil.kapoor@singnet.com.sg
To: wealthdesk@firstheritagebank.com
Subject: Notice of Inward Wire Transfer USD 12,000 - A/C 9041203991
Date: Thu, 12 Nov 2026 14:22:10 +0800

Dear First Heritage Wealth Team,
I have initiated a remittance of USD 12,000 from DBS Bank Singapore towards my NRO deposit account #9041203991 for quarterly advance commercial tax payment. 
The DBS transaction reference is DBS-FX-SG-2026-8812. 
Please confirm if any Form 15CA/CB documentation is mandatory for this tier or if automated clearing applies. Also request preferential FX conversion spread as agreed with my RM Sanjay Joshi.

Kind regards,
Sunil Kapoor
CIF: CIF-77103991"""

            case_4 = Interaction(
                id="FHF-77103",
                channel="email",
                customer_name="Sunil Kapoor",
                customer_cif="CIF-77103991",
                customer_tier="Wealth NRI",
                title="MIME Thread: Foreign Inward Tax Remittance Notice (USD 12k)",
                relationship_manager="Sanjay Joshi",
                raw_transcript=email_payload,
                status="Processing",
                audio_duration="N/A (Email MIME)",
                noise_floor="0dB (Digital)",
                filler_words_count=0
            )
            session.add(case_4)

        await session.commit()
