import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SignatureFooter } from '@/components/layout/SignatureFooter';
import { profile, siteUrl } from '@/content/profile';
import './globals.css';
const sans = Geist({ subsets:['latin'], variable:'--font-geist-sans', display:'swap' });
const mono = Geist_Mono({ subsets:['latin'], variable:'--font-geist-mono', display:'swap' });
export const metadata: Metadata = { metadataBase: siteUrl ? new URL(siteUrl) : undefined, title:{default:'Aliyaan Ahmed — Power Platform, Automation & Frontend',template:'%s | Aliyaan Ahmed'}, description:profile.bio, ...(siteUrl?{alternates:{canonical:siteUrl}}:{}), openGraph:{title:'Aliyaan Ahmed — Less manual work. More possibility.',description:profile.bio,type:'website',locale:'en_US',...(siteUrl?{url:siteUrl}:{}),images:[{url:'/opengraph-image',width:1200,height:630}]}, twitter:{card:'summary_large_image'} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { const person={ '@context':'https://schema.org','@type':'Person',name:profile.name,jobTitle:profile.positioning,sameAs:[profile.links.linkedin],address:{'@type':'PostalAddress',addressLocality:'Karachi',addressCountry:'PK'},...(siteUrl?{url:siteUrl}:{})}; return <html lang="en" className={`${sans.variable} ${mono.variable}`}><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/><SiteHeader/>{children}<SignatureFooter/></body></html>; }
