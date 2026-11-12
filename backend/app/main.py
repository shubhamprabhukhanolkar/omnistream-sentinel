import os
import logging
from contextlib import asynccontextmanager
from pathlib import Path
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse

from app.config import settings
from app.database import init_db
from app.api import interactions, telemetry, stream

# Setup Logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("omnistream")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Initialize DB and seeds
    logger.info("Initializing OmniStream Sentinel database...")
    try:
        await init_db()
        logger.info("Database initialized with seed cases successfully.")
    except Exception as e:
        logger.error(f"Failed to initialize database: {e}")
    yield
    # Shutdown
    logger.info("OmniStream Sentinel shutting down.")

app = FastAPI(
    title="OmniStream Sentinel API",
    description="Agentic AI Workflow & Sentinel Critic QA for Retail Banking Contact Centers",
    version="0.1.0",
    lifespan=lifespan
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health check
@app.get("/health")
@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "omnistream-sentinel",
        "gcp_project": settings.GCP_PROJECT,
        "region": settings.GCP_REGION,
        "vertex_model": settings.VERTEX_MODEL,
        "database": "sqlite_async",
        "version": "4.12-enterprise"
    }

# Register API Routers
app.include_router(interactions.router)
app.include_router(telemetry.router)
app.include_router(stream.router)

# Static Frontend SPA Mounting
static_dir_path = Path(settings.STATIC_DIR)

if static_dir_path.exists():
    logger.info(f"Mounting static files from {static_dir_path}")
    # Mount assets subfolder if exists
    assets_path = static_dir_path / "assets"
    if assets_path.exists():
        app.mount("/assets", StaticFiles(directory=str(assets_path)), name="assets")

    @app.middleware("http")
    async def spa_middleware(request: Request, call_next):
        # Allow API requests and health checks through
        if request.url.path.startswith("/api") or request.url.path.startswith("/health") or request.url.path.startswith("/docs") or request.url.path.startswith("/openapi.json") or request.url.path.startswith("/assets"):
            return await call_next(request)
        
        # Check if direct file requested
        requested_file = static_dir_path / request.url.path.lstrip("/")
        if requested_file.is_file():
            return FileResponse(str(requested_file))
            
        # Fallback to SPA index.html
        index_file = static_dir_path / "index.html"
        if index_file.is_file():
            return FileResponse(str(index_file))
            
        return await call_next(request)
else:
    logger.warning(f"Static directory {static_dir_path} does not exist yet. Running in API-only mode until frontend is compiled.")

    @app.get("/")
    async def root():
        return {
            "message": "OmniStream Sentinel API running.",
            "docs": "/docs",
            "frontend_status": "Run `npm run build` in /frontend to compile SPA"
        }
