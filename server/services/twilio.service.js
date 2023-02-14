const config  = require ('../../config/config');

const accountSid = config.twilio.accountSid;
const authToken = config.twilio.authToken;

const twilio = require ('twilio');
var client = new twilio(accountSid, authToken);
module.exports.smsOTP = (options) => {
  console.log(options.phoneNumber)
  client.messages.create({
    body: `Node-Express: Your OTP  ${options.otp}`,
    to:'+91'+options.phoneNumber,  // Text this number
    from: '+16603120680' // From a valid Twilio number
  })
   .then(() => {
      //console.log(messages.sid);
   })
   .catch(() => {
     //console.log(err);
   });
}


