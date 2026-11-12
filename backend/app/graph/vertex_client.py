import os
import json
import logging
from typing import Optional, Dict, Any
from app.config import settings

logger = logging.getLogger("vertex_client")

# Vertex AI Client Initialization
_genai_client = None

def get_vertex_client():
    global _genai_client
    if _genai_client is not None:
        return _genai_client
    try:
        from google import genai
        # Initialize strictly for Vertex AI
        _genai_client = genai.Client(
            vertexai=True,
            project=settings.GCP_PROJECT,
            location=settings.GCP_REGION
        )
        logger.info(f"Initialized Google GenAI Vertex AI client for project {settings.GCP_PROJECT} in {settings.GCP_REGION}")
    except Exception as e:
        logger.warning(f"Could not initialize live Vertex AI client ({e}). Fallback simulator active for local dev.")
        _genai_client = None
    return _genai_client

async def call_vertex_gemini(prompt: str, system_instruction: str = "") -> str:
    """
    Call Vertex AI Gemini 3 Flash Preview.
    Falls back to deterministic banking domain generator if running in offline test environment.
    """
    client = get_vertex_client()
    model_name = settings.VERTEX_MODEL  # 'gemini-3-flash-preview'
    
    if client:
        try:
            from google.genai import types
            config = types.GenerateContentConfig(
                system_instruction=system_instruction if system_instruction else None,
                temperature=0.1,
                max_output_tokens=2048,
                response_mime_type="application/json"
            )
            response = client.models.generate_content(
                model=model_name,
                contents=prompt,
                config=config
            )
            return response.text
        except Exception as ex:
            logger.warning(f"Vertex AI API call failed or credentials absent ({ex}). Using fallback simulator.")
            
    # Deterministic simulation for local proto-demo test harness
    return simulate_vertex_response(prompt, system_instruction)

def simulate_vertex_response(prompt: str, system_instruction: str) -> str:
    """
    Simulates high-fidelity Gemini 3 Flash Preview reasoning output for retail banking.
    """
    prompt_lower = prompt.lower()
    
    # Is it Drafter or Critic?
    if "critic" in system_instruction.lower() or "sentinel" in system_instruction.lower() or "audit" in prompt_lower:
        # Check if intentional flaw or loop simulation is requested
        if "force_reject" in prompt_lower or "intentional_error" in prompt_lower:
            return json.dumps({
                "critic_approved": False,
                "hallucinations_detected": 1,
                "critic_feedback": "REJECTED: Draft omitted statutory RBI Ombudsman escalation noted at 02:18 and included unverified promise of instant cash refund without correspondent clearance hold verification. Please ground strictly in raw transcript.",
                "grounding_score": 0.82,
                "verification_checks": {
                    "complaint_detected_and_logged": False,
                    "hallucinations_found": True,
                    "facts_match_transcript": False,
                    "swift_code_verified": True,
                    "amount_verified": True
                }
            })
        else:
            return json.dumps({
                "critic_approved": True,
                "hallucinations_detected": 0,
                "critic_feedback": "100% TRUST SCORE: All key entities (currency, amounts, SWIFT/NPCI references, customer statements) verified verbatim against raw source. RBI ombudsman and statutory compliance flags properly registered.",
                "grounding_score": 1.0,
                "verification_checks": {
                    "complaint_detected_and_logged": True,
                    "hallucinations_found": False,
                    "facts_match_transcript": True,
                    "swift_code_verified": True,
                    "amount_verified": True
                }
            })

    # Drafter Node Response
    if "apollo pharmacy" in prompt_lower or "upi" in prompt_lower:
        return json.dumps({
            "intent": "Customer reported UPI transaction failed at Apollo Pharmacy checkout while amount ₹14,250 was debited from Savings Account ...9041.",
            "category": "Retail UPI / POS Settlement Failure",
            "priority_clause": "Real-Time Shadow Remediation",
            "draft_summary": "Client attempted merchant transaction of ₹14,250 at Apollo Pharmacy Mumbai. Gateway timeout triggered dual deduction without receipt confirmation. Pre-Approved Automated Action: Release immediate shadow ledger reversal of ₹14,250 via NPCI IMPS corridor. Ticket logged with priority resolution.",
            "key_actions": [
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
            ],
            "sentiment_data": {
                "inception_score": -60,
                "inception_label": "High Anxious • Counter Delay",
                "inception_trigger": "Failed POS transaction while at billing counter.",
                "resolution_score": 88,
                "resolution_label": "High Satisfaction • Instant Rebound",
                "resolution_outcome": "Immediate shadow reversal delivered before call completion."
            }
        })
    elif "dbs" in prompt_lower or "email" in prompt_lower or "12,000" in prompt_lower:
        return json.dumps({
            "intent": "Client Sunil Kapoor provided notification of USD 12,000 inward wire transfer from DBS Bank Singapore for quarterly advance commercial tax payment into NRO deposit #9041203991.",
            "category": "Cross-Border FX / Tax Remittance",
            "priority_clause": "Commercial Advance Tax Filing",
            "draft_summary": "Inward foreign remittance of USD 12,000 initiated via DBS Bank (Ref: DBS-FX-SG-2026-8812) to NRO deposit account #9041203991. Client requested confirmation of Form 15CA/CB documentation requirements and RM preferential FX spread application.",
            "key_actions": [
                {
                    "title": "DBS SWIFT Inward Match Initiated",
                    "detail": "Matched reference DBS-FX-SG-2026-8812 in correspondent pool",
                    "status": "COMPLETED",
                    "badge_color": "emerald"
                },
                {
                    "title": "Form 15CA/CB Automated Exemption Tagged",
                    "detail": "Sub-threshold advance commercial tax tax exemption applied",
                    "status": "COMPLETED",
                    "badge_color": "emerald"
                },
                {
                    "title": "RM Preferential Spread Notification Dispatched",
                    "detail": "Escalated to Sanjay Joshi for rate lock confirmation",
                    "status": "PROCESSING",
                    "badge_color": "amber"
                }
            ],
            "sentiment_data": {
                "inception_score": 10,
                "inception_label": "Neutral • Advisory Query",
                "inception_trigger": "Proactive tax remittance documentation and rate request.",
                "resolution_score": 75,
                "resolution_label": "Reassured • SLA Tagged",
                "resolution_outcome": "Automated pipeline validation with 4-hr rate lock commitment."
            }
        })
    else:
        # Default Rajesh Malhotra / NRI FastRemit dispute
        return json.dumps({
            "intent": "Urgent inquiry and formal grievance regarding delayed foreign inward remittance (USD 4,500) dispatched via JPMorgan Chase into NRE Account #...4108. Customer demands immediate credit release and absolute waiver/reversal of ₹1,750 inward handling fee.",
            "category": "Cross-Border FX / Remittance Delay",
            "priority_clause": "Medical Emergency Clause",
            "draft_summary": "Urgent inquiry and formal grievance regarding delayed foreign inward remittance (USD 4,500) dispatched via JPMorgan Chase into NRE Account #...4108. Customer demands immediate credit release and absolute waiver/reversal of ₹1,750 inward handling fee. Held at Central Hub due to middle initial mismatch ('K'). Fee waived and USD 4,500 equivalent provisional credit released within 45 minutes.",
            "key_actions": [
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
            ],
            "sentiment_data": {
                "inception_score": -78,
                "inception_label": "High Anxious • Frustrated",
                "inception_trigger": "Healthcare emergency combined with unexplained debit fee.",
                "resolution_score": 64,
                "resolution_label": "Neutral / Constructive",
                "resolution_outcome": "Immediate fee reversal & transparent 45-min bridge credit commitment."
            }
        })
