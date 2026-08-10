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
}

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
