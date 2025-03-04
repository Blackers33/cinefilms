const Film = require('../models/films');

const checkBody = (req, inputs) => inputs.every(el => req[el]?.toString().trim());

//Créer un nouveau film à partir de tmdbId 
const createFilm = (tmdbId) => {
    try {
        const newFilm = new Film({
            tmdbId: tmdbId,
            likes: [],
            comments: [],
        });
    
        newFilm.save().then(() => {
            Film.findOne({tmdbId: tmdbId}).then(data => {
                if (data.length) {
                    return true;
                } 
                return false;
            });
        });
    } catch(error) {
        return false;
    }
};

//Créer un nouveau film à partir de tmdbId s'il n'existe pas 
const createFilmIfNotExists = (tmdbId) => {
    try {
        Film.findOne( {tmdbId: tmdbId} ).then((data) => {
            if (data.length) {
                return true;
            }
            return createFilm(tmdbId);
        })
    } catch(error) {
        return false;
    }
}

module.exports = { checkBody, createFilmIfNotExists };
