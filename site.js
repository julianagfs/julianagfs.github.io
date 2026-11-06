const pageCounter = document.querySelector('[data-page-counter]');
if (pageCounter) {
  const badge = pageCounter.querySelector('img');
  const statisticsLink = pageCounter.querySelector('a');
  const status = pageCounter.querySelector('[data-counter-status]');
  // Only the published home page records views. Local previews never load the badge.
  const isPublishedSite = window.location.protocol === 'https:'
    && window.location.hostname === 'julianagfs.github.io'
    && ['/', '/index.html'].includes(window.location.pathname);
  if (isPublishedSite) {
    status.textContent = 'Loading page views…';
    const slowLoad = window.setTimeout(() => {
      status.textContent = 'Page views temporarily unavailable';
    }, 10000);
    badge.addEventListener('load', () => {
      window.clearTimeout(slowLoad);
      statisticsLink.hidden = false;
      status.hidden = true;
    }, { once: true });
    badge.addEventListener('error', () => {
      window.clearTimeout(slowLoad);
      statisticsLink.hidden = true;
      status.hidden = false;
      status.textContent = 'Page views temporarily unavailable';
    }, { once: true });
    badge.src = 'https://hits.sh/julianagfs.github.io.svg?label=Page%20views&color=%2324476A&labelColor=%23203247&style=flat-square';
  }
}
