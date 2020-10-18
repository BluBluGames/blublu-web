//ssr
import * as functions from 'firebase-functions';
const universal = require(`${process.cwd()}/dist/blublu-web/server/main`).app;
export const ssr = functions.https.onRequest(universal);

//sendmail
const cors = require('cors')({origin: true});
import admin = require('firebase-admin');
const nodemailer = require('nodemailer');
import {EmailTemplateGenerator} from './SendEmail/emailTemplateGenerator'

require('dotenv').config()
const {SENDER_EMAIL, SENDER_PASSWORD, SEND_EMAIL_TO}= process.env;

admin.initializeApp()

const transporter = nodemailer.createTransport({
  host:'smtp.gmail.com',
  secure:true,
  port:465,
  service: 'gmail',
  auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
  }
});
exports.sendMail = functions.https.onRequest((req, res) => {
  // if(req.method !== 'POST') {
  //   const error = new Error('Only POST requests are accepted')
  //   throw error
  // }
  const { email, message } = req.body;

  cors(req, res, () => {
      const templateGenerator = new EmailTemplateGenerator(email, message);
      const emailTemplate = templateGenerator.getTemplate()
      
      const mailOptions = {
          from: 'BluBlu Games <'+SENDER_EMAIL+'>',
          to: SEND_EMAIL_TO,
          subject: 'BluBlu Games Contact Request',
          text: emailTemplate
          // html: emailTemplate
      };

      // returning result
      return transporter.sendMail(mailOptions, (error: { toString: () => any; }, info: any) => {
          if(error){
              return res.send(error.toString());
          }
          return res.send('Sent');
      });
  });    
});