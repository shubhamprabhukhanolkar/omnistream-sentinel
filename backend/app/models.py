from datetime import datetime, timezone
from typing import Optional
from sqlmodel import SQLModel, Field, Relationship

def utc_now() -> datetime:
    return datetime.now(timezone.utc)

class Interaction(SQLModel, table=True):
    __tablename__ = "interactions"

    id: str = Field(default=None, primary_key=True)
    channel: str = Field(default="audio", description="audio or email")
    customer_name: str = Field(default="Rajesh Malhotra")
    customer_cif: str = Field(default="CIF-99482103")
    customer_tier: str = Field(default="Privilege Banking")
    title: str = Field(default="NRI FastRemit & Premium Savings Dispute")
    relationship_manager: str = Field(default="Anita Sharma")
    raw_transcript: str = Field(description="Raw telephony audio transcript or email MIME payload")
    status: str = Field(default="Processing", description="Processing, QA_Failed, Ready_for_Human, Completed")
    audio_duration: str = Field(default="04:18")
    noise_floor: str = Field(default="-42dB")
    filler_words_count: int = Field(default=14)
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)
    
    # One-to-many relationship to summaries (showing historical draft-critic iterations)
    summaries: list["Summary"] = Relationship(back_populates="interaction")

class Summary(SQLModel, table=True):
    __tablename__ = "summaries"

    id: str = Field(default=None, primary_key=True)
    interaction_id: str = Field(foreign_key="interactions.id", index=True)
    generated_text: str = Field(description="Full formatted synthetic summary")
    intent: str = Field(default="")
    category: str = Field(default="Cross-Border FX / Remittance Delay")
    priority_clause: str = Field(default="Medical Emergency Clause")
    key_actions_json: str = Field(default="[]", description="Serialized JSON array of key actions taken and scheduled")
    sentiment_data_json: str = Field(default="{}", description="Serialized JSON object with inception and resolution sentiment")
    hallucinations_detected: int = Field(default=0)
    critic_approved: bool = Field(default=False)
    critic_feedback: Optional[str] = Field(default=None, description="Critique feedback from Sentinel QA Critic")
    grounding_score: float = Field(default=1.0, description="Token grounding density (0.0 to 1.0)")
    iteration_count: int = Field(default=1, description="Cycle iteration counter in LangGraph")
    created_at: datetime = Field(default_factory=utc_now)
    
    interaction: Optional[Interaction] = Relationship(back_populates="summaries")

class SystemTelemetry(SQLModel, table=True):
    __tablename__ = "system_telemetry"

    id: str = Field(default="global_telemetry", primary_key=True)
    total_interactions: int = Field(default=256800)
    human_adoptions: float = Field(default=95.2, description="Percentage frontline adoption rate")
    capacity_freed_seconds: int = Field(default=256800 * 60, description="Total seconds freed (60s/call)")
    hours_freed: float = Field(default=4280.0, description="Hours freed to date")
    hard_savings_inr: float = Field(default=8400000.0, description="Verified cash savings in INR (₹84 Lakhs)")
    soft_capacity_inr: float = Field(default=11200000.0, description="Gross theoretical capacity in INR (₹1.12 Crore)")
    ai_run_cost_inr: float = Field(default=30000.0, description="Monthly AI inference run cost (₹30,000)")
    cost_to_serve_inr: float = Field(default=30.25, description="Cost per interaction")
    payback_period_months: float = Field(default=2.1, description="Payback period in months")
    roi_multiple: float = Field(default=3.1, description="Net ROI multiple")
    updated_at: datetime = Field(default_factory=utc_now)
