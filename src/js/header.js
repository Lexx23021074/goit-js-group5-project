console.log('Header module loaded');

document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.getElementById('mobile-menu');
  const openMenuBtn = document.querySelector('.mobile-menu-btn');
  const closeMenuBtn = document.querySelector('.mobile-menu-close');
  const menuLinks = document.querySelectorAll('.mobile-menu-link, .mobile-menu-btn-action');

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('is-open');
    openMenuBtn.setAttribute('aria-expanded', isOpen);
    // Block background scrolling when the menu is open
    document.body.style.overflow = isOpen ? 'hidden' : ''; 
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);

  // Close the menu clicking link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('is-open');
      openMenuBtn.setAttribute('aria-expanded', false);
      document.body.style.overflow = '';
    });
  });
});