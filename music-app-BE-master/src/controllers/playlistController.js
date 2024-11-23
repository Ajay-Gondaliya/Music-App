const Playlist = require("../models/Playlist");
const { searchSpotifySongs } = require("./spotify");

const getPlaylists = async (req, res) => {
    try {
        const playlists = await Playlist.find({ userId: req.user.id });
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createPlaylist = async (req, res) => {
    const { name, description } = req.body;
    try {
        const newPlaylist = new Playlist({ name, description, userId: req.user.id });
        await newPlaylist.save();
        res.status(201).json(newPlaylist);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    const { playlistId, song } = req.body;
    try {
        const playlist = await Playlist.findById(playlistId);
        if (!playlist) return res.status(404).json({ message: "Playlist not found" });

        playlist.songs.push(song);
        await playlist.save();
        res.status(200).json({ message: "Song added to playlist", playlist });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchSongs = async (req, res) => {
    const { query } = req.query;
    try {
        const songs = await searchSpotifySongs(query);
        res.status(200).json(songs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deletePlaylist = async (req, res) => {
    try {
      await Playlist.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

module.exports = { getPlaylists, createPlaylist, addSongToPlaylist, searchSongs, deletePlaylist }
