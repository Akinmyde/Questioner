import jwt from 'jsonwebtoken';

class Authenticate {
  static authToken(id, isAdmin) {
    return jwt.sign({ id, isAdmin }, process.env.SECRET, { expiresIn: '3h' });
  }

  static decode(token) {
    return jwt.verify(token, process.env.SECRET);
  }
}

export default Authenticate;
