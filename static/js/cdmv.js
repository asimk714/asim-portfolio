/**
 * Define / Measure / Verify sequence — expandable stages
 */
(function () {
  'use strict';

  var stages = document.querySelectorAll('.cdmv-stage');

  if (!stages.length) return;

  stages.forEach(function (stage) {
    stage.addEventListener('click', function () {
      var isOpen = stage.getAttribute('aria-expanded') === 'true';

      // Toggle this stage
      stage.setAttribute('aria-expanded', String(!isOpen));

      // Optional: close others in the sequence (accordion behavior)
      stages.forEach(function (other) {
        if (other !== stage) {
          other.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Keyboard: Enter/Space already handled by button, but ensure Space doesn't scroll
    stage.addEventListener('keydown', function (e) {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
      }
    });
  });
})();
