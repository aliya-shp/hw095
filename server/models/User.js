const mongoose = require('mongoose');
const {nanoid} = require("nanoid");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin']
  },
  avatar: String,
  displayName: {
    type: String,
    required: true,
  },
  facebookId: String,
});

UserSchema.methods.generateToken = function() {
  this.token = nanoid();
};

UserSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;