var express = require('express');
var router = express.Router();

const uid2 = require('uid2');
const token = uid2(32);

const bcrypt = require('bcrypt');
const hash = bcrypt.hashSync('password', 10);

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST new user (inscription)


module.exports = router;
