# Portfolio design context

## Audience and purpose
Introduce Aliyaan's Power Apps consulting, software engineering, and AI integration work to prospective collaborators. Keep the page concise and easy to scan.

## Established visual language
Manrope display, Inter body, Geist Mono for technical annotations. Off-white surfaces, dark green expertise/contact sections, muted green accents. Runtime styling lives in `src/app/globals.css`, `src/app/landing.css`, and scoped section CSS modules. Reuse these owners and `ProductLogo` rather than introducing another theme or logo system.

## Current decisions
- The hero avatar is the focal visual and follows fine-pointer movement. Product logos form a stationary, four-column strip below it; avoid floating badges covering the portrait. Labels stay visible on touch devices. No tooltip dependency or decorative controls.
- Avatar and toolkit occupy separate rows in normal flow, with a responsive image aspect ratio and explicit gap. The avatar does not translate vertically on scroll. Toolkit has a quiet surface without a divider crossing the shoes; hero bottom padding separates it from Expertise.
- Expertise has topic-specific previews; How I Build uses animated process scenes; Experience uses expandable timeline rows; About uses a large statement beside the complete supplied portrait.
- Expertise has three groups: Power Platform Solution & Automation, AI-assisted workflows, and Frontend Architecture & UI/UX. The frontend group offers architecture and prototype views. About's byline uses Power Platform Consultant. Alternative palettes are proposals only until selected by the user.
- Expertise uses two top-aligned columns on desktop: heading and compact capability list on the left, preview aligned with the heading on the right. On mobile the preview follows the list. Avoid centering the short list against the taller preview.
- Expertise previews size to content without a forced minimum height. Platform tiles use compact horizontal logo/name layouts, with Dataverse and Power Automate sharing one foundation row.
- Power Apps Consultant is the current title. CNSAC Med uses Application Consultant; engineering roles use Software Engineer. CNSAC Med and Mech Connect are Germany-based; Mech Connect includes AI integration per the user's correction.
- Preserve reduced-motion behavior, native scrolling, accessible disclosures, focus styles, and responsive gutters.

## Verification boundary
Production builds include TypeScript compilation. Existing browser tests contain historical selectors; do not report them as current verification without running and updating them when requested.
