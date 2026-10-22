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
- `src/content/experience.ts`: employer groups, editable role dates, descriptions, and current role. Supplied overlaps are intentional. Esports is a separate earlier operations chapter.
- `src/content/projects.ts`: three project stories, slugs, provenance, walkthroughs, constraints, and next steps.
- `src/content/expertise.ts`: five capability previews, led by Power Platform, Power Automate, and AI-assisted workflows.
- `src/app/globals.css`: shared tokens, interface illustrations, case-study layouts, and responsive foundations.
- `src/app/landing.css`: the cleaner landing-page typography, compact gallery, expandable career list, and responsive component styling.

Static homepage content and project pages are Server Components. Client boundaries cover the avatar, scroll-linked project scenes, section-aware navigation, workflow controls, capability selection, content reveals, portrait parallax, and the local clock. Native `details` provides keyboard-accessible role expansion. Scrolling stays native. Motion is the only animation library.

## Motion and personal artwork

The original supplied files are preserved as `public/images/FormalDress.png` and `public/images/Avatar.png`. `next/image` serves optimized versions with transparency. The formal portrait appears in About and the navigation identity; the illustrated avatar is the hero centerpiece.

- `AvatarStage.tsx` creates head/body layers using CSS clipping of the same PNG, then spring-driven perspective rotations track the pointer. This is a 2.5D illustration effect, not a rigged 3D character. Fine pointer devices receive the interaction; touch devices keep a stable avatar. There is no image synthesis or modification of the source PNG.
- `ProjectChapter.tsx` presents three concise concept cards, including a wide workspace card. Scene movement follows scroll position; the detailed stories remain on the project routes.
- `SiteHeader.tsx` compacts into a floating pill, tracks the current section, animates the active navigation link, and adapts to dark sections. It also shows page progress.
- `AboutPortrait.tsx` retains restrained portrait movement. The homepage removes the long process and quotation sections, and keeps education and role detail behind disclosures.
- `Reveal.tsx` now starts content hidden, reveals it with translation and opacity when at least 12% enters the viewport (with a 48px bottom inset), and replays when it leaves and re-enters. Headings, project cards, individual capabilities, career rows, the About portrait and copy, contact, and footer use it. Focus reveals keyboard targets. A `noscript` fallback keeps content visible without JavaScript.
- Reduced-motion mode resets transforms and word opacity, disables pointer tracking and continuous animation, and uses native instant anchor scrolling. CSS covers the initial hydration interval as well as runtime preference changes.

Tune strengths and durations in these components, shared tokens in `globals.css`, and the current landing-page design in `landing.css`. A true independently turning 3D head would require a 3D asset or additional directional artwork.

## Project material

All three stories are **concept demonstrations**. Fictional sample interfaces are HTML/CSS illustrations, not client screenshots or working business applications. The linked previews are accessible illustrations; their internal simulated interface labels are not controls. They contain synthetic data and make no deployment or outcome claims.

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

Browser tests cover actual hidden/visible scroll states and replay, 390px/768px/1440px layouts, overflow, workflow controls, capability changes, career disclosures, menu focus containment and Escape, project routes, 404, clock, reduced motion, keyboard access, pointer response, active navigation, touch, and runtime errors. Live screenshots capture individual sections; full-page layout captures use reduced motion so offscreen content is visible in a single image. See `artifacts/verification.md` for results and limits. Lighthouse scores have not been measured.

Official setup references consulted: [Next.js](https://nextjs.org/docs/app/getting-started/installation), [Tailwind CSS](https://tailwindcss.com/docs/installation/framework-guides/nextjs), and [Motion](https://motion.dev/docs/react-installation).
