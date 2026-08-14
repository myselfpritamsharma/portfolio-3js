import { useState, useCallback, useEffect, useRef } from 'react';
import { NeuralScene }        from './three/NeuralScene';
import { CustomCursor }       from './components/CustomCursor';
import { Navbar }             from './components/Navbar';
import { Hero }               from './components/Hero';
import { About }              from './components/About';
import { Skills }             from './components/Skills';
import { Experience }         from './components/Experience';
import { SpaceGame }          from './components/SpaceGame';
import { Projects }           from './components/Projects';
import { DeveloperBriefing }  from './components/DeveloperBriefing';
import { Contact }            from './components/Contact';
import { ResumeDownloader }   from './components/ResumeDownloader';
import './App.css';

function App() {
  const [showResume, setShowResume] = useState(false);
  const [showDeveloperBriefing, setShowDeveloperBriefing] = useState(false);
  const briefingDialogRef = useRef<HTMLDivElement>(null);
  const briefingCloseRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setShowResume(false);
      setShowDeveloperBriefing(false);
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, []);

  useEffect(() => {
    if (!showDeveloperBriefing) return;

    briefingCloseRef.current?.focus();

    const onTrap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const root = briefingDialogRef.current;
      if (!root) return;

      const focusable = root.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onTrap);
    return () => window.removeEventListener('keydown', onTrap);
  }, [showDeveloperBriefing]);

  const handleSectionClick = useCallback((id: string) => {
    if (id === 'developer') {
      setShowDeveloperBriefing(true);
      return;
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Three.js neural network — fixed background */}
      <NeuralScene onSectionClick={handleSectionClick} />

      {/* All page content */}
      <div className="app-shell">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Navbar
          onResumeClick={() => setShowResume(true)}
          onDeveloperClick={() => setShowDeveloperBriefing(true)}
        />
        <main id="main-content" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <SpaceGame />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,.05)',
          color: 'var(--muted, #d6e1ee)',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '.76rem',
          letterSpacing: '.06em',
        }}>
          <p>
            Made with <span style={{ color: '#ff6b6b', fontSize: '1rem' }}>❤️</span> by&nbsp;
            <span style={{ color: 'var(--cyan, #a8d7ff)', fontWeight: 700 }}>Pritam Sharma</span>
            &nbsp;&middot;&nbsp;{new Date().getFullYear()}
          </p>
        </footer>
      </div>

      {/* Resume modal */}
      {showResume && <ResumeDownloader onClose={() => setShowResume(false)} />}

      {/* Hidden Developer Briefing modal */}
      {showDeveloperBriefing && (
        <div className="developer-briefing-overlay" role="presentation" onClick={(e) => {
          if (e.target === e.currentTarget) setShowDeveloperBriefing(false);
        }}>
          <div
            className="developer-briefing-modal card"
            role="dialog"
            aria-modal="true"
            aria-label="Developer briefing"
            ref={briefingDialogRef}
          >
            <button
              type="button"
              className="developer-briefing-close"
              onClick={() => setShowDeveloperBriefing(false)}
              aria-label="Close developer briefing"
              ref={briefingCloseRef}
            >
              ✕
            </button>
            <DeveloperBriefing embedded />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
