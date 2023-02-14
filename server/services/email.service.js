const nodemailer = require ('nodemailer');
const sendInBlue = require ( 'nodemailer-sendinblue-transport');
const deeplink = require ( './deeplink.service');

const transporter = nodemailer.createTransport(sendInBlue({ apiKey: 'kOMa7XmfTVYnIU9p' }));
const frontEndURL = `${process.env.APP_URL}:${process.env.WEB_PORT}`;
function welcomeEmail(options) {
  const mailOptions = {
    from: '"node-express" <support@node-express.com>', // sender address
    to: options.toEmail, // list of receivers
    subject: 'Welcome to Node_express', // Subject line
    html: `<p>Hi ${options.firstName},</p>
    <p/> Welcome to Node-Express </p>`
  };

  sendMail(mailOptions);
}

function forgotPassword(options) {
  const mailOptions = {
    from: '"node-express" <support@node-express.com>', // sender address
    to: options.to, // list of receivers
    subject: 'Node-express - Forgot Password', // Subject line
    html: `<p>Hi ${options.firstName},</p>
    <p> OTP to reset password: ${options.otp} </p>
    <p> Go to <a href='${frontEndURL}/reset-password/true'>here<a> to reset your password </p>`
  };

  sendMail(mailOptions);
}

function invitation(options) {
  deeplink.callfcm(options.invite, (invitedata) => {
    const data = JSON.parse(invitedata);
    if (data.shortLink) {
      const mailOptions = {
        from: '"node-express" <support@node-express.com>', // sender address
        to: options.to, // list of receivers
        subject: 'Node-express - Invitation', // Subject line
        html: `<p>Hi,</p>
        <p/> You are invited to node-express, please click        
        <a href='${data.shortLink}'>here</a> </p>`
      };
      sendMail(mailOptions);
    }
  });
}


function sendMail(mailOptions) {
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(error);
    console.log(info);
  });
}

module.exports = { welcomeEmail,
  forgotPassword,
  invitation,
  sendMail
};
