import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const SpotifySearch = ({ onAddSong }: any) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const token = localStorage.getItem("token");

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/playlists/search`, { params: { query }, headers: { Authorization: `Bearer ${token}` }, });
            setResults(response.data);
        } catch (error) {
            console.error("Search failed:", error);
        }
    };

    return (
        <div>
            <TextField
                fullWidth
                margin="normal"
                placeholder="Search for songs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <Button onClick={handleSearch} variant="contained" fullWidth type="button" sx={{ mt: 2 }}>
                Search
            </Button>
            <ul>
                {results.map((song:
                    { id: string | number, name: string, album: { name: string }, artists: [{ name: string }] }) => (
                    <li key={song?.id}>
                        {song?.name} by {song?.artists.map((artist) => artist.name).join(", ")} ({song?.album.name})
                        <button onClick={() => onAddSong(song)}>Add to Playlist</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SpotifySearch;
