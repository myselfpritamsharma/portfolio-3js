import { useRef } from 'react';
import { profile } from '../data/profile';
import styles from './Projects.module.css';

export function Projects() {
  const featured = profile.projects.filter(p => p.featured);
  const others   = profile.projects.filter(p => !p.featured);

  return (
    <section className="section" id="projects">
      <p className="section-tag">03 — Work</p>
      <h2 className="section-title">Featured Projects</h2>
      <div className="section-rule" />

      {/* Featured */}
      <div className={styles.featured}>
        {featured.map(proj => (
          <ProjectCard key={proj.id} proj={proj} />
        ))}
      </div>

      {/* Other projects */}
      <h3 className={styles.otherTitle}>More Projects</h3>
      <div className={styles.others}>
        {others.map(proj => (
          <div key={proj.id} className={`card ${styles.otherCard}`}>
            <div className={styles.otherDot} style={{ background: proj.color }} />
            <div>
              <p className={styles.otherName}>{proj.name}</p>
              <p className={styles.otherTagline}>{proj.tagline}</p>
            </div>
            <div className={styles.otherLinks}>
              <a href={proj.github} target="_blank" rel="noreferrer" className={styles.iconLink}>↗ GitHub</a>
              <a href={proj.live}   target="_blank" rel="noreferrer" className={styles.iconLink}>↗ Live</a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ proj }: { proj: typeof profile.projects[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current;
    if (!r) return;
    const rect = r.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    r.style.transform = `perspective(800px) rotateY(${x * 0.015}deg) rotateX(${-y * 0.015}deg) translateY(-6px)`;
  };

  const onMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0)';
  };

  return (
    <div
      ref={cardRef}
      className={`card ${styles.projCard}`}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ '--accent': proj.color } as React.CSSProperties}
    >
      {/* Top accent line */}
      <div className={styles.topLine} style={{ background: `linear-gradient(90deg, ${proj.color}, transparent)` }} />

      {/* Header */}
      <div className={styles.projHeader}>
        <div className={styles.projIcon} style={{ background: proj.color + '22', border: `1px solid ${proj.color}44` }}>
          <span style={{ fontSize: '1.3rem' }}>⬡</span>
        </div>
        <div className={styles.projLinks}>
          <a href={proj.github} target="_blank" rel="noreferrer" className={styles.iconBtn} title="GitHub">↗</a>
          <a href={proj.live}   target="_blank" rel="noreferrer" className={styles.iconBtn} title="Live">🔗</a>
        </div>
      </div>

      <h3 className={styles.projName}>{proj.name}</h3>
      <p className={styles.projTagline} style={{ color: proj.color }}>{proj.tagline}</p>
      <p className={styles.projDesc}>{proj.description}</p>

      <div className={styles.projTech}>
        {proj.tech.map(t => (
          <span key={t} className="tag" style={{ color: proj.color, borderColor: proj.color + '44' }}>{t}</span>
        ))}
      </div>
    </div>
  );
}
