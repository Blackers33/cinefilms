const Film = require('../models/films');
const User = require('../models/users')

// Fonction permettant de vérifier qu'un champ existe dans la requête et qu'il n'est pas vide.
const checkBody = (req, inputs) => inputs.every(el => req[el]?.toString().trim());

//Créer un nouveau film à partir de tmdbId 
const createFilm = async (tmdbId) => {
    try {
        const newFilm = new Film({
            tmdbId: tmdbId,
            likes: [],
            comments: [],
        });
    
        await newFilm.save();
        const filmData = await Film.findOne({tmdbId: tmdbId});
        return !!filmData  // Retourne true si le film a bien été enregistré
    } catch(error) {
        return false;
    }
};

//Créer un nouveau film à partir de tmdbId s'il n'existe pas 
const createFilmIfNotExists = async (tmdbId) => {
    try {
        const film = await Film.findOne({ tmdbId: tmdbId });
        if ( film !== null) {
            return true
        }
        return await createFilm(tmdbId);
    } catch(error) {
        return false;
    }
}

// Récuperer le userId/ username de l'utilisateur à partir du token 
const autentification = async (token) => {
    let user;
    try {
        await User.findOne({ token: token }).then(data => {
            user = {
                userId: data._id,
                username: data.username
            };
        });
        if (user) {
            return user
        }
    } catch(error) {
        return false;
    }
}

module.exports = { checkBody, createFilmIfNotExists, autentification };
