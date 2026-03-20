/* ============================================================
   scorpion.js — Scorpion cursor that follows mouse everywhere
   Fixes: waits for Three.js to load before init
   ============================================================ */
'use strict';

(function () {
  const isMobile = 'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 || window.innerWidth < 768;
  if (isMobile) return;

  /* Wait until Three.js is actually available */
  function waitForThree(cb, tries) {
    tries = tries || 0;
    if (typeof THREE !== 'undefined') { cb(); return; }
    if (tries > 80) { console.warn('Three.js never loaded'); return; }
    setTimeout(() => waitForThree(cb, tries + 1), 100);
  }

  waitForThree(buildScorpion);

  function buildScorpion() {
    const canvas = document.getElementById('scorpion-canvas');
    if (!canvas) return;

    /* ── Renderer ── */
    const W = window.innerWidth, H = window.innerHeight;
    const scene    = new THREE.Scene();
    const aspect   = W / H;
    const cam      = new THREE.OrthographicCamera(
      -aspect * 5, aspect * 5, 5, -5, 0.1, 100
    );
    cam.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas, alpha: true, antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const kl = new THREE.PointLight(0x00d4ff, 5, 20);
    kl.position.set(3, 4, 8); scene.add(kl);
    const fl = new THREE.PointLight(0xa855f7, 3, 15);
    fl.position.set(-2, -2, 6); scene.add(fl);

    /* ── Mats ── */
    const bMat  = new THREE.MeshPhongMaterial({ color:0x050d1a, emissive:0x001a30, specular:0x00d4ff, shininess:160 });
    const gMat  = new THREE.MeshPhongMaterial({ color:0x00d4ff, emissive:0x003355, specular:0x00ffff, shininess:220 });
    const sMat  = new THREE.MeshPhongMaterial({ color:0xa855f7, emissive:0x330044, specular:0xff88ff, shininess:220 });

    /* ── Scorpion group ── */
    const S = new THREE.Group();

    const mk = (geo, mat) => new THREE.Mesh(geo, mat);

    // Body
    const bodyGeo = THREE.CapsuleGeometry
      ? new THREE.CapsuleGeometry(0.19, 0.34, 6, 12)
      : new THREE.SphereGeometry(0.24, 10, 8);
    const body = mk(bodyGeo, bMat);
    body.rotation.z = Math.PI / 2; S.add(body);

    // Head
    const hd = mk(new THREE.SphereGeometry(0.14, 10, 8), bMat);
    hd.position.set(0.36, 0.04, 0); hd.scale.set(1.1, 0.85, 0.9); S.add(hd);

    // Eyes
    const eGeo = new THREE.SphereGeometry(0.022, 6, 6);
    [-0.045, 0.045].forEach(z => {
      const e = mk(eGeo, gMat); e.position.set(0.46, 0.09, z); S.add(e);
    });

    // Tail
    const tailPts = [
      [-0.25, 0.06], [-0.44, 0.16], [-0.58, 0.33],
      [-0.66, 0.52], [-0.70, 0.70]
    ];
    const tailSegs = [];
    tailPts.forEach(([x, y], i) => {
      const r = Math.max(0.088 - i * 0.012, 0.038);
      const seg = mk(new THREE.SphereGeometry(r, 8, 6), i === 4 ? sMat : bMat);
      seg.position.set(x, y, 0); S.add(seg); tailSegs.push(seg);
    });

    // Stinger
    const st = mk(new THREE.ConeGeometry(0.032, 0.17, 7), sMat);
    st.position.set(-0.70, 0.88, 0); st.rotation.z = -0.55; S.add(st);
    const sl = new THREE.PointLight(0xa855f7, 2, 1.0);
    sl.position.set(-0.70, 0.90, 0); S.add(sl);

    // Claws
    [0.10, -0.10].forEach(z => {
      const cg = new THREE.Group(); cg.position.set(0.44, 0, z);
      const arm = mk(new THREE.CylinderGeometry(0.026, 0.032, 0.24, 6), bMat);
      arm.rotation.z = Math.PI / 2; arm.position.set(0.12, 0, 0); cg.add(arm);
      const pA = mk(new THREE.ConeGeometry(0.024, 0.13, 6), gMat);
      pA.position.set(0.26, 0.06, 0); pA.rotation.z = -Math.PI / 3; cg.add(pA);
      const pB = mk(new THREE.ConeGeometry(0.019, 0.11, 6), gMat);
      pB.position.set(0.26, -0.06, 0); pB.rotation.z = Math.PI / 3; cg.add(pB);
      S.add(cg);
    });

    // Legs (4 pairs)
    [[0.18,0.21],[0.18,-0.21],[0.05,0.22],[0.05,-0.22],
     [-0.07,0.21],[-0.07,-0.21],[-0.17,0.19],[-0.17,-0.19]
    ].forEach(([x, z]) => {
      const lg = new THREE.Group(); lg.position.set(x, 0, z);
      const up = mk(new THREE.CylinderGeometry(0.013, 0.011, 0.18, 5), bMat);
      up.rotation.x = (z > 0 ? 1 : -1) * 0.5;
      up.rotation.z = (z > 0 ? 1 : -1) * 0.2;
      up.position.set(0, -0.09, z * 0.4); lg.add(up);
      const lo = mk(new THREE.CylinderGeometry(0.010, 0.008, 0.15, 5), bMat);
      lo.position.set(0, -0.20, z * 0.7);
      lo.rotation.x = (z > 0 ? 1 : -1) * 0.85; lg.add(lo);
      S.add(lg);
    });

    S.scale.setScalar(0.44);
    scene.add(S);

    /* ── Mouse tracking ── */
    let mx = 0, my = 0, cx = 0, cy = 0, px = 0, py = 0, t = 0;

    function toWorld(px, py) {
      return {
        x:  (px / window.innerWidth  - 0.5) * 2 * (window.innerWidth / window.innerHeight) * 5,
        y: -(py / window.innerHeight - 0.5) * 2 * 5
      };
    }

    /* Start scorpion at center */
    const center = toWorld(window.innerWidth / 2, window.innerHeight / 2);
    mx = cx = px = center.x;
    my = cy = py = center.y;

    document.addEventListener('mousemove', e => {
      const w = toWorld(e.clientX, e.clientY);
      mx = w.x; my = w.y;
    });

    /* ── Animate ── */
    function animate() {
      requestAnimationFrame(animate);
      t += 0.016;

      cx += (mx - cx) * 0.13;
      cy += (my - cy) * 0.13;
      S.position.set(cx + 0.12, cy - 0.12, 0);

      const dx = cx - px, dy = cy - py;
      if (Math.abs(dx) > 0.003 || Math.abs(dy) > 0.003) {
        const ang = Math.atan2(dy, dx);
        S.rotation.z += (ang - S.rotation.z) * 0.10;
      }
      px = cx; py = cy;

      tailSegs.forEach((seg, i) => {
        seg.rotation.z = Math.sin(t * 1.3 + i * 0.5) * 0.07;
      });

      const br = 1 + Math.sin(t * 1.5) * 0.022;
      S.scale.setScalar(0.44 * br);
      renderer.render(scene, cam);
    }
    animate();

    /* ── Resize ── */
    window.addEventListener('resize', () => {
      if (window.innerWidth < 768) { canvas.style.display = 'none'; return; }
      canvas.style.display = 'block';
      const nW = window.innerWidth, nH = window.innerHeight;
      const nA = nW / nH;
      cam.left = -nA * 5; cam.right = nA * 5;
      cam.top = 5; cam.bottom = -5;
      cam.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    }, { passive: true });
  }
})();
