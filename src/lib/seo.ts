import type { Metadata } from 'next';
import { profile, siteUrl } from '@/content/profile';

export const seoTitle = 'Syed Aliyaan Ahmed | Power Platform Consultant & Software Engineer';
export const seoDescription = profile.bio;
export const personId = siteUrl ? `${siteUrl}/#person` : undefined;

export function pageMetadata({ title, description, path = '/', image = '/opengraph-image' }: { title: string; description: string; path?: string; image?: string }): Metadata {
  const url = siteUrl ? new URL(path, siteUrl).href : undefined;
  return {
    title,
    description,
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { type: 'website', siteName: `${profile.displayName} — Portfolio`, title, description, locale: 'en_US', ...(url ? { url } : {}), images: [{ url: image, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [{ url: image, alt: title }] },
  };
}

export function profileStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    ...(siteUrl ? { '@id': `${siteUrl}/#profile`, url: `${siteUrl}/` } : {}),
    name: seoTitle,
    description: seoDescription,
    mainEntity: {
      '@type': 'Person',
      ...(personId ? { '@id': personId } : {}),
      name: profile.name,
      alternateName: profile.displayName,
      jobTitle: profile.positioning,
      description: seoDescription,
      sameAs: [profile.links.linkedin],
      knowsAbout: ['Microsoft Power Platform', 'Power Apps', 'Power Pages', 'Power Automate', 'Dataverse', 'React', 'TypeScript', 'Frontend architecture', 'AI integration', 'Enterprise applications'],
      ...(siteUrl ? { url: `${siteUrl}/`, image: `${siteUrl}${profile.portrait}` } : {}),
    },
  };
}
