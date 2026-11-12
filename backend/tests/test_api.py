import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.database import init_db

@pytest_asyncio.fixture(autouse=True)
async def setup_db():
    await init_db()

@pytest.mark.asyncio
async def test_health_endpoint():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert data["service"] == "omnistream-sentinel"
        assert data["gcp_project"] == "slabspro-slabsuser37"

@pytest.mark.asyncio
async def test_list_interactions():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/interactions")
        assert response.status_code == 200
        items = response.json()
        assert len(items) >= 3
        # Check first case
        case_ids = [item["id"] for item in items]
        assert "FHF-88294" in case_ids

@pytest.mark.asyncio
async def test_get_telemetry():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/api/telemetry")
        assert response.status_code == 200
        data = response.json()
        assert data["total_interactions"] >= 256800
        assert data["human_adoptions"] == 95.2
        assert len(data["hubs"]) == 5

@pytest.mark.asyncio
async def test_simulate_erlang():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/telemetry/simulate-erlang", json={"agents_per_shift": 50})
        assert response.status_code == 200
        data = response.json()
        assert data["agents_per_shift"] == 50
        assert data["sla_confidence"] == 99.82
        assert data["idle_ratio"] == 3.8

@pytest.mark.asyncio
async def test_approve_case():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/interactions/FHF-88294/approve")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "Completed"


@pytest.mark.asyncio
async def test_langgraph_pipeline_process():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.post("/api/interactions/FHF-77103/process")
        assert response.status_code == 200
        data = response.json()
        assert data["critic_approved"] is True
        assert data["status"] == "Ready_for_Human"
        assert len(data["logs"]) >= 3


@pytest.mark.asyncio
async def test_spa_frontend_serving():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
        assert response.status_code == 200
        # If frontend is built, should return HTML
        assert "html" in response.text.lower() or "omnistream" in response.text.lower()
