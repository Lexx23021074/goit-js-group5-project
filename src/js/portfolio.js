
  const API_BASE = 'https://wedding-photographer.b.goit.study/api';
  const CATEGORIES_URL = `${API_BASE}/categories`;
  const PORTFOLIO_URL = `${API_BASE}/portfolio`;


const INITIAL_LIMIT = 9;
const LOAD_MORE_INCREMENT = 3;
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
  loaderEl.classList.add('is-visible');
  loaderEl.setAttribute('aria-hidden', 'false');
}
function hideLoader() {
  loaderEl.classList.remove('is-visible');
  loaderEl.setAttribute('aria-hidden', 'true');
}
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, function (match) {
    const escapeChars = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return escapeChars[match] || match;
  });
}
function renderFilterButtons(categories) {
  const allButton = `
    <li class="portfolio-filters-item" role="presentation">
      <button type="button" class="portfolio-filters-btn active" role="tab" aria-selected="true" data-category-id="">All photos</button>
    </li>
    `;
  const categoryButtons = categories
    .map(
      (category) => `
      <li class="portfolio-filters-item" role="presentation">
        <button type="button" class="portfolio-filters-btn" role="tab" aria-selected="false" data-category-id="${category.id}">${category.name}</button>
      </li>
    `
    )
    .join('');

  filterEl.innerHTML = '';
  filterEl.insertAdjacentHTML('beforeend', allButton + categoryButtons);
}
function renderPhotos(photos, { append } ) {
  const markup = photos
    .map(
      (photo) => `
      <li class="gallery-item">
        <img class="gallery-img" src="${photo.imageUrl}" alt="${photo.title}" loading="lazy"/>
      </li>
    `
    )
    .join('');
  if (append) {
    gridEl.insertAdjacentHTML('beforeend', markup);
  } else {
    gridEl.textContent = '';
    gridEl.insertAdjacentHTML('beforeend', markup);
  }
}
function updateShowMoreVisibility() {
  if (state.loadedCount >= state.totalCount) {
    btnShowMore.classList.add('is-hidden');
  } else {
    btnShowMore.classList.remove('is-hidden');
    btnShowMore.ariaDisabled = 'false';
  }
  }
function buildPortfolioUrl({ page, limit, categoryId }) {
  const url = new URL(PORTFOLIO_URL);
  url.searchParams.set('page', page);
  url.searchParams.set('limit', limit);
  if (categoryId) {
    url.searchParams.set('category', categoryId);
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
      filterEl.textContent = '';
      const errorItem = document.createElement('li');
      errorItem.className = 'portfolio-filters-item';
      errorItem.textContent = 'Failed to load categories';
      filterEl.appendChild(errorItem);
    }
    }
    async function fetchPortfolio({ page, limit, categoryId, append }) {
      showLoader();
      btnShowMore.ariaDisabled = 'true';
      try {
        const url = buildPortfolioUrl({ page, limit, categoryId });
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Portfolio request failed: ${response.status}`);
        }
        const data = await response.json();
        renderPhotos(data.weddingPhotos, { append });
        state.totalCount = data.totalCount;
        state.loadedCount = append ? state.loadedCount + data.weddingPhotos.length : data.weddingPhotos.length;
        updateShowMoreVisibility();
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        if (!append) {
          gridEl.textContent = '';
          const errorItem = document.createElement('li');
          errorItem.className = 'gallery-item';
          errorItem.textContent = 'Failed to load portfolio';
          gridEl.appendChild(errorItem);
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
      fetchPortfolio({ page: state.page, limit: LOAD_MORE_INCREMENT, categoryId: state.categoryId, append: true });
    }



filterEl.addEventListener('click', (event) => {
  const clickedBtn = event.target.closest('.portfolio-filters-btn');


  if (!clickedBtn) return;


  filterEl.querySelectorAll('.portfolio-filters-btn').forEach((btn) => { btn.classList.remove('active');
  btn.setAttribute('aria-selected', 'false');
});
btn.classList.add('active');
btn.setAttribute('aria-selected', 'true');
const categoryId = btn.dataset.categoryId || '';
loadInitialPortfolio(categoryId);
    });



btnShowMore.addEventListener('click', loadMorePortfolio);
fetchCategories();
loadInitialPortfolio('');

