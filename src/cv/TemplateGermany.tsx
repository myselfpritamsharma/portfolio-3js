import { profile } from '../data/profile';

export function TemplateGermany() {
  const today = new Date();
  const dateStr = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;

  return (
    <div style={S.page}>
      <style>{`@media print { body { margin:0; } }`}</style>

      {/* Top: title + photo */}
      <div style={S.topRow}>
        <div>
          <h1 style={S.cvTitle}>Lebenslauf</h1>
        </div>
        <div style={S.photoBox}>
          <div style={S.photo}><span style={{ fontSize: '22px', opacity: .35 }}>👤</span></div>
          <p style={{ fontSize: '8px', color: '#999', textAlign: 'center', marginTop: '2px' }}>Lichtbild</p>
        </div>
      </div>

      {/* Personal data */}
      <Sec title="Persönliche Angaben">
        <table style={S.infoTable}>
          <tbody>
            <InfoRow label="Name"          val={profile.name} />
            <InfoRow label="Wohnort"       val={`${profile.location}, Indien`} />
            <InfoRow label="Telefon"       val={profile.phone} />
            <InfoRow label="E-Mail"        val={profile.email} />
            <InfoRow label="LinkedIn"      val={profile.linkedin} />
            <InfoRow label="GitHub"        val={profile.github} />
            <InfoRow label="Nationalität" val="Indisch" />
            <InfoRow label="Sprachen"      val={profile.languages.join(', ')} />
          </tbody>
        </table>
      </Sec>

      {/* Berufserfahrung */}
      <Sec title="Berufserfahrung">
        {profile.experience.map(ex => (
          <div key={ex.company} style={S.expRow}>
            <div style={S.expLeft}>
              <span style={S.expPeriod}>{ex.period}</span>
            </div>
            <div style={S.expRight}>
              <p style={S.expRole}>{ex.role}</p>
              <p style={S.expCompany}>{ex.company} — {ex.location}</p>
              <ul style={S.ul}>
                {ex.points.map(pt => <li key={pt} style={S.li}>{pt}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </Sec>

      {/* Ausbildung */}
      <Sec title="Ausbildung">
        {profile.education.map(ed => (
          <div key={ed.institution} style={S.expRow}>
            <div style={S.expLeft}>
              <span style={S.expPeriod}>{ed.period}</span>
            </div>
            <div style={S.expRight}>
              <p style={S.expRole}>{ed.degree}</p>
              <p style={S.expCompany}>{ed.institution}</p>
              <p style={S.li}>Note (CGPA): {ed.grade}</p>
            </div>
          </div>
        ))}
      </Sec>

      {/* Kenntnisse */}
      <Sec title="Kenntnisse und Fähigkeiten">
        {profile.skills.map(sk => (
          <div key={sk.category} style={S.expRow}>
            <div style={S.expLeft}>
              <span style={{ ...S.expPeriod, color: '#333' }}>{sk.category}</span>
            </div>
            <div style={S.expRight}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ flex: 1, height: '5px', background: '#eee', borderRadius: '3px' }}>
                  <div style={{ width: `${sk.level}%`, height: '100%', background: '#1a1a1a', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '9px', color: '#777', width: '28px' }}>{sk.level}%</span>
              </div>
              <p style={{ fontSize: '10px', color: '#555', marginTop: '3px' }}>{sk.items.join(', ')}</p>
            </div>
          </div>
        ))}
      </Sec>

      {/* Zertifikate */}
      <Sec title="Zertifikate">
        {profile.certifications.map(c => (
          <div key={c} style={S.expRow}>
            <div style={S.expLeft} />
            <div style={S.expRight}><p style={S.li}>• {c}</p></div>
          </div>
        ))}
      </Sec>

      {/* Signature */}
      <div style={S.signature}>
        <div>
          <p style={{ fontSize: '10px', color: '#555' }}>{profile.location}, {dateStr}</p>
          <div style={{ marginTop: '30px', borderTop: '1px solid #333', width: '160px', paddingTop: '3px' }}>
            <p style={{ fontSize: '10px', color: '#333' }}>{profile.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <h2 style={{ fontSize: '12px', fontWeight: 700, borderBottom: '2px solid #1a1a1a', paddingBottom: '4px', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '.5px' }}>{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ label, val }: { label: string; val: string }) {
  return (
    <tr>
      <td style={{ fontWeight: 600, paddingRight: '16px', paddingBottom: '4px', fontSize: '10px', verticalAlign: 'top', width: '110px', color: '#444' }}>{label}</td>
      <td style={{ paddingBottom: '4px', fontSize: '11px', color: '#111' }}>{val}</td>
    </tr>
  );
}

const S: Record<string, React.CSSProperties> = {
  page:       { fontFamily: '"Times New Roman", Times, serif', fontSize: '11px', color: '#111', background: '#fff', padding: '30px 40px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.5 },
  topRow:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' },
  cvTitle:    { fontSize: '28px', fontWeight: 700, letterSpacing: '3px', textTransform: 'uppercase', margin: 0 },
  photoBox:   { textAlign: 'center' },
  photo:      { width: '80px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f9f9f9' },
  infoTable:  { borderCollapse: 'collapse' },
  expRow:     { display: 'flex', gap: '16px', marginBottom: '12px', alignItems: 'flex-start' },
  expLeft:    { width: '110px', flexShrink: 0 },
  expRight:   { flex: 1 },
  expPeriod:  { fontSize: '10px', color: '#666', display: 'block' },
  expRole:    { fontWeight: 700, fontSize: '11.5px', marginBottom: '1px' },
  expCompany: { color: '#555', fontSize: '10px', marginBottom: '4px' },
  ul:         { paddingLeft: '14px', margin: '4px 0' },
  li:         { fontSize: '10px', color: '#333', margin: '2px 0' },
  signature:  { marginTop: '24px', paddingTop: '12px', borderTop: '1px solid #eee' },
};
