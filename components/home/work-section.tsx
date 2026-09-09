import { getTranslations } from 'next-intl/server';
import { CASES } from '@/data/cases';
import { Reveal } from '@/components/reveal';
import { PenArrow, SectionTopic } from '@/components/pen-arrow';
import { Link } from '@/i18n/navigation';

export async function WorkSection({ locale }: { locale: string }) {
  const t = await getTranslations('work');
  const l = locale as 'pt' | 'en';

  return (
    <section id="work" className="wrap" style={{ paddingBlock: 64 }}>
      <SectionTopic label={t('topic')} />
      <h2 className="display" style={{ fontSize: 'clamp(34px, 5vw, 72px)' }}>
        {t('title').split('\n').map((line, i) => (
          <span key={i} style={{ display: 'block' }}>
            {line}
          </span>
        ))}
      </h2>
      <p style={{ color: 'var(--ink-2)', marginTop: 16, maxWidth: 520 }}>
        {t('note')}
      </p>

      <div className="work-list" style={{ marginTop: 48 }}>
        {CASES.map((c, i) => (
          <Reveal key={c.slug} as="div" variant="blur">
            <Link
              href={`/projects/${c.slug}`}
              className="card group hover-lift"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                gap: 32,
                padding: 28,
                marginBottom: 20,
                alignItems: 'center',
                color: 'var(--ink)',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'radial-gradient(500px at right center, var(--accent-glow), transparent 60%)',
                  opacity: 0,
                  transition: 'opacity var(--t-med)',
                }}
                className="group-hover:opacity-100"
              />
              <div style={{ position: 'relative' }}>
                <div
                  className="label"
                  style={{
                    display: 'flex',
                    gap: 14,
                    color: 'var(--ink-3)',
                    marginBottom: 14,
                  }}
                >
                  <span style={{ color: 'var(--accent)' }}>0{i + 1}</span>
                  <span>{c.kind}</span>
                  <span>{c.year}</span>
                </div>
                <h3
                  className="display"
                  style={{ fontSize: 'clamp(22px, 3vw, 40px)' }}
                >
                  {c.headline[l]}
                </h3>
                <p
                  style={{
                    color: 'var(--ink-2)',
                    marginTop: 12,
                    maxWidth: 640,
                    fontSize: 15,
                    transition: 'color var(--t-fast)',
                  }}
                >
                  {c.summary[l]}
                </p>
                <div
                  className="label"
                  style={{ color: 'var(--ink-3)', marginTop: 16 }}
                >
                  {c.tech.join(' · ')}
                </div>
              </div>
              <span
                className="pen-arrow group-hover:translate-x-2"
                style={{
                  color: 'var(--accent)',
                  width: 28,
                  height: 28,
                  position: 'relative',
                  transition: 'transform var(--t-fast)',
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="100%"
                  height="100%"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <div style={{ paddingBlock: 24 }}>
        <a
          href="https://github.com/mvnulman"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost hover-lift"
          style={{ color: 'var(--ink)' }}
        >
          {t('seeMore')}
          <PenArrow />
        </a>
      </div>
    </section>
  );
}