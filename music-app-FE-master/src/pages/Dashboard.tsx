import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Typography, Button, TextField, List, ListItem, ListItemText } from "@mui/material";
import SpotifySearch from "../components/SpotifySearch";

interface Playlist {
    _id: string;
    name: string;
    description: string;
}

const Dashboard: React.FC = () => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const token = localStorage.getItem("token");

    const fetchPlaylists = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/playlists`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        setPlaylists(data);
    };

    const addPlaylist = async () => {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/playlists`,
            { name, description },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        setName("");
        setDescription("");
        fetchPlaylists();
    };

    const deletePlaylist = async (id: string) => {
        const token = localStorage.getItem("token");
        await axios.delete(`${process.env.REACT_APP_API_URL}/playlists/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        fetchPlaylists();
    };

    const handleAddSong = async (playlistId: string, song: { id: string | number, name: string, album: { name: string }, artists: [{ name: string }] }) => {
        await axios.post(`${process.env.REACT_APP_API_URL}/playlists/add-song`, {
            playlistId, song: {
                id: song.id,
                name: song.name,
                album: song.album.name,
                artists: song.artists.map((artist) => artist.name).join(", ")
            }
        }, { headers: { Authorization: `Bearer ${token}` } });
        fetchPlaylists(); // Refresh playlists
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);

    return (
        <Box sx={{ maxWidth: 600, mx: "auto", mt: 5 }}>
            <Typography variant="h4" mb={3}>Your Playlists</Typography>
            <Box mb={3}>
                <TextField
                    label="Name"
                    fullWidth
                    margin="normal"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <TextField
                    label="Description"
                    fullWidth
                    margin="normal"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button variant="contained" fullWidth onClick={addPlaylist} sx={{ mt: 2 }}>
                    Add Playlist
                </Button>
            </Box>
            <List>
                {playlists.map((playlist: any) => (
                    <>
                        <SpotifySearch onAddSong={(song: { id: string | number, name: string, album: { name: string }, artists: [{ name: string }] }) => handleAddSong(playlist._id, song)} />
                        <ListItem key={playlist._id} secondaryAction={
                            <Button color="error" onClick={() => deletePlaylist(playlist._id)}>Delete</Button>
                        }>
                            <ListItemText primary={playlist.name} secondary={playlist.description} />
                        </ListItem>
                        <List>
                            {playlist?.songs?.map((list: {_id: string, name: string, album: string }) => (
                                <ListItem key={list._id}>
                                    <ListItemText primary={list.name} secondary={list.album} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                ))}
            </List>
        </Box>
    );
};

export default Dashboard;
