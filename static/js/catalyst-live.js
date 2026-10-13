/**
 * Catalyst Live Experience — Keyboard-first interaction demonstration
 * Working prototype. Illustrative data. No real users or outcomes.
 */
(function () {
  'use strict';

  // Illustrative task data (demonstration only — not real project data)
  var ILLUSTRATIVE_TASKS = [
    { id: 't1', title: 'Wireframe onboarding flow', status: 'done', project: 'Catalyst', priority: 'high' },
    { id: 't2', title: 'Implement keyboard navigation (j/k)', status: 'done', project: 'Catalyst', priority: 'urgent' },
    { id: 't3', title: 'Add command palette (Cmd+K)', status: 'in-progress', project: 'Catalyst', priority: 'high' },
    { id: 't4', title: 'Design progress dashboard', status: 'todo', project: 'Catalyst', priority: 'medium' },
    { id: 't5', title: 'Build contextual quick-action bar', status: 'backlog', project: 'Catalyst', priority: 'low' },
    { id: 't6', title: 'Write first-load progressive onboarding', status: 'todo', project: 'Catalyst', priority: 'medium' },
    { id: 't7', title: 'Refine filter chip visibility', status: 'backlog', project: 'Catalyst', priority: 'low' },
    { id: 't8', title: 'Test keyboard shortcut discoverability', status: 'backlog', project: 'Catalyst', priority: 'medium' }
  ];

  var taskList = document.getElementById('catalyst-task-list');
  var emptyState = document.getElementById('catalyst-empty-state');
  var detailContent = document.getElementById('catalyst-detail-content');
  var selectionHint = document.getElementById('catalyst-selection-hint');
  var taskCount = document.getElementById('catalyst-task-count');
  var searchInput = document.getElementById('catalyst-search-input');

  var currentFilter = 'all';
  var searchQuery = '';
  var selectedIndex = -1;
  var filteredTasks = [];

  // Status CSS class mapping
  var statusClasses = {
    'backlog': 'catalyst-task-item__status--backlog',
    'todo': 'catalyst-task-item__status--todo',
    'in-progress': 'catalyst-task-item__status--in-progress',
    'done': 'catalyst-task-item__status--done'
  };

  // Status label
  var statusLabels = {
    'backlog': 'Backlog',
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'done': 'Done'
  };

  // Priority label
  var priorityLabels = {
    'urgent': 'Urgent',
    'high': 'High',
    'medium': 'Medium',
    'low': 'Low'
  };

  // Filter chip elements
  var filterChips = document.querySelectorAll('.catalyst-filter-chip');

  // Initialize
  function init() {
    filterChips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var filter = chip.getAttribute('data-filter');
        setFilter(filter);
      });
    });

    searchInput.addEventListener('input', function () {
      searchQuery = searchInput.value.toLowerCase().trim();
      renderList();
    });

    document.addEventListener('keydown', function (e) {
      handleKeydown(e);
    });

    renderList();
    updateDetail();
  }

  function setFilter(filter) {
    currentFilter = filter;
    filterChips.forEach(function (chip) {
      if (chip.getAttribute('data-filter') === filter) {
        chip.classList.add('catalyst-filter-chip--active');
      } else {
        chip.classList.remove('catalyst-filter-chip--active');
      }
    });
    selectedIndex = -1;
    renderList();
    updateDetail();
  }

  function getFilteredTasks() {
    var result = ILLUSTRATIVE_TASKS;
    if (currentFilter !== 'all') {
      result = result.filter(function (task) {
        return task.status === currentFilter;
      });
    }
    if (searchQuery) {
      result = result.filter(function (task) {
        return task.title.toLowerCase().indexOf(searchQuery) !== -1 ||
               task.project.toLowerCase().indexOf(searchQuery) !== -1;
      });
    }
    return result;
  }

  function renderList() {
    filteredTasks = getFilteredTasks();
    taskList.innerHTML = '';

    if (filteredTasks.length === 0) {
      emptyState.style.display = 'block';
      taskList.style.display = 'none';
      taskCount.textContent = '0 tasks';
      return;
    }

    emptyState.style.display = 'none';
    taskList.style.display = 'block';
    taskCount.textContent = filteredTasks.length + ' task' + (filteredTasks.length !== 1 ? 's' : '');

    filteredTasks.forEach(function (task, index) {
      var item = document.createElement('div');
      item.className = 'catalyst-task-item';
      item.setAttribute('data-index', index);
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.innerHTML =
        '<span class="catalyst-task-item__status ' + statusClasses[task.status] + '" aria-hidden="true"></span>' +
        '<span class="catalyst-task-item__title">' + escapeHtml(task.title) + '</span>' +
        '<span class="catalyst-task-item__meta">' + escapeHtml(task.project) + ' · ' + priorityLabels[task.priority] + '</span>';

      item.addEventListener('click', function () {
        selectTask(index);
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
          e.preventDefault();
          selectTask(index);
        }
      });

      taskList.appendChild(item);
    });

    if (selectedIndex >= filteredTasks.length) {
      selectedIndex = filteredTasks.length - 1;
    }
    updateSelectionHighlight();
  }

  function selectTask(index) {
    if (index < 0 || index >= filteredTasks.length) return;
    selectedIndex = index;
    updateSelectionHighlight();
    updateDetail();
  }

  function updateSelectionHighlight() {
    var items = taskList.querySelectorAll('.catalyst-task-item');
    items.forEach(function (item, index) {
      if (index === selectedIndex) {
        item.classList.add('catalyst-task-item--selected');
        item.setAttribute('aria-selected', 'true');
      } else {
        item.classList.remove('catalyst-task-item--selected');
        item.setAttribute('aria-selected', 'false');
      }
    });
  }

  function updateDetail() {
    if (selectedIndex >= 0 && selectedIndex < filteredTasks.length) {
      var task = filteredTasks[selectedIndex];
      detailContent.innerHTML =
        '<div style="margin-bottom: var(--space-2);">' +
          '<p style="font-size: var(--text-base); font-weight: 600; color: var(--text-primary); margin: 0;">' + escapeHtml(task.title) + '</p>' +
        '</div>' +
        '<div style="display: flex; gap: var(--space-3); flex-wrap: wrap; font-size: var(--text-xs); color: var(--text-muted);">' +
          '<span>Status: <strong style="color: var(--text-primary);">' + statusLabels[task.status] + '</strong></span>' +
          '<span>Priority: <strong style="color: var(--text-primary);">' + priorityLabels[task.priority] + '</strong></span>' +
          '<span>Project: <strong style="color: var(--text-primary);">' + escapeHtml(task.project) + '</strong></span>' +
        '</div>';
      selectionHint.textContent = 'Item ' + (selectedIndex + 1) + ' of ' + filteredTasks.length;
    } else {
      detailContent.innerHTML = '<p style="color: var(--text-muted); font-size: var(--text-sm); margin: 0;">No item selected. Navigate the list above and press Enter, or click an item.</p>';
      selectionHint.textContent = 'Use j/k or click to select';
    }
  }

  function handleKeydown(e) {
    // Don't intercept if typing in search
    if (e.target === searchInput) {
      if (e.key === 'Escape') {
        searchInput.blur();
      }
      return;
    }

    switch (e.key) {
      case 'j':
      case 'J':
        e.preventDefault();
        if (filteredTasks.length === 0) return;
        selectedIndex = Math.min(selectedIndex + 1, filteredTasks.length - 1);
        if (selectedIndex < 0) selectedIndex = 0;
        updateSelectionHighlight();
        updateDetail();
        scrollToSelected();
        break;

      case 'k':
      case 'K':
        e.preventDefault();
        if (filteredTasks.length === 0) return;
        selectedIndex = Math.max(selectedIndex - 1, 0);
        updateSelectionHighlight();
        updateDetail();
        scrollToSelected();
        break;

      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredTasks.length) {
          // Visual confirmation that item is selected (detail panel already shows it)
          scrollToSelected();
        }
        break;

      case 'Escape':
        e.preventDefault();
        if (searchInput.value) {
          searchInput.value = '';
          searchQuery = '';
          renderList();
        }
        selectedIndex = -1;
        updateSelectionHighlight();
        updateDetail();
        break;

      case '/':
        e.preventDefault();
        searchInput.focus();
        break;

      case '1':
        e.preventDefault();
        setFilter('backlog');
        break;
      case '2':
        e.preventDefault();
        setFilter('todo');
        break;
      case '3':
        e.preventDefault();
        setFilter('in-progress');
        break;
      case '4':
        e.preventDefault();
        setFilter('done');
        break;

      case '?':
        e.preventDefault();
        // Show shortcuts hint — the shortcuts bar already shows them
        selectionHint.textContent = 'Shortcuts: j/k ↓↑ · Enter ↵ · Esc ✕ · / 🔍 · 1-4 filter';
        break;
    }
  }

  function scrollToSelected() {
    if (selectedIndex < 0) return;
    var items = taskList.querySelectorAll('.catalyst-task-item');
    if (items[selectedIndex]) {
      items[selectedIndex].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  // Expose to window for debugging
  window.__catalyst = {
    tasks: ILLUSTRATIVE_TASKS,
    filtered: function () { return filteredTasks; },
    selected: function () { return selectedIndex >= 0 ? filteredTasks[selectedIndex] : null; }
  };

  init();
})();
