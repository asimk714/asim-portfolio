/**
 * Theme toggle — persists preference, respects prefers-color-scheme
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'portfolio-theme';
  var toggle = document.getElementById('theme-toggle');
  var html = document.documentElement;

  function getPreferredTheme() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function init() {
    var theme = getPreferredTheme();
    setTheme(theme);
  }

  function toggleTheme() {
    var current = html.getAttribute('data-theme');
    var next = current === 'dark' ? 'light' : 'dark';
    setTheme(next);
  }

  if (toggle) {
    toggle.addEventListener('click', toggleTheme);
    init();
  } else {
    init();
  }

  // Listen for system theme changes (only if user hasn't explicitly chosen)
  var darkModeMedia = window.matchMedia('(prefers-color-scheme: dark)');
  darkModeMedia.addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
})();
