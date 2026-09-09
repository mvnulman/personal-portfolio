import type { MetadataRoute } from 'next';
import { CASES } from '@/data/cases';
import { routing } from '@/i18n/routing';

const BASE = 'https://mvn-portfolio.vercel.app';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const env = process.env.NEXT_PUBLIC_SITE_URL || BASE;
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
    entries.push({ url: `${env}${prefix}`, changeFrequency: 'monthly', priority: 1 });
    entries.push({ url: `${env}${prefix}/projects`, changeFrequency: 'monthly', priority: 0.8 });
    for (const c of CASES) {
      entries.push({
        url: `${env}${prefix}/projects/${c.slug}`,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    }
  }

  return entries;
}