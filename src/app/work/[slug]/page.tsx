import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '@/content/projects';
import { CaseStudyLayout } from '@/components/work/CaseStudyLayout';
import { siteUrl } from '@/content/profile';
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const project=projects.find(p=>p.slug===slug);return project?{title:project.title,description:`Concept demonstration: ${project.description}`,...(siteUrl?{alternates:{canonical:`${siteUrl}/work/${slug}`}}:{}),openGraph:{title:project.title,description:project.description,images:['/opengraph-image']}}:{};}
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const project=projects.find(p=>p.slug===slug);if(!project)notFound();return <CaseStudyLayout project={project}/>;}
