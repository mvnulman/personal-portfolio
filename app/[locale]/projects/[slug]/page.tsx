import { setRequestLocale, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { CASES, getCase } from '@/data/cases';
import { Reveal } from '@/components/reveal';
import { PenArrow, SectionTopic } from '@/components/pen-arrow';
import { Link } from '@/i18n/navigation';
import type { Metadata } from 'next';

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return ['pt', 'en'].flatMap((locale) =>
    CASES.map((c) => ({ locale, slug: c.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const c = getCase(slug);
  if (!c) return {};
  const title = `${c.title[locale as 'pt' | 'en']} · Marcos Vinicius Nulman`;
  return { title };
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('case');
  const l = locale as 'pt' | 'en';

  const c = getCase(slug);
  if (!c) notFound();

  const idx = CASES.findIndex((x) => x.slug === slug);
  const next = CASES[(idx + 1) % CASES.length];

  return (
    <div style={{ paddingTop: 64 }}>
      {/* Hero */}
      <section className="wrap">
        <Link href="/projects" className="label" style={{ color: 'var(--ink-2)' }}>
          ← {t('back')}
        </Link>

        {c.cover && (
          <Reveal variant="blur">
            <div
              className="card hover-lift"
              style={{ overflow: 'hidden', marginTop: 28 }}
            >
              <Image
                src={c.cover}
                alt={c.title[l]}
                width={1440}
                height={900}
                style={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                  display: 'block',
                }}
                priority
              />
            </div>
          </Reveal>
        )}

        <div
          className="stack"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
            gap: 32,
            marginTop: 40,
            alignItems: 'end',
          }}
        >
          <div>
            <div className="label" style={{ display: 'flex', gap: 16, color: 'var(--ink-3)' }}>
              <span style={{ color: 'var(--accent)' }}>{c.kind}</span>
              <span>{c.year}</span>
            </div>
            <h1 className="display" style={{ fontSize: 'clamp(44px, 8vw, 96px)', marginTop: 16 }}>
              <span style={{ color: 'var(--ink)' }}>{c.title[l]}</span>
            </h1>
            <p className="display" style={{ fontSize: 'clamp(20px, 2.6vw, 32px)', marginTop: 20, color: 'var(--ink-2)' }}>
              {c.headline[l]}
            </p>
          </div>

          <div className="case-actions" style={{ gap: 12, justifySelf: 'end' }}>
            {c.liveUrl && (
              <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                {t('demo')}
                <PenArrow className="case-arrow" />
              </a>
            )}
            <a href={c.githubUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              {t('repo')}
              <PenArrow className="case-arrow" />
            </a>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="wrap" style={{ marginTop: 72 }}>
        <div className="card" style={{ padding: 40 }}>
          <SectionTopic label={t('overview')} />
          <p style={{ color: 'var(--ink)', fontSize: 20, lineHeight: 1.5 }}>
            {c.summary[l]}
          </p>
        </div>
      </section>

      {/* Problem / Solution */}
      <section
        className="wrap stack"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 32,
          marginTop: 32,
        }}
      >
        <Reveal>
          <div style={{ borderLeft: '2px solid var(--line-strong)', paddingLeft: 24 }}>
            <SectionTopic label={t('problem')} />
            <p style={{ color: 'var(--ink-2)', fontSize: 16 }}>{c.problem[l]}</p>
          </div>
        </Reveal>
        <Reveal>
          <div style={{ borderLeft: '2px solid var(--accent)', paddingLeft: 24 }}>
            <SectionTopic label={t('solution')} />
            <p style={{ color: 'var(--ink-2)', fontSize: 16 }}>{c.solution[l]}</p>
          </div>
        </Reveal>
      </section>

      {/* Features */}
      {c.features.length > 0 && (
        <section className="wrap" style={{ marginTop: 72 }}>
          <SectionTopic label={t('features')} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(min(260px, 100%), 1fr))',
              gap: 16,
            }}
          >
            {c.features.map((f, i) => (
              <Reveal key={i} variant="blur" delay={i * 60}>
                <div className="card hover-lift" style={{ padding: 24, height: '100%' }}>
                  <div className="label" style={{ color: 'var(--accent)', marginBottom: 12 }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h4 className="display" style={{ fontSize: 22 }}>
                    {f.title[l]}
                  </h4>
                  <p style={{ color: 'var(--ink-2)', marginTop: 10, fontSize: 15 }}>
                    {f.description[l]}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Stack */}
      <section className="wrap" style={{ marginTop: 72 }}>
        <SectionTopic label={t('stack')} color="var(--warm)" />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {c.tech.map((tech) => (
            <span
              key={tech}
              className="label"
              style={{
                border: '1px solid var(--line-strong)',
                padding: '8px 14px',
                borderRadius: 999,
                color: 'var(--ink-2)',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </section>

      {/* Next project */}
      <section
        className="wrap"
        style={{ marginTop: 72, borderTop: '1px solid var(--line)', paddingTop: 40 }}
      >
        <SectionTopic label={t('next')} />
        <Link
          href={`/projects/${next.slug}`}
          style={{ display: 'block', marginTop: 16, color: 'var(--ink)' }}
        >
          <span className="text-gradient display" style={{ fontSize: 'clamp(32px, 6vw, 64px)' }}>
            {next.title[l]}
          </span>
        </Link>
      </section>

      <div style={{ height: 48 }} />
    </div>
  );
}