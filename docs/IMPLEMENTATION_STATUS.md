# Implementation status

This file describes implemented behavior, not the target architecture.

## Available

- FastAPI liveness endpoint and explicit unavailable readiness response.
- Typed project-status endpoint declaring the scaffold phase and disabled autonomy.
- React page that fetches API status and handles unavailable/invalid responses.
- Backend contract tests, Python formatting/lint configuration, frontend type checking.
- Dockerfiles and Compose definitions for frontend, API, and local PostgreSQL.
- GitHub Actions definitions for code checks, image builds, and container smoke checks.
- Project plan, architecture decisions, and proposed autonomy policy.

## Not implemented

- Dataset ingestion, training, evaluation, or inference.
- PostgreSQL connections, models, migrations, or prediction persistence.
- Authentication, feedback collection, or message submission.
- MLflow, telemetry exporters, model-quality metrics, or drift reports.
- Controller execution, incident workflows, shadow/canary routing, or rollback.
- Cloud infrastructure, public deployment, or performance benchmarks.

The policy example in `configs/` is a design input only. Nothing reads or executes it yet. CI definitions do not imply a successful GitHub run; check the repository's Actions history after the first push.
