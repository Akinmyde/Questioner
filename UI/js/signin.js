const username = document.getElementById('username');
const password = document.getElementById('password');
const error = document.getElementsByClassName('error')[0];
error.style.display = 'none';

document.getElementById('login').addEventListener('click', (e) => {
  e.preventDefault()
  if (username.value === '') {
    return (
      error.innerHTML = 'Username is empty',
      error.style.display = 'block'
    )
  } if (password.value === '') {
    return (
      error.innerHTML = 'Password is empty',
      error.style.display = 'block'
    )
  } if(username.value.toLowerCase() !== 'andela' && password.value !== 'testing') {
    return (
      error.innerHTML = 'Invalid Username and/or Password',
      error.style.display = 'block'
    )
  } return (
    error.innerHTML = 'Login was Successful',
    error.style.display = 'block',
    error.style.color = 'green'
  )
});
