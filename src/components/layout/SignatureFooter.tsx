'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';
import { Reveal } from '../motion/Reveal';

export function SignatureFooter() {
  const [clock, setClock] = useState('––:––:––'); const [year, setYear] = useState('');
  useEffect(() => { const update = () => { const now = new Date(); setClock(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Karachi', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(now)); setYear(new Intl.DateTimeFormat('en', { timeZone: 'Asia/Karachi', year: 'numeric' }).format(now)); }; update(); const timer = setInterval(update, 1000); return () => clearInterval(timer); }, []);
  return <footer className="signature-footer container"><Reveal><div className="footer-main"><Link href="/" className="brand" aria-label="Aliyaan Ahmed home"><span className="monogram">AA<span>.</span></span></Link><div className="karachi-clock"><span className="status-dot" /><span>Karachi, PK <time>{clock}</time></span></div><a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn <ArrowUpRight size={15} /></a><Link href="/#work">Work</Link><Link href="/#contact">Contact</Link></div><div className="footer-bottom"><span>© {year} Syed Aliyaan Ahmed</span><a href="#top">BACK TO TOP ↑</a></div></Reveal></footer>;
}
