var express = require("express");
var router = express.Router();
const Event = require("../models/events");
const Film = require("../models/films");
const User = require("../models/users");
const { checkBody, autentification } = require("../modules/utils");


// route get qui permet de trouver tous les evenements

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("comments")
    .populate("owner")          
    .populate("participants")       
    .populate("comments.user"); 

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
    const events = await Event.find({ owner: user._id }).populate("owner");

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
      console.log(allEvents.length);
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
        "date"
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
      date: new Date(req.body.date),
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

module.exports = router;
