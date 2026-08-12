import styles from './DeveloperBriefing.module.css';

const STACK_ITEMS = [
  {
    title: 'Frontend Design Stack',
    points: [
      'React + TypeScript for component architecture and safer refactoring.',
      'CSS Modules + global tokens for theme control and predictable scope.',
      'Three.js scene rendered behind DOM layers for cinematic depth with readable content.',
      'Custom pointer effects isolated in one component to keep UX optional and device-aware.',
    ],
  },
  {
    title: 'Animation + Motion',
    points: [
      'requestAnimationFrame loop drives particle physics, camera drift, and glow pulses.',
      'Mouse interaction is spring-damped to avoid jitter and preserve smoothness.',
      'Hover/click effects are progressive enhancement; no core action depends on motion.',
      'Fallback path on touch devices disables cursor effects for stability and battery life.',
    ],
  },
];

const ARCHITECTURE = [
  {
    title: 'Layer 1: Experience Engine',
    detail:
      'A Three.js engine (`NeuralScene`) owns star fields, node physics, connection lines, and section beacons. It is fixed-position and renders continuously at capped pixel ratio.',
  },
  {
    title: 'Layer 2: Content Application',
    detail:
      'React sections (`Hero`, `About`, `Skills`, `Projects`, `DeveloperBriefing`, `Contact`) stay semantic and scroll-based. This keeps SEO and accessibility stronger than pure-canvas portfolios.',
  },
  {
    title: 'Layer 3: Utility Systems',
    detail:
      'Resume templates, custom cursor, and responsive navigation are independent modules. Utilities are decoupled from scene logic to prevent regressions.',
  },
];

const NICHES = [
  {
    name: 'Creative Developer Branding',
    logic:
      'You signal both engineering depth and product taste by mixing physics-based visuals with clean information architecture.',
  },
  {
    name: 'Interview Narrative Ready',
    logic:
      'Every effect maps to a technical decision (performance, fallback, modularity), so your portfolio doubles as a system-design case study.',
  },
  {
    name: 'Global Resume Positioning',
    logic:
      'Country-specific CV templates show practical awareness of hiring context, not just coding ability.',
  },
];

const INTERVIEW_PREP = [
  {
    q: 'How would you explain this portfolio architecture in an interview?',
    a: 'I separated rendering concerns (Three.js engine) from business/content concerns (React sections) so visual complexity does not compromise maintainability or accessibility.',
  },
  {
    q: 'How did you handle performance?',
    a: 'I capped renderer pixel ratio, pre-allocated line geometries, avoided expensive remount loops, and introduced pointer-aware fallbacks to reduce work on touch devices.',
  },
  {
    q: 'How is responsiveness handled across web/mobile/tablet?',
    a: 'Responsive breakpoints manage layout and nav behavior, while interaction modes are capability-detected (`hover`/`pointer`) so desktop gets enhanced effects and mobile gets stable defaults.',
  },
  {
    q: 'What would you improve next?',
    a: 'Add route-level code splitting for heavy modules, accessibility preference toggles (reduced motion), and analytics to validate interaction ROI.',
  },
];

interface DeveloperBriefingProps {
  embedded?: boolean;
}

export function DeveloperBriefing({ embedded = false }: DeveloperBriefingProps) {
  const content = (
    <>
      <p className="section-tag">04 — Developer Briefing</p>
      <h2 className="section-title">Build Logic, Architecture, Interview Notes</h2>
      <div className="section-rule" />

      <div className={styles.layout}>
        <article className={`card ${styles.panel}`}>
          <h3 className={styles.panelTitle}>What Was Used To Design This</h3>
          <div className={styles.stackGrid}>
            {STACK_ITEMS.map((item) => (
              <div key={item.title} className={styles.stackBlock}>
                <p className={styles.blockTitle}>{item.title}</p>
                <ul className={styles.list}>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </article>

        <article className={`card ${styles.panel}`}>
          <h3 className={styles.panelTitle}>Architecture / System Design</h3>
          <div className={styles.archFlow}>
            {ARCHITECTURE.map((step) => (
              <div key={step.title} className={styles.flowNode}>
                <p className={styles.blockTitle}>{step.title}</p>
                <p className={styles.detail}>{step.detail}</p>
              </div>
            ))}
          </div>
        </article>

        <article className={`card ${styles.panel}`}>
          <h3 className={styles.panelTitle}>Niche Positioning Logic</h3>
          <div className={styles.nicheGrid}>
            {NICHES.map((niche) => (
              <div key={niche.name} className={styles.nicheCard}>
                <p className={styles.blockTitle}>{niche.name}</p>
                <p className={styles.detail}>{niche.logic}</p>
              </div>
            ))}
          </div>
        </article>

        <article className={`card ${styles.panel}`}>
          <h3 className={styles.panelTitle}>Interview Preparation (From This Project)</h3>
          <div className={styles.qaWrap}>
            {INTERVIEW_PREP.map((item) => (
              <details key={item.q} className={styles.qaItem}>
                <summary>{item.q}</summary>
                <p className={styles.detail}>{item.a}</p>
              </details>
            ))}
          </div>
        </article>
      </div>
    </>
  );

  if (embedded) {
    return <div className={styles.embedded}>{content}</div>;
  }

  return (
    <section className="section" id="developer">
      {content}
    </section>
  );
}
