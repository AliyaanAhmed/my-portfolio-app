'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy } from 'lucide-react';
import { profile } from '@/content/profile';
import { Reveal } from '@/components/motion/Reveal';
import s from './LowerSections.module.css';

const topics = [{ label: 'An application', brief: 'Hi Aliyaan, I’d like to discuss an application that makes our team’s work easier.' }, { label: 'An automation', brief: 'Hi Aliyaan, I’d like to discuss automating a repetitive workflow for our team.' }, { label: 'An AI workflow', brief: 'Hi Aliyaan, I’d like to explore useful AI assistance in our team’s workflow.' }];

export function ContactPanel() {
  const [topic, setTopic] = useState(0); const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const copy = async () => { try { await navigator.clipboard.writeText(topics[topic].brief); setCopyState('copied'); } catch { setCopyState('error'); } };
  return <Reveal><div className={s.contactPanel}><div className={s.contactIntro}><span className={s.smallLabel}>A GOOD PLACE TO START</span><h3>What are you<br />working on?</h3><p>A short conversation can make the next step clearer.</p><a href={profile.links.linkedinMessage} target="_blank" rel="noopener noreferrer" className={s.linkedinAction}>Continue on LinkedIn <ArrowUpRight size={19} /></a>{profile.links.email && <a className={s.optionalContact} href={`mailto:${profile.links.email}`}>Or send an email <ArrowUpRight size={14} /></a>}</div><div className={s.briefBuilder}><span className={s.smallLabel}>PICK A STARTING POINT</span><div role="group" aria-label="Conversation topic" className={s.topicChoices}>{topics.map((item, i) => <button key={item.label} aria-pressed={topic === i} onClick={() => { setTopic(i); setCopyState('idle'); }}>{item.label}</button>)}</div><div className={s.briefText} aria-live="polite">{topics[topic].brief}</div><div className={s.copyRow}><span>Make it yours. Start the conversation.</span><button onClick={copy}>{copyState === 'copied' ? <Check size={16} /> : <Copy size={16} />}{copyState === 'copied' ? 'Copied' : 'Copy message'}</button></div>{copyState === 'error' && <p role="status" className={s.copyError}>Couldn’t access the clipboard. You can select and copy the message above.</p>}</div></div></Reveal>;
}
