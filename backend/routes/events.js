var express = require('express');
var router = express.Router();
const Event = require('../models/events');
const Film=require('../models/films');

const { checkBody, autentification} = require('../modules/utils');

// route Get qui recuperer toutes les evenements crees par l'utilisateur 
router.get('/:token', async (req, res) => {
    try {
        // Récupérer le token de la requête
        const token = req.params.token;

        // Vérifier et décoder le token
        const user = await autentification(token); 
        if (!user) {
            return res.status(401).json({ message: "Utilisateur non authentifié." });
        }

       
        const events = await Event.find({ owner: user.userId });
        // Si l'utilisateur n'a pas d'événements créés
        if (events.length === 0) {
            return res.status(404).json({ message: "Aucun événement trouvé." });
        }

        // Retourner les événements trouvés
        res.status(200).json(events);

    } catch (error) {
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// route get qui permet de trouver tous les evenements  

router.get('/', async (req, res) => {
    try {
        const events = await Event.find();

        if (events.length === 0) {
            return res.status(404).json({ message: "Aucun événement trouvé " });
        }

        res.status(200).json({result:true,data:events});
    } catch (error) {
        res.status(500).json({ message: "Erreur lors de la récupération des événements", error: error.message });
    }
});



// route Post qui permets de creer de l'évenement 

router.post('/', async (req, res) => {
    try {
        if (!checkBody(req.body, ['location','description','title','user','tmbdId'])) {
            return res.status(400).json({ result: false, error: 'Missing or empty fields' });
        }

        const user = await autentification(req.body.user);
        if (!user) {
            return res.status(401).json({ result: false, error: 'Invalid user authentication' });
        }


        const film=Film.findOne({tmdbId:req.body.tmbdId})
        const filmId = film ? film._id : null;

        const eventData = {
            owner: user.userId,
            location: req.body.location,
            date: new Date(),
            description: req.body.description,
            title: req.body.title,
            filmId: filmId,
        };

        const newEvent = new Event(eventData);
        await newEvent.save();

        res.status(201).json({ result: true, event: newEvent });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});



// ajouter les comment sur un event
router.post('/:eventId/comment', async (req, res) => {
    try {
        if (!checkBody(req.body, ['user', 'content'])) {
            return res.json({ result: false, error: 'Missing or empty fields' });
        }
        
        const user = await autentification(req.body.user);
        if (!user) {
            return res.json({ result: false, error: 'User authentication failed' });
        }
        
        const event = await Event.findById(req.params.eventId);
        if (!event) {
            return res.json({ result: false, error: 'Event not found' });
        }
        
        const newComment = {
            user: user.userId,
            content: req.body.content,
            date: new Date(),
        };
        
        event.comments.push(newComment);
        await event.save();
        
        res.json({ 
            result: true, 
            comment: {
                user: newComment.user,
                content: newComment.content,
                date: newComment.date,
            },
        });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});

module.exports = router;