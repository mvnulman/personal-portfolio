'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'motion/react';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter, Link } from '@/i18n/navigation';
import { ThemeToggle } from './theme-toggle';
import { LogoMark } from '@/components/logo-mark';

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const t = useTranslations('header');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const otherLocale = locale === 'pt' ? 'en' : 'pt';

  const switchLocale = () => {
    router.replace(pathname, { locale: otherLocale, scroll: false });
    setTimeout(() => window.scrollTo(0, 0), 300);
  };

  const close = () => setOpen(false);

  // Bloqueia scroll do body e fecha em desktop quando o menu está aberto
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener('resize', onResize);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

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
              className="label nav-link"
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
            {otherLocale === 'pt' ? 'PT-BR' : 'EN'}
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

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="dialog"
                aria-modal="true"
                className="md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 100,
                  background: 'var(--bg)',
                  color: 'var(--ink)',
                  padding: '88px var(--pad, 24px) 40px',
                  overflowY: 'auto',
                }}
              >
                <motion.button
                  type="button"
                  onClick={close}
                  aria-label="Fechar menu"
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25, ease: EASE, delay: 0.08 }}
                  style={{
                    position: 'absolute',
                    top: 20,
                    right: 24,
                    width: 40,
                    height: 40,
                    border: '1px solid var(--line-strong)',
                    borderRadius: 'var(--radius-sm)',
                    color: 'var(--ink)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden>
                    <line x1="2" y1="2" x2="14" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="14" y1="2" x2="2" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </motion.button>
                <nav
                  className="flex flex-col justify-center"
                  style={{ minHeight: 'calc(100vh - 128px)', gap: 6 }}
                >
                  {nav.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.4, ease: EASE, delay: 0.05 + i * 0.07 }}
                    >
                      <NavItem item={item} onNavigate={close} />
                    </motion.div>
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}

function NavItem({
  item,
  onNavigate,
}: {
  item: { href: string; label: string };
  onNavigate: () => void;
}) {
  return (
    <motion.div
      className="display"
      style={{
        fontSize: 'clamp(34px, 8vw, 56px)',
        lineHeight: 1.15,
        textTransform: 'uppercase',
        paddingBlock: 10,
      }}
    >
      <motion.div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 18,
        }}
        variants={{
          initial: { x: 0 },
          hover: { x: 12 },
        }}
        initial="initial"
        whileHover="hover"
        transition={{ duration: 0.25, ease: EASE }}
      >
        <motion.span
          variants={{
            initial: { width: 0, opacity: 0 },
            hover: { width: 42, opacity: 1 },
          }}
          transition={{ duration: 0.25, ease: EASE }}
          style={{
            overflow: 'hidden',
            display: 'inline-flex',
            alignItems: 'center',
            flexShrink: 0,
            height: '0.5em',
            color: 'var(--accent)',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="100%"
            height="100%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m13 6 6 6-6 6" />
          </svg>
        </motion.span>
        <Link
          href={item.href as never}
          onClick={onNavigate}
          className="display"
          style={{
            color: 'var(--ink)',
            transition: 'color var(--t-fast)',
          }}
        >
          <motion.span
            variants={{
              initial: { color: 'var(--ink)' },
              hover: { color: 'var(--accent)' },
            }}
            transition={{ duration: 0.2 }}
          >
            {item.label}
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  );
}