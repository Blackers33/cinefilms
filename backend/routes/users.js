var express = require('express');
var router = express.Router();

const uid2 = require('uid2');
const bcrypt = require('bcrypt');

require('../models/connection');
const User = require('../models/users');

const { checkBody } = require('../modules/checkBody');


//POST new user (inscription)
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['username', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  // Check if the user has not already been registered
  User.findOne({ username: { $regex: new RegExp(req.body.username, 'i') } }).then(data => {
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10)
      const newUser = new User({
        username: req.body.username,
        password: hash,
        email: req.body.email,
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});


//POST user signin (connexion)
router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password'])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: { $regex: new RegExp(req.body.email, 'i') } }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});


//PUT creation & update de profile
router.put('/profil/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data)
      User.updateOne({ token: req.params.token },
        {
          avatar: req.body.avatar,
          age: req.body.age,
          genre: req.body.genre,
          location: req.body.location,
          favMovies: req.body.favMovies,
          favGenres: req.body.favGenres,
          biography: req.body.biography,
        }).then(updatedData => {
          res.json({ result: true, message: 'Profil updated', profil: updatedData })
        }); else {
      res.json({ result: false, message: 'No corresponding profil' })
    }
  });
});

//GET profil de l'utilisateur
router.get('/profil/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    if (data) {
      res.json({
        result: true,
        profil: {
          username: data.username,
          email: data.email,
          avatar: data.avatar,
          age: data.age,
          genre: data.genre,
          location: data.location,
          favMovies: data.favMovies,
          favGenres: data.favGenres,
          biography: data.biography,
          friends: data.friends,
        }
      });
    } else {
      res.json({ result: false, error: 'No corresponding profil' });
    }
  });
})

//GET all users
router.get('/', (req, res) => {
  User.find().then((data) => {
    if (data.length > 0) {
      res.json({
        result: true,
        userslist: data.map(user => ({
          username: user.username,
          favGenres: user.favGenres,
          favMovies: user.favMovies,
          age: user.age,
          avatar: user.avatar,
          biography: user.biography,
          genre: user.genre,
          _id: user._id,
        }))
      });
      console.log(data)
    } else {
      res.json({ result: false, error: 'No users found' });
    }
  })
});

// //Add new friend
// router.post('/addfriend/:_id', (req, res) => {
//  User.friends.push(req.params.user)
//  User.save()
//  res.json({result: true, message:'Friend added'})
// })

router.post("/addFriend", async (req, res) => {
  const { userId, friendId } = req.body;

      const user = await User.findById(userId);
      const friend = await User.findById(friendId);

      // Vérifier si l'ami est déjà ajouté
      if (user.friends.includes(friendId)) {
          return res.status(400).json({ success: false, message: "Ami déjà ajouté" });
      }

      user.friends.push(friendId);
      await user.save();

      res.json({ success: true, message: "Ami ajouté avec succès !" });
  });

module.exports = router;
