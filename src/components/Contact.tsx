import { useState } from 'react';
import styles from './Contact.module.css';
import { profile } from '../data/profile';

export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Opens default mail client — no backend needed
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body    = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

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
              { icon: '🐙', label: 'GitHub',   val: 'myselfpritamsharma',  href: profile.github },
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
                <p className={styles.sentTitle}>Message ready!</p>
                <p className={styles.sentSub}>Your mail client will open with the message pre-filled.</p>
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
                <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message →
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
