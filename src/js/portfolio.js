
  const API_BASE = 'https://wedding-photographer.b.goit.study/api';
  const CATEGORIES_URL = `${API_BASE}/categories`;
  const PORTFOLIO_URL = `${API_BASE}/wedding-photos`;


const INITIAL_LIMIT = 9;
const filterEl = document.getElementById('portfolioFilters');
const gridEl = document.getElementById('galleryGrid');
const loaderEl = document.getElementById('portfolioLoader');
const btnShowMore = document.getElementById('btnShowMore');

let state = {
  categoryId: '',
  loadedCount: 0,
  totalCount: 0,
  page: 1,
};

function showLoader() {
  if (loaderEl) {
    loaderEl.classList.add('is-visible');
    loaderEl.setAttribute('aria-hidden', 'false');
  }
}

function hideLoader() {
  if (loaderEl) {
    loaderEl.classList.remove('is-visible');
    loaderEl.setAttribute('aria-hidden', 'true');
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (match) {
    const escapeChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return escapeChars[match] || match;
  });
}

function renderFilterButtons(categories) {
  if (!filterEl) return;

  const allButton = `
    <li class="portfolio-filters-item" role="presentation">
      <button type="button" class="portfolio-filters-btn active" role="tab" aria-selected="true" data-category-id="">All photos</button>
    </li>
  `;

  const categoryButtons = categories
    .map(
      category => `
      <li class="portfolio-filters-item" role="presentation">
        <button type="button" class="portfolio-filters-btn" role="tab" aria-selected="false" data-category-id="${category._id || category.id}">${escapeHtml(category.category)}</button>
      </li>
    `
    )
    .join('');

  filterEl.innerHTML = '';
  filterEl.insertAdjacentHTML('beforeend', allButton + categoryButtons);
}

function renderPhotos(photos, { append }) {
  if (!gridEl || !photos) return;

  // ВИПРАВЛЕНО: Використовуємо photo.img згідно з реальними даними сервера
  const markup = photos
    .map(
      photo => `
      <li class="gallery-item">
        <img class="gallery-img" src="${photo.img}" alt="${escapeHtml(photo.title || 'Wedding photo')}" loading="lazy"/>
      </li>
    `
    )
    .join('');

  if (append) {
    gridEl.insertAdjacentHTML('beforeend', markup);
  } else {
    gridEl.innerHTML = '';
    gridEl.insertAdjacentHTML('beforeend', markup);
  }
}

function updateShowMoreVisibility() {
  if (!btnShowMore) return;

  // Якщо завантажили все або фоток всього менше/дорівнює 9 — ховаємо кнопку
  if (
    state.loadedCount >= state.totalCount ||
    state.totalCount <= INITIAL_LIMIT
  ) {
    btnShowMore.classList.add('is-hidden');
  } else {
    btnShowMore.classList.remove('is-hidden');
    btnShowMore.removeAttribute('disabled');
    btnShowMore.setAttribute('aria-disabled', 'false');
  }
}

function buildPortfolioUrl({ page, limit, categoryId }) {
  const url = new URL(PORTFOLIO_URL);
  url.searchParams.set('page', page);
  url.searchParams.set('limit', limit);
  if (categoryId) {
    url.searchParams.set('categoryId', categoryId);
  }
  return url.toString();
}

async function fetchCategories() {
  try {
    const response = await fetch(CATEGORIES_URL);
    if (!response.ok) {
      throw new Error(`Categories request failed: ${response.status}`);
    }
    const categories = await response.json();
    renderFilterButtons(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    if (filterEl) {
      filterEl.innerHTML =
        '<li class="portfolio-filters-item">Failed to load categories</li>';
    }
  }
}

async function fetchPortfolio({ page, limit, categoryId, append }) {
  showLoader();
  if (btnShowMore) {
    btnShowMore.setAttribute('disabled', 'true');
    btnShowMore.setAttribute('aria-disabled', 'true');
  }

  try {
    const url = buildPortfolioUrl({ page, limit, categoryId });
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Portfolio request failed: ${response.status}`);
    }
    const data = await response.json();

    const photosArray = data.weddingPhotos || [];
    // ВИПРАВЛЕНО: Сервер повертає totalItems
    const total = data.totalItems || photosArray.length;

    renderPhotos(photosArray, { append });

    state.totalCount = total;
    state.loadedCount = append
      ? state.loadedCount + photosArray.length
      : photosArray.length;

    updateShowMoreVisibility();
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    if (!append && gridEl) {
      gridEl.innerHTML =
        '<li class="gallery-item" style="list-style:none; text-align:center; width:100%;">Failed to load portfolio</li>';
    }
  } finally {
    hideLoader();
  }
}

function loadInitialPortfolio(categoryId) {
  state.categoryId = categoryId;
  state.page = 1;
  state.loadedCount = 0;
  fetchPortfolio({ page: 1, limit: INITIAL_LIMIT, categoryId, append: false });
}

function loadMorePortfolio() {
  state.page += 1;
  // По ТЗ: кожна наступна порція — по 3 фотографії
  fetchPortfolio({
    page: state.page,
    limit: 3,
    categoryId: state.categoryId,
    append: true,
  });
}

// Слухач кліків по фільтрах (активна кнопка шукається через clickedBtn)
if (filterEl) {
  filterEl.addEventListener('click', event => {
    const clickedBtn = event.target.closest('.portfolio-filters-btn');

    if (!clickedBtn) return;

    filterEl.querySelectorAll('.portfolio-filters-btn').forEach(btn => {
      btn.classList.remove('active');
      btn.setAttribute('aria-selected', 'false');
    });

    clickedBtn.classList.add('active');
    clickedBtn.setAttribute('aria-selected', 'true');

    const categoryId = clickedBtn.dataset.categoryId || '';
    loadInitialPortfolio(categoryId);
  });
}

if (btnShowMore) {
  btnShowMore.addEventListener('click', loadMorePortfolio);
}

// Запуск при завантаженні сторінки
fetchCategories();
loadInitialPortfolio('');