import { profile } from '../data/profile';

export function TemplateIndia() {
  return (
    <div style={S.page}>
      <style>{`@media print { body { margin:0; } }`}</style>

      {/* Header */}
      <div style={S.header}>
        <h1 style={S.name}>{profile.name}</h1>
        <p style={S.title}>{profile.title}</p>
        <div style={S.contactRow}>
          <span>📧 {profile.email}</span>
          <span>📞 {profile.phone}</span>
          <span>📍 {profile.location}, India</span>
          <span>🔗 {profile.linkedin}</span>
        </div>
      </div>

      {/* Objective */}
      <Section title="CAREER OBJECTIVE">
        <p style={S.text}>
          Seeking a challenging position as a <strong>{profile.title}</strong> where I can leverage my
          expertise in full-stack development, creative technologies, and cloud infrastructure to
          deliver high-impact software solutions that drive business growth.
        </p>
      </Section>

      {/* Technical Skills */}
      <Section title="TECHNICAL SKILLS">
        <table style={S.skillTable}>
          <tbody>
            {profile.skills.map(sk => (
              <tr key={sk.category}>
                <td style={S.skillCat}>{sk.category}</td>
                <td style={S.skillItems}>{sk.items.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      {/* Work Experience */}
      <Section title="WORK EXPERIENCE">
        {profile.experience.map(ex => (
          <div key={ex.company} style={S.expBlock}>
            <div style={S.expRow}>
              <span style={S.expRole}>{ex.role}</span>
              <span style={S.expPeriod}>{ex.period}</span>
            </div>
            <p style={S.expCompany}>{ex.company} | {ex.type} | {ex.location}</p>
            <ul style={S.ul}>
              {ex.points.map(pt => <li key={pt} style={S.li}>✦ {pt}</li>)}
            </ul>
          </div>
        ))}
      </Section>

      {/* Projects */}
      <Section title="MAJOR PROJECTS">
        {profile.projects.filter(p => p.featured).map(proj => (
          <div key={proj.id} style={S.projBlock}>
            <span style={S.projName}>{proj.name}</span>
            <span style={S.projTagline}> — {proj.tagline}</span>
            <p style={S.text}>{proj.description}</p>
            <p style={{ ...S.text, color: '#555', fontSize: '10px' }}>
              <strong>Technologies:</strong> {proj.tech.join(', ')}
            </p>
          </div>
        ))}
      </Section>

      {/* Education */}
      <Section title="ACADEMIC QUALIFICATIONS">
        {profile.education.map(ed => (
          <div key={ed.institution} style={S.expBlock}>
            <div style={S.expRow}>
              <span style={S.expRole}>{ed.degree}</span>
              <span style={S.expPeriod}>{ed.period}</span>
            </div>
            <p style={S.expCompany}>{ed.institution}</p>
            <p style={S.text}>CGPA: {ed.grade}</p>
            {ed.highlights.map(h => <p key={h} style={{ ...S.text, color: '#444' }}>• {h}</p>)}
          </div>
        ))}
      </Section>

      {/* Certifications */}
      <Section title="CERTIFICATIONS & ACHIEVEMENTS">
        {profile.certifications.map(c => (
          <p key={c} style={S.text}>✓ {c}</p>
        ))}
      </Section>

      {/* Personal Details */}
      <Section title="PERSONAL DETAILS">
        <table style={{ borderCollapse: 'collapse', fontSize: '11px' }}>
          <tbody>
            <tr>
              <td style={{ paddingRight: '24px', color: '#555' }}>Languages Known</td>
              <td>: {profile.languages.join(', ')}</td>
            </tr>
            <tr>
              <td style={{ color: '#555' }}>Hobbies</td>
              <td>: {profile.hobbies.join(', ')}</td>
            </tr>
          </tbody>
        </table>
      </Section>

      {/* Declaration */}
      <div style={{ marginTop: '16px', paddingTop: '10px', borderTop: '1px solid #ccc' }}>
        <p style={S.text}>
          <strong>Declaration:</strong> I hereby declare that the information furnished above is true
          and correct to the best of my knowledge and belief.
        </p>
        <p style={{ ...S.text, marginTop: '20px' }}>
          Date: _____________ &nbsp;&nbsp;&nbsp; Place: _____________
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          Signature: _______________
        </p>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '12px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: 700, background: '#1e3a5f', color: '#fff', padding: '4px 10px', letterSpacing: '1px', marginBottom: '8px' }}>{title}</h2>
      <div style={{ paddingLeft: '4px' }}>{children}</div>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page:      { fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#111', background: '#fff', padding: '28px 36px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.5 },
  header:    { textAlign: 'center', borderBottom: '3px solid #1e3a5f', paddingBottom: '10px', marginBottom: '14px' },
  name:      { fontSize: '22px', fontWeight: 700, color: '#1e3a5f', margin: 0, letterSpacing: '.5px' },
  title:     { fontSize: '12px', color: '#555', margin: '3px 0 6px' },
  contactRow: { display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', fontSize: '10px', color: '#444' },
  text:      { margin: '3px 0', fontSize: '11px', color: '#333', lineHeight: 1.55 },
  skillTable: { borderCollapse: 'collapse', width: '100%' },
  skillCat:  { fontWeight: 700, padding: '3px 12px 3px 0', color: '#1e3a5f', width: '130px', verticalAlign: 'top' },
  skillItems: { padding: '3px 0', borderBottom: '1px dotted #e0e0e0' },
  expBlock:  { marginBottom: '12px' },
  expRow:    { display: 'flex', justifyContent: 'space-between' },
  expRole:   { fontWeight: 700, fontSize: '12px' },
  expPeriod: { color: '#555', fontSize: '10px' },
  expCompany: { color: '#1e3a5f', fontSize: '10px', margin: '2px 0 4px' },
  ul:        { listStyle: 'none', padding: 0, margin: '4px 0' },
  li:        { fontSize: '10px', color: '#333', margin: '2px 0' },
  projBlock: { marginBottom: '10px' },
  projName:  { fontWeight: 700, fontSize: '11px' },
  projTagline: { color: '#1e3a5f', fontSize: '10px' },
};
