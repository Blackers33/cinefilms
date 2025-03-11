var express = require("express");
var router = express.Router();
const Event = require("../models/events");
const Film = require("../models/films");
const User = require("../models/users");
const { checkBody, autentification } = require("../modules/utils");


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

// Route GET pour récupérer les événements d'un utilisateur
router.get("/:username", async (req, res) => {
  try {
    if (!req.params.username) {
      return res
        .status(400)
        .json({ result: false, error: "Missing username parameter" });
    }
    const username = req.params.username;


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
router.get("/:tmdbId/events", async (req, res) => {
  try {
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
          .populate("filmId")
          .populate('comments.user')
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
              participants: event.participants.map(participant => ({
                  username: participant.username,
                  avatar: participant.avatar,
              })),
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

//route post - ajouter les comment sur un event
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

//Route pour joindre un événement existant selon son _id
router.post("/:eventId/joingEvent", async (req, res) => {
  try {
    // Check if the required fields are present in the request body
    if (!checkBody(req.body, ['user'])) {
      return res.json({ result: false, error: 'Missing or empty fields' });
    }

    const eventId = req.params?.eventId;

    // Retrieve the user based on the token from the request body
    const user = await autentification(req.body.user);

    if (!eventId) {
      return res.json({ result: false, error: 'Invalid event ID' });
    }

    // Find the event by its ID
    const event = await Event.findOne({ _id: eventId });

    if (!event) {
      return res.json({ result: false, error: 'Event not found' });
    }

    // Check if the user is already a participant
    const isParticipating = event.participants.includes(user.userId);

    if (isParticipating) {
      // If the user is already participating, remove them
      event.participants = event.participants.filter(
        (participantId) => participantId.toString() !== user.userId.toString()
      );
    } else {
      // If the user is not participating, add them to the participants list
      event.participants.push(user.userId);
    }

    // Save the updated event
    await event.save();

    // Respond with the updated event participation details
    res.json({
      result: true,
      participation: {
        participantsNbr: event.participants.length,
        isParticipate: !isParticipating, // If the user was not participating, they are now participating
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ result: false, error: 'Internal server error' });
  }
});

module.exports = router;
