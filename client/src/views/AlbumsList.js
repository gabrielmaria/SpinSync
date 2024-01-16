import React, { Component } from 'react'
import axios from 'axios';


export default class ArtistsList extends Component {
  constructor(props) {
    super(props);
    
    this.state = { artists: [] };
  }


  componentDidMount() {
    axios.get('http://localhost:5001/artists/') // deezer API
      .then(response => {
        this.setState({ artists: response.data });
      })
      .catch((error) => {
        console.log(error);
      })
  }


  artistList() {
    return this.state.artists.map(currentArtist => (
      <tr key={currentArtist._id}>
        <td>{currentArtist.name}</td>
        <td>{currentArtist.description}</td>
        <td>{currentArtist.date}</td>
      </tr>
    ));
  }


  render() {
    return (
      <div>
        <h3>Artists List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            { this.artistList() }
          </tbody>
        </table>
      </div>
    )
  }
}