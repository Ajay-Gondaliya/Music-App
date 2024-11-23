const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
    id: String, // Spotify song ID
    name: String,
    artist: String,
    album: String,
    addedAt: { type: Date, default: Date.now },
  });

const playlistSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    songs: [SongSchema],
});

module.exports = mongoose.model("Playlist", playlistSchema);