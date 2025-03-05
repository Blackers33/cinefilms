var express = require('express');
var router = express.Router();
const Event = require('../models/events');
const Film = require('../models/films');
const { checkBody, createFilmIfNotExists} = require('../modules/utils');


//Route qui récupère les événements liés à un film en BDD
router.get('/:filmId', (req, res) => {
    try {
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);

        if (req.params && filmId) {
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

//Route qui permet de récupérer le film 
router.get('/:filmId', (req, res) => {
    try {
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);

        if (req.params && filmId) {
            Film.findOne({tmdbId: filmId}).populate('users')
            .then(data => {
                if (data.length) {
                    res.json({ result: true, film: data })
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
        if (!checkBody(req.body, ['user', 'content'])) {
            res.json({ result: false, error: 'Missing or empty fields' });
            return
        }
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);
        if (req.params && filmId) {
            res.json({result: createFilmIfNotExists(filmId)})
            /*if (createFilmIfNotExists(filmId)) {
                Film.findOne({tmdbId: filmId})
                .then(data => {
                    const newComment = {
                        user: req.body.user,
                        content: req.body.content,
                        date: new Date(),
                    };
                    data.comments.push(newComment);
                    data.save().then(() => {
                        res.json({ result: true, film: data });
                    });
                });
            }*/
        }
        
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
})




module.exports = router;
