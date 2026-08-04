/* ==========================================================================
   STIIM by ILIKIA — LP 05
   Movimento acionado por scroll e por hover/clique. Nenhuma animação em loop.
   ========================================================================== */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Reveal por scroll ---------- */
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var sibs = Array.prototype.slice.call(e.target.parentNode.children).filter(function (n) {
          return n.classList && n.classList.contains('reveal');
        });
        e.target.style.transitionDelay = Math.min(sibs.indexOf(e.target), 6) * 70 + 'ms';
        e.target.classList.add('in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Nav ---------- */
  var nav = document.getElementById('nav'), tog = document.getElementById('navTog');
  if (tog) {
    tog.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      tog.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nav-links a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('is-open');
        tog.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Números grandes: passa automático, pausa no hover ---------- */
  (function () {
    var root = document.getElementById('bigNums');
    if (!root) return;
    var items = root.querySelectorAll('.hn');
    var dots = root.querySelector('.hn-dots');
    if (!items.length || !dots) return;
    var i = 0, timer = null, delay = parseInt(root.dataset.auto, 10) || 3800, paused = false;

    items.forEach(function (_, n) {
      var b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Resultado ' + (n + 1));
      if (n === 0) b.classList.add('is-on');
      b.addEventListener('click', function () { go(n); restart(); });
      dots.appendChild(b);
    });
    var btns = dots.querySelectorAll('button');

    function go(n) {
      i = (n + items.length) % items.length;
      items.forEach(function (el, k) { el.classList.toggle('is-on', k === i); });
      btns.forEach(function (el, k) {
        el.classList.toggle('is-on', k === i);
        el.setAttribute('aria-selected', k === i ? 'true' : 'false');
      });
    }
    function restart() { clearInterval(timer); if (!reduce) timer = setInterval(function () { if (!paused) go(i + 1); }, delay); }
    root.addEventListener('mouseenter', function () { paused = true; });
    root.addEventListener('mouseleave', function () { paused = false; });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { e.isIntersecting ? restart() : clearInterval(timer); });
      }, { threshold: 0.25 }).observe(root);
    } else { restart(); }
  })();

  /* ---------- Mecanismo: ao focar uma fase, as outras recuam ---------- */
  (function () {
    var tl = document.getElementById('fases');
    if (!tl) return;
    var items = tl.querySelectorAll('.tl-i');
    function set(el) {
      items.forEach(function (c) { c.classList.toggle('is-on', c === el); });
      tl.classList.add('has-on');
    }
    items.forEach(function (c) {
      c.addEventListener('mouseenter', function () { set(c); });
      c.addEventListener('click', function () { set(c); });
    });
    tl.addEventListener('mouseleave', function () {
      tl.classList.remove('has-on');
      items.forEach(function (c, k) { c.classList.toggle('is-on', k === 0); });
    });
  })();

  /* ---------- Aplicação: marcador na foto e lista sincronizados ---------- */
  (function () {
    var list = document.getElementById('indic');
    var marks = document.getElementById('kvMarks');
    if (!list) return;
    var rows = list.querySelectorAll('.area');
    var kms = marks ? marks.querySelectorAll('.km') : [];
    function set(n) {
      rows.forEach(function (r) { r.classList.toggle('is-on', +r.dataset.i === n); });
      kms.forEach(function (m) { m.classList.toggle('is-on', +m.dataset.i === n); });
    }
    set(0);
    function bind(el) {
      el.addEventListener('mouseenter', function () { set(+el.dataset.i); });
      el.addEventListener('click', function () { set(+el.dataset.i); });
      el.addEventListener('focus', function () { set(+el.dataset.i); });
    }
    rows.forEach(bind);
    kms.forEach(bind);
  })();

  /* ---------- Formulário ---------- */
  var RD_TOKEN = '61d98fcb65995325460b68f98e0995fe';
  var IDENT = 'lp-stiim';
  var form = document.getElementById('leadForm');
  var ok = document.getElementById('formOk');
  var err = document.getElementById('formErr');

  function utm() {
    try {
      var q = new URLSearchParams(location.search), out = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (k) {
        var v = q.get(k); if (v) out[k] = v;
      });
      if (Object.keys(out).length) localStorage.setItem('stiim_utm', JSON.stringify({ v: out, t: Date.now() }));
      var s = localStorage.getItem('stiim_utm');
      if (s) {
        var p = JSON.parse(s);
        if (Date.now() - p.t < 30 * 864e5) return p.v;
      }
    } catch (e) { }
    return {};
  }

  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      err.hidden = true;
      if (!form.checkValidity()) {
        err.textContent = 'Confira os campos obrigatórios para continuar.';
        err.hidden = false;
        var bad = form.querySelector(':invalid');
        if (bad) bad.focus();
        return;
      }
      var btn = form.querySelector('button[type=submit]');
      btn.disabled = true;
      btn.textContent = 'Enviando...';

      var d = new FormData(form), payload = {
        token_rdstation: RD_TOKEN,
        identificador: IDENT,
        nome: d.get('nome'),
        email: d.get('email'),
        telefone: d.get('telefone'),
        cf_cpf_cnpj: d.get('cpf_cnpj') || '',
        cf_numero_do_registro: d.get('registro'),
        cf_especialidade: d.get('especialidade'),
        cidade: d.get('cidade'),
        estado: d.get('estado')
      };
      var u = utm();
      Object.keys(u).forEach(function (k) { payload[k] = u[k]; });

      fetch('https://www.rdstation.com.br/api/1.3/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(done).catch(done);

      function done() {
        form.hidden = true;
        ok.hidden = false;
        ok.scrollIntoView({ block: 'center', behavior: reduce ? 'auto' : 'smooth' });
        try {
          if (window.fbq) window.fbq('track', 'Lead');
          (window.dataLayer = window.dataLayer || []).push({ event: 'lead', form: IDENT });
        } catch (e) { }
      }
    });
  }

  var yr = document.getElementById('yr');
  if (yr) yr.textContent = new Date().getFullYear();
})();
