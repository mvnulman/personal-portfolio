import { getTranslations } from 'next-intl/server';
import { profile } from '@/config/site';

export async function Footer() {
  const t = await getTranslations('footer');
  return (
    <footer
      style={{
        borderTop: '1px solid var(--line)',
        paddingBlock: 32,
        marginTop: 32,
      }}
    >
      <div className="wrap flex justify-between flex-wrap" style={{ gap: 16 }}>
        <span className="label" style={{ color: 'var(--ink-3)' }}>
          © {new Date().getFullYear()} {profile.name}
        </span>
        <span className="label" style={{ color: 'var(--ink-3)' }}>
          {t('madeWith')}
        </span>
      </div>
    </footer>
  );
}