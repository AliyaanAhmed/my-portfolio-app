# Landing-page refinement — 22 October 2026

## Changes

- Manrope headings and Inter body text replace the former Geist-only typography. Fonts load through `next/font`; technical labels retain Geist Mono.
- The homepage uses a short introduction, capability selector, compact project gallery, workflow demo, expandable career rows, a short About introduction, and a single contact invitation.
- Detailed project information stays on the three concept-study routes. Career dates and supplied history remain in local data and expandable disclosures.
- `Reveal` now has actual hidden and visible states. Viewport entry animates opacity, translation, and scale; exit resets the state so the animation replays on return. Individual capability rows, project cards, career rows, portrait, content blocks, contact, and footer use it.
- Keyboard focus reveals controls. Reduced-motion preferences bypass the transforms and hiding. A `noscript` fallback keeps content visible without JavaScript.

## Completed checks

- `npm run lint`: passed, no warnings.
- `npm run typecheck`: passed with strict TypeScript.
- `npm run build`: passed; all project routes and metadata routes generated.
- `npm run test:e2e`: **3 tests passed, 53.5 seconds**, against an isolated production server on port 3100.

The scroll test confirms a project card is opacity 0 and marked hidden before entry, becomes opacity 1 after scrolling into view, hides after leaving, and becomes visible again on re-entry. It also verifies entry states for career rows and the portrait.

Responsive checks cover 390px, 768px, and 1440px widths with no document overflow. Workflow steps, Power Automate and AI capabilities, nested career disclosures, mobile menu focus containment and Escape, project routes, expected 404, avatar tracking, section-aware navigation, touch operation, reduced-motion visibility, skip navigation, keyboard activation, and the Karachi clock pass. Valid routes produced no unexpected console or page errors.

## Visual inspection

Reviewed desktop hero and new gallery, mobile whole-page composition, dark expertise selector, portrait/About section, and responsive spacing. Current captures include `hero-*`, `work-*`, `workflow-*`, `journey-*`, `expertise-*`, `about-*`, and `contact-*` at the three tested widths. `scroll-work-visible.png` captures a revealed project. Full-page `home-*` images use reduced motion to show all offscreen content in a single static layout capture; live scroll entry is tested separately. Older `chapter-*` captures belong to the earlier design.

No Lighthouse score was measured. Browser checks use Chromium and touch emulation, not physical devices or Safari/Firefox. No external business system or contact delivery endpoint is connected. The final domain remains unconfigured; canonical URLs are omitted and the sitemap is empty. Next.js emits its expected localhost social-image fallback warning until that domain is set.
