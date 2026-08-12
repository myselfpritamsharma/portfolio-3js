import { profile } from '../data/profile';

export function TemplateEU() {
  return (
    <div style={S.page}>
      <style>{`@media print { body { margin:0; } }`}</style>

      {/* EU Header Bar */}
      <div style={S.headerBar}>
        <div style={S.euLogo}>
          <span style={{ fontSize: '22px' }}>🇪🇺</span>
          <span style={S.europassLabel}>Europass</span>
          <span style={S.cvLabel}>Curriculum Vitae</span>
        </div>
        <div style={S.photoBox}>
          <div style={S.photoPlaceholder}>
            <span style={{ fontSize: '28px', opacity: .4 }}>👤</span>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={S.body}>
        {/* Sidebar */}
        <div style={S.sidebar}>
          <Block title="Personal Information">
            <InfoRow label="Name"     val={profile.name} />
            <InfoRow label="Location" val={profile.location} />
            <InfoRow label="Email"    val={profile.email} />
            <InfoRow label="Phone"    val={profile.phone} />
            <InfoRow label="LinkedIn" val="linkedin.com/in/pritam-sharma" />
            <InfoRow label="Website"  val={profile.website} />
          </Block>

          <Block title="Technical Skills">
            {profile.skills.map(sk => (
              <div key={sk.category} style={{ marginBottom: '8px' }}>
                <p style={{ fontWeight: 700, fontSize: '10px', marginBottom: '2px' }}>{sk.category}</p>
                <div style={{ height: '5px', background: '#e5e7eb', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: `${sk.level}%`, height: '100%', background: '#003399', borderRadius: '3px' }} />
                </div>
              </div>
            ))}
          </Block>

          <Block title="Languages">
            {profile.languages.map(l => <p key={l} style={S.small}>{l}</p>)}
          </Block>

          <Block title="Certifications">
            {profile.certifications.map(c => <p key={c} style={S.small}>• {c}</p>)}
          </Block>
        </div>

        {/* Main */}
        <div style={S.main}>
          <h1 style={S.name}>{profile.name}</h1>
          <p style={S.profession}>{profile.title}</p>

          <Block title="Professional Summary">
            <p style={S.text}>{profile.summary}</p>
          </Block>

          <Block title="Work Experience">
            {profile.experience.map(ex => (
              <div key={ex.company} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '11px' }}>{ex.role}</strong>
                  <span style={S.period}>{ex.period}</span>
                </div>
                <p style={{ color: '#003399', fontSize: '10px', margin: '2px 0' }}>{ex.company} — {ex.location}</p>
                <ul style={{ paddingLeft: '16px', margin: '4px 0' }}>
                  {ex.points.map(pt => <li key={pt} style={S.small}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </Block>

          <Block title="Education and Training">
            {profile.education.map(ed => (
              <div key={ed.institution}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '11px' }}>{ed.degree}</strong>
                  <span style={S.period}>{ed.period}</span>
                </div>
                <p style={{ color: '#003399', fontSize: '10px', margin: '2px 0' }}>{ed.institution}</p>
                <p style={S.small}>Grade: {ed.grade}</p>
              </div>
            ))}
          </Block>
        </div>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <h2 style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#003399', borderBottom: '1px solid #003399', paddingBottom: '3px', marginBottom: '8px' }}>{title}</h2>
      {children}
    </div>
  );
}

function InfoRow({ label, val }: { label: string; val: string }) {
  return (
    <div style={{ display: 'flex', gap: '6px', marginBottom: '4px' }}>
      <span style={{ fontSize: '9px', color: '#555', minWidth: '55px', flexShrink: 0 }}>{label}:</span>
      <span style={{ fontSize: '10px', color: '#111', wordBreak: 'break-all' }}>{val}</span>
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page:        { fontFamily: 'Arial, sans-serif', background: '#fff', color: '#111', maxWidth: '794px', margin: '0 auto', fontSize: '11px' },
  headerBar:   { background: '#003399', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  euLogo:      { display: 'flex', alignItems: 'center', gap: '8px' },
  europassLabel: { color: '#fff', fontWeight: 700, fontSize: '16px', letterSpacing: '1px' },
  cvLabel:     { color: '#ccd3ff', fontSize: '11px', marginTop: '1px' },
  photoBox:    {},
  photoPlaceholder: { width: '60px', height: '75px', background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: '3px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  body:        { display: 'flex', gap: '0' },
  sidebar:     { width: '190px', flexShrink: 0, background: '#f0f4ff', padding: '16px 14px', borderRight: '2px solid #003399' },
  main:        { flex: 1, padding: '16px 20px' },
  name:        { fontSize: '18px', fontWeight: 700, color: '#003399', margin: '0 0 2px' },
  profession:  { color: '#555', fontSize: '11px', marginBottom: '14px' },
  text:        { fontSize: '11px', color: '#333', lineHeight: 1.6, margin: '4px 0' },
  small:       { fontSize: '10px', color: '#444', margin: '2px 0', lineHeight: 1.5 },
  period:      { fontSize: '9px', color: '#777', whiteSpace: 'nowrap' },
};
