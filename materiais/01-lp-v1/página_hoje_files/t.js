/* =============================================================================
 * trk — lib de tracking client global (ILIKIA / AICONIQ)
 * Carregada por todas as LPs. Config por página em window.__TRK__:
 *   { brand:'aiconiq', pixelId:'...', ga4Id:'', collect:'https://track-ilikia.koko.ag/collect' }
 *
 * Faz: Meta Pixel + GA4 (gtag) no client, captura UTM/click-ids,
 *      e espelha cada evento pro gateway (CAPI + GA4 MP) com MESMO event_id (dedupe).
 * GA4 só ativa quando ga4Id estiver preenchido.
 * ============================================================================= */
(function () {
  'use strict';
  var cfg = window.__TRK__ || {};
  if (!cfg.brand || !cfg.collect) { console.warn('[trk] config ausente (window.__TRK__)'); return; }

  // ---- helpers ----
  function cookie(name) { var m = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)'); return m ? decodeURIComponent(m.pop()) : ''; }
  function uuid() { return (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : ('e-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10)); }
  function qp(name) { try { return new URLSearchParams(location.search).get(name) || ''; } catch (e) { return ''; } }

  // ---- captura de atribuição (1ª visita da sessão) ----
  var ATTR_KEY = 'trk_attr';
  (function captureAttribution() {
    try {
      if (sessionStorage.getItem(ATTR_KEY)) return;
      var a = {
        utm_source: qp('utm_source'), utm_medium: qp('utm_medium'), utm_campaign: qp('utm_campaign'),
        utm_term: qp('utm_term'), utm_content: qp('utm_content'),
        gclid: qp('gclid'), fbclid: qp('fbclid'),
        referrer: document.referrer || '', landing_page: location.href
      };
      sessionStorage.setItem(ATTR_KEY, JSON.stringify(a));
    } catch (e) {}
  })();
  function attribution() { try { return JSON.parse(sessionStorage.getItem(ATTR_KEY) || '{}'); } catch (e) { return {}; } }

  // ---- ids de matching ----
  function fbp() { return cookie('_fbp'); }
  function fbc() {
    var c = cookie('_fbc');
    if (c) return c;
    var fbclid = qp('fbclid') || (attribution().fbclid || '');
    return fbclid ? ('fb.1.' + Date.now() + '.' + fbclid) : '';
  }
  function gaClientId() {
    var ga = cookie('_ga'); // GA1.1.XXXXXXXXX.YYYYYYYYY
    if (!ga) return '';
    var p = ga.split('.');
    return p.length >= 4 ? p[2] + '.' + p[3] : '';
  }

  // ---- Meta Pixel bootstrap ----
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
    if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
    t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  if (cfg.pixelId) fbq('init', cfg.pixelId);

  // ---- GA4 (gtag) bootstrap — só se houver ga4Id ----
  var hasGA4 = !!cfg.ga4Id;
  if (hasGA4) {
    var g = document.createElement('script'); g.async = true;
    g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4Id);
    document.head.appendChild(g);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', cfg.ga4Id);
  } else {
    window.dataLayer = window.dataLayer || [];
  }

  // ---- envio pro gateway (server-side) ----
  function collect(payload) {
    try {
      var body = JSON.stringify(payload);
      if (navigator.sendBeacon) {
        navigator.sendBeacon(cfg.collect, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(cfg.collect, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
      }
    } catch (e) {}
  }

  // ---- API pública ----
  // trk.track(eventName, { custom: {...}, user: {email,phone,fn,ln,ct,st,zip,external_id}, ga: {...} })
  function splitName(full) { var s = String(full || '').trim(); if (!s) return ['', '']; var i = s.indexOf(' '); return i < 0 ? [s, ''] : [s.slice(0, i), s.slice(i + 1)]; }

  function track(eventName, opts) {
    opts = opts || {};
    var eid = opts.event_id || uuid();
    var custom = opts.custom || {};
    var user = opts.user || {};
    var a = attribution();

    // 0) Advanced Matching no browser (Pixel hasheia client-side) — sobe o Event Match Quality
    if (window.fbq && cfg.pixelId && (user.email || user.phone)) {
      var nm = splitName(user.fn);
      var am = { country: user.country || 'br' };
      if (user.email) am.em = user.email;
      if (user.phone) am.ph = user.phone;
      if (nm[0]) am.fn = nm[0];
      if (nm[1]) am.ln = nm[1];
      if (user.ct) am.ct = user.ct;
      if (user.st) am.st = user.st;
      if (user.zip) am.zp = user.zip;
      if (user.external_id || user.email) am.external_id = user.external_id || user.email;
      try { fbq('init', cfg.pixelId, am); } catch (e) {}
    }

    // 1) Pixel (browser) com eventID p/ dedupe
    if (window.fbq) { try { fbq('track', eventName, custom, { eventID: eid }); } catch (e) {} }

    // 2) GA4 (browser) — pula PageView: o gtag('config') já envia o page_view padrão,
    //    então disparar 'pageview' aqui só criava um evento custom redundante no GA4.
    if (hasGA4 && window.gtag && eventName !== 'PageView') {
      try { gtag('event', (eventName === 'Lead' ? 'generate_lead' : eventName.toLowerCase()), Object.assign({}, custom, opts.ga || {})); } catch (e) {}
    }

    // 3) Server mirror (CAPI + GA4 MP) com MESMO event_id
    collect({
      brand: cfg.brand,
      event_name: eventName,
      event_id: eid,
      event_source_url: location.href,
      email: user.email, phone: user.phone, fn: user.fn, ln: user.ln,
      ct: user.ct, st: user.st, zip: user.zip, country: user.country || 'br',
      external_id: user.external_id || user.email,
      fbp: fbp(), fbc: fbc(), ga_client_id: gaClientId(),
      custom_data: custom,
      ga_params: opts.ga || {},
      attribution: { utm_source: a.utm_source, utm_medium: a.utm_medium, utm_campaign: a.utm_campaign, utm_term: a.utm_term, utm_content: a.utm_content, gclid: a.gclid, fbclid: a.fbclid }
    });
    return eid;
  }

  function lead(user, custom) { return track('Lead', { user: user || {}, custom: custom || {} }); }

  window.trk = { track: track, lead: lead, attribution: attribution, gaClientId: gaClientId, _cfg: cfg };

  // ---- PageView automático (Pixel + CAPI dedupe) ----
  track('PageView', {});
})();
