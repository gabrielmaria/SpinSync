import React from 'react';

function AlbumsList({ albums, selectedArtist, onAlbumClick }) {
  return (
    <div className="albums-container">
      <h2>Albums by {selectedArtist.name}</h2>
      <ul>
        {albums.map((album) => (
          <li key={album.id} onClick={() => onAlbumClick(album)}>
            {album.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AlbumsList;
