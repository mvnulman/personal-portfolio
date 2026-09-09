import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const env = process.env.NEXT_PUBLIC_SITE_URL || 'https://mvn-portfolio.vercel.app';
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${env}/sitemap.xml`,
  };
}