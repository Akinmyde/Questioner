/* eslint-disable no-useless-return */
const email = document.getElementById('email');
const error = document.getElementsByClassName('error')[0];
const alert = document.getElementsByClassName('alert')[0];
const loader = document.getElementById('overlay');
const token = localStorage.getItem('token');
const isAdmin = localStorage.getItem('isAdmin');

if (token) {
  if (isAdmin) {
    window.location.href = 'admin.html';
  } else {
    window.location.href = 'user.html';
  }
}

loader.style.display = 'none';
alert.style.display = 'none';

document.getElementById('forget').addEventListener('click', (e) => {
  e.preventDefault();
  if (email.value === '') {
    alert.style.display = 'block';
    error.innerHTML = 'Email is required';
    return;
  }
  if (!navigator.onLine) {
    alert.style.display = 'block';
    error.innerHTML = 'Error connecting to the internet';
    return;
  }
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
        error.innerHTML = result.error;
        alert.style.display = 'block';
        return;
      }
      error.style.display = 'block';
      alert.style.background = 'rgb(64, 141, 64)';
      error.innerHTML = result.message;
      alert.style.display = 'block';
      return;
    });
});
