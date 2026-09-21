# Evidence Model

**Version:** 1.0 — Initial foundation

**Source of truth:** Phase 29/29A/30 synthesis

**Last updated:** 2026-09-12

---

## Purpose

This document defines how the PM portfolio distinguishes between different levels of evidence certainty. The goal is to make a skeptical hiring manager immediately see which claims are backed by direct evidence and which are inferred, hypothesized, proposed, or not evidenced.

This is a core differentiator. Most PM portfolios don't make this distinction explicit.

---

## Evidence Labels

### OBSERVED
**Definition:** Directly seen in the repository, code, documentation, test results, or other verifiable artifacts.

**How to use:** For claims that can be directly verified by inspecting the project.

**Examples:**
- "22 automated tests pass" (Experiment Tracker — observed in test_smoke.py + test output)
- "247 deterministic prompt checks" (ReviewFlow — observed in tests/regression/ai-quality-measurement.ts)
- "Measurement model with metric hierarchy and 7-stage funnel" (Unrot — observed in documentation)
- "Flask + SQLite + Jinja2 + vanilla JS stack" (Experiment Tracker — observed in app.py, db.py, requirements.txt)

**How it appears in the portfolio:** Labeled as OBSERVED, or presented as a fact without qualification when the evidence is direct and unambiguous.

---

### VERIFIED
**Definition:** Confirmed through testing, code review, or runtime verification.

**How to use:** For claims that have been tested or reviewed and confirmed.

**Examples:**
- "Database integrity verified — foreign keys, cascade delete, unique constraint, triggers all confirmed" (Experiment Tracker — verified by test + runtime inspection)
- "AI quality regression passed — 15 historical test cases, 247 deterministic checks" (ReviewFlow — verified by test)
- "Build/lint/typecheck passed" (Unrot — verified by CI/run)
- "Template render checks passed — all 7 templates render without errors" (Experiment Tracker — verified by check_templates.py)

**How it appears in the portfolio:** Labeled as VERIFIED, or presented as a verified claim with the verification method noted.

**Note:** Verification has levels. In Experiment Tracker's verification report, these are explicitly distinguished:
- VERIFIED BY TEST
- VERIFIED BY CODE REVIEW
- VERIFIED BY RUNTIME
- NOT VERIFIED

This level of granularity is good and should be preserved where it exists.

---

### INFERRED
**Definition:** Reasonably inferred from evidence, but not directly observed or verified.

**How to use:** For claims that are reasonable conclusions from the evidence, but where the author has not directly observed or verified the claim.

**Examples:**
- "The target user is a single researcher running ML/engineering experiments" (Experiment Tracker — inferred from the data model: hypothesis, parameters, metrics, notes fields suggest ML/engineering experiments; no user research conducted)
- "The author's product principle emerged from personal experience with the gap between experiment data and decisions" (Experiment Tracker — inferred from the product brief's framing, not from external user research)
- "ReviewFlow is used by the author for their own review writing" (ReviewFlow — inferred from the project's nature and the author's disclosure, not from user research)

**How it appears in the portfolio:** Labeled as INFERRED, or presented with a clear note that it's inferred (e.g., "The target user appears to be... based on the data model, though no user research has been conducted").

---

### HYPOTHESIS
**Definition:** An idea or assumption that has not been validated.

**How to use:** For claims that are explicitly hypotheses — ideas the author has about the product, users, or outcomes that have not been tested or validated.

**Examples:**
- "JTBD 1: Help me record what I tested and what I concluded so I can look back and understand the decision later" (Experiment Tracker — hypothesis, explicitly labeled as such in PRODUCT_BRIEF.md)
- "JTBD 2: Help me connect an experiment result to the next product action" (Experiment Tracker — hypothesis, explicitly labeled as such)
- "The Phase 11 prompt intervention improves live AI quality" (ReviewFlow — hypothesis, explicitly NOT validated; intervention record documents liveAIValidation.occurred: false, beforeVsAfterGenuinelyMeasurable: false)
- "Unrot's D1 retention will improve with the proposed measurement model and instrumentation" (Unrot — hypothesis, not yet validated; real D1 retention outcome not yet evidenced)

**How it appears in the portfolio:** Labeled as HYPOTHESIS, or presented with a clear note that it's a hypothesis that has not been validated. Never presented as a fact or a result.

**Critical rule:** Hypotheses must never be presented as outcomes or results. ReviewFlow's intervention record is a good example of honest hypothesis documentation — it explicitly says the intervention has NOT been proven to improve live behavior.

---

### PROPOSED
**Definition:** A metric, feature, or approach that has been proposed but not yet implemented or measured.

**How to use:** For claims about what the author intends to measure or build, but hasn't yet.

**Examples:**
- "experiments_with_conclusion / completed_experiments will be the key usage metric" (Experiment Tracker — proposed, not yet measured)
- "The measurement model will track D1 retention through a 7-stage funnel" (Unrot — the model exists, but the actual measurement hasn't been run on live data)
- "AI quality will be measured through 247 deterministic checks" (ReviewFlow — the checks exist, but the metric itself is a proposed measurement framework)

**How it appears in the portfolio:** Labeled as PROPOSED, or presented with a clear note that it's proposed and not yet measured/implemented.

**Critical rule:** Proposed metrics must never be presented as measured outcomes. If the metric hasn't been measured, it must be clearly labeled as proposed.

---

### NOT EVIDENCED
**Definition:** Something that is claimed in the project's aspirations or scope, but is not supported by evidence in the repository.

**How to use:** For claims that the project aspires to but has not achieved, or for claims that are not supported by any evidence.

**Examples:**
- "Real D1 retention improved" (Unrot — not evidenced; measurement model exists, but no live production outcome yet)
- "Real user validation conducted" (ReviewFlow — not evidenced; no user research, no interviews, no usability testing)
- "Live production AI evidence" (ReviewFlow — not evidenced; no live deployment, no production AI validation)
- "Measured adoption or outcome" (ReviewFlow — not evidenced; no analytics, no usage tracking)
- "Meaningful GTM" (ReviewFlow — not evidenced; no launch, no distribution, no GTM strategy)
- "Scale/growth evidence" (All three — not evidenced; all are local-only or prototype-stage)

**How it appears in the portfolio:** Labeled as NOT EVIDENCED, or presented with a clear note that the claim is not supported by evidence. This is the most important label for maintaining credibility — it explicitly says "I'm not claiming this."

---

## How These Labels Work Together

The six labels form a ladder of evidence certainty:

```
NOT EVIDENCED  ←  PROPOSED  ←  HYPOTHESIS  ←  INFERRED  ←  VERIFIED  ←  OBSERVED
(weakest)                                                  (strongest)
```

**Rules:**
1. Never present a HYPOTHESIS as an OBSERVED fact.
2. Never present a PROPOSED metric as a VERIFIED outcome.
3. Never present an INFERRED claim as a VERIFIED fact.
4. Never present a NOT EVIDENCED claim as anything other than not evidenced.
5. When in doubt, downgrade the label rather than upgrade it.

---

## Examples from Each Project

### ReviewFlow

| Claim | Label | Evidence |
|---|---|---|
| "247 deterministic prompt checks exist" | OBSERVED | tests/regression/ai-quality-measurement.ts |
| "Output evaluator checks AI-generated reviews" | OBSERVED | tests/regression/output-evaluator.ts |
| "15 historical test cases" | OBSERVED | tests/regression/fixtures/saved-outputs.json |
| "AI quality regression passed" | VERIFIED | Test output showing checks pass |
| "The Phase 11 prompt intervention improves AI quality" | HYPOTHESIS | Not validated; intervention record says liveAIValidation.occurred: false |
| "The target user is someone who writes reviews" | INFERRED | Project nature + author disclosure, no user research |
| "Real user validation conducted" | NOT EVIDENCED | No user research, no interviews, no usability testing |
| "Measured adoption or outcome" | NOT EVIDENCED | No analytics, no usage tracking, no production deployment |
| "Live production AI evidence" | NOT EVIDENCED | No live deployment, no production AI validation |
| "AI-assisted implementation" | OBSERVED | Acknowledged in project documentation |

### Unrot Daily Retention

| Claim | Label | Evidence |
|---|---|---|
| "Measurement model with metric hierarchy and 7-stage funnel" | OBSERVED | This case study's measurement model documentation |
- "D1 retention problem framing" | OBSERVED | This case study's problem framing |
- "JTBD hypotheses with assumptions/inferences/unknowns" | OBSERVED | This case study's JTBD hypotheses (labeled as hypotheses) |
| "Production-shaped prototype with auth + deployment-shaped architecture" | OBSERVED | Code + architecture |
| "Analytics persistence evidence from earlier validation" | VERIFIED | Earlier validation output |
| "Real D1 retention improved" | NOT EVIDENCED | Measurement model exists, but no live production outcome yet |
- "External user research conducted" | NOT EVIDENCED | External repo inspected; no standalone research artifacts found (participant notes, transcripts, findings, quotes, datasets). Case study reports the research plan as designed-but-unexecuted. |
| "Measured retention outcome" | NOT EVIDENCED | No measured outcome |
| "The user segments are accurate" | INFERRED | Defined in documentation, not validated with users |
| "JTBD hypotheses are valid" | HYPOTHESIS | Explicitly labeled as hypotheses, not validated |

### Experiment Tracker

| Claim | Label | Evidence |
|---|---|---|
| "22 automated tests pass" | OBSERVED | test_smoke.py + test output |
| "17-category verification report" | OBSERVED | VERIFICATION.md |
| "Database integrity verified" | VERIFIED | Tests + runtime inspection |
| "Conclusion capture implemented" | VERIFIED | Routes + DB layer + templates + tests |
| "The target user is a single researcher running ML/engineering experiments" | INFERRED | Data model (hypothesis, parameters, metrics, notes fields), no user research |
| "The experiment→decision gap is the most important gap for users" | HYPOTHESIS | Author's analysis, not user-validated |
| "experiments_with_conclusion / completed_experiments will be the key usage metric" | PROPOSED | Mentioned in PRODUCT_BRIEF.md, not yet measured |
| "Real user validation conducted" | NOT EVIDENCED | No user research |
| "Measured product outcomes" | NOT EVIDENCED | No measured outcomes; proposed usage metric not measured |
| "Browser rendering verified" | NOT VERIFIED | Flask test client verifies HTML generation, but browser rendering not verified (Termux environment limitation) |
| "Screen reader testing conducted" | NOT VERIFIED | Code review only, no WCAG claim |

---

## How This Appears in the Portfolio

**On the homepage:**
- A brief mention of the evidence system in the "Product Lab" section.
- A few concrete examples of how the labels show up in the case studies.

**In case studies:**
- Evidence labels on key claims.
- A "Limitations" section that explicitly lists what is NOT EVIDENCED.
- Clear distinction between observed/verified claims and inferred/hypothesis/proposed claims.

**In the "How I Work" section:**
- Mention of the Verification Truthfulness Protocol (KAIRO) as the system that encodes this evidence discipline.

**Visual treatment:**
- The labels should be visible but not visually distracting.
- Could be a small tag, a color, a notation, or a footnote.
- The key is that a skeptical hiring manager can immediately see which claims are backed by direct evidence and which are not.

---

## Why This Matters

Most PM portfolios present all claims with the same level of confidence. This portfolio explicitly distinguishes between what is observed, verified, inferred, hypothesized, proposed, and not evidenced. This:

1. **Builds credibility** — the author is honest about what they haven't validated.
2. **Differentiates** — few portfolios make this distinction explicit.
3. **Demonstrates evidence discipline** — the author thinks rigorously about evidence, which is a PM skill in itself.
4. **Prevents overclaiming** — the labels force the author to be precise about what they're claiming.

This is not academic — it's a practical tool for maintaining credibility in a portfolio that has real gaps (no user research, no launch, no measured outcomes). The honesty about those gaps, encoded in this evidence model, is itself a PM signal.
