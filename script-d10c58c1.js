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

  /* 86ah19vv5 (acessibilidade): no mobile os dois blocos de abas viram sanfona e os
     paineis sao movidos para DENTRO do container. Um role="tablist" so aceita filhos
     role="tab", entao a arvore ficava invalida (o Lighthouse acusava aria-required-children).
     Este helper troca o padrao ARIA junto com o layout: abas no desktop, sanfona no mobile. */
  function aplicarPadraoAria(container, gatilhos, paineis, ehSanfona) {
    if (!container) return;
    if (ehSanfona) {
      container.setAttribute('role', 'group');
      gatilhos.forEach(function (gatilho) {
        gatilho.removeAttribute('role');
        gatilho.removeAttribute('aria-selected');
        gatilho.setAttribute('tabindex', '0');
      });
      paineis.forEach(function (painel) { painel.setAttribute('role', 'region'); });
    } else {
      container.setAttribute('role', 'tablist');
      gatilhos.forEach(function (gatilho) {
        gatilho.setAttribute('role', 'tab');
        gatilho.removeAttribute('aria-expanded');
      });
      paineis.forEach(function (painel) { painel.setAttribute('role', 'tabpanel'); });
    }
  }

  /* Diagrama glass interativo do mecanismo de ação. */
  var mechanismExpansion = document.querySelector('[data-mechanism-expansion]');

  if (mechanismExpansion) {
    var mechanismTabs = Array.prototype.slice.call(mechanismExpansion.querySelectorAll('[role="tab"]'));
    var mechanismPanels = Array.prototype.slice.call(mechanismExpansion.querySelectorAll('[role="tabpanel"]'));
    var mechanismTabsContainer = mechanismExpansion.querySelector('.mechanism-glass-tabs');
    var mechanismDetails = mechanismExpansion.querySelector('.mechanism-details');
    var mechanismMobileQuery = window.matchMedia('(max-width: 520px)');
    var mechanismTimer = null;
    var mechanismAutoplayAllowed = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function activateMechanism(index, moveFocus) {
      var mechanismSanfona = mechanismMobileQuery.matches;
      mechanismTabs.forEach(function (tab) {
        var active = Number(tab.getAttribute('data-mechanism-index')) === index;
        if (mechanismSanfona) {
          tab.setAttribute('aria-expanded', active ? 'true' : 'false');
          tab.setAttribute('tabindex', '0');
        } else {
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
          tab.setAttribute('tabindex', active ? '0' : '-1');
        }
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
      if (!mechanismAutoplayAllowed || mechanismMobileQuery.matches || document.hidden) return;

      mechanismTimer = window.setInterval(function () {
        var activeTab = mechanismTabs.find(function (tab) {
          return tab.getAttribute('aria-selected') === 'true' || tab.getAttribute('aria-expanded') === 'true';
        });
        var activeIndex = activeTab ? Number(activeTab.getAttribute('data-mechanism-index')) : 0;
        activateMechanism((activeIndex + 1) % mechanismTabs.length, false);
      }, 4200);
    }

    function syncMechanismLayout() {
      var activeTab = mechanismTabs.find(function (tab) {
        return tab.getAttribute('aria-selected') === 'true' || tab.getAttribute('aria-expanded') === 'true';
      });
      var activeIndex = activeTab ? Number(activeTab.getAttribute('data-mechanism-index')) : 0;

      aplicarPadraoAria(mechanismTabsContainer, mechanismTabs, mechanismPanels, mechanismMobileQuery.matches);

      if (mechanismMobileQuery.matches && mechanismTabsContainer) {
        mechanismPanels.forEach(function (panel, index) {
          mechanismTabs[index].insertAdjacentElement('afterend', panel);
          panel.classList.add('mechanism-mobile-panel');
        });
      } else if (mechanismDetails) {
        mechanismPanels.forEach(function (panel) {
          mechanismDetails.appendChild(panel);
          panel.classList.remove('mechanism-mobile-panel');
        });
      }

      activateMechanism(activeIndex, false);
      startMechanismAutoplay();
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

    if (typeof mechanismMobileQuery.addEventListener === 'function') {
      mechanismMobileQuery.addEventListener('change', syncMechanismLayout);
    } else if (typeof mechanismMobileQuery.addListener === 'function') {
      mechanismMobileQuery.addListener(syncMechanismLayout);
    }

    syncMechanismLayout();
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
    var timelineNav = evidenceTimeline.querySelector('.timeline-nav');
    var timelineStage = evidenceTimeline.querySelector('.timeline-stage');
    var timelineMobileQuery = window.matchMedia('(max-width: 520px)');
    var timelineHoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    function expandTimelinePanel(index) {
      var tab = timelineTabs[index];
      var panel = timelinePanels[index];
      if (!tab || !panel) return;

      var activePosition = Number(tab.getAttribute('data-timeline-position'));
      timelineNav.style.setProperty('--timeline-index', activePosition);
      timelineTabs.forEach(function (item, itemIndex) {
        if (timelineMobileQuery.matches) item.setAttribute('tabindex', '0');
        else {
          item.setAttribute('aria-selected', itemIndex === index ? 'true' : 'false');
          item.setAttribute('tabindex', itemIndex === index ? '0' : '-1');
        }
        item.classList.toggle('is-past', Number(item.getAttribute('data-timeline-position')) < activePosition);
      });
      timelineMilestones.forEach(function (milestone) {
        milestone.classList.toggle('is-reached', Number(milestone.getAttribute('data-timeline-position')) < activePosition);
      });

      tab.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
      panel.classList.add('is-active');
    }

    function activateTimeline(index, moveFocus, skipScroll) {
      var activePosition = Number(timelineTabs[index].getAttribute('data-timeline-position'));
      timelineNav.style.setProperty('--timeline-index', activePosition);

      var timelineSanfona = timelineMobileQuery.matches;
      timelineTabs.forEach(function (tab, tabIndex) {
        var active = tabIndex === index;
        if (timelineSanfona) {
          tab.setAttribute('aria-expanded', active ? 'true' : 'false');
          tab.setAttribute('tabindex', '0');
        } else {
          tab.setAttribute('aria-selected', active ? 'true' : 'false');
          tab.setAttribute('tabindex', active ? '0' : '-1');
        }
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
      if (!skipScroll) timelineTabs[index].scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest', inline: 'center' });
    }

    function syncTimelineLayout() {
      var activeTab = timelineTabs.find(function (tab) {
        return tab.getAttribute('aria-selected') === 'true' || tab.getAttribute('aria-expanded') === 'true';
      });
      var activeIndex = activeTab ? timelineTabs.indexOf(activeTab) : 0;

      aplicarPadraoAria(timelineNav, timelineTabs, timelinePanels, timelineMobileQuery.matches);

      if (timelineMobileQuery.matches && timelineNav) {
        timelinePanels.forEach(function (panel, index) {
          timelineTabs[index].insertAdjacentElement('afterend', panel);
          panel.classList.add('timeline-mobile-panel');
        });
      } else if (timelineStage) {
        timelinePanels.forEach(function (panel) {
          timelineStage.appendChild(panel);
          panel.classList.remove('timeline-mobile-panel');
        });
      }

      activateTimeline(activeIndex, false, true);
    }

    timelineTabs.forEach(function (tab, index) {
      tab.addEventListener('mouseenter', function () {
        if (timelineHoverQuery.matches && !timelineMobileQuery.matches) activateTimeline(index, false);
      });
      tab.addEventListener('click', function () {
        if (timelineMobileQuery.matches) expandTimelinePanel(index);
        else activateTimeline(index, false);
      });
      tab.addEventListener('keydown', function (event) {
        var targetIndex = index;
        if (event.key === 'ArrowRight') targetIndex = (index + 1) % timelineTabs.length;
        else if (event.key === 'ArrowLeft') targetIndex = (index - 1 + timelineTabs.length) % timelineTabs.length;
        else if (event.key === 'Home') targetIndex = 0;
        else if (event.key === 'End') targetIndex = timelineTabs.length - 1;
        else return;

        event.preventDefault();
        if (timelineMobileQuery.matches) {
          expandTimelinePanel(targetIndex);
          timelineTabs[targetIndex].focus();
        } else activateTimeline(targetIndex, true);
      });
    });

    var timelineRevealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
      if (!timelineMobileQuery.matches) return;
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        expandTimelinePanel(timelineTabs.indexOf(entry.target));
      });
    }, { rootMargin: '-18% 0px -58% 0px', threshold: 0.15 }) : null;

    if (timelineRevealObserver) {
      timelineTabs.forEach(function (tab) { timelineRevealObserver.observe(tab); });
    }

    if (typeof timelineMobileQuery.addEventListener === 'function') {
      timelineMobileQuery.addEventListener('change', syncTimelineLayout);
    } else if (typeof timelineMobileQuery.addListener === 'function') {
      timelineMobileQuery.addListener(syncTimelineLayout);
    }

    syncTimelineLayout();
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

  /* Formulário RD Station. Falhas não são mais exibidas como sucesso.
     30/09/2026: saiu o endpoint legado www.rdstation.com.br/api/1.3/conversions e entrou a
     Conversions API atual (api.rd.services), no mesmo padrão das LPs irmãs (Pluryal, Nano,
     UP Full). O envelope muda (CONVERSION/CDP com o lead em .payload) e os nomes também:
     nome/telefone/cidade/estado/identificador viram name/mobile_phone/city/state/
     conversion_identifier. Os dois formatos não são intercambiáveis. */
  var RD_TOKEN = '61d98fcb65995325460b68f98e0995fe'; // conta ILIKIA, comum às LPs
  var FORM_ID = 'lp-stiim';
  var RD_ENDPOINT = 'https://api.rd.services/platform/conversions?api_key=' + RD_TOKEN;
  // cf_especialidade é lista FECHADA no RD: valor fora dela derruba a conversão inteira
  // com 400 (o lead se perde). As opções do select já são os nomes da lista; o mapa é a
  // trava para quando alguém acrescentar uma opção sem mexer aqui -- cai em "Outro".
  var ESPECIALIDADE_RD = {
    'Dermatologista': 'Dermatologista',
    'Cirurgião Plástico': 'Cirurgião Plástico',
    'Biomédico': 'Biomédico',
    'Farmacêutico': 'Farmacêutico',
    'Cirurgião Dentista': 'Cirurgião Dentista'
  };
  function slugify(v) { return String(v || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
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
      var utm = getUtmData();
      var especialidade = String(data.get('especialidade') || '');
      var estado = String(data.get('estado') || '');
      var registro = String(data.get('registro') || '').trim();
      var lead = {
        conversion_identifier: FORM_ID,
        name: String(data.get('nome') || '').trim(),
        email: String(data.get('email') || '').trim(),
        mobile_phone: '+55' + String(data.get('telefone') || '').replace(/\D/g, ''),
        city: String(data.get('cidade') || '').trim(),
        state: estado,
        // Na conta ILIKIA o registro profissional é cf_numero_do_conselho_regional; cf_crm
        // também existe e vai junto. Nome de campo errado o RD descarta em silêncio.
        cf_crm: registro,
        cf_numero_do_conselho_regional: registro,
        cf_cpf_cnpj: String(data.get('cpf_cnpj') || '').replace(/\D/g, ''),
        // Padrão de tags das LPs ILIKIA: <marca>-landing + lp-koko (a mídia separa no RD
        // o que veio das nossas LPs por lp-koko) + recortes.
        tags: ['stiim-landing', 'ilikia', 'lp-koko', 'especialidade-' + slugify(especialidade), 'estado-' + slugify(estado)],
        traffic_source: utm.utm_source || document.referrer || '',
        traffic_medium: utm.utm_medium || '',
        traffic_campaign: utm.utm_campaign || '',
        traffic_value: utm.utm_content || '',
        utm_source: utm.utm_source || '', utm_medium: utm.utm_medium || '', utm_campaign: utm.utm_campaign || '',
        utm_term: utm.utm_term || '', utm_content: utm.utm_content || '',
        conversion_url: window.location.href
      };
      if (especialidade) lead.cf_especialidade = ESPECIALIDADE_RD[especialidade] || 'Outro';
      var payload = { event_type: 'CONVERSION', event_family: 'CDP', payload: lead };

      fetch(RD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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

  /* Barra mobile que aciona o popup de WhatsApp injetado pelo RD Station. */
  (function () {
    var mobileWhatsappBar = document.getElementById('mobileWhatsappBar');
    if (!mobileWhatsappBar || !('MutationObserver' in window)) return;

    function syncMobileWhatsappBar() {
      var rdButton = document.getElementById('rd-floating_button-ljq2ejnm');
      var rdWrapper = rdButton ? rdButton.closest('.floating-button') : null;
      var popupClosed = Boolean(rdWrapper && rdWrapper.classList.contains('floating-button--close'));

      document.documentElement.classList.toggle('rd-mobile-bar-ready', Boolean(rdButton));
      mobileWhatsappBar.hidden = !popupClosed;
    }

    mobileWhatsappBar.addEventListener('click', function () {
      var rdButton = document.getElementById('rd-floating_button-ljq2ejnm');
      if (rdButton) rdButton.click();
    });

    var whatsappObserver = new MutationObserver(syncMobileWhatsappBar);
    whatsappObserver.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    syncMobileWhatsappBar();
  })();

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
