from typing import TypedDict, Optional, Any

class AgentState(TypedDict, total=False):
    interaction_id: str
    channel: str
    customer_name: str
    customer_cif: str
    customer_tier: str
    title: str
    raw_transcript: str
    
    # Drafter Output
    draft_summary: str
    intent: str
    category: str
    priority_clause: str
    key_actions: list[dict[str, Any]]
    sentiment_data: dict[str, Any]
    
    # Critic Output
    critic_approved: bool
    hallucinations_detected: int
    critic_feedback: Optional[str]
    grounding_score: float
    verification_checks: dict[str, Any]
    
    # Workflow Loop & Telemetry
    iteration_count: int
    max_iterations: int
    status: str
    logs: list[dict[str, Any]]
