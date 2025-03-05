var express = require('express');
var router = express.Router();
const Genre = require('../models/genres');


//GET all genres
router.get('/', (req, res) => {
    Genre.find().then(data => {
        res.json({result: true, genre:data});
    });
});

module.exports = router;