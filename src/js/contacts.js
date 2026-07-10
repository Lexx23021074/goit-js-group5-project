import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.contacts-form');
const btn = document.querySelector('.contacts-button');

function showLoader() {
  btn.disabled = true;
  btn.classList.add('is-loading');
}

function hideLoader() {
  btn.disabled = false;
  btn.classList.remove('is-loading');
}

function openSeccessModal() {
  const modal = document.querySelector('[data-modal="success"]');
  
  if (!modal) return;
  modal.classList.remove('is-hidden');  
  
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  const { name, phone, comment } = e.target.elements;

  const cleanedPhone = phone.value.replace(/\D/g, '');
  console.log('Відправка пішла. Довжина номера:', cleanedPhone.length);
  
  if (cleanedPhone.length !== 12) {
    iziToast.warning({
      title: 'Warning',
      message: 'Phone number must contain exactly 12 digits.',
      position: 'topRight'
    });
    return; 
  }

  const formData = {
    name: name.value.trim(),
    phone: cleanedPhone,
    message: comment.value.trim(),
  };
  if (name.value.trim() === '' || phone.value.trim() === '') {
    return;
  }
  showLoader();
  try {
    const response = await axios.post(
      'https://wedding-photographer.b.goit.study/api/orders',
      formData
    );
    const orderData = response.data;
    openSeccessModal(orderData);
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong. Please try again.';
    iziToast.error({
      title: 'Error',
      message: errorMessage,
    });
  } finally {
    hideLoader();
    e.target.reset();
  }
});
