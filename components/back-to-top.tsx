'use client';

import { useCallback, useEffect, useState } from 'react';

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Voltar ao topo"
      className="btn btn-ghost"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 60,
        padding: '12px',
        borderRadius: '50%',
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--ink)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition:
          'opacity var(--t-med), transform var(--t-med), box-shadow var(--t-fast)',
        boxShadow: visible ? '0 8px 24px var(--accent-glow)' : 'none',
      }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}