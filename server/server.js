const express = require('express');
const searchController = require('./controllers/searchController');
const albumController = require('./controllers/albumController');
const trackController = require('./controllers/trackController');

const app = express();
const PORT = 5000;

app.use(express.json());

app.get('/api/search', async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const artists = await searchController.searchArtists(searchTerm);
    res.json({ artists });
  } catch (error) {
    console.error('Error searching for artists:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/albums', async (req, res) => {
  try {
    const artistId = req.query.artistId;
    const albums = await albumController.fetchAlbums(artistId);
    res.json({ albums });
  } catch (error) {
    console.error('Error fetching albums:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/tracks', async (req, res) => {
  try {
    const albumId = req.query.albumId;
    const tracks = await trackController.fetchTracks(albumId);
    res.json({ tracks });
  } catch (error) {
    console.error('Error fetching tracks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
