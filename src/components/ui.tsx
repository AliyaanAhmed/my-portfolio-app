import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
export function SectionLabel({ index, children, light = false }: { index: string; children: React.ReactNode; light?: boolean }) { return <div className={`section-label ${light ? 'light' : ''}`}><span>{index}</span><span>{children}</span></div>; }
export function Action({ href, children, secondary = false, external = false }: { href: string; children: React.ReactNode; secondary?: boolean; external?: boolean }) { return <Link className={`button ${secondary ? 'button-secondary' : ''}`} href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}<ArrowUpRight size={17} aria-hidden="true" /></Link>; }
