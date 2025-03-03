const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    date: Date,
    content: String,
   });

const eventsSchema = mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    location: Object, 
    filmId: { type: mongoose.Schema.Types.ObjectId, ref: 'film' },
    date: Date,
    comments: [commentsSchema],
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    description: String,
    title: String,
});

const Event = mongoose.model('events', eventsSchema);

module.exports = Event;