const username = document.getElementById('username');
const password = document.getElementById('password');
const error = document.getElementsByClassName('error')[0];
error.style.display = 'none';

document.getElementById('login').addEventListener('click', (e) => {
  e.preventDefault()
  if (username.value === '' || password.value === '') {
    return (
      error.innerHTML = 'All fields are required',
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
