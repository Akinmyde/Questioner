import db from '../models/index.models';
import helpers from '../helpers/index.helpers';

const { dateFormater } = helpers;

class UserController {
  static signUp(req, res) {
    const { email, password, username } = req.body;
    const newUser = {
      id: db.users.length + 1,
      email: email.trim(),
      username: username.trim(),
      password: password.trim(),
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
      user => (user.email === email.trim()
      || user.username === email.trim())
      && (user.password === password.trim()),
    );
    if (userFound) {
      return res.status(200).send({
        status: 200,
        message: 'Login was successfull',
      });
    }
    return res.status(401).send({
      status: 401,
      error: 'Login failed',
    });
  }
}

export default UserController;
