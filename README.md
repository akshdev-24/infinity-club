# Infinity Club Jaipur — Refined Website

A responsive, single-page premium fitness and recreation website built with HTML5, CSS3 and vanilla JavaScript. The design follows the supplied FitAura reference: warm cream sections, charcoal hero/footer, champagne-gold accents, editorial serif headlines, asymmetrical photo cards and premium membership panels.

## Run locally

No build step or package installation is required.

1. Extract the ZIP.
2. Open a terminal in the `infinity-club` folder.
3. Start a static server:
   ```bash
   python -m http.server 8000
   ```
4. Visit `http://localhost:8000`.

## Enquiry popup and backend configuration

The enquiry popup is implemented with:
- Open triggers across Join Now, Enquire Now, Get Started-equivalent CTAs, Membership Enquiry, Book Your Visit, Contact Us and programme cards.
- Activity preselection for Gym Membership, Swimming Classes, Cricket Turf / Box Cricket, Yoga, Zumba, Martial Arts and Personal Fitness.
- Required name, 10-digit Indian mobile number, activity, preferred contact time and consent; optional message.
- Escape, close icon, outside click, background scroll lock, focus return and keyboard focus trapping.
- A success message ONLY after an HTTP 2xx response from a configured endpoint.
- A clear unconfigured/error state that says the enquiry was not sent and provides the phone fallback.

### Configure a real endpoint

Edit `js/config.js`:

```js
window.INFINITY_CONFIG = {
  enquiryEndpoint: "https://YOUR-HTTPS-ENDPOINT.example/api/enquiries",
  requestTimeoutMs: 12000
};
```

The endpoint must:
1. Accept `POST` with `Content-Type: application/json`.
2. Allow the website's origin through CORS.
3. Validate and securely store/forward the enquiry server-side.
4. Return a `2xx` HTTP status only after the enquiry has actually been accepted/saved.
5. Never require a private API secret to be embedded in browser JavaScript.

Expected JSON fields: `fullName`, `mobileNumber`, `interestedIn`, `preferredContactTime`, `message`, `consent`, `source`, `submittedAt`.

You can use your own API, a Cloudflare Worker connected to a secure destination, or a reputable form service that supports JSON POST and CORS. Configure any provider-side notification destination securely in that service. No email address has been assumed, no WhatsApp integration is enabled, and no form is falsely marked as delivered when the endpoint is blank or fails.

Until configured, the form will validate input and then show a truthful “submission not available” panel with a working `tel:` fallback to **+91 89550 12924**.

## Photography: authentic images and placeholders

Publicly indexed venue-specific photos were found for:
- **Gym interior:** Trip.com Infinity Club listing image (`https://ak-d.tripcdn.com/images/0HJ0a12000irgfm3685BE.jpg`).
- **Box cricket turf:** Playo Infinity Club venue image (`https://playo.gumlet.io/INFINITYCLUBBOXCRICKET20250304165412926236/InfinityClubBoxCricket1751003423590.jpeg`).

The official Instagram account and Google Business Profile could not be accessed for original downloadable photo files in this build. No login-restricted content was accessed and no Google thumbnail URLs were hotlinked. The swimming pool, yoga, Zumba and martial arts imagery is temporary illustrative Unsplash photography and is explicitly identified in alt text/captions where used. Replace these before launch so visitors are not led to believe they depict the actual club.

### Replace images

`assets/images.js` is the central image reference list. The static page currently uses direct image URLs in `index.html` and the hero background in `css/style.css`; update those references as well when changing to local images.

Recommended local image filenames (folder: `assets/images/`):
- `hero.jpg` — wide authentic gym / club hero
- `gym.jpg` — actual gym interior
- `swimming-pool.jpg` — actual Infinity Club swimming pool
- `cricket-turf.jpg` — actual box cricket turf
- `yoga.jpg` — actual yoga session
- `zumba.jpg` — actual Zumba / group activity
- `martial-arts.jpg` — actual martial arts class
- `trainers.jpg` — approved trainer photograph
- `club-interior.jpg` — club interior / common areas

Place approved photos in `assets/images/`, update the corresponding `src` values in `assets/images.js`, and replace the matching `src` values in `index.html` plus `.hero-photo` in `css/style.css`. Add descriptive alt text. Only use photos owned by Infinity Club or cleared for reuse.

## Business details

The supplied business name, address, phone, Instagram, 4.8/5 rating and 837 review count are included. Opening information is shown as “Open until 10:00 PM” with a reminder to confirm. Membership cards say “Contact for Pricing”; no unprovided membership prices or benefits are invented.

## SEO / launch checklist

- Replace `https://www.example.com/` in canonical, Open Graph and sitemap URLs with the final production domain.
- Update `og:image` and `twitter:image` to the final absolute social image URL.
- Confirm current opening hours, programme availability, sauna availability, membership inclusions and prices with the club.
- Replace illustrative photos with approved club photographs.
- Configure and test the enquiry endpoint from a deployed domain.
- Validate structured data with Google Rich Results Test and submit the sitemap in Search Console.
- Check the live site at 1920, 1366, 768, 430 and 375 px widths.

## Cloudflare Pages deployment

This is a static project:
1. Upload the `infinity-club` folder to a Git repository or use Cloudflare Pages Direct Upload.
2. Build command: leave blank.
3. Build output directory: `/` (project root).
4. Deploy.
5. Configure the enquiry endpoint in `js/config.js` and ensure the endpoint allows your deployed domain in CORS.

## Project structure

```text
infinity-club/
├── index.html
├── README.md
├── sitemap.xml
├── robots.txt
├── assets/
│   ├── images.js
│   ├── images/
│   │   └── README.md
│   ├── logo.svg
│   ├── favicon.svg
│   └── og-image.svg
├── css/
│   └── style.css
└── js/
    ├── config.js
    └── main.js
```
