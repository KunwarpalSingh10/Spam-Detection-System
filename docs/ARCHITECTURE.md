# Architecture decisions

## Current boundary

The initial implementation has a React status page and a FastAPI shell. They communicate through `/api/v1/status`. PostgreSQL is provisioned for local development but is not integrated with the API. Model-serving readiness is HTTP 503 until actual serving dependencies exist.

## Planned serving path

React → FastAPI → in-process scikit-learn pipeline → PostgreSQL prediction record → response. Load the pipeline once at startup. Return an immutable model version and the threshold used with every prediction. The first version will persist predictions before returning success, measuring database time separately from inference.

## Planned learning path

Trusted labels → versioned dataset snapshot → validation/splits → training → independent evaluation → MLflow candidate → shadow/canary testing → release or rejection. Label coverage and delay must accompany quality metrics. Keep the final test set sealed and use independent promotion cohorts for ongoing release decisions.

## Planned control loop

The Python controller observes monitoring summaries, chooses an allowed response, submits a durable job, and verifies its outcome. PostgreSQL holds workflow state, job claims, leases, incident evidence, and audit events. GitHub Actions handles code validation and builds; the controller owns operational decisions. Begin with observation-only operation.

Drift alone does not establish quality loss. Missing labels cause a wait-for-evidence state. Candidate/champion disagreement is diagnostic and does not supply ground truth. An optional LLM may summarize evidence later; policy enforcement and execution remain deterministic.

## Release and recovery

Release manifests will bind the image digest, model version, model checksum, feature/schema version, and threshold. A rollout must verify the version actually served by each replica. Rollback restores the previous complete manifest and checks health. Database migrations must support the previous release where rollback depends on it.

## Deliberate initial limits

Use one API and one controller before introducing additional services. Start with polling and a PostgreSQL job queue. Add streaming infrastructure, a larger workflow engine, or a PyTorch model when a measured requirement justifies it. No autonomous execution or infrastructure provisioning is enabled in this scaffold.
