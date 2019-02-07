/* eslint-disable no-useless-return */
const meetupTopic = document.getElementById('topic');
const eventLocation = document.getElementById('location');
const date = document.getElementById('date');
const loader = document.getElementById('overlay');
const token = localStorage.getItem('token');
const totalMeetups = document.getElementById('totalmeetups');
const totalComments = document.getElementById('totalcomments');
const totalQuestions = document.getElementById('totalquestions');
const isAdmin = localStorage.getItem('isAdmin');
const closeButton = document.querySelector('.close-button');
const msg = document.querySelector('.msg');
const modalContent = document.querySelector('.modal-content');
const modal = document.querySelector('.modal');
const headers = { 'Content-Type': 'application/json', token };

const toggleModal = (msgText, bckColor, forColor) => {
  msg.innerHTML = msgText;
  msg.style.color = forColor;
  modal.classList.toggle('show-modal');
  modalContent.style.background = bckColor;
};
const removeModal = (e) => {
  if (e.target === modal) {
    toggleModal();
  }
};

if (!isAdmin) {
  window.location.href = 'index.html';
}

const getFetchData = { method: 'GET', headers };
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
document.getElementById('btnmeetup').addEventListener('click', (e) => {
  e.preventDefault();
  if (meetupTopic.value === '' || eventLocation.value === '' || date.value === '') {
    toggleModal('All fields are required');
  } else if (meetupTopic.value === '') {
    toggleModal('meetup topic is required');
  } else if (eventLocation.value === '') {
    toggleModal('location is required');
  } else if (date.value === '') {
    toggleModal('date is required');
  } else {
    loader.style.display = 'block';
    const url = 'https://akinmyde-questioner.herokuapp.com/api/v1/meetups';
    const newMeetup = {
      topic: meetupTopic.value,
      location: eventLocation.value,
      happeningOn: date.value,
    };
    const fetchData = { method: 'POST', body: JSON.stringify(newMeetup), headers };
    fetch(url, fetchData)
      .then(res => res.json())
      .then((result) => {
        const number = parseInt(totalMeetups.innerHTML, 10);
        totalMeetups.innerHTML = number + 1;
        loader.style.display = 'none';
        return toggleModal(result.message, 'rgb(64, 141, 64)', 'white');
      })
      .catch(err => console.log(err));
  }
});

closeButton.addEventListener('click', toggleModal);
window.addEventListener('click', removeModal);
