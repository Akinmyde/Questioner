const addCommentView = document.getElementById('add-comment');
const title = document.getElementById('title');
const questionContainer = document.getElementById('question');
const commentContainer = document.getElementById('comments');
const token = localStorage.getItem('token');
const commentMessage = document.getElementById('commentMessage');
const loader = document.getElementById('overlay');
let meetupId = sessionStorage.getItem('meetupid');
let questionId = sessionStorage.getItem('questionid');
const url = `https://akinmyde-questioner.herokuapp.com/api/v1/questions/${questionId}/comments`;
let totalComment = 0;
const closeButton = document.querySelector('.close-button');
const msg = document.querySelector('.msg');
const modalContent = document.querySelector('.modal-content');
const modal = document.querySelector('.modal');

const toggleModal = (msgText, bckColor, forColor) => {
  msg.innerHTML = msgText;
  msg.style.color = forColor || '#721c24';
  modal.classList.toggle('show-modal');
  modalContent.style.background = bckColor || '#f8d7da';
};
const removeModal = (e) => {
  if (e.target === modal) { toggleModal(''); }
};

const commentCard = data => `<div class="space">
  <p class="font16">${data.body}</p>
  <p class="font12">by Akinremi Olumide</p>
  <span class="text-holder">${new Date(data.createdon).toDateString()}</span>
  </div>`;

addCommentView.style.display = 'none';

if (!meetupId) {
  window.location.href = 'meetups.html';
}
meetupId = parseInt(meetupId, 10);
questionId = parseInt(questionId, 10);

let fetchData = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', token },
};

fetch(url, fetchData).then(resp => resp.json())
  .then((result) => {
    loader.style.display = 'none';
    const { data } = result;
    if (data) {
      totalComment = data.length;
      sessionStorage.setItem('totalcomment', totalComment);
      return data.forEach(comment => commentContainer.insertAdjacentHTML('beforeend', commentCard(comment)));
    }
    return commentContainer.insertAdjacentHTML('beforeend', `<div class="space">
   <p class="font16">No question yet</p></div>`);
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
    toggleModal('Comment message is required');
  } else {
    const newComment = { body: commentMessage.value };
    fetchData = {
      method: 'POST',
      body: JSON.stringify(newComment),
      headers: { 'Content-Type': 'application/json', token },
    };
    fetch(url, fetchData).then(res => res.json())
      .then((result) => {
        const { data } = result;
        if (data) {
          commentContainer.style.display = 'block';
          addCommentView.style.display = 'none';
          toggleModal('your comment has been added', 'rgb(64, 141, 64)', 'white');
          return commentContainer.insertAdjacentHTML('beforeend', commentCard(data[0]));
        }
        return toggleModal('There was an error, try again');
      });
  }
});

closeButton.addEventListener('click', () => {
  toggleModal('');
});
window.addEventListener('click', removeModal);
