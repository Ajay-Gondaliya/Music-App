const axios = require("axios");

const getSpotifyAccessToken = async () => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const tokenUrl = process.env.TOKEN_URL;

    if (!clientId || !clientSecret || !tokenUrl) {
        throw new Error("Missing required environment variables for Spotify API.");
    }

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    const headers = {
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
    };

    const response = await axios.post(tokenUrl, params, { headers });
    return response.data.access_token;
};

const searchSpotifySongs = async (query) => {
    const accessToken = await getSpotifyAccessToken();
    if (!accessToken) {
        throw new Error("No access token received from Spotify API.");
    }
    const response = await axios.get(process.env.SPOTIFY_SEARCH_API, {
        headers: { Authorization: `Bearer ${accessToken}` },
        params: { q: query, type: "track", limit: 10 },
    });
    return response.data.tracks.items;
};

module.exports = { searchSpotifySongs };
