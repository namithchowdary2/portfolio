'use strict';
(function () {
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  /* inject CSS first */
  const s = document.createElement('style');
  s.textContent = `
    html, body, *, *::before, *::after { cursor: none !important; }
    #nc-dot {
      position: fixed;
      width: 10px; height: 10px;
      background: #00d4ff;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483647;
      top: 0; left: 0;
      transform: translate(-50%, -50%);
      box-shadow: 0 0 12px 4px rgba(0,212,255,0.8);
      transition: width .15s, height .15s, background .15s, box-shadow .15s;
      will-change: transform;
    }
    #nc-ring {
      position: fixed;
      width: 36px; height: 36px;
      border: 1.5px solid rgba(0,212,255,0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: 2147483646;
      top: 0; left: 0;
      transform: translate(-50%, -50%);
      transition: width .2s, height .2s, border-color .2s;
      will-change: transform;
    }
    body.nc-hover #nc-dot {
      width: 14px; height: 14px;
      background: #a855f7;
      box-shadow: 0 0 16px 6px rgba(168,85,247,0.9);
    }
    body.nc-hover #nc-ring {
      width: 48px; height: 48px;
      border-color: rgba(168,85,247,0.55);
    }
    #cursor-dot, #cursor-trail { display: none !important; }
    #scorpion-canvas { display: none !important; }
  `;
  document.head.appendChild(s);

  const dot  = document.createElement('div'); dot.id  = 'nc-dot';
  const ring = document.createElement('div'); ring.id = 'nc-ring';

  function mount() {
    document.body.appendChild(dot);
    document.body.appendChild(ring);
  }
  document.body ? mount() : document.addEventListener('DOMContentLoaded', mount);

  let mx = -200, my = -200, rx = -200, ry = -200;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });

  /* lerp ring */
  (function loop() {
    rx += (mx - rx) * 0.11;
    ry += (my - ry) * 0.11;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(loop);
  })();

  /* hover */
  const HOVER = 'a,button,[role=button],label,.project-card,.cert-card,.chip,.nav-link,.social-pill,.btn-primary,.btn-secondary,.btn-outline,.nav-resume-btn,.chatbot-orb,.project-link,.intro-enter,#theme-toggle';
  document.addEventListener('mouseover', e => {
    document.body.classList.toggle('nc-hover', !!e.target.closest(HOVER));
  });

  /* click shrink + ripple */
  document.addEventListener('mousedown', () => { dot.style.transform = 'translate(-50%,-50%) scale(0.6)'; });
  document.addEventListener('mouseup',   () => { dot.style.transform = 'translate(-50%,-50%) scale(1)'; });
  document.addEventListener('click', e => {
    const r = document.createElement('div');
    r.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:8px;height:8px;border-radius:50%;pointer-events:none;
      z-index:2147483645;border:1.5px solid rgba(0,212,255,.9);
      transform:translate(-50%,-50%);
      transition:transform .5s ease-out,opacity .5s ease-out,border-color .3s;`;
    document.body.appendChild(r);
    requestAnimationFrame(() => {
      r.style.transform = 'translate(-50%,-50%) scale(11)';
      r.style.opacity = '0';
      r.style.borderColor = 'rgba(168,85,247,.25)';
    });
    setTimeout(() => r.remove(), 560);
  });

  document.addEventListener('mouseleave', () => { dot.style.opacity='0'; ring.style.opacity='0'; });
  document.addEventListener('mouseenter', () => { dot.style.opacity='1'; ring.style.opacity='1'; });
})();
