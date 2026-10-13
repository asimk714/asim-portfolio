/**
 * Vesper Live Experience — Local-first workspace demo
 * In-memory demonstration. No backend, no persistence, no real users.
 */
(function () {
  'use strict';

  // Illustrative page data (demonstration only — no real user data)
  var PAGE_TEMPLATES = [
    {
      title: 'Welcome to Vesper',
      blocks: [
        { type: 'heading1', content: 'Welcome to Vesper' },
        { type: 'paragraph', content: 'This is your personal workspace. Pages live in the sidebar. Click any page to open it, or create a new one with the + button.' },
        { type: 'heading2', content: 'Getting started' },
        { type: 'bullet', content: 'Use the sidebar to navigate between pages' },
        { type: 'bullet', content: 'Click + New Page to create a page' },
        { type: 'bullet', content: 'Press Ctrl+K (or Cmd+K) to open the command palette' },
        { type: 'bullet', content: 'Search for pages by title or content' },
        { type: 'heading2', content: 'Block types' },
        { type: 'bullet', content: 'Heading 1, 2, 3 — section titles' },
        { type: 'bullet', content: 'Paragraph — plain text' },
        { type: 'bullet', content: 'Bullet list — unordered items' },
        { type: 'bullet', content: 'Checklist — tick boxes' },
        { type: 'bullet', content: 'Code — monospace block' },
        { type: 'divider', content: '' },
        { type: 'paragraph', content: 'Tip: hover a block and click the + that appears to add a new block below it. Press Enter in a block to create a new paragraph below.' }
      ]
    },
    {
      title: 'Project Notes',
      blocks: [
        { type: 'heading1', content: 'Project Notes' },
        { type: 'paragraph', content: 'A place for project-specific notes, decisions, and references.' },
        { type: 'heading2', content: 'Current priorities' },
        { type: 'bullet', content: 'Finish reading the design spec' },
        { type: 'bullet', content: 'Review the proposal draft' },
        { type: 'bullet', content: 'Schedule team sync for Thursday' },
        { type: 'heading2', content: 'References' },
        { type: 'bullet', content: 'Design guidelines document' },
        { type: 'bullet', content: 'Previous sprint notes' }
      ]
    },
    {
      title: 'Meeting Notes — Sprint Planning',
      blocks: [
        { type: 'heading1', content: 'Meeting Notes — Sprint Planning' },
        { type: 'paragraph', content: 'Date: [to be filled]. Attendees: [to be filled].' },
        { type: 'heading2', content: 'Agenda' },
        { type: 'bullet', content: 'Review last sprint retro' },
        { type: 'bullet', content: 'Set sprint goal' },
        { type: 'bullet', content: 'Assign tasks' },
        { type: 'heading2', content: 'Action items' },
        { type: 'check', content: '[ ] Draft sprint objective' },
        { type: 'check', content: '[ ] Identify top 3 tasks' },
        { type: 'check', content: '[ ] Confirm team availability' }
      ]
    },
    {
      title: 'Code Snippets',
      blocks: [
        { type: 'heading1', content: 'Code Snippets' },
        { type: 'paragraph', content: 'A place to stash useful code snippets and references.' },
        { type: 'heading2', content: 'Python' },
        { type: 'code', content: 'def greet(name):\n    return f"Hello, {name}!"' },
        { type: 'heading2', content: 'SQL' },
        { type: 'code', content: 'SELECT id, title, sort_order FROM pages ORDER BY sort_order ASC;' }
      ]
    }
  ];

  // In-memory state
  var state = {
    pages: [],
    currentPageId: null,
    nextId: 1,
    highlightIndex: -1
  };

  // DOM references
  var sidebarPages = document.getElementById('vesper-sidebar-pages');
  var blocksContainer = document.getElementById('vesper-blocks-container');
  var pageTitleInput = document.getElementById('vesper-page-title');
  var pageCountEl = document.getElementById('vesper-page-count');
  var blockCountEl = document.getElementById('vesper-block-count');
  var autosaveStatus = document.getElementById('vesper-autosave-status');
  var saveIndicator = document.getElementById('vesper-save-indicator');
  var saveText = document.getElementById('vesper-save-text');
  var favoriteBtn = document.getElementById('vesper-favorite-btn');
  var newPageBtn = document.getElementById('vesper-new-page-btn');
  var resetBtn = document.getElementById('vesper-reset-btn');

  // Block type labels
  var BLOCK_LABELS = {
    'heading1': 'H1',
    'heading2': 'H2',
    'heading3': 'H3',
    'paragraph': 'Text',
    'bullet': 'Bullet',
    'check': 'Check',
    'code': 'Code',
    'divider': 'Divider'
  };

  // Block placeholder text
  var BLOCK_PLACEHOLDERS = {
    'heading1': 'Heading 1',
    'heading2': 'Heading 2',
    'heading3': 'Heading 3',
    'paragraph': 'Type something…',
    'bullet': 'List item',
    'check': 'Tick box',
    'code': 'Code here',
    'divider': ''
  };

  // Initialize
  function init() {
    // Seed initial pages
    PAGE_TEMPLATES.forEach(function (tpl) {
      createPage(tpl.title, tpl.blocks, false);
    });

    // Select first page
    if (state.pages.length > 0) {
      selectPage(state.pages[0].id, false);
    }

    // Event listeners
    pageTitleInput.addEventListener('input', function () {
      autosave();
    });

    newPageBtn.addEventListener('click', function () {
      createPage('Untitled', [{ type: 'heading1', content: 'New Page' }, { type: 'paragraph', content: '' }], true);
    });

    resetBtn.addEventListener('click', function () {
      resetDemo();
    });

    // Keyboard: Ctrl+K / Cmd+K for command palette
    document.addEventListener('keydown', function (e) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openCommandPalette();
      }
    });

    renderSidebar();
  }

  // Create a page
  function createPage(title, blocks, select) {
    var page = {
      id: state.nextId++,
      title: title,
      blocks: blocks || [],
      favorite: false
    };
    state.pages.push(page);
    if (select) {
      selectPage(page.id, true);
    }
    renderSidebar();
    updateCounts();
    return page;
  }

  // Select a page
  function selectPage(pageId, scrollSidebar) {
    var page = findPage(pageId);
    if (!page) return;

    state.currentPageId = pageId;
    renderEditor(page);
    renderSidebar();

    if (scrollSidebar) {
      var items = sidebarPages.querySelectorAll('.vesper-sidebar-page');
      items.forEach(function (item) {
        if (item.getAttribute('data-page-id') == pageId) {
          item.scrollIntoView({ block: 'nearest' });
        }
      });
    }
  }

  // Find page by id
  function findPage(pageId) {
    for (var i = 0; i < state.pages.length; i++) {
      if (state.pages[i].id === pageId) return state.pages[i];
    }
    return null;
  }

  // Render sidebar
  function renderSidebar() {
    sidebarPages.innerHTML = '';

    // Sort: favorites first, then by id (insertion order)
    var sorted = state.pages.slice().sort(function (a, b) {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return a.id - b.id;
    });

    sorted.forEach(function (page) {
      var item = document.createElement('div');
      item.className = 'vesper-sidebar-page' + (page.id === state.currentPageId ? ' vesper-sidebar-page--active' : '');
      item.setAttribute('data-page-id', page.id);
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.style.cssText = 'padding: var(--space-2); border-radius: var(--radius-sm); cursor: pointer; display: flex; align-items: center; gap: var(--space-2); transition: background var(--transition-fast); border: 1px solid transparent;';
      if (page.id === state.currentPageId) {
        item.style.background = 'var(--accent-soft)';
        item.style.borderColor = 'var(--accent)';
      }

      var star = document.createElement('span');
      star.style.cssText = 'flex-shrink: 0; display: flex; align-items: center;';
      star.innerHTML = page.favorite
        ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
        : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" stroke-width="2"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

      var titleSpan = document.createElement('span');
      titleSpan.style.cssText = 'flex: 1; font-size: var(--text-sm); color: var(--text-primary); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;';
      titleSpan.textContent = page.title;

      var clickArea = document.createElement('div');
      clickArea.style.cssText = 'display: flex; align-items: center; gap: var(--space-2); width: 100%;';
      clickArea.appendChild(star);
      clickArea.appendChild(titleSpan);

      item.appendChild(clickArea);

      item.addEventListener('click', function () {
        if (page.id !== state.currentPageId) {
          selectPage(page.id, true);
        }
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (page.id !== state.currentPageId) {
            selectPage(page.id, true);
          }
        }
      });

      sidebarPages.appendChild(item);
    });

    updateCounts();
  }

  // Render editor
  function renderEditor(page) {
    if (!page) return;

    pageTitleInput.value = page.title;
    favoriteBtn.querySelector('svg').outerHTML = page.favorite
      ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>'
      : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';

    blocksContainer.innerHTML = '';

    if (page.blocks.length === 0) {
      var emptyMsg = document.createElement('p');
      emptyMsg.style.cssText = 'color: var(--text-muted); font-size: var(--text-sm); padding: var(--space-4); text-align: center;';
      emptyMsg.textContent = 'This page has no blocks yet. Hover over this area and click + to add a block, or press Enter in a block to create a new one.';
      blocksContainer.appendChild(emptyMsg);
      updateCounts();
      return;
    }

    page.blocks.forEach(function (block, index) {
      var blockEl = document.createElement('div');
      blockEl.className = 'vesper-block';
      blockEl.setAttribute('data-block-index', index);

      var typeBadge = document.createElement('span');
      typeBadge.className = 'vesper-block__type-badge';
      typeBadge.textContent = BLOCK_LABELS[block.type] || block.type;

      var actions = document.createElement('div');
      actions.className = 'vesper-block__actions';

      var addBtn = document.createElement('button');
      addBtn.className = 'vesper-block-add-btn';
      addBtn.setAttribute('aria-label', 'Add block below');
      addBtn.innerHTML = '<svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
      addBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        addBlockAfter(index, 'paragraph');
      });

      actions.appendChild(addBtn);

      var contentEl;
      if (block.type === 'divider') {
        contentEl = document.createElement('hr');
        contentEl.style.cssText = 'flex: 1; border: none; border-top: 2px solid var(--border-subtle); margin: var(--space-2) 0;';
      } else {
        contentEl = document.createElement('div');
        contentEl.className = 'vesper-block__content';
        contentEl.contentEditable = 'true';
        contentEl.setAttribute('data-placeholder', BLOCK_PLACEHOLDERS[block.type] || '');
        if (block.type === 'code') {
          contentEl.style.fontFamily = 'var(--font-mono)';
          contentEl.style.background = 'var(--bg-muted)';
          contentEl.style.padding = 'var(--space-2)';
          contentEl.style.borderRadius = 'var(--radius-sm)';
          contentEl.style.border = '1px solid var(--border-subtle)';
          contentEl.style.whiteSpace = 'pre-wrap';
        }
        if (block.type === 'heading1') {
          contentEl.style.fontSize = 'var(--text-xl)';
          contentEl.style.fontWeight = '700';
        } else if (block.type === 'heading2') {
          contentEl.style.fontSize = 'var(--text-lg)';
          contentEl.style.fontWeight = '600';
        } else if (block.type === 'heading3') {
          contentEl.style.fontSize = 'var(--text-base)';
          contentEl.style.fontWeight = '600';
        }
        if (block.type === 'bullet') {
          contentEl.style.paddingLeft = 'var(--space-4)';
          contentEl.textContent = '• ' + (block.content || '');
        } else {
          contentEl.textContent = block.content || '';
        }

        // Save on input
        contentEl.addEventListener('input', function () {
          autosave();
          var page2 = findPage(state.currentPageId);
          if (page2 && page2.blocks[index]) {
            if (block.type === 'bullet') {
              var text = contentEl.textContent.replace(/^•\s*/, '');
              page2.blocks[index].content = text;
            } else {
              page2.blocks[index].content = contentEl.textContent;
            }
          }
          updateCounts();
        });

        // Enter creates new paragraph below
        contentEl.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            addBlockAfter(index, 'paragraph');
          }
        });

        // Blur saves
        contentEl.addEventListener('blur', function () {
          autosave();
          var page2 = findPage(state.currentPageId);
          if (page2 && page2.blocks[index]) {
            if (block.type === 'bullet') {
              var text = contentEl.textContent.replace(/^•\s*/, '');
              page2.blocks[index].content = text;
            } else {
              page2.blocks[index].content = contentEl.textContent;
            }
          }
          updateCounts();
        });
      }

      blockEl.appendChild(typeBadge);
      blockEl.appendChild(contentEl);
      blockEl.appendChild(actions);
      blocksContainer.appendChild(blockEl);
    });

    updateCounts();
  }

  // Add block after a given index
  function addBlockAfter(index, type) {
    var page = findPage(state.currentPageId);
    if (!page) return;

    var newBlock = { type: type || 'paragraph', content: '' };
    page.blocks.splice(index + 1, 0, newBlock);
    renderEditor(page);
    renderSidebar();

    // Focus the new block's content
    var blocks = blocksContainer.querySelectorAll('.vesper-block');
    var newBlockEl = blocks[index + 1];
    if (newBlockEl) {
      var content = newBlockEl.querySelector('.vesper-block__content');
      if (content && content.contentEditable === 'true') {
        // Defer focus to next tick
        setTimeout(function () {
          content.focus();
          // Place cursor at end
          var range = document.createRange();
          var sel = window.getSelection();
          range.selectNodeContents(content);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }, 10);
      }
    }
  }

  // Autosave simulation
  var autosaveTimer = null;
  function autosave() {
    // Show saving indicator briefly
    saveIndicator.style.display = 'inline-flex';
    saveText.textContent = 'Saving…';
    autosaveStatus.textContent = 'Autosave: saving…';

    // Clear any existing timer
    if (autosaveTimer) clearTimeout(autosaveTimer);

    autosaveTimer = setTimeout(function () {
      saveIndicator.style.display = 'none';
      autosaveStatus.textContent = 'Autosave: saved';
      // Update sidebar (page title might have changed)
      renderSidebar();
      updateCounts();

      // Reset status after a moment
      setTimeout(function () {
        if (autosaveStatus.textContent === 'Autosave: saved') {
          autosaveStatus.textContent = 'Autosave: idle';
        }
      }, 2000);
    }, 400);
  }

  // Toggle favorite
  function toggleFavorite() {
    var page = findPage(state.currentPageId);
    if (!page) return;
    page.favorite = !page.favorite;
    renderSidebar();
    // Update favorite button visual
    var star = favoriteBtn.querySelector('svg');
    if (page.favorite) {
      star.outerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="var(--accent)" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    } else {
      star.outerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
    }
    updateCounts();
  }

  favoriteBtn.addEventListener('click', toggleFavorite);

  // Command palette
  function openCommandPalette() {
    var query = prompt('Search pages by title or content:');
    if (!query || query.trim() === '') return;

    query = query.trim().toLowerCase();
    var results = state.pages.filter(function (page) {
      var titleMatch = page.title.toLowerCase().indexOf(query) !== -1;
      var contentMatch = page.blocks.some(function (block) {
        return block.content.toLowerCase().indexOf(query) !== -1;
      });
      return titleMatch || contentMatch;
    });

    if (results.length === 0) {
      alert('No pages match "' + query + '".');
      return;
    }

    if (results.length === 1) {
      selectPage(results[0].id, true);
      return;
    }

    // Multiple results — show a simple list for selection
    var msg = 'Found ' + results.length + ' page(s):\n\n';
    results.forEach(function (page, i) {
      msg += (i + 1) + '. ' + page.title + '\n';
    });
    msg += '\nEnter the number to open, or Close to cancel.';

    var choice = prompt(msg);
    if (choice) {
      var num = parseInt(choice, 10);
      if (!isNaN(num) && num >= 1 && num <= results.length) {
        selectPage(results[num - 1].id, true);
      }
    }
  }

  // Update counts
  function updateCounts() {
    pageCountEl.textContent = state.pages.length + ' page' + (state.pages.length !== 1 ? 's' : '');
    var current = findPage(state.currentPageId);
    blockCountEl.textContent = current ? current.blocks.length : 0;
  }

  // Reset demo
  function resetDemo() {
    state.pages = [];
    state.nextId = 1;
    state.currentPageId = null;
    init();
  }

  // Expose for debugging
  window.__vesper = {
    state: state,
    pages: function () { return state.pages; },
    current: function () { return findPage(state.currentPageId); }
  };

  init();
})();
