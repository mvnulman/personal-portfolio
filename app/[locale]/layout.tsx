import { Archivo, IBM_Plex_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import '../globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BackToTop } from '@/components/back-to-top';
import type { Metadata } from 'next';

const archivo = Archivo({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  const env = process.env.NEXT_PUBLIC_SITE_URL || 'https://mvn-portfolio.vercel.app';
  return {
    metadataBase: new URL(env),
    title: {
      default: t('title'),
      template: `%s · Marcos Vinicius Nulman`,
    },
    description: t('description'),
    icons: {
      icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    },
    alternates: {
      languages: {
        pt: '/',
        en: '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      siteName: 'Marcos Vinicius Nulman',
      images: ['/images/covers/feed-newsapi.jpg'],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable}`}
    >
      <body>
        <ThemeProvider>
          <NextIntlClientProvider>
            <Header />
            <div>{children}</div>
            <Footer />
            <BackToTop />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}