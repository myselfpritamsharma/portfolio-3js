import { profile } from '../data/profile';

export function TemplateJapanese() {
  const today = new Date();
  const year  = today.getFullYear();
  const month = today.getMonth() + 1;
  const day   = today.getDate();

  return (
    <div style={S.page}>
      <style>{`@media print { body { margin:0; } }`}</style>

      {/* Title */}
      <h1 style={S.title}>履　歴　書</h1>
      <p style={S.date}>{year}年 {month}月 {day}日　現在</p>

      {/* Top section */}
      <table style={S.topTable}>
        <tbody>
          <tr>
            {/* Left: personal info */}
            <td style={{ ...S.td, width: '65%', verticalAlign: 'top' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={S.label}>ふりがな</td>
                    <td style={S.value} colSpan={3}>ぷりたむ　しゃるま</td>
                  </tr>
                  <tr>
                    <td style={S.label}>氏　　名</td>
                    <td style={{ ...S.value, fontSize: '16px', fontWeight: 700 }} colSpan={3}>
                      Pritam Sharma
                    </td>
                  </tr>
                  <tr>
                    <td style={S.label}>住　　所</td>
                    <td style={S.value} colSpan={3}>{profile.location}, India</td>
                  </tr>
                  <tr>
                    <td style={S.label}>電話番号</td>
                    <td style={S.value}>{profile.phone}</td>
                    <td style={S.label}>E-mail</td>
                    <td style={S.value}>{profile.email}</td>
                  </tr>
                </tbody>
              </table>
            </td>
            {/* Right: photo */}
            <td style={{ ...S.td, width: '35%', textAlign: 'center', verticalAlign: 'top' }}>
              <div style={S.photo}>
                <p style={{ fontSize: '9px', color: '#999', lineHeight: 1.4 }}>証明写真<br />3cm × 4cm</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 学歴・職歴 */}
      <table style={S.mainTable}>
        <tbody>
          <tr><td colSpan={3} style={S.sectionHeader}>学歴</td></tr>
          {profile.education.map(ed => (
            <tr key={ed.institution}>
              <td style={S.year}>{ed.period.split('–')[0].trim()}年</td>
              <td style={S.month}>4月</td>
              <td style={S.entry}>{ed.institution}　{ed.degree}　入学 / 卒業 (GPA: {ed.grade})</td>
            </tr>
          ))}
          <tr style={{ height: '8px' }}><td colSpan={3} /></tr>

          <tr><td colSpan={3} style={S.sectionHeader}>職歴</td></tr>
          {profile.experience.map(ex => (
            <tr key={ex.company}>
              <td style={S.year}>{ex.period.split('–')[0].replace(/[^0-9]/g, '').slice(0, 4)}年</td>
              <td style={S.month}>{ex.period.includes('Jan') ? '1' : ex.period.includes('Jun') ? '6' : '4'}月</td>
              <td style={S.entry}>{ex.company}　{ex.role}</td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} style={{ ...S.entry, textAlign: 'right', paddingRight: '8px', paddingTop: '6px' }}>以上</td>
          </tr>
        </tbody>
      </table>

      {/* 免許・資格 */}
      <table style={S.mainTable}>
        <tbody>
          <tr><td colSpan={3} style={S.sectionHeader}>免許・資格</td></tr>
          {profile.certifications.map(c => (
            <tr key={c}>
              <td style={S.year}>2022年</td>
              <td style={S.month}>—</td>
              <td style={S.entry}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 志望動機・自己PR */}
      <table style={S.mainTable}>
        <tbody>
          <tr>
            <td style={S.sectionHeader}>志望の動機・自己PR</td>
          </tr>
          <tr>
            <td style={{ ...S.entry, height: '80px', verticalAlign: 'top', padding: '8px' }}>
              {profile.summary}
            </td>
          </tr>
        </tbody>
      </table>

      {/* スキル */}
      <table style={S.mainTable}>
        <tbody>
          <tr><td style={S.sectionHeader}>技術スキル</td></tr>
          <tr>
            <td style={{ ...S.entry, padding: '8px' }}>
              {profile.skills.map(sk => (
                <p key={sk.category} style={{ margin: '2px 0', fontSize: '10px' }}>
                  <strong>{sk.category}：</strong>{sk.items.join('　/　')}
                </p>
              ))}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const border = '1px solid #333';

const S: Record<string, React.CSSProperties> = {
  page:          { fontFamily: '"MS Mincho", "Hiragino Mincho Pro", "Yu Mincho", serif', fontSize: '10px', color: '#111', background: '#fff', padding: '24px', maxWidth: '790px', margin: '0 auto', lineHeight: 1.6 },
  title:         { textAlign: 'center', fontSize: '20px', fontWeight: 700, letterSpacing: '16px', marginBottom: '4px' },
  date:          { textAlign: 'right', fontSize: '10px', marginBottom: '8px', color: '#444' },
  topTable:      { width: '100%', borderCollapse: 'collapse', marginBottom: '8px' },
  mainTable:     { width: '100%', borderCollapse: 'collapse', marginBottom: '6px' },
  td:            { border, padding: '6px 8px' },
  label:         { border, background: '#f5f5f5', padding: '5px 8px', fontWeight: 600, whiteSpace: 'nowrap', fontSize: '9px', minWidth: '50px' },
  value:         { border, padding: '5px 8px' },
  sectionHeader: { border, background: '#e8e8e8', fontWeight: 700, textAlign: 'center', padding: '4px', fontSize: '11px' },
  year:          { border, width: '50px', textAlign: 'center', padding: '4px' },
  month:         { border, width: '30px', textAlign: 'center', padding: '4px' },
  entry:         { border, padding: '4px 8px' },
  photo:         { width: '90px', height: '120px', border, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', background: '#f9f9f9' },
};
