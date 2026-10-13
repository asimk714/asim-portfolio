/**
 * Unrot Live Experience - Interactive retention measurement demo
 * Illustrative data only — no real cohort data
 */
(function () {
  'use strict';

  // Funnel stage tooltips
  var funnelStages = document.querySelectorAll('.unrot-funnel-stage');
  for (var i = 0; i < funnelStages.length; i++) {
    (function (stage) {
      stage.addEventListener('click', function () {
        var stageNum = stage.getAttribute('data-stage');
        var descriptionEl = stage.querySelector('p:nth-child(2)');
        if (descriptionEl) {
          var currentText = descriptionEl.textContent.trim();
          var expandedTexts = {
            '1': 'first_session_started — recorded server-side when onboarding begins. This is the entry point of the funnel; every new user is counted here. No D1 calculation can happen without this event.',
            '2': 'onboarding_completed — user completes the 3-step onboarding (role, goal, experience). UserPreference record is saved. This stage measures activation, not just visit.',
            '3': 'plan_viewed — the 5-day personalized curriculum plan is displayed. This is the "reason to return" touchpoint — the user sees what Day 2 and beyond will cover.',
            '4': 'lesson_started — user opens the Day 1 lesson in the lesson reader. Progress tracking begins (LessonProgress.startedAt). This is the start of actual learning.',
            '5': 'lesson_completed — knowledge check passed, lesson finished. LessonProgress.completedAt stored. This measures Day 0 completion rate, a secondary metric.',
            '6': 'reminder_enabled — user opts into daily reminder (time + timezone saved). No real notification sent in prototype. This measures reminder opt-in rate, a secondary metric.',
            '7': 'D1_returned — user returns on calendar day D0+1. Qualifying return events: return_home_viewed, lesson_viewed, lesson_started, plan_viewed, next_lesson_started, session_returned_d1. demo_return_previewed is excluded.'
          };
          descriptionEl.textContent = expandedTexts[stageNum] || currentText;
        }
        // Visual feedback
        stage.style.borderColor = 'var(--accent)';
        setTimeout(function () {
          stage.style.borderColor = '';
        }, 600);
      });
    })(funnelStages[i]);
  }

  // D1 Calculator
  var calcBtn = document.getElementById('unrot-calc-btn');
  var calcResult = document.getElementById('unrot-calc-result');
  var calcText = document.getElementById('unrot-calc-text');
  var timezoneSelect = document.getElementById('unrot-timezone');
  var cohortDateInput = document.getElementById('unrot-cohort-date');

  // Set default cohort date to 8 days ago (so D0+2 has passed)
  var defaultDate = new Date();
  defaultDate.setDate(defaultDate.getDate() - 8);
  cohortDateInput.value = defaultDate.toISOString().split('T')[0];

  calcBtn.addEventListener('click', function () {
    var tz = timezoneSelect.value;
    var cohortDateStr = cohortDateInput.value;

    if (!cohortDateStr) {
      calcText.textContent = 'Please select a cohort start date.';
      calcResult.style.display = 'block';
      return;
    }

    var cohortDate = new Date(cohortDateStr + 'T00:00:00');
    var now = new Date();

    // Calculate D0+1 and D0+2
    var d0Plus1 = new Date(cohortDate);
    d0Plus1.setDate(d0Plus1.getDate() + 1);

    var d0Plus2 = new Date(cohortDate);
    d0Plus2.setDate(d0Plus2.getDate() + 2);

    var d0Plus1Str = d0Plus1.toISOString().split('T')[0];
    var d0Plus2Str = d0Plus2.toISOString().split('T')[0];

    var nowStr = now.toISOString().split('T')[0];

    var isCohortComplete = nowStr >= d0Plus2Str;

    if (!isCohortComplete) {
      calcText.textContent = 'Cohort on ' + cohortDateStr + ' (D0) is incomplete. D0+2 (' + d0Plus2Str + ') has not yet closed. Cannot compute D1 retention until the cohort is complete.';
    } else {
      // Illustrative: 0 real D1 returners
      var d1Returners = 0;
      var cohortSize = 100;
      var d1Rate = (d1Returners / cohortSize) * 100;

      calcText.textContent = 'Cohort: ' + cohortSize + ' new users started on ' + cohortDateStr + ' (D0) with timezone ' + tz + '. D0+1: ' + d0Plus1Str + '. D1 returners (qualifying events, excluding demo): ' + d1Returners + '. D1 retention: ' + d1Rate.toFixed(1) + '%. Status: Not enough real cohort data yet — this is the honest result with no real users.';
    }

    calcResult.style.display = 'block';
  });

  // Funnel summary: highlight D1 stage on load
  var d1Stage = document.querySelector('.unrot-funnel-stage--d1');
  if (d1Stage) {
    d1Stage.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
})();
