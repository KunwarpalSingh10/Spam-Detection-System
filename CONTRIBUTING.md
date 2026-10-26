# Development guide

Follow the installation and check commands in [README.md](README.md). Keep changes small enough to review and update [implementation status](docs/IMPLEMENTATION_STATUS.md) when a capability becomes usable.

## Before opening a pull request

- Run the checks relevant to your change; `make check` covers the current scaffold.
- Describe the behavior changed and the checks performed.
- Keep `.env`, credentials, raw messages, datasets, and generated model artifacts out of Git.
- Keep planned capabilities explicitly marked as planned; do not replace real metrics with demo values.

## ML changes

Keep preprocessing and inference in the same serialized pipeline. Fit preprocessing on training data only. Record dataset hashes, split manifests, seeds, code versions, thresholds, and evaluation cohort identities. Group duplicate messages before splitting. Never train on the protected evaluation set or treat predictions as ground truth.

## Controller changes

Every action must identify its triggering evidence, policy version, preconditions, idempotency key, and verification result. Use bounded retries and durable workflow state. Test waiting, rejection, restart recovery, and rollback as well as successful execution. Public submissions require trusted review before becoming training labels.

## Commit scope

Use descriptive commit messages, for example `feat: add reproducible baseline training` or `fix: exclude duplicate groups from evaluation`. Add issue or pull-request context when it explains a design decision. Do not publish unmeasured performance claims.
