/* eslint-disable no-restricted-globals */

const meetupContainer = document.getElementById('meetup');
const questionContainer = document.getElementById('questions');
const upVote = document.getElementsByClassName('upvote');
const downVote = document.getElementsByClassName('downvote');
const questions = document.getElementById('questions');
const addQuestion = document.getElementById('add-question');
const questionTitle = document.getElementById('questiontitle');
const body = document.getElementById('body');
const token = localStorage.getItem('token');
let meetupId = sessionStorage.getItem('meetupid');
const loader = document.getElementById('overlay');
const link = document.getElementsByTagName('a');
let url;
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const msg = document.querySelector('.msg');
const modalContent = document.querySelector('.modal-content');
const headers = { 'Content-Type': 'application/json', token };

const toggleModal = (msgText, bckColor, forColor) => {
  msg.innerHTML = msgText;
  msg.style.color = forColor || '#721c24';
  modal.classList.toggle('show-modal');
  modalContent.style.background = bckColor || '#f8d7da';
};
const removeModal = (e) => {
  if (e.target === modal) { toggleModal(''); }
};

addQuestion.style.display = 'none';
if (!meetupId) {
  window.location.href = 'meetups.html';
}
meetupId = parseInt(meetupId, 10);

const vote = (reqPath, className) => {
  for (let i = 0; i < className.length; i += 1) {
    className[i].addEventListener('click', (e) => {
      e.preventDefault();
      const voteUrl = `https://akinmyde-questioner.herokuapp.com/api/v1/questions/${upVote[i].id}/${reqPath}`;
      const fetchData = { method: 'PATCH', headers };
      loader.style.display = 'block';
      fetch(voteUrl, fetchData).then(res => res.json())
        .then((resp) => {
          loader.style.display = 'none';
          const { data } = resp;
          loader.style.display = 'none';
          if (data) {
            toggleModal('Question was voted', 'rgb(64, 141, 64)', 'white');
            setTimeout(() => { location.reload(); }, 3000);
          } else {
            toggleModal('An error occur, try again');
          }
        });
    });
  }
};

const questionCard = data => `<div class="space">
<h4><a class="question-link" id="${data.id}" href="">${data.title}</a></h4>
<p class="font16">${data.body}</p>
<span class="text-holder">
  <ul class="details">
  <li>${new Date(data.createdon).toDateString()}</li>
  <li><a id="${data.id}" class="upvote" href=""><i class="fas fa-thumbs-up"></i><span class="num">${data.upvotes}</span></a></li>
  <li><a id="${data.id}" class="downvote" href=""><i class="fas fa-thumbs-down"></i><span class="num">${data.downvotes}</span></a></li>
  <li><a class="comment question-link" href=""><i class="fas fa-comment"></i></span></a></li>
  </ul>
</span>
</div>`;

// get single meetup
let meetupData = JSON.parse(sessionStorage.getItem('meetupObj'));
meetupData = meetupData.find(data => data.id === meetupId);
const meetupCard = `<img class="image card-image" src="${meetupData.images[0]}">
    <h4><a href="meetup-single.html">${meetupData.topic}</a></h4>
    <h6 class="font12">@${meetupData.location}</h6>
    <h4>RSVP
      <a title="yes" id="yes" class="rsvp" href=""><i class="fas fa-check"></i></a>
      <a title="no" id="no" class="rsvp" href=""><i class="fas fa-times"></i></a>
      <a title="maybe" id="maybe" class="rsvp" href=""><i class="fas fa-not-equal"></i></a>
    </h4>
    <span class="text-holder">
      <ul class="details font12">
        <li>${new Date(meetupData.happeningon).toDateString()}</li>
        <li>30 Questions</li>
      </ul>
      <button type="button" class="font12 sm" id="btnshow">Add Question</button>
    </span>`;
meetupContainer.insertAdjacentHTML('afterbegin', meetupCard);

// Get all question
url = `https://akinmyde-questioner.herokuapp.com/api/v1/meetups/${meetupId}/questions`;
fetch(url, { headers }).then(res => res.json())
  .then((resp) => {
    loader.style.display = 'none';
    const { data } = resp;
    if (data) {
      sessionStorage.setItem('questionObj', JSON.stringify(data));
      data.forEach(question => questionContainer.insertAdjacentHTML('beforeend', questionCard(question)));
      vote('upvote', upVote);
      vote('downvote', downVote);
      // Get question id
      for (let i = 0; i < link.length; i += 1) {
        if (link[i].className === 'question-link') {
          link[i].addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.setItem('questionid', parseInt(link[i].id, 10));
            window.location.href = 'comment.html';
          });
        }
      }
    } else {
      const emptyCard = `<div class="space">
             <h4>${resp.error}</h4>`;
      questionContainer.insertAdjacentHTML('beforeend', emptyCard);
    }
  });

document.getElementById('btnshow').addEventListener('click', () => {
  questions.style.display = 'none';
  addQuestion.style.display = 'block';
});

document.getElementById('btncancel').addEventListener('click', () => {
  questions.style.display = 'block';
  addQuestion.style.display = 'none';
});

document.getElementById('btnadd').addEventListener('click', () => {
  if (questionTitle.value === '') {
    toggleModal('Question title is required');
  } else if (body.value === '') {
    toggleModal('Question body is required');
  } else {
    loader.style.display = 'block';
    url = 'https://akinmyde-questioner.herokuapp.com/api/v1/questions';
    const newQuestion = { meetup: meetupId, title: questionTitle.value, body: body.value };
    const fetchData = { method: 'POST', body: JSON.stringify(newQuestion), headers };
    fetch(url, fetchData).then(res => res.json())
      .then((resp) => {
        loader.style.display = 'none';
        const { data } = resp;
        if (data) {
          questionContainer.insertAdjacentHTML('beforeend', questionCard(data[0]));
          questions.style.display = 'block';
          addQuestion.style.display = 'none';
          return toggleModal(resp.message, 'rgb(64, 141, 64)', 'white');
        }
        return toggleModal('An error occur, try again');
      });
  }
});

const rsvp = document.getElementsByClassName('rsvp');
for (let i = 0; i < rsvp.length; i += 1) {
  rsvp[i].addEventListener('click', (e) => {
    e.preventDefault();
    const response = rsvp[i].id;
    const rsvpUrl = `https://akinmyde-questioner.herokuapp.com/api/v1/meetups/${meetupId}/rsvps`;
    const fetchData = {
      method: 'POST',
      body: JSON.stringify({ response }),
      headers,
    };
    loader.style.display = 'block';
    fetch(rsvpUrl, fetchData)
      .then(res => res.json())
      .then((resp) => {
        loader.style.display = 'none';
        if (resp.data) {
          console.log(resp);
          return toggleModal(resp.message, 'rgb(64, 141, 64)', 'white');
        }
        return toggleModal('you have already responded');
      });
  });
}

closeButton.addEventListener('click', () => {
  toggleModal('');
});
window.addEventListener('click', removeModal);
