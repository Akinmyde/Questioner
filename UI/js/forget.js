const email = document.getElementById('email');
const error = document.getElementsByClassName('error')[0];

document.getElementById('forget').addEventListener('click', (e) => {
  if (email.value === '') {
    return (
      e.preventDefault(),
      error.innerHTML = 'Email is required'
    )
  } return (
    e.preventDefault(),
    error.innerHTML = 'check your email for the next step'
  )
})
