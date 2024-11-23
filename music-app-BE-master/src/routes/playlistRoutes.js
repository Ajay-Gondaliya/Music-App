const express = require("express");
const { getPlaylists, createPlaylist, addSongToPlaylist, searchSongs, deletePlaylist } = require("../controllers/playlistController");
const router = express.Router();

router.get("/", getPlaylists);
router.post("/", createPlaylist);
router.post("/add-song", addSongToPlaylist);
router.get("/search", searchSongs);
router.delete("/:id", deletePlaylist);

module.exports = router;
