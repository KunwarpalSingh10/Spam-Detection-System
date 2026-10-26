# Autonomous controller design

No executable controller exists yet. Build it after serving, labels, monitoring, and model versioning are available.

The objective is to maintain configured quality and latency targets within a compute budget. Persist observations and decisions before executing work. A correct decision can be to wait for labels, reject a candidate, or escalate.

Planned states:

```text
HEALTHY → INVESTIGATING → WAITING_FOR_LABELS / TRAINING
TRAINING → EVALUATING → SHADOW → CANARY → VERIFYING → HEALTHY
Executing states → FAILED / ROLLING_BACK / ESCALATED
```

Every job will need an idempotency key, timeout, bounded retries, durable claim/lease, and outcome verification. Only one release workflow may own an environment at once. Resume or reconcile jobs after a restart rather than blindly repeating actions.

Begin in observation-only mode. Introduce bounded candidate training, shadow evaluation, then canary releases and automatic rollback. Keep a random audit-label stream separate from uncertainty-based labeling. Never infer ground-truth labels from the model's own decisions.

The [policy example](../configs/autonomy.example.yaml) records proposed limits; it is not wired into the application. Test steady traffic, insufficient labels, bad candidates, slow canaries, duplicate jobs, controller crashes, stale telemetry, and failed recovery before enabling autonomous releases.
