const image = document.getElementById('image');
const error = document.getElementsByClassName('error')[0];
const topic = document.getElementById('topic');
const eventLocation = document.getElementById('location');
const date = document.getElementById('date');
const createView = document.getElementById('create');
const dashboard = document.getElementById('dashboard');
const linkMeetups = document.getElementById('linkMeetups');
const meetupsView = document.getElementById('meetups');
const classActive = document.getElementsByClassName('active');
const deleteMeetup = document.getElementsByClassName('delete');

meetupsView.style.display = 'none';
dashboard.addEventListener('click', (e) => {
  e.preventDefault();
  for (let i = 0; i < classActive.length; i++) {
    classActive[i].className = ''
  }
  dashboard.className = 'active';
  meetupsView.style.display = 'none';
  createView.style.display = 'block';
});

linkMeetups.addEventListener('click', (e) => {
  e.preventDefault();
  for (let i = 0; i < classActive.length; i++) {
    classActive[i].className = '';
  }
  linkMeetups.className = 'active';
  meetupsView.style.display = 'flex';
  createView.style.display = 'none';
})

for (let i = 0; i < deleteMeetup.length;  i++) {
  deleteMeetup[i].addEventListener('click', (e) => {
    e.preventDefault();
    deleteMeetup[i].parentNode.parentNode.style.display = 'none';
  })
}

document.getElementById('upload').addEventListener('change', () => {
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

document.getElementById('btnmeetup').addEventListener('click', (e) => {
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
