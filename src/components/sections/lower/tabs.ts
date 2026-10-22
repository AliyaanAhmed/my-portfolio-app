import type { KeyboardEvent } from 'react';

export function handleTabKeys(event: KeyboardEvent<HTMLElement>, index: number, count: number, select: (index: number) => void) {
  let next = index;
  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % count;
  else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + count) % count;
  else if (event.key === 'Home') next = 0;
  else if (event.key === 'End') next = count - 1;
  else return;
  event.preventDefault(); select(next);
  const list = event.currentTarget.closest('[role="tablist"]');
  list?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
}
