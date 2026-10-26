# Portfolio design context

## Audience and purpose
Introduce Aliyaan's Power Apps consulting, software engineering, and AI integration work to prospective collaborators. Keep the page concise and easy to scan.

## Established visual language
Manrope display, Inter body, Geist Mono for technical annotations. Off-white surfaces, dark green expertise/contact sections, muted green accents. Runtime styling lives in `src/app/globals.css`, `src/app/landing.css`, and scoped section CSS modules. Reuse these owners and `ProductLogo` rather than introducing another theme or logo system.

## Current decisions
- Hero follows the user's supplied application-showcase reference: a three-line headline and actions on the left, with Applications / Automation / AI experiences tabs on the right. `HeroShowcase` uses an application window, selectable modules, a finite approval demo, and a simulated document-analysis example. Clearly label these as concepts; don't imply real customer data or live AI services. All three preview panels share a CSS grid cell to reserve the largest footprint and prevent scroll shifts. Below 900px the introduction centers above the preview; below 600px the sidebar and floating badge are omitted and the code overlay becomes an inline caption. No avatar, location, scroll prompt, or repeated toolkit grid appears. Reuse existing product logos and the site's typography/palette.
- Expertise has topic-specific previews; How I Build uses animated process scenes; Experience uses expandable timeline rows; About uses a large statement beside the complete supplied portrait.
- Expertise has three groups: Power Platform Solution & Automation, AI-assisted workflows, and Frontend Architecture & UI/UX. The frontend group offers architecture and prototype views. About's byline uses Power Platform Consultant. Alternative palettes are proposals only until selected by the user.
- Expertise uses two top-aligned columns on desktop: heading and compact capability list on the left, preview aligned with the heading on the right. On mobile the preview follows the list. Avoid centering the short list against the taller preview.
- Expertise previews size to content without a forced minimum height. Platform tiles use compact horizontal logo/name layouts, with Dataverse and Power Automate sharing one foundation row.
- Power Apps Consultant is the current title. CNSAC Med uses Application Consultant; engineering roles use Software Engineer. CNSAC Med and Mech Connect are Germany-based; Mech Connect includes AI integration per the user's correction.
- Preserve reduced-motion behavior, native scrolling, accessible disclosures, focus styles, and responsive gutters.
- Scroll reveals run once by default and stay visible after entry. Section headings fade without translation or scaling; other reveals use at most 24px of movement. Avoid exit animations tied to viewport edges, which make headings jump back into view while scrolling away.
- Keep the hero compact vertically, not horizontally: the desktop showcase fills its grid column with content-width tabs and tight preview spacing. The code card overlaps the lower-right window corner as in the supplied reference; reserve interior space so it doesn't obscure content or controls. Mobile uses the same corner placement with a compact technical caption. Applications shows Power Apps and React logos together; at smaller viewports these move into the window bar. Panel heights are determined by shared content, without arbitrary minimum canvas heights; all information and interaction states remain available.
- The showcase starts directly with its window: tabs live inside the window below the chrome, aligned right on desktop and spanning the available width on mobile. Omit the former eyebrow and headline above them. The caption/next control follows the main window immediately on the left, alongside the code overlay rather than below its full height. `HeroConnections` draws curved connection paths and traveling signals behind the window; tab changes update their color. Pause when offscreen, when the page is hidden, or via the header control. Reduced motion shows static paths.
- Connection paths anchor to measured DOM edges: application window → product badge → code panel. When the badge is hidden, connect the window directly to the code panel. Recompute ports on element resize and tab changes; don't use unrelated floating curves or open endpoints.
- Mobile hero below 600px uses progressive disclosure: one role label, a short enterprise-focused introduction, actions, and a compact tabbed preview. Hide the repeated discipline list and industry footer. The preview initially shows a short three-part overview and an accessible Explore demo toggle; expand to expose the existing interactive panels. Desktop keeps the full showcase at all times.
- About uses centered, balanced statement typography with a centered byline and actions beside the portrait. Education is omitted from this section at the user's request.
- Mobile About uses one editorial portrait panel: visible face at the top, a fade into centered readable copy, three focus buttons with a short explanation, and a LinkedIn action. The image remains behind the panel rather than forming a second row.

## Verification boundary
- Mobile process stories use wrapping logo/name tags without repeated role descriptions; diagram labels take priority over tiny captions. AI documents and suggestions stack vertically. Mobile section gutters are 20px, primary copy is 14px or larger, and contact choices/copy actions have 44px touch targets.
Production builds include TypeScript compilation. Existing browser tests contain historical selectors; do not report them as current verification without running and updating them when requested.

## Git workflow
Mobile navbar uses a 58px rounded rectangle inset 12px, understated monogram divider, and a labeled 44px menu control with a two-line close transition. Expanded navigation keeps the existing focus trap and Escape behavior.
Expanded mobile navigation is a content-height dropdown with 48px link rows, a quiet active state, and one LinkedIn footer action. Omit numbered rows and full-screen empty panels. Outside click dismisses via a semantic backdrop control; keep Escape and focus restoration.
Keep enhancements local. Do not commit or push unless the user explicitly asks.
