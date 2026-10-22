# Aliyaan Ahmed — Portfolio

A concise portfolio for Syed Aliyaan Ahmed, built with Next.js App Router, React, strict TypeScript, Tailwind CSS 4, Motion for React, and Lucide. Manrope headings and Inter body text load through `next/font`; Geist Mono is reserved for small technical annotations.

## Run

Requires Node.js 20.9 or later; developed with Node 24 and npm 11.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Production:

```sh
npm run build
npm start
```

No API keys, database, CMS, or external account is needed. Initial font compilation downloads Geist from Google through Next.js; allow network access during that build. Dependencies are pinned and `package-lock.json` is included.

## Content and design

- `src/content/profile.ts`: name, positioning, biography, real links, portrait, education, and configurable site URL.
- `src/content/experience.ts`: employer groups, editable role dates, descriptions, and current role. Supplied overlaps are intentional. CNSAC is listed as an App Consultant engagement at a medical company; dates are omitted because they have not been supplied.
- `src/content/projects.ts`: three project stories, slugs, provenance, walkthroughs, constraints, and next steps.
- `src/content/expertise.ts`: five capability previews, led by Power Platform, Power Automate, and AI-assisted workflows.
- `src/app/globals.css`: shared tokens, interface illustrations, case-study layouts, and responsive foundations.
- `src/app/landing.css`: the existing hero and expertise typography and layout.
- `src/components/sections/lower/`: the rebuilt lower page and its self-contained interactive components.
- `src/components/sections/lower/LowerSections.module.css`: scoped layouts and responsive styling for Work, Workflow, Journey, About, and Contact. `SectionShell` gives every section the same gutters, heading alignment, and spacing.

Static section shells, About, and project pages are Server Components. Small Client Components provide the avatar, animated process stories, capability and employer selectors, contact brief builder, reveals, and local clock. Native `details` provides education and role expansion. Scrolling stays native. Motion is the only animation library.

## Motion and personal artwork

The original supplied files are preserved as `public/images/FormalDress.png` and `public/images/Avatar.png`. `next/image` serves optimized versions with transparency. The formal portrait appears in About; the illustrated avatar is the hero centerpiece. Navigation uses a simple AA monogram and name.

- `AvatarStage.tsx` creates head/body layers using CSS clipping of the same PNG, then spring-driven perspective rotations track the pointer. This is a 2.5D illustration effect, not a rigged 3D character. Fine pointer devices receive the interaction; touch devices keep a stable avatar. There is no image synthesis or modification of the source PNG.
- `ProcessStories.tsx` replaces the two former work/demo panels with three automatically advancing visual concepts: connected architecture, AI suggestions with human review, and role-based enterprise/government approvals. Each has four clearly labeled stages, viewport-aware playback, and a pause control. Reduced motion shows a static final overview. These are explanatory animations, with no live AI, authorization, or business connections.
- `SiteHeader.tsx` compacts into a floating pill, tracks the current section, animates the active navigation link, and adapts to dark sections. It also shows page progress.
- `ExperienceExplorer.tsx` presents a distinct vertical career timeline, with native expandable employer rows and supplied role dates.
- `AboutPanel.tsx` uses a large first-person positioning statement on the left and the entire supplied portrait on the right. The statement is portfolio copy, not an attributed historical quote. Education is available in native expandable content.
- `CapabilityVisual.tsx` supplies five topic-specific previews: platform architecture, automation, document extraction and AI, React component structure, and a working two-step UI/UX prototype. React and UI/UX previews do not reuse the business-platform diagram.
- `ProductLogo.tsx` serves Microsoft's official product artwork in diagrams and product labels. Asset attribution and Code Apps logo mapping are documented in `public/logos/SOURCES.md`.
- `ContactPanel.tsx` builds a short message from a selected topic, copies it only after clipboard access succeeds, and provides a manual-copy fallback if access fails. The actual contact action opens the supplied LinkedIn URL. Nothing is automatically sent.
- `Reveal.tsx` now starts content hidden, reveals it with translation and opacity when at least 12% enters the viewport (with a 48px bottom inset), and replays when it leaves and re-enters. Headings, project cards, individual capabilities, career rows, the About portrait and copy, contact, and footer use it. Focus reveals keyboard targets. A `noscript` fallback keeps content visible without JavaScript.
- Reduced-motion mode resets transforms and word opacity, disables pointer tracking and continuous animation, and uses native instant anchor scrolling. CSS covers the initial hydration interval as well as runtime preference changes.

Tune the new lower-section layouts in `LowerSections.module.css`, the hero/expertise in `landing.css`, and shared tokens in `globals.css`. The lower sections avoid inherited illustration and card classes to prevent style collisions. A true independently turning 3D head would require a 3D asset or additional directional artwork.

## Project material

The homepage process animations are **illustrative concepts** explaining expertise. The three retained detail-page stories use fictional organizations and synthetic data with HTML/CSS previews. Neither represents a deployed business application or a completed client engagement, and no business outcome is claimed.

To replace a concept with approved work:

1. Obtain permission for all public names, screenshots, and descriptions; remove confidential information.
2. Edit the corresponding record in `projects.ts`, including contribution and evidence-backed outcomes.
3. Add approved images under `public/projects/`. Render them using `next/image`, with descriptive alt text, reserved width/height, and lazy loading below the fold.
4. Update `ProjectPreview` or the case-study media to use the approved material.
5. Set `status: 'verified'` only after reviewing the factual record, and update the concept-specific notice and walkthrough copy in `CaseStudyLayout`. Its current explanatory notices deliberately assume concept content.

Each `/work/[slug]` route is statically generated. Unknown slugs return the custom 404.

## Optional personal assets

- Portrait: `profile.portrait` points to the supplied `/images/FormalDress.png`. Replace it with an approved image of similar composition to update the About artwork. The supplied avatar lives at `/images/Avatar.png`; its CSS clip boundaries are tuned to that composition.
- Resume: put the real PDF in `public/resume/` and set `profile.links.resume`. A control appears in Contact only when configured.
- Email: set `profile.links.email` to the real address to enable a mail action.
- GitHub: reserved as nullable configuration; add a public link only once supplied.
- Domain: set `NEXT_PUBLIC_SITE_URL=https://your-confirmed-domain` in `.env.local` locally or in deployment environment variables, then rebuild. This enables real canonical URLs, absolute sitemap entries, and the sitemap reference in robots. Until then, the sitemap is empty and no canonical domain is invented. Next.js may warn that social image resolution falls back to localhost during local builds.

The LinkedIn URL is the supplied real contact method. Email, phone, resume, approved client assets, and GitHub URL remain unconfigured. Personal content comes from the supplied brief and follow-up positioning. Reference screenshots informed the later visual revamp; no claims, project facts, contact details, or testimonial content were copied from them.

There is no contact endpoint or form because delivery is not configured. If adding one, implement confirmed server delivery, client/server validation with Zod, spam controls, rate limiting, and truthful failure/success states before exposing it.

## SEO and accessibility

Includes a skip link, landmark structure, visible focus, an Escape-dismissable mobile menu with focus containment and restoration, stable workflow labels and pressed states, native expandable roles, reduced-motion support, Person JSON-LD, dynamic project metadata, generated 1200×630 Open Graph image, favicon, robots, and configurable sitemap. Karachi time initializes after mount to avoid hydration mismatches.

## Verification

```sh
npm run lint
npm run typecheck
npm run build
npx playwright install chromium
npm run test:e2e
```

If using an already installed Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its executable before running tests. Playwright starts the built production app on port **3100**, isolated from a development preview on port 3000, and tears it down afterward. Rebuild after source changes before rerunning tests. On restricted Windows environments, browser and build workers may require process-launch permission.

The existing browser suite and screenshots document the previous interactive-demo layout. Their work-panel and About-switch selectors need revision for the current process-story design; they were not run for this revision. The updated source passes the production build, including TypeScript compilation. See `artifacts/verification.md` for historical results and limits. Lighthouse scores have not been measured.

Official setup references consulted: [Next.js](https://nextjs.org/docs/app/getting-started/installation), [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and [Motion](https://motion.dev/docs/react-installation).
