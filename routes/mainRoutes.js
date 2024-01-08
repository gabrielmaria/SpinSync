// routes/mainRoutes.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Deezer Public API configuration
const DEEZER_API_URL = 'https://api.deezer.com/search/album';

// Define routes
router.get('/', (req, res) => {
  res.render('main', { pageTitle: 'Spinsync' });
});

router.get('/search', async (req, res) => {
  try {
    const { query } = req.query;

    // Make a request to Deezer Public API for album search
    const response = await axios.get(DEEZER_API_URL, {
      params: {
        q: query,
      },
    });

    // Extract relevant data from the API response
    const albums = response.data.data;

    res.render('search', { pageTitle: 'Album Search', albums });
  } catch (error) {
    console.error('Error during album search:', error.message);
    res.status(500).render('error', { errorMessage: 'Internal Server Error' });
  }
});

module.exports = router;
