/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-return */
// check if user is loggedin
const isLogin = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = 'login.html';
  }
};

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
const alert = document.getElementsByClassName('alert')[0];
const error = document.getElementsByClassName('error')[0];
const link = document.getElementsByTagName('a');
let url;

alert.style.display = 'none';
addQuestion.style.display = 'none';
if (!meetupId) {
  window.location.href = 'meetups.html';
}
meetupId = parseInt(meetupId, 10);

const apiCall = (reqUrl, reqMethod, payload) => {
  let fetchData;
  if (!payload) {
    fetchData = {
      method: reqMethod,
      body: payload,
      headers: { 'Content-Type': 'application/json', token },
    };
  } else {
    fetchData = {
      method: reqMethod,
      body: JSON.stringify(payload),
      headers: { 'Content-Type': 'application/json', token },
    };
  }
  return fetch(reqUrl, fetchData)
    .then(res => res.json())
    .then((result) => {
      if (result.error) {
        return result.error;
      }
      const { data } = result;
      return data;
    })
    .catch(err => console.log(err));
};

const vote = (reqPath, className) => {
  for (let i = 0; i < className.length; i += 1) {
    className[i].addEventListener('click', (e) => {
      e.preventDefault();
      const voteUrl = `https://akinmyde-questioner.herokuapp.com/api/v1/questions/${upVote[i].id}/${reqPath}`;
      apiCall(voteUrl, 'PATCH').then((data) => {
        if (data) {
          location.reload();
        }
      });
    });
  }
};

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

const questionsView = () => {
  url = `https://akinmyde-questioner.herokuapp.com/api/v1/meetups/${meetupId}/questions`;
  apiCall(url, 'GET').then((data) => {
    loader.style.display = 'none';
    if (typeof (data) !== 'object') {
      const emptyCard = `<div class="space">
            <h4>${data}</h4>`;
      questionContainer.insertAdjacentHTML('beforeend', emptyCard);
      return;
    }
    sessionStorage.setItem('questionObj', JSON.stringify(data));
    data.forEach((question) => {
      const questionCard = `<div class="space">
            <h4><a class="question-link" id="${question.id}" href="">${question.title}</a></h4>
            <p class="font16">${question.body}</p>
            <span class="text-holder">
              <ul class="details">
              <li>${new Date(question.createdon).toDateString()}</li>
              <li><a id="${question.id}" class="upvote" href=""><i class="fas fa-thumbs-up"></i><span class="num">${question.upvotes}</span></a></li>
              <li><a id="${question.id}" class="downvote" href=""><i class="fas fa-thumbs-down"></i><span class="num">${question.downvotes}</span></a></li>
              <li><a class="comment question-link" href=""><i class="fas fa-comment"></i></span></a></li>
              </ul>
            </span>
          </div>`;
      questionContainer.insertAdjacentHTML('beforeend', questionCard);
      return;
    });
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
  });
};

isLogin();
questionsView();

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
    error.innerHTML = 'Question title is required';
    alert.style.display = 'block';
    return;
  }
  if (body.value === '') {
    error.innerHTML = 'Question body is required';
    alert.style.display = 'block';
    return;
  }
  url = 'https://akinmyde-questioner.herokuapp.com/api/v1/questions';
  const newQuestion = { meetup: meetupId, title: questionTitle.value, body: body.value };
  apiCall(url, 'POST', newQuestion).then((data) => {
    if (data) {
      location.reload();
      return;
    }
  });
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
      headers: { 'Content-Type': 'application/json', token },
    };
    loader.style.display = 'block';
    fetch(rsvpUrl, fetchData)
      .then(res => res.json())
      .then((resp) => {
        console.log(resp);
        loader.style.display = 'none';
      });
  });
}
