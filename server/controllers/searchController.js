const fetch = require('node-fetch');
const DEEZER_API_BASE_URL = 'https://api.deezer.com';

async function searchArtists(searchTerm) {
  try {
    const response = await fetch(`${DEEZER_API_BASE_URL}/search/artist?q=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error searching for artists:', error);
    throw new Error('Internal Server Error');
  }
}

module.exports = {
  searchArtists,
};
