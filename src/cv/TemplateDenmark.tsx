import { profile } from '../data/profile';

export function TemplateDenmark() {
  return (
    <div style={S.page}>
      <style>{`@media print { body { margin:0; } }`}</style>

      {/* Top strip */}
      <div style={S.topStrip} />

      {/* Header */}
      <div style={S.header}>
        <div style={S.avatarBox}>
          <div style={S.avatar}><span style={{ fontSize: '28px', opacity: .4 }}>👤</span></div>
        </div>
        <div style={S.nameBlock}>
          <h1 style={S.name}>{profile.name}</h1>
          <p style={S.title}>{profile.title}</p>
          <div style={S.contacts}>
            <span>{profile.email}</span>
            <span>·</span>
            <span>{profile.phone}</span>
            <span>·</span>
            <span>{profile.location}</span>
          </div>
          <div style={S.links}>
            <a href={profile.linkedin} style={S.link}>LinkedIn</a>
            <a href={profile.github}   style={S.link}>GitHub</a>
            <span style={S.link}>{profile.website}</span>
          </div>
        </div>
      </div>

      {/* Summary */}
      <p style={S.summary}>{profile.summary}</p>

      <div style={S.rule} />

      {/* Two columns */}
      <div style={S.cols}>
        {/* Main */}
        <div style={S.mainCol}>
          <Sec title="Erhvervserfaring">
            {profile.experience.map(ex => (
              <div key={ex.company} style={S.item}>
                <div style={S.itemHeader}>
                  <span style={S.itemTitle}>{ex.role}</span>
                  <span style={S.itemPeriod}>{ex.period}</span>
                </div>
                <p style={S.itemSub}>{ex.company} · {ex.location}</p>
                <ul style={S.ul}>
                  {ex.points.map(pt => <li key={pt} style={S.li}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </Sec>

          <Sec title="Uddannelse">
            {profile.education.map(ed => (
              <div key={ed.institution} style={S.item}>
                <div style={S.itemHeader}>
                  <span style={S.itemTitle}>{ed.degree}</span>
                  <span style={S.itemPeriod}>{ed.period}</span>
                </div>
                <p style={S.itemSub}>{ed.institution} · {ed.grade}</p>
              </div>
            ))}
          </Sec>
        </div>

        {/* Sidebar */}
        <div style={S.sidebar}>
          <Sec title="Kompetencer">
            {profile.skills.map(sk => (
              <div key={sk.category} style={{ marginBottom: '8px' }}>
                <p style={{ fontSize: '9px', fontWeight: 700, color: '#c8102e', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: '4px' }}>{sk.category}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3px' }}>
                  {sk.items.map(t => <span key={t} style={S.skillTag}>{t}</span>)}
                </div>
              </div>
            ))}
          </Sec>

          <Sec title="Sprog">
            {profile.languages.map(l => <p key={l} style={S.sideText}>{l}</p>)}
          </Sec>

          <Sec title="Certifikater">
            {profile.certifications.map(c => <p key={c} style={S.sideText}>✓ {c}</p>)}
          </Sec>

          <Sec title="Interesser">
            {profile.hobbies.map(h => <p key={h} style={S.sideText}>→ {h}</p>)}
          </Sec>
        </div>
      </div>
    </div>
  );
}

function Sec({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      <h2 style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', color: '#c8102e', marginBottom: '8px' }}>{title}</h2>
      {children}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page:      { fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: '11px', color: '#1a1a1a', background: '#fff', padding: '0', maxWidth: '800px', margin: '0 auto', lineHeight: 1.5 },
  topStrip:  { height: '6px', background: '#c8102e' },
  header:    { display: 'flex', gap: '20px', padding: '20px 28px 14px', alignItems: 'flex-start', borderBottom: '1px solid #f0f0f0' },
  avatarBox: {},
  avatar:    { width: '75px', height: '75px', borderRadius: '50%', border: '2px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafafa', flexShrink: 0 },
  nameBlock: { flex: 1 },
  name:      { fontSize: '22px', fontWeight: 700, margin: '0 0 2px', letterSpacing: '-.3px' },
  title:     { color: '#c8102e', fontWeight: 600, fontSize: '12px', margin: '0 0 6px' },
  contacts:  { display: 'flex', gap: '6px', fontSize: '10px', color: '#555', flexWrap: 'wrap' },
  links:     { display: 'flex', gap: '8px', marginTop: '4px' },
  link:      { fontSize: '10px', color: '#c8102e', textDecoration: 'none' },
  summary:   { padding: '12px 28px', color: '#555', fontSize: '10.5px', lineHeight: 1.65, background: '#fdf9f9', borderBottom: '1px solid #f0f0f0' },
  rule:      { height: '1px', background: '#f0f0f0' },
  cols:      { display: 'flex', gap: '0', padding: '18px 28px' },
  mainCol:   { flex: 2, paddingRight: '20px', borderRight: '1px solid #f0f0f0' },
  sidebar:   { flex: 1, paddingLeft: '20px' },
  item:      { marginBottom: '12px' },
  itemHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' },
  itemTitle: { fontWeight: 700, fontSize: '11px' },
  itemPeriod: { fontSize: '9px', color: '#999' },
  itemSub:   { color: '#c8102e', fontSize: '10px', margin: '2px 0 4px' },
  ul:        { paddingLeft: '14px', margin: '4px 0' },
  li:        { fontSize: '10px', color: '#444', margin: '2px 0', lineHeight: 1.4 },
  skillTag:  { display: 'inline-block', background: '#fff0f0', border: '1px solid #ffd7d7', borderRadius: '10px', padding: '1px 7px', fontSize: '9px', color: '#b91c1c' },
  sideText:  { fontSize: '10px', color: '#444', margin: '3px 0' },
};
