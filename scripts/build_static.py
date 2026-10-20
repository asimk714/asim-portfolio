#!/usr/bin/env python3
"""
Static Export Builder for Asim Kumar's Portfolio
Pre-renders all Flask/Jinja routes to a clean, URL-preserving static site in dist/.
Copies all static assets, preserves standalone prototypes, and provides an accessible
download fallback for /resume/download/.
"""
import os
import sys
import shutil

# Add project root to sys.path
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from app import app, EVIDENCE_CARDS

DIST_DIR = os.path.join(BASE_DIR, "dist")
STATIC_SRC = os.path.join(BASE_DIR, "static")
DIST_STATIC = os.path.join(DIST_DIR, "static")


def build_static():
    print("=" * 60)
    print("Asim Kumar Portfolio — Static Export Builder")
    print("=" * 60)

    # 1. Clean and initialize dist/
    if os.path.exists(DIST_DIR):
        print(f"Cleaning existing dist directory: {DIST_DIR}")
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR, exist_ok=True)

    # 2. Configure Flask test client
    app.config["TESTING"] = True
    client = app.test_client()

    # 3. Discover all registered non-static routes
    routes = []
    for rule in app.url_map.iter_rules():
        if rule.endpoint == "static":
            continue
        # Only handle GET endpoints
        if "GET" in rule.methods:
            routes.append(rule.rule)

    routes = sorted(list(set(routes)))
    print(f"Discovered {len(routes)} routes in app.py")

    exported_pages = []
    failed_routes = []

    # 4. Render and export each route
    for route in routes:
        if route == "/resume/download/":
            # Résumé download route:
            # We deliberately do NOT create dist/resume/download/index.html so that Vercel's
            # filesystem check does not shadow the rewrite. Vercel rewrites /resume/download/
            # directly to /static/assets/resume/Asim-Kumar-Resume.pdf with Content-Disposition headers.
            exported_pages.append((route, "routed_via_rewrite", 9005))
            print(f"  [OK] {route:<42} -> vercel.json rewrite -> Asim-Kumar-Resume.pdf (attachment)")
            continue

        response = client.get(route)
        if response.status_code != 200:
            print(f"  [FAIL] {route:<40} HTTP {response.status_code}")
            failed_routes.append((route, response.status_code))
            continue

        html_data = response.data.decode("utf-8")

        # Determine target file path
        clean_route = route.strip("/")
        if clean_route == "":
            out_dir = DIST_DIR
        else:
            out_dir = os.path.join(DIST_DIR, clean_route)
        os.makedirs(out_dir, exist_ok=True)
        out_file = os.path.join(out_dir, "index.html")

        with open(out_file, "w", encoding="utf-8") as f:
            f.write(html_data)

        exported_pages.append((route, out_file, len(html_data)))
        print(f"  [OK] {route:<42} -> {os.path.relpath(out_file, BASE_DIR)} ({len(html_data)} bytes)")

    if failed_routes:
        print(f"\nERROR: {len(failed_routes)} routes failed to render:")
        for r, code in failed_routes:
            print(f"  - {r}: HTTP {code}")
        sys.exit(1)

    # 5. Copy static/ assets directory
    print(f"\nCopying static assets from {STATIC_SRC} to {DIST_STATIC}...")
    shutil.copytree(STATIC_SRC, DIST_STATIC, dirs_exist_ok=True)

    # Verify critical static assets exist in dist/
    critical_assets = [
        os.path.join(DIST_STATIC, "assets", "resume", "Asim-Kumar-Resume.pdf"),
        os.path.join(DIST_STATIC, "assets", "images", "profile.jpg"),
        os.path.join(DIST_STATIC, "img", "favicon.svg"),
        os.path.join(DIST_STATIC, "prototypes", "windows11", "index.html"),
        os.path.join(DIST_STATIC, "prototypes", "windows11", "product_teardown.md"),
        os.path.join(DIST_STATIC, "prototypes", "irctc-checkout.html"),
        os.path.join(DIST_STATIC, "prototypes", "jobaaj-saas-dashboard.html"),
        os.path.join(DIST_STATIC, "css", "pages.css"),
        os.path.join(DIST_STATIC, "js", "windows-taskflow-live.js"),
        os.path.join(DIST_STATIC, "js", "irctc-live.js"),
    ]

    missing_assets = [p for p in critical_assets if not os.path.exists(p)]
    if missing_assets:
        print("\nERROR: Critical static assets missing in dist:")
        for p in missing_assets:
            print(f"  - {p}")
        sys.exit(1)

    # 6. Verify resume PDF integrity in dist/
    pdf_path = os.path.join(DIST_STATIC, "assets", "resume", "Asim-Kumar-Resume.pdf")
    with open(pdf_path, "rb") as f:
        pdf_header = f.read(4)
        pdf_size = os.path.getsize(pdf_path)
    if pdf_header != b"%PDF":
        print(f"\nERROR: {pdf_path} does not begin with %PDF signature!")
        sys.exit(1)

    # 7. Summary
    total_files = sum(len(files) for _, _, files in os.walk(DIST_DIR))
    print("\n" + "=" * 60)
    print("Static Build Summary:")
    print(f"  - Total Routes Exported: {len(exported_pages)}")
    print(f"  - Total Files in dist/:  {total_files}")
    print(f"  - Résumé PDF Size:       {pdf_size} bytes (header: {pdf_header.decode()})")
    print(f"  - Destination:           {DIST_DIR}")
    print("Build completed successfully.")
    print("=" * 60)


if __name__ == "__main__":
    build_static()
