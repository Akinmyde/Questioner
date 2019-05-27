import passwordHash from 'password-hash';
import pool from '../config/connection';

const password = passwordHash.generate('testing');

const seedQuery = `
INSERT INTO users(email, username, password, isadmin)
  VALUES('testing@gmail.com', 'testing', '${password}', true);

INSERT INTO meetups(topic, location, happeningOn, images) 
  VALUES('React Meetup', 'Epic tower', 'Dec 11 2019', '{https://res.cloudinary.com/codeace/image/upload/v1548769488/Questioner/nchmsdloff13tnuu1e3q.jpg}');

INSERT INTO meetups(topic, location, happeningOn, images) 
  VALUES('Andela Bootcamp', 'NG Hub', 'Mar 11 2019', '{https://res.cloudinary.com/codeace/image/upload/v1548768190/Questioner/bkdf1kfijvto1kvutnhz.jpg}');

INSERT INTO meetups(topic, location, happeningOn, images) 
  VALUES('Question Meetup', 'Epic tower', 'Dec 11 2019', '{https://res.cloudinary.com/codeace/image/upload/v1548364902/Questioner/koujaop3flbdmpbruxrf.jpg}');

INSERT INTO meetups(topic, location, happeningOn, images) 
  VALUES('Facebook for develop', 'Civic hive', 'Dec 11 2019', '{https://res.cloudinary.com/codeace/image/upload/v1548854369/Questioner/facebook_dev_wallpaper.jpg}');

INSERT INTO meetups(topic, location, happeningOn, images) 
  VALUES('Usable', 'Cchub', 'Mar 9 2019', '{https://res.cloudinary.com/codeace/image/upload/v1548854470/Questioner/CcHub.jpg}');

INSERT INTO questions(createdby, meetup, title, body)
  VALUES(1, 1, 'What is react', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!');

INSERT INTO questions(createdby, meetup, title, body)
  VALUES(1, 2, 'What is Questioner', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit quod accusamus repudiandae impedit quasi quidem assumenda consectetur ab, beatae sit ea provident obcaecati, maxime neque ipsa ut sunt consequatur. Tenetur!');

INSERT INTO comments (createdby, questionid, body)
  VALUES(1, 1, 'Good question!!!');

INSERT INTO comments (createdby, questionid, body)
  VALUES(1, 2, 'just the right questions');
`;

const seed = async () => {
  const client = await pool.connect();
  try {
    await client.query(seedQuery);
  } catch (err) {
    console.log(err);
  } finally {
    await client.release();
  }
};

seed();
