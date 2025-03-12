const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  token: String,
  age: Number,
  genre: String,
  avatar: String,
  location: {
    name: String,
    latitude: Number,
    longitude: Number,
  },
  biography: String,
  friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
  favGenres: [Number],
  favMovies: [Number],
});

const User = mongoose.model('users', userSchema);


module.exports = User;