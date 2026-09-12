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
- **Phase 30:** Content blueprint created.
- **Phase 31 (current):** Portfolio repository foundation created. Website implementation pending.

**Next phase:** Build the portfolio website from the content blueprint in `docs/CONTENT-BLUEPRINT.md`.

---

## Links

- ReviewFlow: https://github.com/asimk714/salon-review-bot
- Unrot Daily Retention: https://github.com/asimk714/Unrot-Daily-Retention
- Experiment Tracker: https://github.com/asimk714/experiment-tracker
- KAIRO: https://github.com/asimk714/kairo-vibe-agent
