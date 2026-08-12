import { useState, useCallback } from 'react';
import { NeuralScene }        from './three/NeuralScene';
import { CustomCursor }       from './components/CustomCursor';
import { Navbar }             from './components/Navbar';
import { Hero }               from './components/Hero';
import { About }              from './components/About';
import { Skills }             from './components/Skills';
import { Projects }           from './components/Projects';
import { DeveloperBriefing }  from './components/DeveloperBriefing';
import { Contact }            from './components/Contact';
import { ResumeDownloader }   from './components/ResumeDownloader';
import './App.css';

function App() {
  const [showResume, setShowResume] = useState(false);
  const [showDeveloperBriefing, setShowDeveloperBriefing] = useState(false);

  const handleSectionClick = useCallback((id: string) => {
    if (id === 'developer') {
      setShowDeveloperBriefing(true);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Custom cursor — desktop only */}
      <CustomCursor />

      {/* Three.js neural network — fixed background */}
      <NeuralScene onSectionClick={handleSectionClick} />

      {/* All page content */}
      <div className="app-shell">
        <Navbar
          onResumeClick={() => setShowResume(true)}
          onDeveloperClick={() => setShowDeveloperBriefing(true)}
        />
        <main>
          <Hero    onResumeClick={() => setShowResume(true)} />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '2rem',
          borderTop: '1px solid rgba(255,255,255,.05)',
          color: '#4a5568',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '.72rem',
          letterSpacing: '.08em',
        }}>
          <p>
            Designed & Built by&nbsp;
            <span style={{ color: '#00d4ff' }}>Pritam Sharma</span>
            &nbsp;·&nbsp;{new Date().getFullYear()}&nbsp;·&nbsp;
            <span style={{ color: '#f0c78b' }}>Event Horizon Portfolio</span>
          </p>
          <p style={{ marginTop: '.4rem', opacity: .5 }}>
            Follow mission beacons in orbit to navigate ✦
          </p>
        </footer>
      </div>

      {/* Resume modal */}
      {showResume && <ResumeDownloader onClose={() => setShowResume(false)} />}

      {/* Hidden Developer Briefing modal */}
      {showDeveloperBriefing && (
        <div className="developer-briefing-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setShowDeveloperBriefing(false);
        }}>
          <div className="developer-briefing-modal card">
            <button
              type="button"
              className="developer-briefing-close"
              onClick={() => setShowDeveloperBriefing(false)}
              aria-label="Close developer briefing"
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
