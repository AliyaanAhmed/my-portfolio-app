# Search and social metadata

## Implemented

- Homepage title uses the full name and professional focus; concise description reflects enterprise Power Platform, React, and AI work.
- Page-specific titles, descriptions, Open Graph and Twitter metadata live in `src/lib/seo.ts` and route metadata exports. Homepage title is absolute to avoid repeating the author name through the title template.
- Canonicals are page-specific, not inherited from a homepage canonical in the root layout.
- Homepage ProfilePage/Person structured data uses the supplied name, current positioning, skills, and real LinkedIn profile. Concept pages use CreativeWork markup explicitly labeled as concepts, with breadcrumbs when the origin is configured. No ratings, outcomes, or client endorsements are invented.
- Each concept has its own generated 1200×630 share image. Homepage includes visible internal links to all three concepts, which also cross-link through related studies.
- `robots.txt` allows crawling and advertises the sitemap after the final origin is configured. The sitemap lists the homepage and statically generated concept pages. Do not populate it with localhost or an invented production domain.
- Optional Search Console verification is available through `GOOGLE_SITE_VERIFICATION`.
- The no-JavaScript fallback exposes reveal and hero content that otherwise begins with animation styles.

## Confirmed domain and deployment

1. The confirmed default origin is `https://www.aliyaanahmed.site`. `NEXT_PUBLIC_SITE_URL` is an optional override; any existing hosting value must match that origin. This value must not contain a page path, query, credentials, or fragment.
2. Rebuild and deploy. Confirm the canonical origin is consistent with the preferred www/non-www and HTTPS redirects configured by the host.
3. Add the site to Google Search Console. If using HTML-tag verification, copy only its token into `GOOGLE_SITE_VERIFICATION`, then rebuild. Domain verification via DNS can instead be configured at the domain provider.
4. Submit `/sitemap.xml` in Search Console and inspect the homepage and concept URLs. Check structured data with Google's Rich Results Test and social cards with the destination platform's inspector.

## Scope and evidence

Production build and TypeScript compilation pass. Generated HTML was inspected for the homepage and all three concepts: titles, canonicals, Open Graph URLs/images, and Twitter images use the confirmed domain. The generated sitemap lists all four pages and robots.txt references it. The web tool could not access the live domain, so no live-domain crawl, Search Console submission, rich-result validation, performance benchmark, or search ranking measurement has been completed. Indexing and search presentation remain search-engine decisions.

References: https://nextjs.org/docs/app/getting-started/metadata-and-og-images · https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap · https://developers.google.com/search/docs/crawling-indexing/canonicalization · https://developers.google.com/search/docs/appearance/structured-data/profile-page
