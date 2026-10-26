# Hero reference implementation

- Source visual: user-attached desktop hero reference in the current conversation (1672 × 941 pixels).
- Implementation: `src/components/sections/HeroSection.tsx` and `HeroShowcase.tsx`.
- Intended viewports: desktop 1672px; responsive layouts below 900px and 600px.
- Primary states implemented: Applications with selectable modules; Automation with finite run/replay; AI experiences with sample analysis/reset. Native tabs support arrows, Home, and End. Reduced motion disables entrance movement and animated transitions.
- Layout stability: all preview panels occupy one shared grid cell; inactive panels remain in layout but are inert, hidden from accessibility APIs, and invisible. This reserves space for the largest state.
- Typography, spacing, and colors follow the existing Manrope/Inter styles, off-white background, and green accents. Reference-inspired application window and code overlay replace the earlier three-step card. Existing supplied brand SVGs and Lucide icons are reused.
- Deliberate differences: no city/location, scroll prompt, avatar, or repeated toolkit grid, following the user's previous instructions. Mobile has centered copy, compact tabs, readable stacked controls, and an inline technical caption.
- Browser evidence: unavailable. CUA inventory returned no enabled apps or browsers. No implementation screenshot, viewport comparison, interaction execution, or browser-console review could be captured.
- Comparison history: no browser comparison performed; visual fidelity is unverified. Build results are reported separately and do not establish visual QA.
- final result: blocked
- Blocker: browser-rendered desktop/mobile capture and comparison with the supplied reference are unavailable in this session.
