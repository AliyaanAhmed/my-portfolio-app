import type { Metadata } from 'next';
import { Inter, Manrope, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SignatureFooter } from '@/components/layout/SignatureFooter';
import { profile, siteUrl } from '@/content/profile';
import { seoDescription, seoTitle } from '@/lib/seo';
import './globals.css';
import './landing.css';

const sans = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-display', display: 'swap' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: { default: seoTitle, template: `%s | ${profile.displayName}` },
  description: seoDescription,
  applicationName: `${profile.displayName} Portfolio`,
  authors: [{ name: profile.name, ...(siteUrl ? { url: siteUrl } : {}) }],
  creator: profile.name,
  category: 'technology',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><noscript><style>{`.reveal, #home [style] { opacity: 1 !important; transform: none !important; }`}</style></noscript><SiteHeader />{children}<SignatureFooter /></body></html>;
}
