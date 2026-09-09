'use client';

import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { ThemeToggle } from './theme-toggle';
import { LogoMark } from '@/components/logo-mark';

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === 'pt' ? 'en' : 'pt';

  const switchLocale = () => {
    router.replace(pathname, { locale: otherLocale });
  };

  const close = () => setOpen(false);

  const nav = [
    { href: '/#work', label: t('nav.work') },
    { href: '/#about', label: t('nav.about') },
    { href: '/#contact', label: t('nav.contact') },
  ];

  return (
    <header
      className="sticky top-0 z-50"
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--line)',
      }}
    >
      <div className="wrap flex items-center justify-between" style={{ height: 64 }}>
        <Link
          href="/"
          onClick={close}
          style={{ display: 'inline-flex', alignItems: 'center' }}
          aria-label={t('home')}
        >
          <LogoMark size={36} />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href as never}
              className="label"
              style={{ color: 'var(--ink-2)' }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            type="button"
            onClick={switchLocale}
            className="btn"
            style={{ padding: '7px 14px' }}
            aria-label="Switch language"
          >
            {otherLocale.toUpperCase()}
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="md:hidden flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              border: '1px solid var(--line-strong)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--ink)',
            }}
            aria-label="Menu"
            aria-expanded={open}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
              {open ? (
                <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <>
                  <line x1="2" y1="5" x2="14" y2="5" stroke="currentColor" strokeWidth="1.5" />
                  <line x1="2" y1="11" x2="14" y2="11" stroke="currentColor" strokeWidth="1.5" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden flex flex-col justify-center"
          style={{ background: 'var(--bg)', color: 'var(--ink)' }}
        >
          <nav className="flex flex-col gap-6 wrap">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href as never}
                onClick={close}
                className="display"
                style={{
                  fontSize: 'clamp(40px, 12vw, 72px)',
                  textTransform: 'uppercase',
                  color: 'var(--ink)',
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}