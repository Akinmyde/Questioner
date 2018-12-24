import db from '../models/index.models';
import helpers from '../helpers/index.helpers';

const { dateFormater } = helpers;

class UserController {
  static signUp(req, res) {
    const { email, password, username } = req.body;
    const newUser = {
      id: db.users.length + 1,
      email,
      username,
      password,
      registered: dateFormater(),
    };

    const userFound = db.users.find(x => x.email.toString() === email);
    if (userFound) {
      return res.status(409).send({
        status: 409,
        error: 'user already exists',
      });
    }
    db.users.push(newUser);
    return res.status(201).send({
      status: 201,
      data: [newUser],
    });
  }

  static signIn(req, res) {
    const { email, password } = req.body;

    const userFound = db.users.find(
      x => (x.email === email || x.username === email) && (x.password === password),
    );
    if (userFound) {
      return res.status(200).send({
        status: 200,
        message: 'authenticated',
      });
    }
    return res.status(401).send({
      status: 401,
      error: 'authentication failed',
    });
  }
}

export default UserController;
