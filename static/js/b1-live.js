/**
 * B1 — Transition Workflow Live Experience
 * Illustrative demonstration only — no real product, users, or outcomes
 */
(function () {
  'use strict';

  // Workflow steps (illustrative — B1 is a strategy hypothesis, not a working product)
  var WORKFLOW_STEPS = [
    {
      num: 1,
      label: 'Initiate workflow',
      description: 'A pilot team with a promising AI pilot starts the transition workflow instead of an ad-hoc handoff.',
      content: function () {
        return '<p style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary);">' +
          'The pilot team initiates the bounded workflow. This is where B1 takes over from ad-hoc coordination.' +
          '</p>' +
          '<div style="margin-top: var(--space-3); font-size: var(--text-sm);">' +
          '<p><strong>Illustrative trigger:</strong> A business-unit team has a promising AI assistant prototype. ' +
          'No clear production owner is ready. The team starts B1 instead of email/Slack/spreadsheet handoffs.</p>' +
          '</div>';
      }
    },
    {
      num: 2,
      label: 'Readiness is assessed',
      description: 'B1-owned step: is the pilot ready to be considered for transfer?',
      content: function () {
        return '<p style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary);">' +
          'Readiness confirmation is a B1-owned step. The workflow surfaces whether the pilot is ready to be considered ' +
          'for transfer — or whether there are gaps that should be addressed first.' +
          '</p>' +
          '<div style="margin-top: var(--space-3); padding: var(--space-3); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">' +
          '<p style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--accent); margin: 0 0 var(--space-1);">Illustrative readiness signals</p>' +
          '<ul style="margin: 0; padding-left: var(--space-4); font-size: var(--text-xs); color: var(--text-secondary);">' +
          '<li>Pilot artifact exists and is documented</li>' +
          '<li>Intended use case is described</li>' +
          '<li>Stakeholders are identified</li>' +
          '<li>Readiness gaps: governance/security status not yet confirmed</li>' +
          '</ul>' +
          '</div>';
      }
    },
    {
      num: 3,
      label: 'Governance / security / internal-policy checkpoint',
      description: 'B1-owned step: status of governance, security, and internal-policy checks.',
      content: function () {
        return '<p style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary);">' +
          'The governance/security/internal-policy checkpoint is a B1-owned step. It surfaces the status of checks ' +
          'without becoming the enterprise compliance/privacy system itself.' +
          '</p>' +
          '<div style="margin-top: var(--space-3); padding: var(--space-3); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">' +
          '<p style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--accent); margin: 0 0 var(--space-1);">Illustrative checkpoint status</p>' +
          '<ul style="margin: 0; padding-left: var(--space-4); font-size: var(--text-xs); color: var(--text-secondary);">' +
          '<li>Internal policy review: <strong>pending</strong></li>' +
          '<li>Security review: <strong>not started</strong></li>' +
          '<li>Data handling review: <strong>pending</strong></li>' +
          '<li>Access model: <strong>to be defined</strong></li>' +
          '</ul>' +
          '</div>';
      }
    },
    {
      num: 4,
      label: 'Ownership transfer proposed',
      description: 'B1-owned step: a production ownership record is created/proposed.',
      content: function () {
        return '<p style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary);">' +
          'A production ownership record is proposed. B1 does not decide who owns the pilot — it creates the record ' +
          'for the decision to happen through.' +
          '</p>' +
          '<div style="margin-top: var(--space-3); padding: var(--space-3); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">' +
          '<p style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--accent); margin: 0 0 var(--space-1);">Illustrative ownership proposal</p>' +
          '<ul style="margin: 0; padding-left: var(--space-4); font-size: var(--text-xs); color: var(--text-secondary);">' +
          '<li>Proposed production owner: <strong>IT/platform team</strong> (to be confirmed)</li>' +
          '<li>Proposed handoff date: <strong>TBD</strong></li>' +
          '<li>Ownership status: <strong>proposed, not accepted</strong></li>' +
          '</ul>' +
          '</div>';
      }
    },
    {
      num: 5,
      label: 'Accountability handoff recorded',
      description: 'B1-owned step: handoff context and escalation path are recorded.',
      content: function () {
        return '<p style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary);">' +
          'The accountability handoff is recorded — context, escalation path, and what the production owner is ' +
          'accepting responsibility for. This is a bounded record, not an operational execution system.' +
          '</p>' +
          '<div style="margin-top: var(--space-3); padding: var(--space-3); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md);">' +
          '<p style="font-size: var(--text-xs); font-weight: 600; text-transform: uppercase; letter-spacing: var(--tracking-wide); color: var(--accent); margin: 0 0 var(--space-1);">Illustrative handoff record</p>' +
          '<ul style="margin: 0; padding-left: var(--space-4); font-size: var(--text-xs); color: var(--text-secondary);">' +
          '<li>Handoff context recorded</li>' +
          '<li>Escalation path defined (proposed)</li>' +
          '<li>Support boundary documented</li>' +
          '<li>Accountability status: <strong>recorded, awaiting acceptance</strong></li>' +
          '</ul>' +
          '</div>';
      }
    },
    {
      num: 6,
      label: 'Outcome: accept or send back',
      description: 'Moment of value — production ownership acceptance OR explicit send-back with gaps.',
      content: function () {
        return '<p style="margin: 0; font-size: var(--text-sm); color: var(--text-secondary);">' +
          'This is the moment of value — not "the pilot is live in production," which is outside B1\'s boundary. ' +
          'The outcome is either accept as production owner, or explicit send-back with actionable readiness gaps.' +
          '</p>' +
          '<div style="margin-top: var(--space-3);">' +
          '<button id="b1-accept-btn" class="btn btn--primary" style="margin-right: var(--space-2);">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-right: var(--space-1);">' +
          '<polyline points="20 6 9 17 4 12"/>' +
          '</svg>' +
          'Illustrative: Accept as production owner' +
          '</button>' +
          '<button id="b1-sendback-btn" class="btn btn--ghost">' +
          '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink: 0; margin-right: var(--space-1);">' +
          '<line x1="18" y1="6" x2="6" y2="18"/>' +
          '<line x1="6" y1="6" x2="18" y2="18"/>' +
          '</svg>' +
          'Illustrative: Send back with gaps' +
          '</button>' +
          '</div>' +
          '<div id="b1-outcome-message" style="margin-top: var(--space-3); padding: var(--space-3); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); display: none;"></div>';
      }
    }
  ];

  var currentStepIndex = 0;
  var workflowState = {
    initiated: false,
    readinessAssessed: false,
    checkpointReviewed: false,
    ownershipProposed: false,
    handoffRecorded: false,
    outcomeDecided: false,
    outcome: null // 'accept' or 'sendback'
  };

  var stepNumEl = document.getElementById('b1-current-step-num');
  var stepLabelEl = document.getElementById('b1-current-step-label');
  var stepDescEl = document.getElementById('b1-step-description');
  var stepContentEl = document.getElementById('b1-step-content');
  var progressTrackEl = document.querySelector('.b1-progress-track');
  var stateSummaryEl = document.getElementById('b1-state-summary');
  var stateItemsEl = document.getElementById('b1-state-items');
  var backBtn = document.getElementById('b1-back-btn');
  var nextBtn = document.getElementById('b1-next-btn');
  var resetBtn = document.getElementById('b1-reset-btn');

  // Render progress track
  function renderProgress() {
    // Keep existing steps, update classes
    var steps = progressTrackEl.querySelectorAll('.b1-progress-step');
    steps.forEach(function (el, i) {
      el.textContent = (i + 1) + '.';
      el.className = 'b1-progress-step';
      if (i < currentStepIndex) {
        el.classList.add('b1-progress-step--done');
        el.textContent = '✓ ' + (i + 1);
      } else if (i === currentStepIndex) {
        el.classList.add('b1-progress-step--active');
      }
    });
  }

  // Render current step
  function renderStep() {
    var step = WORKFLOW_STEPS[currentStepIndex];
    stepNumEl.textContent = step.num;
    stepLabelEl.textContent = step.label;
    stepDescEl.textContent = step.description;
    stepContentEl.innerHTML = step.content();

    // Wire outcome buttons if on last step
    if (currentStepIndex === 5) {
      var acceptBtn = document.getElementById('b1-accept-btn');
      var sendbackBtn = document.getElementById('b1-sendback-btn');
      var outcomeMsg = document.getElementById('b1-outcome-message');

      if (acceptBtn) {
        acceptBtn.onclick = function () {
          workflowState.outcome = 'accept';
          workflowState.outcomeDecided = true;
          if (outcomeMsg) {
            outcomeMsg.style.display = 'block';
            outcomeMsg.innerHTML =
              '<p style="margin: 0; font-size: var(--text-sm); color: var(--color-success);">' +
              '<strong>Illustrative outcome:</strong> Production ownership accepted. ' +
              'The pilot is proposed for transfer to the IT/platform team as production owner. ' +
              'This is the moment of value — not "the pilot is live in production."</p>';
          }
          updateStateSummary();
        };
      }
      if (sendbackBtn) {
        sendbackBtn.onclick = function () {
          workflowState.outcome = 'sendback';
          workflowState.outcomeDecided = true;
          if (outcomeMsg) {
            outcomeMsg.style.display = 'block';
            outcomeMsg.innerHTML =
              '<p style="margin: 0; font-size: var(--text-sm); color: var(--evidence-not-evidenced);">' +
              '<strong>Illustrative outcome:</strong> Send back with gaps. ' +
              'The governance/security checkpoint is not complete, and readiness gaps remain. ' +
              'The pilot team gets an explicit send-back with actionable gaps rather than an ambiguous handoff.</p>';
          }
          updateStateSummary();
        };
      }
    }

    renderProgress();
    updateButtons();
    updateStateSummary();
  }

  // Update button visibility
  function updateButtons() {
    backBtn.style.display = currentStepIndex > 0 ? 'inline-flex' : 'none';
    nextBtn.style.display = 'inline-flex';
    if (currentStepIndex === 5) {
      nextBtn.style.display = 'none';
    }
  }

  // Update state summary
  function updateStateSummary() {
    var items = [];
    if (workflowState.initiated) items.push('✓ Workflow initiated');
    if (workflowState.readinessAssessed) items.push('✓ Readiness assessed');
    if (workflowState.checkpointReviewed) items.push('✓ Governance/security checkpoint surfaced');
    if (workflowState.ownershipProposed) items.push('✓ Ownership transfer proposed');
    if (workflowState.handoffRecorded) items.push('✓ Accountability handoff recorded');
    if (workflowState.outcomeDecided) {
      var outcomeText = workflowState.outcome === 'accept'
        ? '✓ Outcome: accept as production owner (illustrative)'
        : '✓ Outcome: send back with gaps (illustrative)';
      items.push(outcomeText);
    }
    if (items.length === 0) {
      stateSummaryEl.style.display = 'none';
      return;
    }
    stateSummaryEl.style.display = 'block';
    stateItemsEl.innerHTML = items.map(function (item) {
      return '<div style="display: flex; align-items: center; gap: var(--space-2);">' +
        '<span style="width: 6px; height: 6px; border-radius: 50%; background: var(--color-success); flex-shrink: 0;"></span>' +
        '<span>' + item + '</span>' +
        '</div>';
    }).join('');
  }

  // Record state when advancing
  function advanceState() {
    if (currentStepIndex === 0) workflowState.initiated = true;
    if (currentStepIndex === 1) workflowState.readinessAssessed = true;
    if (currentStepIndex === 2) workflowState.checkpointReviewed = true;
    if (currentStepIndex === 3) workflowState.ownershipProposed = true;
    if (currentStepIndex === 4) workflowState.handoffRecorded = true;
  }

  // Navigation
  function goToStep(index) {
    if (index < 0 || index >= WORKFLOW_STEPS.length) return;
    // If going back, we don't clear state — the workflow records progress
    currentStepIndex = index;
    renderStep();
  }

  function nextStep() {
    if (currentStepIndex < WORKFLOW_STEPS.length - 1) {
      advanceState();
      goToStep(currentStepIndex + 1);
    }
  }

  function prevStep() {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  }

  function resetWorkflow() {
    currentStepIndex = 0;
    workflowState = {
      initiated: false,
      readinessAssessed: false,
      checkpointReviewed: false,
      ownershipProposed: false,
      handoffRecorded: false,
      outcomeDecided: false,
      outcome: null
    };
    renderStep();
  }

  // Event listeners
  nextBtn.addEventListener('click', nextStep);
  backBtn.addEventListener('click', prevStep);
  resetBtn.addEventListener('click', resetWorkflow);

  // Initial render
  renderStep();
})();
