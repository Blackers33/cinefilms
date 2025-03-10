var express = require("express");
var router = express.Router();
const Event = require("../models/events");
const Film = require("../models/films");
const User = require("../models/users");
const {
	checkBody,
	createFilmIfNotExists,
	autentification,
} = require("../modules/utils");

//Route qui récupère les événements liés à un film en BDD
router.get("/:filmId/events", (req, res) => {
	try {
		//Conversion de l'ID du film en nombre
		const filmId = Number(req.params?.filmId);

		if (req.params && filmId) {
			Event.find({ tmdbId: filmId })
				.populate("films")
				.then((data) => {
					if (data.length) {
						res.json({ result: true, events: data });
					} else {
						res.json({ result: false, error: "Not found" });
					}
				});
		}
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
	}
});

//Route qui permet de récupérer le film
router.get("/:filmId/:token/film", async (req, res) => {
	try {
		//Conversion de l'ID du film en nombre
		const filmId = Number(req.params?.filmId);
		const user = await User.findOne({ token: req.params.token });

		if (req.params && filmId && user._id) {
			const film = await Film.findOne({ tmdbId: filmId });
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
		console.log(user);
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
