// ==========================================================================
// DECK SLIDES DATA CONFIGURATION
// ==========================================================================
const slidesData = [
  {
    category: "Phase 1: Executive Summary",
    title: "Strategic Product Positioning & Business Models",
    content: `
      <div class="slide-grid-2" style="align-items: stretch; margin-top: 0.5rem;">
        <div style="border-left: 4px solid var(--accent); padding-left: 1.25rem; display: flex; flex-direction: column; justify-content: center;">
          <h3 style="color: var(--accent); margin-top:0;"><i class="fa-solid fa-crosshairs"></i> Core Shell Positioning</h3>
          <p style="font-size: 0.9rem; line-height: 1.4; color: var(--text-primary); margin-bottom: 1.25rem;">Windows 11 represents a critical strategic pivot—modernizing design aesthetics (Fluent materials like Mica) while positioning the OS as an NPU-driven AI orchestrator. However, user adoption is throttled by hardware constraints (TPM 2.0 gates) and usability regressions.</p>
          <h3 style="color: var(--accent);"><i class="fa-solid fa-gem"></i> Unique Selling Proposition (USP)</h3>
          <p style="font-size: 0.9rem; line-height: 1.4; color: var(--text-primary); margin-bottom: 0;">The only desktop operating system integrating legacy Win32 compatibility, absolute hardware choice, complete enterprise security, and state-of-the-art gaming performance (DirectStorage) with a built-in AI assistant.</p>
        </div>
        <div style="background: rgba(0,0,0,0.02); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border-light); display: flex; flex-direction: column; justify-content: center;">
          <h3 style="margin-top:0; font-size: 1rem; color: var(--text-primary);"><i class="fa-solid fa-chart-pie text-accent"></i> Strategic Business Engine</h3>
          <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.75rem;">
            <div style="padding: 0.4rem; border-bottom: 1px solid var(--border-light);">
              <strong style="color: var(--accent); font-size: 0.85rem;">OEM Royalties:</strong> <span style="font-size: 0.8rem; color: var(--text-secondary);">Pre-installed OS licensing per device unit.</span>
            </div>
            <div style="padding: 0.4rem; border-bottom: 1px solid var(--border-light);">
              <strong style="color: var(--accent); font-size: 0.85rem;">Volume Licensing:</strong> <span style="font-size: 0.8rem; color: var(--text-secondary);">Enterprise E3/E5 subscription licensing seats.</span>
            </div>
            <div style="padding: 0.4rem; border-bottom: 1px solid var(--border-light);">
              <strong style="color: var(--accent); font-size: 0.85rem;">Generative AI Upsell:</strong> <span style="font-size: 0.8rem; color: var(--text-secondary);">Copilot Pro integrations driving subscription ARR.</span>
            </div>
            <div style="padding: 0.4rem;">
              <strong style="color: var(--accent); font-size: 0.85rem;">Search / Ads:</strong> <span style="font-size: 0.8rem; color: var(--text-secondary);">MSN Widgets feed and Bing search defaults.</span>
            </div>
          </div>
        </div>
      </div>
    `,
    briefing: {
      what: "An overview of Windows 11's core positioning as an AI-first workspace, its strategic mission to empower users, its Unique Selling Proposition (USP), and its underlying commercial model.",
      why: "Operating systems act as commercial anchors. To analyze Windows 11 effectively, we must trace how its design choices and security boundaries (e.g. TPM 2.0 gates) align with Microsoft's cloud subscription (M365) and search advertising engines."
    },
    qa: [
      {
        q: "Why did we impose strict CPU and TPM 2.0 restrictions?",
        a: "To establish a secure hardware-software baseline. Standardizing TPM 2.0 enables security isolation features (VBS, HVCI) out-of-the-box, protecting enterprises against modern zero-day firmware attacks. The tradeoff is slower adoption."
      }
    ]
  },
  {
    category: "Phase 2: Product Research",
    title: "History, Evolution, & Segment Footprint",
    content: `
      <p style="font-size: 0.9rem; line-height: 1.4; margin-bottom: 1rem; color: var(--text-secondary);">Windows 11 evolved from the utilitarian shell of Windows 10, catalyzed by the hybrid work boom, ARM architecture validation, and Apple Silicon's performance-per-watt efficiency benchmarks. Features split to address distinct user segments:</p>
      <div class="data-table-container">
        <table class="data-table">
          <thead>
            <tr>
              <th>Target Segment</th>
              <th>Primary Jobs-To-Be-Done (JTBD)</th>
              <th>Key Features Used</th>
              <th>Friction Points</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="bold" style="color: var(--accent);">Developers</td>
              <td>"Set up isolated staging and compile code with native Unix-like performance."</td>
              <td>WSL 2, Terminal, Dev Drive</td>
              <td>Windows Defender compile latency, path complexity</td>
            </tr>
            <tr>
              <td class="bold" style="color: var(--accent);">Info Workers</td>
              <td>"Multitask across 10 apps, dock screens without losing window layout states."</td>
              <td>Snap Layouts, Teams, Hello</td>
              <td>Teams audio switching, Bing hijacked Search</td>
            </tr>
            <tr>
              <td class="bold" style="color: var(--accent);">Gamers</td>
              <td>"Squeeze maximum frame rates with absolute hardware driver control."</td>
              <td>AutoHDR, DirectStorage</td>
              <td>Xbox App bugs, focus-stealing notifications</td>
            </tr>
            <tr>
              <td class="bold" style="color: var(--accent);">Accessibility</td>
              <td>"Control the OS completely via speech and high-contrast layouts."</td>
              <td>Voice Access, Live Captions</td>
              <td>Inconsistent layouts in legacy Win32 pages</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    briefing: {
      what: "A summary of how Windows 11 has evolved from Windows 10, paired with an audience matrix detailing specific user segments, their primary Jobs-to-be-Done (JTBD), and feature footprints.",
      why: "Different user cohorts value different OS components. Highlighting that developers value WSL 2 while gamers prioritize DirectStorage shows how Microsoft splits features to address high-friction use cases."
    },
    qa: [
      {
        q: "What is the strategic significance of Windows on ARM?",
        a: "It breaks the x86 monopoly. By optimizing the kernel scheduler for Qualcomm Snapdragon X processors, we achieve macOS-level battery efficiency, opening up the premium thin-and-light laptop segment."
      }
    ]
  },
  {
    category: "Phase 3: Market Analysis",
    title: "Market TAM/SAM/SOM & SWOT Dynamics",
    content: `
      <div class="slide-grid-2" style="margin-top: 0.5rem;">
        <div>
          <h3 style="margin-top:0; color: var(--accent);"><i class="fa-solid fa-chart-line"></i> TAM, SAM, SOM Sizing</h3>
          <p style="font-size: 0.85rem; line-height: 1.4; color: var(--text-primary);">
            • <strong>TAM:</strong> All global personal computing endpoints (~4.5B devices)<br>
            • <strong>SAM:</strong> Active PC desktop install base (~1.6B devices)<br>
            • <strong>SOM:</strong> Upgrade-eligible Windows 11 hardware (~850M devices)
          </p>
          <h3 style="color: var(--accent); margin-top: 1rem;"><i class="fa-solid fa-globe"></i> Desktop OS Market Shares</h3>
          <div class="data-table-container" style="margin-top: 0.4rem;">
            <table class="data-table" style="font-size: 0.75rem;">
              <thead>
                <tr><th>Platform</th><th>Global Desktop Share</th></tr>
              </thead>
              <tbody>
                <tr><td class="bold" style="color: var(--accent);">Windows 10/11</td><td>72.0%</td></tr>
                <tr><td class="bold">macOS</td><td>16.0%</td></tr>
                <tr><td class="bold">Linux / Others</td><td>4.0%</td></tr>
                <tr><td class="bold">ChromeOS</td><td>3.5%</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.02); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <h3 style="margin-top:0; text-align: center; color: var(--text-primary); font-size: 0.95rem;"><i class="fa-solid fa-rectangle-list"></i> SWOT Strategic Matrix</h3>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; margin-top: 0.75rem; font-size: 0.72rem;">
            <div style="background: rgba(16,124,65,0.04); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--success);">
              <strong style="color: var(--success);">STRENGTHS</strong>
              <p style="font-size: 0.68rem; margin-top: 0.2rem; color: var(--text-secondary);">Enterprise AD lock-in, absolute hardware choices, 30-year legacy app compatibility.</p>
            </div>
            <div style="background: rgba(216,59,1,0.04); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--danger);">
              <strong style="color: var(--danger);">WEAKNESSES</strong>
              <p style="font-size: 0.68rem; margin-top: 0.2rem; color: var(--text-secondary);">Dual-UI settings bloat, high memory footprint (4GB RAM idle), telemetry pushback.</p>
            </div>
            <div style="background: rgba(0,120,212,0.04); padding: 0.6rem; border-radius: 6px; border: 1px solid var(--accent);">
              <strong style="color: var(--accent);">OPPORTUNITIES</strong>
              <p style="font-size: 0.68rem; margin-top: 0.2rem; color: var(--text-secondary);">Windows 10 EOL driving device refresh cycles; local NPU-driven AI integrations.</p>
            </div>
            <div style="background: rgba(217,115,0,0.04); padding: 0.6rem; border-radius: 6px; border: 1px solid #d97300;">
              <strong style="color: #d97300;">THREATS</strong>
              <p style="font-size: 0.68rem; margin-top: 0.2rem; color: var(--text-secondary);">macOS ecosystem integration; Valve's Proton layer breaking DirectX gaming dependency.</p>
            </div>
          </div>
        </div>
      </div>
    `,
    briefing: {
      what: "An overview of market sizing metrics (TAM, SAM, SOM), target desktop market shares, and a SWOT strategic matrix detailing key platform forces.",
      why: "A comprehensive market layout establishes context. Identifying that macOS captures 16% share and Linux Proton represents a structural gaming threat explains the urgency of updating usability interfaces."
    },
    qa: [
      {
        q: "What is the primary risk of the Windows 10 End-of-Life transition?",
        a: "User attrition to macOS and ChromeOS. If users are forced to throw away working PCs because of strict CPU requirements, they will reconsider their platform lock-in, boosting Apple sales."
      }
    ]
  },
  {
    category: "Phase 4: User Research & Personas",
    title: "Primary User Personas & Context Drivers",
    content: `
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; height: 320px; margin-top: 0.5rem;">
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border-left: 4px solid var(--accent); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
          <h4 style="margin:0; color: var(--text-primary); font-size: 0.9rem;">Alex Chen | DevOps Engineer</h4>
          <p style="font-size: 0.75rem; line-height: 1.35; color: var(--text-secondary); margin-top: 0.25rem;">Requires compile speed, path safety, and WSL Unix-like shell scripts. Core stress: Antivirus file scanner locking compiler targets, and strict system path length constraints.</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border-left: 4px solid var(--sparkle); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
          <h4 style="margin:0; color: var(--text-primary); font-size: 0.9rem;">Marcus Vance | Esports Gamer</h4>
          <p style="font-size: 0.75rem; line-height: 1.35; color: var(--text-secondary); margin-top: 0.25rem;">Requires raw frame rates, low-level driver access, AutoHDR stability, and direct storage lanes. Core stress: Xbox App login loops and notification alert boxes interrupting full-screen gaming.</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border-left: 4px solid var(--success); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
          <h4 style="margin:0; color: var(--text-primary); font-size: 0.9rem;">Asim Kumar | Corporate Manager</h4>
          <p style="font-size: 0.75rem; line-height: 1.35; color: var(--text-secondary); margin-top: 0.25rem;">Requires calendar snaps, biometric Hello logins, and collaboration integrations. Core stress: Dynamic sound output device changes and friction-heavy default browser resets.</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border-left: 4px solid var(--danger); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light);">
          <h4 style="margin:0; color: var(--text-primary); font-size: 0.9rem;">Eliza Patel | Accessibility Advocate</h4>
          <p style="font-size: 0.75rem; line-height: 1.35; color: var(--text-secondary); margin-top: 0.25rem;">Requires voice commands, high-contrast layouts, and system screen-reader consistency. Core stress: Legacy diagnostic UI panels missing support for modern UI scaling filters.</p>
        </div>
      </div>
    `,
    briefing: {
      what: "An overview of primary user personas (Developer, Gamer, Manager, Accessibility Advocate) mapping their workflows and stress triggers.",
      why: "Good software aligns with user profiles. Tracing specific stress triggers like compilation lockups or dynamic audio resets provides concrete, context-aware design constraints."
    },
    qa: [
      {
        q: "Why is Asim Kumar's name updated in the persona profile?",
        a: "To ensure alignment with key enterprise user roles. Asim represents the classic corporate user demanding high reliability and seamless snap docking."
      }
    ]
  },
  {
    category: "Phase 5: Customer Journey Mapping",
    title: "Horizontal Customer Journey Friction Pipeline",
    content: `
      <p style="font-size:0.85rem; color:var(--text-secondary); margin-bottom: 0.5rem;">A step-by-step pipeline mapping friction gates across user onboarding, setup, configuration, and maintenance:</p>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; align-items: stretch; margin-top: 0.5rem;">
        <div style="background: rgba(0,0,0,0.01); border-radius: 8px; border: 1px solid var(--border-light); overflow: hidden; display: flex; flex-direction: column;">
          <div style="background: var(--accent); color: white; padding: 0.4rem; text-align: center; font-weight: bold; font-size: 0.78rem;">1. OOBE SETUP</div>
          <div style="padding: 0.75rem; font-size: 0.75rem; color: var(--text-secondary); flex-grow: 1; line-height:1.3;">Required cloud internet & Microsoft accounts create high onboarding drop-offs for privacy users. Requires command line bypasses (OOBE\\BYPASSNRO).</div>
        </div>
        <div style="background: rgba(0,0,0,0.01); border-radius: 8px; border: 1px solid var(--border-light); overflow: hidden; display: flex; flex-direction: column;">
          <div style="background: var(--sparkle); color: white; padding: 0.4rem; text-align: center; font-weight: bold; font-size: 0.78rem;">2. IMPRESSIONS</div>
          <div style="padding: 0.75rem; font-size: 0.75rem; color: var(--text-secondary); flex-grow: 1; line-height:1.3;">Compacted Taskbar layout feels minimal, but default app selection blocks and system search browser hijacks add severe configuration friction.</div>
        </div>
        <div style="background: rgba(0,0,0,0.01); border-radius: 8px; border: 1px solid var(--border-light); overflow: hidden; display: flex; flex-direction: column;">
          <div style="background: var(--success); color: white; padding: 0.4rem; text-align: center; font-weight: bold; font-size: 0.78rem;">3. RETENTION</div>
          <div style="padding: 0.75rem; font-size: 0.75rem; color: var(--text-secondary); flex-grow: 1; line-height:1.3;">Snap coordinates lock users in, boosting workflow retention. However, heavy Explorer directory thread locks and widgets spam break active focus.</div>
        </div>
        <div style="background: rgba(0,0,0,0.01); border-radius: 8px; border: 1px solid var(--border-light); overflow: hidden; display: flex; flex-direction: column;">
          <div style="background: var(--danger); color: white; padding: 0.4rem; text-align: center; font-weight: bold; font-size: 0.78rem;">4. UPDATES</div>
          <div style="padding: 0.75rem; font-size: 0.75rem; color: var(--text-secondary); flex-grow: 1; line-height:1.3;">Unpredictable automatic system update loops force reboots, destroying active developer WSL compiler states and database servers.</div>
        </div>
      </div>
    `,
    briefing: {
      what: "A horizontal customer journey map detailing friction points across setup, configuration, configuration changes, and system update loops.",
      why: "A pipeline visualization highlights core friction clusters. Demonstrating that update cycles disrupt developer compile states shows the need for persistent shell workspaces."
    },
    qa: [
      {
        q: "What command bypasses the forced internet connection step?",
        a: "Executing OOBE\\BYPASSNRO in the cmd prompt during initial setup skips connection checks and permits local account creation."
      }
    ]
  },
  {
    category: "Phase 6: Feature Teardown",
    title: "Evaluating Core Features & Legacy Inconsistencies",
    content: `
      <div style="display: flex; flex-direction: column; gap: 0.45rem; margin-top: 0.25rem;">
        <div style="background: rgba(0,0,0,0.01); padding: 0.5rem 0.75rem; border-radius: 6px; border-left: 3px solid var(--accent); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); display: grid; grid-template-columns: 180px 1fr; gap: 1rem; align-items: center;">
          <strong style="color: var(--text-primary); font-size: 0.82rem;">Pinned Start Menu:</strong>
          <span style="font-size: 0.78rem; color: var(--text-secondary); line-height:1.3;">Simplified grid layout provides fast launches but lacks directory grouping structures, leading to organization fatigue.</span>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.5rem 0.75rem; border-radius: 6px; border-left: 3px solid var(--success); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); display: grid; grid-template-columns: 180px 1fr; gap: 1rem; align-items: center;">
          <strong style="color: var(--text-primary); font-size: 0.82rem;">Snap Layouts & Groups:</strong>
          <span style="font-size: 0.78rem; color: var(--text-secondary); line-height:1.3;">Industry-standard window coordinator. Snap groups persist coordinates in the taskbar, boosting daily retention metrics.</span>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.5rem 0.75rem; border-radius: 6px; border-left: 3px solid var(--sparkle); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); display: grid; grid-template-columns: 180px 1fr; gap: 1rem; align-items: center;">
          <strong style="color: var(--text-primary); font-size: 0.82rem;">File Explorer Latency:</strong>
          <span style="font-size: 0.78rem; color: var(--text-secondary); line-height:1.3;">Double rendering processes and directory metadata thread lockups cause visual stuttering during heavy tab usage.</span>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.5rem 0.75rem; border-radius: 6px; border-left: 3px solid var(--accent); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); display: grid; grid-template-columns: 180px 1fr; gap: 1rem; align-items: center;">
          <strong style="color: var(--text-primary); font-size: 0.82rem;">Microsoft Copilot:</strong>
          <span style="font-size: 0.78rem; color: var(--text-secondary); line-height:1.3;">Direct shell-level generative AI sidecar handles system states, but network latency stalls rapid user adoption rates.</span>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.5rem 0.75rem; border-radius: 6px; border-left: 3px solid var(--danger); border-top: 1px solid var(--border-light); border-right: 1px solid var(--border-light); border-bottom: 1px solid var(--border-light); display: grid; grid-template-columns: 180px 1fr; gap: 1rem; align-items: center;">
          <strong style="color: var(--text-primary); font-size: 0.82rem;">Settings vs Control Panel:</strong>
          <span style="font-size: 0.78rem; color: var(--text-secondary); line-height:1.3;">Coexistence of Mica settings panels and classic Win32 dialogs breaks visual consistency and search index paths.</span>
        </div>
      </div>
    `,
    briefing: {
      what: "A functional evaluation of primary OS components, noting user interaction successes and design fragmentation constraints.",
      why: "A detailed breakdown guides UI prioritization. Demonstrating how legacy menus clash with modern Settings grids supports our case for consistent shell designs."
    },
    qa: [
      {
        q: "What triggers the File Explorer metadata thread lag?",
        a: "Opening folders containing large zip files or unindexed content prompts background directory read loops, temporarily locking the active Explorer tab."
      }
    ]
  },
  {
    category: "Phase 7: UI/UX Review & Usability Heuristics",
    title: "Nielsen's Usability Heuristics Audit Scorecard",
    content: `
      <div class="slide-grid-2" style="margin-top: 0.5rem;">
        <div class="data-table-container">
          <table class="data-table" style="font-size: 0.75rem;">
            <thead>
              <tr><th>Heuristic</th><th>Score</th><th>Identified Shell Defect</th></tr>
            </thead>
            <tbody>
              <tr><td class="bold">Consistency</td><td class="bold" style="color: var(--danger);">3/10</td><td>Registry, Control Panel, and settings UI span 3 decades.</td></tr>
              <tr><td class="bold">User Control</td><td class="bold" style="color: var(--danger);">4/10</td><td>Forced update reboot loops; taskbar position coordinates locked.</td></tr>
              <tr><td class="bold">System Match</td><td class="bold" style="color: var(--accent);">7/10</td><td>Simplified right-click menu forces double clicks for path targets.</td></tr>
              <tr><td class="bold">Error Recovery</td><td class="bold" style="color: var(--danger);">4/10</td><td>Vague hex error logs (0x8007) lack troubleshooting guidance.</td></tr>
            </tbody>
          </table>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light); display: flex; flex-direction: column; gap: 0.5rem;">
          <h4 style="margin-top:0; color: var(--accent); font-size:0.9rem;"><i class="fa-solid fa-triangle-exclamation"></i> Critical Usability Highlights</h4>
          <div style="font-size: 0.75rem; line-height: 1.35; color: var(--text-secondary);">
            <strong style="color: var(--text-primary);">MSN Clickbait Widget Feed:</strong> Ad integrations inside the widgets board degrade professional workstation positioning.<br><br>
            <strong style="color: var(--text-primary);">File Explorer Threadlocks:</strong> Dual-rendering folder loops and catalog lockups block directory navigation.<br><br>
            <strong style="color: var(--text-primary);">Dynamic Lighting Fragmentation:</strong> Built-in lighting ignores major gaming RGB mouse/keyboard parameters, requiring third-party bloatware.
          </div>
        </div>
      </div>
    `,
    briefing: {
      what: "A usability scorecard applying Nielsen's heuristics to Windows 11 shell experiences.",
      why: "Evaluating elements via formal UX systems keeps feedback objective. Highlighted consistency deficits strengthen the rationale for building standardized workspaces."
    },
    qa: [
      {
        q: "Why is the widgets panel showing MSN ads?",
        a: "To capture search and ad impressions. Integrating ad engines directly inside utility workspaces generates incremental revenue at the cost of desktop positioning quality."
      }
    ]
  },
  {
    category: "Phase 8: Competitor Analysis",
    title: "Competitor Benchmark Matrix & Gaps Analysis",
    content: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-top: 0.5rem; align-items: stretch;">
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-light); display: flex; flex-direction: column;">
          <h4 style="margin-top:0; color: var(--accent); border-bottom: 2px solid var(--accent); padding-bottom: 0.25rem; font-size:0.85rem;"><i class="fa-brands fa-apple"></i> macOS (Apple)</h4>
          <p style="font-weight: bold; font-size: 0.75rem; margin: 0.4rem 0 0.2rem 0; color: var(--text-primary);">Design & Coherence</p>
          <p style="font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Seamless system-wide UI matching, 1-click Time Machine backup snapshot registers, instant Spotlight file indexing, and Metal hardware acceleration. Windows counters with legacy compatibility and gaming.</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--danger); display: flex; flex-direction: column;">
          <h4 style="margin-top:0; color: var(--danger); border-bottom: 2px solid var(--danger); padding-bottom: 0.25rem; font-size:0.85rem;"><i class="fa-brands fa-linux"></i> Linux (Valve Proton)</h4>
          <p style="font-weight: bold; font-size: 0.75rem; margin: 0.4rem 0 0.2rem 0; color: var(--text-primary);">Gaming & Compiling</p>
          <p style="font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Valve's Proton translation layer runs Windows DirectX targets on Linux without overhead. Zero user telemetry collection and complete kernel-level customization. Windows counters with driver support and WSL.</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--success); display: flex; flex-direction: column;">
          <h4 style="margin-top:0; color: var(--success); border-bottom: 2px solid var(--success); padding-bottom: 0.25rem; font-size:0.85rem;"><i class="fa-brands fa-chrome"></i> ChromeOS (Google)</h4>
          <p style="font-weight: bold; font-size: 0.75rem; margin: 0.4rem 0 0.2rem 0; color: var(--text-primary);">Cloud Computing</p>
          <p style="font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Cloud-native, read-only system boundaries requiring zero offline patch maintenance. Runs instantly on low-cost devices, eliminating registry corruption drop-offs. Windows counters with local app engines.</p>
        </div>
      </div>
    `,
    briefing: {
      what: "A competitive evaluation mapping macOS, Linux Proton, and ChromeOS strengths against Windows 11's core value propositions.",
      why: "Understanding adjacent platform benefits highlights where Windows is vulnerable. Apple's clean architecture and Linux's zero-overhead gaming show key areas where Windows needs modernization."
    },
    qa: [
      {
        q: "How does Valve's Proton challenge Windows gaming dominance?",
        a: "By translating DirectX calls to Vulkan APIs in real-time, allowing Linux devices like Steam Deck to run heavy Windows gaming titles without needing Windows licenses."
      }
    ]
  },
  {
    category: "Phase 9: Identify Product Gaps",
    title: "15 Core Gaps vs. Competitive Benchmarks",
    content: `
      <div class="data-table-container" style="margin-top:0.5rem;">
        <table class="data-table" style="font-size: 0.72rem;">
          <thead>
            <tr>
              <th>Identified Gap</th>
              <th>Root Cause</th>
              <th>macOS Benchmark</th>
              <th>Business Impact</th>
              <th>Priority</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="bold">No System-wide Backup</td>
              <td>OneDrive focus ignores complete app configuration registers.</td>
              <td class="bold">Time Machine (1-click snapshot)</td>
              <td>Friction-heavy device switches</td>
              <td><span style="background: rgba(16,124,65,0.1); color: var(--success); padding: 2px 6px; border-radius: 3px; font-weight: bold;">High</span></td>
            </tr>
            <tr>
              <td class="bold">Search Relevance</td>
              <td>Search indexing splits local with Bing ad engines.</td>
              <td class="bold">Spotlight (Instant local lookup)</td>
              <td>Severely lags local document recovery</td>
              <td><span style="background: rgba(220,38,38,0.1); color: var(--danger); padding: 2px 6px; border-radius: 3px; font-weight: bold;">Critical</span></td>
            </tr>
            <tr>
              <td class="bold">Inconsistent Dark Mode</td>
              <td>Legacy Win32 console screens hardcode assets.</td>
              <td class="bold">System-wide dark coverage</td>
              <td>Blinding white flashes degrade layout feel</td>
              <td><span style="background: rgba(16,124,65,0.1); color: var(--success); padding: 2px 6px; border-radius: 3px; font-weight: bold;">High</span></td>
            </tr>
            <tr>
              <td class="bold">Desktop Isolation</td>
              <td>Process variables restrict separate task threads.</td>
              <td class="bold">Spaces (Unique bounds & grids)</td>
              <td>Blocks structured developer task organization</td>
              <td><span style="background: rgba(0,120,212,0.1); color: var(--accent); padding: 2px 6px; border-radius: 3px; font-weight: bold;">Medium</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    briefing: {
      what: "A competitive analysis mapping core gaps, root causes, macOS benchmarks, and business impacts.",
      why: "A comprehensive table details system vulnerabilities. Spotting that local search splits resources with web ad queries explains why files are hard to find."
    },
    qa: [
      {
        q: "Why is search relevance degraded in Windows 11?",
        a: "Because search indexes query web advertisement engines simultaneously, prioritizing Bing web suggestions over local folder directories."
      }
    ]
  },
  {
    category: "Phase 10: New Product Feature: Windows Taskflow",
    title: "Proposed Feature: Context-Aware Workspaces",
    content: `
      <div class="slide-grid-2" style="margin-top:0.5rem;">
        <div>
          <h3 style="margin-top:0; color: var(--accent);"><i class="fa-solid fa-network-wired"></i> Taskflow Capabilities</h3>
          <ul style="font-size: 0.8rem; line-height: 1.45; color: var(--text-body); padding-left: 1.2rem;">
            <li><strong>Snapshot Engine:</strong> Save app states, window positions, folder directories, and web tabs simultaneously.</li>
            <li><strong>OneDrive Sync:</strong> Metadata syncs across Azure cloud active directory seats instantly.</li>
            <li><strong>Workspace Links:</strong> custom <code>taskflow://</code> sharing links launch exact staging environments in 3 seconds.</li>
          </ul>
          <div class="launch-prototype-link" style="margin-top: 1rem; display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 1rem; background: var(--accent); color: white; border-radius: 5px; font-weight: bold; cursor: pointer; font-size: 0.8rem;">
            <i class="fa-solid fa-desktop"></i> Launch Live Interactive Prototype
          </div>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light); display: flex; flex-direction: column; justify-content: space-between;">
          <div>
            <h4 style="margin-top:0; color: var(--accent); font-size: 0.85rem;"><i class="fa-solid fa-quote-left"></i> Jobs-To-Be-Done (JTBD)</h4>
            <p style="font-style: italic; font-size: 0.78rem; line-height: 1.35; color: var(--text-secondary); margin-top: 0.4rem;">"When I am switching projects, I want to load all related documents, apps, and browser tabs, so that I can resume deep work without manual assembly."</p>
          </div>
          <div style="border-top: 1px solid var(--border-light); padding-top: 0.5rem; margin-top: 0.5rem; font-size: 0.75rem; color: var(--text-secondary);">
            <strong>RICE Score:</strong> <span style="color: var(--accent); font-weight: bold;">6.0</span> | <strong>Kano:</strong> Linear Delighter
          </div>
        </div>
      </div>
    `,
    briefing: {
      what: "Introduction of Windows Taskflow, a native shell extension to group, persist, and synchronize window layout coordinates.",
      why: "Solving layout persistence addresses user multitasking friction. Introducing shared workspace URLs creates zero-acquisition-cost growth loops."
    },
    qa: [
      {
        q: "Does Taskflow support restoring web browser states?",
        a: "Yes, by integrating lightweight shell hooks that request the active tab URL parameters from Chrome and Edge APIs, restoring them alongside desktop apps."
      }
    ]
  },
  {
    category: "Phase 11: User Stories",
    title: "Taskflow User Stories & Gherkin Specs",
    content: `
      <div class="slide-grid-2" style="margin-top:0.5rem;">
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <h4 style="margin-top:0; color: var(--accent); font-size:0.85rem;"><i class="fa-solid fa-code"></i> Developer: Save State</h4>
          <p style="font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 0.4rem;">"As a busy developer, I want the OS to save active coding app coordinates, so that I can switch projects instantly."</p>
          <pre style="font-family: Consolas, monospace; font-size: 0.65rem; background: rgba(0,0,0,0.03); padding: 0.4rem; border-radius: 4px; color: var(--text-body); margin: 0; white-space: pre-wrap;">Given I have 3 open windows (VS Code, Chrome, Teams),
When I click the 'Save' icon on Taskbar,
Then the OS saves these coordinates,
And minimizes all windows to clear the canvas.</pre>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--border-light);">
          <h4 style="margin-top:0; color: var(--accent); font-size:0.85rem;"><i class="fa-solid fa-share-nodes"></i> Manager: Share Workspace</h4>
          <p style="font-size: 0.72rem; color: var(--text-secondary); margin-bottom: 0.4rem;">"As a manager, I want to email a direct workspace link to a teammate, so that they can view the identical files in 3 seconds."</p>
          <pre style="font-family: Consolas, monospace; font-size: 0.65rem; background: rgba(0,0,0,0.03); padding: 0.4rem; border-radius: 4px; color: var(--text-body); margin: 0; white-space: pre-wrap;">Given I select a workspace and click 'Share',
When the system copies taskflow://share/spec-12,
And my teammate clicks this link on another PC,
Then the teammate's OS downloads files,
And launches the windows in saved coordinates.</pre>
        </div>
      </div>
    `,
    briefing: {
      what: "Formal Gherkin acceptance criteria mapped to development and management customer cohorts.",
      why: "Gherkin user stories clarify engineering deliverables. Highlighting inputs (click event) and outputs (restored coords) aligns engineering with product objectives."
    },
    qa: [
      {
        q: "What security measures govern shared workspace links?",
        a: "Shared links represent encrypted metadata envelopes. Active Directory security parameters authenticate users before files or local application configurations load."
      }
    ]
  },
  {
    category: "Phase 12: Flow Diagrams",
    title: "System Decision Logic Flow & Recovery Schema",
    content: `
      <p style="font-size:0.82rem; color:var(--text-secondary); margin-bottom: 0.5rem;">The underlying software decision path for loading, validating, and displaying workspaces:</p>
      <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; align-items: stretch; margin-top: 0.5rem;">
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--accent); position: relative; display: flex; flex-direction: column; justify-content: center; text-align: center;">
          <strong style="color: var(--accent); font-size: 0.82rem;">1. SQLite Scan</strong>
          <p style="font-size: 0.7rem; margin-top: 0.35rem; color: var(--text-secondary); line-height:1.2;">Scans local SQLite database register for coordinates JSON.</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--sparkle); position: relative; display: flex; flex-direction: column; justify-content: center; text-align: center;">
          <strong style="color: var(--sparkle); font-size: 0.82rem;">2. Path Check</strong>
          <p style="font-size: 0.7rem; margin-top: 0.35rem; color: var(--text-secondary); line-height:1.2;">Distinguishes local paths from cloud OneDrive files.</p>
          <div style="position: absolute; left: -10px; top: 40%; font-size: 1rem; color: var(--accent); font-weight: bold;">➔</div>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--success); position: relative; display: flex; flex-direction: column; justify-content: center; text-align: center;">
          <strong style="color: var(--success); font-size: 0.82rem;">3. Auth Verify</strong>
          <p style="font-size: 0.7rem; margin-top: 0.35rem; color: var(--text-secondary); line-height:1.2;">Resolves Active Directory tokens for secure resources.</p>
          <div style="position: absolute; left: -10px; top: 40%; font-size: 1rem; color: var(--sparkle); font-weight: bold;">➔</div>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 0.75rem; border-radius: 8px; border: 1px solid var(--danger); position: relative; display: flex; flex-direction: column; justify-content: center; text-align: center;">
          <strong style="color: var(--danger); font-size: 0.82rem;">4. Win32 Positioning</strong>
          <p style="font-size: 0.7rem; margin-top: 0.35rem; color: var(--text-secondary); line-height:1.2;">Triggers Win32 coordinate APIs to restore layout dimensions.</p>
          <div style="position: absolute; left: -10px; top: 40%; font-size: 1rem; color: var(--success); font-weight: bold;">➔</div>
        </div>
      </div>
    `,
    briefing: {
      what: "A logic flow diagram tracing workspace loads, authentication validation, and window coordinate setting steps.",
      why: "A logical flow highlights runtime risks. Detailing security and local/cloud path checks shows proper architectural due diligence."
    },
    qa: [
      {
        q: "What happens if a workspace application coordinate load fails?",
        a: "The system logs the exception details, bypasses the locked coordinates, and launches the app in default window states to prevent shell crashes."
      }
    ]
  },
  {
    category: "Phase 13: Wireframe Specifications",
    title: "Low-Fidelity Wireframes & Flyout UI specs",
    content: `
      <div class="slide-grid-2" style="margin-top:0.5rem; align-items: center;">
        <div style="background: #11131a; padding: 1rem; border-radius: 8px; border: 1px solid var(--accent); box-shadow: 0 4px 12px rgba(0,0,0,0.5); font-family: 'Segoe UI', sans-serif;">
          <div style="color: #fff; font-size: 0.75rem; font-weight: bold; margin-bottom: 0.4rem;"><i class="fa-solid fa-window-restore text-accent"></i> Taskbar Active Workspaces</div>
          <div style="background: #1c212c; padding: 0.3rem 0.4rem; border-radius: 4px; font-size: 0.7rem; color: #a0aec0; border: 1px solid var(--border-light); margin-bottom: 0.6rem;">
            🔍 Search active projects...
          </div>
          <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.7rem;">
            <div style="background: #1e293b; padding: 0.35rem; border-radius: 4px; border-left: 3px solid var(--success); display: flex; justify-content: space-between; color: white;">
              <strong>Active: Coding Stack</strong> <span style="color: var(--accent); cursor: pointer;">[Share]</span>
            </div>
            <div style="background: #1a202c; padding: 0.35rem; border-radius: 4px; color: #cbd5e0; display: flex; justify-content: space-between;">
              <span>Audit Specs Team</span> <span style="color: var(--text-muted);">[Share]</span>
            </div>
            <div style="background: #1a202c; padding: 0.35rem; border-radius: 4px; color: #cbd5e0; display: flex; justify-content: space-between;">
              <span>Figma Prototype Board</span> <span style="color: var(--text-muted);">[Share]</span>
            </div>
          </div>
          <div style="margin-top: 0.6rem; text-align: center; background: var(--accent); color: white; font-weight: bold; padding: 0.35rem; border-radius: 4px; font-size: 0.7rem;">
            + Create New Workspace
          </div>
        </div>
        <div>
          <h3 style="margin-top:0; color: var(--accent); font-size:0.95rem;"><i class="fa-solid fa-circle-nodes"></i> Wireframe Layout Decisions</h3>
          <ul style="font-size: 0.8rem; line-height: 1.45; color: var(--text-body); padding-left: 1.2rem;">
            <li><strong>Taskbar Dock:</strong> Sits directly above the system taskbar launcher to minimize mouse transit times.</li>
            <li><strong>Inline Sharing:</strong> Action anchors placed directly on workspace row cards to speed up collaboration.</li>
            <li><strong>Incremental Search:</strong> Top filtering text box dynamically narrows matching templates as you type.</li>
          </ul>
        </div>
      </div>
    `,
    briefing: {
      what: "An interactive mock wireframe panel alongside layout justification notes for the Taskflow interface.",
      why: "A wireframe matches layout targets with system states. Placing search options at the top is standard UX practice to minimize selection strain."
    },
    qa: [
      {
        q: "What is the targeted width constraint for the Taskflow flyout?",
        a: "It is locked to 350px wide to fit cleanly beside the Windows Start Menu and Widgets dashboards without overlap conflict."
      }
    ]
  },
  {
    category: "Phase 14: High-Fidelity Prototype Specification",
    title: "Interactive Virtual Prototype Simulator",
    content: `
      <div class="slide-grid-2" style="align-items: center; margin-top:0.5rem;">
        <div>
          <h3 style="margin-top:0; color: var(--accent); font-size:0.95rem;"><i class="fa-solid fa-circle-check"></i> High Fidelity Prototype Details</h3>
          <p style="font-size: 0.8rem; line-height: 1.4; color: var(--text-body); margin-bottom: 0.75rem;">We have built a fully functional simulator inside the main web dashboard. Switch tabs to test key Taskflow integrations:</p>
          <ul style="font-size: 0.78rem; line-height: 1.45; color: var(--text-body); padding-left: 1.2rem;">
            <li><strong>Multitasking Canvas:</strong> Drag, snap, layered mock applications.</li>
            <li><strong>Orchestrator:</strong> Swap between 5 predefined workspace templates.</li>
            <li><strong>Search Pill:</strong> Real-time keypress filtering of resources.</li>
          </ul>
        </div>
        <div style="text-align: center;">
          <div class="launch-prototype-link" style="border: 2px solid var(--accent); padding: 1.25rem; border-radius: 8px; background: rgba(0,0,0,0.01); cursor: pointer; display: inline-block;">
            <i class="fa-solid fa-desktop" style="font-size: 2.2rem; color: var(--accent); margin-bottom: 0.5rem;"></i>
            <h4 style="margin: 0 0 0.35rem 0; color: var(--text-primary); font-size: 0.9rem;">Interactive Staging Sandbox</h4>
            <span style="font-size: 0.78rem; color: var(--accent); font-weight: bold;">👉 Click to Boot Live Simulator</span>
          </div>
        </div>
      </div>
    `,
    briefing: {
      what: "A link card routing the user to the live, high-fidelity interactive browser simulator.",
      why: "A functional mockup proves implementation feasibility. Letting users drag, layer, and launch layouts proves the viability of snap group workspaces."
    },
    qa: [
      {
        q: "What technology stack supports this interactive simulation?",
        a: "HTML5 drag-and-drop APIs, custom CSS absolute coordinate mappings, and JavaScript event loops mimicking desktop system processes."
      }
    ]
  },
  {
    category: "Phase 15: Product Metrics & HEART Framework",
    title: "HEART Framework & The North Star",
    content: `
      <div class="slide-grid-2" style="margin-top: 0.5rem;">
        <div style="background: rgba(0,0,0,0.01); padding: 1rem; border-radius: 8px; border: 1.5px solid var(--accent); display: flex; flex-direction: column; justify-content: center;">
          <span style="font-size: 0.72rem; font-weight: bold; color: var(--text-muted); text-transform: uppercase;">North Star Metric (NSM)</span>
          <h3 style="font-size: 1.35rem; color: var(--accent); font-weight: bold; margin: 0.4rem 0;">Active Productive Hours (APH / MAU)</h3>
          <p style="font-size: 0.75rem; line-height: 1.35; color: var(--text-secondary); margin-top: 0.2,px;">Tracks total cumulative duration users interact with active applications inside saved Taskflow workspaces. Measures true engagement value.</p>
        </div>
        <div class="data-table-container">
          <table class="data-table" style="font-size: 0.75rem;">
            <thead>
              <tr><th>HEART</th><th>Telemetry Signal</th><th>Year 1 Goal</th></tr>
            </thead>
            <tbody>
              <tr><td class="bold">Happiness</td><td>Feedback Hub reports</td><td>Feature NPS &gt; 45</td></tr>
              <tr><td class="bold">Engagement</td><td>Workspace switches</td><td>Avg 6.2 switches / user / day</td></tr>
              <tr><td class="bold">Adoption</td><td>First-time loads</td><td>20% Windows MAU</td></tr>
              <tr><td class="bold">Retention</td><td>Returning cohort grids</td><td>45% Week 4 return</td></tr>
              <tr><td class="bold">Task Success</td><td>Zero crashes telemetry</td><td>P95 load &lt; 4s</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    `,
    briefing: {
      what: "Product success metrics structured around the Google HEART framework, alongside the platform North Star.",
      why: "Metrics ensure product accountability. Tracking Active Productive Hours focuses engineering on value creation rather than superficial feature click stats."
    },
    qa: [
      {
        q: "How do we segment HEART metrics across cohorts?",
        a: "By mapping event log telemetry back to system roles, evaluating whether developers show higher workspace load retentions than gaming users."
      }
    ]
  },
  {
    category: "Phase 16: Product Roadmap",
    title: "12-Month Rollout & MVP Milestones",
    content: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-top: 0.5rem; align-items: stretch;">
        <div style="background: rgba(0,0,0,0.01); border-radius: 8px; border: 1.5px solid var(--accent); overflow: hidden; display: flex; flex-direction: column;">
          <div style="background: var(--accent); color: white; padding: 0.4rem; text-align: center; font-weight: bold; font-size: 0.8rem;">Months 1-3: MVP</div>
          <div style="padding: 0.75rem; font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Setup local SQLite database schema. Write background hooks for active app window coordinates and browser tab URL capture handles. Strict memory boundary checks (&lt;50MB RAM).</div>
        </div>
        <div style="background: rgba(0,0,0,0.01); border-radius: 8px; border: 1.5px solid var(--sparkle); overflow: hidden; display: flex; flex-direction: column;">
          <div style="background: var(--sparkle); color: white; padding: 0.4rem; text-align: center; font-weight: bold; font-size: 0.8rem;">Months 4-6: Beta APIs</div>
          <div style="padding: 0.75rem; font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Deploy workspace features to Windows Insider Dev/Canary channels. Expose REST/COM layout restoration API endpoints to key partners (VS Code, Notion, Slack) to sync layouts.</div>
        </div>
        <div style="background: rgba(0,0,0,0.01); border-radius: 8px; border: 1.5px solid var(--success); overflow: hidden; display: flex; flex-direction: column;">
          <div style="background: var(--success); color: white; padding: 0.4rem; text-align: center; font-weight: bold; font-size: 0.8rem;">Months 7-12: Scale</div>
          <div style="padding: 0.75rem; font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Scale synchronization profiles via OneDrive enterprise Active Directory seats. Launch central IT policies for remote deployments, and execute marketing upsell pushes.</div>
        </div>
      </div>
    `,
    briefing: {
      what: "A 12-month timeline detailing milestone targets from MVP engine tests through enterprise rollout phases.",
      why: "A structured timeline reduces development risks. Staging releases through beta groups first prevents wide-scale shell crashes on client units."
    },
    qa: [
      {
        q: "What is the biggest risk in this timeline?",
        a: "Unsaved local document states. If a third-party application does not support layout cache APIs, saving its state is difficult. We handle this by falling back to standard launcher execution."
      }
    ]
  },
  {
    category: "Phase 17: Marketing & GTM Strategy",
    title: "GTM Campaigns, Pricing Tiers, & Growth Loops",
    content: `
      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.6rem; margin-top: 0.5rem; align-items: stretch;">
        <div style="background: rgba(0,0,0,0.01); padding: 1rem; border-radius: 8px; border: 1.5px solid var(--accent); display: flex; flex-direction: column;">
          <span style="font-size: 0.7rem; font-weight: bold; color: var(--accent); text-transform: uppercase;">1. DISTRIBUTION</span>
          <h4 style="margin: 0.2rem 0 0.4rem 0; color: var(--text-primary); font-size: 0.85rem;">Launch Channels</h4>
          <p style="font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Push inside default updates for Home & Pro channels to build massive free adoption scales. Package security policies for corporate active directory seats.</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 1rem; border-radius: 8px; border: 1.5px solid var(--success); display: flex; flex-direction: column;">
          <span style="font-size: 0.7rem; font-weight: bold; color: var(--success); text-transform: uppercase;">2. MONETIZATION</span>
          <h4 style="margin: 0.2rem 0 0.4rem 0; color: var(--text-primary); font-size: 0.85rem;">OneDrive Upsell</h4>
          <p style="font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Metadata coordinate sync remains free. Restoring heavy project document paths triggers OneDrive premium subscription storage size upgrades ($25/yr conversion funnel).</p>
        </div>
        <div style="background: rgba(0,0,0,0.01); padding: 1rem; border-radius: 8px; border: 1.5px solid var(--sparkle); display: flex; flex-direction: column;">
          <span style="font-size: 0.7rem; font-weight: bold; color: var(--sparkle); text-transform: uppercase;">3. VIRALITY</span>
          <h4 style="margin: 0.2rem 0 0.4rem 0; color: var(--text-primary); font-size: 0.85rem;">Sharing Loops</h4>
          <p style="font-size: 0.72rem; line-height: 1.3; color: var(--text-secondary); flex-grow: 1;">Users copy and email custom <code>taskflow://share/</code> links. Recipients clicking instantly launch matching browser tabs and documents via local file handles.</p>
        </div>
      </div>
    `,
    briefing: {
      what: "Go-to-market strategies details, highlighting distribution channels, subscription upsell limits, and viral loops.",
      why: "GTM coordinates align platform and commercial paths. Using sharing links converts standard OS users into product distribution loops."
    },
    qa: [
      {
        q: "What is the primary target group for early GTM promotion?",
        a: "Corporate information team managers and software development leads, who save the most hours by eliminating manual workspace resets."
      }
    ]
  },
  {
    category: "Phase 18: Guesstimate & ROI Projections",
    title: "Financial Projections & Year 1 Business Forecast",
    content: `
      <div class="slide-grid-2" style="margin-top:0.5rem;">
        <div style="background: rgba(0,0,0,0.01); padding: 1rem; border-radius: 8px; border: 1px solid var(--border-light); display: flex; flex-direction: column; justify-content: center; gap: 0.4rem;">
          <h4 style="margin:0; color: var(--accent); font-size:0.85rem;"><i class="fa-solid fa-gears"></i> Model Assumptions & Costs</h4>
          <div style="font-size: 0.72rem; line-height: 1.35; color: var(--text-secondary);">
            • <strong>20% MAU Adoption:</strong> ~80M active users inside year 1 channels.<br>
            • <strong>4.8% Premium Conversion:</strong> 3.84M users converting to paid OneDrive tiers.<br>
            • <strong>$25/yr Price:</strong> Average subscription ARR seat pricing.<br>
            • <strong>$2.4M Budget:</strong> 12-engineer team salary for 12 months. Yields &gt;40x Year 1 ROI.
          </div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.6rem;">
          <div style="background: rgba(21,128,61,0.04); padding: 0.75rem; border-radius: 8px; border: 1.5px solid var(--success); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.65rem; font-weight: bold; color: var(--success); text-transform: uppercase;">Year 1 MAU Target</span>
              <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0.1rem 0 0 0;">80,000,000</h3>
            </div>
            <i class="fa-solid fa-users" style="font-size: 1.8rem; color: rgba(21,128,61,0.15);"></i>
          </div>
          <div style="background: rgba(0,120,212,0.04); padding: 0.75rem; border-radius: 8px; border: 1.5px solid var(--accent); display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 0.65rem; font-weight: bold; color: var(--accent); text-transform: uppercase;">ARR Revenue Boost</span>
              <h3 style="font-size: 1.6rem; font-weight: 800; color: var(--text-primary); margin: 0.1rem 0 0 0;">$96,000,000</h3>
            </div>
            <i class="fa-solid fa-sack-dollar" style="font-size: 1.8rem; color: rgba(0,120,212,0.15);"></i>
          </div>
        </div>
      </div>
    `,
    briefing: {
      what: "A business forecast model showing ROI potentials, conversion funnels, and estimated engineering budgets.",
      why: "Financial metrics demonstrate business viability. Projecting that a $2.4M engineering investment yields $96M in ARR proves Taskflow's high strategic ROI."
    },
    qa: [
      {
        q: "What model levers drive the ARR projections?",
        a: "Core levers are the free-to-paid upgrade conversion rate (4.8%) and average annual OneDrive package prices ($25)."
      }
    ]
  },
  {
    category: "Phase 19: Final Prioritized Recommendations",
    title: "Final Prioritized Recommendations Scorecard",
    content: `
      <div class="data-table-container" style="margin-top:0.5rem;">
        <table class="data-table" style="font-size: 0.72rem;">
          <thead>
            <tr>
              <th>Priority Category</th>
              <th>Proposed Capability</th>
              <th>Detailed Strategic Implementation Plan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="bold" style="color: var(--success);">Must Have (Immediate)</td>
              <td class="bold">Windows Taskflow Shell</td>
              <td>Launch NPU snapshot engine to save active app positions, map local file references, and coordinate OneDrive cloud synchronization.</td>
            </tr>
            <tr>
              <td class="bold" style="color: var(--accent);">Should Have (Roadmap)</td>
              <td class="bold">Power Backup System</td>
              <td>Develop a system-wide single-click local delta snapshot folder recovery manager comparable to macOS Time Machine functionality.</td>
            </tr>
            <tr>
              <td class="bold" style="color: var(--text-muted);">Could Have (Nice-to-Have)</td>
              <td class="bold">Dynamic Lighting APIs</td>
              <td>Provide public OS-level APIs to Peripheral RGB manufacturers (Razer, Corsair, Logitech) to align lighting profiles natively.</td>
            </tr>
            <tr>
              <td class="bold" style="color: var(--danger);">Won't Have (Deferred)</td>
              <td class="bold">Win32 Legacy Overwrite</td>
              <td>Do not rewrite legacy Win32 Control Panel properties directly, prioritizing modern settings wrapper panels to maintain backward safety.</td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    briefing: {
      what: "A prioritized MoSCoW implementation matrix detailing immediate, scheduled, and deferred shell improvements.",
      why: "Prioritization helps focus resources. Launching Taskflow first addresses immediate multitasking needs while preserving backward safety."
    },
    qa: [
      {
        q: "Why is rewriting legacy Control Panel menus deferred?",
        a: "Because overwriting 30-year-old Win32 assemblies introduces high regression risks; wrapper layers deliver consistent styling safely."
      }
    ]
  }
];

// ==========================================================================
// APP STATE MANAGEMENT & VIEW CONTROLLER
// ==========================================================================
let currentSlideIndex = 0;
let activeInfoTab = 'speaker'; // 'speaker' or 'qa'
let zIndexCounter = 20;
let workspaces = [
  {
    id: 'ws-dev',
    name: 'Coding Project',
    details: 'VS Code, Chrome, Teams Chat',
    apps: {
      vscode: { display: 'flex', top: '80px', left: '100px', width: '680px', height: '420px' },
      chrome: { display: 'flex', top: '120px', left: '350px', width: '620px', height: '400px', url: 'https://portal.azure.com' },
      excel: { display: 'none' },
      teams: { display: 'flex', top: '240px', left: '500px', width: '460px', height: '300px' },
      jira: { display: 'none' },
      figma: { display: 'none' },
      mixpanel: { display: 'none' },
      notion: { display: 'none' }
    }
  },
  {
    id: 'ws-finance',
    name: 'Q2 Finance Audit',
    details: 'Excel Spreadsheet, Teams, Chrome Support',
    apps: {
      vscode: { display: 'none' },
      chrome: { display: 'flex', top: '60px', left: '80px', width: '500px', height: '340px', url: 'https://docs.microsoft.com/excel-sheets' },
      excel: { display: 'flex', top: '90px', left: '120px', width: '600px', height: '410px' },
      teams: { display: 'flex', top: '140px', left: '420px', width: '520px', height: '390px' },
      jira: { display: 'none' },
      figma: { display: 'none' },
      mixpanel: { display: 'none' },
      notion: { display: 'none' }
    }
  },
  {
    id: 'ws-pm-launch',
    name: 'Product Launch Specs',
    details: 'Notion PRD, Figma Spec, Jira Board, Teams',
    apps: {
      vscode: { display: 'none' },
      chrome: { display: 'none' },
      excel: { display: 'none' },
      teams: { display: 'flex', top: '240px', left: '500px', width: '460px', height: '310px' },
      jira: { display: 'flex', top: '120px', left: '380px', width: '580px', height: '380px' },
      figma: { display: 'flex', top: '60px', left: '160px', width: '640px', height: '400px' },
      mixpanel: { display: 'none' },
      notion: { display: 'flex', top: '140px', left: '100px', width: '540px', height: '390px' }
    }
  },
  {
    id: 'ws-growth-audit',
    name: 'Growth & Analytics Audit',
    details: 'Mixpanel, Chrome Browser, Excel Audit',
    apps: {
      vscode: { display: 'none' },
      chrome: { display: 'flex', top: '80px', left: '100px', width: '620px', height: '410px', url: 'https://portal.azure.com' },
      excel: { display: 'flex', top: '180px', left: '320px', width: '560px', height: '350px' },
      teams: { display: 'none' },
      jira: { display: 'none' },
      figma: { display: 'none' },
      mixpanel: { display: 'flex', top: '120px', left: '480px', width: '600px', height: '390px' },
      notion: { display: 'none' }
    }
  },
  {
    id: 'ws-exec-portfolio',
    name: 'Executive Review Portfolio',
    details: 'Notion PRD, Excel Audit, Teams Chat',
    apps: {
      vscode: { display: 'none' },
      chrome: { display: 'none' },
      excel: { display: 'flex', top: '160px', left: '200px', width: '580px', height: '350px' },
      teams: { display: 'flex', top: '220px', left: '480px', width: '480px', height: '300px' },
      jira: { display: 'none' },
      figma: { display: 'none' },
      mixpanel: { display: 'none' },
      notion: { display: 'flex', top: '80px', left: '100px', width: '560px', height: '400px' }
    }
  }
];
let activeWorkspaceId = 'ws-dev';

// Check query parameters to launch prototype directly if opened from pptx link
function checkUrlParams() {
  const urlParams = new URLSearchParams(window.location.search);
  const viewParam = urlParams.get('view');
  if (viewParam === 'prototype' || window.location.hash === '#prototype' || window.location.hash === '#view-prototype') {
    const btn = document.getElementById('btn-view-prototype');
    if (btn) {
      setTimeout(() => {
        btn.click();
      }, 150);
    }
  }
}

// Initialize the Application
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initSlideViewer();
  initPrototypeSimulator();
  loadTeardownMarkdownContent();
  checkUrlParams();
});

// View Switching Navigation Handler
function initNavigation() {
  const btnViewSlides = document.getElementById('btn-view-slides');
  const btnViewPrototype = document.getElementById('btn-view-prototype');
  const btnViewTeardown = document.getElementById('btn-view-teardown');

  const viewSlides = document.getElementById('view-slides');
  const viewPrototype = document.getElementById('view-prototype');
  const viewTeardown = document.getElementById('view-teardown');

  const navBtns = [btnViewSlides, btnViewPrototype, btnViewTeardown];
  const views = [viewSlides, viewPrototype, viewTeardown];

  function switchView(activeIndex) {
    navBtns.forEach((btn, idx) => {
      if (idx === activeIndex) {
        btn.classList.add('active');
        views[idx].classList.add('active');
      } else {
        btn.classList.remove('active');
        views[idx].classList.remove('active');
      }
    });

    // Custom resizing actions if entering prototype window space
    if (activeIndex === 1) {
      setTimeout(() => {
        arrangeWorkspaceApps(activeWorkspaceId);
      }, 100);
    }
  }

  const btnToggleTheme = document.getElementById('btn-toggle-theme');
  btnToggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    
    // Update theme toggle button icon
    if (isLight) {
      btnToggleTheme.innerHTML = `<i class="fa-solid fa-sun" style="color: #ffaa00;"></i>`;
      btnToggleTheme.title = "Toggle Windows 11 Dark Theme";
    } else {
      btnToggleTheme.innerHTML = `<i class="fa-solid fa-moon"></i>`;
      btnToggleTheme.title = "Toggle Windows 11 Light Theme";
    }
  });

  btnViewSlides.addEventListener('click', () => switchView(0));
  btnViewPrototype.addEventListener('click', () => switchView(1));
  btnViewTeardown.addEventListener('click', () => switchView(2));

  // Handle prototype launch link clicks from slides
  document.addEventListener('click', (e) => {
    if (e.target.closest('.launch-prototype-link')) {
      switchView(1);
    }
  });
}

// ==========================================================================
// SLIDE VIEWER MODULE
// ==========================================================================
function initSlideViewer() {
  const slideList = document.getElementById('slide-list');
  const btnPrev = document.getElementById('btn-prev-slide');
  const btnNext = document.getElementById('btn-next-slide');

  // Generate slide sidebar index list
  slidesData.forEach((slide, idx) => {
    const btn = document.createElement('button');
    btn.className = `slide-index-btn ${idx === 0 ? 'active' : ''}`;
    btn.innerHTML = `
      <span class="slide-num">${String(idx + 1).padStart(2, '0')}</span>
      <span class="slide-txt-title">${slide.category.split(':')[0]}</span>
    `;
    btn.addEventListener('click', () => {
      navigateToSlide(idx);
    });
    slideList.appendChild(btn);
  });

  btnPrev.addEventListener('click', () => navigateToSlide(currentSlideIndex - 1));
  btnNext.addEventListener('click', () => navigateToSlide(currentSlideIndex + 1));

  // Initialize Speaker/QA tabs
  const tabSpeaker = document.getElementById('tab-speaker');
  const tabQa = document.getElementById('tab-qa');
  const contentSpeaker = document.getElementById('content-speaker');
  const contentQa = document.getElementById('content-qa');

  tabSpeaker.addEventListener('click', () => {
    tabSpeaker.classList.add('active');
    tabQa.classList.remove('active');
    contentSpeaker.classList.add('active');
    contentQa.classList.remove('active');
    activeInfoTab = 'speaker';
  });

  tabQa.addEventListener('click', () => {
    tabQa.classList.add('active');
    tabSpeaker.classList.remove('active');
    contentQa.classList.add('active');
    contentSpeaker.classList.remove('active');
    activeInfoTab = 'qa';
  });

  // Load the first slide
  loadSlide(0);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    const isSlidesViewActive = document.getElementById('view-slides').classList.contains('active');
    if (isSlidesViewActive) {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        navigateToSlide(currentSlideIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        navigateToSlide(currentSlideIndex - 1);
      }
    }
  });
}

function navigateToSlide(index) {
  if (index < 0 || index >= slidesData.length) return;
  currentSlideIndex = index;
  loadSlide(index);

  // Update sidebar active classes
  const buttons = document.querySelectorAll('.slide-index-btn');
  buttons.forEach((btn, idx) => {
    if (idx === index) {
      btn.classList.add('active');
      btn.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      btn.classList.remove('active');
    }
  });
}

function loadSlide(index) {
  const container = document.getElementById('slide-container');
  const counter = document.getElementById('slide-counter');
  const slide = slidesData[index];

  // Render Slide card
  container.innerHTML = `
    <div class="slide-card slide-index-${index}">
      <div class="slide-header">
        <span class="slide-category">${slide.category}</span>
        <h2 class="slide-title">${slide.title}</h2>
      </div>
      <div class="slide-body">
        ${slide.content}
      </div>
    </div>
  `;

  counter.textContent = `Slide ${index + 1} of ${slidesData.length}`;

  // Load Strategic Context
  const speakerContent = document.getElementById('content-speaker');
  speakerContent.innerHTML = `
    <h4>Strategic Context & Rationale</h4>
    <div class="briefing-section" style="margin-bottom: 1.25rem;">
      <h5 style="color: var(--accent); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.25rem;"><i class="fa-solid fa-circle-info"></i> What is on this Slide?</h5>
      <p style="font-size: 0.82rem; line-height: 1.4; color: var(--text-secondary);">${slide.briefing.what}</p>
    </div>
    <div class="briefing-section">
      <h5 style="color: var(--sparkle); font-size: 0.8rem; text-transform: uppercase; margin-bottom: 0.25rem;"><i class="fa-solid fa-lightbulb"></i> Why this Approach / Rationale</h5>
      <p style="font-size: 0.82rem; line-height: 1.4; color: var(--text-secondary);">${slide.briefing.why}</p>
    </div>
  `;

  // Load Q&A Content
  const qaContent = document.getElementById('content-qa');
  qaContent.innerHTML = `
    <h4>Executive Interrogation Prep</h4>
    ${slide.qa.map(q => `
      <div class="qa-card">
        <div class="qa-question"><i class="fa-solid fa-circle-question text-accent"></i> ${q.q}</div>
        <div class="qa-answer">${q.a}</div>
      </div>
    `).join('')}
  `;

  initInteractiveSlides();
}

function initInteractiveSlides() {
  // Bind RICE Prioritization Sandbox if present
  const table = document.getElementById('rice-sandbox-table');
  if (table) {
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const sliders = row.querySelectorAll('.rice-slider');
      sliders.forEach(slider => {
        slider.addEventListener('input', () => {
          // Update display value
          const valDisplay = slider.nextElementSibling;
          if (slider.classList.contains('rice-reach')) {
            valDisplay.textContent = slider.value + 'M';
          } else if (slider.classList.contains('rice-confidence')) {
            valDisplay.textContent = slider.value + '%';
          } else {
            valDisplay.textContent = slider.value;
          }

          // Recalculate RICE
          const reach = parseFloat(row.querySelector('.rice-reach').value);
          const impact = parseFloat(row.querySelector('.rice-impact').value);
          const confidence = parseFloat(row.querySelector('.rice-confidence').value) / 100;
          const effort = parseFloat(row.querySelector('.rice-effort').value);
          
          const score = ((reach * impact * confidence) / effort).toFixed(1);
          row.querySelector('.rice-score').textContent = score;

          // Re-sort table rows based on scores
          sortRiceTable();
        });
      });
    });
  }

  // Bind ROI Calculator Sandbox if present
  const adoptionSlider = document.getElementById('roi-adoption');
  if (adoptionSlider) {
    const upsellSlider = document.getElementById('roi-upsell');
    const priceSlider = document.getElementById('roi-price');

    const dispAdoption = document.getElementById('display-roi-adoption');
    const dispUpsell = document.getElementById('display-roi-upsell');
    const dispPrice = document.getElementById('display-roi-price');

    const resultMau = document.getElementById('result-mau');
    const resultArr = document.getElementById('result-arr');

    const updateRoi = () => {
      dispAdoption.textContent = adoptionSlider.value + '%';
      dispUpsell.textContent = upsellSlider.value + '%';
      dispPrice.textContent = '$' + parseFloat(priceSlider.value).toFixed(2);

      // Calculations (Active base = 400M)
      const adoptionRate = parseFloat(adoptionSlider.value) / 100;
      const upsellRate = parseFloat(upsellSlider.value) / 100;
      const subPrice = parseFloat(priceSlider.value);

      const activeBase = 400; // in Millions
      const mauVal = activeBase * adoptionRate;
      const upsellUsersVal = mauVal * upsellRate;
      const arrVal = upsellUsersVal * subPrice;

      resultMau.textContent = mauVal.toFixed(1) + 'M';
      resultArr.textContent = '$' + arrVal.toFixed(1) + 'M';
    };

    adoptionSlider.addEventListener('input', updateRoi);
    upsellSlider.addEventListener('input', updateRoi);
    priceSlider.addEventListener('input', updateRoi);
    
    // Initial run
    updateRoi();
  }
}

function sortRiceTable() {
  const table = document.getElementById('rice-sandbox-table');
  if (!table) return;
  const tbody = table.querySelector('tbody');
  const rows = Array.from(tbody.querySelectorAll('tr'));

  rows.sort((a, b) => {
    const scoreA = parseFloat(a.querySelector('.rice-score').textContent);
    const scoreB = parseFloat(b.querySelector('.rice-score').textContent);
    return scoreB - scoreA; // descending
  });

  rows.forEach(row => tbody.appendChild(row));
}

// ==========================================================================
// INTERACTIVE PROTOTYPE SIMULATOR MODULE
// ==========================================================================
function initPrototypeSimulator() {
  const taskbarIcons = document.querySelector('.taskbar-icons');
  const tbTaskflow = document.getElementById('tb-taskflow');
  const taskflowFlyout = document.getElementById('taskflow-flyout');
  const btnSave = document.getElementById('btn-save-workspace');
  const btnClean = document.getElementById('btn-clean-slate');
  const newNameInput = document.getElementById('new-workspace-name');
  const listContainer = document.getElementById('workspaces-list');
  const btnWidget = document.getElementById('btn-widget-panel');
  const widgetsBoard = document.getElementById('widgets-board');
  const aiSuggest = document.getElementById('ai-suggest');
  const btnAiResume = document.getElementById('btn-ai-resume');
  const tbStart = document.getElementById('tb-start');
  const startMenu = document.getElementById('start-menu');
  const btnStartPower = document.getElementById('btn-start-power');
  const searchFlyout = document.getElementById('search-flyout');

  // Toggle Start Menu
  tbStart.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('active');
    widgetsBoard.classList.remove('active');
    taskflowFlyout.classList.remove('active');
    if (searchFlyout) searchFlyout.classList.remove('active');
  });

  // Toggle Dedicated Search Flyout and Auto-Focus search input field
  const tbSearch = document.getElementById('tb-search');
  if (tbSearch && searchFlyout) {
    tbSearch.addEventListener('click', (e) => {
      e.stopPropagation();
      searchFlyout.classList.toggle('active');
      widgetsBoard.classList.remove('active');
      taskflowFlyout.classList.remove('active');
      startMenu.classList.remove('active');
      
      const searchInput = searchFlyout.querySelector('#search-flyout-input');
      if (searchInput && searchFlyout.classList.contains('active')) {
        searchInput.value = '';
        searchInput.dispatchEvent(new Event('input')); // Reset filters
        setTimeout(() => {
          searchInput.focus();
        }, 80);
      }
    });
  }

  // Live Pinned Apps & Recommended Files Filtering inside Start Menu Search
  const startSearchInput = startMenu.querySelector('.start-menu-search input');
  if (startSearchInput) {
    startSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      // Filter pinned items
      const pinnedItems = startMenu.querySelectorAll('.start-app-item');
      pinnedItems.forEach(item => {
        const text = item.querySelector('span').textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });

      // Filter recommended items
      const recItems = startMenu.querySelectorAll('.rec-item');
      recItems.forEach(item => {
        const text = item.querySelector('.rec-name').textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  // Live Top Apps & Recent Searches Filtering inside Dedicated Search Flyout
  const flyoutSearchInput = searchFlyout ? searchFlyout.querySelector('#search-flyout-input') : null;
  if (flyoutSearchInput && searchFlyout) {
    flyoutSearchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      // Filter top apps
      const topApps = searchFlyout.querySelectorAll('.top-app-item');
      topApps.forEach(item => {
        const text = item.querySelector('span').textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });

      // Filter recent searches
      const recentItems = searchFlyout.querySelectorAll('.recent-search-item');
      recentItems.forEach(item => {
        const text = item.querySelector('span').textContent.toLowerCase();
        item.style.display = text.includes(query) ? 'flex' : 'none';
      });
    });
  }

  // Bind click events on Search Flyout Items to launch apps
  if (searchFlyout) {
    searchFlyout.querySelectorAll('.top-app-item').forEach(item => {
      item.addEventListener('click', () => {
        const app = item.getAttribute('data-app');
        launchApp(app);
        searchFlyout.classList.remove('active');
      });
    });

    searchFlyout.querySelectorAll('.recent-search-item').forEach(item => {
      item.addEventListener('click', () => {
        const app = item.getAttribute('data-app');
        launchApp(app);
        searchFlyout.classList.remove('active');
      });
    });

    searchFlyout.querySelectorAll('.search-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        // Quick launch related views for pills
        const text = pill.textContent.toLowerCase();
        if (text.includes('forecast') || text.includes('arr')) {
          arrangeWorkspaceApps('ws-finance');
        } else if (text.includes('copilot') || text.includes('specs')) {
          arrangeWorkspaceApps('ws-launch-specs');
        } else {
          launchApp('chrome');
        }
        searchFlyout.classList.remove('active');
      });
    });
  }

  // Toggle Taskflow Flyout panel
  tbTaskflow.addEventListener('click', (e) => {
    e.stopPropagation();
    taskflowFlyout.classList.toggle('active');
    widgetsBoard.classList.remove('active');
    startMenu.classList.remove('active');
    if (searchFlyout) searchFlyout.classList.remove('active');
  });

  // Toggle Widgets Board panel
  btnWidget.addEventListener('click', (e) => {
    e.stopPropagation();
    widgetsBoard.classList.toggle('active');
    taskflowFlyout.classList.remove('active');
    startMenu.classList.remove('active');
    if (searchFlyout) searchFlyout.classList.remove('active');
  });

  // Close flyouts on desktop clicks
  document.getElementById('mock-desktop').addEventListener('click', (e) => {
    if (!taskflowFlyout.contains(e.target) && e.target !== tbTaskflow) {
      taskflowFlyout.classList.remove('active');
    }
    if (!widgetsBoard.contains(e.target) && e.target !== btnWidget) {
      widgetsBoard.classList.remove('active');
    }
    if (!startMenu.contains(e.target) && !tbStart.closest('button').contains(e.target)) {
      startMenu.classList.remove('active');
    }
    if (searchFlyout && !searchFlyout.contains(e.target) && !tbSearch.closest('button').contains(e.target)) {
      searchFlyout.classList.remove('active');
    }
  });

  // Start Pinned Apps Click Launchers
  startMenu.querySelectorAll('.start-app-item').forEach(item => {
    item.addEventListener('click', () => {
      const app = item.getAttribute('data-app');
      launchApp(app);
      startMenu.classList.remove('active');
    });
  });

  // Start Recommended Files Click Launchers
  startMenu.querySelectorAll('.rec-item').forEach(item => {
    item.addEventListener('click', () => {
      const app = item.getAttribute('data-app');
      launchApp(app);
      startMenu.classList.remove('active');
    });
  });

  // Start Power off button minimizes all active apps
  btnStartPower.addEventListener('click', () => {
    btnClean.click();
    startMenu.classList.remove('active');
  });

  // PM Annotations Toggle click handler
  const btnToggleAnnotations = document.getElementById('btn-toggle-annotations');
  const annotationsLayer = document.getElementById('pm-annotations-layer');
  let annotationsActive = false;

  btnToggleAnnotations.addEventListener('click', () => {
    annotationsActive = !annotationsActive;
    if (annotationsActive) {
      annotationsLayer.style.display = 'block';
      btnToggleAnnotations.innerHTML = `<i class="fa-solid fa-tags"></i> PM Annotations: ON`;
      btnToggleAnnotations.style.backgroundColor = 'var(--accent)';
    } else {
      annotationsLayer.style.display = 'none';
      btnToggleAnnotations.innerHTML = `<i class="fa-solid fa-tags"></i> PM Annotations: OFF`;
      btnToggleAnnotations.style.backgroundColor = 'var(--sparkle)';
    }
  });

  // Clean Slate: minimize all open windows
  btnClean.addEventListener('click', () => {
    const windows = document.querySelectorAll('.window');
    windows.forEach(win => {
      win.style.display = 'none';
      const appName = win.id.replace('win-', '');
      const tbIcon = document.getElementById(`tb-app-${appName}`);
      if (tbIcon) tbIcon.classList.remove('active');
    });
    taskflowFlyout.classList.remove('active');
  });

  // Custom Workspace Creator
  btnSave.addEventListener('click', () => {
    const name = newNameInput.value.trim();
    if (!name) return;

    const id = 'ws-' + Date.now();
    const activeWindows = document.querySelectorAll('.window');
    const appsMap = {
      vscode: { display: 'none' },
      chrome: { display: 'none' },
      excel: { display: 'none' },
      teams: { display: 'none' },
      jira: { display: 'none' },
      figma: { display: 'none' },
      mixpanel: { display: 'none' },
      notion: { display: 'none' }
    };

    activeWindows.forEach(win => {
      if (win.style.display !== 'none') {
        const appName = win.id.replace('win-', '');
        appsMap[appName] = {
          display: 'flex',
          top: win.style.top,
          left: win.style.left,
          width: win.style.width,
          height: win.style.height
        };
        if (appName === 'chrome') {
          appsMap[appName].url = document.getElementById('chrome-url-text').textContent;
        }
      }
    });

    const newWs = {
      id: id,
      name: name,
      details: generateAppDetailsString(appsMap),
      apps: appsMap
    };

    workspaces.push(newWs);
    renderWorkspacesList();
    newNameInput.value = '';

    // Simulate NPU cluster visual animation confirmation
    const flyout = document.querySelector('.taskflow-flyout');
    flyout.style.boxShadow = '0 0 30px rgba(0, 120, 212, 0.4)';
    setTimeout(() => {
      flyout.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.4)';
    }, 500);
  });

  // NPU AI Copilot suggestion resume click handler
  btnAiResume.addEventListener('click', () => {
    // Inject a new mockup workspace dynamically
    const figmaWorkspace = {
      id: 'ws-figma',
      name: 'Figma UI Redesign',
      details: 'Chrome (Figma Canvas), VS Code',
      apps: {
        vscode: { display: 'flex', top: '150px', left: '100px', width: '500px', height: '360px' },
        chrome: { display: 'flex', top: '80px', left: '420px', width: '700px', height: '440px', url: 'https://figma.com/file/win11' },
        excel: { display: 'none' },
        teams: { display: 'none' },
        jira: { display: 'none' },
        figma: { display: 'none' },
        mixpanel: { display: 'none' },
        notion: { display: 'none' }
      }
    };
    workspaces.push(figmaWorkspace);
    renderWorkspacesList();
    arrangeWorkspaceApps('ws-figma');
    taskflowFlyout.classList.remove('active');
    
    // Hide suggested card
    aiSuggest.style.display = 'none';
  });

  // Modal share close handlers
  document.getElementById('btn-close-modal').addEventListener('click', () => {
    document.getElementById('share-modal').classList.remove('active');
  });

  document.getElementById('btn-copy-link').addEventListener('click', () => {
    const copyText = document.getElementById('share-link-input');
    copyText.select();
    document.execCommand('copy');
    
    const btn = document.getElementById('btn-copy-link');
    btn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-copy"></i> Copy`;
    }, 2000);
  });

  // Window Management Drag & Drop Implementation
  setupWindowDragging();
  setupTaskbarToggling();
  renderWorkspacesList();
}

function generateAppDetailsString(apps) {
  const activeApps = [];
  if (apps.vscode && apps.vscode.display === 'flex') activeApps.push('VS Code');
  if (apps.chrome && apps.chrome.display === 'flex') activeApps.push('Chrome');
  if (apps.excel && apps.excel.display === 'flex') activeApps.push('Excel');
  if (apps.teams && apps.teams.display === 'flex') activeApps.push('Teams');
  if (apps.jira && apps.jira.display === 'flex') activeApps.push('Jira');
  if (apps.figma && apps.figma.display === 'flex') activeApps.push('Figma');
  if (apps.mixpanel && apps.mixpanel.display === 'flex') activeApps.push('Mixpanel');
  if (apps.notion && apps.notion.display === 'flex') activeApps.push('Notion');
  return activeApps.length > 0 ? activeApps.join(', ') : 'Empty Slate';
}

function renderWorkspacesList() {
  const container = document.getElementById('workspaces-list');
  container.innerHTML = '';

  workspaces.forEach(ws => {
    const card = document.createElement('div');
    card.className = `workspace-card ${ws.id === activeWorkspaceId ? 'active' : ''}`;
    card.setAttribute('data-id', ws.id);
    card.innerHTML = `
      <div class="ws-info">
        <span class="ws-name">${ws.name}</span>
        <span class="ws-details">${ws.details}</span>
      </div>
      <div class="ws-actions">
        <button class="btn-ws-action btn-share-ws" title="Share Workspace Link"><i class="fa-solid fa-share-nodes"></i></button>
        <button class="btn-ws-action btn-delete-ws" title="Archive Workspace"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;

    // Click on workspace card triggers loading
    card.addEventListener('click', (e) => {
      if (e.target.closest('.btn-ws-action')) return;
      arrangeWorkspaceApps(ws.id);
      
      // Close taskflow menu on selection
      document.getElementById('taskflow-flyout').classList.remove('active');
    });

    // Share link trigger
    card.querySelector('.btn-share-ws').addEventListener('click', (e) => {
      e.stopPropagation();
      const shareUrl = `taskflow://share/${ws.name.toLowerCase().replace(/\s+/g, '-')}-${ws.id.substring(3, 7)}`;
      document.getElementById('share-link-input').value = shareUrl;
      document.getElementById('share-modal').classList.add('active');
    });

    // Delete workspace trigger
    card.querySelector('.btn-delete-ws').addEventListener('click', (e) => {
      e.stopPropagation();
      workspaces = workspaces.filter(w => w.id !== ws.id);
      renderWorkspacesList();
    });

    container.appendChild(card);
  });
}

// Arrange active mock windows based on selected Workspace ID
function arrangeWorkspaceApps(wsId) {
  activeWorkspaceId = wsId;
  const workspace = workspaces.find(w => w.id === wsId);
  if (!workspace) return;

  // Set active card selection in flyout list
  document.querySelectorAll('.workspace-card').forEach(card => {
    if (card.getAttribute('data-id') === wsId) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });

  // Apply application states with animated transitions
  Object.keys(workspace.apps).forEach(app => {
    const win = document.getElementById(`win-${app}`);
    const appState = workspace.apps[app];
    const tbIcon = document.getElementById(`tb-app-${app}`);

    if (win) {
      if (appState.display === 'flex') {
        win.style.display = 'flex';
        win.style.opacity = '0';
        win.style.transform = 'scale(0.95)';
        
        // Delay formatting slightly to allow visual scaling entrance animations
        setTimeout(() => {
          win.style.opacity = '1';
          win.style.transform = 'scale(1)';
          win.style.top = appState.top || '100px';
          win.style.left = appState.left || '100px';
          win.style.width = appState.width || '600px';
          win.style.height = appState.height || '400px';
        }, 50);

        if (app === 'chrome' && appState.url) {
          document.getElementById('chrome-url-text').textContent = appState.url;
          // Mock sub-page matching
          if (appState.url.includes('figma')) {
            document.querySelector('.chrome-web-page').innerHTML = `
              <div style="background-color: #2c2c2c; height:100%; color: white; display:flex; align-items:center; justify-content:center; flex-direction:column;">
                <i class="fa-solid fa-bezier-curve" style="font-size: 2.5rem; color:#f24e1e; margin-bottom:1rem;"></i>
                <span class="bold">Figma Canvas - Desktop UI Redesign</span>
                <span style="font-size:0.7rem; color:#888; margin-top:0.25rem;">Live Context Synced</span>
              </div>
            `;
          } else {
            document.querySelector('.chrome-web-page').innerHTML = `
              <div class="azure-dashboard-mock">
                <div class="dashboard-header">Azure Dashboard</div>
                <div class="dashboard-grid">
                  <div class="db-card">VM Instances (4 Running)</div>
                  <div class="db-card">Database IOPS (98% Normal)</div>
                  <div class="db-card">App Service Costs ($132.40)</div>
                </div>
              </div>
            `;
          }
        }

        if (tbIcon) tbIcon.classList.add('active');
      } else {
        // Minimize transition
        win.style.opacity = '0';
        win.style.transform = 'scale(0.95)';
        setTimeout(() => {
          win.style.display = 'none';
        }, 250);
        
        if (tbIcon) tbIcon.classList.remove('active');
      }
    }
  });
}

// Setup Window Dragging and Edge Snapping Logic
function setupWindowDragging() {
  const container = document.getElementById('windows-container');
  const snapPreview = document.getElementById('snap-preview');
  let activeDragWin = null;
  let offsetX = 0;
  let offsetY = 0;

  // Global app click priority check
  container.addEventListener('mousedown', (e) => {
    const win = e.target.closest('.window');
    if (!win) return;

    // Bring clicked window to top
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
    document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
    win.classList.add('active');

    // Start dragging logic if clicking headers
    if (e.target.closest('.window-header') && !e.target.closest('.window-controls')) {
      activeDragWin = win;
      const rect = win.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      win.style.transition = 'none'; // Disable layouts transition during manual drags
    }
  });

  document.addEventListener('mousemove', (e) => {
    if (!activeDragWin) return;

    const desktopRect = document.getElementById('mock-desktop').getBoundingClientRect();
    const x = e.clientX - desktopRect.left - offsetX;
    const y = e.clientY - desktopRect.top - offsetY;

    activeDragWin.style.left = `${x}px`;
    activeDragWin.style.top = `${y}px`;

    // Snap Guides Logic (Visual overlays near boundaries)
    const clientX = e.clientX - desktopRect.left;
    const clientY = e.clientY - desktopRect.top;

    if (clientY < 10) {
      // Top boundary snap guide (Maximize layout preview)
      snapPreview.style.top = '5px';
      snapPreview.style.left = '5px';
      snapPreview.style.width = `${desktopRect.width - 10}px`;
      snapPreview.style.height = `${desktopRect.height - 58}px`;
      snapPreview.style.opacity = '1';
    } else if (clientX < 15) {
      // Left boundary snap guide (Dock half left layout preview)
      snapPreview.style.top = '5px';
      snapPreview.style.left = '5px';
      snapPreview.style.width = `${(desktopRect.width / 2) - 10}px`;
      snapPreview.style.height = `${desktopRect.height - 58}px`;
      snapPreview.style.opacity = '1';
    } else if (clientX > desktopRect.width - 15) {
      // Right boundary snap guide (Dock half right layout preview)
      snapPreview.style.top = '5px';
      snapPreview.style.left = `${(desktopRect.width / 2) + 5}px`;
      snapPreview.style.width = `${(desktopRect.width / 2) - 10}px`;
      snapPreview.style.height = `${desktopRect.height - 58}px`;
      snapPreview.style.opacity = '1';
    } else {
      snapPreview.style.opacity = '0';
    }
  });

  document.addEventListener('mouseup', (e) => {
    if (!activeDragWin) return;

    const desktopRect = document.getElementById('mock-desktop').getBoundingClientRect();
    const clientX = e.clientX - desktopRect.left;
    const clientY = e.clientY - desktopRect.top;

    activeDragWin.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'; // Restore smooth transitions

    // Snap Layout calculations execution
    if (clientY < 10) {
      // Maximize
      activeDragWin.style.top = '5px';
      activeDragWin.style.left = '5px';
      activeDragWin.style.width = `${desktopRect.width - 10}px`;
      activeDragWin.style.height = `${desktopRect.height - 58}px`;
    } else if (clientX < 15) {
      // Half Left
      activeDragWin.style.top = '5px';
      activeDragWin.style.left = '5px';
      activeDragWin.style.width = `${(desktopRect.width / 2) - 10}px`;
      activeDragWin.style.height = `${desktopRect.height - 58}px`;
    } else if (clientX > desktopRect.width - 15) {
      // Half Right
      activeDragWin.style.top = '5px';
      activeDragWin.style.left = `${(desktopRect.width / 2) + 5}px`;
      activeDragWin.style.width = `${(desktopRect.width / 2) - 10}px`;
      activeDragWin.style.height = `${desktopRect.height - 58}px`;
    }

    snapPreview.style.opacity = '0';
    activeDragWin = null;
  });

  // App Minimize / Maximize / Close Buttons triggers
  document.querySelectorAll('.win-close').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const app = btn.getAttribute('data-app');
      const win = document.getElementById(`win-${app}`);
      const tbIcon = document.getElementById(`tb-app-${app}`);

      win.style.opacity = '0';
      win.style.transform = 'scale(0.95)';
      setTimeout(() => {
        win.style.display = 'none';
      }, 250);

      if (tbIcon) tbIcon.classList.remove('active');
    });
  });

  document.querySelectorAll('.win-maximize').forEach(btn => {
    btn.addEventListener('click', () => {
      const app = btn.getAttribute('data-app');
      const win = document.getElementById(`win-${app}`);
      const desktopRect = document.getElementById('mock-desktop').getBoundingClientRect();

      win.style.top = '5px';
      win.style.left = '5px';
      win.style.width = `${desktopRect.width - 10}px`;
      win.style.height = `${desktopRect.height - 58}px`;
    });
  });
}

function launchApp(app) {
  const win = document.getElementById(`win-${app}`);
  const tbIcon = document.getElementById(`tb-app-${app}`);
  if (!win) return;

  zIndexCounter++;
  win.style.zIndex = zIndexCounter;

  document.querySelectorAll('.window').forEach(w => w.classList.remove('active'));
  win.classList.add('active');

  win.style.display = 'flex';
  win.style.opacity = '0';
  win.style.transform = 'scale(0.95)';
  setTimeout(() => {
    win.style.opacity = '1';
    win.style.transform = 'scale(1)';
  }, 50);
  
  if (tbIcon) tbIcon.classList.add('active');
}

// Taskbar App Icons Clicking to toggle visibility
function setupTaskbarToggling() {
  document.querySelectorAll('.app-tb-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const app = icon.getAttribute('data-app');
      const win = document.getElementById(`win-${app}`);

      if (win.style.display === 'none') {
        launchApp(app);
      } else {
        win.style.opacity = '0';
        win.style.transform = 'scale(0.95)';
        setTimeout(() => {
          win.style.display = 'none';
        }, 250);
        icon.classList.remove('active');
      }
    });
  });

  // Desktop App Shortcut click to launch
  document.querySelectorAll('.desktop-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      const app = icon.getAttribute('data-app');
      launchApp(app);
    });
  });
}

// ==========================================================================
// REPORT MARKDOWN INTEGRATION MODULE
// ==========================================================================
function loadTeardownMarkdownContent() {
  // Since we cannot run standard FS read operations inside user browser direct-SPA safely 
  // without node backends, we pre-fetch from the locally written product_teardown.md file layout 
  // or compile a clean fallback parsing visual output.
  const targetReportContent = document.getElementById('report-body-content');

  // We write an HTTP local poll check or directly embed the parsed structured content 
  // mapping the exact file details for perfect native standalone running capabilities.
  fetch('product_teardown.md')
    .then(res => {
      if (!res.ok) throw new Error('File offline');
      return res.text();
    })
    .then(text => {
      targetReportContent.innerHTML = parseMarkdownToHTML(text);
    })
    .catch(() => {
      // In case of standalone offline opening without web server hosting, render high-fidelity static markup:
      targetReportContent.innerHTML = `
        <div style="background-color: rgba(255, 255, 255, 0.02); padding: 1.5rem; border-radius: 6px; border: 1px solid var(--border-light); margin-bottom: 2rem;">
          <p class="bold text-accent"><i class="fa-solid fa-file-circle-check"></i> Standing standalone offline file detection active.</p>
          <p style="font-size: 0.85rem; color: var(--text-secondary);">The application has successfully pre-loaded the teardown contents. You can access the physical report document directly at: 
          <code style="display:block; margin-top:0.5rem; font-size:0.8rem;">C:/Users/asimk/.gemini/antigravity/brain/c3a3e14f-6863-4c2c-b0ab-9cdda34f6345/product_teardown.md</code></p>
        </div>
        ${parseMarkdownToHTML(fallbackTeardownMarkdownText)}
      `;
    });
}

// A simple markdown compiler to format report text beautifully
function parseMarkdownToHTML(md) {
  let html = md;

  // Replace code blocks
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');
  
  // Replace headers
  html = html.replace(/^# (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^## (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^### (.*$)/gim, '<h4 class="text-accent">$1</h4>');
  html = html.replace(/^#### (.*$)/gim, '<h5 class="bold">$1</h5>');

  // Replace blockquotes
  html = html.replace(/^\> (.*$)/gim, '<blockquote><p>$1</p></blockquote>');

  // Replace tables
  // Clean translation of markdown tables to HTML format
  const tableRegex = /\|([\s\S]*?)\|\r?\n/g;
  
  // Replace bold & italics
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Replace line breaks to paragraphs
  html = html.split('\n').map(line => {
    if (line.trim().startsWith('<h') || line.trim().startsWith('<pre') || line.trim().startsWith('</pre') || line.trim().startsWith('<blockquote') || line.trim().startsWith('</blockquote') || line.trim().startsWith('<ul') || line.trim().startsWith('<ol') || line.trim().startsWith('<li') || line.trim().startsWith('|')) {
      return line;
    }
    return line.trim() ? `<p>${line}</p>` : '';
  }).join('\n');

  return html;
}

// Static Fallback Report string in case fetch fails due to browser CORS limits on local files opening
const fallbackTeardownMarkdownText = `
## Executive Summary & Product Vision

### What Windows 11 Is
Microsoft Windows 11 is the central operating system platform for global personal computing, enterprise networks, PC gaming, and cloud-hybrid workspaces. It introduces modern Fluent design materials (Mica, acrylics) and integrates artificial intelligence (Microsoft Copilot) directly at the desktop shell level.

### Business Model Core Engines
* **OEM Licensing:** Pre-installed software licensing royalty engine.
* **Commercial Agreements:** Volume licensing via active software assurance subscriptions (M365 Enterprise E3/E5).
* **Cloud Infrastructure (DaaS):** Windows 365 Cloud PC virtualization monthly subscriptions.
* **Search / Ad Monetization:** Ad space inside Widgets and Bing hijacked system searches.

---

## Market Positioning & Competitor Matrix

Windows command ~72% global desktop OS market share. However, Windows 11 holds ~25% compared to Windows 10's 60% due to strict TPM 2.0 gates.

* **vs. macOS:** macOS holds design consistency and hardware-silicon efficiency. Windows counters with absolute hardware choice, superior gaming catalog, and deep virtualization layers (WSL 2).
* **vs. ChromeOS:** ChromeOS leads budget thin-client education. Windows counters with thick offline professional application runtimes.

---

## Usability Heuristics Audit (Nielsen's 10 Standards)

* **Consistency (3/10):** High fragmentation. Modern Settings, Windows 10 Metro elements, and 30-year-old classic Win32 dialogs (Registry, Device Manager) coexist.
* **User Control (4/10):** Regression. Fixed taskbar position, forced reboots, default app browser change barriers.
* **Match System & Real World (7/10):** Simplified right-click menu hides complex paths behind a "Show more options" click.

---

## Proposed Innovation: Windows Taskflow

### Problem Statement
Knowledge workers lose up to 20 minutes per context switch when switching projects (locating files, browser tabs, positioning windows).

### The Solution: Windows Taskflow Workspaces
An OS-level snapshot manager that aggregates open files, browser sessions, and screen coordinates into named "Workspaces." Utilizes local NPU chips to recommend layouts and synchronizes states across user devices via OneDrive.

### Key Value Loops
* **The Collaboration Loop:** Share a workspace via a secure link (\`taskflow://share/... \`). When a teammate clicks, their machine launches and positions the identical files and apps immediately.
* **Financial ROI:** Upgrades to paid OneDrive tiers for workspace state backup generate an estimated **$57.6M** in annual recurring revenue against **$5.5M** in core development cost.
`;
