const backdrop = document.querySelector('.backdrop');
const closeBtn = document.querySelector('[data-modal-close]');

const body = document.body;

const openModal = () => {
  backdrop.classList.remove('is-hidden');
  document.body.classList.add('no-scroll');
  document.addEventListener('keydown', onEscKeyPress);
};

const closeModal = () => {

  backdrop.classList.add('is-hidden');
  body.classList.remove('no-scroll');
  document.removeEventListener('keydown', onEscKeyPress);
};

const onEscKeyPress = (event) => {
  if (event.code === 'Escape') {
    closeModal();
  }
};

const onBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', onBackdropClick);


