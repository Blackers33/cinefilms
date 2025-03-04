var express = require('express');
var router = express.Router();

const uid2 = require('uid2');
const bcrypt = require('bcrypt');

require('../models/connection');
const User = require('../models/users');

const { checkBody } = require('../modules/checkBody');

  
  //POST new user (inscription)
  router.post('/signup', (req, res) => {
  const hash = bcrypt.hashSync(req.body.password, 10)
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }  
  // Check if the user has not already been registered
  User.findOne({ username: { $regex: new RegExp(req.body.username, 'i') } }).then(data => {
    if (data === null) {
      const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token : newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});


//POST user signin (connexion)
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ username: { $regex: new RegExp(req.body.username, 'i') } }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token : data.token });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});


//PUT creation de profile
router.put('/profil/:token', (req, res) => {
User.findOne({ token: req.params.token }).then(data => {
  if (data)
  User.updateOne ({token: req.params.token},
    {
    avatar: req.body.avatar,
    age: req.body.age,
    genre: req.body.genre,
    location: req.body.location,
    favMovies: req.body.favMovies,
    favGenres: req.body.favGenres,
    biography: req.body.biography,
  }).then(updatedData => {
    res.json({ result: true, message: 'Profil updated', profil: updatedData})
  }); else {
    res.json({ result: false, message: 'No corresponding profil'})
  }
});
});


module.exports = router;
