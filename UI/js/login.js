/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
const username = document.getElementById('username');
const password = document.getElementById('password');
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

document.getElementById('login').addEventListener('click', (e) => {
  e.preventDefault();
  if (username.value === '') {
    alert.style.display = 'block';
    error.innerHTML = 'Username is required';
    return;
  } if (password.value === '') {
    alert.style.display = 'block';
    error.innerHTML = 'Password is required';
    return;
  } if (!navigator.onLine) {
    alert.style.display = 'block';
    error.innerHTML = 'Error connecting to the internet';
    return;
  }
  loader.style.display = 'block';
  const url = 'https://akinmyde-questioner.herokuapp.com/api/v1/auth/login';
  const newUser = { username: username.value, password: password.value };
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
        error.innerHTML = result.error;
        alert.style.display = 'block';
        return;
      }
      const { data } = result;
      const { user } = data[0];
      localStorage.setItem('token', data[0].token);
      if (user.isadmin) {
        localStorage.setItem('isAdmin', user.isadmin);
        return window.location.replace('admin.html');
      }
      return window.location.replace('user.html');
    });
});
