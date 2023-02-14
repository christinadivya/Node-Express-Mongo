const jwt  = require ('jsonwebtoken');
const httpStatus  = require ('http-status');
const OTP  = require ('otp-generator');
const APIError  = require ('../helpers/APIError');
const config  = require ('../../config/config');
const User  = require ('../models/user.model');
const EmailService  = require ('../services/email.service');
const Twilio  = require ('../services/twilio.service');
const firebase =  require('firebase');     

function generateToken(user) {
  const token = jwt.sign({
    userName: user.userName,
    email: user.email,
    id: user._id
  }, config.jwtSecret);
  return token;
}

// Login with OTP send to EMAIL given

function login(req, res, next) {
  const { userName, password } = req.body;
  const criteria = (userName.indexOf('@') === -1) ? { userName } : { email: userName };
  const query = User.findOne(criteria)
  query.then((user) => { // eslint-disable-line consistent-return
    if (user) {
      user.comparePassword(password, (err, valid) => {
        if (err) {
          return next(new APIError('Internal Server Error', httpStatus.BAD_REQUEST, true));
        }
        if (!valid) {
          return next(new APIError('Invalid Password', httpStatus.BAD_REQUEST, true));
        }

        const token = jwt.sign({
          userName: user.userName,
          email: user.email,
          role: user.role,
          id: user._id
        }, config.jwtSecret);

        return res.json({
          token,
          user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            userName: user.userName,
            phoneNumber: user.phoneNumber
          },
          role: user.role
        });
      });
    } else {
      const err = new APIError('Invalid Email or Username', httpStatus.BAD_REQUEST, true);
      return next(err);
    }
  });
}

// Login with OTP send to PHONENUMBER given

function loginOtp(req, res, next) {
  const { otp } = req.body;
  User.findOne({ otp }).then((user) => {
    if (user) {
      const token = jwt.sign({
        userName: user.userName,
        email: user.email,
        role: user.role,
        id: user._id
      }, config.jwtSecret);

      return res.json({
        token,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userName: user.userName,
          phoneNumber: user.phoneNumber
        },
        role: user.role
      });
    }
   else {
    const err = new APIError('Invalid Email or Username', httpStatus.BAD_REQUEST, true);
    return next(err);
  }
});
}


// Receive OTP to given phonenumber through TWILIO INTEGRATION

function recieveOtp(req, res, next) {
  const { phoneNumber } = req.body;
  User.findOne({ phoneNumber: phoneNumber }).then((user) => { // eslint-disable-line consistent-return
    if (user) {
      const otp = OTP.generate(6, { upperCase: false, specialChars: false, alphabets: false });
      // Send OTP to phoneNumber given 
      user.otp = otp; // eslint-disable-line no-param-reassign
      user.save()
        .then((savedUser) => { // eslint-disable-line consistent-return
            Twilio.smsOTP({ otp: savedUser.otp, phoneNumber: savedUser.phoneNumber });
            return res.json({ message: 'OTP SMS sent!' });

          }) .catch(() => {
            next(new APIError('Internal Server Error', httpStatus.INTERNAL_SERVER_ERROR, true));
          });
    } else {
        return next(new APIError('This phone number is not registered', httpStatus.BAD_REQUEST, true));
      }
    }).catch(() => {
      next(new APIError('Internal Server Error', httpStatus.INTERNAL_SERVER_ERROR, true));
    });
}

// Give email to recieve OTP to RESET password

function forgotPassword(req, res, next) {
  const { email } = req.body;
  const criteria = (email.indexOf('@') === -1) ? { phoneNumber: email } : { email };
  const isEmail = !(email.indexOf('@') === -1);

  const query = User.findOne(criteria);
  query.then((user) => { // eslint-disable-line consistent-return
    if (user) {
      // Generate and set OTP to user
      const otp = OTP.generate(6, { upperCase: false, specialChars: false, alphabets: false });
      // Send OTP Email if email given
      user.otp = otp; // eslint-disable-line no-param-reassign
      user.save()
        .then((savedUser) => { // eslint-disable-line consistent-return
          if (isEmail) {
            const emailParams = {
              firstName: savedUser.firstName,
              to: savedUser.email,
              otp: savedUser.otp
            };
            EmailService.forgotPassword(emailParams);
            res.json({ message: 'OTP Email sent!' });
          } else {
            Twilio.smsOTP({ otp: savedUser.otp });
            return res.json({ message: 'OTP SMS sent!' });
          }
        })
        .catch(() => {
          next(new APIError('Internal Server Error', httpStatus.INTERNAL_SERVER_ERROR, true));
        });
      // Send OTP SMS if phone number given
    } else {
      if (isEmail) {
        return next(new APIError('This email is not registered', httpStatus.BAD_REQUEST, true));
      }
      return next(new APIError('Phone number not registered', httpStatus.BAD_REQUEST, true));
    }
  });
}

// function verifyOTP(req, res) {
//   const { otp } = req.body;
//   User.findOne({ otp }).then((user) => {
//     if (user) {
//       return res.json({ valid: true });
//     }
//     return res.status(400).json({ valid: false });
//   });
// }

// Give received OTP from mail to RESET password

function resetPassword(req, res, next) {
  const { otp, newPassword } = req.body;
  User.findOne({ otp }).then((user) => { // eslint-disable-line consistent-return
    if (user) {
      user.password = newPassword; // eslint-disable-line no-param-reassign
      user.otp = ''; // eslint-disable-line no-param-reassign
      user.save().then(() => res.json({ message: 'Password reset successfully' }));
    } else {
      return next(new APIError('Invalid OTP', httpStatus.INTERNAL_SERVER_ERROR, true));
    }
  }).catch(err => next(new APIError(err, httpStatus.INTERNAL_SERVER_ERROR, true)));
}


function sendOTPFirebase (req, res){
    authy.phones().verification_start(req.body.phoneNumber, req.body.countryCode,{
      via: 'sms',
      locale: 'en'
    }, (err, res) => {
      if (err){
        return res.json({ error: err })
      }       
      else{
        res.json({
        message: 'Success',
        value: res})
        }
      })
    }     
function  verifyOTPFirebase (req, res){
    authy.phones().verification_check(req.query.phoneNumber, req.query.countryCode, req.params.otp, (err, res) =>{
      if (err)
        return req.json({ error: err }) 
      if (res.success){  
        console.log("Phone number verified and register user!!!")

      }      })
}

module.exports = { login, forgotPassword, resetPassword, loginOtp, recieveOtp, sendOTPFirebase, verifyOTPFirebase };
