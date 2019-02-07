const container = document.getElementsByClassName('meetup-card')[0];
const link = document.getElementsByTagName('a');
const loader = document.getElementById('overlay');
const user = localStorage.getItem('isAdmin');
const modal = document.querySelector('.modal');
const closeButton = document.querySelector('.close-button');
const msg = document.querySelector('.msg');
const modalContent = document.querySelector('.modal-content');
const yes = document.querySelector('.btn-yes');
const no = document.querySelector('.btn-no');

const toggleModal = (msgText, bckColor, forColor) => {
  msg.innerHTML = msgText;
  msg.style.color = forColor || '#721c24';
  modal.classList.toggle('show-modal');
  modalContent.style.background = bckColor || '#f8d7da';
};
const removeModal = (e) => {
  if (e.target === modal) { toggleModal(''); }
};

let isAdmin;
if (user) {
  isAdmin = user;
} else {
  isAdmin = false;
}

fetch('https://akinmyde-questioner.herokuapp.com/api/v1/meetups')
  .then(resp => resp.json())
  .then((results) => {
    loader.style.display = 'none';
    const { data } = results;
    sessionStorage.setItem('meetupObj', JSON.stringify(data));
    data.forEach((meetup) => {
      let card;
      if (!isAdmin) {
        card = `<a class="meetup-link" id="${meetup.id}" href="meetup-single.html">
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
      } else {
        card = `<a class="meetup-link" id="${meetup.id}" href="meetup-single.html">
        <div>
          <img class="image" src="${meetup.images[0]}" alt="image">
          <h4><a id=${meetup.id} class="meetup-link" href="meetup-single.html">${meetup.topic}</a></h4>
          <h6>@${meetup.location}</h6>
          <span class="text-holder">
            <ul class="details">
              <li>${new Date(meetup.happeningon).toDateString()}</li>
              <li title="delete"><a href="" id="${meetup.id}" class="delete"><i class="fas fa-trash"></i></a></li>
              <li title="edit"><a class="edit" href="" id="${meetup.id}"><i class="fas fa-edit"></i></a></li>
            </ul>
          </span>
        </div>
      </a>`;
      }
      container.insertAdjacentHTML('afterbegin', card);
    });

    // Get meetup id
    for (let i = 0; i < link.length; i += 1) {
      if (link[i].className === 'meetup-link') {
        link[i].addEventListener('click', (e) => {
          e.preventDefault();
          sessionStorage.setItem('meetupid', parseInt(link[i].id, 10));
          window.location.href = 'meetup-single.html';
        });
      }
    }
    // Delete meetup
    if (isAdmin) {
      const deleteMeetup = document.getElementsByClassName('delete');
      for (let i = 0; i < deleteMeetup.length; i += 1) {
        deleteMeetup[i].addEventListener('click', (e) => {
          e.preventDefault();
          toggleModal('Are you sure you want to delete', 'white', 'black');
          yes.addEventListener('click', () => {
            const meetupId = deleteMeetup[i].id;
            const url = `https://akinmyde-questioner.herokuapp.com/api/v1/meetups/${meetupId}`;
            const token = localStorage.getItem('token');
            const fetchData = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json', token },
            };
            loader.style.display = 'block';
            fetch(url, fetchData)
              .then(res => res.json())
              .then((resp) => {
                if (resp.data) {
                  toggleModal('');
                  deleteMeetup[i].parentNode.parentNode.parentNode.parentNode.style.display = 'none';
                  loader.style.display = 'none';
                }
              });
          });
        });
      }
    }
  })
  .catch((err) => { console.log(err); });

closeButton.addEventListener('click', () => {
  toggleModal('');
});
no.addEventListener('click', () => {
  toggleModal('');
});
window.addEventListener('click', removeModal);
