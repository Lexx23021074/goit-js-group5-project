const swiper = new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
  
  navigation: {
    nextEl: '.btn-next',
    prevEl: '.btn-prev',
  },

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    }
  }
});