"""
Automated Test Suite for Static Portfolio Export (dist/)
Validates route file existence, page content, evidence-card integrity,
static assets, prototype resources, and internal link validity.
"""
import os
import re
import unittest

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DIST_DIR = os.path.join(BASE_DIR, "dist")
STATIC_DIR = os.path.join(DIST_DIR, "static")

# Import route inventory and evidence cards
import sys
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)
from app import app, EVIDENCE_CARDS
from scripts.build_static import build_static


class TestStaticExport(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # If dist doesn't exist or is empty, run build_static once
        if not os.path.exists(DIST_DIR) or not os.listdir(DIST_DIR):
            build_static()

    def test_all_26_html_routes_exported(self):
        """Verifies that all 26 HTML page routes have a corresponding index.html in dist/."""
        routes = [r.rule for r in app.url_map.iter_rules() if r.endpoint != "static" and "GET" in r.methods]
        html_routes = [r for r in routes if r != "/resume/download/"]
        self.assertEqual(len(html_routes), 26, f"Expected 26 HTML routes, got {len(html_routes)}")

        for route in html_routes:
            with self.subTest(route=route):
                clean = route.strip("/")
                if clean == "":
                    expected_path = os.path.join(DIST_DIR, "index.html")
                else:
                    expected_path = os.path.join(DIST_DIR, clean, "index.html")

                self.assertTrue(
                    os.path.isfile(expected_path),
                    f"Exported file missing for route '{route}' at {expected_path}"
                )
                self.assertGreater(
                    os.path.getsize(expected_path),
                    500,
                    f"Exported file for route '{route}' is suspiciously small ({os.path.getsize(expected_path)} bytes)"
                )

    def test_page_identifying_content(self):
        """Checks key text and metadata across essential pages."""
        # Homepage
        home_path = os.path.join(DIST_DIR, "index.html")
        with open(home_path, "r", encoding="utf-8") as f:
            home_html = f.read()
        self.assertIn("Asim Kumar", home_html)
        self.assertIn("Technical Product Manager", home_html)
        self.assertIn("The Product Decision Loop", home_html)

        # Work Hub
        work_path = os.path.join(DIST_DIR, "work", "index.html")
        with open(work_path, "r", encoding="utf-8") as f:
            work_html = f.read()
        self.assertIn("Selected Work", work_html)
        self.assertIn("Proof of Work", work_html)

        # Resume page
        resume_path = os.path.join(DIST_DIR, "resume", "index.html")
        with open(resume_path, "r", encoding="utf-8") as f:
            resume_html = f.read()
        self.assertIn("Professional Summary", resume_html)
        self.assertIn("Professional Experience", resume_html)

        # Contact page
        contact_path = os.path.join(DIST_DIR, "contact", "index.html")
        with open(contact_path, "r", encoding="utf-8") as f:
            contact_html = f.read()
        self.assertIn("asimkumar613@gmail.com", contact_html)
        self.assertIn("Let's talk about a specific problem.", contact_html)

        # How I Work
        how_path = os.path.join(DIST_DIR, "how-i-work", "index.html")
        with open(how_path, "r", encoding="utf-8") as f:
            how_html = f.read()
        self.assertIn("How I Work", how_html)

    def test_evidence_card_registry_integrity(self):
        """Verifies that all 15 evidence cards are properly rendered into dist/work/index.html."""
        import html
        self.assertEqual(len(EVIDENCE_CARDS), 15)

        work_html_path = os.path.join(DIST_DIR, "work", "index.html")
        with open(work_html_path, "r", encoding="utf-8") as f:
            raw_content = f.read()
        content = html.unescape(raw_content)
        for card in EVIDENCE_CARDS:
            title = card["title"]
            self.assertIn(
                title,
                content,
                f"Evidence card '{title}' missing from work/index.html"
            )

        # Also verify homepage renders the curated 6-artifact preview and dynamic total counter
        home_html_path = os.path.join(DIST_DIR, "index.html")
        with open(home_html_path, "r", encoding="utf-8") as f:
            home_content = f.read()
        self.assertIn("Six curated thematic artifacts", home_content)
        self.assertIn("Don't take my word for it.", home_content)

    def test_resume_download_routing(self):
        """Verifies that the physical PDF asset exists, has the %PDF header, and vercel.json rewrites /resume/download/ to it without filesystem collision."""
        import json

        # 1. Physical PDF in static assets
        pdf_path = os.path.join(STATIC_DIR, "assets", "resume", "Asim-Kumar-Resume.pdf")
        self.assertTrue(os.path.isfile(pdf_path), "Physical PDF missing in dist/static")
        with open(pdf_path, "rb") as f:
            header = f.read(4)
        self.assertEqual(header, b"%PDF", "Physical PDF in dist/ does not have %PDF header")
        self.assertEqual(os.path.getsize(pdf_path), 9005, "Physical PDF size mismatch")

        # 2. Confirm dist/resume/download/index.html does NOT exist to prevent Vercel filesystem shadowing
        shadow_file = os.path.join(DIST_DIR, "resume", "download", "index.html")
        self.assertFalse(
            os.path.exists(shadow_file),
            f"Found shadowing static file at {shadow_file}. It must not exist so Vercel executes the rewrite to the PDF."
        )

        # 3. Confirm vercel.json defines rewrites and Content-Disposition header
        vercel_json_path = os.path.join(BASE_DIR, "vercel.json")
        self.assertTrue(os.path.isfile(vercel_json_path), "vercel.json missing")
        with open(vercel_json_path, "r", encoding="utf-8") as f:
            vcfg = json.load(f)

        rewrites = vcfg.get("rewrites", [])
        rewrite_sources = {r.get("source"): r.get("destination") for r in rewrites}
        self.assertIn("/resume/download/", rewrite_sources)
        self.assertEqual(rewrite_sources["/resume/download/"], "/static/assets/resume/Asim-Kumar-Resume.pdf")

        headers = vcfg.get("headers", [])
        header_sources = {h.get("source"): {item["key"]: item["value"] for item in h.get("headers", [])} for h in headers}
        self.assertIn("/resume/download/", header_sources)
        self.assertIn("Content-Disposition", header_sources["/resume/download/"])
        self.assertIn('attachment; filename="Asim-Kumar-Resume.pdf"', header_sources["/resume/download/"]["Content-Disposition"])

    def test_standalone_prototypes_and_assets_exist(self):
        """Confirms standalone prototypes, images, and teardown markdown exist in dist/."""
        expected_files = [
            os.path.join(STATIC_DIR, "prototypes", "windows11", "index.html"),
            os.path.join(STATIC_DIR, "prototypes", "windows11", "app.js"),
            os.path.join(STATIC_DIR, "prototypes", "windows11", "style.css"),
            os.path.join(STATIC_DIR, "prototypes", "windows11", "product_teardown.md"),
            os.path.join(STATIC_DIR, "prototypes", "irctc-checkout.html"),
            os.path.join(STATIC_DIR, "prototypes", "jobaaj-saas-dashboard.html"),
            os.path.join(STATIC_DIR, "assets", "images", "profile.jpg"),
            os.path.join(STATIC_DIR, "img", "favicon.svg"),
            os.path.join(STATIC_DIR, "css", "pages.css"),
            os.path.join(STATIC_DIR, "css", "components.css"),
            os.path.join(STATIC_DIR, "js", "windows-taskflow-live.js"),
            os.path.join(STATIC_DIR, "js", "irctc-live.js"),
            os.path.join(STATIC_DIR, "js", "theme.js"),
        ]

        for filepath in expected_files:
            with self.subTest(file=os.path.basename(filepath)):
                self.assertTrue(
                    os.path.isfile(filepath),
                    f"Required prototype/asset file missing at: {filepath}"
                )
                self.assertGreater(
                    os.path.getsize(filepath),
                    0,
                    f"Required file is empty: {filepath}"
                )

    def test_internal_links_and_assets_validity(self):
        """Scans all exported HTML files in dist/ and verifies referenced local CSS, JS, and page links exist."""
        html_files = []
        for root, _, files in os.walk(DIST_DIR):
            for file in files:
                if file.endswith(".html"):
                    html_files.append(os.path.join(root, file))

        for html_file in html_files:
            with open(html_file, "r", encoding="utf-8") as f:
                content = f.read()

            # Find all local stylesheet and script references: /static/...
            static_refs = re.findall(r'(?:href|src)=["\'](/static/[^"\']+)["\']', content)
            for ref in static_refs:
                # Remove query strings or hash fragments
                clean_ref = ref.split("?")[0].split("#")[0]
                target_path = os.path.join(DIST_DIR, clean_ref.lstrip("/"))
                self.assertTrue(
                    os.path.exists(target_path),
                    f"In {os.path.relpath(html_file, DIST_DIR)}: static reference '{ref}' not found at {target_path}"
                )

            # Find all internal page navigation links: href="/..."
            page_refs = re.findall(r'href=["\'](/[^"\'#:]*)["\']', content)
            for ref in page_refs:
                # Strip query parameters or hash fragments
                clean_ref = ref.split("?")[0].split("#")[0].strip("/")
                if clean_ref == "":
                    target = os.path.join(DIST_DIR, "index.html")
                elif clean_ref == "resume/download":
                    target = os.path.join(DIST_DIR, "static", "assets", "resume", "Asim-Kumar-Resume.pdf")
                elif clean_ref.startswith("static"):
                    target = os.path.join(DIST_DIR, clean_ref)
                else:
                    target = os.path.join(DIST_DIR, clean_ref, "index.html")

                self.assertTrue(
                    os.path.exists(target),
                    f"In {os.path.relpath(html_file, DIST_DIR)}: internal link '{ref}' leads to missing file {target}"
                )


if __name__ == "__main__":
    unittest.main()
