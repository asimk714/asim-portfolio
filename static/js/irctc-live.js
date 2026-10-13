/**
 * IRCTC — Peak-Hour Checkout Redesign Prototype (Phase 9 live experience)
 *
 * Portfolio-side interactive demonstration of the IRCTC checkout UX
 * teardown concept. Illustrative data; not a deployed feature.
 *
 * Source: /data/data/com.termux/files/home/old-portfolio/irctc-checkout-prototype.html
 * Case study: /work/irctc/
 *
 * Template IDs (from irctc-live.html):
 *   irctc-btn-toggle-current, irctc-btn-toggle-redesign
 *   irctc-metric-latency-val, irctc-metric-latency-change, irctc-metric-latency-desc
 *   irctc-metric-success-val, irctc-metric-success-change, irctc-metric-success-desc
 *   irctc-feature-list, irctc-booking-status
 *   irctc-step-indicator, irctc-progress-fill
 *   irctc-screen-current, irctc-screen-redesign
 *   irctc-ad-1, irctc-ad-2
 *   irctc-btn-autofill, irctc-passenger-form, irctc-btn-checkout
 *   irctc-waiting-queue, irctc-queue-position, irctc-queue-bar, irctc-queue-percent
 *   irctc-success-screen, irctc-btn-reset, irctc-shift-toast
 */
(function () {
  'use strict';

  // ── DOM refs ──────────────────────────────────────────────────────
  var btnToggleCurrent = document.getElementById('irctc-btn-toggle-current');
  var btnToggleRedesign = document.getElementById('irctc-btn-toggle-redesign');
  var mLatencyVal = document.getElementById('irctc-metric-latency-val');
  var mLatencyChange = document.getElementById('irctc-metric-latency-change');
  var mLatencyDesc = document.getElementById('irctc-metric-latency-desc');
  var mSuccessVal = document.getElementById('irctc-metric-success-val');
  var mSuccessChange = document.getElementById('irctc-metric-success-change');
  var mSuccessDesc = document.getElementById('irctc-metric-success-desc');
  var featureList = document.getElementById('irctc-feature-list');
  var bookingStatus = document.getElementById('irctc-booking-status');
  var stepIndicator = document.getElementById('irctc-step-indicator');
  var progressFill = document.getElementById('irctc-progress-fill');
  var screenCurrent = document.getElementById('irctc-screen-current');
  var screenRedesign = document.getElementById('irctc-screen-redesign');
  var ad1 = document.getElementById('irctc-ad-1');
  var ad2 = document.getElementById('irctc-ad-2');
  var autofillBtn = document.getElementById('irctc-btn-autofill');
  var checkoutBtn = document.getElementById('irctc-btn-checkout');
  var waitingQueue = document.getElementById('irctc-waiting-queue');
  var queuePositionEl = document.getElementById('irctc-queue-position');
  var queueBar = document.getElementById('irctc-queue-bar');
  var queuePercentEl = document.getElementById('irctc-queue-percent');
  var successScreen = document.getElementById('irctc-success-screen');
  var resetBtn = document.getElementById('irctc-btn-reset');
  var shiftToast = document.getElementById('irctc-shift-toast');

  // ── State ─────────────────────────────────────────────────────────
  var currentMode = 'current'; // 'current' | 'redesign'
  var isAutofilled = false;
  var queueTimer = null;
  var shiftTimer = null;
  var queuePosition = 0;

  // ── Metrics data (concept figures from source prototype) ──────────
  var metrics = {
    current: {
      latency: { value: '980ms', change: 'Slow', cls: 'negative',
        desc: 'Heavy script files (ad trackers, analytics bundles) load during the transaction, slowing checkout responses.' },
      success: { value: '77.4%', change: 'Leaky', cls: 'negative',
        desc: 'Frequent time-out errors, layout shifts leading to invalid taps, and session expiry cause user drop-off.' }
    },
    redesign: {
      latency: { value: '420ms', change: 'Improved', cls: 'positive',
        desc: 'Non-essential scripts frozen during peak-hour booking windows, reducing checkout latency. Concept figure — not measured outcome.' },
      success: { value: '91.2%', change: 'Improved', cls: 'positive',
        desc: 'Reduced layout shifts and session drop-off from script freeze + autofill. Concept figure — not measured outcome.' }
    }
  };

  // ── Feature callouts ──────────────────────────────────────────────
  var features = [
    { tier: 'P0', title: 'Smart Passenger Autofill',
      body: 'Suggests and auto-populates frequent traveler profiles dynamically based on historical bookings. Removes the need to manually type fields during high-stakes Tatkal windows.' },
    { tier: 'P0', title: 'Peak-Hour Ad-Free Script Freeze',
      body: 'Automatically freezes non-essential Google AdMob and tracking scripts between 10:00–11:15 AM. Eliminates visual shifts and layout displacement.' },
    { tier: 'P1', title: 'Client-Side Virtual Waiting Queue',
      body: 'Instead of crashing or dropping connections, user requests are routed to a client-side queue. Displays transparent live progress status to lower booking anxiety.' }
  ];

  // ── Render feature list ───────────────────────────────────────────
  function renderFeatureList() {
    if (!featureList) return;
    featureList.innerHTML = '';
    features.forEach(function (f) {
      var item = document.createElement('div');
      item.className = 'feature-item';
      var tierClass = f.tier === 'P0' ? 'p0' : 'p1';
      item.innerHTML =
        '<div class="feature-icon ' + tierClass + '">' + f.tier + '</div>' +
        '<div class="feature-text">' +
          '<h4>' + f.title + '</h4>' +
          '<p>' + f.body + '</p>' +
        '</div>';
      featureList.appendChild(item);
    });
  }

  // ── Update metrics ────────────────────────────────────────────────
  function applyMetrics(mode) {
    var m = metrics[mode];
    if (mLatencyVal) {
      mLatencyVal.textContent = m.latency.value;
      mLatencyVal.className = 'metric-value ' + (mode === 'current' ? 'metric-red' : 'metric-green');
    }
    if (mLatencyChange) {
      mLatencyChange.textContent = m.latency.change;
      mLatencyChange.className = 'metric-change ' + (mode === 'current' ? 'metric-negative' : 'metric-positive');
    }
    if (mLatencyDesc) mLatencyDesc.textContent = m.latency.desc;
    if (mSuccessVal) {
      mSuccessVal.textContent = m.success.value;
      mSuccessVal.className = 'metric-value ' + (mode === 'current' ? 'metric-red' : 'metric-green');
    }
    if (mSuccessChange) {
      mSuccessChange.textContent = m.success.change;
      mSuccessChange.className = 'metric-change ' + (mode === 'current' ? 'metric-negative' : 'metric-positive');
    }
    if (mSuccessDesc) mSuccessDesc.textContent = m.success.desc;
  }

  // ── Screen management ─────────────────────────────────────────────
  function renderScreen(mode) {
    // Reset both screens
    if (screenCurrent) screenCurrent.style.display = 'none';
    if (screenRedesign) screenRedesign.style.display = 'none';

    // Show active screen
    if (mode === 'current' && screenCurrent) {
      screenCurrent.style.display = 'block';
    } else if (mode === 'redesign' && screenRedesign) {
      screenRedesign.style.display = 'block';
    }

    // Step indicator — redesign only
    if (stepIndicator) {
      stepIndicator.style.display = mode === 'redesign' ? 'flex' : 'none';
      if (mode === 'redesign' && progressFill) {
        progressFill.style.width = '0%';
      }
    }

    // Reset overlays
    if (waitingQueue) waitingQueue.style.display = 'none';
    if (successScreen) successScreen.style.display = 'none';
    if (queueTimer) { clearInterval(queueTimer); queueTimer = null; }

    // Reset autofill state
    isAutofilled = false;
    if (bookingStatus) {
      bookingStatus.textContent = mode === 'current'
        ? 'Legacy checkout — session timeout fail on attempt.'
        : 'Redesign checkout ready — use Quick Autofill, then Checkout.';
    }

    // Reset ad banners
    stopAdSimulation();
    if (mode === 'current') startAdSimulation();
  }

  // ── Ad layout shift simulation ────────────────────────────────────
  function stopAdSimulation() {
    if (shiftTimer) { clearInterval(shiftTimer); shiftTimer = null; }
    if (shiftToast) {
      shiftToast.style.display = 'none';
      shiftToast.style.opacity = '0';
    }
    if (ad1) ad1.style.display = '';
    if (ad2) ad2.style.height = '';
  }

  function startAdSimulation() {
    stopAdSimulation();
    if (!shiftToast || !ad1 || !ad2) return;
    shiftToast.style.display = 'block';
    shiftTimer = setInterval(function () {
      var r = Math.random();
      if (r < 0.4) {
        ad1.style.display = ad1.style.display === 'none' ? '' : 'none';
      } else if (r < 0.8) {
        ad2.style.height = ad2.style.height === '60px' ? '90px' : '60px';
      }
      shiftToast.style.opacity = '1';
      setTimeout(function () { shiftToast.style.opacity = '0'; }, 1200);
    }, 3500);
  }

  // ── Mode toggle ───────────────────────────────────────────────────
  function setMode(mode) {
    if (mode !== 'current' && mode !== 'redesign') return;
    currentMode = mode;
    renderScreen(mode);
    applyMetrics(mode);
  }

  if (btnToggleCurrent) {
    btnToggleCurrent.addEventListener('click', function () { setMode('current'); });
  }
  if (btnToggleRedesign) {
    btnToggleRedesign.addEventListener('click', function () { setMode('redesign'); });
  }

  // ── Quick Autofill ────────────────────────────────────────────────
  if (autofillBtn) {
    autofillBtn.addEventListener('click', function () {
      if (currentMode !== 'redesign') return;
      isAutofilled = true;
      if (checkoutBtn) checkoutBtn.disabled = false;
      if (bookingStatus) bookingStatus.textContent = 'Passenger details autofilled — ready for checkout.';
      if (screenCurrent) screenCurrent.style.borderColor = '';
      if (screenRedesign) screenRedesign.style.borderColor = 'var(--success)';
    });
  }

  // ── Checkout ──────────────────────────────────────────────────────
  // Legacy checkout button is inside screen-current content
  function attachLegacyCheckout() {
    if (!screenCurrent) return;
    var legacyBtn = screenCurrent.querySelector('button:not(.screen-btn)');
    // Also check for any button with "Pay & Book" or "Continue to Payment"
    var allBtns = screenCurrent.querySelectorAll('button');
    allBtns.forEach(function (btn) {
      var txt = btn.textContent.trim();
      if (txt === 'Pay & Book' || txt === 'Continue to Payment') {
        btn.onclick = function () {
          alert('❌ Booking Failed (Session Timeout)\nSimulated legacy behavior: system experienced high concurrency load at the gateway during transaction processing. Captcha validation timed out after 60 seconds.');
        };
      }
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', function () {
      if (currentMode === 'current') {
        alert('❌ Booking Failed (Session Timeout)\nSimulated legacy behavior: system experienced high concurrency load at the gateway during transaction processing. Captcha validation timed out after 60 seconds.');
        return;
      }
      if (!isAutofilled) {
        alert('Please select Quick Autofill and confirm the passenger profile before checkout.');
        return;
      }
      if (queueTimer) { clearInterval(queueTimer); queueTimer = null; }
      if (waitingQueue) waitingQueue.style.display = 'flex';
      queuePosition = 284;
      if (queuePositionEl) queuePositionEl.textContent = queuePosition;
      if (queuePercentEl) queuePercentEl.textContent = '0%';
      if (queueBar) queueBar.style.width = '0%';
      if (bookingStatus) bookingStatus.textContent = 'Virtual waiting queue — position ' + queuePosition + '.';

      queueTimer = setInterval(function () {
        queuePosition -= Math.floor(Math.random() * 80) + 20;
        if (queuePosition <= 0) {
          queuePosition = 0;
          clearInterval(queueTimer);
          queueTimer = null;
          if (queuePositionEl) queuePositionEl.textContent = '0';
          if (queuePercentEl) queuePercentEl.textContent = '100%';
          if (queueBar) queueBar.style.width = '100%';
          if (bookingStatus) bookingStatus.textContent = 'Queue complete — proceeding to booking confirmation.';
          setTimeout(function () {
            if (waitingQueue) waitingQueue.style.display = 'none';
            if (successScreen) successScreen.style.display = 'flex';
          }, 400);
        } else {
          if (queuePositionEl) queuePositionEl.textContent = queuePosition;
          var pct = Math.min(100, Math.round((284 - queuePosition) / 284 * 100));
          if (queuePercentEl) queuePercentEl.textContent = pct + '%';
          if (queueBar) queueBar.style.width = pct + '%';
          if (bookingStatus) bookingStatus.textContent = 'Virtual waiting queue — position ' + queuePosition + '.';
        }
      }, 700);
    });
  }

  // ── Reset ────────────────────────────────────────────────────────
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (queueTimer) { clearInterval(queueTimer); queueTimer = null; }
      if (waitingQueue) waitingQueue.style.display = 'none';
      if (successScreen) successScreen.style.display = 'none';
      isAutofilled = false;
      currentMode = 'redesign';
      renderScreen('redesign');
      applyMetrics('redesign');
      if (bookingStatus) bookingStatus.textContent = 'Redesign checkout ready — use Quick Autofill, then Checkout.';
    });
  }

  // ── Initial render ────────────────────────────────────────────────
  renderFeatureList();
  attachLegacyCheckout();
  renderScreen('current');
  applyMetrics('current');
})();
