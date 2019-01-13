import jwt from 'jsonwebtoken';

class Authenticate {
  static authToken(id) {
    return jwt.sign({ id }, process.env.SECRET, { expiresIn: '1h' });
  }
}

export default Authenticate;
