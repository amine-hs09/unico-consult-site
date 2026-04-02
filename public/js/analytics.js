/**
 * Google Analytics 4 - Conditional loading based on cookie consent
 * Only loads GA4 when the user has accepted cookies via the cookie banner.
 */
(function () {
  if (localStorage.getItem('unico-cookies-accepted') !== '1') return;

  // Replace 'G-XXXXXXXXXX' with your real GA4 measurement ID
  var GA_ID = 'G-XXXXXXXXXX';

  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', GA_ID, {
    anonymize_ip: true // RGPD compliance
  });
})();
