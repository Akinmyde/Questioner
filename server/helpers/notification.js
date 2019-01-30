import jwt from 'jsonwebtoken';
import sendEmail from '../config/email';
import template from './template';

class Notification {
  static signUp(email) {
    const subject = 'Welcome to Questioner!!!';
    const message = template('<p>We are thrilled to have you...</p> <p>At Questioner, we know the importance of Meetups and Questions. That\'s is why we are here to help you prioritize questions for your meetup. With Questioner, you don\'t need to worry about the trending question/questions for your meetup we already got that covered for you</p>');

    sendEmail(email, subject, message);
  }

  static forgetPassword(email, url) {
    const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '12h' });
    const link = url + token;
    const subject = 'Password Reset';
    const message = template(`<p>Someone, probably you requested for a password reset</p> <p>follow this link to reset your password <a href=${link}>Reset my password</a></p><br><b>Please note that this link expires in 12hours and you can only use it once</b><p>If you didn't request for a password reset, ignore this email and nothing will happen</p>`);

    sendEmail(email, subject, message);
  }

  static passwordReset(email) {
    const subject = 'Password was changed';
    const message = template('<p>Your password was changed successfuly</p>');

    sendEmail(email, subject, message);
  }
}

export default Notification;
