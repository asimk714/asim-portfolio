/**
 * Show evidence basis toggle
 * Lightweight progressive disclosure for evidence detail panels
 */
(function () {
  'use strict';

  var buttons = document.querySelectorAll('.evidence-detail__button');

  if (!buttons.length) return;

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var content = button.parentElement.querySelector('.evidence-detail__content');
      if (!content) return;

      var isOpen = button.getAttribute('aria-expanded') === 'true';

      button.setAttribute('aria-expanded', String(!isOpen));
      content.setAttribute('aria-hidden', String(isOpen));
    });
  });
})();
