import { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface Props {
  onSectionClick: (id: string) => void;
}

interface NodeObj {
  mesh: THREE.Mesh;
  vel: THREE.Vector3;
  origin: THREE.Vector3;
  isHub: boolean;
  section?: string;
  labelEl?: HTMLElement;
}

interface HubDef {
  section: string;
  pos: THREE.Vector3;
  color: number;
  label?: string;
  radius?: number;
  emissiveIntensity?: number;
}

export function NeuralScene({ onSectionClick }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onSectionClickRef = useRef(onSectionClick);
  useEffect(() => { onSectionClickRef.current = onSectionClick; }, [onSectionClick]);

  const init = useCallback(() => {
    const mount = mountRef.current;
    if (!mount) return () => {};

    let W = window.innerWidth;
    let H = window.innerHeight;

    /* ── Renderer ─────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ───────────────────────────────── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03060c, 0.017);

    const camera = new THREE.PerspectiveCamera(58, W / H, 0.1, 200);
    camera.position.set(0, 0, 22);

    /* ── Lights ───────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const lA = new THREE.PointLight(0x7dc8ff, 4, 60);
    lA.position.set(10, 8, 10);
    scene.add(lA);
    const lB = new THREE.PointLight(0xe8ae61, 4, 60);
    lB.position.set(-10, -8, 10);
    scene.add(lB);

    /* ── Central black hole + accretion ring ─────────── */
    const blackHoleCore = new THREE.Mesh(
      new THREE.SphereGeometry(1.15, 32, 32),
      new THREE.MeshStandardMaterial({
        color: 0x020203,
        emissive: 0x050505,
        emissiveIntensity: 0.2,
        roughness: 0.2,
        metalness: 0.9,
      })
    );
    scene.add(blackHoleCore);

    const lensHalo = new THREE.Mesh(
      new THREE.SphereGeometry(1.65, 28, 28),
      new THREE.MeshBasicMaterial({
        color: 0xa6d9ff,
        transparent: true,
        opacity: 0.08,
      })
    );
    scene.add(lensHalo);

    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xe9b56e,
      transparent: true,
      opacity: 0.42,
      side: THREE.DoubleSide,
    });
    const accretionRing = new THREE.Mesh(new THREE.TorusGeometry(3.5, 0.45, 24, 120), ringMat);
    accretionRing.rotation.x = Math.PI * 0.42;
    accretionRing.rotation.z = Math.PI * 0.12;
    scene.add(accretionRing);

    const innerRing = new THREE.Mesh(
      new THREE.TorusGeometry(2.45, 0.16, 20, 90),
      new THREE.MeshBasicMaterial({
        color: 0xffebc6,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      })
    );
    innerRing.rotation.copy(accretionRing.rotation);
    scene.add(innerRing);

    const dustCount = 1500;
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 2.6 + Math.random() * 4.2;
      const wobble = (Math.random() - 0.5) * 0.55;
      dustPos[i * 3] = Math.cos(a) * r;
      dustPos[i * 3 + 1] = Math.sin(a) * r;
      dustPos[i * 3 + 2] = wobble;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustDisk = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({
        color: 0xf4d8a8,
        size: 0.04,
        transparent: true,
        opacity: 0.55,
      })
    );
    dustDisk.rotation.x = Math.PI * 0.42;
    dustDisk.rotation.z = Math.PI * 0.12;
    scene.add(dustDisk);

    const blackHoleSystem = new THREE.Group();
    blackHoleSystem.add(blackHoleCore);
    blackHoleSystem.add(lensHalo);
    blackHoleSystem.add(accretionRing);
    blackHoleSystem.add(innerRing);
    blackHoleSystem.add(dustDisk);
    scene.add(blackHoleSystem);

    /* ── Stars ────────────────────────────────────────── */
    const starPos = new Float32Array(3600 * 3);
    for (let i = 0; i < starPos.length; i++) starPos[i] = (Math.random() - 0.5) * 120;
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(
      starGeo,
      new THREE.PointsMaterial({ color: 0xdceaff, size: 0.05, transparent: true, opacity: 0.52 })
    );
    scene.add(stars);

    /* ── Hub nodes ────────────────────────────────────── */
    const HUB_DEFS: HubDef[] = [
      { section: 'about', pos: new THREE.Vector3(-9.2, 4.8, 0), color: 0x8dcfff, label: '◈ MISSION LOG' },
      { section: 'skills', pos: new THREE.Vector3(-4.2, -6.0, 0), color: 0xbfdaee, label: '◈ SYSTEMS' },
      { section: 'experience', pos: new THREE.Vector3(0.6, -7.2, 0), color: 0xadc8ff, label: '◈ FLIGHT LOG' },
      { section: 'projects', pos: new THREE.Vector3(2.2, 5.8, 0), color: 0xf2bd74, label: '◈ DOCKS' },
      { section: 'resume', pos: new THREE.Vector3(7.0, -4.9, 0), color: 0xf6d7ab, label: '◈ ARCHIVE' },
      { section: 'contact', pos: new THREE.Vector3(10.8, 3.9, 0), color: 0xcbe6ff, label: '◈ UPLINK' },
      // Hidden knowledge planet: near the accretion ring, no floating label.
      { section: 'developer', pos: new THREE.Vector3(2.5, -1.5, 0.65), color: 0x9ac9ff, radius: 0.36, emissiveIntensity: 0.72 },
    ];

    /* ── Label container ──────────────────────────────── */
    const labelContainer = document.createElement('div');
    labelContainer.style.cssText = 'position:fixed;top:0;left:0;pointer-events:none;z-index:2;';
    document.body.appendChild(labelContainer);

    /* ── Node collection ──────────────────────────────── */
    const nodes: NodeObj[] = [];

    const sphereGeo = (r: number) => new THREE.SphereGeometry(r, 14, 14);

    /* Hub nodes */
    HUB_DEFS.forEach((def) => {
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: def.emissiveIntensity ?? 1.2,
        transparent: true, opacity: 0.95,
      });
      const mesh = new THREE.Mesh(sphereGeo(def.radius ?? 0.45), mat);
      mesh.position.copy(def.pos);
      mesh.userData.section = def.section;
      scene.add(mesh);

      /* Outer glow ring */
      const ringMat = new THREE.MeshStandardMaterial({
        color: def.color, emissive: def.color, emissiveIntensity: 0.5,
        transparent: true, opacity: 0.15, side: THREE.FrontSide,
      });
      const ring = new THREE.Mesh(sphereGeo(0.7), ringMat);
      mesh.add(ring);

      /* HTML label */
      let el: HTMLElement | undefined;
      if (def.label) {
        el = document.createElement('div');
        el.textContent = def.label;
        el.style.cssText = `
          position:absolute;
          font-family:'JetBrains Mono',monospace;
          font-size:11px;
          letter-spacing:.12em;
          color:#${def.color.toString(16).padStart(6,'0')};
          text-shadow:0 0 12px #${def.color.toString(16).padStart(6,'0')};
          white-space:nowrap;
          transform:translate(-50%,0);
          transition:opacity .3s;
          background:rgba(3,0,20,.7);
          padding:3px 10px;
          border-radius:20px;
          border:1px solid rgba(255,255,255,.1);
          pointer-events:none;
        `;
        labelContainer.appendChild(el);
      }

      nodes.push({
        mesh,
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.01, (Math.random() - 0.5) * 0.01, 0),
        origin: def.pos.clone(),
        isHub: true,
        section: def.section,
        labelEl: el,
      });
    });

    /* Regular nodes */
    const COLORS = [0x8dcfff, 0xbfdaf2, 0xf2bd74, 0xf6d7ab, 0xdceaff];
    for (let i = 0; i < 90; i++) {
      const c = COLORS[i % COLORS.length];
      const r = 0.06 + Math.random() * 0.1;
      const mat = new THREE.MeshStandardMaterial({
        color: c, emissive: c,
        emissiveIntensity: 0.4 + Math.random() * 0.5,
        transparent: true, opacity: 0.4 + Math.random() * 0.4,
      });
      const mesh = new THREE.Mesh(sphereGeo(r), mat);
      const origin = new THREE.Vector3(
        (Math.random() - 0.5) * 32,
        (Math.random() - 0.5) * 22,
        (Math.random() - 0.5) * 12
      );
      mesh.position.copy(origin);
      scene.add(mesh);
      nodes.push({
        mesh,
        vel: new THREE.Vector3((Math.random() - 0.5) * 0.025, (Math.random() - 0.5) * 0.025, (Math.random() - 0.5) * 0.01),
        origin: origin.clone(),
        isHub: false,
      });
    }

    /* ── Connection lines (pre-allocated pool) ────────── */
    const MAX_LINES = 250;
    const lineGeos: THREE.BufferGeometry[] = [];
    const lineMats: THREE.LineBasicMaterial[] = [];
    for (let i = 0; i < MAX_LINES; i++) {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));
      const mat = new THREE.LineBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0 });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      lineGeos.push(geo);
      lineMats.push(mat);
    }

    /* ── Mouse / Raycaster ────────────────────────────── */
    const mouse2D = new THREE.Vector2();
    const mouseWorld = new THREE.Vector3();
    const raycaster = new THREE.Raycaster();
    const groundPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

    let hoveredSection: string | null = null;
    let lastKnownScrollY = window.scrollY;
    let isRapidScroll = false;
    let rapidScrollTimeout: ReturnType<typeof setTimeout>;

    const updateMouseWorld = (cx: number, cy: number) => {
      mouse2D.set((cx / W) * 2 - 1, -(cy / H) * 2 + 1);
      raycaster.setFromCamera(mouse2D, camera);
      raycaster.ray.intersectPlane(groundPlane, mouseWorld);
    };

    const onMouseMove = (e: MouseEvent) => {
      updateMouseWorld(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse2D, camera);
      const hubMeshes = nodes.filter(n => n.isHub).map(n => n.mesh);
      const hits = raycaster.intersectObjects(hubMeshes);
      hoveredSection = hits.length > 0 ? (hits[0].object.userData.section as string) : null;
      document.body.style.cursor = hoveredSection ? 'pointer' : 'none';
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('nav,button,a,input,textarea,.modal-overlay')) return;
      updateMouseWorld(e.clientX, e.clientY);
      raycaster.setFromCamera(mouse2D, camera);
      const hubMeshes = nodes.filter(n => n.isHub).map(n => n.mesh);
      const hits = raycaster.intersectObjects(hubMeshes);
      if (hits.length > 0) {
        onSectionClickRef.current(hits[0].object.userData.section as string);
      }
    };

    const onScrollEvent = () => {
      const currentScrollY = window.scrollY;
      const scrollDelta = Math.abs(currentScrollY - lastKnownScrollY);
      isRapidScroll = scrollDelta > 80; // Detect rapid scroll
      lastKnownScrollY = currentScrollY;
      clearTimeout(rapidScrollTimeout);
      rapidScrollTimeout = setTimeout(() => { isRapidScroll = false; }, 300);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('click', onClick);
    window.addEventListener('scroll', onScrollEvent, { passive: true });

    /* ── Clock ────────────────────────────────────────── */
    const clock = new THREE.Clock();
    let raf: number;
    const projVec = new THREE.Vector3();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* Rotate stars */
      stars.rotation.y = t * 0.004;
      stars.rotation.x = t * 0.0018;

      /* Black hole dynamics */
      const scrollDepth = THREE.MathUtils.clamp(window.scrollY / (H * 4.2), 0, 1);
      const targetSystemX = THREE.MathUtils.lerp(0, 6.8, scrollDepth);
      const targetSystemY = THREE.MathUtils.lerp(0, -2.4, scrollDepth);
      // Faster drift during rapid scroll to keep scene smooth during momentum
      const driftSpeed = isRapidScroll ? 0.08 : 0.03;
      blackHoleSystem.position.x += (targetSystemX - blackHoleSystem.position.x) * driftSpeed;
      blackHoleSystem.position.y += (targetSystemY - blackHoleSystem.position.y) * driftSpeed;

      blackHoleCore.scale.setScalar(1 + Math.sin(t * 0.5) * 0.02);
      lensHalo.scale.setScalar(1 + Math.sin(t * 0.7) * 0.08);
      accretionRing.rotation.y += 0.012;
      innerRing.rotation.y -= 0.018;
      dustDisk.rotation.z += 0.006;

      ringMat.opacity = THREE.MathUtils.lerp(0.42, 0.22, scrollDepth);
      (innerRing.material as THREE.MeshBasicMaterial).opacity = THREE.MathUtils.lerp(0.5, 0.24, scrollDepth);
      (dustDisk.material as THREE.PointsMaterial).opacity = THREE.MathUtils.lerp(0.55, 0.2, scrollDepth);

      /* Oscillate lights */
      lA.position.set(Math.sin(t * 0.35) * 13, Math.cos(t * 0.28) * 8, 11);
      lB.position.set(Math.cos(t * 0.3) * 13, Math.sin(t * 0.42) * 8, 9);

      /* Physics */
      nodes.forEach((node, idx) => {
        const p = node.mesh.position;

        /* Mouse repulsion */
        const dx = p.x - mouseWorld.x;
        const dy = p.y - mouseWorld.y;
        const dSq = dx * dx + dy * dy;
        if (dSq < 16) {
          const d = Math.sqrt(dSq) + 0.001;
          const f = (1 - d / 4) * (node.isHub ? 0.025 : 0.04);
          node.vel.x += (dx / d) * f;
          node.vel.y += (dy / d) * f;
        }

        /* Gravity toward the event horizon */
        const center = new THREE.Vector3(0, 0, 0);
        const gravDir = center.sub(p);
        const gravDist = Math.max(gravDir.length(), 0.001);
        gravDir.normalize();
        const gravStrength = node.isHub
          ? Math.min(0.0035, 0.04 / (gravDist * gravDist + 8))
          : Math.min(0.0065, 0.08 / (gravDist * gravDist + 6));
        node.vel.addScaledVector(gravDir, gravStrength);

        /* Keep particles from collapsing into singularity */
        if (!node.isHub && gravDist < 1.7) {
          const eject = p.clone().normalize().multiplyScalar((1.7 - gravDist) * 0.14);
          node.vel.add(eject);
        }

        /* Spring back */
        const sk = node.isHub ? 0.003 : 0.0006;
        node.vel.x += (node.origin.x - p.x) * sk;
        node.vel.y += (node.origin.y - p.y) * sk;
        node.vel.z += (node.origin.z - p.z) * sk;

        /* Damping */
        node.vel.multiplyScalar(0.96);
        p.add(node.vel);

        /* Hub: pulse */
        if (node.isHub) {
          const pulse = 1 + Math.sin(t * 2.5 + idx) * 0.12;
          node.mesh.scale.setScalar(pulse);
          const mat = node.mesh.material as THREE.MeshStandardMaterial;
          if (node.section === 'developer') {
            mat.emissiveIntensity = 1.05 + Math.sin(t * 6 + idx) * 0.55;
            node.mesh.scale.setScalar(1.1 + Math.sin(t * 4 + idx) * 0.2);
          } else {
            mat.emissiveIntensity = 0.9 + Math.sin(t * 3 + idx) * 0.3;
          }

          /* Update HTML label */
          if (node.labelEl) {
            projVec.copy(p);
            projVec.project(camera);
            const sx = (projVec.x * 0.5 + 0.5) * W;
            const sy = (-projVec.y * 0.5 + 0.5) * H + 28;
            node.labelEl.style.left = sx + 'px';
            node.labelEl.style.top  = sy + 'px';
            node.labelEl.style.opacity = W < 900 ? '0' : (projVec.z < 1 ? '1' : '0');
          }
        }
      });

      /* Update connection lines */
      let li = 0;
      const MAX_DIST = 4.5;
      outer: for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (li >= MAX_LINES) break outer;
          const d = nodes[i].mesh.position.distanceTo(nodes[j].mesh.position);
          if (d < MAX_DIST) {
            const arr = lineGeos[li].attributes.position.array as Float32Array;
            arr[0] = nodes[i].mesh.position.x; arr[1] = nodes[i].mesh.position.y; arr[2] = nodes[i].mesh.position.z;
            arr[3] = nodes[j].mesh.position.x; arr[4] = nodes[j].mesh.position.y; arr[5] = nodes[j].mesh.position.z;
            lineGeos[li].attributes.position.needsUpdate = true;
            const isHubConn = nodes[i].isHub || nodes[j].isHub;
            lineMats[li].opacity = (1 - d / MAX_DIST) * (isHubConn ? 0.52 : 0.18);
            lineMats[li].color.setHex(isHubConn ? 0xf2bd74 : 0xaad8ff);
            li++;
          }
        }
      }
      for (let i = li; i < MAX_LINES; i++) lineMats[i].opacity = 0;

      /* Subtle camera sway following mouse */
      camera.position.x += (mouse2D.x * 1.85 - camera.position.x) * 0.02;
      camera.position.y += (mouse2D.y * 1.2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    /* ── Resize ───────────────────────────────────────── */
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    /* ── Cleanup ──────────────────────────────────────── */
    return () => {
      clearTimeout(rapidScrollTimeout);
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('scroll', onScrollEvent);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      document.body.removeChild(labelContainer);
      renderer.dispose();
    };
  }, []);

  useEffect(() => init(), [init]);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  );
}
