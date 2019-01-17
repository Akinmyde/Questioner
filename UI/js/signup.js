const email = document.getElementById('email')
      username = document.getElementById('username')
      password = document.getElementById('password')
      confirmPassword = document.getElementById('confirmpassword')
      error = document.getElementsByClassName('error')[0];

document.getElementById('signup').addEventListener('click', () => {
  error.style.display = 'block'
  if (email.value === '') {
    return error.innerHTML = 'Email is required';
  } 
  if (username.value === '') {
    return error.innerHTML = 'Username is required';
  } 
  if (password.value === '') {
    return error.innerHTML = 'Password is required';
  } 
  if (confirmPassword.value === '') {
    return error.innerHTML = 'Please confirm password';
  } 
  if (confirmPassword.value !== password.value) {
    return  error.innerHTML = 'Password must be the same';
  } 
  return (
    error.innerHTML = 'Accout was created, check your email for the next step.',
    error.style.color = 'green'
  )
})