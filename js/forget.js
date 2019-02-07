/* eslint-disable no-useless-return */
const email = document.getElementById('email');
const loader = document.getElementById('overlay');
const token = localStorage.getItem('token');
const isAdmin = localStorage.getItem('isAdmin');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const msg = document.querySelector('.msg');
const modalContent = document.querySelector('.modal-content');

const toggleModal = (msgText, bckColor, forColor) => {
  msg.innerHTML = msgText;
  msg.style.color = forColor || '#721c24';
  modal.classList.toggle('show-modal');
  modalContent.style.background = bckColor || '#f8d7da';
};
const removeModal = (e) => {
  if (e.target === modal) { toggleModal(''); }
};
if (token) {
  if (isAdmin) {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'user.html';
  }
}

loader.style.display = 'none';

document.getElementById('forget').addEventListener('click', (e) => {
  e.preventDefault();
  if (email.value === '') {
    toggleModal('Email is required');
  } else if (!navigator.onLine) {
    toggleModal('Error connecting to the internet');
  } else {
    loader.style.display = 'block';
    const url = 'https://akinmyde-questioner.herokuapp.com/api/v1/auth/forget';
    const user = { email: email.value };
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(url, fetchData)
      .then(res => res.json())
      .then((result) => {
        loader.style.display = 'none';
        if (result.error) {
          return toggleModal(result.error);
        }
        return toggleModal(result.message, 'rgb(64, 141, 64)', 'white');
      });
  }
});

closeButton.addEventListener('click', () => {
  toggleModal('');
});
window.addEventListener('click', removeModal);
