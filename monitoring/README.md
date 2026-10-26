# Monitoring contracts

Monitoring is planned. Do not populate dashboards with simulated values presented as measurements.

| Category | Planned measurements | Required context |
| --- | --- | --- |
| Operational | Request rate, errors, model latency, full request latency, database time | Window, hardware, worker count, served model version |
| Quality | Spam precision/recall/F1, confusion matrix, PR-AUC when defined | Ground-truth label source, coverage, delay, class counts, prediction-time cohort |
| Drift | Text length, URL frequency, digit share, vocabulary coverage, score distribution | Versioned reference data, current window, sample minimum, test/threshold |

Use Prometheus/Grafana for operational metrics and scheduled Python/Evidently jobs for persisted quality and drift summaries. Never put raw message text, prediction IDs, or user IDs in Prometheus labels.

Drift is evidence of distribution change, not proof of quality degradation. Show unknown or insufficient-data states explicitly. Quality measured only on selectively reviewed examples must be identified as such; reserve random audit samples for less biased estimates.
