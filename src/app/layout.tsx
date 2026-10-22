import type { Metadata } from 'next';
import { Inter, Manrope, Geist_Mono } from 'next/font/google';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SignatureFooter } from '@/components/layout/SignatureFooter';
import { profile, siteUrl } from '@/content/profile';
import './globals.css';
import './landing.css';
const sans = Inter({ subsets:['latin'], variable:'--font-body', display:'swap' });
const display = Manrope({ subsets:['latin'], weight:['400','500','600','700'], variable:'--font-display', display:'swap' });
const mono = Geist_Mono({ subsets:['latin'], variable:'--font-geist-mono', display:'swap' });
export const metadata: Metadata = { metadataBase: siteUrl ? new URL(siteUrl) : undefined, title:{default:'Aliyaan Ahmed — Power Platform, Automation & Frontend',template:'%s | Aliyaan Ahmed'}, description:profile.bio, ...(siteUrl?{alternates:{canonical:siteUrl}}:{}), openGraph:{title:'Aliyaan Ahmed — Complex work. Made simple.',description:profile.bio,type:'website',locale:'en_US',...(siteUrl?{url:siteUrl}:{}),images:[{url:'/opengraph-image',width:1200,height:630}]}, twitter:{card:'summary_large_image'} };
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) { const person={ '@context':'https://schema.org','@type':'Person',name:profile.name,jobTitle:profile.positioning,sameAs:[profile.links.linkedin],address:{'@type':'PostalAddress',addressLocality:'Karachi',addressCountry:'PK'},...(siteUrl?{url:siteUrl}:{})}; return <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}><body id="top"><a className="skip-link" href="#main-content">Skip to content</a><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(person).replace(/</g,'\\u003c')}}/><noscript><style>{`.reveal { opacity: 1 !important; transform: none !important; } .hero-line > span, .hero-introduction > div { opacity: 1 !important; transform: none !important; }`}</style></noscript><SiteHeader/>{children}<SignatureFooter/></body></html>; }
