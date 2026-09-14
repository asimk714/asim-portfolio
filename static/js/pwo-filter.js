/**
 * Proof of Work — category filtering
 *
 * Filters evidence cards by category using existing data-filter / data-category
 * attributes. Works with the existing HTML structure in templates/work/index.html
 * and templates/_proof_of_work_preview.html.
 */
(function () {
  'use strict';

  var filtersContainer = document.getElementById('pwo-filters');
  if (!filtersContainer) return;

  var grid = document.getElementById('pwo-grid');
  if (!grid) return;

  var filterLinks = filtersContainer.querySelectorAll('.pwo-filter');

  function setActiveFilter(activeFilter) {
    filterLinks.forEach(function (link) {
      var filter = link.getAttribute('data-filter');
      if (filter === activeFilter) {
        link.classList.add('pwo-filter--active');
      } else {
        link.classList.remove('pwo-filter--active');
      }
    });
  }

  function filterCards(activeFilter) {
    var cards = grid.querySelectorAll('.evidence-card');
    cards.forEach(function (card) {
      var category = card.getAttribute('data-category') || '';
      if (activeFilter === 'all' || category === activeFilter) {
        card.style.display = '';
        card.setAttribute('aria-hidden', 'false');
      } else {
        card.style.display = 'none';
        card.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function handleFilterClick(e) {
    var link = e.currentTarget;
    var filter = link.getAttribute('data-filter');
    if (!filter) return;

    e.preventDefault();
    setActiveFilter(filter);
    filterCards(filter);
    grid.setAttribute('aria-busy', 'false');
  }

  // Convert filter links to buttons for proper accessibility
  // (links with href="#" that preventDefault are interactive controls, not navigation)
  filterLinks.forEach(function (link) {
    var filter = link.getAttribute('data-filter') || 'all';
    var isActive = link.classList.contains('pwo-filter--active');

    // Set initial state on grid
    if (isActive) {
      filterCards(filter);
      grid.setAttribute('aria-busy', 'false');
    }

    // Change from link to button for correct semantics
    var button = document.createElement('button');
    button.type = 'button';
    button.className = link.className;
    button.setAttribute('data-filter', filter);
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    button.textContent = link.textContent;

    // Copy existing event listeners are lost in replacement,
    // so attach fresh ones
    button.addEventListener('click', handleFilterClick);

    link.parentNode.replaceChild(button, link);
  });

  // Re-query after replacement
  filterLinks = filtersContainer.querySelectorAll('.pwo-filter');

  // Keyboard handling is automatic for buttons; click handler covers Enter/Space

  // Re-run active filter after any potential dynamic content
  window.addEventListener('pageshow', function () {
    var active = filtersContainer.querySelector('.pwo-filter--active');
    if (active) {
      var filter = active.getAttribute('data-filter') || 'all';
      setActiveFilter(filter);
      filterCards(filter);
    }
  });
})();
