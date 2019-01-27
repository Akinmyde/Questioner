
import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = (to, subject, message) => {
  const msg = {
    to,
    from: 'no-reply@questioner.com',
    subject,
    html: message,
  };
  sgMail.send(msg);
};

export default sendEmail;
