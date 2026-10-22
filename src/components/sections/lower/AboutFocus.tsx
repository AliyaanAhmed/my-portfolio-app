'use client';

import { useId, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import s from './PortraitAbout.module.css';

const focus = [
  { label: 'Apps', text: 'Clear interfaces, built around the people using them.' },
  { label: 'Workflows', text: 'Connected steps, clear ownership, and less repetitive work.' },
  { label: 'AI', text: 'Useful suggestions and document context, with people in control.' },
] as const;

export function AboutFocus() {
  const [active, setActive] = useState(0);
  const id = useId();
  return <div className={s.mobileFocus}>
    <div className={s.focusChoices} role="group" aria-label="Explore my approach">{focus.map((item, index) => <button key={item.label} aria-pressed={active === index} aria-controls={id} onClick={() => setActive(index)}>{item.label}{active === index && <ArrowRight size={13} aria-hidden="true" />}</button>)}</div>
    <p id={id} className={s.focusDescription} aria-live="polite">{focus[active].text}</p>
  </div>;
}
