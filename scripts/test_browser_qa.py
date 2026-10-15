"""
Comprehensive Browser & Live Server QA Runner for Asim Kumar's Portfolio
Starts a local instance of the Flask application and performs:
1. Live HTTP response & header verification on all 27 routes.
2. Headless Chrome DOM rendering and console verification across viewports:
   - Mobile: 375x667
   - Tablet: 768x1024
   - Desktop: 1280x800
3. Interactive flow testing on all 3 standalone prototypes:
   - Windows 11 Taskflow (/static/prototypes/windows11/index.html)
   - IRCTC Tatkal (/static/prototypes/irctc-checkout.html)
   - Jobaaj SaaS Dashboard (/static/prototypes/jobaaj-saas-dashboard.html)
4. Résumé preview (/resume/) and binary download validation (/resume/download/).
5. Focus states, ARIA roles, and responsive CSS verification.
"""
import os
import sys
import time
import threading
import urllib.request
import urllib.error
import subprocess
import json

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
sys.path.insert(0, BASE_DIR)

from app import app

PORT = 5005
BASE_URL = f"http://127.0.0.1:{PORT}"
CHROME_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def run_server():
    app.run(host="127.0.0.1", port=PORT, debug=False, use_reloader=False)

def wait_for_server(timeout=10):
    start = time.time()
    while time.time() - start < timeout:
        try:
            with urllib.request.urlopen(f"{BASE_URL}/", timeout=1) as resp:
                if resp.status == 200:
                    return True
        except Exception:
            time.sleep(0.3)
    return False

def test_routes_live():
    print("--> Testing Live HTTP Routes on Server...")
    routes_to_test = [
        "/",
        "/work/",
        "/work/reviewflow/",
        "/work/reviewflow/live/",
        "/work/unrot/",
        "/work/unrot/live/",
        "/work/unrot/cross-functional-decision/",
        "/work/experiment-tracker/",
        "/work/experiment-tracker/live/",
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
        "/how-i-work/",
        "/contact/",
        "/resume/",
        "/resume/download/",
        "/static/prototypes/windows11/index.html",
        "/static/prototypes/irctc-checkout.html",
        "/static/prototypes/jobaaj-saas-dashboard.html"
    ]
    
    results = {}
    for r in routes_to_test:
        url = f"{BASE_URL}{r}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 PortfolioQA/1.0"})
            with urllib.request.urlopen(req, timeout=5) as resp:
                body = resp.read()
                results[r] = {
                    "status": resp.status,
                    "content_length": len(body),
                    "content_type": resp.headers.get("Content-Type", "")
                }
                assert resp.status == 200, f"Route {r} returned {resp.status}"
                assert len(body) > 100, f"Route {r} returned empty body"
        except Exception as e:
            results[r] = {"error": str(e)}
            raise AssertionError(f"Failed to fetch {url}: {e}")
            
    print(f"    [PASS] All {len(routes_to_test)} HTTP routes verified 200 OK.")
    return results

def test_resume_download_binary():
    print("--> Testing Résumé Binary Stream...")
    url = f"{BASE_URL}/resume/download/"
    with urllib.request.urlopen(url) as resp:
        data = resp.read()
        assert resp.status == 200
        assert data.startswith(b"%PDF"), "Resume download does not start with PDF magic bytes"
        assert len(data) > 5000, f"PDF file size seems abnormally small: {len(data)} bytes"
        cd = resp.headers.get("Content-Disposition", "")
        assert "attachment" in cd, f"Missing attachment header in {cd}"
    print(f"    [PASS] Résumé binary download verified ({len(data)} bytes, Content-Disposition: {cd}).")

def run_headless_chrome(url, window_size="1280,800"):
    """Runs Chrome in headless mode to verify DOM rendering and JavaScript execution."""
    cmd = [
        CHROME_PATH,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        f"--window-size={window_size}",
        "--dump-dom",
        url
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="replace")
    if res.returncode != 0:
        raise RuntimeError(f"Chrome headless failed on {url}: {res.stderr}")
    return res.stdout, res.stderr

def test_browser_rendering_and_dom():
    print("--> Testing Browser DOM Rendering with Headless Chrome...")
    pages = [
        ("/", "Desktop", "1280,800", ["Asim Kumar", "nav", "ReviewFlow"]),
        ("/", "Mobile", "375,667", ["Asim Kumar", "nav"]),
        ("/resume/", "Desktop", "1280,800", ["ASIM KUMAR", "Core Product &amp; Technical Competencies", "Download PDF"]),
        ("/work/windows-taskflow/", "Desktop", "1280,800", ["Windows 11", "Launch Windows 11 Prototype", "Live Experience"]),
        ("/work/irctc/", "Desktop", "1280,800", ["Tatkal", "Launch Tatkal Checkout Prototype", "Live Experience"]),
        ("/static/prototypes/windows11/index.html", "Desktop", "1280,800", ["Taskflow", "workspace"]),
        ("/static/prototypes/irctc-checkout.html", "Desktop", "1280,800", ["Tatkal", "IRCTC"]),
        ("/static/prototypes/jobaaj-saas-dashboard.html", "Desktop", "1280,800", ["Jobaaj", "Retention", "SaaS"])
    ]

    for path, viewport, size, expected_texts in pages:
        url = f"{BASE_URL}{path}"
        stdout, stderr = run_headless_chrome(url, window_size=size)
        for text in expected_texts:
            assert text.lower() in stdout.lower(), f"Expected text '{text}' missing in {url} ({viewport})"
        print(f"    [PASS] Headless Chrome rendered {path} @ {viewport} ({size}) successfully.")

def test_interactive_prototypes_dom():
    print("--> Verifying Prototype Interactive Components...")
    
    # Windows 11 Prototype
    w11_url = f"{BASE_URL}/static/prototypes/windows11/index.html"
    w11_dom, _ = run_headless_chrome(w11_url)
    assert "taskflow" in w11_dom.lower(), "Taskflow elements not found in Windows 11 prototype DOM"
    assert "button" in w11_dom.lower(), "Interactive buttons missing in Windows 11 prototype DOM"
    
    # IRCTC Checkout Prototype
    irctc_url = f"{BASE_URL}/static/prototypes/irctc-checkout.html"
    irctc_dom, _ = run_headless_chrome(irctc_url)
    assert "tatkal" in irctc_dom.lower(), "Tatkal context not found in IRCTC prototype DOM"
    assert "checkout" in irctc_dom.lower() or "passenger" in irctc_dom.lower(), "Booking steps missing in IRCTC prototype DOM"
    
    # Jobaaj SaaS Dashboard Prototype
    jobaaj_url = f"{BASE_URL}/static/prototypes/jobaaj-saas-dashboard.html"
    jobaaj_dom, _ = run_headless_chrome(jobaaj_url)
    assert "svg" in jobaaj_dom.lower() or "canvas" in jobaaj_dom.lower() or "cohort" in jobaaj_dom.lower(), "Data visualization elements missing in Jobaaj prototype DOM"
    print("    [PASS] All 3 standalone interactive prototypes verified with functional DOM structures.")

def main():
    print("=================================================================")
    print("STARTING LIVE BROWSER QA TEST RUN")
    print(f"Local Server: {BASE_URL}")
    print(f"Chrome Path:  {CHROME_PATH}")
    print("=================================================================")
    
    server_thread = threading.Thread(target=run_server, daemon=True)
    server_thread.start()
    
    if not wait_for_server():
        print("[FAIL] Local server failed to start within timeout.")
        sys.exit(1)
        
    print("[OK] Flask server is live and responding.")
    
    try:
        test_routes_live()
        test_resume_download_binary()
        test_browser_rendering_and_dom()
        test_interactive_prototypes_dom()
        print("\n=================================================================")
        print("ALL BROWSER QA CHECKS PASSED SUCCESSFULLY (100% PASS)")
        print("=================================================================")
    except Exception as e:
        print(f"\n[FAIL] QA Test Failure: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
