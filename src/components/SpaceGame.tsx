import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './SpaceGame.module.css';

type Difficulty = 'cadet' | 'pilot' | 'ace';

interface Asteroid {
  x: number;
  y: number;
  r: number;
  speed: number;
}

interface DifficultyConfig {
  label: string;
  spawnInterval: number;
  asteroidSpeedMin: number;
  asteroidSpeedMax: number;
  scoreRate: number;
}

interface LeaderboardRun {
  score: number;
  difficulty: Difficulty;
  at: number;
}

const DIFFICULTY: Record<Difficulty, DifficultyConfig> = {
  cadet: {
    label: 'Cadet',
    spawnInterval: 0.95,
    asteroidSpeedMin: 95,
    asteroidSpeedMax: 155,
    scoreRate: 8,
  },
  pilot: {
    label: 'Pilot',
    spawnInterval: 0.72,
    asteroidSpeedMin: 120,
    asteroidSpeedMax: 190,
    scoreRate: 12,
  },
  ace: {
    label: 'Ace',
    spawnInterval: 0.54,
    asteroidSpeedMin: 150,
    asteroidSpeedMax: 240,
    scoreRate: 16,
  },
};

const BEST_SCORE_KEY = 'orbit_docking_best_score';
const RUNS_KEY = 'orbit_docking_runs';
const SOUND_KEY = 'orbit_docking_sound_enabled';
const BADGE_KEY = 'orbit_docking_badge_unlocked';
const BADGE_EVENT = 'space-achievement-updated';
const BADGE_THRESHOLD = 180;
const GAME_HEIGHT = 360;

export function SpaceGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef(0);
  const spawnTimerRef = useRef(0);
  const playerXRef = useRef(0);
  const asteroidsRef = useRef<Asteroid[]>([]);
  const scoreRef = useRef(0);
  const runningRef = useRef(false);
  const keysRef = useRef({ left: false, right: false });
  const audioCtxRef = useRef<AudioContext | null>(null);

  const [difficulty, setDifficulty] = useState<Difficulty>('pilot');
  const [running, setRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [runs, setRuns] = useState<LeaderboardRun[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [badgeUnlocked, setBadgeUnlocked] = useState(false);
  const [status, setStatus] = useState<'idle' | 'running' | 'crashed'>('idle');

  const config = useMemo(() => DIFFICULTY[difficulty], [difficulty]);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine', gainValue = 0.03) => {
    if (!soundEnabled) return;

    try {
      if (!audioCtxRef.current) {
        const AudioCtor = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtor) return;
        audioCtxRef.current = new AudioCtor();
      }

      const ctx = audioCtxRef.current;
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        void ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainValue, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration + 0.02);
    } catch {
      // Ignore audio failures on locked/mobile contexts.
    }
  }, [soundEnabled]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(rect.height * dpr);

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }, []);

  const drawShip = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    ctx.save();
    ctx.translate(x, y);

    ctx.fillStyle = '#dff0ff';
    ctx.beginPath();
    ctx.moveTo(0, -14);
    ctx.lineTo(10, 10);
    ctx.lineTo(-10, 10);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#94c8ff';
    ctx.beginPath();
    ctx.arc(0, -2, 3.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffcc8a';
    ctx.beginPath();
    ctx.moveTo(-4, 10);
    ctx.lineTo(0, 18);
    ctx.lineTo(4, 10);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  };

  const drawAsteroid = (ctx: CanvasRenderingContext2D, asteroid: Asteroid) => {
    ctx.save();
    ctx.translate(asteroid.x, asteroid.y);
    ctx.fillStyle = '#c28a57';
    ctx.beginPath();
    ctx.arc(0, 0, asteroid.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 230, 190, 0.28)';
    ctx.beginPath();
    ctx.arc(-asteroid.r * 0.25, -asteroid.r * 0.3, asteroid.r * 0.35, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, width, height);

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, 'rgba(7, 14, 26, 0.95)');
    bg.addColorStop(1, 'rgba(3, 8, 16, 0.95)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 70; i++) {
      const sx = (i * 47) % width;
      const sy = (i * 83) % height;
      const radius = i % 7 === 0 ? 1.8 : 1;
      ctx.fillStyle = i % 9 === 0 ? 'rgba(200, 227, 255, 0.85)' : 'rgba(171, 209, 247, 0.45)';
      ctx.beginPath();
      ctx.arc(sx, sy, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const laneGlow = ctx.createLinearGradient(0, 0, width, 0);
    laneGlow.addColorStop(0, 'rgba(165, 212, 255, 0.08)');
    laneGlow.addColorStop(0.5, 'rgba(255, 202, 132, 0.14)');
    laneGlow.addColorStop(1, 'rgba(165, 212, 255, 0.08)');
    ctx.fillStyle = laneGlow;
    ctx.fillRect(0, height - 110, width, 110);

    const shipY = height - 38;
    drawShip(ctx, playerXRef.current, shipY);

    asteroidsRef.current.forEach((asteroid) => drawAsteroid(ctx, asteroid));
  }, []);

  const stopGame = useCallback((didCrash: boolean) => {
    runningRef.current = false;
    setRunning(false);
    setStatus(didCrash ? 'crashed' : 'idle');

    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    const rounded = Math.floor(scoreRef.current);
    let nextBest = bestScore;

    setBestScore((prev) => {
      const updated = Math.max(prev, rounded);
      nextBest = updated;
      localStorage.setItem(BEST_SCORE_KEY, String(updated));
      return updated;
    });

    if (didCrash && rounded > 0) {
      const latest: LeaderboardRun = { score: rounded, difficulty, at: Date.now() };
      const nextRuns = [latest, ...runs].sort((a, b) => b.score - a.score || b.at - a.at).slice(0, 5);
      setRuns(nextRuns);
      localStorage.setItem(RUNS_KEY, JSON.stringify(nextRuns));
      playTone(160, 0.18, 'sawtooth', 0.04);
    }

    if (!badgeUnlocked && nextBest >= BADGE_THRESHOLD) {
      setBadgeUnlocked(true);
      localStorage.setItem(BADGE_KEY, '1');
      window.dispatchEvent(new CustomEvent(BADGE_EVENT, { detail: { unlocked: true, bestScore: nextBest } }));
      playTone(620, 0.14, 'triangle', 0.05);
      setTimeout(() => playTone(860, 0.16, 'triangle', 0.05), 120);
    }
  }, [badgeUnlocked, bestScore, difficulty, playTone, runs]);

  const gameLoop = useCallback((ts: number) => {
    if (!runningRef.current) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    if (lastTsRef.current === 0) {
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    const dt = Math.min((ts - lastTsRef.current) / 1000, 0.05);
    lastTsRef.current = ts;

    const moveDir = (keysRef.current.right ? 1 : 0) - (keysRef.current.left ? 1 : 0);
    playerXRef.current += moveDir * 280 * dt;
    playerXRef.current = Math.max(18, Math.min(width - 18, playerXRef.current));

    spawnTimerRef.current += dt;
    if (spawnTimerRef.current >= config.spawnInterval) {
      spawnTimerRef.current = 0;
      const radius = 10 + Math.random() * 10;
      asteroidsRef.current.push({
        x: radius + Math.random() * (width - radius * 2),
        y: -radius - 4,
        r: radius,
        speed: config.asteroidSpeedMin + Math.random() * (config.asteroidSpeedMax - config.asteroidSpeedMin),
      });
    }

    asteroidsRef.current = asteroidsRef.current
      .map((asteroid) => ({ ...asteroid, y: asteroid.y + asteroid.speed * dt }))
      .filter((asteroid) => asteroid.y - asteroid.r < height + 8);

    const shipY = height - 38;
    const collision = asteroidsRef.current.some((asteroid) => {
      const dx = asteroid.x - playerXRef.current;
      const dy = asteroid.y - shipY;
      const minDist = asteroid.r + 10;
      return dx * dx + dy * dy < minDist * minDist;
    });

    if (collision) {
      render();
      stopGame(true);
      return;
    }

    scoreRef.current += dt * config.scoreRate;
    setScore(Math.floor(scoreRef.current));

    render();
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [config, render, stopGame]);

  const startGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    const width = canvas.clientWidth;
    playerXRef.current = width * 0.5;
    asteroidsRef.current = [];
    scoreRef.current = 0;
    spawnTimerRef.current = 0;
    lastTsRef.current = 0;

    setScore(0);
    setStatus('running');
    setRunning(true);
    runningRef.current = true;

    playTone(420, 0.09, 'triangle', 0.04);
    setTimeout(() => playTone(560, 0.11, 'triangle', 0.04), 80);

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(gameLoop);
  }, [gameLoop, playTone, resizeCanvas]);

  const updateVirtualKey = (side: 'left' | 'right', pressed: boolean) => {
    keysRef.current[side] = pressed;
  };

  useEffect(() => {
    const stored = localStorage.getItem(BEST_SCORE_KEY);
    const parsed = stored ? Number.parseInt(stored, 10) : 0;
    setBestScore(Number.isFinite(parsed) ? parsed : 0);

    const storedRuns = localStorage.getItem(RUNS_KEY);
    if (storedRuns) {
      try {
        const parsedRuns = JSON.parse(storedRuns) as LeaderboardRun[];
        if (Array.isArray(parsedRuns)) {
          setRuns(parsedRuns.slice(0, 5));
        }
      } catch {
        setRuns([]);
      }
    }

    const storedSound = localStorage.getItem(SOUND_KEY);
    if (storedSound === '0') setSoundEnabled(false);

    setBadgeUnlocked(localStorage.getItem(BADGE_KEY) === '1');
  }, []);

  useEffect(() => {
    resizeCanvas();
    render();

    const onResize = () => {
      resizeCanvas();
      render();
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [render, resizeCanvas]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keysRef.current.left = true;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keysRef.current.right = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keysRef.current.left = false;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keysRef.current.right = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (audioCtxRef.current) {
        void audioCtxRef.current.close();
      }
    };
  }, []);

  const toggleSound = () => {
    setSoundEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(SOUND_KEY, next ? '1' : '0');
      return next;
    });
  };

  const formatRunTime = (epochMs: number) => {
    const d = new Date(epochMs);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const resetLeaderboard = () => {
    setRuns([]);
    localStorage.removeItem(RUNS_KEY);
  };

  return (
    <section className="section" id="game">
      <p className="section-tag">04 — Simulator</p>
      <h2 className="section-title">Docking Run</h2>
      <div className="section-rule" />

      <div className={styles.wrap}>
        <p className={styles.lead}>
          Pilot the ship through incoming debris. Survive as long as possible and beat your best run.
        </p>

        <div className={styles.metaRow}>
          <span className={styles.metaItem}>Score: {score}</span>
          <span className={styles.metaItem}>Best: {bestScore}</span>
          <span className={styles.metaItem}>Mode: {config.label}</span>
          <span className={styles.metaItem}>Achievement: {badgeUnlocked ? 'Unlocked' : `Reach ${BADGE_THRESHOLD}`}</span>
        </div>

        <div className={styles.controlsTop}>
          <div className={styles.difficultyGroup} role="group" aria-label="Select difficulty">
            {(Object.keys(DIFFICULTY) as Difficulty[]).map((key) => (
              <button
                key={key}
                type="button"
                className={`${styles.diffBtn} ${difficulty === key ? styles.diffBtnActive : ''}`}
                onClick={() => setDifficulty(key)}
                disabled={running}
              >
                {DIFFICULTY[key].label}
              </button>
            ))}
          </div>

          <button type="button" className="btn btn-primary" onClick={startGame}>
            {status === 'crashed' ? 'Retry Mission' : running ? 'Restart Mission' : 'Start Mission'}
          </button>

          <button type="button" className={styles.soundBtn} onClick={toggleSound}>
            SFX: {soundEnabled ? 'On' : 'Off'}
          </button>
        </div>

        <div className={styles.canvasFrame}>
          <canvas ref={canvasRef} className={styles.canvas} style={{ height: `${GAME_HEIGHT}px` }} />
          {status === 'idle' && !running && (
            <div className={styles.overlay}>
              <p>Press Start Mission</p>
              <small>Controls: A/D or Arrow Keys</small>
            </div>
          )}
          {status === 'crashed' && !running && (
            <div className={styles.overlay}>
              <p>Hull Breach</p>
              <small>Final score: {score}</small>
            </div>
          )}
        </div>

        <div className={styles.mobilePad}>
          <button
            type="button"
            className={styles.padBtn}
            onPointerDown={() => updateVirtualKey('left', true)}
            onPointerUp={() => updateVirtualKey('left', false)}
            onPointerCancel={() => updateVirtualKey('left', false)}
            onPointerLeave={() => updateVirtualKey('left', false)}
          >
            ◀ Left
          </button>
          <button
            type="button"
            className={styles.padBtn}
            onPointerDown={() => updateVirtualKey('right', true)}
            onPointerUp={() => updateVirtualKey('right', false)}
            onPointerCancel={() => updateVirtualKey('right', false)}
            onPointerLeave={() => updateVirtualKey('right', false)}
          >
            Right ▶
          </button>
        </div>

        <div className={styles.leaderboard}>
          <div className={styles.lbHeader}>
            <p className={styles.lbTitle}>Top Local Runs</p>
            <button
              type="button"
              className={styles.resetBtn}
              onClick={resetLeaderboard}
              disabled={runs.length === 0}
              aria-label="Reset local leaderboard"
            >
              Reset
            </button>
          </div>
          {runs.length === 0 ? (
            <p className={styles.lbEmpty}>No runs yet. Start a mission to populate leaderboard.</p>
          ) : (
            <ul className={styles.lbList}>
              {runs.map((run, idx) => (
                <li key={`${run.at}-${idx}`} className={styles.lbRow}>
                  <span className={styles.lbRank}>#{idx + 1}</span>
                  <span className={styles.lbScore}>{run.score}</span>
                  <span className={styles.lbMode}>{DIFFICULTY[run.difficulty].label}</span>
                  <span className={styles.lbDate}>{formatRunTime(run.at)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
