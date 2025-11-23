import { Inter, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { Header } from './components/header';
import { ReactNode } from 'react';
import { ContactForm } from './components/contact-form';
import { Footer } from './components/footer';
import { Toaster } from './components/toaster';
import { BackToTop } from './components/back-to-top';

export const metadata = {
  title: {
    default: 'Home',
    template: '%s | MV Dev',
  },
  icons: [
    {
      url: `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF4858" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>')}`,
    },
  ],
};

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const plexMono = IBM_Plex_Mono({
  variable: '--font-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${plexMono.variable}`}>
      <body>
        <Toaster />
        <BackToTop />

        <Header />
        {children}
        <ContactForm />
        <Footer />
      </body>
    </html>
  );
}
