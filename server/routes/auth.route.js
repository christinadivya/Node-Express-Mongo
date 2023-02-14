const express = require ( 'express');
const validate = require ( 'express-validation');
const paramValidation = require ( '../../config/param-validation');
const authCtrl = require ( '../controllers/auth.controller');


const router = express.Router(); // eslint-disable-line new-cap

/** POST /api/auth/login - Returns token if correct username and password is provided */
router.route('/login')
  .post(validate(paramValidation.login), authCtrl.login);

router.route('/recieve-otp')
  .post(authCtrl.recieveOtp);

router.route('/login-otp')
  .post(authCtrl.loginOtp);

router.route('/forgot-password')
  .post(authCtrl.forgotPassword);

router.route('/reset-password')
  .post(validate(paramValidation.resetPassword), authCtrl.resetPassword);

// router.route('/verify-otp')
//   .post(authCtrl.verifyOTP);

router.post('/send_otp', authCtrl.sendOTPFirebase);
router.get('/verify_otp/:otp', authCtrl.verifyOTPFirebase);

module.exports = router;
