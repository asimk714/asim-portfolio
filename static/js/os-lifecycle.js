/**
 * Principal PM OS lifecycle — progressive stage reveal via IntersectionObserver
 *
 * Each OS stage reveals when it enters the viewport.
 * The marker gets a subtle highlight when the stage is visible.
 * No automatic scrolling or forced sequencing — reads naturally.
 */
(function () {
  'use strict';

  if (!('IntersectionObserver' in window)) {
    // Fallback: show all stages immediately
    document.querySelectorAll('.os-stage').forEach(function (stage) {
      stage.classList.add('reveal--visible');
    });
    return;
  }

  // First, make sure all stages are set to visible if reduced motion
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.os-stage').forEach(function (stage) {
      stage.classList.add('reveal--visible');
    });
    return;
  }

  var osStages = document.querySelectorAll('.os-stage');
  if (!osStages.length) return;

  // Observe each stage individually
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          entry.target.classList.add('os-stage--highlight');
          // Remove highlight after a brief moment so it's a pulse, not permanent
          setTimeout(function () {
            entry.target.classList.remove('os-stage--highlight');
          }, 600);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -60px 0px'
    }
  );

  osStages.forEach(function (stage) {
    observer.observe(stage);
  });
})();
