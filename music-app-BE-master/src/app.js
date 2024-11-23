const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnect = require('./config/dbConn');
const userRoutes = require('./routes/userRoutes');
const playlistRoutes = require('./routes/playlistRoutes');
const { protect } = require("./middleware/authMiddleware");

require('dotenv').config();

const app = express();

dbConnect();

app.disable('x-powered-by');

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(cookieParser());
app.use(cors());

app.use("/api/users", userRoutes);
app.use(protect);
app.use("/api/playlists", playlistRoutes);

app.use((err, req, res, next) => {
    console.log('=========', err)
    res.status(404).send("You're Beyond The Borders!");
});

// custom error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send('Something broke!');
});

module.exports = app;