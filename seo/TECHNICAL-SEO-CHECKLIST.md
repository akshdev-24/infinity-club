# Technical SEO Checklist

## Implemented in this archive
- [x] HTML language declared as `en-IN`.
- [x] One descriptive homepage title and meta description.
- [x] One H1 and existing semantic section heading hierarchy retained.
- [x] Absolute canonical URL uses the club's public domain.
- [x] Open Graph and Twitter Card metadata.
- [x] JSON-LD graph: `SportsActivityLocation`, `Organization`, `WebSite`, `WebPage`.
- [x] Postal address, telephone and supplied official Instagram profile in business data.
- [x] Weekly opening hours from the club's published website; no coordinates added.
- [x] XML sitemap lists only the canonical, indexable homepage.
- [x] Robots file allows crawling and references the sitemap.
- [x] Hero image preload and font preconnect.
- [x] Existing below-the-fold content images use lazy loading.
- [x] Existing responsive stylesheet and semantic HTML preserved.
- [x] No review or aggregate-rating markup.
- [x] Custom `404.html` added and excluded from the sitemap.

## Hosting / deployment checks still required
- [ ] Configure HTTPS and redirect HTTP to HTTPS at the hosting/CDN layer.
- [ ] Choose one hostname (`https://infinityclubjaipur.in/` is canonical) and redirect `www` to apex, or vice versa if the owner chooses another canonical host.
- [ ] Confirm the deployed homepage returns HTTP 200 and `404.html` returns HTTP 404 for unknown routes (host configuration required).
- [ ] Enable Brotli/Gzip and long-lived caching for versioned static assets where supported.
- [ ] Check all external image hosts and confirm reuse permission; replace illustrative pool/yoga/Zumba/martial-arts images with club-owned or licensed images.
- [ ] Run Lighthouse / PageSpeed Insights on the deployed site and address real LCP, INP and CLS findings.
- [ ] Validate JSON-LD with Schema.org Validator and Google Rich Results Test.
- [ ] Check mobile layout and keyboard accessibility after deployment.

## Performance targets (not guarantees)
- LCP: <= 2.5 seconds
- INP: <= 200 milliseconds
- CLS: <= 0.1

## Not implemented by design
- Dedicated service landing pages: insufficient unique verified content in the supplied project.
- Breadcrumb markup: there is only one indexable page.
- Service schema and FAQ schema: no separate service pages or dedicated visible FAQ content currently exist.
- GeoCoordinates: not verified.
- AggregateRating / Review: intentionally omitted.
