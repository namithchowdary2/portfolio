/* ============================================================
   script.js — Namith Chowdary Portfolio
   DOM population · Scroll animations · Navbar · Counters
   Typewriter · Cert modal · EmailJS contact form
   ============================================================ */

'use strict';

/* ── EMAILJS CONFIG ─────────────────────────────────────────────
   Replace these with your real EmailJS credentials:
   1. Sign up at https://www.emailjs.com/
   2. Create a service (Gmail recommended)
   3. Create TWO templates:
      - Template 1 (TEMPLATE_ID): receives the message, sent TO you
      - Template 2 (AUTO_REPLY_TEMPLATE_ID): auto-reply sent TO the user
   4. Paste your Public Key, Service ID, and both Template IDs below
   ──────────────────────────────────────────────────────────── */
const EMAILJS_CONFIG = {
  PUBLIC_KEY:            'YOUR_PUBLIC_KEY_HERE',
  SERVICE_ID:            'YOUR_SERVICE_ID_HERE',
  TEMPLATE_ID:           'YOUR_TEMPLATE_ID_HERE',
  AUTO_REPLY_TEMPLATE_ID:'YOUR_AUTOREPLY_TEMPLATE_ID_HERE'
};

/* ══════════════════════════════════════════════════════════════
   INIT — run everything after DOM is ready
   ══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  initEmailJS();
  populateAll();
  initNavbar();
  initMobileMenu();
  initTypewriter();
  initScrollReveal();
  initActiveNavLinks();
  initCounterAnimation();
  initSkillBars();
  initCertModal();
  initContactForm();
  initSmoothScroll();
  initHoverCursor();
  initBackToTop();
  initThemeToggle();
  initIntroScreen();
});

/* ══════════════════════════════════════════════════════════════
   1. EMAILJS INIT
   ══════════════════════════════════════════════════════════════ */
function initEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
}

/* ══════════════════════════════════════════════════════════════
   2. POPULATE ALL SECTIONS FROM data.js
   ══════════════════════════════════════════════════════════════ */
function populateAll() {
  populateAbout();
  populateEducation();
  populateSkills();
  populateProjects();
  populateCertifications();
  populateExperience();
  populateCompetitive();
  populateOpenSource();
  populateBlog();
  populateResearch();
}

/* ── About paragraphs + highlights ───────────────────────────── */
function populateAbout() {
  const D = PORTFOLIO_DATA;

  // Story paragraphs
  const paras = document.getElementById('about-paragraphs');
  if (paras) {
    paras.innerHTML = D.about.story
      .map(p => `<p>${p}</p>`)
      .join('');
  }

  // Highlight cards
  const highlights = document.getElementById('about-highlights');
  if (highlights) {
    highlights.innerHTML = D.about.highlights
      .map(h => `
        <div class="highlight-item">
          <span class="hi-icon">${h.icon}</span>
          <div>
            <span class="hi-label">${h.label}</span>
            <span class="hi-value">${h.value}</span>
          </div>
        </div>
      `).join('');
  }
}

/* ── Education timeline ───────────────────────────────────────── */
function populateEducation() {
  const list = document.getElementById('education-list');
  if (!list) return;
  list.innerHTML = PORTFOLIO_DATA.education
    .map(edu => `
      <div class="timeline-item reveal">
        <div class="tl-degree">${edu.degree}</div>
        <div class="tl-inst">${edu.institution}</div>
        <div class="tl-meta">
          <span>${edu.cgpa}</span>
          <span>${edu.duration}</span>
        </div>
      </div>
    `).join('');
}

/* ── Skills bars ─────────────────────────────────────────────── */
function populateSkills() {
  const D = PORTFOLIO_DATA.skills;
  const map = {
    'skills-languages': D.languages,
    'skills-web':       D.web,
    'skills-tools':     D.tools,
    'skills-ml':        D.ml
  };

  Object.entries(map).forEach(([id, items]) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.innerHTML = items.map(s => `
      <div class="skill-bar-item">
        <div class="skill-bar-header">
          <span class="skill-name">${s.name}</span>
          <span class="skill-pct">${s.level}%</span>
        </div>
        <div class="skill-bar-track">
          <div class="skill-bar-fill" data-level="${s.level}"></div>
        </div>
      </div>
    `).join('');
  });

  // Soft skills chips
  const chips = document.getElementById('soft-skills');
  if (chips) {
    chips.innerHTML = D.soft
      .map(s => `<span class="chip">${s}</span>`)
      .join('');
  }
}

/* ── Projects cards ──────────────────────────────────────────── */
function populateProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  const visuals = {
    1: `<div class="proj-visual proj-visual-1">
      <svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="g1a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#00d4ff" stop-opacity="0.18"/><stop offset="100%" stop-color="#a855f7" stop-opacity="0.08"/></linearGradient>
          <linearGradient id="g1b" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00d4ff"/><stop offset="100%" stop-color="#a855f7"/></linearGradient>
          <filter id="glow1"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="420" height="160" fill="url(#g1a)" rx="12"/>
        <!-- Browser window -->
        <rect x="30" y="20" width="220" height="125" rx="8" fill="#0a0f1c" stroke="rgba(0,212,255,0.35)" stroke-width="1"/>
        <!-- Browser titlebar -->
        <rect x="30" y="20" width="220" height="22" rx="8" fill="#111827"/>
        <rect x="30" y="34" width="220" height="8" fill="#111827"/>
        <circle cx="44" cy="31" r="4" fill="#ff5f57"/><circle cx="57" cy="31" r="4" fill="#febc2e"/><circle cx="70" cy="31" r="4" fill="#28c840"/>
        <!-- Address bar -->
        <rect x="82" y="26" width="120" height="10" rx="3" fill="#1e293b"/>
        <text x="87" y="35" font-size="6" fill="rgba(0,212,255,0.6)" font-family="monospace">localhost:5000/learn</text>
        <!-- Code lines -->
        <rect x="42" y="52" width="90" height="5" rx="2" fill="rgba(0,212,255,0.55)"/>
        <rect x="42" y="63" width="130" height="5" rx="2" fill="rgba(168,85,247,0.6)"/>
        <rect x="52" y="74" width="70" height="5" rx="2" fill="rgba(0,212,255,0.4)"/>
        <rect x="52" y="85" width="100" height="5" rx="2" fill="rgba(168,85,247,0.45)"/>
        <rect x="42" y="96" width="80" height="5" rx="2" fill="rgba(0,212,255,0.5)"/>
        <rect x="42" y="107" width="60" height="5" rx="2" fill="rgba(34,197,94,0.7)"/>
        <!-- Run output panel -->
        <rect x="38" y="118" width="200" height="20" rx="4" fill="rgba(34,197,94,0.1)" stroke="rgba(34,197,94,0.3)" stroke-width="0.5"/>
        <text x="44" y="131" font-size="7.5" fill="#22c55e" font-family="monospace">▶  Output: Hello, World!</text>
        <!-- Right panel: progress -->
        <rect x="268" y="20" width="122" height="125" rx="8" fill="#0a0f1c" stroke="rgba(168,85,247,0.25)" stroke-width="1"/>
        <text x="279" y="40" font-size="8" fill="rgba(240,244,255,0.55)" font-family="monospace">Progress</text>
        <rect x="279" y="47" width="90" height="6" rx="3" fill="rgba(255,255,255,0.07)"/>
        <rect x="279" y="47" width="72" height="6" rx="3" fill="url(#g1b)"/>
        <text x="279" y="67" font-size="7" fill="rgba(240,244,255,0.4)" font-family="monospace">Python</text>
        <rect x="279" y="70" width="90" height="5" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="279" y="70" width="58" height="5" rx="2" fill="rgba(0,212,255,0.7)"/>
        <text x="279" y="87" font-size="7" fill="rgba(240,244,255,0.4)" font-family="monospace">Quiz</text>
        <rect x="279" y="90" width="90" height="5" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="279" y="90" width="80" height="5" rx="2" fill="rgba(168,85,247,0.7)"/>
        <text x="279" y="110" font-size="8.5" fill="#00d4ff" font-family="monospace" filter="url(#glow1)">3 / 5 ✓</text>
        <text x="279" y="128" font-size="7" fill="rgba(34,197,94,0.8)" font-family="monospace">Score: 85%</text>
      </svg>
      <div class="pv-glow pv-glow-cyan"></div>
    </div>`,

    2: `<div class="proj-visual proj-visual-2">
      <svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="g2a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#a855f7" stop-opacity="0.18"/><stop offset="100%" stop-color="#00d4ff" stop-opacity="0.06"/></linearGradient>
          <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00d4ff"/><stop offset="100%" stop-color="#0066aa"/></linearGradient>
          <linearGradient id="bar2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a855f7"/><stop offset="100%" stop-color="#6600cc"/></linearGradient>
          <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="420" height="160" fill="url(#g2a)" rx="12"/>
        <!-- Dashboard panel -->
        <rect x="20" y="14" width="260" height="133" rx="8" fill="#080d18" stroke="rgba(168,85,247,0.3)" stroke-width="1"/>
        <text x="30" y="32" font-size="8.5" fill="rgba(240,244,255,0.5)" font-family="monospace">Energy &amp; Water Analytics</text>
        <!-- Bars -->
        <rect x="38" y="130" width="18" height="71" rx="3" fill="url(#bar2)" transform="rotate(180,47,130) translate(0,-130)"/>
        <rect x="62" y="130" width="18" height="90" rx="3" fill="url(#bar1)" transform="rotate(180,71,130) translate(0,-130)"/>
        <rect x="86" y="130" width="18" height="52" rx="3" fill="url(#bar2)" transform="rotate(180,95,130) translate(0,-130)"/>
        <rect x="110" y="130" width="18" height="100" rx="3" fill="url(#bar1)" transform="rotate(180,119,130) translate(0,-130)"/>
        <rect x="134" y="130" width="18" height="78" rx="3" fill="url(#bar2)" transform="rotate(180,143,130) translate(0,-130)"/>
        <rect x="158" y="130" width="18" height="61" rx="3" fill="url(#bar1)" transform="rotate(180,167,130) translate(0,-130)"/>
        <rect x="182" y="130" width="18" height="88" rx="3" fill="url(#bar2)" transform="rotate(180,191,130) translate(0,-130)"/>
        <!-- Trend line -->
        <polyline points="47,90 71,59 95,100 119,43 143,72 167,82 191,55" fill="none" stroke="#00d4ff" stroke-width="1.5" stroke-dasharray="3,2" opacity="0.7"/>
        <!-- X labels -->
        <text x="38" y="145" font-size="6" fill="rgba(255,255,255,0.3)" font-family="monospace">Mon</text>
        <text x="62" y="145" font-size="6" fill="rgba(255,255,255,0.3)" font-family="monospace">Tue</text>
        <text x="86" y="145" font-size="6" fill="rgba(255,255,255,0.3)" font-family="monospace">Wed</text>
        <text x="110" y="145" font-size="6" fill="rgba(255,255,255,0.3)" font-family="monospace">Thu</text>
        <text x="134" y="145" font-size="6" fill="rgba(255,255,255,0.3)" font-family="monospace">Fri</text>
        <!-- Anomaly spike -->
        <circle cx="119" cy="43" r="5" fill="none" stroke="#febc2e" stroke-width="1.5" filter="url(#glow2)"/>
        <!-- Right info panel -->
        <rect x="292" y="14" width="112" height="133" rx="8" fill="#080d18" stroke="rgba(0,212,255,0.2)" stroke-width="1"/>
        <text x="303" y="34" font-size="7.5" fill="rgba(240,244,255,0.5)" font-family="monospace">ML Model</text>
        <text x="303" y="52" font-size="9" fill="#22c55e" font-family="monospace" filter="url(#glow2)">94.2%</text>
        <text x="303" y="63" font-size="6" fill="rgba(255,255,255,0.3)" font-family="monospace">Accuracy</text>
        <rect x="303" y="72" width="85" height="1" fill="rgba(255,255,255,0.08)"/>
        <text x="303" y="88" font-size="7" fill="rgba(240,244,255,0.4)" font-family="monospace">Anomalies</text>
        <rect x="303" y="93" width="85" height="6" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="303" y="93" width="28" height="6" rx="2" fill="#febc2e"/>
        <text x="303" y="113" font-size="7" fill="rgba(240,244,255,0.4)" font-family="monospace">Savings</text>
        <text x="303" y="126" font-size="9" fill="#a855f7" font-family="monospace">23%↑</text>
        <rect x="296" y="135" width="100" height="5" rx="2" fill="rgba(254,188,46,0.15)" stroke="rgba(254,188,46,0.4)" stroke-width="0.5"/>
        <text x="310" y="140" font-size="5.5" fill="#febc2e" font-family="monospace">⚡ Anomaly Detected</text>
      </svg>
      <div class="pv-glow pv-glow-purple"></div>
    </div>`,

    3: `<div class="proj-visual proj-visual-3">
      <svg viewBox="0 0 420 160" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="g3a" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#22c55e" stop-opacity="0.15"/><stop offset="100%" stop-color="#00d4ff" stop-opacity="0.06"/></linearGradient>
          <filter id="glow3"><feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
          <filter id="glow3s"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        <rect width="420" height="160" fill="url(#g3a)" rx="12"/>
        <!-- Field map background -->
        <rect x="20" y="14" width="220" height="133" rx="8" fill="#060e10" stroke="rgba(34,197,94,0.25)" stroke-width="1"/>
        <text x="30" y="32" font-size="8" fill="rgba(240,244,255,0.4)" font-family="monospace">Soil Cluster Map</text>
        <!-- Grid lines -->
        <line x1="20" y1="80" x2="240" y2="80" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
        <line x1="130" y1="14" x2="130" y2="147" stroke="rgba(255,255,255,0.04)" stroke-width="0.5"/>
        <!-- Cluster 1: green -->
        <circle cx="75" cy="72" r="32" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.5)" stroke-width="1.2" filter="url(#glow3)"/>
        <circle cx="75" cy="72" r="6" fill="#22c55e" opacity="0.9"/>
        <text x="68" y="76" font-size="6.5" fill="#22c55e" font-family="monospace" font-weight="bold">K1</text>
        <!-- Cluster dots green -->
        <circle cx="60" cy="58" r="3" fill="#22c55e" opacity="0.8" filter="url(#glow3s)"/>
        <circle cx="88" cy="65" r="2.5" fill="#22c55e" opacity="0.7"/>
        <circle cx="65" cy="85" r="3" fill="#22c55e" opacity="0.75"/>
        <circle cx="90" cy="82" r="2" fill="#22c55e" opacity="0.6"/>
        <circle cx="55" cy="75" r="2" fill="#22c55e" opacity="0.65"/>
        <!-- Cluster 2: cyan -->
        <circle cx="155" cy="60" r="28" fill="rgba(0,212,255,0.10)" stroke="rgba(0,212,255,0.45)" stroke-width="1.2" filter="url(#glow3)"/>
        <circle cx="155" cy="60" r="6" fill="#00d4ff" opacity="0.9"/>
        <text x="148" y="64" font-size="6.5" fill="#00d4ff" font-family="monospace" font-weight="bold">K2</text>
        <circle cx="140" cy="48" r="3" fill="#00d4ff" opacity="0.8" filter="url(#glow3s)"/>
        <circle cx="168" cy="55" r="2.5" fill="#00d4ff" opacity="0.7"/>
        <circle cx="145" cy="70" r="2.5" fill="#00d4ff" opacity="0.65"/>
        <circle cx="168" cy="72" r="2" fill="#00d4ff" opacity="0.6"/>
        <!-- Cluster 3: purple -->
        <circle cx="160" cy="115" r="24" fill="rgba(168,85,247,0.10)" stroke="rgba(168,85,247,0.45)" stroke-width="1.2" filter="url(#glow3)"/>
        <circle cx="160" cy="115" r="6" fill="#a855f7" opacity="0.9"/>
        <text x="153" y="119" font-size="6.5" fill="#a855f7" font-family="monospace" font-weight="bold">K3</text>
        <circle cx="145" cy="104" r="3" fill="#a855f7" opacity="0.8" filter="url(#glow3s)"/>
        <circle cx="175" cy="110" r="2.5" fill="#a855f7" opacity="0.7"/>
        <circle cx="150" cy="126" r="2" fill="#a855f7" opacity="0.65"/>
        <!-- Right panel -->
        <rect x="252" y="14" width="152" height="133" rx="8" fill="#060e10" stroke="rgba(34,197,94,0.2)" stroke-width="1"/>
        <text x="263" y="32" font-size="7.5" fill="rgba(240,244,255,0.45)" font-family="monospace">Soil Profile</text>
        <text x="263" y="50" font-size="7" fill="rgba(240,244,255,0.3)" font-family="monospace">Nitrogen</text>
        <rect x="263" y="54" width="125" height="6" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="263" y="54" width="95" height="6" rx="2" fill="rgba(34,197,94,0.7)"/>
        <text x="263" y="73" font-size="7" fill="rgba(240,244,255,0.3)" font-family="monospace">Phosphorus</text>
        <rect x="263" y="77" width="125" height="6" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="263" y="77" width="70" height="6" rx="2" fill="rgba(0,212,255,0.7)"/>
        <text x="263" y="96" font-size="7" fill="rgba(240,244,255,0.3)" font-family="monospace">Potassium</text>
        <rect x="263" y="100" width="125" height="6" rx="2" fill="rgba(255,255,255,0.07)"/>
        <rect x="263" y="100" width="108" height="6" rx="2" fill="rgba(168,85,247,0.7)"/>
        <rect x="263" y="117" width="130" height="1" fill="rgba(255,255,255,0.07)"/>
        <text x="263" y="133" font-size="7.5" fill="#22c55e" font-family="monospace">Recommend:</text>
        <text x="263" y="144" font-size="8" fill="#22c55e" font-family="monospace" font-weight="bold">🌾 Rice / Wheat</text>
      </svg>
      <div class="pv-glow pv-glow-green"></div>
    </div>`
  };

  grid.innerHTML = PORTFOLIO_DATA.projects.map(p => `
    <div class="project-card reveal" style="--card-color: ${p.color}">
      ${visuals[p.id] || ''}
      <span class="project-type-badge">${p.type}</span>
      <h3 class="project-title">${p.title}</h3>
      <p class="project-tagline">${p.tagline}</p>
      <p class="project-description">${p.description}</p>
      <ul class="project-highlights">
        ${p.highlights.map(h => `
          <li class="project-highlight-item">${h}</li>
        `).join('')}
      </ul>
      <div class="project-tech">
        ${p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>
      <div class="project-footer">
        <span class="project-date">${p.date}</span>
        <div class="project-links">
          ${p.live ? `
            <a href="${p.live}" target="_blank" rel="noopener" class="project-link project-link-live">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                <polyline points="15 3 21 3 21 9"/>
                <line x1="10" y1="14" x2="21" y2="3"/>
              </svg>
              Live Demo
            </a>` : ''}
          <a href="${p.github}" target="_blank" rel="noopener" class="project-link project-link-github">
            <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── Certifications ──────────────────────────────────────────── */
function populateCertifications() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_DATA.certifications.map((c, i) => `
    <div class="cert-card reveal" data-cert-index="${i}" role="button" tabindex="0"
         aria-label="View certificate: ${c.title}">
      <div class="cert-image-wrap">
        <img src="${c.image}" alt="${c.title}" loading="lazy" />
        <div class="cert-overlay">🔍</div>
      </div>
      <div class="cert-info">
        <span class="cert-badge">${c.badge}</span>
        <div class="cert-title">${c.title}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-date">${c.date}</div>
      </div>
    </div>
  `).join('');
}

/* ── Experience ──────────────────────────────────────────────── */
function populateExperience() {
  const list = document.getElementById('experience-list');
  if (!list) return;

  list.innerHTML = PORTFOLIO_DATA.experience.map(e => `
    <div class="experience-card reveal">
      <div class="exp-header">
        <div class="exp-title-group">
          <span class="exp-icon">${e.icon}</span>
          <div>
            <div class="exp-role">${e.title}</div>
            <div class="exp-company">${e.company} &nbsp;·&nbsp; ${e.type}</div>
          </div>
        </div>
        <div class="exp-meta">
          <div>${e.duration}</div>
          <div>${e.location}</div>
          ${e.grade ? `<div class="exp-grade">Grade: ${e.grade}</div>` : ''}
        </div>
      </div>

      <p class="exp-description">${e.description}</p>

      <ul class="exp-responsibilities">
        ${e.responsibilities.map(r => `
          <li class="exp-resp-item">${r}</li>
        `).join('')}
      </ul>

      <div class="exp-tech">
        ${e.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
      </div>

      <div class="exp-outcome">
        <strong>Outcome:</strong> ${e.outcome}
      </div>
    </div>
  `).join('');
}

/* ── Competitive ──────────────────────────────────────────────── */
function populateCompetitive() {
  const list = document.getElementById('achievements-list');
  if (!list) return;

  list.innerHTML = PORTFOLIO_DATA.competitive.achievements.map(a => `
    <div class="achievement-card reveal">
      <span class="ach-badge">${a.badge}</span>
      <div>
        <div class="ach-type">${a.type.toUpperCase()}</div>
        <div class="ach-title">${a.title}</div>
        <div class="ach-org">${a.organizer} &nbsp;·&nbsp; ${a.date}</div>
        <p class="ach-desc">${a.description}</p>
      </div>
    </div>
  `).join('');
}

/* ── Open Source ─────────────────────────────────────────────── */
function populateOpenSource() {
  const stats = document.getElementById('oss-stats');
  if (!stats) return;

  stats.innerHTML = PORTFOLIO_DATA.opensource.stats.map(s => `
    <div class="oss-stat">
      <span class="oss-stat-value">${s.value}</span>
      <span class="oss-stat-label">${s.label}</span>
    </div>
  `).join('');
}

/* ── Blog ────────────────────────────────────────────────────── */
function populateBlog() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  grid.innerHTML = PORTFOLIO_DATA.blog.posts.map(post => `
    <div class="blog-card reveal" style="--card-color: ${post.color}">
      <span class="blog-tag">${post.tag}</span>
      <span class="blog-coming-soon">${post.date}</span>
      <h3 class="blog-title">${post.title}</h3>
      <p class="blog-excerpt">${post.excerpt}</p>
      <div class="blog-meta">
        <span>${post.readTime}</span>
        <span>✍️ Draft</span>
      </div>
    </div>
  `).join('');
}

/* ── Research ────────────────────────────────────────────────── */
function populateResearch() {
  const list = document.getElementById('research-list');
  if (!list) return;

  list.innerHTML = PORTFOLIO_DATA.research.items.map(r => `
    <div class="research-item reveal">
      <span class="research-icon">🔬</span>
      <div>
        <span class="research-type-badge">${r.type}</span>
        <h3 class="research-title">${r.title}</h3>
        <p class="research-desc">${r.description}</p>
        <div class="research-tags">
          ${r.tags.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
        <div class="research-status">${r.status} &nbsp;·&nbsp; ${r.date}</div>
      </div>
    </div>
  `).join('');
}

/* ══════════════════════════════════════════════════════════════
   3. NAVBAR — scroll glass effect + active state
   ══════════════════════════════════════════════════════════════ */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}

/* ══════════════════════════════════════════════════════════════
   4. MOBILE MENU
   ══════════════════════════════════════════════════════════════ */
function initMobileMenu() {
  const burger = document.getElementById('hamburger');
  const menu   = document.getElementById('mobileMenu');
  if (!burger || !menu) return;

  const toggle = () => {
    const open = burger.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.classList.toggle('mobile-open', open);
    burger.setAttribute('aria-expanded', String(open));
  };

  burger.addEventListener('click', toggle);

  // Close on link click
  menu.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
      document.body.classList.remove('mobile-open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   5. TYPEWRITER EFFECT
   ══════════════════════════════════════════════════════════════ */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const lines = PORTFOLIO_DATA.personal.taglines;
  let lineIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let pauseTicks = 0;

  const PAUSE_AFTER_TYPE   = 38; // ticks to pause after fully typed
  const PAUSE_AFTER_DELETE = 8;  // ticks to pause after fully deleted
  const TYPE_SPEED         = 55; // ms per character (typing)
  const DELETE_SPEED       = 28; // ms per character (deleting)

  function tick() {
    const current = lines[lineIdx];

    if (!deleting) {
      // Typing
      charIdx++;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === current.length) {
        // Fully typed — pause before deleting
        if (pauseTicks < PAUSE_AFTER_TYPE) {
          pauseTicks++;
          setTimeout(tick, TYPE_SPEED);
          return;
        }
        pauseTicks = 0;
        deleting = true;
        setTimeout(tick, DELETE_SPEED);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      // Deleting
      charIdx--;
      el.textContent = current.slice(0, charIdx);

      if (charIdx === 0) {
        // Fully deleted — pause then move to next line
        if (pauseTicks < PAUSE_AFTER_DELETE) {
          pauseTicks++;
          setTimeout(tick, DELETE_SPEED);
          return;
        }
        pauseTicks = 0;
        deleting = false;
        lineIdx = (lineIdx + 1) % lines.length;
        setTimeout(tick, TYPE_SPEED);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  // Start after hero animation completes
  setTimeout(tick, 1200);
}

/* ══════════════════════════════════════════════════════════════
   6. SCROLL REVEAL — IntersectionObserver
   ══════════════════════════════════════════════════════════════ */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Stagger children if parent has .reveal-stagger
          if (entry.target.classList.contains('reveal-stagger')) {
            entry.target.querySelectorAll('.reveal-child').forEach((child, i) => {
              setTimeout(() => child.classList.add('visible'), i * 80);
            });
          }
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  // Observe all .reveal elements (including dynamically created ones)
  // We use a MutationObserver to catch dynamically populated elements
  const observeAll = () => {
    document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
      observer.observe(el);
    });
  };

  // Initial run
  observeAll();

  // Watch for DOM changes (after data.js populates sections)
  const mutObs = new MutationObserver(observeAll);
  mutObs.observe(document.body, { childList: true, subtree: true });

  // Disconnect mutation observer after 3s (all content loaded by then)
  setTimeout(() => mutObs.disconnect(), 3000);
}

/* ══════════════════════════════════════════════════════════════
   7. ACTIVE NAV LINKS — highlight on scroll
   ══════════════════════════════════════════════════════════════ */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => observer.observe(s));
}

/* ══════════════════════════════════════════════════════════════
   8. COUNTER ANIMATION — summary stats
   ══════════════════════════════════════════════════════════════ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number[data-count]');

  const animateCounter = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 1400;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed  = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };

    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(c => observer.observe(c));
}

/* ══════════════════════════════════════════════════════════════
   9. SKILL BAR ANIMATION — fill on scroll
   ══════════════════════════════════════════════════════════════ */
function initSkillBars() {
  const animate = () => {
    document.querySelectorAll('.skill-bar-fill:not([data-animated])').forEach(bar => {
      const level = bar.dataset.level;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              // Small delay for stagger effect
              setTimeout(() => {
                bar.style.width = `${level}%`;
              }, 100);
              bar.setAttribute('data-animated', 'true');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(bar);
    });
  };

  // Run after DOM is populated
  setTimeout(animate, 300);

  // Re-run after data injection
  const mutObs = new MutationObserver(animate);
  mutObs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => mutObs.disconnect(), 3000);
}

/* ══════════════════════════════════════════════════════════════
   10. CERTIFICATION MODAL
   ══════════════════════════════════════════════════════════════ */
function initCertModal() {
  const modal    = document.getElementById('certModal');
  const backdrop = document.getElementById('certModalBackdrop');
  const closeBtn = document.getElementById('certModalClose');
  const imgEl    = document.getElementById('certModalImage');
  const titleEl  = document.getElementById('certModalTitle');
  const issuerEl = document.getElementById('certModalIssuer');
  const dateEl   = document.getElementById('certModalDate');

  if (!modal) return;

  // Open modal
  const openModal = (cert) => {
    imgEl.src       = cert.image;
    imgEl.alt       = cert.title;
    titleEl.textContent  = cert.title;
    issuerEl.textContent = `Issuer: ${cert.issuer}`;
    dateEl.textContent   = `Date: ${cert.date}${cert.expiry ? ` · ${cert.expiry}` : ''}`;
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
  };

  // Click on cert cards (event delegation — works after dynamic injection)
  document.getElementById('certs-grid')?.addEventListener('click', (e) => {
    const card = e.target.closest('.cert-card');
    if (!card) return;
    const idx  = parseInt(card.dataset.certIndex, 10);
    const cert = PORTFOLIO_DATA.certifications[idx];
    if (cert) openModal(cert);
  });

  // Keyboard open (accessibility)
  document.getElementById('certs-grid')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.cert-card');
      if (!card) return;
      const idx  = parseInt(card.dataset.certIndex, 10);
      const cert = PORTFOLIO_DATA.certifications[idx];
      if (cert) openModal(cert);
    }
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hasAttribute('hidden')) closeModal();
  });
}

/* ══════════════════════════════════════════════════════════════
   11. CONTACT FORM — EmailJS + validation + auto-reply
   ══════════════════════════════════════════════════════════════ */
function initContactForm() {
  const form       = document.getElementById('contactForm');
  if (!form) return;

  const submitBtn  = document.getElementById('form-submit-btn');
  const btnText    = document.getElementById('form-btn-text');
  const btnLoader  = document.getElementById('form-btn-loader');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error-msg');

  /* ── Validation helpers ─── */
  const validators = {
    'form-name':    v => v.trim().length >= 2  ? '' : 'Please enter your name (min 2 characters)',
    'form-email':   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email address',
    'form-subject': v => v.trim().length >= 3  ? '' : 'Subject must be at least 3 characters',
    'form-message': v => v.trim().length >= 10 ? '' : 'Message must be at least 10 characters'
  };

  const showError = (id, msg) => {
    const el = document.getElementById(`error-${id.replace('form-', '')}`);
    const input = document.getElementById(id);
    if (el) el.textContent = msg;
    if (input) input.style.borderColor = msg ? '#ff6b6b' : '';
  };

  const clearError = (id) => showError(id, '');

  // Live validation on blur
  Object.keys(validators).forEach(id => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener('blur', () => {
      showError(id, validators[id](input.value));
    });
    input.addEventListener('input', () => {
      if (document.getElementById(`error-${id.replace('form-', '')}`).textContent) {
        showError(id, validators[id](input.value));
      }
    });
  });

  /* ── Form submit ─── */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate all fields
    let hasError = false;
    Object.keys(validators).forEach(id => {
      const input = document.getElementById(id);
      const err   = validators[id](input?.value ?? '');
      showError(id, err);
      if (err) hasError = true;
    });
    if (hasError) return;

    // Show loading state
    submitBtn.disabled = true;
    btnText.hidden     = true;
    btnLoader.removeAttribute('hidden');
    successMsg.setAttribute('hidden', '');
    errorMsg.setAttribute('hidden', '');

    const templateParams = {
      from_name:  document.getElementById('form-name').value.trim(),
      from_email: document.getElementById('form-email').value.trim(),
      subject:    document.getElementById('form-subject').value.trim(),
      message:    document.getElementById('form-message').value.trim(),
      to_name:    'Namith Chowdary',
      reply_to:   document.getElementById('form-email').value.trim()
    };

    try {
      if (typeof emailjs === 'undefined') {
        throw new Error('EmailJS not loaded');
      }

      // Check if EmailJS is properly configured
      if (
        EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY_HERE' ||
        EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID_HERE' ||
        EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID_HERE'
      ) {
        // Fallback: open mailto link
        const subject = encodeURIComponent(templateParams.subject);
        const body    = encodeURIComponent(
          `From: ${templateParams.from_name} <${templateParams.from_email}>\n\n${templateParams.message}`
        );
        window.location.href = `mailto:namithchowdary143@gmail.com?subject=${subject}&body=${body}`;
        successMsg.removeAttribute('hidden');
        successMsg.textContent = '✅ Opening your email client...';
        form.reset();
        setTimeout(() => {
          successMsg.setAttribute('hidden', '');
          successMsg.textContent = '✅ Message sent! I\'ll get back to you soon.';
        }, 5000);
        return;
      }

      // Send main email TO Namith
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        templateParams
      );

      // Send auto-reply TO the user
      await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.AUTO_REPLY_TEMPLATE_ID,
        {
          ...templateParams,
          to_email: templateParams.from_email,
          to_name:  templateParams.from_name
        }
      );

      // Success state
      successMsg.removeAttribute('hidden');
      form.reset();
      Object.keys(validators).forEach(id => clearError(id));

      // Auto-hide success after 6s
      setTimeout(() => successMsg.setAttribute('hidden', ''), 6000);

    } catch (err) {
      console.error('EmailJS error:', err);
      errorMsg.removeAttribute('hidden');
      setTimeout(() => errorMsg.setAttribute('hidden', ''), 8000);
    } finally {
      submitBtn.disabled = false;
      btnText.hidden     = false;
      btnLoader.setAttribute('hidden', '');
    }
  });
}

/* ══════════════════════════════════════════════════════════════
   12. SMOOTH SCROLL — anchor links with offset
   ══════════════════════════════════════════════════════════════ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 70;
      const top    = target.getBoundingClientRect().top + window.scrollY - navH - 8;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ══════════════════════════════════════════════════════════════
   13. HOVER CURSOR — add class on interactive elements
   ══════════════════════════════════════════════════════════════ */
function initHoverCursor() {
  const hoverTargets = 'a, button, .cert-card, .project-card, .achievement-card, .chip, .nav-link, .social-pill, .quick-reply-btn';

  const addHover = (el) => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  };

  // Initial elements
  document.querySelectorAll(hoverTargets).forEach(addHover);

  // Watch for dynamically added elements
  const obs = new MutationObserver(() => {
    document.querySelectorAll(`${hoverTargets}:not([data-hover-bound])`).forEach(el => {
      el.setAttribute('data-hover-bound', '1');
      addHover(el);
    });
  });
  obs.observe(document.body, { childList: true, subtree: true });
  setTimeout(() => obs.disconnect(), 4000);
}

/* ══════════════════════════════════════════════════════════════
   14. SPLINE 3D AVATAR — load, reveal, fallback
   ══════════════════════════════════════════════════════════════ */
function initSpline() {
  const container = document.querySelector('.spline-container');
  const iframe    = document.getElementById('spline-avatar');
  if (!container || !iframe) return;

  if (window.innerWidth < 768) {
    container.style.display = 'none';
    return;
  }

  const shimmer = document.getElementById('splineShimmer');

  const revealSpline = () => {
    container.style.opacity = '1';
    if (shimmer) shimmer.style.display = 'none';
  };

  // iframe fires 'load' when Spline scene finishes
  iframe.addEventListener('load', () => {
    setTimeout(revealSpline, 600);
  });

  // Fallback — show after 4s even if load event missed (common with Spline)
  setTimeout(() => {
    revealSpline();
  }, 4000);

  window.addEventListener('resize', () => {
    container.style.display = window.innerWidth < 768 ? 'none' : '';
  }, { passive: true });
}

/* ── Fallback orb shown if Spline fails to load ─────────────── */
function injectFallbackOrb(container) {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;';
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let W, H, particles, orbAngle = 0;

  const resize = () => {
    W = canvas.width  = container.offsetWidth;
    H = canvas.height = container.offsetHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COUNT = 80;
  const mkParticles = () => Array.from({ length: COUNT }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    r: Math.random() * 2 + 0.4,
    dx: (Math.random() - 0.5) * 0.4,
    dy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.15
  }));
  particles = mkParticles();

  function draw() {
    ctx.clearRect(0, 0, W, H);
    const cx = W * 0.6, cy = H * 0.5;
    const baseR = Math.min(W, H) * 0.26;

    // Glow rings
    for (let i = 3; i >= 1; i--) {
      const rr   = baseR + i * 22 + Math.sin(orbAngle * 0.7 + i) * 8;
      const grad = ctx.createRadialGradient(cx, cy, rr * 0.3, cx, cy, rr);
      grad.addColorStop(0, `rgba(0,212,255,${0.04 * i})`);
      grad.addColorStop(1, 'rgba(0,212,255,0)');
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
    }

    // Core orb
    const cr   = baseR * 0.55 + Math.sin(orbAngle) * 5;
    const cg   = ctx.createRadialGradient(cx - cr * 0.25, cy - cr * 0.2, cr * 0.05, cx, cy, cr);
    cg.addColorStop(0,   'rgba(180,240,255,0.95)');
    cg.addColorStop(0.3, 'rgba(0,212,255,0.7)');
    cg.addColorStop(0.7, 'rgba(100,50,255,0.45)');
    cg.addColorStop(1,   'rgba(168,85,247,0)');
    ctx.beginPath(); ctx.arc(cx, cy, cr, 0, Math.PI * 2);
    ctx.fillStyle = cg; ctx.fill();

    // Horizontal orbit ring
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(orbAngle * 0.4); ctx.scale(1, 0.34);
    ctx.beginPath(); ctx.arc(0, 0, baseR * 0.82, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0,212,255,0.22)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();

    // Vertical orbit ring
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-orbAngle * 0.25); ctx.scale(0.28, 1);
    ctx.beginPath(); ctx.arc(0, 0, baseR * 0.9, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(168,85,247,0.18)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();

    // Particles + connections
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      particles.forEach(q => {
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < 80) {
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,212,255,${(1 - d / 80) * 0.06})`;
          ctx.lineWidth = 0.5; ctx.stroke();
        }
      });
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,212,255,${p.alpha})`; ctx.fill();
    });

    orbAngle += 0.012;
    requestAnimationFrame(draw);
  }
  draw();
}

/* ══════════════════════════════════════════════════════════════
   15. PAGE LOADER — dismiss after content is ready
   ══════════════════════════════════════════════════════════════ */
function initPageLoader() { /* removed — intro screen handles entry */ }

/* ══════════════════════════════════════════════════════════════
   16. BACK TO TOP BUTTON
   ══════════════════════════════════════════════════════════════ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  // Show button when user has scrolled down 400px
  const onScroll = () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ══════════════════════════════════════════════════════════════
   UTILITY — expose scroll-to-section globally
   (used by chatbot.js in Phase 6)
   ══════════════════════════════════════════════════════════════ */
window.scrollToSection = function(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 70;
  const top  = target.getBoundingClientRect().top + window.scrollY - navH - 8;
  window.scrollTo({ top, behavior: 'smooth' });
};

/* ══════════════════════════════════════════════════════════════
   THEME TOGGLE — light / dark switch with persistence
   ══════════════════════════════════════════════════════════════ */
function initThemeToggle() {
  const btn  = document.getElementById('theme-toggle');
  const icon = document.getElementById('toggle-icon');
  if (!btn) return;

  // Restore saved preference
  const saved = localStorage.getItem('namith-theme') || 'dark';
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const next    = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('namith-theme', next);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (icon) icon.textContent = theme === 'dark' ? '🌙' : '☀️';
  }
}

/* ══════════════════════════════════════════════════════════════
   SPLINE GLOBAL BACKGROUND — fade in after load
   ══════════════════════════════════════════════════════════════ */
function initIntroScreen() {
  const screen   = document.getElementById('intro-screen');
  const canvas   = document.getElementById('intro-canvas');
  const bar      = document.getElementById('introBar');
  const hint     = document.getElementById('introHint');
  if (!screen) return;

  document.body.classList.add('intro-active');

  /* ── Particle canvas ── */
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, pts = [], raf;
    const resize = () => { W = canvas.width = innerWidth; H = canvas.height = innerHeight; };
    resize();
    window.addEventListener('resize', resize, { passive: true });
    for (let i = 0; i < 70; i++) pts.push({
      x: Math.random()*2e4, y: Math.random()*2e4,
      dx:(Math.random()-.5)*.25, dy:(Math.random()-.5)*.25,
      r: Math.random()*1.3+.3,
      a: Math.random()*.45+.1,
      c: Math.random()>.5 ? '0,212,255,' : '168,85,247,',
      p: Math.random()*Math.PI*2, s:.01+Math.random()*.008
    });
    let ang = 0;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      ang+=.005;
      const cx=W/2, cy=H/2;
      for(let i=3;i>=1;i--){
        const r=120+i*50+Math.sin(ang+i)*12;
        const g=ctx.createRadialGradient(cx,cy,r*.2,cx,cy,r);
        g.addColorStop(0,`rgba(0,212,255,${.018*i})`);
        g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(cx,cy,r,0,Math.PI*2); ctx.fill();
      }
      pts.forEach(p=>{
        p.p+=p.s; p.x+=p.dx; p.y+=p.dy;
        if(p.x<0)p.x=W; if(p.x>W)p.x=0;
        if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(${p.c}${p.a*(0.55+0.45*Math.sin(p.p))})`;
        ctx.fill();
      });
      for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].x-pts[j].x, dy=pts[i].y-pts[j].y, d=Math.sqrt(dx*dx+dy*dy);
        if(d<80){ ctx.beginPath(); ctx.moveTo(pts[i].x,pts[i].y); ctx.lineTo(pts[j].x,pts[j].y);
          ctx.strokeStyle=`rgba(0,212,255,${.06*(1-d/80)})`; ctx.lineWidth=.5; ctx.stroke(); }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    screen._stopCanvas = ()=>cancelAnimationFrame(raf);
  }

  /* ── Progress bar — fills in exactly 2s then auto-dismiss ── */
  const DURATION = 2000;
  const t0 = performance.now();
  let pct = 0;
  const tick = now => {
    pct = Math.min(100, ((now - t0) / DURATION) * 100);
    if (bar) bar.style.width = pct + '%';
    if (pct < 100) requestAnimationFrame(tick);
    else setTimeout(dismiss, 200);
  };
  requestAnimationFrame(tick);

  /* ── Dismiss ── */
  let gone = false;
  const dismiss = () => {
    if (gone) return; gone = true;
    document.body.classList.remove('intro-active');
    if (screen._stopCanvas) screen._stopCanvas();
    screen.classList.add('exit');
    setTimeout(() => screen.classList.add('gone'), 720);
  };

  /* Click anywhere or any key to skip early */
  screen.addEventListener('click', dismiss);
  document.addEventListener('keydown', dismiss, { once: true });
  if (hint) hint.addEventListener('click', dismiss);
}

/* ══════════════════════════════════════════════════════════════
   CSS ROBOT CURSOR TRACKING — no Three.js, instant, smooth
   ══════════════════════════════════════════════════════════════ */
function initRobotTracking() {
  const robot = document.getElementById('introRobot');
  const head  = robot ? robot.querySelector('.ir-head') : null;
  if (!robot || !head) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let raf;

  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    // Normalize -1 to 1
    targetX = (e.clientX - cx) / cx;
    targetY = (e.clientY - cy) / cy;
  });

  const LERP = 0.07;
  const animate = () => {
    if (!document.getElementById('introRobot')) return;
    currentX += (targetX - currentX) * LERP;
    currentY += (targetY - currentY) * LERP;

    // Robot body leans toward cursor
    robot.style.transform = `translateY(calc(-50% + ${currentY * 8}px)) rotate(${currentX * 3}deg)`;

    // Head tracks cursor more aggressively
    head.style.transform = `rotate(${currentX * 6}deg) rotateX(${-currentY * 4}deg)`;

    raf = requestAnimationFrame(animate);
  };
  animate();

  // Stop when intro is gone
  const observer = new MutationObserver(() => {
    if (!document.getElementById('introRobot')) {
      cancelAnimationFrame(raf);
      observer.disconnect();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// Call it from DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  // Only run if intro screen exists
  if (document.getElementById('intro-screen')) initRobotTracking();
});
