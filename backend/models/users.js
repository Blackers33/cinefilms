const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  username: String,
  password: String,
  token: String,
  age: Number,
  genre: String,
  avatar: String,
  location: {
    name: String,
    latitude: Number,
    longitude: Number,
  },
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  favGenres: [String],
  favMovies: [String],
});

const User = mongoose.model('users', userSchema);

module.exports = User;