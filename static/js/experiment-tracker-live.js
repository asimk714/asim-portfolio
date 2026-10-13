/**
 * Experiment Tracker Live Experience - Interactive demo
 * Illustrative data only — no real experiment database
 */
(function () {
  'use strict';

  var experimentForm = document.getElementById('et-experiment-form');
  var experimentList = document.getElementById('et-experiment-list');
  var detailTitle = document.getElementById('et-detail-title');
  var detailContent = document.getElementById('et-detail-content');
  var emptyDetail = document.getElementById('et-empty-detail');
  var detailHypothesis = document.getElementById('et-detail-hypothesis');
  var detailStatus = document.getElementById('et-detail-status');
  var detailDescription = document.getElementById('et-detail-description');
  var runSelectA = document.getElementById('et-run-a');
  var runSelectB = document.getElementById('et-run-b');
  var compareBtn = document.getElementById('et-compare-btn');
  var compareResult = document.getElementById('et-compare-result');
  var compareAName = document.getElementById('et-compare-a-name');
  var compareAResult = document.getElementById('et-compare-a-result');
  var compareBName = document.getElementById('et-compare-b-name');
  var compareBResult = document.getElementById('et-compare-b-result');
  var outcomeInput = document.getElementById('et-outcome');
  var decisionInput = document.getElementById('et-decision');
  var nextActionInput = document.getElementById('et-next-action');
  var saveConclusionBtn = document.getElementById('et-save-conclusion-btn');
  var conclusionResult = document.getElementById('et-conclusion-result');

  // Illustrative experiments (in-memory, not real database)
  var experiments = [
    {
      id: 'exp-001',
      name: 'Does reminder timing affect D1 retention?',
      hypothesis: 'Sending reminders at 9am increases D1 retention vs 6pm.',
      description: 'Test whether morning reminder time improves next-day return rate compared to evening.',
      status: 'completed',
      runs: [
        { name: '9am reminder group', result: 'D1 retention: 18%', notes: '50 users, 9am email reminder' },
        { name: '6pm reminder group', result: 'D1 retention: 14%', notes: '50 users, 6pm email reminder' }
      ]
    },
    {
      id: 'exp-002',
      name: 'Does lesson preview improve completion?',
      hypothesis: 'Showing tomorrow\'s lesson preview on completion increases lesson completion rate.',
      description: 'A/B test: completion page with vs without tomorrow preview card.',
      status: 'running',
      runs: [
        { name: 'With preview (treatment)', result: 'pending', notes: 'Running — 200 users enrolled' },
        { name: 'Without preview (control)', result: 'pending', notes: 'Running — 200 users enrolled' }
      ]
    },
    {
      id: 'exp-003',
      name: 'Does onboarding length affect activation?',
      hypothesis: '3-step onboarding has higher completion than 5-step onboarding.',
      description: 'Compare onboarding completion rate between short and long forms.',
      status: 'planned',
      runs: []
    },
    {
      id: 'exp-004',
      name: 'Does personalized curriculum improve retention?',
      hypothesis: 'Role/goal-based curriculum paths improve D7 retention vs generic path.',
      description: 'Longer-term experiment: measure D7 retention across 3 personalized paths vs 1 generic.',
      status: 'failed',
      runs: [
        { name: 'Personalized paths', result: 'D7 retention: 8%', notes: 'No statistically significant difference from baseline' },
        { name: 'Generic path', result: 'D7 retention: 7%', notes: 'Baseline comparable' }
      ]
    }
  ];

  var selectedExperimentId = null;

  // Status CSS class mapping
  var statusClasses = {
    'planned': 'status-planned',
    'running': 'status-running',
    'completed': 'status-completed',
    'failed': 'status-failed'
  };

  // Render experiment list
  function renderExperimentList() {
    experimentList.innerHTML = '';
    for (var i = 0; i < experiments.length; i++) {
      var exp = experiments[i];
      var item = document.createElement('div');
      item.className = 'experiment-item' + (exp.id === selectedExperimentId ? ' experiment-item--selected' : '');
      item.setAttribute('data-exp-id', exp.id);
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.innerHTML =
        '<span class="experiment-item__name">' + escapeHtml(exp.name) + '</span>' +
        '<span class="experiment-item__status ' + statusClasses[exp.status] + '">' + exp.status + '</span>';
      item.addEventListener('click', function () { selectExperiment(exp.id); });
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectExperiment(exp.id);
        }
      });
      experimentList.appendChild(item);
    }

    // Update run selects
    updateRunSelects();
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  function updateRunSelects() {
    var currentA = runSelectA.value;
    var currentB = runSelectB.value;

    runSelectA.innerHTML = '<option value="">Select run A</option>';
    runSelectB.innerHTML = '<option value="">Select run B</option>';

    if (selectedExperimentId) {
      var exp = getExperiment(selectedExperimentId);
      if (exp && exp.runs && exp.runs.length > 0) {
        for (var i = 0; i < exp.runs.length; i++) {
          var optA = document.createElement('option');
          optA.value = i;
          optA.textContent = exp.runs[i].name;
          runSelectA.appendChild(optA);

          var optB = document.createElement('option');
          optB.value = i;
          optB.textContent = exp.runs[i].name;
          runSelectB.appendChild(optB);
        }
        // Restore previous selection if still valid
        if (currentA && parseInt(currentA) < exp.runs.length) runSelectA.value = currentA;
        if (currentB && parseInt(currentB) < exp.runs.length) runSelectB.value = currentB;
      }
    }
  }

  function getExperiment(id) {
    for (var i = 0; i < experiments.length; i++) {
      if (experiments[i].id === id) return experiments[i];
    }
    return null;
  }

  function selectExperiment(id) {
    selectedExperimentId = id;
    renderExperimentList();

    var exp = getExperiment(id);
    if (exp) {
      detailTitle.textContent = exp.name;
      detailContent.style.display = 'block';
      emptyDetail.style.display = 'none';
      detailHypothesis.textContent = exp.hypothesis || '(no hypothesis recorded)';
      detailDescription.textContent = exp.description || '(no description)';

      var statusEl = detailStatus;
      statusEl.textContent = exp.status;
      statusEl.className = 'experiment-item__status ' + (statusClasses[exp.status] || 'status-planned');
    } else {
      detailTitle.textContent = 'Select an experiment';
      detailContent.style.display = 'none';
      emptyDetail.style.display = 'block';
    }
  }

  // Experiment form submit
  experimentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('et-name').value.trim();
    var hypothesis = document.getElementById('et-hypothesis').value.trim();
    var description = document.getElementById('et-description').value.trim();
    var status = document.getElementById('et-status').value;

    if (!name) {
      document.getElementById('et-name').focus();
      return;
    }

    var newExp = {
      id: 'exp-' + Date.now(),
      name: name,
      hypothesis: hypothesis,
      description: description,
      status: status,
      runs: []
    };
    experiments.unshift(newExp);
    renderExperimentList();
    selectExperiment(newExp.id);

    // Reset form
    experimentForm.reset();
    document.getElementById('et-name').focus();

    // Scroll to list
    experimentList.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  // Compare runs
  compareBtn.addEventListener('click', function () {
    var idxA = parseInt(runSelectA.value);
    var idxB = parseInt(runSelectB.value);
    var exp = getExperiment(selectedExperimentId);

    if (!exp || isNaN(idxA) || isNaN(idxB) || idxA === idxB) {
      compareResult.style.display = 'block';
      compareResult.innerHTML = '<p style="font-size: var(--text-sm); color: var(--evidence-not-evidenced); margin: 0;">Select two different runs to compare.</p>';
      return;
    }

    if (!exp.runs || exp.runs.length === 0) {
      compareResult.style.display = 'block';
      compareResult.innerHTML = '<p style="font-size: var(--text-sm); color: var(--text-muted); margin: 0;">No runs recorded for this experiment yet.</p>';
      return;
    }

    var runA = exp.runs[idxA];
    var runB = exp.runs[idxB];

    compareAName.textContent = runA.name;
    compareAResult.textContent = runA.result || '(no result)';
    compareBName.textContent = runB.name;
    compareBResult.textContent = runB.result || '(no result)';

    compareResult.style.display = 'block';
  });

  // Save conclusion
  saveConclusionBtn.addEventListener('click', function () {
    var outcome = outcomeInput.value.trim();
    var decision = decisionInput.value.trim();
    var nextAction = nextActionInput.value.trim();

    if (!outcome || !decision) {
      if (!outcome) outcomeInput.focus();
      else decisionInput.focus();
      return;
    }

    conclusionResult.style.display = 'block';
    conclusionResult.innerHTML =
      '<p style="font-size: var(--text-sm); color: var(--evidence-verified); font-weight: 600; margin: 0;">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display: inline; vertical-align: -2px; margin-right: var(--space-1);">' +
      '<polyline points="20 6 9 17 4 12"/>' +
      '</svg>' +
      'Conclusion saved. Outcome, decision, and next action are now connected to this experiment.' +
      '</p>';

    // Reset fields
    outcomeInput.value = '';
    decisionInput.value = '';
    nextActionInput.value = '';
  });

  // Initial render
  renderExperimentList();
  selectExperiment('exp-001');
})();
