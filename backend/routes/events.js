var express = require("express");
var router = express.Router();
const Event = require("../models/events");
const Film = require("../models/films");
const User = require("../models/users");
const { checkBody, autentification } = require("../modules/utils");

// Route GET pour récupérer les événements d'un utilisateur
router.get("/:username", async (req, res) => {
  try {
    if (!req.params.username) {
      return res
        .status(400)
        .json({ result: false, error: "Missing username parameter" });
    }
    const username = req.params.username;

    // Trouver l'utilisateur par username (insensible à la casse)
    const user = await User.findOne({
      username: { $regex: new RegExp(username, "i") },
    });

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Trouver les événements créés par cet utilisateur
    const events = await Event.find({ owner: user._id });

    if (events.length === 0) {
      return res.status(404).json({ message: "Aucun événement trouvé." });
    }

    // Retourner les événements
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
});

// route get qui permet de filter les endroit des evenements
router.get("/location/:cityname", async (req, res) => {
  try {
    const cityname = req.params.cityname;

    // Recherche des événements avec une localisation qui correspond à la ville donnée
    const events = await Event.find({
      location: { $regex: new RegExp(cityname, "i") },
    });

    if (events.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Aucun événement trouvé sur cette localisation.",
        });
    }

    // Retourner les événements trouvés
    res.status(200).json({ success: true, events });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur serveur",
        error: error.message,
      });
  }
});

//rout get qui permet de filtrer les evenement par rapport le film
router.get("/film/:tmdbId", async (req, res) => {
  try {

    // Recherche des événements avec une localisation qui correspond à la ville donnée
    const film = await Film.findOne({ tmdbId: req.params.tmdbId });
    
    if (!film) {
        return res.status(404).json({
          success: false,
          message: "Aucun film trouvé avec cet ID.",
        });
      }
    const filmId = film._id;

    const events = await Event.find({filmId: filmId });

    if (events.length === 0) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Aucun événement trouvé sur ce film.",
        });
    }

    // Retourner les événements trouvés
    res.status(200).json({ success: true, events });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erreur serveur",
        error: error.message,
      });
  }
});

// route get qui permet de trouver tous les evenements

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    if (events.length === 0) {
      return res.status(404).json({ message: "Aucun événement trouvé " });
    }

    res.status(200).json({ result: true, data: events });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la récupération des événements",
        error: error.message,
      });
  }
});

// route Post qui permets de creer de l'évenement

router.post("/", async (req, res) => {
  try {
    if (
      !checkBody(req.body, [
        "location",
        "description",
        "title",
        "user",
        "tmbdId",
      ])
    ) {
      return res
        .status(400)
        .json({ result: false, error: "Missing or empty fields" });
    }

    const user = await autentification(req.body.user);
    if (!user) {
      return res
        .status(401)
        .json({ result: false, error: "Invalid user authentication" });
    }

    tmbdIdennumber = parseInt(req.body.tmbdId);
    const film = await Film.findOne({ tmdbId: tmbdIdennumber }); // Ajout de await
    const filmId = film ? film._id : null;
    console.log(filmId);

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
    res.status(500).json({ result: false, error: "Internal server error" });
  }
});

// ajouter les comment sur un event
router.post("/:eventId/comment", async (req, res) => {
  try {
    if (!checkBody(req.body, ["user", "content"])) {
      return res.json({ result: false, error: "Missing or empty fields" });
    }

    const user = await autentification(req.body.user);
    if (!user) {
      return res.json({ result: false, error: "User authentication failed" });
    }

    const event = await Event.findById(req.params.eventId);
    if (!event) {
      return res.json({ result: false, error: "Event not found" });
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
    res.status(500).json({ result: false, error: "Internal server error" });
  }
});

module.exports = router;
