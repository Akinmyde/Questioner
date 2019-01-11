const commentView = document.getElementById('comments');
const addCommentView = document.getElementById('add-comment');
const title = document.getElementById('title');
const commentMessage = document.getElementById('commentMessage');

addCommentView.style.display = 'none';

document.getElementById('showAddComment').addEventListener('click', (e) => {
  e.preventDefault();
  addCommentView.style.display = 'block';
  commentView.style.display = 'none';
  title.innerHTML = 'Add Comment';
});

document.getElementById('btncancel').addEventListener('click', (e) => {
  e.preventDefault();
  addCommentView.style.display = 'none';
  commentView.style.display = 'block';
  title.innerHTML = 'Comments';
});

document.getElementById('btnadd').addEventListener('click', (e) => {
  e.preventDefault();

  const hr = document.createElement('hr');

  const p1 = document.createElement('p');
  p1.className = 'font16';
  p1.textContent = commentMessage.value;

  const p2 = document.createElement('p');
  p2.className = 'font12';
  p2.textContent = 'by Akinremi Olumide';

  const span = document.createElement('span');
  span.className = 'text-holder';
  span.textContent = 'Feb 29 2017';

  commentView.appendChild(hr);
  commentView.appendChild(p1);
  commentView.appendChild(p2);
  commentView.appendChild(span);

  commentMessage.value = '';
  addCommentView.style.display = 'none';
  commentView.style.display = 'block';
  title.innerHTML = 'Comments';
})