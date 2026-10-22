import type { MetadataRoute } from 'next';
import { siteUrl } from '@/content/profile';
import { projects } from '@/content/projects';
export default function sitemap():MetadataRoute.Sitemap{return siteUrl?[{url:siteUrl},...projects.map(p=>({url:`${siteUrl}/work/${p.slug}`}))]:[];}
