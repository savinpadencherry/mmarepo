/* ════════════════════════════════════════════════════════════════════════
   MMA Design — Site Configuration
   Central place for deployment-dependent settings. Edit these after AWS
   deployment — the enquiry form reads API_ENDPOINT to know where to POST.
   Loaded as a classic script before each page's own logic.
   ════════════════════════════════════════════════════════════════════════ */
var SITE_CONFIG = {
  // API Gateway endpoint for lead capture. Replace placeholder after deploy.
  // Leave empty to keep the form in "demo mode" (shows success without sending).
  API_ENDPOINT: '',

  // Where enquiry emails are sent (SES verified identity).
  NOTIFY_EMAIL: 'enquiries@mmadesign.in',

  // Google Analytics / Tag Manager (leave empty until MMA provides IDs).
  GA_ID: '',

  // Office locations — replace placeholder addresses with real ones.
  offices: [
    { city: 'NCR',     address: 'MMA Design Pvt. Ltd.\nNew Delhi, NCR Region',     phone: '+91 — — — — — — — —' },
    { city: 'Mumbai',  address: 'MMA Design Pvt. Ltd.\nMumbai, Maharashtra',       phone: '+91 — — — — — — — —' },
    { city: 'Pune',    address: 'Plot No. 2, 150/7, Jaideep Bungalow\nPrathamesh Park, Baner, Pune 411045', phone: '+91 — — — — — — — —' },
    { city: 'Chennai', address: 'MMA Design Pvt. Ltd.\nChennai, Tamil Nadu',       phone: '+91 — — — — — — — —' },
    { city: 'Bangalore', address: 'MMA Design Pvt. Ltd.\nBangalore, Karnataka',   phone: '+91 — — — — — — — —' }
  ],

  // Social links (replace # with real URLs)
  social: {
    instagram: '#',
    linkedin: '#',
    pinterest: '#'
  }
};
