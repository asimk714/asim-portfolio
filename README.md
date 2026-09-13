# Asim Kumar — Technical Product Manager Portfolio

A local-first Flask + Jinja2 portfolio website presenting product work across three implemented projects: ReviewFlow (AI product integrity), Unrot Daily Retention (retention analytics), and Experiment Tracker (product definition + verification).

## Purpose

This portfolio demonstrates product thinking through implemented work — not hypotheticals. Each project is a real product built end-to-end, with measurement, verification, and honest gaps where they exist.

The portfolio is built around an evidence discipline: OBSERVED / VERIFIED / INFERRED / HYPOTHESIS / PROPOSED / NOT EVIDENCED. Claims are labeled by what supports them.

## Technology Stack

- Python 3.14
- Flask 3.1.3
- Jinja2 templating
- Vanilla CSS (design tokens + component styles)
- Vanilla JavaScript (scroll reveal, accordion, theme toggle, mobile menu)
- Fonts: Inter, Source Serif 4, JetBrains Mono (Google Fonts)

No build step required. No frontend framework. No JavaScript bundler.

## Local Development

```bash
# From the repository root
python app.py
```

The development server starts on port 5000 by default. Open http://localhost:5000/.

Environment variable `PORT` can override the default port.

## Site Structure

### Pages

- `/` — Homepage: hero, selected work preview, how I think, product operating system, proof of work preview, product lab, experience, credentials, now, contact.
- `/work/` — Proof of Work hub: filterable evidence card grid with 14 artifacts across Discovery, Decision, Definition, Build, Measure, Verify, and Learn categories.
- `/work/reviewflow/` — ReviewFlow case study: AI product integrity, measurement, verification.
- `/work/unrot/` — Unrot Daily Retention case study: D1 retention measurement model, experiment design.
- `/work/experiment-tracker/` — Experiment Tracker case study: product definition, prioritization, verification.
- `/how-i-work/` — How I Think: six-move accordion (Discover, Define, Decide, Build, Measure, Verify).
- `/contact/` — Contact: email, phone, GitHub, LinkedIn (unverified URL), resume placeholder.

### Evidence Cards

The Proof of Work hub presents 14 evidence cards linking to real artifacts:

- ReviewFlow: 15-case regression dataset, AI output quality measurement report, 8 product decisions, corrected evaluator results, Phase 11 intervention record.
- Experiment Tracker: PRODUCT_BRIEF with 7-candidate prioritization, 17-category verification report.
- Unrot: A/B experiment plan with power analysis, Final QA report (20/20 functional, 35/35 tests), D1 retention calculator, architecture document, problem framing, JTBD hypotheses.

All external links point to github.com/asimk714 repositories. Internal links anchor to section IDs within case study pages.

## Evidence Philosophy

This portfolio distinguishes between:

- **OBSERVED** — directly seen in code, tests, or documentation
- **VERIFIED** — confirmed through testing, code review, or runtime verification
- **INFERRED** — reasonably inferred from evidence but not directly observed
- **HYPOTHESIS** — an idea not yet validated
- **PROPOSED** — a metric or feature proposed but not yet implemented or measured
- **NOT EVIDENCED** — claimed in aspirations but not supported by evidence

Where evidence is missing, it is stated plainly rather than hidden.

## Current Status

The website implementation is complete and locally verifiable. All 7 routes render successfully (HTTP 200). The implementation follows the content blueprint documented in `docs/CONTENT-BLUEPRINT.md`.

This is a portfolio project — a proof of how the author thinks about product, not a deployed production site with users.

## Documentation

- `docs/CONTENT-BLUEPRINT.md` — homepage information architecture, hero direction, product thesis, selected work summaries, product operating system, product lab, experience, credentials, case study structure.
- `docs/EVIDENCE-MODEL.md` — full evidence label definitions and examples from each project.
- `docs/PORTFOLIO-STRATEGY.md` — portfolio positioning, core strengths, project hierarchy, explicit exclusions, development status.

## What This Portfolio Does Not Claim

- No PM title the author didn't hold
- No user research, interviews, or usability testing
- No live production deployment with real users
- No measured adoption, outcomes, revenue, or growth
- No GTM strategy or scale evidence
- No fabricated metrics or validation

Honest gaps are part of the portfolio's credibility — not a weakness to paper over.

## Author

Asim Kumar — asimkumar613@gmail.com
