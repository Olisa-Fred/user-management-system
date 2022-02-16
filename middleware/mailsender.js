const nodemailer = require('nodemailer');
require('dotenv').config();

const mailSender = async (sentTo, subject, text) =>{

    try {
        const transport = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            }
        })

        const mailOptions = {
            from: process.env.USER,
            to: sentTo,
            subject: subject,
            text: text
          };

        return transport.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
          });
    } catch (error) {
        console.log(error);
    }

}
module.exports = mailSender;