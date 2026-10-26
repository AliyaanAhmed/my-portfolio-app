'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { navigation, profile } from '@/content/profile';

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState('home');
  const [theme, setTheme] = useState('light');
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 30 });

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setCompact(window.scrollY > 70);
      const marker = window.innerHeight * 0.3;
      const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-section]'));
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8;
      const current = atBottom ? sections.at(-1) : sections.find(section => { const box = section.getBoundingClientRect(); return box.top <= marker && box.bottom > marker; });
      setActive(current?.dataset.navSection ?? (pathname.startsWith('/work/') ? 'work' : 'home'));
      setTheme(current?.dataset.headerTheme ?? 'light');
    };
    const onScroll = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(update); };
    update(); window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', onScroll);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; panel.current?.querySelector<HTMLElement>('a')?.focus();
    const close = () => { setOpen(false); toggle.current?.focus(); };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
      if (event.key === 'Tab') {
        const elements = [toggle.current, ...Array.from(panel.current?.querySelectorAll<HTMLElement>('a') ?? [])].filter(Boolean) as HTMLElement[];
        const first = elements[0]; const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    const media = window.matchMedia('(min-width: 900px)'); const resize = () => { if (media.matches) close(); };
    media.addEventListener('change', resize); document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = old; document.removeEventListener('keydown', onKey); media.removeEventListener('change', resize); };
  }, [open]);

  return <header className={`site-header ${compact ? 'compact' : ''} ${open ? 'menu-is-open' : ''}`} data-theme={theme} data-active-section={active}>
    <div className="header-inner">
      <Link className="brand" href="/" aria-label="Aliyaan Ahmed home"><span className="brand-mark" aria-hidden="true">AA<span>.</span></span><span>Aliyaan Ahmed</span></Link>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(([label, id]) => <Link key={id} href={`/#${id}`} aria-current={active === id ? 'location' : undefined}>{active === id && <motion.span className="nav-active-pill" layoutId="active-section" transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }} />}<span>{label}</span></Link>)}</nav>
      <a className="header-link" href={profile.links.linkedinMessage} target="_blank" rel="noopener noreferrer">Let’s talk <ArrowUpRight size={16} /></a>
      <button ref={toggle} className="menu-toggle" aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}><span className="menu-toggle-label">{open ? 'Close' : 'Menu'}</span><span className="menu-toggle-lines" aria-hidden="true"><i /><i /></span></button>
      <motion.div className="header-progress" style={{ scaleX: reduced ? scrollYProgress : progress }} aria-hidden="true" />
    </div>
    {open && <><button className="mobile-nav-backdrop" tabIndex={-1} aria-label="Close navigation" onClick={() => { setOpen(false); toggle.current?.focus(); }} /><div id="mobile-navigation" ref={panel} className="mobile-navigation"><nav aria-label="Mobile navigation">{navigation.map(([label, id]) => <Link key={id} href={`/#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => { setOpen(false); requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true })); }}><span>{label}</span>{active === id ? <span className="mobile-nav-current">You’re here</span> : <ArrowRight size={16} aria-hidden="true" />}</Link>)}</nav><a className="mobile-nav-contact" href={profile.links.linkedinMessage} target="_blank" rel="noopener noreferrer">Let’s talk on LinkedIn <ArrowUpRight size={16} /></a></div></>}
  </header>;
}
