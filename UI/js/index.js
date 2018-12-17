const name = document.getElementById('name');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const error = document.getElementsByClassName('error')[0];

document.getElementById('send').addEventListener('click', (e) => {
  e.preventDefault();
  if (name.value === '' || email.value === '' || subject.value === '' || message.value === '') {
    return (
      error.innerHTML = 'All fields are required',
      error.style.display = 'block'
    )
  } error.innerHTML = 'Thanks for contacting us';
    error.style.color = 'green';
});