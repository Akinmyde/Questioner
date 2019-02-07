/* eslint-disable consistent-return */
const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmpassword');
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

document.getElementById('signup').addEventListener('click', (e) => {
  e.preventDefault();
  if (email.value === '') {
    toggleModal('Email is required');
  } else if (username.value === '') {
    toggleModal('Username is required');
  } else if (password.value === '') {
    toggleModal('Password is required');
  } else if ((password.value).length < 8) {
    toggleModal('Please Should be at least 8 characters');
  } else if (confirmPassword.value === '') {
    toggleModal('Please confirm password');
  } else if (confirmPassword.value !== password.value) {
    toggleModal('Password must be the same');
  } else if (!navigator.onLine) {
    toggleModal('Error connecting to the internet');
  } else {
    loader.style.display = 'block';
    const url = 'https://akinmyde-questioner.herokuapp.com/api/v1/auth/signup';
    const newUser = { email: email.value, username: username.value, password: password.value };
    const fetchData = {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    };
    fetch(url, fetchData)
      .then(res => res.json())
      .then((result) => {
        loader.style.display = 'none';
        if (result.error) {
          return toggleModal(result.error);
        }
        toggleModal('Login was successfull....redirecting', 'rgb(64, 141, 64)', 'white');
        const { data } = result;
        const { user } = data[0];
        localStorage.setItem('token', data[0].token);
        if (user.isadmin) {
          localStorage.setItem('isAdmin', user.isadmin);
          return setTimeout(() => { window.location.replace('admin.html'); }, 3000);
        }
        return setTimeout(() => { window.location.replace('user.html'); }, 3000);
      });
  }
});

closeButton.addEventListener('click', () => {
  toggleModal('');
});
window.addEventListener('click', removeModal);
