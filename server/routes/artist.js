const router = require('express').Router();
const Artist = require('../models/artist.model');
const axios = require('axios');

// Deezer Public API configuration
const DEEZER_API_URL = 'https://api.deezer.com/search?q=';

// Endpoint to fetch artist data from Deezer and albums
router.route('/:artistName').get(async (req, res) => {
    let artistId;

    try {

      const artistName = req.params.artistName;
      console.log('Received artistName:', artistName);
  
      // Make a request to Deezer Public API for artist search
      const artistResponse = await axios.get(`${DEEZER_API_URL}${encodeURIComponent(artistName)}`);


  
      //console.log(artistResponse.data);  // Add this line to log the response
  
      // Assuming the first result is the correct artist
      const artistData = artistResponse.data.data;
      if (artistData && artistData.length > 0) {
        artistId = artistData[0].id;
      }
      console.log(artistId);
  
      // Make another request to Deezer Public API for artist's albums
      const albumResponse = await axios.get(`https://api.deezer.com/artist/${artistId}/albums`);
      const albums = albumResponse.data.data;

      console.log(albums);
  
      res.json({ albums: artistData });
    } catch (error) {
      console.error('Error during artist and album data fetch:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// route to get all the artists
router.route('/').get((req, res) => {
  Artist.find()
    .then(artists => res.json(artists))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Example route for adding an artist
router.route('/add').post((req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const date = Date.parse(req.body.date);

  const newArtist = new Artist({
    name,
    description,
    date,
  });

  // Save the artist to the database
  newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
