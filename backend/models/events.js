const mongoose = require('mongoose');
const commentsSchema = require("./comments");

/**
 * CommentsSchema remplacé par le require ci dessus ^^^
 */
/* const commentsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    date: Date,
    content: String,
   }); */

const eventsSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    location: Object, 
    filmId: { type: mongoose.Schema.Types.ObjectId, ref: 'films' },
    date: Date,
    comments: [commentsSchema],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    description: String,
    title: String,
});

const Event = mongoose.model('events', eventsSchema);

module.exports = Event;