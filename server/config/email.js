
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import sgMail from '@sendgrid/mail';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (to, subject, message) => {
  try {
    const env = process.env.NODE_ENV || 'development';
    if (env === 'development' || env === 'test') {
      const account = await nodemailer.createTestAccount();
      const transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email', port: 587, secure: false, auth: { user: account.user, pass: account.pass },
      });
      const mailOptions = {
        from: '"Questioner" <no-reply@questioner.com>', to, subject, html: message,
      };
      const info = await transporter.sendMail(mailOptions);
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      return;
    }
    const msg = {
      to, from: 'Questioner-Admin@questioner.com', subject, html: message,
    };
    sgMail.send(msg);
    return;
  } catch (err) { console.log(err); }
};

export default sendEmail;
