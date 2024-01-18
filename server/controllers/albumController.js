const fetch = require('node-fetch');
const DEEZER_API_BASE_URL = 'https://api.deezer.com';

async function fetchAlbums(artistId) {
  try {
    const response = await fetch(`${DEEZER_API_BASE_URL}/artist/${artistId}/albums`);
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching albums:', error);
    throw new Error('Internal Server Error');
  }
}

module.exports = {
  fetchAlbums,
};
