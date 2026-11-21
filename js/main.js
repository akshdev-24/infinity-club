(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
  const setHeader = () => header.classList.toggle('scrolled', window.scrollY > 40);
  setHeader();
  window.addEventListener('scroll', setHeader, { passive: true });

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  navLinks.forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));

  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach(section => sectionObserver.observe(section));

    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.benefit,.program-card,.about-copy,.facility-tile,.feature-content,.price-card,.rating-panel,.contact-details,.contact-map').forEach(el => {
      el.classList.add('reveal');
      revealObserver.observe(el);
    });
  }

  document.getElementById('year').textContent = new Date().getFullYear();

  // Enquiry modal: accessible open/close, activity preselection, focus return and focus trap.
  const modal = document.getElementById('enquiry-modal');
  const dialog = modal.querySelector('.enquiry-modal');
  const closeButton = modal.querySelector('.modal-close');
  const form = document.getElementById('enquiry-form');
  const interest = document.getElementById('interest');
  const error = document.getElementById('form-error');
  const submit = document.getElementById('submit-enquiry');
  const formContent = document.getElementById('modal-form-content');
  const successPanel = document.getElementById('success-panel');
  const backendPanel = document.getElementById('backend-panel');
  const backendMessage = document.getElementById('backend-message');
  const retryButton = document.getElementById('retry-form');
  const successClose = document.getElementById('success-close');
  let previousFocus = null;
  let closeTimer = null;
  let submitting = false;

  const openModal = (activity = '') => {
    previousFocus = document.activeElement;
    form.reset();
    error.textContent = '';
    successPanel.hidden = true;
    backendPanel.hidden = true;
    formContent.hidden = false;
    submit.disabled = false;
    submit.innerHTML = 'SUBMIT ENQUIRY <span>→</span>';
    if (activity) {
      const option = [...interest.options].find(o => o.value.toLowerCase() === activity.toLowerCase());
      if (option) interest.value = option.value;
    }
    modal.hidden = false;
    document.body.classList.add('modal-open');
    requestAnimationFrame(() => {
      modal.classList.add('is-open');
      document.getElementById('full-name').focus();
    });
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => {
      modal.hidden = true;
      if (previousFocus && typeof previousFocus.focus === 'function') previousFocus.focus();
    }, 240);
  };

  document.querySelectorAll('[data-enquiry]').forEach(trigger => {
    trigger.addEventListener('click', () => openModal(trigger.dataset.activity || ''));
  });
  closeButton.addEventListener('click', closeModal);
  successClose.addEventListener('click', closeModal);
  modal.addEventListener('click', event => {
    if (event.target === modal) closeModal();
  });
  document.addEventListener('keydown', event => {
    if (modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    }
    if (event.key === 'Tab') {
      const focusable = [...dialog.querySelectorAll('button:not([disabled]),a[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.closest('[hidden]') && el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
  retryButton.addEventListener('click', () => {
    backendPanel.hidden = true;
    formContent.hidden = false;
    document.getElementById('full-name').focus();
  });

  const showBackendError = message => {
    formContent.hidden = true;
    successPanel.hidden = true;
    backendPanel.hidden = false;
    backendMessage.textContent = message;
    retryButton.focus();
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    error.textContent = '';
    const mobile = document.getElementById('mobile-number');
    mobile.setCustomValidity(/^[6-9]\d{9}$/.test(mobile.value.trim()) ? '' : 'Enter a valid 10-digit Indian mobile number.');
    if (!form.reportValidity()) return;
    if (submitting) return;

    const endpoint = (window.INFINITY_CONFIG && window.INFINITY_CONFIG.enquiryEndpoint || '').trim();
    if (!endpoint) {
      showBackendError('The online enquiry service has not been configured. Your details have NOT been sent or saved. Please call Infinity Club on +91 89550 12924, or configure an HTTPS endpoint in js/config.js.');
      return;
    }

    const data = Object.fromEntries(new FormData(form).entries());
    delete data.consent;
    data.consent = true;
    data.source = 'Infinity Club website';
    data.submittedAt = new Date().toISOString();

    submitting = true;
    submit.disabled = true;
    submit.textContent = 'SENDING…';
    const controller = new AbortController();
    const timeout = window.INFINITY_CONFIG.requestTimeoutMs || 12000;
    const timer = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data),
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`The enquiry service responded with status ${response.status}.`);
      formContent.hidden = true;
      backendPanel.hidden = true;
      successPanel.hidden = false;
      successClose.focus();
    } catch (err) {
      const message = err.name === 'AbortError'
        ? 'The enquiry service took too long to respond. Your enquiry may not have been delivered. Please call +91 89550 12924 to confirm with the club.'
        : 'We could not confirm delivery of your enquiry. Your details have not been marked as received. Please call +91 89550 12924 or try again later.';
      showBackendError(message);
    } finally {
      clearTimeout(timer);
      submitting = false;
      submit.disabled = false;
      submit.innerHTML = 'SUBMIT ENQUIRY <span>→</span>';
    }
  });
})();
