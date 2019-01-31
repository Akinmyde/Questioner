/* eslint-disable no-restricted-globals */
/* eslint-disable no-useless-return */
const addCommentView = document.getElementById('add-comment');
const title = document.getElementById('title');
const questionContainer = document.getElementById('question');
const commentContainer = document.getElementById('comments');
const token = localStorage.getItem('token');
const commentMessage = document.getElementById('commentMessage');
const loader = document.getElementById('overlay');
const alert = document.getElementsByClassName('alert')[0];
const error = document.getElementsByClassName('error')[0];
let meetupId = sessionStorage.getItem('meetupid');
let questionId = sessionStorage.getItem('questionid');
const url = `https://akinmyde-questioner.herokuapp.com/api/v1/questions/${questionId}/comments`;
let totalComment = 0;
alert.style.display = 'none';
addCommentView.style.display = 'none';
if (!meetupId) {
  window.location.href = 'meetups.html';
}
meetupId = parseInt(meetupId, 10);
questionId = parseInt(questionId, 10);
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

apiCall(url, 'GET').then((data) => {
  let commentCard;
  loader.style.display = 'none';
  if (typeof (data) === 'object') {
    totalComment = data.length;
    sessionStorage.setItem('totalcomment', totalComment);
    data.forEach((comment) => {
      commentCard = `<div class="space">
  <p class="font16">${comment.body}</p>
  <p class="font12">by Akinremi Olumide</p>
  <span class="text-holder">${new Date(comment.createdon).toDateString()}</span>
  </div>`;
      commentContainer.insertAdjacentHTML('beforeend', commentCard);
    });
    return;
  }
  commentCard = `<div class="space">
  <p class="font16">${data}</p></div>`;
  commentContainer.insertAdjacentHTML('beforeend', commentCard);
  return;
});

let meetupData = JSON.parse(sessionStorage.getItem('meetupObj'));
meetupData = meetupData.find(data => data.id === meetupId);
let questionData = JSON.parse(sessionStorage.getItem('questionObj'));
questionData = questionData.find(data => data.id === questionId);

const questionCard = ` <h4><a href="meetup-single.html">Meetup: ${meetupData.topic}</a></h4>
    <h6 class="font12">Location: @${meetupData.location}</h6>
    <p class="font16">${questionData.body}</p>
    <span class="text-holder">
      <ul class="details font12">
        <li>${new Date(questionData.createdon).toDateString()}</li>
        <li>${sessionStorage.getItem('totalcomment')} Comments</li>
      </ul>
      <a href="comment.html"><button id="showAddComment" type="button" class="font12 sm">Add Comment</button></a>
    </span>`;
questionContainer.insertAdjacentHTML('beforeend', questionCard);

document.getElementById('showAddComment').addEventListener('click', (e) => {
  e.preventDefault();
  addCommentView.style.display = 'block';
  commentContainer.style.display = 'none';
});

document.getElementById('btncancel').addEventListener('click', (e) => {
  e.preventDefault();
  title.innerHTML = 'Comments';
  commentContainer.style.display = 'block';
  addCommentView.style.display = 'none';
});

document.getElementById('btnadd').addEventListener('click', (e) => {
  e.preventDefault();
  if (commentMessage.value === '') {
    error.innerHTML = 'Comment message is required';
    alert.style.display = 'block';
    return;
  }
  const newComment = { body: commentMessage.value };
  apiCall(url, 'POST', newComment).then((data) => {
    if (data) {
      location.reload();
      return;
    }
  });
});
