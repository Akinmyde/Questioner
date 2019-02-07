const token = localStorage.getItem('token');
const totalPost = document.getElementById('totalpost');
const loader = document.getElementById('overlay');
const totalComment = document.getElementById('totalcomments');
const totalUpcoming = document.getElementById('totalupcoming');
const upcomigMeetupContainer = document.getElementById('upcomigmeetupcontainer');
// Get the total of user questions
const totalQuestionUrl = 'https://akinmyde-questioner.herokuapp.com/api/v1/questions/user';
const totalCommentUrl = 'https://akinmyde-questioner.herokuapp.com/api/v1/comments/user';
const upcomingMeetupUrl = 'https://akinmyde-questioner.herokuapp.com/api/v1/meetups/upcoming';

const fetchData = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json', token },
};
loader.style.display = 'block';
fetch(totalQuestionUrl, fetchData).then(resp => resp.json())
  .then((result) => {
    const { data } = result;
    if (data[0].count > 0) {
      totalPost.innerHTML = data[0].count;
    } else {
      totalPost.innerHTML = 0;
    }
  });
fetch(totalCommentUrl, fetchData).then(resp => resp.json())
  .then((result) => {
    const { data } = result;
    if (data[0].count > 0) {
      totalComment.innerHTML = data[0].count;
    } else {
      totalComment.innerHTML = 0;
    }
  });
fetch(upcomingMeetupUrl, fetchData).then(resp => resp.json())
  .then((result) => {
    loader.style.display = 'none';
    const { data } = result;
    data.forEach((meetup) => {
      const card = `<a class="meetup-link" id="${meetup.id}" href="meetup-single.html">
      <div>
        <img class="image" src="${meetup.images[0]}" alt="image">
        <h4><a id=${meetup.id} class="meetup-link" href="meetup-single.html">${meetup.topic}</a></h4>
        <h6>@${meetup.location}</h6>
        <span class="text-holder">
          <ul class="details">
            <li>${new Date(meetup.happeningon).toDateString()}</li>
          </ul>
        </span>
      </div>
    </a>`;
      upcomigMeetupContainer.insertAdjacentHTML('beforeend', card);
    });
    if (data.length > 0) {
      totalUpcoming.innerHTML = data.length;
    } else {
      totalUpcoming.innerHTML = 0;
    }
  });
