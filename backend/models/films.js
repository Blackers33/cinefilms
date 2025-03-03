const mongoose = require("mongoose");
const commentsSchema = require("./comments");

const filmSchema = mongoose.Schema({
	tmdbId: Number,
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
	comments: [commentsSchema],
});

const Film = mongoose.model("films", filmSchema);

module.exports = Film;
