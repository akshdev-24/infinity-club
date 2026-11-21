# Google Search Console Setup Guide

1. Visit https://search.google.com/search-console/ and sign in with the account that should own the property.
2. Choose **Domain** property and enter `infinityclubjaipur.in` without `https://` or a path.
3. Copy the TXT verification record supplied by Search Console into the domain's DNS settings. Keep it in place after verification.
4. Wait for DNS propagation, then click **Verify** in Search Console. If the domain is managed by a registrar/Cloudflare, add the TXT record in that provider's DNS panel.
5. After verification, open **Sitemaps** and submit `https://infinityclubjaipur.in/sitemap.xml`.
6. Open **URL Inspection**, enter `https://infinityclubjaipur.in/`, run the live test and request indexing if the page is accessible and indexable.
7. Inspect important section URLs only as anchors on the homepage (for example `/#programs`); these are not separate canonical pages. Request indexing for the homepage, not each fragment.
8. Monitor **Page indexing** for discovered, crawled, indexed, excluded and error URLs.
9. Monitor **Core Web Vitals** on mobile and desktop. Use PageSpeed Insights for individual URL diagnostics.
10. Check HTTPS, manual actions, security issues and crawl stats periodically.

Google decides whether and when to crawl and index pages. Sitemap submission and indexing requests are signals, not guarantees.
