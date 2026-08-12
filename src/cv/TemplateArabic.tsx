import { profile } from '../data/profile';

export function TemplateArabic() {
  return (
    <div style={S.page} dir="rtl">
      <style>{`@media print { body { margin:0; } }`}</style>

      {/* Header */}
      <div style={S.header}>
        <div style={S.headerLeft}>
          <h1 style={S.name}>{profile.name}</h1>
          <p style={S.nameEn}>{profile.title}</p>
          <p style={S.titleAr}>مطوّر برمجيات متكامل</p>
          <div style={S.contactGrid}>
            <span>📧 {profile.email}</span>
            <span>📞 {profile.phone}</span>
            <span>📍 {profile.location}، الهند</span>
          </div>
        </div>
        <div style={S.photoBox}>
          <span style={{ fontSize: '28px', opacity: .35 }}>👤</span>
        </div>
      </div>

      <div style={S.divider} />

      {/* Two columns */}
      <div style={S.twoCols}>
        {/* Main content */}
        <div style={S.mainCol}>
          <Sec ar="الملخص المهني" en="Professional Summary">
            <p style={S.text}>{profile.summary}</p>
          </Sec>

          <Sec ar="الخبرة العملية" en="Work Experience">
            {profile.experience.map(ex => (
              <div key={ex.company} style={S.block}>
                <div style={S.blockHeader}>
                  <span style={S.blockTitle}>{ex.role}</span>
                  <span style={S.blockPeriod}>{ex.period}</span>
                </div>
                <p style={S.blockSub}>{ex.company} — {ex.location}</p>
                <ul style={S.ul}>
                  {ex.points.map(pt => <li key={pt} style={S.li}>{pt}</li>)}
                </ul>
              </div>
            ))}
          </Sec>

          <Sec ar="المشاريع البارزة" en="Featured Projects">
            {profile.projects.filter(p => p.featured).map(proj => (
              <div key={proj.id} style={S.block}>
                <p style={S.blockTitle}>{proj.name} — {proj.tagline}</p>
                <p style={S.text}>{proj.description}</p>
                <p style={{ ...S.text, color: '#555' }}>التقنيات: {proj.tech.join('، ')}</p>
              </div>
            ))}
          </Sec>
        </div>

        {/* Sidebar */}
        <div style={S.sideCol}>
          <Sec ar="التعليم" en="Education">
            {profile.education.map(ed => (
              <div key={ed.institution} style={{ marginBottom: '10px' }}>
                <p style={S.blockTitle}>{ed.degree}</p>
                <p style={{ ...S.text, color: '#16a34a' }}>{ed.institution}</p>
                <p style={S.text}>{ed.period} | {ed.grade}</p>
              </div>
            ))}
          </Sec>

          <Sec ar="المهارات التقنية" en="Technical Skills">
            {profile.skills.map(sk => (
              <div key={sk.category} style={{ marginBottom: '8px' }}>
                <p style={{ fontWeight: 700, fontSize: '10px', marginBottom: '3px' }}>{sk.category}</p>
                {sk.items.map(t => (
                  <span key={t} style={S.tag}>{t}</span>
                ))}
              </div>
            ))}
          </Sec>

          <Sec ar="الشهادات" en="Certifications">
            {profile.certifications.map(c => <p key={c} style={S.text}>✓ {c}</p>)}
          </Sec>

          <Sec ar="اللغات" en="Languages">
            {profile.languages.map(l => <p key={l} style={S.text}>• {l}</p>)}
          </Sec>
        </div>
      </div>
    </div>
  );
}

function Sec({ ar, en, children }: { ar: string; en: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ borderBottom: '2px solid #16a34a', paddingBottom: '3px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <h2 style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>{ar}</h2>
        <span style={{ fontSize: '9px', color: '#999' }}>{en}</span>
      </div>
      {children}
    </div>
  );
}

const S: Record<string, React.CSSProperties> = {
  page:       { fontFamily: '"Segoe UI", "Tahoma", "Arial", sans-serif', fontSize: '11px', color: '#111', background: '#fff', padding: '28px 32px', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 },
  header:     { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', background: '#f0fdf4', padding: '14px', borderRadius: '6px', borderRight: '4px solid #16a34a' },
  headerLeft: { flex: 1 },
  name:       { fontSize: '20px', fontWeight: 800, color: '#111', margin: 0 },
  nameEn:     { fontSize: '11px', color: '#555', marginTop: '2px' },
  titleAr:    { fontSize: '13px', color: '#16a34a', fontWeight: 600, marginTop: '3px' },
  contactGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px', fontSize: '10px', color: '#444' },
  photoBox:   { width: '80px', height: '100px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '4px', background: '#f9f9f9', flexShrink: 0 },
  divider:    { height: '2px', background: 'linear-gradient(90deg, #16a34a, transparent)', marginBottom: '14px' },
  twoCols:    { display: 'flex', gap: '16px', flexDirection: 'row-reverse' },
  mainCol:    { flex: 2 },
  sideCol:    { flex: 1, borderRight: '1px solid #e5e7eb', paddingRight: '14px' },
  block:      { marginBottom: '12px' },
  blockHeader: { display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse' },
  blockTitle: { fontWeight: 700, fontSize: '11px' },
  blockPeriod: { fontSize: '9px', color: '#777' },
  blockSub:   { color: '#16a34a', fontSize: '10px', margin: '2px 0 4px' },
  text:       { margin: '2px 0', fontSize: '10px', color: '#333', lineHeight: 1.5 },
  ul:         { paddingRight: '16px', paddingLeft: 0, margin: '4px 0' },
  li:         { margin: '2px 0', fontSize: '10px', color: '#333' },
  tag:        { display: 'inline-block', background: '#dcfce7', border: '1px solid #16a34a', borderRadius: '10px', padding: '1px 6px', fontSize: '9px', color: '#15803d', marginLeft: '3px', marginBottom: '3px' },
};
