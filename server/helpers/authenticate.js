import jwt from 'jsonwebtoken';

class Authenticate {
  static encode(id, isAdmin) {
    return jwt.sign({ id, isAdmin }, process.env.SECRET, { expiresIn: '3000h' });
  }

  static decode(token) {
    return jwt.verify(token, process.env.SECRET);
  }
}

export default Authenticate;
