const isLogin = () => {
  const token = localStorage.getItem('token');
  if (token) {
    window.location.href = 'user.html';
  }
};

isLogin();

const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmpassword');
const error = document.getElementsByClassName('error')[0];
const alert = document.getElementsByClassName('alert')[0];
const loader = document.getElementById('overlay');

loader.style.display = 'none';
alert.style.display = 'none';

document.getElementById('signup').addEventListener('click', (e) => {
  e.preventDefault();
  if (email.value === '') {
    alert.style.display = 'block';
    error.innerHTML = 'Email is required';
    return;
  } if (username.value === '') {
    alert.style.display = 'block';
    error.innerHTML = 'Username is required';
    return;
  } if (password.value === '') {
    alert.style.display = 'block';
    error.innerHTML = 'Password is required';
    return;
  } if ((password.value).length < 8) {
    alert.style.display = 'block';
    error.innerHTML = 'Please Should be at least 8 characters';
    return;
  } if (confirmPassword.value === '') {
    alert.style.display = 'block';
    error.innerHTML = 'Please confirm password';
    return;
  } if (confirmPassword.value !== password.value) {
    alert.style.display = 'block';
    error.innerHTML = 'Password must be the same';
    return;
  } if (!navigator.onLine) {
    alert.style.display = 'block';
    error.innerHTML = 'Error connecting to the internet';
    return;
  } loader.style.display = 'block';
  const url = 'https://akinmyde-questioner.herokuapp.com/api/v1/auth/signup';
  const user = { email: email.value, username: username.value, password: password.value };
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
      const { data } = result;
      localStorage.setItem('user', data);
      window.location.href = 'user.html';
    });
});
