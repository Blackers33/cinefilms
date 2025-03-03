const mongoose = require("mongoose");

const commentsSchema = mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
	content: String,
	date: Date,
});

module.exports = commentsSchema;
