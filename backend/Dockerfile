FROM python:3.11-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app
COPY backend/requirements.txt ./requirements.txt
RUN python -m pip install -r requirements.txt \
    && useradd --create-home --uid 10001 appuser

COPY backend/src ./src
USER appuser
EXPOSE 8000

HEALTHCHECK --interval=15s --timeout=5s --start-period=10s --retries=3 \
    CMD python -c "import urllib.request; urllib.request.urlopen('http://127.0.0.1:8000/health/live', timeout=3)"

CMD ["python", "-m", "uvicorn", "spamwatch.main:app", "--app-dir", "src", "--host", "0.0.0.0", "--port", "8000"]
