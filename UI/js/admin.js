const image = document.getElementsByClassName('image')[0];
const error = document.getElementsByClassName('error')[0];
const topic = document.getElementById('topic');
const eventLocation = document.getElementById('location');
const date = document.getElementById('date');
const upload = document.getElementById('upload');
const btnmeetup = document.getElementById('btnmeetup');

upload.addEventListener('change', () => {
  image.style.display = 'none';
  error.style.display = 'none';
  const file = event.target.files[0];
  if (file) {
    const fileType = file.type.split('/')[1];
    if (fileType === 'jpeg' || fileType === 'jpg' || fileType === 'png') {
      if (file.size < 4000000) {
        return (
          image.style.display = 'block',
          image.src = URL.createObjectURL(file)
        )
      } return (
        error.style.display = 'block',
        error.innerHTML = 'File size must not exceed 4mb'
      )
    } return (
      error.style.display = 'block',
      error.innerHTML = 'File type must be jpeg or png'
    )
  }
});

btnmeetup.addEventListener('click', (e) => {
  error.style.display = 'none'
  e.preventDefault();
  if (topic.value === '' || eventLocation.value === '' || date.value === '') {
    return (
      error.style.display = 'block',
      error.innerHTML = 'All fields are required'
    )
  }
  error.style.color = 'green',
  error.innerHTML = 'Event was added successfully',
  error.style.display = 'block'
})
