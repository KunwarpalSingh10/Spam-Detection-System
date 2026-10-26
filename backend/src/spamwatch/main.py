"""HTTP shell for the first development milestone.

Serving readiness stays unavailable until real model and persistence checks exist.
"""

from typing import Literal

from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel


class ProjectStatus(BaseModel):
    service: Literal["spamwatch-api"] = "spamwatch-api"
    phase: Literal["scaffold"] = "scaffold"
    model_serving: bool = False
    database_integration: bool = False
    autonomous_actions: bool = False


app = FastAPI(
    title="SpamWatch API",
    version="0.1.0",
    description="Initial API scaffold. Model serving and autonomous actions are not implemented.",
)


@app.get("/health/live", tags=["health"])
def liveness() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/health/ready", tags=["health"], status_code=status.HTTP_503_SERVICE_UNAVAILABLE)
def readiness() -> JSONResponse:
    return JSONResponse(
        status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        content={
            "status": "not_ready",
            "reasons": ["model_serving_not_implemented", "database_integration_not_implemented"],
        },
    )


@app.get("/api/v1/status", response_model=ProjectStatus, tags=["project"])
def project_status() -> ProjectStatus:
    return ProjectStatus()
