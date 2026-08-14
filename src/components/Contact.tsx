import { useEffect, useState } from 'react';
import styles from './Contact.module.css';
import { profile } from '../data/profile';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const resetForm = () => {
    setForm({ name: '', email: '', message: '' });
    setSent(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${subject}&body=${body}`;

    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  useEffect(() => {
    if (!sent) return;

    const timer = window.setTimeout(() => setSent(false), 2500);
    return () => window.clearTimeout(timer);
  }, [sent]);

  return (
    <section className="section" id="contact">
      <p className="section-tag">06 — Signal</p>
      <h2 className="section-title">Get In Touch</h2>
      <div className="section-rule" />

      <div className={styles.wrapper}>
        <p className={styles.intro}>
          Have a project, a collaboration idea, or just want to talk tech?
          Drop a message and I’ll get back to you.
        </p>

        <div className={styles.grid}>
          {/* Channels */}
          <div className={styles.channels}>
            {[
              { icon: '📧', label: 'Email',    val: profile.email,    href: `mailto:${profile.email}` },
              { icon: '💼', label: 'LinkedIn', val: 'pritam-sharma-483242199',  href: profile.linkedin },
              { icon: '🐙', label: 'GitHub (main)',   val: 'myselfpritamsharma',  href: profile.github },
              { icon: '🐙', label: 'GitHub (archive)', val: 'pritamleo841', href: profile.githubAlt },
            ].map(c => (
              <a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                className={styles.channel}
                aria-label={`${c.label}: ${c.val}`}
              >
                <span className={styles.channelIconWrap}>{c.icon}</span>
                <div className={styles.channelBody}>
                  <p className={styles.channelLabel}>{c.label}</p>
                  <p className={styles.channelVal}>{c.val}</p>
                </div>
                <span className={styles.channelArr}>↗</span>
              </a>
            ))}
          </div>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit}>
            {sent ? (
              <div className={styles.sent} role="status" aria-live="polite">
                <span className={styles.sentIcon}>✓</span>
                <p className={styles.sentTitle}>Gmail draft opened.</p>
                <p className={styles.sentSub}>The form will return in a moment so you can send another message.</p>
                <button type="button" className="btn btn-outline" onClick={resetForm}>
                  Send Another →
                </button>
              </div>
            ) : (
              <>
                <p className={styles.formTitle}>Send a message</p>
                <div className={styles.field}>
                  <label htmlFor="contact-name" className={styles.label}>Name</label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className={styles.input}
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-email" className={styles.label}>Email</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.field}>
                  <label htmlFor="contact-msg" className={styles.label}>Message</label>
                  <textarea
                    id="contact-msg"
                    name="message"
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell me about the role or project…"
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className={styles.formButtons}>
                  <button type="submit" className="btn btn-primary">
                    Send Message →
                  </button>
                  <button type="button" className="btn btn-outline" onClick={resetForm}>
                    Reset
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
