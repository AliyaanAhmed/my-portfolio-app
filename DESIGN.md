# Portfolio design context

## Audience and purpose
Introduce Aliyaan's Power Apps consulting, software engineering, and AI integration work to prospective collaborators. Keep the page concise and easy to scan.

## Established visual language
Manrope display, Inter body, Geist Mono for technical annotations. Off-white surfaces, dark green expertise/contact sections, muted green accents. Runtime styling lives in `src/app/globals.css`, `src/app/landing.css`, and scoped section CSS modules. Reuse these owners and `ProductLogo` rather than introducing another theme or logo system.

## Current decisions
- Hero uses `HeroSection.module.css` for one desktop row: left-aligned introduction and actions beside the interactive workflow on the right. Below 900px it becomes a centered, compact vertical layout. A compact `HeroWorkflow` example lets visitors select Request, AI review, and Approval, or play a finite sequence. Keep its footprint stable, support reduced motion, and label the example honestly. No avatar or toolkit appears in the hero at any viewport. Expertise is the single place to explore technology capabilities; avoid repeating its preview in the hero.
- Expertise has topic-specific previews; How I Build uses animated process scenes; Experience uses expandable timeline rows; About uses a large statement beside the complete supplied portrait.
- Expertise has three groups: Power Platform Solution & Automation, AI-assisted workflows, and Frontend Architecture & UI/UX. The frontend group offers architecture and prototype views. About's byline uses Power Platform Consultant. Alternative palettes are proposals only until selected by the user.
- Expertise uses two top-aligned columns on desktop: heading and compact capability list on the left, preview aligned with the heading on the right. On mobile the preview follows the list. Avoid centering the short list against the taller preview.
- Expertise previews size to content without a forced minimum height. Platform tiles use compact horizontal logo/name layouts, with Dataverse and Power Automate sharing one foundation row.
- Power Apps Consultant is the current title. CNSAC Med uses Application Consultant; engineering roles use Software Engineer. CNSAC Med and Mech Connect are Germany-based; Mech Connect includes AI integration per the user's correction.
- Preserve reduced-motion behavior, native scrolling, accessible disclosures, focus styles, and responsive gutters.
- About uses centered, balanced statement typography with a centered byline and actions beside the portrait. Education is omitted from this section at the user's request.
- Mobile About uses one editorial portrait panel: visible face at the top, a fade into centered readable copy, three focus buttons with a short explanation, and a LinkedIn action. The image remains behind the panel rather than forming a second row.

## Verification boundary
- Mobile process stories use wrapping logo/name tags without repeated role descriptions; diagram labels take priority over tiny captions. AI documents and suggestions stack vertically. Mobile section gutters are 20px, primary copy is 14px or larger, and contact choices/copy actions have 44px touch targets.
Production builds include TypeScript compilation. Existing browser tests contain historical selectors; do not report them as current verification without running and updating them when requested.

## Git workflow
Mobile navbar uses a 58px rounded rectangle inset 12px, understated monogram divider, and a labeled 44px menu control with a two-line close transition. Expanded navigation keeps the existing focus trap and Escape behavior.
Expanded mobile navigation is a content-height dropdown with 48px link rows, a quiet active state, and one LinkedIn footer action. Omit numbered rows and full-screen empty panels. Outside click dismisses via a semantic backdrop control; keep Escape and focus restoration.
Keep enhancements local. Do not commit or push unless the user explicitly asks.
