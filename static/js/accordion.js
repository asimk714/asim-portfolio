/***
 * Accordion disclosures
 */
(function () {
  'use strict';

  document.querySelectorAll('.accordion__header').forEach(function (header) {
    header.addEventListener('click', function () {
      var accordion = header.closest('.accordion');
      var body = accordion.querySelector('.accordion__body');
      var icon = accordion.querySelector('.accordion__icon');
      var isOpen = body.classList.contains('accordion__body--open');

      // Close this one if open
      if (isOpen) {
        body.classList.remove('accordion__body--open');
        if (icon) icon.classList.remove('accordion__icon--open');
        return;
      }

      // Close all others in the same group (optional — remove if independent)
      var group = accordion.closest('.accordion-group');
      if (group) {
        group.querySelectorAll('.accordion__body--open').forEach(function (otherBody) {
          otherBody.classList.remove('accordion__body--open');
        });
        group.querySelectorAll('.accordion__icon--open').forEach(function (otherIcon) {
          otherIcon.classList.remove('accordion__icon--open');
        });
      }

      body.classList.add('accordion__body--open');
      if (icon) icon.classList.add('accordion__icon--open');
    });

    // Keyboard: Enter/Space activate
    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Principle cards use the same accordion pattern
  document.querySelectorAll('.principle-card__header').forEach(function (header) {
    header.addEventListener('click', function () {
      var card = header.closest('.principle-card');
      var body = card.querySelector('.principle-card__body');
      var chevron = card.querySelector('.principle-card__chevron');
      var isOpen = body.classList.contains('principle-card__body--open');

      if (isOpen) {
        body.classList.remove('principle-card__body--open');
        if (chevron) chevron.classList.remove('principle-card__chevron--open');
        return;
      }

      body.classList.add('principle-card__body--open');
      if (chevron) chevron.classList.add('principle-card__chevron--open');
    });

    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });

  // Decision blocks — expandable product decisions
  document.querySelectorAll('.decision-block__header').forEach(function (header) {
    header.addEventListener('click', function () {
      var block = header.closest('.decision-block');
      var body = block.querySelector('.decision-block__body');
      var chevron = block.querySelector('.decision-block__chevron');
      var isOpen = body && body.classList.contains('decision-block__body--open');

      if (isOpen) {
        body.classList.remove('decision-block__body--open');
        block.setAttribute('aria-expanded', 'false');
        if (chevron) chevron.style.transform = '';
        return;
      }

      // Close siblings in the same group
      var group = block.closest('.decision-block-group');
      if (group) {
        group.querySelectorAll('.decision-block__body--open').forEach(function (otherBody) {
          otherBody.classList.remove('decision-block__body--open');
        });
        group.querySelectorAll('.decision-block__chevron').forEach(function (otherChevron) {
          otherChevron.style.transform = '';
        });
        group.querySelectorAll('.decision-block[aria-expanded="true"]').forEach(function (otherBlock) {
          otherBlock.setAttribute('aria-expanded', 'false');
        });
      }

      body.classList.add('decision-block__body--open');
      block.setAttribute('aria-expanded', 'true');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    });

    header.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        header.click();
      }
    });
  });
})();
