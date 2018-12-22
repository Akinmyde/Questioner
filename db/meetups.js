const meetup = [
  {
    id: 1,
    createdOn: Date.now(),
    topic: 'Andela Bootcamp',
    location: 'Epic Tower',
    happeningOn: '12/12/2018',
    images: 'url',
    Tags: ['Developers', 'Programmer'],
  },
  {
    id: 2,
    createdOn: Date.now(),
    topic: 'NodeJs',
    location: 'Epic Tower',
    happeningOn: '12/12/2018',
    images: 'url',
    Tags: ['Javascript', 'Html/css'],
  },
];

const question = [
  {
    id: 1,
    createdOn: Date,
    createdBy: 21, // represents the user asking the question
    meetup: 11, // represents the meetup the question is for
    title: 'What Do I Need To Do To Succeed In The Bootcamp',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
    vote: 0,
  },
  {
    id: 2,
    createdOn: Date,
    createdBy: 20, // represents the user asking the question
    meetup: 15, // represents the meetup the question is for
    title: 'Please I Need To Know More About The Bootcamp',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
    vote: 0,
  },
];

module.exports = { meetup, question };
