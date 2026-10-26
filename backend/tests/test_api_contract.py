"""Protect the distinction between a running shell and a serving ML system."""

from fastapi.testclient import TestClient

from spamwatch.main import app

client = TestClient(app)


def test_process_can_be_live_without_model_readiness() -> None:
    assert client.get("/health/live").status_code == 200
    response = client.get("/health/ready")
    assert response.status_code == 503
    assert response.json()["status"] == "not_ready"
    assert "model_serving_not_implemented" in response.json()["reasons"]


def test_public_status_does_not_claim_unimplemented_capabilities() -> None:
    response = client.get("/api/v1/status")
    assert response.status_code == 200
    payload = response.json()
    assert payload["phase"] == "scaffold"
    for capability in ("model_serving", "database_integration", "autonomous_actions"):
        assert payload[capability] is False


def test_prediction_route_is_not_exposed_before_real_serving_exists() -> None:
    assert "/api/v1/predictions" not in client.get("/openapi.json").json()["paths"]
