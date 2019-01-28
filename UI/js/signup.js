const email = document.getElementById('email');
const username = document.getElementById('username');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmpassword');
const error = document.getElementsByClassName('error')[0];

document.getElementById('signup').addEventListener('click', (e) => {
  e.preventDefault();
  error.style.display = 'block';
  if (email.value === '') {
    error.innerHTML = 'Email is required';
  } else if (username.value === '') {
    error.innerHTML = 'Username is required';
  } else if (password.value === '') {
    error.innerHTML = 'Password is required';
  } else if ((password.value).length < 8) {
    error.innerHTML = 'Please Should be at least 8 characters';
  } else if (confirmPassword.value === '') {
    error.innerHTML = 'Please confirm password';
  } else if (confirmPassword.value !== password.value) {
    error.innerHTML = 'Password must be the same';
  } else {
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
        if (result.error) {
          error.innerHTML = result.error;
        }
        const { data } = result;
        localStorage.setItem('user', data);
        const { token } = data;
        window.location.href = 'user.html';
      });
  }
  return error;
});
