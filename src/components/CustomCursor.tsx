import { useEffect, useRef, useState } from 'react';
import styles from './CustomCursor.module.css';

export function CustomCursor() {
  const rocketRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const burstRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaFinePrimary = window.matchMedia('(hover: hover) and (pointer: fine)');
    const mediaFineAny = window.matchMedia('(any-hover: hover) and (any-pointer: fine)');
    const update = () => setEnabled(mediaFinePrimary.matches || mediaFineAny.matches);
    update();
    mediaFinePrimary.addEventListener('change', update);
    mediaFineAny.addEventListener('change', update);

    const fallbackMouseEnable = () => {
      setEnabled(true);
      window.removeEventListener('mousemove', fallbackMouseEnable);
    };

    // Hybrid devices can report coarse primary pointer even with a mouse attached.
    window.addEventListener('mousemove', fallbackMouseEnable, { once: true });

    return () => {
      mediaFinePrimary.removeEventListener('change', update);
      mediaFineAny.removeEventListener('change', update);
      window.removeEventListener('mousemove', fallbackMouseEnable);
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      document.body.classList.add('rocket-cursor-active');
      return () => document.body.classList.remove('rocket-cursor-active');
    }
    document.body.classList.remove('rocket-cursor-active');
    return;
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    setVisible(true);

    const rocket = rocketRef.current;
    const trail = trailRef.current;
    const burst = burstRef.current;
    const impact = impactRef.current;
    if (!rocket || !trail || !burst || !impact) return;

    let targetX = window.innerWidth * 0.5;
    let targetY = window.innerHeight * 0.5;
    let mouseX = targetX;
    let mouseY = targetY;
    let currentX = targetX;
    let currentY = targetY;
    let prevX = currentX;
    let prevY = currentY;
    let raf = 0;

    let autoActive = false;
    let autoTargetId: string | null = null;
    let autoStartTs = 0;
    let autoDuration = 1100;
    let autoStartX = currentX;
    let autoStartY = currentY;
    let autoEndX = currentX;
    let autoEndY = currentY;
    let autoControlX = currentX;
    let autoControlY = currentY;
    let landingUntil = 0;
    let docked = false;
    let dockedX = currentX;
    let dockedY = currentY;
    let scrollDebounce: ReturnType<typeof setTimeout>;

    const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

    const getViewportWidth = () => {
      // Account for scrollbar width (typically 12-17px on desktop)
      return document.documentElement.clientWidth || window.innerWidth;
    };

    const landingProfiles: Record<string, { xRatio: number; yRatio: number; side?: 'left' | 'right' }> = {
      about: { xRatio: 0.2, yRatio: 0.36, side: 'left' },
      skills: { xRatio: 0.86, yRatio: 0.2, side: 'right' },
      projects: { xRatio: 0.84, yRatio: 0.22, side: 'right' },
      contact: { xRatio: 0.24, yRatio: 0.34, side: 'left' },
    };

    const resolveTargetFromSection = (id: string) => {
      const el = document.getElementById(id);
      if (!el) {
        return { x: getViewportWidth() * 0.5, y: 160 };
      }
      const rect = el.getBoundingClientRect();
      const profile = landingProfiles[id] ?? { xRatio: 0.5, yRatio: 0.26 };
      const heading = el.querySelector('h1, h2, h3');
      let headingSafeY = rect.top + 130;

      if (heading instanceof HTMLElement) {
        const headingRect = heading.getBoundingClientRect();
        headingSafeY = headingRect.bottom + 42;
      }

      const preferredY = rect.top + Math.min(180, rect.height * profile.yRatio);
      const rawX = rect.left + rect.width * profile.xRatio;
      const viewportW = getViewportWidth();
      const sideAdjustedX =
        profile.side === 'right'
          ? Math.max(rawX, viewportW - 120)
          : profile.side === 'left'
            ? Math.min(rawX, 120)
            : rawX;

      return {
        x: clamp(sideAdjustedX, 90, viewportW - 90),
        y: clamp(Math.max(preferredY, headingSafeY + 22), 130, window.innerHeight - 130),
      };
    };

    const launchAutopilot = (targetId: string) => {
      const landing = resolveTargetFromSection(targetId);
      const dx = landing.x - currentX;
      const dy = landing.y - currentY;
      const distance = Math.hypot(dx, dy);
      const sideBias = dx >= 0 ? 1 : -1;

      autoActive = true;
      autoTargetId = targetId;
      autoStartTs = performance.now();
      autoDuration = clamp(820 + distance * 1.1, 900, 1600);
      autoStartX = currentX;
      autoStartY = currentY;
      autoEndX = landing.x;
      autoEndY = landing.y;
      autoControlX = (autoStartX + autoEndX) * 0.5 + sideBias * clamp(distance * 0.08, 25, 85);
      autoControlY = Math.min(autoStartY, autoEndY) - clamp(150 + distance * 0.18, 170, 340);
      docked = false;
      rocket.classList.remove(styles.docked);
      trail.classList.remove(styles.docked);
      rocket.classList.add(styles.autopilot);
      trail.classList.add(styles.autopilot);
    };

    const move = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (docked && Math.hypot(mouseX - dockedX, mouseY - dockedY) > 12) {
        docked = false;
        rocket.classList.remove(styles.docked);
        trail.classList.remove(styles.docked);
      }
      if (!autoActive) {
        targetX = mouseX;
        targetY = mouseY;
      }
    };

    const onRocketJump = (ev: Event) => {
      const ce = ev as CustomEvent<{ targetId?: string }>;
      const targetId = ce.detail?.targetId;
      if (!targetId) return;
      launchAutopilot(targetId);
    };

    const loop = () => {
      const now = performance.now();

      if (autoActive && autoTargetId) {
        // Re-evaluate landing position during flight to handle scroll/resize
        const dynamicEnd = resolveTargetFromSection(autoTargetId);
        autoEndX = dynamicEnd.x;
        autoEndY = dynamicEnd.y;

        const t = clamp((now - autoStartTs) / autoDuration, 0, 1);
        const inv = 1 - t;

        currentX = inv * inv * autoStartX + 2 * inv * t * autoControlX + t * t * autoEndX;
        currentY = inv * inv * autoStartY + 2 * inv * t * autoControlY + t * t * autoEndY;

        if (t >= 1) {
          autoActive = false;
          landingUntil = now + 420;
          targetX = autoEndX;
          targetY = autoEndY;
          docked = true;
          dockedX = autoEndX;
          dockedY = autoEndY;
          rocket.classList.remove(styles.autopilot);
          trail.classList.remove(styles.autopilot);
          rocket.classList.add(styles.landed);
          trail.classList.add(styles.landed);
          rocket.classList.add(styles.docked);
          trail.classList.add(styles.docked);
          setTimeout(() => {
            rocket.classList.remove(styles.landed);
            trail.classList.remove(styles.landed);
          }, 430);

          document.body.classList.add('rocket-landing-impact');
          setTimeout(() => document.body.classList.remove('rocket-landing-impact'), 280);

          const safeBurstX = clamp(autoEndX, 0, getViewportWidth());
          const safeBurstY = clamp(autoEndY, 0, window.innerHeight);

          burst.style.left = `${safeBurstX}px`;
          burst.style.top = `${safeBurstY}px`;
          burst.classList.remove(styles.warpBurst);
          void burst.offsetWidth;
          burst.classList.add(styles.warpBurst);

          impact.style.left = `${safeBurstX}px`;
          impact.style.top = `${safeBurstY}px`;
          impact.classList.remove(styles.touchdownBurst);
          void impact.offsetWidth;
          impact.classList.add(styles.touchdownBurst);
        }
      } else {
        if (now > landingUntil) {
          targetX = mouseX;
          targetY = mouseY;
        }
        currentX += (targetX - currentX) * 0.18;
        currentY += (targetY - currentY) * 0.18;
      }

      const dx = currentX - prevX;
      const dy = currentY - prevY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      const speed = Math.min(Math.hypot(dx, dy), 35);
      const trailStretch = 0.85 + speed / 26;

      // Enforce viewport bounds safety for extreme scroll/resize scenarios
      const viewportW = getViewportWidth();
      const clampedX = clamp(currentX, 0, viewportW);
      const clampedY = clamp(currentY, 0, window.innerHeight);

      rocket.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -50%) rotate(${angle}deg)`;
      trail.style.transform = `translate(${clampedX}px, ${clampedY}px) translate(-50%, -50%) rotate(${angle}deg) translateX(-20px) scaleX(${trailStretch})`;
      trail.style.opacity = String(Math.min(0.92, 0.35 + speed / 40));

      prevX = currentX;
      prevY = currentY;
      raf = requestAnimationFrame(loop);
    };

    const isInteractiveTarget = (target: EventTarget | null) => {
      return target instanceof Element && !!target.closest('a,button,[role="button"],input,textarea,select,label');
    };

    const onOver = (e: MouseEvent) => {
      if (isInteractiveTarget(e.target)) {
        rocket.classList.add(styles.boost);
        trail.classList.add(styles.boost);
      }
    };

    const onOut = (e: MouseEvent) => {
      if (isInteractiveTarget(e.target)) {
        rocket.classList.remove(styles.boost);
        trail.classList.remove(styles.boost);
      }
    };

    const onClick = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      burst.style.left = `${x}px`;
      burst.style.top = `${y}px`;
      burst.classList.remove(styles.warpBurst);
      // Force reflow so repeated clicks replay the animation.
      void burst.offsetWidth;
      burst.classList.add(styles.warpBurst);
    };

    const onScroll = () => {
      clearTimeout(scrollDebounce);
      scrollDebounce = setTimeout(() => {}, 180);
    };

    const onResize = () => {
      // Force rocket landing coordinate re-eval on viewport resize
      if (autoActive && autoTargetId) {
        const updated = resolveTargetFromSection(autoTargetId);
        autoEndX = updated.x;
        autoEndY = updated.y;
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('click', onClick, true);
    window.addEventListener('rocket-nav-jump', onRocketJump as EventListener);
    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    raf = requestAnimationFrame(loop);

    return () => {
      clearTimeout(scrollDebounce);
      window.removeEventListener('mousemove', move);
      window.removeEventListener('click', onClick, true);
      window.removeEventListener('rocket-nav-jump', onRocketJump as EventListener);
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div ref={trailRef} className={`${styles.trail} ${visible ? styles.visible : ''}`} />
      <div ref={rocketRef} className={`${styles.rocket} ${visible ? styles.visible : ''}`}>
        <svg viewBox="0 0 64 64" className={styles.rocketSvg} aria-hidden="true">
          <defs>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#d7ebff" />
              <stop offset="100%" stopColor="#9dc4e8" />
            </linearGradient>
            <linearGradient id="flameGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffe8c1" />
              <stop offset="100%" stopColor="#f0b269" />
            </linearGradient>
          </defs>
          <ellipse cx="46" cy="32" rx="13" ry="10" fill="url(#bodyGrad)" />
          <polygon points="34,32 15,22 15,42" fill="#8ab1d6" />
          <polygon points="41,24 30,20 34,30" fill="#79a0c7" />
          <polygon points="41,40 30,44 34,34" fill="#79a0c7" />
          <circle cx="47" cy="32" r="3.7" fill="#284663" />
          <circle cx="47" cy="32" r="2.3" fill="#8fd4ff" />
          <polygon className={styles.flame} points="13,32 4,28 4,36" fill="url(#flameGrad)" />
        </svg>
      </div>
      <div ref={burstRef} className={styles.burst} />
      <div ref={impactRef} className={styles.impact} />
    </>
  );
}
