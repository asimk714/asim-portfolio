"""
Automated Route & Integrity Test Suite for Asim Kumar's Portfolio
Uses Flask's test_client to verify all registered routes, HTTP status codes,
resume downloads, and essential DOM elements.
"""
import os
import sys
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

import unittest
from app import app, EVIDENCE_CARDS


class TestPortfolioRoutes(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        app.config["TESTING"] = True
        cls.client = app.test_client()

    def test_homepage(self):
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"Asim Kumar", response.data)

    def test_work_hub(self):
        response = self.client.get("/work/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(EVIDENCE_CARDS), 16)

    def test_flagship_routes(self):
        routes = [
            "/work/reviewflow/",
            "/work/reviewflow/live/",
            "/work/unrot/",
            "/work/unrot/live/",
            "/work/experiment-tracker/",
            "/work/experiment-tracker/live/",
            "/work/unrot/cross-functional-decision/",
        ]
        for route in routes:
            with self.subTest(route=route):
                res = self.client.get(route)
                self.assertEqual(res.status_code, 200, f"Route {route} failed")

    def test_supporting_routes(self):
        supporting = [
            "/work/b1/",
            "/work/b1/live/",
            "/work/catalyst/",
            "/work/catalyst/live/",
            "/work/vesper/",
            "/work/vesper/live/",
            "/work/context-engine/",
            "/work/context-engine/live/",
            "/work/windows-taskflow/",
            "/work/windows-taskflow/live/",
            "/work/irctc/",
            "/work/irctc/live/",
            "/work/lodo/",
            "/work/lodo/live/",
        ]
        for route in supporting:
            with self.subTest(route=route):
                res = self.client.get(route)
                self.assertEqual(res.status_code, 200, f"Route {route} failed")

    def test_meta_and_resume_routes(self):
        routes = ["/how-i-work/", "/contact/", "/resume/"]
        for route in routes:
            with self.subTest(route=route):
                res = self.client.get(route)
                self.assertEqual(res.status_code, 200, f"Route {route} failed")

    def test_resume_download(self):
        res = self.client.get("/resume/download/")
        self.assertEqual(res.status_code, 200)
        self.assertIn("attachment", res.headers.get("Content-Disposition", ""))
        self.assertTrue(res.data.startswith(b"%PDF"), "Response is not a valid PDF")
        self.assertTrue(len(res.data) > 5000, "Downloaded PDF seems too small")

    def test_total_route_inventory(self):
        """Verifies exactly 27 routes are defined in the finalized app."""
        rule_endpoints = [r.rule for r in app.url_map.iter_rules() if r.endpoint != 'static']
        self.assertEqual(len(rule_endpoints), 27, f"Expected 27 routes, got {len(rule_endpoints)}: {rule_endpoints}")


if __name__ == "__main__":
    unittest.main()
