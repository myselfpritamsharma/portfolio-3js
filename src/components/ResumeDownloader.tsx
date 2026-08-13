import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import styles from './ResumeDownloader.module.css';
import { TemplateUS }      from '../cv/TemplateUS';
import { TemplateEU }      from '../cv/TemplateEU';
import { TemplateJapanese } from '../cv/TemplateJapanese';
import { TemplateIndia }   from '../cv/TemplateIndia';
import { TemplateArabic }  from '../cv/TemplateArabic';
import { TemplateDenmark } from '../cv/TemplateDenmark';
import { TemplateGermany } from '../cv/TemplateGermany';

const FORMATS = [
  { id: 'us',       flag: '🇺🇸', country: 'USA',         style: 'Standard Resume',     desc: 'ATS-friendly, no photo',        color: '#3b82f6' },
  { id: 'eu',       flag: '🇪🇺', country: 'EU Europass', style: 'Europass CV',          desc: 'Official EU standard format',   color: '#1d4ed8' },
  { id: 'japan',    flag: '🇯🇵', country: 'Japan',       style: '履歴書 Rirekisho',     desc: 'Traditional Japanese format',   color: '#ef4444' },
  { id: 'india',    flag: '🇮🇳', country: 'India',       style: 'Indian CV',            desc: 'Skills + projects focused',     color: '#f97316' },
  { id: 'arabic',   flag: '🇸🇦', country: 'Arabic / ME', style: 'السيرة الذاتية',       desc: 'Right-to-left, bilingual',      color: '#16a34a' },
  { id: 'denmark',  flag: '🇩🇰', country: 'Denmark',     style: 'Skandinavisk CV',      desc: 'Minimalist Nordic style',       color: '#dc2626' },
  { id: 'germany',  flag: '🇩🇪', country: 'Germany',     style: 'Lebenslauf',           desc: 'Detailed German format',        color: '#ca8a04' },
];

type FormatId = 'us' | 'eu' | 'japan' | 'india' | 'arabic' | 'denmark' | 'germany';

interface Props { onClose: () => void; }

export function ResumeDownloader({ onClose }: Props) {
  const [selected, setSelected] = useState<FormatId | null>(null);
  const printRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const printFn = useReactToPrint({ contentRef: printRef });

  const handlePrint = () => { if (selected) printFn(); };

  const fmt = FORMATS.find(f => f.id === selected);

  useEffect(() => {
    closeBtnRef.current?.focus();

    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [onClose]);

  return (
    <div className={styles.overlay} role="presentation" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="resume-dialog-title">
        {/* Header */}
        <div className={styles.header}>
          <div>
            <h2 className={styles.title} id="resume-dialog-title">Download Resume</h2>
            <p className={styles.sub}>Choose a country/region CV format</p>
          </div>
          <button type="button" className={styles.close} onClick={onClose} aria-label="Close" ref={closeBtnRef}>✕</button>
        </div>

        {/* Format grid */}
        <div className={styles.grid}>
          {FORMATS.map(f => (
            <button
              key={f.id}
              type="button"
              className={`${styles.fmtCard} ${selected === f.id ? styles.fmtActive : ''}`}
              onClick={() => setSelected(f.id as FormatId)}
              aria-pressed={selected === f.id}
              style={{ '--c': f.color } as React.CSSProperties}
            >
              <span className={styles.fmtFlag}>{f.flag}</span>
              <div className={styles.fmtInfo}>
                <span className={styles.fmtCountry}>{f.country}</span>
                <span className={styles.fmtStyle}>{f.style}</span>
                <span className={styles.fmtDesc}>{f.desc}</span>
              </div>
              {selected === f.id && <span className={styles.fmtCheck}>✓</span>}
            </button>
          ))}
        </div>

        {/* Action bar */}
        <div className={styles.actions}>
          {selected && (
            <p className={styles.actionHint}>
              {fmt?.flag} <strong>{fmt?.country}</strong> format selected — {fmt?.desc}
            </p>
          )}
          <div className={styles.actionBtns}>
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={!selected}
              onClick={handlePrint}
            >
              ↓ Download PDF
            </button>
          </div>
        </div>

        {/* Hidden print area */}
        <div style={{ display: 'none' }}>
          <div ref={printRef}>
            {selected === 'us'      && <TemplateUS />}
            {selected === 'eu'      && <TemplateEU />}
            {selected === 'japan'   && <TemplateJapanese />}
            {selected === 'india'   && <TemplateIndia />}
            {selected === 'arabic'  && <TemplateArabic />}
            {selected === 'denmark' && <TemplateDenmark />}
            {selected === 'germany' && <TemplateGermany />}
          </div>
        </div>
      </div>
    </div>
  );
}
