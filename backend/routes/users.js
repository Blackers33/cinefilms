var express = require("express");
var router = express.Router();

const uid2 = require("uid2");
const bcrypt = require("bcrypt");

require("../models/connection");
const User = require("../models/users");

const { checkBody } = require("../modules/checkBody");

//POST new user (inscription)
router.post("/signup", (req, res) => {
	if (!checkBody(req.body, ["username", "password", "email"])) {
		res.json({ result: false, error: "Certains champs sont vides." });
		return;
	}
	// Check if the user has not already been registered
	User.findOne({
		email: { $regex: new RegExp(req.body.email, "i") },
	}).then((data) => {
		if (data === null) {
			const hash = bcrypt.hashSync(req.body.password, 10);
			const newUser = new User({
				username: req.body.username,
				password: hash,
				email: req.body.email,
				token: uid2(32),
				age: 0 //Donne un age de 0 par défaut, pour éviter d'avoir null en BDD.
			});

			newUser.save().then((newDoc) => {
				res.json({ result: true, token: newDoc.token });
			});
		} else {
			// User already exists in database
			res.json({ result: false, error: "L'utilisateur existe déjà" });
		}
	});
});

//POST user signin (connexion)
router.post("/signin", (req, res) => {
	if (!checkBody(req.body, ["email", "password"])) {
		res.json({ result: false, error: "Certains champs sont vides." });
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
		const {
			username,
			avatar,
			age,
			genre,
			location,
			favMovies,
			favGenres,
			biography,
		} = req.body;
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
						const {
							location,
							username,
							email,
							token,
							friends,
							favGenres,
							favMovies,
							age,
							avatar,
							biography,
							genre,
						} = dataUser;
						res.json({
							result: true,
							message: "Profil updated",
							profil: {
								location,
								username,
								email,
								token,
								friends,
								favGenres,
								favMovies,
								age,
								avatar,
								biography,
								genre,
							},
						});
					});
				} else {
					console.log(req.body);
					res.json({
						result: false,
						message: "Erreur : Le profil n'a pas été mis à jour.",
					});
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
		} else {
			res.json({ result: false, error: "No corresponding profil" });
		}
	});
});

//GET all users
router.get("/", (req, res) => {
	User.find().then((data) => {
		if (data.length > 0) {
			res.json({
				result: true,
				userslist: data.map((user) => ({
					username: user.username,
					favGenres: user.favGenres,
					favMovies: user.favMovies,
					age: user.age,
					avatar: user.avatar,
					biography: user.biography,
					genre: user.genre,
					_id: user._id,
          location: user.location
				})),
			});
			console.log(data);
		} else {
			res.json({ result: false, error: "No users found" });
		}
	});
});

//Switch friend
//Si la personne est déjà amie, elle est enlevée
router.post("/addfriend/:_id", async (req, res) => {
  try {
    const { _id } = req.params;
    const { token } = req.body;

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(404).json({ result: false, error: "Utilisateur non trouvé" });
    }

    const friendId = String(_id);
    const friendIndex = user.friends.indexOf(friendId);

    if (friendIndex !== -1) {
      // Supprimer l'ami s'il est déjà dans la liste
      user.friends.splice(friendIndex, 1);
    } else {
      // Ajouter l'ami s'il n'est pas encore dans la liste
      user.friends.push(friendId);
    }
    await user.save();
    res.json({ result: true, friends: user.friends });
  } catch (error) {
    res.status(500).json({ result: false, error: "Erreur interne du serveur" });
  }
});


//Get le username d'un utilisateur à partir de son ObjectID
router.get("/:userId", (req, res) => {
	try {
		User.findById(req.params?.userId.toString()).then((data) => {
			if (data) {
				res.json({ result: true, user: { username: data.username } });
			} else {
				res.json({ result: false, error: "No corresponding profil" });
			}
		});
	} catch (error) {
		res.status(500).json({ result: false, error: "Internal server error" });
	}
});
module.exports = router;
