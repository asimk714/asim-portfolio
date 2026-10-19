/**
 * Windows Taskflow — Live Experience
 * Concept prototype demo. Illustrative data. No real OS, no real apps.
 */
(function () {
  'use strict';

  // Available apps in the concept prototype
  var AVAILABLE_APPS = [
    { id: 'chrome', title: 'Google Chrome', icon: '🌐', color: '#4285F4', doc: 'Research tabs open: Q3 budget review, competitor analysis, product roadmap draft.' },
    { id: 'vscode', title: 'VS Code', icon: '💻', color: '#007ACC', doc: 'Open files: PRD-01-taskflow.md, spike-window-state.md, notes-session-recovery.md.' },
    { id: 'excel', title: 'Excel', icon: '📊', color: '#217346', doc: 'Q3 Financial Audit.xlsx — cells C12:F45 active. Pivot table on sheet 2.' },
    { id: 'teams', title: 'Microsoft Teams', icon: '👥', color: '#6264A7', doc: 'Q3 Review channel — 3 unread messages. Meeting scheduled for Thursday 2pm.' },
    { id: 'notion', title: 'Notion', icon: '📝', color: '#000000', doc: 'PRD draft for Taskflow feature — 6 sections, 3 team comments pending.' },
    { id: 'outlook', title: 'Outlook', icon: '✉️', color: '#0078D4', doc: 'Inbox: 4 unread. Flagged: budget approval from finance, tomorrow 10am.' }
  ];

  // Illustrative saved workspaces (concept demo data)
  var ILLUSTRATIVE_WORKSPACES = [
    {
      name: 'Q3 Financial Review',
      apps: ['chrome', 'excel', 'teams'],
      createdAt: 'Today, 9:15am',
      description: 'Chrome research tabs + Excel audit + Teams Q3 channel — the full financial review context.'
    },
    {
      name: 'PRD Writing Session',
      apps: ['vscode', 'notion', 'chrome'],
      createdAt: 'Yesterday, 2:30pm',
      description: 'VS Code PRD draft + Notion team comments + Chrome research — the writing workflow.'
    },
    {
      name: 'Sprint Planning',
      apps: ['teams', 'jira', 'chrome'],
      createdAt: 'Monday, 10am',
      description: 'Teams sprint channel + Jira board + Chrome roadmap — the planning context.'
    }
  ];

  // State
  var state = {
    openApps: {},         // appId -> { x, y, width, height, windowEl }
    savedWorkspaces: [],  // copied from ILLUSTRATIVE_WORKSPACES + any newly saved
    nextWindowId: 1,
    nextWorkspaceId: 4,
    dragTarget: null,
    dragOffset: { x: 0, y: 0 }
  };

  // Copy illustrative workspaces into mutable state
  state.savedWorkspaces = ILLUSTRATIVE_WORKSPACES.map(function (ws) {
    return { id: ws.name.toLowerCase().replace(/\s+/g, '-'), name: ws.name, apps: ws.apps.slice(), createdAt: ws.createdAt, description: ws.description };
  });

  // DOM references
  var windowsContainer = document.getElementById('wt-windows-container');
  var desktopEmpty = document.getElementById('wt-desktop-empty');
  var desktopShortcuts = document.getElementById('wt-desktop-shortcuts');
  var taskbarApps = document.getElementById('wt-taskbar-apps');
  var workspaceNameInput = document.getElementById('wt-workspace-name');
  var saveBtn = document.getElementById('wt-save-workspace-btn');
  var restoreBtn = document.getElementById('wt-restore-workspace-btn');
  var workspaceList = document.getElementById('wt-workspace-list');
  var workspaceEmpty = document.getElementById('wt-workspace-empty');
  var workspaceCount = document.getElementById('wt-workspace-count');
  var clockEl = document.getElementById('wt-clock');
  var saveFeedback = saveBtn.parentElement.querySelector('.wt-save-feedback') || createFeedbackEl('wt-save-feedback', 'wt-save-feedback--visible', 'Workspace saved — ' + new Date().toLocaleTimeString());
  var restoreFeedback = restoreBtn.parentElement.querySelector('.wt-restore-feedback') || createFeedbackEl('wt-restore-feedback', 'wt-restore-feedback--visible', 'Workspace restored — apps arranged');

  // Initialize clock
  function updateClock() {
    var now = new Date();
    var time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (clockEl) clockEl.textContent = time;
  }
  updateClock();
  setInterval(updateClock, 30000);

  // Create a feedback element if not present
  function createFeedbackEl(className, visibleClass, text) {
    var el = document.createElement('div');
    el.className = className + ' wt-save-feedback';
    el.style.cssText = 'margin-top: var(--space-2); padding: var(--space-2) var(--space-3); background: var(--evidence-verified-bg); border: 1px solid var(--evidence-verified-bg); border-radius: var(--radius-sm); font-size: var(--text-xs); color: var(--evidence-verified); display: none;';
    el.textContent = text;
    return el;
  }

  // Render desktop shortcuts
  function renderDesktopShortcuts() {
    if (!desktopShortcuts) return;
    desktopShortcuts.innerHTML = '';
    AVAILABLE_APPS.forEach(function (app) {
      var sc = document.createElement('div');
      sc.className = 'wt-desktop-shortcut';
      sc.setAttribute('data-app', app.id);
      sc.setAttribute('title', 'Launch ' + app.title);
      sc.innerHTML =
        '<div class="wt-shortcut-icon">' + app.icon + '</div>' +
        '<div class="wt-shortcut-label">' + escapeHtml(app.title) + '</div>';
      sc.addEventListener('click', function () {
        toggleApp(app.id);
      });
      desktopShortcuts.appendChild(sc);
    });
  }

  // Render taskbar app buttons
  function renderTaskbar() {
    if (!taskbarApps) return;
    taskbarApps.innerHTML = '';
    AVAILABLE_APPS.forEach(function (app) {
      var btn = document.createElement('button');
      btn.className = 'wt-taskbar-app-btn' + (state.openApps[app.id] ? ' wt-taskbar-app-btn--active' : '');
      btn.innerHTML = '<span>' + app.icon + '</span> <span>' + escapeHtml(app.title) + '</span>';
      btn.setAttribute('data-app', app.id);
      btn.setAttribute('title', app.title + (state.openApps[app.id] ? ' (Running)' : ' (Click to launch)'));
      btn.addEventListener('click', function () {
        toggleApp(app.id);
      });
      taskbarApps.appendChild(btn);
    });
  }

  // Toggle an app open/closed
  function toggleApp(appId) {
    if (state.openApps[appId]) {
      closeApp(appId);
    } else {
      openApp(appId);
    }
    renderTaskbar();
    updateDesktopEmpty();
  }

  // Render rich mock application body content
  function renderAppBody(appId, app) {
    if (appId === 'chrome') {
      return (
        '<div class="wt-app-chrome">' +
          '<div class="wt-chrome-tabs">' +
            '<div class="wt-chrome-tab active">🌐 Azure Portal</div>' +
            '<div class="wt-chrome-tab">Stack Overflow</div>' +
            '<div class="wt-chrome-tab">Q3 Specs</div>' +
          '</div>' +
          '<div class="wt-chrome-url">' +
            '<span style="color:#10b981;font-size:10px;">🔒</span> <span>https://portal.azure.com/#workspaces/review</span>' +
          '</div>' +
          '<div class="wt-chrome-page">' +
            '<div style="font-weight:600;font-size:12px;margin-bottom:6px;color:#fff;">Production Cloud Dashboard</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">' +
              '<div style="background:rgba(255,255,255,0.06);padding:6px;border-radius:4px;font-size:10px;">' +
                '<div style="color:#94a3b8;">Active Clusters</div>' +
                '<div style="font-size:12px;font-weight:700;color:#60a5fa;">8 Healthy</div>' +
              '</div>' +
              '<div style="background:rgba(255,255,255,0.06);padding:6px;border-radius:4px;font-size:10px;">' +
                '<div style="color:#94a3b8;">Taskflow Sync</div>' +
                '<div style="font-size:12px;font-weight:700;color:#10b981;">OneDrive Synced</div>' +
              '</div>' +
            '</div>' +
            '<p style="font-size:10px;color:#94a3b8;margin-top:8px;">Cloud session active. Tabs synchronized across multi-monitor setup.</p>' +
          '</div>' +
        '</div>'
      );
    }
    if (appId === 'vscode') {
      return (
        '<div class="wt-app-vscode">' +
          '<div class="wt-vscode-sidebar">' +
            '<span title="Explorer">📄</span>' +
            '<span title="Search">🔍</span>' +
            '<span title="Git">🌿</span>' +
          '</div>' +
          '<div class="wt-vscode-editor">' +
            '<div style="color:#64748b;margin-bottom:4px;">// taskflow-workspace.ts</div>' +
            '<div><span style="color:#c084fc;">import</span> { Workspace } <span style="color:#c084fc;">from</span> <span style="color:#86efac;">"@windows/shell"</span>;</div>' +
            '<div><span style="color:#c084fc;">const</span> context = <span style="color:#c084fc;">new</span> <span style="color:#fde047;">Workspace</span>(<span style="color:#86efac;">"Q3 Review"</span>);</div>' +
            '<div>context.<span style="color:#60a5fa;">registerApp</span>(<span style="color:#86efac;">"vscode"</span>, { activeFile: <span style="color:#86efac;">"main.ts"</span> });</div>' +
            '<div>context.<span style="color:#60a5fa;">registerApp</span>(<span style="color:#86efac;">"excel"</span>, { sheet: <span style="color:#86efac;">"Audit"</span> });</div>' +
            '<div>context.<span style="color:#60a5fa;">persistToOneDrive</span>(); <span style="color:#64748b;">// &lt;3.5s target</span></div>' +
            '<div style="color:#10b981;margin-top:6px;">✓ State synchronized locally</div>' +
          '</div>' +
        '</div>'
      );
    }
    if (appId === 'excel') {
      return (
        '<div class="wt-app-excel">' +
          '<div class="wt-excel-formula">fx =SUM(B2:E2) * 1.15 [Forecast Q3 Actuals]</div>' +
          '<table class="wt-excel-table">' +
            '<thead>' +
              '<tr><th>Category</th><th>Jul</th><th>Aug</th><th>Sep</th><th>Status</th></tr>' +
            '</thead>' +
            '<tbody>' +
              '<tr><td>ARR Growth</td><td>$142k</td><td>$168k</td><td>$195k</td><td style="color:#10b981;">+37%</td></tr>' +
              '<tr><td>Cloud Infra</td><td>$24k</td><td>$23k</td><td>$25k</td><td style="color:#60a5fa;">Nominal</td></tr>' +
              '<tr><td>Operating Margin</td><td>68%</td><td>71%</td><td>73%</td><td style="color:#10b981;">Target Met</td></tr>' +
            '</tbody>' +
          '</table>' +
        '</div>'
      );
    }
    if (appId === 'teams') {
      return (
        '<div class="wt-app-teams">' +
          '<div style="font-weight:600;color:#fff;font-size:11px;border-bottom:1px solid rgba(255,255,255,0.08);padding-bottom:4px;"># q3-product-launch · 14 members</div>' +
          '<div class="wt-teams-bubble">' +
            '<div style="font-weight:600;color:#c084fc;">Sarah Jenkins <span style="font-size:9px;color:#94a3b8;font-weight:400;">10:14 AM</span></div>' +
            '<div>Taskflow save latency benchmark is tracking at 2.8s on OneDrive API.</div>' +
          '</div>' +
          '<div class="wt-teams-bubble" style="background:rgba(255,255,255,0.04);border-color:rgba(255,255,255,0.1);">' +
            '<div style="font-weight:600;color:#60a5fa;">Asim Kumar (You) <span style="font-size:9px;color:#94a3b8;font-weight:400;">10:16 AM</span></div>' +
            '<div>Confirmed. Context snapshot includes open Chrome research and Excel models.</div>' +
          '</div>' +
        '</div>'
      );
    }
    if (appId === 'notion') {
      return (
        '<div style="padding:10px;display:flex;flex-direction:column;gap:6px;">' +
          '<div style="font-weight:700;color:#fff;font-size:12px;">PRD: Windows Taskflow Native Shell</div>' +
          '<div style="display:flex;gap:4px;">' +
            '<span style="background:rgba(59,130,246,0.2);color:#93c5fd;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:600;">P0 CORE</span>' +
            '<span style="background:rgba(16,185,129,0.2);color:#86efac;padding:2px 6px;border-radius:4px;font-size:9px;font-weight:600;">IN REVIEW</span>' +
          '</div>' +
          '<ul style="margin:4px 0 0;padding-left:16px;font-size:10px;color:#cbd5e1;line-height:1.5;">' +
            '<li>Automatic grouping of concurrent application windows by intent.</li>' +
            '<li>One-click session recovery after OS patch restart.</li>' +
            '<li>Shareable encrypted workspace URI schema.</li>' +
          '</ul>' +
        '</div>'
      );
    }
    // outlook
    return (
      '<div style="padding:8px;font-size:11px;">' +
        '<div style="display:flex;justify-content:space-between;padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.06);">' +
          '<strong>Architecture Review Signed Off</strong><span style="color:#94a3b8;font-size:9px;">09:40 AM</span>' +
        '</div>' +
        '<p style="color:#94a3b8;font-size:10px;margin:6px 0;">From: VP Operating Systems Engineering &lt;exec@microsoft.mock&gt;</p>' +
        '<p style="color:#cbd5e1;font-size:10px;line-height:1.4;">The Taskflow interaction model addresses our highest reported multitasker friction point. Local restoration under 3.5s is approved for prototype benchmarking.</p>' +
      '</div>'
    );
  }

  // Open an app window
  function openApp(appId) {
    if (state.openApps[appId]) return;

    var app = AVAILABLE_APPS.filter(function (a) { return a.id === appId; })[0];
    if (!app) return;

    var winId = state.nextWindowId++;
    var windowEl = document.createElement('div');
    windowEl.className = 'wt-window active';
    windowEl.setAttribute('data-window-id', winId);
    windowEl.setAttribute('data-app-id', appId);

    var containerWidth = windowsContainer ? windowsContainer.offsetWidth : 800;
    var winW = Math.min(440, Math.max(300, containerWidth - 60));
    var winH = 260;
    windowEl.style.width = winW + 'px';
    windowEl.style.height = winH + 'px';

    // Position: staggered placement
    var x = 80 + ((winId - 1) * 35) % Math.max(100, containerWidth - winW - 20);
    var y = 30 + ((winId - 1) * 28) % 180;
    windowEl.style.left = x + 'px';
    windowEl.style.top = y + 'px';

    windowEl.innerHTML =
      '<div class="wt-window-header">' +
        '<div class="wt-window-title-group">' +
          '<span class="wt-window-icon">' + app.icon + '</span>' +
          '<span class="wt-window-title">' + escapeHtml(app.title) + '</span>' +
        '</div>' +
        '<div class="wt-window-controls">' +
          '<button class="wt-win-btn wt-win-min" title="Minimize">−</button>' +
          '<button class="wt-win-btn wt-win-snap" title="Maximize">□</button>' +
          '<button class="wt-win-btn wt-window-close" aria-label="Close ' + escapeHtml(app.title) + '">×</button>' +
        '</div>' +
      '</div>' +
      '<div class="wt-window-body">' +
        renderAppBody(appId, app) +
      '</div>';

    // Window focus on click
    windowEl.addEventListener('mousedown', function () {
      bringToFront(windowEl);
    });

    // Close button handler
    windowEl.querySelector('.wt-window-close').addEventListener('click', function (e) {
      e.stopPropagation();
      closeApp(appId);
      renderTaskbar();
      updateDesktopEmpty();
    });

    // Minimize button
    var minBtn = windowEl.querySelector('.wt-win-min');
    if (minBtn) {
      minBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        closeApp(appId);
        renderTaskbar();
        updateDesktopEmpty();
      });
    }

    // Maximize/Snap button
    var snapBtn = windowEl.querySelector('.wt-win-snap');
    if (snapBtn) {
      snapBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (windowEl.dataset.maximized === 'true') {
          windowEl.style.top = windowEl.dataset.origTop || '40px';
          windowEl.style.left = windowEl.dataset.origLeft || '80px';
          windowEl.style.width = windowEl.dataset.origWidth || '440px';
          windowEl.style.height = windowEl.dataset.origHeight || '260px';
          windowEl.dataset.maximized = 'false';
        } else {
          windowEl.dataset.origTop = windowEl.style.top;
          windowEl.dataset.origLeft = windowEl.style.left;
          windowEl.dataset.origWidth = windowEl.style.width;
          windowEl.dataset.origHeight = windowEl.style.height;
          windowEl.style.top = '10px';
          windowEl.style.left = '10px';
          windowEl.style.width = (windowsContainer.offsetWidth - 20) + 'px';
          windowEl.style.height = (windowsContainer.offsetHeight - 20) + 'px';
          windowEl.dataset.maximized = 'true';
        }
      });
    }

    // Make window draggable
    makeDraggable(windowEl, appId);

    windowsContainer.appendChild(windowEl);
    state.openApps[appId] = { id: winId, appId: appId, el: windowEl };

    bringToFront(windowEl);
    updateDesktopEmpty();
  }

  function bringToFront(el) {
    var allWins = document.querySelectorAll('.wt-window');
    allWins.forEach(function (w) { w.classList.remove('active'); });
    el.classList.add('active');
  }

  // Close an app
  function closeApp(appId) {
    if (!state.openApps[appId]) return;
    var win = state.openApps[appId];
    if (win.el && win.el.parentNode) {
      win.el.parentNode.removeChild(win.el);
    }
    delete state.openApps[appId];
    updateDesktopEmpty();
  }

  // Update empty desktop state visibility
  function updateDesktopEmpty() {
    if (desktopEmpty) {
      desktopEmpty.style.display = Object.keys(state.openApps).length === 0 ? 'flex' : 'none';
    }
  }

  // Make a window draggable
  function makeDraggable(windowEl, appId) {
    var header = windowEl.querySelector('.wt-window-header');
    var isDragging = false;

    header.addEventListener('mousedown', function (e) {
      if (e.target.tagName === 'BUTTON') return;
      isDragging = true;
      state.dragTarget = appId;
      var rect = windowEl.getBoundingClientRect();
      state.dragOffset.x = e.clientX - rect.left;
      state.dragOffset.y = e.clientY - rect.top;
      windowEl.classList.add('dragging');
      e.preventDefault();
    });

    document.addEventListener('mousemove', function (e) {
      if (!isDragging || state.dragTarget === null) return;
      var app = state.openApps[state.dragTarget];
      if (!app || !app.el) return;

      var parentRect = windowsContainer.getBoundingClientRect();
      var x = e.clientX - parentRect.left - state.dragOffset.x;
      var y = e.clientY - parentRect.top - state.dragOffset.y;

      // Constrain to desktop area
      x = Math.max(0, Math.min(x, parentRect.width - 200));
      y = Math.max(0, Math.min(y, parentRect.height - 120));

      app.el.style.left = x + 'px';
      app.el.style.top = y + 'px';
    });

    document.addEventListener('mouseup', function () {
      if (isDragging) {
        isDragging = false;
        if (state.dragTarget !== null) {
          var app = state.openApps[state.dragTarget];
          if (app && app.el) {
            app.el.classList.remove('dragging');
          }
        }
        state.dragTarget = null;
      }
    });
  }

  // Render saved workspaces list
  function renderWorkspaceList() {
    workspaceList.innerHTML = '';
    if (state.savedWorkspaces.length === 0) {
      if (workspaceEmpty) workspaceEmpty.style.display = 'block';
      if (workspaceCount) workspaceCount.textContent = '0 saved';
      return;
    }

    if (workspaceEmpty) workspaceEmpty.style.display = 'none';
    if (workspaceCount) workspaceCount.textContent = state.savedWorkspaces.length + ' saved';

    state.savedWorkspaces.forEach(function (ws) {
      var item = document.createElement('div');
      item.className = 'wt-workspace-item';
      item.style.cssText = 'padding: var(--space-2) var(--space-3); background: var(--bg-muted); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); cursor: pointer; transition: all var(--transition-fast);';
      item.innerHTML =
        '<div style="font-weight: 600; font-size: var(--text-sm); color: var(--text-primary);">' + escapeHtml(ws.name) + '</div>' +
        '<div style="font-size: var(--text-xs); color: var(--text-muted); margin-top: 2px;">' + escapeHtml(ws.description) + '</div>' +
        '<div style="font-size: var(--text-xs); color: var(--text-faint); margin-top: 4px;">Saved: ' + ws.createdAt + ' · ' + ws.apps.length + ' apps</div>';

      item.addEventListener('click', function () {
        restoreWorkspace(ws.id);
      });

      workspaceList.appendChild(item);
    });
  }

  // Save current workspace
  function saveWorkspace() {
    var name = workspaceNameInput.value.trim();
    if (!name) {
      workspaceNameInput.focus();
      workspaceNameInput.style.borderColor = 'var(--color-error)';
      setTimeout(function () {
        workspaceNameInput.style.borderColor = '';
      }, 1500);
      return;
    }

    // Check if a workspace with this name already exists
    var existing = state.savedWorkspaces.filter(function (ws) {
      return ws.name.toLowerCase() === name.toLowerCase();
    });

    var newWs = {
      id: name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      name: name,
      apps: Object.keys(state.openApps).slice(),
      createdAt: new Date().toLocaleString(),
      description: 'Custom workspace — ' + Object.keys(state.openApps).length + ' apps open.'
    };

    // If same name exists, replace it
    if (existing.length > 0) {
      var idx = state.savedWorkspaces.findIndex(function (ws) {
        return ws.name.toLowerCase() === name.toLowerCase();
      });
      state.savedWorkspaces[idx] = newWs;
    } else {
      state.savedWorkspaces.push(newWs);
    }

    renderWorkspaceList();
    workspaceNameInput.value = '';
    showSaveFeedback('Workspace "' + name + '" saved — ' + Object.keys(state.openApps).length + ' apps.');
  }

  // Restore a workspace by id
  function restoreWorkspace(workspaceId) {
    var ws = state.savedWorkspaces.filter(function (w) { return w.id === workspaceId; })[0];
    if (!ws) return;

    // Close all currently open apps
    Object.keys(state.openApps).forEach(function (appId) {
      closeApp(appId);
    });

    // Open the apps in the workspace
    ws.apps.forEach(function (appId) {
      var app = AVAILABLE_APPS.filter(function (a) { return a.id === appId; })[0];
      if (app) openApp(appId);
    });

    renderTaskbar();
    updateDesktopEmpty();
    showRestoreFeedback('Restored "' + ws.name + '" — ' + ws.apps.length + ' apps.');
  }

  // Show save feedback
  function showSaveFeedback(text) {
    // Find or create feedback element near save button
    var container = saveBtn.parentElement;
    var existing = container.querySelector('.wt-save-feedback');
    if (!existing) {
      existing = document.createElement('div');
      existing.className = 'wt-save-feedback wt-save-feedback--visible';
      existing.style.cssText = 'margin-top: var(--space-2); padding: var(--space-2) var(--space-3); background: var(--evidence-verified-bg); border: 1px solid var(--evidence-verified-bg); border-radius: var(--radius-sm); font-size: var(--text-xs); color: var(--evidence-verified);';
      container.appendChild(existing);
    }
    existing.textContent = text;
    existing.style.display = 'block';
    setTimeout(function () {
      existing.style.display = 'none';
    }, 3000);
  }

  // Show restore feedback
  function showRestoreFeedback(text) {
    var container = restoreBtn.parentElement;
    var existing = container.querySelector('.wt-restore-feedback');
    if (!existing) {
      existing = document.createElement('div');
      existing.className = 'wt-restore-feedback wt-restore-feedback--visible';
      existing.style.cssText = 'margin-top: var(--space-2); padding: var(--space-2) var(--space-3); background: var(--evidence-observed-bg); border: 1px solid var(--evidence-observed-bg); border-radius: var(--radius-sm); font-size: var(--text-xs); color: var(--evidence-observed);';
      container.appendChild(existing);
    }
    existing.textContent = text;
    existing.style.display = 'block';
    setTimeout(function () {
      existing.style.display = 'none';
    }, 3000);
  }

  // Event listeners
  saveBtn.addEventListener('click', saveWorkspace);
  restoreBtn.addEventListener('click', function () {
    if (state.savedWorkspaces.length === 0) {
      showRestoreFeedback('No saved workspaces to restore.');
      return;
    }
    // Restore the most recently saved workspace
    var mostRecent = state.savedWorkspaces[state.savedWorkspaces.length - 1];
    restoreWorkspace(mostRecent.id);
  });

  // Keyboard: Escape closes all apps (clear desktop)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !e.target.matches('input, textarea, button')) {
      Object.keys(state.openApps).forEach(function (appId) {
        closeApp(appId);
      });
      renderTaskbar();
      updateDesktopEmpty();
    }
  });

  // Initialize
  renderDesktopShortcuts();
  renderTaskbar();
  renderWorkspaceList();
  updateDesktopEmpty();

  // Expose for debugging
  window.__wt = {
    state: state,
    openApps: function () { return Object.keys(state.openApps); },
    workspaces: function () { return state.savedWorkspaces; }
  };
})();

function escapeHtml(text) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(text));
  return div.innerHTML;
}
