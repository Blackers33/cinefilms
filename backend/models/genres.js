const mongoose = require("mongoose");


const genreSchema = mongoose.Schema({
	id: Number,
    name: String,
});

const Genre = mongoose.model("genres", genreSchema);

module.exports = Genre;