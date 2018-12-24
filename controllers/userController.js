const db = require('../models/index.models');
const Middleware = require('../middlewares/index.middlewares');

class UserController {
  static signUp(req, res) {
    const { email, password, username } = req.body;
    const newUser = {
      id: db.users.length + 1,
      email,
      username,
      password,
      registered: Middleware.dateFormater(),
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

    const userFound = db.users.find(x => (x.email === email) && (x.password === password));
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

module.exports = UserController;
