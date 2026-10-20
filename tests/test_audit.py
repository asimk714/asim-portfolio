"""
Content & Evidence Audit Test Suite
Ensures no unverified claims, missing resume deliverables, or broken prototype assets exist.
"""
import os
import re
import unittest
import pypdf
import docx

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
STATIC_DIR = os.path.join(BASE_DIR, "static")
DOCS_DIR = os.path.join(BASE_DIR, "docs")


class TestPortfolioAudit(unittest.TestCase):
    def test_resume_deliverables_exist(self):
        """Verifies DOCX, PDF, text extraction, evidence matrices, and clickable links exist with 0 control characters."""
        pdf_path = os.path.join(STATIC_DIR, "assets", "resume", "Asim-Kumar-Resume.pdf")
        docx_path = os.path.join(DOCS_DIR, "Asim_Kumar_PM_Resume.docx")
        txt_path = os.path.join(DOCS_DIR, "Asim_Kumar_PM_Resume_text.txt")
        matrix_path = os.path.join(DOCS_DIR, "RESUME-EVIDENCE-MATRIX.md")
        mapping_path = os.path.join(DOCS_DIR, "RESUME-EVIDENCE-MAPPING.md")
        analysis_path = os.path.join(DOCS_DIR, "PM-REQUIREMENTS-ANALYSIS.md")

        self.assertTrue(os.path.isfile(pdf_path), "PDF resume missing")
        self.assertTrue(os.path.isfile(docx_path), "DOCX resume missing")
        self.assertTrue(os.path.isfile(txt_path), "TXT resume missing")
        self.assertTrue(os.path.isfile(matrix_path), "Resume evidence matrix missing")
        self.assertTrue(os.path.isfile(mapping_path), "Resume evidence mapping missing")
        self.assertTrue(os.path.isfile(analysis_path), "PM requirements analysis missing")

        # Verify PDF structure, 2 pages, and link annotations
        pdf = pypdf.PdfReader(pdf_path)
        self.assertEqual(len(pdf.pages), 2, "PDF must be exactly 2 pages")
        pdf_uris = []
        for page in pdf.pages:
            for a in page.get('/Annots', []):
                obj = a.get_object()
                uri = obj.get('/A', {}).get('/URI')
                if uri:
                    pdf_uris.append(uri)
        self.assertIn("https://github.com/asimk714/asim-portfolio", pdf_uris)
        self.assertIn("https://www.linkedin.com/in/asim-kumar-b69558188", pdf_uris)
        self.assertIn("https://github.com/asimk714", pdf_uris)
        self.assertIn("mailto:asimkumar613@gmail.com", pdf_uris)

        # Verify DOCX hyperlink relationships
        doc = docx.Document(docx_path)
        docx_uris = [rel.target_ref for rel in doc.part.rels.values() if 'hyperlink' in rel.reltype]
        self.assertIn("https://github.com/asimk714/asim-portfolio", docx_uris)
        self.assertIn("https://www.linkedin.com/in/asim-kumar-b69558188", docx_uris)
        self.assertIn("https://github.com/asimk714", docx_uris)
        self.assertIn("mailto:asimkumar613@gmail.com", docx_uris)

        # Verify 0 control characters in TXT extraction
        with open(txt_path, "r", encoding="utf-8") as f:
            txt = f.read()
        ctrls = [c for c in txt if (ord(c) < 32 and c not in '\n\r\t') or ord(c) == 127]
        self.assertEqual(len(ctrls), 0, f"TXT contains {len(ctrls)} control characters: {ctrls}")

    def test_prototypes_exist(self):
        """Verifies integrated prototypes exist in static/prototypes."""
        jobaaj_proto = os.path.join(STATIC_DIR, "prototypes", "jobaaj-saas-dashboard.html")
        irctc_proto = os.path.join(STATIC_DIR, "prototypes", "irctc-checkout.html")
        win_proto = os.path.join(STATIC_DIR, "prototypes", "windows11", "index.html")

        self.assertTrue(os.path.isfile(jobaaj_proto), "Jobaaj prototype missing")
        self.assertTrue(os.path.isfile(irctc_proto), "IRCTC prototype missing")
        self.assertTrue(os.path.isfile(win_proto), "Windows 11 prototype missing")

    def test_zero_unverified_claims_in_templates(self):
        """Audits all templates and evidence cards to ensure CSPO, Scrum Alliance, or 35/35 claims do not exist."""
        forbidden_patterns = [
            re.compile(r"\bCSPO\b"),
            re.compile(r"Scrum\s+Alliance", re.IGNORECASE),
            re.compile(r"Senior\s+Engineer\s+&\s+Product", re.IGNORECASE),
            re.compile(r"Product\s+Manager\s+@\s+Nokia", re.IGNORECASE),
            re.compile(r"reduced\s+TAT\s+by\s+35%", re.IGNORECASE),
            re.compile(r"asim-kumar-kh512", re.IGNORECASE)
        ]

        for root, _, files in os.walk(TEMPLATES_DIR):
            for file in files:
                if file.endswith(".html"):
                    filepath = os.path.join(root, file)
                    with open(filepath, "r", encoding="utf-8") as f:
                        content = f.read()
                    for pattern in forbidden_patterns:
                        match = pattern.search(content)
                        self.assertIsNone(
                            match,
                            f"Forbidden pattern '{pattern.pattern}' found in {filepath}: {match.group(0) if match else ''}"
                        )

        # Audit app.py evidence cards for 35/35
        from app import EVIDENCE_CARDS
        for card in EVIDENCE_CARDS:
            title = card.get("title", "")
            body = card.get("body", "")
            self.assertNotIn("35/35", title, f"Unsupported 35/35 claim in card title: {title}")
            self.assertNotIn("35/35", body, f"Unsupported 35/35 claim in card body: {title}")

    def test_ats_resume_contains_core_credentials(self):
        """Verifies the exported ATS resume text contains confirmed certifications and accurate title."""
        txt_path = os.path.join(DOCS_DIR, "Asim_Kumar_PM_Resume_text.txt")
        with open(txt_path, "r", encoding="utf-8") as f:
            text = f.read()

        self.assertIn("ASIM KUMAR", text)
        self.assertIn("Technical Product Manager Candidate", text)
        self.assertIn("Nokia Solutions and Networks India Pvt Ltd", text)
        self.assertIn("IIM Tiruchirappalli", text)
        self.assertIn("F607C4712D38", text)
        self.assertIn("ReviewFlow", text)
        self.assertIn("Unrot", text)
        self.assertIn("Experiment Tracker", text)
        self.assertNotIn("CSPO", text)


if __name__ == "__main__":
    unittest.main()
