# ==========================================
# Stage 1: Build Vite / React Frontend SPA
# ==========================================
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci || npm install

COPY frontend/ ./
RUN npm run build

# ==========================================
# Stage 2: Production Python 3.12 with uv
# ==========================================
FROM python:3.12-slim

# Avoid buffering and bytecode
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    UV_SYSTEM_PYTHON=1 \
    PORT=8080 \
    GCP_PROJECT=slabspro-slabsuser37 \
    GCP_REGION=asia-south1 \
    VERTEX_MODEL=gemini-3-flash-preview \
    STATIC_DIR=/app/static

# Install uv from official binary
COPY --from=ghcr.io/astral-sh/uv:latest /uv /bin/uv

WORKDIR /app

# Install backend dependencies
COPY backend/pyproject.toml backend/requirements.txt ./
RUN uv pip install --system -r requirements.txt

# Copy backend application source
COPY backend/app ./app

# Copy built frontend assets from Stage 1 into /app/static and /app/frontend/dist
COPY --from=frontend-builder /app/frontend/dist /app/static
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Expose default Cloud Run port
EXPOSE 8080

# Launch FastAPI ASGI server
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
