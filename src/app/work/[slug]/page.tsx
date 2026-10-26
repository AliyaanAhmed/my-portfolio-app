import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout';
import { StructuredData } from '@/components/StructuredData';
import { profile, siteUrl } from '@/content/profile';
import { pageMetadata, personId } from '@/lib/seo';

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  return pageMetadata({ title: `${project.title} — Concept`, description: `Portfolio concept: ${project.description}`, path: `/work/${slug}`, image: `/work/${slug}/opengraph-image` });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  if (!project) notFound();
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: `${project.title} — Portfolio Concept`,
    description: `Illustrative concept using fictional organizations and synthetic data. ${project.description}`,
    genre: 'Portfolio concept demonstration',
    inLanguage: 'en',
    author: { '@type': 'Person', ...(personId ? { '@id': personId } : {}), name: profile.name },
    about: project.tags.map(name => ({ '@type': 'Thing', name })),
    ...(siteUrl ? { url: `${siteUrl}/work/${slug}` } : {}),
  };
  return <><StructuredData data={structuredData} />{siteUrl && <StructuredData data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Portfolio', item: `${siteUrl}/` }, { '@type': 'ListItem', position: 2, name: project.title, item: `${siteUrl}/work/${slug}` }] }} />}<CaseStudyLayout project={project} /></>;
}
