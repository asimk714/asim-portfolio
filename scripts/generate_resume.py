"""
Generates the official ATS-friendly Product Management Resume for Asim Kumar.
Produces:
1. docs/Asim_Kumar_PM_Resume.docx (Word source)
2. static/assets/resume/Asim-Kumar-Resume.pdf (Production PDF)
3. docs/Asim_Kumar_PM_Resume_text.txt (Plain text extraction for ATS verification)
"""
import os
import sys
from docx import Document
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable, KeepTogether, PageBreak
)
import pypdf

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DOCS_DIR = os.path.join(BASE_DIR, "docs")
STATIC_RESUME_DIR = os.path.join(BASE_DIR, "static", "assets", "resume")
os.makedirs(DOCS_DIR, exist_ok=True)
os.makedirs(STATIC_RESUME_DIR, exist_ok=True)

DOCX_PATH = os.path.join(DOCS_DIR, "Asim_Kumar_PM_Resume.docx")
PDF_PATH = os.path.join(STATIC_RESUME_DIR, "Asim-Kumar-Resume.pdf")
TXT_PATH = os.path.join(DOCS_DIR, "Asim_Kumar_PM_Resume_text.txt")


def set_cell_margins(cell, top=50, bottom=50, left=100, right=100):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)


def build_docx():
    doc = Document()
    
    # 0.5 inch margins all around
    sections = doc.sections
    for s in sections:
        s.top_margin = Inches(0.5)
        s.bottom_margin = Inches(0.5)
        s.left_margin = Inches(0.55)
        s.right_margin = Inches(0.55)
        s.page_width = Inches(8.5)
        s.page_height = Inches(11.0)
        
    color_primary = RGBColor(15, 23, 42)    # Slate 900
    color_accent = RGBColor(14, 116, 144)   # Cyan 700 / Deep Teal
    color_muted = RGBColor(71, 85, 105)     # Slate 600

    def add_heading_rule(text):
        p = doc.add_paragraph()
        p.paragraph_format.space_before = Pt(8)
        p.paragraph_format.space_after = Pt(2)
        p.paragraph_format.keep_with_next = True
        run = p.add_run(text.upper())
        run.bold = True
        run.font.size = Pt(9.5)
        run.font.name = "Arial"
        run.font.color.rgb = color_accent
        
        # Border under paragraph
        pPr = p._p.get_or_add_pPr()
        pBdr = parse_xml(r'<w:pBdr xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
                         r'<w:bottom w:val="single" w:sz="6" w:space="2" w:color="0E7490"/>'
                         r'</w:pBdr>')
        pPr.append(pBdr)

    # --- Header ---
    p_name = doc.add_paragraph()
    p_name.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_name.paragraph_format.space_before = Pt(0)
    p_name.paragraph_format.space_after = Pt(1)
    run_name = p_name.add_run("ASIM KUMAR")
    run_name.bold = True
    run_name.font.size = Pt(18)
    run_name.font.name = "Arial"
    run_name.font.color.rgb = color_primary

    p_sub = doc.add_paragraph()
    p_sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_sub.paragraph_format.space_before = Pt(0)
    p_sub.paragraph_format.space_after = Pt(3)
    run_sub = p_sub.add_run("Technical Product Manager Candidate | Product Owner | Systems Engineer")
    run_sub.bold = True
    run_sub.font.size = Pt(10)
    run_sub.font.name = "Arial"
    run_sub.font.color.rgb = color_accent

    p_contact = doc.add_paragraph()
    p_contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_contact.paragraph_format.space_before = Pt(0)
    p_contact.paragraph_format.space_after = Pt(6)
    run_c = p_contact.add_run(
        "Gurugram, Haryana, India  •  +91 98177 53425  •  asimkumar613@gmail.com\n"
        "Portfolio: github.com/asimk714/asim-portfolio  •  LinkedIn: linkedin.com/in/asim-kumar-b69558188  •  GitHub: github.com/asimk714"
    )
    run_c.font.size = Pt(8.5)
    run_c.font.name = "Arial"
    run_c.font.color.rgb = color_muted

    # --- Executive Summary ---
    add_heading_rule("Professional Summary")
    p_sum = doc.add_paragraph()
    p_sum.paragraph_format.space_before = Pt(2)
    p_sum.paragraph_format.space_after = Pt(4)
    run_sum = p_sum.add_run(
        "Product-minded engineer transitioning into Product Management, offering 8+ years of technical systems execution in telecom network infrastructure combined with formal Executive Product Management training from IIM Tiruchirappalli. Demonstrated end-to-end product thinking across 3 flagship implementations (ReviewFlow, Unrot, Experiment Tracker) and 7 supporting product teardowns—authoring PRDs, Gherkin acceptance criteria, RICE/MoSCoW prioritization frameworks, automated verification suites, and interactive prototypes. Proven ability to translate ambiguous operational problems into structured technical execution, coordinate cross-functional engineering teams, and design AI workflows with rigorous evaluation and anti-hallucination guardrails."
    )
    run_sum.font.size = Pt(9)
    run_sum.font.name = "Arial"

    # --- Core Competencies ---
    add_heading_rule("Core Product & Technical Competencies")
    comp_bullets = [
        ("Product Strategy & Discovery: ", "Problem discovery, user journey mapping, Jobs-to-be-Done (JTBD), PRD authoring, user stories & Gherkin acceptance criteria, competitive benchmarking."),
        ("Prioritization & Scoping: ", "RICE & MoSCoW prioritization, Impact vs. Effort matrices, MVP boundary scoping, trade-off documentation, decision records."),
        ("Experimentation & Metrics: ", "A/B test design, sample size & statistical power calculations, cohort retention modeling (D1/D7), evaluation metrics (precision, hallucination rate)."),
        ("AI Product Integrity: ", "Deterministic AI output grading, prompt architecture, synthetic evaluation fixtures, hallucination mitigation guardrails, executive AI workflows."),
        ("Technical Execution & Tools: ", "Python, Flask, SQLite, TypeScript, SQL queries & data modeling, REST APIs, Git, Jira, Trello, Confluence documentation, FMEA root-cause analysis.")
    ]
    for bold_prefix, text in comp_bullets:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(1)
        rb = p.add_run(bold_prefix)
        rb.bold = True
        rb.font.size = Pt(8.5)
        rb.font.name = "Arial"
        rt = p.add_run(text)
        rt.font.size = Pt(8.5)
        rt.font.name = "Arial"

    # --- Product Portfolio Projects ---
    add_heading_rule("Featured Product Case Studies (Independent Implementations)")
    
    projects = [
        {
            "title": "ReviewFlow — AI-Assisted Customer Review Analysis & Response Pipeline",
            "tag": "Product Specification, Evaluation Pipeline & Live Prototype",
            "bullets": [
                "Defined product boundaries for an AI review synthesis tool designed to draft context-faithful salon responses while preventing hallucinated claims.",
                "Authored 8 structured product decision records; deliberately deprioritized automatic posting to Google to eliminate hallucination liability.",
                "Scoped MVP with MoSCoW; developed and verified a 15-case regression suite and automated evaluator measuring rating consistency, superlative drift, and format compliance."
            ]
        },
        {
            "title": "Unrot — Daily Retention Modeling & Cross-Functional Prioritization",
            "tag": "Retention Modeling, Experiment Design & Strategic Decision Brief",
            "bullets": [
                "Investigated educational habit decay; built a Day 1 retention measurement model and formulated testable Jobs-to-be-Done (JTBD) hypotheses.",
                "Engineered a complete A/B experiment plan with power calculations and sample size requirements to test return-intent notification timing.",
                "Authored a comprehensive 6-role cross-functional decision brief (Product, Business, UX, Data, Eng, QA) establishing clear pre-test verification guardrails."
            ]
        },
        {
            "title": "Experiment Tracker — Statistical Rigor & Decision-Support System",
            "tag": "PRD Scoping, 17-Category Verification & Functional Prototype",
            "bullets": [
                "Identified the 'experiment graveyard' friction point where test results lack structured conclusion capture and explicit launch/kill decision criteria.",
                "Authored a 7-candidate product brief; prioritized conclusion capture (closing the loop in ~27 lines) over non-essential charting and complex auth.",
                "Verified functionality across an automated 17-category verification suite and 26 test functions covering database integrity and decision gating."
            ]
        },
        {
            "title": "Windows Taskflow & IRCTC Rail Connect — Product Teardowns & Prototypes",
            "tag": "User Journey Mapping, Concurrency Analysis & Clickable Prototypes",
            "bullets": [
                "Windows Taskflow: Authored PRD for context-aware workspaces; scoped backlog via RICE, defining <3.5s state restoration as P0 KPI with interactive mockup.",
                "IRCTC Rail Connect: Mapped the 120-second Tatkal booking funnel; isolated 4 core friction points and built a 2-step checkout prototype with pre-saved passenger vaults and 1-tap UPI."
            ]
        }
    ]

    for proj in projects:
        p_hdr = doc.add_paragraph()
        p_hdr.paragraph_format.space_before = Pt(4)
        p_hdr.paragraph_format.space_after = Pt(1)
        p_hdr.paragraph_format.keep_with_next = True
        r_t = p_hdr.add_run(proj["title"])
        r_t.bold = True
        r_t.font.size = Pt(9)
        r_t.font.name = "Arial"
        r_tag = p_hdr.add_run(f"  [{proj['tag']}]")
        r_tag.italic = True
        r_tag.font.size = Pt(8)
        r_tag.font.name = "Arial"
        r_tag.font.color.rgb = color_muted

        for b in proj["bullets"]:
            pb = doc.add_paragraph(style='List Bullet')
            pb.paragraph_format.space_before = Pt(1)
            pb.paragraph_format.space_after = Pt(1)
            rb = pb.add_run(b)
            rb.font.size = Pt(8.5)
            rb.font.name = "Arial"

    # --- Page Break before Professional Experience ---
    doc.add_page_break()

    # --- Professional Experience ---
    add_heading_rule("Professional Experience (Engineering Execution & Transferable PM Skills)")

    roles = [
        {
            "company": "Nokia Solutions and Networks India Pvt Ltd",
            "location": "Gurugram, India",
            "role": "Engineer — Systems & Hardware Diagnostics",
            "dates": "Sep 2023 – Present",
            "bullets": [
                "Execute hands-on diagnostic testing, troubleshooting, and root-cause analysis (RCA) on carrier telecom systems: Nokia SM1660 Matrix E, GPON Fixed Network cards, and Nokia Wi-Fi.",
                "Coordinate cross-functional customer escalation triage across customer-facing teams, Site Reliability Engineers (SRE), and repair centre technical personnel.",
                "Translate vague field outage tickets into structured, reproducible diagnostic investigation plans, replicating field configurations to isolate intermittent hardware resets and prevent repeat failures."
            ]
        },
        {
            "company": "Radio Design India Pvt Ltd",
            "location": "Gurugram, India",
            "role": "Repair Engineer",
            "dates": "Dec 2020 – 2021",
            "bullets": [
                "Conducted diagnostic fault-finding, frequency tuning, and functional testing on RF routers and power amplifier units across stringent frequency specifications.",
                "Standardized alignment and verification procedures to ensure zero-defect deployment across live telecom infrastructure."
            ]
        },
        {
            "company": "CTDI India Pvt Ltd (Communications Test Design India)",
            "location": "Gurugram, India",
            "role": "Repair Engineer",
            "dates": "Feb 2018 – Dec 2020",
            "bullets": [
                "Executed component-level troubleshooting, repair, and qualification across Wi-Fi routers, modems, set-top boxes, and power supplies.",
                "Identified common failure modes across test stations, documenting repeatable diagnostic workflows to maintain turnaround standards."
            ]
        },
        {
            "company": "iQor Global Services India Pvt Ltd",
            "location": "Gurugram, India",
            "role": "Repair Engineer",
            "dates": "Oct 2017 – Feb 2018",
            "bullets": [
                "Performed functional testing, troubleshooting, and calibration for consumer digital set-top boxes (DEN Skyworth & Airtel STB), enforcing strict quality thresholds on borderline units."
            ]
        }
    ]

    for r in roles:
        p_r = doc.add_paragraph()
        p_r.paragraph_format.space_before = Pt(4)
        p_r.paragraph_format.space_after = Pt(1)
        p_r.paragraph_format.keep_with_next = True
        r_comp = p_r.add_run(r["company"])
        r_comp.bold = True
        r_comp.font.size = Pt(9)
        r_comp.font.name = "Arial"
        r_dot = p_r.add_run(f" — {r['role']}")
        r_dot.font.size = Pt(8.5)
        r_dot.font.name = "Arial"
        r_d = p_r.add_run(f" ({r['dates']})")
        r_d.italic = True
        r_d.font.size = Pt(8)
        r_d.font.name = "Arial"
        r_d.font.color.rgb = color_muted

        for b in r["bullets"]:
            pb = doc.add_paragraph(style='List Bullet')
            pb.paragraph_format.space_before = Pt(1)
            pb.paragraph_format.space_after = Pt(1)
            rb = pb.add_run(b)
            rb.font.size = Pt(8.5)
            rb.font.name = "Arial"

    # --- Education & Certifications ---
    add_heading_rule("Education & Verified Credentials")

    edu_items = [
        ("Executive Education: Product Management in the Agentic AI Era", "IIM Tiruchirappalli & Masai School (Aug 2026 cohort)"),
        ("Product Owner Certification", "Udemy (Credential ID: F607C4712D38)"),
        ("Python for AI", "ScholarHat (Credential ID: IJDU240126)"),
        ("Management Consulting & Excel Analytics", "Jobaaj Learnings (Credential ID: AIJDW103334)"),
        ("Bachelor of Technology (B.Tech) in Mechanical Engineering", "Kurukshetra University (2014 – 2017)"),
        ("Diploma in Electronics & Communication Engineering (ECE)", "Govt. Polytechnic Ambala City (2010 – 2013)")
    ]

    for title, inst in edu_items:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(1)
        rt = p.add_run(f"{title} — ")
        rt.bold = True
        rt.font.size = Pt(8.5)
        rt.font.name = "Arial"
        ri = p.add_run(inst)
        ri.font.size = Pt(8.5)
        ri.font.name = "Arial"

    # --- Systems & Technical Capabilities ---
    add_heading_rule("Technical Stack & Operational Tooling")
    tech_items = [
        ("Telecom & Diagnostic Systems: ", "Carrier-grade DWDM/SDH (Nokia SM1660 Matrix E), GPON Optical Line Terminals (OLT) & ONTs, Nokia Wi-Fi beacons, RF signal generators & power amplifiers, spectrum analyzers."),
        ("Development & Product Analytics: ", "Python 3, Flask, SQLite, TypeScript, REST APIs, Git, Jira, Trello, Confluence, Microsoft Excel (Advanced financial & cohort modeling)."),
        ("Methodologies & Quality Standards: ", "Root Cause Analysis (RCA), Failure Mode and Effects Analysis (FMEA), Gherkin BDD specs, MoSCoW / RICE prioritization, statistical power analysis, automated anti-hallucination evaluation suites.")
    ]
    for bold_prefix, text in tech_items:
        p = doc.add_paragraph(style='List Bullet')
        p.paragraph_format.space_before = Pt(1)
        p.paragraph_format.space_after = Pt(1)
        rb = p.add_run(bold_prefix)
        rb.bold = True
        rb.font.size = Pt(8.5)
        rb.font.name = "Arial"
        rt = p.add_run(text)
        rt.font.size = Pt(8.5)
        rt.font.name = "Arial"

    doc.save(DOCX_PATH)
    print(f"DOCX saved to {DOCX_PATH}")


def build_pdf():
    # Target 2-page clean layout
    doc = SimpleDocTemplate(
        PDF_PATH,
        pagesize=letter,
        leftMargin=36,
        rightMargin=36,
        topMargin=30,
        bottomMargin=30
    )

    styles = getSampleStyleSheet()
    
    # Custom styles
    primary_color = colors.HexColor("#0f172a")  # Slate 900
    accent_color = colors.HexColor("#0e7490")   # Deep Teal
    muted_color = colors.HexColor("#475569")    # Slate 600
    body_color = colors.HexColor("#1e293b")     # Slate 800

    style_name = ParagraphStyle(
        'DocName',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=16.5,
        leading=19,
        alignment=1, # Center
        textColor=primary_color
    )
    style_sub = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11.5,
        alignment=1,
        textColor=accent_color
    )
    style_contact = ParagraphStyle(
        'DocContact',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10,
        alignment=1,
        textColor=muted_color
    )
    style_heading = ParagraphStyle(
        'DocHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.8,
        leading=10.8,
        textColor=accent_color,
        spaceBefore=5,
        spaceAfter=1.5,
        keepWithNext=True
    )
    style_body = ParagraphStyle(
        'DocBody',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8,
        leading=10.2,
        textColor=body_color,
        spaceBefore=1,
        spaceAfter=1.5
    )
    style_bullet = ParagraphStyle(
        'DocBullet',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=9.8,
        textColor=body_color,
        leftIndent=11,
        firstLineIndent=-7,
        spaceBefore=0.8,
        spaceAfter=1
    )
    style_item_title = ParagraphStyle(
        'DocItemTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.2,
        leading=10.2,
        textColor=primary_color,
        spaceBefore=2.5,
        spaceAfter=0.8,
        keepWithNext=True
    )

    story = []

    # Header
    story.append(Paragraph("ASIM KUMAR", style_name))
    story.append(Paragraph("Technical Product Manager Candidate | Product Owner | Systems Engineer", style_sub))
    story.append(Spacer(1, 2))
    story.append(Paragraph(
        "Gurugram, Haryana, India  &bull;  +91 98177 53425  &bull;  asimkumar613@gmail.com<br/>"
        "Portfolio: github.com/asimk714/asim-portfolio  &bull;  LinkedIn: linkedin.com/in/asim-kumar-b69558188  &bull;  GitHub: github.com/asimk714",
        style_contact
    ))
    story.append(Spacer(1, 3))
    story.append(HRFlowable(width="100%", thickness=1, color=accent_color, spaceBefore=1.5, spaceAfter=3))

    # Summary
    story.append(Paragraph("PROFESSIONAL SUMMARY", style_heading))
    story.append(Paragraph(
        "Product-minded engineer transitioning into Product Management, offering 8+ years of technical systems execution in telecom network infrastructure combined with formal Executive Product Management education from IIM Tiruchirappalli. Demonstrated end-to-end product thinking across 3 flagship implementations (ReviewFlow, Unrot, Experiment Tracker) and 7 supporting product teardowns—authoring PRDs, Gherkin acceptance criteria, RICE/MoSCoW prioritization frameworks, automated verification suites, and interactive prototypes. Proven ability to translate ambiguous operational problems into structured technical execution, coordinate cross-functional engineering teams, and design AI workflows with rigorous evaluation and anti-hallucination guardrails.",
        style_body
    ))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceBefore=2.5, spaceAfter=2.5))

    # Competencies
    story.append(Paragraph("CORE PRODUCT & TECHNICAL COMPETENCIES", style_heading))
    competencies = [
        "<b>Product Strategy & Discovery:</b> Problem discovery, user journey mapping, Jobs-to-be-Done (JTBD), PRD authoring, user stories & Gherkin acceptance criteria, competitive benchmarking.",
        "<b>Prioritization & Scoping:</b> RICE & MoSCoW prioritization, Impact vs. Effort matrices, MVP boundary scoping, trade-off documentation, decision records.",
        "<b>Experimentation & Metrics:</b> A/B test design, sample size & statistical power calculations, cohort retention modeling (D1/D7), evaluation metrics (precision, hallucination rate).",
        "<b>AI Product Integrity:</b> Deterministic AI output grading, prompt architecture, synthetic evaluation fixtures, hallucination mitigation guardrails, executive AI workflows.",
        "<b>Technical Execution & Tools:</b> Python, Flask, SQLite, TypeScript, SQL queries & data modeling, REST APIs, Git, Jira, Trello, Confluence documentation, FMEA root-cause analysis."
    ]
    for c in competencies:
        story.append(Paragraph(f"&bull; {c}", style_bullet))
    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceBefore=2.5, spaceAfter=2.5))

    # Featured Projects
    story.append(Paragraph("FEATURED PRODUCT CASE STUDIES (INDEPENDENT IMPLEMENTATIONS)", style_heading))
    
    p1 = [
        Paragraph("<b>ReviewFlow — AI-Assisted Customer Review Analysis & Response Pipeline</b> <font color='#475569'><i>[PRD, Evaluation Pipeline & Live Prototype]</i></font>", style_item_title),
        Paragraph("&bull; Scoped product boundaries for an AI review synthesis tool designed to draft context-faithful salon responses while preventing hallucinated claims.", style_bullet),
        Paragraph("&bull; Authored 8 structured product decision records; deliberately deprioritized automatic posting to Google to eliminate hallucination liability.", style_bullet),
        Paragraph("&bull; Scoped MVP with MoSCoW; developed and verified a 15-case regression suite and automated evaluator measuring rating consistency, superlative drift, and format compliance.", style_bullet)
    ]
    story.extend(p1)

    p2 = [
        Paragraph("<b>Unrot — Daily Retention Modeling & Cross-Functional Prioritization</b> <font color='#475569'><i>[Retention Modeling, Experiment Design & Strategic Decision Brief]</i></font>", style_item_title),
        Paragraph("&bull; Investigated educational habit decay; built a Day 1 retention measurement model and formulated testable Jobs-to-be-Done (JTBD) hypotheses.", style_bullet),
        Paragraph("&bull; Engineered a complete A/B experiment plan with power calculations and sample size requirements to test return-intent notification timing.", style_bullet),
        Paragraph("&bull; Authored a comprehensive 6-role cross-functional decision brief (Product, Business, UX, Data, Eng, QA) establishing clear pre-test verification guardrails.", style_bullet)
    ]
    story.extend(p2)

    p3 = [
        Paragraph("<b>Experiment Tracker — Statistical Rigor & Decision-Support System</b> <font color='#475569'><i>[PRD Scoping, 17-Category Verification & Functional Prototype]</i></font>", style_item_title),
        Paragraph("&bull; Identified the 'experiment graveyard' friction point where test results lack structured conclusion capture and explicit launch/kill decision criteria.", style_bullet),
        Paragraph("&bull; Authored a 7-candidate product brief; prioritized conclusion capture (closing the loop in ~27 lines) over non-essential charting and complex auth.", style_bullet),
        Paragraph("&bull; Verified functionality across an automated 17-category verification suite and 26 test functions covering database integrity and decision gating.", style_bullet)
    ]
    story.extend(p3)

    p4 = [
        Paragraph("<b>Windows Taskflow & IRCTC Rail Connect — Product Teardowns & Prototypes</b> <font color='#475569'><i>[User Journey Mapping, Concurrency Analysis & Clickable Prototypes]</i></font>", style_item_title),
        Paragraph("&bull; <b>Windows Taskflow:</b> Authored PRD for context-aware workspaces; scoped backlog via RICE, defining &lt;3.5s state restoration as P0 KPI with interactive mockup.", style_bullet),
        Paragraph("&bull; <b>IRCTC Rail Connect:</b> Mapped the 120-second Tatkal booking funnel; isolated 4 core friction points and built a 2-step checkout prototype with pre-saved passenger vaults and 1-tap UPI.", style_bullet)
    ]
    story.extend(p4)

    # --- Page Break to split Page 1 (Product Case Studies) and Page 2 (Engineering Execution & Credentials) ---
    story.append(PageBreak())

    # Experience
    story.append(Paragraph("PROFESSIONAL EXPERIENCE (ENGINEERING EXECUTION & TRANSFERABLE PM SKILLS)", style_heading))
    
    exp1 = [
        Paragraph("<b>Nokia Solutions and Networks India Pvt Ltd</b> — Engineer (Systems & Hardware Diagnostics) <font color='#475569'><i>(Sep 2023 – Present)</i></font>", style_item_title),
        Paragraph("&bull; Execute hands-on diagnostic testing, troubleshooting, and root-cause analysis (RCA) on carrier telecom systems: Nokia SM1660 Matrix E, GPON Fixed Network cards, and Nokia Wi-Fi.", style_bullet),
        Paragraph("&bull; Coordinate cross-functional customer escalation triage across customer-facing teams, Site Reliability Engineers (SRE), and repair centre technical personnel.", style_bullet),
        Paragraph("&bull; Translate vague field outage tickets into structured, reproducible diagnostic investigation plans, replicating field configurations to isolate intermittent hardware resets and prevent repeat failures.", style_bullet)
    ]
    story.extend(exp1)

    exp2 = [
        Paragraph("<b>Radio Design India Pvt Ltd</b> — Repair Engineer <font color='#475569'><i>(Dec 2020 – 2021)</i></font>", style_item_title),
        Paragraph("&bull; Conducted diagnostic fault-finding, frequency tuning, and functional testing on RF routers and power amplifier units across stringent frequency specifications.", style_bullet),
        Paragraph("&bull; Standardized alignment and verification procedures to ensure zero-defect deployment across live telecom infrastructure.", style_bullet)
    ]
    story.extend(exp2)

    exp3 = [
        Paragraph("<b>CTDI India Pvt Ltd (Communications Test Design India)</b> — Repair Engineer <font color='#475569'><i>(Feb 2018 – Dec 2020)</i></font>", style_item_title),
        Paragraph("&bull; Executed component-level troubleshooting, repair, and qualification across Wi-Fi routers, modems, set-top boxes, and power supplies.", style_bullet),
        Paragraph("&bull; Identified common failure modes across test stations, documenting repeatable diagnostic workflows to maintain turnaround standards.", style_bullet)
    ]
    story.extend(exp3)

    exp4 = [
        Paragraph("<b>iQor Global Services India Pvt Ltd</b> — Repair Engineer <font color='#475569'><i>(Oct 2017 – Feb 2018)</i></font>", style_item_title),
        Paragraph("&bull; Performed functional testing, troubleshooting, and calibration for consumer digital set-top boxes (DEN Skyworth & Airtel STB), enforcing strict quality thresholds on borderline units.", style_bullet)
    ]
    story.extend(exp4)

    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceBefore=2.5, spaceAfter=2.5))

    # Education & Credentials
    story.append(Paragraph("EDUCATION & VERIFIED CREDENTIALS", style_heading))
    edu = [
        "<b>Executive Education: Product Management in the Agentic AI Era</b> — IIM Tiruchirappalli & Masai School (Aug 2026 cohort)",
        "<b>Product Owner Certification</b> — Udemy (Credential ID: F607C4712D38)",
        "<b>Python for AI</b> — ScholarHat (Credential ID: IJDU240126)",
        "<b>Management Consulting & Excel Analytics</b> — Jobaaj Learnings (Credential ID: AIJDW103334)",
        "<b>Bachelor of Technology (B.Tech) in Mechanical Engineering</b> — Kurukshetra University (2014 – 2017)",
        "<b>Diploma in Electronics & Communication Engineering (ECE)</b> — Govt. Polytechnic Ambala City (2010 – 2013)"
    ]
    for e in edu:
        story.append(Paragraph(f"&bull; {e}", style_bullet))

    story.append(HRFlowable(width="100%", thickness=0.5, color=colors.HexColor("#cbd5e1"), spaceBefore=2.5, spaceAfter=2.5))

    # Technical Stack & Systems Capabilities
    story.append(Paragraph("TECHNICAL STACK & OPERATIONAL TOOLING", style_heading))
    tech = [
        "<b>Telecom & Diagnostic Systems:</b> Carrier-grade DWDM/SDH (Nokia SM1660 Matrix E), GPON Optical Line Terminals (OLT) & ONTs, Nokia Wi-Fi beacons, RF signal generators & power amplifiers, spectrum analyzers.",
        "<b>Development & Product Analytics:</b> Python 3, Flask, SQLite, TypeScript, REST APIs, Git, Jira, Trello, Confluence, Microsoft Excel (Advanced financial & cohort modeling).",
        "<b>Methodologies & Quality Standards:</b> Root Cause Analysis (RCA), Failure Mode and Effects Analysis (FMEA), Gherkin BDD specs, MoSCoW / RICE prioritization, statistical power analysis, automated anti-hallucination evaluation suites."
    ]
    for t in tech:
        story.append(Paragraph(f"&bull; {t}", style_bullet))

    doc.build(story)
    print(f"PDF saved to {PDF_PATH}")


def extract_text_and_verify():
    reader = pypdf.PdfReader(PDF_PATH)
    text = ""
    for i, page in enumerate(reader.pages):
        text += f"--- PAGE {i+1} ---\n" + (page.extract_text() or "") + "\n\n"
    with open(TXT_PATH, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Text extracted to {TXT_PATH} (Total pages: {len(reader.pages)})")
    
    # Assertions for ATS integrity
    assert "ASIM KUMAR" in text
    assert "ReviewFlow" in text
    assert "Unrot" in text
    assert "Experiment Tracker" in text
    assert "Nokia" in text
    assert "IIM Tiruchirappalli" in text
    assert "F607C4712D38" in text
    print("ATS content checks passed successfully!")


if __name__ == "__main__":
    build_docx()
    build_pdf()
    extract_text_and_verify()
