# PM Portfolio Strategy

**Version:** 1.0 — Initial foundation

**Last updated:** 2026-09-12

---

## Portfolio Positioning

**Technical Product Manager / Product Thinker / Systems Problem Solver.**

This portfolio positions Asim Kumar as a Technical Product Manager who:

- Identifies meaningful product problems
- Defines products with clear trade-offs
- Builds measurement systems that tell him whether products are working
- Verifies what he claims — and is honest about what he hasn't validated
- Brings technical depth across multiple stacks
- Brings AI product integrity as a differentiator

**Do NOT claim:** Years of formal PM experience. A career-transition narrative as the primary frame. Users, interviews, launches, revenue, adoption, growth, or business outcomes.

---

## Core Strengths

1. **Product definition** — Turning ambiguous problems into defined products with clear boundaries, user needs, and success criteria.
2. **Product judgment** — Identifying meaningful problems, making prioritization decisions, and choosing the right scope.
3. **Prioritization** — Evaluating alternatives with explicit criteria, not just listing features.
4. **Trade-offs** — Making and documenting trade-offs with rationale.
5. **Technical execution** — Building working products across multiple stacks, or working closely with engineering to build them.
6. **Measurement** — Defining success metrics, building measurement systems, and designing experiments.
7. **Evidence-driven decision making** — Using evidence to make decisions, not just intuition.
8. **AI product integrity** — Understanding what AI can and cannot do, designing guardrails against AI risks, building honesty into AI products.
9. **Engineering collaboration** — Working effectively with engineering, understanding technical constraints.

---

## Portfolio Hierarchy

### 1. ReviewFlow — Flagship

**Repository:** asimk714/salon-review-bot

**What it is:** An AI-assisted review tool that improves how you write reviews — without fabricating what happened.

**PM signal:** AI product integrity — guardrails against AI risks, honesty architecture, human approval, manual handoff, rigorous AI quality measurement.

**Strongest evidence:**
- Product principle: "AI can improve how you say it. It cannot decide what happened."
- 247 deterministic prompt checks
- Output evaluator (TypeScript)
- Corrected evaluator
- 15 historical test cases
- Failure analysis
- Prompt intervention (Phase 11)
- Intervention record (honestly documented)
- Editable output
- Human approval
- Manual Google handoff
- No fabricated stats
- No "Powered by AI" badge
- Honest disclosure of AI-assisted implementation

**Lifecycle stage:** Build → Measure (strongest), Discovery → Validate (moderate), Launch → GTM (none).

**Credibility caveat:** No real user validation. No live production AI evidence. No measured adoption or outcome. No meaningful GTM. No scale/growth evidence.

---

### 2. Unrot Daily Retention — Flagship / Supporting

**Repository:** asimk714/Unrot-Daily-Retention

**What it is:** A retention analytics prototype that models Day-1 retention with a structured measurement system.

**PM signal:** Discovery rigor + measurement model + retention analytics + technical execution.

**Strongest evidence:**
- D1 retention problem framing
- Measurement model: metric hierarchy, 7-stage funnel, must-have instrumentation, analytics, guardrails
- User segments
- JTBD hypotheses with explicit assumptions/inferences/unknowns
- Production-shaped prototype: auth + deployment-shaped architecture + health endpoint + build/lint/typecheck
- Analytics persistence evidence from earlier validation

**Lifecycle stage:** Discover → Define → Build (strongest), Measure → Optimize (moderate), Launch → GTM (none), Scale → Grow (none).

**Credibility caveat:** No strong external user research. No meaningful measured retention outcome. No proven launch/GTM. No growth/scale story. Real D1 retention outcome is not yet evidenced — explicitly disclosed.

---

### 3. Experiment Tracker — Supporting

**Repository:** asimk714/experiment-tracker

**What it is:** A local-first experiment tracker that closes the gap between recording experiment data and recording what the experiment decided.

**PM signal:** Product definition + prioritization + trade-offs + verification craft + honest non-claims.

**Strongest evidence:**
- PRODUCT_BRIEF.md: problem, user, JTBDs, product question, 7-candidate prioritization with explicit "what it would add" + "why not prioritized"
- MVP boundary: in/out of scope + trade-offs
- Conclusion capture implementation
- 22 automated tests
- 17-category verification report with evidence labels (VERIFIED BY TEST / VERIFIED BY CODE REVIEW / VERIFIED BY RUNTIME / NOT VERIFIED)

**Lifecycle stage:** Define → Build → Verify (strongest), Discover → Validate (weak), Launch → GTM (none), Measure → Optimize (weak — proposed usage metric not measured), Scale → Grow (none).

**Credibility caveat:** No external user research. No external users. No launch. No GTM. No measured product outcomes. No scale/growth.

---

### 4. KAIRO — Product-Engineering System / Operator Note

**Repository:** asimk714/kairo-vibe-agent

**What it is:** A product-engineering methodology system — not a shipped product. A structured approach to product work that emphasizes evidence discipline, verification truthfulness, and AI-assisted product development.

**PM signal:** Product-engineering orchestration, structured workflows, verification truthfulness, evidence discipline.

**Strongest evidence:**
- Product engineering workflow: UNDERSTAND → DISCOVER → DESIGN → ARCHITECT → BUILD → TEST → DEBUG → REVIEW → SHIP
- Verification Truthfulness Protocol (explicit evidence rules, state definitions, reporting rules)
- Evidence discipline: observed → inferred → assumed
- Detailed procedural system for product engineering (1007-line SKILL.md)

**How it appears in the portfolio:** Small "How I Work" section. Not a featured project. Not a case study. Not a shipped product.

**Credibility note:** Authorship is most likely original by Asim Kumar, but confidence is low-medium (generic git identity on both commits, no explicit attribution/disclosure). The content is original-looking and consistent with the author's documented product/engineering philosophy.

---

## Explicit Exclusions

The following are NOT part of the PM portfolio:

- **YouTube Automation Agent** — Fork of darkzOGx/youtube-automation-agent. Excluded (Phase 20).
- **Project-LoDo** — GitHub-only / learning project. Excluded as PM case study (Phase 23, score 13/60).
- **Open-SEO** — User-confirmed someone else's work. Excluded completely.
- **Cybersecurity projects** — Excluded by rule.
- **Forks / third-party work** — Scrapling, OpenMontage, diagram-design, codebase-memory-mcp, agency-agents, Graft, claurst, deepseek-harness, browser-use, telco-network-configuration, hermes-agent — forks of upstream projects with no visible personal contribution.
- **Vesper** — Local-only, not on GitHub, 16/60, unverified ownership, no PM evidence beyond feature-list README, does not address any portfolio gap.
- **Other unrelated repositories** — Excluded.

---

## Evidence / Credibility Principle

This portfolio distinguishes between:

- **OBSERVED** — Directly seen in the repository, code, documentation, or test results.
- **VERIFIED** — Confirmed through testing, code review, or runtime verification.
- **INFERRED** — Reasonably inferred from evidence but not directly observed.
- **HYPOTHESIS** — An idea that has not been validated.
- **PROPOSED** — A metric or feature that has been proposed but not yet implemented or measured.
- **NOT EVIDENCED** — Something claimed in aspirations but not supported by evidence.

Limitations are communicated openly. No outcomes, users, interviews, launches, revenue, adoption, growth, or business impact are invented.

See `docs/EVIDENCE-MODEL.md` for the full evidence model.

---

## Development Status

- **Phase 1–29:** Project audits completed (ReviewFlow, Unrot, Experiment Tracker, KAIRO, and excluded projects).
- **Phase 30:** Content blueprint created (`docs/CONTENT-BLUEPRINT.md`, `docs/EVIDENCE-MODEL.md`).
- **Phase 31:** Portfolio repository foundation created (`.gitignore`, `README.md`, strategy docs committed; initial commit e335603).
- **Phase 32:** Existing Flask/Jinja2 portfolio website implementation inspected, reconciled against the Phase 30 content blueprint, runtime-verified (all 7 routes return HTTP 200), evidence model checked, repository boundary cleaned (`.gitignore` updated, stray file removed), `README.md` rewritten, `PORTFOLIO-STRATEGY.md` status updated, and all verified website files plus updated docs committed locally. The website is complete and locally verifiable but not yet published to GitHub (no remote configured; push blocked by Termux credential tooling).

**Next phase:** Publish and promote the verified portfolio website — configure a GitHub remote where credential tooling allows, push the local commit, and make the portfolio publicly reachable. If the Termux credential blocker persists, escalate the authentication recovery as a dependency before the publish step.

---

## Phase Reconciliation — Phases 33 and 34

The portfolio website implementation was completed before Phase 33 and Phase 34 were formally designated as separate tracked phases. The design system, UX architecture, and full website implementation were all built and committed together as part of the portfolio website foundation. They are reconciled here for honest phase history. No separate Phase 33 or Phase 34 commits exist, and none are being manufactured.

### Phase 33 — Design System + UX Architecture

**Status:** COMPLETED AS PART OF WEBSITE FOUNDATION

**Evidence:** Implementation present in commit 39fa83f (`feat: complete portfolio website foundation`).

**What was delivered:**

- **Design tokens** — `static/css/design-tokens.css` (451 lines): spacing scale (8px base), typography scale (Inter + Source Serif 4 + JetBrains Mono), color system (light + dark themes), shadows, transitions, container widths, evidence-state colors (7 categories).
- **Component system** — `static/css/components.css` (698 lines): evidence labels (7 states), CTA groups, buttons, navigation (desktop + mobile), mobile menu, project cards, principle cards, evidence cards, case-study components, accordion structure.
- **Responsive system** — 18 media queries across `static/css/pages.css` and `static/css/components.css`: breakpoints at 480px, 640px, 768px, 1024px. Single-column below 640px, multi-column layouts above. Mobile menu at 768px and below. `prefers-reduced-motion` respected.
- **Theme system** — CSS custom properties for light and dark themes, theme toggle (JavaScript + CSS class switch on `<html>`), persisted to `localStorage`. Dark theme is a full alternative palette, not a simple inversion.
- **Navigation** — Sticky header, desktop nav, mobile hamburger menu, footer nav, case-study exit nav, in-page anchor navigation.
- **Case-study architecture** — Reusable case-study header, meta-row evidence labeling (Verified / Not evidenced / Hypothesis), section structure (20-section blueprint), exit navigation, internal anchor linking.
- **Proof of Work architecture** — Filterable evidence card grid (`/work/`), 7 category filters, 14 evidence cards linking to real artifacts (GitHub + internal anchors), category-based filtering.
- **Product Lab architecture** — Lab card grid with evidence labels per card, principle cards with accordion disclosure and evidence labeling.

No separate Phase 33 commit exists. The design system was built as part of the website foundation commit.

### Phase 34 — Portfolio Website Implementation

**Status:** COMPLETED AS PART OF WEBSITE FOUNDATION

**Evidence:** Commit 39fa83f (`feat: complete portfolio website foundation (Flask + Jinja2, 7 routes, 14 evidence cards)`). All 29 website files in that commit.

**What was delivered:**

- **Flask/Jinja2 website** — `app.py` (324 lines), 7 routes, 14 work-hub evidence cards, no build step, no frontend framework, no bundler.
- **Homepage** — `templates/index.html`: hero, selected work preview, how I think, product operating system, proof of work preview, product lab, experience, credentials, now, contact.
- **Three case studies** — `templates/work/reviewflow.html` (757 lines), `templates/work/unrot.html` (593 lines), `templates/work/experiment-tracker.html` (full case study with 17-category verification report). Each follows the 20-section case study structure from the Phase 30 blueprint.
- **Proof of Work** — `/work/` hub with filterable evidence card grid, 14 artifacts across Discovery, Decision, Definition, Build, Measure, Verify, Learn categories.
- **Product Lab** — `/product-lab/` section with 5 principle cards, each with evidence labels.
- **Evidence labels** — 7 label states implemented in CSS and used across all templates: OBSERVED, VERIFIED, INFERRED, HYPOTHESIS, PROPOSED, NOT EVIDENCED, MISSING.
- **Responsive implementation** — deliberate layout adaptation at 480/640/768/1024px breakpoints, not simple shrinkage.
- **Accessibility foundations** — semantic HTML, ARIA labels/roles/expanded/controls/hidden, keyboard-navigable accordions, color-independent evidence labels (icon + text), form labels. Screen-reader testing not performed — disclosed in case studies.
- **SEO foundations** — meta description, favicon, semantic structure, Google Fonts preconnect, theme-color meta. Minimal compared with a fully optimized production site — no sitemap, no robots.txt, no Open Graph tags beyond theme-color.
- **Dark/light theme** — full dual-theme palette with toggle.

**Known limitations (honestly recorded):**

- Live browser QA was not completed. Code-review-based responsive check at 375/768/1280px was performed for Unrot but is not a substitute for live browser interaction testing. This limitation is disclosed in the Unrot case study.
- Screen-reader testing was not performed. This limitation is disclosed in all three case studies.
- SEO metadata is minimal compared with a fully optimized production portfolio site (no sitemap, no robots.txt, no Open Graph tags beyond theme-color).

**Phase 34 was not separately committed under a Phase 34 commit message.** The implementation was completed as part of the portfolio website foundation commit 39fa83f. The Phase 30 content blueprint was the source of truth for what was built; Phases 33 and 34 were never separately planned or tracked as distinct phases.

---

## Links

- ReviewFlow: https://github.com/asimk714/salon-review-bot
- Unrot Daily Retention: https://github.com/asimk714/Unrot-Daily-Retention
- Experiment Tracker: https://github.com/asimk714/experiment-tracker
- KAIRO: https://github.com/asimk714/kairo-vibe-agent
