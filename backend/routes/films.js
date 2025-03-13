var express = require("express");
var router = express.Router();
const Event = require('../models/events');
const Film = require('../models/films');
const User = require('../models/users')
const { checkBody, createFilmIfNotExists, autentification} = require('../modules/utils');

//Route GET pour recuperer les commentaire d'un evenement 
router.get("/:eventId/commentaires", async (req, res) => {
	try {
	  const { eventId } = req.params;
	  const display = true;
  // Vérifier si l'événement existe
  const event = await Event.findById(eventId)
	.populate({
	  path: "comments",
	  populate: { path: "user", select: "username avatar" }, 
	});
  
  if (!event) {
	return res.status(404).json({ message: "Événement non trouvé" });
  }
  res.status(200).json({ result: true, comments: event.comments});
	} catch (error) {
	  res.status(500).json({
		message: "Erreur lors de la récupération des commentaires",
		error: error.message,
	  });
	}
  });

//Route qui permet de récupérer le film
router.get("/:tmdbId/:token/film", async (req, res) => {
	try {
		//Conversion de l'ID du film en nombre
		const tmdbId = Number(req.params?.tmdbId);
		const user = await User.findOne({ token: req.params.token });
		const film = await Film.findOne({ tmdbId });
		const events = await Event.find({ filmId : film._id });

		if (film) {
			const filmData = {
				tmdbId: film.tmdbId,
				likes: film.likes.length,
				comments: film.comments.length,
				isLiked: film.likes.includes(user._id),
				events : events.length
			};
			res.json({ result: true, ...filmData });
		} else {
			res.json({ result: false, error: "Not found" });
		}
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
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

				res.json({ result: true, _id, tmdbId, likes, comments });
			} else {
				res.json({ result: false, error: "Not found" });
			}
		}
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
	}
});

//Route qui permet d'jouter un commentaire sur un film dans la BDD
router.post("/:filmId/comment", async (req, res) => {
	try {
		if (!checkBody(req.body, ["user", "content"])) {
			res.json({ result: false, error: "Missing or empty fields" });
			return;
		}
		//Conversion de l'ID du film en nombre
		const filmId = Number(req.params?.filmId);
		//
		const user = await autentification(req.body.user);
		if (req.params && filmId) {
			const isFilmExists = await createFilmIfNotExists(filmId);
			if (isFilmExists) {
				Film.findOne({ tmdbId: filmId }).then((data) => {
					const newComment = {
						user: user.userId,
						content: req.body.content,
						date: new Date(),
					};
					data.comments.push(newComment);
					data.save().then(() => {
						res.json({
							result: true,
							film: {
								content: newComment.content,
								date: newComment.date,
							},
						});
					});
				});
			} else {
				res.json({
					result: false,
					error: "error while checking/creating film",
				});
			}
		} else {
			res.json({ result: false, error: "invalid filmId" });
		}
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
	}
});

//Route qui permet d'ajouter/supprimer un like à un film
router.post("/:filmId/like", async (req, res) => {
	try {
		if (!checkBody(req.body, ["user"])) {
			res.json({ result: false, error: "Missing or empty fields" });
			return;
		}
		//Conversion de l'ID du film en nombre
		const filmId = Number(req.params?.filmId);
		//Récuperer l'ObjectID de l'utilisateur à partir du token
		const user = await autentification(req.body.user);

		if (req.params && filmId) {
			const isFilmExists = await createFilmIfNotExists(filmId);
			if (isFilmExists) {
				Film.findOne({ tmdbId: filmId }).then((data) => {
					if (data.likes.includes(user.userId)) {
						const likes = data.likes.filter(
							(el) => el.toString() !== user.userId.toString()
						);
						data.likes = likes;
					} else {
						data.likes.push(user.userId);
					}
					data.save().then(() => {
						res.json({ result: true, film: data });
					});
				});
			} else {
				res.json({
					result: false,
					error: "error while checking/creating film",
				});
			}
		} else {
			res.json({ result: false, error: "invalid filmId" });
		}
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
	}
});

module.exports = router;
