import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';

async function show(page: Page, selector: string) {
  await page.locator(selector).first().evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
  const reveal = page.locator(selector).first().locator('xpath=ancestor-or-self::*[contains(concat(" ",normalize-space(@class)," ")," reveal ")][1]');
  if (await reveal.count()) await expect(reveal).toHaveCSS('opacity', '1');
}

test('project concepts have working review, inquiry, and workspace controls', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: /Governance/ }).click();
  await page.getByRole('button', { name: /Supporting evidence/ }).click();
  await expect(page.getByText('Sample request: access', { exact: false })).toBeVisible();
  await page.getByRole('button', { name: 'Approve request', exact: true }).click();
  await expect(page.getByText('Approved', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reset governance demo' }).click();
  await page.getByRole('button', { name: 'Request changes', exact: true }).click();
  await expect(page.getByText('Needs information', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /Customer journeys/ }).click();
  await page.getByRole('button', { name: /Business For the way/ }).click();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('checkbox', { name: /understand the document/ }).check();
  await page.getByRole('button', { name: 'Preview summary', exact: true }).click();
  await expect(page.getByText('Business', { exact: true })).toBeVisible();
  await expect(page.getByText('Reviewed', { exact: true })).toBeVisible();
  await expect(page.getByText('Preview only', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /Code Apps/ }).click();
  await page.getByRole('textbox', { name: 'Search sample work items' }).fill('onboarding');
  await page.getByRole('button', { name: 'Complete Prepare onboarding flow' }).click();
  await expect(page.getByText('2 / 3 complete', { exact: true })).toBeVisible();
  await page.getByLabel('Filter sample work items').selectOption('Complete');
  await expect(page.getByRole('button', { name: 'Reopen Prepare onboarding flow', exact: true })).toBeVisible();
  await page.getByRole('textbox', { name: 'Search sample work items' }).fill('no such item');
  await expect(page.getByText('No matching work items.', { exact: false })).toBeVisible();
  await page.getByRole('link', { name: 'Read the concept' }).click();
  await expect(page).toHaveURL(/work\/power-platform-code-apps$/);
  await expect(page.getByText('About this demonstration')).toBeVisible();
});

test('workflow simulation pauses for human review and records either decision', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Run workflow', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Step 3: Human review' })).toHaveAttribute('aria-pressed', 'true', { timeout: 8000 });
  await page.getByRole('button', { name: 'Approve', exact: true }).click();
  await expect(page.getByText('Approved — ready for the next action', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Reset workflow simulation' }).click();
  await expect(page.getByRole('button', { name: 'Step 1: Request' })).toHaveAttribute('aria-pressed', 'true');
  await page.getByRole('button', { name: 'Step 3: Human review' }).click();
  await page.locator('#workflow').getByRole('button', { name: 'Request changes', exact: true }).click();
  await expect(page.getByText('Needs information — returned to requester', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Step 2: AI context' }).click();
  await expect(page.getByRole('heading', { name: 'Bring the useful details forward.' })).toBeVisible();
  await page.getByRole('button', { name: 'Run workflow', exact: true }).click();
  await page.getByRole('button', { name: 'Stop', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Run workflow', exact: true })).toBeVisible();
});

test('career, portrait, education, and contact controls update real content', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('tab', { name: /MechConnect/ }).click();
  await expect(page.getByText('March 2024–July 2024', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /Next Generation Esports/ }).click();
  await expect(page.getByText('Earlier chapter · Operations', { exact: true })).toBeVisible();
  await page.locator('#journey summary').filter({ hasText: 'Head of Operations' }).click();
  await expect(page.getByText('An earlier chapter in operations and coordination, before my software development career.', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: /Datanox/ }).click();
  await expect(page.getByText('February 2026–Present', { exact: true })).toBeVisible();
  await expect(page.getByText('March 2025–April 2026', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Illustration', exact: true }).click();
  await expect(page.getByRole('img', { name: 'Illustrated avatar of Aliyaan Ahmed', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Photo', exact: true }).click();
  await expect(page.getByRole('img', { name: 'Portrait of Aliyaan Ahmed', exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Education', exact: true }).click();
  await expect(page.getByText('Salim Habib University', { exact: true })).toBeVisible();
  await expect(page.getByText('Institute of Business Administration', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'An AI workflow', exact: true }).click();
  await expect(page.getByText('Hi Aliyaan, I’d like to explore useful AI assistance in our team’s workflow.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Copy message', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Copied', exact: true })).toBeVisible();
  await page.evaluate(() => { Object.defineProperty(navigator.clipboard, 'writeText', { value: async () => { throw new Error('Permission denied'); }, configurable: true }); });
  await page.getByRole('button', { name: 'Copied', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Couldn’t access the clipboard.');
  await expect(page.getByRole('link', { name: 'Continue on LinkedIn' })).toHaveAttribute('href', 'https://www.linkedin.com/in/aliyaanahmed');
});

test('section edges align, controls fit, and layouts work across four widths', async ({ page }) => {
  test.setTimeout(150000); fs.mkdirSync('artifacts', { recursive: true });
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  for (const width of [390, 768, 1100, 1440]) {
    await page.setViewportSize({ width, height: 1000 }); await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    let reference = 0;
    for (const selector of ['#expertise', '#work', '#workflow', '#journey', '#about', '#contact']) {
      await page.locator(selector).evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'start' }));
      const heading = page.locator(`${selector} h2`);
      const reveal = heading.locator('xpath=ancestor::*[contains(concat(" ",normalize-space(@class)," ")," reveal ")][1]');
      await expect(reveal).toHaveCSS('transform', 'none');
      const box = await heading.boundingBox(); expect(box).not.toBeNull();
      if (selector === '#expertise') reference = box!.x;
      else expect(Math.abs(box!.x - reference)).toBeLessThan(2);
      const mainReveal = page.locator(selector).locator(':scope > div > .reveal').nth(1);
      if (await mainReveal.count()) {
        const visible = await mainReveal.evaluate(el => { const box = el.getBoundingClientRect(); return Math.min(box.bottom, innerHeight - 48) - Math.max(box.top, 0) > box.height * .15; });
        if (visible) await expect(mainReveal).toHaveCSS('opacity', '1');
      }
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
      await page.screenshot({ path: `artifacts/${selector.slice(1)}-${width}.png` });
    }
    await page.getByRole('tab', { name: /Code Apps/ }).click();
    await page.getByRole('textbox', { name: 'Search sample work items' }).fill('access');
    await page.getByRole('button', { name: 'Complete Review workspace access' }).click();
    await expect(page.getByText('2 / 3 complete', { exact: true })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
    await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/'); await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true }); await page.emulateMedia({ reducedMotion: 'no-preference' });
  }
  for (const slug of ['governance-review', 'insurance-inquiry', 'power-platform-code-apps']) { await page.goto(`/work/${slug}`); await expect(page.getByText('About this demonstration')).toBeVisible(); await page.getByRole('link', { name: 'Back to selected work' }).click(); await expect(page).toHaveURL(/\/#work$/); }
  expect(errors).toEqual([]);
});

test('reveals replay, tab keys work, and reduced motion and touch remain usable', async ({ page, browser }) => {
  await page.setViewportSize({ width: 1440, height: 1000 }); await page.goto('/');
  const panel = page.locator('#work > div > .reveal').nth(1);
  await expect(panel).toHaveAttribute('data-reveal-state', 'hidden'); await expect(panel).toHaveCSS('opacity', '0');
  await show(page, '#work [role="tablist"]'); await expect(panel).toHaveCSS('opacity', '1');
  await page.evaluate(() => { (document.activeElement as HTMLElement)?.blur(); window.scrollTo({ top: 0, behavior: 'instant' }); });
  await expect(panel).toHaveCSS('opacity', '0'); await show(page, '#work [role="tablist"]'); await expect(panel).toHaveCSS('opacity', '1');
  const governance = page.getByRole('tab', { name: /Governance/ }); await governance.focus(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: /Customer journeys/ })).toBeFocused(); await expect(page.getByRole('tab', { name: /Customer journeys/ })).toHaveAttribute('aria-selected', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' }); await page.goto('/');
  await expect(panel).toHaveCSS('opacity', '1'); await expect(panel).toHaveCSS('transform', 'none');
  await page.keyboard.press('Tab'); await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused(); await page.keyboard.press('Enter'); await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('.karachi-clock time')).toHaveText(/\d{2}:\d{2}:\d{2}/);
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const mobile = await context.newPage(); await mobile.goto('http://127.0.0.1:3100/');
  await mobile.getByRole('button', { name: 'Open menu' }).tap(); await mobile.getByRole('link', { name: '01 Work' }).tap();
  await expect(mobile).toHaveURL(/#work$/);
  await mobile.getByRole('button', { name: 'Approve request', exact: true }).tap(); await expect(mobile.getByText('Approved', { exact: true })).toBeVisible();
  await context.close();
});
