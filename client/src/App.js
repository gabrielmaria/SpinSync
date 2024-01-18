import React, { useState, useEffect } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import ArtistsList from './components/ArtistsList';
import AlbumsList from './components/AlbumsList';
import TracksList from './components/TracksList';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [albumTracks, setAlbumTracks] = useState([]);
  const [audioPreview, setAudioPreview] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
      const data = await response.json();
      setArtists(data.artists);
    } catch (error) {
      console.error('Error searching for artists:', error);
    }
  };

  const handleArtistClick = async (artist) => {
    setSelectedArtist(artist);
    try {
      const response = await fetch(`/api/albums?artistId=${artist.id}`);
      const data = await response.json();
      setAlbums(data.albums);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const handleAlbumClick = async (album) => {
    try {
      const response = await fetch(`/api/tracks?albumId=${album.id}`);
      const data = await response.json();
      setAlbumTracks(data.tracks);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const handlePreviewClick = (previewUrl) => {
    if (audioPreview && audioPreview.src === previewUrl) {
      audioPreview.pause();
      setAudioPreview(null);
    } else {
      const audio = new Audio(previewUrl);
      audio.play();
      setAudioPreview(audio);
    }
  };

  useEffect(() => {
    if (audioPreview) {
      audioPreview.addEventListener('ended', () => {
        setAudioPreview(null);
      });
    }
    return () => {
      if (audioPreview) {
        audioPreview.removeEventListener('ended', () => {});
      }
    };
  }, [audioPreview]);

  return (
    <div className="App">
      <SearchForm searchTerm={searchTerm} onSearch={handleSearch} onChange={setSearchTerm} />

      {artists.length > 0 && (
        <ArtistsList artists={artists} onArtistClick={handleArtistClick} />
      )}

      {selectedArtist && albums.length > 0 && (
        <AlbumsList albums={albums} selectedArtist={selectedArtist} onAlbumClick={handleAlbumClick} />
      )}

      {albumTracks.length > 0 && (
        <TracksList albumTracks={albumTracks} audioPreview={audioPreview} onPreviewClick={handlePreviewClick} />
      )}
    </div>
  );
}

export default App;
