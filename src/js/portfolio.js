const portfolioData = [
  {
    id: 1,
    category: 'candid',
    alt: 'Candid wedding moment',
    desk1x: '/img/portfolio_images/portfolio-1-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-1-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-1-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-1-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-1-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-1-mob@2x.jpg'
  },
  {
    id: 2,
    category: 'portrait',
    alt: 'Portrait perfection',
    desk1x: '/img/portfolio_images/portfolio-2-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-2-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-2-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-2-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-2-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-2-mob@2x.jpg'
  },
  {
    id: 3,
    category: 'ceremony',
    alt: 'Ceremony and vows',
    desk1x: '/img/portfolio_images/portfolio-3-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-3-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-3-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-3-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-3-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-3-mob@2x.jpg'
  },
  {
    id: 4,
    category: 'celebrations',
    alt: 'Joyful celebrations',
    desk1x: '/img/portfolio_images/portfolio-4-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-4-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-4-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-4-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-4-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-4-mob@2x.jpg'
  },
  {
    id: 5,
    category: 'standart',
    alt: 'Standard wedding shot',
    desk1x: '/img/portfolio_images/portfolio-5-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-5-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-5-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-5-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-5-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-5-mob@2x.jpg'
  },
  {
    id: 6,
    category: 'detail',
    alt: 'Attention to detail',
    desk1x: '/img/portfolio_images/portfolio-6-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-6-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-6-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-6-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-6-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-6-mob@2x.jpg'
  },
  {
    id: 7,
    category: 'candid',
    alt: 'Another candid moment',
    desk1x: '/img/portfolio_images/portfolio-7-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-7-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-7-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-7-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-7-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-7-mob@2x.jpg'
  },
  {
    id: 8,
    category: 'portrait',
    alt: 'Beautiful portrait',
    desk1x: '/img/portfolio_images/portfolio-8-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-8-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-8-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-8-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-8-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-8-mob@2x.jpg'
  },
  {
    id: 9,
    category: 'ceremony',
    alt: 'Wedding rings close up',
    desk1x: '/img/portfolio_images/portfolio-9-desk@1x.jpg',
    desk2x: '/img/portfolio_images/portfolio-9-desk@2x.jpg',
    tab1x: '/img/portfolio_images/portfolio-9-tablet@1x.jpg',
    tab2x: '/img/portfolio_images/portfolio-9-tablet@2x.jpg',
    mob1x: '/img/portfolio_images/portfolio-9-mob@1x.jpg',
    mob2x: '/img/portfolio_images/portfolio-9-mob@2x.jpg'
  }
];
const galleryGrid = document.querySelector('.gallery-grid');
const filterButtonsContainer = document.querySelector('.filter-buttons');
const btnShowMore = document.querySelector('.btn-show-more');


let currentCategory = 'all';
let itemsToShow = 6;


function createCardTemplate(item) {
  return `
    <div class="gallery-item" data-category="${item.category}">
      <picture>
        <source
          media="(min-width: 1440px)"
          srcset="${item.desk1x} 1x, ${item.desk2x} 2x"/>
        <source media="(min-width: 768px)"
          srcset="${item.tab1x} 1x, ${item.tab2x} 2x" />
        <sourc
        media="(max-width: 767px)"
          srcset="${item.mob1x} 1x, ${item.mob2x} 2x" />
        <img
          src="${item.mob1x}"
          srcset="${item.mob1x} 1x, ${item.mob2x} 2x"
          alt="${item.alt}"
          loading="lazy"
          width="335"
          height="335"
        />
      </picture>
    </div>
  `;
}

function updateGallery() {

  const filteredData = currentCategory === 'all'
    ? portfolioData
    : portfolioData.filter(item => item.category === currentCategory);


  const itemsToRender = filteredData.slice(0, itemsToShow);


  galleryGrid.innerHTML = itemsToRender.map(createCardTemplate).join('');

  if (itemsToShow >= filteredData.length) {
    btnShowMore.style.display = 'none';
  } else {
    btnShowMore.style.display = 'inline-flex';
  }
}


filterButtonsContainer.addEventListener('click', (event) => {
  const clickedBtn = event.target.closest('.filter-btn');


  if (!clickedBtn) return;


  filterButtonsContainer.querySelector('.filter-btn.active')?.classList.remove('active');
  clickedBtn.classList.add('active');

  currentCategory = clickedBtn.dataset.filter;
  itemsToShow = 6;


  updateGallery();
});


btnShowMore.addEventListener('click', () => {
  itemsToShow += 3;
  updateGallery();
});


document.addEventListener('DOMContentLoaded', () => {
  updateGallery();
});