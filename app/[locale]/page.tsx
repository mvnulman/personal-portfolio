import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/hero';
import { TechMarquee } from '@/components/home/tech-marquee';
import { WorkSection } from '@/components/home/work-section';
import { AboutSection } from '@/components/home/about-section';
import { ContactSection } from '@/components/home/contact-section';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TechMarquee />
      <WorkSection locale={locale} />
      <AboutSection locale={locale} />
      <ContactSection />
    </>
  );
}