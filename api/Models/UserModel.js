require('../Helpers/Conn');
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  image: String,
});

module.exports = mongoose.model('user', UserSchema);