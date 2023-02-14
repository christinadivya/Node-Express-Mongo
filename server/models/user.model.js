import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import APIError from '../helpers/APIError';



const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');

const SALT_WORK_FACTOR = 10;
/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  organisation: {
    type: String,
  },
  phoneNumber: {
    type: String,
    unique: true,
    sparse: true
  },
  userName: {
    type: String,
    unique: true,
    sparse: true
  },
  uid: {
    type: String,
    unique: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    index: true
  },
  baseURL: {
    type: String
  },
  password: {
    type: String
  },
  otp: {
    type: String
  },
  linkedinId: {
    type: String
  },
  googleId: {
    type: String
  },
  facebookId: {
    type: String
  },
  updatedAt: {
    type: Date
  },
  createdAt: {
    type: Date
  }
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

UserSchema.pre('save', function setTimestamp(next) {
  const now = new Date();
  const user = this;

  user.updatedAt = now;
  if (!user.createdAt) {
    user.createdAt = now;
  }
  next();
});

UserSchema.pre('save', function encryptPassword(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  // generate a salt
  return bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err);
    // hash the password using our new salt
    return bcrypt.hash(user.password, salt, (err1, hash) => {
      if (err1) return next(err1);
      // override the cleartext password with the hashed one
      user.password = hash;
      return next();
    });
  });
});

/**
 * Methods
 */
UserSchema.method({
  comparePassword: function comparePassword(pass, cb) {
    bcrypt.compare(pass, this.password, (err, isMatch) => {
      if (err) return cb(err);
      return cb(null, isMatch);
    });
  }
});

/* virutals */

UserSchema.virtual('itemName').get(function returnName() {
  return `${this.firstName} ${this.lastName}`;
});

/**
 * Statics
 */
UserSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({ page, limit, search }) {
    let query = {};
    if (search && search.length > 0) {
      query = { firstName: new RegExp(search, 'i') };
    }
    return this.paginate(query, {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: { createdAt: -1 }
    });
  }
};

UserSchema.plugin(uniqueValidator);
UserSchema.plugin(mongoosePaginate);

export default mongoose.model('User', UserSchema);