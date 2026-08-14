import { useEffect, useState } from 'react';
import { profile } from '../data/profile';
import styles from './About.module.css';

const LINES = [
  { key: 'WHO',      val: 'Developer II @ Hyland · 5 yrs · 3 companies · 0 fluff' },
  { key: 'STACK',    val: 'Angular · React · .NET Core · Node.js · Azure' },
  { key: 'WINS',     val: 'Hackathon 2025 Winner · Gold Medalist ×2 · Azure Certified' },
  { key: 'BASE',     val: 'Greater Kolkata Area 🇮🇳  |  Open to Remote & Relocation' },
  { key: 'FOCUS',    val: 'AI Agents · Multi-LLM Systems · Enterprise Full Stack' },
];

const BADGE_KEY = 'orbit_docking_badge_unlocked';
const BEST_SCORE_KEY = 'orbit_docking_best_score';
const BADGE_EVENT = 'space-achievement-updated';

export function About() {
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [bestRunScore, setBestRunScore] = useState(0);

  useEffect(() => {
    const syncAchievement = () => {
      const unlocked = localStorage.getItem(BADGE_KEY) === '1';
      const scoreRaw = localStorage.getItem(BEST_SCORE_KEY);
      const scoreNum = scoreRaw ? Number.parseInt(scoreRaw, 10) : 0;
      setBadgeUnlocked(unlocked);
      setBestRunScore(Number.isFinite(scoreNum) ? scoreNum : 0);
    };

    syncAchievement();
    window.addEventListener(BADGE_EVENT, syncAchievement as EventListener);
    window.addEventListener('storage', syncAchievement);

    return () => {
      window.removeEventListener(BADGE_EVENT, syncAchievement as EventListener);
      window.removeEventListener('storage', syncAchievement);
    };
  }, []);

  return (
    <section className="section" id="about">
      <p className="section-tag">01 — Identity</p>
      <h2 className="section-title">About Me</h2>
      <div className="section-rule" />

      <div className={styles.grid}>
        {/* Terminal block */}
        <div className={styles.terminal}>
          <div className={styles.termHeader}>
            <span className={styles.dot} style={{ background: '#ff6b6b' }} />
            <span className={styles.dot} style={{ background: '#ffd700' }} />
            <span className={styles.dot} style={{ background: '#00ff88' }} />
            <span className={styles.termTitle}>pritam@portfolio ~ zsh</span>
          </div>
          <div className={styles.termBody}>
            <p className={styles.termCmd}>$ cat about.txt</p>
            {LINES.map(l => (
              <p key={l.key} className={styles.termLine}>
                <span className={styles.termKey}>[{l.key}]</span>
                <span className={styles.termVal}> {l.val}</span>
              </p>
            ))}
            <p className={styles.termCmd} style={{ marginTop: '1rem' }}>$ cat summary.txt</p>
            <p className={styles.termVal} style={{ lineHeight: 1.8 }}>
              {profile.summary}
            </p>
            <p className={styles.termPrompt}>█</p>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.right}>
          {/* Avatar with profile image */}
          <div className={styles.avatar}>
            <div className={styles.avatarInner}>
              <img 
                src={`${import.meta.env.BASE_URL}llm-generated-picture.png`}
                alt="Pritam Sarkar"
                className={styles.avatarImage}
              />
            </div>
            <div className={styles.avatarRing} />
            <div className={styles.avatarRing2} />
          </div>

          {/* Quick facts */}
          <div className={styles.facts}>
            {[
              { icon: '📍', label: profile.location },
              { icon: '🎓', label: profile.education[0].degree },
              { icon: '💼', label: profile.experience[0].role + ' @ ' + profile.experience[0].company },
              { icon: '🌐', label: 'Open to Remote' },
            ].map(f => (
              <div key={f.label} className={styles.fact}>
                <span>{f.icon}</span>
                <span>{f.label}</span>
              </div>
            ))}
          </div>

          {badgeUnlocked && (
            <div className={styles.badgeBox}>
              <p className={styles.badgeTitle}>Unlocked Badge</p>
              <p className={styles.badgeText}>Orbital Survivor · Docking Run best score {bestRunScore}</p>
            </div>
          )}

          {/* Certifications */}
          <div className={styles.certsBox}>
            <p className={styles.certsTitle}>Certifications</p>
            {profile.certifications.map(c => (
              <p key={c} className={styles.cert}>✓ {c}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
