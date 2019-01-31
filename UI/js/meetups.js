const container = document.getElementsByClassName('meetup-card')[0];
const link = document.getElementsByTagName('a');
const loader = document.getElementById('overlay');

fetch('https://akinmyde-questioner.herokuapp.com/api/v1/meetups')
  .then(resp => resp.json())
  .then((results) => {
    loader.style.display = 'none';
    const { data } = results;
    data.forEach((meetup) => {
      const {
        id,
        topic,
        happeningon,
        location,
        images,
      } = meetup;
      const card = `<a class="meetup-link" id="${id}" href="meetup-single.html">
    <div>
      <img class="image" src="${images[0]}" alt="image">
      <h4><a id=${id} class="meetup-link" href="meetup-single.html">${topic}</a></h4>
      <h6>@${location}</h6>
      <span class="text-holder">
        <ul class="details">
          <li>${new Date(happeningon).toDateString()}</li>
        </ul>
      </span>
    </div>
  </a>`;
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
  })
  .catch((err) => {
    console.log(err);
  });
