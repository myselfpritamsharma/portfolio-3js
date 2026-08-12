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
      <p className="section-tag">05 — Signal</p>
      <h2 className="section-title">Get In Touch</h2>
      <div className="section-rule" />

      <div className={styles.grid}>
        {/* Left */}
        <div className={styles.left}>
          <p className={styles.intro}>
            Have a project in mind, a question, or just want to say hi?
            My inbox is always open. I'll get back to you within 24 hours.
          </p>

          <div className={styles.channels}>
            {[
              { icon: '📧', label: 'Email',    val: profile.email,    href: `mailto:${profile.email}` },
              { icon: '💼', label: 'LinkedIn', val: 'pritam-sharma',  href: profile.linkedin },
              { icon: '🐙', label: 'GitHub',   val: 'pritamsharma',  href: profile.github },
            ].map(c => (
              <a key={c.label} href={c.href} target="_blank" rel="noreferrer" className={styles.channel}>
                <span className={styles.channelIcon}>{c.icon}</span>
                <div>
                  <p className={styles.channelLabel}>{c.label}</p>
                  <p className={styles.channelVal}>{c.val}</p>
                </div>
                <span className={styles.channelArr}>↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form className={`card ${styles.form}`} onSubmit={handleSubmit}>
          {sent ? (
            <div className={styles.sent}>
              <span className={styles.sentIcon}>✓</span>
              <p className={styles.sentTitle}>Message ready!</p>
              <p className={styles.sentSub}>Your mail client will open with the message pre-filled.</p>
            </div>
          ) : (
            <>
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
                  placeholder="Tell me about your project…"
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
    </section>
  );
}
