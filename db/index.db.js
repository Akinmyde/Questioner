const User = [
  {
    id: 1,
    firstname: 'John',
    lastname: 'Doe',
    othername: 'Mike',
    email: 'JohnDoe@gmail.com',
    phoneNumber: '0812345566',
    username: 'John',
    registered: '12/12/12',
    isAdmin: false,
  },
  {
    id: 1,
    firstname: 'Jane',
    lastname: 'Doe',
    othername: 'Ruth',
    email: 'JaneDoe@gmail.com',
    phoneNumber: '08123434466',
    username: 'Jane',
    registered: '12/12/12',
    isAdmin: false,
  },
];

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

const Rsvp = [
  {
    id: 1,
    meetup: 1,
    user: 1,
    response: 'yes',
  },
];

module.exports = {
  meetup, question, User, Rsvp,
};
