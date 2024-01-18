import React from 'react';

function ArtistsList({ artists, onArtistClick }) {
  return (
    <div className="artists-container">
      <h2>Artists</h2>
      <ul>
        {artists.map((artist) => (
          <li key={artist.id} onClick={() => onArtistClick(artist)}>
            {artist.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ArtistsList;
