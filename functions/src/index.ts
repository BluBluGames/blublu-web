import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

//ssr
const universal = require(`${process.cwd()}/dist/blublu-web/server/main`).app;
export const ssr = functions.https.onRequest(universal);

//sendgrid
import * as sendgrid from '@sendgrid/mail';

const cors = require('cors')({
  origin: true,
});

exports.emailMessage = functions.https.onRequest((req, res) => {
  const { email, message } = req.body;
  return cors(req, res, () => {
    const msg: any = {
      from: 'blublu.main@gmail.com',
      to: 'ambrozy.main@gmail.com',
      templateId: 'd-8943994ad19a4b7fb51dbaa9f51e5911',
      dynamicTemplateData: {
        email: email,
        message: message,
      },
    };
    sendgrid.setApiKey(
      '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'
    );
    sendgrid
      .send(msg)
      .then(() => {
        res.status(200).send('{ "status": "success"}');
      })
      .catch((err) => {
        res
          .status(500)
          .send('{ "status": "error", "errorMessage": "' + err + '"}');
      });
  });
});
