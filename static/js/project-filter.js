/**
 * Project filtering for Selected Work section
 * Accessible button-based filter with JS and no-JS graceful fallback
 */
(function () {
  'use strict';

  var filtersContainer = document.getElementById('project-filters');
  if (!filtersContainer) return;

  var grid = document.getElementById('project-grid');
  if (!grid) return;

  var filterButtons = filtersContainer.querySelectorAll('.project-filter');

  // Build filter state
  var activeFilter = 'all';

  function setActiveButton(activeBtn) {
    filterButtons.forEach(function (btn) {
      var filter = btn.getAttribute('data-filter') || 'all';
      btn.setAttribute('aria-pressed', String(filter === activeBtn.getAttribute('data-filter')));
    });
  }

  function filterProjects(activeFilter) {
    var cards = grid.querySelectorAll('.project-card');
    var hasVisible = false;

    cards.forEach(function (card) {
      var categories = card.getAttribute('data-categories') || '';
      var categoriesArray = categories.split(',').map(function (s) { return s.trim(); });

      var show = (activeFilter === 'all') || categoriesArray.indexOf(activeFilter) !== -1;

      if (show) {
        card.classList.remove('project-card--hidden');
        hasVisible = true;
      } else {
        card.classList.add('project-card--hidden');
      }
    });

    // Show/hide empty state
    var emptyState = grid.querySelector('.project-empty-state');
    if (emptyState) {
      emptyState.style.display = hasVisible ? 'none' : 'block';
    }
  }

  function handleFilterClick(e) {
    var btn = e.currentTarget;
    var filter = btn.getAttribute('data-filter') || 'all';

    e.preventDefault();
    activeFilter = filter;
    setActiveButton(btn);
    filterProjects(filter);
  }

  // Convert links to buttons if needed (progressive enhancement)
  filterButtons.forEach(function (link) {
    // If it's already a button, keep it
    if (link.tagName === 'BUTTON') return;

    // Convert <a href="#"> to <button>
    var filter = link.getAttribute('data-filter') || 'all';
    var isActive = link.classList.contains('project-filter--active');

    var button = document.createElement('button');
    button.type = 'button';
    button.className = link.className;
    button.setAttribute('data-filter', filter);
    button.setAttribute('aria-pressed', String(isActive));
    button.textContent = link.textContent;

    // Move any count span if present
    var count = link.querySelector('.project-filter__count');
    if (count) {
      button.appendChild(document.createTextNode(' '));
      button.appendChild(count.cloneNode(true));
    }

    link.parentNode.replaceChild(button, link);
  });

  // Re-query after conversion
  filterButtons = filtersContainer.querySelectorAll('.project-filter');

  // Set initial state
  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', handleFilterClick);
  });

  // Initialize with 'all' active
  activeFilter = 'all';
  setActiveButton(null);
  filterButtons.forEach(function (btn) {
    btn.setAttribute('aria-pressed', 'false');
  });
  filterProjects('all');

  // Handle window resize for responsive layout
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Re-apply filter in case layout changed
      filterProjects(activeFilter);
    }, 150);
  });
})();
