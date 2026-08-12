import { profile } from '../data/profile';

export function TemplateUS() {
  return (
    <div style={S.page}>
      <style>{`@media print { body { margin: 0; } }`}</style>

      {/* Header */}
      <div style={S.header}>
        <h1 style={S.name}>{profile.name}</h1>
        <p style={S.title}>{profile.title}</p>
        <div style={S.contact}>
          <span>{profile.email}</span>
          <span style={S.sep}>|</span>
          <span>{profile.phone}</span>
          <span style={S.sep}>|</span>
          <span>{profile.location}</span>
          <span style={S.sep}>|</span>
          <span>{profile.linkedin}</span>
          <span style={S.sep}>|</span>
          <span>{profile.github}</span>
        </div>
      </div>

      <hr style={S.hr} />

      {/* Summary */}
      <Section title="PROFESSIONAL SUMMARY">
        <p style={S.body}>{profile.summary}</p>
      </Section>

      {/* Experience */}
      <Section title="WORK EXPERIENCE">
        {profile.experience.map(ex => (
          <div key={ex.company} style={S.expItem}>
            <div style={S.expHeader}>
              <div>
                <span style={S.role}>{ex.role}</span>
                <span style={S.company}> — {ex.company}</span>
              </div>
              <span style={S.period}>{ex.period}</span>
            </div>
            <ul style={S.ul}>
              {ex.points.map(pt => <li key={pt} style={S.li}>{pt}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      {/* Education */}
      <Section title="EDUCATION">
        {profile.education.map(ed => (
          <div key={ed.institution} style={S.expItem}>
            <div style={S.expHeader}>
              <div>
                <span style={S.role}>{ed.degree}</span>
                <span style={S.company}> — {ed.institution}</span>
              </div>
              <span style={S.period}>{ed.period} · GPA: {ed.grade}</span>
            </div>
          </div>
        ))}
      </Section>

      {/* Skills */}
      <Section title="TECHNICAL SKILLS">
        {profile.skills.map(sk => (
          <p key={sk.category} style={S.body}>
            <strong>{sk.category}:</strong> {sk.items.join(', ')}
          </p>
        ))}
      </Section>

      {/* Certifications */}
      <Section title="CERTIFICATIONS">
        {profile.certifications.map(c => (
          <p key={c} style={S.body}>• {c}</p>
        ))}
      </Section>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h2 style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', borderBottom: '1px solid #333', paddingBottom: '3px', marginBottom: '8px', textTransform: 'uppercase' }}>{title}</h2>
      {children}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page:    { fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#111', background: '#fff', padding: '36px 44px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.5 },
  header:  { textAlign: 'center', marginBottom: '12px' },
  name:    { fontSize: '22px', fontWeight: 700, letterSpacing: '1px', margin: '0 0 4px', textTransform: 'uppercase' },
  title:   { fontSize: '12px', color: '#555', margin: '0 0 6px' },
  contact: { fontSize: '10px', color: '#555', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '4px' },
  sep:     { color: '#bbb' },
  hr:      { border: 'none', borderTop: '2px solid #111', margin: '10px 0' },
  expItem: { marginBottom: '10px' },
  expHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  role:    { fontWeight: 700 },
  company: { color: '#444' },
  period:  { color: '#666', whiteSpace: 'nowrap', fontSize: '10px' },
  ul:      { paddingLeft: '16px', margin: '4px 0' },
  li:      { marginBottom: '2px' },
  body:    { margin: '3px 0', color: '#222' },
};
