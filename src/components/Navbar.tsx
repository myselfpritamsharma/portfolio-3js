import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { label: 'About',    id: 'about'    },
  { label: 'Skills',   id: 'skills'   },
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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  const scrollFromMissionMenu = (id: string) => {
    window.dispatchEvent(new CustomEvent('rocket-nav-jump', { detail: { targetId: id } }));
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <button className={styles.logo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span className={styles.logoPs}>PS</span>
          <span className={styles.logoDot}>.</span>
        </button>

        {/* Desktop links */}
        <ul className={styles.links}>
          {NAV_LINKS.map(l => (
            <li key={l.id}>
              <button className={styles.link} onClick={() => scrollTo(l.id)}>
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
            title="Mission Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className={styles.drawer}>
          {NAV_LINKS.map(l => (
            <button key={l.id} className={styles.drawerLink} onClick={() => scrollFromMissionMenu(l.id)}>
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
