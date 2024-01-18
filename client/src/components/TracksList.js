import React from 'react';

function TracksList({ albumTracks, audioPreview, onPreviewClick }) {
  return (
    <div className="tracks-container">
      <h2>Album Tracks</h2>
      <ul>
        {albumTracks.map((track) => (
          <li key={track.id}>
            {track.title}{' '}
            <button onClick={() => onPreviewClick(track.preview)}>
              {audioPreview && audioPreview.src === track.preview ? 'Pause' : 'Play'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TracksList;
