var express = require('express');
var router = express.Router();
const Event = require('../models/events');
const Film = require('../models/films');
const User = require('../models/users')
const { checkBody, createFilmIfNotExists, autentification} = require('../modules/utils');
const { isAllOf } = require('@reduxjs/toolkit');

//Route qui permet de récupérer le film
router.get("/:filmId/:token/film", async (req, res) => {
	try {
		//Conversion de l'ID du film en nombre
		const filmId = Number(req.params?.filmId);
		const user = await User.findOne({ token: req.params.token });

		if (req.params && filmId && user._id) {
			const film = await Film.findOne({ tmdbId: filmId })
            .populate('comments.user')
            .populate()
			if (film) {
				const filmData = {
					tmdbId: film.tmdbId,
					likes: film.likes.length,
					comments: film.comments.length,
					isLiked: film.likes.includes(user._id),
				};
				res.json({ result: true, ...filmData });
			} else {
				res.json({ result: false, error: "Not found" });
			}
		}
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
	}
});

//Route qui récupère les événements selon le filmId
router.get("/:tmdbId/:token/events", async (req, res) => {
    try {
        const user = await User.findOne({ token: req.params.token });
        // Récupération du film correspondant au tmdbId
        const film = await Film.findOne({ tmdbId: req.params.tmdbId });
        
        if (!film) {
            return res.status(404).json({
                success: false,
                message: "Aucun film trouvé avec cet ID.",
            });
        }

        // Récupération des événements liés à ce film
        const allEvents = await Event.find({ filmId: film._id })
            .populate('filmId')
            .populate('comments.user')
            .populate('participants')
            .populate('owner');

        if (allEvents.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Aucun événement trouvé pour ce film.",
            });
        }
        
        // Réponse avec les événements trouvés
        const events = allEvents.map(event => {
            return {
                _id: event._id,
                owner: {
                    username: event.owner.username,
                    avatar: event.owner.avatar
                },
                location: event.location, 
                date: event.date,
                comments: event.comments.map((comment) =>({
                    username: comment.user.username,
                    avatar: comment.user.avatar,
                    date: comment.date,
                    content: comment.content,
                })),
                participants: event.participants?.map((participant) => ({
                    username: participant.username,
                    avatar: participant.avatar,
                })),
                isParticipate: event.participants.some((p) => p._id.toString() === user._id.toString()),
                description: event.description,
                title: event.title,
            }
        })
        res.json({ success: true, events: events });

    } catch (error) {
        console.error("Erreur serveur :", error);
        res.status(500).json({
            success: false,
            message: "Erreur serveur",
            error: error.message,
        });
    }
});

//Route pour joindre un événement existant selon son _id
router.post("/:eventId/joingEvent", async(req, res) => {
    try {
        if (!checkBody(req.body, ['user'])) {
            res.json({ result: false, error: 'Missing or empty fields' });
            return
        }
        
        const eventId = req.params?.eventId;
        //Récuperer l'ObjectID de l'utilisateur à partir du token
        const user = await autentification(req.body.user);
        let participate = false;

        if (req.params && eventId) {
            Event.findOne({_id: eventId})
            
            .then(data => {
                if (data.participants.includes(user.userId)) {
                    const participants = data.participants.filter(el => el.toString() !== user.userId.toString());
                    data.participants = participants;
                    participate = false;
                } else {
                    data.participants.push(user.userId);
                    participate = true;
                }
                data.save().then(() => {
                    res.json({ result: true, participation: {
                        participantsNbr: data.participants.length, 
                        isParticipate: participate
                    } });
                });
            });
        } else {
            res.json({ result: false, error: 'error while checking/joing event'});
        }   
    }  catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});

//Route qui permet de récupérer tous les commentaires d'un film
router.get("/:filmId/comments", async (req, res) => {
	try {
		//Conversion de l'ID du film en nombre
		const filmId = Number(req.params?.filmId);

		if (req.params && filmId) {
			const film = await Film.findOne({ tmdbId: filmId }).populate(
				"comments.user"
			);
			if (film) {
				//Tri des commentaires selon la date
				const { _id, tmdbId, likes } = film;
				const comments = film.comments
					.sort((a, b) => b.date - a.date)
					.map((comment) => {
						return {
							date: comment.date,
							username: comment.user.username,
							content: comment.content,
							avatar: comment.user.avatar,
						};
					});

				res.json({ result: true, comments });
			} else {
				res.json({ result: false, error: "Not found" });
			}
		}
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
	}
});

//Route qui permet de récupérer le film 
/*router.get('/:filmId/film', (req, res) => {
    try {
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);
        
        if (req.params && filmId) {
            Film.findOne({tmdbId: filmId})
            .populate('comments.user')
            .populate('likes')
            .then(data => {
                if (data !== null) {
                    //Tri des commentaires selon le moment de le
                    data.comments.sort((a, b) => b.date - a.date)
                    console.log('apres', data.likes)
                    res.json({ result: true, film: data });
                } else {
                    res.json({ result: false, error: 'Not found' });
                }
            });
        }
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});
*/

//Route qui permet d'jouter un commentaire sur un film dans la BDD
router.post('/:filmId/comment', async(req, res) => {
    try {
        if (!checkBody(req.body, ['user', 'content'])) {
            res.json({ result: false, error: 'Missing or empty fields' });
            return
        }
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);
        //
        const user = await autentification(req.body.user);
        
        if (req.params && filmId) {
            const isFilmExists = await createFilmIfNotExists(filmId);
            if (isFilmExists) {
                Film.findOne({tmdbId: filmId})
                .then(data => {
                    const newComment = {
                        user: user.userId,
                        content: req.body.content,
                        date: new Date(),
                    }; 
                    data.comments.push(newComment);
                    data.save().then(() => {
                        res.json({ result: true, film: data }); 
                    });
                });
            } else {
                res.json({ result: false, error: 'error while checking/creating film'});
            }
            
        } else {
            res.json({ result: false, error: 'invalid filmId'});
        }    
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});

//Route qui permet d'ajouter/supprimer un like à un film
router.post('/:filmId/like', async(req, res) => {
    try {
        if (!checkBody(req.body, ['user'])) {
            res.json({ result: false, error: 'Missing or empty fields' });
            return
        }
        //Conversion de l'ID du film en nombre
        const filmId = Number(req.params?.filmId);
        //Récuperer l'ObjectID de l'utilisateur à partir du token
        const user = await autentification(req.body.user);

        if (req.params && filmId) {
            const isFilmExists = await createFilmIfNotExists(filmId);
            if (isFilmExists) {
                Film.findOne({tmdbId: filmId})
                .then(data => {
                    if (data.likes.includes(user.userId)) {
                        const likes = data.likes.filter(el => el.toString() !== user.userId.toString());
                        data.likes = likes;
                    } else {
                        data.likes.push(user.userId);
                    }
                    data.save().then(() => {
                        res.json({ result: true, film: data });
                    });
                });
            } else {
                res.json({ result: false, error: 'error while checking/creating film'});
            }
            
        } else {
            res.json({ result: false, error: 'invalid filmId'});
        }    
    } catch (error) {
        res.status(500).json({ result: false, error: 'Internal server error' });
    }
});




module.exports = router;
