const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
    });
  });
}

const escapeHTML = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

function renderInformation() {
  const grid = document.querySelector('#info-grid');
  const items = window.SITE_DATA?.information ?? [];
  if (!grid) return;

  grid.innerHTML = items.map((item) => `
    <article class="info-card">
      <div class="info-card-topline">
        <span class="info-number">${escapeHTML(item.number)}</span>
        <span class="info-rule" aria-hidden="true"></span>
      </div>
      <h3>${escapeHTML(item.title)}</h3>
      <p class="info-intro">${escapeHTML(item.intro)}</p>
      <dl class="info-facts">
        ${(item.highlights ?? []).map((fact) => `
          <div class="info-fact">
            <dt>${escapeHTML(fact.label)}</dt>
            <dd>${escapeHTML(fact.value)}</dd>
          </div>
        `).join('')}
      </dl>
      <p class="info-detail">${escapeHTML(item.detail)}</p>
    </article>
  `).join('');
}

function renderBoard(termName) {
  const grid = document.querySelector('#board-grid');
  const termLabel = document.querySelector('#board-term-label');
  const terms = window.SITE_DATA?.boardTerms ?? [];
  if (!grid) return;

  const selected = terms.find((entry) => entry.term === termName) ?? terms[0];
  if (!selected) {
    grid.innerHTML = '<p class="empty-state">Board information is being updated.</p>';
    boardCarousel.refresh();
    return;
  }

  if (termLabel) termLabel.textContent = selected.term;

  grid.innerHTML = selected.members.map((member) => `
    <article class="person-card">
      <div class="person-photo-wrap">
        <img src="${escapeHTML(member.image)}" alt="${escapeHTML(member.name)}" loading="lazy">
      </div>
      <div class="person-copy">
        <p class="role">${escapeHTML(member.role)}</p>
        <h3>${escapeHTML(member.name)}</h3>
        <p class="person-bio">${escapeHTML(member.bio)}</p>
      </div>
    </article>
  `).join('');

  boardCarousel.refresh();
}

/*
  Mobile board carousel.

  Above 700px the board stays a normal grid and the controls stay hidden.
  At 700px and below the grid becomes a horizontal scroll-snap track, so
  swiping works natively and the arrows just scroll to the next card.
*/
const boardCarousel = (() => {
  const track = document.querySelector('#board-grid');
  const controls = document.querySelector('#board-carousel-controls');
  const prevButton = document.querySelector('#board-prev');
  const nextButton = document.querySelector('#board-next');
  const position = document.querySelector('#board-position');
  const dots = document.querySelector('#board-dots');

  if (!track || !controls) return { refresh() {} };

  const mobile = window.matchMedia('(max-width: 700px)');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let cards = [];
  let index = 0;
  let ticking = false;

  const cardAt = (i) => cards[Math.min(Math.max(i, 0), cards.length - 1)];

  const trackCenter = () => {
    const rect = track.getBoundingClientRect();
    return rect.left + track.clientWidth / 2;
  };

  function closestIndex() {
    const middle = trackCenter();
    let best = 0;
    let bestGap = Infinity;

    cards.forEach((card, i) => {
      const rect = card.getBoundingClientRect();
      const gap = Math.abs(rect.left + rect.width / 2 - middle);
      if (gap < bestGap) {
        bestGap = gap;
        best = i;
      }
    });

    return best;
  }

  function paint() {
    if (!cards.length) return;

    if (position) position.textContent = `${index + 1} of ${cards.length}`;
    if (prevButton) prevButton.disabled = index === 0;
    if (nextButton) nextButton.disabled = index === cards.length - 1;

    if (dots) {
      Array.from(dots.children).forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
      });
    }

  }

  function goTo(next, smooth = true) {
    const target = cardAt(next);
    if (!target) return;

    index = cards.indexOf(target);
    paint();

    const rect = target.getBoundingClientRect();
    const delta = rect.left + rect.width / 2 - trackCenter();

    track.scrollTo({
      left: track.scrollLeft + delta,
      behavior: smooth && !reduceMotion.matches ? 'smooth' : 'auto'
    });
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      if (!mobile.matches || !cards.length) return;
      const next = closestIndex();
      if (next !== index) {
        index = next;
        paint();
      }
    });
  }

  function refresh() {
    cards = Array.from(track.querySelectorAll('.person-card'));
    const active = mobile.matches && cards.length > 1;

    controls.hidden = !active;

    if (active) {
      track.setAttribute('tabindex', '0');
      track.setAttribute('role', 'group');
      track.setAttribute('aria-label', 'Board members, swipe or use the arrows');
    } else {
      track.removeAttribute('tabindex');
      track.removeAttribute('role');
      track.removeAttribute('aria-label');
      track.scrollLeft = 0;
    }

    if (dots) {
      dots.innerHTML = cards.map(() => '<span class="carousel-dot"></span>').join('');
    }

    if (active) {
      goTo(Math.min(index, cards.length - 1), false);
    } else {
      index = 0;
    }
  }

  prevButton?.addEventListener('click', () => goTo(index - 1));
  nextButton?.addEventListener('click', () => goTo(index + 1));

  track.addEventListener('scroll', onScroll, { passive: true });

  track.addEventListener('keydown', (event) => {
    if (!mobile.matches) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      goTo(index + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      goTo(index - 1);
    }
  });

  const onBreakpointChange = () => {
    index = 0;
    refresh();
  };

  if (typeof mobile.addEventListener === 'function') {
    mobile.addEventListener('change', onBreakpointChange);
  } else {
    mobile.addListener(onBreakpointChange);
  }

  window.addEventListener('orientationchange', () => window.setTimeout(refresh, 150));

  return { refresh };
})();

function setupBoardTerms() {
  const data = window.SITE_DATA ?? {};
  const terms = data.boardTerms ?? [];
  const control = document.querySelector('#board-term-control');
  const select = document.querySelector('#board-term-select');

  if (!select) return;

  select.innerHTML = terms.map((entry) => `
    <option value="${escapeHTML(entry.term)}">${escapeHTML(entry.term)}</option>
  `).join('');

  const preferred = terms.some((entry) => entry.term === data.currentBoardTerm)
    ? data.currentBoardTerm
    : terms[0]?.term;

  if (preferred) select.value = preferred;
  if (control && terms.length > 1) control.hidden = false;

  select.addEventListener('change', () => renderBoard(select.value));
  renderBoard(preferred);
}

renderInformation();
setupBoardTerms();

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();