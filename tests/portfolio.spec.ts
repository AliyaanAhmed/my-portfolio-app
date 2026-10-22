import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';

async function scrollTo(page: Page, selector: string) {
  await page.locator(selector).evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
}

test('responsive portfolio, workflow interactions, and project pages', async ({ page }) => {
  test.setTimeout(120000);
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  fs.mkdirSync('artifacts', { recursive: true });

  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Less manual work.');
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator('.hero-line').first().locator(':scope > span')).toHaveCSS('transform', 'none');
    await expect(page.locator('.hero-introduction > div').last()).toHaveCSS('opacity', '1');
    await expect(page.locator('.avatar-head img')).toHaveJSProperty('complete', true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await page.screenshot({ path: `artifacts/hero-${width}.png` });

    if (width < 900) {
      await page.getByRole('button', { name: 'Open menu' }).click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
      await expect(page.getByRole('link', { name: '01 Work' })).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.getByRole('button', { name: 'Close menu' })).toBeFocused();
      await page.keyboard.press('Shift+Tab');
      await expect(page.locator('#mobile-navigation').getByRole('link', { name: 'Connect on LinkedIn' })).toBeFocused();
      await page.keyboard.press('Escape');
      await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('link', { name: '01 Work' }).click();
      await expect(page).toHaveURL(/#work$/);
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toHaveCount(0);
    }

    await page.getByRole('button', { name: '03 Decision' }).click();
    await expect(page.getByRole('heading', { name: 'A clear next step.' })).toBeVisible();
    await page.getByRole('button', { name: '01 Request' }).click();
    await expect(page.getByRole('heading', { name: 'A request, with context.' })).toBeVisible();
    await page.getByRole('button', { name: /Power Platform solutions/ }).click();
    await expect(page.getByRole('heading', { name: 'Business workflows. Better connected.' })).toBeVisible();
    await page.getByRole('button', { name: /Power Automate & automation/ }).click();
    await expect(page.getByRole('heading', { name: 'Less chasing. More flowing.' })).toBeVisible();
    await page.getByRole('button', { name: /AI-assisted workflows/ }).click();
    await expect(page.getByRole('heading', { name: 'Intelligence, with a human in the loop.' })).toBeVisible();

    const role = page.locator('details').filter({ has: page.getByText('Microsoft Power Pages Consultant & Frontend Developer', { exact: true }) });
    await role.locator('summary').click();
    await expect(role).toHaveAttribute('open', '');

    for (const selector of ['.chapter-governance', '.chapter-insurance', '.chapter-code', '#expertise', '#about', '#contact']) {
      await scrollTo(page, selector);
      const visibleReveal = page.locator(selector).locator('.reveal').first();
      if (await visibleReveal.count()) await expect(visibleReveal).toHaveCSS('filter', 'blur(0px)');
      const dark = selector === '#expertise' || selector === '#contact';
      await expect(page.locator('.site-header')).toHaveAttribute('data-theme', dark ? 'dark' : 'light');
      await expect(page.locator('.header-inner')).toHaveCSS('color', dark ? 'rgb(245, 248, 245)' : 'rgb(23, 35, 35)');
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
      await page.screenshot({ path: `artifacts/${selector.replace(/[.#]/g, '')}-${width}.png` });
    }
    await page.screenshot({ path: `artifacts/home-${width}.png`, fullPage: true });
  }

  for (const slug of ['governance-review', 'insurance-inquiry', 'power-platform-code-apps']) {
    await page.goto(`/work/${slug}`);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('About this demonstration')).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
    await page.getByRole('link', { name: 'Back to selected work' }).click();
    await expect(page).toHaveURL(/\/#work$/);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const slug of ['governance-review', 'insurance-inquiry', 'power-platform-code-apps']) {
    await page.goto(`/work/${slug}`);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  }
  await page.goto('/work/governance-review');
  await page.screenshot({ path: 'artifacts/case-study-390.png', fullPage: true });
  expect(errors).toEqual([]);
  const missing = await page.goto('/work/does-not-exist');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('This page isn’t');
});

test('pointer tracking, scroll parallax, and section-aware navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/');
  const head = page.getByTestId('avatar-head');
  await expect(page.locator('.avatar-stage')).toHaveAttribute('data-pointer-tracking', 'enabled');
  await page.mouse.move(100, 400);
  await expect.poll(() => head.evaluate(el => getComputedStyle(el).transform)).not.toBe('none');
  const left = await head.evaluate(el => getComputedStyle(el).transform);
  await page.mouse.move(1350, 250);
  await expect.poll(() => head.evaluate(el => getComputedStyle(el).transform)).not.toBe(left);
  await expect(page.locator('.hero-introduction > div').last()).toHaveCSS('opacity', '1');
  await expect(page.locator('.hero-line').last().locator(':scope > span')).toHaveCSS('transform', 'none');
  await page.screenshot({ path: 'artifacts/avatar-pointer-1440.png' });

  await scrollTo(page, '.chapter-governance');
  await expect(page.locator('.site-header')).toHaveAttribute('data-active-section', 'work');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Work', exact: true })).toHaveAttribute('aria-current', 'location');
  const scene = page.locator('.chapter-governance .chapter-scene');
  const before = await scene.evaluate(el => getComputedStyle(el).transform);
  await page.mouse.wheel(0, 300);
  await expect.poll(() => scene.evaluate(el => getComputedStyle(el).transform)).not.toBe(before);
  await scrollTo(page, '#expertise');
  await expect(page.locator('.site-header')).toHaveAttribute('data-active-section', 'expertise');
  await expect(page.locator('.site-header')).toHaveAttribute('data-theme', 'dark');
  await scrollTo(page, '#about');
  await expect(page.locator('.site-header')).toHaveAttribute('data-active-section', 'about');
  await expect(page.locator('.site-header')).toHaveAttribute('data-theme', 'light');
});

test('touch navigation and stable avatar', async ({ browser }) => {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true });
  const page = await context.newPage();
  await page.goto('http://127.0.0.1:3100/');
  await expect(page.locator('.avatar-stage')).toHaveAttribute('data-pointer-tracking', 'disabled');
  await page.getByRole('button', { name: 'Open menu' }).tap();
  await page.getByRole('link', { name: '02 Expertise' }).tap();
  await expect(page).toHaveURL(/#expertise$/);
  await page.getByRole('button', { name: /Power Automate & automation/ }).tap();
  await expect(page.getByRole('heading', { name: 'Less chasing. More flowing.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBeTruthy();
  await context.close();
});

test('keyboard access and reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  expect(await page.locator('.system-path i.last').evaluate(el => getComputedStyle(el).animationName)).toBe('none');
  await page.mouse.move(1300, 300);
  await expect(page.getByTestId('avatar-head')).toHaveCSS('transform', 'none');
  await scrollTo(page, '.chapter-governance');
  await expect(page.locator('.chapter-governance .chapter-scene')).toHaveCSS('transform', 'none');
  const request = page.getByRole('button', { name: '01 Request' });
  await request.focus(); await page.keyboard.press('Enter');
  await expect(request).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.karachi-clock time')).toHaveText(/\d{2}:\d{2}:\d{2}/);
});
