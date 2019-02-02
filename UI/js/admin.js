/* eslint-disable no-useless-return */
const error = document.getElementsByClassName('error')[0];
const meetupTopic = document.getElementById('topic');
const eventLocation = document.getElementById('location');
const date = document.getElementById('date');
const loader = document.getElementById('overlay');
const alert = document.getElementsByClassName('alert')[0];
const token = localStorage.getItem('token');
const totalmeetups = document.getElementById('totalmeetups');

loader.style.display = 'block';
fetch('https://akinmyde-questioner.herokuapp.com/api/v1/meetups')
  .then(resp => resp.json())
  .then((results) => {
    loader.style.display = 'none';
    const { data } = results;
    totalmeetups.innerHTML = data.length;
  });
// loader.style.display = 'none';
error.style.display = 'block';
document.getElementById('btnmeetup').addEventListener('click', (e) => {
  e.preventDefault();
  if (meetupTopic.value === '' || eventLocation.value === '' || date.value === '') {
    error.innerHTML = 'All fields are required';
    alert.style.display = 'block';
    return;
  }
  if (meetupTopic.value === '') {
    error.innerHTML = 'meetup topic is required';
    alert.style.display = 'block';
    return;
  }
  if (eventLocation.value === '') {
    error.innerHTML = 'location is required';
    alert.style.display = 'block';
    return;
  }
  if (date.value === '') {
    error.innerHTML = 'date is required';
    alert.style.display = 'block';
    return;
  }
  loader.style.display = 'block';
  const url = 'https://akinmyde-questioner.herokuapp.com/api/v1/meetups';
  const newMeetup = {
    topic: meetupTopic.value,
    location: eventLocation.value,
    happeningOn: date.value,
  };
  const fetchData = {
    method: 'POST',
    body: JSON.stringify(newMeetup),
    headers: { 'Content-Type': 'application/json', token },
  };
  fetch(url, fetchData)
    .then(res => res.json())
    .then((result) => {
      const number = parseInt(totalmeetups.innerHTML, 10);
      totalmeetups.innerHTML = number + 1;
      loader.style.display = 'none';
      error.innerHTML = result.message;
      alert.style.display = 'block';
      alert.style.background = 'rgb(64, 141, 64)';
    })
    .catch(err => console.log(err));
});
