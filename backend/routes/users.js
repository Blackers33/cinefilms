var express = require("express");
var router = express.Router();

const uid2 = require("uid2");
const bcrypt = require("bcrypt");

require("../models/connection");
const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");

//POST new user (inscription)
router.post("/signup", (req, res) => {
	if (!checkBody(req.body, ["username", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" });
		return;
	}
	// Check if the user has not already been registered
	User.findOne({
		username: { $regex: new RegExp(req.body.username, "i") },
	}).then((data) => {
		if (data === null) {
			const hash = bcrypt.hashSync(req.body.password, 10);
			const newUser = new User({
				username: req.body.username,
				password: hash,
				email: req.body.email,
				token: uid2(32),
			});

			newUser.save().then((newDoc) => {
				res.json({ result: true, token: newDoc.token });
			});
		} else {
			// User already exists in database
			res.json({ result: false, error: "User already exists" });
		}
	});
});

//POST user signin (connexion)
router.post("/signin", (req, res) => {
	if (!checkBody(req.body, ["email", "password"])) {
		res.json({ result: false, error: "Missing or empty fields" });
		return;
	}

	User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } }).then(
		(data) => {
			if (data && bcrypt.compareSync(req.body.password, data.password)) {
				res.json({ result: true, token: data.token });
			} else {
				res.json({ result: false, error: "User not found" });
			}
		}
	);
});

// PUT creation & update de profil
router.put("/profil/:token", (req, res) => {
	User.findOne({ token: req.params.token }).then((data) => {
		const { username, avatar, age, genre, location, favMovies, favGenres, biography } =
			req.body;
		if (data) {
			User.updateOne(
				{ token: req.params.token },
				{
          username,
					age: Number(age),
					avatar,
					biography,
					favGenres,
					favMovies,
					location,
					genre,
				}
			).then((updatedData) => {
				console.log(updatedData);
				if (updatedData.modifiedCount > 0) {
					User.findOne({ token: req.params.token }).then((dataUser) => {
						res.json({
							result: true,
							message: "Profil updated",
							profil: dataUser,
						});
					});
				} else {
          console.log(req.body)
					res.json({ result: false, message: "Erreur : Le profil n'a pas été mis à jour." });
				}
			});
		} else {
			res.json({ result: false, message: "Erreur: pas de profil trouvé." });
		}
	});
});

//GET profil de l'utilisateur
router.get("/profil/:token", (req, res) => {
	User.findOne({ token: req.params.token }).then((data) => {
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
				},
			});
			console.log(data);
		} else {
			res.json({ result: false, error: "No corresponding profil" });
		}
	});
});

module.exports = router;
