import { ImageResponse } from 'next/og';
import { projects } from '@/content/projects';

export const alt = 'Aliyaan Ahmed — portfolio concept study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function ProjectImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(item => item.slug === slug);
  return new ImageResponse(<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', height: '100%', padding: 68, background: '#142c27', color: '#fafaf7', fontFamily: 'sans-serif' }}><div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 23 }}><span>Aliyaan Ahmed</span><span style={{ color: '#b3cfb0' }}>PORTFOLIO CONCEPT</span></div><div style={{ display: 'flex', fontSize: 66, lineHeight: 1.15, letterSpacing: -3, maxWidth: 1020 }}>{project?.title ?? 'Enterprise Applications & Workflows'}</div><div style={{ display: 'flex', paddingTop: 24, borderTop: '1px solid #52705b', fontSize: 22, color: '#c7d9c4' }}>{project?.tags.join(' / ') ?? 'Power Platform / React / AI'}</div></div>, size);
}
