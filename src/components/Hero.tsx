import { useEffect, useRef, useState } from 'react';
import { profile } from '../data/profile';
import styles from './Hero.module.css';

const ROLES = profile.roles;
const BADGE_KEY = 'orbit_docking_badge_unlocked';
const BEST_SCORE_KEY = 'orbit_docking_best_score';
const BADGE_EVENT = 'space-achievement-updated';

export function Hero() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [bestRunScore, setBestRunScore] = useState(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  /* Typewriter effect */
  useEffect(() => {
    const current = ROLES[roleIdx];

    if (!deleting && displayed.length < current.length) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70);
    } else if (!deleting && displayed.length === current.length) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeoutRef.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx(i => (i + 1) % ROLES.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [displayed, deleting, roleIdx]);

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

  const scrollTo = (id: string) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <section className={styles.hero} id="hero">
      {/* Scan line decoration */}
      <div className={styles.scanline} aria-hidden />

      <div className={styles.content}>
        <p className={styles.greeting}>
          <span className={styles.greetingBracket}>{'<'}</span>
          Deep Space Link Established
          <span className={styles.greetingBracket}>{' />'}</span>
        </p>

        <h1 className={styles.name}>
          <span className={styles.nameFirst}>{profile.firstName}</span>
          <br />
          <span className={styles.nameLast}>{profile.lastName}</span>
        </h1>

        <div className={styles.roleRow}>
          <span className={styles.rolePrefix}>Orbital Role:</span>
          <span className={styles.roleText} aria-hidden="true">{displayed}</span>
          <span className="sr-only" aria-live="polite">Current role: {ROLES[roleIdx]}</span>
          <span className={styles.cursor} aria-hidden>|</span>
        </div>

        <p className={styles.summary}>{profile.summary}</p>

        {badgeUnlocked && (
          <div className={styles.achievement}>
            <span className={styles.achievementIcon}>🏅</span>
            <div>
              <p className={styles.achievementTitle}>Orbital Survivor Unlocked</p>
              <p className={styles.achievementMeta}>Docking Run best score: {bestRunScore}</p>
            </div>
          </div>
        )}

        <div className={styles.stats}>
          {profile.stats.map(s => (
            <div key={s.label} className={styles.stat}>
              <span className={styles.statVal}>{s.value}</span>
              <span className={styles.statLbl}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.ctas}>
          <button className="btn btn-primary" onClick={() => scrollTo('projects')}>
            View Work →
          </button>
          <button className="btn btn-outline" onClick={() => scrollTo('contact')}>
            Get In Touch →
          </button>
        </div>

        <div className={styles.socials}>
          <a href={profile.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="Open GitHub profile in a new tab">
            <GithubIcon />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="Open LinkedIn profile in a new tab">
            <LinkedinIcon />
          </a>
          <a href={`mailto:${profile.email}`} title="Email" aria-label="Send an email">
            <MailIcon />
          </a>
          <a href={profile.githubAlt} target="_blank" rel="noreferrer" title="GitHub (archive)" aria-label="Open archive GitHub profile in a new tab">
            <GithubIcon />
          </a>
        </div>

        <p className={styles.secretHint}>
          Mission hint: one planet near the event horizon stores classified engineering logs.
        </p>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        className={styles.scrollHint}
        onClick={() => scrollTo('about')}
        aria-label="Scroll down to the about section"
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>descend</span>
      </button>
    </section>
  );
}

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m2 7 10 7 10-7"/>
  </svg>
);
