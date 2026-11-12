import os
import tempfile
from pathlib import Path
from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    model_config = SettingsConfigDict(extra="allow", env_file=".env")

    APP_NAME: str = "OmniStream Sentinel"
    DEBUG: bool = False

    @field_validator("DEBUG", mode="before")
    @classmethod
    def parse_debug(cls, v):
        if isinstance(v, bool):
            return v
        return str(v).lower() in ("true", "1", "yes")
    
    # GCP Vertex AI Configurations
    GCP_PROJECT: str = "slabspro-slabsuser37"
    GCP_REGION: str = "asia-south1"
    VERTEX_MODEL: str = "gemini-3-flash-preview"
    EMBEDDING_MODEL: str = "gemini-embedding-001"
    
    # Database Configuration (Stateless ephemeral SQLite on Cloud Run)
    DATABASE_PATH: str = "/tmp/omnistream.db" if os.path.exists("/tmp") else str(Path(tempfile.gettempdir()) / "omnistream.db")
    
    @property
    def DATABASE_URL(self) -> str:
        clean_path = self.DATABASE_PATH.replace("\\", "/")
        if not clean_path.startswith("/"):
            clean_path = "/" + clean_path
        return f"sqlite+aiosqlite:///{clean_path}"
    
    # Static files directory for Frontend SPA
    STATIC_DIR: str = str(Path(__file__).parent.parent.parent / "frontend" / "dist")
    
    # CORS
    ALLOWED_ORIGINS: list[str] = ["*"]

settings = Settings()
