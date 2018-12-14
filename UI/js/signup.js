const email = document.getElementById('email')
      username = document.getElementById('username')
      password = document.getElementById('password')
      confirmPassword = document.getElementById('confirmpassword')
      error = document.getElementsByClassName('error')[0];

document.getElementById('signup').addEventListener('click', (e) => {
  if (email.value === '') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Email is required'
    )
  } if (username.value === '') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Username is required'
    )
  } if (password.value === '') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Password is required'
    )
  } if (confirmPassword.value === '') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Please confirm password'
    )
  } if (confirmPassword.value !== password.value) {
    return (
      e.preventDefault(),
      error.innerHTML = 'Password must be the same'
    )
  } return (
    e.preventDefault(),
    error.innerHTML = 'Accout was created, check your email for the next step'
  )
})