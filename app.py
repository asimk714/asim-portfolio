"""
Asim Kumar — Technical Product Manager Portfolio
Flask + Jinja2 + vanilla JS. Calm, editorial, evidence-driven.
"""
import os
from flask import Flask, render_template

app = Flask(__name__, static_folder="static", static_url_path="/static")

# ---------------------------------------------------------------------------
# Work hub evidence cards
# ---------------------------------------------------------------------------

EVIDENCE_CARDS = [
    {
        "title": "15-case regression dataset",
        "type": "Regression fixture",
        "body": """
        <p>15 synthetic test cases covering the full 1–5 star rating range, multiple visit
        types, with/without staff name, positive/negative/mixed experiences. Each case defines
        what a faithful AI response should do.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — file exists</span>
        </p>
        """,
        "category": "discovery",
        "css_class": "",
        "link_url": "https://github.com/asimk714/salon-review-bot/blob/main/tests/regression/cases.ts",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "Product Decisions — 8 documented choices",
        "type": "Decision record",
        "body": """
        <p>Structured decisions: structured input vs blank box, anti-hallucination constraints,
        rating preservation, short+detailed drafts, editable draft, manual Google handoff, no
        database, no auth. Each with options considered, trade-offs, confidence, and validation
        approach.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — document exists</span>
        </p>
        """,
        "category": "decision",
        "css_class": "",
        "link_url": "https://github.com/asimk714/salon-review-bot/blob/main/docs/PRODUCT-DECISIONS.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "MVP Prioritization — Must Have / Should Have / Out of Scope",
        "type": "Prioritization",
        "body": """
        <p>Must-have: structured input, rating preservation, factual guardrails, editable draft,
        manual Google handoff, transparency, basic UI. Out of scope: direct Google posting, analytics,
        authentication, user accounts, multi-business, native mobile, fabricated social proof,
        "Powered by AI" badge, guaranteed AI accuracy.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — document exists</span>
        </p>
        """,
        "category": "definition",
        "css_class": "",
        "link_url": "https://github.com/asimk714/salon-review-bot/blob/main/docs/MVP-PRIORITIZATION.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "AI Output Quality Measurement Report",
        "type": "Measurement report",
        "body": """
        <p>15 historical outputs (2026-09-10) evaluated with corrected evaluator: 47% rating match,
        0% invented detail, 60% marketing/superlative, 27% overall strict pass, 100% format
        compliance. Per-case detail included. Evidence types A (deterministic), B (historical live
        outputs), C (new live — skipped).</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified</span>
          <span class="evidence-label evidence-label--not-evidenced" style="margin-left: var(--space-1);">Not live — historical outputs</span>
        </p>
        """,
        "category": "measure",
        "css_class": "",
        "link_url": "https://github.com/asimk714/salon-review-bot/blob/main/tests/regression/ai-quality-report.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "Corrected Evaluator Results",
        "type": "Verification artifact",
        "body": """
        <p>Output evaluator corrected for 3 measurement artifacts: case-insensitive visit-type
        matching, superlative word forms extended, "out" removed from negative sentiment. Same 15
        outputs re-evaluated: 47% rating match, 27% strict pass. Correction made measurement more
        accurate — Phase 9 was 53% because of false positives, not model improvement.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified</span>
          <span class="evidence-label evidence-label--hypothesis" style="margin-left: var(--space-1);">Hypothesis — live effect not validated</span>
        </p>
        """,
        "category": "verify",
        "css_class": "",
        "link_url": "https://github.com/asimk714/salon-review-bot/blob/main/tests/regression/corrected-historical-results.json",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "Phase 11 Intervention Record — honest documentation",
        "type": "Honest documentation",
        "body": """
        <p>The Phase 11 prompt tightening passes deterministic checks (247/247), but <strong>live
        validation did NOT occur</strong> — no LOVABLE_API_KEY or Supabase credentials in the
        environment. beforeVsAfterGenuinelyMeasurable: false. The record explicitly avoids claiming
        improvement. Intervention retained with caveat: unproven until live-validated.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--hypothesis">Hypothesis — not live-validated</span>
          <span class="evidence-label evidence-label--not-evidenced" style="margin-left: var(--space-1);">Not evidenced — no live AI</span>
        </p>
        """,
        "category": "learn",
        "css_class": "",
        "link_url": "https://github.com/asimk714/salon-review-bot/blob/main/tests/regression/intervention-record-phase11.json",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "PRODUCT_BRIEF — 7-Candidate Prioritization",
        "type": "Product brief",
        "body": """
        <p>Conclusion capture chosen over charts, search/filter, auth, cloud, AI features, and
        experiment templates. Each candidate documented with "What it would add" and "Why not
        prioritized." The smallest capability that closes the experiment→decision loop — ~27 lines
        across 3 files.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — document exists</span>
        </p>
        """,
        "category": "definition",
        "css_class": "",
        "link_url": "/work/experiment-tracker/#prioritization",
        "link_label": "Read in case study",
        "link_external": False,
    },
    {
        "title": "17-Category Verification Report",
        "type": "Verification report",
        "body": """
        <p>Independent post-implementation verification: database integrity (FK, UNIQUE, triggers),
        conclusion CRUD, one-conclusion-per-experiment constraint, cascade deletion (experiment → runs
        + conclusion), run detail route (orphaned template wired), existing CRUD regression, compare
        workflow, error handling, timestamps, HTML rendering (Flask test client), accessibility
        (code review), security (code review).</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified by test</span>
          <span class="evidence-label evidence-label--missing" style="margin-left: var(--space-1);">Missing — browser rendering not verified</span>
        </p>
        """,
        "category": "verify",
        "css_class": "",
        "link_url": "/work/experiment-tracker/#verification",
        "link_label": "Read in case study",
        "link_external": False,
    },
    {
        "title": "Measurement Model — A/B Experiment Plan",
        "type": "Measurement design",
        "body": """
        <p>Rigorous experiment design: randomization unit (user ID), 50/50 allocation, deterministic
        hash assignment, primary metric (D1 retention), secondary metrics, guardrail metrics, sample
        size power analysis (~650–700 per variant, ~1,300–1,400 total), 2-week duration + 2-day
        cooldown, decision rules (win/inconclusive/loss).</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — document exists</span>
          <span class="evidence-label evidence-label--hypothesis" style="margin-left: var(--space-1);">Hypothesis — not yet run</span>
        </p>
        """,
        "category": "measure",
        "css_class": "",
        "link_url": "https://github.com/asimk714/Unrot-Daily-Retention/blob/main/docs/experiment-plan.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "Final QA Report — 20/20 Functional, 35/35 Tests",
        "type": "QA audit",
        "body": """
        <p>Full audit: 20/20 functional verification across 8 routes, responsive at 375/768/1280px,
        accessibility (WCAG 2.1 AA — keyboard, semantic structure, form labels, aria-live, color
        independence), 35/35 automated tests passing, ESLint 0 errors/0 warnings, Turbopack build
        0 compilation errors. Demo isolation verified: 0 qualifying returners from demo preview.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — QA report exists</span>
          <span class="evidence-label evidence-label--missing" style="margin-left: var(--space-1);">Missing — browser QA blocked</span>
        </p>
        """,
        "category": "build",
        "css_class": "",
        "link_url": "https://github.com/asimk714/Unrot-Daily-Retention/blob/main/docs/final-qa-report.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "D1 Retention Calculator — calendar-day logic",
        "type": "Technical evidence",
        "body": """
        <p>Pure TypeScript implementation decoupled from database syntax. Uses Intl.DateTimeFormat
        with "en-CA" for calendar-date evaluation in the user's configured IANA timezone with UTC
        fallback. Excludes demo_return_previewed. Implements cohort completeness rule: cohorts on
        date D remain incomplete until D+2 has closed.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — code exists</span>
        </p>
        """,
        "category": "build",
        "css_class": "",
        "link_url": "https://github.com/asimk714/Unrot-Daily-Retention/blob/main/src/lib/retention.ts",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "Architecture — Next.js + PostgreSQL + Prisma",
        "type": "Architecture doc",
        "body": """
        <p>System diagram with server/client boundary, Prisma schema (7 models: User, Session,
        UserPreference, LearningPath, Lesson, LessonProgress, ReminderPreference, AnalyticsEvent),
        PostgreSQL driver adapter, connection pooling (max: 10, SSL in production), serverless
        compatibility design (Vercel + Neon).</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--verified">Verified — document exists</span>
        </p>
        """,
        "category": "build",
        "css_class": "",
        "link_url": "https://github.com/asimk714/Unrot-Daily-Retention/blob/main/docs/architecture.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "Problem Framing — D1 retention as a discovery problem",
        "type": "Research artifact",
        "body": """
        <p>The surface problem (16% D1 vs 22% benchmark) and the deeper hypothesis (the handoff
        between sessions, not the first-session experience alone). Known facts vs assumptions vs
        inferences vs unknowns explicitly separated. 7 candidate reasons organized by category
        (first-session value gap, no cue/trigger, no progress mechanic, friction, audience mismatch,
        measurement issues).</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--observed">Observed — document exists</span>
          <span class="evidence-label evidence-label--hypothesis" style="margin-left: var(--space-1);">Hypothesis — not yet validated with users</span>
        </p>
        """,
        "category": "discovery",
        "css_class": "",
        "link_url": "https://github.com/asimk714/Unrot-Daily-Retention/blob/main/research/problem-framing.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
    {
        "title": "JTBD Hypotheses — 4 jobs, 7 intervention hypotheses",
        "type": "Research artifact",
        "body": """
        <p>Four hypothesized jobs-to-be-done: interview prep, AI news, AI fundamentals, practical
        application. Seven intervention hypotheses (H1–H7) and seven opportunity areas. The lead
        intervention: "Tomorrow's 5-Minute Mission" package — Mission Briefing + Completion Bumps +
        Return-Intent Nudges + Speed Bump → Sprint Journal bridge.</p>
        <p style="margin-top: var(--space-2);">
          <span class="evidence-label evidence-label--inferred">Inferred — from problem framing</span>
          <span class="evidence-label evidence-label--hypothesis" style="margin-left: var(--space-1);">Hypothesis — not validated</span>
        </p>
        """,
        "category": "discovery",
        "css_class": "",
        "link_url": "https://github.com/asimk714/Unrot-Daily-Retention/blob/main/research/problem-framing.md",
        "link_label": "View on GitHub",
        "link_external": True,
    },
]


# ---------------------------------------------------------------------------
# Routes
# ---------------------------------------------------------------------------

@app.route("/")
def homepage():
    return render_template("index.html")


@app.route("/work/")
def work_hub():
    return render_template("work/index.html", evidence_cards=EVIDENCE_CARDS)


@app.route("/work/reviewflow/")
def reviewflow_case():
    return render_template("work/reviewflow.html")


@app.route("/work/unrot/")
def unrot_case():
    return render_template("work/unrot.html")


@app.route("/work/experiment-tracker/")
def experiment_tracker_case():
    return render_template("work/experiment-tracker.html")


@app.route("/how-i-work/")
def how_i_work():
    return render_template("how-i-work.html")


@app.route("/contact/")
def contact():
    return render_template("contact.html")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=False)
