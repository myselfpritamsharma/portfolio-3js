import { profile } from '../data/profile';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <section className="section" id="experience">
      <p className="section-tag">03 — Experience</p>
      <h2 className="section-title">Work Experience</h2>
      <div className="section-rule" />

      <p className={styles.intro}>
        AI-centric full stack engineering across enterprise products, with practical delivery in
        custom AI agents, multi-source context orchestration, and production-grade web systems.
      </p>

      <div className={styles.timeline}>
        {profile.experience.map((ex, idx) => (
          <article key={`${ex.company}-${ex.period}`} className={`card ${styles.item}`}>
            <div className={styles.rail} aria-hidden>
              <span className={styles.dot} />
              {idx !== profile.experience.length - 1 && <span className={styles.line} />}
            </div>

            <div className={styles.content}>
              <div className={styles.header}>
                <div>
                  <h3 className={styles.role}>{ex.role}</h3>
                  <p className={styles.company}>{ex.company}</p>
                </div>
                <div className={styles.meta}>
                  <p className={styles.period}>{ex.period}</p>
                  <p className={styles.location}>{ex.location}</p>
                </div>
              </div>

              <ul className={styles.points}>
                {ex.points.map((point) => (
                  <li key={point} className={styles.point}>{point}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
