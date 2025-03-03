var express = require('express');
var router = express.Router();
const Event = require('../models/events');
const Film = require('../models/films');
const Comment = require('../models/comments');  

//Route qui récupère les événements lié à un film en BDD
router.get('/:filmId', (req, res) => {
    try {
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params.filmId);

        if (req.params) {
            Event.find({tmdbId: filmId}).populate('films')
            .then(data => {
                if (data.length) {  
                    res.json({ result: true, events: data })
                } else {
                    res.json({ result: false, error: 'Not found' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});

//Route qui permet de récupérer le nombre de likes d'un film 
router.get('/:filmId', (req, res) => {
    try {
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params.filmId);

        if (req.params) {
            Event.find({tmdbId: filmId}).populate('films')
            .then(data => {
                if (data.length) {
                    res.json({ result: true, events: data.filmId.likes })
                } else {
                    res.json({ result: false, error: 'Not found' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});

//Route qui récupère les commentaires d'un film en BDD
router.get('/:filmId', (req, res) => {
    try {
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);
        if (req.params) {
            Film.find({tmdbId: filmId})
            .then(data => {
                if (data.length) {
                    res.json({ result: true, comments: data.comments })
                } else {
                    res.json({ result: false, error: 'Not found' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});

//Route qui permet d'jouter un commentaire sur un film dans la BDD
router.post('/:filmId', (req, res) => {
    try {
        if (!checkBody(req.body, ['user', 'date', 'content'])) {
            res.json({ result: false, error: 'Missing or empty fields' });
            return
        }
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);
        if (req.params) {
            Film.find({tmdbId: filmId})
            .then(data => {
                if (data.length) {
                    Comment.findOne({token: req.body.token}).populate('users')
                    .then(userData => {
                        if (userData) {
                            const newComment = new Comment({
                                user: userData._id,
                                content: req.body.content,
                                date: req.body.date,
                            });
                            data.comments.push(newComment);

                        }
                    }) 
                }    
            });
        }
        
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
})




module.exports = router;
