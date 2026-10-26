PYTHON := .venv/bin/python

.PHONY: setup api web check backend-check frontend-check up down

setup:
	python3 -m venv .venv
	$(PYTHON) -m pip install -r backend/requirements-dev.txt
	npm --prefix frontend ci

api:
	$(PYTHON) -m uvicorn spamwatch.main:app --app-dir backend/src --reload

web:
	npm --prefix frontend run dev

check: backend-check frontend-check

backend-check:
	$(PYTHON) -m ruff check backend
	$(PYTHON) -m ruff format --check backend
	$(PYTHON) -m pytest

frontend-check:
	npm --prefix frontend run typecheck
	npm --prefix frontend run build

up:
	docker compose up --build

down:
	docker compose down
