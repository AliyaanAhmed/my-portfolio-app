# Portfolio design context

## Audience and purpose
Introduce Aliyaan's Power Apps consulting, software engineering, and AI integration work to prospective collaborators. Keep the page concise and easy to scan.

## Established visual language
Manrope display, Inter body, Geist Mono for technical annotations. Off-white surfaces, dark green expertise/contact sections, muted green accents. Runtime styling lives in `src/app/globals.css`, `src/app/landing.css`, and scoped section CSS modules. Reuse these owners and `ProductLogo` rather than introducing another theme or logo system.

## Current decisions
- The hero uses scoped `HeroSection.module.css`: a compact introduction and contained avatar, followed by one full-width technology row. On mobile the technology row precedes the avatar. Preserve readable product labels and avoid floating badges. The current theme remains unchanged pending a palette selection.
- Hero height follows content; desktop avatar scales to available viewport height. The avatar does not translate vertically on scroll. Toolkit remains in normal text flow, with no divider near the shoes. Hero bottom padding separates it from Expertise.
- Expertise has topic-specific previews; How I Build uses animated process scenes; Experience uses expandable timeline rows; About uses a large statement beside the complete supplied portrait.
- Expertise has three groups: Power Platform Solution & Automation, AI-assisted workflows, and Frontend Architecture & UI/UX. The frontend group offers architecture and prototype views. About's byline uses Power Platform Consultant. Alternative palettes are proposals only until selected by the user.
- Expertise uses two top-aligned columns on desktop: heading and compact capability list on the left, preview aligned with the heading on the right. On mobile the preview follows the list. Avoid centering the short list against the taller preview.
- Expertise previews size to content without a forced minimum height. Platform tiles use compact horizontal logo/name layouts, with Dataverse and Power Automate sharing one foundation row.
- Power Apps Consultant is the current title. CNSAC Med uses Application Consultant; engineering roles use Software Engineer. CNSAC Med and Mech Connect are Germany-based; Mech Connect includes AI integration per the user's correction.
- Preserve reduced-motion behavior, native scrolling, accessible disclosures, focus styles, and responsive gutters.
- About uses centered, balanced statement typography with a centered byline and actions beside the portrait. Education is omitted from this section at the user's request.
- Mobile navigation uses a stable full-width bar, legible wordmark, and 44px menu control. Mobile hero centers its introduction and compact avatar, then uses wrapping logo/name chips for the toolkit. Mobile About uses one editorial portrait panel: visible face at the top, a fade into centered readable copy, three focus buttons with a short explanation, and a LinkedIn action. The image remains behind the panel rather than forming a second row. Desktop remains unchanged.
- Mobile hero has one centered sequence: introduction and actions, avatar over a subtle abstract neural-network diagram, then the single three-column toolkit grid. No duplicate product logos beside the avatar, software-window frame, botanical scenes, architectural arches, or curved text. All seven tools remain in the toolkit. Desktop remains unchanged.

## Verification boundary
Production builds include TypeScript compilation. Existing browser tests contain historical selectors; do not report them as current verification without running and updating them when requested.

## Git workflow
Keep enhancements local. Do not commit or push unless the user explicitly asks.
