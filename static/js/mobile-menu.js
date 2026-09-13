/**
 * Mobile menu toggle
 */
(function () {
  'use strict';

  var btn = document.getElementById('mobile-menu-btn');
  var nav = document.getElementById('mobile-nav');
  var isOpen = false;

  function open() {
    isOpen = true;
    nav.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    btn.innerHTML =
      '<span class="mobile-menu-icon" aria-hidden="true">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>' +
        '</svg>' +
      '</span>';
  }

  function close() {
    isOpen = false;
    nav.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML =
      '<span class="mobile-menu-icon" aria-hidden="true">' +
        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>' +
        '</svg>' +
      '</span>';
  }

  function toggle() {
    isOpen ? close() : open();
  }

  if (btn && nav) {
    btn.addEventListener('click', toggle);

    // Close on link click
    nav.querySelectorAll('.mobile-nav-link').forEach(function (link) {
      link.addEventListener('click', close);
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        close();
        btn.focus();
      }
    });
  }
})();
