fetch('https://akinmyde-questioner.herokuapp.com/api/v1/meetups')
  .then(resp => resp.json())
  .then((results) => {
    const { data } = results;
    const container = document.getElementsByClassName('meetup-card')[0];
    data.forEach((meetup) => {
      const {
        id,
        topic,
        happeningon,
        location,
        images,
      } = meetup;
      const card = `<a class="meetup-link" id="${id}" href="#">
    <div>
      <img class="image" src="${images[0]}" alt="image">
      <h4><a id=${id} class="meetup-link" href="#">${topic}</a></h4>
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
  })
  .catch((err) => {
    console.log(err);
  });
