/* eslint-disable no-useless-return */
const error = document.getElementsByClassName('error')[0];
const meetupTopic = document.getElementById('topic');
const eventLocation = document.getElementById('location');
const date = document.getElementById('date');
const loader = document.getElementById('overlay');
const alert = document.getElementsByClassName('alert')[0];
const token = localStorage.getItem('token');
const totalMeetups = document.getElementById('totalmeetups');
const totalComments = document.getElementById('totalcomments');
const totalQuestions = document.getElementById('totalquestions');
const isAdmin = localStorage.getItem('isAdmin');

if (!isAdmin) {
  window.location.href = 'index.html';
}
const getFetchData = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', token },
};
loader.style.display = 'block';
fetch('https://akinmyde-questioner.herokuapp.com/api/v1/meetups')
  .then(resp => resp.json())
  .then((results) => {
    loader.style.display = 'none';
    const { data } = results;
    totalMeetups.innerHTML = data.length;
  });
fetch('https://akinmyde-questioner.herokuapp.com/api/v1/comments', getFetchData)
  .then(resp => resp.json())
  .then((result) => {
    const { data } = result;
    if (data[0].count > 0) {
      totalComments.innerHTML = data[0].count;
    } else {
      totalComments.innerHTML = 0;
    }
  });
fetch('https://akinmyde-questioner.herokuapp.com/api/v1/questions', getFetchData)
  .then(resp => resp.json())
  .then((result) => {
    const { data } = result;
    if (data[0].count > 0) {
      totalQuestions.innerHTML = data[0].count;
    } else {
      totalQuestions.innerHTML = 0;
    }
  });
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
      const number = parseInt(totalMeetups.innerHTML, 10);
      totalMeetups.innerHTML = number + 1;
      loader.style.display = 'none';
      error.innerHTML = result.message;
      alert.style.display = 'block';
      alert.style.background = 'rgb(64, 141, 64)';
    })
    .catch(err => console.log(err));
});
