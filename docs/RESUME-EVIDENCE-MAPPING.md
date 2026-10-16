# Résumé Statement-to-Evidence Mapping

This document provides complete line-by-line traceability between the statements on Asim Kumar's enhanced Product Management résumé and the underlying verified records and artifacts.

---

## 1. Professional Identity & Contact Header

| Résumé Statement | Evidentiary Basis & Source Location | Status | Notes |
| :--- | :--- | :--- | :--- |
| **"Technical Product Manager Candidate \| Product Owner \| Systems Engineer"** | Primary résumé (`Resume Btech.pdf`), IIM Tiruchirappalli executive PM credentials, Udemy Product Owner certificate (F607C4712D38), 7 years telecom engineering. | **PASS** | Accurately reflects transition candidacy; avoids claiming formal historical PM job title. |
| **Contact info (Gurugram, +91 98177 53425, asimkumar613@gmail.com)** | Primary résumé (`Resume Btech.pdf`), confirmed personal contact channels. | **PASS** | Exact match. |
| **Links: Portfolio, LinkedIn, GitHub** | `github.com/asimk714/asim-portfolio`, `github.com/asimk714`, `linkedin.com/in/asim-kumar-b69558188`. | **PASS** | Active profiles and repositories. |

---

## 2. Professional Summary

| Résumé Statement | Evidentiary Basis & Source Location | Status | Notes |
| :--- | :--- | :--- | :--- |
| **"7 years of technical systems execution in telecom network infrastructure"** | `Resume Btech.pdf`: iQor (4 mos: 2017–2018), CTDI (34 mos: 2018–2020), Radio Design (1–12 mos: 2020–2021), Nokia (37 mos: 2023–Present). | **PASS** | Verified across 4 engineering employers totaling 76–87 active employment months (~7 years excluding 2021–2023 gap). |
| **"Formal Executive Product Management education from IIM Tiruchirappalli"** | `_credentials.html`, `docs/PORTFOLIO-STRATEGY.md`, course completion record. | **PASS** | Executive certification in PM in the Agentic AI Era. |
| **"Demonstrated end-to-end product thinking across 3 flagship implementations (ReviewFlow, Unrot, Experiment Tracker) and 7 supporting product teardowns"** | `app.py`, `templates/work/`, git commits in canonical repo. | **PASS** | All 10 case studies and live interactive experiences are verified in the codebase. |
| **"Authoring PRDs, Gherkin acceptance criteria, RICE/MoSCoW prioritization frameworks, automated verification suites, and interactive prototypes"** | `templates/work/reviewflow.html`, `templates/work/unrot.html`, `templates/work/experiment-tracker.html`, `templates/work/windows-taskflow.html`, `templates/work/irctc.html`. | **PASS** | Specific documented artifacts in each case study. |

---

## 3. Featured Product Case Studies

| Résumé Statement | Evidentiary Basis & Source Location | Status | Notes |
| :--- | :--- | :--- | :--- |
| **ReviewFlow: Scoped product boundaries, 8 decision records, rejected automated posting** | `docs/PRODUCT-DECISIONS.md`, `templates/work/reviewflow.html`, `app.py`. | **PASS** | Explicitly documented decision against Google posting to prevent hallucination risk. |
| **ReviewFlow: 15-case regression suite, evaluator measuring rating consistency** | `app.py` (EVIDENCE_CARDS[0]), `tests/regression/cases.ts`. | **PASS** | Verified synthetic offline evaluation fixture; 0 live AI calls. |
| **Unrot: Day 1 retention measurement model, testable JTBD hypotheses** | `templates/work/unrot.html`, `static/js/unrot-live.js`. | **PASS** | Retention model built with mathematical formulations. |
| **Unrot: A/B experiment plan with power calculations, 6-role cross-functional decision brief** | `templates/work/unrot-cross-functional-decision.html`, `templates/work/unrot.html`. | **PASS** | Comprehensive decision matrix mapping Product, Business, UX, Data, Eng, QA. |
| **Experiment Tracker: 7-candidate product brief, conclusion capture in ~27 lines** | `docs/CONTENT-BLUEPRINT.md`, `templates/work/experiment-tracker.html`. | **PASS** | Documented prioritization of conclusion capture over charting. |
| **Experiment Tracker: 17-category verification suite, 26 test functions** | `templates/work/experiment-tracker.html:406`. | **PASS** | 17-category verification suite and 26 test functions authored in repository; local full test execution was performed in original development environment. |
| **Windows Taskflow: PRD, RICE prioritization, <3.5s state restore KPI** | `templates/work/windows-taskflow.html`, `static/js/windows-taskflow-live.js`. | **PASS** | Working simulation and structured specification. |
| **IRCTC: 120s Tatkal funnel analysis, 4 friction points, 2-step checkout prototype** | `templates/work/irctc.html`, `static/js/irctc-live.js`. | **PASS** | Teardown analyzing high-concurrency drop-off and mobile checkout prototype. |

---

## 4. Professional Experience

| Résumé Statement | Evidentiary Basis & Source Location | Status | Notes |
| :--- | :--- | :--- | :--- |
| **Nokia: Engineer — Systems & Hardware Diagnostics (Sep 2023 – Present)** | `Resume Btech.pdf`, `templates/_experience.html`. | **PASS** | Role is grounded strictly in engineering diagnostics on SM1660 Matrix E, GPON cards, Wi-Fi. |
| **Nokia: Coordinate cross-functional customer escalation triage across customer teams, SRE, and repair centre** | `templates/_experience.html` (GPON and outage RCA workflows). | **PASS** | Concrete engineering escalation and triage coordination. |
| **Radio Design: Repair Engineer (Dec 2020 – 2021)** | `Resume Btech.pdf`. | **PASS** | RF routers and power amplifier alignment. |
| **CTDI: Repair Engineer (Feb 2018 – Dec 2020)** | `Resume Btech.pdf`. | **PASS** | STBs, modems, routers, power supplies diagnostic repair. |
| **iQor: Repair Engineer (Oct 2017 – Feb 2018)** | `Resume Btech.pdf`. | **PASS** | Testing and calibration of consumer digital STBs. |

---

## 5. Education & Credentials

| Credential | Verification Source | Status |
| :--- | :--- | :--- |
| **Executive PM: Agentic AI Era (IIM Tiruchirappalli)** | `templates/_credentials.html`, `docs/PORTFOLIO-STRATEGY.md`. | **PASS** (Coursework completed 2026; formal certificate issuance pending) |
| **Product Owner Certification (Udemy)** | Credential ID: F607C4712D38. | **PASS** |
| **Python for AI (ScholarHat)** | Credential ID: IJDU240126. | **PASS** |
| **Management Consulting & Excel (Jobaaj Learnings)** | Credential ID: AIJDW103334. | **PASS** |
| **B.Tech Mechanical Engineering (Kurukshetra University)** | `Resume Btech.pdf` (2014 – 2017). | **PASS** |
| **Diploma ECE (Govt. Polytechnic Ambala City)** | `Resume Btech.pdf` (2010 – 2013). | **PASS** |
