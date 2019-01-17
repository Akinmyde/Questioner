const email = document.getElementById('email');
const error = document.getElementsByClassName('error')[0];

document.getElementById('forget').addEventListener('click', () => {
  if (email.value === '') {
    return (
      error.style.display = 'block',
      error.innerHTML = 'Email is required'
    )
  } return (
    error.style.display = 'block',
    error.style.color = 'green',
    error.innerHTML = 'check your email for the next step'
  )
})
