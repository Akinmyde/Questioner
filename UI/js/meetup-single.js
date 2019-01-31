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
const title = document.getElementById('title');
const questionTitle = document.getElementById('questiontitle');
const body = document.getElementById('body');
const token = localStorage.getItem('token');
let meetupId = sessionStorage.getItem('meetupid');
const loader = document.getElementById('overlay');
const alert = document.getElementsByClassName('alert')[0];
const error = document.getElementsByClassName('error')[0];
let url;

alert.style.display = 'none';
loader.style.display = 'block';
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

const meetupView = () => {
  url = `https://akinmyde-questioner.herokuapp.com/api/v1/meetups/${meetupId}`;
  apiCall(url, 'GET').then((data) => {
    loader.style.display = 'none';
    const meetupCard = `<img class="image card-image" src="${data[0].images[0]}">
    <h4><a href="meetup-single.html">${data[0].topic}</a></h4>
    <h6 class="font12">@${data[0].location}</h6>
    <span class="text-holder">
      <ul class="details font12">
        <li>${new Date(data[0].happeningon).toDateString()}</li>
        <li>30 Questions</li>
      </ul>
      <button type="button" class="font12 sm" id="btnshow">Add Question</button>
    </span>`;
    meetupContainer.insertAdjacentHTML('afterbegin', meetupCard);

    document.getElementById('btnshow').addEventListener('click', (e) => {
      e.preventDefault();
      title.innerHTML = 'Add Question';
      questions.style.display = 'none';
      addQuestion.style.display = 'block';
      return;
    });
  });
};

const questionsView = () => {
  url = `https://akinmyde-questioner.herokuapp.com/api/v1/meetups/${meetupId}/questions`;
  apiCall(url, 'GET').then((data) => {
    if (!data) {
      const emptyCard = `<div class="space">
            <h4>No questions yet</h4>`;
      questionContainer.insertAdjacentHTML('beforeend', emptyCard);
      return;
    }
    data.forEach((question) => {
      const questionCard = `<div class="space">
            <h4><a id="${question.id}" href="">${question.title}</a></h4>
            <p class="font16">${question.body}</p>
            <span class="text-holder">
              <ul class="details">
              <li>${new Date(question.createdon).toDateString()}</li>
              <li><a id="${question.id}" class="upvote" href=""><i class="fas fa-thumbs-up"></i><span class="num">${question.upvotes}</span></a></li>
              <li><a id="${question.id}" class="downvote" href=""><i class="fas fa-thumbs-down"></i><span class="num">${question.downvotes}</span></a></li>
              <li><a class="comment" href="comment.html"><i class="fas fa-comment"></i></span></a></li>
              </ul>
            </span>
          </div>`;
      questionContainer.insertAdjacentHTML('beforeend', questionCard);
      return;
    });
    vote('upvote', upVote);
    vote('downvote', downVote);
  });
};

isLogin();
meetupView();
questionsView();

document.getElementById('btncancel').addEventListener('click', () => {
  title.innerHTML = 'Questions';
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
      // location.reload();
      return;
    }
    return;
  })
    .catch((err) => {
      error.innerHTML = 'An error occur, try later';
      alert.style.display = 'block';
      console.log(err);
    });
});
