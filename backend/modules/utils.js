const Film = require('../models/films');

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

module.exports = { checkBody, createFilmIfNotExists };
