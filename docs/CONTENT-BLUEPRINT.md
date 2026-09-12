# PM Portfolio Content Blueprint

**Version:** 1.0 — Initial foundation

**Source of truth:** Phase 30 synthesis

**Last updated:** 2026-09-12

---

## Homepage Information Architecture

Section order:

1. **Hero** — Identity, positioning, value proposition, primary CTA
2. **Product Thesis / How I Think** — Product philosophy, principles
3. **Selected Work** — Three case study cards (ReviewFlow, Unrot, Experiment Tracker)
4. **Product Operating System** — DISCOVER → DEFINE → DECIDE → BUILD → MEASURE → LEARN
5. **Product Lab** — Evidence/credibility system (OBSERVED / VERIFIED / INFERRED / HYPOTHESIS / PROPOSED / NOT EVIDENCED)
6. **Experience** — Nokia + IIM + skills
7. **Credentials** — IIM Tiruchirappalli, relevant credentials
8. **Now** — Current focus (optional)
9. **Contact** — Email, LinkedIn, GitHub

---

## Hero Direction

**Recommended headline (Option B):**
"Product Thinker. Technical Builder. Evidence-Driven."

**Subhead:**
"I identify meaningful product problems, define the product with explicit trade-offs, and verify what I claim. I bring technical depth across three stacks and AI product integrity as a differentiator. I'm honest about what I haven't validated."

**Primary CTA:** "Selected Work"

**NOT to include:**
- "8+ years PM experience"
- Career transition language
- Generic "passionate about products"

---

## Product Thesis

"I build products that work and verify that they work — and I'm honest about what I haven't proven.

I've built three implemented products across three stacks: an AI-assisted review tool with rigorous AI quality measurement (247 deterministic checks, an output evaluator, 15 historical test cases, a corrected evaluator, and a failure analysis system), a retention analytics prototype with a structured measurement model (metric hierarchy, 7-stage funnel, must-have instrumentation), and a local-first experiment tracker with a 17-category verification report and 22 automated tests.

Across all three, the pattern is the same: identify a meaningful problem, define the product with clear trade-offs, build measurement systems that tell me whether it's working, verify what I claim, and be honest about what I haven't validated.

I'm strongest at product definition, prioritization, trade-offs, measurement design, and verification — and I bring technical depth and AI product integrity as a differentiator."

**Product principles:**
- "AI can improve how you say it. It cannot decide what happened." (ReviewFlow)
- "Measure what matters, not what's easy." (Unrot)
- "Define the product before you build it. Make the trade-offs explicit." (Experiment Tracker)
- "Verify what you claim. Say openly what you haven't validated." (All three)

---

## Selected Work

### ReviewFlow (Flagship)
**One-line:** "AI product integrity — an AI-assisted review tool with guardrails against AI risks, human approval, and rigorous AI quality measurement."
**PM signal:** AI product integrity + measurement + verification + honesty.
**Strongest evidence:** Product principle, 247 deterministic checks, output evaluator, corrected evaluator, 15 historical test cases, failure analysis, prompt intervention, intervention record, editable output, human approval, manual Google handoff, no fabricated stats, no "Powered by AI" badge.
**Lifecycle stage:** Build → Measure (strongest), Discovery → Validate (moderate), Launch → GTM (none).
**Credibility caveat:** No real user validation. No live production AI evidence. No measured adoption or outcome. No meaningful GTM. No scale/growth evidence.
**CTA:** "Read the ReviewFlow case study →"

### Unrot Daily Retention (Flagship / Supporting)
**One-line:** "Retention analytics — a Day-1 retention prototype with a structured measurement model (metric hierarchy, 7-stage funnel, must-have instrumentation) and a production-shaped architecture."
**PM signal:** Discovery + measurement model + retention analytics + technical execution.
**Strongest evidence:** D1 retention problem framing, measurement model, user segments, JTBD hypotheses with assumptions/inferences/unknowns, production-shaped prototype with auth + deployment-shaped architecture + health endpoint + build/lint/typecheck, analytics persistence evidence from earlier validation.
**Lifecycle stage:** Discover → Define → Build (strongest), Measure → Optimize (moderate), Launch → GTM (none), Scale → Grow (none).
**Credibility caveat:** No strong external user research. No meaningful measured retention outcome. No proven launch/GTM. No growth/scale story. Real D1 retention outcome is not yet evidenced.
**CTA:** "Read the Unrot case study →"

### Experiment Tracker (Supporting)
**One-line:** "Product definition — a local-first experiment tracker with a 7-candidate prioritization analysis, a clear MVP boundary, and a 17-category verification report with 22 automated tests."
**PM signal:** Product definition + prioritization + trade-offs + verification + honest non-claims.
**Strongest evidence:** PRODUCT_BRIEF.md (problem, user, JTBDs, product question, 7-candidate prioritization with "what it would add" + "why not prioritized"), MVP boundary (in/out of scope + trade-offs), conclusion capture implementation, 22 automated tests, 17-category verification report with evidence labels.
**Lifecycle stage:** Define → Build → Verify (strongest), Discover → Validate (weak), Launch → GTM (none), Measure → Optimize (weak — proposed usage metric not measured), Scale → Grow (none).
**Credibility caveat:** No external user research. No external users. No launch. No GTM. No measured product outcomes. No scale/growth.
**CTA:** "Read the Experiment Tracker case study →"

---

## Product Operating System

**Framework:** DISCOVER → DEFINE → DECIDE → BUILD → MEASURE → LEARN

**DISCOVER:** Identify meaningful problems. Frame them with user segments and JTBD hypotheses. Label assumptions explicitly.
- Evidence: ReviewFlow (AI product principle), Unrot (D1 retention problem framing, JTBD hypotheses with assumptions/inferences/unknowns), Experiment Tracker (experiment data vs. decision gap, JTBDs hypothesized).

**DEFINE:** Turn ambiguous problems into defined products with clear boundaries, user needs, and success criteria.
- Evidence: ReviewFlow (product decisions, MVP prioritization, architecture doc), Unrot (measurement model, D1 retention model), Experiment Tracker (PRODUCT_BRIEF.md).

**DECIDE:** Prioritize alternatives with explicit criteria. Make trade-offs with rationale. Choose the smallest capability that addresses the most important gap.
- Evidence: ReviewFlow (AI guardrails over AI features, human approval over full automation, narrow MVP), Unrot (measurement model over feature breadth, metric hierarchy, must-have instrumentation), Experiment Tracker (7-candidate prioritization with "what it would add" + "why not prioritized").

**BUILD:** Build working products — or work closely with engineering to build them — across multiple stacks, with verification in mind.
- Evidence: ReviewFlow (React + Supabase + Edge Functions + TypeScript, CI/test infrastructure, production-quality error handling, frontend timeout handling), Unrot (TypeScript/Next.js + PostgreSQL + Prisma + auth, health endpoint, deployment-shaped architecture, build/lint/typecheck), Experiment Tracker (Flask + SQLite + Jinja2 + vanilla JS, clean separation, 22 tests, 17-category verification report).

**MEASURE:** Define success metrics. Build measurement systems. Design experiments to test hypotheses.
- Evidence: ReviewFlow (metrics plan, experiment plan, AI quality measurement — 247 deterministic checks, output evaluator, corrected evaluator, 15 historical cases, failure analysis, prompt intervention, intervention record), Unrot (measurement model — metric hierarchy, 7-stage funnel, must-have instrumentation, analytics, guardrails), Experiment Tracker (proposed usage metric — experiments_with_conclusion / completed_experiments — not yet measured).

**LEARN:** Use evidence to make decisions. Verify what you claim. Be honest about what you haven't validated.
- Evidence: ReviewFlow (AI quality regression — failure analysis, prompt intervention, intervention record honestly documented), Unrot (measurement model + analytics design, analytics persistence evidence from earlier validation), Experiment Tracker (17-category verification report with evidence labels, 22 tests), KAIRO (Verification Truthfulness Protocol, evidence discipline).

---

## Product Lab (Evidence / Credibility)

"I distinguish what I've observed, what I've verified, what I've inferred, what's a hypothesis, what's proposed, and what's not evidenced. This isn't academic — it's how I avoid overclaiming. In my case studies, you'll see which claims are backed by tests, which are inferred from the data model, which are hypotheses I haven't validated, and which are things I explicitly haven't measured yet."

**Evidence labels:**
- OBSERVED — seen in the code, tests, or documentation
- VERIFIED — confirmed through testing or review
- INFERRED — reasonably inferred, not directly observed
- HYPOTHESIS — not yet validated
- PROPOSED — proposed, not yet implemented or measured
- NOT EVIDENCED — claimed in aspirations, not supported by evidence

See `docs/EVIDENCE-MODEL.md` for full details.

---

## Experience

**Nokia:**
"At Nokia, I worked on [brief domain description] — navigating ambiguity, translating requirements into technical execution, coordinating across stakeholders, and delivering cross-functional work. This showed me how complex products are built and how technical decisions affect real users."

**NOT to claim:** "Product Manager" title if it wasn't. Formal PM tenure. PM responsibilities that weren't there.

**IIM Tiruchirappalli:**
"Product Management in the Agentic AI Era — formal product management training focused on AI-era product thinking."

**Skills (concise):**
- Technical: Python, Flask, SQLite, React, TypeScript, Next.js, Supabase, Edge Functions, PostgreSQL, Prisma, Git, testing, CI.
- Product: Problem framing, prioritization, trade-offs, MVP definition, measurement design, verification, AI product integrity, AI quality measurement.

---

## Credentials

- IIM Tiruchirappalli — Product Management in the Agentic AI Era
- Any other relevant credentials (if verifiable)

**NOT to include:** Inflated or unverifiable credentials. Credential walls that distract from the work.

---

## Now (Optional)

"Currently building this portfolio. Next: validating one hypothesis with real users or measuring one product outcome — because the gap between what I've defined and what I've validated is the most honest thing about this portfolio."

---

## Contact

"Email: [email] | LinkedIn: [link] | GitHub: [link]"

"[Optional: I'm open to Technical Product Manager / Product Owner roles where product definition, measurement, and verification matter — especially in AI products or product analytics.]"

---

## Case Study Structure

Reusable structure for ReviewFlow and Unrot case studies:

01. Problem
02. Context
03. Users
04. Discovery
05. Insight
06. Product Question
07. Hypothesis
08. Options
09. Prioritization
10. Decision
11. Trade-offs
12. MVP
13. UX / Product Definition
14. Technical Approach
15. Measurement
16. Experimentation
17. Verification
18. Learning
19. Limitations
20. Next Opportunity

For each section, mark: STRONG / MODERATE / WEAK / MISSING.

Do NOT manufacture missing evidence. Where evidence is missing, specify how the case study should communicate that honestly.

---

## Three-Project Narrative

**ReviewFlow = AI product integrity + evidence + measurement**
The most distinctive signal. Shows the author understands AI products — what AI can and cannot do, how to design guardrails against AI risks, how to build honesty into an AI product, and how to measure AI quality rigorously.

**Unrot = Retention/product analytics + measurement model + discovery rigor**
Shows the author can frame a retention problem, define a measurement model with metric hierarchy and funnel instrumentation, identify user segments and JTBD hypotheses, and build a production-shaped prototype with auth + deployment-shaped architecture.

**Experiment Tracker = Product definition + prioritization + trade-offs + verification**
Shows the author can take a personal-product problem, evaluate seven alternatives with explicit criteria, choose the smallest capability that closes the loop, define a clear MVP boundary with trade-offs, implement it, and verify it with a 17-category verification report and 22 automated tests.

**Why this combination is stronger than unrelated projects:**
All three share a common product-engineering philosophy: identify a meaningful problem, define the product with clear trade-offs, build measurement systems, verify what you claim, and be honest about what you haven't validated. This thread ties them together as the work of one coherent product thinker, not three random technical demos.

---

## KAIRO Positioning

**KAIRO = Product Engineering System / Operator Note**

How it appears: Small "How I Work" section. Not a featured project. Not a case study. Not a shipped product.

What it demonstrates:
- Product-engineering orchestration (UNDERSTAND → DISCOVER → DESIGN → ARCHITECT → BUILD → TEST → DEBUG → REVIEW → SHIP)
- Structured workflows (detailed procedural system for product engineering)
- Verification truthfulness (Verification Truthfulness Protocol)
- Evidence discipline (observed → inferred → assumed)
- AI-assisted product development

What NOT to present:
- As a shipped software product (it has no application code, no users, no outcomes, no measurement)
- As a standalone PM case study (it's a methodology note, not a product case study)
- As evidence of product-market fit, users, or outcomes (it has none)
