import React, { Component } from 'react';
import axios from 'axios';

export default class ArtistsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      showAlbums: false,
      selectedArtist: null,
      albums: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5001/artists/')
      .then(response => {
        this.setState({ artists: response.data });
        console.log('Artists:', response.data); // Add this line to log the artists
      })
      .catch((error) => {
        console.log(error);
      });
  }
  

  async fetchDeezerAlbums(artistName) {
    try {
      const albumResponse = await axios.get(`http://localhost:5001/artists/${encodeURIComponent(artistName)}`);
      console.log('Album Response:', albumResponse.data);
  
      // Update the state with the albums
      this.setState({ albums: albumResponse.data.albums });
    } catch (error) {
      console.error('Error fetching Deezer artist data:', error);
    }
  }
  


  // Toggle visibility of albums and fetch albums for the selected artist
  toggleAlbums(artistId, artistName) {
    this.setState(prevState => {
      const showAlbums = !prevState.showAlbums || prevState.selectedArtist !== artistId;
      return {
        showAlbums,
        selectedArtist: showAlbums ? artistId : null,
      };
    }, () => {
      if (this.state.showAlbums) {
        this.fetchDeezerAlbums(artistName);
      }
    });
  }

  artistList() {
    // Check if this.state.artists is defined before mapping
    if (!this.state.artists) {
      return null; // or handle loading state
    }
  
    return this.state.artists.map(currentArtist => (
      <React.Fragment key={currentArtist._id}>
        <tr>
          <td>{currentArtist.name}</td>
          <td>{currentArtist.description}</td>
          <td>{currentArtist.date}</td>
          <td>
            <button
              className="btn btn-primary"
              onClick={() => this.toggleAlbums(currentArtist._id, currentArtist.name)}
            >
              Show Albums
            </button>
          </td>
        </tr>
        {this.state.showAlbums && true && (
          <tr>
            <td colSpan="4">
              <ul>
                {/* Add a check for this.state.albums before mapping */}
                {this.state.albums && this.state.albums.map(album => (
                  <li key={album.id}>{album.title}</li>
                ))}
              </ul>
            </td>
          </tr>
        )}
      </React.Fragment>
    ));
  }
  

  render() {
    console.log('Show Albums:', this.state.showAlbums);
    console.log('Selected Artist:', this.state.selectedArtist);
    console.log('Albums:', this.state.albums);
    return (
      <div>
        <h3>Artists List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.artistList()}
          </tbody>
        </table>
      </div>
    );
  }
}
