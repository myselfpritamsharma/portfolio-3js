import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import styles from './Skills.module.css';

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: .2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section" id="skills" ref={sectionRef}>
      <p className="section-tag">02 — Expertise</p>
      <h2 className="section-title">Skills & Arsenal</h2>
      <div className="section-rule" />

      <div className={styles.grid}>
        {/* Progress bars */}
        <div className={styles.bars}>
          {profile.skills.map(sk => (
            <div key={sk.category} className={styles.barRow}>
              <div className={styles.barMeta}>
                <span className={styles.barLabel}>{sk.category}</span>
                <span className={styles.barPct} style={{ color: sk.color }}>{sk.level}%</span>
              </div>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: visible ? `${sk.level}%` : '0%',
                    background: `linear-gradient(90deg, ${sk.color}99, ${sk.color})`,
                    boxShadow: `0 0 12px ${sk.color}66`,
                    transitionDelay: `${profile.skills.indexOf(sk) * 100}ms`,
                  }}
                />
              </div>
              <div className={styles.tags}>
                {sk.items.map(t => (
                  <span key={t} className="tag" style={{ borderColor: sk.color + '44', color: sk.color }}>{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Orbit diagram */}
        <div className={styles.orbitWrap}>
          <div className={styles.orbitCore}>
            <span className={styles.orbitCoreText}>DEV</span>
          </div>
          {profile.skills.map((sk, i) => (
            <div
              key={sk.category}
              className={styles.orbit}
              style={{
                '--angle': `${(360 / profile.skills.length) * i}deg`,
                '--delay': `${i * 0.2}s`,
                '--color': sk.color,
              } as React.CSSProperties}
            >
              <div className={styles.orbitDot} style={{ background: sk.color, boxShadow: `0 0 12px ${sk.color}` }}>
                <span className={styles.orbitLabel}>{sk.category.split(' ')[0]}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
