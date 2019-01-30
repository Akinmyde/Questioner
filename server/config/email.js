
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const sendEmail = async (to, subject, message) => {
  try {
    const env = process.env.NODE_ENV || 'development';
    let transporter;
    if (env === 'development' || env === 'test') {
      const account = await nodemailer.createTestAccount();
      // create reusable transporter object using the default SMTP transport
      transporter = await nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
      });
    } else {
      transporter = await nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
    }
    // setup email data with unicode symbols
    const mailOptions = {
      from: '"Questioner" <no-reply@questioner.com>', // sender address
      to, // list of receivers
      subject, // Subject line
      html: message, // html body
    };

    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
  }
};

export default sendEmail;
