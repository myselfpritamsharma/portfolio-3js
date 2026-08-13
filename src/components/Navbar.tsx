import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'About',    id: 'about'    },
  { label: 'Skills',   id: 'skills'   },
  { label: 'Experience', id: 'experience' },
  { label: 'Game', id: 'game' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact',  id: 'contact'  },
];

interface Props {
  onResumeClick: () => void;
  onDeveloperClick: () => void;
}

export function Navbar({ onResumeClick, onDeveloperClick }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigateToSection = (id: string) => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.dispatchEvent(new CustomEvent('rocket-nav-jump', { detail: { targetId: id } }));
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`} aria-label="Primary">
      <div className={styles.inner}>
        {/* Logo */}
        <button
          className={styles.logo}
          onClick={() => {
            const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
          }}
        >
          <span className={styles.logoPs}>PS</span>
          <span className={styles.logoDot}>.</span>
        </button>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <button className={styles.link} onClick={() => navigateToSection(l.id)}>
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <button className="btn btn-outline" style={{ padding: '.5rem 1.25rem', fontSize: '.82rem' }} onClick={onResumeClick}>
            ↓ Resume
          </button>
          {/* Hamburger */}
          <button
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen(o => !o)}
            aria-label="Mission Menu"
            aria-expanded={open}
            aria-controls="mobile-nav-drawer"
            title="Mission Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer} id="mobile-nav-drawer">
          {NAV_LINKS.map(l => (
            <button key={l.id} className={styles.drawerLink} onClick={() => navigateToSection(l.id)}>
              {l.label}
            </button>
          ))}
          <button
            className={styles.drawerLink}
            onClick={() => {
              onDeveloperClick();
              setOpen(false);
            }}
          >
            Mission Protocol
          </button>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { onResumeClick(); setOpen(false); }}>
            ↓ Resume
          </button>
        </div>
      )}
    </nav>
  );
}
