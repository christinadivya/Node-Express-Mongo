const Joi = require ('joi');

module.exports = {
  // POST /api/users
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      organisation: Joi.string().optional(),
      baseURL: Joi.string().optional(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().regex(/[0-9]{10}/).required(),
      password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).required().options({ language: { string: { regex: { base: 'should be atleast 8, having One Caps, One Number, and One special character' } }, label: 'Password' } }),
      confirmPassword: Joi.any().valid(Joi.ref('password')).required().options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation' } })
    }
  },


  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      department: Joi.string(),
      role: Joi.string(),
      email: Joi.string().email().required(),
      phoneNumber: Joi.string().regex(/[0-9]{10}/).required(),
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      userName: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/auth/receive-otp
  recieveOtp: {
    body: {
      phoneNumber: Joi.string().regex(/[0-9]{10}/).required()
    }
  },

   // POST /api/auth/login-otp
   loginOtp: {
    body: {
      otp: Joi.number().required()
    }
  },

  // POST /api/auth/reset-password
  resetPassword: {
    body: {
      otp: Joi.string().required(),
      newPassword: Joi.string().required().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/).options({ language: { string: { regex: { base: 'should be atleast 8, having One Caps, One Number, and One special character' } }, label: 'Password' } }),
      confirmPassword: Joi.any().valid(Joi.ref('newPassword')).options({ language: { any: { allowOnly: 'must match password' }, label: 'Password Confirmation' } })
    }
  },
}
