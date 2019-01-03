
const db = [];

db.users = [
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
    password: 'test',
    updatedOn: Date.now(),
  },
  {
    id: 2,
    firstname: 'Jane',
    lastname: 'Janet',
    othername: 'Ruth',
    email: 'JaneDoe@gmail.com',
    phoneNumber: '08123434466',
    username: 'Jane',
    registered: '12/12/12',
    isAdmin: false,
    password: '',
    updatedOn: Date.now(),
  },
];

db.meetups = [
  {
    id: 1,
    createdOn: '10-12-2018',
    topic: 'Andela Bootcamp',
    location: 'Epic Tower',
    happeningOn: '12-12-2018',
    images: 'url',
    Tags: ['Developers', 'Programmer'],
  },
  {
    id: 2,
    createdOn: '10-12-2018',
    topic: 'NodeJs',
    location: 'Epic Tower',
    happeningOn: '12-12-2019',
    images: 'url',
    Tags: ['Javascript', 'Html/css'],
  },
];

db.questions = [
  {
    id: 1,
    createdOn: '12/12/12',
    createdBy: 1, // represents the user asking the question
    meetup: 1, // represents the meetup the question is for
    title: 'What Do I Need To Do To Succeed In The Bootcamp',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
    votes: 0,
  },
  {
    id: 2,
    createdOn: '12/12/12',
    createdBy: 1, // represents the user asking the question
    meetup: 1, // represents the meetup the question is for
    title: 'Please I Need To Know More About The Bootcamp',
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!',
    votes: 0,
  },
];

db.rsvps = [
  {
    id: 1,
    meetup: 1,
    user: 1,
    response: 'yes',
  },
];

export default db;
