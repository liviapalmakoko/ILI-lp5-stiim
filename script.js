(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Entrada suave, executada uma única vez. */
  var revealItems = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  }

  /* Menu mobile. */
  var menuButton = document.getElementById('menuButton');
  var mainNav = document.getElementById('mainNav');
  var siteHeader = document.getElementById('siteHeader');

  function updateHeader() {
    if (siteHeader) siteHeader.classList.toggle('is-scrolled', window.scrollY > 28);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  function closeMenu() {
    if (!menuButton || !mainNav) return;
    menuButton.classList.remove('is-open');
    mainNav.classList.remove('is-open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
  }

  if (menuButton && mainNav) {
    menuButton.addEventListener('click', function () {
      var open = !mainNav.classList.contains('is-open');
      mainNav.classList.toggle('is-open', open);
      menuButton.classList.toggle('is-open', open);
      menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') closeMenu();
    });
  }

  /* Diagrama glass interativo do mecanismo de ação. */
  var mechanismExpansion = document.querySelector('[data-mechanism-expansion]');

  if (mechanismExpansion) {
    var mechanismTabs = Array.prototype.slice.call(mechanismExpansion.querySelectorAll('[role="tab"]'));
    var mechanismPanels = Array.prototype.slice.call(mechanismExpansion.querySelectorAll('[role="tabpanel"]'));
    var mechanismTimer = null;
    var mechanismAutoplayAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function activateMechanism(index, moveFocus) {
      mechanismTabs.forEach(function (tab) {
        var active = Number(tab.getAttribute('data-mechanism-index')) === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
      });

      mechanismPanels.forEach(function (panel) {
        panel.hidden = Number(panel.getAttribute('data-mechanism-panel')) !== index;
      });

      if (moveFocus) {
        var activeTab = mechanismTabs.find(function (tab) {
          return Number(tab.getAttribute('data-mechanism-index')) === index;
        });
        if (activeTab) activeTab.focus();
      }
    }

    function stopMechanismAutoplay() {
      if (mechanismTimer) window.clearInterval(mechanismTimer);
      mechanismTimer = null;
    }

    function startMechanismAutoplay() {
      stopMechanismAutoplay();
      if (!mechanismAutoplayAllowed || document.hidden) return;

      mechanismTimer = window.setInterval(function () {
        var activeTab = mechanismTabs.find(function (tab) {
          return tab.getAttribute('aria-selected') === 'true';
        });
        var activeIndex = activeTab ? Number(activeTab.getAttribute('data-mechanism-index')) : 0;
        activateMechanism((activeIndex + 1) % mechanismTabs.length, false);
      }, 4200);
    }

    mechanismTabs.forEach(function (tab) {
      var index = Number(tab.getAttribute('data-mechanism-index'));
      tab.addEventListener('mouseenter', function () { activateMechanism(index, false); });
      tab.addEventListener('focus', function () { activateMechanism(index, false); });
      tab.addEventListener('click', function () { activateMechanism(index, false); });
      tab.addEventListener('keydown', function (event) {
        var targetIndex = index;
        if (event.key === 'ArrowRight' || event.key === 'ArrowDown') targetIndex = (index + 1) % mechanismTabs.length;
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') targetIndex = (index - 1 + mechanismTabs.length) % mechanismTabs.length;
        else if (event.key === 'Home') targetIndex = 0;
        else if (event.key === 'End') targetIndex = mechanismTabs.length - 1;
        else return;

        event.preventDefault();
        activateMechanism(targetIndex, true);
      });
    });

    mechanismExpansion.addEventListener('mouseenter', stopMechanismAutoplay);
    mechanismExpansion.addEventListener('mouseleave', startMechanismAutoplay);
    mechanismExpansion.addEventListener('focusin', stopMechanismAutoplay);
    mechanismExpansion.addEventListener('focusout', function (event) {
      if (!mechanismExpansion.contains(event.relatedTarget)) startMechanismAutoplay();
    });
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stopMechanismAutoplay();
      else startMechanismAutoplay();
    });

    startMechanismAutoplay();
  }

  /* Curvas interativas de distribuição e degradação. */
  var particleDistribution = document.querySelector('[data-particle-distribution]');

  if (particleDistribution) {
    var distributionTriggers = Array.prototype.slice.call(particleDistribution.querySelectorAll('[data-distribution-series]'));
    var distributionPanels = Array.prototype.slice.call(particleDistribution.querySelectorAll('[data-distribution-panel]'));

    function activateDistribution(series) {
      particleDistribution.setAttribute('data-active-series', series);

      distributionTriggers.forEach(function (trigger) {
        trigger.setAttribute('aria-pressed', trigger.getAttribute('data-distribution-series') === series ? 'true' : 'false');
      });

      distributionPanels.forEach(function (panel) {
        panel.hidden = panel.getAttribute('data-distribution-panel') !== series;
      });
    }

    distributionTriggers.forEach(function (trigger) {
      trigger.addEventListener('mouseenter', function () {
        activateDistribution(trigger.getAttribute('data-distribution-series'));
      });
      trigger.addEventListener('click', function () {
        activateDistribution(trigger.getAttribute('data-distribution-series'));
      });

      if (trigger.tagName.toLowerCase() !== 'button') {
        trigger.addEventListener('focus', function () {
          activateDistribution(trigger.getAttribute('data-distribution-series'));
        });
        trigger.addEventListener('keydown', function (event) {
          if (event.key !== 'Enter' && event.key !== ' ') return;
          event.preventDefault();
          activateDistribution(trigger.getAttribute('data-distribution-series'));
        });
      }
    });

    activateDistribution('stiim');
  }

  /* Pontos anatômicos sincronizados com as áreas de aplicação. */
  var applicationMap = document.querySelector('[data-application-map]');

  if (applicationMap) {
    var applicationSection = applicationMap.closest('.application');
    var applicationTriggers = Array.prototype.slice.call(applicationSection.querySelectorAll('[data-application-index]'));

    function activateApplication(index) {
      applicationTriggers.forEach(function (trigger) {
        var active = Number(trigger.getAttribute('data-application-index')) === index;
        trigger.classList.toggle('is-active', active);
        trigger.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }

    applicationTriggers.forEach(function (trigger) {
      var index = Number(trigger.getAttribute('data-application-index'));
      trigger.addEventListener('mouseenter', function () { activateApplication(index); });
      trigger.addEventListener('focus', function () { activateApplication(index); });
      trigger.addEventListener('click', function () { activateApplication(index); });
    });

    activateApplication(0);
  }

  /* Comparador de concentração: arraste, toque ou setas do teclado. */
  document.querySelectorAll('[data-concentration-slider]').forEach(function (slider) {
    var input = slider.querySelector('input[type="range"]');
    var resetFrame = null;
    var currentValue = Number(input ? input.value : 50);
    if (!input) return;

    function updateConcentrationSlider(value) {
      currentValue = typeof value === 'number' ? value : Number(input.value);
      slider.style.setProperty('--split', currentValue + '%');
      input.setAttribute('aria-valuetext', currentValue < 40 ? 'Predomínio da menor concentração' : currentValue > 60 ? 'Predomínio da maior concentração' : 'Comparação equilibrada');
    }

    function cancelConcentrationReset() {
      window.cancelAnimationFrame(resetFrame);
      resetFrame = null;
    }

    function returnConcentrationToCenter() {
      var startValue = currentValue;
      if (startValue === 50) return;

      if (reduceMotion) {
        input.value = '50';
        updateConcentrationSlider();
        return;
      }

      var startedAt = performance.now();
      var duration = 1900;

      function animate(now) {
        var progress = Math.min((now - startedAt) / duration, 1);
        var easedProgress = progress * progress * (3 - 2 * progress);
        updateConcentrationSlider(startValue + (50 - startValue) * easedProgress);

        if (progress < 1) resetFrame = window.requestAnimationFrame(animate);
        else {
          input.value = '50';
          updateConcentrationSlider();
          resetFrame = null;
        }
      }

      resetFrame = window.requestAnimationFrame(animate);
    }

    input.addEventListener('pointerdown', function () {
      cancelConcentrationReset();
      input.value = String(currentValue);
    });
    input.addEventListener('input', function () {
      cancelConcentrationReset();
      updateConcentrationSlider();
    });
    input.addEventListener('change', returnConcentrationToCenter);
    updateConcentrationSlider();
  });

  /* Evidências organizadas por marcos cronológicos. */
  var evidenceTimeline = document.querySelector('[data-evidence-timeline]');

  if (evidenceTimeline) {
    var timelineTabs = Array.prototype.slice.call(evidenceTimeline.querySelectorAll('[role="tab"]'));
    var timelinePanels = Array.prototype.slice.call(evidenceTimeline.querySelectorAll('[role="tabpanel"]'));
    var timelineMilestones = Array.prototype.slice.call(evidenceTimeline.querySelectorAll('.timeline-milestone'));

    function activateTimeline(index, moveFocus) {
      var timelineNav = evidenceTimeline.querySelector('.timeline-nav');
      var activePosition = Number(timelineTabs[index].getAttribute('data-timeline-position'));
      timelineNav.style.setProperty('--timeline-index', activePosition);

      timelineTabs.forEach(function (tab, tabIndex) {
        var active = tabIndex === index;
        tab.setAttribute('aria-selected', active ? 'true' : 'false');
        tab.setAttribute('tabindex', active ? '0' : '-1');
        tab.classList.toggle('is-past', Number(tab.getAttribute('data-timeline-position')) < activePosition);
      });

      timelineMilestones.forEach(function (milestone) {
        milestone.classList.toggle('is-reached', Number(milestone.getAttribute('data-timeline-position')) < activePosition);
      });

      timelinePanels.forEach(function (panel, panelIndex) {
        var active = panelIndex === index;
        panel.hidden = !active;
        panel.classList.toggle('is-active', active);
      });

      if (moveFocus) timelineTabs[index].focus();
      timelineTabs[index].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }

    timelineTabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { activateTimeline(index, false); });
      tab.addEventListener('keydown', function (event) {
        var targetIndex = index;
        if (event.key === 'ArrowRight') targetIndex = (index + 1) % timelineTabs.length;
        else if (event.key === 'ArrowLeft') targetIndex = (index - 1 + timelineTabs.length) % timelineTabs.length;
        else if (event.key === 'Home') targetIndex = 0;
        else if (event.key === 'End') targetIndex = timelineTabs.length - 1;
        else return;

        event.preventDefault();
        activateTimeline(targetIndex, true);
      });
    });
  }

  /* UTMs persistem por 30 dias. */
  function getUtmData() {
    try {
      var query = new URLSearchParams(window.location.search);
      var current = {};
      ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach(function (key) {
        var value = query.get(key);
        if (value) current[key] = value;
      });

      if (Object.keys(current).length) {
        localStorage.setItem('stiim_utm', JSON.stringify({ value: current, savedAt: Date.now() }));
      }

      var saved = localStorage.getItem('stiim_utm');
      if (!saved) return {};
      var parsed = JSON.parse(saved);
      return Date.now() - parsed.savedAt < 30 * 864e5 ? parsed.value : {};
    } catch (error) {
      return {};
    }
  }

  /* Formulário RD Station. Falhas não são mais exibidas como sucesso. */
  var RD_TOKEN = '61d98fcb65995325460b68f98e0995fe';
  var FORM_ID = 'lp-stiim';
  var form = document.getElementById('leadForm');
  var success = document.getElementById('formSuccess');
  var formError = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      formError.hidden = true;

      if (!form.checkValidity()) {
        formError.textContent = 'Confira os campos obrigatórios para continuar.';
        formError.hidden = false;
        var invalidField = form.querySelector(':invalid');
        if (invalidField) invalidField.focus();
        return;
      }

      var submitButton = form.querySelector('button[type="submit"]');
      var originalLabel = submitButton.innerHTML;
      submitButton.disabled = true;
      submitButton.textContent = 'Enviando...';

      var data = new FormData(form);
      var payload = {
        token_rdstation: RD_TOKEN,
        identificador: FORM_ID,
        nome: data.get('nome'),
        email: data.get('email'),
        telefone: data.get('telefone'),
        cf_cpf_cnpj: data.get('cpf_cnpj') || '',
        cf_numero_do_registro: data.get('registro'),
        cf_especialidade: data.get('especialidade'),
        cidade: data.get('cidade'),
        estado: data.get('estado')
      };

      var utmData = getUtmData();
      Object.keys(utmData).forEach(function (key) { payload[key] = utmData[key]; });

      fetch('https://www.rdstation.com.br/api/1.3/conversions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(function (response) {
        if (!response.ok) throw new Error('Falha no envio');
        form.hidden = true;
        success.hidden = false;
        success.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });

        try {
          if (window.fbq) window.fbq('track', 'Lead');
          (window.dataLayer = window.dataLayer || []).push({ event: 'lead', form: FORM_ID });
        } catch (trackingError) { /* O lead já foi enviado. */ }
      }).catch(function () {
        formError.textContent = 'Não foi possível enviar agora. Tente novamente em instantes.';
        formError.hidden = false;
        submitButton.disabled = false;
        submitButton.innerHTML = originalLabel;
      });
    });
  }

  /* Tracking ILIKIA e preferências de cookies. */
  (function () {
    var COOKIE_KEY = 'ilikia_cookie_consent';
    var trackingLoaded = false;
    var banner = document.getElementById('cookieBanner');
    var acceptButton = document.getElementById('cookieAccept');
    var rejectButton = document.getElementById('cookieReject');

    function readConsent() {
      try { return localStorage.getItem(COOKIE_KEY); } catch (error) { return null; }
    }

    function saveConsent(value) {
      try { localStorage.setItem(COOKIE_KEY, value); } catch (error) { /* Sem armazenamento. */ }
    }

    function loadTracking() {
      if (trackingLoaded) return;
      trackingLoaded = true;

      var rdScript = document.createElement('script');
      rdScript.async = true;
      rdScript.src = 'https://d335luupugsy2.cloudfront.net/js/loader-scripts/2056125a-72c4-4ead-8cb4-bb42c603b2fe-loader.js';
      document.head.appendChild(rdScript);

      var gatewayScript = document.createElement('script');
      gatewayScript.async = true;
      gatewayScript.src = 'https://track-ilikia.koko.ag/t.js';
      document.head.appendChild(gatewayScript);
    }

    function showBanner() {
      if (!banner) return;
      banner.hidden = false;
      window.requestAnimationFrame(function () { banner.classList.add('is-visible'); });
    }

    function hideBanner() {
      if (!banner) return;
      banner.classList.remove('is-visible');
      window.setTimeout(function () { banner.hidden = true; }, 260);
    }

    var consent = readConsent();
    if (consent !== 'denied') loadTracking();
    if (!consent) showBanner();

    if (acceptButton) {
      acceptButton.addEventListener('click', function () {
        saveConsent('granted');
        hideBanner();
        loadTracking();
      });
    }

    if (rejectButton) {
      rejectButton.addEventListener('click', function () {
        saveConsent('denied');
        window.location.reload();
      });
    }

    document.querySelectorAll('[data-cookie-prefs]').forEach(function (button) {
      button.addEventListener('click', showBanner);
    });
  })();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
