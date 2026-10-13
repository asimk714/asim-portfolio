/**
 * Context Engine — Live Experience
 * Concept prototype demo. Illustrative data. No real workspace, no real user data.
 */
(function () {
  'use strict';

  // Illustrative documents (concept demo only — no real workspace data)
  var DOCUMENTS = [
    {
      id: 'doc-1',
      title: 'Q3 Product Strategy Draft',
      type: 'Document',
      project: 'Product Strategy',
      collaborators: ['AL', 'MK', 'JR'],
      lastEdited: '2 hours ago',
      calendarContext: 'No upcoming meeting',
      contextSignals: [
        { label: 'Collaborators', value: 'AL, MK, JR — 3 editors active' },
        { label: 'Recent activity', value: 'Last edited 2 hours ago; 3 revisions today' },
        { label: 'Calendar context', value: 'No meetings in next 2 hours' },
        { label: 'Project', value: 'Product Strategy — Q3 planning thread' }
      ]
    },
    {
      id: 'doc-2',
      title: 'Sprint Retrospective Notes',
      type: 'Document',
      project: 'Engineering',
      collaborators: ['SK', 'TL'],
      lastEdited: 'Yesterday, 4:30pm',
      calendarContext: 'Meeting tomorrow 10am',
      contextSignals: [
        { label: 'Collaborators', value: 'SK, TL — 2 editors' },
        { label: 'Recent activity', value: 'Last edited yesterday; shared in team channel' },
        { label: 'Calendar context', value: 'Sprint retro meeting tomorrow 10am — prepare notes' },
        { label: 'Project', value: 'Engineering — Sprint 14 retrospective' }
      ]
    },
    {
      id: 'doc-3',
      title: 'Customer Interview Synthesis',
      type: 'Document',
      project: 'Research',
      collaborators: ['AM'],
      lastEdited: '3 days ago',
      calendarContext: 'Interview scheduled Friday 2pm',
      contextSignals: [
        { label: 'Collaborators', value: 'AM — 1 editor' },
        { label: 'Recent activity', value: 'Last edited 3 days ago; draft status' },
        { label: 'Calendar context', value: 'Customer interview Friday 2pm — relevant notes attached' },
        { label: 'Project', value: 'Research — Q3 customer interview synthesis' }
      ]
    },
    {
      id: 'doc-4',
      title: 'Budget Planning Spreadsheet',
      type: 'Spreadsheet',
      project: 'Finance',
      collaborators: ['RF', 'AL'],
      lastEdited: '1 day ago',
      calendarContext: 'Budget review meeting this Thursday',
      contextSignals: [
        { label: 'Collaborators', value: 'RF, AL — 2 editors' },
        { label: 'Recent activity', value: 'Last edited 1 day ago; Q3 figures updated' },
        { label: 'Calendar context', value: 'Budget review meeting this Thursday — spreadsheet referenced' },
        { label: 'Project', value: 'Finance — Q3 budget planning' }
      ]
    }
  ];

  // Selected document and context signal state
  var state = {
    selectedDocId: null,
    expandedSignalIndex: null
  };

  // DOM references
  var documentList = document.getElementById('ce-document-list');
  var contextSignals = document.getElementById('ce-context-signals');
  var contextSelectedName = document.getElementById('ce-context-selected-name');
  var editorTextarea = document.getElementById('ce-editor-textarea');
  var editorDisplay = document.getElementById('ce-editor-display');
  var contextSignalCount = document.getElementById('ce-context-signal-count');

  // Initialize
  function init() {
    renderDocumentList();
    updateContextPanel();
    updateEditorPlaceholder();
  }

  // Render document list
  function renderDocumentList() {
    documentList.innerHTML = '';
    DOCUMENTS.forEach(function (doc) {
      var item = document.createElement('div');
      item.className = 'ce-document-item' + (doc.id === state.selectedDocId ? ' ce-document-item--selected' : '');
      item.setAttribute('data-doc-id', doc.id);
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.innerHTML =
        '<span class="ce-document-item__title">' + escapeHtml(doc.title) + '</span>' +
        '<span class="ce-document-item__meta">' +
          '<span>' + doc.type + '</span>' +
          '<span style="color: var(--text-faint);">·</span>' +
          '<span>' + doc.project + '</span>' +
        '</span>';

      item.addEventListener('click', function () {
        selectDocument(doc.id);
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectDocument(doc.id);
        }
      });

      documentList.appendChild(item);
    });
  }

  // Select a document
  function selectDocument(docId) {
    state.selectedDocId = docId;
    state.expandedSignalIndex = null;
    renderDocumentList();
    updateContextPanel();
    updateEditor();
  }

  // Find document by id
  function findDoc(docId) {
    for (var i = 0; i < DOCUMENTS.length; i++) {
      if (DOCUMENTS[i].id === docId) return DOCUMENTS[i];
    }
    return null;
  }

  // Update context panel
  function updateContextPanel() {
    var doc = findDoc(state.selectedDocId);
    if (doc) {
      contextSelectedName.textContent = doc.title;
      contextSignals.innerHTML = '';
      doc.contextSignals.forEach(function (signal, index) {
        var signalEl = document.createElement('div');
        signalEl.className = 'ce-context-signal' + (index === state.expandedSignalIndex ? ' ce-context-signal--expanded' : '');
        signalEl.setAttribute('data-signal-index', index);
        signalEl.innerHTML =
          '<div class="ce-context-signal__label">' + escapeHtml(signal.label) + '</div>' +
          '<div class="ce-context-signal__value">' + escapeHtml(signal.value) + '</div>';
        signalEl.addEventListener('click', function () {
          toggleSignal(index);
        });
        contextSignals.appendChild(signalEl);
      });
      contextSignalCount.textContent = doc.contextSignals.length + ' signals';
    } else {
      contextSelectedName.textContent = 'none';
      contextSignals.innerHTML = '<p style="color: var(--text-muted); font-size: var(--text-xs); padding: var(--space-2);">Select a document to see its context signals.</p>';
      contextSignalCount.textContent = '0 signals';
    }
  }

  // Toggle signal expansion
  function toggleSignal(index) {
    if (state.expandedSignalIndex === index) {
      state.expandedSignalIndex = null;
    } else {
      state.expandedSignalIndex = index;
    }
    updateContextPanel();
  }

  // Update editor
  function updateEditor() {
    var doc = findDoc(state.selectedDocId);
    if (doc) {
      editorDisplay.textContent = doc.title + '\n\n' +
        '(Document content — illustrative only. This is a concept demonstration, not a real document.)';
      editorTextarea.style.display = 'block';
      editorTextarea.value = '';
      editorTextarea.placeholder = 'Edit ' + doc.title + ' content...';
    } else {
      editorDisplay.textContent = '';
      editorTextarea.style.display = 'none';
      editorTextarea.value = '';
    }
  }

  // Update editor placeholder (when no doc selected)
  function updateEditorPlaceholder() {
    if (!state.selectedDocId) {
      editorDisplay.textContent = '';
      editorTextarea.style.display = 'none';
      editorTextarea.value = '';
    }
  }

  // Editor text saving (illustrative — just stores in memory)
  editorTextarea.addEventListener('input', function () {
    var doc = findDoc(state.selectedDocId);
    if (doc) {
      // Store content in document for demo purposes
      doc.editingContent = editorTextarea.value;
    }
  });

  // Escape HTML
  function escapeHtml(text) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
  }

  // Keyboard: Escape deselects
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (state.selectedDocId) {
        state.selectedDocId = null;
        state.expandedSignalIndex = null;
        renderDocumentList();
        updateContextPanel();
        updateEditor();
      }
    }
  });

  // Expose for debugging
  window.__ce = {
    documents: DOCUMENTS,
    state: state,
    selected: function () { return findDoc(state.selectedDocId); }
  };

  init();
})();
