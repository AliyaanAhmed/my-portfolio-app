import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';

async function show(page: Page, selector: string) {
  const element = page.locator(selector).first();
  await element.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  const reveal = element.locator('xpath=ancestor-or-self::*[contains(concat(" ",normalize-space(@class)," ")," reveal ")][1]');
  if (await reveal.count()) await expect(reveal).toHaveCSS('opacity', '1');
}

test('the landing page reveals content on entry and replays on re-entry', async ({ page }) => {
  fs.mkdirSync('artifacts', { recursive: true });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const card = page.locator('.project-card').first();
  await expect(card).toHaveAttribute('data-reveal-state', 'hidden');
  await expect(card).toHaveCSS('opacity', '0');
  await show(page, '.project-card');
  await expect(card).toHaveAttribute('data-reveal-state', 'visible');
  await expect(card).toHaveCSS('opacity', '1');
  await page.screenshot({ path: 'artifacts/scroll-work-visible.png' });
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await expect(card).toHaveAttribute('data-reveal-state', 'hidden');
  await expect(card).toHaveCSS('opacity', '0');
  await show(page, '.project-card');
  await expect(card).toHaveCSS('opacity', '1');
  await show(page, '.career-list > .reveal:nth-child(2)');
  await expect(page.locator('.career-list > .reveal:nth-child(2)')).toHaveCSS('opacity', '1');
  await show(page, '.about-photo-reveal');
  await expect(page.locator('.about-photo-reveal')).toHaveCSS('opacity', '1');
});

test('responsive layouts, interaction states, routes and clean runtime', async ({ page }) => {
  test.setTimeout(150000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 }); await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Complex work.');
    await expect(page.locator('.hero-introduction > div').last()).toHaveCSS('opacity', '1');
    await expect(page.locator('.hero-line').last().locator(':scope > span')).toHaveCSS('transform', 'none');
    await page.screenshot({ path: `artifacts/hero-${width}.png` });
    for (const selector of ['#expertise', '#work', '#workflow', '#journey', '#about', '#contact']) {
      await page.locator(selector).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
      const reveals = page.locator(selector).locator('.reveal');
      for (let i = 0; i < await reveals.count(); i++) {
        const reveal = reveals.nth(i);
        const intersects = await reveal.evaluate(el => { const box = el.getBoundingClientRect(); const visibleHeight = Math.min(box.bottom, window.innerHeight - 48) - Math.max(box.top, 0); return box.top > 0 && visibleHeight > Math.max(100, box.height * 0.2); });
        if (intersects) await expect(reveal).toHaveCSS('opacity', '1');
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      await page.screenshot({ path: `artifacts/${selector.slice(1)}-${width}.png` });
    }
    await page.getByRole('button', { name: '03 Decision' }).click();
    await expect(page.getByRole('heading', { name: 'A clear next step.' })).toBeVisible();
    await page.getByRole('button', { name: '01 Request' }).click();
    await expect(page.getByRole('heading', { name: 'A request, with context.' })).toBeVisible();
    await page.getByRole('button', { name: /Power Automate & automation/ }).click();
    await expect(page.getByRole('heading', { name: 'Less chasing. More flowing.' })).toBeVisible();
    await page.getByRole('button', { name: /AI-assisted workflows/ }).click();
    await expect(page.getByRole('heading', { name: 'Intelligence, with a human in the loop.' })).toBeVisible();
    const company = page.locator('.career-company').first();
    await company.locator(':scope > summary').click(); await expect(company).toHaveAttribute('open', '');
    const role = company.locator('.career-role').filter({ hasText: 'Microsoft Power Pages Consultant & Frontend Developer' });
    await role.locator('summary').click(); await expect(role).toHaveAttribute('open', '');
    if (width < 900) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.getByRole('link', { name: '01 Work' })).toBeFocused();
      await page.keyboard.press('Shift+Tab'); await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
      await page.keyboard.press('Shift+Tab'); await expect(page.locator('#mobile-navigation').getByRole('link', { name: 'Connect on LinkedIn' })).toBeFocused();
      await page.keyboard.press('Escape'); await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
    }
    // Static layout proof under reduced motion; live entry motion is checked separately.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true });
    await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
  for (const slug of ['governance-review', 'insurance-inquiry', 'power-platform-code-apps']) {
    await page.goto(`/work/${slug}`); await expect(page.getByText('About this demonstration')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await page.getByRole('link', { name: 'Back to selected work' }).click(); await expect(page).toHaveURL(/\/#work$/);
  }
  expect(errors).toEqual([]);
  const missing = await page.goto('/work/does-not-exist'); expect(missing?.status()).toBe(404);
});

test('avatar tracking, navbar theme, touch and reduced-motion access', async ({ page, browser }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/');
  await expect(page.locator('.avatar-stage')).toHaveAttribute('data-pointer-tracking', 'enabled');
  const head = page.getByTestId('avatar-head'); await page.mouse.move(100, 400);
  await expect.poll(() => head.evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  await page.locator('#expertise').evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
  await expect(page.locator('.site-header')).toHaveAttribute('data-active-section', 'expertise');
  await expect(page.locator('.site-header')).toHaveAttribute('data-theme', 'dark');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(head).toHaveCSS('transform', 'none');
  await expect(page.locator('.project-card').first()).toHaveCSS('opacity', '1');
  await expect(page.locator('.project-card').first()).toHaveCSS('transform', 'none');
  await page.goto('/'); await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter'); await expect(page).toHaveURL(/#main-content$/);
  const request = page.getByRole('button', { name: '01 Request' }); await request.focus(); await page.keyboard.press('Enter');
  await expect(request).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.karachi-clock time')).toHaveText(/\d{2}:\d{2}:\d{2}/);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await context.newPage(); await mobile.goto('http://127.0.0.1:3100/');
  await expect(mobile.locator('.avatar-stage')).toHaveAttribute('data-pointer-tracking', 'disabled');
  await mobile.getByRole('button', { name: 'Open menu' }).tap(); await mobile.getByRole('link', { name: '02 Expertise' }).tap();
  await expect(mobile).toHaveURL(/#expertise$/);
  await mobile.getByRole('button', { name: /Power Automate & automation/ }).tap();
  await expect(mobile.getByRole('heading', { name: 'Less chasing. More flowing.' })).toBeVisible();
  await context.close();
});
