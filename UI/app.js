const username = document.getElementsByClassName('username')[0];
const password = document.getElementsByClassName('password')[0];
const error = document.getElementsByClassName('error')[0];
error.style.display = 'none';

document.getElementById('login').addEventListener('click', (e) => {
  if (username.value === '') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Username is empty',
      error.style.display = 'block'
    )
  } if (password.value === '') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Password is empty',
      error.style.display = 'block'
    )
  } if(username.value.toLowerCase() !== 'andela' && password.value !== 'testing') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Invalid Username and/or Password',
      error.style.display = 'block'
    )
  } 
});
