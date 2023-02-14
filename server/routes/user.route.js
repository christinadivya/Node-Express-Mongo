const express = require ( 'express');
const validate = require ( 'express-validation');
const paramValidation = require ( '../../config/param-validation');
const userCtrl = require ( '../controllers/user.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** GET /api/users - Get list of users */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

  module.exports = router;
