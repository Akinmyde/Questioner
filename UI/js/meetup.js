const upVote = document.getElementsByClassName('upvote');
const downVote = document.getElementsByClassName('downvote');
const questions = document.getElementById('questions');
const addQuestion = document.getElementById('add-question');
const title = document.getElementById('title');
const questionTitle = document.getElementById('questiontitle')
const body = document.getElementById('body');

addQuestion.style.display = 'none';

document.getElementById('btnshow').addEventListener('click', (e) => {
  e.preventDefault();
  title.innerHTML = 'Add Question'
  questions.style.display = 'none';
  addQuestion.style.display = 'block';
})

document.getElementById('btncancel').addEventListener('click', () => {
  title.innerHTML = 'Questions';
  questions.style.display = 'block';
  addQuestion.style.display = 'none';
})

document.getElementById('btnadd').addEventListener('click', () => {
  const hr = document.createElement('hr');
  const h4 = document.createElement('h4');
  h4.textContent = questionTitle.value;
  const par1 = document.createElement('p');
  par1.textContent = body.value;
  par1.className = 'font16';
  const par2 = document.createElement('p');
  par2.textContent = 'by Akinremi Olumide';
  par2.className = 'font16';
  const span = document.createElement('span');
  span.className = 'text-holder';
  const ul = document.createElement('ul');
  ul.classList = 'details font12';

  const li1 = document.createElement('li');
  li1.textContent = 'Feb 29 2017';
  ul.appendChild(li1);

  const li2 =  document.createElement('li');
  const a1 = document.createElement('a');
  a1.href = "";
  a1.className = 'upvote';
  const i1 = document.createElement('i');
  i1.classList = 'fas fa-thumbs-up';
  const innerSpan1 = document.createElement('span');
  innerSpan1.className = 'num'
  innerSpan1.innerHTML = '0';
  a1.appendChild(i1);
  a1.appendChild(innerSpan1);
  li2.appendChild(a1)
  ul.appendChild(li2)

  const li3 =  document.createElement('li');
  const a2 = document.createElement('a');
  a2.href = "";
  a2.className = 'downvote';
  const i2 = document.createElement('i');
  i2.classList = 'fas fa-thumbs-down';
  const innerSpan2 = document.createElement('span');
  innerSpan2.className = 'num'
  innerSpan2.innerHTML = '0';
  a2.appendChild(i2);
  a2.appendChild(innerSpan2);
  li3.appendChild(a2)
  ul.appendChild(li3)

  span.appendChild(ul)

  const navlink = document.createElement('a');
  navlink.href = 'comment.html';
  const button = document.createElement('button');
  button.type = 'button';
  button.classList = 'font12 sm';
  button.innerHTML = 'Comments'
  navlink.appendChild(button);

  span.appendChild(navlink);

  questions.appendChild(hr);
  questions.appendChild(h4);
  questions.appendChild(par1);
  questions.appendChild(par2);
  questions.appendChild(span);

  questions.style.display = 'block';
  addQuestion.style.display = 'none';
})

for (let i = 0; i < upVote.length; i++) {
  upVote[i].addEventListener('click', (e) => {
    e.preventDefault();
    let number = parseInt(upVote[i].children[1].innerHTML, 10);
    number +=1;
    return upVote[i].children[1].innerHTML = number;
  })
}

for (let i = 0; i < downVote.length; i++) {
  downVote[i].addEventListener('click', (e) => {
    e.preventDefault();
    let number = parseInt(downVote[i].children[1].innerHTML, 10);
    number -=1;
    return downVote[i].children[1].innerHTML = number;
  })
}