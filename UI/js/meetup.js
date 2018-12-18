const upVote = document.getElementsByClassName('upvote');
const downVote = document.getElementsByClassName('downvote');

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