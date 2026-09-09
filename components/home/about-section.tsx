import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { experiences, skills } from '@/data/profile';
import { profile } from '@/config/site';
import { Reveal } from '@/components/reveal';
import { SectionTopic } from '@/components/pen-arrow';

export async function AboutSection({ locale }: { locale: string }) {
  const t = await getTranslations('about');
  const l = locale as 'pt' | 'en';

  return (
    <section
      id="about"
      className="wrap"
      style={{ paddingBlock: 96, paddingBottom: 32, borderTop: '1px solid var(--line)' }}
    >
      <div
        className="stack"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
          gap: 64,
          alignItems: 'start',
        }}
      >
        <div>
          <SectionTopic label={t('title')} />
          <h2 className="display" style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}>
            {t('heading')}
          </h2>
          <Reveal variant="blur" className="mt-8">
            <div
              style={{
                display: 'flex',
                gap: 40,
                alignItems: 'center',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              <div
                className="hover-lift"
                style={{
                  flexShrink: 0,
                  width: 220,
                  height: 264,
                  borderRadius: 28,
                  overflow: 'hidden',
                  border: '1px solid var(--line-strong)',
                  boxShadow: '0 24px 60px var(--accent-glow)',
                  background: 'var(--surface)',
                }}
              >
                <Image
                  src={profile.avatar}
                  alt={profile.name}
                  width={220}
                  height={264}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ flex: 1, minWidth: 260 }}>
                <p style={{ color: 'var(--ink-2)', fontSize: 18 }}>{t('p1')}</p>
                <p style={{ color: 'var(--ink-3)', marginTop: 14, fontSize: 16 }}>
                  {t('p2')}
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div>
          <SectionTopic label={t('skills')} color="var(--warm)" />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skills.map((s) => (
              <span key={s.name} className="label tech-badge">
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginTop: 64, borderTop: '1px solid var(--line)', paddingTop: 40 }}>
        <SectionTopic label={t('experience')} color="var(--warm)" />
        {experiences.map((e) => (
          <Reveal key={e.company} variant="up">
            <div
              className="stack"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
                gap: 32,
                padding: '24px 0',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div>
                <div className="label" style={{ color: 'var(--ink-3)', display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span>
                    {e.start} {e.end ? `— ${e.end}` : '— hoje'}
                  </span>
                  {e.level && (
                    <span
                      style={{
                        border: '1px solid var(--line-strong)',
                        padding: '2px 8px',
                        borderRadius: 999,
                        color: 'var(--accent)',
                      }}
                    >
                      {e.level}
                    </span>
                  )}
                </div>
                <h4 className="display" style={{ fontSize: 22, marginTop: 10 }}>
                  {e.role[l]}
                </h4>
                <a href={e.companyUrl} target="_blank" rel="noopener noreferrer">
                  <span style={{ color: 'var(--accent)' }}>{e.company}</span>
                </a>
                <div className="label" style={{ color: 'var(--ink-3)', marginTop: 8 }}>
                  {e.location[l]}
                </div>
              </div>
              <div>
                <p style={{ color: 'var(--ink-2)' }}>{e.summary[l]}</p>
                {e.bullets.length > 0 && (
                  <ul style={{ marginTop: 12, paddingLeft: 20 }}>
                    {e.bullets.map((b, i) => (
                      <li
                        key={i}
                        style={{
                          color: 'var(--ink-3)',
                          listStyle: 'disc',
                          marginBottom: 6,
                          fontSize: 14,
                        }}
                      >
                        {b[l]}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="label" style={{ color: 'var(--ink-3)', marginTop: 12 }}>
                  {e.tech.join(' · ')}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}