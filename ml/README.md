# First milestone: reproducible baseline

Implement the first real ML capability here. Use the [UCI SMS Spam Collection](https://archive.ics.uci.edu/dataset/228/sms+spam+collection); record its source, license, checksum, and parsed row count before training.

Deliver:

1. Dataset validation and duplicate-group-aware train/validation/test manifests.
2. Majority-class and naive Bayes baselines, then a TF-IDF/logistic regression pipeline.
3. Threshold selection on validation data and spam precision, recall, F1, PR-AUC, and confusion matrix.
4. Saved preprocessing/classifier pipeline, threshold, seed, configuration, and dataset/split hashes.
5. A single documented command that reproduces the run and an artifact-loading smoke check.

Reserve independent examples for traffic replay and ongoing promotion evaluation. Never send protected final-test examples into retraining. Store downloaded data under `data/` and generated models under `artifacts/`; both are ignored by Git. Publish concise evaluation summaries under `docs/` once real results exist.
