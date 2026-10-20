/**
 * LoDo — Reverse Auction Credit Experience (portfolio-side interactive demo)
 *
 * Demonstrates the LoDo borrower flow from the Kotlin/Android source
 * prototype at projects/project-lodo/ (Room + Jetpack Compose):
 *   New Credit Intent (3-step form) → Reverse Auction → Compare → Accept
 *
 * This is a portfolio-side WEB demonstration of the same flow.
 * It is NOT the Android app. It is NOT a real lending marketplace.
 * All lender offers, borrower data, and scheme data are ILLUSTRATIVE
 * demo data from the source prototype's seed data.
 *
 * Source audit references:
 *   Entities.kt       — CreditIntent, AuctionBid, Scheme, UserProfile
 *   LoDoRepository.kt — seed data (PL-8492, BE-1042, CGTMSE scheme)
 *   LoDoViewModel.kt  — ScreenTab enum, bid toggle, accept bid, create intent
 *   AuctionsScreen.kt — countdown timer, bid list, compare bar
 *   ComparisonScreen.kt — normalized cost rows, accept offer
 *   NewIntentScreen.kt — 3-step form (Details → Collateral → Review)
 */
(function () {
  'use strict';

  // ── Constants ─────────────────────────────────────────────────────
  var SEED_INTENT = {
    id: 'PL-8492',
    title: 'Personal Loan',
    purpose: 'Home Renovation',
    requestedAmount: 500000,
    currencySymbol: '₹',
    status: 'Active Auction',
    bestOfferApr: 10.5,
    lendersCount: 3,
    tenureMonths: 60,
    creditScoreRange: '720 - 749',
    description: 'Kitchen renovation for home-based catering setup',
    timeRemainingSeconds: 9808
  };

  var SEED_BIDS = [
    {
      id: 'bid-c1', lenderName: 'Capital One', lenderLogoCode: 'C1',
      apr: 6.45, monthlyPayment: 879.32, totalInterest: 7759.20,
      processingFees: '₹225 (0.5%)', upfrontCosts: '₹225',
      totalRepayment: 52759.20, tag: 'Current Best', isAccepted: false
    },
    {
      id: 'bid-sf', lenderName: 'SoFi', lenderLogoCode: 'SF',
      apr: 6.99, monthlyPayment: 890.66, totalInterest: 8439.60,
      processingFees: '₹150 (0.3%)', upfrontCosts: '₹150',
      totalRepayment: 53439.60, tag: 'Standard Terms', isAccepted: false
    },
    {
      id: 'bid-wf', lenderName: 'Wells Fargo', lenderLogoCode: 'WF',
      apr: 7.25, monthlyPayment: 896.16, totalInterest: 8769.60,
      processingFees: '₹0 (Waived)', upfrontCosts: '₹0',
      totalRepayment: 53769.60, tag: 'Pre-qualified', isAccepted: false
    }
  ];

  var SECONDARY_BIDS = [
    {
      id: 'bid-apex', lenderName: 'Apex Financial', lenderLogoCode: 'APEX',
      apr: 6.25, monthlyPayment: 4850.32, totalInterest: 82038.40,
      processingFees: '₹2,500 (0.5%)', upfrontCosts: '₹2,500',
      totalRepayment: 582038.40, tag: 'Best Value', isAccepted: false
    },
    {
      id: 'bid-horizon', lenderName: 'Horizon Capital', lenderLogoCode: 'HORIZON',
      apr: 6.80, monthlyPayment: 5012.15, totalInterest: 101458.00,
      processingFees: '₹1,500 (0.3%)', upfrontCosts: '₹1,500',
      totalRepayment: 601458.00, tag: 'Pending Final Review', isAccepted: false
    },
    {
      id: 'bid-sentinel', lenderName: 'Sentinel Bank', lenderLogoCode: 'SENTINEL',
      apr: 7.10, monthlyPayment: 5150.80, totalInterest: 118096.00,
      processingFees: '₹0 (Waived)', upfrontCosts: '₹0',
      totalRepayment: 618096.00, tag: 'Lowest Cost', isAccepted: false
    }
  ];

  // ── State ─────────────────────────────────────────────────────────
  var state = {
    formStep: 1,
    amount: '500000',
    purpose: 'Home Renovation',
    tenure: '60',
    description: 'Kitchen renovation for home-based catering setup',
    collateral: '',
    collateralValue: '200000',
    currentIntent: null,
    bids: [],
    selectedBidIds: {},
    timeRemaining: 9808,
    compareBids: [],
    acceptedBid: null,
    showSuccess: false,
    timerInterval: null
  };

  // ── Helpers ───────────────────────────────────────────────────────
  function formatINR(n) {
    return '₹' + Math.round(n).toLocaleString('en-IN');
  }

  function format2dp(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function isWinningBid(bid) {
    return bid.tag === 'Current Best' || bid.tag === 'Best Value';
  }

  function isLowestCostBid(bid) {
    return bid.tag === 'Lowest Cost';
  }

  function isBestValueBid(bid) {
    return bid.tag === 'Best Value' || bid.tag === 'Current Best';
  }

  function pad2(n) {
    return String(n).padStart(2, '0');
  }

  function formatTime(secs) {
    var h = Math.floor(secs / 3600);
    var m = Math.floor((secs % 3600) / 60);
    var s = secs % 60;
    return pad2(h) + ':' + pad2(m) + ':' + pad2(s);
  }

  // ── DOM refs ──────────────────────────────────────────────────────
  var $ = function (id) { return document.getElementById(id); };

  var dom = {
    // Form inputs
    amountInput: $('lodo-amount'),
    purposeSelect: $('lodo-purpose'),
    tenureInput: $('lodo-tenure'),
    descInput: $('lodo-description'),
    collateralSelect: $('lodo-collateral'),
    collateralValueInput: $('lodo-collateral-value'),
    // Form step buttons
    nextBtn: $('lodo-next-btn'),
    backBtn1: $('lodo-back-btn-1'),
    nextBtn1: $('lodo-next-btn-1'),
    backBtn2: $('lodo-back-btn-2'),
    createBtn: $('lodo-create-btn'),
    // Review display
    reviewAmount: $('lodo-review-amount'),
    reviewPurpose: $('lodo-review-purpose'),
    reviewTenure: $('lodo-review-tenure'),
    reviewCollateral: $('lodo-review-collateral'),
    reviewDesc: $('lodo-review-desc'),
    // Screens
    screen1: $('lodo-screen-1'),
    screen2: $('lodo-screen-2'),
    screen3: $('lodo-screen-3'),
    screen4: $('lodo-screen-4'),
    // Auction
    auctionBackBtn: $('lodo-auction-back-btn'),
    timer: $('lodo-timer'),
    auctionTitle: $('lodo-auction-title'),
    auctionPurpose: $('lodo-auction-purpose'),
    auctionTenure: $('lodo-auction-tenure'),
    bidsList: $('lodo-bids-list'),
    auctionEmpty: $('lodo-auction-empty'),
    compareBtn: $('lodo-auction-to-compare-btn'),
    // Compare
    compareBackBtn: $('lodo-compare-back-btn'),
    compareList: $('lodo-comparison-list'),
    compareEmpty: $('lodo-comparison-empty'),
    compareBackToAuctionBtn: $('lodo-compare-back-to-auction-btn'),
    // Success
    acceptedDetail: $('lodo-accepted-detail'),
    restartBtn: $('lodo-restart-btn'),
    // Steps
    steps: document.querySelectorAll('.lodo-step'),
    // Form card parts
    formCard: document.querySelector('.lodo-form-card'),
    formBody: document.querySelector('.lodo-form-card .lodo-form-body'),
    formActions: document.querySelector('.lodo-form-card .lodo-form-actions'),
    collateralScreen: $('lodo-collateral-screen'),
    reviewScreen: $('lodo-review-screen'),
    // Screen 1 containers
    screen1Containers: document.querySelectorAll('#lodo-screen-1 > .lodo-card')
  };

  // ── Screen visibility ─────────────────────────────────────────────
  function showScreen(num) {
    var screens = [dom.screen1, dom.screen2, dom.screen3, dom.screen4];
    screens.forEach(function (s, i) {
      if (s) {
        if (i + 1 === num) {
          s.classList.remove('lodo-screen-hidden');
        } else {
          s.classList.add('lodo-screen-hidden');
        }
      }
    });
  }

  function updateStepIndicator(currentScreen) {
    dom.steps.forEach(function (step, i) {
      var num = i + 1;
      step.classList.toggle('lodo-step--active', currentScreen >= num);
      step.classList.toggle('lodo-step--current', currentScreen === num);
    });
  }

  // ── Form step management ───────────────────────────────────────────
  function setFormStep(step) {
    state.formStep = step;

    // Toggle form body and actions in main form card
    if (dom.formBody) {
      dom.formBody.style.display = (step === 1) ? 'block' : 'none';
    }
    if (dom.formActions) {
      dom.formActions.style.display = (step === 1) ? 'flex' : 'none';
    }

    // Toggle collateral and review screens
    if (dom.collateralScreen) {
      dom.collateralScreen.classList.toggle('lodo-form-card-hidden', step !== 2);
    }
    if (dom.reviewScreen) {
      dom.reviewScreen.classList.toggle('lodo-form-card-hidden', step !== 3);
    }

    // Update review display if on step 3
    if (step === 3) {
      updateReviewDisplay();
    }

    // Update create button disabled state
    if (dom.createBtn) {
      var amt = parseInt(state.amount, 10);
      dom.createBtn.disabled = !amt || amt < 100000;
    }
  }

  function updateReviewDisplay() {
    if (!dom.reviewAmount) return;
    var amt = parseInt(state.amount, 10) || 0;
    dom.reviewAmount.textContent = '₹' + amt.toLocaleString('en-IN');
    dom.reviewPurpose.textContent = state.purpose || '—';
    dom.reviewTenure.textContent = state.tenure + ' months';
    dom.reviewCollateral.textContent = state.collateral || 'None / Unsecured';
    dom.reviewDesc.textContent = state.description || '—';
  }

  // ── Intent creation ───────────────────────────────────────────────
  function createIntent() {
    var amt = parseInt(state.amount, 10) || SEED_INTENT.requestedAmount;
    var newIntent = {
      id: SEED_INTENT.id,
      title: SEED_INTENT.title,
      purpose: state.purpose || SEED_INTENT.purpose,
      requestedAmount: amt,
      currencySymbol: SEED_INTENT.currencySymbol,
      status: SEED_INTENT.status,
      bestOfferApr: SEED_INTENT.bestOfferApr,
      lendersCount: SEED_INTENT.lendersCount,
      tenureMonths: parseInt(state.tenure, 10) || SEED_INTENT.tenureMonths,
      creditScoreRange: SEED_INTENT.creditScoreRange,
      description: state.description || SEED_INTENT.description,
      timeRemainingSeconds: SEED_INTENT.timeRemainingSeconds
    };

    state.currentIntent = newIntent;

    // Seed bids — use personal loan bids for personal loan purpose,
    // business expansion bids for business purposes
    if (state.purpose === 'Business Expansion' || state.purpose === 'Equipment Purchase') {
      state.bids = SECONDARY_BIDS.map(function (b) {
        return Object.assign({}, b, { intentId: newIntent.id });
      });
    } else {
      state.bids = SEED_BIDS.map(function (b) {
        return Object.assign({}, b, { intentId: newIntent.id });
      });
    }

    state.selectedBidIds = {};
    state.compareBids = [];
    state.acceptedBid = null;
    state.showSuccess = false;
    state.timeRemaining = SEED_INTENT.timeRemainingSeconds;

    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }

    showScreen(2);
    updateStepIndicator(2);
    renderAuction();
  }

  // ── Timer ─────────────────────────────────────────────────────────
  function startTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
    }
    if (!state.currentIntent) return;
    state.timerInterval = setInterval(function () {
      if (state.timeRemaining > 0) {
        state.timeRemaining--;
        updateTimerDisplay();
      } else {
        clearInterval(state.timerInterval);
        state.timerInterval = null;
      }
    }, 1000);
  }

  function stopTimer() {
    if (state.timerInterval) {
      clearInterval(state.timerInterval);
      state.timerInterval = null;
    }
  }

  function updateTimerDisplay() {
    if (dom.timer) {
      dom.timer.textContent = formatTime(state.timeRemaining);
    }
  }

  // ── Auction rendering ─────────────────────────────────────────────
  function renderAuction() {
    if (!dom.bidsList) return;

    if (state.bids.length === 0) {
      dom.bidsList.innerHTML = '';
      if (dom.auctionEmpty) dom.auctionEmpty.style.display = 'block';
    } else {
      if (dom.auctionEmpty) dom.auctionEmpty.style.display = 'none';
      dom.bidsList.innerHTML = state.bids.map(renderBidCardHTML).join('');
      // Re-bind bid card events
      state.bids.forEach(function (bid) {
        var card = dom.bidsList.querySelector('.lodo-bid-card[data-bid-id="' + bid.id + '"]');
        if (card) {
          card.addEventListener('click', function (e) {
            // Don't toggle if clicking the accept button
            if (e.target.closest('.lodo-btn')) return;
            toggleBidSelection(bid.id);
          });
        }
        var acceptBtn = dom.bidsList.querySelector('.lodo-bid-accept[data-bid-id="' + bid.id + '"]');
        if (acceptBtn) {
          acceptBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            acceptBid(bid);
          });
        }
      });
    }

    updateCompareButton();
    updateAuctionHeader();
  }

  function renderBidCardHTML(bid) {
    var winning = isWinningBid(bid);
    var selected = state.selectedBidIds[bid.id];
    return ''
      + '<div class="lodo-bid-card' + (winning ? ' lodo-bid-card--winning' : '') + (selected ? ' lodo-bid-card--selected' : '') + '" data-bid-id="' + bid.id + '">'
      + '  <div class="lodo-bid-header">'
      + '    <div class="lodo-bid-logo">' + bid.lenderLogoCode + '</div>'
      + '    <div class="lodo-bid-name-row">'
      + '      <span class="lodo-bid-name">' + bid.lenderName + '</span>'
      + '      <span class="lodo-bid-tag">' + bid.tag + '</span>'
      + '    </div>'
      + '    <div class="lodo-bid-checkbox">'
      + '      <span class="lodo-checkbox-icon' + (selected ? ' lodo-checkbox-icon--checked' : '') + '">' + (selected ? '✓' : '') + '</span>'
      + '    </div>'
      + '  </div>'
      + '  <div class="lodo-bid-metrics">'
      + '    <div class="lodo-metric"><span class="lodo-metric-label">APR</span><span class="lodo-metric-value">' + bid.apr + '%</span></div>'
      + '    <div class="lodo-metric"><span class="lodo-metric-label">Monthly</span><span class="lodo-metric-value">' + formatINR(bid.monthlyPayment) + '</span></div>'
      + '    <div class="lodo-metric"><span class="lodo-metric-label">Total Interest</span><span class="lodo-metric-value">' + formatINR(bid.totalInterest) + '</span></div>'
      + '  </div>'
      + '  <div class="lodo-bid-footer">'
      + '    <button class="lodo-btn lodo-bid-accept lodo-btn-sm ' + (bid.isAccepted ? 'lodo-btn-secondary' : 'lodo-btn-primary') + '" data-bid-id="' + bid.id + '">' + (bid.isAccepted ? 'Accepted ✓' : 'Accept Offer') + '</button>'
      + '  </div>'
      + '</div>';
  }

  function updateAuctionHeader() {
    if (!dom.auctionTitle || !dom.auctionPurpose || !dom.auctionTenure) return;
    if (state.currentIntent) {
      dom.auctionTitle.textContent = state.currentIntent.title;
      dom.auctionPurpose.textContent = state.currentIntent.purpose;
      dom.auctionTenure.textContent = state.currentIntent.tenureMonths;
    }
  }

  function updateCompareButton() {
    if (!dom.compareBtn) return;
    var count = Object.keys(state.selectedBidIds).filter(function (k) { return state.selectedBidIds[k]; }).length;
    dom.compareBtn.textContent = 'Compare Offers (' + count + ' selected)';
    dom.compareBtn.disabled = count === 0;
    dom.compareBtn.classList.toggle('lodo-btn-disabled', count === 0);
  }

  // ── Bid interaction ───────────────────────────────────────────────
  function toggleBidSelection(bidId) {
    if (state.bids.length === 0) return;
    if (state.selectedBidIds[bidId]) {
      delete state.selectedBidIds[bidId];
    } else {
      state.selectedBidIds[bidId] = true;
    }
    renderAuction();
  }

  function openComparison() {
    var count = Object.keys(state.selectedBidIds).filter(function (k) { return state.selectedBidIds[k]; }).length;
    if (count === 0) return;
    var selected = state.bids.filter(function (b) { return state.selectedBidIds[b.id]; });
    state.compareBids = selected;
    showScreen(3);
    updateStepIndicator(3);
    renderComparison();
  }

  // ── Comparison rendering ──────────────────────────────────────────
  function renderComparison() {
    if (!dom.compareList) return;
    if (state.compareBids.length === 0) {
      dom.compareList.innerHTML = '';
      if (dom.compareEmpty) dom.compareEmpty.style.display = 'block';
    } else {
      if (dom.compareEmpty) dom.compareEmpty.style.display = 'none';
      dom.compareList.innerHTML = state.compareBids.map(renderComparisonCardHTML).join('');
      // Bind accept buttons
      state.compareBids.forEach(function (bid) {
        var btn = dom.compareList.querySelector('.lodo-comp-accept[data-bid-id="' + bid.id + '"]');
        if (btn) {
          btn.addEventListener('click', function (e) {
            e.stopPropagation();
            acceptBid(bid);
          });
        }
      });
    }
  }

  function renderComparisonCardHTML(bid) {
    var bestValue = isBestValueBid(bid);
    var lowestCost = isLowestCostBid(bid);
    return ''
      + '<div class="lodo-comparison-card' + (bestValue ? ' lodo-comparison-card--best' : '') + '" data-bid-id="' + bid.id + '">'
      + '  <div class="lodo-comp-header">'
      + '    <div class="lodo-bid-logo lodo-comp-logo">' + bid.lenderLogoCode + '</div>'
      + '    <div class="lodo-comp-name-row">'
      + '      <span class="lodo-bid-name">' + bid.lenderName + '</span>'
      + '      ' + (bestValue ? '<span class="lodo-badge lodo-badge-best">BEST VALUE</span>' : '')
      + '      ' + (lowestCost ? '<span class="lodo-badge lodo-badge-lowest">LOWEST COST</span>' : '')
      + '    </div>'
      + '  </div>'
      + '  <div class="lodo-comp-metrics">'
      + '    <div class="lodo-comp-row"><span class="lodo-comp-label">APR</span><span class="lodo-comp-value">' + bid.apr + '%</span></div>'
      + '    <div class="lodo-comp-row"><span class="lodo-comp-label">Monthly Payment</span><span class="lodo-comp-value">' + formatINR(bid.monthlyPayment) + '</span></div>'
      + '    <div class="lodo-comp-row"><span class="lodo-comp-label">Total Interest</span><span class="lodo-comp-value">' + formatINR(bid.totalInterest) + '</span></div>'
      + '    <div class="lodo-comp-row"><span class="lodo-comp-label">Processing Fees</span><span class="lodo-comp-value">' + bid.processingFees + '</span></div>'
      + '    <div class="lodo-comp-row"><span class="lodo-comp-label">Upfront Costs</span><span class="lodo-comp-value">' + bid.upfrontCosts + '</span></div>'
      + '    <div class="lodo-comp-row lodo-comp-row--total"><span class="lodo-comp-label">Total Repayment</span><span class="lodo-comp-value lodo-comp-value--total">' + formatINR(bid.totalRepayment) + '</span></div>'
      + '  </div>'
      + '  <div class="lodo-comp-accept">'
      + '    <button class="lodo-btn lodo-btn-primary lodo-comp-accept" data-bid-id="' + bid.id + '">' + (bid.isAccepted ? 'Accepted ✓' : 'Accept Offer') + '</button>'
      + '  </div>'
      + '</div>';
  }

  // ── Accept bid ────────────────────────────────────────────────────
  function acceptBid(bid) {
    state.acceptedBid = bid;
    state.bids.forEach(function (b) {
      b.isAccepted = (b.id === bid.id);
    });
    state.showSuccess = true;
    showScreen(4);
    updateStepIndicator(4);
    renderAcceptedDetail();
    stopTimer();
  }

  function renderAcceptedDetail() {
    if (!dom.acceptedDetail || !state.acceptedBid) return;
    var b = state.acceptedBid;
    dom.acceptedDetail.innerHTML = ''
      + '<div class="lodo-accepted-row"><span class="lodo-accepted-label">Lender</span><span class="lodo-accepted-value">' + b.lenderName + ' (' + b.lenderLogoCode + ')</span></div>'
      + '<div class="lodo-accepted-row"><span class="lodo-accepted-label">APR</span><span class="lodo-accepted-value">' + b.apr + '%</span></div>'
      + '<div class="lodo-accepted-row"><span class="lodo-accepted-label">Monthly Payment</span><span class="lodo-accepted-value">' + formatINR(b.monthlyPayment) + '</span></div>'
      + '<div class="lodo-accepted-row"><span class="lodo-accepted-label">Total Interest</span><span class="lodo-accepted-value">' + formatINR(b.totalInterest) + '</span></div>'
      + '<div class="lodo-accepted-row"><span class="lodo-accepted-label">Processing Fees</span><span class="lodo-accepted-value">' + b.processingFees + '</span></div>'
      + '<div class="lodo-accepted-row"><span class="lodo-accepted-label">Upfront Costs</span><span class="lodo-accepted-value">' + b.upfrontCosts + '</span></div>'
      + '<div class="lodo-accepted-row lodo-accepted-row--total"><span class="lodo-accepted-label">Total Repayment</span><span class="lodo-accepted-value lodo-accepted-value--total">' + formatINR(b.totalRepayment) + '</span></div>';
  }

  // ── Restart ───────────────────────────────────────────────────────
  function restart() {
    stopTimer();
    state.formStep = 1;
    state.amount = '500000';
    state.purpose = 'Home Renovation';
    state.tenure = '60';
    state.description = 'Kitchen renovation for home-based catering setup';
    state.collateral = '';
    state.collateralValue = '200000';
    state.currentIntent = null;
    state.bids = [];
    state.selectedBidIds = {};
    state.compareBids = [];
    state.acceptedBid = null;
    state.showSuccess = false;
    state.timeRemaining = 9808;

    if (dom.amountInput) dom.amountInput.value = '500000';
    if (dom.purposeSelect) dom.purposeSelect.value = 'Home Renovation';
    if (dom.tenureInput) dom.tenureInput.value = '60';
    if (dom.descInput) dom.descInput.value = 'Kitchen renovation for home-based catering setup';
    if (dom.collateralSelect) dom.collateralSelect.value = '';
    if (dom.collateralValueInput) dom.collateralValueInput.value = '200000';

    setFormStep(1);
    showScreen(1);
    updateStepIndicator(1);
  }

  // ── Event wiring ──────────────────────────────────────────────────
  function wireEvents() {
    // Form step navigation
    if (dom.nextBtn) {
      dom.nextBtn.addEventListener('click', function () { setFormStep(2); });
    }
    if (dom.backBtn1) {
      dom.backBtn1.addEventListener('click', function () { setFormStep(1); });
    }
    if (dom.nextBtn1) {
      dom.nextBtn1.addEventListener('click', function () { setFormStep(3); });
    }
    if (dom.backBtn2) {
      dom.backBtn2.addEventListener('click', function () { setFormStep(2); });
    }
    if (dom.createBtn) {
      dom.createBtn.addEventListener('click', createIntent);
    }

    // Auction back
    if (dom.auctionBackBtn) {
      dom.auctionBackBtn.addEventListener('click', function () {
        stopTimer();
        state.bids = [];
        state.selectedBidIds = {};
        state.compareBids = [];
        state.showSuccess = false;
        state.acceptedBid = null;
        showScreen(1);
        updateStepIndicator(1);
        setFormStep(1);
      });
    }

    // Compare
    if (dom.compareBtn) {
      dom.compareBtn.addEventListener('click', openComparison);
    }
    if (dom.compareBackBtn) {
      dom.compareBackBtn.addEventListener('click', function () {
        state.compareBids = [];
        showScreen(2);
        updateStepIndicator(2);
        renderAuction();
      });
    }
    if (dom.compareBackToAuctionBtn) {
      dom.compareBackToAuctionBtn.addEventListener('click', function () {
        state.compareBids = [];
        showScreen(2);
        updateStepIndicator(2);
        renderAuction();
      });
    }

    // Restart
    if (dom.restartBtn) {
      dom.restartBtn.addEventListener('click', restart);
    }

    // Live input updates
    if (dom.amountInput) {
      dom.amountInput.addEventListener('input', function (e) { state.amount = e.target.value; });
    }
    if (dom.purposeSelect) {
      dom.purposeSelect.addEventListener('change', function (e) { state.purpose = e.target.value; });
    }
    if (dom.tenureInput) {
      dom.tenureInput.addEventListener('input', function (e) { state.tenure = e.target.value; });
    }
    if (dom.descInput) {
      dom.descInput.addEventListener('input', function (e) { state.description = e.target.value; });
    }
    if (dom.collateralSelect) {
      dom.collateralSelect.addEventListener('change', function (e) { state.collateral = e.target.value; });
    }
    if (dom.collateralValueInput) {
      dom.collateralValueInput.addEventListener('input', function (e) { state.collateralValue = e.target.value; });
    }
  }

  // ── Initial render ────────────────────────────────────────────────
  function init() {
    wireEvents();
    setFormStep(1);
    showScreen(1);
    updateStepIndicator(1);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
