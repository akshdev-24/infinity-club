// Enquiry endpoint configuration.
// Set endpoint to your HTTPS form/API endpoint before enabling online submissions.
// The endpoint must accept a JSON POST and return a 2xx response only after saving the enquiry.
// Example compatible services: your own API, a Cloudflare Worker, or a configured form provider.
window.INFINITY_CONFIG = {
  enquiryEndpoint: "",
  // Optional bearer token is intentionally not supported here; never expose private API secrets
  // in browser JavaScript. Authenticate securely on your server/Worker instead.
  requestTimeoutMs: 12000
};
