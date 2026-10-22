# Revamp verification — 22 October 2026

Completed against the revised production build, using Windows, Node 24.15.0, and Chromium:

- `npm run lint`: passed without warnings.
- `npm run typecheck`: passed with strict TypeScript.
- `npm run build`: passed. Homepage, all three project pages, metadata routes, favicon, and Open Graph image generated successfully.
- `npm run test:e2e`: **4 tests passed, 45.0 seconds**. Playwright owned an isolated production server on port 3100 and stopped it after the suite.

## Browser coverage

- 390px, 768px, and 1440px layouts: no horizontal document overflow on the homepage or checked project routes.
- Both supplied images load correctly, with PNG transparency preserved.
- Request and decision workflow controls update their preview and accessible pressed state.
- Power Platform, Power Automate, and AI capability controls update the corresponding diagram and content.
- Expandable employment roles retain their supplied dates and expose details on activation.
- Mobile menu: focus enters the menu, wraps in both directions, returns to its toggle on Escape, and closes after section navigation.
- All three project routes, return links, and expected HTTP 404 for an unknown project.
- Pointer movement changes the avatar head transform; project scene transforms change with scroll position.
- The active navbar link follows Work, Expertise, and About. Header theme switches between light and dark sections. Contact selection at the bottom of shorter viewports was corrected and verified across the three widths.
- A touch-enabled mobile context keeps pointer tracking disabled and supports menu navigation and capability selection through taps.
- Reduced motion removes pointer and project transforms, continuous footer motion, and smooth scrolling. Skip navigation and keyboard workflow activation pass.
- Karachi local clock renders after hydration.
- No unexpected console errors or uncaught page errors on valid routes. The deliberately requested missing project correctly returns 404.

## Visual review

Reviewed desktop and tablet heroes, mobile hero and project composition, large project scenes, portrait layout, dark capability section, contact layout, and header tone changes. Captures are saved as:

- `hero-{390,768,1440}.png` and full-page `home-{390,768,1440}.png`.
- `chapter-{governance,insurance,code}-{390,768,1440}.png`.
- `expertise-*`, `about-*`, and `contact-*` at the same widths.
- `avatar-pointer-1440.png` and `case-study-390.png`.

The head effect is CSS-layered 2.5D perspective movement using the supplied PNG. No rigged 3D asset, generated portrait, or fabricated client material is used. All project interfaces remain clearly labeled concept demonstrations with synthetic records.

## Limits

No Lighthouse scores were measured. Browser checks use Chromium, including touch emulation; physical devices and Safari/Firefox were not tested. No client systems, contact delivery endpoint, or external business integrations are connected. The final domain remains unset, so canonical links are omitted and the sitemap stays empty. Next.js emits its expected localhost fallback warning for social image URL resolution until the domain is configured.
