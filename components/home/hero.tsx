'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { profile, socials } from '@/config/site';
import { PenArrow } from '@/components/pen-arrow';
import { SocialIcon } from '@/components/social-icon';
import { Stagger, StaggerItem } from '@/components/stagger';
import { CodeLottie } from '@/components/home/code-lottie';

export function Hero() {
  const t = useTranslations('hero');
  const phrase = t.raw('phrase') as string[];

  return (
    <section className="wrap" style={{ paddingTop: 48, paddingBottom: 64 }}>
      <Stagger>
        {/* Masthead: nome + role · location em uma linha + divider */}
        <StaggerItem>
          <div
            style={{
              position: 'relative',
              paddingBlock: 28,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <span
              className="label"
              style={{
                color: 'var(--ink)',
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {profile.name}
            </span>
            <span className="label" style={{ color: 'var(--ink-2)', opacity: 0.7, fontSize: 13 }}>
              {t('roleLine')}
            </span>
            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: 1,
                background: 'var(--line-strong)',
              }}
            />
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="stack"
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
              gap: 48,
              alignItems: 'center',
              paddingTop: 40,
            }}
          >
            <h1
              className="display hero-headline"
              style={{ fontSize: 'clamp(40px, 8vw, 128px)' }}
            >
              <span style={{ color: 'var(--ink)' }}>{phrase[0]}</span>
              <span className="text-gradient">{phrase[1]}</span>
              <span style={{ color: 'var(--ink)' }}>
                {phrase[2]} {phrase[3]}
              </span>
            </h1>
            <div
              className="lottie-hide-mobile"
              style={{
                transform: 'translateY(-4%)',
              }}
            >
              <CodeLottie />
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div
            className="stack"
            style={{
              marginTop: 48,
              alignItems: 'end',
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 2.4fr) minmax(0, 1fr)',
              gap: 64,
            }}
          >
            <p
              style={{
                color: 'var(--ink-2)',
                fontSize: 'clamp(18px, 1.6vw, 22px)',
                lineHeight: 1.55,
                maxWidth: 720,
              }}
            >
              {t('intro')}
            </p>
            <div
              className="socials-mobile"
              style={{
                display: 'flex',
                gap: 10,
                justifyContent: 'flex-end',
                flexWrap: 'nowrap',
                whiteSpace: 'nowrap',
              }}
            >
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost hover-lift"
                  style={{ padding: '7px 14px', fontSize: 11, gap: 8, whiteSpace: 'nowrap' }}
                >
                  <span style={{ display: 'inline-flex' }}>
                    <SocialIcon icon={s.icon} size={15} />
                  </span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <Link
            href="/projects"
            className="btn btn-primary hover-lift"
            style={{ marginTop: 48 }}
          >
            {t('cta')}
            <PenArrow />
          </Link>
        </StaggerItem>
      </Stagger>
    </section>
  );
}