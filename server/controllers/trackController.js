const fetch = require('node-fetch');
const DEEZER_API_BASE_URL = 'https://api.deezer.com';

async function fetchTracks(albumId) {
  try {
    const response = await fetch(`${DEEZER_API_BASE_URL}/album/${albumId}/tracks`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching tracks:', error);
    throw new Error('Internal Server Error');
  }
}

module.exports = {
  fetchTracks,
};
